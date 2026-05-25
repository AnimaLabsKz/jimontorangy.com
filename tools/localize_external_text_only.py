from __future__ import annotations

import io
import subprocess
import textwrap
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter, ImageFont


ROOT = Path(__file__).resolve().parents[1]
LANGS = ["ru", "en", "kk", "ky", "uz"]


TEXT = {
    "dietary": {
        "ru": ("Пищевые добавки", "Dietary Supplements", "Подробнее"),
        "en": ("Dietary Supplements", "", "View more"),
        "kk": ("Тағамдық қоспалар", "Dietary Supplements", "Толығырақ"),
        "ky": ("Тамак-аш кошумчалары", "Dietary Supplements", "Кененирээк"),
        "uz": ("Oziq-ovqat qo'shimchalari", "Dietary Supplements", "Batafsil"),
    },
    "botanical_food": {
        "ru": ("Растительные пищевые смеси", "Botanical Food Blends", "Подробнее"),
        "en": ("Botanical Food Blends", "", "View more"),
        "kk": ("Өсімдік тағам қоспалары", "Botanical Food Blends", "Толығырақ"),
        "ky": ("Өсүмдүк азык аралашмалары", "Botanical Food Blends", "Кененирээк"),
        "uz": ("O'simlik oziq aralashmalari", "Botanical Food Blends", "Batafsil"),
    },
    "skincare": {
        "ru": ("Уход за лицом", "Facial Skincare", "Подробнее"),
        "en": ("Facial Skincare", "", "View more"),
        "kk": ("Бет күтімі өнімдері", "Facial Skincare", "Толығырақ"),
        "ky": ("Бетке кам көрүү каражаттары", "Facial Skincare", "Кененирээк"),
        "uz": ("Yuz parvarishi mahsulotlari", "Facial Skincare", "Batafsil"),
    },
    "beverages": {
        "ru": ("Растительные напитки", "Botanical Blend Beverages", "Подробнее"),
        "en": ("Botanical Blend Beverages", "", "View more"),
        "kk": ("Өсімдік қоспалы сусындар", "Botanical Blend Beverages", "Толығырақ"),
        "ky": ("Өсүмдүк кошулмалуу суусундуктар", "Botanical Blend Beverages", "Кененирээк"),
        "uz": ("O'simlik aralashmali ichimliklar", "Botanical Blend Beverages", "Batafsil"),
    },
    "tcm": {
        "ru": ("Бренды традиционной китайской медицины", "Traditional Chinese Medicine", "Подробнее"),
        "en": ("Traditional Chinese Medicine Brands", "", "View more"),
        "kk": ("Дәстүрлі қытай медицинасы брендтері", "Traditional Chinese Medicine", "Толығырақ"),
        "ky": ("Салттуу кытай медицинасы бренддери", "Traditional Chinese Medicine", "Кененирээк"),
        "uz": ("An'anaviy xitoy tibbiyoti brendlari", "Traditional Chinese Medicine", "Batafsil"),
    },
}


BANNERS = [
    ("product_category/images/69dde4b9ea249.png", "dietary", (1180, 150, 1780, 330), (1225, 186), (1225, 258), (1225, 294, 1395, 345)),
    ("product_category/images/69ddadcdce9f5.png", "dietary", (405, 70, 700, 205), (430, 92), (430, 143), (430, 174, 580, 220)),
    ("product_category/images/69ddae898a2a9.png", "botanical_food", (285, 145, 760, 315), (330, 190), (330, 250), (330, 284, 500, 335)),
    ("product_category/images/69ddb1180a552.png", "botanical_food", (285, 145, 760, 315), (330, 190), (330, 250), (330, 284, 500, 335)),
    ("product_category/images/69ddadd684ef9.png", "botanical_food", (38, 58, 345, 190), (62, 80), (62, 137), (62, 166, 160, 202)),
    ("product_category/images/69ddb123232be.png", "skincare", (1180, 150, 1780, 330), (1230, 190), (1230, 247), (1230, 283, 1400, 336)),
    ("product_category/images/69ddadd67f7df.png", "skincare", (395, 70, 700, 210), (430, 98), (430, 150), (430, 178, 555, 214)),
    ("product_category/images/69ddad9a42599.png", "beverages", (30, 58, 360, 210), (62, 82), (62, 148), (62, 180, 170, 220)),
    ("product_category/images/69c48f06ca189.png", "tcm", (1120, 120, 1880, 365), (1190, 176), (1190, 265), (1190, 302, 1370, 355)),
    ("product_category/images/69c39f82963b0.png", "tcm", (360, 65, 705, 220), (405, 92), (405, 155), (405, 184, 540, 226)),
]


