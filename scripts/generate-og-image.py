"""
Generate public/og-image.png — a 1200x630 social preview card.

Design: "Signal minimal" from the Pure signal palette (black, white, one red).
- Pure black background
- Stacked VT323 wordmark: a tracked "ABDULRAHMAN" over a huge "HAFEZ",
  with a signal-red dot, both lines the same width
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

FIRST_NAME = "ABDULRAHMAN"
SURNAME = "HAFEZ"
ROLE_LINE = "BACKEND .NET DEVELOPER"
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

    # Wordmark: huge surname, first name tracked out to the same width
    big = font(VT323_PATH, 250)
    surname_w = draw.textlength(SURNAME, font=big)
    dot_w = draw.textlength(".", font=big)

    small = font(VT323_PATH, 64)
    letters_w = sum(draw.textlength(ch, font=small) for ch in FIRST_NAME)
    small_tracking = int((surname_w - letters_w) / (len(FIRST_NAME) - 1))

    def ink(text, f):
        return draw.textbbox((0, 0), text, font=f)

    s_top, s_bot = ink(FIRST_NAME, small)[1::2]
    b_top, b_bot = ink(SURNAME, big)[1::2]
    role_font = font(MONO_PATH, 22)
    r_top, r_bot = ink(ROLE_LINE, role_font)[1::2]
    seg_h = 8

    gap_name, gap_role, gap_bar = 22, 40, 30
    block_h = (s_bot - s_top) + gap_name + (b_bot - b_top) + gap_role + (r_bot - r_top) + gap_bar + seg_h
    top_y = (HEIGHT - block_h) // 2 - 6

    # Center the surname (without the dot) so both lines align
    x0 = (WIDTH - surname_w) / 2
    draw_tracked(draw, (x0, top_y - s_top), FIRST_NAME, small, WHITE, small_tracking)

    big_y = top_y + (s_bot - s_top) + gap_name - b_top
    draw.text((x0, big_y), SURNAME, font=big, fill=WHITE)
    draw.text((x0 + surname_w, big_y), ".", font=big, fill=RED)

    role_y = big_y + b_bot + gap_role - r_top
    draw_label(draw, ROLE_LINE, role_font, MUTED, 4, y=role_y, anchor="center")
    by = role_y + r_bot + gap_bar
    size = 250

    # Signal bar: three white segments and one red
    seg_w, gap = 44, 8
    bar_w = seg_w * 4 + gap * 3
    bx = (WIDTH - bar_w) // 2
    for i, color in enumerate([WHITE, WHITE, WHITE, RED]):
        x0 = bx + i * (seg_w + gap)
        draw.rectangle((x0, by, x0 + seg_w - 1, by + seg_h - 1), fill=color)

    # Bottom: domain
    draw_label(draw, DOMAIN, label, MUTED, tracking, y=HEIGHT - MARGIN - 20, anchor="center")

    image.save(OUT_PATH, optimize=True)
    print(f"Wrote {OUT_PATH} (surname {size}px, dot {dot_w:.0f}px)")


if __name__ == "__main__":
    main()
