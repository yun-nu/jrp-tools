import CharacterView from "@/app/_components/CharacterView";
import MessageBox from "@/app/_components/MessageBox";
import { getCharacterPageData } from "@/app/_utils/helpers";
import { Metadata } from "next";
import Loading from "./loading";

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

  if (!pageData) return <MessageBox>Character page not found.</MessageBox>;

  if ("error" in pageData) return <MessageBox>{pageData.error}</MessageBox>;

  const { character, ongoingThreads, finishedThreads, isOwner } = pageData;

  if (!isOwner)
    return (
      <MessageBox>You don&apos;t have permission to view this page.</MessageBox>
    );

  return (
    // <CharacterView
    //   character={character}
    //   ongoingThreads={ongoingThreads}
    //   finishedThreads={finishedThreads}
    //   showTableActions
    //   characterId={character.id}
    // />
    <Loading />
  );
}
