import { useCallback, useEffect, useState, type FormEvent } from 'react';
import { testimonialRequest, TestimonialApiError, type TestimonialRecord } from '@/services/testimonials';

export default function AdminTestimonials({ onLogout, onSessionExpired }: { onLogout?: () => void; onSessionExpired?: () => void }) {
  const [status, setStatus] = useState('pending');
  const [page, setPage] = useState(1);
  const [items, setItems] = useState<TestimonialRecord[]>([]);
  const [editing, setEditing] = useState<Partial<TestimonialRecord> | null>(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [loading, setLoading] = useState(true);
  const load = useCallback(async () => {
    setLoading(true); setError(''); setItems([]);
    try { setItems((await testimonialRequest(`/api/admin/testimonials?status=${status}&page=${page}`)).items); }
    catch (e) { if (e instanceof TestimonialApiError && e.status === 401) onSessionExpired?.(); setError((e as Error).message); }
    finally { setLoading(false); }
  }, [status, page, onSessionExpired]);
  useEffect(() => { void load(); }, [load]);
  async function mutate(method: string, id?: string, body?: object) {
    setBusy(true); setError('');
    try {
      await testimonialRequest(`/api/admin/testimonials${id ? `?id=${id}` : ''}`, {
        method, headers: { 'Content-Type': 'application/json' }, body: body ? JSON.stringify(body) : undefined,
      });
      setEditing(null); await load();
    } catch (e) { if (e instanceof TestimonialApiError && e.status === 401) onSessionExpired?.(); setError((e as Error).message); }
    finally { setBusy(false); }
  }
  function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    void mutate(editing?._id ? 'PATCH' : 'POST', editing?._id, Object.fromEntries(data));
  }
  return <div className="mx-auto max-w-4xl px-6 py-32">
    <h1 className="mb-6 text-3xl font-bold">Master admin dashboard</h1>
    {onLogout && <button className="mb-6 rounded border px-4 py-2" onClick={onLogout}>Log out</button>}
    <div className="mb-6 flex flex-wrap gap-4">
      <label>Status <select disabled={busy || loading} value={status} onChange={e => { setStatus(e.target.value); setPage(1); setEditing(null); }}>
        <option value="pending">Pending</option><option value="approved">Approved</option>
      </select></label>
      <button disabled={busy || loading} onClick={() => setEditing({})}>Add testimonial</button>
      <button disabled={busy || loading} onClick={() => void load()}>Refresh</button>
    </div>
    {error && <p role="alert">{error}</p>}
    {loading && <p role="status">Loading testimonials…</p>}
    {!loading && !error && !items.length && <p>No {status} testimonials.</p>}
    {editing && <form key={editing._id ?? "new"} onSubmit={save} className="my-6 grid gap-4 rounded border p-5">
      <h2>{editing._id ? 'Edit testimonial (returns to pending)' : 'Add pending testimonial'}</h2>
      <label>Name<input className="block w-full rounded border p-2" name="name" required maxLength={120} defaultValue={editing.name} /></label>
      <label>Designation<input className="block w-full rounded border p-2" name="designation" required maxLength={200} defaultValue={editing.designation} /></label>
      <label>Quote<textarea className="block w-full rounded border p-2" name="quote" required maxLength={2000} defaultValue={editing.quote} /></label>
      <button disabled={busy}>Save as pending</button><button type="button" disabled={busy} onClick={() => setEditing(null)}>Cancel</button>
    </form>}
    <div className="grid gap-5">{items.map(item => <article className="rounded border p-5" key={item._id}>
      <h2 className="font-bold">{item.name}</h2><p>{item.designation}</p><blockquote className="my-3 whitespace-pre-wrap">{item.quote}</blockquote>
      <div className="flex gap-4">
        {status === 'pending' && <button disabled={busy} onClick={() => void mutate('PATCH', item._id, { status: 'approved' })}>Approve</button>}
        <button disabled={busy} onClick={() => setEditing(item)}>Edit</button>
        <button disabled={busy} onClick={() => { if (window.confirm(`Delete testimonial from ${item.name}?`)) void mutate('DELETE', item._id); }}>Delete</button>
      </div>
    </article>)}</div>
    <nav aria-label="Testimonial pages" className="mt-6 flex gap-5">
      <button disabled={busy || loading || page === 1} onClick={() => setPage(page - 1)}>Previous</button><span>Page {page}</span>
      <button disabled={busy || loading || items.length < 50} onClick={() => setPage(page + 1)}>Next</button>
    </nav>
  </div>;
}
