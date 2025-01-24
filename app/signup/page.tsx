import Input from "../_components/Input";
import SignInGoogle from "../_components/SignInGoogle";
import SignInButton from "../_components/SignInOTP";
import { emailRegex } from "../utils/consts";
import { signUpOTPAction } from "./actions";

export default function Page() {
  return (
    <>
      <p>
        Create an account using your email, and use a One-Time-Password (OTP)
        that will be sent to your inbox to sign in.
      </p>
      <form action={signUpOTPAction}>
        <Input
          id="email"
          type="email"
          label="Email"
          description="Enter your email address"
          pattern={emailRegex}
        />

        <Input
          id="emailConfirmation"
          type="email"
          label="Email confirmation"
          description="Confirm your email address"
          pattern={emailRegex}
        />
        <div className="flex flex-col gap-10 mt-10 items-center">
          <SignInButton />
        </div>
      </form>

      {/* <form action={null}>
        <div className="flex flex-col gap-10 mt-10 items-center">
          <p>Or, alternatively, sign up using your Google account.</p>
          <SignInGoogle />
        </div>
      </form> */}
    </>
  );
}
