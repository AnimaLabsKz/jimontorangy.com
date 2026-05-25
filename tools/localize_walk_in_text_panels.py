from __future__ import annotations

import io
import subprocess
import textwrap
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont


ROOT = Path(__file__).resolve().parents[1]
LANGS = ["ru", "en", "kk", "ky", "uz"]


INSTITUTE = {
    "ru": (
        "Хэбэйский институт китайского лекарственного сырья",
        "Институт создан для поддержки исследований, технологических разработок и партнерских проектов, повышающих безопасность продукции и качество сервиса в сфере китайской медицины.",
    ),
    "en": (
        "Hebei Provincial Institute of Chinese Medicinal Materials",
        "The institute was founded to support scientific research, technology development and cooperation that improve product safety and service quality in Chinese medicine.",
    ),
    "kk": (
        "Хэбэй провинциясының қытай дәрілік шикізаты институты",
        "Институт қытай медицинасы саласында өнім қауіпсіздігін және қызмет сапасын арттыратын ғылыми зерттеу, технологиялық әзірлеу және серіктестік жобаларды қолдау үшін құрылған.",
    ),
    "ky": (
        "Хэбэй провинциясынын кытай дары чийки заты институту",
        "Институт кытай медицинасы тармагында продукт коопсуздугун жана кызмат сапатын жогорулаткан илимий изилдөө, технологиялык өнүктүрүү жана өнөктөштүк долбоорлорун колдоо үчүн түзүлгөн.",
    ),
    "uz": (
        "Xebey provinsiyasi xitoy dorivor xomashyosi instituti",
        "Institut xitoy tibbiyoti sohasida mahsulot xavfsizligi va xizmat sifatini oshiradigan ilmiy tadqiqot, texnologik ishlanmalar va hamkorlik loyihalarini qo'llab-quvvatlash uchun tashkil etilgan.",
    ),
}

BELIEF = {
    "ru": (
        "Убеждения основателя",
        "Мы считаем «наследование духа и защита инноваций» базовыми принципами и руководством к действию, помогая развитию индустрии здоровья.",
        "Председатель JIMON Group",
        "Депутат 14-го Собрания народных представителей провинции Хэбэй\nПостоянный член Китайской ассоциации медицины и фармацевтики\nВице-президент ассоциации индустрии медицины провинции Хэбэй\nВице-президент рабочего комитета интеграции производства и образования\nДиректор благотворительного фонда JIMON",
    ),
    "en": (
        "Founder Belief",
        "We take “inheriting the spirit and protecting innovation” as our core belief and action guide, contributing to the development of the health industry.",
        "Chairman of JIMON Group",
        "Deputy to the 14th Hebei Provincial People's Congress\nExecutive member of the China Medical and Pharmaceutical Industry Association\nVice president of the Hebei Medical Industry Association\nVice president of the industry-education integration working committee\nDirector of the JIMON Charity Foundation",
    ),
    "kk": (
        "Негізін қалаушының ұстанымы",
        "Біз «рухты мұра ету және инновацияны қорғау» қағидасын негізгі сенім әрі әрекет бағдары деп санаймыз, денсаулық индустриясының дамуына үлес қосамыз.",
        "JIMON Group төрағасы",
        "Хэбэй провинциясы 14-шақырылым халық өкілдері жиналысының депутаты\nҚытай медицина және фармацевтика индустриясы қауымдастығының тұрақты мүшесі\nХэбэй медицина индустриясы қауымдастығының вице-президенті\nӨндіріс пен білім интеграциясы жұмыс комитетінің вице-президенті\nJIMON қайырымдылық қорының директоры",
    ),
    "ky": (
        "Негиздөөчүнүн ишеними",
        "Биз «рухту мурастоо жана инновацияны коргоо» принцибин негизги ишеним жана аракет багыты катары кабыл алып, ден соолук индустриясынын өнүгүшүнө салым кошобуз.",
        "JIMON Group төрагасы",
        "Хэбэй провинциясынын 14-чакырылыш Эл өкүлдөр жыйынынын депутаты\nКытай медицина жана фармацевтика индустриясы ассоциациясынын туруктуу мүчөсү\nХэбэй медицина индустриясы ассоциациясынын вице-президенти\nӨндүрүш жана билим интеграциясы боюнча жумушчу комитеттин вице-президенти\nJIMON кайрымдуулук фондунун директору",
    ),
    "uz": (
        "Asoschining e'tiqodi",
        "Biz «ruhni meros qilib olish va innovatsiyani himoya qilish» tamoyilini asosiy e'tiqod va harakat yo'riqnomasi deb bilamiz hamda sog'liq industriyasi rivojiga hissa qo'shamiz.",
        "JIMON Group raisi",
        "Xebey provinsiyasi 14-chaqiriq Xalq vakillari majlisi deputati\nXitoy tibbiyot va farmatsevtika sanoati assotsiatsiyasi doimiy a'zosi\nXebey tibbiyot sanoati assotsiatsiyasi vitse-prezidenti\nIshlab chiqarish va ta'lim integratsiyasi qo'mitasi vitse-prezidenti\nJIMON xayriya fondi direktori",
    ),
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


def draw_wrapped(draw: ImageDraw.ImageDraw, xy: tuple[int, int], text: str, max_width: int, size: int, fill: tuple[int, int, int], bold: bool = False, gap: int = 6) -> int:
    fnt = font(size, bold)
    y = xy[1]
    for line in wrap(draw, text, fnt, max_width):
        draw.text((xy[0], y), line, font=fnt, fill=fill)
        y += size + gap
    return y


def localize_institute() -> None:
    rel = "walk_in_jimon/images/69ccbbcb6b0ab.jpg"
    base = original(rel)
    for lang, (title, body) in INSTITUTE.items():
        image = base.copy()
        draw = ImageDraw.Draw(image)
        draw.rectangle((995, 185, 1800, 325), fill=(20, 88, 46))
        y = draw_wrapped(draw, (1010, 198), title, 760, 34, (255, 255, 255), True)
        draw_wrapped(draw, (1010, y + 12), body, 760, 22, (255, 255, 255), True, 4)
        target = ROOT / lang / rel
        image.save(target, quality=94)
        print(f"updated {target.relative_to(ROOT)}")


def localize_belief() -> None:
    rel = "walk_in_jimon/images/69ccb14ef17bf.png"
    base = original(rel)
    for lang, (title, quote, role, bio) in BELIEF.items():
        image = base.copy()
        draw = ImageDraw.Draw(image)
        draw.rectangle((220, 0, 699, 414), fill=(255, 255, 255))
        draw_wrapped(draw, (235, 12), title, 420, 27, (0, 0, 0), True)
        draw.rounded_rectangle((255, 38, 407, 46), radius=4, fill=(20, 93, 47))
        y = draw_wrapped(draw, (230, 70), quote, 445, 22, (0, 0, 0), False, 6)
        draw.line((230, y + 10, 680, y + 10), fill=(0, 0, 0), width=1)
        y += 28
        y = draw_wrapped(draw, (230, y), role, 445, 22, (0, 0, 0), False, 5)
        draw_wrapped(draw, (230, y + 8), "\n".join(bio.splitlines()[:3]), 445, 17, (0, 0, 0), False, 3)
        target = ROOT / lang / rel
        image.save(target)
        print(f"updated {target.relative_to(ROOT)}")


def main() -> None:
    localize_institute()
    localize_belief()


if __name__ == "__main__":
    main()
