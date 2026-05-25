from __future__ import annotations

import io
import subprocess
import textwrap
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont


ROOT = Path(__file__).resolve().parents[1]
LANGS = ["ru", "en", "kk", "ky", "uz"]


TEXTS = {
    "cosmeceutical": {
        "ru": ("Snow Ran Grass: сине-белый фарфор, набор из 6 средств", "Jimon Cosmeceutical Product"),
        "en": ("Snow Ran Grass Blue-and-White Porcelain Six-Piece Set", "Jimon Cosmeceutical Product"),
        "kk": ("Snow Ran Grass: көк-ақ фарфор, 6 құрал жиынтығы", "Jimon Cosmeceutical Product"),
        "ky": ("Snow Ran Grass: көк-ак фарфор, 6 каражат топтому", "Jimon Cosmeceutical Product"),
        "uz": ("Snow Ran Grass: ko'k-oq chinni, 6 vositali to'plam", "Jimon Cosmeceutical Product"),
    },
    "intimate": {
        "ru": ("Yishayanmei антибактериальная жидкость", "Jimon Intimate Care Products"),
        "en": ("Yishayanmei Antibacterial Liquid", "Jimon Intimate Care Products"),
        "kk": ("Yishayanmei бактерияға қарсы сұйықтығы", "Jimon Intimate Care Products"),
        "ky": ("Yishayanmei бактерияга каршы суюктугу", "Jimon Intimate Care Products"),
        "uz": ("Yishayanmei antibakterial suyuqligi", "Jimon Intimate Care Products"),
    },
    "pain": {
        "ru": ("Keluoshu травяной балансирующий массажный крем", "Jimon Pain Management Products"),
        "en": ("Keluoshu Herbal Balance Massage Cream", "Jimon Pain Management Products"),
        "kk": ("Keluoshu шөпті теңгерім массаж кремі", "Jimon Pain Management Products"),
        "ky": ("Keluoshu чөптүү тең салмак массаж креми", "Jimon Pain Management Products"),
        "uz": ("Keluoshu o'simlikli muvozanat massaj kremi", "Jimon Pain Management Products"),
    },
    "liver": {
        "ru": ("Tianrancui: пептидный напиток для оси кишечник-печень", "Jimon Gut Liver-Axis"),
        "en": ("Tianrancui Gut Liver-Axis Plant Drink", "Jimon Gut Liver-Axis"),
        "kk": ("Tianrancui: ішек-бауыр осіне арналған өсімдік сусыны", "Jimon Gut Liver-Axis"),
        "ky": ("Tianrancui: ичеги-боор огуна арналган өсүмдүк ичимдиги", "Jimon Gut Liver-Axis"),
        "uz": ("Tianrancui: ichak-jigar o'qi uchun o'simlik ichimligi", "Jimon Gut Liver-Axis"),
    },
    "lung": {
        "ru": ("Tianrancui: комплексный растительный напиток", "Jimon Gut Lung-Axis"),
        "en": ("Tianrancui Gut Lung-Axis Plant Drink", "Jimon Gut Lung-Axis"),
        "kk": ("Tianrancui: ішек-өкпе осіне арналған өсімдік сусыны", "Jimon Gut Lung-Axis"),
        "ky": ("Tianrancui: ичеги-өпкө огуна арналган өсүмдүк ичимдиги", "Jimon Gut Lung-Axis"),
        "uz": ("Tianrancui: ichak-o'pka o'qi uchun o'simlik ichimligi", "Jimon Gut Lung-Axis"),
    },
    "anti_time": {
        "ru": ("Auraguru серия средств Anti-Time Factor", "Auraguru Anti-Time Factor Product Serie"),
        "en": ("Auraguru Anti-Time Factor Product Series", "Auraguru Anti-Time Factor Product Series"),
        "kk": ("Auraguru Anti-Time Factor өнімдер сериясы", "Auraguru Anti-Time Factor Product Series"),
        "ky": ("Auraguru Anti-Time Factor каражаттар сериясы", "Auraguru Anti-Time Factor Product Series"),
        "uz": ("Auraguru Anti-Time Factor mahsulotlar seriyasi", "Auraguru Anti-Time Factor Product Series"),
    },
}


