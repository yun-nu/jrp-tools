import Input from "../_components/Input";
import SignInButton from "../_components/SignInOTP";
import VerifyOTPCode from "../_components/VerifyOTPCode";
import { emailRegex } from "../utils/consts";
import { signInOTPAction, verifyOTPLoginAction } from "./actions";

export default function Page() {
  return (
    <>
      {/* <form action={signInOTPAction}> */}
      <form>
        <Input
          id="email"
          type="email"
          label="Email"
          description="Your email address"
          pattern={emailRegex}
        />
        <Input
          type="text"
          max={6}
          id="OTPCode"
          label="Enter your OTP code here"
        />
        {/* <div className="flex flex-col gap-10 mt-10 items-center">
          <SignInButton />
        </div> */}
        <button formAction={signInOTPAction}>Log in</button>
        <button formAction={verifyOTPLoginAction}>Verify</button>
      </form>

      <VerifyOTPCode />
    </>
  );
}
