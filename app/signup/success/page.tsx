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
  title: "Welcome to JRP Tools",
};

export default async function Page({ searchParams }: SearchParams) {
  const { code } = await searchParams;

  if (code?.length === 36)
    return (
      <MessageBox>
        <span>You can now use the provided email address to log in.</span>

        <span className="block mt-4">
          Thank you for your interest in JRP Tools!
        </span>
      </MessageBox>
    );

  if (!code || code?.length !== 36) {
    redirect("/");
  }
}
