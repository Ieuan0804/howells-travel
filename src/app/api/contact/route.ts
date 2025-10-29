import { NextRequest, NextResponse } from 'next/server';

// Ensure this route runs on the Node.js runtime (required for nodemailer)
export const runtime = 'nodejs';
// Avoid any caching so updated environment variables are always read at runtime
export const dynamic = 'force-dynamic';
import nodemailer from 'nodemailer';

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

    const SMTP_HOST = process.env.SMTP_HOST;
    const SMTP_PORT = process.env.SMTP_PORT;
    const SMTP_USER = process.env.SMTP_USER;
    const SMTP_PASS = process.env.SMTP_PASS;
    const CONTACT_TO = process.env.CONTACT_TO;
    const CONTACT_FROM = process.env.CONTACT_FROM;

    if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS || !CONTACT_TO) {
      const missing = [
        !SMTP_HOST && 'SMTP_HOST',
        !SMTP_PORT && 'SMTP_PORT',
        !SMTP_USER && 'SMTP_USER',
        !SMTP_PASS && 'SMTP_PASS',
        !CONTACT_TO && 'CONTACT_TO',
      ].filter(Boolean).join(', ');
      
      return NextResponse.json(
        { error: `Email service not configured. Missing: ${missing}` },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT ?? 587),
      secure: Number(SMTP_PORT) === 465,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    });

    const subject = `New quote request from ${data.name}`;
    const from = CONTACT_FROM || SMTP_USER!;

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

    await transporter.sendMail({
      from,
      to: CONTACT_TO,
      subject,
      text,
      html,
      replyTo: data.email,
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}


