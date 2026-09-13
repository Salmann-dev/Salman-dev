// Vercel Serverless Function
// Sends portfolio contact form submissions to your email via Resend.
// Docs: https://resend.com/docs

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }

  const { name, email, service, message } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are all required.' });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL;

  if (!apiKey || !toEmail) {
    return res.status(500).json({
      error: 'Server is missing RESEND_API_KEY or CONTACT_TO_EMAIL. Set both in your Vercel project environment variables.'
    });
  }

  const serviceLabels = {
    webapp: 'Web App',
    frontend: 'Frontend Dev',
    consulting: 'Consulting',
    fulltime: 'Full-time Role'
  };
  const serviceLabel = serviceLabels[service] || 'Not specified';

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        from: 'Portfolio Contact <onboarding@resend.dev>',
        to: [toEmail],
        reply_to: email,
        subject: `New portfolio message from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\nInterested in: ${serviceLabel}\n\nMessage:\n${message}`
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('Resend API error:', response.status, errText);
      return res.status(502).json({ error: 'Failed to send your message. Please try again shortly.' });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Request failed:', err);
    return res.status(500).json({ error: 'Something went wrong sending your message. Please try again.' });
  }
}
