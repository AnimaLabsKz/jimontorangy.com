from __future__ import annotations

import io
import subprocess
import textwrap
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont


ROOT = Path(__file__).resolve().parents[1]
REL = "vip_center/images/69c4befecc85b.jpg"

TEXTS = {
    "ru": {
        "title": "Добро пожаловать на официальную платформу\nВойдите в личный кабинет!",
        "qr": "Откройте официальные аккаунты\nJIMON и JIMON Micro Journal",
        "steps": ["Первый шаг", "Второй шаг", "Третий шаг"],
        "callout": "Сундук",
        "cap1": "Нажмите кнопку «Сундук» внизу",
        "cap2": "Нажмите кнопку личного кабинета справа внизу\nи перейдите на страницу регистрации",
        "cap3": "Вы увидите такую страницу онлайн-регистрации",
        "cap4": "После заполнения данных отправьте форму.\nПоявится уведомление об успешной регистрации",
        "cap5": "Поздравляем, регистрация успешно завершена",
    },
    "en": {
        "title": "Welcome to the official platform\nEnter the member area!",
        "qr": "Open the official accounts\nJIMON and JIMON Micro Journal",
        "steps": ["Step 1", "Step 2", "Step 3"],
        "callout": "Treasure Box",
        "cap1": "Tap the Treasure Box button below",
        "cap2": "Tap the personal center button at bottom right\nto enter the registration page",
        "cap3": "You will see this online registration screen",
        "cap4": "After completing the information, submit the form.\nA successful registration notice will appear",
        "cap5": "Congratulations, registration is successful",
    },
    "kk": {
        "title": "Ресми платформаға қош келдіңіз\nМүшелер бөліміне кіріңіз!",
        "qr": "JIMON және JIMON Micro Journal\nресми аккаунттарын ашыңыз",
        "steps": ["Бірінші қадам", "Екінші қадам", "Үшінші қадам"],
        "callout": "Қазына",
        "cap1": "Төмендегі «Қазына» батырмасын басыңыз",
        "cap2": "Оң жақ төмендегі жеке кабинет батырмасын басып,\nтіркеу бетіне өтіңіз",
        "cap3": "Осындай онлайн тіркеу бетін көресіз",
        "cap4": "Деректерді толтырып, форманы жіберіңіз.\nСәтті тіркелу туралы хабарлама шығады",
        "cap5": "Құттықтаймыз, тіркеу сәтті аяқталды",
    },
    "ky": {
        "title": "Расмий платформага кош келиңиз\nМүчө аймагына кириңиз!",
        "qr": "JIMON жана JIMON Micro Journal\nрасмий аккаунттарын ачыңыз",
        "steps": ["Биринчи кадам", "Экинчи кадам", "Үчүнчү кадам"],
        "callout": "Казына",
        "cap1": "Төмөнкү «Казына» баскычын басыңыз",
        "cap2": "Оң жак төмөндөгү жеке кабинет баскычын басып,\nкаттоо бетине өтүңүз",
        "cap3": "Ушундай онлайн каттоо барагын көрөсүз",
        "cap4": "Маалыматтарды толтуруп, форманы жөнөтүңүз.\nИйгиликтүү катталганыңыз тууралуу билдирүү чыгат",
        "cap5": "Куттуктайбыз, каттоо ийгиликтүү аяктады",
    },
    "uz": {
        "title": "Rasmiy platformaga xush kelibsiz\nA'zolar bo'limiga kiring!",
        "qr": "JIMON va JIMON Micro Journal\nrasmiy akkauntlarini oching",
        "steps": ["Birinchi qadam", "Ikkinchi qadam", "Uchinchi qadam"],
        "callout": "Xazina",
        "cap1": "Pastdagi “Xazina” tugmasini bosing",
        "cap2": "Past o'ngdagi shaxsiy kabinet tugmasini bosib,\nro'yxatdan o'tish sahifasiga kiring",
        "cap3": "Shunday onlayn ro'yxatdan o'tish ekranini ko'rasiz",
        "cap4": "Ma'lumotlarni to'ldirib, formani yuboring.\nMuvaffaqiyatli ro'yxatdan o'tish xabari chiqadi",
        "cap5": "Tabriklaymiz, ro'yxatdan o'tish muvaffaqiyatli yakunlandi",
    },
}


def original() -> Image.Image:
    data = subprocess.check_output(["git", "show", f"HEAD:en/{REL}"], cwd=ROOT)
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


def center_lines(draw: ImageDraw.ImageDraw, box: tuple[int, int, int, int], text: str, size: int, fill: tuple[int, int, int], bold: bool = True, bg: tuple[int, int, int] | None = None) -> None:
    x1, y1, x2, y2 = box
    if bg:
        draw.rectangle(box, fill=bg)
    lines = []
    fnt = font(size, bold)
    for raw in text.splitlines():
        wrapped = textwrap.wrap(raw, width=max(8, (x2 - x1) // max(1, size))) or [raw]
        lines.extend(wrapped)
    while size > 14 and len(lines) * (size + 6) > (y2 - y1 - 8):
        size -= 2
        fnt = font(size, bold)
    total = len(lines) * (size + 6) - 6
    y = y1 + ((y2 - y1) - total) / 2
    for line in lines:
        bbox = draw.textbbox((0, 0), line, font=fnt)
        draw.text((x1 + ((x2 - x1) - (bbox[2] - bbox[0])) / 2, y), line, font=fnt, fill=fill)
        y += size + 6


def step(draw: ImageDraw.ImageDraw, box: tuple[int, int, int, int], text: str) -> None:
    draw.rounded_rectangle(box, radius=(box[3] - box[1]) // 2, fill=(0, 84, 13))
    center_lines(draw, box, text, 42, (255, 255, 255), True)


def main() -> None:
    base = original()
    for lang, t in TEXTS.items():
        image = base.copy()
        draw = ImageDraw.Draw(image)
        center_lines(draw, (90, 28, 660, 126), t["title"], 34, (0, 0, 0), True, (255, 255, 255))
        center_lines(draw, (45, 395, 705, 470), t["qr"], 27, (0, 0, 0), False, (255, 255, 255))
        step(draw, (155, 490, 585, 578), t["steps"][0])
        center_lines(draw, (355, 1272, 535, 1354), t["callout"], 26, (55, 55, 55), True, (248, 248, 248))
        center_lines(draw, (80, 1525, 670, 1592), t["cap1"], 30, (0, 102, 20), False, (255, 255, 255))
        step(draw, (174, 1658, 605, 1745), t["steps"][1])
        center_lines(draw, (50, 1748, 700, 1892), t["cap2"], 27, (0, 0, 0), False, (255, 255, 255))
        center_lines(draw, (35, 2758, 715, 2892), t["cap3"], 30, (0, 102, 20), False, (255, 255, 255))
        step(draw, (147, 2980, 592, 3068), t["steps"][2])
        center_lines(draw, (35, 3098, 715, 3262), t["cap4"], 27, (0, 0, 0), False, (255, 255, 255))
        center_lines(draw, (70, 4190, 690, 4275), t["cap5"], 31, (0, 102, 20), False, (255, 255, 255))
        target = ROOT / lang / REL
        image.save(target, quality=94)
        print(f"updated {target.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