BANNERS = [
    ("product/images/69cdc49c32073.png", "cosmeceutical", "large"),
    ("product/images/69cdc4ae8000e.png", "cosmeceutical", "small"),
    ("product/images/69cdc4c0647ba.png", "intimate", "large"),
    ("product/images/69cdc4d19425c.png", "intimate", "small"),
    ("product/images/69cdc4e205558.png", "pain", "large"),
    ("product/images/69cdc4ef18f36.png", "pain", "small"),
    ("product/images/69cdc4fc4c3ac.png", "liver", "large"),
    ("product/images/69cdc510ca08f.png", "liver", "small"),
    ("product/images/69cdc507a24f8.png", "lung", "large"),
    ("product/images/69cdc516cdaee.png", "lung", "small"),
    ("product/images/69eec1f764f9b.png", "anti_time", "large"),
    ("product/images/69eec27e6107f.png", "anti_time", "small"),
]


def original(rel: str) -> Image.Image:
    data = subprocess.check_output(["git", "show", f"HEAD:en/{rel}"], cwd=ROOT)
    return Image.open(io.BytesIO(data)).convert("RGB")


def font(size: int, bold: bool = False) -> ImageFont.ImageFont:
    for path in [
        "/System/Library/Fonts/Supplemental/Arial Bold.ttf" if bold else "/System/Library/Fonts/Supplemental/Arial.ttf",
        "/System/Library/Fonts/Supplemental/Arial Unicode.ttf",
    ]:
        try:
            return ImageFont.truetype(path, size=size)
        except OSError:
            pass
    return ImageFont.load_default()


def wrap(draw: ImageDraw.ImageDraw, text: str, fnt: ImageFont.ImageFont, max_width: int) -> list[str]:
    lines: list[str] = []
    for raw in text.splitlines():
        words = raw.split()
        cur = ""
        for word in words:
            cand = (cur + " " + word).strip()
            if not cur or draw.textbbox((0, 0), cand, font=fnt)[2] <= max_width:
                cur = cand
            else:
                lines.append(cur)
                cur = word
        if cur:
            lines.append(cur)
    return lines


def draw_text_block(draw: ImageDraw.ImageDraw, title: str, subtitle: str, variant: str) -> None:
    if variant == "large":
        clear = (55, 105, 690, 230)
        x, y = 76, 125
        max_width = 570
        title_size = 34
        subtitle_size = 19
    else:
        clear = (25, 45, 385, 128)
        x, y = 36, 58
        max_width = 320
        title_size = 18
        subtitle_size = 11
    draw.rectangle(clear, fill=(242, 246, 250))
    while title_size > 14:
        fnt = font(title_size)
        title_lines = wrap(draw, title, fnt, max_width)
        if len(title_lines) <= (2 if variant == "large" else 3):
            break
        title_size -= 2
    fnt = font(title_size)
    for line in title_lines:
        draw.text((x, y), line, font=fnt, fill=(0, 0, 0))
        y += title_size + (7 if variant == "large" else 3)
    sf = font(subtitle_size)
    for line in wrap(draw, subtitle, sf, max_width):
        draw.text((x, y + (8 if variant == "large" else 4)), line, font=sf, fill=(0, 0, 0))
        y += subtitle_size + 3


def main() -> None:
    for rel, key, variant in BANNERS:
        base = original(rel)
        for lang in LANGS:
            image = base.copy()
            draw_text_block(ImageDraw.Draw(image), *TEXTS[key][lang], variant)
            target = ROOT / lang / rel
            image.save(target)
            print(f"updated {target.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
