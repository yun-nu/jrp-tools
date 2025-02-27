import { FaGoogle } from "react-icons/fa6";
import { TbPasswordUser } from "react-icons/tb";
import SubmitButton from "../_components/SubmitButton";
import { SignUpOTP } from "../_components/SignUpOTP";
import { Button } from "../_components/ui/Button";
import { signInGoogleAction } from "../login/actions";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../_components/ui/Accordion";
import { MessageCircleQuestion } from "lucide-react";

export default function Page() {
  return (
    <section className="max-w-fit">
      <p>
        Currently, RP-Tools only supports passwordless sign ups through One-time
        passwords, or through a Google account.
      </p>

      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>
            <MessageCircleQuestion /> How does passwordless login work?
          </AccordionTrigger>
          <AccordionContent>
            <ul>
              <li>
                1. Create an account by providing an email address you have
                access to.
              </li>
              <li>
                2. Confirm your email by visiting the confirmation link, sent by
                Supabase Auth.
              </li>
            </ul>
            <p>
              Subsequent logins will require the email provided, and a new code
              will be sent with each login attempt.
            </p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <SignUpOTP />
    </section>
  );
}
