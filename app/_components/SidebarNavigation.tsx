"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { startTransition } from "react";
import { HiOutlineChatBubbleBottomCenterText } from "react-icons/hi2";
import { IoSettingsOutline } from "react-icons/io5";
import { LuFileClock } from "react-icons/lu";
import { PiSignOutBold, PiUserList } from "react-icons/pi";
import { toast } from "../_hooks/useToast";
import { actionReturnSuccess } from "../_utils/action-return";
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
import { Separator } from "@radix-ui/react-separator";

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
  const { push } = useRouter();

  const handleSignOut = () => {
    startTransition(async () => {
      const result = await signOutAction();
      if (actionReturnSuccess(result)) {
        toast({
          description: result.success,
        });
        push("/");
      }
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
        <Separator />

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
              className="border border-destructive w-fit px-4 font-semibold"
              onClick={handleSignOut}
            >
              <PiSignOutBold />
              Sign out
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
