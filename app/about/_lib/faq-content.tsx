import Image from "next/image";
import { GiBullseye, GiFairyWand } from "react-icons/gi";
import { ImQuestion } from "react-icons/im";
import StyledLink from "../../_components/StyledLink";
import card from "@/public/card.jpg";

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
          <span className="font-semibold">
            One account, multiple characters
          </span>
          <p>
            One account can store multiple characters, each with their own
            unique display name. This leaves the choice to use the same
            character page for multiple games, or to create a different page for
            each game, up to the user.
          </p>
        </li>

        <div className="flex flex-col gap-2 items-center">
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
          <span className="font-semibold">
            Easily share your threads, or keep them private
          </span>
          <p>
            Characters can be either public or private. Public characters will
            have their threads visible to anyone visiting their public-facing
            page. Private characters&apos; threads are only visible to their
            owner, meaning private characters don&apos;t have a public-facing
            page. You can easily toggle between public and private states from
            the edit button in the character card.
          </p>
          <p>
            As the name suggests, public-facing pages can be viewed by anyone
            with the link. You can{" "}
            <StyledLink
              href="http://jrp-tools.vercel.app/characters/test_character"
              type="new-window"
            >
              view a sample
            </StyledLink>{" "}
            for the test character pictured above. The private-facing page is
            where threads can be managed, and can be accessed from the{" "}
            <b>Thread Tracker</b> button in each character&apos;s card from the
            character list.
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
          This project came to be not only because I wanted to challenge myself
          and grow as a developer, but also in an attempt to make a tool that
          hopefully can be useful to a fellow roleplayer. HTML thread trackers
          are a lot of fun to build and customize, but also hard to keep up to
          date, and the code itself can become a monstrosity that&apos;s
          difficult to maintain organized. Meanwhile, spreadsheet thread
          trackers appeal more to me in the maintainability department, but they
          still feel unnecessarily clunky, and limited in sorting or filtering
          options.
        </p>
        <p>
          This app is my vision of a thread tracker that is both easy to use and
          to share, built within my current technical and financial limitations.
        </p>
      </>
    ),
  },
];
