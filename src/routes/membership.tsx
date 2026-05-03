import { createFileRoute } from "@tanstack/react-router";
import { MembershipContent } from "@/components/JimonSections";
import { SiteLayout } from "@/components/SiteLayout";

export const Route = createFileRoute("/membership")({
  component: MembershipPage,
  head: () => ({ meta: [{ title: "Регистрация участника JIMON" }, { name: "description", content: "Инструкция регистрации в официальной платформе JIMON." }] }),
});

function MembershipPage() {
  return (
    <SiteLayout>
      <MembershipContent />
    </SiteLayout>
  );
}
