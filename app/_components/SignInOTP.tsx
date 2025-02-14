"use client";

import Link from "next/link";
import { useState } from "react";
import { signInOTPAction, verifyOTPLoginAction } from "../login/actions";
import { isActionError } from "../utils/error";
import { useMultiStepForm } from "../utils/useMultistepForm";
import Input from "./Input";
import SubmitButton from "./SubmitButton";

export type LoginDataProps = {
  email: string;
  OTPCode: string;
};

type LoginStepsProps = LoginDataProps & {
  updateFields: (fields: Partial<LoginDataProps>) => void;
};

export default function SignInOTP() {
  const [data, setData] = useState({
    email: "",
    OTPCode: "",
  } as LoginDataProps);
  const { step, next, isLastStep } = useMultiStepForm([
    <SignInOTPStep1 {...data} updateFields={updateFields} key={1} />,
    <SignInOTPStep2 {...data} updateFields={updateFields} key={2} />,
  ]);

  const handleOnSubmit = async () => {
    if (!isLastStep) {
      const res = await signInOTPAction(data.email);
      if (isActionError(res)) throw new Error(res.error);
      return next();
    }
    const res = await verifyOTPLoginAction(data);
    if (isActionError(res)) throw new Error(res.error);
    return;
  };

  function updateFields(fields: Partial<LoginDataProps>) {
    setData((prev) => {
      return { ...prev, ...fields };
    });
  }

  return (
    <>
      <form action={handleOnSubmit}>
        {step}

        <SubmitButton content={isLastStep ? "Log in" : "Next"} type="submit" />
      </form>
      <p>Or login with your Google account</p>

      <p>
        Don&apos;t have an account? <Link href="/signup">Sign up</Link>
      </p>
    </>
  );
}

function SignInOTPStep1({ email, updateFields }: LoginStepsProps) {
  return (
    <>
      <h2>Welcome back</h2>
      <p>Enter your email to receive your login code.</p>
      <Input
        id="email"
        type="email"
        label="Email"
        required
        autoFocus
        value={email}
        onChange={(e) => updateFields({ email: e.target.value })}
      />
    </>
  );
}

function SignInOTPStep2({ OTPCode, email, updateFields }: LoginStepsProps) {
  return (
    <>
      <p>
        Check your email address ({email}) and enter the 6-digit code below.
      </p>
      <Input
        type="text"
        max={6}
        id="OTPCode"
        label="OTP Code"
        value={OTPCode}
        onChange={(e) => updateFields({ OTPCode: e.target.value })}
        required
      />
    </>
  );
}
