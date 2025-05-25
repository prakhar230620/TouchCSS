
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, GraduationCap, LayoutGrid, Share2, Settings2 } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/learn", label: "Learn", icon: GraduationCap },
  { href: "/build", label: "Build", icon: LayoutGrid },
  { href: "/export", label: "Export", icon: Share2 },
  { href: "/tools/explain-css", label: "AI", icon: Settings2 },
];

export function BottomNavigation() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-20 bg-card/80 backdrop-blur-md shadow-t border-t border-border z-50">
      <div className="container mx-auto h-full">
        <ul className="flex justify-around items-center h-full px-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
            return (
              <li key={item.label} className="flex-1">
                <Link
                  href={item.href}
                  className={cn(
                    "flex flex-col items-center justify-center text-center p-2 rounded-lg transition-colors duration-200 ease-in-out",
                    "hover:bg-accent/20",
                    isActive
                      ? "text-primary font-semibold"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                  aria-current={isActive ? "page" : undefined}
                >
                  <item.icon
                    className={cn(
                      "w-6 h-6 mb-1 transition-transform duration-200 ease-in-out",
                      isActive ? "scale-110" : ""
                    )}
                    aria-hidden="true"
                  />
                  <span className="text-xs truncate">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
