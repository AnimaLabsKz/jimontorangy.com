from pathlib import Path

from PIL import Image, ImageDraw, ImageFont


ROOT = Path(__file__).resolve().parents[1]
LANG_TEXT = {
    "ru": ["Подпишитесь", "на аккаунт"],
    "en": ["Follow", "official account"],
    "kk": ["Ресми аккаунтқа", "жазылыңыз"],
    "ky": ["Расмий аккаунтка", "жазылыңыз"],
    "uz": ["Rasmiy akkauntga", "obuna bo'ling"],
}


def font(size: int) -> ImageFont.FreeTypeFont | ImageFont.ImageFont:
    candidates = [
        "/System/Library/Fonts/Supplemental/Arial Unicode.ttf",
        "/System/Library/Fonts/Supplemental/Arial Bold.ttf",
        "/System/Library/Fonts/Supplemental/Arial.ttf",
    ]
    for path in candidates:
        try:
            return ImageFont.truetype(path, size=size)
        except OSError:
            continue
    return ImageFont.load_default()


def centered(draw: ImageDraw.ImageDraw, text: str, y: int, max_width: int, fill: str) -> None:
    size = 18
    chosen = font(size)
    while size > 10:
        chosen = font(size)
        bbox = draw.textbbox((0, 0), text, font=chosen)
        if bbox[2] - bbox[0] <= max_width:
            break
        size -= 1
    bbox = draw.textbbox((0, 0), text, font=chosen)
    x = (111 - (bbox[2] - bbox[0])) // 2
    draw.text((x, y), text, font=chosen, fill=fill)


def make_badge(lang: str, lines: list[str]) -> None:
    base = Image.open(ROOT / "en/contact_us/images/top2.png").convert("RGBA")
    out = Image.new("RGBA", base.size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(out)
    green = (31, 77, 43, 255)
    white = (255, 255, 255, 255)

    draw.rounded_rectangle((0, 0, 111, 100), radius=7, fill=green)
    draw.polygon([(91, 84), (91, 110), (111, 110), (111, 100)], fill=green)
    centered(draw, lines[0], 23, 98, white)
    centered(draw, lines[1], 47, 98, white)

    # Preserve the original hand/click icon from the source.
    out.alpha_composite(base.crop((0, 100, 153, 157)), (0, 100))

    target = ROOT / lang / "contact_us/images/top2.png"
    target.parent.mkdir(parents=True, exist_ok=True)
    out.convert("RGB").save(target)
    print(f"updated {target.relative_to(ROOT)}")


def main() -> None:
    for lang, lines in LANG_TEXT.items():
        make_badge(lang, lines)


if __name__ == "__main__":
    main()
