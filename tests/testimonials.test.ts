import test from 'node:test';
import assert from 'node:assert/strict';
import { ObjectId, type Collection } from 'mongodb';
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createHandler, type Testimonial } from '../server/testimonials.js';

process.env.ADMIN_USERNAME = 'qa';
process.env.ADMIN_PASSWORD = 'test-password';
const auth = 'Basic ' + Buffer.from('qa:test-password').toString('base64');
const id = new ObjectId();
const content = { name: 'Client', designation: 'Founder', quote: '<script>alert(1)</script>' };
let row: (Testimonial & { _id: ObjectId }) | undefined;
let lastFilter: unknown;
const db = {
  find(filter: { status: string }) {
    lastFilter = filter;
    const cursor = { sort() { return cursor; }, skip() { return cursor; }, limit() { return cursor; }, async toArray() { return row?.status === filter.status ? [row] : []; } };
    return cursor;
  },
  async insertOne(value: Testimonial) { row = { ...value, _id: id }; return { insertedId: id }; },
  async updateOne(filter: { _id: ObjectId }, update: { $set: Partial<Testimonial> }) {
    const found = row?._id.equals(filter._id);
    if (found) Object.assign(row!, update.$set);
    return { matchedCount: found ? 1 : 0 };
  },
  async deleteOne(filter: { _id: ObjectId }) {
    const found = row?._id.equals(filter._id); if (found) row = undefined;
    return { deletedCount: found ? 1 : 0 };
  },
} as unknown as Collection<Testimonial>;
async function call(admin: boolean, method: string, body?: unknown, query = {}, authorized = true, origin?: string) {
  let code = 200; let data: unknown; const headers: Record<string, unknown> = {};
  const res = { setHeader(k: string, v: unknown) { headers[k] = v; }, status(n: number) { code = n; return this; }, json(v: unknown) { data = v; return this; } } as unknown as VercelResponse;
  await createHandler(admin, async () => db)({ method, body, query, headers: { host: 'example.com', ...(authorized ? { authorization: auth } : {}), ...(origin ? { origin } : {}) } } as VercelRequest, res);
  return { code, data, headers };
}
test('moderation lifecycle and public isolation', async () => {
  assert.equal((await call(true, 'GET', undefined, {}, false)).code, 401);
  assert.equal((await call(false, 'POST', content)).code, 405);
  assert.equal((await call(true, 'POST', { ...content, status: 'approved' })).code, 201);
  assert.equal(row?.status, 'pending');
  await call(false, 'GET', undefined, { status: 'pending' });
  assert.deepEqual(lastFilter, { status: 'approved' });
  assert.deepEqual((await call(false, 'GET')).data, { items: [] });
  await call(true, 'GET'); assert.deepEqual(lastFilter, { status: 'pending' });
  assert.equal((await call(true, 'PATCH', { status: 'approved' }, { id: String(id) })).code, 200);
  assert.equal(row?.status, 'approved');
  assert.equal((await call(false, 'GET')).code, 200);
  assert.equal((await call(true, 'PATCH', content, { id: String(id) })).code, 200);
  assert.equal(row?.status, 'pending');
  assert.equal((await call(true, 'DELETE', undefined, { id: String(id) })).code, 200);
  assert.deepEqual((await call(false, 'GET')).data, { items: [] });
  assert.equal((await call(true, 'DELETE', undefined, { id: String(id) })).code, 404);
});
test('validation, unsupported methods and cross-origin mutation', async () => {
  assert.equal((await call(true, 'PATCH', { status: 'approved' }, { id: 'bad' })).code, 400);
  assert.equal((await call(true, 'PATCH', { status: 'rejected' }, { id: String(id) })).code, 400);
  assert.equal((await call(true, 'POST', { ...content, name: ' ' })).code, 400);
  assert.equal((await call(true, 'POST', { ...content, quote: 'a'.repeat(2001) })).code, 400);
  assert.equal((await call(true, 'GET', undefined, { status: { $ne: 'pending' } })).code, 400);
  assert.equal((await call(true, 'GET', undefined, { page: '-1' })).code, 400);
  assert.equal((await call(true, 'PUT')).code, 405);
  assert.equal((await call(true, 'POST', content, {}, true, 'https://evil.example')).code, 403);
});
test('database failures return a generic non-cacheable response', async () => {
  let code = 0; let data: unknown;
  const res = { setHeader() {}, status(n: number) { code = n; return this; }, json(v: unknown) { data = v; } } as unknown as VercelResponse;
  await createHandler(false, async () => { throw Error('secret URI'); })({ method: 'GET', query: {}, headers: {} } as VercelRequest, res);
  assert.equal(code, 503); assert.equal(JSON.stringify(data).includes('secret'), false);
});

test('public projection excludes moderation metadata and uses pagination', async () => {
  let projection: unknown;
  let limit: unknown;
  const cursor = { sort() { return cursor; }, skip() { return cursor; }, limit(n: number) { limit = n; return cursor; }, async toArray() { return []; } };
  const collection = { find(_filter: unknown, options: unknown) { projection = options; return cursor; } } as unknown as Collection<Testimonial>;
  const res = { setHeader() {}, status() { return this; }, json() {} } as unknown as VercelResponse;
  await createHandler(false, async () => collection)({ method: 'GET', query: {}, headers: {} } as VercelRequest, res);
  assert.deepEqual(projection, { projection: { name: 1, designation: 1, quote: 1 } });
  assert.equal(limit, 50);
});

test('every admin method rejects missing or incorrect credentials before database access', async () => {
  let accesses = 0;
  const handler = createHandler(true, async () => { accesses++; return db; });
  for (const authorization of [undefined, 'Basic ' + Buffer.from('qa:wrong').toString('base64'), 'Bearer fake', 'Basic !!!']) {
    for (const method of ['GET', 'POST', 'PATCH', 'DELETE']) {
      let code = 0;
      const res = { setHeader() {}, status(n: number) { code = n; return this; }, json() {} } as unknown as VercelResponse;
      await handler({ method, headers: { authorization }, query: {} } as VercelRequest, res);
      assert.equal(code, 401);
    }
  }
  assert.equal(accesses, 0);
});

test('page two skips fifty records with a stable sort', async () => {
  let skipped: unknown;
  let sort: unknown;
  const cursor = { sort(value: unknown) { sort = value; return cursor; }, skip(n: number) { skipped = n; return cursor; }, limit() { return cursor; }, async toArray() { return []; } };
  const collection = { find() { return cursor; } } as unknown as Collection<Testimonial>;
  const res = { setHeader() {}, status() { return this; }, json() {} } as unknown as VercelResponse;
  await createHandler(true, async () => collection)({ method: 'GET', query: { page: '2' }, headers: { authorization: auth } } as VercelRequest, res);
  assert.equal(skipped, 50);
  assert.deepEqual(sort, { createdAt: -1, _id: -1 });
});
