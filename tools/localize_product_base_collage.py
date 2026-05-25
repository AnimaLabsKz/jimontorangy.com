from pathlib import Path

from PIL import Image, ImageDraw, ImageFont


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "en/product_category/images/69c3b42367c92.png"
TARGET_REL = "product_category/images/69c3b42367c92.png"

CAPTIONS = {
    "ru": [
        "Пекинская группа Yubentang",
        "Индустриальный парк Yubentang, Чунцин",
        "Yishoutang Jilin Pharmaceutical Co., Ltd.",
        "Открытие филиала JIMON в Хубэе",
        "Операционный центр JIMON в Ухане",
        "Операционный центр JIMON в Гуанчжоу",
        "Операционный центр JIMON в Ханчжоу",
    ],
    "en": [
        "Beijing Yubentang Group",
        "Chongqing Yubentang Pharmaceutical Industrial Park",
        "Yishoutang Jilin Pharmaceutical Co., Ltd.",
        "Opening of JIMON Hubei Branch",
        "JIMON Central China Wuhan Operations Center",
        "JIMON South China Guangzhou Operations Center",
        "JIMON East China Hangzhou Operations Center",
    ],
    "kk": [
        "Бейжің Yubentang тобы",
        "Чунцин Yubentang фармацевтикалық индустриялық паркі",
        "Yishoutang Jilin Pharmaceutical Co., Ltd.",
        "JIMON Хубэй филиалының ашылуы",
        "JIMON Ухань операциялық орталығы",
        "JIMON Гуанчжоу операциялық орталығы",
        "JIMON Ханчжоу операциялық орталығы",
    ],
    "ky": [
        "Бээжин Yubentang тобу",
        "Чунцин Yubentang фармацевтикалык индустриялык паркы",
        "Yishoutang Jilin Pharmaceutical Co., Ltd.",
        "JIMON Хубэй филиалынын ачылышы",
        "JIMON Ухань операциялык борбору",
        "JIMON Гуанчжоу операциялык борбору",
        "JIMON Ханчжоу операциялык борбору",
    ],
    "uz": [
        "Pekin Yubentang guruhi",
        "Chuntsin Yubentang farmatsevtika sanoat parki",
        "Yishoutang Jilin Pharmaceutical Co., Ltd.",
        "JIMON Xubey filialining ochilishi",
        "JIMON Uxan operatsion markazi",
        "JIMON Guanchjou operatsion markazi",
        "JIMON Xanchjou operatsion markazi",
    ],
}

BOXES = [
    (70, 465, 650, 535),
    (710, 465, 1295, 535),
    (1355, 465, 1940, 535),
    (70, 1008, 650, 1051),
    (710, 1008, 1295, 1051),
    (1355, 1008, 1940, 1051),
]

# Extra small in-photo opening label in the lower-left image. Keep the red
# blocks themselves, just replace the large Chinese characters on top.
OPENING_BOX = (190, 792, 595, 895)


def font(size: int, bold: bool = False) -> ImageFont.ImageFont:
    candidates = [
        "/System/Library/Fonts/Supplemental/Arial Bold.ttf" if bold else "/System/Library/Fonts/Supplemental/Arial.ttf",
        "/System/Library/Fonts/Supplemental/Arial Unicode.ttf",
    ]
    for path in candidates:
        try:
            return ImageFont.truetype(path, size=size)
        except OSError:
            pass
    return ImageFont.load_default()


def wrap_text(draw: ImageDraw.ImageDraw, text: str, max_width: int, size: int) -> tuple[list[str], ImageFont.ImageFont]:
    while size >= 20:
        f = font(size)
        words = text.split()
        lines: list[str] = []
        current = ""
        for word in words:
            candidate = word if not current else f"{current} {word}"
            if draw.textbbox((0, 0), candidate, font=f)[2] <= max_width:
                current = candidate
            else:
                if current:
                    lines.append(current)
                current = word
        if current:
            lines.append(current)
        if lines and len(lines) <= 2 and all(draw.textbbox((0, 0), line, font=f)[2] <= max_width for line in lines):
            return lines, f
        size -= 2
    return [text], font(20)


def draw_centered(draw: ImageDraw.ImageDraw, box: tuple[int, int, int, int], text: str) -> None:
    x1, y1, x2, y2 = box
    draw.rectangle(box, fill="white")
    lines, f = wrap_text(draw, text, x2 - x1 - 24, 34)
    line_h = max(24, draw.textbbox((0, 0), "Ag", font=f)[3])
    total_h = line_h * len(lines) + 4 * (len(lines) - 1)
    y = y1 + ((y2 - y1) - total_h) / 2 - 2
    for line in lines:
        bbox = draw.textbbox((0, 0), line, font=f)
        x = x1 + ((x2 - x1) - (bbox[2] - bbox[0])) / 2
        draw.text((x, y), line, font=f, fill="black")
        y += line_h + 4


def main() -> None:
    for lang, captions in CAPTIONS.items():
        image = Image.open(SOURCE).convert("RGB")
        draw = ImageDraw.Draw(image)
        for box, text in zip(BOXES, captions[:3] + captions[4:]):
            draw_centered(draw, box, text)

        # Localize the prominent opening message in the lower-left photo.
        x1, y1, x2, y2 = OPENING_BOX
        if lang == "en":
            opening = "GRAND OPENING"
        elif lang == "ru":
            opening = "ТОРЖЕСТВЕННОЕ ОТКРЫТИЕ"
        elif lang == "kk":
            opening = "САЛТАНАТТЫ АШЫЛУ"
        elif lang == "ky":
            opening = "САЛТАНАТТУУ АЧЫЛЫШ"
        else:
            opening = "TANTANALI OCHILISH"
        draw.rectangle(OPENING_BOX, fill=(150, 24, 24))
        lines, f = wrap_text(draw, opening, x2 - x1 - 16, 38)
        y = y1 + 20
        for line in lines[:2]:
            bbox = draw.textbbox((0, 0), line, font=f)
            draw.text((x1 + ((x2 - x1) - (bbox[2] - bbox[0])) / 2, y), line, font=f, fill=(246, 219, 154))
            y += 42

        target = ROOT / lang / TARGET_REL
        image.save(target)
        print(f"updated {target.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
