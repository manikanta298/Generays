import test, { afterEach } from 'node:test';
import assert from 'node:assert/strict';
import React from 'react';
import { JSDOM } from 'jsdom';
const dom = new JSDOM('<!doctype html><html><body></body></html>', { url: 'https://example.com' });
Object.assign(globalThis, { window: dom.window, document: dom.window.document, HTMLElement: dom.window.HTMLElement, FormData: dom.window.FormData, IS_REACT_ACT_ENVIRONMENT: true });
const { MemoryRouter } = await import('react-router-dom');
window.matchMedia = (() => ({ matches: true })) as typeof window.matchMedia;
const { render, fireEvent, waitFor, cleanup } = await import('@testing-library/react');
const { default: Admin } = await import('../src/pages/AdminTestimonials.js');
const { AnimatedTestimonials } = await import('../src/components/ui/animated-testimonials.js');
const records = [
  { _id: 'a'.repeat(24), name: 'Alice', designation: 'Founder', quote: 'First quote' },
  { _id: 'b'.repeat(24), name: 'Bob', designation: 'Director', quote: '<script>alert(1)</script>' },
];
const originalFetch = globalThis.fetch;
afterEach(() => { cleanup(); globalThis.fetch = originalFetch; });
function response(value: unknown, status = 200) { return Promise.resolve(new Response(JSON.stringify(value), { status, headers: { 'Content-Type': 'application/json' } })); }

test('switching edit target updates fields and add clears them', async () => {
  globalThis.fetch = (() => response({ items: records })) as typeof fetch;
  const ui = render(React.createElement(Admin));
  await ui.findByText('Alice');
  fireEvent.click(ui.getAllByText('Edit')[0]);
  assert.equal((ui.getByLabelText('Name') as HTMLInputElement).value, 'Alice');
  fireEvent.click(ui.getAllByText('Edit')[1]);
  assert.equal((ui.getByLabelText('Name') as HTMLInputElement).value, 'Bob');
  fireEvent.click(ui.getByText('Add testimonial'));
  assert.equal((ui.getByLabelText('Name') as HTMLInputElement).value, '');
});

test('approval uses approved-only patch and refreshes the pending list', async () => {
  const calls: { url: string; options?: RequestInit }[] = [];
  globalThis.fetch = ((url, options) => {
    calls.push({ url: String(url), options });
    return response(options?.method ? { success: true } : { items: calls.length > 1 ? [] : [records[0]] });
  }) as typeof fetch;
  const ui = render(React.createElement(Admin));
  fireEvent.click(await ui.findByText('Approve'));
  await ui.findByText('No pending testimonials.');
  assert.equal(calls[1].url, `/api/admin/testimonials?id=${records[0]._id}`);
  assert.equal(calls[1].options?.method, 'PATCH');
  assert.deepEqual(JSON.parse(String(calls[1].options?.body)), { status: 'approved' });
});

test('failed request exposes a retry and recovers', async () => {
  let fail = true;
  globalThis.fetch = (() => fail ? response({ error: 'Admin authentication required' }, 401) : response({ items: [] })) as typeof fetch;
  const ui = render(React.createElement(Admin));
  assert.equal((await ui.findByRole('alert')).textContent, 'Admin authentication required');
  fail = false;
  fireEvent.click(ui.getByText('Refresh'));
  await ui.findByText('No pending testimonials.');
});

test('carousel renders HTML literally and survives a shrinking list', async () => {
  const ui = render(React.createElement(AnimatedTestimonials, { testimonials: records, autoplay: false }));
  fireEvent.click(ui.getByLabelText('Next testimonial'));
  assert.ok(ui.getByText('“<script>alert(1)</script>”'));
  assert.equal(ui.container.querySelectorAll('script').length, 0);
  ui.rerender(React.createElement(AnimatedTestimonials, { testimonials: [records[0]], autoplay: false }));
  await waitFor(() => assert.ok(ui.getByText('Alice')));
  ui.rerender(React.createElement(AnimatedTestimonials, { testimonials: [], autoplay: false }));
  assert.equal(ui.container.textContent, '');
});

test('older public requests cannot restore content removed by a newer refresh', async () => {
  const { TestimonialsSection } = await import('../src/components/home/TestimonialsSection.js');
  const { act } = await import('@testing-library/react');
  const resolvers: ((response: Response) => void)[] = [];
  globalThis.fetch = (() => new Promise<Response>(resolve => resolvers.push(resolve))) as typeof fetch;
  const ui = render(React.createElement(MemoryRouter, null, React.createElement(TestimonialsSection)));
  assert.equal(resolvers.length, 1);
  fireEvent(window, new dom.window.Event('focus'));
  assert.equal(resolvers.length, 2);
  await act(async () => { resolvers[1](await response({ items: [] })); });
  await act(async () => { resolvers[0](await response({ items: [records[0]] })); });
  assert.equal(ui.queryByText('Alice'), null);
});

