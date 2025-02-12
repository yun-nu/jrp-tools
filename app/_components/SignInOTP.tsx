"use client";

import { useState } from "react";
import { emailRegex } from "../utils/consts";
import { useMultiStepForm } from "../utils/useMultistepForm";
import Input from "./Input";
import SubmitButton from "./SubmitButton";
import { signInOTPAction, verifyOTPLoginAction } from "../login/actions";
import Link from "next/link";

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

  function updateFields(fields: Partial<LoginDataProps>) {
    setData((prev) => {
      return { ...prev, ...fields };
    });
  }

  const handleOnSubmit = () => {
    if (!isLastStep) {
      signInOTPAction(data.email);
      return next();
    }
    verifyOTPLoginAction(data);
  };

  return (
    <>
      <h1>Welcome back</h1>
      <p>Enter your email to receive your login code.</p>
      <form action={handleOnSubmit}>
        {step}

        <SubmitButton content={isLastStep ? "Log in" : "Next"} type="submit" />
      </form>
      <p>Or login with your Google account</p>

      <p>
        Don't have an account? <Link href="/signup">Sign up</Link>
      </p>
    </>
  );
}

function SignInOTPStep1({ email, updateFields }: LoginStepsProps) {
  return (
    <Input
      id="email"
      type="text"
      label="Email"
      required
      pattern={emailRegex}
      autoFocus
      value={email}
      onChange={(e) => updateFields({ email: e.target.value })}
    />
  );
}

function SignInOTPStep2({ OTPCode, updateFields }: LoginStepsProps) {
  return (
    <Input
      type="text"
      max={6}
      id="OTPCode"
      label="OTP Code"
      value={OTPCode}
      onChange={(e) => updateFields({ OTPCode: e.target.value })}
      required
    />
  );
}
