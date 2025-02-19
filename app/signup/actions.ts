"use server";

import { createClient } from "../_lib/supabase-server";
import { SignUpOTP, signUpOTPSchema } from "../_schemas/Auth";

export async function signUpOTPAction(input: SignUpOTP) {
  const email = input.email;

  const parsed = signUpOTPSchema.safeParse(input);

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

  if (error) return { message: "Could not sign up" };

  return {
    message:
      "Follow the instructions sent to your email to activate your account.",
  };
}
