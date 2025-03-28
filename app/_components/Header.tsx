import HeaderUser from "./HeaderUser";
import TooltipWrapper from "./TooltipWrapper";
import { ModeToggle } from "./ui/ModeToggle";
import { SidebarTrigger } from "./ui/Sidebar";

export default function Header({ user }: { user: string | undefined }) {
  return (
    <nav className="sticky top-0 z-10 px-4 sm:px-8 h-16 border-b-2 flex justify-between items-center bg-background gap-2">
      <TooltipWrapper text="Toggle sidebar">
        <SidebarTrigger variant={"secondary"} />
      </TooltipWrapper>

      <div className="flex gap-2">
        <ModeToggle />
        <HeaderUser user={user} />
      </div>
    </nav>
  );
}
