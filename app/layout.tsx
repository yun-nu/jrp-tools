import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "./_components/Header";
import { Toaster } from "./_components/ui/Toaster";
import "./globals.css";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "./_components/ui/Sidebar";
import { SidebarNavigation } from "./_components/SidebarNavigation";
import { cookies } from "next/headers";
import { clientAndUserHelper } from "./_lib/action-auth-helpers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "JRP Tools (beta)",
  description: "Lightweight thread tracker for journal roleplay",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { userId: user } = await clientAndUserHelper();
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";

  return (
    <html lang="en">
      <body className={`${inter.className} antialiased dark h-screen`}>
        <SidebarProvider defaultOpen={defaultOpen}>
          {user && <SidebarNavigation />}
          <SidebarInset>
            <main className="w-full h-full flex flex-col">
              <Header user={user} />
              <div className="py-8">{children}</div>
            </main>
            <Toaster />
          </SidebarInset>
        </SidebarProvider>
      </body>
    </html>
  );
}
