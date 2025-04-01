import { Metadata } from "next";
import SignInForm from "../_components/SignInForm";

export const metadata: Metadata = {
  title: "Sign in - JRP Tools",
  description: "Sign in to JRP Tools",
};

export default function Page() {
  return (
    <section className="flex items-center h-full">
      <SignInForm />
    </section>
  );
}
