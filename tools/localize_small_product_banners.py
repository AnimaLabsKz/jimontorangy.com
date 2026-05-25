from pathlib import Path
import textwrap

from PIL import Image, ImageDraw, ImageFont


ROOT = Path(__file__).resolve().parents[1]

JOBS = [
    {
        "source": "product_category/images/69ddadd684ef9.png",
        "clear": (62, 82, 360, 167),
        "button": (62, 166, 158, 199),
        "texts": {
            "ru": ("Растительные\nпищевые смеси", "Подробнее"),
            "en": ("Botanical\nFood Blends", "View more"),
            "kk": ("Өсімдік тағам\nқоспалары", "Толығырақ"),
            "ky": ("Өсүмдүк азык\nаралашмалары", "Кененирээк"),
            "uz": ("O'simlik oziq\naralashmalari", "Batafsil"),
        },
    },
    {
        "source": "product_category/images/69ddadd67f7df.png",
        "clear": (415, 88, 665, 172),
        "button": (430, 172, 548, 207),
        "texts": {
            "ru": ("Уход за лицом", "Подробнее"),
            "en": ("Facial Skincare", "View more"),
            "kk": ("Бет күтімі\nөнімдері", "Толығырақ"),
            "ky": ("Бетке кам көрүү\nкаражаттары", "Кененирээк"),
            "uz": ("Yuz parvarishi\nmahsulotlari", "Batafsil"),
        },
    },
]


def font(size: int, bold: bool = False) -> ImageFont.ImageFont:
    names = [
        "/System/Library/Fonts/Supplemental/Arial Bold.ttf" if bold else "/System/Library/Fonts/Supplemental/Arial.ttf",
        "/System/Library/Fonts/Supplemental/Arial Unicode.ttf",
        "/Library/Fonts/Arial Unicode.ttf",
    ]
    for path in names:
        try:
            return ImageFont.truetype(path, size=size)
        except OSError:
            pass
    return ImageFont.load_default()


def draw_multiline(draw: ImageDraw.ImageDraw, xy: tuple[int, int], text: str, max_width: int) -> None:
    size = 29
    lines = text.splitlines() if "\n" in text else textwrap.wrap(text, width=18)
    while size > 17:
        f = font(size)
        widest = max(draw.textbbox((0, 0), line, font=f)[2] for line in lines)
        if widest <= max_width:
            break
        size -= 1
    f = font(size)
    y = xy[1]
    for line in lines:
        draw.text((xy[0], y), line, font=f, fill=(20, 20, 20))
        y += size + 3


def main() -> None:
    for job in JOBS:
        source = ROOT / "en" / job["source"]
        for lang, (title, cta) in job["texts"].items():
            image = Image.open(source).convert("RGB")
            draw = ImageDraw.Draw(image)
            x1, y1, x2, y2 = job["clear"]
            sample = image.getpixel((x1, y1))
            draw.rectangle((x1 - 8, y1 - 8, x2 + 8, y2 + 8), fill=sample)
            draw_multiline(draw, (x1, y1), title, x2 - x1)
            bx1, by1, bx2, by2 = job["button"]
            draw.rounded_rectangle((bx1, by1, bx2, by2), radius=12, fill=(25, 88, 44))
            size = 15
            f = font(size, bold=True)
            while draw.textbbox((0, 0), cta, font=f)[2] > (bx2 - bx1 - 14) and size > 9:
                size -= 1
                f = font(size, bold=True)
            bbox = draw.textbbox((0, 0), cta, font=f)
            draw.text((bx1 + ((bx2 - bx1) - (bbox[2] - bbox[0])) / 2, by1 + 8), cta, font=f, fill="white")
            target = ROOT / lang / job["source"]
            image.save(target)
            print(f"updated {target.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
