from __future__ import annotations

import io
import subprocess
import textwrap
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont


ROOT = Path(__file__).resolve().parents[1]
LANGS = ["ru", "en", "kk", "ky", "uz"]


ANGUO = {
    "ru": (
        "Фармацевтическая группа Hebei Anguo",
        "Фармацевтическая группа Hebei Anguo выросла из фармацевтической фабрики провинции Хэбэй. В 1957 году она объединила 49 аптечных домов и стала одним из ключевых производителей традиционной китайской медицины. В 2024 году компания вошла в стратегическую реорганизацию с Baoding Traditional Chinese Medicine.",
    ),
    "en": (
        "Hebei Anguo Pharmaceutical Group Co., Ltd.",
        "Hebei Anguo Pharmaceutical Group grew from the Hebei provincial pharmaceutical factory. In 1957, it brought together 49 traditional pharmacy houses and became one of the key Chinese medicine manufacturers. In 2024, it entered a strategic reorganization with Baoding Traditional Chinese Medicine.",
    ),
    "kk": (
        "Hebei Anguo фармацевтикалық тобы",
        "Hebei Anguo фармацевтикалық тобы Хэбэй провинциясының фармацевтикалық фабрикасынан дамыды. 1957 жылы 49 дәстүрлі дәріхананы біріктіріп, қытай медицинасының маңызды өндірушілерінің біріне айналды. 2024 жылы Baoding Traditional Chinese Medicine компаниясымен стратегиялық қайта ұйымдастыруға кірді.",
    ),
    "ky": (
        "Hebei Anguo фармацевтикалык тобу",
        "Hebei Anguo фармацевтикалык тобу Хэбэй провинциясынын фармацевтикалык фабрикасынан өнүккөн. 1957-жылы 49 салттуу дарыкананы бириктирип, кытай медицинасынын маанилүү өндүрүүчүлөрүнүн бирине айланган. 2024-жылы Baoding Traditional Chinese Medicine менен стратегиялык кайра уюштурууга кирди.",
    ),
    "uz": (
        "Hebei Anguo farmatsevtika guruhi",
        "Hebei Anguo farmatsevtika guruhi Xebey provinsiyasi farmatsevtika fabrikasidan rivojlangan. 1957-yilda 49 an'anaviy dorixonani birlashtirib, xitoy tibbiyotining muhim ishlab chiqaruvchilaridan biriga aylandi. 2024-yilda Baoding Traditional Chinese Medicine bilan strategik qayta tashkil etishga kirdi.",
    ),
}


