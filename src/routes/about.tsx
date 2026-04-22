import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { SiteLayout } from "@/components/SiteLayout";
import aboutImg from "@/assets/about-jimon.jpg";
import { CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/about")({
  component: AboutPage,
  head: () => ({
    meta: [
      { title: "О компании JIMON Group — История и миссия" },
      { name: "description", content: "JIMON Group: 33 года развития, 4 столетних бренда традиционной китайской медицины, структура «1+6+1»." },
      { property: "og:title", content: "О компании JIMON Group" },
      { property: "og:description", content: "История, миссия и ценности корпоративной группы JIMON." },
    ],
  }),
});

function AboutPage() {
  const { t } = useTranslation();
  const values = ["quality", "tradition", "innovation", "responsibility"] as const;

  return (
    <SiteLayout>
      <section className="bg-forest py-20 text-forest-foreground md:py-28">
        <div className="container-app">
          <h1 className="text-display max-w-3xl text-4xl font-extrabold sm:text-5xl md:text-6xl">
            {t("about.title")}
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-cream/80">{t("about.subtitle")}</p>
        </div>
      </section>

      <section className="bg-background py-20 md:py-24">
        <div className="container-app grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="text-display text-3xl font-extrabold text-foreground sm:text-4xl">
              {t("about.history_title")}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">
              {t("about.history_text")}
            </p>
          </div>
          <div className="overflow-hidden rounded-xl border border-border">
            <img
              src={aboutImg}
              alt="JIMON heritage"
              loading="lazy"
              width={1600}
              height={1024}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="bg-cream py-20 md:py-24">
        <div className="container-app grid gap-10 md:grid-cols-2">
          <div className="rounded-xl border border-border bg-card p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">JIMON</p>
            <h2 className="text-display mt-3 text-3xl font-extrabold text-foreground">
              {t("about.mission_title")}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">
              {t("about.mission_text")}
            </p>
          </div>

          <div className="rounded-xl bg-forest p-8 text-forest-foreground">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">JIMON</p>
            <h2 className="text-display mt-3 text-3xl font-extrabold">{t("about.values_title")}</h2>
            <ul className="mt-6 space-y-4">
              {values.map((v) => (
                <li key={v} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                  <span className="text-base text-cream/90">{t(`about.values.${v}`)}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
