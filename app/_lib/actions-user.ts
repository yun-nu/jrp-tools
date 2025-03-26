"use server";

import { createClient } from "./supabase-server";

export async function getUserId() {
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    return { error: "Error while fetching user." };
  }

  if (!user) {
    return { error: "No authenticated user found." };
  }

  return { userId: user.id };
}

export async function getUserEmail() {
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    return { error: "Error while fetching user." };
  }

  if (!user) {
    return { error: "No authenticated user found." };
  }

  return { email: user.email };
}
