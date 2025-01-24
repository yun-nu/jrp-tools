import Character from "@/app/_components/Character";
import Table from "@/app/_components/Table";
import { getCharacterData, getThreads } from "@/app/_lib/data-service";

interface Props {
  params: { displayName: string };
}

// export async function generateMetadata({ params }: Props) {
//   const character = await getCharacterData(await params.displayName);
//   if (!character) return null;
//   return { title: `${character.name} @ ${character.game}` };
// }

export default async function Page({ params }: Props) {
  const displayName = (await params).displayName;
  const character = await getCharacterData(displayName);
  const threads = await getThreads(character.id);

  return (
    <section>
      <Character character={character} />
      <ul>
        {threads?.map((thread) => (
          <>
            <li>{thread.type}</li>
            <li>{thread.date}</li>
          </>
        ))}
      </ul>
      {/* <Table columns={threads}>
        <Table.Body data={threads}></Table.Body>
      </Table> */}
      <div></div>
    </section>
  );
}
