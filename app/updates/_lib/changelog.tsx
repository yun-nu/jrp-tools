import StyledLink from "@/app/_components/StyledLink";
import { SiPlurk } from "react-icons/si";

/* eslint-disable react/no-unescaped-entities */
export const changelog = [
  {
    number: "06",
    date: "May 21th, 2025",
    content: (
      <>
        <p>
          This update is a bit of a brain teaser... and honestly, it might click
          better once you try it out for yourself. That said, here's a breakdown
          of what's new, what's changed, and what to keep in mind — including
          yet another apology from me for accidentally resetting the comment
          counts on ongoing threads during testing (lesson learned... 😅).
        </p>
        <ul className="mt-4 list-disc list-inside space-y-4">
          <li>
            <b>OOC Tab</b>
            <p>
              A new tab has been added specifically for OOC threads, like
              plotting posts and other out-of-character content. It should help
              keep things tidy and separate from your main threads! Thanks to
              plurk user icqt for the suggestion!
            </p>
          </li>
        </ul>
        <p>
          Following lain's suggestion about keeping separate counts for each
          month (and after a lot of consideration) I've decided to go with just
          two types of counts:
        </p>
        <ul className="mt-4 list-disc list-inside space-y-4">
          <li>
            <b>Current count</b>
            <ul className="ml-4 space-y-2">
              <li>
                - This tracks the number of comments for the current month.
              </li>
              <li>
                <span className="text-red-500 font-semibold">
                  - It automatically resets in the database on the 1st of each
                  month at midnight UTC.
                </span>
              </li>
              <li>
                - Updating the current month count will also update the total
                comment count automatically.
              </li>
            </ul>
          </li>
          <li>
            <b>Total count</b>
            <ul className="ml-4 space-y-2">
              <li>
                - This works just like the original count, and tracks the
                overall total number of comments.
              </li>
              <li>
                - The total comment count won't change when the month rolls over
                — unless you update the current month count, which updates both.{" "}
              </li>
              <li>
                - You can also update the total count separately without
                affecting the current month count.
              </li>
            </ul>
          </li>
          <p>
            Both the current month and total counts are shown right on the
            button, so you can quickly see and compare them at a glance. To
            update either count, just click the button as usual. The modal will
            pop up for editing.
          </p>
        </ul>
        <p>
          And now, a quick look at changes to existing features, plus some new
          additions:
        </p>
        <ul className="mt-4 list-disc list-inside space-y-4">
          <li>
            <b>Activity Range Filter</b>
            <p>
              {" "}
              To match the updated counting system, the activity range filter
              can now search using:
            </p>
            <ul className="ml-4 space-y-2">
              <li>- Only the current month's count</li>
              <li>- Only the total count</li>
              <li>- Or a combination of both!</li>
            </ul>
          </li>

          <li>
            <b>AC Highlighter</b>
            <ul className="ml-4 space-y-2">
              <li>
                - Highlighting now only uses the current month's comment count.
              </li>
              <li>
                - If you check the "Used for AC" box on a thread, that thread
                will be excluded from highlighting.
              </li>
              <li>
                - New Highlight options:
                <ul className="ml-4 space-y-2">
                  <li>
                    Choose Oldest or Newest match — both always based on finding
                    the smallest sum, using the AC Length and optional min/max
                    values set on the character page.
                  </li>
                  <li>
                    If min and max aren't set, defaults to highlighting single
                    threads that match AC length. If set, the app searches all
                    threads in the current tab to find the first combination
                    within the min/max range that meets or exceeds the target
                    sum, then highlights those threads.
                  </li>
                </ul>
              </li>
              <li>
                - Highlight by timeframe:
                <br />
                <ul className="ml-4 space-y-2">
                  <li>
                    The Timeframe option lets you highlight threads from the
                    past few months. Here's how it works:
                  </li>
                  <li>0 = Only highlights threads from the current month</li>
                  <li>1 = Includes current month + last month</li>
                  <li>2 = Includes current month + the past 2 months</li>
                  <li>...and so on!</li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
        <p>
          And that's about it! This one was a bit of a head-scratcher to build
          and explain, so if anything feels confusing or weird, feel free to
          poke me. Otherwise, go wild testing things out and thanks again for
          the awesome ideas that helped shape it!
        </p>
      </>
    ),
  },
  {
    number: "05",
    date: "May 6th, 2025",
    content: (
      <>
        <p>A small update for once!</p>
        <ul className="mt-4 list-disc list-inside space-y-4">
          <li>
            <b>Dropped Tab:</b>
            <p>
              A "Dropped" tab was added to the threads menu to help distinguish
              between dropped and finished threads. Thank you to plurk user
              Atompunk for the suggestion!
            </p>
          </li>
          <li>
            <b>Export Option</b>
            <p>
              You can now export your threads in CSV format (plain text) —
              designed as a lightweight backup option. The export button is
              available in the thread tracker and will download a CSV file
              containing all threads that match the selected status (ongoing,
              finished, or dropped).
            </p>
          </li>
        </ul>
        <p>As always, thanks for all the support and feedback!</p>
      </>
    ),
  },
  {
    number: "04",
    date: "April 29th, 2025",
    content: (
      <>
        <p>
          The logic shift from the client side to the server side saga
          continues! This update includes some internal tweaks aimed at
          improving performance and long-term maintainability. It also comes
          with some handy new features to make tracking AC proofs easier!
        </p>
        <p>
          <b>Heads up:</b> These changes may cause users to be logged out of the
          app. Sorry for the inconvenience, and thank you (again) for your
          patience as things evolve under the hood.
        </p>
        <div>
          Without further ado, these are the new features:
          <ul className="mt-4 list-disc list-inside space-y-4">
            <li>
              <b>Activity Range Filter</b>
              <p>
                This new filter lets you find threads with a specific number of
                comments within a selected date range. It also works with the
                Search bar, so you can narrow things down even further: for
                example, searching for a specific type of thread or blurb while
                also filtering by activity and time period.
              </p>
            </li>
            <li>
              <b>Used for AC Column</b>
              <p>
                A new column has been added to help track whether a thread is
                being used for Activity Checks.
              </p>
            </li>
            <li>
              <b>Sticky Column Preferences</b>
              <p>
                The table now remembers which columns you've toggled on or off
                across the app! Column visibility settings are stored in your
                browser's local storage, so they'll only stick around if you're
                using the same browser you set them in. Also, keep in mind that
                searches still reference hidden columns, even if they're not
                visible!
              </p>
            </li>
            <li>
              <b>AC Length Highlighting</b>
              <p>
                Threads that meet or exceed the AC length will now be
                highlighted in green automatically — a quick way to spot which
                threads are ready to be turned in for AC.
              </p>
              <p className="mt-4">A few things to note:</p>
              <ul className="ml-4 space-y-2">
                <li>
                  - This feature is not enabled by default, it only works if
                  you've set an AC length for the character.{" "}
                </li>
                <li>
                  - Highlighting is per thread, not cumulative. So if the AC
                  Length is set to 10, only threads with 10 or more comments
                  will be highlighted, it doesn't add up across multiple
                  threads.{" "}
                </li>
                <li>
                  - You can toggle the highlighting on or off using the switch
                  at the bottom of the table. As with column settings, your
                  preference is saved in your browser, so it sticks around as
                  long as you're using the same one.
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <p>
          That's about it for this update! As always, feel free to reach out if
          you run into any bugs, have suggestions, or just want to share
          feedback, I really appreciate all of it!
        </p>
      </>
    ),
  },
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

        <div>
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
        </div>
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
