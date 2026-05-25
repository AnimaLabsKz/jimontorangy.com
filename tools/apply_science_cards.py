from pathlib import Path

from PIL import Image


ROOT = Path(__file__).resolve().parents[1]
LANGS = ["ru", "en", "kk", "ky", "uz"]

SETS = [
    {
        "generated": "69c360f313463.png",
        "targets": [
            "images/69c360f313463.png",
            "images/69c4f8da5dd9f.png",
        ],
    },
    {
        "generated": "69c360f9a8438.png",
        "targets": [
            "images/69c360f9a8438.png",
            "images/69c4f8e281be6.png",
        ],
    },
]


def fit_to_reference(generated: Path, reference: Path) -> Image.Image:
    with Image.open(reference) as ref:
        tw, th = ref.size
    with Image.open(generated) as image:
        image = image.convert("RGB")
        iw, ih = image.size
        target_ratio = tw / th
        ratio = iw / ih
        if ratio > target_ratio:
            new_w = round(ih * target_ratio)
            left = (iw - new_w) // 2
            image = image.crop((left, 0, left + new_w, ih))
        elif ratio < target_ratio:
            new_h = round(iw / target_ratio)
            top = (ih - new_h) // 2
            image = image.crop((0, top, iw, top + new_h))
        return image.resize((tw, th), Image.Resampling.LANCZOS)


def main() -> None:
    for item in SETS:
        for lang in LANGS:
            generated = ROOT / "output/imagegen/localization" / lang / item["generated"]
            if not generated.exists():
                print(f"missing {generated.relative_to(ROOT)}")
                continue
            for target_rel in item["targets"]:
                reference = ROOT / "en" / target_rel
                target = ROOT / lang / target_rel
                image = fit_to_reference(generated, reference)
                image.save(target)
                print(f"updated {target.relative_to(ROOT)} {image.size}")


if __name__ == "__main__":
    main()
