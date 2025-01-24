import Link from "next/link";

export default function Footer() {
  return (
    <p className="text-sm flex flex-col items-center gap-2">
      <span>
        Built with 💖 for the hobby by{" "}
        <Link href="https://yunnu.dev">Yunnu</Link>.{" "}
        <Link href="">Source code available on github</Link>.
      </span>
      <span className="block">
        Disclaimer: This is a beta project subject to changes or discontinuity.
      </span>
    </p>
  );
}
