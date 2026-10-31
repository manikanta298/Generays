import nodemailer from "nodemailer";
import { createContactHandler } from "../server/contact.js";

export default createContactHandler(async (message, config) => {
  const transporter = nodemailer.createTransport({
    host: config.SMTP_HOST,
    port: Number(config.SMTP_PORT || 587),
    secure: String(config.SMTP_PORT) === "465",
    auth: { user: config.SMTP_USER, pass: config.SMTP_PASS },
  });
  await transporter.sendMail(message);
});
