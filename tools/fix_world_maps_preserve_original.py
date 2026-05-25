#!/usr/bin/env python3
from __future__ import annotations

import io
import subprocess
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont


ROOT = Path(__file__).resolve().parents[1]
LANGS = ["ru", "en", "kk", "ky", "uz"]

TEXT = {
    "ru": {
        "kazakhstan": "JIMON Казахстан",
        "russia": "JIMON Россия",
        "uzbekistan": "JIMON Узбекистан",
        "slovakia": "JIMON Словакия",
        "germany": "JIMON Германия",
        "france": "JIMON Франция",
        "canada": "JIMON Канада",
        "china": "JIMON Китай",
        "korea": "JIMON Корея",
        "hongkong": "JIMON Гонконг",
        "indonesia": "JIMON Индонезия",
        "singapore": "JIMON Сингапур",
        "australia": "JIMON Австралия",
    },
    "en": {
        "kazakhstan": "JIMON Kazakhstan",
        "russia": "JIMON Russia",
        "uzbekistan": "JIMON Uzbekistan",
        "slovakia": "JIMON Slovakia",
        "germany": "JIMON Germany",
        "france": "JIMON France",
        "canada": "JIMON Canada",
        "china": "JIMON China",
        "korea": "JIMON Korea",
        "hongkong": "JIMON Hong Kong",
        "indonesia": "JIMON Indonesia",
        "singapore": "JIMON Singapore",
        "australia": "JIMON Australia",
    },
    "kk": {
        "kazakhstan": "JIMON Қазақстан",
        "russia": "JIMON Ресей",
        "uzbekistan": "JIMON Өзбекстан",
        "slovakia": "JIMON Словакия",
        "germany": "JIMON Германия",
        "france": "JIMON Франция",
        "canada": "JIMON Канада",
        "china": "JIMON Қытай",
        "korea": "JIMON Корея",
        "hongkong": "JIMON Гонконг",
        "indonesia": "JIMON Индонезия",
        "singapore": "JIMON Сингапур",
        "australia": "JIMON Австралия",
    },
    "ky": {
        "kazakhstan": "JIMON Казакстан",
        "russia": "JIMON Россия",
        "uzbekistan": "JIMON Өзбекстан",
        "slovakia": "JIMON Словакия",
        "germany": "JIMON Германия",
        "france": "JIMON Франция",
        "canada": "JIMON Канада",
        "china": "JIMON Кытай",
        "korea": "JIMON Корея",
        "hongkong": "JIMON Гонконг",
        "indonesia": "JIMON Индонезия",
        "singapore": "JIMON Сингапур",
        "australia": "JIMON Австралия",
    },
    "uz": {
        "kazakhstan": "JIMON Qozog'iston",
        "russia": "JIMON Rossiya",
        "uzbekistan": "JIMON O'zbekiston",
        "slovakia": "JIMON Slovakiya",
        "germany": "JIMON Germaniya",
        "france": "JIMON Fransiya",
        "canada": "JIMON Kanada",
        "china": "JIMON Xitoy",
        "korea": "JIMON Koreya",
        "hongkong": "JIMON Gonkong",
        "indonesia": "JIMON Indoneziya",
        "singapore": "JIMON Singapur",
        "australia": "JIMON Avstraliya",
    },
}

BIG = {
    "kazakhstan": (407, 239, 642, 279),
    "russia": (687, 245, 904, 281),
    "uzbekistan": (410, 287, 682, 324),
    "slovakia": (337, 335, 555, 374),
    "germany": (239, 374, 420, 412),
    "france": (114, 415, 300, 454),
    "canada": (1202, 316, 1406, 355),
    "china": (703, 417, 884, 456),
    "korea": (920, 406, 1116, 444),
    "hongkong": (800, 500, 1024, 538),
    "indonesia": (703, 543, 941, 581),
    "singapore": (604, 590, 809, 628),
    "australia": (823, 697, 1045, 735),
}

