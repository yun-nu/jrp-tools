import Link from "next/link";
import { NavLink } from "../_lib/navigation";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "./ui/Sidebar";
import { useAuth } from "../_providers/AuthProvider";
import { Skeleton } from "./ui/Skeleton";

interface NavigationMenuProps {
  links: NavLink[];
  className?: string;
}

export function NavigationMenu({ links, className }: NavigationMenuProps) {
  const { setOpenMobile } = useSidebar();
  const { isLoading } = useAuth();

  return (
    <SidebarMenu className={className}>
      {links.map((item) => (
        <SidebarMenuItem key={item.title}>
          {isLoading ? (
            <Skeleton key={item.title} className="h-10 w-[160px]" />
          ) : (
            <SidebarMenuButton asChild onClick={() => setOpenMobile(false)}>
              <Link href={item.url} prefetch={false}>
                <item.icon />
                <span>{item.title}</span>
              </Link>
            </SidebarMenuButton>
          )}
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
