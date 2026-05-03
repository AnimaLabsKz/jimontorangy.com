import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type InquiryItem = {
  slug: string;
  name_zh: string;
  name_en: string;
  brand: string;
  category: string;
  image: string;
};

type InquiryContextValue = {
  items: InquiryItem[];
  add: (item: InquiryItem) => void;
  remove: (slug: string) => void;
  clear: () => void;
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

const InquiryContext = createContext<InquiryContextValue | null>(null);

const STORAGE_KEY = "jimon_inquiry";

export function InquiryProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<InquiryItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    try {
      const raw = typeof window !== "undefined" ? window.localStorage.getItem(STORAGE_KEY) : null;
      if (raw) setItems(JSON.parse(raw));
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // ignore
    }
  }, [items]);

  const value: InquiryContextValue = {
    items,
    add: (item) =>
      setItems((cur) => (cur.some((c) => c.slug === item.slug) ? cur : [...cur, item])),
    remove: (slug) => setItems((cur) => cur.filter((c) => c.slug !== slug)),
    clear: () => setItems([]),
    isOpen,
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
  };

  return <InquiryContext.Provider value={value}>{children}</InquiryContext.Provider>;
}

export function useInquiry() {
  const ctx = useContext(InquiryContext);
  if (!ctx) throw new Error("useInquiry must be used within InquiryProvider");
  return ctx;
}
