#!/usr/bin/env python3
from __future__ import annotations

import io
import subprocess
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont


ROOT = Path(__file__).resolve().parents[1]
LANGS = ["ru", "en", "kk", "ky", "uz"]

FONT_REGULAR = "/System/Library/Fonts/Supplemental/Arial Unicode.ttf"
FONT_BOLD = "/System/Library/Fonts/Supplemental/Arial Bold.ttf"


TEXT = {
    "ru": {
        "top1": "Добро пожаловать на официальную платформу",
        "top2": "Войдите в раздел участников",
        "qr": "Сканируйте QR-коды, чтобы открыть официальные аккаунты JIMON",
        "step": "Шаг {n}",
        "m1": "Нажмите кнопку «Сундук»\nвнизу",
        "m2top": "Нажмите кнопку личного кабинета\nв правом нижнем углу",
        "m2": "Вы увидите экран входа\nи сможете быстро зарегистрироваться",
        "m3top": "Заполните данные и отправьте форму.\nПосле успеха появится экран ниже",
        "m3": "Поздравляем! Регистрация прошла успешно\nДобро пожаловать в семью JIMON",
        "p1": "Нажмите кнопку «Сундук» внизу",
        "p2": "Экран входа для регистрации",
        "p3": "Регистрация прошла успешно",
    },
    "en": {
        "top1": "Welcome to the official platform",
        "top2": "Enter the member area",
        "qr": "Scan the QR codes to open the official JIMON accounts",
        "step": "Step {n}",
        "m1": "Tap the Treasure Chest\nbutton at the bottom",
        "m2top": "Tap the profile button\nin the lower right corner",
        "m2": "You will see the login screen\nand can register quickly",
        "m3top": "Fill in the information and submit.\nAfter success, the screen below appears",
        "m3": "Congratulations! Registration is complete\nWelcome to the JIMON family",
        "p1": "Tap the Treasure Chest button",
        "p2": "Login screen for registration",
        "p3": "Registration completed",
    },
    "kk": {
        "top1": "Ресми платформаға қош келдіңіз",
        "top2": "Қатысушылар бөліміне кіріңіз",
        "qr": "JIMON ресми аккаунттарын ашу үшін QR кодтарын сканерлеңіз",
        "step": "{n}-қадам",
        "m1": "Төмендегі «Қазына»\nбатырмасын басыңыз",
        "m2top": "Төменгі оң жақтағы\nжеке кабинет батырмасын басыңыз",
        "m2": "Кіру экранын көресіз\nжәне тез тіркеле аласыз",
        "m3top": "Ақпаратты толтырып, форманы жіберіңіз.\nСәтті болса, төмендегі экран шығады",
        "m3": "Құттықтаймыз! Тіркеу аяқталды\nJIMON отбасына қош келдіңіз",
        "p1": "Төмендегі «Қазына» батырмасын басыңыз",
        "p2": "Тіркелуге арналған кіру экраны",
        "p3": "Тіркеу сәтті аяқталды",
    },
    "ky": {
        "top1": "Расмий платформага кош келиңиз",
        "top2": "Мүчөлөр бөлүмүнө кириңиз",
        "qr": "JIMON расмий аккаунттарын ачуу үчүн QR коддорун скандаңыз",
        "step": "{n}-кадам",
        "m1": "Төмөнкү «Казына»\nбаскычын басыңыз",
        "m2top": "Төмөнкү оң жактагы\nжеке кабинет баскычын басыңыз",
        "m2": "Кирүү экранын көрөсүз\nжана тез каттала аласыз",
        "m3top": "Маалыматты толтуруп, форманы жөнөтүңүз.\nИйгиликтүү болсо, төмөнкү экран чыгат",
        "m3": "Куттуктайбыз! Каттоо аяктады\nJIMON үй-бүлөсүнө кош келиңиз",
        "p1": "Төмөнкү «Казына» баскычын басыңыз",
        "p2": "Катталуу үчүн кирүү экраны",
        "p3": "Каттоо ийгиликтүү аяктады",
    },
    "uz": {
        "top1": "Rasmiy platformaga xush kelibsiz",
        "top2": "A'zolar bo'limiga kiring",
        "qr": "JIMON rasmiy akkauntlarini ochish uchun QR kodlarni skanerlang",
        "step": "{n}-qadam",
        "m1": "Pastdagi «Xazina»\ntugmasini bosing",
        "m2top": "Pastki o'ng burchakdagi\nshaxsiy kabinet tugmasini bosing",
        "m2": "Kirish ekranini ko'rasiz\nva tez ro'yxatdan o'tasiz",
        "m3top": "Ma'lumotlarni to'ldiring va yuboring.\nMuvaffaqiyatdan so'ng quyidagi ekran chiqadi",
        "m3": "Tabriklaymiz! Ro'yxatdan o'tish yakunlandi\nJIMON oilasiga xush kelibsiz",
        "p1": "Pastdagi «Xazina» tugmasini bosing",
        "p2": "Ro'yxatdan o'tish uchun kirish ekrani",
        "p3": "Ro'yxatdan o'tish yakunlandi",
    },
}


