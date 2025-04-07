import { cookies } from "next/headers";
import HeaderUser from "./HeaderUser";
import TooltipWrapper from "./TooltipWrapper";
import { ModeToggle } from "./ui/ModeToggle";
import { Separator } from "./ui/Separator";
import { SidebarTrigger } from "./ui/Sidebar";

export default async function Header() {
  return (
    <nav className="sticky top-0 z-10 px-4 sm:px-6 h-16 border-b-2 flex justify-between items-center bg-background gap-4">
      <TooltipWrapper text="Toggle sidebar">
        <SidebarTrigger variant={"secondary"} />
      </TooltipWrapper>

      <HeaderUser />

      <div className="flex gap-4">
        <Separator orientation="vertical" className="w-[1px] h-[40px]" />
        <ModeToggle />
      </div>
    </nav>
  );
}
