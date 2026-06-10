# Image Localization Overlay Audit - 2026-06-10

## Scope

Reviewed the reported Russian hero/banner screenshots and traced them to raster assets in `ru/product_category/images`.

## Confirmed P0 Issues

1. `ru/product_category/images/69ddadd684ef9.png`
   - Symptom: Russian title and green CTA were drawn on top of an already-localized English/Chinese banner.
   - Visible defect: old `Botanical Food Blends` text and old white CTA remained underneath; new green CTA overlapped the old CTA.
   - Fix applied: replaced with a generated integrated raster banner, resized to the original asset size.

2. `ru/product_category/images/69c48f06ca189.png`
   - Symptom: Russian TCM hero title and CTA were composited over an existing CTA area.
   - Visible defect: duplicated lower dark-green button/rectangle under `Подробнее`.
   - Fix applied: replaced with a generated integrated raster hero, resized to the original asset size.

3. `ru/product_category/images/69c39f82963b0.png`
   - Symptom: compact TCM banner had a gray patch with Russian text drawn over previous content.
   - Visible defect: overlapping title/subtitle area and non-native rectangular patching.
   - Fix applied: replaced with a generated integrated raster banner, resized to the original asset size.

4. `ru/product_category/images/69ddad9a42599.png`
   - Symptom: botanical beverages banner retained a white old CTA patch behind the new green CTA.
   - Visible defect: the button area looked stacked/composited instead of native.
   - Fix applied: replaced with a generated integrated raster banner, resized to the original asset size.

## Root Cause

The earlier localization workflow treated marketing images as editable canvases but performed text replacement by painting rectangular blocks and text/buttons over the existing bitmap. This is fragile for Russian/Kazakh/Kyrgyz/Uzbek because translated text is longer and changes line-height and CTA footprint.

The specific script with this failure mode is:

- `tools/localize_small_product_banners.py`

It samples a single pixel, fills a rectangular area, draws translated text, then draws a new CTA button. When the clear rectangle does not fully cover the original text/button or when the image already contains a previous localization pass, duplicate text and CTA remnants remain.

## Correct Standard

For raster marketing banners, localization must produce a final single image containing:

- background
- product imagery
- localized headline/subtitle
- exactly one CTA
- matching shadows, spacing, and visual style

Avoid HTML overlays or partial bitmap patches for hero banners unless the design is intentionally rebuilt as responsive HTML with no embedded source text.

## Remaining Risk Areas

High-priority assets from the existing AI audit that need visual verification before release:

- `product_category/images/69dde4b9ea249.png`
- `product_category/images/69ddadd67f7df.png`
- `product_category/images/69ddb123232be.png`
- `we_brands/images/69c38efd95857.png`
- `we_brands/images/69ccb8e6cef2c.png`
- `we_brands/images/69ccc45acc22c.png`
- `we_brands/images/69ccc59ac5b32.png`
- `we_brands/images/69ccbe872b948.png`

## Files Changed In This Pass

- `ru/product_category/images/69ddadd684ef9.png`
- `ru/product_category/images/69c48f06ca189.png`
- `ru/product_category/images/69c39f82963b0.png`
- `ru/product_category/images/69ddad9a42599.png`

Generated source previews were copied to:

- `output/playwright/audit/ru-69ddadd684ef9-imagen-source.png`
- `output/playwright/audit/ru-69c48f06ca189-imagen-source.png`
- `output/playwright/audit/ru-69c39f82963b0-imagen-source.png`
- `output/playwright/audit/ru-69ddad9a42599-imagen-source.png`
