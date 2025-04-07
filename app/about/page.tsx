import card from "@/public/card.jpg";
import { Metadata } from "next";
import Image from "next/image";
import { GiPlantSeed, GiThink } from "react-icons/gi";
import { RiFlowChart } from "react-icons/ri";
import StyledLink from "../_components/StyledLink";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../_components/ui/Accordion";

export const metadata: Metadata = {
  title: "About JRP Tools",
  description: "The purpose and origin of JRP Tools",
};

export default async function Page() {
  return (
    <Accordion
      type="single"
      collapsible
      className="w-full h-full max-w-screen-lg"
    >
      <AccordionItem value="item-1">
        <AccordionTrigger>
          <div className="flex items-center gap-2">
            <GiThink className="h-6 w-6" /> What is JRP Tools?
          </div>
        </AccordionTrigger>
        <AccordionContent className="space-y-4">
          <p>
            As of initial release, JRP Tools is a minimalistic thread tracking
            application for{" "}
            <StyledLink href="https://tvtropes.org/pmwiki/pmwiki.php/Main/JournalRoleplay">
              Journal-Based Roleplay
            </StyledLink>
            . While its main focus is on elements of the Dreamwidth role playing
            community, it should be able to accommodate to other RP communities
            that use similar journal platforms.
          </p>

          <p>
            But why &quot;tools&quot; when it&apos;s just a thread tracker, you
            ask...? Well, shareable <b>CR chart</b> and <b>Permissions</b> pages
            are two of the more ambitious features I&apos;d like to implement
            going forward, along with other minor features and QoL improvements.
          </p>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-2">
        <AccordionTrigger>
          <div className="flex items-center gap-2">
            <RiFlowChart className="h-6 w-6" /> Workflow summary
          </div>
        </AccordionTrigger>
        <AccordionContent className="space-y-4">
          <p>
            <b>One account</b> can store <b>multiple characters</b>, each with
            their own unique display name. This leaves the choice to use the
            same character page for multiple games, or to create a different
            page for each game, up to the user.
          </p>

          <p>
            Each character has a <b>public-facing</b> and a{" "}
            <b>private-facing</b> page. The private-facing page is where threads
            can be managed, and it is accessed from the <b>Thread Tracker</b>{" "}
            button in each character&apos;s card from the character list.
            <Image src={card} alt="Character Card sample" className="w-fit" />
            The public-facing page can be viewed by anyone with the link. You
            can view a sample for the test character pictured above{" "}
            <StyledLink
              href="http://jrp-tools.vercel.app/characters/test_character"
              type="new-window"
            >
              here
            </StyledLink>{" "}
            .
          </p>

          <p>
            Characters can be either <b>public</b> or <b>private</b>. Public
            characters will have their threads visible to anyone visiting their
            public-facing page. Private characters&apos; threads are only
            visible to their owner and don&apos;t have a public-facing page.
          </p>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-3">
        <AccordionTrigger>
          <div className="flex items-center gap-2">
            <GiPlantSeed className="h-6 w-6" />
            Origins and purpose
          </div>
        </AccordionTrigger>
        <AccordionContent className="space-y-4">
          <p>
            This project came to be not only because I wanted to challenge
            myself to grow as a developer, but also in an attempt to make a tool
            that hopefully can be useful to a fellow roleplayer. HTML thread
            trackers are a lot of fun to build and customize, but also hard to
            keep up to date, and the code itself can become a monstrosity
            that&apos;s difficult to maintain organized. Meanwhile, spreadsheet
            thread trackers appeal more to me in the maintainability department,
            but they still feel unnecessarily clunky, and limited in sorting or
            filtering options.
          </p>
          <p>
            This app is my vision of a thread tracker that is both easy to use
            and to share, built within my technical and financial limitations.
          </p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