test('customer form submits content without status and confirms pending review', async () => {
  const { TestimonialSubmissionForm } = await import('../src/components/TestimonialSubmissionForm.js');
  let payload: unknown;
  globalThis.fetch = ((_url, options) => {
    payload = JSON.parse(String(options?.body));
    return response({ status: 'pending' }, 201);
  }) as typeof fetch;
  const ui = render(React.createElement(TestimonialSubmissionForm));
  fireEvent.change(ui.getByLabelText('Your name'), { target: { value: ' Customer ' } });
  fireEvent.change(ui.getByLabelText('Designation / company'), { target: { value: 'Founder' } });
  fireEvent.change(ui.getByLabelText('Your testimonial'), { target: { value: 'Great work' } });
  fireEvent.click(ui.getByText('Submit testimonial'));
  await ui.findByText('Thank you! Your testimonial is pending approval.');
  assert.deepEqual(payload, { name: 'Customer', designation: 'Founder', quote: 'Great work' });
  assert.equal((ui.getByLabelText('Your name') as HTMLInputElement).value, '');
});

test('customer form retains entered content when submission fails', async () => {
  const { TestimonialSubmissionForm } = await import('../src/components/TestimonialSubmissionForm.js');
  globalThis.fetch = (() => response({ error: 'Please retry later' }, 503)) as typeof fetch;
  const ui = render(React.createElement(TestimonialSubmissionForm));
  fireEvent.change(ui.getByLabelText('Your name'), { target: { value: 'Customer' } });
  fireEvent.change(ui.getByLabelText('Designation / company'), { target: { value: 'Founder' } });
  fireEvent.change(ui.getByLabelText('Your testimonial'), { target: { value: 'Great work' } });
  fireEvent.click(ui.getByText('Submit testimonial'));
  await ui.findByText('Please retry later');
  assert.equal((ui.getByLabelText('Your testimonial') as HTMLTextAreaElement).value, 'Great work');
});

test('master admin login gates the dashboard, logs in and logs out', async () => {
  const { default: AdminPage } = await import('../src/pages/Admin.js');
  let loggedIn = false;
  let credentials: unknown;
  globalThis.fetch = ((url, options) => {
    if (String(url) === '/api/admin/session') {
      if (options?.method === 'POST') { credentials = JSON.parse(String(options.body)); loggedIn = true; }
      if (options?.method === 'DELETE') loggedIn = false;
      return response({ authenticated: loggedIn }, loggedIn || options?.method === 'DELETE' ? 200 : 401);
    }
    return response({ items: [] });
  }) as typeof fetch;
  const ui = render(React.createElement(AdminPage));
  await ui.findByText('Master admin login');
  assert.equal(ui.queryByText('Approve'), null);
  fireEvent.change(ui.getByLabelText('Username'), { target: { value: 'master' } });
  fireEvent.change(ui.getByLabelText('Password'), { target: { value: 'secret' } });
  fireEvent.click(ui.getByText('Log in'));
  await ui.findByText('Master admin dashboard');
  assert.deepEqual(credentials, { username: 'master', password: 'secret' });
  fireEvent.click(ui.getByText('Log out'));
  await ui.findByText('Master admin login');
});

test('scrolling section exposes pause controls and renders text literally', async () => {
  const { ScrollingTestimonials } = await import('../src/components/ScrollingTestimonials.js');
  const ui = render(React.createElement(ScrollingTestimonials, { testimonials: records }));
  assert.equal(ui.container.querySelectorAll('article').length, 2);
  assert.equal(ui.container.querySelectorAll('script').length, 0);
  fireEvent.click(ui.getByText('Pause scrolling'));
  assert.equal(ui.getByText('Resume scrolling').getAttribute('aria-pressed'), 'true');
  ui.rerender(React.createElement(ScrollingTestimonials, { testimonials: [] }));
  assert.ok(ui.getByText('Client stories will appear here after approval.'));
});

test('homepage section links to a separate form and contains no customer inputs', async () => {
  const { TestimonialsSection } = await import('../src/components/home/TestimonialsSection.js');
  globalThis.fetch = (() => response({ items: records })) as typeof fetch;
  const ui = render(React.createElement(MemoryRouter, null, React.createElement(TestimonialsSection)));
  await ui.findByText('Alice');
  assert.equal(ui.getByText('Share your experience').getAttribute('href'), '/submit-testimonial');
  assert.equal(ui.container.querySelectorAll('form').length, 0);
  assert.equal(ui.container.querySelector('#testimonials')?.querySelectorAll('article').length, 2);
});
