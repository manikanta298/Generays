import { validSession } from './admin-session.js';
import { MongoClient, ObjectId, type Collection } from 'mongodb';
import { timingSafeEqual, createHash } from 'node:crypto';
import type { VercelRequest, VercelResponse } from '@vercel/node';

export type Testimonial = {
  name: string;
  designation: string;
  quote: string;
  status: 'pending' | 'approved';
  createdAt: Date;
  updatedAt: Date;
};
let connection: Promise<MongoClient> | undefined;
export async function collection() {
  if (!process.env.MONGODB_URI || !process.env.MONGODB_DB) throw new Error('Database not configured');
  connection ??= new MongoClient(process.env.MONGODB_URI).connect().catch(error => {
    connection = undefined;
    throw error;
  });
  return (await connection).db(process.env.MONGODB_DB).collection<Testimonial>('testimonials');
}
function equal(a: string, b: string) {
  return timingSafeEqual(createHash('sha256').update(a).digest(), createHash('sha256').update(b).digest());
}
export function isAdmin(req: VercelRequest) {
  if (validSession(req)) return true;
  const user = process.env.ADMIN_USERNAME;
  const password = process.env.ADMIN_PASSWORD;
  if (!user || !password) return false;
  const header = req.headers.authorization;
  if (!header?.startsWith('Basic ')) return false;
  const decoded = Buffer.from(header.slice(6), 'base64').toString('utf8');
  return equal(decoded, `${user}:${password}`);
}
export function fields(body: unknown) {
  if (!body || typeof body !== 'object' || Array.isArray(body)) return null;
  const input = body as Record<string, unknown>;
  const result: Record<string, string> = {};
  for (const [key, max] of [['name', 120], ['designation', 200], ['quote', 2000]] as const) {
    const value = input[key];
    if (typeof value !== 'string' || !value.trim() || value.trim().length > max) return null;
    result[key] = value.trim();
  }
  return result as Pick<Testimonial, 'name' | 'designation' | 'quote'>;
}
export function createHandler(admin: boolean, getCollection: () => Promise<Collection<Testimonial>> = collection) {
  return async (req: VercelRequest, res: VercelResponse) => {
    res.setHeader('Cache-Control', 'no-store');
    if (admin && !isAdmin(req)) {
      return res.status(401).json({ error: 'Admin authentication required' });
    }
    const allowed = admin ? ['GET', 'POST', 'PATCH', 'DELETE'] : ['GET', 'POST'];
    if (!allowed.includes(req.method || '')) {
      res.setHeader('Allow', allowed.join(', '));
      return res.status(405).json({ error: 'Method not allowed' });
    }
    // Prevent cross-origin browser mutations with ambient Basic credentials.
    const origin = req.headers.origin;
    if (req.method !== 'GET' && origin && origin !== `https://${req.headers.host}` && origin !== process.env.APP_ORIGIN) {
      return res.status(403).json({ error: 'Origin not allowed' });
    }
    try {
      if (req.method === 'GET') {
        const status = admin ? (req.query.status ?? 'pending') : 'approved';
        if (status !== 'pending' && status !== 'approved') return res.status(400).json({ error: 'Invalid status' });
        const rawPage = admin ? String(req.query.page ?? '1') : '1';
        if (!/^[1-9]\d{0,5}$/.test(rawPage)) return res.status(400).json({ error: 'Invalid page' });
        const db = await getCollection();
        const items = await db.find({ status }, { projection: { name: 1, designation: 1, quote: 1, ...(admin ? { status: 1, updatedAt: 1 } : {}) } })
          .sort({ createdAt: -1, _id: -1 }).skip((Number(rawPage) - 1) * 50).limit(50).toArray();
        return res.status(200).json({ items });
      }
      if (req.method === 'POST') {
        if (!admin && !req.headers['content-type']?.toLowerCase().startsWith('application/json')) {
          return res.status(415).json({ error: 'Content-Type must be application/json' });
        }
        const content = fields(req.body);
        if (!content) return res.status(400).json({ error: 'Name, designation and quote are required and must fit their limits' });
        const now = new Date();
        const result = await (await getCollection()).insertOne({ ...content, status: 'pending', createdAt: now, updatedAt: now });
        return res.status(201).json({ id: result.insertedId, status: 'pending' });
      }
      const id = req.query.id;
      if (typeof id !== 'string' || !/^[a-f\d]{24}$/i.test(id)) return res.status(400).json({ error: 'Invalid testimonial ID' });
      const filter = { _id: new ObjectId(id) };
      if (req.method === 'DELETE') {
        const result = await (await getCollection()).deleteOne(filter);
        return res.status(result.deletedCount ? 200 : 404).json(result.deletedCount ? { success: true } : { error: 'Testimonial not found' });
      }
      const body = req.body;
      if (!body || typeof body !== 'object' || Array.isArray(body)) return res.status(400).json({ error: 'Invalid body' });
      let update: Partial<Testimonial>;
      if (Object.keys(body).length === 1 && body.status === 'approved') update = { status: 'approved' };
      else {
        const content = fields(body);
        if (!content || Object.keys(body).some(key => !['name', 'designation', 'quote'].includes(key))) return res.status(400).json({ error: 'Send content fields or status: approved' });
        // An edit requires a fresh review before publication.
        update = { ...content, status: 'pending' };
      }
      const result = await (await getCollection()).updateOne(filter, { $set: { ...update, updatedAt: new Date() } });
      return res.status(result.matchedCount ? 200 : 404).json(result.matchedCount ? { success: true } : { error: 'Testimonial not found' });
    } catch {
      return res.status(503).json({ error: 'Testimonial service unavailable. Please retry.' });
    }
  };
}
