import Link from "next/link";
import { PiSignInBold } from "react-icons/pi";

export default function SignInButton() {
  return (
    <button className="py-3 px-5 hover:bg-primary-900 hover:text-primary-100 transition-colors flex items-center gap-4 font-semibold text-primary-200 w-full">
      <PiSignInBold />
      <Link href={"/login"}>Sign in</Link>
    </button>
  );
}
