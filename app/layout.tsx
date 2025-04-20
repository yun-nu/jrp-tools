import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "./_components/Header";
import { SidebarNavigation } from "./_components/SidebarNavigation";
import { SidebarInset, SidebarProvider } from "./_components/ui/Sidebar";
import { ThemeProvider } from "./_components/ui/ThemeProvider";
import { Toaster } from "./_components/ui/Toaster";
import "./globals.css";
import QueryProvider from "./_providers/QueryProvider";
import { AuthProvider } from "./_providers/AuthProvider";

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
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} antialiased h-screen`}
        suppressHydrationWarning
      >
        <QueryProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <AuthProvider>
              <SidebarProvider>
                <SidebarNavigation />
                <SidebarInset>
                  <main className="w-full h-full flex flex-col">
                    <Header />
                    <div className="flex h-full justify-center items-center py-10 px-4 sm:px-8">
                      {children}
                    </div>
                  </main>
                  <Toaster />
                </SidebarInset>
              </SidebarProvider>
            </AuthProvider>
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
