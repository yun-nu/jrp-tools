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
    <div className="flex flex-col items-center justify-between">
      <h1 className="text-5xl text-primary-50 mb-10 tracking-tight font-normal">
        RP <span className="custom-underline">thread tracking</span> made easy
      </h1>
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
