"use server";

import { signIn } from "next-auth/react";
import { createClient } from "../_lib/supabase-server";
import { redirect } from "next/navigation";
import { LoginDataProps } from "../_components/SignInOTP";

export async function signInOTPAction(email: string) {
  const supabase = await createClient();

  // *! in practice, you should validate your inputs
  console.log(email);
  //const email = formData.get("email") as string;

  const { data, error } = await supabase.auth.signInWithOtp({
    email: email,
    options: {
      shouldCreateUser: false,
    },
  });

  if (error?.status === 422) return { error: "User not found." };
  if (error?.status === 429)
    return { error: "Please wait a minute before attempting to login again." };
  if (error) throw new Error("A server error occurred: ", error);

  return data;
}

export async function verifyOTPLoginAction({ email, OTPCode }: LoginDataProps) {
  const supabase = await createClient();
  // const email = formData.get("email") as string;
  // const OTPcode = formData.get("OTPCode") as string;

  const { error } = await supabase.auth.verifyOtp({
    email: email,
    token: OTPCode,
    type: "email",
  });

  if (error?.status === 403) return { error: "Expired or invalid code." };

  redirect("/dashboard");
}

export async function signInGoogleAction() {
  await signIn("google", { redirectTo: "/dashboard" });
}

export async function signOutAction() {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();
  if (error) console.log(error);
  redirect("/");
}
