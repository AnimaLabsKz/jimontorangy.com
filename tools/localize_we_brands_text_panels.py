from __future__ import annotations

import io
import subprocess
import textwrap
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont


ROOT = Path(__file__).resolve().parents[1]
LANGS = ["ru", "en", "kk", "ky", "uz"]


YISHOU = {
    "ru": (
        "Зал Ишоу",
        "Зал Ишоу основан в 1573 году и хранит более 450 лет традиций китайской медицины. После присоединения к JIMON Group бренд развивает старинные рецептуры через современное производство, исследования и рынок.",
        "Основан в 1573 году",
    ),
    "en": (
        "Yishou Hall",
        "Founded in 1573, Yishou Hall preserves more than 450 years of traditional Chinese medicine heritage. After joining JIMON Group, the brand develops classic formulas through modern production, research and market resources.",
        "Founded in 1573",
    ),
    "kk": (
        "Ишоу залы",
        "1573 жылы құрылған Ишоу залы дәстүрлі қытай медицинасының 450 жылдан астам мұрасын сақтайды. JIMON Group құрамында бренд көне рецептураларды заманауи өндіріс, зерттеу және нарық мүмкіндіктерімен дамытады.",
        "1573 жылы құрылған",
    ),
    "ky": (
        "Ишоу залы",
        "1573-жылы негизделген Ишоу залы салттуу кытай медицинасынын 450 жылдан ашык мурасын сактайт. JIMON Group курамында бренд байыркы рецепттерди заманбап өндүрүш, изилдөө жана рынок мүмкүнчүлүктөрү менен өнүктүрөт.",
        "1573-жылы негизделген",
    ),
    "uz": (
        "Yishou zali",
        "1573-yilda tashkil etilgan Yishou zali an'anaviy xitoy tibbiyotining 450 yildan ortiq merosini saqlaydi. JIMON Group tarkibida brend qadimiy formulalarni zamonaviy ishlab chiqarish, tadqiqot va bozor imkoniyatlari bilan rivojlantiradi.",
        "1573-yilda tashkil etilgan",
    ),
}

YUBENTANG = {
    "ru": (
        "Холдинговая группа Yubentang",
        "Холдинговая группа Yubentang основана в 1997 году и продолжает стандарты качества традиционной китайской медицины. Компания объединяет выращивание сырья, производство, складскую логистику, розничные сети, онлайн-маркетинг, сервис и культурный обмен.",
    ),
    "en": (
        "Yubentang Holding Group Co., Ltd.",
        "Founded in 1997, Yubentang Holding Group carries forward traditional Chinese medicine quality standards. It integrates raw material cultivation, production, warehousing, retail chains, online marketing, service and cultural exchange.",
    ),
    "kk": (
        "Yubentang холдинг тобы",
        "1997 жылы құрылған Yubentang холдинг тобы дәстүрлі қытай медицинасының сапа стандарттарын жалғастырады. Компания шикізат өсіруді, өндірісті, қойма логистикасын, бөлшек сауданы, онлайн-маркетингті, сервисті және мәдени алмасуды біріктіреді.",
    ),
    "ky": (
        "Yubentang холдинг тобу",
        "1997-жылы негизделген Yubentang холдинг тобу салттуу кытай медицинасынын сапат стандарттарын улантат. Компания чийки зат өстүрүү, өндүрүш, кампа логистикасы, чекене тармак, онлайн-маркетинг, сервис жана маданий алмашууну бириктирет.",
    ),
    "uz": (
        "Yubentang xolding guruhi",
        "1997-yilda tashkil etilgan Yubentang xolding guruhi an'anaviy xitoy tibbiyoti sifat standartlarini davom ettiradi. Kompaniya xomashyo yetishtirish, ishlab chiqarish, ombor logistikasi, chakana savdo, onlayn marketing, servis va madaniy almashinuvni birlashtiradi.",
    ),
}

