from __future__ import annotations

import io
import subprocess
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont


ROOT = Path(__file__).resolve().parents[1]
LANGS = ["ru", "en", "kk", "ky", "uz"]


TEXTS = {
    "2017": {
        "ru": "Полное приобретение Beijing Yubentang Pharmaceutical Group; создание Yubentang Chongqing Pharmaceutical",
        "en": "Wholly acquired Beijing Yubentang Pharmaceutical Group; Yubentang Chongqing Pharmaceutical was established",
        "kk": "Beijing Yubentang Pharmaceutical Group толық сатып алынды; Yubentang Chongqing Pharmaceutical құрылды",
        "ky": "Beijing Yubentang Pharmaceutical Group толук сатып алынды; Yubentang Chongqing Pharmaceutical түзүлдү",
        "uz": "Beijing Yubentang Pharmaceutical Group to'liq sotib olindi; Yubentang Chongqing Pharmaceutical tashkil etildi",
    },
    "2018": {
        "ru": "Международный индустриальный парк JIMON введен в эксплуатацию; создана австралийская филиальная компания",
        "en": "JIMON International Industrial Park began operation; an Australian branch company was established",
        "kk": "JIMON халықаралық индустриалды паркі іске қосылды; Австралияда филиал құрылды",
        "ky": "JIMON эл аралык индустриалдык паркы ишке кирди; Австралияда филиал түзүлдү",
        "uz": "JIMON xalqaro industrial parki ishga tushdi; Avstraliyada filial tashkil etildi",
    },
    "2019": {
        "ru": "Инвестиции в завод ласточкиного гнезда в Джакарте; основана Zhuoting Shanghai Daily Chemical",
        "en": "Invested in a bird's-nest factory in Jakarta; Zhuoting Shanghai Daily Chemical was founded",
        "kk": "Джакартада қарлығаш ұясы фабрикасына инвестиция салынды; Zhuoting Shanghai Daily Chemical құрылды",
        "ky": "Жакартада карлыгач уясы фабрикасына инвестиция салынды; Zhuoting Shanghai Daily Chemical түзүлдү",
        "uz": "Jakartada qush uyasi fabrikasiga investitsiya qilindi; Zhuoting Shanghai Daily Chemical tashkil etildi",
    },
    "2020": {
        "ru": "Создана фабрика инновационных растительных клеток для точной разработки китайской медицины",
        "en": "Built an innovative plant-cell factory for precision Chinese medicine R&D",
        "kk": "Қытай медицинасын дәл зерттеуге арналған өсімдік жасушалары фабрикасы құрылды",
        "ky": "Кытай медицинасын так изилдөөгө арналган өсүмдүк клетка фабрикасы түзүлдү",
        "uz": "Xitoy tibbiyoti bo'yicha aniq R&D uchun o'simlik hujayralari fabrikasi yaratildi",
    },
    "2021": {
        "ru": "Baoding Traditional Chinese Medicine Co., Ltd. прошла листинг на Shijiazhuang Equity Exchange",
        "en": "Baoding Traditional Chinese Medicine Co., Ltd. was listed on Shijiazhuang Equity Exchange",
        "kk": "Baoding Traditional Chinese Medicine Co., Ltd. Shijiazhuang Equity Exchange алаңында листингтен өтті",
        "ky": "Baoding Traditional Chinese Medicine Co., Ltd. Shijiazhuang Equity Exchange аянтында листингден өттү",
        "uz": "Baoding Traditional Chinese Medicine Co., Ltd. Shijiazhuang Equity Exchange'da ro'yxatdan o'tdi",
    },
    "2022": {
        "ru": "Индустриальный парк Yubentang Chongqing Pharmaceutical введен в эксплуатацию; создан маркетинговый центр здоровья JIMON",
        "en": "Yubentang Chongqing Pharmaceutical Industrial Park began operation; JIMON Health Marketing Center was established",
        "kk": "Yubentang Chongqing Pharmaceutical индустриалды паркі іске қосылды; JIMON денсаулық маркетинг орталығы құрылды",
        "ky": "Yubentang Chongqing Pharmaceutical индустриалдык паркы ишке кирди; JIMON ден соолук маркетинг борбору түзүлдү",
        "uz": "Yubentang Chongqing Pharmaceutical industrial parki ishga tushdi; JIMON sog'liq marketing markazi tashkil etildi",
    },
    "2022park": {
        "ru": "Индустриальный парк Yubentang Chongqing Pharmaceutical введен в эксплуатацию",
        "en": "Yubentang Chongqing Pharmaceutical Industrial Park began operation",
        "kk": "Yubentang Chongqing Pharmaceutical индустриалды паркі іске қосылды",
        "ky": "Yubentang Chongqing Pharmaceutical индустриалдык паркы ишке кирди",
        "uz": "Yubentang Chongqing Pharmaceutical industrial parki ishga tushdi",
    },
    "2023": {
        "ru": "30-летие JIMON Group",
        "en": "JIMON Group's 30th anniversary",
        "kk": "JIMON Group-тың 30 жылдығы",
        "ky": "JIMON Groupтун 30 жылдыгы",
        "uz": "JIMON Groupning 30 yilligi",
    },
    "2024": {
        "ru": "Создан маркетинговый центр; стратегическая реорганизация; запущена live-платформа JIMON Select; обновлена стратегия бренда",
        "en": "Marketing center established; strategic reorganization completed; JIMON Select live platform launched; brand strategy upgraded",
        "kk": "Маркетинг орталығы құрылды; стратегиялық қайта ұйымдастыру өтті; JIMON Select live платформасы іске қосылды; бренд стратегиясы жаңартылды",
        "ky": "Маркетинг борбору түзүлдү; стратегиялык кайра уюштуруу өттү; JIMON Select live платформасы ишке кирди; бренд стратегиясы жаңырды",
        "uz": "Marketing markazi tashkil etildi; strategik qayta tashkil etish o'tdi; JIMON Select live platformasi ishga tushdi; brend strategiyasi yangilandi",
    },
    "2025": {
        "ru": "Опубликована AI-стратегия для технологий китайской медицины; запущен план C-domain экосистемы JIMON Group",
        "en": "Released an AI strategy for Chinese medicine technology and launched JIMON Group's C-domain ecosystem plan",
        "kk": "Қытай медицинасы технологияларына арналған AI стратегиясы жарияланды; JIMON Group C-domain экожүйе жоспары іске қосылды",
        "ky": "Кытай медицинасы технологиялары үчүн AI стратегиясы жарыяланды; JIMON Group C-domain экосистема планы ишке кирди",
        "uz": "Xitoy tibbiyoti texnologiyalari uchun AI strategiyasi e'lon qilindi; JIMON Group C-domain ekotizim rejasi ishga tushdi",
    },
    "2026": {
        "ru": "33-летие JIMON Group; старт суперлаборатории в Шанхае; создан филиал в Ухане",
        "en": "JIMON Group's 33rd anniversary; Shanghai Super Lab launched; Wuhan branch established",
        "kk": "JIMON Group-тың 33 жылдығы; Шанхай суперзертханасы іске қосылды; Ухань филиалы құрылды",
        "ky": "JIMON Groupтун 33 жылдыгы; Шанхай суперлабораториясы ишке кирди; Ухань филиалы түзүлдү",
        "uz": "JIMON Groupning 33 yilligi; Shanxay super laboratoriyasi ishga tushdi; Uxan filiali tashkil etildi",
    },
}


