import { PiSignInBold } from "react-icons/pi";

export default function SignInButton() {
  return (
    <button className="flex items-center gap-6 text-lg border border-primary-300 px-8 py-4 font-medium">
      <PiSignInBold />
      <span>Sign in with OTP</span>
    </button>
  );
}
