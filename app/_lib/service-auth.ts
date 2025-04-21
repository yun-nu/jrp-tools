import { createClient } from "../_lib/supabase-client";
import {
  EmailAndConfirmation,
  emailAndConfirmationSchema,
  SignInOTP,
  signInOTPSchema,
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

export async function LoginOTP({ email }: Pick<SignInOTP, "email">) {
  const parsed = signInOTPSchema.pick({ email: true }).safeParse({ email });

  if (!parsed.success) {
    throw new Error("Invalid input");
  }

  const supabase = await createClient();

  const { email: parsedEmail } = parsed.data;

  const { error } = await supabase.auth.signInWithOtp({
    email: parsedEmail,
    options: {
      shouldCreateUser: false,
    },
  });

  if (error?.status === 422) return { error: "User not found." };
  if (error?.status === 429)
    return { error: "Please wait a minute before attempting to login again." };

  if (error) return { error: `A server error occurred: ${error.message}` };

  return { success: "Check your email address and use the code to log in" };
}

export async function verifyOTPLogin(inputData: SignInOTP) {
  const parsed = signInOTPSchema.safeParse(inputData);

  if (!parsed.success) {
    return {
      message: "Submission Failed",
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  const supabase = await createClient();

  const { email: parsedEmail, OTPCode: parsedToken } = parsed.data;

  const { data, error } = await supabase.auth.verifyOtp({
    email: parsedEmail,
    token: parsedToken,
    type: "email",
  });

  if (error?.status === 403) return { error: "Expired or invalid code." };

  return { success: "Logged in successfully", user: data.user };
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

export async function signInGoogle() {
  const supabase = createClient();
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${process.env.ROOT_URL}/api/auth/callback`,
    },
  });

  if (error) throw new Error("Could not login");
}
