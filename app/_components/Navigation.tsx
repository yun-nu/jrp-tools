import Link from "next/link";
import SignOutButton from "./SignOutButton";
import { getUserId } from "../_lib/data-service";
import { createClient } from "../_lib/supabase-server";
import SignInButton from "./SignInButton";

export default async function Navigation() {
  const supabase = await createClient();
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  return (
    <nav className="z-10 text-xl">
      <ul className="flex gap-16 items-center">
        {!session ? (
          <SignInButton />
        ) : (
          <>
            <li>
              <Link
                href="/dashboard"
                className="hover:text-accent-400 transition-colors"
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                href="/profile"
                className="hover:text-accent-400 transition-colors"
              >
                User profile
              </Link>
            </li>
            <SignOutButton />
          </>
        )}
        {/* <li>
          {session?.user?.image ? (
            <Link
            href="/account"
            className="hover:text-accent-400 transition-colors flex items-center gap-4"
            >
              <img
                className="h-8 rounded-full"
                src={session.user.image}
                alt={session.user.name!}
                referrerPolicy="no-referrer"
              />
              <span>Guest area</span>
            </Link>
          ) : (
            <Link
              href="/account"
              className="hover:text-accent-400 transition-colors"
            >
              Guest area
            </Link>
          )}
        </li> */}
      </ul>
    </nav>
  );
}
