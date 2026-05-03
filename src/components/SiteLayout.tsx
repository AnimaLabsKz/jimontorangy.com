import { Header } from "./Header";
import { Footer } from "./Footer";
import { Link, useLocation } from "@tanstack/react-router";
import { Box, Home, UserRound, Waves } from "lucide-react";

export function SiteLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const mobileNav = [
    { to: "/", label: "Главная", icon: Home },
    { to: "/about", label: "О нас", icon: Waves },
    { to: "/products", label: "Продукты", icon: Box },
    { to: "/membership", label: "Личный", icon: UserRound },
  ] as const;

  return (
    <div className="flex min-h-screen flex-col bg-background pb-20 text-foreground md:pb-0">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <nav className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-4 border-t border-border bg-background/95 text-xs font-semibold shadow-lg backdrop-blur md:hidden">
        {mobileNav.map((item) => {
          const Icon = item.icon;
          const active = item.to === "/" ? location.pathname === "/" : location.pathname.startsWith(item.to);
          return (
            <Link key={item.to} to={item.to} className={`flex flex-col items-center gap-1 px-2 py-2 ${active ? "text-primary" : "text-muted-foreground"}`}>
              <Icon className="h-5 w-5" /> {item.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
