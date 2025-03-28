import { CircleAlert, MessageCircleQuestion } from "lucide-react";
import { SignUpOTP } from "../_components/SignUpOTP";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../_components/ui/Accordion";
import StyledLink from "../_components/StyledLink";

export default function Page() {
  return (
    <section className="flex flex-col md:flex-row-reverse md:gap-16 gap-8 items-center">
      <SignUpOTP />
      <Accordions />
    </section>
  );
}

function Accordions() {
  return (
    <Accordion type="single" collapsible className="max-w-[350px] md:w-[400px]">
      <AccordionItem value="item-1">
        <AccordionTrigger>
          <div className="flex items-center gap-2">
            <MessageCircleQuestion /> How does passwordless sign up work?
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <ul className="space-y-2">
            <li>
              1. Create an account by providing an email address you have access
              to.
            </li>
            <li>
              2. Confirm your email by visiting the confirmation link, sent by
              Supabase Auth.
            </li>
          </ul>
          <p className="mt-6">
            To login, use the the code that will be sent to the registered
            email. Each login attempt will generate a new, expirable code.
          </p>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-2">
        <AccordionTrigger>
          <div className="flex items-center gap-2">
            <CircleAlert />
            Note about signing up with Google
          </div>
        </AccordionTrigger>
        <AccordionContent className="space-y-4">
          <p>
            On the consent page, when prompted to login or choose an account to
            continue to this application, instead of &quot;JRP Tools&quot;, the
            name shown might be:
            <b className="block my-2">zesrktxbteiqseaumjpa.supabase.co</b>
          </p>

          <p>
            Don&apos;t be alarmed by the weird URL, this is JRP Tools&apos;
            domain on Supabase. This URL is shown instead of the website name
            because of{" "}
            <StyledLink href="https://supabase.com/docs/guides/auth/social-login/auth-google?queryGroups=platform&platform=web&queryGroups=environment&environment=client#google-consent-screen">
              Supabase&apos;s free tier
            </StyledLink>{" "}
            limitation.
          </p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
