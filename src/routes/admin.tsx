import { createFileRoute, Link, Outlet, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Newspaper, Layers, Package, Languages, Inbox, LogOut, Leaf, HelpCircle } from "lucide-react";

export const Route = createFileRoute("/admin")({
  component: AdminLayout,
});

function AdminLayout() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [state, setState] = useState<"loading" | "ok" | "denied">("loading");

  useEffect(() => {
    let mounted = true;
    (async () => {
      const { supabase } = await import("@/integrations/supabase/client");
      const { data: sessionData } = await supabase.auth.getSession();
      const userId = sessionData.session?.user?.id;
      if (!userId) {
        navigate({ to: "/login" });
        return;
      }
      const { data } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", userId)
        .eq("role", "admin")
        .maybeSingle();
      if (mounted) setState(data ? "ok" : "denied");
    })();
    return () => {
      mounted = false;
    };
  }, [navigate]);

  const signOut = async () => {
    const { supabase } = await import("@/integrations/supabase/client");
    await supabase.auth.signOut();
    navigate({ to: "/login" });
  };

  if (state === "loading") {
    return <div className="flex min-h-screen items-center justify-center bg-cream text-muted-foreground">{t("common.loading")}</div>;
  }
  if (state === "denied") {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-cream px-6 text-center">
        <p className="max-w-md text-muted-foreground">{t("admin.no_access")}</p>
        <Link to="/" className="mt-6 rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground">{t("nav.home")}</Link>
      </div>
    );
  }

  const links = [
    { to: "/admin" as const, label: t("admin.menu.news"), icon: Newspaper, exact: true },
    { to: "/admin/brands" as const, label: t("admin.menu.brands"), icon: Layers },
    { to: "/admin/products" as const, label: t("admin.menu.products"), icon: Package },
    { to: "/admin/translations" as const, label: t("admin.menu.translations"), icon: Languages },
    { to: "/admin/messages" as const, label: t("admin.menu.messages"), icon: Inbox },
    { to: "/admin/help" as const, label: t("admin.menu.help"), icon: HelpCircle },
  ];

  return (
    <div className="flex min-h-screen bg-cream">
      <aside className="hidden w-64 shrink-0 flex-col bg-forest p-6 text-forest-foreground md:flex">
        <Link to="/" className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-md bg-gold text-gold-foreground"><Leaf className="h-5 w-5" /></span>
          <span className="text-display text-base font-extrabold">{t("brand.name")}</span>
        </Link>
        <nav className="mt-8 flex flex-1 flex-col gap-1">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: !!l.exact }}
              className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm text-cream/80 transition-colors hover:bg-white/5 hover:text-gold"
              activeProps={{ className: "flex items-center gap-3 rounded-md bg-white/10 px-3 py-2.5 text-sm font-semibold text-gold" }}
            >
              <l.icon className="h-4 w-4" />
              {l.label}
            </Link>
          ))}
        </nav>
        <button onClick={signOut} className="mt-4 flex items-center gap-3 rounded-md px-3 py-2.5 text-sm text-cream/70 transition-colors hover:bg-white/5 hover:text-cream">
          <LogOut className="h-4 w-4" />
          {t("nav.logout")}
        </button>
      </aside>

      <div className="flex-1 overflow-auto">
        <header className="flex items-center justify-between border-b border-border bg-card px-6 py-4 md:hidden">
          <span className="text-display text-base font-extrabold">{t("admin.title")}</span>
          <button onClick={signOut} className="text-sm text-muted-foreground"><LogOut className="h-4 w-4" /></button>
        </header>
        <div className="md:hidden border-b border-border bg-card px-4 py-3 overflow-x-auto">
          <div className="flex gap-2">
            {links.map((l) => (
              <Link key={l.to} to={l.to} activeOptions={{ exact: !!l.exact }}
                className="whitespace-nowrap rounded-full border border-border px-3 py-1.5 text-xs font-medium text-foreground"
                activeProps={{ className: "whitespace-nowrap rounded-full bg-primary text-primary-foreground px-3 py-1.5 text-xs font-semibold" }}>
                {l.label}
              </Link>
            ))}
          </div>
        </div>
        <main className="p-6 md:p-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
