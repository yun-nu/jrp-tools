import Link from "next/link";
import Navigation from "./Navigation";
import { SidebarTrigger } from "./ui/Sidebar";

export default function Header({ user }: { user: string | undefined }) {
  return (
    <nav className="sticky top-0 z-10 px-4 sm:px-8 h-16 border-b-2 flex sm:justify-between justify-center items-center bg-background gap-2">
      {!user && (
        <Link href={"/"} className="sm:inline-flex sm:text-2xl hidden">
          JRP Tools
        </Link>
      )}
      {user && <SidebarTrigger variant={"secondary"} />}
      <Navigation user={user} />
    </nav>
  );
}
