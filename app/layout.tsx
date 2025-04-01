import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cookies } from "next/headers";
import Header from "./_components/Header";
import { SidebarNavigation } from "./_components/SidebarNavigation";
import { SidebarInset, SidebarProvider } from "./_components/ui/Sidebar";
import { Toaster } from "./_components/ui/Toaster";
import "./globals.css";
import { getUserId } from "./_lib/actions-user";
import { ThemeProvider } from "./_components/ui/ThemeProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "JRP Tools",
  description: "Lightweight thread tracker for journal-based roleplay",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { userId: user } = await getUserId();
  const cookieStore = await cookies();
  const defaultOpen = !cookieStore.get("sidebar_state")
    ? true
    : cookieStore.get("sidebar_state")?.value === "true";

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} antialiased h-screen`}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
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
        </ThemeProvider>
      </body>
    </html>
  );
}
