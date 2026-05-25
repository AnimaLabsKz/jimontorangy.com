from pathlib import Path

from PIL import Image, ImageDraw, ImageFont


ROOT = Path(__file__).resolve().parents[1]
TEXT = {
    "ru": "Наверх",
    "en": "Top",
    "kk": "Жоғары",
    "ky": "Жогору",
    "uz": "Yuqoriga",
}


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


def main() -> None:
    sections = [
        "images",
        "contact_us/images",
        "vip_center/images",
        "post_list/images",
        "post_list-cid-1/images",
        "post_list-cid-4/images",
        "post_list-cid-5/images",
        "post_detail-119/images",
        "product/images",
        "product_category/images",
        "walk_in_jimon/images",
        "we_brands/images",
        "law/images",
    ]
    for lang, text in TEXT.items():
        im = Image.new("RGB", (114, 114), "#173f24")
        d = ImageDraw.Draw(im)
        d.line((49, 45, 57, 29, 65, 45), fill="white", width=4, joint="curve")
        size = 17
        f = font(size)
        while d.textbbox((0, 0), text, font=f)[2] > 98 and size > 10:
            size -= 1
            f = font(size)
        bbox = d.textbbox((0, 0), text, font=f)
        d.text(((114 - (bbox[2] - bbox[0])) / 2, 65), text, font=f, fill="white")
        for section in sections:
            target = ROOT / lang / section / "top1.png"
            if target.exists():
                im.save(target)
                print(f"updated {target.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
