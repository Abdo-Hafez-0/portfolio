"""
Generate public/og-image.png — a 1200x630 social preview card.

Design follows the portfolio's "Retro Digital Interface" language:
- Pure black background with a subtle 48px grid (white ~4% opacity)
- VT323 dot-matrix typography for the name
- Large display name with a white -> cyan horizontal gradient (matching --color-accent: #8ddcff)
- Mono uppercase labels for the terminal feel
- Circular profile picture (face-centered crop) with a soft cyan glow ring
"""

from PIL import Image, ImageDraw, ImageFont, ImageFilter

# ---------------------------------------------------------------------------
# Config
# ---------------------------------------------------------------------------
WIDTH, HEIGHT = 1200, 630
BG = (0, 0, 0, 255)
ACCENT = "#8ddcff"
WHITE = "#f4f7fb"
TEXT_SECONDARY = "#9da7b5"
TEXT_MUTED = "#68717d"

MARGIN = 72
GRID = 48

VT323_PATH = "scripts/VT323-Regular.ttf"
MONO_PATH = r"C:\Windows\Fonts\CascadiaMono.ttf"
PROFILE_PATH = "public/profile-picture.png"

OUT_PATH = "public/og-image.png"


def rgb_hex(hex_str: str):
    hex_str = hex_str.lstrip("#")
    return tuple(int(hex_str[i : i + 2], 16) for i in (0, 2, 4))


def font(path: str, size: int) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(path, size)


def text_width(draw: ImageDraw.ImageDraw, text: str, f: ImageFont.FreeTypeFont) -> int:
    bbox = draw.textbbox((0, 0), text, font=f)
    return bbox[2] - bbox[0]


def render_text_measure(image: Image.Image, draw: ImageDraw.ImageDraw, xy, text, f: ImageFont.FreeTypeFont, fill):
    """Draw monochrome text and return its ink bounding box (x0,y0,x1,y1).

    Used for precise vertical layout so elements never overlap regardless of
    per-font metrics (ascent/descent bearings differ across fonts).
    """
    x, y = xy
    draw.text((x, y), text, font=f, fill=fill)
    layer = Image.new("L", (WIDTH, HEIGHT), 0)
    ld = ImageDraw.Draw(layer)
    ld.text((x, y), text, font=f, fill=255)
    bbox = layer.getbbox()
    return bbox if bbox else (x, y, x, y)


def draw_gradient_text(
    image: Image.Image,
    draw: ImageDraw.ImageDraw,
    xy,
    text: str,
    f: ImageFont.FreeTypeFont,
    start_color,
    end_color,
):
    """Render text filled with a left-to-right gradient and return ink bbox."""
    x, y = xy
    mask_layer = Image.new("L", (WIDTH, HEIGHT), 0)
    mask_draw = ImageDraw.Draw(mask_layer)
    mask_draw.text((x, y), text, font=f, fill=255)
    bbox = mask_layer.getbbox()
    if not bbox:
        return None
    bx0, by0, bx1, by1 = bbox
    tw, th = bx1 - bx0, by1 - by0

    # Horizontal gradient
    gradient = Image.new("RGB", (tw, th))
    gd = ImageDraw.Draw(gradient)
    for i in range(tw):
        t = i / max(tw - 1, 1)
        r = int(start_color[0] + (end_color[0] - start_color[0]) * t)
        g = int(start_color[1] + (end_color[1] - start_color[1]) * t)
        b = int(start_color[2] + (end_color[2] - start_color[2]) * t)
        gd.line([(i, 0), (i, th)], fill=(r, g, b))

    # Mask only the text region
    text_mask = mask_layer.crop((bx0, by0, bx1, by1))
    text_rgba = Image.new("RGBA", (tw, th), (0, 0, 0, 0))
    text_rgba.paste(gradient, (0, 0), text_mask)
    image.alpha_composite(text_rgba, (bx0, by0))
    return bbox


def draw_grid(draw: ImageDraw.ImageDraw):
    # Opaque dark gray (approx 4% white) so the grid stays subtle after
    # flattening to RGB without relying on alpha compositing.
    for x in range(0, WIDTH, GRID):
        draw.line([(x, 0), (x, HEIGHT)], fill=(10, 10, 10, 255))
    for y in range(0, HEIGHT, GRID):
        draw.line([(0, y), (WIDTH, y)], fill=(10, 10, 10, 255))


