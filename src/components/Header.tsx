import { Link, useLocation } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { LangSwitcher } from "./LangSwitcher";
import jimonLogo from "@/assets/jimon-logo.png";

export function Header() {
  const { t } = useTranslation();
  const location = useLocation();
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
      <div className="container-app flex h-16 min-w-0 items-center justify-between gap-2 md:h-24 md:gap-4">
        <Link to="/" className="flex min-w-0 items-center gap-3" aria-label={t("brand.name")}>
          <img
            src={jimonLogo}
            alt={t("brand.name")}
            width={520}
            height={140}
            className="h-10 w-auto shrink md:h-20"
          />
        </Link>

        <nav className="hidden items-center gap-5 text-sm font-semibold text-foreground/80 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`transition-colors hover:text-primary ${
                item.to === "/" ? (location.pathname === "/" ? "text-primary" : "") : location.pathname.startsWith(item.to) ? "text-primary" : ""
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-1 md:gap-2">
          <LangSwitcher />
        </div>
      </div>
    </header>
  );
}
