import CharacterList from "../../_components/CharacterList";
import CreateNewCharacter from "../../_components/CreateNewCharacter";
import { authActionHelper } from "../../_lib/action-auth-helpers";
import { getCharacters } from "../../_lib/data-service";

export default async function Page() {
  const { userId: userId } = await authActionHelper();
  const characters = await getCharacters(userId as string);

  if ("error" in characters) return characters.error;

  return (
    <section className="flex flex-col gap-12 items-center ">
      <CreateNewCharacter />

      <CharacterList characters={characters} />
    </section>
  );
}
