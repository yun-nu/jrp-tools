import { z } from "zod";

export const signUpOTPSchema = z
  .object({
    email: z.string().email({ message: "Invalid email address" }),
    emailConfirmation: z.string().email({ message: "Invalid email address" }),
  })
  .refine((input) => input.email === input.emailConfirmation, {
    message: "The entered addresses don't match",
    path: ["emailConfirmation"],
  });

export type SignUpOTP = z.infer<typeof signUpOTPSchema>;

export const signInOTPSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  OTPCode: z.string().max(6, { message: "Enter the 6-digit code" }),
});

export type SignInOTP = z.infer<typeof signInOTPSchema>;
