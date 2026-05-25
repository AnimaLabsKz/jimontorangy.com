#!/usr/bin/env python3
from __future__ import annotations

from pathlib import Path

from PIL import Image, ImageDraw, ImageFont


ROOT = Path(__file__).resolve().parents[1]
LANGS = {
    "ru": "Наверх",
    "en": "Top",
    "kk": "Жоғары",
    "ky": "Жогору",
    "uz": "Yuqoriga",
}
VISION = {
    "ru": "Видение",
    "en": "Vision",
    "kk": "Көзқарас",
    "ky": "Көрүнүш",
    "uz": "Nigoh",
}
FONT = "/System/Library/Fonts/Supplemental/Arial Bold.ttf"
GREEN = (24, 70, 40, 255)


def font(size: int) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(FONT, size=size)


def make_wap_top(text: str) -> Image.Image:
    im = Image.new("RGBA", (101, 105), (255, 255, 255, 0))
    draw = ImageDraw.Draw(im)
    draw.ellipse((18, 2, 83, 67), outline=GREEN, width=4)
    draw.polygon([(50, 20), (34, 47), (43, 47), (50, 34), (58, 47), (67, 47)], fill=GREEN)

    size = 18
    fnt = font(size)
    while size > 10:
        bbox = draw.textbbox((0, 0), text, font=fnt)
        if bbox[2] - bbox[0] <= 96:
            break
        size -= 1
        fnt = font(size)
    bbox = draw.textbbox((0, 0), text, font=fnt)
    draw.text(((101 - (bbox[2] - bbox[0])) / 2, 76), text, font=fnt, fill=GREEN)
    return im


def fix_wap_top() -> None:
    for lang, text in LANGS.items():
        image = make_wap_top(text)
        for target in (ROOT / lang).rglob("images/wap-top.png"):
            image.save(target)
            print("fixed", target.relative_to(ROOT))


def clean_culture_panel() -> None:
    rel = "we_brands/images/69ccb8e6cef2c.png"
    for lang in LANGS:
        path = ROOT / lang / rel
        im = Image.open(path).convert("RGBA")
        draw = ImageDraw.Draw(im)
        # Remove a colored generation artifact at the first row boundary.
        draw.rectangle((0, 141, im.width, 151), fill=(255, 255, 255, 255))
        draw.rectangle((138, 141, im.width, 143), fill=(0, 0, 0, 255))
        # Rebuild the left "Vision" cell; the source image contains colored noise here.
        draw.rectangle((0, 143, 137, 285), fill=(255, 255, 255, 255))
        draw.ellipse((52, 156, 104, 208), outline=GREEN, width=7)
        draw.rectangle((63, 207, 93, 228), fill=GREEN)
        draw.polygon([(50, 208), (69, 208), (58, 235)], fill=GREEN)
        draw.polygon([(87, 208), (106, 208), (98, 235)], fill=GREEN)
        label = VISION[lang]
        size = 19 if lang != "kk" else 17
        fnt = font(size)
        while size > 12 and draw.textbbox((0, 0), label, font=fnt)[2] > 120:
            size -= 1
            fnt = font(size)
        bbox = draw.textbbox((0, 0), label, font=fnt)
        draw.text(((137 - (bbox[2] - bbox[0])) / 2, 234), label, font=fnt, fill=GREEN)
        im.save(path)
        print("cleaned", path.relative_to(ROOT))


def add_cache_busts() -> None:
    replacements = {
        "images/wap-top.png": "images/wap-top.png?v=mobilefix20260512",
        "images/69ccb8e6cef2c.png": "images/69ccb8e6cef2c.png?v=culturefix20260512",
        "images/69c395fbe978f.png": "images/69c395fbe978f.png?v=pcatfix20260512",
        "images/69f00a34878c7.png": "images/69f00a34878c7.png?v=pcatfix20260512",
        "images/69c39f82963b0.png": "images/69c39f82963b0.png?v=pcatfix20260512",
        "images/69ddad9a42599.png": "images/69ddad9a42599.png?v=pcatfix20260512",
        "images/69ddadcdce9f5.png": "images/69ddadcdce9f5.png?v=pcatfix20260512",
        "images/69ddadd684ef9.png": "images/69ddadd684ef9.png?v=pcatfix20260512",
        "images/69ddadd67f7df.png": "images/69ddadd67f7df.png?v=pcatfix20260512",
    }
    for path in ROOT.glob("*/**/index.html"):
        text = path.read_text()
        updated = text
        for old, new in replacements.items():
            if new not in updated:
                updated = updated.replace(old, new)
        if updated != text:
            path.write_text(updated)
            print("cache-busted", path.relative_to(ROOT))


def main() -> None:
    fix_wap_top()
    clean_culture_panel()
    add_cache_busts()


if __name__ == "__main__":
    main()