COUNTRIES = {
    "ru": {
        "canada": "JIMON Group Канада",
        "kazakhstan": "JIMON Group Казахстан",
        "russia": "JIMON Group Россия",
        "uzbekistan": "JIMON Group Узбекистан",
        "slovakia": "JIMON Group Словакия",
        "germany": "JIMON Group Германия",
        "france": "JIMON Group Франция",
        "china": "JIMON Group Китай",
        "korea": "JIMON Group Корея",
        "hongkong": "JIMON Group Гонконг",
        "indonesia": "JIMON Group Индонезия",
        "singapore": "JIMON Group Сингапур",
        "australia": "JIMON Group Австралия",
    },
    "en": {
        "canada": "JIMON Group Canada",
        "kazakhstan": "JIMON Group Kazakhstan",
        "russia": "JIMON Group Russia",
        "uzbekistan": "JIMON Group Uzbekistan",
        "slovakia": "JIMON Group Slovakia",
        "germany": "JIMON Group Germany",
        "france": "JIMON Group France",
        "china": "JIMON Group China",
        "korea": "JIMON Group Korea",
        "hongkong": "JIMON Group Hong Kong",
        "indonesia": "JIMON Group Indonesia",
        "singapore": "JIMON Group Singapore",
        "australia": "JIMON Group Australia",
    },
    "kk": {
        "canada": "JIMON Group Канада",
        "kazakhstan": "JIMON Group Қазақстан",
        "russia": "JIMON Group Ресей",
        "uzbekistan": "JIMON Group Өзбекстан",
        "slovakia": "JIMON Group Словакия",
        "germany": "JIMON Group Германия",
        "france": "JIMON Group Франция",
        "china": "JIMON Group Қытай",
        "korea": "JIMON Group Корея",
        "hongkong": "JIMON Group Гонконг",
        "indonesia": "JIMON Group Индонезия",
        "singapore": "JIMON Group Сингапур",
        "australia": "JIMON Group Австралия",
    },
    "ky": {
        "canada": "JIMON Group Канада",
        "kazakhstan": "JIMON Group Казакстан",
        "russia": "JIMON Group Россия",
        "uzbekistan": "JIMON Group Өзбекстан",
        "slovakia": "JIMON Group Словакия",
        "germany": "JIMON Group Германия",
        "france": "JIMON Group Франция",
        "china": "JIMON Group Кытай",
        "korea": "JIMON Group Корея",
        "hongkong": "JIMON Group Гонконг",
        "indonesia": "JIMON Group Индонезия",
        "singapore": "JIMON Group Сингапур",
        "australia": "JIMON Group Австралия",
    },
    "uz": {
        "canada": "JIMON Group Kanada",
        "kazakhstan": "JIMON Group Qozog'iston",
        "russia": "JIMON Group Rossiya",
        "uzbekistan": "JIMON Group O'zbekiston",
        "slovakia": "JIMON Group Slovakiya",
        "germany": "JIMON Group Germaniya",
        "france": "JIMON Group Fransiya",
        "china": "JIMON Group Xitoy",
        "korea": "JIMON Group Koreya",
        "hongkong": "JIMON Group Gonkong",
        "indonesia": "JIMON Group Indoneziya",
        "singapore": "JIMON Group Singapur",
        "australia": "JIMON Group Avstraliya",
    },
}


COUNTRY_SHORT = {
    "ru": {
        "canada": "Канада",
        "kazakhstan": "Казахстан",
        "russia": "Россия",
        "uzbekistan": "Узбекистан",
        "slovakia": "Словакия",
        "germany": "Германия",
        "france": "Франция",
        "china": "Китай",
        "korea": "Корея",
        "hongkong": "Гонконг",
        "indonesia": "Индонезия",
        "singapore": "Сингапур",
        "australia": "Австралия",
    },
    "en": {
        "canada": "Canada",
        "kazakhstan": "Kazakhstan",
        "russia": "Russia",
        "uzbekistan": "Uzbekistan",
        "slovakia": "Slovakia",
        "germany": "Germany",
        "france": "France",
        "china": "China",
        "korea": "Korea",
        "hongkong": "Hong Kong",
        "indonesia": "Indonesia",
        "singapore": "Singapore",
        "australia": "Australia",
    },
    "kk": {
        "canada": "Канада",
        "kazakhstan": "Қазақстан",
        "russia": "Ресей",
        "uzbekistan": "Өзбекстан",
        "slovakia": "Словакия",
        "germany": "Германия",
        "france": "Франция",
        "china": "Қытай",
        "korea": "Корея",
        "hongkong": "Гонконг",
        "indonesia": "Индонезия",
        "singapore": "Сингапур",
        "australia": "Австралия",
    },
    "ky": {
        "canada": "Канада",
        "kazakhstan": "Казакстан",
        "russia": "Россия",
        "uzbekistan": "Өзбекстан",
        "slovakia": "Словакия",
        "germany": "Германия",
        "france": "Франция",
        "china": "Кытай",
        "korea": "Корея",
        "hongkong": "Гонконг",
        "indonesia": "Индонезия",
        "singapore": "Сингапур",
        "australia": "Австралия",
    },
    "uz": {
        "canada": "Kanada",
        "kazakhstan": "Qozog'iston",
        "russia": "Rossiya",
        "uzbekistan": "O'zbekiston",
        "slovakia": "Slovakiya",
        "germany": "Germaniya",
        "france": "Fransiya",
        "china": "Xitoy",
        "korea": "Koreya",
        "hongkong": "Gonkong",
        "indonesia": "Indoneziya",
        "singapore": "Singapur",
        "australia": "Avstraliya",
    },
}


