import { FaGoogle } from "react-icons/fa6";
import SignInOTPForm from "../_components/SignInOTP";
import { Button } from "../_components/ui/Button";
import { signInGoogleAction } from "./actions";

export default function Page() {
  return (
    <>
      <SignInOTPForm />
      <Button type={"button"} onClick={signInGoogleAction}>
        <FaGoogle /> Sign in with Google
      </Button>
    </>
  );
}
