import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { SiteLayout } from "@/components/SiteLayout";
import { useLang } from "@/hooks/use-lang";
import { getDbField } from "@/lib/i18n";

export const Route = createFileRoute("/news/$slug")({
  component: NewsDetailPage,
  head: () => ({
    meta: [
      { title: "Новость — JIMON Group" },
      { name: "description", content: "Новость JIMON Group" },
    ],
  }),
});

type NewsRow = {
  id: string;
  slug: string;
  cover_url: string | null;
  published_at: string | null;
  title_ru: string; title_kz: string; title_uz: string; title_en: string; title_kg: string;
  body_ru: string; body_kz: string; body_uz: string; body_en: string; body_kg: string;
};

function NewsDetailPage() {
  const { t } = useTranslation();
  const { lang } = useLang();
  const { slug } = Route.useParams();
  const [item, setItem] = useState<NewsRow | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const { supabase } = await import("@/integrations/supabase/client");
      const { data } = await supabase
        .from("news")
        .select("*")
        .eq("slug", slug)
        .eq("is_published", true)
        .maybeSingle();
      if (mounted) {
        setItem((data as NewsRow) ?? null);
        setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [slug]);

  if (loading) {
    return (
      <SiteLayout>
        <div className="container-app py-24 text-center text-muted-foreground">{t("common.loading")}</div>
      </SiteLayout>
    );
  }

  if (!item) {
    return (
      <SiteLayout>
        <div className="container-app py-24 text-center">
          <p className="text-muted-foreground">{t("news.empty")}</p>
          <Link to="/news" className="mt-6 inline-block text-sm font-semibold text-primary">
            {t("news.back_to_list")}
          </Link>
        </div>
      </SiteLayout>
    );
  }

  const title = getDbField(item, "title", lang);
  const body = getDbField(item, "body", lang);

  return (
    <SiteLayout>
      <article className="bg-background py-16 md:py-20">
        <div className="container-app max-w-3xl">
          <Link to="/news" className="text-sm font-semibold text-primary hover:underline">
            {t("news.back_to_list")}
          </Link>
          <p className="mt-6 text-xs uppercase tracking-wider text-primary">
            {item.published_at ? new Date(item.published_at).toLocaleDateString() : ""}
          </p>
          <h1 className="text-display mt-3 text-3xl font-extrabold leading-tight text-foreground sm:text-4xl md:text-5xl">
            {title}
          </h1>
          {item.cover_url && (
            <img src={item.cover_url} alt={title} loading="lazy" className="mt-8 w-full rounded-xl border border-border" />
          )}
          <div className="prose prose-stone mt-8 max-w-none whitespace-pre-wrap text-base leading-relaxed text-foreground">
            {body}
          </div>
        </div>
      </article>
    </SiteLayout>
  );
}
