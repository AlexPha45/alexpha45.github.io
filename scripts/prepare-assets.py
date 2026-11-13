"""Prepare local portfolio media without modifying the supplied originals.

Requires Pillow. Run from any directory with `python scripts/prepare-assets.py`.
The SVG illustrations are original mathematical/technical drawings. Optional
FontTools support lets the social image use the same installed web fonts.
"""

from __future__ import annotations

import io
import math
import shutil
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont, ImageOps


ROOT = Path(__file__).resolve().parents[1]
IMAGES = ROOT / "public" / "images"
PAPER = "#f3f2ed"
INK = "#121212"
BLUE = "#4379ff"
MUTED = "#92969f"
IMAGES.mkdir(parents=True, exist_ok=True)


def prepare_photos() -> None:
    sources = {
        "at-work": "Boston Regionals - Working (1).jpg",
        "community": "Boston Regional - Group Shot (1).jpg",
        "briefing": "Boston Regionals - Tournament Intro (1).jpg",
    }
    for name, filename in sources.items():
        with Image.open(ROOT / "Pokerbot tournament photos" / filename) as source:
            source = ImageOps.exif_transpose(source).convert("RGB")
            for width in (640, 960, 1440):
                height = round(source.height * width / source.width)
                resized = source.resize((width, height), Image.Resampling.LANCZOS)
                # Re-encoding drops camera metadata; no compositional cropping.
                resized.save(IMAGES / f"{name}-{width}.webp", "WEBP", quality=83, method=6)
    resume_dir = ROOT / "public" / "resume"
    resume_dir.mkdir(parents=True, exist_ok=True)
    shutil.copyfile(ROOT / "Alexandros_Phardis_Resume (18).pdf", resume_dir / "alexandros-phardis-resume.pdf")


def svg_start(width: int, height: int, title: str, description: str, background: str = PAPER) -> str:
    return f'''<svg xmlns="http://www.w3.org/2000/svg" width="{width}" height="{height}" viewBox="0 0 {width} {height}" role="img" aria-labelledby="title description">
<title id="title">{title}</title><desc id="description">{description}</desc>
<defs>
 <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M40 0H0V40" fill="none" stroke="{INK}" stroke-opacity=".065" stroke-width="1"/></pattern>
 <pattern id="dots" width="9" height="9" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1" fill="{INK}" opacity=".15"/></pattern>
 <marker id="arrow" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M1 1L8 5L1 9" fill="none" stroke="{INK}" stroke-width="1.5"/></marker>
</defs>
<rect width="{width}" height="{height}" fill="{background}"/>
'''


def label(x: float, y: float, text: str, size: int = 12, fill: str = INK, spacing: float = 2) -> str:
    return f'<text x="{x}" y="{y}" fill="{fill}" font-family="Arial, sans-serif" font-size="{size}" letter-spacing="{spacing}">{text}</text>'


def path(points: list[tuple[float, float]], close: bool = False) -> str:
    return "M" + "L".join(f"{x:.2f},{y:.2f}" for x, y in points) + ("Z" if close else "")


def trefoil_points(cx: float, cy: float, scale: float, rotate: float = 0, count: int = 900):
    points, depths = [], []
    ca, sa = math.cos(rotate), math.sin(rotate)
    for index in range(count + 1):
        t = 2 * math.pi * index / count
        x = math.sin(t) + 2 * math.sin(2 * t)
        y = math.cos(t) - 2 * math.cos(2 * t)
        points.append((cx + scale * (x * ca - y * sa), cy + scale * (x * sa + y * ca)))
        depths.append(-math.sin(3 * t))
    return points, depths


