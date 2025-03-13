import { MessageCircleQuestion } from "lucide-react";
import { SignUpOTP } from "../_components/SignUpOTP";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../_components/ui/Accordion";

export default function Page() {
  return (
    <section className="flex flex-col h-full gap-6 m-auto py-8 items-center">
      <p className="text-sm">
        Currently, JRP Tools only supports two sign up methods: passwordless
        (OTP), or through a Google account.
      </p>

      <Accordion type="single" collapsible className="lg:w-[800px]">
        <AccordionItem value="item-1">
          <AccordionTrigger>
            <div className="flex items-center gap-2 text-sm">
              <MessageCircleQuestion /> How does passwordless login work?
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <ul className="space-y-2 pl-10">
              <li>
                1. Create an account by providing an email address you have
                access to.
              </li>
              <li>
                2. Confirm your email by visiting the confirmation link, sent by
                Supabase Auth.
              </li>
            </ul>
            <p className="mt-6 pl-10">
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
