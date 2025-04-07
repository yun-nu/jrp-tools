import { createClient } from "./supabase-server";

export async function getUserId(): Promise<string> {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) throw new Error("Error while fetching user.");

  if (!user) throw new Error("No authenticated user found.");

  return user.id;
}
