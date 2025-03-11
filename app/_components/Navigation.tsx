import { User } from "lucide-react";
import Link from "next/link";
import { PiSignInBold } from "react-icons/pi";
import { authActionHelper, getUserEmail } from "../_lib/action-auth-helpers";
import LinkButton from "./LinkButton";
import BreadcrumbHeader from "./BreadcrumbHeader";

export default async function Navigation() {
  const { userId: user } = await authActionHelper();
  const email = (await getUserEmail()) as string;

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
      <Link
        href="/account"
        className="ml-auto flex gap-2 items-center hover:text-primary/80 transition-colors text-sm font-semibold"
        title="Your account"
      >
        <User /> {email}
      </Link>
    </div>
  );
}
