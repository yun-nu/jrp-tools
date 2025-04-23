import CharacterDialog from "@/app/_components/CharacterDialog";
import { Metadata } from "next";
import CharacterList from "../../_components/CharacterList";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Character list - JRP Tools",
};

export default function Page() {
  return (
    <section className="flex flex-col gap-12 items-center">
      <CharacterDialog mode="add" />
      <CharacterList />
    </section>
  );
}
