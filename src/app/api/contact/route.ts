import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

// Ensure this route runs on the Node.js runtime
export const runtime = 'nodejs';
// Avoid any caching so updated environment variables are always read at runtime
export const dynamic = 'force-dynamic';

type ContactPayload = {
  name: string;
  email: string;
  phone?: string;
  service: string;
  date?: string;
  passengers?: string;
  pickup?: string;
  destination?: string;
  message?: string;
};

function validate(payload: unknown): { ok: boolean; error?: string } {
  if (payload === null || typeof payload !== 'object') {
    return { ok: false, error: 'Invalid payload' };
  }
  const data = payload as Record<string, unknown>;
  const required = ['name', 'email', 'service'] as const;
  for (const field of required) {
    if (typeof data[field] !== 'string' || (data[field] as string).trim() === '') {
      return { ok: false, error: `Missing required field: ${field}` };
    }
  }
  return { ok: true };
}

export async function POST(req: NextRequest) {
  try {
    const rawData = await req.json();
    const valid = validate(rawData);
    if (!valid.ok) {
      return NextResponse.json({ error: valid.error }, { status: 400 });
    }
    const data = rawData as ContactPayload;

    // TEMPORARY: Hardcoded fallback for testing - REMOVE AFTER VERCEL ENV VARS ARE FIXED
    const RESEND_API_KEY = process.env.RESEND_API_KEY || 're_HsbNKeVy_7BV2v7Ue5KVL8GsbHJXuvPxR';
    const CONTACT_TO = process.env.CONTACT_TO;
    const CONTACT_FROM = process.env.CONTACT_FROM || 'no-reply@bookings.howellstravels.co.uk';

    if (!RESEND_API_KEY || !CONTACT_TO) {
      const missing = [
        !RESEND_API_KEY && 'RESEND_API_KEY',
        !CONTACT_TO && 'CONTACT_TO',
      ].filter(Boolean).join(', ');
      return NextResponse.json({ error: `Email service not configured. Missing: ${missing}` }, { status: 500 });
    }

    const resend = new Resend(RESEND_API_KEY);

    const subject = `New quote request from ${data.name}`;
    const from = CONTACT_FROM || 'onboarding@resend.dev';

    const html = `
      <h2>New Quote Request</h2>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      ${data.phone ? `<p><strong>Phone:</strong> ${data.phone}</p>` : ''}
      <p><strong>Service:</strong> ${data.service}</p>
      ${data.date ? `<p><strong>Date:</strong> ${data.date}</p>` : ''}
      ${data.passengers ? `<p><strong>Passengers:</strong> ${data.passengers}</p>` : ''}
      ${data.pickup ? `<p><strong>Pickup:</strong> ${data.pickup}</p>` : ''}
      ${data.destination ? `<p><strong>Destination:</strong> ${data.destination}</p>` : ''}
      ${data.message ? `<p><strong>Details:</strong><br/>${data.message.replace(/\n/g, '<br/>')}</p>` : ''}
    `;

    const text = `New Quote Request\n\n`
      + `Name: ${data.name}\n`
      + `Email: ${data.email}\n`
      + (data.phone ? `Phone: ${data.phone}\n` : '')
      + `Service: ${data.service}\n`
      + (data.date ? `Date: ${data.date}\n` : '')
      + (data.passengers ? `Passengers: ${data.passengers}\n` : '')
      + (data.pickup ? `Pickup: ${data.pickup}\n` : '')
      + (data.destination ? `Destination: ${data.destination}\n` : '')
      + (data.message ? `\nDetails:\n${data.message}\n` : '');

    const { error } = await resend.emails.send({
      from,
      to: CONTACT_TO,
      subject,
      html,
      text,
      replyTo: data.email,
    });

    if (error) {
      return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}

// Lightweight diagnostics endpoint to verify env vars at runtime (does not leak values)
export async function GET() {
  const keys = ['RESEND_API_KEY', 'CONTACT_TO', 'CONTACT_FROM', 'SMTP_HOST', 'SMTP_PORT', 'SMTP_USER', 'SMTP_PASS'] as const;
  const presence: Record<string, boolean> = {};
  for (const key of keys) {
    presence[key] = !!process.env[key];
  }
  return NextResponse.json({ runtime: 'nodejs', dynamic, presence });
}


