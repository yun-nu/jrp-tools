import { Metadata } from "next";
import Updates from "../_components/Updates";
import { changelog } from "./_lib/changelog";

export const metadata: Metadata = {
  title: "Updates - JRP Tools",
  description: "JRP Tools Changelog",
};

export default function Page() {
  return <Updates items={changelog} />;
}
