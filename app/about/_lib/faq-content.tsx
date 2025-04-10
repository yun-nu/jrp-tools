import card from "@/public/card.jpg";
import Image from "next/image";
import { GiBullseye, GiFairyWand } from "react-icons/gi";
import { ImQuestion } from "react-icons/im";
import StyledLink from "../../_components/StyledLink";

export const aboutFAQItems = [
  {
    id: "what-is",
    icon: <ImQuestion className="h-6 w-6" />,
    title: "What is JRP Tools?",
    content: (
      <>
        <p>
          As of initial release, JRP Tools is a minimalistic thread tracking
          application for{" "}
          <StyledLink href="https://tvtropes.org/pmwiki/pmwiki.php/Main/JournalRoleplay">
            Journal-Based Roleplay
          </StyledLink>
          . While its main focus is on elements of the Dreamwidth role playing
          community, it should be able to accommodate to other RP communities
          that use similar concepts or platforms.
        </p>

        <p>
          But why &quot;tools&quot; when it&apos;s just a thread tracker, you
          ask...? Well, shareable Permissions page and CR Chart are two of the
          more ambitious features I&apos;d like to implement going forward,
          along with other minor features and QoL improvements to the whole app.
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
