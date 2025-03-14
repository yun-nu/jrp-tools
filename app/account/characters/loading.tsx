import { Skeleton } from "@/app/_components/ui/Skeleton";

export default async function Loading() {
  return (
    <div className="mt-32 sm:flex flex-col gap-8 lg:flex-row sm:justify-center items-center">
      {Array.from({ length: 3 }).map((_, i) => (
        <Skeleton
          key={i}
          className="rounded-lg border shadow-sm sm:w-[320px] lg:w-[380px] sm:min-h-[235px] flex flex-col"
        />
      ))}
    </div>
  );
}
