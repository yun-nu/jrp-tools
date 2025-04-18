"use server";

import { getUserId } from "@/app/_lib/auth";
import { createClient as createServerClient } from "@/app/_lib/supabase-server";
import {
  EmailAndConfirmation,
  emailAndConfirmationSchema,
} from "@/app/_schemas/Auth";
import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";

// export async function updateEmailAction(input: EmailAndConfirmation) {
//   const parsed = emailAndConfirmationSchema.safeParse(input);

//   if (!parsed.success) {
//     return {
//       message: "Submission Failed",
//       errors: parsed.error.flatten().fieldErrors,
//     };
//   }

//   const supabase = await createServerClient();

//   const { email: parsedEmail } = parsed.data;

//   const { error } = await supabase.auth.updateUser(
//     {
//       email: parsedEmail,
//     },
//     {
//       emailRedirectTo: `${process.env.ROOT_URL}/account/settings/email-confirmation`,
//     }
//   );

//   if (error?.status === 422) return { error: "Email already in use" };

//   if (error) return { error: "Could not update email" };

//   return {
//     success:
//       "Change requested successfully. Please check both the new and old email addresses.",
//   };
// }

export async function deleteUserAction() {
  const userId = await getUserId();

  if (!userId || typeof userId !== "string") return { error: "User not found" };

  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { error } = await supabaseAdmin.auth.admin.deleteUser(userId);

  if (error) return { error: "Could not delete account" };

  const cookieStore = await cookies();
  const allCookies = cookieStore.getAll();

  for (const { name } of allCookies) {
    await cookieStore.set(name, "", { maxAge: -1, path: "/" });
  }

  return {
    success: "Account deleted successfully",
  };
}
