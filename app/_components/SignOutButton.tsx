import { PiSignOutBold } from "react-icons/pi";
import { signOutAction } from "../_lib/actions";

export default function SignOutButton() {
  return (
    <form action={signOutAction}>
      <button className="py-3 px-5 hover:bg-zinc-300 hover:text-zinc-900 transition-colors flex items-center gap-4 font-semibold text-primary-200 w-full">
        <PiSignOutBold />
        <span>Sign out</span>
      </button>
    </form>
  );
}
