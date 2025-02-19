"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { signUpOTPAction } from "../signup/actions";

import { useRouter } from "next/navigation";
import { TbPasswordUser } from "react-icons/tb";
import { signUpOTPSchema } from "../_schemas/Auth";
import { InputWithLabel } from "./InputWithLabel";
import { Button } from "./ui/Button";
import { Form } from "./ui/Form";

export function SignUpOTP() {
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  const router = useRouter();

  const form = useForm<z.infer<typeof signUpOTPSchema>>({
    resolver: zodResolver(signUpOTPSchema),
    defaultValues: {
      email: "",
      emailConfirmation: "",
    },
  });

  const onSubmit = async () => {
    const result = await signUpOTPAction(form.getValues());
    if (result?.errors) {
      setMessage(result.message);
      setErrors(result.errors);
      return;
    } else {
      setMessage(result.message);
      router.refresh();
      form.reset(form.getValues());
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <InputWithLabel fieldTitle="Email" nameInSchema="email" />
        <InputWithLabel
          fieldTitle="Confirm Email"
          nameInSchema="emailConfirmation"
        />
        <Button type="submit">
          <TbPasswordUser /> Sign up with OTP
        </Button>

        {message ? <p className="text-base">{message}</p> : null}

        {errors ? (
          <div className="mb-10 text-red-500">
            {Object.keys(errors).map((key) => (
              <p key={key}>{`${key}: ${errors[key as keyof typeof errors]}`}</p>
            ))}
          </div>
        ) : null}
      </form>
    </Form>
  );
}

// export default function SignUpOTP() {
//   const [state, formAction, pending] = useActionState(
//     signUpOTPAction,
//     undefined
//   );

//   return (
//     <form action={formAction}>
//       <Input
//         id="email"
//         type="email"
//         label="Email"
//         description="Enter your email address"
//       />

//       <Input
//         id="emailConfirmation"
//         type="email"
//         label="Email confirmation"
//         description="Confirm your email address"
//       />

//       {state?.message && <p>{state.message}</p>}

//       <div className="flex flex-col gap-10 mt-10 items-center">
//         <SubmitButton
//           type="submit"
//           icon={<PiSignInBold />}
//           content={pending ? "Signing up" : "Sign up with OTP"}
//         />
//       </div>
//     </form>
//   );
// }
