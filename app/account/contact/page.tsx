import { ContactForm } from "@/app/_components/ContactForm";
import Link from "next/link";
import { RiMailSendLine } from "react-icons/ri";
import { SiDreamstime, SiPlurk } from "react-icons/si";

export default function page() {
  return (
    <div>
      <p>
        For general suggestions, bugs or issues, feel free to drop me a message
        in the form below. Alternatively, you can{" "}
        <Link
          href="https://github.com/yun-nu/rp-tools"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-4"
        >
          open an issue or PR on github
        </Link>
        .
      </p>

      <ContactForm />

      <p>
        For more granular help, shoot me an email, or PM on Plurk or DW, and
        I'll try to get back to you ASAP:
        <ul className="flex gap-4 justify-between">
          <li className="flex gap-2 items-center">
            <RiMailSendLine />{" "}
            <Link href="mailto:yunnu.dev@gmail.com">Email</Link>
          </li>
          <li className="flex gap-2 items-center">
            <SiDreamstime className="text-red-500" />
            <Link href="https://www.dreamwidth.org/inbox/compose?user=yunnu">
              Dreamwidth
            </Link>
          </li>
          <li className="flex gap-2 items-center">
            <SiPlurk className="text-orange-600" />
            <Link href="https://plurk.com/positron">Plurk</Link>
          </li>
        </ul>
      </p>
    </div>
  );
}
