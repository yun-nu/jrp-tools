import Link from "next/link";
import { PiSignInBold } from "react-icons/pi";
import { AuthActionHelper } from "../_lib/actionsAuth";
import LinkButton from "./LinkButton";
import SignOutButton from "./SignOutButton";

export default async function Navigation() {
  const { user } = await AuthActionHelper();

  return (
    <nav className="z-10 text-xl">
      <ul className="flex gap-16 items-center">
        {!user ? (
          <LinkButton
            size="large"
            icon={<PiSignInBold />}
            href="/login"
            content="Log in"
          />
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
      </ul>
    </nav>
  );
}