def intersections(points, depths):
    """Find transverse crossings and choose the strand with greater z depth."""
    count = len(points) - 1
    crossings = []
    for i in range(count):
        ax, ay = points[i]
        bx, by = points[i + 1]
        rx, ry = bx - ax, by - ay
        for j in range(i + 15, count):
            if count - (j - i) < 15:
                continue
            cx, cy = points[j]
            dx, dy = points[j + 1]
            sx, sy = dx - cx, dy - cy
            det = rx * sy - ry * sx
            if abs(det) < 1e-9:
                continue
            u = ((cx - ax) * sy - (cy - ay) * sx) / det
            v = ((cx - ax) * ry - (cy - ay) * rx) / det
            if 0 <= u < 1 and 0 <= v < 1:
                zi = depths[i] * (1 - u) + depths[i + 1] * u
                zj = depths[j] * (1 - v) + depths[j + 1] * v
                crossings.append((i if zi > zj else j, (ax + u * rx, ay + u * ry)))
    return crossings


def trefoil_svg(cx: float, cy: float, scale: float, stroke: str = BLUE, width: float = 16, background: str = PAPER, rotation: float = -.12):
    points, depths = trefoil_points(cx, cy, scale, rotation)
    crossing_list = intersections(points, depths)
    assert len(crossing_list) == 3, f"Trefoil projection should have three crossings, got {len(crossing_list)}"
    result = f'<path d="{path(points)}" fill="none" stroke="{stroke}" stroke-width="{width}" stroke-linecap="round" stroke-linejoin="round"/>'
    # Paint a short halo along each overpass, then redraw that strand. This
    # creates true alternating over/under gaps, not a self-intersecting loop.
    for index, _ in crossing_list:
        segment = points[max(0, index - 11):min(len(points), index + 13)]
        overpass = points[max(0, index - 13):min(len(points), index + 15)]
        result += f'<path d="{path(segment)}" fill="none" stroke="{background}" stroke-width="{width + 11}" stroke-linecap="butt"/>'
        result += f'<path d="{path(overpass)}" fill="none" stroke="{stroke}" stroke-width="{width}" stroke-linecap="round"/>'
    return result


def make_hero() -> None:
    svg = svg_start(600, 640, "From mathematical thinking to working systems", "A blue trefoil and technical construction lines connect mathematics, data, and code.", "#1b1d22")
    svg += '''<defs><pattern id="dark-grid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M40 0H0V40" fill="none" stroke="#d6dbea" stroke-opacity=".065"/></pattern></defs>
<rect x="20" y="20" width="560" height="600" fill="url(#dark-grid)"/>
<path d="M20 58V20H58M542 20H580V58M580 582V620H542M58 620H20V582" fill="none" stroke="#626975" stroke-width="2"/>
<path d="M300 104V506M80 310H520" stroke="#818c9e" stroke-width="1" stroke-dasharray="3 8" opacity=".35"/>
<circle cx="300" cy="310" r="197" fill="none" stroke="#7f8899" stroke-opacity=".24"/>
<circle cx="300" cy="310" r="153" fill="none" stroke="#7f8899" stroke-opacity=".2" stroke-dasharray="3 10"/>
<path d="M99 310H116M484 310H501M300 108V125M300 495V512" stroke="#aab2c0" stroke-width="2"/>
'''
    svg += label(48, 62, "FIELD NOTES / 001", 11, "#aab2c0", 2.6)
    svg += label(433, 62, "AP — 2026", 11, "#aab2c0", 1.6)
    svg += trefoil_svg(300, 305, 59, stroke="#6693ff", width=14, background="#1b1d22", rotation=-.27)
    svg += '''<path d="M395 197L461 137H528" fill="none" stroke="#8b95a7" stroke-width="1.5"/>
<circle cx="395" cy="197" r="4" fill="#f3f2ed"/>
<path d="M189 388L132 449H66" fill="none" stroke="#8b95a7" stroke-width="1.5"/>
<circle cx="189" cy="388" r="4" fill="#f3f2ed"/>
<rect x="82" y="537" width="436" height="47" fill="#21252d" stroke="#505967"/>
<path d="M220 548V573M365 548V573" stroke="#505967"/>
'''
    svg += label(445, 125, "STRUCTURE", 10, "#c2c9d6", 1.5)
    svg += label(66, 469, "CURIOSITY", 10, "#c2c9d6", 1.5)
    svg += label(111, 566, "MATHEMATICS", 11, "#e9edf5", 1.1)
    svg += label(268, 566, "DATA", 11, "#e9edf5", 1.8)
    svg += label(414, 566, "CODE", 11, "#e9edf5", 1.8)
    svg += '</svg>'
    (IMAGES / "hero-diagram.svg").write_text(svg, encoding="utf-8")


