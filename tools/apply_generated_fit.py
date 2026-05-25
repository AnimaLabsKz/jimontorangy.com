from pathlib import Path
import sys

from PIL import Image


ROOT = Path(__file__).resolve().parents[1]


def fit_cover(image: Image.Image, size: tuple[int, int]) -> Image.Image:
    target_w, target_h = size
    src_w, src_h = image.size
    scale = max(target_w / src_w, target_h / src_h)
    resized = image.resize((round(src_w * scale), round(src_h * scale)), Image.LANCZOS)
    left = (resized.width - target_w) // 2
    top = (resized.height - target_h) // 2
    return resized.crop((left, top, left + target_w, top + target_h))


def main() -> None:
    if len(sys.argv) != 4:
        raise SystemExit("usage: apply_generated_fit.py <generated> <reference> <target>")
    generated = Image.open(sys.argv[1]).convert("RGB")
    reference = Image.open(ROOT / "en" / sys.argv[2]).convert("RGB")
    output = fit_cover(generated, reference.size)
    target = ROOT / sys.argv[3]
    target.parent.mkdir(parents=True, exist_ok=True)
    output.save(target)
    print(f"updated {target.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
