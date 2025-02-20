import Link from "next/link";
import { FaGithub } from "react-icons/fa6";

export default function Footer() {
  return (
    <p className="text-sm flex flex-col items-center gap-2">
      <span>
        <Link href="https://github.com/yun-nu/rp-tools">
          Open Source project
        </Link>{" "}
        built with 💖 for the hobby by{" "}
        <Link href="https://yunnu.dev">Yunnu</Link>.
      </span>
      <span className="block">
        Disclaimer: This is a beta project subject to changes or discontinuity.
        Updates will be announced on the dashboard.
      </span>
    </p>
  );
}