def make_poker() -> None:
    svg = svg_start(800, 500, "Pokerbot decision architecture", "Two playing cards lead into an illustrated action decision tree.")
    svg += '<rect width="800" height="500" fill="url(#grid)"/>'
    svg += '<rect x="26" y="26" width="748" height="448" rx="0" fill="none" stroke="#121212" stroke-opacity=".15"/>'
    svg += label(50, 62, "01 / DECISION SYSTEMS", 12)
    svg += label(612, 62, "NO LIMIT", 12)
    svg += '''<rect x="75" y="144" width="165" height="228" fill="url(#dots)"/>
<g transform="rotate(-12 195 260)">
 <rect x="106" y="133" width="153" height="222" fill="#121212"/>
 <rect x="100" y="127" width="153" height="222" fill="#f3f2ed" stroke="#121212" stroke-width="3"/>
 <text x="117" y="163" font-family="Arial,sans-serif" font-size="29" font-weight="bold">A</text>
 <path d="M179 205C163 223 141 231 143 247C145 264 165 268 176 251L172 277H188L184 251C195 268 215 264 217 247C219 231 196 223 179 205Z" fill="#121212"/>
</g>
<g transform="rotate(9 285 277)">
 <rect x="223" y="165" width="153" height="222" fill="#121212"/>
 <rect x="216" y="158" width="153" height="222" fill="#f3f2ed" stroke="#121212" stroke-width="3"/>
 <text x="233" y="195" font-family="Arial,sans-serif" font-size="29" font-weight="bold" fill="#4379ff">K</text>
 <path d="M293 227L321 267L293 307L265 267Z" fill="#4379ff"/>
</g>
<path d="M398 260H449" stroke="#121212" stroke-width="2" marker-end="url(#arrow)"/>
<rect x="461" y="226" width="128" height="64" fill="#4379ff" stroke="#121212" stroke-width="2"/>
<path d="M589 258H622V166H650M622 258H650M622 258V350H650" stroke="#121212" stroke-width="2" fill="none"/>
<circle cx="622" cy="258" r="4" fill="#121212"/>
<rect x="650" y="145" width="97" height="43" fill="#f3f2ed" stroke="#121212" stroke-width="2"/>
<rect x="650" y="237" width="97" height="43" fill="#121212"/>
<rect x="650" y="329" width="97" height="43" fill="#f3f2ed" stroke="#121212" stroke-width="2"/>
'''
    svg += label(482, 253, "EQUITY", 13, "#ffffff", 1.2)
    svg += label(481, 273, "+ POLICY", 11, "#ffffff", 1)
    svg += label(673, 172, "RAISE", 11, INK, 1)
    svg += label(678, 264, "CALL", 11, "#ffffff", 1)
    svg += label(677, 356, "FOLD", 11, INK, 1)
    svg += '<path d="M50 425H750" stroke="#121212" stroke-opacity=".2"/>'
    svg += label(50, 451, "OBSERVE", 10, "#555b66", 1.6)
    svg += label(310, 451, "EVALUATE", 10, "#555b66", 1.6)
    svg += label(660, 451, "DECIDE", 10, "#555b66", 1.6)
    svg += '</svg>'
    (IMAGES / "pokerbots.svg").write_text(svg, encoding="utf-8")


