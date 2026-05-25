from pathlib import Path
import re
import shutil
import sys


ROOT = Path(__file__).resolve().parents[1]
DIST = ROOT / "dist"
LOCALES = ("en", "ru", "kk", "ky", "uz")


def copy_path(name: str) -> None:
    source = ROOT / name
    target = DIST / name
    if not source.exists():
        return
    if source.is_dir():
        if target.exists():
            shutil.rmtree(target)
        shutil.copytree(source, target)
    else:
        shutil.copy2(source, target)


def collect_routes() -> set[str]:
    routes: set[str] = set()
    for locale in LOCALES:
        for html_file in (DIST / locale).rglob("index.html"):
            rel = "/" + html_file.relative_to(DIST).as_posix()
            routes.add(rel.removesuffix("/index.html"))
    return routes


def rewrite_clean_urls(routes: set[str]) -> None:
    quoted_url = re.compile(
        r"(?P<quote>[\"\'])(?P<url>/(?:en|ru|kk|ky|uz)(?:/[A-Za-z0-9_.-]*)/?)(?P<suffix>[?#][^\"\']*)?(?P=quote)"
    )

    def replace_match(match: re.Match[str]) -> str:
        url = match.group("url")
        route = url.rstrip("/")
        if route in routes and not url.endswith("/index.html"):
            suffix = match.group("suffix") or ""
            quote = match.group("quote")
            return f"{quote}{route}/index.html{suffix}{quote}"
        return match.group(0)

    for html_file in DIST.rglob("*.html"):
        original = html_file.read_text(encoding="utf-8")
        rewritten = quoted_url.sub(replace_match, original)
        rewritten = re.sub(r"url=/(en|ru|kk|ky|uz)/", r"url=/\1/index.html", rewritten)
        if rewritten != original:
            html_file.write_text(rewritten, encoding="utf-8")


def write_404_redirect() -> None:
    (DIST / "404.html").write_text(
        r"""<!doctype html>
<html lang=\"ru\">
<head>
  <meta charset=\"utf-8\">
  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">
  <title>JIMON Group</title>
  <script>
    (function () {
      var path = window.location.pathname.replace(/\/$/, '');
      if (/^\/(en|ru|kk|ky|uz)(\/[^.]*)?$/.test(path)) {
        window.location.replace(path + '/index.html' + window.location.search + window.location.hash);
      }
    })();
  </script>
</head>
<body>
  <p>Not Found</p>
</body>
</html>
""",
        encoding="utf-8",
    )


def write_sitemap(routes: set[str]) -> None:
    base = "https://jimontorangy.com"
    body = "\n".join(
        f"  <url><loc>{base}{r}/index.html</loc></url>" for r in sorted(routes)
    )
    (DIST / "sitemap.xml").write_text(
        f'<?xml version="1.0" encoding="UTF-8"?>\n'
        f'<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n{body}\n</urlset>\n',
        encoding="utf-8",
    )


def write_redirects(routes: set[str]) -> None:
    lines = [
        f"{route} {route}/index.html 200\n{route}/ {route}/index.html 200"
        for route in sorted(routes)
    ]
    (DIST / "_redirects").write_text("\n".join(lines) + "\n", encoding="utf-8")


def write_index_page(routes: set[str]) -> None:
    items = "\n".join(
        f'    <li><a href="{r}/index.html">{r}/index.html</a></li>'
        for r in sorted(routes)
    )
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
    keep_existing = "--keep-existing" in sys.argv
    if DIST.exists() and not keep_existing:
        shutil.rmtree(DIST)
    DIST.mkdir(exist_ok=True)

    for name in ("index.html", ".nojekyll", "README.md", *LOCALES):
        copy_path(name)

    routes = collect_routes()
    rewrite_clean_urls(routes)
    write_404_redirect()
    write_sitemap(routes)
    write_redirects(routes)
    write_index_page(routes)


if __name__ == "__main__":
    main()
