import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { BrandsContent, HomeExperience, LayoutContent, ProductBanners, ProductCatalog, SectionHeading } from "@/components/JimonSections";

export const Route = createFileRoute("/")({
  component: HomePage,
  head: () => ({
    meta: [
      { title: "JIMON Group — официальный корпоративный сайт" },
      {
        name: "description",
        content:
          "JIMON TORANGY DAILY NECESSITIES — корпоративный сайт JIMON Group: бренды, продукция, производственная структура, новости и контакты в Казахстане.",
      },
      { property: "og:title", content: "JIMON Group — продукция, бренды и здоровье" },
      { property: "og:description", content: "Каталог JIMON, бренды, производственные базы и официальные контакты." },
      { property: "og:image", content: "/jimon/references/home.png" },
    ],
  }),
});

function HomePage() {
  return (
    <SiteLayout>
      <HomeExperience />

      <section className="bg-background py-16 md:py-24">
        <div className="container-app">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading
              eyebrow="Products"
              title="Наши продукты"
              subtitle="Реальный каталог по материалам клиента: большая health-серия, БАДы, косметика, растительные напитки и уход."
            />
            <Link to="/products" className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground">
              Весь каталог <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-10">
            <ProductCatalog limit={8} showInquiry={false} />
          </div>
          <ProductBanners />
        </div>
      </section>

      <BrandsContent />
      <LayoutContent />
    </SiteLayout>
  );
}
