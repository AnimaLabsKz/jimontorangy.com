import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import "@/lib/i18n";
import type { Lang } from "@/lib/i18n";
import { SUPPORTED_LANGS } from "@/lib/i18n";

export function useLang(): { lang: Lang; setLang: (l: Lang) => void } {
  const { i18n } = useTranslation();
  const [lang, setLangState] = useState<Lang>(() => {
    const current = (i18n.language || "ru").slice(0, 2).toLowerCase();
    return (SUPPORTED_LANGS as readonly string[]).includes(current)
      ? (current as Lang)
      : "ru";
  });

  useEffect(() => {
    const onChange = (l: string) => {
      const short = l.slice(0, 2).toLowerCase();
      if ((SUPPORTED_LANGS as readonly string[]).includes(short)) {
        setLangState(short as Lang);
        if (typeof document !== "undefined") {
          document.documentElement.setAttribute("lang", short);
        }
      }
    };
    i18n.on("languageChanged", onChange);
    onChange(i18n.language || "ru");
    return () => {
      i18n.off("languageChanged", onChange);
    };
  }, [i18n]);

  const setLang = (l: Lang) => {
    i18n.changeLanguage(l);
  };

  return { lang, setLang };
}
