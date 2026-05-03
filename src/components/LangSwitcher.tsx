import { useState } from "react";
import { useLang } from "@/hooks/use-lang";
import { LANG_NAMES, SUPPORTED_LANGS } from "@/lib/i18n";
import { ChevronDown, Globe } from "lucide-react";

export function LangSwitcher({ variant = "light" }: { variant?: "light" | "dark" }) {
  const { lang, setLang } = useLang();
  const [open, setOpen] = useState(false);

  const colors = variant === "dark"
    ? "text-cream/90 hover:bg-white/10"
    : "text-foreground hover:bg-muted";

  return (
    <div className="relative shrink-0">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        onBlur={() => setTimeout(() => setOpen(false), 150)}
        className={`flex items-center gap-1 rounded-md px-2 py-1.5 text-sm font-medium transition-colors md:gap-1.5 md:px-2.5 ${colors}`}
        aria-label="Change language"
      >
        <Globe className="h-4 w-4" />
        <span className="uppercase">{lang}</span>
        <ChevronDown className="h-3.5 w-3.5" />
      </button>
      {open && (
        <div className="absolute right-0 top-full z-50 mt-1 w-44 overflow-hidden rounded-md border border-border bg-card shadow-lg animate-fade-in">
          {SUPPORTED_LANGS.map((code) => (
            <button
              type="button"
              key={code}
              onMouseDown={(e) => {
                e.preventDefault();
                setLang(code);
                setOpen(false);
              }}
              className={`flex w-full items-center justify-between px-3 py-2 text-sm transition-colors hover:bg-muted ${
                lang === code ? "bg-muted font-semibold text-primary" : "text-foreground"
              }`}
            >
              <span>{LANG_NAMES[code]}</span>
              <span className="text-xs uppercase text-muted-foreground">{code}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
