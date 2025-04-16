import StyledLink from "@/app/_components/StyledLink";

export default function NotFound() {
  return (
    <div className="flex flex-col gap-4 items-center">
      <h1 className="text-xl font-semibold">
        Something went wrong while trying to fetch threads.
      </h1>
      <StyledLink type="self" href={"/account/characters"}>
        Return to character list
      </StyledLink>
    </div>
  );
}
