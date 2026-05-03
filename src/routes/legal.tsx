import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import hero from "@/assets/jimon/legal/legal-hero.png";
import statement from "@/assets/jimon/legal/legal-statement-text.png";

export const Route = createFileRoute("/legal")({
  component: LegalPage,
  head: () => ({
    meta: [
      { title: "Правовое заявление — JIMON Group" },
      { name: "description", content: "Официальное правовое заявление JIMON Group об авторизованных каналах продаж." },
      { property: "og:title", content: "Правовое заявление JIMON Group" },
      { property: "og:description", content: "Информация об официальных каналах JIMON Group." },
    ],
  }),
});

function LegalPage() {
  return (
    <SiteLayout>
      <img src={hero} alt="Legal" className="h-[36vh] min-h-[240px] w-full object-cover" />
      <section className="bg-background py-16">
        <div className="container-app max-w-3xl">
          <h1 className="text-display text-4xl font-extrabold sm:text-5xl">Правовое заявление</h1>
          <p className="mt-6 text-muted-foreground">
            JIMON Group не уполномочивает сторонние интернет-площадки для продажи продукции, если это не подтверждено
            официально. Достоверная информация о продукции и каналах доступна только на официальных сайтах и в
            каналах группы.
          </p>
          <p className="mt-4 text-muted-foreground">
            Реквизиты казахстанского подразделения JIMON TORANGY DAILY NECESSITES ЖШС указаны отдельно в разделе
            «Контакты» и в подвале сайта.
          </p>
          <img src={statement} alt="Official legal statement" className="mt-8 rounded-xl border border-border" loading="lazy" />
        </div>
      </section>
    </SiteLayout>
  );
}
