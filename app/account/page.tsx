import { notFound } from "next/navigation";
import CharacterList from "../_components/CharacterList";
import CreateNewCharacter from "../_components/CreateNewCharacter";
import { authActionHelper } from "../_lib/action-auth-helpers";
import { getCharacters } from "../_lib/data-service";

export const revalidate = 60;

export default async function Page() {
  const { user: id } = await authActionHelper();
  const characters = await getCharacters(id);

  if ("error" in characters) {
    ///
    return characters.error;
  }

  return (
    <div className="max-w-[80%]">
      <CharacterList characters={characters} />
      <CreateNewCharacter />
    </div>
  );
}
