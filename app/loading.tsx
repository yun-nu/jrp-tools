import Dots from "./_components/ui/Dots";

export default function Loading() {
  return (
    <div className="grid place-content-center justify-items-center gap-y-4 h-full">
      <Dots />
      <p className="text-xl text-primary-200">Loading page...</p>
    </div>
  );
}
