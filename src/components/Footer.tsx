import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { Leaf, MapPin, Mail } from "lucide-react";

export function Footer() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-forest text-forest-foreground">
      <div className="container-app py-14 md:py-20">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-md bg-gold text-gold-foreground">
                <Leaf className="h-5 w-5" strokeWidth={2.2} />
              </span>
              <span className="text-display text-lg font-extrabold tracking-tight">
                {t("brand.name")}
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm text-cream/70">{t("brand.tagline")}</p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gold">
              {t("footer.links_title")}
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link to="/about" className="text-cream/80 transition-colors hover:text-gold">{t("nav.about")}</Link></li>
              <li><Link to="/brands" className="text-cream/80 transition-colors hover:text-gold">{t("nav.brands")}</Link></li>
              <li><Link to="/products" className="text-cream/80 transition-colors hover:text-gold">{t("nav.products")}</Link></li>
              <li><Link to="/news" className="text-cream/80 transition-colors hover:text-gold">{t("nav.news")}</Link></li>
              <li><Link to="/contact" className="text-cream/80 transition-colors hover:text-gold">{t("nav.contact")}</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gold">
              {t("footer.contacts_title")}
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-cream/80">
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                <span>{t("contact.address_value")}</span>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                <a href="mailto:info@jimon.kz" className="transition-colors hover:text-gold">info@jimon.kz</a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gold">
              {t("footer.legal_title")}
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-cream/70">
              <li>{t("footer.company")}</li>
              <li>БИН: 230440013517</li>
              <li>ИИК: KZ80722S000026938093</li>
              <li>АО «Kaspi Bank»</li>
              <li>БИК: CASPKZKA</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-cream/15 pt-6 md:flex-row md:items-center">
          <p className="text-xs text-cream/60">
            © {year} {t("footer.company")}. {t("footer.rights")}.
          </p>
          <p className="text-xs uppercase tracking-wider text-gold/80">{t("brand.slogan")}</p>
        </div>
      </div>
    </footer>
  );
}
