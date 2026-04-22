import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Menu, X } from "lucide-react";
import { LangSwitcher } from "./LangSwitcher";
import { useIsAdmin } from "@/hooks/use-is-admin";
import jimonLogo from "@/assets/jimon-logo.png";

export function Header() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const { isAdmin } = useIsAdmin();

  const navItems = [
    { to: "/" as const, label: t("nav.home") },
    { to: "/about" as const, label: t("nav.about") },
    { to: "/brands" as const, label: t("nav.brands") },
    { to: "/products" as const, label: t("nav.products") },
    { to: "/news" as const, label: t("nav.news") },
    { to: "/contact" as const, label: t("nav.contact") },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur-md">
      <div className="container-app flex h-24 items-center justify-between gap-4 md:h-36">
        <Link to="/" className="flex items-center gap-3" onClick={() => setOpen(false)} aria-label={t("brand.name")}>
          <img
            src={jimonLogo}
            alt={t("brand.name")}
            width={520}
            height={140}
            className="h-16 w-auto md:h-28"
          />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/" }}
              className="rounded-md px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-muted hover:text-primary"
              activeProps={{ className: "rounded-md px-3 py-2 text-sm font-semibold text-primary bg-muted" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <LangSwitcher />
          {isAdmin ? (
            <Link
              to="/admin"
              className="rounded-md bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              {t("nav.admin")}
            </Link>
          ) : (
            <Link
              to="/login"
              className="rounded-md border border-border px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
            >
              {t("nav.login")}
            </Link>
          )}
        </div>

        <button
          className="flex h-10 w-10 items-center justify-center rounded-md text-foreground lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-background lg:hidden">
          <div className="container-app flex flex-col gap-1 py-4">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                activeOptions={{ exact: item.to === "/" }}
                className="rounded-md px-3 py-3 text-base font-medium text-foreground transition-colors hover:bg-muted"
                activeProps={{ className: "rounded-md px-3 py-3 text-base font-semibold text-primary bg-muted" }}
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-3 flex items-center justify-between border-t border-border pt-4">
              <LangSwitcher />
              {isAdmin ? (
                <Link
                  to="/admin"
                  onClick={() => setOpen(false)}
                  className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
                >
                  {t("nav.admin")}
                </Link>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setOpen(false)}
                  className="rounded-md border border-border px-4 py-2 text-sm font-medium text-foreground"
                >
                  {t("nav.login")}
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
