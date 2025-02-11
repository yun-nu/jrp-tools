import { getCharacterData, getUserId } from "@/app/_lib/data-service";
import Character from "../_components/Character";

interface Props {
  params: { displayName: string };
}

export default async function Page({ params }: Props) {
  const userId = await getUserId();
  const displayName = (await params).displayName;
  const character = await getCharacterData(displayName);

  if (
    (!character.isPublic && character.user_id === userId) ||
    character.isPublic
  )
    return (
      <div>
        <Character character={character} />
      </div>
    );

  return (
    <div>
      <p>This character information is private.</p>
    </div>
  );
}
