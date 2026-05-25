from __future__ import annotations

import io
import subprocess
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont


ROOT = Path(__file__).resolve().parents[1]
LANGS = ["ru", "en", "kk", "ky", "uz"]


HERITAGE = {
    "ru": ("Наследие века", "Четыре вековые фармацевтические традиции: от продуктов, созданных с мастерством, до командных талантов. Мы продолжаем выходить за рамки привычного и вести индустрию вперёд.", "Подробнее"),
    "en": ("Century Heritage", "Four century-old pharmaceutical traditions: from carefully crafted products to talented teams. We keep breaking conventions and leading the industry forward.", "Learn more"),
    "kk": ("Ғасырлық мұра", "Төрт ғасырлық фармацевтикалық дәстүр: шебер өнімдерден командадағы таланттарға дейін. Біз қалыптасқан шеңберден шығып, саланы алға бастаймыз.", "Толығырақ"),
    "ky": ("Кылымдык мурас", "Төрт кылымдык фармацевтикалык салт: чебер жасалган продукттардан командадагы таланттарга чейин. Биз көнүмүш чектен чыгып, тармакты алдыга жетелейбиз.", "Кененирээк"),
    "uz": ("Asrlik meros", "To'rtta asrlik farmatsevtika an'anasi: puxta yaratilgan mahsulotlardan jamoa iste'dodigacha. Biz odatiy chegaralardan chiqib, sohani oldinga yetaklaymiz.", "Batafsil"),
}


STATS = {
    "ru": ["Команда R&D", "Госпатенты", "Разрешения на лекарства", "Стандартные препараты"],
    "en": ["R&D Team", "National Patents", "Drug Approvals", "Standard Medicines"],
    "kk": ["R&D командасы", "Мемл. патенттер", "Дәрі рұқсаттары", "Стандарт дәрілер"],
    "ky": ["R&D командасы", "Мамл. патенттер", "Дары уруксаттары", "Стандарт дарылар"],
    "uz": ["R&D jamoasi", "Davlat patentlari", "Dori ruxsatlari", "Standart dorilar"],
}


LOGISTICS = {
    "ru": (
        "3 ключевые базы",
        "1 R&D центр",
        ["Hebei logistics cloud warehouse", "Jiangxi logistics cloud warehouse", "Xinjiang logistics cloud warehouse"],
        ["Hebei: Anguo HQ, Baoding, Cangzhou", "Shanghai R&D Center", "East China, South China, Central China operation centers"],
    ),
    "en": (
        "3 key bases",
        "1 R&D center",
        ["Hebei logistics cloud warehouse", "Jiangxi logistics cloud warehouse", "Xinjiang logistics cloud warehouse"],
        ["Hebei: Anguo HQ, Baoding, Cangzhou", "Shanghai R&D Center", "East China, South China, Central China operation centers"],
    ),
    "kk": (
        "3 негізгі база",
        "1 R&D орталығы",
        ["Hebei logistics cloud warehouse", "Jiangxi logistics cloud warehouse", "Xinjiang logistics cloud warehouse"],
        ["Hebei: Anguo HQ, Baoding, Cangzhou", "Shanghai R&D Center", "East China, South China, Central China operation centers"],
    ),
    "ky": (
        "3 негизги база",
        "1 R&D борбору",
        ["Hebei logistics cloud warehouse", "Jiangxi logistics cloud warehouse", "Xinjiang logistics cloud warehouse"],
        ["Hebei: Anguo HQ, Baoding, Cangzhou", "Shanghai R&D Center", "East China, South China, Central China operation centers"],
    ),
    "uz": (
        "3 asosiy baza",
        "1 R&D markazi",
        ["Hebei logistics cloud warehouse", "Jiangxi logistics cloud warehouse", "Xinjiang logistics cloud warehouse"],
        ["Hebei: Anguo HQ, Baoding, Cangzhou", "Shanghai R&D Center", "East China, South China, Central China operation centers"],
    ),
}


