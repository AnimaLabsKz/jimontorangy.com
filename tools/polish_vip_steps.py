from pathlib import Path
import textwrap

from PIL import Image, ImageDraw, ImageFont


ROOT = Path(__file__).resolve().parents[1]
REL = "vip_center/images/69c4d03ced228.png"

TEXTS = {
    "ru": {
        "title": "Добро пожаловать на официальную платформу",
        "steps": ["Шаг 1", "Шаг 2", "Шаг 3"],
        "captions": [
            "Нажмите кнопку «Сундук» с сокровищами внизу",
            "Заполните форму регистрации",
            "Поздравляем, регистрация успешна",
        ],
    },
    "en": {
        "title": "Welcome to the official platform",
        "steps": ["Step 1", "Step 2", "Step 3"],
        "captions": [
            "Tap the treasure box button below",
            "Complete the registration form",
            "Registration successful",
        ],
    },
    "kk": {
        "title": "Ресми платформаға қош келдіңіз",
        "steps": ["1-қадам", "2-қадам", "3-қадам"],
        "captions": [
            "Төмендегі «қазына» батырмасын басыңыз",
            "Тіркеу формасын толтырыңыз",
            "Тіркеу сәтті аяқталды",
        ],
    },
    "ky": {
        "title": "Расмий платформага кош келиңиз",
        "steps": ["1-кадам", "2-кадам", "3-кадам"],
        "captions": [
            "Төмөнкү «казына» баскычын басыңыз",
            "Каттоо формасын толтуруңуз",
            "Каттоо ийгиликтүү аяктады",
        ],
    },
    "uz": {
        "title": "Rasmiy platformaga xush kelibsiz",
        "steps": ["1-qadam", "2-qadam", "3-qadam"],
        "captions": [
            "Pastdagi «xazina qutisi» tugmasini bosing",
            "Roʻyxatdan oʻtish shaklini toʻldiring",
            "Roʻyxatdan oʻtish muvaffaqiyatli yakunlandi",
        ],
    },
}


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


def centered(draw: ImageDraw.ImageDraw, box: tuple[int, int, int, int], text: str, size: int, fill="white") -> None:
    f = font(size, bold=True)
    x1, y1, x2, y2 = box
    while size > 18 and draw.textbbox((0, 0), text, font=f)[2] > (x2 - x1 - 24):
        size -= 2
        f = font(size, bold=True)
    bbox = draw.textbbox((0, 0), text, font=f)
    draw.text((x1 + ((x2 - x1) - (bbox[2] - bbox[0])) / 2, y1 + ((y2 - y1) - (bbox[3] - bbox[1])) / 2 - 2), text, font=f, fill=fill)


def caption(draw: ImageDraw.ImageDraw, box: tuple[int, int, int, int], text: str) -> None:
    x1, y1, x2, y2 = box
    draw.rectangle(box, fill="black")
    lines = textwrap.wrap(text, width=24)
    size = 30
    f = font(size, bold=True)
    while size > 19 and len(lines) * (size + 5) > (y2 - y1):
        size -= 1
        f = font(size, bold=True)
    y = y1 + 6
    for line in lines:
        bbox = draw.textbbox((0, 0), line, font=f)
        draw.text((x1 + ((x2 - x1) - (bbox[2] - bbox[0])) / 2, y), line, font=f, fill=(15, 104, 44))
        y += size + 6


def main() -> None:
    for lang, texts in TEXTS.items():
        path = ROOT / lang / REL
        image = Image.open(path).convert("RGB")
        draw = ImageDraw.Draw(image)

        draw.rectangle((360, 120, 1560, 315), fill="black")
        centered(draw, (420, 175, 1500, 250), texts["title"], 42)

        draw.rectangle((90, 290, 1830, 470), fill="black")
        for box, text in zip([(200, 330, 500, 400), (810, 330, 1110, 400), (1420, 330, 1720, 400)], texts["steps"]):
            draw.rounded_rectangle(box, radius=28, fill=(10, 95, 34))
            centered(draw, box, text, 31)

        draw.rectangle((80, 1145, 1840, 1375), fill="black")
        for box, text in zip([(120, 1180, 560, 1348), (735, 1180, 1185, 1348), (1355, 1180, 1805, 1348)], texts["captions"]):
            caption(draw, box, text)

        image.save(path)
        print(f"updated {path.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
