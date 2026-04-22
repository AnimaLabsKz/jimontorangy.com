import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { Plus, Save } from "lucide-react";

export const Route = createFileRoute("/admin/translations")({
  component: AdminTranslationsPage,
});

type Row = { id: string; key: string; ru: string; kz: string; uz: string; en: string; kg: string };
const LANGS = ["ru", "kz", "uz", "en", "kg"] as const;

function AdminTranslationsPage() {
  const { t } = useTranslation();
  const [items, setItems] = useState<Row[]>([]);
  const [search, setSearch] = useState("");
  const [newKey, setNewKey] = useState("");

  const load = async () => {
    const { supabase } = await import("@/integrations/supabase/client");
    const { data } = await supabase.from("translations").select("*").order("key");
    if (data) setItems(data as Row[]);
  };
  useEffect(() => { load(); }, []);

  const update = (id: string, field: keyof Row, value: string) => {
    setItems((arr) => arr.map((r) => (r.id === id ? { ...r, [field]: value } : r)));
  };

  const save = async (row: Row) => {
    const { supabase } = await import("@/integrations/supabase/client");
    const { error } = await supabase.from("translations").update(row).eq("id", row.id);
    if (error) return toast.error(error.message);
    toast.success("Сохранено");
  };

  const create = async () => {
    if (!newKey.trim()) return;
    const { supabase } = await import("@/integrations/supabase/client");
    const { error } = await supabase.from("translations").insert({ key: newKey.trim() });
    if (error) return toast.error(error.message);
    setNewKey(""); load();
  };

  const filtered = items.filter((i) => i.key.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <h1 className="text-display text-2xl font-extrabold">{t("admin.menu.translations")}</h1>
      <div className="mt-6 flex flex-wrap gap-3">
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Поиск по ключу" className="flex-1 rounded-md border border-input bg-background px-4 py-2.5 text-sm" />
        <input value={newKey} onChange={(e) => setNewKey(e.target.value)} placeholder="новый.ключ" className="w-60 rounded-md border border-input bg-background px-4 py-2.5 text-sm" />
        <button onClick={create} className="flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"><Plus className="h-4 w-4" /> Добавить</button>
      </div>

      <div className="mt-6 space-y-3">
        {filtered.map((row) => (
          <div key={row.id} className="rounded-md border border-border bg-card p-4">
            <p className="text-xs font-mono text-primary">{row.key}</p>
            <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
              {LANGS.map((l) => (
                <div key={l}>
                  <label className="text-xs uppercase text-muted-foreground">{l}</label>
                  <input value={row[l]} onChange={(e) => update(row.id, l, e.target.value)} className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
                </div>
              ))}
            </div>
            <button onClick={() => save(row)} className="mt-3 flex items-center gap-2 rounded-md bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground"><Save className="h-3 w-3" /> Сохранить</button>
          </div>
        ))}
        {filtered.length === 0 && <p className="text-sm text-muted-foreground">Нет записей</p>}
      </div>
    </div>
  );
}
