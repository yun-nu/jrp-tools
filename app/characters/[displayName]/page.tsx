import CharacterView from "@/app/_components/CharacterView";
import MessageBox from "@/app/_components/MessageBox";
import { getCharacterPageData } from "@/app/_utils/page-data";
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

  if (pageData.isOwner && !pageData.character.isPublic)
    return {
      title: "Character page is private",
    };

  return {
    title: `${displayName}'s public page`,
    description: `${displayName}'s public page on JRP Tools`,
  };
}

export default async function Page({ params }: Props) {
  const displayName = (await params).displayName;
  const pageData = await getCharacterPageData(displayName);

  if (!pageData || "error" in pageData)
    return (
      <MessageBox>{pageData?.error || "Character page not found"}.</MessageBox>
    );

  const { character, ongoingThreads, finishedThreads, isOwner } = pageData;

  if (isOwner && !pageData.character.isPublic) {
    return <MessageBox>This character page is set to private.</MessageBox>;
  }

  return (
    <CharacterView
      character={character}
      finishedThreads={finishedThreads}
      ongoingThreads={ongoingThreads}
      isPublicPage
    />
  );
}
