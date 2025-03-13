import CharacterHeader from "@/app/_components/CharacterHeader";
import ThreadTabs from "@/app/_components/ThreadTabs";
import { authActionHelper } from "@/app/_lib/action-auth-helpers";
import {
  getCharacterData,
  getFinishedThreads,
  getOngoingThreads,
} from "@/app/_lib/data-service";
import { Metadata } from "next";
import { notFound } from "next/navigation";

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
  const { userId } = await authActionHelper();
  const character = await getCharacterData(displayName);

  if ("error" in character) return notFound();

  const showActions = userId === character.userId;
  if (userId !== character.userId)
    return "You must be logged in to perform this action";

  const ongoingThreads = await getOngoingThreads(character.id as number);
  const finishedThreads = await getFinishedThreads(character.id as number);

  return (
    <section className="max-w-screen-2xl">
      <CharacterHeader character={character} />

      <div className="mt-8 grid justify-items-center max-w-[80%] gap-y-6">
        <ThreadTabs
          ongoingThreads={ongoingThreads}
          finishedThreads={finishedThreads}
          showActions={showActions}
          characterId={character.id}
        />
      </div>
    </section>
  );
}
