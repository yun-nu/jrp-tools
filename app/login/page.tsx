import Input from "../_components/Input";
import SignInButton from "../_components/SignInOTP";
import VerifyOTPCode from "../_components/VerifyOTPCode";
import { emailRegex } from "../utils/consts";
import { signInOTPAction } from "./actions";

export default function Page() {
  return (
    <>
      <form action={signInOTPAction}>
        <Input
          id="email"
          type="email"
          label="Email"
          description="Your email address"
          pattern={emailRegex}
        />
        <div className="flex flex-col gap-10 mt-10 items-center">
          <SignInButton />
        </div>
      </form>

      <VerifyOTPCode />
    </>
  );
}