INFOGRAPHIC = {
    "ru": [
        ("Миссия", "Наследовать культуру китайской медицины и вести к здоровому будущему", "Передавать тысячелетний дух китайской медицины, сохранять культурные корни, вести новые тренды здоровья и строить здоровую жизнь."),
        ("Видение", "Лидер мировой культуры оздоровления на основе китайской медицины", "Вести глобальное оздоровление, передавать восточную мудрость, формировать культурный ориентир и открывать новые возможности развития."),
        ("Ценности", "Уважение, благодарность, польза другим", "Держаться корней, соблюдать правила, ценить качество, быть искренними, объединять силы и расти вместе."),
        ("Заявление бренда", "Золотое качество, совместное использование", "Качество совершенствует жизнь, сервис создает доверие, жизнь должна быть лучше."),
        ("Дух компании", "Трудолюбие и качество", "Глубоко развивать сферу здоровья и стать надежным лидером индустрии."),
        ("Философия", "Качество как золото, сервис прежде всего, технологии впереди", "Качество - жизнь компании, контроль начинается с источника, доверие строится с первого шага."),
    ],
    "en": [
        ("Mission", "Inherit Chinese medicine culture and lead a healthy future", "Carry forward the thousand-year spirit of Chinese medicine, preserve cultural roots, lead new health trends and build a healthy life."),
        ("Vision", "Global leader in Chinese medicine wellness culture", "Lead global wellness, share eastern health wisdom, set a cultural benchmark and open new paths for development."),
        ("Values", "Respect, gratitude, benefit others", "Stay true to roots, follow rules, value quality, act with sincerity, unite strength and grow together."),
        ("Brand Statement", "Golden quality, shared value", "Quality improves life, service builds trust, and life should be better."),
        ("Spirit", "Diligence and quality", "Deeply cultivate health and become a trusted leader in the industry."),
        ("Philosophy", "Quality as gold, service first, technology ahead", "Quality is the life of the company; control starts at the source and trust starts with every step."),
    ],
    "kk": [
        ("Миссия", "Қытай медицинасы мәдениетін жалғастырып, салауатты болашаққа бастау", "Қытай медицинасының мыңжылдық рухын жеткізу, мәдени тамырды сақтау, денсаулық трендтерін бастап, салауатты өмір құру."),
        ("Көрініс", "Қытай медицинасы сауықтыру мәдениетінің жаһандық көшбасшысы", "Жаһандық сауықтыруды дамыту, шығыс даналығын тарату, мәдени бағдар қалыптастыру және дамудың жаңа жолын ашу."),
        ("Құндылықтар", "Құрмет, алғыс, өзгеге пайда", "Тамырға адал болу, ережені сақтау, сапаны бағалау, шынайы болу, күш біріктіріп бірге өсу."),
        ("Бренд ұстанымы", "Алтын сапа, ортақ құндылық", "Сапа өмірді жақсартады, сервис сенім қалыптастырады, өмір бұдан да жақсы болуы тиіс."),
        ("Компания рухы", "Еңбекқорлық пен сапа", "Денсаулық саласын терең дамытып, сенімді индустрия көшбасшысы болу."),
        ("Философия", "Сапа алтын, сервис бірінші, технология алда", "Сапа - компанияның өмірі; бақылау бастау көзінен, сенім әр қадамнан басталады."),
    ],
    "ky": [
        ("Миссия", "Кытай медицинасынын маданиятын улантып, дени сак келечекке жетектөө", "Кытай медицинасынын миң жылдык рухун жайылтуу, маданий тамырды сактоо, ден соолук тренддерин баштоо жана сергек жашоо куруу."),
        ("Көз караш", "Кытай медицинасына негизделген ден соолук маданиятынын дүйнөлүк лидери", "Дүйнөлүк ден соолукту өнүктүрүү, чыгыш акылмандыгын жайылтуу, маданий багыт түзүү жана өнүгүүнүн жаңы жолун ачуу."),
        ("Баалуулуктар", "Урмат, ыраазычылык, башкаларга пайда", "Тамырга бекем туруу, эрежени сактоо, сапатты баалоо, чынчыл болуу, күч бириктирип бирге өсүү."),
        ("Бренд убадасы", "Алтын сапат, жалпы баалуулук", "Сапат жашоону жакшыртат, сервис ишеним түзөт, жашоо мындан да жакшы болушу керек."),
        ("Компания руху", "Эмгекчилдик жана сапат", "Ден соолук тармагын терең өнүктүрүп, ишенимдүү лидер болуу."),
        ("Философия", "Сапат алтындай, сервис биринчи, технология алдыда", "Сапат - компаниянын өмүрү; көзөмөл булактан, ишеним ар бир кадамдан башталат."),
    ],
    "uz": [
        ("Missiya", "Xitoy tibbiyoti madaniyatini davom ettirib, sog'lom kelajak sari yetaklash", "Xitoy tibbiyotining ming yillik ruhini davom ettirish, madaniy ildizlarni saqlash, sog'liq trendlarini boshlab, sog'lom hayot qurish."),
        ("Vizyon", "Xitoy tibbiyoti asosidagi sog'lom turmush madaniyatining global yetakchisi", "Global sog'lomlashtirishni rivojlantirish, sharqona donolikni ulashish, madaniy mezon yaratish va rivojlanishning yangi yo'llarini ochish."),
        ("Qadriyatlar", "Hurmat, minnatdorlik, boshqalarga foyda", "Ildizlarga sodiq qolish, qoidalarga amal qilish, sifatni qadrlash, samimiy bo'lish, kuchlarni birlashtirib birga o'sish."),
        ("Brend bayoni", "Oltin sifat, umumiy qadriyat", "Sifat hayotni yaxshilaydi, servis ishonch yaratadi, hayot yanada go'zal bo'lishi kerak."),
        ("Kompaniya ruhi", "Mehnatsevarlik va sifat", "Sog'liq sohasini chuqur rivojlantirib, ishonchli yetakchiga aylanish."),
        ("Falsafa", "Sifat oltindek, servis birinchi, texnologiya oldinda", "Sifat kompaniyaning hayoti; nazorat manbadan, ishonch esa har qadamdan boshlanadi."),
    ],
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


def draw_wrapped(draw: ImageDraw.ImageDraw, xy: tuple[int, int], text: str, max_width: int, size: int, fill: tuple[int, int, int], bold: bool = False, line_gap: int = 6) -> int:
    fnt = font(size, bold)
    lines = wrap(draw, text, fnt, max_width)
    y = xy[1]
    for line in lines:
        draw.text((xy[0], y), line, font=fnt, fill=fill)
        y += size + line_gap
    return y


def localize_yishou() -> None:
    rel = "we_brands/images/69ccbe872b948.png"
    base = original(rel)
    for lang, (title, body, founded) in YISHOU.items():
        image = base.copy()
        draw = ImageDraw.Draw(image)
        draw.rectangle((45, 120, 845, 340), fill=(18, 79, 37))
        draw_wrapped(draw, (65, 150), title, 620, 37, (255, 255, 255), True)
        draw_wrapped(draw, (65, 242), body, 780, 21, (255, 255, 255), True, 4)
        draw.rectangle((990, 220, 1390, 340), fill=(207, 92, 68))
        draw_wrapped(draw, (995, 232), founded, 380, 44, (255, 255, 255), True, 8)
        target = ROOT / lang / rel
        image.save(target)
        print(f"updated {target.relative_to(ROOT)}")


def localize_yubentang() -> None:
    rel = "we_brands/images/69ccc59ac5b32.png"
    base = original(rel)
    for lang, (title, body) in YUBENTANG.items():
        image = base.copy()
        draw = ImageDraw.Draw(image)
        draw.rectangle((58, 120, 820, 340), fill=(18, 88, 46))
        draw_wrapped(draw, (78, 150), title, 700, 33, (255, 255, 255), True)
        draw_wrapped(draw, (78, 244), body, 725, 20, (255, 255, 255), True, 4)
        target = ROOT / lang / rel
        image.save(target)
        print(f"updated {target.relative_to(ROOT)}")


def draw_center(draw: ImageDraw.ImageDraw, box: tuple[int, int, int, int], text: str, size: int, fill: tuple[int, int, int], bold: bool = True) -> None:
    fnt = font(size, bold)
    x1, y1, x2, y2 = box
    lines = wrap(draw, text, fnt, x2 - x1 - 20)
    while size > 13 and len(lines) * (size + 4) > y2 - y1 - 10:
        size -= 1
        fnt = font(size, bold)
        lines = wrap(draw, text, fnt, x2 - x1 - 20)
    total_h = len(lines) * (size + 4) - 4
    y = y1 + ((y2 - y1) - total_h) / 2
    for line in lines:
        bbox = draw.textbbox((0, 0), line, font=fnt)
        draw.text((x1 + ((x2 - x1) - (bbox[2] - bbox[0])) / 2, y), line, font=fnt, fill=fill)
        y += size + 4


def localize_infographic() -> None:
    rel = "we_brands/images/69ccb8e6cef2c.png"
    base = original(rel)
    left_labels = [(8, 65, 130, 130), (8, 202, 130, 275), (8, 352, 130, 418), (0, 502, 137, 568), (8, 648, 130, 710), (0, 792, 137, 850)]
    rows = [(138, 8, 1368, 140), (138, 151, 1368, 283), (138, 291, 1368, 425), (138, 435, 1368, 565), (138, 575, 1368, 708), (138, 719, 1368, 850)]
    for lang, entries in INFOGRAPHIC.items():
        image = base.copy()
        draw = ImageDraw.Draw(image)
        for i, (label, middle, right) in enumerate(entries):
            lx1, ly1, lx2, ly2 = left_labels[i]
            draw.rectangle((lx1, ly1, lx2, ly2), fill=(255, 255, 255))
            draw_center(draw, (lx1, ly1, lx2, ly2), label, 18, (8, 90, 22), True)
            x1, y1, x2, y2 = rows[i]
            fill = (255, 255, 255) if i % 2 else (20, 76, 34)
            text_fill = (20, 20, 20) if i % 2 else (255, 255, 255)
            draw.rectangle((x1, y1, x2, y2), fill=fill)
            draw_center(draw, (x1 + 150, y1 + 10, x1 + 610, y2 - 10), middle, 20, text_fill, True)
            draw_center(draw, (x1 + 820, y1 + 10, x2 - 30, y2 - 10), right, 19, text_fill, True)
        target = ROOT / lang / rel
        image.save(target)
        print(f"updated {target.relative_to(ROOT)}")


def main() -> None:
    localize_yishou()
    localize_yubentang()
    localize_infographic()


if __name__ == "__main__":
    main()
