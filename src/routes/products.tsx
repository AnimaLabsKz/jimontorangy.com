import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { SiteLayout } from "@/components/SiteLayout";
import { useLang } from "@/hooks/use-lang";
import { getDbField } from "@/lib/i18n";

export const Route = createFileRoute("/products")({
  component: ProductsPage,
  head: () => ({
    meta: [
      { title: "Продукция JIMON — Препараты, БАДы, косметика" },
      { name: "description", content: "Каталог продукции JIMON Group: лекарственные препараты, биологически активные добавки и натуральная косметика." },
      { property: "og:title", content: "Продукция JIMON Group" },
      { property: "og:description", content: "Три направления продукции — препараты, БАДы и косметика." },
    ],
  }),
});

type ProductRow = {
  id: string;
  slug: string;
  image_url: string | null;
  category: string;
  name_ru: string; name_kz: string; name_uz: string; name_en: string; name_kg: string;
  description_ru: string; description_kz: string; description_uz: string; description_en: string; description_kg: string;
};

const CATEGORIES = ["all", "medicine", "supplements", "cosmetics"] as const;

function ProductsPage() {
  const { t } = useTranslation();
  const { lang } = useLang();
  const [items, setItems] = useState<ProductRow[]>([]);
  const [active, setActive] = useState<(typeof CATEGORIES)[number]>("all");

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
    <SiteLayout>
      <section className="bg-forest py-20 text-forest-foreground md:py-28">
        <div className="container-app">
          <h1 className="text-display max-w-3xl text-4xl font-extrabold sm:text-5xl md:text-6xl">
            {t("products.title")}
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-cream/80">{t("products.subtitle")}</p>
        </div>
      </section>

      <section className="bg-background py-12 md:py-16">
        <div className="container-app">
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((c) => (
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
            <div className="mt-10 rounded-xl border border-dashed border-border bg-cream p-10 text-center text-muted-foreground">
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
                      {t(`products.categories.${(CATEGORIES as readonly string[]).includes(p.category) ? p.category : "all"}` as any)}
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
    </SiteLayout>
  );
}
