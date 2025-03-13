import Link from "next/link";
import StyledLink from "./StyledLink";

export default function Footer() {
  return (
    <p className="text-sm flex flex-col items-center gap-4">
      <span className="block">
        This is an experimental project subject to changes or discontinuity.
        Updates will be announced within the application.
      </span>
      <span>
        <StyledLink href="https://github.com/yun-nu/jrp-tools">
          Open source
        </StyledLink>{" "}
        project built with ❤️ for the hobby. Powered by{" "}
        <StyledLink href="https://ui.shadcn.com">shadcn/ui</StyledLink> and{" "}
        <StyledLink href="https://supabase.com">Supabase</StyledLink>.
      </span>
    </p>
  );
}
