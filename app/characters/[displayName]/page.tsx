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
    title: `${pageData.character.displayName}'s public page`,
    description: `${pageData.character.displayName}'s threads on JRP Tools`,
  };
}

export default async function Page({ params }: Props) {
  const displayName = (await params).displayName;
  const pageData = await getCharacterPageData(displayName);

  if (!pageData)
    return (
      <ErrorMsg>
        <p>Character page not found.</p>
      </ErrorMsg>
    );

  if ("error" in pageData) {
    return (
      <ErrorMsg>
        <p>{pageData.error}</p>
      </ErrorMsg>
    );
  }

  const { character, ongoingThreads, finishedThreads } = pageData;

  if (!character.isPublic)
    return <ErrorMsg>This character page is private.</ErrorMsg>;

  return (
    <CharacterView
      character={character}
      finishedThreads={finishedThreads}
      ongoingThreads={ongoingThreads}
      isPublicPage
    />
  );
}
