import { notFound } from "next/navigation";
import { clientAndUserHelper } from "../_lib/action-auth-helpers";
import Home from "../_components/Home";

export default async function Page() {
  const { userId } = await clientAndUserHelper();

  if (!userId) return notFound();

  return (
    <section className="flex flex-col gap-12 items-center ">
      <Home />
    </section>
  );
}
