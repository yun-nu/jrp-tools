import Link from "next/link";
import { BiSolidHome } from "react-icons/bi";
import { BsFillPersonPlusFill } from "react-icons/bs";
import { PiSignOutBold } from "react-icons/pi";
import SignOutButton from "./SignOutButton";
import { getCharacters } from "../_lib/data-service";

// dummy:
// const characters = [
//   {
//     name: "Dummy",
//     game: "Game 1",
//     icon: "",
//     href: "",
//   },
//   {
//     name: "Longer dummy name",
//     game: "Game 2",
//     icon: "",
//     href: "",
//   },
// ];

async function SideNavigation() {
  const characters = await getCharacters();

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
