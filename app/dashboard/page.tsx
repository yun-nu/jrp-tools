import CreateNewCharacter from "../_components/CreateNewCharacter";
import DeleteCharacter from "../_components/DeleteCharacter";

export const revalidate = 30;

export default async function Page() {
  return (
    <div>
      <h2 className=""></h2>
      <CreateNewCharacter />
      <DeleteCharacter></DeleteCharacter>
    </div>
  );
}

// export default function Page({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <div className="grid grid-cols-[16rem_1fr] h-full gap-12">
//       <div className="">{children}</div>
//     </div>
//   );
// }
