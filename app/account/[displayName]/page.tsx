import Character from "@/app/_components/Character";
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
  const showActions = userId === character.userId;

  if (userId !== character.userId)
    return "You must be logged in to perform this action";

  const ongoingThreads = await getOngoingThreads(character.id);
  const finishedThreads = await getFinishedThreads(character.id);
  return (
    <section>
      <Character character={character} />

      <CreateNewThread characterId={character.id} />

      <ThreadTabs
        ongoingThreads={ongoingThreads}
        finishedThreads={finishedThreads}
        showActions={showActions}
      />

      <div className="flex justify-between">
        <EditCharacter character={character} />
        <DeleteCharacter character={character} />
      </div>
    </section>
  );
}
