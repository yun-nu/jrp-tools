import { signUpOTPAction } from "../signup/actions";
import { EmailAndConfirmationForm } from "./EmailAndConfirmationForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/Card";

export function SignUpOTP() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sign up</CardTitle>
        <CardDescription>Sign up passwordlessly</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <EmailAndConfirmationForm
          action={signUpOTPAction}
          btnDescription="Sign up"
        />
      </CardContent>
    </Card>
  );

  // const [message, setMessage] = useState("");
  // const [errors, setErrors] = useState({});
  // const router = useRouter();

  // const form = useForm<z.infer<typeof emailAndConfirmationSchema>>({
  //   resolver: zodResolver(emailAndConfirmationSchema),
  //   defaultValues: {
  //     email: "",
  //     emailConfirmation: "",
  //   },
  // });

  // const onSubmit = async () => {
  //   const result = await signUpOTPAction(form.getValues());
  //   if (result?.errors) {
  //     setMessage(result.message);
  //     setErrors(result.errors);
  //     return;
  //   } else {
  //     setMessage(result.message);
  //     router.refresh();
  //     form.reset(form.getValues());
  //   }
  // };
  // return (
  //   <Form {...form}>
  //     <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
  //       <InputWithLabel fieldTitle="Email" nameInSchema="email" />
  //       <InputWithLabel
  //         fieldTitle="Confirm Email"
  //         nameInSchema="emailConfirmation"
  //       />
  //       <Button type="submit">
  //         <TbPasswordUser /> Sign up with OTP
  //       </Button>

  //       {message ? <p className="text-base">{message}</p> : null}

  //       {errors ? (
  //         <div className="mb-10 text-red-500">
  //           {Object.keys(errors).map((key) => (
  //             <p key={key}>{`${key}: ${errors[key as keyof typeof errors]}`}</p>
  //           ))}
  //         </div>
  //       ) : null}
  //     </form>
  //   </Form>
  // );
}
