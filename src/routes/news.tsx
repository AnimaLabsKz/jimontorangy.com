import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import hero from "@/assets/jimon/news/news-company-hero.png";
import featured from "@/assets/jimon/news/news-company-featured.png";
import t1 from "@/assets/jimon/news/news-media-thumb-01.png";
import t2 from "@/assets/jimon/news/news-media-thumb-02.png";
import t3 from "@/assets/jimon/news/news-media-thumb-03.png";
import t4 from "@/assets/jimon/news/news-media-thumb-04.png";
import t5 from "@/assets/jimon/news/news-media-thumb-05.png";
import t6 from "@/assets/jimon/news/news-media-thumb-06.png";

export const Route = createFileRoute("/news")({
  component: NewsPage,
  head: () => ({
    meta: [
      { title: "Новости JIMON Group" },
      { name: "description", content: "Корпоративные новости и события JIMON Group." },
      { property: "og:title", content: "Новости JIMON Group" },
      { property: "og:description", content: "Свежие события, награды и публикации JIMON Group." },
    ],
  }),
});

function NewsPage() {
  const items = [
    { img: t1, t: "JIMON открывает представительство в Казахстане" },
    { img: t2, t: "Запуск линейки Xuelancao Qinghua Baici" },
    { img: t3, t: "Расширение Anguo R&D Center" },
    { img: t4, t: "Tianrancui получает международные награды" },
    { img: t5, t: "Партнёрство с университетами ТКМ" },
    { img: t6, t: "Программа здоровья для пожилых людей" },
  ];
  return (
    <SiteLayout>
      <img src={hero} alt="JIMON news" className="h-[36vh] min-h-[240px] w-full object-cover" />
      <section className="bg-background py-16">
        <div className="container-app">
          <h1 className="text-display text-4xl font-extrabold sm:text-5xl">Новости компании</h1>
          <article className="mt-10 grid gap-8 md:grid-cols-2 md:items-center">
            <img src={featured} alt="featured" className="rounded-xl border border-border" loading="lazy" />
            <div>
              <p className="text-xs uppercase tracking-wider text-primary">Главная новость</p>
              <h2 className="text-display mt-2 text-2xl font-bold">JIMON Group объявляет о развитии в Центральной Азии</h2>
              <p className="mt-3 text-muted-foreground">
                Группа открывает официальное представительство в Казахстане. Это шаг к выходу на рынки Центральной Азии
                с линейкой ТКМ, БАДов и ухода за кожей.
              </p>
            </div>
          </article>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((n) => (
              <article key={n.t} className="overflow-hidden rounded-xl border border-border bg-card">
                <img src={n.img} alt={n.t} className="aspect-[16/10] w-full object-cover" loading="lazy" />
                <div className="p-4">
                  <h3 className="text-display font-bold">{n.t}</h3>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
