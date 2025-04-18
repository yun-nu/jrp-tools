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
    title: `${displayName} - Manage threads`,
    description: `Manage ${displayName}'s threads`,
  };
}

export default async function Page({ params }: Props) {
  const displayName = (await params).displayName;
  const pageData = await getCharacterPageData(displayName, "management");

  if (!pageData) return <MessageBox>Character page not found.</MessageBox>;

  if ("error" in pageData) return <MessageBox>{pageData.error}</MessageBox>;

  const { character, isOwner } = pageData;

  if (!isOwner)
    return (
      <MessageBox>
        You don&apos;t have permission to access this page.
      </MessageBox>
    );

  return <CharacterView character={character} showTableActions />;
}
