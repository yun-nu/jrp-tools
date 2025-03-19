"use client";

import Link from "next/link";
import { startTransition } from "react";
import { HiOutlineChatBubbleBottomCenterText } from "react-icons/hi2";
import { IoSettingsOutline } from "react-icons/io5";
import { LuFileClock } from "react-icons/lu";
import { PiSignOutBold, PiUserList } from "react-icons/pi";
import { signOutAction } from "../login/actions";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/Sidebar";

const navLinks = [
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
    url: "/account/updates",
    icon: LuFileClock,
    title: "Updates",
  },
  {
    url: "/account/contact",
    icon: HiOutlineChatBubbleBottomCenterText,
    title: "Contact",
  },
];

export function SidebarNavigation() {
  const handleSignOut = () => {
    startTransition(async () => {
      await signOutAction();
    });
  };

  return (
    <Sidebar collapsible="icon" variant="inset">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="justify-center font-semibold">
            <Link href="/">JRP Tools</Link>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-2">
              {navLinks.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem className="flex justify-center">
            <SidebarMenuButton
              variant="default"
              className="border border-destructive w-fit px-4"
              onClick={handleSignOut}
            >
              <PiSignOutBold />
              <span>Sign out</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
