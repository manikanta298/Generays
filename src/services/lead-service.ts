export type LeadInput = {
  name: string;
  company?: string;
  email: string;
  phone?: string;
  service?: string;
  message: string;
};

/**
 * Persistence boundary for future database/Supabase integration.
 * Intentionally does not write to a database yet.
 */
export async function createLead(input: LeadInput): Promise<{ accepted: boolean }> {
  void input;
  return { accepted: true };
}