IMAGES = {
    "69c4a523a16d0.jpg": {
        "2017": (130, 365, 540, 480),
        "2018": (928, 538, 1368, 625),
        "2019": (1425, 535, 1880, 615),
    },
    "69c4a52a8097a.jpg": {
        "2020": (126, 360, 435, 425),
        "2021": (584, 248, 925, 305),
        "2022park": (960, 500, 1320, 630),
        "2022": (1405, 530, 1900, 635),
    },
    "69c4a5323b32a.jpg": {
        "2023": (124, 238, 470, 290),
        "2024": (500, 458, 960, 645),
        "2025": (930, 175, 1400, 330),
        "2026": (1350, 462, 1845, 640),
    },
}


def original(name: str) -> Image.Image:
    rel = f"walk_in_jimon/images/{name}"
    data = subprocess.check_output(["git", "show", f"HEAD:en/{rel}"], cwd=ROOT)
    return Image.open(io.BytesIO(data)).convert("RGB")


def font(size: int) -> ImageFont.ImageFont:
    for path in ["/System/Library/Fonts/Supplemental/Arial.ttf", "/System/Library/Fonts/Supplemental/Arial Unicode.ttf"]:
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


def draw_box(draw: ImageDraw.ImageDraw, box: tuple[int, int, int, int], text: str) -> None:
    x1, y1, x2, y2 = box
    draw.rectangle((x1 - 5, y1 - 5, x2 + 5, y2 + 5), fill="white")
    size = 28
    while size > 15:
        fnt = font(size)
        lines = wrap(draw, text, fnt, x2 - x1)
        if len(lines) * (size + 5) <= y2 - y1:
            break
        size -= 2
    fnt = font(size)
    y = y1
    for line in lines:
        draw.text((x1, y), line, font=fnt, fill=(55, 55, 55))
        y += size + 5


def main() -> None:
    for name, boxes in IMAGES.items():
        base = original(name)
        for lang in LANGS:
            image = base.copy()
            draw = ImageDraw.Draw(image)
            for year, box in boxes.items():
                draw_box(draw, box, TEXTS[year][lang])
            target = ROOT / lang / "walk_in_jimon/images" / name
            image.save(target, quality=94)
            print(f"updated {target.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
