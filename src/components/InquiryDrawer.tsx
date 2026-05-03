import { Link } from "@tanstack/react-router";
import { X, Trash2 } from "lucide-react";
import { useEffect } from "react";
import { useInquiry } from "@/hooks/use-inquiry";

export function InquiryDrawer() {
  const { isOpen, close, items, remove } = useInquiry();

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/40" onClick={close} />
      <aside className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-background shadow-2xl">
        <div className="flex items-center justify-between border-b border-border p-4">
          <h2 className="text-display text-lg font-bold">Заявка на консультацию</h2>
          <button onClick={close} aria-label="Close"><X className="h-5 w-5" /></button>
        </div>
        <div className="flex-1 overflow-auto p-4">
          {items.length === 0 ? (
            <p className="text-center text-sm text-muted-foreground">Заявка пуста. Добавьте продукты со страницы каталога.</p>
          ) : (
            <ul className="space-y-3">
              {items.map((it) => (
                <li key={it.slug} className="flex items-center gap-3 rounded-md border border-border bg-card p-3">
                  <img src={it.image} alt={it.name_en} className="h-14 w-14 rounded bg-cream object-contain" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-bold">{it.name_zh}</p>
                    <p className="truncate text-xs text-muted-foreground">{it.brand}</p>
                  </div>
                  <button onClick={() => remove(it.slug)} aria-label="Remove"><Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" /></button>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="border-t border-border p-4">
          <Link to="/contact" onClick={close} className="block w-full rounded-md bg-primary px-4 py-3 text-center text-sm font-semibold text-primary-foreground hover:bg-primary/90">
            Запросить консультацию
          </Link>
        </div>
      </aside>
    </div>
  );
}
