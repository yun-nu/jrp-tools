import Dots from "../_components/ui/Dots";

export default function Loading() {
  return (
    <div className="grid items-center justify-center">
      <Dots />
      <p className="text-xl text-primary-200">Loading data...</p>
    </div>
  );
}
