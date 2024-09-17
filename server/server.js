// server.js

const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();  // Load environment variables

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Configure nodemailer transporter using environment variables
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: true, // Use true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

app.post('/subscribe', (req, res) => {
  const { email } = req.body;

  const mailOptions = {
    from: process.env.SMTP_USER,
    to: process.env.RECEIVER_EMAIL, // Receiver email from .env
    subject: 'New Newsletter Subscription',
    text: `You have a new newsletter subscription from: ${email}`,
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send({ status: 'error', message: error.toString() });
    }
    res.status(200).send({ status: 'success', message: 'Subscription successful!' });
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
