import Link from "next/link";
import Footer from "./_components/Footer";
import { Button } from "./_components/ui/Button";
import { createClient } from "./_lib/supabase-server";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <div className="h-full flex flex-col items-center justify-between pt-6 px-4 text-center">
      <div className="custom-underline">
        <h1 className="text-5xl text-primary mb-10 tracking-tight font-normal">
          Thread tracking made simple
        </h1>
      </div>
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