BIG_LABELS = {
    "kazakhstan": (407, 239, 640, 279),
    "russia": (687, 245, 903, 280),
    "uzbekistan": (410, 287, 681, 323),
    "slovakia": (337, 335, 554, 373),
    "germany": (239, 374, 419, 411),
    "france": (114, 415, 300, 452),
    "canada": (1202, 316, 1405, 354),
    "china": (703, 417, 883, 455),
    "korea": (919, 406, 1115, 443),
    "hongkong": (800, 500, 1024, 537),
    "indonesia": (703, 543, 940, 580),
    "singapore": (604, 590, 808, 626),
    "australia": (823, 697, 1044, 734),
}


SMALL_LABELS = {
    "canada": (10, 134, 215, 190),
    "russia": (435, 94, 655, 150),
    "slovakia": (265, 149, 495, 205),
    "germany": (230, 186, 455, 242),
    "france": (265, 217, 485, 273),
    "china": (405, 152, 605, 208),
    "korea": (530, 194, 730, 250),
    "hongkong": (475, 231, 700, 287),
    "indonesia": (400, 269, 650, 325),
    "singapore": (470, 311, 705, 367),
    "australia": (510, 364, 750, 420),
}


BRANCH_MAP_LABELS = {
    "kazakhstan": (190, 0, 370, 58),
    "russia": (330, 18, 510, 76),
    "uzbekistan": (185, 36, 375, 94),
    "slovakia": (135, 70, 330, 128),
    "germany": (65, 110, 260, 168),
    "france": (0, 138, 185, 196),
    "canada": (500, 100, 715, 158),
    "china": (295, 108, 485, 166),
    "korea": (395, 96, 595, 154),
    "hongkong": (335, 146, 545, 204),
    "indonesia": (295, 186, 525, 244),
    "singapore": (215, 224, 430, 282),
    "australia": (315, 281, 545, 345),
}


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
    words = text.split()
    lines: list[str] = []
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


def draw_wrapped(draw: ImageDraw.ImageDraw, xy: tuple[int, int], text: str, width: int, size: int, fill: tuple[int, int, int], bold: bool = False, gap: int = 5) -> None:
    fnt = font(size, bold)
    y = xy[1]
    for line in wrap(draw, text, fnt, width):
        draw.text((xy[0], y), line, font=fnt, fill=fill)
        y += size + gap


