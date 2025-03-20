import CharacterHeader from "@/app/_components/CharacterHeader";
import ThreadTabs from "@/app/_components/ThreadTabs";
import { clientAndUserHelper } from "@/app/_lib/action-auth-helpers";
import {
  getCharacterData,
  getFinishedThreads,
  getOngoingThreads,
} from "@/app/_lib/data-service";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Error from "./not-found";

type Props = {
  params: Promise<{ displayName: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const displayName = (await params).displayName;
  return {
    title: `Character: ${displayName}'s `,
  };
}

export default async function Page({ params }: Props) {
  const displayName = (await params).displayName;
  const { userId } = await clientAndUserHelper();
  const character = await getCharacterData(displayName);

  if ("error" in character) return notFound();

  const showActions = userId === character.userId;
  if (userId !== character.userId)
    return "You must be logged in to perform this action";

  const ongoingThreadsResult = await getOngoingThreads(character.id as number);
  const finishedThreadsResult = await getFinishedThreads(
    character.id as number
  );

  if ("error" in ongoingThreadsResult || "error" in finishedThreadsResult) {
    return notFound();
  }

  const ongoingThreads = ongoingThreadsResult;
  const finishedThreads = finishedThreadsResult;

  return (
    <section className="w-full flex flex-col items-center">
      <CharacterHeader character={character} />

      <ThreadTabs
        ongoingThreads={ongoingThreads}
        finishedThreads={finishedThreads}
        showActions={showActions}
        characterId={character.id}
      />
    </section>
  );
}
