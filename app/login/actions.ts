"use server";

import { signIn } from "next-auth/react";
import { supabase } from "../_lib/supabase-client";

export async function signInOTPAction(formData: FormData) {
  const email = String(formData.get("email"));

  const { data, error } = await supabase.auth.signInWithOtp({
    email: email,
    options: {
      shouldCreateUser: false,
    },
  });

  if (error?.status === 422) throw new Error("User not found!");
  if (error?.status === 429)
    throw new Error("Please wait a minute before attempting to login again.");
  if (error) throw new Error("A server error occurred: ", error);
  console.log(data);
  return data;
}

export async function verifyOTPLogin() {
  const {
    data: { session },
    error,
  } = await supabase.auth.verifyOtp({
    email: "yunnu@live.com",
    token: "330335",
    type: "email",
  });
  console.log(session);
}

export async function signInGoogleAction() {
  await signIn("google", { redirectTo: "/dashboard" });
}
