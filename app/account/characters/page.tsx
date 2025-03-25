import CharacterDialog from "@/app/_components/CharacterDialog";
import ErrorMsg from "@/app/_components/ErrorMsg";
import CharacterList from "../../_components/CharacterList";
import { getClientAndUser } from "../../_lib/action-auth-helpers";
import { getCharacters } from "../../_lib/data-service";

export default async function Page() {
  const { userId } = await getClientAndUser();

  if (!userId) return <ErrorMsg>User not authenticated.</ErrorMsg>;

  const characters = await getCharacters(userId);

  if ("error" in characters) return <ErrorMsg>{characters.error}</ErrorMsg>;

  return (
    <section className="flex flex-col gap-12 items-center">
      <CharacterDialog mode="add" />
      <CharacterList characters={characters} />
    </section>
  );
}
