import { useRef, useState, type FormEvent } from 'react';
import { testimonialRequest } from '@/services/testimonials';

export function TestimonialSubmissionForm() {
  const submitting = useRef(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting.current) return;
    const form = event.currentTarget;
    const values = new FormData(form);
    const payload = {
      name: String(values.get('name') ?? '').trim(),
      designation: String(values.get('designation') ?? '').trim(),
      quote: String(values.get('quote') ?? '').trim(),
    };
    setError(''); setSuccess(false);
    if (Object.values(payload).some(value => !value)) {
      setError('Please complete every field.');
      return;
    }
    submitting.current = true; setBusy(true);
    try {
      await testimonialRequest('/api/testimonials', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      form.reset(); setSuccess(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Unable to submit. Please try again.');
    } finally {
      submitting.current = false; setBusy(false);
    }
  }

  const inputClass = 'mt-2 block w-full rounded-lg border border-slate-300 bg-white p-3 text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950';
  return <form onSubmit={submit} aria-labelledby="submit-testimonial-title" aria-busy={busy} className="mx-auto mt-10 max-w-xl px-5 text-slate-950">
    <h3 id="submit-testimonial-title" className="text-2xl font-bold">Share your experience</h3>
    <p className="mt-2 text-sm text-slate-600">Your feedback will appear here after our team reviews and approves it. Your name and designation will be public if approved.</p>
    <fieldset disabled={busy} className="mt-5 grid min-w-0 gap-4">
      <label className="text-sm font-medium">Your name
        <input className={inputClass} name="name" autoComplete="name" required maxLength={120} />
      </label>
      <label className="text-sm font-medium">Designation / company
        <input className={inputClass} name="designation" autoComplete="organization-title" required maxLength={200} />
      </label>
      <label className="text-sm font-medium">Your testimonial
        <textarea className={inputClass} name="quote" rows={5} required maxLength={2000} />
      </label>
      <button type="submit" className="rounded-lg bg-slate-950 px-5 py-3 font-semibold text-white disabled:opacity-60">{busy ? 'Submitting…' : 'Submit testimonial'}</button>
    </fieldset>
    {error && <p role="alert" className="mt-4 text-sm text-red-700">{error}</p>}
    {success && <p role="status" className="mt-4 text-sm text-green-800">Thank you! Your testimonial is pending approval.</p>}
  </form>;
}
