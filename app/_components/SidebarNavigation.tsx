"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { PiSignOutBold } from "react-icons/pi";
import { useSignOut } from "../_hooks/auth/useSignOut";
import { commonLinks, userLinks } from "../_lib/navigation";
import { useAuth } from "../_providers/AuthProvider";
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

export function SidebarNavigation() {
  const { push } = useRouter();
  const { setOpenMobile } = useSidebar();
  const { user } = useAuth();
  const { mutate: signOut, isPending } = useSignOut(push, setOpenMobile);

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
            {user && <NavigationMenu links={userLinks} />}
          </SidebarGroupContent>
        </SidebarGroup>

        {user && <Separator className="h-[1px] bg-secondary" />}

        <SidebarGroup>
          <SidebarGroupContent>
            <NavigationMenu links={commonLinks} />
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {user && (
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem className="flex justify-center">
              <SidebarMenuButton
                variant="default"
                className="border border-destructive w-fit px-4 font-semibold"
                onClick={() => signOut()}
                disabled={isPending}
              >
                <PiSignOutBold />
                {isPending ? "Signing out" : "Sign out"}
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      )}
    </Sidebar>
  );
}
