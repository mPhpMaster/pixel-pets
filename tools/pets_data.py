"""Pixel Pets sprite data. Every sprite is 16x16 and faces RIGHT.

Per pet:
  sprites: idle, move1, move2 (move frames alternate while moving)
  eyes:    pixels turned into outline when blinking / sleeping
  head:    number of top rows treated as "head" for the dance bob
  palettes: one or more colour variants (letter -> colour); "swatch" is the menu colour
"""

PETS = {}

PETS["cockatiel"] = dict(
    treats=["🌻", "🍎"],
    label="Cockatiel", ar="كوكاتيل",
    sounds=["السلام عليكم", "امواححح", "🎶", "Peace be upon you", "Mwahhh"],
    speed=1.2, bounce=0, head=8, eyes=[(10, 5)],
    palettes={
        "lutino": dict(swatch="#fbe36a", K="#4a4030", W="#fbf7e8", w="#e8dfbf", Y="#fbe36a", y="#f0cf3a",
                       O="#f5893a", E="#b3202a", P="#f2b5a5", G="#efe2a0"),
        "grey": dict(swatch="#8f8f8f", K="#2e2a26", W="#a3a3a3", w="#7c7c7c", Y="#fff1a8", y="#d9c76a",
                     O="#f5893a", E="#1b1b1b", P="#a59a8e", G="#6d6d6d"),
        "white-face": dict(swatch="#ffffff", K="#2e2a26", W="#9a9a9a", w="#777777", Y="#ffffff", y="#e6e6e6",
                           O="#ffffff", E="#1b1b1b", P="#a59a8e", G="#666666"),
    },
    sprites=dict(
        idle=[
            "........KK......",
            "........KyK.....",
            ".........KyK....",
            "......KKKYyK....",
            ".....KYYYYYYK...",
            ".....KYYYYEYYK..",
            ".....KYYYOOYPPK.",
            ".....KWYYOOYKPK.",
            ".....KWWYYYKK...",
            "....KWWWWWWK....",
            "....KWWwWWWK....",
            "...KWWwwWWWK....",
            "...KWwwwWWK.....",
            "..KGwKPKKPK.....",
            ".KGGK.P..P......",
            "KGK.............",
        ],
        move1=[
            "................",
            "......KK........",
            ".....KWwK.......",
            ".....KWWwK...KK.",
            "......KWWwK.KyK.",
            "......KWWWKKYYYK",
            ".......KWWKYYEYK",
            "....KKKKWWWYOOPK",
            "..KKWWWWWWWWYKPK",
            "KKGGWWWWWWWWKK..",
            "KGGWWKKKWWWK....",
            ".KGGK...KKK.....",
            "..KK............",
            "................",
            "................",
            "................",
        ],
        move2=[
            "................",
            "................",
            "................",
            ".............KK.",
            "............KyK.",
            "...........KYYYK",
            "..........KYYEYK",
            "....KKKKKKWYOOPK",
            "..KKWWWWWWWWYKPK",
            "KKGGWWWwwWWWKK..",
            "KGGWWKWWwwKK....",
            ".KGGK.KWwwwK....",
            "..KK...KWwwK....",
            ".......KWwK.....",
            "........KK......",
            "................",
        ],
    ),
)

