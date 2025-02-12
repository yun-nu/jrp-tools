import Link from "next/link";
import Navigation from "./Navigation";

export default function Header() {
  return (
    <div className="px-8 h-16 border-b-2 flex justify-between items-center">
      <Link href={"/"}>RP-tools (beta)</Link>
      <Navigation />
    </div>
  );
}
