import { User } from "lucide-react";
import Link from "next/link";
import { PiSignInBold } from "react-icons/pi";
import { Button } from "./ui/Button";
import { cookies } from "next/headers";

export default async function HeaderUser() {
  const cookieStore = cookies();
  const email = (await cookieStore).get("logged-in-as")?.value;

  if (!email)
    return (
      <Button asChild size="sm" className="font-semibold md:ml-auto">
        <Link href="/login" prefetch={false}>
          <PiSignInBold /> Log in
        </Link>
      </Button>
    );

  return (
    <div className="md:ml-auto flex md:flex-1 sm:justify-between items-center">
      <Link
        href="/account/characters"
        className="flex flex-col text-xs sm:flex-row sm:text-sm ml-auto gap-2 items-center hover:text-primary/80 transition-colors font-semibold"
        title="Your account"
      >
        <User className="w-5 h-5 sm:w-6 sm:h-6" /> {email}
      </Link>
    </div>
  );
}
