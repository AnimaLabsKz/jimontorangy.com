from __future__ import annotations

import io
import subprocess
import textwrap
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont


ROOT = Path(__file__).resolve().parents[1]
LANGS = ["ru", "en", "kk", "ky", "uz"]


BRAND_STRIPS = {
    "we_brands/images/69c3727a0d186.png": {
        "side": "right",
        "texts": {
            "ru": ("Фармацевтическая компания", "Baoding Traditional Chinese Medicine"),
            "en": ("Baoding Traditional Chinese Medicine", "Pharmaceutical Co., Ltd."),
            "kk": ("Baoding Traditional Chinese Medicine", "фармацевтикалық компаниясы"),
            "ky": ("Baoding Traditional Chinese Medicine", "фармацевтикалык компаниясы"),
            "uz": ("Baoding Traditional Chinese Medicine", "farmatsevtika kompaniyasi"),
        },
    },
    "we_brands/images/69c3728b67ccb.png": {
        "side": "right",
        "texts": {
            "ru": ("Фармацевтическая группа", "Hebei Anguo"),
            "en": ("Hebei Anguo Pharmaceutical Group", "Co., Ltd."),
            "kk": ("Hebei Anguo", "фармацевтикалық тобы"),
            "ky": ("Hebei Anguo", "фармацевтикалык тобу"),
            "uz": ("Hebei Anguo", "farmatsevtika guruhi"),
        },
    },
    "we_brands/images/69c3729287734.png": {
        "side": "left_yishou",
        "texts": {
            "ru": ("Зал Ишоу", "Основан в 1573 г.", "450 лет наследия"),
            "en": ("Yishou Hall", "Founded in 1573", "450 years of heritage"),
            "kk": ("Ишоу залы", "1573 жылы құрылған", "450 жылдық мұра"),
            "ky": ("Ишоу залы", "1573-жылы негизделген", "450 жылдык мурас"),
            "uz": ("Yishou zali", "1573-yilda tashkil etilgan", "450 yillik meros"),
        },
    },
    "we_brands/images/69c37283b593d.png": {
        "side": "left",
        "texts": {
            "ru": ("Холдинговая группа Yubentang", ""),
            "en": ("Yubentang Holding Group", ""),
            "kk": ("Yubentang холдинг тобы", ""),
            "ky": ("Yubentang холдинг тобу", ""),
            "uz": ("Yubentang xolding guruhi", ""),
        },
    },
}


COMPACT_VALUES = {
    "ru": [
        ("Миссия", "Наследовать культуру китайской медицины и вести к здоровому будущему"),
        ("Видение", "Лидер мировой культуры оздоровления на основе китайской медицины"),
        ("Ценности", "Уважение, благодарность, польза другим"),
        ("Заявление", "Золотое качество, совместное использование"),
        ("Дух", "Трудолюбие и качество"),
        ("Философия", "Качество как золото, сервис прежде всего, технологии впереди"),
    ],
    "en": [
        ("Mission", "Inherit Chinese medicine culture and lead a healthy future"),
        ("Vision", "Global leader in Chinese medicine wellness culture"),
        ("Values", "Respect, gratitude, benefit others"),
        ("Statement", "Golden quality, shared value"),
        ("Spirit", "Diligence and quality"),
        ("Philosophy", "Quality as gold, service first, technology ahead"),
    ],
    "kk": [
        ("Миссия", "Қытай медицинасы мәдениетін жалғастырып, салауатты болашаққа бастау"),
        ("Көрініс", "Қытай медицинасы сауықтыру мәдениетінің жаһандық көшбасшысы"),
        ("Құндылықтар", "Құрмет, алғыс, өзгеге пайда"),
        ("Ұстаным", "Алтын сапа, ортақ құндылық"),
        ("Рух", "Еңбекқорлық пен сапа"),
        ("Философия", "Сапа алтын, сервис бірінші, технология алда"),
    ],
    "ky": [
        ("Миссия", "Кытай медицинасынын маданиятын улантып, дени сак келечекке жетектөө"),
        ("Көз караш", "Кытай медицинасына негизделген ден соолук маданиятынын дүйнөлүк лидери"),
        ("Баалуулуктар", "Урмат, ыраазычылык, башкаларга пайда"),
        ("Убада", "Алтын сапат, жалпы баалуулук"),
        ("Рух", "Эмгекчилдик жана сапат"),
        ("Философия", "Сапат алтындай, сервис биринчи, технология алдыда"),
    ],
    "uz": [
        ("Missiya", "Xitoy tibbiyoti madaniyatini davom ettirib, sog'lom kelajak sari yetaklash"),
        ("Vizyon", "Xitoy tibbiyoti asosidagi sog'lom turmush madaniyatining global yetakchisi"),
        ("Qadriyatlar", "Hurmat, minnatdorlik, boshqalarga foyda"),
        ("Bayon", "Oltin sifat, umumiy qadriyat"),
        ("Ruh", "Mehnatsevarlik va sifat"),
        ("Falsafa", "Sifat oltindek, servis birinchi, texnologiya oldinda"),
    ],
}


