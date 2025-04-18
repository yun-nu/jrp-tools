"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { startTransition } from "react";
import { PiSignOutBold } from "react-icons/pi";
import { toast } from "../_hooks/useToast";
import { commonLinks, userLinks } from "../_lib/navigation";
import { RequestSuccess } from "../_utils/return";
import { signOutAction } from "../login/actions";
import { NavigationMenu } from "./NavigationMenu";
import { Separator } from "./ui/Separator";
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
  useSidebar,
} from "./ui/Sidebar";

export function SidebarNavigation({ isLoggedIn }: { isLoggedIn: boolean }) {
  const { push } = useRouter();
  const { setOpenMobile } = useSidebar();

  const handleSignOut = () => {
    startTransition(async () => {
      const result = await signOutAction();
      if (RequestSuccess(result)) {
        toast({
          description: result.success,
          variant: "success",
        });
        push("/");
      }
    });
    setOpenMobile(false);
  };

  return (
    <Sidebar collapsible="icon" variant="inset">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="justify-center font-semibold">
            <Link href="/" prefetch={false}>
              JRP Tools
            </Link>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            {isLoggedIn && <NavigationMenu links={userLinks} />}
          </SidebarGroupContent>
        </SidebarGroup>

        {isLoggedIn && <Separator className="h-[1px] bg-secondary" />}

        <SidebarGroup>
          <SidebarGroupContent>
            <NavigationMenu links={commonLinks} />
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {isLoggedIn && (
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
      )}
    </Sidebar>
  );
}
