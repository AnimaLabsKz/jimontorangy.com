import { createFileRoute } from "@tanstack/react-router";
import { ContactContent } from "@/components/JimonSections";
import { SiteLayout } from "@/components/SiteLayout";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
  head: () => ({ meta: [{ title: "Контакты JIMON Kazakhstan" }, { name: "description", content: "Контакты JIMON TORANGY DAILY NECESSITIES ЖШС и официальные каналы JIMON Group." }] }),
});

function ContactPage() {
  return (
    <SiteLayout>
      <ContactContent />
    </SiteLayout>
  );
}
