import { useTranslation } from "react-i18next";
import { MapPin, Mail } from "lucide-react";
import { Link } from "@tanstack/react-router";
import jimonLogo from "@/assets/jimon-logo.png";

export function Footer() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  const navLinks = [
    { to: "/about", label: t("nav.about") },
    { to: "/brands", label: t("nav.brands") },
    { to: "/products", label: t("nav.products") },
    { to: "/layout", label: t("nav.layout") },
    { to: "/news", label: t("nav.news") },
    { to: "/membership", label: t("nav.membership") },
    { to: "/contact", label: t("nav.contact") },
    { to: "/legal", label: t("nav.legal") },
  ] as const;

  return (
    <footer className="bg-forest text-forest-foreground">
      <div className="container-app py-14 md:py-20">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="inline-flex items-center rounded-lg bg-cream/95 px-4 py-3 shadow-sm">
              <img src={jimonLogo} alt={t("brand.name")} width={520} height={140} className="h-20 w-auto md:h-28" />
            </div>
            <p className="mt-4 max-w-xs text-sm text-cream/70">{t("brand.tagline")}</p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gold">{t("footer.links_title")}</h3>
            <ul className="mt-4 space-y-2 text-sm text-cream/80">
              {navLinks.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="transition-colors hover:text-gold">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gold">{t("footer.contacts_title")}</h3>
            <ul className="mt-4 space-y-3 text-sm text-cream/80">
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                <span>Алматы қ., Дарабоз ш.а., 49-үй, 37-кеңсе</span>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                <a href="mailto:info@jimon.kz" className="transition-colors hover:text-gold">info@jimon.kz</a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gold">{t("footer.legal_title")}</h3>
            <ul className="mt-4 space-y-2 text-sm text-cream/70">
              <li>JIMON TORANGY DAILY NECESSITES ЖШС</li>
              <li>БИН: 250540014840</li>
              <li>ИИК: KZ48722S000052175278</li>
              <li>АО «Kaspi Bank»</li>
              <li>БИК: CASPKZKA</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-cream/15 pt-6 md:flex-row md:items-center">
          <p className="text-xs text-cream/60">© {year} JIMON TORANGY DAILY NECESSITES ЖШС. {t("footer.rights")}.</p>
          <p className="text-xs uppercase tracking-wider text-gold/80">{t("brand.slogan")}</p>
        </div>
      </div>
    </footer>
  );
}
