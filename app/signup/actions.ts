"use server";

import { redirect } from "next/navigation";
import { createClient } from "../_lib/supabase-server";
import {
  EmailAndConfirmation,
  emailAndConfirmationSchema,
} from "../_schemas/Auth";

export async function signUpOTPAction(input: EmailAndConfirmation) {
  const email = input.email;

  const parsed = emailAndConfirmationSchema.safeParse(input);

  if (!parsed.success) {
    return {
      message: "Submission Failed",
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithOtp({
    email: email,
  });

  if (error) return { error: "Could not sign up" };

  return {
    success:
      "Follow the instructions sent to your email to activate your account.",
  };
}
