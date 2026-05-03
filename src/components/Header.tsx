import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Menu, X, ShoppingBag } from "lucide-react";
import { LangSwitcher } from "./LangSwitcher";
import { useInquiry } from "@/hooks/use-inquiry";
import jimonLogo from "@/assets/jimon-logo.png";

export function Header() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const inquiry = useInquiry();

  const links = [
    { to: "/about" as const, label: t("nav.about") },
    { to: "/brands" as const, label: t("nav.brands") },
    { to: "/products" as const, label: t("nav.products") },
    { to: "/layout" as const, label: t("nav.layout") },
    { to: "/news" as const, label: t("nav.news") },
    { to: "/membership" as const, label: t("nav.membership") },
    { to: "/contact" as const, label: t("nav.contact") },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/90 backdrop-blur-md">
      <div className="container-app flex h-20 items-center justify-between gap-4 md:h-24">
        <Link to="/" className="flex items-center gap-3" aria-label={t("brand.name")}>
          <img src={jimonLogo} alt={t("brand.name")} className="h-12 w-auto md:h-16" />
        </Link>

        <nav className="hidden items-center gap-5 lg:flex">
          {links.map((l) => (
            <Link key={l.to} to={l.to} className="text-sm font-medium text-foreground/80 transition-colors hover:text-primary"
              activeProps={{ className: "text-primary font-semibold" }}>
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button onClick={inquiry.open} className="relative inline-flex items-center gap-1 rounded-md border border-border bg-card px-3 py-2 text-sm font-medium hover:bg-muted" aria-label="Inquiry basket">
            <ShoppingBag className="h-4 w-4" />
            {inquiry.items.length > 0 && (
              <span className="ml-1 rounded-full bg-primary px-1.5 text-xs font-bold text-primary-foreground">{inquiry.items.length}</span>
            )}
          </button>
          <LangSwitcher />
          <button className="lg:hidden" onClick={() => setOpen(!open)} aria-label="Menu">
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>
      {open && (
        <div className="border-t border-border bg-background lg:hidden">
          <nav className="container-app flex flex-col py-4">
            {links.map((l) => (
              <Link key={l.to} to={l.to} onClick={() => setOpen(false)} className="py-3 text-base font-medium">{l.label}</Link>
            ))}
            <Link to="/legal" onClick={() => setOpen(false)} className="py-3 text-sm text-muted-foreground">{t("nav.legal")}</Link>
          </nav>
        </div>
      )}
    </header>
  );
}
