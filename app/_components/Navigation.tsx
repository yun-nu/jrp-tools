import { User } from "lucide-react";
import Link from "next/link";
import { PiSignInBold } from "react-icons/pi";
import { authActionHelper } from "../_lib/action-auth-helpers";
import LinkButton from "./LinkButton";
import BreadcrumbHeader from "./BreadcrumbHeader";

export default async function Navigation() {
  const { userId: user } = await authActionHelper();

  if (!user)
    return (
      <LinkButton
        size="large"
        icon={<PiSignInBold />}
        href="/login"
        content="Log in"
      />
    );

  /// TODO: decide margin here in the first div - match w/ sidenav
  return (
    <div className="ml-20 flex flex-1 justify-between items-center">
      <BreadcrumbHeader />
      <Link
        href="/account"
        className="ml-auto flex items-center gap-2 hover:text-accent-400 transition-colors"
      >
        <User /> Account
      </Link>
    </div>
  );
}
