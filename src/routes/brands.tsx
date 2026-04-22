import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { SiteLayout } from "@/components/SiteLayout";
import { useLang } from "@/hooks/use-lang";
import { getDbField } from "@/lib/i18n";

export const Route = createFileRoute("/brands")({
  component: BrandsPage,
  head: () => ({
    meta: [
      { title: "Бренды JIMON Group — Четыре столетних марки ТКМ" },
      { name: "description", content: "Бренды группы JIMON: исторические марки традиционной китайской медицины, объединённые одной философией качества." },
      { property: "og:title", content: "Бренды JIMON Group" },
      { property: "og:description", content: "Четыре столетних марки традиционной медицины JIMON Group." },
    ],
  }),
});

type BrandRow = {
  id: string;
  slug: string;
  logo_url: string | null;
  name_ru: string; name_kz: string; name_uz: string; name_en: string; name_kg: string;
  description_ru: string; description_kz: string; description_uz: string; description_en: string; description_kg: string;
};

function BrandsPage() {
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
    <SiteLayout>
      <section className="bg-forest py-20 text-forest-foreground md:py-28">
        <div className="container-app">
          <h1 className="text-display max-w-3xl text-4xl font-extrabold sm:text-5xl md:text-6xl">
            {t("brands.title")}
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-cream/80">{t("brands.subtitle")}</p>
        </div>
      </section>

      <section className="bg-background py-20 md:py-24">
        <div className="container-app">
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
      </section>
    </SiteLayout>
  );
}
