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
        There is one very important topic I want to highlight here right off the
        bat. This application's database runs on supabase's free tier. And
        naturally, the free tier comes with a number of{" "}
        <Link
          href="https://supabase.com/pricing#compare-plans"
          target="_blank"
          rel="noopener noreferrer"
        >
          limitations
        </Link>
        , notably:
      </p>

      <blockquote className="text-sm border-l-2">
        <ul className="text-sm block">
          <li>500MB database size</li>
          <li>5GB bandwidth</li>
        </ul>
      </blockquote>

      <h3 className="font-bold text-lg">
        But what does this mean for this app's users?
      </h3>
      <p>
        Honestly, at the current point, not much. That limit should be more than
        enough; I'm not expecting a huge number of active users, neither heavy
        database usage. Which is why I launched this app open for everyone.
      </p>
      <p>
        I'll be keeping a close eye on database usage, and any major
        announcements will be made on this very space. So don't worry, whether
        you want to keep them private to your account or share them away, your
        tags are safe here.
      </p>

      <p>
        With all that said, don't hesitate to report any bugs or issues.
        Suggestions and contributions are also welcome! You can drop me a
        message in the form below, or directly{" "}
        <Link
          href="https://github.com/yun-nu/rp-tools"
          target="_blank"
          rel="noopener noreferrer"
        >
          open an issue or a pull request on github
        </Link>
        .
      </p>
    </div>
  );
}
