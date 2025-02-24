"use server";

import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";

export async function sendEmail(data: FormData) {
  const { name, email, message } = data;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PW,
    },
  });

  const mailOptions: Mail.Options = {
    from: process.env.MAIL_USER,
    to: process.env.MAIL_USER,
    // cc: email,
    // ^ sends a copy to the sender
    subject: `Message from ${name} (${email})`,
    text: message,
  };

  try {
    const isVerified = await transporter.verify();
    const info = await transporter.sendMail(mailOptions);

    if (isVerified && info)
      return { messageId: info.messageId, statusCode: 200 };
    else throw new Error("An error occurred while trying to send the email.");

    // DEV:
    // throw new Error("error");
    // return { messageId: 1, statusCode: 200 };
  } catch (error) {
    console.error("A server error has occurred: ", error);
    return { statusCode: 500 };
  }
}
