import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { Plus, Trash2, Save } from "lucide-react";

export const Route = createFileRoute("/admin/brands")({
  component: AdminBrandsPage,
});

const LANGS = ["ru", "kz", "uz", "en", "kg"] as const;

type Row = {
  id: string; slug: string; logo_url: string | null; position: number;
  name_ru: string; name_kz: string; name_uz: string; name_en: string; name_kg: string;
  description_ru: string; description_kz: string; description_uz: string; description_en: string; description_kg: string;
};

function AdminBrandsPage() {
  const { t } = useTranslation();
  const [items, setItems] = useState<Row[]>([]);
  const [editing, setEditing] = useState<Row | null>(null);
  const [tab, setTab] = useState<typeof LANGS[number]>("ru");

  const load = async () => {
    const { supabase } = await import("@/integrations/supabase/client");
    const { data } = await supabase.from("brands").select("*").order("position");
    if (data) setItems(data as Row[]);
  };
  useEffect(() => { load(); }, []);

  const create = async () => {
    const { supabase } = await import("@/integrations/supabase/client");
    const { data, error } = await supabase.from("brands").insert({ slug: `brand-${Date.now()}`, name_ru: "Новый бренд" }).select("*").single();
    if (error) return toast.error(error.message);
    setEditing(data as Row); load();
  };
  const save = async () => {
    if (!editing) return;
    const { supabase } = await import("@/integrations/supabase/client");
    const { error } = await supabase.from("brands").update(editing).eq("id", editing.id);
    if (error) return toast.error(error.message);
    toast.success("Сохранено"); load();
  };
  const remove = async (id: string) => {
    if (!confirm("Удалить?")) return;
    const { supabase } = await import("@/integrations/supabase/client");
    await supabase.from("brands").delete().eq("id", id);
    if (editing?.id === id) setEditing(null);
    load();
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-display text-2xl font-extrabold">{t("admin.menu.brands")}</h1>
        <button onClick={create} className="flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"><Plus className="h-4 w-4" /> {t("common.create")}</button>
      </div>
      <div className="mt-6 grid gap-6 lg:grid-cols-[320px_1fr]">
        <div className="space-y-2">
          {items.map((n) => (
            <button key={n.id} onClick={() => setEditing(n)}
              className={`flex w-full items-center justify-between rounded-md border p-3 text-left ${editing?.id === n.id ? "border-primary bg-primary/5" : "border-border bg-card"}`}>
              <span className="text-sm font-semibold">{n.name_ru || n.slug}</span>
              <button onClick={(e) => { e.stopPropagation(); remove(n.id); }} className="text-muted-foreground hover:text-destructive"><Trash2 className="h-4 w-4" /></button>
            </button>
          ))}
        </div>
        {editing && (
          <div className="rounded-xl border border-border bg-card p-6 space-y-4">
            <Inp label="Slug" value={editing.slug} onChange={(v) => setEditing({ ...editing, slug: v })} />
            <Inp label="Logo URL" value={editing.logo_url ?? ""} onChange={(v) => setEditing({ ...editing, logo_url: v })} />
            <Inp label="Позиция" value={String(editing.position)} onChange={(v) => setEditing({ ...editing, position: parseInt(v) || 0 })} />
            <div className="flex gap-1 border-b border-border">
              {LANGS.map((l) => <button key={l} onClick={() => setTab(l)} className={`px-4 py-2 text-xs font-semibold uppercase ${tab === l ? "border-b-2 border-primary text-primary" : "text-muted-foreground"}`}>{l}</button>)}
            </div>
            <Inp label={`Название (${tab})`} value={editing[`name_${tab}` as keyof Row] as string} onChange={(v) => setEditing({ ...editing, [`name_${tab}`]: v })} />
            <Inp label={`Описание (${tab})`} value={editing[`description_${tab}` as keyof Row] as string} onChange={(v) => setEditing({ ...editing, [`description_${tab}`]: v })} multiline />
            <button onClick={save} className="flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"><Save className="h-4 w-4" /> {t("common.save")}</button>
          </div>
        )}
      </div>
    </div>
  );
}

function Inp({ label, value, onChange, multiline }: { label: string; value: string; onChange: (v: string) => void; multiline?: boolean }) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</label>
      {multiline
        ? <textarea value={value} onChange={(e) => onChange(e.target.value)} rows={4} className="w-full rounded-md border border-input bg-background px-4 py-2.5 text-sm" />
        : <input value={value} onChange={(e) => onChange(e.target.value)} className="w-full rounded-md border border-input bg-background px-4 py-2.5 text-sm" />}
    </div>
  );
}
