from pathlib import Path

from PIL import Image, ImageDraw, ImageFont


ROOT = Path(__file__).resolve().parents[1]

JOBS = [
    {
        "source": "product_category/images/69f00a34878c7.png",
        "box": (0, 276, 722, 328),
        "texts": {
            "ru": "Штаб-квартира JIMON Group в Аньго",
            "en": "JIMON Group Anguo Headquarters",
            "kk": "JIMON Group-тың Аньгодағы бас кеңсесі",
            "ky": "JIMON Groupтун Аньгодогу башкы кеңсеси",
            "uz": "JIMON Group Anguo bosh qarorgohi",
        },
    },
]


def font(size: int) -> ImageFont.ImageFont:
    for path in [
        "/System/Library/Fonts/Supplemental/Arial Bold.ttf",
        "/System/Library/Fonts/Supplemental/Arial Unicode.ttf",
        "/System/Library/Fonts/Supplemental/Arial.ttf",
    ]:
        try:
            return ImageFont.truetype(path, size=size)
        except OSError:
            pass
    return ImageFont.load_default()


def draw_centered(draw: ImageDraw.ImageDraw, box: tuple[int, int, int, int], text: str) -> None:
    x1, y1, x2, y2 = box
    draw.rectangle(box, fill="white")
    size = 22
    f = font(size)
    while size > 13 and draw.textbbox((0, 0), text, font=f)[2] > (x2 - x1 - 30):
        size -= 1
        f = font(size)
    bbox = draw.textbbox((0, 0), text, font=f)
    draw.text(
        (x1 + ((x2 - x1) - (bbox[2] - bbox[0])) / 2, y1 + ((y2 - y1) - (bbox[3] - bbox[1])) / 2 - 2),
        text,
        font=f,
        fill=(10, 10, 10),
    )


def main() -> None:
    for job in JOBS:
        source = ROOT / "en" / job["source"]
        for lang, text in job["texts"].items():
            image = Image.open(source).convert("RGB")
            draw_centered(ImageDraw.Draw(image), job["box"], text)
            target = ROOT / lang / job["source"]
            image.save(target)
            print(f"updated {target.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
