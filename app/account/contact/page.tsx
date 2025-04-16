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
import { MdEmail } from "react-icons/md";
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
            For anything from general suggestions to bug reports, feel free to
            drop me a message using the form below.
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
            If you&apos;re running into anything serious that&apos;s breaking
            the app, don&apos;t hesitate to reach out through one of the contact
            options below. I&apos;ll do my best to get back to you ASAP.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col xs:flex-row gap-4 sm:gap-2 justify-evenly h-full items-center">
          <a
            href="mailto:yunnu.dev@gmail.com"
            className="flex gap-2 items-center"
          >
            <MdEmail /> Email
          </a>

          <Separator
            orientation="vertical"
            className="h-0.5 w-full xs:h-6 xs:w-0.5"
          />

          <a
            href="https://www.dreamwidth.org/inbox/compose?user=yunnu"
            className="flex gap-2 items-center"
          >
            <SiDreamstime className="text-red-500" /> Dreamwidth
          </a>

          <Separator
            orientation="vertical"
            className="h-0.5 w-full xs:h-6 xs:w-0.5"
          />

          <a
            href="https://plurk.com/positron"
            className="flex gap-2 items-center"
          >
            <SiPlurk className="text-orange-600" /> Plurk
          </a>
        </CardContent>
      </Card>
    </div>
  );
}