FOOTER_CSS = """

/* Localized footer layout: keep long translations inside the green footer. */
.pc-footer-wrap {
    height: auto !important;
    min-height: 460px !important;
}

.pc-footer-wrap .inner {
    height: auto !important;
    min-height: 400px !important;
    align-items: flex-start !important;
    padding: 70px 0 40px !important;
    box-sizing: border-box !important;
}

.pc-footer-wrap .left {
    top: 0 !important;
    padding-top: 8px !important;
}

.pc-footer-wrap .b-navs {
    top: 0 !important;
    align-items: flex-start !important;
    gap: 22px !important;
    font-size: 15px !important;
    line-height: 1.32 !important;
}

.pc-footer-wrap .b-navs > div {
    max-width: 170px !important;
}

.pc-footer-wrap .b-navs a {
    display: block !important;
    line-height: 1.32 !important;
    overflow-wrap: anywhere !important;
}

.pc-footer-wrap .right > div:first-child {
    padding-top: 0 !important;
}
"""


def original_image(lang: str, rel: str) -> Image.Image:
    blob = subprocess.check_output(["git", "-C", str(ROOT), "show", f"HEAD:{lang}/{rel}"])
    return Image.open(io.BytesIO(blob)).convert("RGB")


def font(size: int, bold: bool = False) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(FONT_BOLD if bold else FONT_REGULAR, size)


def wrap(draw: ImageDraw.ImageDraw, text: str, fnt: ImageFont.FreeTypeFont, max_width: int) -> list[str]:
    out: list[str] = []
    for paragraph in text.split("\n"):
        words = paragraph.split()
        line = ""
        for word in words:
            cand = word if not line else f"{line} {word}"
            if draw.textbbox((0, 0), cand, font=fnt)[2] <= max_width:
                line = cand
            else:
                if line:
                    out.append(line)
                line = word
        if line:
            out.append(line)
    return out


def draw_center(
    draw: ImageDraw.ImageDraw,
    box: tuple[int, int, int, int],
    text: str,
    fnt: ImageFont.FreeTypeFont,
    fill: tuple[int, int, int],
    spacing: int = 6,
) -> None:
    x1, y1, x2, y2 = box
    lines = wrap(draw, text, fnt, x2 - x1)
    heights = [draw.textbbox((0, 0), line, font=fnt)[3] for line in lines]
    total_h = sum(heights) + spacing * max(0, len(lines) - 1)
    y = y1 + ((y2 - y1) - total_h) // 2
    for line, h in zip(lines, heights):
        bbox = draw.textbbox((0, 0), line, font=fnt)
        x = x1 + ((x2 - x1) - (bbox[2] - bbox[0])) // 2
        draw.text((x, y), line, font=fnt, fill=fill)
        y += h + spacing


