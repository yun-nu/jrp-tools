import { PiSignInBold } from "react-icons/pi";
import Footer from "./_components/Footer";
import LinkButton from "./_components/LinkButton";
import { createClient } from "./_lib/supabase-server";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <div className="flex flex-col items-center justify-between h-full p-12">
      <h1 className="text-5xl text-primary mb-10 tracking-tight font-normal">
        <span className="custom-underline">Thread tracking</span> made simple
      </h1>
      <p>
        Lightweight thread tracker for journal-based roleplay. Store and share
        your threads with just a few clicks.
      </p>
      {!session && (
        <LinkButton
          size="medium"
          href={"/signup"}
          icon={<PiSignInBold />}
          content="Sign up"
        />
      )}
      <Footer />
    </div>
  );
}
