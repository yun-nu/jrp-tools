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
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Text-based roleplay thread tracking made easy.</h1>
      <p>
        Store and share your threads with ease. Add, edit or delete your data
        anytime.
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
