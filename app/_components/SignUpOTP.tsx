import { PiSignInBold } from "react-icons/pi";
import { signUpOTPAction } from "../signup/actions";
import { emailRegex } from "../utils/consts";
import Input from "./Input";
import SubmitButton from "./SubmitButton";

export default function SignUpOTP() {
  return (
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
        <SubmitButton icon={<PiSignInBold />} content="Sign up" />
      </div>
    </form>
  );
}
