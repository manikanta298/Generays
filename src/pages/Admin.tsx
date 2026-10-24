import { useCallback, useEffect, useState, type FormEvent } from 'react';
import AdminTestimonials from './AdminTestimonials';
import { testimonialRequest } from '@/services/testimonials';

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [checking, setChecking] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const sessionExpired = useCallback(() => { setAuthenticated(false); setError('Your session expired. Please log in again.'); }, []);
  useEffect(() => {
    let active = true;
    testimonialRequest('/api/admin/session').then(() => { if (active) setAuthenticated(true); })
      .catch(() => {}).finally(() => { if (active) setChecking(false); });
    return () => { active = false; };
  }, []);
  async function login(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); if (busy) return;
    const form = event.currentTarget;
    const values = new FormData(form);
    setBusy(true); setError('');
    try {
      await testimonialRequest('/api/admin/session', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(Object.fromEntries(values)) });
      form.reset(); setAuthenticated(true);
    } catch (e) { setError((e as Error).message); }
    finally { setBusy(false); }
  }
  async function logout() {
    try { await testimonialRequest('/api/admin/session', { method: 'DELETE' }); setAuthenticated(false); }
    catch (e) { setError((e as Error).message); }
  }
  if (checking) return <p role="status" className="p-12 text-center">Checking admin session…</p>;
  if (authenticated) return <>{error && <p role="alert">{error}</p>}<AdminTestimonials onSessionExpired={sessionExpired} onLogout={() => void logout()} /></>;
  return <div className="mx-auto max-w-md px-6 py-20">
    <h1 className="text-3xl font-bold">Master admin login</h1>
    <p className="mt-3 text-slate-600">Sign in to review and manage client testimonials.</p>
    <form className="mt-6 grid gap-4" onSubmit={login}>
      <label>Username<input name="username" autoComplete="username" required maxLength={200} className="mt-2 block w-full rounded border p-3" /></label>
      <label>Password<input name="password" type="password" autoComplete="current-password" required maxLength={1000} className="mt-2 block w-full rounded border p-3" /></label>
      <button disabled={busy} className="rounded bg-slate-950 px-5 py-3 font-semibold text-white">{busy ? 'Signing in…' : 'Log in'}</button>
    </form>
    {error && <p role="alert" className="mt-4 text-red-700">{error}</p>}
  </div>;
}
