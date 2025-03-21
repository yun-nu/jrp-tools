/* eslint-disable react/no-unescaped-entities */
import Update from "./Template";

export function Update01() {
  return (
    <Update number="01" date="M D 2025">
      <p>
        This is the very first update, so let me start it by saying thank you
        for checking out JRP Tools!
      </p>

      <p>
        There is one very important topic I want to highlight right off the bat.
        This is an experimental app, with all data being stored on the free tier
        of a database service. As with every free service, there are
        restrictions. In this case, data usage restrictions that can render the
        application slow or entirely unaccessible for a varying number of days.
      </p>
      <p>
        As of launch, the app will be open for anyone to sign up and try it out.
        However, I'll be keeping a close eye on any potential bottlenecks, and
        will take countermeasures if needed. Announcements will be made here on
        this page.
      </p>

      <p>
        With all that said, please don't hesitate to report any bugs or issues
        you might stumble into. Suggestions and contributions are also welcome!
      </p>
    </Update>
  );
}