PETS["cat"] = dict(
    treats=["🐟"],
    label="Cat", ar="قطة",
    sounds=["Meow", "مياو", "Purr~", "😺", "Mrrp?"],
    speed=1.0, bounce=0, head=8, eyes=[(9, 6), (12, 6)],
    palettes={
        "orange": dict(swatch="#f0a04b", K="#3b2a1e", A="#f0a04b", B="#c96f22", N="#f4a3a8", E="#2a7a3b"),
        "black": dict(swatch="#2b2b2b", K="#0e0e0e", A="#2f2f35", B="#1c1c20", N="#e88f9a", E="#e8c42b"),
        "grey": dict(swatch="#9aa0a6", K="#33363a", A="#9aa0a6", B="#6f757b", N="#f4a3a8", E="#3b8ed6"),
        "white": dict(swatch="#f7f5f0", K="#5a534a", A="#f7f5f0", B="#dcd6ca", N="#f4a3a8", E="#3b8ed6"),
    },
    sprites=dict(
        idle=[
            "................",
            "................",
            "........K....K..",
            ".......KAK..KAK.",
            ".......KANKKKNAK",
            ".......KAAAAAAAK",
            ".......KAEAAEAAK",
            ".......KAAANAAAK",
            "..KK....KAAAAAK.",
            ".KAK....KAAAAK..",
            ".KAK...KAABAAAK.",
            "..KAK..KAAABAAK.",
            "...KAKKAAAABAAK.",
            "....KAAAAAAABAK.",
            ".....KAKKAAKAAK.",
            "......KK.KKKKK..",
        ],
        move1=[
            "................",
            "................",
            "................",
            "................",
            "...........K.K..",
            ".K........KAKAK.",
            "KAK.......KAAAAK",
            "KAK.......KAAEAK",
            ".KAK..KKKKKAAANK",
            "..KAKKAAAAAAAAK.",
            "...KAAAABAABAAK.",
            "...KAAAABAABAK..",
            "...KAAAAAAAAAK..",
            "...KKAKKKKKAKK..",
            "..KAK......KAK..",
            "..KK.......KK...",
        ],
        move2=[
            "................",
            "................",
            "................",
            "................",
            "...........K.K..",
            "..........KAKAK.",
            ".K........KAAAAK",
            "KAK.......KAAEAK",
            "KAK...KKKKKAAANK",
            ".KAKKKAAAAAAAAK.",
            "..KKAAAABAABAAK.",
            "...KAAAABAABAK..",
            "...KAAAAAAAAAK..",
            "...KKAKKKKKAKK..",
            "....KAK..KAK....",
            "....KK...KK.....",
        ],
    ),
)

PETS["dog"] = dict(
    treats=["🦴"],
    label="Dog", ar="كلب",
    sounds=["Woof!", "هاو!", "Arf arf", "🦴?", "*wags*"],
    speed=1.1, bounce=0, head=8, eyes=[(10, 4)],
    palettes={
        "brown": dict(swatch="#a8703f", K="#2b1d12", A="#a8703f", B="#6e4423", W="#ecd9bd", N="#1b1b1b", E="#1b1b1b"),
        "golden": dict(swatch="#e8b860", K="#4a3418", A="#e8b860", B="#c48a35", W="#fbefd5", N="#2b1d12", E="#2b1d12"),
        "husky": dict(swatch="#7d8790", K="#1f2328", A="#7d8790", B="#3f464d", W="#f4f4f4", N="#1b1b1b", E="#4aa3e0"),
        "black": dict(swatch="#26262a", K="#000000", A="#2a2a2f", B="#141416", W="#c79a6b", N="#000000", E="#c79a6b"),
    },
    sprites=dict(
        idle=[
            "................",
            "................",
            ".......KKKK.....",
            "......KAAAAK....",
            ".....KBAAAEAKK..",
            ".....KBAAAAAAAK.",
            ".....KBKAAAAANK.",
            "......KKAAAAKK..",
            ".......KAAAAK...",
            "..K....KAWAAK...",
            ".KAK..KAWWAAK...",
            ".KAK..KAWWAAK...",
            "..KAK.KAAAAAAK..",
            "...KAKAAAKAAAK..",
            "....KAAAKKAAK...",
            ".....KKKK.KKK...",
        ],
        move1=[
            "................",
            "................",
            "................",
            "..........KKKK..",
            ".........KAAAAK.",
            ".........KBAEAAK",
            ".K.......KBAAAAN",
            "KAK......KBKAAK.",
            ".KAK.KKKKKKAAK..",
            "..KAKAAAAAAAAK..",
            "...KAAAAAAAAAK..",
            "...KAAAAAAWWAK..",
            "...KKAKKKKKAKK..",
            "..KAK......KAK..",
            "..KK.......KK...",
            "................",
        ],
        move2=[
            "................",
            "................",
            "................",
            "..........KKKK..",
            ".........KAAAAK.",
            ".........KBAEAAK",
            "K........KBAAAAN",
            "KAK......KBKAAK.",
            ".KAK.KKKKKKAAK..",
            "..KAKAAAAAAAAK..",
            "...KAAAAAAAAAK..",
            "...KAAAAAAWWAK..",
            "...KKAKKKKKAKK..",
            "....KAK..KAK....",
            "....KK...KK.....",
            "................",
        ],
    ),
)

