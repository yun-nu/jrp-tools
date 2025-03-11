"use client";

import Link from "next/link";
import { HiOutlineChatBubbleBottomCenterText } from "react-icons/hi2";
import { IoSettingsOutline } from "react-icons/io5";
import { LuFileClock } from "react-icons/lu";
import { PiUserList } from "react-icons/pi";
import SignOutButton from "./SignOutButton";
import { usePathname, useSelectedLayoutSegment } from "next/navigation";

const navLinks = [
  {
    href: "/account",
    icon: <PiUserList />,
    title: "Character list",
  },
  {
    href: "/account/settings",
    icon: <IoSettingsOutline />,
    title: "Account settings",
  },
  {
    href: "/account/updates",
    icon: <LuFileClock />,
    title: "Updates",
  },
  {
    href: "/account/contact",
    icon: <HiOutlineChatBubbleBottomCenterText />,
    title: "Contact",
  },
];

function SideNavigation() {
  const pathname = usePathname();

  return (
    <nav className="py-8 px-4 border-r border-primary-900">
      <ul className="flex flex-col gap-4 h-full text-lg">
        {navLinks.map((link) => (
          <li key={link.title}>
            <Link
              href={link.href}
              className={`rounded flex items-center py-3 px-2 gap-2 hover:bg-primary/20 transition-colors ${
                link.href === pathname &&
                "text-primary bg-primary/20 border border-primary/80"
              }`}
            >
              {link.icon} {link.title}
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
