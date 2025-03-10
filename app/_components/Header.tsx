import Link from "next/link";
import Navigation from "./Navigation";

export default function Header() {
  return (
    <nav className="px-8 h-16 border-b-2 flex justify-between items-center">
      <Link href={"/"} className="flex items-center gap-2">
        <span className="text-2xl">[</span> RP Tools β{" "}
        <span className="text-2xl">]</span>
      </Link>
      <Navigation />
    </nav>
  );
}