VIP_INTRO = {
    "ru": (
        "JM JIMON Select",
        "Обзор платформы",
        "JIMON Select создана вокруг идеи: объединять пользователей платформы и строить более здоровую жизнь. Платформа соединяет качественные ресурсы цепочки поставок и даёт пользователям надёжные продукты для здоровья.\n\nМодель C-платформы опирается на контент, пользователей и экосистему. Через открытый обмен, объединение ресурсов и совместную работу платформа создаёт гибкий цифровой сервис, где подбор продуктов, оздоровление и повседневная жизнь становятся ближе друг к другу.",
    ),
    "en": (
        "JM JIMON Select",
        "Platform Introduction",
        "JIMON Select is built around one idea: bringing platform users together to create a healthier life. It integrates quality supply-chain resources and provides users with trusted health products.\n\nThe C-platform model is driven by content, users and ecosystem cooperation. Through open sharing, resource integration and joint operation, it creates a flexible digital service where product selection, wellness and everyday life work together.",
    ),
    "kk": (
        "JM JIMON Select",
        "Платформаға шолу",
        "JIMON Select платформасы пайдаланушыларды біріктіріп, салауатты өмір құру идеясына негізделген. Ол сапалы жеткізу тізбегі ресурстарын біріктіріп, пайдаланушыларға сенімді денсаулық өнімдерін ұсынады.\n\nC-платформа моделі контентке, пайдаланушыларға және экожүйелік ынтымақтастыққа сүйенеді. Ашық бөлісу, ресурстарды біріктіру және бірлескен жұмыс арқылы өнім таңдауы, сауықтыру және күнделікті өмір байланысатын икемді цифрлық сервис қалыптасады.",
    ),
    "ky": (
        "JM JIMON Select",
        "Платформага сереп",
        "JIMON Select колдонуучуларды бириктирип, дени сак жашоо түзүү идеясына негизделген. Ал сапаттуу жеткирүү чынжырынын ресурстарын бириктирип, колдонуучуларга ишенимдүү ден соолук продукцияларын сунуштайт.\n\nC-платформа модели контентке, колдонуучуларга жана экосистемалык кызматташууга таянат. Ачык бөлүшүү, ресурстарды бириктирүү жана биргелешкен иш аркылуу продукт тандоо, ден соолук жана күнүмдүк жашоо байланыша турган ийкемдүү санарип сервис түзүлөт.",
    ),
    "uz": (
        "JM JIMON Select",
        "Platforma haqida",
        "JIMON Select foydalanuvchilarni birlashtirib, sog'lomroq hayot yaratish g'oyasi atrofida qurilgan. Platforma sifatli ta'minot zanjiri resurslarini birlashtiradi va foydalanuvchilarga ishonchli sog'liq mahsulotlarini taqdim etadi.\n\nC-platforma modeli kontent, foydalanuvchilar va ekotizim hamkorligiga tayanadi. Ochiq almashuv, resurslarni birlashtirish va qo'shma ish orqali mahsulot tanlash, sog'lomlashtirish va kundalik hayotni bog'laydigan moslashuvchan raqamli servis yaratiladi.",
    ),
}


SLOGAN = {
    "ru": "Вместе к более здоровой жизни",
    "en": "Together for a healthier life",
    "kk": "Салауатты өмірге бірге",
    "ky": "Дени сак жашоого бирге",
    "uz": "Sog'lom hayot sari birga",
}


