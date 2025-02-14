"use server";

import { createClient } from "../_lib/supabase-server";

export async function signUpOTPAction(
  _previousState: unknown,
  formData: FormData
) {
  const supabase = await createClient();
  const email = formData.get("email") as string;
  const emailConfirmation = formData.get("emailConfirmation") as string;

  if (email === emailConfirmation) {
    const { data, error } = await supabase.auth.signInWithOtp({
      email: email,
    });
    if (error) throw new Error(error.message);

    return data;
  }

  return { message: "Entered email addresses don't match!" };
}
