import { HiOutlineChatBubbleBottomCenterText } from "react-icons/hi2";
import { IoSettingsOutline } from "react-icons/io5";
import { IconType } from "react-icons/lib";
import { LuFileClock } from "react-icons/lu";
import { PiUserList } from "react-icons/pi";
import { TbInfoSquare } from "react-icons/tb";

export type NavLink = {
  url: string;
  icon: IconType;
  title: string;
};

export const commonLinks = [
  {
    url: "/about",
    icon: TbInfoSquare,
    title: "About",
  },
  {
    url: "/updates",
    icon: LuFileClock,
    title: "Updates",
  },
];

export const userLinks = [
  {
    url: "/account/characters",
    icon: PiUserList,
    title: "Character list",
  },
  {
    url: "/account/settings",
    icon: IoSettingsOutline,
    title: "Settings",
  },
  {
    url: "/account/contact",
    icon: HiOutlineChatBubbleBottomCenterText,
    title: "Contact",
  },
];
