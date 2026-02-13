"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, GraduationCap, LayoutGrid, Layers, Sparkles, AlertCircle, Code } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { hasAPIKey } from "@/lib/api-key-storage";
import { useLanguage } from "@/contexts/language-context";

export function BottomNavigation() {
  const pathname = usePathname();
  const [apiConfigured, setApiConfigured] = useState(true);
  const { currentLanguage, languageConfig } = useLanguage();

  useEffect(() => {
    setApiConfigured(hasAPIKey());

    const handleStorageChange = () => {
      setApiConfigured(hasAPIKey());
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  interface NavItem {
    href: string;
    label: string;
    icon: React.ElementType;
    requiresAPI?: boolean;
  }

  const navItems: NavItem[] = [
    { href: "/", label: "Home", icon: Home },
    { href: `/${currentLanguage}/learn`, label: "Learn", icon: GraduationCap },
  ];

  if (languageConfig.features.hasREPL) {
    navItems.push({ href: `/${currentLanguage}/playground`, label: "Playground", icon: Code });
  }

  if (languageConfig.features.hasVisualEditor) {
    navItems.push({ href: `/${currentLanguage}/build`, label: "Build", icon: LayoutGrid });
  }

  navItems.push(
    { href: `/${currentLanguage}/features`, label: "Features", icon: Layers },
    { href: `/${currentLanguage}/tools/explainer`, label: "AI Tools", icon: Sparkles, requiresAPI: true }
  );

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-20 bg-card/90 backdrop-blur-lg shadow-t border-t border-border z-50">
      <div className="container mx-auto h-full">
        <ul className="flex justify-around items-center h-full px-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href ||
              (item.href !== "/" && pathname.startsWith(item.href)) ||
              (item.href.includes("/tools/") && pathname.includes("/tools/"));
            const showWarning = item.requiresAPI && !apiConfigured;

            return (
              <li key={item.label} className="flex-1">
                <Link
                  href={item.href}
                  className={cn(
                    "flex flex-col items-center justify-center text-center p-2 rounded-lg transition-colors duration-200 ease-in-out group relative",
                    "hover:bg-accent/10",
                    isActive
                      ? "text-primary font-semibold"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                  aria-current={isActive ? "page" : undefined}
                >
                  <div className="relative">
                    <item.icon
                      className={cn(
                        "w-6 h-6 mb-1 transition-transform duration-200 ease-in-out group-hover:scale-105",
                        isActive ? "scale-110 text-primary" : "text-muted-foreground group-hover:text-foreground"
                      )}
                      aria-hidden="true"
                    />
                    {showWarning && (
                      <AlertCircle className="absolute -top-1 -right-1 w-3 h-3 text-destructive animate-pulse" />
                    )}
                  </div>
                  <span className="text-xs truncate">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Language Indicator */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold shadow-lg flex items-center gap-1">
          <span>{languageConfig.icon}</span>
          <span>{languageConfig.displayName}</span>
        </div>
      </div>
    </nav>
  );
}
