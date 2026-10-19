"""
Generate public/og-image.png — a 1200x630 social preview card.

Design: "Signal minimal" from the Pure signal palette (black, white, one red).
- Pure black background
- Centered VT323 wordmark "A.HAFEZ" with the dot in signal red
- Mono uppercase labels (rec indicator, role line, domain)
- Everything important sits in the center so square crops (WhatsApp,
  Slack, X thumbnails) still show the name

Run from the repo root:  python scripts/generate-og-image.py
"""

from PIL import Image, ImageDraw, ImageFont

# ---------------------------------------------------------------------------
# Config
# ---------------------------------------------------------------------------
WIDTH, HEIGHT = 1200, 630
BG = "#000000"
WHITE = "#ffffff"
MUTED = "#8f8f8f"
RED = "#ff2b2b"

MARGIN = 64

VT323_PATH = "scripts/VT323-Regular.ttf"
MONO_PATH = r"C:\Windows\Fonts\CascadiaMono.ttf"

OUT_PATH = "public/og-image.png"

WORDMARK = [("A", WHITE), (".", RED), ("HAFEZ", WHITE)]
ROLE_LINE = "ABDULRAHMAN HAFEZ  ·  BACKEND .NET DEVELOPER"
DOMAIN = "ABDOHAFEZ.PAGES.DEV"


def font(path: str, size: int) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(path, size)


def tracked_width(draw: ImageDraw.ImageDraw, text: str, f, tracking: int) -> int:
    widths = [draw.textlength(ch, font=f) for ch in text]
    return int(sum(widths) + tracking * (len(text) - 1))


def draw_tracked(draw: ImageDraw.ImageDraw, xy, text: str, f, fill, tracking: int):
    x, y = xy
    for ch in text:
        draw.text((x, y), ch, font=f, fill=fill)
        x += draw.textlength(ch, font=f) + tracking


def draw_label(draw, text, f, fill, tracking, *, x=None, y=0, anchor="left"):
    width = tracked_width(draw, text, f, tracking)
    if anchor == "center":
        x = (WIDTH - width) // 2
    elif anchor == "right":
        x = WIDTH - MARGIN - width
    draw_tracked(draw, (x, y), text, f, fill, tracking)
    return width


def main():
    image = Image.new("RGB", (WIDTH, HEIGHT), BG)
    draw = ImageDraw.Draw(image)

    label = font(MONO_PATH, 20)
    tracking = 4

    # Top-left: rec indicator
    dot_r = 7
    cy = MARGIN + 12
    draw.ellipse(
        (MARGIN, cy - dot_r, MARGIN + dot_r * 2, cy + dot_r), fill=RED
    )
    draw_label(draw, "REC", label, MUTED, tracking, x=MARGIN + dot_r * 2 + 14, y=MARGIN)

    # Top-right: build tag
    draw_label(draw, "PORTFOLIO_2026", label, MUTED, tracking, y=MARGIN, anchor="right")

    # Center wordmark, fitted to ~70% of the width
    target = int(WIDTH * 0.7)
    size = 300
    while True:
        wordmark_font = font(VT323_PATH, size)
        total = sum(draw.textlength(part, font=wordmark_font) for part, _ in WORDMARK)
        if total <= target or size <= 120:
            break
        size -= 4

    # Vertically center the ink of the wordmark, nudged up for the lines below
    full = "".join(part for part, _ in WORDMARK)
    top, bottom = draw.textbbox((0, 0), full, font=wordmark_font)[1::2]
    ink_h = bottom - top
    y = (HEIGHT - ink_h) // 2 - top - 40
    x = (WIDTH - total) / 2
    for part, color in WORDMARK:
        draw.text((x, y), part, font=wordmark_font, fill=color)
        x += draw.textlength(part, font=wordmark_font)

    ink_bottom = y + bottom

    # Role line
    role_font = font(MONO_PATH, 22)
    role_y = ink_bottom + 34
    draw_label(draw, ROLE_LINE, role_font, MUTED, 4, y=role_y, anchor="center")

    # Signal bar: three white segments and one red
    seg_w, seg_h, gap = 44, 8, 8
    bar_w = seg_w * 4 + gap * 3
    bx = (WIDTH - bar_w) // 2
    by = role_y + 56
    for i, color in enumerate([WHITE, WHITE, WHITE, RED]):
        x0 = bx + i * (seg_w + gap)
        draw.rectangle((x0, by, x0 + seg_w - 1, by + seg_h - 1), fill=color)

    # Bottom: domain
    draw_label(draw, DOMAIN, label, MUTED, tracking, y=HEIGHT - MARGIN - 20, anchor="center")

    image.save(OUT_PATH, optimize=True)
    print(f"Wrote {OUT_PATH} (wordmark {size}px)")


if __name__ == "__main__":
    main()
