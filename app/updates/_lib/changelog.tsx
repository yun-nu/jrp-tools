import StyledLink from "@/app/_components/StyledLink";
import { SiPlurk } from "react-icons/si";

/* eslint-disable react/no-unescaped-entities */
export const changelog = [
  {
    number: "03",
    date: "April 19th, 2025",
    content: (
      <>
        <p>
          Some of you might've experienced issues since yesterday, I'm really
          sorry about that. I was working on a few things behind the scenes to
          lighten the server load, and it looks like those changes caused a few
          hiccups. I'm still cleaning up the mess (and probably creating new
          ones in the process 😅), so if you run into any app-breaking problems,
          please let me know.
        </p>
        <p>
          On a related note, I've created a Plurk account for the app! You can
          find it at{" "}
          <StyledLink href="https://www.plurk.com/jrp_tools">
            <SiPlurk className="text-orange-500" /> jrp_tools
          </StyledLink>
          . I'll use it to post updates and announcements — including smaller
          ones that don't always make it here — so feel free to follow if you'd
          like to stay in the loop. You can also use it as a contact method,
          just keep in mind I might not be able to reply immediately.
        </p>

        <p>
          Now, onto the updates:
          <ul className="list-disc list-inside space-y-2">
            <li>
              Added a new column to the thread tracker: "Character". This column
              lets you filter by thread partners. Thanks to Lorna for the
              suggestion!
            </li>
            <li>
              To improve filtering, the search bar now works across multiple
              text columns: "type", "blurb", and "character". For example, if
              you're looking for a thread of the type "Network" that mentions
              "shenanigans" in the blurb, just type "network shenanigans" into
              the search bar — it'll show you all threads that match.
            </li>
          </ul>
        </p>
        <p>
          That's about it for this update! As always, feel free to reach out if
          you run into any bugs, have suggestions, or just want to share
          feedback. Thanks so much for your support. I really appreciate it!
        </p>
      </>
    ),
  },
  {
    number: "02",
    date: "April 16th, 2025",
    content: (
      <>
        <p>
          Huge thanks to everyone who signed up early — and just two quick
          heads-up!
        </p>
        <p>
          JRP Tools now has a shiny new URL:{" "}
          <StyledLink href="https://www.jrp-tools.com">
            www.jrp-tools.com
          </StyledLink>
          ! This domain change shouldn't affect your experience, but if you were
          logged in on the old URL, you might need to log in again.
        </p>
        <p>
          Additionally, a column for comment count has been added to the thread
          tracker table, along with an input field in the form. Big thanks to
          Jessi for suggesting it!
        </p>
      </>
    ),
  },
  {
    number: "01",
    date: "April 10th, 2025",
    content: (
      <>
        <p>
          This is the very first update, so let me start by saying thank you for
          checking out JRP Tools! If you've already signed up and are trying out
          the app, an even bigger thank you!
        </p>

        <p>
          I'd like to take this opportunity to remind you that this is an
          experimental app, subject to changes — or in the worst-case scenario,
          discontinuation. If it ever comes to that, a proper announcement will
          be made in advance to give users time to back up their threads (using
          the upcoming Backup feature).
        </p>
        <p>
          The app's initial features are introduced on the About page, so please
          check that out if you'd like to know more. And don't hesitate to
          report any bugs or issues you might come across. Suggestions and
          contributions are also very welcome!
        </p>
      </>
    ),
  },
];
