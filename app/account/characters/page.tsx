import CharacterDialog from "@/app/_components/CharacterDialog";
import CharacterList from "../../_components/CharacterList";
import { clientAndUserHelper } from "../../_lib/action-auth-helpers";
import { getCharacters } from "../../_lib/data-service";

export default async function Page() {
  const { userId } = await clientAndUserHelper();
  const characters = await getCharacters(userId as string);

  if ("error" in characters)
    return (
      <div className="p-6 border rounded border-muted-foreground/80">
        {characters.error}
      </div>
    );

  return (
    <section className="flex flex-col gap-12 items-center">
      <CharacterDialog mode="add" />
      <CharacterList characters={characters} />
    </section>
  );
}
