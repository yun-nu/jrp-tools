"use server";

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { AuthActionHelper } from "../_lib/actions";
import { createClient } from "../_lib/supabase-server";
import {
  EmailAndConfirmation,
  emailAndConfirmationSchema,
} from "../_schemas/Auth";

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

  const { data, error } = await supabase.auth.updateUser({
    email: email,
    /// data: { displayName: },
  });

  if (error) return { error: "Could not update email" };

  return {
    success:
      "Please check both the new and old email addresses, and follow the instructions.",
  };
}

export async function deleteUserAction() {
  const { user } = await AuthActionHelper();

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
      /// !: header component
    }
    if (error) return { error: "Could not delete user" };
  }

  return {
    success: "User deleted successfully",
  };
}
