import { createFileRoute } from "@tanstack/react-router";
import { NewsContent } from "@/components/JimonSections";
import { SiteLayout } from "@/components/SiteLayout";

export const Route = createFileRoute("/news")({
  component: NewsPage,
  head: () => ({ meta: [{ title: "Новости JIMON" }, { name: "description", content: "Новости компании, мероприятия и медиаматериалы JIMON Group." }] }),
});

function NewsPage() {
  return (
    <SiteLayout>
      <NewsContent />
    </SiteLayout>
  );
}
