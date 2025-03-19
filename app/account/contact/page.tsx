import { ContactForm } from "@/app/_components/ContactForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/Card";
import { Separator } from "@/app/_components/ui/Separator";
import Link from "next/link";
import { RiMailSendLine } from "react-icons/ri";
import { SiDreamstime, SiPlurk } from "react-icons/si";

export default function Page() {
  return (
    <div className="flex flex-col gap-4 max-w-screen-md">
      <Card>
        <CardHeader>
          <CardTitle>Contact</CardTitle>
          <CardDescription>
            For anything ranging from general suggestions to non-app breaking
            bugs or issues, feel free to drop me a message in the form below.
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
            For more granular help, shoot me an email, PM on Plurk or DW, and
            I&apos;ll try to get back to you ASAP:
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 h-5 justify-evenly">
            <Link
              href="mailto:yunnu.dev@gmail.com"
              className="flex gap-2 items-center"
            >
              <RiMailSendLine /> Email
            </Link>

            <Separator orientation="vertical" />

            <Link
              href="https://www.dreamwidth.org/inbox/compose?user=yunnu"
              className="flex gap-2 items-center"
            >
              <SiDreamstime className="text-red-500" /> Dreamwidth
            </Link>

            <Separator orientation="vertical" />

            <Link
              href="https://plurk.com/positron"
              className="flex gap-2 items-center"
            >
              <SiPlurk className="text-orange-600" /> Plurk
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
