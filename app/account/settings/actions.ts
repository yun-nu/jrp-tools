"use server";

import { authActionHelper } from "@/app/_lib/action-auth-helpers";
import { createClient } from "@/app/_lib/supabase-server";
import {
  EmailAndConfirmation,
  emailAndConfirmationSchema,
} from "@/app/_schemas/Auth";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function updateEmailAction(input: EmailAndConfirmation) {
  const email = input.email;

  const parsed = emailAndConfirmationSchema.safeParse(input);

  if (!parsed.success) {
    return {
      message: "Submission Failed",
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.updateUser({
    email: email,
  });

  if (error) return { error: "Could not update email" };

  return {
    success:
      "Please check both the new and old email addresses, and follow the instructions.",
  };
}

export async function deleteUserAction() {
  const { userId: user } = await authActionHelper();

  const cookieStore = await cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {}
        },
      },
    }
  );

  if (user) {
    const { data, error } = await supabase.auth.admin.deleteUser(user);
    if (data) {
      supabase.auth.signOut();
    }
    if (error) return { error: "Could not delete user" };
  }

  return {
    success: "User deleted successfully",
  };
}
