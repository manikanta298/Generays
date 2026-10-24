export type TestimonialRecord = {
  _id: string;
  name: string;
  designation: string;
  quote: string;
  status?: 'pending' | 'approved';
};
export async function testimonialRequest(url: string, options?: RequestInit) {
  const response = await fetch(url, { cache: 'no-store', credentials: 'same-origin', ...options });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || 'Unable to load testimonials');
  return data;
}
