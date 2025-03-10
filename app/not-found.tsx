import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <div>You've stumbled upon the dreaded 404 error... page not found.</div>
  );
}
