import StyledLink from "@/app/_components/StyledLink";

/* eslint-disable react/no-unescaped-entities */
export const changelog = [
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
