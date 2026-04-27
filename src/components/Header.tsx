import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Menu, X } from "lucide-react";
import { LangSwitcher } from "./LangSwitcher";
import jimonLogo from "@/assets/jimon-logo.png";

export function Header() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  const anchorItems = [
    { hash: "about", label: t("nav.about") },
    { hash: "brands", label: t("nav.brands") },
    { hash: "products", label: t("nav.products") },
  ];

  const handleAnchor = (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
    if (typeof window === "undefined") return;
    if (window.location.pathname === "/") {
      e.preventDefault();
      const el = document.getElementById(hash);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      history.replaceState(null, "", `#${hash}`);
      setOpen(false);
    }
  };

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
          <Link
            to="/"
            activeOptions={{ exact: true }}
            className="rounded-md px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-muted hover:text-primary"
            activeProps={{ className: "rounded-md px-3 py-2 text-sm font-semibold text-primary bg-muted" }}
          >
            {t("nav.home")}
          </Link>
          {anchorItems.map((item) => (
            <a
              key={item.hash}
              href={`/#${item.hash}`}
              onClick={(e) => handleAnchor(e, item.hash)}
              className="rounded-md px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-muted hover:text-primary"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <LangSwitcher />
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
            <Link
              to="/"
              onClick={() => setOpen(false)}
              activeOptions={{ exact: true }}
              className="rounded-md px-3 py-3 text-base font-medium text-foreground transition-colors hover:bg-muted"
              activeProps={{ className: "rounded-md px-3 py-3 text-base font-semibold text-primary bg-muted" }}
            >
              {t("nav.home")}
            </Link>
            {anchorItems.map((item) => (
              <a
                key={item.hash}
                href={`/#${item.hash}`}
                onClick={(e) => handleAnchor(e, item.hash)}
                className="rounded-md px-3 py-3 text-base font-medium text-foreground transition-colors hover:bg-muted"
              >
                {item.label}
              </a>
            ))}
            <div className="mt-3 flex items-center justify-between border-t border-border pt-4">
              <LangSwitcher />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
