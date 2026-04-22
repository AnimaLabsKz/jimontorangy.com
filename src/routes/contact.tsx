import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import { toast } from "sonner";
import { MapPin, Mail, Phone } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
  head: () => ({
    meta: [
      { title: "Контакты — JIMON Group" },
      { name: "description", content: "Свяжитесь с представительством JIMON Group в Казахстане. Адрес: Алматы, ул. Дарабоз, 49-37." },
      { property: "og:title", content: "Контакты JIMON Group" },
      { property: "og:description", content: "Адрес и форма обратной связи представительства JIMON в Казахстане." },
    ],
  }),
});

const messageSchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().max(50).optional(),
  message: z.string().trim().min(1).max(2000),
});

function ContactPage() {
  const { t } = useTranslation();
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = messageSchema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? t("contact.form_error"));
      return;
    }
    setLoading(true);
    try {
      const { supabase } = await import("@/integrations/supabase/client");
      const { error } = await supabase.from("contact_messages").insert({
        name: parsed.data.name,
        email: parsed.data.email,
        phone: parsed.data.phone ?? null,
        message: parsed.data.message,
      });
      if (error) throw error;
      toast.success(t("contact.form_success"));
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch (err) {
      console.error(err);
      toast.error(t("contact.form_error"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <SiteLayout>
      <section className="bg-forest py-20 text-forest-foreground md:py-28">
        <div className="container-app">
          <h1 className="text-display max-w-3xl text-4xl font-extrabold sm:text-5xl md:text-6xl">
            {t("contact.title")}
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-cream/80">{t("contact.subtitle")}</p>
        </div>
      </section>

      <section className="bg-background py-20 md:py-24">
        <div className="container-app grid gap-12 lg:grid-cols-2">
          <div className="space-y-6">
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="flex items-start gap-4">
                <span className="flex h-11 w-11 items-center justify-center rounded-md bg-primary/10 text-primary">
                  <MapPin className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {t("contact.address_label")}
                  </p>
                  <p className="mt-1 text-base font-medium text-foreground">{t("contact.address_value")}</p>
                </div>
              </div>
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="flex items-start gap-4">
                <span className="flex h-11 w-11 items-center justify-center rounded-md bg-primary/10 text-primary">
                  <Mail className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {t("contact.email_label")}
                  </p>
                  <a href="mailto:info@jimon.kz" className="mt-1 block text-base font-medium text-foreground hover:text-primary">
                    info@jimon.kz
                  </a>
                </div>
              </div>
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="flex items-start gap-4">
                <span className="flex h-11 w-11 items-center justify-center rounded-md bg-primary/10 text-primary">
                  <Phone className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {t("contact.phone_label")}
                  </p>
                  <p className="mt-1 text-base font-medium text-foreground">+7 (727) 000-00-00</p>
                </div>
              </div>
            </div>
            <div className="rounded-xl bg-cream p-6 text-sm text-muted-foreground">
              <p className="font-semibold text-foreground">{t("footer.company")}</p>
              <p className="mt-2">БИН: 230440013517 · ИИК: KZ80722S000026938093</p>
              <p>АО «Kaspi Bank» · БИК: CASPKZKA</p>
            </div>
          </div>

          <form onSubmit={submit} className="rounded-xl border border-border bg-card p-8">
            <h2 className="text-display text-2xl font-bold text-foreground">{t("contact.form_title")}</h2>
            <div className="mt-6 space-y-4">
              <Input label={t("contact.form_name")} value={form.name} onChange={(v) => setForm((s) => ({ ...s, name: v }))} required maxLength={100} />
              <Input label={t("contact.form_email")} type="email" value={form.email} onChange={(v) => setForm((s) => ({ ...s, email: v }))} required maxLength={255} />
              <Input label={t("contact.form_phone")} value={form.phone} onChange={(v) => setForm((s) => ({ ...s, phone: v }))} maxLength={50} />
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {t("contact.form_message")}
                </label>
                <textarea
                  value={form.message}
                  onChange={(e) => setForm((s) => ({ ...s, message: e.target.value }))}
                  required
                  maxLength={2000}
                  rows={5}
                  className="w-full rounded-md border border-input bg-background px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-60"
              >
                {loading ? t("common.loading") : t("contact.form_submit")}
              </button>
            </div>
          </form>
        </div>
      </section>
    </SiteLayout>
  );
}

function Input({
  label,
  value,
  onChange,
  type = "text",
  required,
  maxLength,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
  maxLength?: number;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        maxLength={maxLength}
        className="w-full rounded-md border border-input bg-background px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
      />
    </div>
  );
}
