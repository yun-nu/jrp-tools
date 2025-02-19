"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useMultiStepForm } from "../_hooks/useMultistepForm";
import { SignInOTP, signInOTPSchema } from "../_schemas/Auth";
import { signInOTPAction, verifyOTPLoginAction } from "../login/actions";
import { InputWithLabel } from "./InputWithLabel";
import { Button } from "./ui/Button";
import { Form } from "./ui/Form";

export default function SignInOTPForm() {
  const form = useForm<z.infer<typeof signInOTPSchema>>({
    resolver: zodResolver(signInOTPSchema),
    defaultValues: {
      email: "",
      OTPCode: "",
    },
  });

  const { step, next, isLastStep } = useMultiStepForm([
    <SignInOTPStep1 key={1} />,
    <SignInOTPStep2 email={form.getValues("email")} key={2} />,
  ]);

  const onSubmit = async () => {
    if (!isLastStep) {
      const email = form.getValues("email");
      const resultStep1 = await signInOTPAction({ email });
      if (resultStep1?.error || resultStep1?.errors) {
        form.setError("email", {
          message: resultStep1.error || resultStep1.message,
        });
        return;
      } else return next();
    }
    const resultStep2 = await verifyOTPLoginAction(form.getValues());
    if (resultStep2?.error)
      form.setError("OTPCode", { message: resultStep2.error });
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {step}

          <Button type="submit">Submit</Button>
        </form>
      </Form>
      <p>Or login with your Google account</p>
      <p>
        Don&apos;t have an account? <Link href="/signup">Sign up</Link>
      </p>
    </>
  );
}

function SignInOTPStep1() {
  return (
    <>
      <h2>Welcome back</h2>
      <InputWithLabel
        fieldTitle="Enter your email to receive your login code."
        nameInSchema="email"
      />
    </>
  );
}

function SignInOTPStep2({ email }: Pick<SignInOTP, "email">) {
  return (
    <>
      <InputWithLabel
        fieldTitle={`Check your email address (${email}) and enter the 6-digit code below.`}
        nameInSchema="OTPCode"
      />
    </>
  );
}

// function SignInOTPStep1({ email, updateFields }: LoginStepsProps) {
//   return (
//     <>
//       <h2>Welcome back</h2>
//       <p>Enter your email to receive your login code.</p>
//       <Input
//         id="email"
//         type="email"
//         label="Email"
//         required
//         autoFocus
//         value={email}
//         onChange={(e) => updateFields({ email: e.target.value })}
//       />
//     </>
//   );
// }

// function SignInOTPStep2({ OTPCode, email, updateFields }: LoginStepsProps) {
//   return (
//     <>
//       <p>
//         Check your email address ({email}) and enter the 6-digit code below.
//       </p>
//       <Input
//         type="text"
//         max={6}
//         id="OTPCode"
//         label="OTP Code"
//         value={OTPCode}
//         onChange={(e) => updateFields({ OTPCode: e.target.value })}
//         required
//       />
//     </>
//   );
// }
