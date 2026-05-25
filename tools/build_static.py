from pathlib import Path
import re
import shutil


ROOT = Path(__file__).resolve().parents[1]
DIST = ROOT / "dist"
LOCALES = ("en", "ru", "kk", "ky", "uz")


def copy_path(name: str) -> None:
    source = ROOT / name
    target = DIST / name
    if not source.exists():
        return
    if source.is_dir():
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


def main() -> None:
    if DIST.exists():
        shutil.rmtree(DIST)
    DIST.mkdir()

    for name in ("index.html", ".nojekyll", "README.md", *LOCALES):
        copy_path(name)

    rewrite_clean_urls(collect_routes())


if __name__ == "__main__":
    main()