def circular_profile(diameter: int) -> Image.Image:
    """Return a face-centered circular crop of the profile picture."""
    img = Image.open(PROFILE_PATH).convert("RGBA")
    w, h = img.size
    side = min(w, h)
    left = (w - side) // 2
    # Face sits in the middle vertical band (y ~0.33-0.66 of the source).
    # Center the square crop on that band so the face is not in the lower
    # third of the resulting circle.
    top = max(0, int(h * 0.5) - side // 2)
    top = min(top, h - side)
    img = img.crop((left, top, left + side, top + side))
    img = img.resize((diameter, diameter), Image.LANCZOS)

    mask = Image.new("L", (diameter, diameter), 0)
    md = ImageDraw.Draw(mask)
    md.ellipse((0, 0, diameter, diameter), fill=255)

    out = Image.new("RGBA", (diameter, diameter), (0, 0, 0, 0))
    out.paste(img, (0, 0), mask)
    return out


# ---------------------------------------------------------------------------
# Build canvas
# ---------------------------------------------------------------------------
canvas = Image.new("RGBA", (WIDTH, HEIGHT), BG)
draw = ImageDraw.Draw(canvas)

# Background: pure black with subtle grid
draw.rectangle((0, 0, WIDTH, HEIGHT), fill=BG)
draw_grid(draw)

VT = font(VT323_PATH, 132)
MONO_SM = font(MONO_PATH, 16)
MONO_MD = font(MONO_PATH, 21)

# ---------------------------------------------------------------------------
# Frame: terminal-style corner accents
# ---------------------------------------------------------------------------
frame_color = (34, 53, 61, 255)  # opaque approx of cyan @ ~24% over black
L = 26  # corner arm length
W = 2   # arm thickness

# Top-left
draw.line([(MARGIN, MARGIN), (MARGIN + L, MARGIN)], fill=frame_color, width=W)
draw.line([(MARGIN, MARGIN), (MARGIN, MARGIN + L)], fill=frame_color, width=W)
# Top-right
draw.line([(WIDTH - MARGIN, MARGIN), (WIDTH - MARGIN - L, MARGIN)], fill=frame_color, width=W)
draw.line([(WIDTH - MARGIN, MARGIN), (WIDTH - MARGIN, MARGIN + L)], fill=frame_color, width=W)
# Bottom-left
draw.line([(MARGIN, HEIGHT - MARGIN), (MARGIN + L, HEIGHT - MARGIN)], fill=frame_color, width=W)
draw.line([(MARGIN, HEIGHT - MARGIN), (MARGIN, HEIGHT - MARGIN - L)], fill=frame_color, width=W)
# Bottom-right
draw.line([(WIDTH - MARGIN, HEIGHT - MARGIN), (WIDTH - MARGIN - L, HEIGHT - MARGIN)], fill=frame_color, width=W)
draw.line([(WIDTH - MARGIN, HEIGHT - MARGIN), (WIDTH - MARGIN, HEIGHT - MARGIN - L)], fill=frame_color, width=W)

# ---------------------------------------------------------------------------
# Eyebrow (top-left)
# ---------------------------------------------------------------------------
draw.text((MARGIN, MARGIN), "PORTFOLIO", font=MONO_SM, fill=rgb_hex(TEXT_MUTED))
sw = text_width(draw, "PORTFOLIO", MONO_SM)
draw.text((MARGIN + sw + 12, MARGIN), "01 / 01", font=MONO_SM, fill=rgb_hex(TEXT_MUTED))

# Top-right status dot
dot_r = 4
dot_x = WIDTH - MARGIN - L // 2
dot_y = MARGIN + 10
draw.ellipse(
    (dot_x - dot_r, dot_y - dot_r, dot_x + dot_r, dot_y + dot_r),
    fill=rgb_hex(ACCENT),
)

# ---------------------------------------------------------------------------
# Profile picture (right side, vertically centered)
# ---------------------------------------------------------------------------
diameter = 240
profile_x = WIDTH - MARGIN - L - diameter  # right-aligned inside frame
profile_y = HEIGHT // 2 - diameter // 2

profile = circular_profile(diameter)

# Soft glow ring behind the circle
glow = Image.new("RGBA", (WIDTH, HEIGHT), (0, 0, 0, 0))
gd = ImageDraw.Draw(glow)
glow_ring = 36
gd.ellipse(
    (profile_x - glow_ring, profile_y - glow_ring,
     profile_x + diameter + glow_ring, profile_y + diameter + glow_ring),
    fill=(141, 220, 255, 90),
)
glow = glow.filter(ImageFilter.GaussianBlur(30))
canvas.alpha_composite(glow)

# Thin cyan ring
ring_offset = 5
draw.ellipse(
    (
        profile_x - ring_offset,
        profile_y - ring_offset,
        profile_x + diameter + ring_offset,
        profile_y + diameter + ring_offset,
    ),
    outline=(83, 129, 150, 255),
    width=2,
)

canvas.alpha_composite(profile, (profile_x, profile_y))

# ---------------------------------------------------------------------------
# Name (large display, white -> cyan gradient) on the left
# ---------------------------------------------------------------------------
name1 = "Abdulrahman"
name2 = "Hafez"
name_x = MARGIN
name_y = 116
line_gap = 150

# Soft glow behind the name
name_glow = Image.new("RGBA", (WIDTH, HEIGHT), (0, 0, 0, 0))
ngd = ImageDraw.Draw(name_glow)
ngd.text((name_x, name_y), name1, font=VT, fill=(141, 220, 255, 255))
ngd.text((name_x, name_y + line_gap), name2, font=VT, fill=(141, 220, 255, 255))
# Measure the "Hafez" line box so we can place other elements below its real ink
hafez_layer = Image.new("L", (WIDTH, HEIGHT), 0)
hd = ImageDraw.Draw(hafez_layer)
hd.text((name_x, name_y + line_gap), name2, font=VT, fill=255)
hafez_bbox = hafez_layer.getbbox()
name_glow = name_glow.filter(ImageFilter.GaussianBlur(18))
r_ch, g_ch, b_ch, a_ch = name_glow.split()
a_scaled = a_ch.point(lambda a: int(a * 0.22))
canvas.alpha_composite(Image.merge("RGBA", (r_ch, g_ch, b_ch, a_scaled)))

start_c = rgb_hex(WHITE)
end_c = rgb_hex(ACCENT)
draw_gradient_text(canvas, draw, (name_x, name_y), name1, VT, start_c, end_c)
draw_gradient_text(canvas, draw, (name_x, name_y + line_gap), name2, VT, start_c, end_c)

# ---------------------------------------------------------------------------
# Role label (cyan mono) + tagline — placed below measured "Hafez" ink
# ---------------------------------------------------------------------------
GAP = 28
role_y = hafez_bbox[3] + GAP
draw.text((name_x, role_y), "BACKEND .NET DEVELOPER", font=MONO_MD, fill=rgb_hex(ACCENT))
role_bbox = render_text_measure(canvas, draw, (name_x, role_y), "BACKEND .NET DEVELOPER", MONO_MD, rgb_hex(ACCENT))

tagline_y = role_bbox[3] + GAP - 4
tagline = "Building reliable systems, one API at a time."
draw.text((name_x, tagline_y), tagline, font=MONO_SM, fill=rgb_hex(TEXT_SECONDARY))

# ---------------------------------------------------------------------------
# Footer (bottom-left) + terminal cursor (bottom-right)
# ---------------------------------------------------------------------------
footer_y = HEIGHT - MARGIN - 26
footer1 = "abdulrahmanhafez.dev"
draw.text((MARGIN, footer_y), footer1, font=MONO_SM, fill=rgb_hex(TEXT_MUTED))
fw = text_width(draw, footer1, MONO_SM)
draw.text((MARGIN + fw + 16, footer_y), "SYSTEM / PORTFOLIO", font=MONO_SM, fill=rgb_hex(TEXT_MUTED))

cursor_w, cursor_h = 12, 20
curs_x = WIDTH - MARGIN - cursor_w
curs_y = HEIGHT - MARGIN - cursor_h + 2
draw.rectangle((curs_x, curs_y, curs_x + cursor_w, curs_y + cursor_h), fill=rgb_hex(ACCENT))

# ---------------------------------------------------------------------------
# Save
# ---------------------------------------------------------------------------
canvas.convert("RGB").save(OUT_PATH, "PNG")
print(f"Saved {OUT_PATH}  ({WIDTH}x{HEIGHT})")