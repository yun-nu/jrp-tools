import { FaGoogle } from "react-icons/fa6";
import { signInGoogleAction } from "../login/actions";
import { EmailAndConfirmationForm } from "./EmailAndConfirmationForm";
import { Button } from "./ui/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/Card";

export function SignUpOTP() {
  return (
    <Card className="min-w-[300px] max-w-[320px]">
      <CardHeader>
        <CardTitle>Sign up</CardTitle>
        <CardDescription>Sign up passwordlessly</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <EmailAndConfirmationForm btnDescription="Sign up" />
      </CardContent>
      <CardFooter>
        <Button type={"button"} onClick={signInGoogleAction} className="w-full">
          <FaGoogle /> Sign up with Google
        </Button>
      </CardFooter>
    </Card>
  );
}
