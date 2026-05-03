import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import hero from "@/assets/jimon/category-banners/02-hero.png";
import b1 from "@/assets/jimon/category-banners/03-28.png";
import b2 from "@/assets/jimon/category-banners/04-39.png";
import b3 from "@/assets/jimon/category-banners/05-layout-05.png";
import b4 from "@/assets/jimon/category-banners/07-layout-07.png";
import b5 from "@/assets/jimon/category-banners/08-jimon.png";
import b6 from "@/assets/jimon/category-banners/09-jimon.png";
import b7 from "@/assets/jimon/category-banners/10-jimon.png";
import b8 from "@/assets/jimon/category-banners/11-layout-11.png";
import b9 from "@/assets/jimon/category-banners/12-layout-12.png";

export const Route = createFileRoute("/layout")({
  component: LayoutPage,
  head: () => ({
    meta: [
      { title: "Промышленная структура JIMON Group «1+6+1»" },
      { name: "description", content: "Производственные базы JIMON: Аньго, Пекин, Чунцин, Цзилинь, Ухань, Гуанчжоу, Ханчжоу. Пять направлений продукции." },
      { property: "og:title", content: "Промышленная структура JIMON Group" },
      { property: "og:description", content: "Карта баз и направлений JIMON Group." },
    ],
  }),
});

function LayoutPage() {
  const bases = [
    "JIMON Anguo — штаб-квартира",
    "Beijing Yuebentang Group",
    "Chongqing Yuebentang Pharmaceutical Park",
    "Jilin Production Base",
    "Wuhan Operating Center",
    "Guangzhou Operating Center",
    "Hangzhou Operating Center",
  ];
  return (
    <SiteLayout>
      <img src={hero} alt="JIMON layout" className="h-[42vh] min-h-[260px] w-full object-cover" />
      <section className="bg-background py-16">
        <div className="container-app">
          <h1 className="text-display text-4xl font-extrabold sm:text-5xl">Структура «1+6+1»</h1>
          <p className="mt-4 max-w-3xl text-muted-foreground">
            Один научный центр, шесть производственных площадок и один центр международного развития. Производство
            сертифицировано по стандарту GMP.
          </p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {bases.map((b) => (
              <div key={b} className="rounded-xl border border-border bg-card p-5 text-foreground">{b}</div>
            ))}
          </div>
          <h2 className="text-display mt-16 text-2xl font-bold">Направления продукции</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[b1, b2, b3, b4, b5, b6, b7, b8, b9].map((src, i) => (
              <img key={i} src={src} alt={`JIMON direction ${i + 1}`} className="aspect-[16/10] w-full rounded-xl border border-border object-cover" loading="lazy" />
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
