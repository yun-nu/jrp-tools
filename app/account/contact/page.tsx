import { ContactForm } from "@/app/_components/ContactForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/Card";
import Link from "next/link";
import { RiMailSendLine } from "react-icons/ri";
import { SiDreamstime, SiPlurk } from "react-icons/si";

export default function page() {
  return (
    <div className="flex flex-col gap-4 max-w-screen-md">
      <Card>
        <CardHeader>
          <CardTitle>Suggestion box</CardTitle>
          <CardDescription>
            For general suggestions, non-app breaking bugs or issues, feel free
            to drop me a message in the form below.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ContactForm />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>SOS</CardTitle>
          <CardDescription>
            For more granular help, shoot me an email, or PM on Plurk or DW, and
            I&apos;ll try to get back to you ASAP:
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="flex gap-4 justify-evenly">
            <li>
              <Link
                href="mailto:yunnu.dev@gmail.com"
                className="flex gap-2 items-center"
              >
                <RiMailSendLine /> Email
              </Link>
            </li>
            <li>
              <Link
                href="https://www.dreamwidth.org/inbox/compose?user=yunnu"
                className="flex gap-2 items-center"
              >
                <SiDreamstime className="text-red-500" /> Dreamwidth
              </Link>
            </li>
            <li>
              <Link
                href="https://plurk.com/positron"
                className="flex gap-2 items-center"
              >
                <SiPlurk className="text-orange-600" /> Plurk
              </Link>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
