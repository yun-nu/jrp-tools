import card from "@/public/card.jpg";
import Image from "next/image";
import { GiBullseye, GiFairyWand } from "react-icons/gi";
import { ImQuestion } from "react-icons/im";
import StyledLink from "../../_components/StyledLink";
import { MdOutlinePrivacyTip } from "react-icons/md";

export const aboutFAQItems = [
  {
    id: "what-is",
    icon: <ImQuestion className="h-6 w-6" />,
    title: "What is JRP Tools?",
    content: (
      <>
        <p>
          As of its initial release, JRP Tools is a minimalistic thread-tracking
          application designed for Journal-Based Roleplay. While it primarily
          caters to the Dreamwidth roleplaying community, it&apos;s flexible
          enough to support other RP platforms that use similar structures or
          concepts.{" "}
        </p>
        <p>
          <em>
            But why call it &quot;Tools&quot; when it&apos;s just a thread
            tracker
          </em>
          , you ask...? Well, that&apos;s just the beginning! Shareable
          Permissions and CR Chart are two of the more ambitious features I plan
          to add in the future, along with smaller quality-of-life improvements
          across the board.
        </p>
      </>
    ),
  },
  {
    id: "features",
    icon: <GiFairyWand className="h-6 w-6" />,
    title: "Key features",
    content: (
      <ul className="space-y-8">
        <li className="flex flex-col gap-1">
          <span className="font-semibold">One place for all your muses.</span>
          <p>
            You can store multiple characters under one account, each with a
            unique display name. Whether you use a single character page to keep
            threads from multiple games or create a new one for each game —
            it&apos;s completely up to you.
          </p>
        </li>

        <div className="flex flex-col gap-2 items-center text-center">
          <Image
            src={card}
            alt="Character Card sample"
            className="w-fit border-secondary border-2 rounded-lg shadow-sm"
          />
          <span className="text-xs">
            Sample of a character card as seen from the character list
          </span>
        </div>

        <li className="flex flex-col gap-2">
          <span className="font-semibold">Go public or stay private.</span>
          <p>
            Characters can be set to either public or private. Threads for
            public characters are visible to anyone visiting their public-facing
            page, while private characters&apos; threads are only visible to
            their owner. You can easily toggle between public and private using
            the edit button on the character card.
          </p>
          <p>
            As the name suggests, public-facing pages can be viewed by anyone
            with the link. You can{" "}
            <StyledLink
              href="http://jrp-tools.vercel.app/characters/test_character"
              type="new-window"
            >
              check out a sample
            </StyledLink>{" "}
            using the test character shown above. The private-facing page is
            where you can manage threads. It&apos;s accessible via the Thread
            Tracker button on each character&apos;s card in your character list.
          </p>
        </li>
      </ul>
    ),
  },
  {
    id: "privacy",
    icon: <MdOutlinePrivacyTip className="h-6 w-6" />,
    title: "User privacy",
    content: (
      <ul className="space-y-8">
        <li className="flex flex-col gap-1">
          <span className="font-semibold">RPer-first app.</span>
          <p>
            This is a small passion project, designed to be low-pressure and
            user-first. Signing up is quick and easy: no personal info required
            beyond a working email, which is only used to save your characters
            and threads.
          </p>
        </li>

        <li className="flex flex-col gap-1">
          <span className="font-semibold">
            This cookie jar holds 4 cookies.
          </span>
          <p>
            They&apos;re used only to keep you logged in, remember your
            preferences, and personalize the interface. RP Tools doesn&apos;t
            track you, and it doesn&apos;t share your data. Ever.
          </p>
        </li>
      </ul>
    ),
  },
  {
    id: "origins",
    icon: <GiBullseye className="h-6 w-6" />,
    title: "Origins and purpose",
    content: (
      <>
        <p>
          This project came to life not just as a personal challenge to grow as
          a developer, but also as an attempt to create a tool that might be
          useful to fellow roleplayers. HTML thread trackers are a lot of fun to
          build and customize, but they can be tough to keep updated, and the
          code often turns into a monstrosity that&apos;s hard to maintain.
          Spreadsheet trackers, on the other hand, are easier to manage, but
          they tend to feel clunky and make simple tasks like filtering or
          sorting more complicated than they need to be for the casual user.
        </p>
        <p>
          This app is my vision of a thread tracker that&apos;s both easy to use
          and easy to share — built with the technical knowledge I&apos;ve
          picked up along the way.
        </p>
      </>
    ),
  },
];
