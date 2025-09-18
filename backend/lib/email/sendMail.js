import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "mingmartu@gmail.com",
    pass: "zzkx ekus eidd kmze",
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
