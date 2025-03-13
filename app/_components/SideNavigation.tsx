"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { HiOutlineChatBubbleBottomCenterText } from "react-icons/hi2";
import { IoSettingsOutline } from "react-icons/io5";
import { LuFileClock } from "react-icons/lu";
import { PiUserList } from "react-icons/pi";
import SignOutButton from "./SignOutButton";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/Tooltip";

type NavLinkProps = {
  href: string;
  icon: JSX.Element;
  title: string;
};

const navLinks = [
  {
    href: "/account/characters",
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

export default function SideNavigation() {
  return (
    <nav className="py-8 px-4 border-r">
      <ul className="flex flex-col gap-4 h-full text-2xl">
        {navLinks.map((link) => (
          <NavLink
            href={link.href}
            icon={link.icon}
            title={link.title}
            key={link.title}
          />
        ))}
        <li className="mt-auto">
          <SignOutButton />
        </li>
      </ul>
    </nav>
  );
}

function NavLink({ href, icon, title }: NavLinkProps) {
  const pathname = usePathname();
  return (
    <li>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <Link
              href={href}
              className={`rounded flex items-center p-3 gap-2 hover:bg-primary/20 transition-colors ${
                href === pathname &&
                "text-primary bg-primary/20 border border-primary/80"
              }`}
            >
              {icon}
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>{title}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </li>
  );
}
