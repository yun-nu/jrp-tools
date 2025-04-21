"use server";

import { redirect } from "next/navigation";
import { createClient } from "../_lib/supabase-server";

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
