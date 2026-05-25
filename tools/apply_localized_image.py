from pathlib import Path
from PIL import Image


ROOT = Path(__file__).resolve().parents[1]
LANGS = ["ru", "en", "kk", "ky", "uz"]
IMAGES = [
    ("69cb8a6ed9ec7.png", "images/69cb8a6ed9ec7.png"),
    ("69a2a5e329459.png", "images/69a2a5e329459.png"),
    ("69ef271fe3c32.png", "images/69ef271fe3c32.png"),
]


def resize_exact(src: Path, reference: Path) -> Image.Image:
    with Image.open(reference) as ref:
        target_size = ref.size
    with Image.open(src) as image:
        image = image.convert("RGB")
        if image.size != target_size:
            # Generated edits may drift by a few pixels. Center-crop first when the
            # aspect ratio is already effectively identical, then resize as needed.
            tw, th = target_size
            iw, ih = image.size
            target_ratio = tw / th
            ratio = iw / ih
            if abs(ratio - target_ratio) < 0.02:
                if ratio > target_ratio:
                    new_w = round(ih * target_ratio)
                    left = (iw - new_w) // 2
                    image = image.crop((left, 0, left + new_w, ih))
                else:
                    new_h = round(iw / target_ratio)
                    top = (ih - new_h) // 2
                    image = image.crop((0, top, iw, top + new_h))
            image = image.resize(target_size, Image.Resampling.LANCZOS)
        return image


def main() -> None:
    for filename, source_rel in IMAGES:
        reference = ROOT / "en" / source_rel
        for lang in LANGS:
            generated = ROOT / "output" / "imagegen" / "localization" / lang / filename
            if not generated.exists():
                print(f"missing {lang}: {generated}")
                continue
            target = ROOT / lang / source_rel
            image = resize_exact(generated, reference)
            image.save(target)
            print(f"updated {target.relative_to(ROOT)} {image.size}")


if __name__ == "__main__":
    main()
