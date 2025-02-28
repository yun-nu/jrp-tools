import Link from "next/link";
import { IoSettingsOutline } from "react-icons/io5";
import { PiUserList } from "react-icons/pi";
import SignOutButton from "./SignOutButton";
import { FileClock } from "lucide-react";
import { LuFileClock } from "react-icons/lu";
import { HiOutlineChatBubbleBottomCenterText } from "react-icons/hi2";
import { ReactNode } from "react";

type SideNavListItemProps = {
  href: string;
  icon: JSX.Element;
  title: string;
};

function SideNavListItem({ href, icon, title }: SideNavListItemProps) {
  return (
    <li>
      <Link
        href={href}
        className="flex  items-center gap-2 hover:text-accent-400 transition-colors"
      >
        {icon} {title}
      </Link>
    </li>
  );
}

function SideNavigation() {
  return (
    <nav className="border-r border-primary-900 ">
      <ul className="flex flex-col gap-2 h-full text-lg items">
        <SideNavListItem
          href="/account"
          icon={<PiUserList />}
          title="Character list"
        />

        <SideNavListItem
          href="/account/settings"
          icon={<IoSettingsOutline />}
          title="Account settings"
        />

        <SideNavListItem
          href="/changelog"
          icon={<LuFileClock />}
          title="Changelog"
        />

        <SideNavListItem
          href="/contact"
          icon={<HiOutlineChatBubbleBottomCenterText />}
          title="Contact"
        />

        <li className="mt-auto">
          <SignOutButton />
        </li>
      </ul>
    </nav>
  );
}

export default SideNavigation;
