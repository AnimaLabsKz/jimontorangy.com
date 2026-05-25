from __future__ import annotations

import io
import subprocess
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont


ROOT = Path(__file__).resolve().parents[1]
LANGS = ["ru", "en", "kk", "ky", "uz"]


TIMELINE = {
    "ru": {
        "1993": "Предшественник JIMON: фабрика травяных пластин на улице Чжунхуа в Анго.",
        "2003": "Официально создана единственная на севере Китая стандартизированная фабрика травяных пластин.",
        "2006": "Основана JIMON Pharmaceutical Co., Ltd.",
        "2008": "Полностью приобретена Baoding Traditional Chinese Medicine Co., Ltd.",
        "2015": "Получена лицензия прямых продаж N71; создан провинциальный институт технологий китайских лекарственных материалов и здоровья.",
        "2015_chair": "Председатель JIMON Group Ню Ливэй открыл быстрый путь к качественному развитию.",
        "2016": "Зарегистрирована и основана JIMON Co., Ltd.",
        "2017": "Полностью приобретена и создана Yubentang Holding Group; затем основана Yubentang Health Industry Co., Ltd.",
        "2018": "Индустриальный парк введён в эксплуатацию; создана база глубокой переработки китайского лекарственного сырья.",
    },
    "en": {
        "1993": "JIMON's predecessor, Anguo Zhonghua Road herbal pieces factory, was founded.",
        "2003": "Northern China's standardized herbal pieces factory was formally established.",
        "2006": "JIMON Pharmaceutical Co., Ltd. was founded.",
        "2008": "Baoding Traditional Chinese Medicine Co., Ltd. was fully acquired.",
        "2015": "Direct selling license No. 71 was obtained; a provincial institute for Chinese medicinal materials and health technology was founded.",
        "2015_chair": "JIMON Group chairman Niu Liwei opened a fast path for high-quality development.",
        "2016": "JIMON Co., Ltd. was registered and established.",
        "2017": "Yubentang Holding Group was acquired and established; Yubentang Health Industry Co., Ltd. was later founded.",
        "2018": "The industrial park entered operation, forming a deep-processing base for Chinese medicinal materials.",
    },
    "kk": {
        "1993": "JIMON-ның ізашары - Анго қаласындағы Чжунхуа жолы шөп пластиналары фабрикасы құрылды.",
        "2003": "Қытайдың солтүстігіндегі стандартталған шөп пластиналары фабрикасы ресми құрылды.",
        "2006": "JIMON Pharmaceutical Co., Ltd. құрылды.",
        "2008": "Baoding Traditional Chinese Medicine Co., Ltd. толық сатып алынды.",
        "2015": "N71 тікелей сату лицензиясы алынды; қытай дәрілік шикізаты мен денсаулық технологиялары институты құрылды.",
        "2015_chair": "JIMON Group төрағасы Ню Ливэй сапалы дамудың жедел жолын ашты.",
        "2016": "JIMON Co., Ltd. тіркеліп, құрылды.",
        "2017": "Yubentang Holding Group сатып алынып құрылды; кейін Yubentang Health Industry Co., Ltd. негізі қаланды.",
        "2018": "Индустриялық парк іске қосылып, қытай дәрілік шикізатын терең өңдеу базасы қалыптасты.",
    },
    "ky": {
        "1993": "JIMONдун мурунку ишканасы - Анго шаарындагы Чжунхуа жолу чөп пластиналары фабрикасы түзүлгөн.",
        "2003": "Кытайдын түндүгүндөгү стандартташкан чөп пластиналары фабрикасы расмий түзүлгөн.",
        "2006": "JIMON Pharmaceutical Co., Ltd. негизделген.",
        "2008": "Baoding Traditional Chinese Medicine Co., Ltd. толук сатып алынган.",
        "2015": "N71 түз сатуу лицензиясы алынган; кытай дары чийки заты жана ден соолук технологиялары институту түзүлгөн.",
        "2015_chair": "JIMON Group төрагасы Ню Ливэй сапаттуу өнүгүүнүн ылдам жолун ачкан.",
        "2016": "JIMON Co., Ltd. катталып, түзүлгөн.",
        "2017": "Yubentang Holding Group сатып алынып түзүлгөн; кийин Yubentang Health Industry Co., Ltd. негизделген.",
        "2018": "Индустриялык парк ишке кирип, кытай дары чийки затын терең иштетүү базасы түзүлгөн.",
    },
    "uz": {
        "1993": "JIMONning avvalgi korxonasi - Anguo Zhonghua Road dorivor o't plastinalari fabrikasi tashkil etildi.",
        "2003": "Shimoliy Xitoydagi standartlashtirilgan dorivor o't plastinalari fabrikasi rasman tashkil etildi.",
        "2006": "JIMON Pharmaceutical Co., Ltd. tashkil etildi.",
        "2008": "Baoding Traditional Chinese Medicine Co., Ltd. to'liq xarid qilindi.",
        "2015": "N71 to'g'ridan-to'g'ri savdo litsenziyasi olindi; xitoy dorivor xomashyosi va salomatlik texnologiyalari instituti tashkil etildi.",
        "2015_chair": "JIMON Group raisi Niu Liwei sifatli rivojlanishning tezkor yo'lini ochdi.",
        "2016": "JIMON Co., Ltd. ro'yxatdan o'tib, tashkil etildi.",
        "2017": "Yubentang Holding Group xarid qilinib tashkil etildi; keyin Yubentang Health Industry Co., Ltd. asos solindi.",
        "2018": "Industrial park ishga tushib, xitoy dorivor xomashyosini chuqur qayta ishlash bazasi shakllandi.",
    },
}


