import { createClient } from "../_lib/supabase-client";
import {
  EmailAndConfirmation,
  emailAndConfirmationSchema,
} from "../_schemas/Auth";
import { RequestResult } from "../_utils/return";

export async function signUpOTP(
  input: EmailAndConfirmation
): Promise<RequestResult & { email: string }> {
  const parsed = emailAndConfirmationSchema.safeParse(input);

  if (!parsed.success) {
    throw new Error("Invalid input");
  }

  const { email: parsedEmail } = parsed.data;

  const supabase = createClient();

  const { error } = await supabase.auth.signInWithOtp({
    email: parsedEmail,
    options: {
      emailRedirectTo: `${process.env.ROOT_URL}/signup/success`,
    },
  });

  if (error) throw new Error("Could not sign up");

  return {
    success:
      "Follow the instructions sent to your email to activate your account.",
    email: parsedEmail,
  };
}

export async function updateEmail(
  input: EmailAndConfirmation
): Promise<RequestResult & { email: string }> {
  const parsed = emailAndConfirmationSchema.safeParse(input);

  if (!parsed.success) {
    throw new Error("Invalid input");
  }

  const supabase = createClient();

  const { email: parsedEmail } = parsed.data;

  const { error } = await supabase.auth.updateUser(
    {
      email: parsedEmail,
    },
    {
      emailRedirectTo: `${process.env.ROOT_URL}/account/settings/email-confirmation`,
    }
  );

  if (error?.status === 422) throw new Error("Email already in use");

  if (error) throw new Error("Could not update email");

  return {
    success:
      "Change requested successfully. Please check both the new and old email addresses.",
    email: parsedEmail,
  };
}

export async function signOut() {
  const supabase = await createClient();

  const { error } = await supabase.auth.signOut();
  if (error) throw new Error("Error signing out.");

  return { success: "Logged out successfully" };
}
