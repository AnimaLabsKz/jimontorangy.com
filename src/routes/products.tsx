import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import { PRODUCTS, PRODUCT_CATEGORIES, PRODUCT_BANNERS, type ProductCategory } from "@/data/products";
import { useInquiry } from "@/hooks/use-inquiry";
import { toast } from "sonner";
import { Plus } from "lucide-react";

export const Route = createFileRoute("/products")({
  component: ProductsPage,
  head: () => ({
    meta: [
      { title: "Продукция JIMON Group — каталог из 30+ продуктов" },
      { name: "description", content: "Каталог JIMON Group: ТКМ, растительные напитки, БАДы, уход за кожей, личная гигиена и функциональные продукты." },
      { property: "og:title", content: "Продукция JIMON Group" },
      { property: "og:description", content: "30+ официальных продуктов JIMON Group по 8 категориям." },
    ],
  }),
});

function ProductsPage() {
  const [active, setActive] = useState<ProductCategory | "all">("all");
  const inquiry = useInquiry();

  const filtered = useMemo(
    () => (active === "all" ? PRODUCTS : PRODUCTS.filter((p) => p.category === active)),
    [active],
  );

  return (
    <SiteLayout>
      <section className="bg-forest text-forest-foreground">
        <div className="container-app py-14">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">JIMON Catalog</p>
          <h1 className="text-display mt-3 text-4xl font-extrabold sm:text-5xl">Наша продукция</h1>
          <p className="mt-4 max-w-3xl text-cream/85">
            Восемь категорий продукции JIMON Group: от классической традиционной китайской медицины до растительных
            напитков, БАДов и ухода за кожей. Все товары производятся на сертифицированных площадках группы.
          </p>
        </div>
      </section>

      <section className="bg-background py-12">
        <div className="container-app">
          <div className="flex flex-wrap gap-2">
            {([{ key: "all", label_ru: "Все" }, ...PRODUCT_CATEGORIES] as { key: string; label_ru: string }[]).map((c) => (
              <button
                key={c.key}
                onClick={() => setActive(c.key as any)}
                className={`rounded-full px-5 py-2 text-sm font-medium transition-colors ${
                  active === c.key ? "bg-primary text-primary-foreground" : "border border-border bg-card hover:bg-muted"
                }`}
              >
                {c.label_ru}
              </button>
            ))}
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((p) => (
              <article key={p.slug} className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition hover:-translate-y-1 hover:shadow-lg">
                <div className="aspect-square bg-cream">
                  <img src={p.image} alt={p.name_en} className="h-full w-full object-contain" loading="lazy" />
                </div>
                <div className="flex flex-1 flex-col p-4">
                  <p className="text-xs uppercase tracking-wider text-primary">{p.brand}</p>
                  <h3 className="text-display mt-1 text-base font-bold">{p.name_zh}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{p.name_en}</p>
                  <button
                    type="button"
                    onClick={() => {
                      inquiry.add({
                        slug: p.slug, name_zh: p.name_zh, name_en: p.name_en,
                        brand: p.brand, category: p.category, image: p.image,
                      });
                      toast.success("Добавлено в заявку");
                    }}
                    className="mt-4 inline-flex items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
                  >
                    <Plus className="h-4 w-4" /> В заявку
                  </button>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-16">
            <h2 className="text-display text-2xl font-bold">Серии и линейки</h2>
            <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {PRODUCT_BANNERS.map((b) => (
                <div key={b.title_en} className="overflow-hidden rounded-xl border border-border bg-card">
                  <img src={b.image} alt={b.title_en} className="aspect-[16/10] w-full object-cover" loading="lazy" />
                  <div className="p-4">
                    <p className="text-display font-bold">{b.title_zh}</p>
                    <p className="text-sm text-muted-foreground">{b.title_en}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