PETS["sparrow"] = dict(
    treats=["🌻", "🍞"],
    label="Sparrow", ar="عصفور",
    sounds=["Tweet!", "تويت", "🎶", "Chirp chirp"],
    speed=1.3, bounce=0, head=10, eyes=[(9, 8)],
    palettes={
        "sparrow": dict(swatch="#9a6a3c", K="#2b2016", A="#9a6a3c", C="#efe6d4", B="#d8c7a8", D="#5e3e22", Y="#3a3a3a", N="#c9a08a", E="#111111"),
        "canary": dict(swatch="#ffd83d", K="#4a3a10", A="#ffd83d", C="#fff3a6", B="#ffe57a", D="#e0a800", Y="#f0a868", N="#f0a868", E="#111111"),
        "bluebird": dict(swatch="#3d8fe0", K="#13263d", A="#3d8fe0", C="#f2b07a", B="#f6c79c", D="#1f5a9e", Y="#2b2b2b", N="#5b5b5b", E="#111111"),
    },
    sprites=dict(
        idle=[
            "................",
            "................",
            "................",
            "................",
            "................",
            "................",
            "......KKKK......",
            ".....KAAAAK.....",
            ".....KAAAEAKK...",
            ".....KCCAAAKYK..",
            "...KKDCCCCKK....",
            "..KDDDBBBBK.....",
            ".KDDDBBBBBK.....",
            "KDDKKBBBBK......",
            "KK....KKKK......",
            "......N.N.......",
        ],
        move1=[
            "................",
            "................",
            "................",
            "....KK..........",
            "...KDDK.........",
            "...KDDDK........",
            "....KDDDK..KKK..",
            ".....KDDDKKAAAK.",
            "......KDDKAAEAKK",
            "..KKKKKBBBCCAKYK",
            "KKDDBBBBBBBCKK..",
            ".KKDKKBBBBKK....",
            "....KKKKKK......",
            "................",
            "................",
            "................",
        ],
        move2=[
            "................",
            "................",
            "................",
            "................",
            "................",
            "................",
            "...........KKK..",
            "..........KAAAK.",
            ".........KAAEAKK",
            "..KKKKKKKKBCCAKYK"[:16],
            "KKDDBBBBDDDDKK..",
            ".KKDKKBKDDDDK...",
            "....KKKKDDDK....",
            "........KDDK....",
            ".........KK.....",
            "................",
        ],
    ),
)

PETS["rabbit"] = dict(
    treats=["🥕"],
    label="Rabbit", ar="أرنب",
    sounds=["*nom nom*", "🥕?", "♥", "*thump*"],
    speed=1.0, bounce=3, head=8, eyes=[(10, 6)],
    palettes={
        "white": dict(swatch="#ffffff", K="#5b5048", A="#fbfaf7", B="#e3ddd3", N="#f4a3b4", W="#ffffff", E="#d0405a"),
        "brown": dict(swatch="#b88a62", K="#3a2a1d", A="#b88a62", B="#8f6644", N="#f4a3b4", W="#f7efe4", E="#1b1b1b"),
        "grey": dict(swatch="#9b9b9b", K="#2f2f2f", A="#a9a9a9", B="#828282", N="#f4a3b4", W="#f2f2f2", E="#1b1b1b"),
    },
    sprites=dict(
        idle=[
            "........K..K....",
            ".......KAKKAK...",
            ".......KNKKNK...",
            ".......KNKKNK...",
            ".......KAKKAK...",
            "......KAAAAAAK..",
            "......KAAAEAAK..",
            "......KAAAAANK..",
            ".....KKAAAAAK...",
            "....KAAAAAAAK...",
            "...KAAAAABAAK...",
            "..KWAAAABBAAK...",
            "..KWAAAAAAAAK...",
            "...KAAAAKAAAK...",
            "....KKKKKKKKKK..",
            "................",
        ],
    ),
)
PETS["rabbit"]["sprites"]["move1"] = PETS["rabbit"]["sprites"]["idle"]
PETS["rabbit"]["sprites"]["move2"] = PETS["rabbit"]["sprites"]["idle"]

