import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const { name, email, message } = req.body ?? {};

  if (!name || !email || !message) {
    res.status(400).json({ error: 'Champs manquants' });
    return;
  }

  try {
    await resend.emails.send({
      from: 'Portfolio <onboarding@resend.dev>',
      to: 'safiditsilavo.andrianjakanivo@gmail.com',
      replyTo: email,
      subject: `Nouveau message de ${name} via le portfolio`,
      text: message,
    });

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Erreur envoi email:', error);
    res.status(500).json({ error: 'Envoi impossible' });
  }
}