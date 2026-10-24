import type { VercelRequest, VercelResponse } from '@vercel/node';
import { isAdmin } from '../../server/testimonials.js';
import { validSession, sessionCookie } from '../../server/admin-session.js';
export default function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method === 'GET') return res.status(validSession(req) ? 200 : 401).json({ authenticated: validSession(req) });
  if (!['POST', 'DELETE'].includes(req.method || '')) {
    res.setHeader('Allow', 'GET, POST, DELETE');
    return res.status(405).json({ error: 'Method not allowed' });
  }
  const origin = req.headers.origin;
  if (origin && origin !== `https://${req.headers.host}` && origin !== process.env.APP_ORIGIN) return res.status(403).json({ error: 'Origin not allowed' });
  if (req.method === 'DELETE') {
    res.setHeader('Set-Cookie', sessionCookie(true));
    return res.status(200).json({ authenticated: false });
  }
  if (!req.headers['content-type']?.startsWith('application/json')) return res.status(415).json({ error: 'JSON required' });
  const { username, password } = req.body || {};
  if (typeof username !== 'string' || typeof password !== 'string' || username.length > 200 || password.length > 1000) return res.status(400).json({ error: 'Enter your username and password' });
  const authorization = 'Basic ' + Buffer.from(`${username}:${password}`).toString('base64');
  if (!isAdmin({ ...req, cookies: {}, headers: { authorization } } as VercelRequest)) return res.status(401).json({ error: 'Incorrect username or password' });
  res.setHeader('Set-Cookie', sessionCookie());
  return res.status(200).json({ authenticated: true });
}
