import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { LangSwitcher } from "./LangSwitcher";
import jimonLogo from "@/assets/jimon-logo.png";

export function Header() {
  const { t } = useTranslation();

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur-md">
      <div className="container-app flex h-24 items-center justify-between gap-4 md:h-36">
        <Link to="/" className="flex items-center gap-3" aria-label={t("brand.name")}>
          <img
            src={jimonLogo}
            alt={t("brand.name")}
            width={520}
            height={140}
            className="h-16 w-auto md:h-28"
          />
        </Link>

        <div className="flex items-center gap-2">
          <LangSwitcher />
        </div>
      </div>
    </header>
  );
}
