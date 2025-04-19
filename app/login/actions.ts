"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "../_lib/supabase-server";
import { SignInOTP, signInOTPSchema } from "../_schemas/Auth";

export async function signInOTPAction({ email }: Pick<SignInOTP, "email">) {
  const parsed = signInOTPSchema.pick({ email: true }).safeParse({ email });

  if (!parsed.success) {
    return {
      message: "Submission Failed",
      errors: parsed.error.flatten().fieldErrors,
    };
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

  return { success: "Logged in successfully" };
}

export async function verifyOTPLoginAction(data: SignInOTP) {
  const parsed = signInOTPSchema.safeParse(data);

  if (!parsed.success) {
    return {
      message: "Submission Failed",
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  const supabase = await createClient();

  const { email: parsedEmail, OTPCode: parsedToken } = parsed.data;

  const { error } = await supabase.auth.verifyOtp({
    email: parsedEmail,
    token: parsedToken,
    type: "email",
  });

  if (error?.status === 403) return { error: "Expired or invalid code." };

  redirect("/account/characters");
}

export async function signOutAction() {
  const supabase = await createClient();

  const { error } = await supabase.auth.signOut();
  if (error) return { error: error.message };

  const cookieStore = await cookies();
  const allCookies = cookieStore.getAll();

  for (const { name } of allCookies) {
    await cookieStore.set(name, "", { maxAge: -1, path: "/" });
  }

  return { success: "Logged out successfully" };
}

export async function signInGoogleAction() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${process.env.ROOT_URL}/api/auth/callback`,
    },
  });

  if (error) return { error: error.message };

  if (data.url) {
    redirect(data.url);
  }
}
