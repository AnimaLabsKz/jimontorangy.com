import { Outlet, createRootRoute, HeadContent, Scripts, Link } from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";

import appCss from "../styles.css?url";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      { title: "JIMON Group — Восточная сила природы для всего мира" },
      { name: "description", content: "JIMON TORANGY DAILY NECESSITIES — корпоративная группа здоровья, продукция ТКМ, БАДы и косметика. 33 года опыта, 4 столетних бренда." },
      { name: "author", content: "JIMON Group" },
      { property: "og:title", content: "JIMON Group — Восточная сила природы для всего мира" },
      { property: "og:description", content: "JIMON TORANGY DAILY NECESSITIES — корпоративная группа здоровья, продукция ТКМ, БАДы и косметика. 33 года опыта, 4 столетних бренда." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "JIMON Group — Восточная сила природы для всего мира" },
      { name: "twitter:description", content: "JIMON TORANGY DAILY NECESSITIES — корпоративная группа здоровья, продукция ТКМ, БАДы и косметика. 33 года опыта, 4 столетних бренда." },
      { property: "og:image", content: "/jimon/references/home.png" },
      { name: "twitter:image", content: "/jimon/references/home.png" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Manrope:wght@500;600;700;800&family=Inter:wght@400;500;600;700&display=swap" },
      { rel: "stylesheet", href: appCss },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFound,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <head>
        <HeadContent />
      </head>
      <body className="pb-[env(safe-area-inset-bottom)]">
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <>
      <Outlet />
      <Toaster position="top-center" />
    </>
  );
}

function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6 text-center">
      <h1 className="text-display text-5xl font-extrabold text-primary">404</h1>
      <p className="mt-3 text-lg text-muted-foreground">Страница не найдена</p>
      <Link to="/" className="mt-6 rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90">
        На главную
      </Link>
    </div>
  );
}
