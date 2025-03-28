import { ExistingCharacter } from "../_schemas/Character";
import { CharacterListCard } from "./CharacterListCard";

export default function CharacterList({
  characters,
}: {
  characters: ExistingCharacter[];
}) {
  if (!characters.length)
    return "It feels lonely with no muses around... why don't you start by adding your first character?";

  return (
    <div className="grid gap-12 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 place-items-center">
      {characters
        ?.sort((a, b) => b.id! - a.id!)
        .map((character) => (
          <CharacterListCard
            key={character.displayName}
            character={character}
          />
        ))}
    </div>
  );
}
