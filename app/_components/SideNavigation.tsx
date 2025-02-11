import Link from "next/link";
import { BsFillPersonPlusFill } from "react-icons/bs";
import { getCharacters, getUserId } from "../_lib/data-service";
import { createClient } from "../_lib/supabase-server";

async function SideNavigation() {
  const id = await getUserId();

  const characters = await getCharacters(id);

  return (
    <nav className="border-r border-primary-900">
      <ul className="flex flex-col gap-2 h-full text-lg">
        {characters?.map((char) => (
          <li key={char.name}>
            <Link
              className="flex items-center justify-between"
              href={`/dashboard/${char.displayName}`}
            >
              <span>{char.name}</span>
              <span>{char.game}</span>
            </Link>
          </li>
        ))}
      </ul>

      <button className="flex items-center">
        <BsFillPersonPlusFill />
        <span>Add new character</span>
      </button>
    </nav>
  );
}

export default SideNavigation;
