import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', 'https://raozeeshanaltaf.clickflow.tech');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'POST') {
    const { email } = req.body;

    const mail = {
      from: process.env.SMTP_USER,
      to: process.env.RECEIVER_EMAIL,
      subject: 'Newsletter Subscription',
      html: `<p>New subscription request from: ${email}</p>`,
    };

    try {
      await transporter.sendMail(mail);
      res.status(200).json({ status: 'success', message: 'Subscription successful!' });
    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ status: 'error', message: 'Failed to subscribe, please try again later.' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}