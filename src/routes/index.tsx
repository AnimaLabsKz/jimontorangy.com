import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { useEffect, useMemo, useState } from "react";
import { ArrowRight, Award, Sparkles, Globe2, FlaskConical, Heart, Leaf, CheckCircle2 } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { useLang } from "@/hooks/use-lang";
import { getDbField } from "@/lib/i18n";
import heroBrands from "@/assets/hero-brands.png";
import heroMap from "@/assets/hero-map.png";
import heroEnNetwork from "@/assets/hero-en-network.png";
import heroEnHeritage from "@/assets/hero-en-heritage.png";
import heroUzNetwork from "@/assets/hero-uz-network.png";
import heroUzHeritage from "@/assets/hero-uz-heritage.png";
import heroKgNetwork from "@/assets/hero-kg-network.png";
import heroKgHeritage from "@/assets/hero-kg-heritage.png";
import heroKzNetwork from "@/assets/hero-kz-network.png";
import heroKzHeritage from "@/assets/hero-kz-heritage.png";
import leaderImg from "@/assets/leader-jimon.png";
import aboutImg from "@/assets/about-jimon.jpg";

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
      <AboutSection />
      <Leadership />
      <BrandsSection />
      <ProductsSection />
      <Directions />
    </SiteLayout>
  );
}

function AboutSection() {
  const { t } = useTranslation();
  const values = ["quality", "tradition", "innovation", "responsibility"] as const;
  return (
    <section id="about" className="scroll-mt-28 bg-background py-20 md:py-28">
      <div className="container-app">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">
            {t("nav.about")}
          </p>
          <h2 className="text-display mt-3 text-3xl font-extrabold text-foreground sm:text-4xl md:text-5xl">
            {t("about.title")}
          </h2>
          <p className="mt-5 text-base text-muted-foreground sm:text-lg">{t("about.subtitle")}</p>
        </div>

        <div className="mt-14 grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <h3 className="text-display text-2xl font-extrabold text-foreground sm:text-3xl">
              {t("about.history_title")}
            </h3>
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

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          <div className="rounded-xl border border-border bg-card p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">JIMON</p>
            <h3 className="text-display mt-3 text-2xl font-extrabold text-foreground">
              {t("about.mission_title")}
            </h3>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">
              {t("about.mission_text")}
            </p>
          </div>
          <div className="rounded-xl bg-forest p-8 text-forest-foreground">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">JIMON</p>
            <h3 className="text-display mt-3 text-2xl font-extrabold">{t("about.values_title")}</h3>
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
      </div>
    </section>
  );
}