def draw_centered_pill(draw: ImageDraw.ImageDraw, box: tuple[int, int, int, int], text: str, variant: str) -> None:
    x1, y1, x2, y2 = box
    if variant == "big":
        draw.rounded_rectangle((x1 + 4, y1 + 6, x2 + 6, y2 + 8), radius=6, fill=(0, 0, 0))
        fill = (255, 255, 255)
        text_fill = (10, 10, 10)
        size = 24
    else:
        fill = (58, 140, 75)
        text_fill = (255, 255, 255)
        size = 14
    draw.rounded_rectangle(box, radius=min(22, (y2 - y1) // 2), fill=fill)
    r = (y2 - y1) // 2 - 3
    marker_left = x2 - (2 * r) - 10
    text_left = x1 + 16
    text_right = marker_left - 8
    text_width = max(40, text_right - text_left)
    fnt = font(size, bold=True)
    while size > 9 and draw.textbbox((0, 0), text, font=fnt)[2] > text_width:
        size -= 1
        fnt = font(size, bold=True)
    bbox = draw.textbbox((0, 0), text, font=fnt)
    draw.text((text_left + (text_width - (bbox[2] - bbox[0])) / 2, y1 + ((y2 - y1) - (bbox[3] - bbox[1])) / 2 - 2), text, font=fnt, fill=text_fill)
    # Keep the round JIMON marker visible at the right end.
    cx, cy = x2 - r - 5, y1 + (y2 - y1) // 2
    draw.ellipse((cx - r, cy - r, cx + r, cy + r), fill=(211, 190, 37))
    draw.arc((cx - r + 4, cy - r + 4, cx + r - 4, cy + r - 4), 205, 35, fill=(35, 145, 55), width=4)


def draw_white_label(draw: ImageDraw.ImageDraw, box: tuple[int, int, int, int], text: str, scale: str = "normal") -> None:
    x1, y1, x2, y2 = box
    draw.rounded_rectangle((x1 + 4, y1 + 5, x2 + 5, y2 + 7), radius=5, fill=(0, 0, 0))
    draw.rounded_rectangle(box, radius=5, fill=(255, 255, 255))
    h = y2 - y1
    r = max(8, h // 2 - 5)
    marker_left = x2 - 2 * r - 8
    text_left = x1 + 12
    text_width = max(30, marker_left - text_left - 6)
    size = 18 if scale == "normal" else 11
    label = f"JIMON {text}"
    fnt = font(size, True)
    while size > 8 and draw.textbbox((0, 0), label, font=fnt)[2] > text_width:
        size -= 1
        fnt = font(size, True)
    bbox = draw.textbbox((0, 0), label, font=fnt)
    draw.text(
        (text_left + (text_width - (bbox[2] - bbox[0])) / 2, y1 + ((h) - (bbox[3] - bbox[1])) / 2 - 1),
        label,
        font=fnt,
        fill=(15, 15, 15),
    )
    cx, cy = x2 - r - 5, y1 + h // 2
    draw.ellipse((cx - r, cy - r, cx + r, cy + r), fill=(211, 190, 37))
    draw.arc((cx - r + 3, cy - r + 3, cx + r - 3, cy + r - 3), 205, 35, fill=(35, 145, 55), width=max(2, r // 5))


def localize_anguo() -> None:
    rel = "we_brands/images/69d5eb628f90e.jpg"
    base = original(rel)
    for lang, (title, body) in ANGUO.items():
        image = base.copy()
        draw = ImageDraw.Draw(image)
        draw.rectangle((1000, 115, 1760, 385), fill=(18, 88, 46))
        draw_wrapped(draw, (1045, 155), title, 650, 34, (255, 255, 255), True)
        draw_wrapped(draw, (1045, 268), body, 690, 21, (255, 255, 255), True, 4)
        target = ROOT / lang / rel
        image.save(target, quality=94)
        print(f"updated {target.relative_to(ROOT)}")


def localize_big_map() -> None:
    rel = "we_brands/images/69d5bf9743162.png"
    base = original(rel)
    for lang in LANGS:
        image = base.copy()
        draw = ImageDraw.Draw(image)
        for key, box in BIG_LABELS.items():
            draw_white_label(draw, box, COUNTRY_SHORT[lang][key], "normal")
        target = ROOT / lang / rel
        image.save(target)
        print(f"updated {target.relative_to(ROOT)}")


def localize_small_map() -> None:
    rel = "we_brands/images/global_layout.png"
    base = original(rel)
    for lang in LANGS:
        image = base.copy()
        draw = ImageDraw.Draw(image)
        for key, box in SMALL_LABELS.items():
            draw_centered_pill(draw, box, COUNTRIES[lang][key].replace("JIMON Group ", "JIMON "), "small")
        target = ROOT / lang / rel
        image.save(target)
        print(f"updated {target.relative_to(ROOT)}")


def localize_branch_map() -> None:
    rel = "we_brands/images/69d5bcae37ae5.png"
    for lang in LANGS:
        image = original("we_brands/images/69d5bf9743162.png")
        draw = ImageDraw.Draw(image)
        for key, box in BIG_LABELS.items():
            draw_white_label(draw, box, COUNTRY_SHORT[lang][key], "normal")
        image.thumbnail((720, 335), Image.Resampling.LANCZOS)
        canvas = Image.new("RGB", (720, 371), (255, 255, 255))
        canvas.paste(image, ((720 - image.width) // 2, 18))
        image = canvas
        draw = ImageDraw.Draw(image)
        target = ROOT / lang / rel
        image.save(target)
        print(f"updated {target.relative_to(ROOT)}")


def main() -> None:
    localize_anguo()
    localize_big_map()
    localize_small_map()
    localize_branch_map()


if __name__ == "__main__":
    main()
