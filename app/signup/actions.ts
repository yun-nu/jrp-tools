"use server";

import { createClient } from "../_lib/supabase-server";
import {
  EmailAndConfirmation,
  emailAndConfirmationSchema,
} from "../_schemas/Auth";
import { ActionResult } from "../_utils/action-return";

export async function signUpOTPAction(
  email: EmailAndConfirmation["email"]
): Promise<ActionResult> {
  const parsed = emailAndConfirmationSchema.safeParse(email);

  if (!parsed.success) {
    return {
      message: "Submission Failed",
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  const { email: parsedEmail } = parsed.data;

  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithOtp({
    email: parsedEmail,
    options: {
      emailRedirectTo: `${process.env.ROOT_URL}/signup/success`,
    },
  });

  if (error) return { error: "Could not sign up" };

  return {
    success:
      "Follow the instructions sent to your email to activate your account.",
  };
}
