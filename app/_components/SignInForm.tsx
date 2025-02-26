"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useMultiStepForm } from "../_hooks/useMultistepForm";
import { SignInOTP, signInOTPSchema } from "../_schemas/Auth";
import {
  signInGoogleAction,
  signInOTPAction,
  verifyOTPLoginAction,
} from "../login/actions";
import { InputWithLabel } from "./InputWithLabel";
import { Button } from "./ui/Button";
import { Form } from "./ui/Form";
import { startTransition } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/Card";
import { FaGoogle } from "react-icons/fa6";

export default function SignInForm() {
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

  const onSubmit = () => {
    startTransition(async () => {
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
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Welcome back</CardTitle>
        <CardDescription>
          Enter your email to receive your login code.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {step}
            <Button type="submit" className="w-full">
              Submit
            </Button>
          </form>
        </Form>
        <Button type={"button"} onClick={signInGoogleAction} className="w-full">
          <FaGoogle /> Sign in with Google
        </Button>
      </CardContent>
      <CardFooter>
        <p className="text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="underline underline-offset-4">
            Sign up
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}

function SignInOTPStep1() {
  return <InputWithLabel fieldTitle="Email" nameInSchema="email" />;
}

function SignInOTPStep2({ email }: Pick<SignInOTP, "email">) {
  return (
    <>
      <span className="text-sm text-muted-foreground text-balance"></span>
      <InputWithLabel
        fieldTitle={`Enter the 6-digit code`}
        nameInSchema="OTPCode"
        description={`Sent to: ${email}`}
      />
    </>
  );
}
