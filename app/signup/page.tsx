import { FaGoogle } from "react-icons/fa6";
import { TbPasswordUser } from "react-icons/tb";
import SubmitButton from "../_components/SubmitButton";
import { SignUpOTP } from "../_components/SignUpOTP";

export default function Page() {
  return (
    <>
      <p>
        Currently, RP-Tools only supports passwordless sign ups through One-time
        passwords, or through a Google account.
      </p>
      <div className="">
        <h2 className="text-xl">How passwordless login works</h2>
        <ul>
          <li>
            1. Create an account by providing an email address you have access
            to.
          </li>
          <li>
            2. Confirm your email by visiting the confirmation link, sent by
            Supabase Auth.
          </li>
        </ul>
      </div>
      <p>
        Subsequent logins will require the email provided, and a new code will
        be sent with each login attempt.
      </p>
      <SignUpOTP />
      <SubmitButton
        type={"button"}
        icon={<FaGoogle />}
        content="Sign up with Google"
      />
    </>
  );
}
