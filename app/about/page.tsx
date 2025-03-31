import { Metadata } from "next";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../_components/ui/Accordion";
import { GiThink } from "react-icons/gi";
import { BsPersonWorkspace } from "react-icons/bs";
import StyledLink from "../_components/StyledLink";
import { RiFlowChart } from "react-icons/ri";
import { HowTo } from "../_components/HowTo";

export const metadata: Metadata = {
  title: "About JRP Tools",
};

export default async function Page() {
  return (
    <Accordion
      type="single"
      collapsible
      className="w-full h-full max-w-screen-md"
    >
      <AccordionItem value="item-1">
        <AccordionTrigger>
          <div className="flex items-center gap-2">
            <GiThink className="h-6 w-6" /> What is JRP Tools, and its origins
          </div>
        </AccordionTrigger>
        <AccordionContent className="space-y-4">
          <p>
            As of initial release, JRP Tools is a minimalistic thread tracking
            application for{" "}
            <StyledLink href="https://tvtropes.org/pmwiki/pmwiki.php/Main/JournalRoleplay">
              Journal-Based Roleplay
            </StyledLink>
            .{" "}
          </p>

          <p>
            While its main focus is on elements of the Dreamwidth role playing
            community (the one I, the developer, am most familiar with), it
            should be able to accommodate to other RP communities that use
            similar journal platforms.
          </p>

          <p>
            As for the motivations, this project came to be not only because I
            wanted to challenge myself as an aspiring developer, but also in an
            attempt to make a tool that hopefully can be useful to a fellow
            roleplayer. HTML thread trackers are a lot of fun to build and
            customize, but also hard to keep up to date, and the code itself can
            become a monstrosity that&apos;s tedious to maintain. Meanwhile,
            spreadsheet thread trackers appeal more to me in the maintainability
            department, but they still feel unnecessarily clunky, and limited in
            sorting or filtering options.
          </p>
          <p>
            This app is my vision of a thread tracker that is easy to use and to
            share, built within my technical and financial limitations.
          </p>

          <p>
            But why &quot;tools&quot; when it&apos;s just a thread tracker, you
            ask...? Well, shareable <b>CR chart</b> and <b>Permissions</b> pages
            are two of the more ambitious features I&apos;d like to implement
            going forward, if feasible.
          </p>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-2">
        <AccordionTrigger>
          <div className="flex items-center gap-2">
            <RiFlowChart className="h-6 w-6" />
            Step by step workflow
          </div>
        </AccordionTrigger>
        <AccordionContent className="space-y-4">
          <HowTo />
          <p></p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
