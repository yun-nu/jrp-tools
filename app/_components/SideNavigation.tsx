"use client";

import Link from "next/link";
import { BiSolidHome } from "react-icons/bi";
import { BsFillPersonPlusFill } from "react-icons/bs";
import { PiSignOutBold } from "react-icons/pi";
import SignOutButton from "./SignOutButton";

const navLinks = [
  {
    name: "Home",
    href: "/account",
    icon: <BiSolidHome />,
  },
  {
    name: "Add new character",
    href: "/account/profile",
    icon: <BsFillPersonPlusFill />,
  },
];

// dummy:
const characters = [
  {
    name: "Dummy",
    game: "Game 1",
    icon: "",
    href: "",
  },
  {
    name: "Longer dummy name",
    game: "Game 2",
    icon: "",
    href: "",
  },
];
// remove char: <BsFillPersonDashFill />

function SideNavigation() {
  return (
    <nav className="border-r border-primary-900">
      <ul className="flex flex-col gap-2 h-full text-lg">
        {characters.map((char) => (
          <li key={char.name}>
            <Link
              className="flex items-center justify-between"
              href={char.href}
            >
              <span>{char.name}</span>
              <span>{char.game}</span>
            </Link>
          </li>
        ))}

        {navLinks.map((link) => (
          <li key={link.name}>
            <Link className="flex items-center" href={link.href}>
              {link.icon}
              <span>{link.name}</span>
            </Link>
          </li>
        ))}

        <li className="mt-auto">
          <SignOutButton />
        </li>
      </ul>
    </nav>
  );
}

export default SideNavigation;
