export type TestimonialRecord = {
  _id: string;
  name: string;
  designation: string;
  quote: string;
  status?: 'pending' | 'approved';
};
export class TestimonialApiError extends Error {
  constructor(message: string, public status: number) { super(message); }
}
export async function testimonialRequest(url: string, options?: RequestInit) {
  const response = await fetch(url, { cache: 'no-store', credentials: 'same-origin', ...options });
  const data = await response.json();
  if (!response.ok) throw new TestimonialApiError(data.error || 'Unable to load testimonials', response.status);
  return data;
}
