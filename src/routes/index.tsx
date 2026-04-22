import { createFileRoute, Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { ArrowRight, Award, Sparkles, Globe2, FlaskConical, Heart, Leaf, ChevronRight } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { useLang } from "@/hooks/use-lang";
import { getDbField } from "@/lib/i18n";
import heroImg from "@/assets/hero-jimon.jpg";
import heroBrands from "@/assets/hero-brands.png";
import heroMap from "@/assets/hero-map.png";

export const Route = createFileRoute("/")({
  component: HomePage,
  head: () => ({
    meta: [
      { title: "JIMON Group — Восточная сила природы для всего мира" },
      { name: "description", content: "JIMON TORANGY DAILY NECESSITES — корпоративная группа здоровья. Продукция ТКМ, БАДы, косметика. 33 года опыта." },
      { property: "og:title", content: "JIMON Group — Восточная сила природы" },
      { property: "og:description", content: "Корпоративная группа JIMON: 4 столетних бренда ТКМ, представительство в Казахстане." },
    ],
  }),
});

function HomePage() {
  return (
    <SiteLayout>
      <Hero />
      <Intro />
      <Facts />
      <Directions />
      <NewsSection />
      <CTA />
    </SiteLayout>
  );
}

function Hero() {
  const slides = [heroImg, heroBrands, heroMap];
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActive((i) => (i + 1) % slides.length);
    }, 10000);
    return () => clearInterval(id);
  }, [slides.length]);

  return (
    <section className="relative overflow-hidden bg-forest">
      <div className="relative h-[55vh] min-h-[360px] w-full md:h-[72vh] md:min-h-[520px]">
        {slides.map((src, i) => (
          <div
            key={src}
            className="absolute inset-0 transition-opacity duration-[1200ms] ease-in-out"
            style={{
              backgroundImage: `url(${src})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              opacity: i === active ? 1 : 0,
            }}
            aria-hidden
          />
        ))}

        <div className="absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Slide ${i + 1}`}
              className={`h-1.5 rounded-full transition-all ${
                i === active ? "w-8 bg-gold" : "w-4 bg-cream/60 hover:bg-cream/80"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function Intro() {
  const { t } = useTranslation();
  return (
    <section className="bg-forest py-20 text-forest-foreground md:py-28 lg:py-32">
      <div className="container-app grid gap-10 md:grid-cols-5">
        <div className="md:col-span-3">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold animate-fade-up">
            {t("hero.eyebrow")}
          </p>
          <h1 className="text-display mt-4 text-4xl font-extrabold leading-[1.05] sm:text-5xl md:text-6xl lg:text-7xl animate-fade-up">
            {t("hero.title")}
          </h1>
          <p className="mt-6 max-w-2xl text-base text-cream/85 sm:text-lg animate-fade-up" style={{ animationDelay: "120ms" }}>
            {t("hero.subtitle")}
          </p>
          <div className="mt-8 flex flex-wrap gap-3 animate-fade-up" style={{ animationDelay: "240ms" }}>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 rounded-md bg-gold px-6 py-3 text-sm font-semibold text-gold-foreground transition-transform hover:scale-[1.02]"
            >
              {t("hero.cta_primary")} <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 rounded-md border border-cream/30 bg-white/5 px-6 py-3 text-sm font-semibold text-cream backdrop-blur transition-colors hover:bg-white/10"
            >
              {t("hero.cta_secondary")}
            </Link>
          </div>
        </div>

        <div className="flex items-center justify-start md:col-span-2 md:justify-end">
          <div className="relative w-full max-w-sm rounded-2xl border border-gold/30 bg-gold/10 p-7 backdrop-blur-sm animate-fade-up" style={{ animationDelay: "320ms" }}>
            <Sparkles className="h-8 w-8 text-gold" />
            <p className="mt-4 text-display text-lg font-semibold leading-snug text-cream">
              «{t("brand.slogan")}»
            </p>
            <p className="mt-3 text-sm text-cream/70">JIMON Group · 1992 — {new Date().getFullYear()}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Facts() {
  const { t } = useTranslation();
  const facts = [
    { value: "4", label: t("facts.items.brands") },
    { value: "1+6+1", label: t("facts.items.structure") },
    { value: "~2000", label: t("facts.items.people") },
    { value: "33", label: t("facts.items.years") },
  ];
  return (
    <section className="bg-cream py-20 md:py-28">
      <div className="container-app">
        <div className="max-w-2xl">
          <h2 className="text-display text-3xl font-extrabold text-foreground sm:text-4xl">
            {t("facts.title")}
          </h2>
          <p className="mt-3 text-base text-muted-foreground">{t("facts.subtitle")}</p>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {facts.map((f) => (
            <div
              key={f.label}
              className="group relative overflow-hidden rounded-xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg"
            >
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary to-gold" />
              <p className="text-display text-5xl font-extrabold text-primary">{f.value}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{f.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Directions() {
  const { t } = useTranslation();
  const items = [
    { key: "tcm", icon: Leaf },
    { key: "health", icon: Heart },
    { key: "global", icon: Globe2 },
    { key: "rd", icon: FlaskConical },
    { key: "csr", icon: Award },
  ] as const;

  return (
    <section className="bg-background py-20 md:py-28">
      <div className="container-app">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">
            JIMON · 5 directions
          </p>
          <h2 className="text-display mt-3 text-3xl font-extrabold text-foreground sm:text-4xl">
            {t("directions.title")}
          </h2>
          <p className="mt-3 text-base text-muted-foreground">{t("directions.subtitle")}</p>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {items.map(({ key, icon: Icon }, i) => (
            <article
              key={key}
              className={`group relative flex flex-col overflow-hidden rounded-xl border border-border bg-card p-7 transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl ${
                i === 0 ? "lg:col-span-1" : ""
              }`}
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-md bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <Icon className="h-6 w-6" strokeWidth={2} />
              </span>
              <h3 className="text-display mt-5 text-xl font-bold text-foreground">
                {t(`directions.items.${key}.title`)}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {t(`directions.items.${key}.desc`)}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

type NewsRow = {
  id: string;
  slug: string;
  cover_url: string | null;
  published_at: string | null;
  title_ru: string; title_kz: string; title_uz: string; title_en: string; title_kg: string;
  excerpt_ru: string;
};

function NewsSection() {
  const { t } = useTranslation();
  const { lang } = useLang();
  const [items, setItems] = useState<NewsRow[]>([]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const { supabase } = await import("@/integrations/supabase/client");
      const { data } = await supabase
        .from("news")
        .select("id,slug,cover_url,published_at,title_ru,title_kz,title_uz,title_en,title_kg,excerpt_ru")
        .eq("is_published", true)
        .order("published_at", { ascending: false })
        .limit(3);
      if (mounted && data) setItems(data as NewsRow[]);
    })();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section className="bg-cream py-20 md:py-28">
      <div className="container-app">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-xl">
            <h2 className="text-display text-3xl font-extrabold text-foreground sm:text-4xl">
              {t("news.section_title")}
            </h2>
            <p className="mt-3 text-base text-muted-foreground">{t("news.section_subtitle")}</p>
          </div>
          <Link
            to="/news"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-primary/80"
          >
            {t("news.section_title")} <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        {items.length === 0 ? (
          <div className="mt-12 rounded-xl border border-dashed border-border bg-background p-10 text-center text-muted-foreground">
            {t("news.empty")}
          </div>
        ) : (
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {items.map((n) => (
              <Link
                key={n.id}
                to="/news/$slug"
                params={{ slug: n.slug }}
                className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                <div
                  className="aspect-[16/10] w-full bg-muted"
                  style={n.cover_url ? { backgroundImage: `url(${n.cover_url})`, backgroundSize: "cover", backgroundPosition: "center" } : undefined}
                />
                <div className="flex flex-1 flex-col p-6">
                  <p className="text-xs uppercase tracking-wider text-primary">
                    {n.published_at ? new Date(n.published_at).toLocaleDateString() : ""}
                  </p>
                  <h3 className="text-display mt-2 text-lg font-bold leading-snug text-foreground group-hover:text-primary">
                    {getDbField(n, "title", lang)}
                  </h3>
                  {n.excerpt_ru && <p className="mt-3 line-clamp-3 text-sm text-muted-foreground">{n.excerpt_ru}</p>}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function CTA() {
  const { t } = useTranslation();
  return (
    <section className="bg-forest py-20 text-forest-foreground md:py-24">
      <div className="container-app flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
        <div className="max-w-xl">
          <h2 className="text-display text-3xl font-extrabold sm:text-4xl">{t("contact.title")}</h2>
          <p className="mt-3 text-base text-cream/80">{t("contact.subtitle")}</p>
        </div>
        <Link
          to="/contact"
          className="inline-flex items-center gap-2 rounded-md bg-gold px-6 py-3 text-sm font-semibold text-gold-foreground transition-transform hover:scale-[1.02]"
        >
          {t("contact.form_submit")} <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
