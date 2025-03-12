import {
  getCharacterData,
  getFinishedThreads,
  getOngoingThreads,
} from "@/app/_lib/data-service";
import { Metadata } from "next";
import CharacterHeader from "../../_components/CharacterHeader";
import { authActionHelper } from "../../_lib/action-auth-helpers";
import { notFound } from "next/navigation";
import ThreadTabs from "@/app/_components/ThreadTabs";

type Props = {
  params: Promise<{ displayName: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const displayName = (await params).displayName;
  return {
    title: `Character page — ${displayName}`,
  };
}

export default async function Page({ params }: Props) {
  const { userId: user } = await authActionHelper();
  const displayName = (await params).displayName;
  const character = await getCharacterData(displayName);

  if ("error" in character) notFound();

  const { isPublic, userId, id: characterId } = character || {};

  const ongoingThreads = await getOngoingThreads(characterId);
  const finishedThreads = await getFinishedThreads(characterId);

  if ((!isPublic && userId === user) || isPublic)
    return (
      <div className="grid max-w-screen-2xl">
        <CharacterHeader character={character} />

        <ThreadTabs
          ongoingThreads={ongoingThreads}
          finishedThreads={finishedThreads}
        />
      </div>
    );

  return (
    <div>
      <p>This character information is private.</p>
    </div>
  );
}
