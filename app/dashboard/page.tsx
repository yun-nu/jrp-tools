import { Update01 } from "../_data/updates/Update01";

export const revalidate = 60;

export default async function Page() {
  return (
    <div className="max-w-[80%]">
      <Update01 />
    </div>
  );
}
