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
  description: "Visually build CSS and learn interactively with TouchCSS Studio.",
  manifest: "/manifest.json",
  themeColor: "#3F51B5",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "TouchCSS Studio",
  },
  formatDetection: {
    telephone: false,
  },
  icons: [
    { rel: "apple-touch-icon", url: "/icons/icon-192x192.png" },
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
        <SidebarProvider defaultOpen={false}>
          <div className="relative flex flex-col min-h-screen">
            <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-28">
              {" "}
              {/* pb-28 for bottom nav clearance */}
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
