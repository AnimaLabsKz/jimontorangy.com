import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { SiteLayout } from "@/components/SiteLayout";
import { useLang } from "@/hooks/use-lang";
import { getDbField } from "@/lib/i18n";

export const Route = createFileRoute("/news/")({
  component: NewsListPage,
  head: () => ({
    meta: [
      { title: "Новости JIMON Group" },
      { name: "description", content: "Новости и события группы компаний JIMON: награды, сертификации, развитие продуктовых линеек." },
      { property: "og:title", content: "Новости JIMON Group" },
      { property: "og:description", content: "Свежие события и публикации JIMON Group." },
    ],
  }),
});

type NewsRow = {
  id: string;
  slug: string;
  cover_url: string | null;
  published_at: string | null;
  title_ru: string; title_kz: string; title_uz: string; title_en: string; title_kg: string;
  excerpt_ru: string;
};

function NewsListPage() {
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
        .order("published_at", { ascending: false });
      if (mounted && data) setItems(data as NewsRow[]);
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
            {t("news.section_title")}
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-cream/80">{t("news.section_subtitle")}</p>
        </div>
      </section>

      <section className="bg-background py-20 md:py-24">
        <div className="container-app">
          {items.length === 0 ? (
            <div className="rounded-xl border border-dashed border-border bg-cream p-10 text-center text-muted-foreground">
              {t("news.empty")}
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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
    </SiteLayout>
  );
}
