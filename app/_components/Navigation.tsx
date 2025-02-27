import Link from "next/link";
import { PiSignInBold } from "react-icons/pi";
import { authActionHelper } from "../_lib/action-auth-helpers";
import LinkButton from "./LinkButton";
import SignOutButton from "./SignOutButton";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { RiUserSettingsLine } from "react-icons/ri";
import { IoSettingsOutline } from "react-icons/io5";

export default async function Navigation() {
  const { user } = await authActionHelper();

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
            <li className="text-base">
              <Link
                href="/dashboard"
                className="flex items-center gap-2 hover:text-accent-400 transition-colors"
              >
                <MdOutlineSpaceDashboard /> Dashboard
              </Link>
            </li>
            <li className="text-base">
              <Link
                href="/settings"
                className="flex  items-center gap-2 hover:text-accent-400 transition-colors"
              >
                <IoSettingsOutline /> Account settings
              </Link>
            </li>
            <SignOutButton />
          </>
        )}
      </ul>
    </nav>
  );
}
