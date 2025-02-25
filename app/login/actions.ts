"use server";

import { signIn } from "next-auth/react";
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
  const { error } = await supabase.auth.signInWithOtp({
    email: email,
    options: {
      shouldCreateUser: false,
    },
  });

  if (error?.status === 422) return { error: "User not found." };
  if (error?.status === 429)
    return { error: "Please wait a minute before attempting to login again." };
  if (error) throw new Error("A server error occurred: ", error);
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
  const { error } = await supabase.auth.verifyOtp({
    email: data.email,
    token: data.OTPCode,
    type: "email",
  });

  if (error?.status === 403) return { error: "Expired or invalid code." };

  redirect("/dashboard");
}

export async function signOutAction() {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();
  if (error) console.log(error);
  redirect("/");
}

export async function signInGoogleAction() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: "http://localhost:3000/auth/callback",
    },
  });

  if (data.url) {
    redirect(data.url);
  }
}
