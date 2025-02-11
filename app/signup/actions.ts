"use server";

import { createClient } from "../_lib/supabase-server";

export async function signUpOTPAction(formData: FormData) {
  const supabase = await createClient();
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
