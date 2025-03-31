import React from "react";
import Dots from "./ui/Dots";

export default function Loading({ text }: { text: string }) {
  return (
    <div className="grid place-content-center justify-items-center gap-y-4 h-full">
      <Dots />
      <p className="text-xl text-primary-200">{text}...</p>
    </div>
  );
}
