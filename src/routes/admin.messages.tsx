import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { Trash2, Check } from "lucide-react";

export const Route = createFileRoute("/admin/messages")({
  component: AdminMessagesPage,
});

type Row = { id: string; name: string; email: string; phone: string | null; message: string; is_handled: boolean; created_at: string };

function AdminMessagesPage() {
  const { t } = useTranslation();
  const [items, setItems] = useState<Row[]>([]);

  const load = async () => {
    const { supabase } = await import("@/integrations/supabase/client");
    const { data } = await supabase.from("contact_messages").select("*").order("created_at", { ascending: false });
    if (data) setItems(data as Row[]);
  };
  useEffect(() => { load(); }, []);

  const toggle = async (row: Row) => {
    const { supabase } = await import("@/integrations/supabase/client");
    await supabase.from("contact_messages").update({ is_handled: !row.is_handled }).eq("id", row.id);
    load();
  };
  const remove = async (id: string) => {
    if (!confirm("Удалить?")) return;
    const { supabase } = await import("@/integrations/supabase/client");
    await supabase.from("contact_messages").delete().eq("id", id);
    toast.success("Удалено"); load();
  };

  return (
    <div>
      <h1 className="text-display text-2xl font-extrabold">{t("admin.menu.messages")}</h1>
      <div className="mt-6 space-y-3">
        {items.map((m) => (
          <div key={m.id} className={`rounded-md border p-4 ${m.is_handled ? "border-border bg-cream" : "border-primary/30 bg-card"}`}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-semibold text-foreground">{m.name} <span className="text-sm font-normal text-muted-foreground">· {new Date(m.created_at).toLocaleString()}</span></p>
                <p className="text-sm text-muted-foreground">{m.email} {m.phone && `· ${m.phone}`}</p>
                <p className="mt-3 whitespace-pre-wrap text-sm text-foreground">{m.message}</p>
              </div>
              <div className="flex flex-col gap-2">
                <button onClick={() => toggle(m)} className="flex items-center gap-1.5 rounded-md border border-border bg-card px-3 py-1.5 text-xs"><Check className="h-3 w-3" />{m.is_handled ? "Снять" : "Обработано"}</button>
                <button onClick={() => remove(m.id)} className="flex items-center gap-1.5 rounded-md border border-border bg-card px-3 py-1.5 text-xs text-destructive"><Trash2 className="h-3 w-3" />Удалить</button>
              </div>
            </div>
          </div>
        ))}
        {items.length === 0 && <p className="text-sm text-muted-foreground">Нет сообщений</p>}
      </div>
    </div>
  );
}
