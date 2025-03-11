import { Character } from "../_schemas/Character";
import { CharacterListCard } from "./CharacterListCard";

export default function CharacterList({
  characters,
}: {
  characters: Character[];
}) {
  if (!characters.length)
    return "It feels lonely with no muses around... why don't you start by adding your first character?";

  return (
    <div className="grid gap-8 lg:grid-cols-3 place-items-center">
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
