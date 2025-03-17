import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "./_components/Header";
import { Toaster } from "./_components/ui/Toaster";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "JRP Tools (beta)",
  description: "Lightweight thread tracker for journal roleplay",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased dark flex flex-col h-screen`}
      >
        <Header />
        <main className="flex-1 overflow-auto flex justify-center">
          {children}
        </main>
        <Toaster />
      </body>
    </html>
  );
}