BRAND = {
    "rel": "we_brands/images/69ccc45acc22c.png",
    "panel": (910, 0, 1841, 495),
    "texts": {
        "ru": (
            "Фармацевтическая компания\nBaoding Traditional Chinese Medicine",
            "Компания основана в 1876 году и продолжает традиции производства препаратов китайской медицины. Это один из исторических фармацевтических брендов JIMON Group.",
        ),
        "en": (
            "Baoding Traditional Chinese Medicine\nPharmaceutical Co., Ltd.",
            "Founded in 1876, the company carries forward traditional Chinese medicine manufacturing standards and is one of JIMON Group's heritage pharmaceutical brands.",
        ),
        "kk": (
            "Baoding Traditional Chinese Medicine\nфармацевтикалық компаниясы",
            "1876 жылы құрылған компания дәстүрлі қытай медицинасының өндірістік стандарттарын жалғастырады және JIMON Group мұра брендтерінің бірі саналады.",
        ),
        "ky": (
            "Baoding Traditional Chinese Medicine\nфармацевтикалык компаниясы",
            "1876-жылы негизделген компания салттуу кытай медицинасынын өндүрүш стандарттарын улантат жана JIMON Groupтун мурас бренддеринин бири болуп саналат.",
        ),
        "uz": (
            "Baoding Traditional Chinese Medicine\nfarmatsevtika kompaniyasi",
            "1876-yilda tashkil etilgan kompaniya an'anaviy xitoy tibbiyoti ishlab chiqarish standartlarini davom ettiradi va JIMON Group meros brendlaridan biridir.",
        ),
    },
}


def original(rel: str) -> Image.Image:
    data = subprocess.check_output(["git", "show", f"HEAD:en/{rel}"], cwd=ROOT)
    return Image.open(io.BytesIO(data)).convert("RGB")


def font(size: int, bold: bool = False) -> ImageFont.ImageFont:
    candidates = [
        "/System/Library/Fonts/Supplemental/Arial Bold.ttf" if bold else "/System/Library/Fonts/Supplemental/Arial.ttf",
        "/System/Library/Fonts/Supplemental/Arial Unicode.ttf",
    ]
    for path in candidates:
        try:
            return ImageFont.truetype(path, size=size)
        except OSError:
            pass
    return ImageFont.load_default()


def soften_clear(image: Image.Image, box: tuple[int, int, int, int]) -> None:
    crop = image.crop(box).filter(ImageFilter.GaussianBlur(24))
    image.paste(crop, box)


def wrap_to_width(draw: ImageDraw.ImageDraw, text: str, fnt: ImageFont.ImageFont, max_width: int) -> list[str]:
    words = text.split()
    lines: list[str] = []
    current = ""
    for word in words:
        candidate = (current + " " + word).strip()
        if draw.textbbox((0, 0), candidate, font=fnt)[2] <= max_width or not current:
            current = candidate
        else:
            lines.append(current)
            current = word
    if current:
        lines.append(current)
    return lines


def draw_title(draw: ImageDraw.ImageDraw, xy: tuple[int, int], text: str, max_width: int, size: int) -> int:
    while size > 18:
        fnt = font(size, bold=True)
        lines = wrap_to_width(draw, text, fnt, max_width)
        if max(draw.textbbox((0, 0), line, font=fnt)[2] for line in lines) <= max_width:
            break
        size -= 1
    y = xy[1]
    for line in lines:
        draw.text((xy[0], y), line, font=fnt, fill=(20, 20, 20))
        y += size + 6
    return y


def draw_button(draw: ImageDraw.ImageDraw, box: tuple[int, int, int, int], text: str) -> None:
    x1, y1, x2, y2 = box
    draw.rounded_rectangle(box, radius=(y2 - y1) // 2, fill=(20, 92, 42))
    size = max(11, round((y2 - y1) * 0.34))
    fnt = font(size, bold=True)
    while size > 9 and draw.textbbox((0, 0), text, font=fnt)[2] > x2 - x1 - 16:
        size -= 1
        fnt = font(size, bold=True)
    bbox = draw.textbbox((0, 0), text, font=fnt)
    draw.text((x1 + ((x2 - x1) - (bbox[2] - bbox[0])) / 2, y1 + ((y2 - y1) - (bbox[3] - bbox[1])) / 2 - 2), text, font=fnt, fill="white")


def localize_banner(rel: str, key: str, clear: tuple[int, int, int, int], title_xy: tuple[int, int], sub_xy: tuple[int, int], button_box: tuple[int, int, int, int]) -> None:
    base = original(rel)
    for lang in LANGS:
        image = base.copy()
        draw = ImageDraw.Draw(image)
        soften_clear(image, clear)
        title, subtitle, cta = TEXT[key][lang]
        draw_title(draw, title_xy, title, clear[2] - title_xy[0] - 18, 37 if image.width > 1000 else 28)
        if subtitle:
            fnt = font(17 if image.width > 1000 else 11)
            draw.text(sub_xy, subtitle, font=fnt, fill=(55, 55, 55))
        draw_button(draw, button_box, cta)
        target = ROOT / lang / rel
        image.save(target)
        print(f"updated {target.relative_to(ROOT)}")


def localize_brand() -> None:
    base = original(BRAND["rel"])
    panel = BRAND["panel"]
    for lang, (title, body) in BRAND["texts"].items():
        image = base.copy()
        draw = ImageDraw.Draw(image)
        draw.rectangle(panel, fill=(13, 89, 47))
        title_font = font(34, bold=True)
        x, y = 990, 118
        for line in title.splitlines():
            draw.text((x, y), line, font=title_font, fill="white")
            y += 42
        body_font = font(19)
        y += 20
        for line in textwrap.wrap(body, width=62):
            draw.text((x, y), line, font=body_font, fill=(235, 245, 235))
            y += 28
        target = ROOT / lang / BRAND["rel"]
        image.save(target)
        print(f"updated {target.relative_to(ROOT)}")


def main() -> None:
    for args in BANNERS:
        localize_banner(*args)
    localize_brand()


if __name__ == "__main__":
    main()