BRANCH = {
    "uzbekistan": (45, 11, 228, 38),
    "kazakhstan": (49, 46, 212, 73),
    "russia": (247, 50, 381, 77),
    "germany": (69, 112, 189, 139),
    "china": (256, 117, 369, 142),
    "korea": (383, 117, 503, 139),
    "canada": (527, 126, 661, 153),
    "france": (4, 146, 124, 173),
    "slovakia": (135, 150, 258, 172),
    "hongkong": (350, 155, 490, 182),
    "indonesia": (329, 196, 497, 219),
    "singapore": (175, 234, 310, 261),
    "australia": (239, 279, 389, 306),
}

FONT = "/System/Library/Fonts/Supplemental/Arial Bold.ttf"


def original(rel: str) -> Image.Image:
    data = subprocess.check_output(["git", "-C", str(ROOT), "show", f"HEAD:en/{rel}"])
    return Image.open(io.BytesIO(data)).convert("RGBA")


def font(size: int) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(FONT, size=size)


def draw_marker(draw: ImageDraw.ImageDraw, cx: int, cy: int, r: int) -> None:
    draw.ellipse((cx - r, cy - r, cx + r, cy + r), fill=(221, 201, 38, 255))
    inset1 = max(1, round(r * 0.28))
    inset2 = max(1, round(r * 0.45))
    inset3 = max(1, round(r * 0.62))
    draw.arc(
        (cx - r + inset1, cy - r + inset1, cx + r - inset1, cy + r - inset1),
        205,
        35,
        fill=(40, 145, 61, 255),
        width=max(1, r // 5),
    )
    draw.pieslice(
        (cx - r + inset2, cy - r + inset2, cx + r - inset2, cy + r - inset2),
        205,
        320,
        fill=(255, 255, 255, 230),
    )
    if r > 4:
        draw.ellipse(
            (cx - r + inset3, cy - r + inset3, cx + r - inset3, cy + r - inset3),
            fill=(221, 201, 38, 255),
        )


def draw_label(draw: ImageDraw.ImageDraw, box: tuple[int, int, int, int], text: str, small: bool = False) -> None:
    x1, y1, x2, y2 = box
    # Wipe the previous label and its shadow, then redraw in the same compact style.
    pad = 6 if not small else 3
    draw.rounded_rectangle((x1 - pad, y1 - pad, x2 + pad, y2 + pad), radius=6, fill=(0, 0, 0, 0))
    draw.rounded_rectangle((x1 + 4, y1 + 5, x2 + 5, y2 + 7), radius=5, fill=(0, 0, 0, 255))
    draw.rounded_rectangle((x1, y1, x2, y2), radius=5, fill=(255, 255, 255, 255))

    h = y2 - y1
    r = max(3 if small else 7, h // 2 - (2 if small else 5))
    cx = x2 - r - 7
    cy = y1 + h // 2
    text_left = x1 + (10 if not small else 5)
    text_right = cx - r - 5
    max_width = max(20, text_right - text_left)

    size = 20 if not small else 12
    fnt = font(size)
    while size > (9 if not small else 6) and draw.textbbox((0, 0), text, font=fnt)[2] > max_width:
        size -= 1
        fnt = font(size)
    bbox = draw.textbbox((0, 0), text, font=fnt)
    draw.text((text_left, y1 + (h - (bbox[3] - bbox[1])) / 2 - 1), text, font=fnt, fill=(0, 0, 0, 255))
    draw_marker(draw, cx, cy, r)


def render_big(lang: str) -> Image.Image:
    image = original("we_brands/images/69d5bf9743162.png")
    draw = ImageDraw.Draw(image, "RGBA")
    for key, box in BIG.items():
        draw_label(draw, box, TEXT[lang][key])
    return image


def render_branch(lang: str) -> Image.Image:
    image = original("we_brands/images/69d5bcae37ae5.png")
    draw = ImageDraw.Draw(image, "RGBA")
    for key, box in BRANCH.items():
        draw_label(draw, box, TEXT[lang][key], small=True)
    return image


def main() -> None:
    for lang in LANGS:
        big = render_big(lang)
        branch = render_branch(lang)
        big.save(ROOT / lang / "we_brands/images/69d5bf9743162.png")
        branch.save(ROOT / lang / "we_brands/images/69d5bcae37ae5.png")
        print(f"fixed maps for {lang}")


if __name__ == "__main__":
    main()
