import { Metadata } from "next";
import Updates from "../_components/Updates";
import { changelog } from "./_lib/changelog";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Updates - JRP Tools",
  description: "JRP Tools Changelog",
};

export default async function Page() {
  return <Updates items={changelog} />;
}
