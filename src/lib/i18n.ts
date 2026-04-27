import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import ru from "@/locales/ru/common.json";
import kz from "@/locales/kz/common.json";
import uz from "@/locales/uz/common.json";
import en from "@/locales/en/common.json";
import kg from "@/locales/kg/common.json";

export const SUPPORTED_LANGS = ["ru", "kz", "uz", "en", "kg"] as const;
export type Lang = (typeof SUPPORTED_LANGS)[number];

export const LANG_NAMES: Record<Lang, string> = {
  ru: "Русский",
  kz: "Қазақша",
  uz: "Oʻzbekcha",
  en: "English",
  kg: "Кыргызча",
};

if (!i18n.isInitialized) {
  i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      resources: {
        ru: { common: ru },
        kz: { common: kz },
        uz: { common: uz },
        en: { common: en },
        kg: { common: kg },
      },
      fallbackLng: "ru",
      lng: "ru",
      defaultNS: "common",
      supportedLngs: SUPPORTED_LANGS as unknown as string[],
      interpolation: { escapeValue: false },
      detection: {
        order: [],
        lookupLocalStorage: "jimon_lang",
        caches: [],
      },
      react: { useSuspense: false },
    });
}

export default i18n;

export function getDbField<T extends Record<string, unknown>>(
  row: T,
  base: string,
  lang: Lang,
): string {
  const key = `${base}_${lang}` as keyof T;
  const value = row?.[key];
  if (typeof value === "string" && value.trim().length > 0) return value;
  const ruKey = `${base}_ru` as keyof T;
  const ruValue = row?.[ruKey];
  return typeof ruValue === "string" ? ruValue : "";
}
