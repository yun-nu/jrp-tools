import { getCharacterData } from "@/app/_lib/data-service";

interface Props {
  params: { displayName: string };
}

export default async function Page({ params }: Props) {
  const displayName = (await params).displayName;
  const { name, isPublic } = await getCharacterData(displayName);

  if (!isPublic)
    return (
      <div>
        <p>This character information is private.</p>
      </div>
    );

  return <div>{name}</div>;
}
