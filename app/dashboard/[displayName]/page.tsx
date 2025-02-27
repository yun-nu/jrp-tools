import Character from "@/app/_components/Character";
import CreateNewThread from "@/app/_components/CreateNewThread";
import DeleteCharacter from "@/app/_components/DeleteCharacter";
import EditCharacter from "@/app/_components/EditCharacter";
import { AuthActionHelper } from "@/app/_lib/actionsAuth";
import {
  getCharacterData,
  getFinishedThreads,
  getOngoingThreads,
} from "@/app/_lib/data-service";
import ThreadTabs from "./ThreadTabs";

// export async function generateMetadata({ params }: Props) {
//   const character = await getCharacterData(await params.displayName);
//   if (!character) return null;
//   return { title: `${character.name} @ ${character.game}` };
// }

export default async function Page({
  params,
}: {
  params: Promise<{ displayName: string }>;
}) {
  const displayName = (await params).displayName;
  const { user } = await AuthActionHelper();
  const character = await getCharacterData(displayName);

  if (user !== character.userId)
    throw new Error("You must be logged in to perform this action");

  const ongoingThreads = await getOngoingThreads(character.id);
  const finishedThreads = await getFinishedThreads(character.id);
  return (
    <section>
      <Character character={character} />

      <CreateNewThread characterId={character.id} />

      <ThreadTabs
        ongoingThreads={ongoingThreads}
        finishedThreads={finishedThreads}
      />

      <div className="flex justify-between">
        <EditCharacter character={character} />
        <DeleteCharacter character={character} />
      </div>
    </section>
  );
}
