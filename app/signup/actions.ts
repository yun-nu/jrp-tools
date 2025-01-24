"use server";

import { signIn } from "next-auth/react";
import { supabase } from "../_lib/supabase-client";

// Create acc
export async function signUpOTPAction(formData: FormData) {
  const email = String(formData.get("email"));
  const emailConfirmation = String(formData.get("emailConfirmation"));

  if (email === emailConfirmation) {
    const { data, error } = await supabase.auth.signInWithOtp({
      email: email,
    });
    if (error) throw new Error(error.message);

    console.log(data);
    return data;
  }
  throw new Error("Entered email addresses don't match!");
}