def make_numerical() -> None:
    svg = svg_start(800, 500, "Numerical integration and matrix decomposition", "Sampled points and weighted area under a curve accompany a simple matrix decomposition.")
    svg += '<rect width="800" height="500" fill="url(#grid)"/>'
    svg += label(50, 62, "02 / NUMERICAL METHODS", 12)
    curve = [(88 + i * 4.6, 320 - (40 + 135 * math.exp(-((i - 39) / 24) ** 2) + 53 * math.exp(-((i - 82) / 14) ** 2))) for i in range(101)]
    area = [(88, 320), *curve, (548, 320)]
    svg += f'<path d="{path(area, True)}" fill="#4379ff" fill-opacity=".13"/>'
    for i in (7, 18, 32, 48, 63, 80, 94):
        x, y = curve[i]
        svg += f'<path d="M{x:.2f} 320V{y:.2f}" stroke="#4379ff" stroke-opacity=".5" stroke-dasharray="3 5"/>'
    svg += f'<path d="{path(curve)}" fill="none" stroke="#4379ff" stroke-width="4" stroke-linecap="round"/>'
    for i in (7, 18, 32, 48, 63, 80, 94):
        x, y = curve[i]
        svg += f'<circle cx="{x:.2f}" cy="{y:.2f}" r="5" fill="#f3f2ed" stroke="#121212" stroke-width="2"/>'
    svg += '<path d="M72 112V339M72 320H569" stroke="#121212" stroke-width="2" marker-end="url(#arrow)" fill="none"/>'
    svg += label(88, 110, "f(x)", 17, INK, 0)
    svg += label(556, 346, "x", 17, INK, 0)
    svg += label(97, 365, "SAMPLE → APPROXIMATE", 10, "#555b66", 1.5)
    svg += '''<rect x="606" y="122" width="142" height="217" fill="#f3f2ed" stroke="#121212" stroke-width="2"/>
<path d="M630 161H623V206H630M722 161H729V206H722" stroke="#121212" stroke-width="2" fill="none"/>
<path d="M677 224V248" stroke="#121212" stroke-width="2" marker-end="url(#arrow)"/>
'''
    for row in range(3):
        for col in range(5):
            svg += f'<rect x="{638 + col * 17}" y="{163 + row * 15}" width="7" height="7" fill="{BLUE if col == row else INK}" opacity="{1 if col == row else .3}"/>'
    svg += label(630, 285, "U · Σ · Vᵀ", 19, INK, 0)
    svg += label(658, 315, "SVD", 10, "#555b66", 2)
    svg += '<path d="M50 425H750" stroke="#121212" stroke-opacity=".2"/>'
    svg += label(50, 451, "MONTE CARLO", 10, "#555b66", 1.6)
    svg += label(315, 451, "LINEAR ALGEBRA", 10, "#555b66", 1.6)
    svg += label(620, 451, "QUADRATURE", 10, "#555b66", 1.6)
    svg += '</svg>'
    (IMAGES / "numerical.svg").write_text(svg, encoding="utf-8")


def make_trefoil() -> None:
    svg = svg_start(800, 500, "Trefoil knot with three alternating crossings", "An original trefoil projection shows over and under strands at each crossing, surrounded by mathematical construction lines.")
    svg += '<rect width="800" height="500" fill="url(#grid)"/>'
    svg += label(50, 62, "03 / MATHEMATICAL STRUCTURE", 12)
    svg += '<circle cx="388" cy="243" r="167" fill="none" stroke="#121212" stroke-opacity=".18" stroke-dasharray="4 9"/>'
    svg += '<path d="M388 86V397M226 243H551" stroke="#121212" stroke-opacity=".13" stroke-dasharray="3 7"/>'
    svg += trefoil_svg(388, 235, 50, width=13, rotation=-.13)
    svg += '''<path d="M473 155L573 126H694" fill="none" stroke="#121212" stroke-width="1.5"/>
<circle cx="473" cy="155" r="4" fill="#121212"/>
<path d="M264 289L176 338H75" fill="none" stroke="#121212" stroke-width="1.5"/>
<circle cx="264" cy="289" r="4" fill="#121212"/>
'''
    svg += label(575, 115, "TREFOIL KNOT", 10, INK, 1.6)
    svg += label(75, 360, "3 CROSSINGS", 10, INK, 1.6)
    svg += '<path d="M50 425H750" stroke="#121212" stroke-opacity=".2"/>'
    svg += label(50, 451, "INVARIANTS", 10, "#555b66", 1.6)
    svg += label(330, 451, "TOPOLOGY", 10, "#555b66", 1.6)
    svg += label(642, 451, "STRUCTURE", 10, "#555b66", 1.6)
    svg += '</svg>'
    (IMAGES / "trefoil.svg").write_text(svg, encoding="utf-8")


