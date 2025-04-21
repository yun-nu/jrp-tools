"use server";

import { getUserId } from "@/app/_lib/service-server";
import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";

export async function deleteAccountAction() {
  const userId = await getUserId();

  if (!userId || typeof userId !== "string") throw new Error("User not found");

  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { error } = await supabaseAdmin.auth.admin.deleteUser(userId);

  if (error) throw new Error("Could not delete account");

  const cookieStore = await cookies();
  const allCookies = cookieStore.getAll();

  for (const { name } of allCookies) {
    await cookieStore.set(name, "", { maxAge: -1, path: "/" });
  }

  return {
    success: "Account deleted successfully",
  };
}
