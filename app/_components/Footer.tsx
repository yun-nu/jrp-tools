import Link from "next/link";

export default function Footer() {
  return (
    <p className="text-sm flex flex-col items-center gap-4">
      <span>
        <Link
          href="https://github.com/yun-nu/rp-tools"
          className="underline underline-offset-4"
        >
          Open Source project
        </Link>{" "}
        built with ❤️ for the hobby by{" "}
        <Link href="https://yunnu.dev" className="underline underline-offset-4">
          Yunnu
        </Link>
      </span>
      <span className="block">
        Disclaimer: This is an experimental project subject to changes or
        discontinuity. Updates will be announced within the application.
      </span>
    </p>
  );
}
