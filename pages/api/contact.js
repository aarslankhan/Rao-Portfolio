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
  if (req.method === 'POST') {
    const { firstName, lastName, email, message, phone } = req.body;
    const name = `${firstName} ${lastName}`;

    const mail = {
      from: process.env.RECEIVER_EMAIL,
      to: process.env.RECEIVER_EMAIL,
      subject: 'Contact Form Submission - Portfolio',
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    };

    res.setHeader('Access-Control-Allow-Origin', 'https://raozeeshanaltaf.clickflow.tech');
    res.setHeader('Access-Control-Allow-Methods', 'POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    try {
      await transporter.sendMail(mail);
      res.status(200).json({ status: 'Message Sent' });
    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ error: 'Failed to send email', details: error.message });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
