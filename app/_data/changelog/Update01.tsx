/* eslint-disable react/no-unescaped-entities */
import Link from "next/link";
import { LuGithub } from "react-icons/lu";
import { RiMailSendLine } from "react-icons/ri";
import Update from "./Template";

export function Update01() {
  return (
    <Update number={"01"} title={"Launch!"}>
      <p>
        This is the very first update, so let me start it by saying thank you
        for signing up to JRP-Tools!
      </p>

      <p>
        There is one very important topic I want to highlight right off the bat.
        This is an experimental app, running on a free database with (lenient)
        data usage restrictions. This means that aside from bugs crawling
        around, the app might become slow or unaccessible under heavy load.
      </p>
      <p>
        At the current point, I'm not expecting heavy database usage, which is
        why I launched this app open for everyone. I'll be keeping a close eye
        on any potential bottlenecks, and any major announcements will be made
        here on this page.
      </p>

      <p>
        Please don't hesitate to report any bugs or issues you might stumble
        into. Suggestions and contributions are also welcome!
      </p>

      <p>
        <Link
          href="/account/contact"
          className="text-sm flex gap-2 items-center underline underline-offset-4"
        >
          <RiMailSendLine /> Contact form
        </Link>
        <Link
          href="https://github.com/yun-nu/rp-tools"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm flex gap-2 items-center underline underline-offset-4"
        >
          <LuGithub /> Open a PR or issue on github
        </Link>
      </p>
    </Update>
  );
}
