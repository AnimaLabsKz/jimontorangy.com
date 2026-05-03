import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import hero from "@/assets/jimon/membership/member-hero.png";
import qr from "@/assets/jimon/membership/member-qr-codes.png";
import s1 from "@/assets/jimon/membership/member-step-1-phone.png";
import s2 from "@/assets/jimon/membership/member-step-2-phone.png";
import s3 from "@/assets/jimon/membership/member-step-3-phone.png";

export const Route = createFileRoute("/membership")({
  component: MembershipPage,
  head: () => ({
    meta: [
      { title: "Регистрация участника JIMON" },
      { name: "description", content: "Официальная инструкция по регистрации в программе JIMON через мини-приложение." },
      { property: "og:title", content: "JIMON Membership" },
      { property: "og:description", content: "Три шага регистрации в программе JIMON." },
    ],
  }),
});

function MembershipPage() {
  const steps = [
    { img: s1, t: "Шаг 1", d: "Откройте официальный аккаунт или мини-приложение JIMON по QR-коду." },
    { img: s2, t: "Шаг 2", d: "Перейдите в личный кабинет / страницу регистрации." },
    { img: s3, t: "Шаг 3", d: "Заполните анкету и подтвердите регистрацию." },
  ];
  return (
    <SiteLayout>
      <img src={hero} alt="Membership" className="h-[36vh] min-h-[240px] w-full object-cover" />
      <section className="bg-background py-16">
        <div className="container-app">
          <h1 className="text-display text-4xl font-extrabold sm:text-5xl">Программа JIMON</h1>
          <p className="mt-4 max-w-3xl text-muted-foreground">
            Официальная инструкция действует на территории Китая. Для участников из Казахстана и других стран условия
            уточняйте у представительства.
          </p>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {steps.map((s) => (
              <div key={s.t} className="overflow-hidden rounded-xl border border-border bg-card">
                <img src={s.img} alt={s.t} className="h-72 w-full object-contain bg-cream" loading="lazy" />
                <div className="p-5">
                  <p className="text-display font-bold">{s.t}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
                </div>
              </div>
            ))}
          </div>
          <img src={qr} alt="Official QR" className="mt-12 mx-auto max-w-md rounded-xl border border-border" loading="lazy" />
        </div>
      </section>
    </SiteLayout>
  );
}