def load_font(size: int, display: bool = False):
    webfont = ROOT / "node_modules" / "@fontsource" / ("barlow-condensed" if display else "plus-jakarta-sans") / "files" / (
        "barlow-condensed-latin-800-normal.woff2" if display else "plus-jakarta-sans-latin-400-normal.woff2"
    )
    if webfont.exists():
        try:
            from fontTools.ttLib import TTFont
            font = TTFont(webfont)
            font.flavor = None
            output = io.BytesIO()
            font.save(output)
            output.seek(0)
            return ImageFont.truetype(output, size)
        except ImportError:
            pass
    candidates = [Path("C:/Windows/Fonts/ARIALNB.TTF" if display else "C:/Windows/Fonts/arial.ttf"), Path("/usr/share/fonts/truetype/dejavu/DejaVuSansCondensed-Bold.ttf" if display else "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf")]
    for candidate in candidates:
        if candidate.exists():
            return ImageFont.truetype(str(candidate), size)
    return ImageFont.load_default(size=size)


def make_social() -> None:
    # Render at 2x and downsample for crisp text/lines in social previews.
    ratio = 2
    image = Image.new("RGB", (1200 * ratio, 630 * ratio), INK)
    draw = ImageDraw.Draw(image)

    def line(coords, fill, width=1):
        draw.line([(int(x * ratio), int(y * ratio)) for x, y in coords], fill=fill, width=width * ratio)

    def text(x, y, value, size, fill=PAPER, display=False):
        draw.text((x * ratio, y * ratio), value, font=load_font(size * ratio, display), fill=fill)

    for x in range(760, 1161, 40):
        line([(x, 64), (x, 566)], "#242832")
    for y in range(64, 567, 40):
        line([(760, y), (1160, y)], "#242832")
    line([(50, 50), (1150, 50), (1150, 580), (50, 580), (50, 50)], "#3d424d", 2)
    text(80, 78, "AP / PORTFOLIO", 18, "#aeb4c0")
    text(80, 174, "ALEXANDROS", 98, display=True)
    text(80, 279, "PHARDIS", 98, display=True)
    text(85, 417, "Mathematics. Data. Code.", 26, "#aeb4c0")
    text(85, 517, "alexpha45.github.io", 19)
    line([(85, 479), (685, 479)], "#3d424d")
    text(820, 168, "AP", 220, "#6693ff", display=True)
    text(838, 500, "THEORY → SYSTEMS", 15, "#aeb4c0")
    image.resize((1200, 630), Image.Resampling.LANCZOS).save(IMAGES / "social-preview-v2.png", optimize=True)


def make_favicon() -> None:
    svg = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" fill="#121212"/><path d="M10 49L20 15H27L37 49H29L27 41H19L17 49ZM21 34H25L23 24Z" fill="#f3f2ed"/><path d="M38 15H48C55 15 58 19 58 27S54 39 47 39H46V49H38ZM46 22V32H48C50 32 51 30 51 27S50 22 48 22Z" fill="#6693ff"/></svg>'''
    (ROOT / "public" / "favicon.svg").write_text(svg, encoding="utf-8")


if __name__ == "__main__":
    prepare_photos()
    make_hero()
    make_poker()
    make_numerical()
    make_trefoil()
    make_social()
    make_favicon()
    for asset in sorted(IMAGES.iterdir()):
        print(f"{asset.name}: {asset.stat().st_size:,} bytes")
