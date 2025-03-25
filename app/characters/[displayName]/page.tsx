import CharacterView from "@/app/_components/CharacterView";
import ErrorMsg from "@/app/_components/ErrorMsg";
import { getCharacterPageData } from "@/app/_utils/helpers";
import { Metadata } from "next";

type Props = {
  params: Promise<{ displayName: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const displayName = (await params).displayName;
  const pageData = await getCharacterPageData(displayName);

  if (!pageData || "error" in pageData)
    return {
      title: "Character page not found",
    };

  return {
    title: `${displayName}'s public page`,
    description: `${displayName}'s threads on JRP Tools`,
  };
}

export default async function Page({ params }: Props) {
  const displayName = (await params).displayName;
  const pageData = await getCharacterPageData(displayName);

  if (!pageData || "error" in pageData)
    return (
      <ErrorMsg>{pageData?.error || "Character page not found"}.</ErrorMsg>
    );

  const { character, ongoingThreads, finishedThreads } = pageData;

  return (
    <CharacterView
      character={character}
      finishedThreads={finishedThreads}
      ongoingThreads={ongoingThreads}
      isPublicPage
    />
  );
}
