import Link from "next/link";
import { getCharacters, getUserId } from "../_lib/data-service";
import CreateNewCharacter from "./CreateNewCharacter";
import { CharacterForm } from "./CharacterForm";

async function SideNavigation() {
  const id = await getUserId();

  const characters = await getCharacters(id);

  return (
    <nav className="border-r border-primary-900">
      <ul className="flex flex-col gap-2 h-full text-lg">
        {characters?.map((character) => (
          <li key={character.characterName}>
            <Link
              className="flex items-center justify-between"
              href={`/dashboard/${character.displayName}`}
            >
              <span>{character.characterName}</span>
              <span>{character.gameName}</span>
            </Link>
          </li>
        ))}
      </ul>

      <CreateNewCharacter />
    </nav>
  );
}

export default SideNavigation;