function Leadership() {
  const { t } = useTranslation();
  return (
    <section className="bg-cream py-20 md:py-28">
      <div className="container-app grid gap-12 lg:grid-cols-2 lg:items-center">
        <div className="order-2 lg:order-1">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">
            {t("about.leadership_eyebrow")}
          </p>
          <h2 className="text-display mt-3 text-3xl font-extrabold text-foreground sm:text-4xl">
            {t("about.leadership_title")}
          </h2>
          <p className="mt-6 text-display text-xl font-semibold leading-snug text-foreground">
            {t("about.leader_quote")}
          </p>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground">
            {t("about.leader_bio")}
          </p>
          <div className="mt-6">
            <p className="text-display text-lg font-bold text-foreground">{t("about.leader_name")}</p>
            <p className="text-sm text-muted-foreground">{t("about.leader_role")}</p>
          </div>
        </div>
        <div className="order-1 lg:order-2">
          <div className="relative mx-auto w-full max-w-md overflow-hidden rounded-2xl border border-border bg-cream">
            <img
              src={leaderImg}
              alt={t("about.leader_name")}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

type BrandRow = {
  id: string;
  slug: string;
  logo_url: string | null;
  name_ru: string; name_kz: string; name_uz: string; name_en: string; name_kg: string;
  description_ru: string; description_kz: string; description_uz: string; description_en: string; description_kg: string;
};

function BrandsSection() {
  const { t } = useTranslation();
  const { lang } = useLang();
  const [items, setItems] = useState<BrandRow[]>([]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const { supabase } = await import("@/integrations/supabase/client");
      const { data } = await supabase
        .from("brands")
        .select("*")
        .order("position", { ascending: true });
      if (mounted && data) setItems(data as BrandRow[]);
    })();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section id="brands" className="scroll-mt-28 bg-background py-20 md:py-28">
      <div className="container-app">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">
            {t("nav.brands")}
          </p>
          <h2 className="text-display mt-3 text-3xl font-extrabold text-foreground sm:text-4xl md:text-5xl">
            {t("brands.title")}
          </h2>
          <p className="mt-5 text-base text-muted-foreground sm:text-lg">{t("brands.subtitle")}</p>
        </div>

        <div className="mt-12">
          {items.length === 0 ? (
            <div className="rounded-xl border border-dashed border-border bg-cream p-10 text-center text-muted-foreground">
              {t("brands.empty")}
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {items.map((b) => (
                <article
                  key={b.id}
                  className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
                >
                  <div className="flex aspect-[16/10] items-center justify-center bg-cream p-8">
                    {b.logo_url ? (
                      <img src={b.logo_url} alt={getDbField(b, "name", lang)} className="max-h-full max-w-full object-contain" loading="lazy" />
                    ) : (
                      <span className="text-display text-3xl font-extrabold text-primary/40">
                        {getDbField(b, "name", lang).charAt(0) || "J"}
                      </span>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-display text-xl font-bold text-foreground">{getDbField(b, "name", lang)}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{getDbField(b, "description", lang)}</p>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

type ProductRow = {
  id: string;
  slug: string;
  image_url: string | null;
  category: string;
  name_ru: string; name_kz: string; name_uz: string; name_en: string; name_kg: string;
  description_ru: string; description_kz: string; description_uz: string; description_en: string; description_kg: string;
};

const PRODUCT_CATEGORIES = ["all", "medicine", "supplements", "cosmetics"] as const;

function ProductsSection() {
  const { t } = useTranslation();
  const { lang } = useLang();
  const [items, setItems] = useState<ProductRow[]>([]);
  const [active, setActive] = useState<(typeof PRODUCT_CATEGORIES)[number]>("all");

  useEffect(() => {
    let mounted = true;
    (async () => {
      const { supabase } = await import("@/integrations/supabase/client");
      const { data } = await supabase
        .from("products")
        .select("*")
        .order("category", { ascending: true })
        .order("position", { ascending: true });
      if (mounted && data) setItems(data as ProductRow[]);
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const filtered = useMemo(
    () => (active === "all" ? items : items.filter((i) => i.category === active)),
    [items, active],
  );

  return (
    <section id="products" className="scroll-mt-28 bg-cream py-20 md:py-28">
      <div className="container-app">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">
            {t("nav.products")}
          </p>
          <h2 className="text-display mt-3 text-3xl font-extrabold text-foreground sm:text-4xl md:text-5xl">
            {t("products.title")}
          </h2>
          <p className="mt-5 text-base text-muted-foreground sm:text-lg">{t("products.subtitle")}</p>
        </div>

        <div className="mt-10 flex flex-wrap gap-2">
          {PRODUCT_CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-colors ${
                active === c
                  ? "bg-primary text-primary-foreground"
                  : "border border-border bg-card text-foreground hover:bg-muted"
              }`}
            >
              {t(`products.categories.${c}`)}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="mt-10 rounded-xl border border-dashed border-border bg-background p-10 text-center text-muted-foreground">
            {t("products.empty")}
          </div>
        ) : (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p) => (
              <article
                key={p.id}
                className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                <div
                  className="aspect-square w-full bg-cream"
                  style={p.image_url ? { backgroundImage: `url(${p.image_url})`, backgroundSize: "cover", backgroundPosition: "center" } : undefined}
                />
                <div className="flex flex-1 flex-col p-5">
                  <p className="text-xs uppercase tracking-wider text-primary">
                    {t(`products.categories.${(PRODUCT_CATEGORIES as readonly string[]).includes(p.category) ? p.category : "all"}` as any)}
                  </p>
                  <h3 className="text-display mt-2 text-lg font-bold text-foreground">
                    {getDbField(p, "name", lang)}
                  </h3>
                  <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">{getDbField(p, "description", lang)}</p>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function Hero() {
  const { lang } = useLang();
  const slides =
    lang === "en"
      ? [heroEnHeritage, heroEnNetwork]
      : lang === "uz"
        ? [heroUzHeritage, heroUzNetwork]
        : lang === "kg"
          ? [heroKgHeritage, heroKgNetwork]
          : lang === "kz"
            ? [heroKzHeritage, heroKzNetwork]
            : [heroBrands, heroMap];
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
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
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
    <section className="bg-forest py-10 text-forest-foreground md:py-14">
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
            <a
              href="#about"
              className="inline-flex items-center gap-2 rounded-md bg-gold px-6 py-3 text-sm font-semibold text-gold-foreground transition-transform hover:scale-[1.02]"
            >
              {t("hero.cta_primary")} <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#products"
              className="inline-flex items-center gap-2 rounded-md border border-cream/30 bg-white/5 px-6 py-3 text-sm font-semibold text-cream backdrop-blur transition-colors hover:bg-white/10"
            >
              {t("hero.cta_secondary")}
            </a>
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
          {items.map(({ key, icon: Icon }) => (
            <article
              key={key}
              className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-card p-7 transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl"
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

