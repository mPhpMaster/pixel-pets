"""Regenerate README assets: demo.gif (pets), anime.gif (characters), preview.png (all colors). Needs Pillow."""
import os, sys
HERE = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, HERE)
from PIL import Image, ImageDraw, ImageFont
from pets_data import PETS

ROOT = os.path.join(HERE, "..")
anime = [k for k, p in PETS.items() if p.get("group") == "anime"]
heroes = [k for k, p in PETS.items() if p.get("group") == "heroes"]
pets = [k for k in PETS if not PETS[k].get("group")]


def gif(keys, out, cols, S=5, walk_seq=True):
    rows = (len(keys) + cols - 1) // cols

    def frame(name, lift):
        im = Image.new("RGB", (cols * 18 * S, rows * 18 * S + 2 * S), "#ffffff"); d = ImageDraw.Draw(im)
        for i, k in enumerate(keys):
            p = PETS[k]; pal = list(p["palettes"].values())[0]
            oy = -(p["bounce"] if lift else 0)
            ox = (i % cols) * 18 * S + S; oy0 = (i // cols) * 18 * S + 2 * S + oy * S
            for y, row in enumerate(p["sprites"][name]):
                for x, c in enumerate(row):
                    if c != ".":
                        d.rectangle([ox + x * S, oy0 + y * S, ox + x * S + S - 1, oy0 + y * S + S - 1], fill=pal[c])
        return im.convert("P", palette=Image.ADAPTIVE)

    walk = [("move1", 0), ("move2", 1)] * 6 if walk_seq else [("move1", 0), ("idle", 1), ("move2", 0), ("idle", 1)] * 3
    seq = walk + [("idle", 0), ("idle", 0), ("blink", 0), ("idle", 0), ("bob", 0), ("idle", 0)]
    fr = [frame(n, b) for n, b in seq]
    fr[0].save(os.path.join(ROOT, out), save_all=True, append_images=fr[1:], duration=150, loop=0)


def preview():
    S = 4; cell = 18 * S; label_w = 160; hdr = 30
    maxp = max(len(p["palettes"]) for p in PETS.values())
    W = label_w + maxp * cell + 8; H = len(PETS) * cell + 3 * hdr + 8
    img = Image.new("RGB", (W, H), "#ffffff"); d = ImageDraw.Draw(img)
    bold = "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"
    font = ImageFont.truetype(bold, 15); big = ImageFont.truetype(bold, 17)
    y0 = 4
    for title, keys in (("Pets", pets), ("Anime", anime), ("Characters", heroes)):
        d.text((10, y0 + 6), title.upper(), fill="#8a7f6a", font=big); y0 += hdr
        for j, k in enumerate(keys):
            p = PETS[k]
            if j % 2:
                d.rectangle([0, y0, W, y0 + cell - 1], fill="#f7f4ec")
            d.text((10, y0 + cell // 2 - 9), p["label"], fill="#2b2418", font=font)
            for i, pal in enumerate(p["palettes"].values()):
                x0 = label_w + i * cell + S
                for y, row in enumerate(p["sprites"]["idle"]):
                    for x, c in enumerate(row):
                        if c != ".":
                            d.rectangle([x0 + x * S, y0 + S + y * S, x0 + x * S + S - 1, y0 + S + y * S + S - 1], fill=pal[c])
            y0 += cell
    img.crop((0, 0, W, y0 + 4)).save(os.path.join(ROOT, "preview.png"))


if __name__ == "__main__":
    gif(pets, "demo.gif", 6)
    gif(anime, "anime.gif", 6, S=5, walk_seq=False)
    gif(heroes, "heroes.gif", 6, S=5, walk_seq=False)
    preview()
    print("assets written:", len(pets), "pets,", len(anime), "anime,", len(heroes), "characters")
