import CharacterHeader from "@/app/_components/CharacterHeader";
import CreateNewThread from "@/app/_components/CreateNewThread";
import DeleteCharacter from "@/app/_components/DeleteCharacter";
import EditCharacter from "@/app/_components/EditCharacter";
import { authActionHelper } from "@/app/_lib/action-auth-helpers";
import {
  getCharacterData,
  getFinishedThreads,
  getOngoingThreads,
} from "@/app/_lib/data-service";
import ThreadTabs from "../../_components/ThreadTabs";
import { Metadata } from "next";
import { notFound } from "next/navigation";

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
    <section className="space-y-4 max-w-screen-2xl">
      <CharacterHeader character={character} />

      <div className="grid justify-items-center max-w-[80%] gap-y-6">
        <CreateNewThread characterId={character.id} />

        <ThreadTabs
          ongoingThreads={ongoingThreads}
          finishedThreads={finishedThreads}
          showActions={showActions}
        />
      </div>

      <div className="flex justify-between">
        <EditCharacter
          character={character}
          btnSize="default"
          text="Edit character"
        />
        <DeleteCharacter
          character={character}
          btnSize="default"
          text="Delete character"
        />
      </div>
    </section>
  );
}
