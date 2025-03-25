/* eslint-disable react/no-unescaped-entities */
import StyledLink from "@/app/_components/StyledLink";
import Update from "./Template";

export function Update01() {
  return (
    <Update number="01" date="M D 2025">
      <p>
        This is the very first update, so let me start by saying thank you for
        checking out JRP Tools!
      </p>

      <p>
        If you've already signed up and is giving the app a go, an even bigger
        thank you! But I also would like to ask you to keep in mind this is an
        experimental app subject to changes, or even discontinuity. In the
        chance of the latter, though, a proper announcement will be made in
        advance to give users time to back up their threads.
      </p>
      <p>
        As I've mentioned in the{" "}
        <StyledLink href="/about" type="self">
          About
        </StyledLink>{" "}
        page, a Backup feature is already in the works, so users can generate an
        offline backup of their threads at anytime.
      </p>
      <p>
        Please don't hesitate to report any bugs or issues you might stumble
        into. Suggestions and contributions are also welcome!
      </p>
    </Update>
  );
}
