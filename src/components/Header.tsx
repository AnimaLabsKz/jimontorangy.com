import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { Menu, Search } from "lucide-react";
import { LangSwitcher } from "./LangSwitcher";
import jimonLogo from "@/assets/jimon-logo.png";

export function Header() {
  const { t } = useTranslation();
  const nav = [
    { to: "/", label: t("nav.home") },
    { to: "/about", label: t("nav.about") },
    { to: "/brands", label: t("nav.brands") },
    { to: "/layout", label: "规划布局" },
    { to: "/products", label: t("nav.products") },
    { to: "/news", label: t("nav.news") },
    { to: "/contact", label: t("nav.contact") },
  ] as const;

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur-md">
      <div className="container-app flex h-20 items-center justify-between gap-4 md:h-24">
        <Link to="/" className="flex items-center gap-3" aria-label={t("brand.name")}>
          <img
            src={jimonLogo}
            alt={t("brand.name")}
            width={520}
            height={140}
            className="h-14 w-auto md:h-20"
          />
        </Link>

        <nav className="hidden items-center gap-5 text-sm font-semibold text-foreground/80 lg:flex">
          {nav.map((item) => (
            <Link key={item.to} to={item.to} className="transition-colors hover:text-primary active:text-primary">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button className="hidden rounded-md p-2 text-foreground/70 hover:bg-muted md:inline-flex" aria-label="Search">
            <Search className="h-5 w-5" />
          </button>
          <LangSwitcher />
          <button className="rounded-md p-2 text-foreground/70 hover:bg-muted lg:hidden" aria-label="Menu">
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>
    </header>
  );
}
