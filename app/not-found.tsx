import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <div className="grid place-content-center">
      <h1 className="text-2xl">... Whoah! 😱</h1>
      You've stumbled upon the dreaded 404 error: page not found.
    </div>
  );
}
