import CharacterDialog from "@/app/_components/CharacterDialog";
import MessageBox from "@/app/_components/MessageBox";
import { getUserId } from "@/app/_lib/auth";
import { Metadata } from "next";
import CharacterList from "../../_components/CharacterList";

export const metadata: Metadata = {
  title: "Character list - JRP Tools",
};

export default async function Page() {
  const userId = await getUserId();

  if (!userId || typeof userId !== "string")
    return <MessageBox>User not authenticated.</MessageBox>;

  return (
    <section className="flex flex-col gap-12 items-center">
      <CharacterDialog mode="add" />
      <CharacterList userId={userId} />
    </section>
  );
}
