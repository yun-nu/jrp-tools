import Link from "next/link";

export default function News() {
  return (
    <div className="max-w-[600px] space-y-4">
      <div className="flex gap-4">
        <h1>Update #1</h1>
        <h2>Launch!</h2>
      </div>

      <p>
        This is the very first update, so let me start it by saying thank you
        for signing up to JRP-Tools!
      </p>

      <p>
        There is one very important topic I want to highlight right off the bat.
        This is an experimental app, running on a free database with (lenient)
        data usage restrictions. This means that aside from bugs, the app might
        become slow when under heavy load — and worst case scenario, become
        unaccessible until the next cycle if it hits its monthly threshold.
      </p>
      <p>
        At the current point, I'm not expecting heavy database usage (or abuse),
        which is why I launched this app open for everyone. I'll be keeping a
        close eye on any potential bottlenecks, and any major announcements will
        be made here on the dashboard.
      </p>

      <p>
        With all that said, don't hesitate to report any bugs or issues.
        Suggestions and contributions are also welcome! You can drop me an
        anonymous message in the form below, or directly{" "}
        <Link
          href="https://github.com/yun-nu/rp-tools"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500"
        >
          open an issue or a pull request on github
        </Link>
        .
      </p>
    </div>
  );
}
