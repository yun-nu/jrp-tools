import { FaGoogle } from "react-icons/fa6";
import { TbPasswordUser } from "react-icons/tb";
import SubmitButton from "../_components/SubmitButton";

export default function Page() {
  return (
    <>
      <p>
        Currently, RP-Tools only supports passwordless sign ups through one-time
        passwords, or through a Google account.
      </p>
      <h2 className="text-2xl">To sign up with a One-time password:</h2>
      <ul>
        <li>
          1. Create an account by providing an email address you have access to.
        </li>
        <li>
          2. Confirm your email by visiting the confirmation link, sent by
          Supabase Auth.
        </li>
      </ul>
      <p>
        Subsequent logins will require the email provided, and a new code will
        be sent with each login attempt.
      </p>
      <SubmitButton icon={<TbPasswordUser />} content="Sign up with OTP" />
      <SubmitButton icon={<FaGoogle />} content="Sign up with Google" />
    </>
  );
}
