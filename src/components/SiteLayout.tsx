import { Header } from "./Header";
import { Footer } from "./Footer";
import { Link } from "@tanstack/react-router";
import { Box, Home, UserRound, Waves } from "lucide-react";

export function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background pb-20 text-foreground md:pb-0">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <nav className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-4 border-t border-border bg-background/95 text-xs font-semibold shadow-lg backdrop-blur md:hidden">
        <Link to="/" className="flex flex-col items-center gap-1 px-2 py-2 text-primary"><Home className="h-5 w-5" /> Главная</Link>
        <Link to="/about" className="flex flex-col items-center gap-1 px-2 py-2 text-muted-foreground"><Waves className="h-5 w-5" /> О нас</Link>
        <Link to="/products" className="flex flex-col items-center gap-1 px-2 py-2 text-muted-foreground"><Box className="h-5 w-5" /> Продукты</Link>
        <Link to="/membership" className="flex flex-col items-center gap-1 px-2 py-2 text-muted-foreground"><UserRound className="h-5 w-5" /> Личный</Link>
      </nav>
    </div>
  );
}
