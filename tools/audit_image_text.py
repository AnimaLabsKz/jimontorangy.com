from __future__ import annotations

import base64
import json
import mimetypes
import os
import time
from pathlib import Path

from openai import OpenAI
from PIL import Image


ROOT = Path(__file__).resolve().parents[1]
AUDIT_DIR = ROOT / "image-localization-audit"
UNIQUE_JSON = AUDIT_DIR / "unique-images.json"
OUT_JSON = AUDIT_DIR / "text-audit.json"
THUMB_DIR = AUDIT_DIR / "analysis-thumbs"

MODEL = os.environ.get("IMAGE_AUDIT_MODEL", "gpt-5.4-mini")
MAX_EDGE = 1024


def load_env() -> None:
    env_path = ROOT / ".env.local"
    if not env_path.exists():
        return
    for line in env_path.read_text().splitlines():
        if not line or line.lstrip().startswith("#") or "=" not in line:
            continue
        key, value = line.split("=", 1)
        os.environ.setdefault(key.strip(), value.strip().strip("'\""))


def make_thumb(source: Path, item_id: int) -> Path:
    THUMB_DIR.mkdir(parents=True, exist_ok=True)
    out = THUMB_DIR / f"{item_id:03d}.jpg"
    if out.exists():
        return out
    with Image.open(source) as image:
        image = image.convert("RGB")
        image.thumbnail((MAX_EDGE, MAX_EDGE), Image.Resampling.LANCZOS)
        image.save(out, quality=88, optimize=True)
    return out


def image_data_url(path: Path) -> str:
    mime = mimetypes.guess_type(path.name)[0] or "image/jpeg"
    return f"data:{mime};base64,{base64.b64encode(path.read_bytes()).decode()}"


def analyze(client: OpenAI, thumb: Path) -> dict:
    prompt = (
        "Analyze this website image for embedded text. Return strict JSON only with keys: "
        "has_text boolean, has_chinese_text boolean, needs_localization boolean, "
        "text_role string, visible_text array of strings, priority one of skip/low/medium/high, "
        "reason string. Mark needs_localization true when the image contains Chinese text, "
        "English text that should differ per locale, or product/marketing copy embedded in the bitmap. "
        "Mark skip for icons, arrows, logos that should remain brand marks, photos without readable text, "
        "QR codes, and tiny unreadable incidental text."
    )
    resp = client.responses.create(
        model=MODEL,
        input=[
            {
                "role": "user",
                "content": [
                    {"type": "input_text", "text": prompt},
                    {"type": "input_image", "image_url": image_data_url(thumb)},
                ],
            }
        ],
    )
    text = resp.output_text.strip()
    if text.startswith("```"):
        text = text.strip("`")
        text = text.removeprefix("json").strip()
    return json.loads(text)


def main() -> None:
    load_env()
    if not os.environ.get("OPENAI_API_KEY"):
        raise SystemExit("OPENAI_API_KEY is missing")

    items = json.loads(UNIQUE_JSON.read_text())
    existing = {}
    if OUT_JSON.exists():
        existing = {row["id"]: row for row in json.loads(OUT_JSON.read_text())}

    client = OpenAI()
    results = []
    for item in items:
        if item["id"] in existing:
            results.append(existing[item["id"]])
            continue
        source = ROOT / item["sample"]
        row = {
            "id": item["id"],
            "sample": item["sample"],
            "paths": item["paths"],
            "count": item["count"],
            "bytes": item["bytes"],
            "width": item["width"],
            "height": item["height"],
        }
        try:
            thumb = make_thumb(source, item["id"])
            row.update(analyze(client, thumb))
        except Exception as exc:
            row.update(
                {
                    "has_text": None,
                    "has_chinese_text": None,
                    "needs_localization": None,
                    "text_role": "error",
                    "visible_text": [],
                    "priority": "error",
                    "reason": str(exc)[:500],
                }
            )
        results.append(row)
        OUT_JSON.write_text(json.dumps(results, ensure_ascii=False, indent=2))
        print(
            f"#{row['id']:03d} {row.get('priority')} "
            f"needs={row.get('needs_localization')} {row['sample']}"
        )
        time.sleep(0.2)

    OUT_JSON.write_text(json.dumps(results, ensure_ascii=False, indent=2))
    print(f"Wrote {OUT_JSON}")


if __name__ == "__main__":
    main()
