import { createFileRoute } from "@tanstack/react-router";
import { LegalContent } from "@/components/JimonSections";
import { SiteLayout } from "@/components/SiteLayout";

export const Route = createFileRoute("/legal")({
  component: LegalPage,
  head: () => ({ meta: [{ title: "Правовое заявление JIMON" }, { name: "description", content: "Правовое заявление JIMON Group об онлайн-информации и неавторизованных продажах." }] }),
});

function LegalPage() {
  return (
    <SiteLayout>
      <LegalContent />
    </SiteLayout>
  );
}
