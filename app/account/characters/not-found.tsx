import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Character not found - JRP Tools",
};

export default function NotFound() {
  return (
    <div className="grid place-content-center">Character page not found.</div>
  );
}
