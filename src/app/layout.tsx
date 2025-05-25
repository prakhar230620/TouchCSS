
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { BottomNavigation } from "@/components/layout/bottom-navigation";
import { Toaster } from "@/components/ui/toaster";
import { SidebarProvider } from "@/components/ui/sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TouchCSS Studio",
  description: "Visually build CSS, learn interactively, and export with TouchCSS Studio.",
  manifest: "/manifest.json", // Assuming you might add a manifest later
  themeColor: "hsl(224, 82%, 59%)", // Updated to new primary color
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "TouchCSS Studio",
  },
  formatDetection: {
    telephone: false,
  },
  icons: [
    { rel: "apple-touch-icon", url: "/icons/icon-192x192.png" }, // Ensure these icons exist
    { rel: "icon", url: "/icons/icon-192x192.png" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <SidebarProvider defaultOpen={false}> {/* Sidebar can be integrated later if needed */}
          <div className="relative flex flex-col min-h-screen">
            <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-20 sm:pb-22"> {/* Adjusted padding-bottom */}
              {children}
            </main>
            <BottomNavigation />
            <Toaster />
          </div>
        </SidebarProvider>
      </body>
    </html>
  );
}
