"""Build static files for Lovable hosting.

The generated files are copied to public/ before the TanStack Start build.
Exact files such as /ru/index.html, /ru/css/*, /ru/js/* remain static assets,
while src/routes/$.tsx handles clean URLs such as /ru/ and /ru/product/.
"""

from __future__ import annotations

import shutil
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DIST = ROOT / "dist"
PUBLIC = ROOT / "public"
LOCALES = ("en", "ru", "kk", "ky", "uz")
DEFAULT_LOCALE = "ru"

COPY_TOP_LEVEL = ("index.html", ".nojekyll", "README.md", *LOCALES)


def copy_path(name: str) -> None:
    src = ROOT / name
    dst = DIST / name
    if not src.exists():
        return
    if src.is_dir():
        if dst.exists():
            shutil.rmtree(dst)
        shutil.copytree(src, dst)
    else:
        shutil.copy2(src, dst)


def collect_routes() -> list[str]:
    """Return every clean route (no trailing slash, no /index.html) for
    each locale, e.g. /ru, /ru/walk_in_jimon, /ru/post_detail-119."""
    routes: set[str] = set()
    for locale in LOCALES:
        locale_dir = DIST / locale
        if not locale_dir.exists():
            continue
        for html in locale_dir.rglob("index.html"):
            rel = html.relative_to(DIST).as_posix()  # ru/foo/index.html
            route = "/" + rel.removesuffix("/index.html")
            routes.add(route)
    return sorted(routes)


def write_redirects(routes: list[str]) -> None:
    """_redirects in Netlify/Cloudflare Pages format.

    Two layers of safety:
    1. Bare path without trailing slash -> trailing-slash version (301).
       Critical because every page uses relative asset URLs (css/, js/,
       images/), and those only resolve correctly when the URL ends with /.
    2. Trailing-slash path -> /index.html (200 rewrite). Most static hosts
       resolve this natively, but we declare it explicitly so the behavior
       is identical regardless of host.
    Root / sends visitors to the default locale.
    """
    lines: list[str] = [f"/  /{DEFAULT_LOCALE}/  302", ""]
    for route in routes:
        lines.append(f"{route}  {route}/  301")
    lines.append("")
    for route in routes:
        lines.append(f"{route}/  {route}/index.html  200")
    (DIST / "_redirects").write_text("\n".join(lines) + "\n", encoding="utf-8")


def write_sitemap(routes: list[str]) -> None:
    base = "https://jimontorangy.com"
    urls = "\n".join(f"  <url><loc>{base}{r}/</loc></url>" for r in routes)
    (DIST / "sitemap.xml").write_text(
        '<?xml version="1.0" encoding="UTF-8"?>\n'
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
        f"{urls}\n"
        "</urlset>\n",
        encoding="utf-8",
    )


def write_404() -> None:
    """Fallback page hosts serve for unmatched URLs.

    If the URL looks like a locale path missing a trailing slash, we
    fix it client-side; otherwise we land on the default locale.
    """
    (DIST / "404.html").write_text(
        """<!doctype html>
<html lang="ru">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>JIMON Group</title>
  <script>
    (function () {
      var p = window.location.pathname;
      var m = p.match(/^\\/(en|ru|kk|ky|uz)(\\/.*)?$/);
      if (m && !/\\/$/.test(p) && !/\\.[a-z0-9]+$/i.test(p)) {
        window.location.replace(p + '/' + window.location.search + window.location.hash);
        return;
      }
      if (!m) {
        window.location.replace('/ru/');
      }
    })();
  </script>
</head>
<body>
  <p>Not Found. <a href="/ru/">На главную</a></p>
</body>
</html>
""",
        encoding="utf-8",
    )


def write_index_page(routes: list[str]) -> None:
    items = "\n".join(f'    <li><a href="{r}/">{r}/</a></li>' for r in routes)
    (DIST / "pages.html").write_text(
        f"""<!doctype html>
<html lang="ru"><head><meta charset="utf-8"><title>All pages</title>
<style>body{{font-family:system-ui;padding:2rem;max-width:800px;margin:auto}}
li{{margin:.25rem 0}}a{{color:#0a66c2;text-decoration:none}}a:hover{{text-decoration:underline}}</style>
</head><body><h1>All pages</h1><ul>
{items}
</ul></body></html>
""",
        encoding="utf-8",
    )


def main() -> None:
    global DIST
    keep_existing = "--keep-existing" in sys.argv
    target = PUBLIC if "--public" in sys.argv else DIST
    DIST = target
    if DIST.exists() and not keep_existing:
        shutil.rmtree(DIST)
    DIST.mkdir(exist_ok=True)

    for name in COPY_TOP_LEVEL:
        copy_path(name)

    routes = collect_routes()
    write_redirects(routes)
    write_sitemap(routes)
    write_404()
    write_index_page(routes)

    print(f"Built {DIST.relative_to(ROOT)}/ with {len(routes)} routes across {len(LOCALES)} locales.")


if __name__ == "__main__":
    main()
