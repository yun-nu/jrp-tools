import {
  PiPersonSimpleRun,
  PiShootingStarLight,
  PiSignInBold,
} from "react-icons/pi";
import Footer from "./_components/Footer";
import LinkButton from "./_components/LinkButton";
import { createClient } from "./_lib/supabase-server";
import { Button } from "./_components/ui/Button";
import Link from "next/link";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <div className="flex flex-col items-center justify-between p-6">
      <h1 className="text-5xl text-primary mb-10 tracking-tight font-normal">
        <span className="custom-underline">Thread tracking</span> made simple
      </h1>
      <p>
        Lightweight thread tracker for journal-based roleplay. Store and share
        your threads with just a few clicks.
      </p>
      {!session && (
        <Button
          asChild
          variant="link"
          size="lg"
          className="border-2 border-foreground text-lg font-semibold"
        >
          <Link href="/signup">Sign up</Link>
        </Button>
      )}
      <Footer />
    </div>
  );
}
