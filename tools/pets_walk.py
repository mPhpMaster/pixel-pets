"""Real movement frames + extra pets. Imported at the end of pets_data.py (before derived frames).

Walk cycles are side views facing RIGHT; legs alternate between a "spread" and a "tucked" pose.
"""


def lean(rows, top, dx):
    """Shift rows[0:top] horizontally by dx (a waddle / lean)."""
    out = []
    for y, r in enumerate(rows):
        if y < top and dx:
            r = ("." * dx + r[:-dx]) if dx > 0 else (r[-dx:] + "." * -dx)
        out.append(r)
    return out


def with_rows(rows, repl):
    out = list(rows)
    for y, r in repl.items():
        out[y] = r
    return out


def install(PETS):
    # ------------------------------------------------------------ hamster: side scurry
    ham_body = [
        "................",
        "................",
        "................",
        "................",
        "..........KK....",
        "....KKKKKKNNK...",
        "...KAAAAAAAAAK..",
        "..KAAAAAAAAAAAK.",
        "..KAAAAAAAAEAAK.",
        ".KAAAAAAAAAEANK.",
        ".KAAAAAAAWWWWK..",
        ".KWWAAAAWWWWWK..",
        "..KWWWWWWWWWK...",
        "...KKKKKKKKKK...",
    ]
    PETS["hamster"]["sprites"]["move1"] = ham_body + ["..KNK.....KNK...", "................"]
    PETS["hamster"]["sprites"]["move2"] = ham_body + ["....KNK.KNK.....", "................"]
    PETS["hamster"]["bounce"] = 1

    # ------------------------------------------------------------ rabbit: crouch -> leap
    PETS["rabbit"]["sprites"]["move1"] = [
        "................",
        "................",
        "........K.K.....",
        ".......KNKNK....",
        ".......KNKNK....",
        ".......KAKAK....",
        "......KAAAAAK...",
        ".....KAAAAEAAK..",
        ".....KAAAAAAANK.",
        "...KKKAAAAAAK...",
        "..KAAAAAAAAK....",
        ".KWAAAAAAAAK....",
        ".KWAAAAAAAAAK...",
        "..KAAAABAAAAK...",
        "..KKKKKKKKKKKK..",
        "................",
    ]
    PETS["rabbit"]["sprites"]["move2"] = [
        "................",
        "................",
        "................",
        ".....KK.........",
        "....KNNK..KK....",
        ".....KNNKKAAK...",
        "......KKAAAAAK..",
        ".......KAAAEAK..",
        "...KKKKAAAAAANK.",
        ".KKAAAAAAAAAKK..",
        "KWAAAAAAAAAK....",
        "KWAAAAAAAAK.....",
        ".KKAAKKKAAK.....",
        "KAAKK...KAK.....",
        "KK.......KAK....",
        "..........KK....",
    ]
    PETS["rabbit"]["bounce"] = 3

    # ------------------------------------------------------------ panda: side walk on all fours
    panda_body = [
        "................",
        "................",
        "................",
        "........KK..KK..",
        "........KBK.KBK.",
        ".......KWWWWWWWK",
        ".......KWWWWBBWK",
        ".......KWWWWBEWK",
        ".......KWNWWWWBK",
        "..KKKKKKKWWWWWK.",
        ".KWWWWWWBBBKKK..",
        ".KWWWWWWBBBK....",
        ".KBBKKKKKBBK....",
    ]
    PETS["panda"]["sprites"]["move1"] = panda_body + ["KBK.......KBK...", "KK.........KK...", "................"]
    PETS["panda"]["sprites"]["move2"] = panda_body + ["..KBK...KBK.....", "..KK....KK......", "................"]
    PETS["panda"]["bounce"] = 1

    # ------------------------------------------------------------ fox: side walk, bushy tail
    fox_body = [
        "................",
        "................",
        ".........K..K...",
        "........KBKKBK..",
        "........KAAAAK..",
        ".......KAAAAAAK.",
        ".......KAAAAEAK.",
        ".KKK...KAAAAAAAK",
        "KAAAK..KWWWWWWBK",
        "KAAWAK..KWWWWK..",
        ".KWWAKKKKAAAK...",
        "..KKAAAAAAWWK...",
        "...KAAAAAAWWK...",
        "...KKBKKKKBKK...",
    ]
    PETS["fox"]["sprites"]["move1"] = fox_body + ["..KBK....KBK....", "..KK.....KK....."]
    PETS["fox"]["sprites"]["move2"] = fox_body + ["....KBK.KBK.....", "....KK..KK......"]
    PETS["fox"]["bounce"] = 1

    # ------------------------------------------------------------ frog: crouch -> stretched hop (front)
    fi = PETS["frog"]["sprites"]["idle"]
    PETS["frog"]["sprites"]["move1"] = fi
    PETS["frog"]["sprites"]["move2"] = fi[3:14] + [
        ".KAK......KAK...",
        ".KAK......KAK...",
        "KAAK......KAAK..",
        "KKK........KKK..",
        "................",
    ]
    PETS["frog"]["bounce"] = 2

    # ------------------------------------------------------------ penguin: waddle (lean + feet)
    pi = PETS["penguin"]["sprites"]["idle"]
    PETS["penguin"]["sprites"]["move1"] = with_rows(lean(pi, 16, -1), {15: ".....YY........."})
    PETS["penguin"]["sprites"]["move2"] = with_rows(lean(pi, 16, 1), {15: "..........YY...."})
    PETS["penguin"]["bounce"] = 1

    # ------------------------------------------------------------ duckling: waddle
    di = PETS["duckling"]["sprites"]["idle"]
    PETS["duckling"]["sprites"]["move1"] = with_rows(lean(di, 9, 1), {15: "...YY.....YY...."})
    PETS["duckling"]["sprites"]["move2"] = with_rows(di, {15: ".....YY.YY......"})
    PETS["duckling"]["bounce"] = 1

    # ============================================================ new pets (side views)
    def legs(body, a, b, idle):
        return dict(idle=body + idle, move1=body + a, move2=body + b)

    PETS["capybara"] = dict(
        label="Capybara", ar="كابيبارا", treats=["🍊", "🍉"],
        sounds={"en": ["...", "*chill*", "🍊?", "*vibing*"], "ar": ["...", "*رايق*", "🍊؟", "*مسترخي*"]},
        speed=0.6, bounce=0, head=6, eyes=[(12, 7)],
        palettes={
            "brown": dict(swatch="#b07c4f", K="#3a2414", A="#b07c4f", B="#5a3a22", N="#e8998a", E="#2a1a10"),
            "caramel": dict(swatch="#d9a066", K="#4a2f17", A="#d9a066", B="#7a5232", N="#f2a397", E="#2a1a10"),
            "cocoa": dict(swatch="#6e4a33", K="#24160c", A="#7a5238", B="#3a2416", N="#e8998a", E="#140b05"),
        },
        sprites=legs([
            "................",
            "................",
            "................",
            "................",
            "...........KK...",
            "...KKKKKKKKAAKK.",
            "..KAAAAAAAAAAAAK",
            ".KAAAAAAAAAAEAAK",
            ".KAAAAAAAAAAAAAK",
            ".KAAAAAAAAAANABK",
            ".KAAAAAAAAAAAAK.",
            ".KBAAAAAAAAAAK..",
            "..KAAAAAAAAAAK..",
            "..KKKKKKKKKKKK..",
        ], [".KBK.......KBK..", ".KK........KK..."],
           ["....KBK..KBK....", "....KK...KK....."],
           ["..KBK.....KBK...", "..KK......KK...."]),
    )

    PETS["hedgehog"] = dict(
        label="Hedgehog", ar="قنفذ", treats=["🍓", "🐛"],
        sounds={"en": ["*sniff sniff*", "🍓?", "*curls up*", "♥"], "ar": ["*يتشمم*", "🍓؟", "*يتكور*", "♥"]},
        speed=0.8, bounce=0, head=7, eyes=[(12, 9)],
        palettes={
            "brown": dict(swatch="#7a5a44", K="#3a2a1e", B="#7a5a44", b="#a07a5c", A="#f3d9b8", N="#ffa3b5", E="#1b1b1b"),
            "albino": dict(swatch="#f0e6dc", K="#7a6a5c", B="#efe4d8", b="#ffffff", A="#fff4ea", N="#ffa3b5", E="#c0304a"),
            "chocolate": dict(swatch="#4a3428", K="#1e140e", B="#4a3428", b="#6e5040", A="#e8c9a4", N="#ff9eb0", E="#140b05"),
        },
        sprites=legs([
            "................",
            "................",
            "................",
            "................",
            "................",
            ".....K.K.K......",
            "...KKbKbKbK.....",
            "..KBbBbBbBBKK...",
            ".KBBBBBBBBBAAK..",
            "KbBbBbBbBBAAEAK.",
            "KBBBBBBBBANAAAAK",
            ".KbBbBbBBAAAAKK.",
            "..KBBBBBAAAAK...",
            "...KKKKKKKKK....",
        ], ["..KAK.....KAK...", "................"],
           [".....KAK.KAK....", "................"],
           ["...KAK...KAK....", "................"]),
    )

    PETS["lamb"] = dict(
        label="Lamb", ar="خروف", treats=["🌿", "🍀"],
        sounds={"en": ["Baa~", "Meeh", "☁️", "♥"], "ar": ["ماااع~", "مييه", "☁️", "♥"]},
        speed=0.85, bounce=1, head=10, eyes=[(13, 7), (13, 8)],
        palettes={
            "white": dict(swatch="#f5c9a8", K="#5a5048", W="#ffffff", F="#f5c9a8", N="#ff8fa6", E="#2a1a10"),
            "black-face": dict(swatch="#3a3434", K="#2f2a2a", W="#f6f2ea", F="#3a3434", N="#ff8fa6", E="#ffffff"),
            "pink": dict(swatch="#ffd6e8", K="#7a4a5c", W="#ffd6e8", F="#fff0e6", N="#ff7fa0", E="#2a1a20"),
        },
        sprites=legs([
            "................",
            "................",
            "................",
            "...........KK...",
            "..........KWWK..",
            "..K.K.K..KWWWWK.",
            ".KWKWKWKKFFFFFFK",
            "KWWWWWWKKFFFFEFK",
            "KWWWWWWKFKFFFEFK",
            "KWWWWWWWKFFNFFFK",
            "KWWWWWWWWKFFFFK.",
            "KWWWWWWWWWKKKK..",
            ".KWWWWWWWWWWWK..",
            "..KWKWKWKWKWK...",
        ], ["..KFK.....KFK...", "..KK......KK...."],
           ["....KFK.KFK.....", "....KK..KK......"],
           ["...KFK...KFK....", "...KK....KK....."]),
    )

    PETS["piglet"] = dict(
        label="Piglet", ar="خنزير صغير", treats=["🍎", "🌽"],
        sounds={"en": ["Oink!", "*snort*", "🍎?", "♥"], "ar": ["أوينك!", "*خنخنة*", "🍎؟", "♥"]},
        speed=0.9, bounce=1, head=6, eyes=[(12, 7)],
        palettes={
            "pink": dict(swatch="#ffb3c7", K="#6b2f40", A="#ffb3c7", S="#e8829e", N="#ff7fa0", E="#2a1218"),
            "mud": dict(swatch="#c88a6a", K="#4a2a1a", A="#d9a080", S="#a86848", N="#ff8fa0", E="#2a1218"),
            "black": dict(swatch="#3a3236", K="#120e10", A="#453c40", S="#e8829e", N="#ff7fa0", E="#f5f5f5"),
        },
        sprites=legs([
            "................",
            "................",
            "................",
            "................",
            "..........KK....",
            "....KKKKKKSSK...",
            "...KAAAAAAAAAK..",
            ".KKAAAAAAAAAEAK.",
            ".KAAAAAAAAANASSK",
            ".KAAAAAAAAAAASSK",
            ".KAAAAAAAAAAAKK.",
            "..KAAAAAAAAAAK..",
            "..KKKKKKKKKKKK..",
        ], [".KAK.......KAK..", ".KSK.......KSK..", "................"],
           ["....KAK..KAK....", "....KSK..KSK....", "................"],
           ["..KAK.....KAK...", "..KSK.....KSK...", "................"]),
    )

    PETS["turtle"] = dict(
        label="Turtle", ar="سلحفاة", treats=["🥬", "🍓"],
        sounds={"en": ["*slow*", "🥬?", "...zzz", "♥"], "ar": ["*على مهلي*", "🥬؟", "...زززز", "♥"]},
        speed=0.45, bounce=0, head=5, eyes=[(14, 10)],
        palettes={
            "green": dict(swatch="#5fb35a", K="#1f3d1c", G="#5fb35a", g="#3e8a3c", Y="#e9d48a", A="#9fd27a", N="#ff9eb0", E="#111111"),
            "brown": dict(swatch="#b07c4f", K="#3a2414", G="#b07c4f", g="#7a5232", Y="#efd9a6", A="#c2d98a", N="#ff9eb0", E="#111111"),
            "sea": dict(swatch="#4aa3c7", K="#123547", G="#4aa3c7", g="#2a6f8f", Y="#f1e3b8", A="#8fd3b0", N="#ff9eb0", E="#111111"),
        },
        sprites=legs([
            "................",
            "................",
            "................",
            "................",
            "................",
            "................",
            "....KKKKKK......",
            "...KGGgGGGK.....",
            "..KGgGGGgGGK.KK.",
            ".KGGGGgGGGGKKAAK",
            ".KGgGGGGgGGKAAEK",
            "KYYYYYYYYYYKAANK",
            ".KKKKKKKKKKKKKK.",
        ], ["KAK.......KAK...", "KK........KK....", "................"],
           ["..KAK...KAK.....", "..KK....KK......", "................"],
           [".KAK......KAK....", ".KK.......KK.....", "................"][:2] + ["................"]),
    )
    # fix turtle idle legs width (16)
    PETS["turtle"]["sprites"]["idle"] = PETS["turtle"]["sprites"]["idle"][:13] + [".KAK......KAK...", ".KK.......KK....", "................"]