def green_button(draw: ImageDraw.ImageDraw, box: tuple[int, int, int, int], text: str, size: int) -> None:
    draw.rounded_rectangle(box, radius=(box[3] - box[1]) // 2, fill=(0, 78, 14))
    draw_center(draw, box, text, font(size), (255, 255, 255), 0)


def make_mobile(lang: str) -> None:
    im = original_image(lang, "vip_center/images/69c4befecc85b.jpg")
    draw = ImageDraw.Draw(im)
    t = TEXT[lang]
    white = (255, 255, 255)
    green = (22, 85, 28)
    black = (18, 18, 18)

    draw.rectangle((0, 0, 750, 130), fill=white)
    draw_center(draw, (55, 20, 695, 62), t["top1"], font(34, True), black)
    draw_center(draw, (55, 64, 695, 112), t["top2"], font(34, True), black)

    draw.rectangle((0, 375, 750, 448), fill=white)
    draw_center(draw, (45, 382, 705, 440), t["qr"], font(26, True), black)
    green_button(draw, (120, 475, 630, 555), t["step"].format(n=1), 34)

    draw.rectangle((0, 1530, 750, 1642), fill=white)
    draw_center(draw, (70, 1540, 680, 1630), t["m1"], font(30), green)
    green_button(draw, (135, 1702, 615, 1782), t["step"].format(n=2), 34)

    draw.rectangle((0, 1790, 750, 1905), fill=white)
    draw_center(draw, (70, 1800, 680, 1890), t["m2top"], font(28, True), black)
    draw.rectangle((0, 2848, 750, 2945), fill=white)
    draw_center(draw, (70, 2860, 680, 2930), t["m2"], font(28), green)
    green_button(draw, (135, 2990, 615, 3070), t["step"].format(n=3), 34)

    draw.rectangle((0, 3082, 750, 3200), fill=white)
    draw_center(draw, (70, 3090, 680, 3185), t["m3top"], font(26, True), black)
    draw.rectangle((0, 4210, 750, 4292), fill=white)
    draw_center(draw, (55, 4214, 695, 4284), t["m3"], font(25), green)

    out = ROOT / lang / "vip_center/images/69c4befecc85b.jpg"
    im.save(out, quality=92, subsampling=0)


def make_pc_steps(lang: str) -> None:
    im = original_image(lang, "vip_center/images/69c4d03ced228.png")
    draw = ImageDraw.Draw(im)
    t = TEXT[lang]
    black = (0, 0, 0)
    green = (46, 135, 48)

    step_boxes = [(195, 378, 511, 444), (800, 381, 1116, 444), (1383, 378, 1699, 444)]
    for idx, box in enumerate(step_boxes, 1):
        green_button(draw, box, t["step"].format(n=idx), 35)

    draw.rectangle((80, 1218, 1840, 1340), fill=black)
    draw_center(draw, (50, 1245, 490, 1317), t["p1"], font(28), green)
    draw_center(draw, (725, 1245, 1195, 1317), t["p2"], font(28), green)
    draw_center(draw, (1445, 1245, 1885, 1317), t["p3"], font(28), green)

    out = ROOT / lang / "vip_center/images/69c4d03ced228.png"
    im.save(out)


def patch_footer_css() -> None:
    for css in ROOT.glob("*/**/css/common.css"):
        text = css.read_text(encoding="utf-8")
        marker = "/* Localized footer layout:"
        if marker in text:
            before = text.split(marker, 1)[0].rstrip()
            text = before + FOOTER_CSS
        else:
            text = text.rstrip() + FOOTER_CSS
        css.write_text(text + "\n", encoding="utf-8")


def main() -> None:
    for lang in LANGS:
        make_mobile(lang)
        make_pc_steps(lang)
    patch_footer_css()
    print("Fixed VIP instruction images and footer CSS for", ", ".join(LANGS))


if __name__ == "__main__":
    main()
