import { Skeleton } from "@/app/_components/ui/Skeleton";

export default function LoadingCards() {
  return (
    <div className="flex flex-col gap-12 lg:flex-row sm:justify-center sm:mt-16">
      {Array.from({ length: 3 }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}

function SkeletonCard() {
  return (
    <Skeleton className="rounded-lg border sm:w-[380px] h-[235px] flex flex-col p-6 justify-between">
      <div className="flex justify-between items-center gap-2">
        <Skeleton className="bg-foreground/10 rounded w-[50px] h-[50px] border " />
        <div className="flex flex-col flex-1 gap-2">
          <Skeleton className="bg-foreground/10 h-4 w-20" />
          <Skeleton className="bg-foreground/10 h-2 w-24" />
        </div>
        <div className="bg-foreground/10 h-4 w-14 rounded-full"></div>
      </div>
      <div className="h-16"></div>
      <div className="flex justify-between items-center gap-2">
        <Skeleton className="bg-foreground/10 h-8 w-[50%]" />
        <div className="flex gap-2">
          <Skeleton className="bg-foreground/10 h-10 w-10" />
          <Skeleton className="bg-foreground/10 h-10 w-10" />
        </div>
      </div>
    </Skeleton>
  );
}
