import { createHmac, timingSafeEqual, randomBytes } from 'node:crypto';
import type { VercelRequest } from '@vercel/node';
const cookieName = 'generays_admin';
const lifetime = 8 * 60 * 60;
function signature(value: string) {
  const password = process.env.ADMIN_PASSWORD;
  const username = process.env.ADMIN_USERNAME;
  if (!password || !username) return null;
  return createHmac('sha256', password).update(`${username}\0${value}`).digest('hex');
}
export function validSession(req: VercelRequest) {
  const token = req.cookies?.[cookieName];
  if (typeof token !== 'string') return false;
  const [expires, nonce, signed, ...rest] = token.split('.');
  if (rest.length || !/^\d+$/.test(expires ?? '') || !/^[a-f0-9]{32}$/.test(nonce ?? '') || !/^[a-f0-9]{64}$/.test(signed ?? '')) return false;
  const expected = signature(`${expires}.${nonce}`);
  const now = Math.floor(Date.now() / 1000);
  return !!expected && Number(expires) > now && Number(expires) <= now + lifetime && timingSafeEqual(Buffer.from(signed, 'hex'), Buffer.from(expected, 'hex'));
}
export function sessionCookie(clear = false) {
  const payload = `${Math.floor(Date.now() / 1000) + lifetime}.${randomBytes(16).toString('hex')}`;
  const signed = signature(payload);
  if (!signed && !clear) throw new Error('Admin credentials not configured');
  const secure = process.env.VERCEL || process.env.NODE_ENV === 'production';
  return `${cookieName}=${clear ? '' : `${payload}.${signed}`}; HttpOnly; SameSite=Strict; Path=/api/admin; Max-Age=${clear ? 0 : lifetime}${secure ? '; Secure' : ''}`;
}
