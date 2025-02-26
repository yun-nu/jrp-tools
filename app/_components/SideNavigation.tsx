import Link from "next/link";
import { getCharacters, getUserId } from "../_lib/data-service";
import CreateNewCharacter from "./CreateNewCharacter";
import { Badge } from "./ui/Badge";
import { Character } from "../_schemas/Character";

async function SideNavigation() {
  const id = await getUserId();

  const characters = await getCharacters(id);

  return (
    <nav className="border-r border-primary-900">
      <ul className="flex flex-col gap-2 h-full text-lg">
        {characters?.map((character) => (
          <CharacterListItem
            key={character.displayName}
            character={character}
          />
        ))}
      </ul>
      <CreateNewCharacter />
    </nav>
  );
}

function CharacterListItem({ character }: { character: Character }) {
  const { characterName, gameName, isPublic } = character || {};

  return (
    <li>
      <Link
        className="flex items-center justify-between"
        href={`/dashboard/${character.displayName}`}
      >
        <span>{characterName}</span>
        <span>{gameName}</span>
        {isPublic ? (
          <Badge variant={"default"}>Public</Badge>
        ) : (
          <Badge variant={"gray"}>Private</Badge>
        )}
      </Link>
    </li>
  );
}

export default SideNavigation;
