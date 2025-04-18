import { z } from "zod";
import { FORM_CONTACT_MAX_LENGTH } from "../_utils/consts";

export const emailAndConfirmationSchema = z
  .object({
    email: z.string().email({ message: "Invalid email address" }),
    emailConfirmation: z.string().email({ message: "Invalid email address" }),
  })
  .refine((input) => input.email === input.emailConfirmation, {
    message: "The entered addresses don't match",
    path: ["emailConfirmation"],
  });

export type EmailAndConfirmation = z.infer<typeof emailAndConfirmationSchema>;

export const signInOTPSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  OTPCode: z.string().max(6, { message: "Code must be 6 characters" }),
});

export type SignInOTP = z.infer<typeof signInOTPSchema>;

export const formSchema = z.object({
  name: z
    .string()
    .max(80, { message: "Name must be less than 80 characters long" })
    .optional(),
  message: z
    .string()
    .min(1, { message: "Message can't be empty" })
    .max(FORM_CONTACT_MAX_LENGTH, {
      message: `Message must be less than ${FORM_CONTACT_MAX_LENGTH} characters long`,
    }),
});

export type ContactForm = z.infer<typeof formSchema>;
