import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "./_components/Header";
import { Toaster } from "./_components/ui/Toaster";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "RP-tools (beta)",
  description: "RP thread tracking made easy",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased dark min-h-screen flex flex-col`}
      >
        <Header />
        <main className="flex-1 px-8 py-10 grid">{children}</main>
        <Toaster />
      </body>
    </html>
  );
}
