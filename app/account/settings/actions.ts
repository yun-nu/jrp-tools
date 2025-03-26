"use server";

import { getClientAndUser } from "@/app/_lib/action-auth-helpers";
import { createClient as createServerClient } from "@/app/_lib/supabase-server";
import {
  EmailAndConfirmation,
  emailAndConfirmationSchema,
} from "@/app/_schemas/Auth";
import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";

export async function updateEmailAction(input: EmailAndConfirmation) {
  const parsed = emailAndConfirmationSchema.safeParse(input);

  if (!parsed.success) {
    return {
      message: "Submission Failed",
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  const supabase = await createServerClient();

  const {
    data: { email: parsedEmail },
  } = parsed;

  const { error } = await supabase.auth.updateUser(
    {
      email: parsedEmail,
    },
    {
      emailRedirectTo: `${process.env.ROOT_URL}/account/settings/email-confirmation`,
    }
  );

  if (error?.status === 422) return { error: "Email already in use" };

  if (error) return { error: "Could not update email" };

  return {
    success:
      "Change requested successfully. Please check both the new and old email addresses.",
  };
}

export async function deleteUserAction() {
  const { userId: user } = await getClientAndUser();

  if (!user) return { error: "User not found" };

  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { error } = await supabaseAdmin.auth.admin.deleteUser(user);

  if (error) return { error: "Could not delete user" };

  const cookieStore = await cookies();
  const allCookies = cookieStore.getAll();

  for (const { name } of allCookies) {
    await cookieStore.set(name, "", { maxAge: -1, path: "/" });
  }

  return {
    success: "User deleted successfully",
  };
}
