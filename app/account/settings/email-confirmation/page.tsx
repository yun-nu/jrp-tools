import MessageBox from "@/app/_components/MessageBox";
import { Metadata } from "next";
import { redirect } from "next/navigation";

type SearchParams = {
  searchParams: {
    message?: string;
    code?: string;
  };
};

export const metadata: Metadata = {
  title: "Email Confirmation",
  description: "Confirm your email change",
};

export default async function Page({ searchParams }: SearchParams) {
  const { message, code } = await searchParams;

  if (message) return <MessageBox>{message}.</MessageBox>;

  if (code?.length === 36)
    return <MessageBox>Email address changed successfully.</MessageBox>;

  if (!message || !code) {
    redirect("/account/settings");
  }
}
