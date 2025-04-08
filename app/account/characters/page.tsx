import CharacterDialog from "@/app/_components/CharacterDialog";
import MessageBox from "@/app/_components/MessageBox";
import { getUserId } from "@/app/_lib/auth";
import { Metadata } from "next";
import CharacterList from "../../_components/CharacterList";
import { getCharacters } from "../../_lib/data-service";

export const metadata: Metadata = {
  title: "Character list - JRP Tools",
};

export default async function Page() {
  const userId = await getUserId();

  if (!userId || typeof userId !== "string")
    return <MessageBox>User not authenticated.</MessageBox>;

  const characters = await getCharacters(userId);

  if ("error" in characters) return <MessageBox>{characters.error}</MessageBox>;

  return (
    <section className="flex flex-col gap-12 items-center">
      <CharacterDialog mode="add" />
      <CharacterList characters={characters} />
    </section>
  );
}