PETS["penguin"] = dict(
    treats=["🐟"],
    label="Penguin", ar="بطريق",
    sounds=["Brrr ❄️", "🐟?", "*waddle*", "Hi!"],
    speed=0.7, bounce=1, head=7, eyes=[(9, 4)],
    palettes={
        "classic": dict(swatch="#26303a", K="#0b0f14", A="#26303a", W="#fbfbfb", Y="#f5a623", E="#0b0f14"),
        "emperor": dict(swatch="#ffd27a", K="#0b0f14", A="#2c3644", W="#fff6dc", Y="#ffb43a", E="#0b0f14"),
        "baby": dict(swatch="#b9bec4", K="#3a3f45", A="#a9afb6", W="#ffffff", Y="#3a3f45", E="#1b1b1b"),
    },
    sprites=dict(
        idle=[
            "................",
            "................",
            "......KKKK......",
            ".....KAAAAK.....",
            ".....KAAWEWK....",
            ".....KAAWWWKYY..",
            ".....KAAWWWKK...",
            "....KAAWWWWWK...",
            "...KAAAWWWWWK...",
            "...KAAAWWWWWK...",
            "..KAKAAWWWWWK...",
            "..KK.KAWWWWWK...",
            ".....KAWWWWWK...",
            ".....KAAWWWWK...",
            "......KKKKKK....",
            "......YY..YY....",
        ],
    ),
)
PETS["penguin"]["sprites"]["move1"] = PETS["penguin"]["sprites"]["idle"]
PETS["penguin"]["sprites"]["move2"] = PETS["penguin"]["sprites"]["idle"]

PETS["fish"] = dict(
    treats=["🦐"],
    label="Fish", ar="سمكة",
    sounds=["blub", "🫧", "blub blub", "..."],
    speed=0.9, bounce=0, head=0, eyes=[(11, 8)], float=True,
    palettes={
        "goldfish": dict(swatch="#ff8a2a", K="#5a2a08", A="#ff8a2a", B="#ffc04d", C="#fff1d6", E="#1b1b1b"),
        "blue-tang": dict(swatch="#2f7de1", K="#0b1d36", A="#2f7de1", B="#ffd23f", C="#0e2f5c", E="#1b1b1b"),
        "clownfish": dict(swatch="#ff7a1a", K="#1b1b1b", A="#ff7a1a", B="#1b1b1b", C="#ffffff", E="#1b1b1b"),
    },
    sprites=dict(
        idle=[
            "................",
            "................",
            "................",
            "................",
            "................",
            "........KKKK....",
            "..KK...KAAAAK...",
            "..KBK.KACAAAAK..",
            "..KBBKAACAAEAAK.",
            "...KBBAACAAAAAK.",
            "..KBBKAACAAAAK..",
            "..KBK.KACAAAK...",
            "..KK...KKKKK....",
            "................",
            "................",
            "................",
        ],
        move2=[
            "................",
            "................",
            "................",
            "................",
            "................",
            "........KKKK....",
            "....K..KAAAAK...",
            "...KBK.KACAAAAK.",
            "...KBBKACAAEAAK.",
            "..KBBBAACAAAAAK.",
            ".KBBBKAACAAAAK..",
            ".KBBK.KACAAAK...",
            ".KK....KKKKK....",
            "................",
            "................",
            "................",
        ],
    ),
)
PETS["fish"]["sprites"]["move1"] = PETS["fish"]["sprites"]["idle"]


# ---------------------------------------------------------------- derived frames
def closed_eyes(rows, eyes):
    out = [list(r) for r in rows]
    for x, y in eyes:
        out[y][x] = "K"
    return ["".join(r) for r in out]


def head_bob(rows, head):
    if not head:
        return rows
    out = [list(r) for r in rows]
    for y in range(head):
        out[y] = ["."] * 16
    for y in range(head):
        for x in range(16):
            c = rows[y][x]
            if c != "." and y + 1 < 16 and x + 1 < 16:
                out[y + 1][x + 1] = c
    return ["".join(r) for r in out]


for p in PETS.values():
    s = p["sprites"]
    s["blink"] = closed_eyes(s["idle"], p["eyes"])
    s["bob"] = head_bob(s["idle"], p["head"])
    for name, rows in s.items():
        assert len(rows) == 16 and all(len(r) == 16 for r in rows), (p["label"], name)
        used = set("".join(rows)) - {"."}
        for pal_name, pal in p["palettes"].items():
            missing = used - set(pal)
            assert not missing, (p["label"], name, pal_name, missing)
