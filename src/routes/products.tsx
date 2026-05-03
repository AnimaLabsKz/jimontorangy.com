import { createFileRoute } from "@tanstack/react-router";
import { ProductBanners, ProductCatalog, SectionHeading } from "@/components/JimonSections";
import { SiteLayout } from "@/components/SiteLayout";

export const Route = createFileRoute("/products")({
  component: ProductsPage,
  head: () => ({
    meta: [
      { title: "Продукция JIMON — каталог" },
      { name: "description", content: "Каталог продукции JIMON: БАДы, косметика, растительные напитки и продуктовые серии." },
    ],
  }),
});

function ProductsPage() {
  return (
    <SiteLayout>
      <section className="bg-background py-16 md:py-24">
        <div className="container-app">
          <SectionHeading eyebrow="Products" title="Продукция JIMON" subtitle="Корпоративная витрина без онлайн-оплаты. Добавляйте позиции в заявку и отправляйте запрос на консультацию." />
          <div className="mt-10">
            <ProductCatalog />
          </div>
          <ProductBanners />
        </div>
      </section>
    </SiteLayout>
  );
}
