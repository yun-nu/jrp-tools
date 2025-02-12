import { verifyOTPLoginAction } from "../login/actions";
import Input from "./Input";
import SubmitButton from "./SubmitButton";

export default function VerifyOTPCode() {
  return (
    <>
      <Input
        type="text"
        max={6}
        id="OTPCode"
        label="Enter your OTP code here"
      />
      <SubmitButton action={verifyOTPLoginAction} content="Verify" />
    </>
  );
}
