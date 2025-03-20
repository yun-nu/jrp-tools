import { User } from "lucide-react";
import Link from "next/link";
import { PiSignInBold } from "react-icons/pi";
import { getUserEmail } from "../_lib/action-auth-helpers";
import { Button } from "./ui/Button";

export default async function Navigation({
  user,
}: {
  user: string | undefined;
}) {
  const email = (await getUserEmail()) as string;

  if (!user)
    return (
      <Button asChild size="sm" className="font-semibold">
        <Link href="/login">
          <PiSignInBold /> Log in
        </Link>
      </Button>
    );

  return (
    <div className="ml-20 flex flex-1 sm:justify-between items-center">
      <Link
        href="/account"
        className="flex flex-col text-xs sm:flex-row sm:text-sm ml-auto gap-2 items-center hover:text-primary/80 transition-colors font-semibold"
        title="Your account"
      >
        <User className="w-5 h-5 sm:w-6 sm:h-6" /> {email}
      </Link>
    </div>
  );
}
