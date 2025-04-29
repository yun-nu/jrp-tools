import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "./_components/Header";
import { SidebarNavigation } from "./_components/SidebarNavigation";
import { SidebarInset, SidebarProvider } from "./_components/ui/Sidebar";
import { ThemeProvider } from "./_components/ui/ThemeProvider";
import { Toaster } from "./_components/ui/Toaster";
import { AuthProvider } from "./_providers/AuthProvider";
import QueryProvider from "./_providers/QueryProvider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "JRP Tools — Thread Tracker for Journal-Based Roleplay",
  description:
    "Lightweight thread tracker for journal-based roleplay. Store and share your threads with just a few clicks.",
  openGraph: {
    title: "JRP Tools — Thread Tracker for Journal-Based Roleplay",
    description:
      "Lightweight thread tracker for journal-based roleplay. Store and share your threads with just a few clicks.",
    url: "https://www.jrp-tools.com/",
    siteName: "JRP Tools",
    images: [
      {
        url: "https://www.jrp-tools.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "RP Tools Open Graph Image",
      },
    ],
    locale: "en_US",
    type: "website",
  },
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
                  <div className="w-full h-full flex flex-col">
                    <Header />
                    <div className="flex h-full justify-center items-center py-10 px-4 sm:px-8">
                      {children}
                    </div>
                  </div>
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