PRINCIPLES = {
    "ru": ["ТРАДИЦИЯ", "МОДЕРН", "МУДРОСТЬ", "НАУКА"],
    "en": ["TRADITION", "MODERN", "WISDOM", "SCIENCE"],
    "kk": ["ДӘСТҮР", "ЗАМАНАУИ", "ДАНАЛЫҚ", "ҒЫЛЫМ"],
    "ky": ["САЛТ", "ЗАМАНБАП", "АКЫЛ", "ИЛИМ"],
    "uz": ["AN'ANA", "MODERN", "DONOLIK", "ILM"],
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


def draw_block(draw: ImageDraw.ImageDraw, box: tuple[int, int, int, int], text: str, size: int = 25, fill=(35, 35, 35)) -> None:
    x1, y1, x2, y2 = box
    draw.rectangle(box, fill=(255, 255, 255))
    fnt = font(size, False)
    lines = wrap(draw, text, fnt, x2 - x1 - 8)
    while size > 12 and len(lines) * (size + 5) > y2 - y1 - 4:
        size -= 1
        fnt = font(size, False)
        lines = wrap(draw, text, fnt, x2 - x1 - 8)
    y = y1 + 2
    for line in lines:
        draw.text((x1 + 4, y), line, font=fnt, fill=fill)
        y += size + 5


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


def localize_wide_timeline() -> None:
    rel = "walk_in_jimon/images/69cb5ef5796c4.png"
    base = original(rel)
    boxes = {
        "2008": (115, 442, 445, 560),
        "2015": (640, 354, 1040, 455),
        "2015_chair": (1360, 236, 1710, 335),
        "2016": (1445, 468, 1765, 540),
    }
    for lang in LANGS:
        image = base.copy()
        draw = ImageDraw.Draw(image)
        for key, box in boxes.items():
            draw_block(draw, box, TIMELINE[lang][key], 24)
        target = ROOT / lang / rel
        image.save(target)
        print(f"updated {target.relative_to(ROOT)}")


def localize_early_timeline() -> None:
    rel = "walk_in_jimon/images/69c4e653bac9b.jpg"
    base = original(rel)
    boxes = {
        "2015_chair": (315, 110, 650, 230),
        "2003": (880, 198, 1180, 270),
        "1993": (90, 548, 520, 628),
        "2006": (1485, 548, 1780, 625),
    }
    for lang in LANGS:
        image = base.copy()
        draw = ImageDraw.Draw(image)
        for key, box in boxes.items():
            draw_block(draw, box, TIMELINE[lang][key], 24)
        target = ROOT / lang / rel
        image.save(target, quality=94)
        print(f"updated {target.relative_to(ROOT)}")


def localize_mobile_timelines() -> None:
    specs = {
        "walk_in_jimon/images/69cb5e92a4d01.png": {
            "2015": (48, 98, 420, 220),
            "2015_chair": (505, 36, 720, 136),
            "2016": (350, 356, 610, 425),
        },
        "walk_in_jimon/images/69c4b95255690.png": {
            "2017": (60, 96, 520, 215),
            "2018": (268, 306, 725, 392),
        },
    }
    for rel, boxes in specs.items():
        base = original(rel)
        for lang in LANGS:
            image = base.copy()
            draw = ImageDraw.Draw(image)
            for key, box in boxes.items():
                draw_block(draw, box, TIMELINE[lang][key], 13)
            target = ROOT / lang / rel
            image.save(target)
            print(f"updated {target.relative_to(ROOT)}")


def localize_portrait() -> None:
    rel = "walk_in_jimon/images/69cb60211b393.png"
    base = original(rel)
    for lang in LANGS:
        image = base.copy().convert("RGBA")
        overlay = Image.new("RGBA", image.size, (0, 0, 0, 0))
        draw = ImageDraw.Draw(overlay)
        draw.rectangle((176, 274, 386, 405), fill=(0, 0, 0, 145))
        merged = Image.alpha_composite(image, overlay).convert("RGB")
        draw = ImageDraw.Draw(merged)
        title = {
            "ru": "Председатель JIMON Group\nНю Ливэй",
            "en": "Chairman of JIMON Group\nNiu Liwei",
            "kk": "JIMON Group төрағасы\nНю Ливэй",
            "ky": "JIMON Group төрагасы\nНю Ливэй",
            "uz": "JIMON Group raisi\nNiu Liwei",
        }[lang]
        draw_center(draw, (182, 284, 380, 396), title, 21, (255, 255, 255), True)
        target = ROOT / lang / rel
        merged.save(target)
        print(f"updated {target.relative_to(ROOT)}")


def localize_principles() -> None:
    rel = "walk_in_jimon/images/69ccca633c40c.jpg"
    base = original(rel)
    boxes = [(14, 100, 184, 158), (205, 100, 384, 158), (397, 100, 576, 158), (588, 100, 865, 158)]
    for lang in LANGS:
        image = base.copy()
        draw = ImageDraw.Draw(image)
        draw.rectangle((0, 98, 866, 159), fill=(13, 116, 57))
        for box, text in zip(boxes, PRINCIPLES[lang]):
            draw_center(draw, box, text, 23, (255, 255, 255), True)
        target = ROOT / lang / rel
        image.save(target, quality=94)
        print(f"updated {target.relative_to(ROOT)}")


def main() -> None:
    localize_wide_timeline()
    localize_early_timeline()
    localize_mobile_timelines()
    localize_portrait()
    localize_principles()


if __name__ == "__main__":
    main()
