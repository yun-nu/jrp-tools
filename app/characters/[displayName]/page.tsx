import ErrorMsg from "@/app/_components/ErrorMsg";
import ThreadTabs from "@/app/_components/ThreadTabs";
import {
  getCharacterData,
  getFinishedThreads,
  getOngoingThreads,
} from "@/app/_lib/data-service";
import { Metadata } from "next";
import CharacterHeader from "../../_components/CharacterHeader";
import { clientAndUserHelper } from "../../_lib/action-auth-helpers";

type Props = {
  params: Promise<{ displayName: string }>;
};

async function getCharData({ params }: Props) {
  const displayName = (await params).displayName;
  const character = await getCharacterData(displayName);

  if ("error" in character) return undefined;
  return character;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const character = await getCharData({ params });
  if (!character)
    return {
      title: "Character page not found",
    };

  return {
    title: `${character.displayName}'s public page`,
  };
}

export default async function Page({ params }: Props) {
  const { userId: user } = await clientAndUserHelper();
  const character = await getCharData({ params });

  if (!character)
    return (
      <ErrorMsg>
        <p>Character page not found.</p>
      </ErrorMsg>
    );

  const { isPublic, userId, id: characterId } = character || {};
  const ongoingThreads = await getOngoingThreads(characterId);
  const finishedThreads = await getFinishedThreads(characterId);

  if ((!isPublic && userId === user) || isPublic)
    return (
      <section className="w-full h-full flex flex-col items-center">
        <CharacterHeader character={character} isPublicPage />

        <ThreadTabs
          ongoingThreads={ongoingThreads}
          finishedThreads={finishedThreads}
        />
      </section>
    );

  return <ErrorMsg>This character page is private.</ErrorMsg>;
}
