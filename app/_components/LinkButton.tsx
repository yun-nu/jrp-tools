import Link from "next/link";

interface ILinkButtonProps {
  content: string;
  size: "small" | "medium" | "large";
  icon?: React.ReactNode;
  href: string;
}

export default function LinkButton({
  content,
  icon,
  size,
  href,
}: ILinkButtonProps) {
  const style = {
    small: "",
    medium:
      "flex items-center gap-6 text-lg border border-primary-300 px-8 py-4 font-medium",
    large:
      "py-3 px-5 hover:bg-zinc-300 hover:text-zinc-900 transition-colors flex items-center gap-4 font-semibold text-primary-200",
  };

  return (
    <Link href={href} className={`${style[size]}`}>
      {icon} {content}
    </Link>
  );
}
