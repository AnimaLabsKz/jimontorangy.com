import { createFileRoute } from "@tanstack/react-router";
import { NewsContent } from "@/components/JimonSections";
import { SiteLayout } from "@/components/SiteLayout";

export const Route = createFileRoute("/media")({
  component: MediaPage,
  head: () => ({ meta: [{ title: "Медиацентр JIMON" }, { name: "description", content: "Видео и новые медиа JIMON Group." }] }),
});

function MediaPage() {
  return (
    <SiteLayout>
      <NewsContent />
    </SiteLayout>
  );
}
