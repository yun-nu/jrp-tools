import Character from "@/app/_components/Character";
import DataTable from "@/app/_components/DataTable";
import {
  getCharacterData,
  getThreads,
  getUserId,
} from "@/app/_lib/data-service";
import { threadsCols } from "@/app/_components/Columns";
import DeleteCharacter from "@/app/_components/DeleteCharacter";
import EditCharacter from "@/app/_components/EditCharacter";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/_components/ui/Tabs";
import { Button } from "@/app/_components/ui/Button";
import CreateNewCharacter from "@/app/_components/CreateNewThread";
import CreateNewThread from "@/app/_components/CreateNewThread";

interface Props {
  params: { displayName: string };
}

// export async function generateMetadata({ params }: Props) {
//   const character = await getCharacterData(await params.displayName);
//   if (!character) return null;
//   return { title: `${character.name} @ ${character.game}` };
// }

export const revalidate = 300;

export type Person = {
  firstName: string;
  lastName: string;
  age: number;
  visits: number;
  status: string;
  progress: number;
};

export default async function Page({ params }: Props) {
  const displayName = (await params).displayName;
  const userId = await getUserId();
  const character = await getCharacterData(displayName);

  if (userId !== character.userId)
    throw new Error("You must be logged in to perform this action");

  const ongoingThreads = (await getThreads(character.id)).filter(
    (thread) => !thread.isFinished
  );
  const finishedThreads = (await getThreads(character.id)).filter(
    (thread) => thread.isFinished
  );

  return (
    <section>
      <Character character={character} />

      <CreateNewThread characterId={character.id} />

      <Tabs defaultValue="ongoing" className="">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="ongoing" className="bg-slate-100">
            <h2>Ongoing</h2>
          </TabsTrigger>
          <TabsTrigger value="finished">
            <h2>Finished</h2>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="ongoing">
          <DataTable columns={threadsCols} data={ongoingThreads} />
        </TabsContent>
        <TabsContent value="finished">
          <DataTable columns={threadsCols} data={finishedThreads} />
        </TabsContent>
      </Tabs>

      <div className="flex justify-between">
        <EditCharacter character={character} />
        <DeleteCharacter character={character} />
      </div>
    </section>
  );
}
