import Dots from "@/app/_components/ui/Dots";

export default async function Loading() {
  return (
    <div className="grid place-content-center h-full gap-y-4 justify-items-center">
      <Dots />
      Fetching threads
    </div>
  );
}
