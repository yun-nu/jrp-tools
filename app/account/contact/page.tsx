import { ContactForm } from "@/app/_components/ContactForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/Card";
import { Separator } from "@/app/_components/ui/Separator";
import { Metadata } from "next";
import Link from "next/link";
import { RiMailSendLine } from "react-icons/ri";
import { SiDreamstime, SiPlurk } from "react-icons/si";

export const metadata: Metadata = {
  title: "Contact - JRP Tools",
  description: "Offer general suggestions, report issues or get support",
};

export default function Page() {
  return (
    <div className="flex flex-col gap-4 max-w-screen-md">
      <Card>
        <CardHeader>
          <CardTitle>Contact Form</CardTitle>
          <CardDescription>
            For anything ranging from general suggestions to reporting bugs or
            issues, feel free to drop me a message in the form below.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ContactForm />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Support</CardTitle>
          <CardDescription>
            For granular help with app-breaking issues, please use one of the
            following contact methods below.
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
