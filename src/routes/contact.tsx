import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import { z } from "zod";
import { toast } from "sonner";
import hero from "@/assets/jimon/contact/contact-hero.png";
import bases from "@/assets/jimon/contact/contact-china-bases.png";
import qr from "@/assets/jimon/contact/contact-hotline-qr.png";
import { useInquiry } from "@/hooks/use-inquiry";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
  head: () => ({
    meta: [
      { title: "Контакты JIMON TORANGY DAILY NECESSITES" },
      { name: "description", content: "Свяжитесь с представительством JIMON в Казахстане и официальными базами в Китае." },
      { property: "og:title", content: "Контакты JIMON Group" },
      { property: "og:description", content: "Адрес в Алматы и официальные каналы JIMON Group в Китае." },
    ],
  }),
});

const schema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().max(50).optional().or(z.literal("")),
  message: z.string().trim().max(2000),
});

function ContactPage() {
  const inquiry = useInquiry();
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      toast.error("Проверьте поля формы");
      return;
    }
    setBusy(true);
    try {
      const { supabase } = await import("@/integrations/supabase/client");
      if (inquiry.items.length > 0) {
        await supabase.from("inquiries").insert({
          name: form.name, email: form.email, phone: form.phone || null,
          message: form.message,
          items: inquiry.items.map((i) => ({ slug: i.slug, name: i.name_zh, brand: i.brand, category: i.category })),
        });
        inquiry.clear();
      } else {
        await supabase.from("contact_messages").insert({
          name: form.name, email: form.email, phone: form.phone || null, message: form.message || " ",
        });
      }
      toast.success("Спасибо! Мы свяжемся с вами.");
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch {
      toast.error("Не удалось отправить. Попробуйте ещё раз.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <SiteLayout>
      <img src={hero} alt="Contact JIMON" className="h-[36vh] min-h-[240px] w-full object-cover" />
      <section className="bg-background py-16">
        <div className="container-app grid gap-10 lg:grid-cols-2">
          <div>
            <h1 className="text-display text-4xl font-extrabold sm:text-5xl">Контакты</h1>
            <div className="mt-8 rounded-xl border border-border bg-card p-6">
              <p className="text-display text-lg font-bold">JIMON TORANGY DAILY NECESSITES ЖШС</p>
              <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
                <li>Адрес: Алматы қ., Дарабоз ш.а., 49-үй, 37-кеңсе</li>
                <li>E-mail: <a href="mailto:info@jimon.kz" className="text-primary">info@jimon.kz</a></li>
                <li>БИН: 250540014840</li>
                <li>ИИК: KZ48722S000052175278, АО «Kaspi Bank», БИК CASPKZKA</li>
              </ul>
            </div>
            <h2 className="text-display mt-10 text-2xl font-bold">Официальные каналы JIMON в Китае</h2>
            <p className="mt-3 text-sm text-muted-foreground">Hotline: 400-8446-678</p>
            <img src={bases} alt="China bases" className="mt-4 rounded-xl border border-border" loading="lazy" />
            <img src={qr} alt="China hotline QR" className="mt-4 max-w-xs rounded-xl border border-border" loading="lazy" />
          </div>

          <form onSubmit={submit} className="rounded-xl border border-border bg-card p-6">
            <h2 className="text-display text-2xl font-bold">Запросить консультацию</h2>
            {inquiry.items.length > 0 && (
              <div className="mt-3 rounded-md border border-border bg-cream p-3 text-sm">
                Вместе с заявкой будет отправлено товаров: <b>{inquiry.items.length}</b>
              </div>
            )}
            <div className="mt-4 space-y-3">
              <input className="w-full rounded-md border border-border bg-background px-4 py-3" placeholder="Имя"
                value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required maxLength={100} />
              <input className="w-full rounded-md border border-border bg-background px-4 py-3" type="email" placeholder="E-mail"
                value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required maxLength={255} />
              <input className="w-full rounded-md border border-border bg-background px-4 py-3" placeholder="Телефон (необязательно)"
                value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} maxLength={50} />
              <textarea className="w-full rounded-md border border-border bg-background px-4 py-3" rows={5} placeholder="Сообщение"
                value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} maxLength={2000} />
              <button disabled={busy} type="submit" className="w-full rounded-md bg-primary px-4 py-3 font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-60">
                {busy ? "Отправляем…" : "Отправить"}
              </button>
            </div>
          </form>
        </div>
      </section>
    </SiteLayout>
  );
}
