import { getCharacterData } from "@/app/_lib/data-service";
import { Metadata } from "next";
import Character from "../../_components/Character";
import { authActionHelper } from "../../_lib/action-auth-helpers";
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
  const { user } = await authActionHelper();
  const displayName = (await params).displayName;
  const character = await getCharacterData(displayName);

  if ("error" in character) notFound();

  const { isPublic, userId } = character || {};

  if ((!isPublic && userId === user) || isPublic)
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
