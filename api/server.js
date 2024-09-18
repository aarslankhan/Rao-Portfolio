const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
require('dotenv').config(); 

const app = express();
app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

transporter.verify((error) => {
  if (error) {
    console.log("Error verifying transporter: ", error);
  } else {
    console.log("Server is ready to send emails");
  }
});

app.post("/contact", (req, res) => {
  const { firstName, lastName, email, message, phone } = req.body;
  const name = `${firstName} ${lastName}`;

  const mail = {
    from: process.env.RECEIVER_EMAIL,
    to: process.env.RECEIVER_EMAIL,
    subject: "Contact Form Submission - Portfolio",
    html: `
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Message:</strong> ${message}</p>
    `,
  };

  transporter.sendMail(mail, (error, info) => {
    if (error) {
      console.error("Error sending email: ", error);
      return res.status(500).json({ error: "Failed to send email", details: error.message });
    } else {
      console.log("Email sent successfully: ", info.response);
      return res.status(200).json({ status: "Message Sent" });
    }
  });
});

app.post("/subscribe", (req, res) => {
  const { email } = req.body;
  
  const mail = {
    from: process.env.SMTP_USER, // Your email address
    to: process.env.RECEIVER_EMAIL, // Email address to receive subscription notifications
    subject: "Newsletter Subscription",
    html: `<p>New subscription request from: ${email}</p>`,
  };

  transporter.sendMail(mail, (error, info) => {
    if (error) {
      console.error("Error sending email: ", error);
      return res.status(500).json({ status: 'error', message: 'Failed to subscribe, please try again later.' });
    } else {
      console.log("Email sent successfully: ", info.response);
      return res.status(200).json({ status: 'success', message: 'Subscription successful!' });
    }
  });
});

app.listen(5000, () => console.log("Server Running on port 5000"));