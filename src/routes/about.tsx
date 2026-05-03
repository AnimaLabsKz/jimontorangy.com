import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import about1 from "@/assets/jimon/about/01-43.png";
import about2 from "@/assets/jimon/about/02-26.png";
import about4 from "@/assets/jimon/about/04-42.png";
import about5 from "@/assets/jimon/about/05-about-05.png";

export const Route = createFileRoute("/about")({
  component: AboutPage,
  head: () => ({
    meta: [
      { title: "О компании JIMON Group — наследие и наука" },
      { name: "description", content: "33 года развития, 4 столетних бренда ТКМ, структура «1+6+1», научный центр и шесть производственных площадок." },
      { property: "og:title", content: "О компании JIMON Group" },
      { property: "og:description", content: "Наследие традиционной китайской медицины и современная наука JIMON Group." },
    ],
  }),
});

function AboutPage() {
  const stats = [
    { v: "90+", l: "Учёных в R&D" },
    { v: "30+", l: "Национальных патентов" },
    { v: "200+", l: "Регистраций препаратов" },
    { v: "93+", l: "Утверждённых медикаментов" },
  ];
  return (
    <SiteLayout>
      <section className="bg-forest text-forest-foreground">
        <div className="container-app grid gap-10 py-16 md:grid-cols-2 md:items-center md:py-24">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">JIMON Group</p>
            <h1 className="text-display mt-3 text-4xl font-extrabold sm:text-5xl">Войти в мир JIMON</h1>
            <p className="mt-5 text-base leading-relaxed text-cream/85">
              Группа объединяет четыре столетних бренда традиционной китайской медицины, шесть производственных
              площадок и собственный научно-исследовательский центр. Производство сертифицировано по стандарту GMP.
            </p>
          </div>
          <img src={about1} alt="JIMON heritage" className="rounded-xl border border-cream/15 object-cover" loading="lazy" />
        </div>
      </section>

      <section className="bg-background py-20">
        <div className="container-app grid gap-10 lg:grid-cols-2 lg:items-center">
          <img src={about2} alt="История JIMON" className="rounded-xl border border-border" loading="lazy" />
          <div>
            <h2 className="text-display text-3xl font-extrabold">История</h2>
            <p className="mt-5 text-muted-foreground">
              За 33 года JIMON прошла путь от регионального производителя традиционных формул до международной группы
              с собственными лабораториями, производственными базами и сетью представительств. Сегодня линейка
              включает лекарственные препараты, БАДы, функциональные напитки и косметику.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-cream py-20">
        <div className="container-app">
          <h2 className="text-display text-3xl font-extrabold">Исследования — наша основа</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((s) => (
              <div key={s.l} className="rounded-xl border border-border bg-card p-6">
                <p className="text-display text-4xl font-extrabold text-primary">{s.v}</p>
                <p className="mt-2 text-sm text-muted-foreground">{s.l}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <img src={about4} alt="R&D JIMON" className="rounded-xl border border-border" loading="lazy" />
            <img src={about5} alt="Производство JIMON" className="rounded-xl border border-border" loading="lazy" />
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
