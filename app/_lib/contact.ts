"use server";

import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";
import { ContactForm } from "../_schemas/Auth";

export async function contactFormAction(data: ContactForm) {
  const { name, message } = data || {};

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.CONTACT_USER,
      pass: process.env.CONTACT_KEY,
    },
  });

  const mailOptions: Mail.Options = {
    from: process.env.CONTACT_USER,
    to: process.env.CONTACT_USER,
    subject: `Message from ${name}`,
    text: message,
  };

  try {
    const isVerified = await transporter.verify();
    const info = await transporter.sendMail(mailOptions);

    if (isVerified && info) return { messageId: info.messageId };
    else
      return {
        error: "Could not send message.",
      };
  } catch (error) {
    return { error: "Could not send message: A server error occurred." };
  }
}
