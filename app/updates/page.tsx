import { Metadata } from "next";
import Update from "../_components/Update";
import { changelog } from "./_lib/changelog";

export const metadata: Metadata = {
  title: "Updates - JRP Tools",
  description: "JRP Tools Changelog",
};

export default async function Page() {
  return <Update items={changelog} />;
}
