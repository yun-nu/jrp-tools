"use client";

import { useActionState } from "react";
import { PiSignInBold } from "react-icons/pi";
import { signUpOTPAction } from "../signup/actions";
import Input from "./Input";
import SubmitButton from "./SubmitButton";

export default function SignUpOTP() {
  const [state, formAction, pending] = useActionState(
    signUpOTPAction,
    undefined
  );

  return (
    <form action={formAction}>
      <Input
        id="email"
        type="email"
        label="Email"
        description="Enter your email address"
      />

      <Input
        id="emailConfirmation"
        type="email"
        label="Email confirmation"
        description="Confirm your email address"
      />

      {state?.message && <p>{state.message}</p>}

      <div className="flex flex-col gap-10 mt-10 items-center">
        <SubmitButton
          type="submit"
          icon={<PiSignInBold />}
          content={pending ? "Signing up" : "Sign up with OTP"}
        />
      </div>
    </form>
  );
}
