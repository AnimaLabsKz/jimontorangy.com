import { createFileRoute } from "@tanstack/react-router";
import { AboutContent } from "@/components/JimonSections";
import { SiteLayout } from "@/components/SiteLayout";

export const Route = createFileRoute("/about")({
  component: AboutPage,
  head: () => ({ meta: [{ title: "О компании JIMON" }, { name: "description", content: "История, развитие, R&D, производственная база и награды JIMON Group." }] }),
});

function AboutPage() {
  return (
    <SiteLayout>
      <AboutContent />
    </SiteLayout>
  );
}
