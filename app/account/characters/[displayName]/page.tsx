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

  if (!pageData || "error" in pageData || !pageData.isOwner)
    return {
      title: "Character page not found",
    };

  return {
    title: `${displayName}`,
    description: `${pageData.character.displayName}'s threads on JRP Tools`,
  };
}

export default async function Page({ params }: Props) {
  const displayName = (await params).displayName;
  const pageData = await getCharacterPageData(displayName);

  if (!pageData) return <ErrorMsg>Character page not found.</ErrorMsg>;

  if ("error" in pageData) return <ErrorMsg>{pageData.error}</ErrorMsg>;

  const { character, ongoingThreads, finishedThreads, isOwner } = pageData;

  if (!isOwner)
    return (
      <ErrorMsg>You don&apos;t have permission to view this page.</ErrorMsg>
    );

  return (
    <CharacterView
      character={character}
      ongoingThreads={ongoingThreads}
      finishedThreads={finishedThreads}
      showTableActions
      characterId={character.id}
    />
  );
}