BRAND_CATEGORY_CARDS = {
    "we_brands/images/69ddb5f354ee8.png": {
        "box": (22, 70, 350, 132),
        "text": {
            "ru": "Бренд ухода за глазами",
            "en": "Eye Care Brand",
            "kk": "Көз күтімі бренді",
            "ky": "Көз кам көрүү бренди",
            "uz": "Ko'z parvarishi brendi",
        },
    },
    "we_brands/images/69ddb5f35ba06.png": {
        "box": (335, 104, 585, 158),
        "text": {
            "ru": "Бренд растительного ухода",
            "en": "Botanical Care Brand",
            "kk": "Өсімдік күтімі бренді",
            "ky": "Өсүмдүк кам көрүү бренди",
            "uz": "O'simlik parvarishi brendi",
        },
    },
    "we_brands/images/69e9b4664fb78.png": {
        "box": (328, 78, 585, 128),
        "text": {
            "ru": "Бренд ухода за лицом",
            "en": "Facial Skincare Brand",
            "kk": "Бет күтімі бренді",
            "ky": "Бетке кам көрүү бренди",
            "uz": "Yuz parvarishi brendi",
        },
    },
    "we_brands/images/69ddb5f34f0b9.png": {
        "box": (18, 72, 402, 145),
        "text": {
            "ru": "Бренд пищевых добавок",
            "en": "Nutrition Supplement Brand",
            "kk": "Тағамдық қоспалар бренді",
            "ky": "Азыктык кошумча бренди",
            "uz": "Oziqaviy qo'shimcha brendi",
        },
    },
    "we_brands/images/69ddb5f346f03.png": {
        "box": (318, 76, 610, 166),
        "text": {
            "ru": "Бренд растительных продуктов",
            "en": "Botanical Food Brand",
            "kk": "Өсімдік өнімдері бренді",
            "ky": "Өсүмдүк азык бренди",
            "uz": "O'simlik mahsulotlari brendi",
        },
    },
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
    lines: list[str] = []
    for para in text.split("\n"):
        words = para.split()
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
        if para == "":
            lines.append("")
    return lines


def draw_center(draw: ImageDraw.ImageDraw, box: tuple[int, int, int, int], text: str, size: int, fill: tuple[int, int, int], bold: bool = True) -> None:
    x1, y1, x2, y2 = box
    fnt = font(size, bold)
    lines = wrap(draw, text, fnt, x2 - x1 - 16)
    while size > 10 and len(lines) * (size + 4) > y2 - y1 - 8:
        size -= 1
        fnt = font(size, bold)
        lines = wrap(draw, text, fnt, x2 - x1 - 16)
    total = len(lines) * (size + 4) - 4
    y = y1 + (y2 - y1 - total) / 2
    for line in lines:
        bbox = draw.textbbox((0, 0), line, font=fnt)
        draw.text((x1 + (x2 - x1 - (bbox[2] - bbox[0])) / 2, y), line, font=fnt, fill=fill)
        y += size + 4


def draw_wrapped(draw: ImageDraw.ImageDraw, xy: tuple[int, int], text: str, width: int, size: int, fill: tuple[int, int, int], bold: bool = False, gap: int = 6) -> int:
    fnt = font(size, bold)
    y = xy[1]
    for line in wrap(draw, text, fnt, width):
        if line:
            draw.text((xy[0], y), line, font=fnt, fill=fill)
        y += size + gap
    return y


def localize_brand_strips() -> None:
    for rel, spec in BRAND_STRIPS.items():
        base = original(rel)
        for lang in LANGS:
            image = base.copy()
            draw = ImageDraw.Draw(image)
            text = spec["texts"][lang]
            if spec["side"] == "right":
                draw.rectangle((370, 46, 710, 188), fill=(20, 84, 43))
                draw_center(draw, (395, 58, 690, 176), f"{text[0]}\n{text[1]}", 20, (255, 255, 255), True)
            elif spec["side"] == "left":
                draw.rectangle((0, 68, 355, 168), fill=(18, 83, 40))
                draw_center(draw, (35, 78, 320, 156), "\n".join([part for part in text if part]), 23, (255, 255, 255), True)
            else:
                draw.rectangle((0, 72, 350, 165), fill=(18, 83, 40))
                draw_center(draw, (55, 78, 300, 155), text[0], 27, (255, 255, 255), True)
                draw.rectangle((392, 58, 560, 198), fill=(207, 92, 68))
                draw_center(draw, (402, 66, 550, 188), f"{text[1]}\n{text[2]}", 15, (255, 255, 255), True)
            target = ROOT / lang / rel
            image.save(target)
            print(f"updated {target.relative_to(ROOT)}")


def localize_compact_values() -> None:
    rel = "we_brands/images/69c38efd95857.png"
    base = original(rel)
    row_boxes = [(0, 7, 678, 107), (0, 123, 678, 223), (0, 239, 678, 339), (0, 355, 678, 455), (0, 471, 678, 570), (0, 587, 678, 686)]
    for lang, entries in COMPACT_VALUES.items():
        image = base.copy()
        draw = ImageDraw.Draw(image)
        for idx, (label, phrase) in enumerate(entries):
            x1, y1, x2, y2 = row_boxes[idx]
            green = idx % 2 == 0
            bg = (20, 76, 34) if green else (246, 247, 247)
            fg = (255, 255, 255) if green else (12, 70, 20)
            main = (255, 255, 255) if green else (10, 10, 10)
            draw.rectangle((0, y1 + 56, 145, y2), fill=bg)
            draw_center(draw, (12, y1 + 58, 130, y2 - 2), label, 16, fg, True)
            draw.rectangle((210, y1 + 12, x2, y2 - 8), fill=bg)
            draw_center(draw, (235, y1 + 15, x2 - 20, y2 - 10), phrase, 22, main, True)
        target = ROOT / lang / rel
        image.save(target)
        print(f"updated {target.relative_to(ROOT)}")


def localize_vip_intro() -> None:
    rel = "vip_center/images/69c4e8d8af18f.jpg"
    base = original(rel)
    for lang, (brand, title, body) in VIP_INTRO.items():
        image = base.copy()
        draw = ImageDraw.Draw(image)
        draw.polygon([(0, 0), (500, 0), (390, 600), (0, 600)], fill=(34, 143, 45))
        draw_wrapped(draw, (90, 110), brand, 320, 42, (255, 255, 255), True, 8)
        draw_wrapped(draw, (100, 260), title, 300, 36, (255, 255, 255), True, 8)
        draw.rectangle((500, 0, 1380, 600), fill=(255, 255, 255))
        y = draw_wrapped(draw, (560, 100), body, 760, 27, (20, 20, 20), False, 8)
        target = ROOT / lang / rel
        image.save(target, quality=94)
        print(f"updated {target.relative_to(ROOT)}")


def localize_category_slogan() -> None:
    rel = "product_category/images/69c35dee0b35c.jpg"
    base = original(rel)
    for lang in LANGS:
        image = base.copy()
        draw = ImageDraw.Draw(image)
        draw.rectangle((500, 340, 760, 465), fill=(48, 47, 42))
        draw_wrapped(draw, (522, 356), "JIMON GROUP", 220, 21, (255, 255, 255), True, 4)
        draw_center(draw, (518, 388, 750, 456), SLOGAN[lang], 19, (255, 255, 255), True)
        target = ROOT / lang / rel
        image.save(target, quality=94)
        print(f"updated {target.relative_to(ROOT)}")


def localize_brand_category_cards() -> None:
    for rel, spec in BRAND_CATEGORY_CARDS.items():
        base = original(rel)
        for lang in LANGS:
            image = base.copy()
            draw = ImageDraw.Draw(image)
            x1, y1, x2, y2 = spec["box"]
            draw.rectangle((x1, y1, x2, y2), fill=(255, 255, 255))
            draw_center(draw, (x1 + 4, y1, x2 - 4, y2), spec["text"][lang], 18, (20, 20, 20), True)
            target = ROOT / lang / rel
            image.save(target)
            print(f"updated {target.relative_to(ROOT)}")


def main() -> None:
    localize_brand_strips()
    localize_compact_values()
    localize_vip_intro()
    localize_category_slogan()
    localize_brand_category_cards()


if __name__ == "__main__":
    main()
