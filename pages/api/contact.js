import nodemailer from 'nodemailer';
import type { NextApiRequest, NextApiResponse } from 'next';

// Create a transporter using SMTP configuration from environment variables
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT, 10),
  secure: process.env.SMTP_SECURE === 'true', // Ensure secure is a boolean
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Verify the transporter configuration
transporter.verify((error) => {
  if (error) {
    console.error('Error verifying transporter: ', error);
  } else {
    console.log('SMTP transporter is ready');
  }
});

// Handle HTTP requests
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { firstName, lastName, email, message, phone } = req.body;
    const name = `${firstName} ${lastName}`;

    const mail = {
      from: process.env.RECEIVER_EMAIL, // Sender email address
      to: process.env.RECEIVER_EMAIL,   // Recipient email address (can be different)
      subject: "Contact Form Submission - Portfolio",
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    };

    try {
      await transporter.sendMail(mail);
      res.status(200).json({ status: 'Message Sent' });
    } catch (error) {
      console.error('Error sending email: ', error);
      res.status(500).json({ error: 'Failed to send email', details: error.message });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
