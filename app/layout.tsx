import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cookies } from "next/headers";
import Header from "./_components/Header";
import { SidebarNavigation } from "./_components/SidebarNavigation";
import { SidebarInset, SidebarProvider } from "./_components/ui/Sidebar";
import { Toaster } from "./_components/ui/Toaster";
import { getClientAndUser } from "./_lib/action-auth-helpers";
import "./globals.css";

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
  const { userId: user } = await getClientAndUser();
  const cookieStore = await cookies();
  const defaultOpen = !cookieStore.get("sidebar_state")
    ? true
    : cookieStore.get("sidebar_state")?.value === "true";

  return (
    <html lang="en">
      <body className={`${inter.className} antialiased dark h-screen`}>
        <SidebarProvider defaultOpen={defaultOpen}>
          <SidebarNavigation isLoggedIn={!!user} />
          <SidebarInset>
            <main className="w-full h-full flex flex-col">
              <Header user={user} />
              <div className="flex h-full justify-center items-center py-10 px-4 sm:px-8">
                {children}
              </div>
            </main>
            <Toaster />
          </SidebarInset>
        </SidebarProvider>
      </body>
    </html>
  );
}