FOUNDER = {
    "ru": ("Вера основателя", "Мы следуем принципу «наследовать лучшее и развивать через честные инновации» как ориентиру для действий, посвящая себя индустрии большого здоровья.", "Ню Ливэй", "Председатель JIMON Group", "Подробнее"),
    "en": ("Founder's Belief", "We follow the principle of inheriting the essence and innovating with integrity as our guide for action, dedicating ourselves to the great health industry.", "Niu Liwei", "Chairman of JIMON Group", "Learn more"),
    "kk": ("Негізін қалаушы сенімі", "Біз «үздікті мұра етіп, адал инновациямен дамыту» қағидасын іс-әрекет бағдары етіп ұстанамыз және үлкен денсаулық индустриясына қызмет етеміз.", "Ню Ливэй", "JIMON Group төрағасы", "Толығырақ"),
    "ky": ("Негиздөөчүнүн ишеними", "Биз «мыктыны мурастап, чынчыл инновация менен өнүктүрүү» принцибин иш-аракет багыты катары карманып, чоң ден соолук индустриясына кызмат кылабыз.", "Ню Ливэй", "JIMON Group төрагасы", "Кененирээк"),
    "uz": ("Asoschi e'tiqodi", "Biz «mohiyatni meros qilib, halol innovatsiya bilan rivojlantirish» tamoyilini amaliy yo'riqnoma sifatida tutamiz va katta salomatlik sohasiga xizmat qilamiz.", "Niu Liwei", "JIMON Group raisi", "Batafsil"),
}


