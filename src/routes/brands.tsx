import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { BRANDS, BRAND_FAMILIES } from "@/data/brands";
import hero from "@/assets/jimon/brands/02-hero.png";

export const Route = createFileRoute("/brands")({
  component: BrandsPage,
  head: () => ({
    meta: [
      { title: "Бренды JIMON Group — четыре столетних марки ТКМ" },
      { name: "description", content: "Бренды JIMON Group: Xuelancao, MAYOU, Shanlineng, Tianrancui и другие. Традиционная китайская медицина, БАДы и косметика." },
      { property: "og:title", content: "Бренды JIMON Group" },
      { property: "og:description", content: "Семья брендов JIMON: ТКМ, БАДы, уход за кожей, личная гигиена." },
    ],
  }),
});

function BrandsPage() {
  return (
    <SiteLayout>
      <section className="relative">
        <img src={hero} alt="JIMON brands" className="h-[42vh] min-h-[280px] w-full object-cover" />
      </section>
      <section className="bg-background py-16 md:py-24">
        <div className="container-app">
          <h1 className="text-display text-4xl font-extrabold sm:text-5xl">Наши бренды</h1>
          <p className="mt-4 max-w-3xl text-muted-foreground">
            Семьи брендов JIMON Group объединяют традиционную китайскую медицину, БАДы, напитки, уход за кожей и личную
            гигиену. Каждая марка опирается на собственную рецептуру и производство группы.
          </p>

          {BRAND_FAMILIES.map((fam) => {
            const items = BRANDS.filter((b) => b.family === fam.key);
            if (!items.length) return null;
            return (
              <div key={fam.key} className="mt-14">
                <h2 className="text-display text-2xl font-bold">{fam.label_ru}</h2>
                <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {items.map((b) => (
                    <article key={b.slug} className="overflow-hidden rounded-xl border border-border bg-card transition hover:-translate-y-1 hover:shadow-lg">
                      <div className="flex aspect-[16/10] items-center justify-center bg-cream p-6">
                        <img src={b.logo} alt={b.name_en} className="max-h-full max-w-full object-contain" loading="lazy" />
                      </div>
                      <div className="p-5">
                        <p className="text-xs uppercase tracking-wider text-primary">{b.name_zh}</p>
                        <h3 className="text-display mt-1 text-lg font-bold">{b.name_en}</h3>
                        <p className="mt-2 text-sm text-muted-foreground">{b.description_ru}</p>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </SiteLayout>
  );
}
