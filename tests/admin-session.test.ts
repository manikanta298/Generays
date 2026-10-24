import test from 'node:test';
import assert from 'node:assert/strict';
import type { VercelRequest, VercelResponse } from '@vercel/node';
import handler from '../api/admin/session.js';
import { validSession } from '../server/admin-session.js';
import { isAdmin } from '../server/testimonials.js';
process.env.ADMIN_USERNAME = 'master';
process.env.ADMIN_PASSWORD = 'private-test-password';
process.env.VERCEL = '1';
function call(method: string, body?: unknown, token?: string, origin = 'https://example.com') {
  let status = 200; let data: unknown;
  const headers: Record<string, unknown> = {};
  const req = { method, body, headers: { origin, host: 'example.com', 'content-type': 'application/json' }, cookies: token ? { generays_admin: token } : {} } as unknown as VercelRequest;
  const res = { setHeader(key: string, value: unknown) { headers[key] = value; }, status(code: number) { status = code; return this; }, json(value: unknown) { data = value; return this; } } as unknown as VercelResponse;
  handler(req, res);
  return { status, data, headers };
}
test('login issues a protected session, admin accepts it, logout clears it', () => {
  assert.equal(call('GET').status, 401);
  assert.equal(call('POST', { username: 'master', password: 'wrong' }).status, 401);
  const result = call('POST', { username: 'master', password: 'private-test-password' });
  assert.equal(result.status, 200);
  const cookie = String(result.headers['Set-Cookie']);
  assert.ok(cookie.includes('HttpOnly')); assert.ok(cookie.includes('Secure')); assert.ok(cookie.includes('SameSite=Strict'));
  const token = cookie.split(';')[0].slice('generays_admin='.length);
  assert.equal(call('GET', undefined, token).status, 200);
  assert.equal(isAdmin({ cookies: { generays_admin: token }, headers: {} } as VercelRequest), true);
  assert.equal(JSON.stringify(result.data).includes('password'), false);
  const logout = call('DELETE', undefined, token);
  assert.equal(logout.status, 200); assert.ok(String(logout.headers['Set-Cookie']).includes('Max-Age=0'));
});
test('session rejects tampering, expiry and credential rotation', () => {
  const result = call('POST', { username: 'master', password: 'private-test-password' });
  const token = String(result.headers['Set-Cookie']).split(';')[0].slice('generays_admin='.length);
  const req = (value: string) => ({ cookies: { generays_admin: value }, headers: {} }) as VercelRequest;
  assert.equal(validSession(req(token + 'x')), false);
  assert.equal(validSession(req('1.' + token.split('.').slice(1).join('.'))), false);
  process.env.ADMIN_PASSWORD = 'rotated-test-password';
  assert.equal(validSession(req(token)), false);
  process.env.ADMIN_PASSWORD = 'private-test-password';
});
test('session endpoints reject foreign origins and unsupported methods', () => {
  assert.equal(call('POST', { username: 'master', password: 'private-test-password' }, undefined, 'https://evil.example').status, 403);
  assert.equal(call('DELETE', undefined, undefined, 'https://evil.example').status, 403);
  assert.equal(call('PATCH').status, 405);
  assert.equal(call('POST', {}).status, 400);
});

test('an authentic signed session expires after eight hours', () => {
  const result = call('POST', { username: 'master', password: 'private-test-password' });
  const token = String(result.headers['Set-Cookie']).split(';')[0].slice('generays_admin='.length);
  const realNow = Date.now;
  try {
    Date.now = () => realNow() + 8 * 60 * 60 * 1000 + 1000;
    assert.equal(validSession({ cookies: { generays_admin: token }, headers: {} } as VercelRequest), false);
  } finally { Date.now = realNow; }
});