EXHIBIT_LABELS = {
    "ru": ("Качество", "Выбор"),
    "en": ("Quality", "Choice"),
    "kk": ("Сапа", "Таңдау"),
    "ky": ("Сапат", "Тандоо"),
    "uz": ("Sifat", "Tanlov"),
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


def wrap(draw: ImageDraw.ImageDraw, text: str, fnt: ImageFont.ImageFont, width: int) -> list[str]:
    words = text.split()
    lines: list[str] = []
    cur = ""
    for word in words:
        cand = (cur + " " + word).strip()
        if not cur or draw.textbbox((0, 0), cand, font=fnt)[2] <= width:
            cur = cand
        else:
            lines.append(cur)
            cur = word
    if cur:
        lines.append(cur)
    return lines


def draw_wrapped(draw: ImageDraw.ImageDraw, xy: tuple[int, int], text: str, width: int, size: int, fill, bold=False, gap=5) -> int:
    fnt = font(size, bold)
    y = xy[1]
    for line in wrap(draw, text, fnt, width):
        draw.text((xy[0], y), line, font=fnt, fill=fill)
        y += size + gap
    return y


def draw_center(draw: ImageDraw.ImageDraw, box: tuple[int, int, int, int], text: str, size: int, fill, bold=True) -> None:
    x1, y1, x2, y2 = box
    fnt = font(size, bold)
    lines = wrap(draw, text, fnt, x2 - x1 - 8)
    while size > 10 and (len(lines) * (size + 4) > y2 - y1 - 4 or any(draw.textbbox((0, 0), line, font=fnt)[2] > x2 - x1 - 8 for line in lines)):
        size -= 1
        fnt = font(size, bold)
        lines = wrap(draw, text, fnt, x2 - x1 - 8)
    total = len(lines) * (size + 4) - 4
    y = y1 + (y2 - y1 - total) / 2
    for line in lines:
        bbox = draw.textbbox((0, 0), line, font=fnt)
        draw.text((x1 + (x2 - x1 - (bbox[2] - bbox[0])) / 2, y), line, font=fnt, fill=fill)
        y += size + 4


def localize_heritage() -> None:
    rel = "images/69c274a4b8d7d.png"
    for lang, (title, body, button) in HERITAGE.items():
        image = original(rel)
        draw = ImageDraw.Draw(image)
        draw.rectangle((0, 0, 713, 150), fill=(255, 255, 255))
        draw_wrapped(draw, (32, 20), title, 320, 28, (18, 94, 44), True)
        draw.line((32, 61, 210, 61), fill=(18, 94, 44), width=4)
        draw_wrapped(draw, (32, 74), body, 470, 20, (15, 15, 15), False, 5)
        draw.rounded_rectangle((520, 95, 670, 135), radius=20, outline=(18, 94, 44), width=2, fill=(255, 255, 255))
        draw_center(draw, (532, 98, 658, 132), button + "  ->", 18, (18, 94, 44), True)
        target = ROOT / lang / rel
        image.save(target)
        print(f"updated {target.relative_to(ROOT)}")


def localize_stats() -> None:
    rel = "images/69ef272821771.png"
    boxes = [(0, 0, 150, 100), (165, 0, 310, 100), (330, 0, 505, 100), (525, 0, 674, 100)]
    nums = ["90+", "30+", "300", "93"]
    for lang in LANGS:
        image = Image.new("RGB", (674, 100), (255, 255, 255))
        draw = ImageDraw.Draw(image)
        for box, num, label in zip(boxes, nums, STATS[lang]):
            x1, y1, x2, y2 = box
            draw_center(draw, (x1, 2, x2, 58), num, 44, (20, 20, 20), True)
            draw_center(draw, (x1, 56, x2, 98), label, 22, (30, 30, 30), True)
        target = ROOT / lang / rel
        image.save(target)
        print(f"updated {target.relative_to(ROOT)}")


def localize_logistics() -> None:
    rel = "images/69cb884d3eb29.png"
    base = original(rel)
    for lang, (headline, sub, left_labels, right_labels) in LOGISTICS.items():
        image = base.copy()
        draw = ImageDraw.Draw(image)
        draw.rectangle((392, 86, 736, 286), fill=(28, 35, 38))
        draw.rectangle((18, 405, 365, 508), fill=(26, 34, 40))
        draw.rectangle((405, 330, 736, 508), fill=(26, 34, 40))
        draw_center(draw, (415, 106, 722, 165), headline, 34, (255, 210, 76), True)
        draw_center(draw, (415, 166, 722, 222), sub, 32, (255, 210, 76), True)
        y = 420
        for label in left_labels:
            draw_wrapped(draw, (35, y), label, 300, 16, (255, 255, 255), True, 2)
            y += 26
        y = 345
        for label in right_labels:
            draw_wrapped(draw, (425, y), label, 292, 15, (255, 255, 255), True, 2)
            y += 45
        target = ROOT / lang / rel
        image.save(target)
        print(f"updated {target.relative_to(ROOT)}")


def localize_founder() -> None:
    rel = "images/69cb60cd9cfc9.png"
    base = original(rel)
    for lang, (title, body, name, role, button) in FOUNDER.items():
        image = base.copy()
        draw = ImageDraw.Draw(image)
        draw.rectangle((220, 0, 709, 234), fill=(255, 255, 255))
        draw_wrapped(draw, (315, 18), title, 290, 23, (18, 94, 44), True, 4)
        draw.line((315, 52, 500, 52), fill=(18, 94, 44), width=5)
        draw_wrapped(draw, (315, 66), body, 335, 16, (25, 25, 25), False, 4)
        draw_wrapped(draw, (315, 170), name, 220, 19, (25, 25, 25), True, 3)
        draw_wrapped(draw, (315, 193), role, 240, 14, (25, 25, 25), False, 2)
        draw.rounded_rectangle((560, 174, 695, 215), radius=20, fill=(5, 107, 51))
        draw_center(draw, (568, 178, 685, 211), button + " ->", 16, (255, 255, 255), True)
        target = ROOT / lang / rel
        image.save(target)
        print(f"updated {target.relative_to(ROOT)}")


def localize_exhibit_labels() -> None:
    rel = "images/69cc966a2287d.png"
    base = original(rel)
    for lang, (quality, choice) in EXHIBIT_LABELS.items():
        image = base.copy()
        draw = ImageDraw.Draw(image)
        draw.rounded_rectangle((166, 135, 204, 178), radius=3, fill=(240, 246, 239), outline=(140, 160, 145), width=1)
        draw.rounded_rectangle((215, 132, 258, 176), radius=3, fill=(240, 246, 239), outline=(140, 160, 145), width=1)
        draw_center(draw, (168, 138, 202, 174), quality, 10, (20, 90, 42), True)
        draw_center(draw, (217, 135, 256, 172), choice, 10, (20, 90, 42), True)
        target = ROOT / lang / rel
        image.save(target)
        print(f"updated {target.relative_to(ROOT)}")


def main() -> None:
    localize_heritage()
    localize_stats()
    localize_logistics()
    localize_founder()
    localize_exhibit_labels()


if __name__ == "__main__":
    main()
