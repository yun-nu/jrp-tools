import FAQ from "../_components/FAQ";
import { aboutFAQItems } from "./_lib/faq-content";
import { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "About JRP Tools",
  description: "About JRP Tools",
};

export default async function Page() {
  return <FAQ items={aboutFAQItems} />;
}
