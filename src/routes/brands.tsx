import { createFileRoute } from "@tanstack/react-router";
import { BrandsContent } from "@/components/JimonSections";
import { SiteLayout } from "@/components/SiteLayout";

export const Route = createFileRoute("/brands")({
  component: BrandsPage,
  head: () => ({ meta: [{ title: "Бренды JIMON" }, { name: "description", content: "Бренды, корпоративная культура и брендовые направления JIMON Group." }] }),
});

function BrandsPage() {
  return (
    <SiteLayout>
      <BrandsContent />
    </SiteLayout>
  );
}
