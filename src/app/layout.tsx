
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { BottomNavigation } from "@/components/layout/bottom-navigation";
import { Toaster } from "@/components/ui/toaster";
import { SidebarProvider } from "@/components/ui/sidebar";
import { PWAInstallPrompt } from "@/components/pwa-install-prompt";

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
  manifest: "/manifest.json",
  themeColor: "#3F51B5",
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "TouchCSS Studio",
    startupImage: [
      { url: "/icons/splash-640x1136.png", media: "(device-width: 320px) and (device-height: 568px)" },
      { url: "/icons/splash-750x1334.png", media: "(device-width: 375px) and (device-height: 667px)" },
      { url: "/icons/splash-1242x2208.png", media: "(device-width: 414px) and (device-height: 736px)" },
      { url: "/icons/splash-1125x2436.png", media: "(device-width: 375px) and (device-height: 812px)" },
    ]
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    icon: [
      { url: "/icons/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/icons/icon-192x192.png" },
    ],
    other: [
      {
        rel: "mask-icon",
        url: "/icons/safari-pinned-tab.svg",
        color: "#3F51B5"
      }
    ]
  },
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
            </main>            <BottomNavigation />
            <Toaster />
            <PWAInstallPrompt />
          </div>
        </SidebarProvider>
      </body>
    </html>
  );
}
