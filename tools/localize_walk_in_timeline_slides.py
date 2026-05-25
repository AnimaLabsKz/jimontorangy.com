from __future__ import annotations

import io
import subprocess
import textwrap
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont


ROOT = Path(__file__).resolve().parents[1]
LANGS = ["ru", "en", "kk", "ky", "uz"]


SLIDES = {
    "69c49f848d617.png": {
        "texts": {
            "founder": {
                "ru": "Основатель JIMON Group\nZhong Jinmu\nПервый председатель JIMON Group, заложил прочную основу долгосрочного развития.",
                "en": "Founder of JIMON Group\nZhong Jinmu\nFirst chairman of JIMON Group, laying a solid foundation for long-term development.",
                "kk": "JIMON Group негізін қалаушы\nZhong Jinmu\nJIMON Group-тың алғашқы төрағасы, ұзақ мерзімді дамуға берік негіз қалады.",
                "ky": "JIMON Group негиздөөчүсү\nZhong Jinmu\nJIMON Groupтун биринчи төрагасы, узак мөөнөттүү өнүгүүгө бекем негиз салган.",
                "uz": "JIMON Group asoschisi\nZhong Jinmu\nJIMON Groupning birinchi raisi, uzoq muddatli rivojlanishga mustahkam asos yaratgan.",
            },
            "2003": {
                "ru": "Создан единственный на севере стандартизированный завод по производству борнеола",
                "en": "The north's only standardized borneol plant was officially established",
                "kk": "Солтүстіктегі жалғыз стандартталған борнеол зауыты ресми құрылды",
                "ky": "Түндүктөгү жалгыз стандартташтырылган борнеол заводу расмий түзүлдү",
                "uz": "Shimoldagi yagona standartlashtirilgan borneol zavodi rasman tashkil etildi",
            },
            "1993": {
                "ru": "Основан предшественник JIMON Group: фабрика лекарственных ломтиков Zhonghua Road в Аньго",
                "en": "JIMON Group's predecessor, Anguo Zhonghua Road decoction-piece factory, was founded",
                "kk": "JIMON Group-тың бастауы - Аньгодағы Zhonghua Road дәрілік тілімдер фабрикасы құрылды",
                "ky": "JIMON Groupтун башаты - Аньгодогу Zhonghua Road дары кесиндилери фабрикасы негизделди",
                "uz": "JIMON Groupning boshlang'ichi - Anguo Zhonghua Road dorivor bo'laklar fabrikasi tashkil etildi",
            },
        },
        "boxes": {
            "founder": (176, 38, 386, 170),
            "2003": (443, 142, 670, 215),
            "1993": (126, 422, 650, 468),
        },
    },
    "69c49f8cc4e8b.png": {
        "texts": {
            "2008": {
                "ru": "Полное приобретение Baoding Traditional Chinese Medicine Co., Ltd.",
                "en": "Wholly acquired Baoding Traditional Chinese Medicine Co., Ltd.",
                "kk": "Baoding Traditional Chinese Medicine Co., Ltd. толық сатып алынды",
                "ky": "Baoding Traditional Chinese Medicine Co., Ltd. толук сатып алынды",
                "uz": "Baoding Traditional Chinese Medicine Co., Ltd. to'liq sotib olindi",
            },
            "2006": {
                "ru": "Основана Hebei Jinmu Pharmaceutical Co., Ltd.",
                "en": "Hebei Jinmu Pharmaceutical Co., Ltd. was established",
                "kk": "Hebei Jinmu Pharmaceutical Co., Ltd. құрылды",
                "ky": "Hebei Jinmu Pharmaceutical Co., Ltd. түзүлдү",
                "uz": "Hebei Jinmu Pharmaceutical Co., Ltd. tashkil etildi",
            },
        },
        "boxes": {
            "2008": (435, 25, 700, 105),
            "2006": (86, 345, 375, 392),
        },
    },
    "69c49f9b7d07b.png": {
        "texts": {
            "2020": {
                "ru": "Создана фабрика инновационных растительных клеток для точной разработки китайской медицины",
                "en": "Built an innovative plant-cell factory for precision Chinese medicine R&D",
                "kk": "Қытай медицинасын дәл зерттеуге арналған өсімдік жасушалары инновациялық фабрикасы құрылды",
                "ky": "Кытай медицинасын так изилдөөгө арналган өсүмдүк клеткасынын инновациялык фабрикасы түзүлдү",
                "uz": "Xitoy tibbiyoti bo'yicha aniq R&D uchun innovatsion o'simlik hujayralari fabrikasi yaratildi",
            },
            "2019": {
                "ru": "Инвестиции в завод ласточкиного гнезда в Джакарте; основана Zhuoting Shanghai Daily Chemical",
                "en": "Invested in a bird's-nest factory in Jakarta; Zhuoting Shanghai Daily Chemical was founded",
                "kk": "Джакартада қарлығаш ұясы фабрикасына инвестиция салынды; Zhuoting Shanghai Daily Chemical құрылды",
                "ky": "Жакартада карлыгач уясы фабрикасына инвестиция салынды; Zhuoting Shanghai Daily Chemical түзүлдү",
                "uz": "Jakartada qush uyasi fabrikasiga investitsiya qilindi; Zhuoting Shanghai Daily Chemical tashkil etildi",
            },
        },
        "boxes": {
            "2020": (475, 136, 715, 205),
            "2019": (82, 355, 430, 435),
        },
    },
    "69c49fa323eff.png": {
        "texts": {
            "2023": {
                "ru": "30-летие JIMON Group",
                "en": "JIMON Group's 30th anniversary",
                "kk": "JIMON Group-тың 30 жылдығы",
                "ky": "JIMON Groupтун 30 жылдыгы",
                "uz": "JIMON Groupning 30 yilligi",
            },
            "2024": {
                "ru": "Создан маркетинговый центр; запущен парк здоровья в Цзилине; основана live-платформа JIMON Select; обновлена стратегия бренда",
                "en": "Marketing center established; Jilin health park launched; JIMON Select live platform founded; brand strategy upgraded",
                "kk": "Маркетинг орталығы құрылды; Цзилиньдегі денсаулық паркі іске қосылды; JIMON Select live платформасы құрылды; бренд стратегиясы жаңартылды",
                "ky": "Маркетинг борбору түзүлдү; Цзилиндеги ден соолук паркы ишке кирди; JIMON Select live платформасы түзүлдү; бренд стратегиясы жаңырды",
                "uz": "Marketing markazi tashkil etildi; Jilindagi sog'liq parki ishga tushdi; JIMON Select live platformasi yaratildi; brend strategiyasi yangilandi",
            },
        },
        "boxes": {
            "2023": (402, 118, 672, 165),
            "2024": (113, 345, 505, 445),
        },
    },
    "69c49faa20ca0.png": {
        "texts": {
            "2025": {
                "ru": "Опубликована AI-стратегия для технологий китайской медицины; запущен план C-domain экосистемы JIMON Group",
                "en": "Released an AI strategy for Chinese medicine technology and launched JIMON Group's C-domain ecosystem plan",
                "kk": "Қытай медицинасы технологияларына арналған AI стратегиясы жарияланып, JIMON Group C-domain экожүйе жоспары іске қосылды",
                "ky": "Кытай медицинасы технологиялары үчүн AI стратегиясы жарыяланып, JIMON Group C-domain экосистема планы ишке кирди",
                "uz": "Xitoy tibbiyoti texnologiyalari uchun AI strategiyasi e'lon qilindi va JIMON Group C-domain ekotizim rejasi ishga tushdi",
            },
            "2026": {
                "ru": "33-летие JIMON Group; старт суперлаборатории в Шанхае; создан филиал в Ухане",
                "en": "JIMON Group's 33rd anniversary; Shanghai Super Lab launched; Wuhan branch established",
                "kk": "JIMON Group-тың 33 жылдығы; Шанхай суперзертханасы іске қосылды; Ухань филиалы құрылды",
                "ky": "JIMON Groupтун 33 жылдыгы; Шанхай суперлабораториясы ишке кирди; Ухань филиалы түзүлдү",
                "uz": "JIMON Groupning 33 yilligi; Shanxay super laboratoriyasi ishga tushdi; Uxan filiali tashkil etildi",
            },
        },
        "boxes": {
            "2025": (43, 140, 338, 215),
            "2026": (407, 362, 665, 438),
        },
    },
}


def original(name: str) -> Image.Image:
    rel = f"walk_in_jimon/images/{name}"
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


def draw_text(draw: ImageDraw.ImageDraw, box: tuple[int, int, int, int], text: str, size: int = 21) -> None:
    x1, y1, x2, y2 = box
    draw.rectangle((x1 - 4, y1 - 4, x2 + 4, y2 + 4), fill=(255, 255, 255))
    while size > 11:
        fnt = font(size)
        lines = wrap(draw, text, fnt, x2 - x1)
        if len(lines) * (size + 3) <= (y2 - y1):
            break
        size -= 1
    y = y1
    for line in lines:
        draw.text((x1, y), line, font=fnt, fill=(55, 55, 55))
        y += size + 3


def main() -> None:
    for name, slide in SLIDES.items():
        base = original(name)
        for lang in LANGS:
            image = base.copy()
            draw = ImageDraw.Draw(image)
            for key, box in slide["boxes"].items():
                draw_text(draw, box, slide["texts"][key][lang], 22)
            target = ROOT / lang / "walk_in_jimon/images" / name
            image.save(target)
            print(f"updated {target.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
