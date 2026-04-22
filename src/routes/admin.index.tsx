import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { Plus, Trash2, Save } from "lucide-react";

export const Route = createFileRoute("/admin/")({
  component: AdminNewsPage,
});

const LANGS = ["ru", "kz", "uz", "en", "kg"] as const;

type NewsRow = {
  id: string;
  slug: string;
  cover_url: string | null;
  is_published: boolean;
  published_at: string | null;
  excerpt_ru: string;
  title_ru: string; title_kz: string; title_uz: string; title_en: string; title_kg: string;
  body_ru: string; body_kz: string; body_uz: string; body_en: string; body_kg: string;
};

function AdminNewsPage() {
  const { t } = useTranslation();
  const [items, setItems] = useState<NewsRow[]>([]);
  const [editing, setEditing] = useState<NewsRow | null>(null);
  const [tab, setTab] = useState<typeof LANGS[number]>("ru");

  const load = async () => {
    const { supabase } = await import("@/integrations/supabase/client");
    const { data } = await supabase.from("news").select("*").order("created_at", { ascending: false });
    if (data) setItems(data as NewsRow[]);
  };

  useEffect(() => { load(); }, []);

  const create = async () => {
    const { supabase } = await import("@/integrations/supabase/client");
    const slug = `news-${Date.now()}`;
    const { data, error } = await supabase.from("news").insert({
      slug, title_ru: "Новая новость",
    }).select("*").single();
    if (error) return toast.error(error.message);
    setEditing(data as NewsRow);
    load();
  };

  const save = async () => {
    if (!editing) return;
    const { supabase } = await import("@/integrations/supabase/client");
    const { error } = await supabase.from("news").update(editing).eq("id", editing.id);
    if (error) return toast.error(error.message);
    toast.success("Сохранено");
    load();
  };

  const remove = async (id: string) => {
    if (!confirm("Удалить?")) return;
    const { supabase } = await import("@/integrations/supabase/client");
    await supabase.from("news").delete().eq("id", id);
    if (editing?.id === id) setEditing(null);
    load();
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-display text-2xl font-extrabold text-foreground">{t("admin.menu.news")}</h1>
        <button onClick={create} className="flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">
          <Plus className="h-4 w-4" /> {t("common.create")}
        </button>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[320px_1fr]">
        <div className="space-y-2">
          {items.map((n) => (
            <button key={n.id} onClick={() => setEditing(n)}
              className={`flex w-full items-start justify-between rounded-md border p-3 text-left transition-colors ${
                editing?.id === n.id ? "border-primary bg-primary/5" : "border-border bg-card hover:border-primary/30"
              }`}>
              <div>
                <p className="text-sm font-semibold text-foreground">{n.title_ru || n.slug}</p>
                <p className="text-xs text-muted-foreground">{n.is_published ? "✓ опубликовано" : "черновик"}</p>
              </div>
              <button onClick={(e) => { e.stopPropagation(); remove(n.id); }} className="text-muted-foreground hover:text-destructive">
                <Trash2 className="h-4 w-4" />
              </button>
            </button>
          ))}
          {items.length === 0 && <p className="text-sm text-muted-foreground">Пусто</p>}
        </div>

        {editing && (
          <div className="rounded-xl border border-border bg-card p-6">
            <div className="space-y-4">
              <Field label="Slug" value={editing.slug} onChange={(v) => setEditing({ ...editing, slug: v })} />
              <Field label="Cover URL" value={editing.cover_url ?? ""} onChange={(v) => setEditing({ ...editing, cover_url: v })} />
              <div className="flex items-center gap-3">
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" checked={editing.is_published}
                    onChange={(e) => setEditing({ ...editing, is_published: e.target.checked, published_at: e.target.checked && !editing.published_at ? new Date().toISOString() : editing.published_at })} />
                  Опубликовано
                </label>
              </div>
              <Field label="Краткое описание (RU)" value={editing.excerpt_ru} onChange={(v) => setEditing({ ...editing, excerpt_ru: v })} multiline />

              <div className="flex gap-1 border-b border-border">
                {LANGS.map((l) => (
                  <button key={l} onClick={() => setTab(l)}
                    className={`px-4 py-2 text-xs font-semibold uppercase ${tab === l ? "border-b-2 border-primary text-primary" : "text-muted-foreground"}`}>
                    {l}
                  </button>
                ))}
              </div>

              <Field label={`Заголовок (${tab})`} value={editing[`title_${tab}` as keyof NewsRow] as string}
                onChange={(v) => setEditing({ ...editing, [`title_${tab}`]: v })} />
              <Field label={`Текст (${tab})`} value={editing[`body_${tab}` as keyof NewsRow] as string}
                onChange={(v) => setEditing({ ...editing, [`body_${tab}`]: v })} multiline rows={10} />

              <button onClick={save} className="flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground">
                <Save className="h-4 w-4" /> {t("common.save")}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Field({ label, value, onChange, multiline, rows = 3 }: { label: string; value: string; onChange: (v: string) => void; multiline?: boolean; rows?: number }) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</label>
      {multiline ? (
        <textarea value={value} onChange={(e) => onChange(e.target.value)} rows={rows}
          className="w-full rounded-md border border-input bg-background px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" />
      ) : (
        <input value={value} onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-md border border-input bg-background px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" />
      )}
    </div>
  );
}
