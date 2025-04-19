import CharacterView from "@/app/_components/CharacterView";
import MessageBox from "@/app/_components/MessageBox";
import {
  getCharacterMetadata,
  getCharacterPageData,
} from "@/app/_lib/service-server";

import { Metadata } from "next";

type Props = {
  params: Promise<{ displayName: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const displayName = (await params).displayName;
  const metadata = await getCharacterMetadata(displayName);

  if (!metadata || "error" in metadata)
    return {
      title: "Character page not found",
    };

  return {
    title: `${displayName}'s public page`,
    description: `${displayName}'s public page on JRP Tools`,
  };
}

export default async function Page({ params }: Props) {
  const displayName = (await params).displayName;
  const pageData = await getCharacterPageData(displayName, "public");

  if (!pageData || "error" in pageData)
    return (
      <MessageBox>{pageData?.error || "Character page not found"}.</MessageBox>
    );

  const { character } = pageData;

  if (!pageData.character.isPublic) {
    return <MessageBox>This character page is set to private.</MessageBox>;
  }

  return <CharacterView character={character} isPublicPage />;
}
