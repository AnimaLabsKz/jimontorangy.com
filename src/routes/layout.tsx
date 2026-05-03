import { createFileRoute } from "@tanstack/react-router";
import { LayoutContent } from "@/components/JimonSections";
import { SiteLayout } from "@/components/SiteLayout";

export const Route = createFileRoute("/layout")({
  component: LayoutPage,
  head: () => ({ meta: [{ title: "Планировка и производственные базы JIMON" }, { name: "description", content: "Производственные базы, продуктовые направления и структура 1+6+1 JIMON Group." }] }),
});

function LayoutPage() {
  return (
    <SiteLayout>
      <LayoutContent />
    </SiteLayout>
  );
}
