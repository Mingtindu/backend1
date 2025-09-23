import nodemailer from "nodemailer";
import { config } from "../../config/config.js";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: config.SMTP_EMAIL,
    pass: config.SMTP_PASSWORD,
  },
});

const sendMail = async ({ to, subject, text, html }) => {
  try {
    await transporter.sendMail({
      from: "test@gmail.com",
      to,
      subject,
      text,
      html,
    });
  } catch (error) {
    console.log("Email sending failed", error);
  }
};

export { sendMail };
