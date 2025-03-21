import Link from "next/link";
import { NavLink } from "../_lib/navigation";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "./ui/Sidebar";

interface NavigationMenuProps {
  links: NavLink[];
  className?: string;
}

export function NavigationMenu({ links, className }: NavigationMenuProps) {
  return (
    <SidebarMenu className={className}>
      {links.map((item) => (
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
  );
}
