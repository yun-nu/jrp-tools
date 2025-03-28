import StyledLink from "./StyledLink";

export default function Footer() {
  return (
    <div className="text-sm flex flex-col items-center gap-4">
      <p className="block">
        This is an experimental project subject to changes or discontinuity.
      </p>
      <p>
        <StyledLink href="https://github.com/yun-nu/jrp-tools">
          Project
        </StyledLink>{" "}
        built with ❤️ for the hobby. Powered by{" "}
        <StyledLink href="https://ui.shadcn.com">shadcn/ui</StyledLink> and{" "}
        <StyledLink href="https://supabase.com">Supabase</StyledLink>.
      </p>
    </div>
  );
}
