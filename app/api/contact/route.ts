import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(254),
  subject: z.string().trim().min(5).max(200).regex(/^[^\r\n]+$/),
  message: z.string().trim().min(10).max(5000),
});

export async function POST(request: Request) {
  const result = contactSchema.safeParse(await request.json().catch(() => null));
  if (!result.success) {
    return Response.json({ error: result.error.format() }, { status: 400 });
  }

  try {
    const response = await fetch('https://formspree.io/f/mbggvjok', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      signal: AbortSignal.timeout(10_000),
      body: JSON.stringify(result.data),
    });

    if (!response.ok) {
      throw new Error(`Formspree rejected the submission (HTTP ${response.status})`);
    }

    return Response.json({ success: true });
  } catch (error) {
    console.error('Contact email failed:', error);
    return Response.json({ error: 'Failed to send contact email' }, { status: 502 });
  }
}
