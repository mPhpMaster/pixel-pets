"""Original cute flying things (facing right): plane, jet, rocket, flying saucer, helicopter.
They all float; moving frames spin propellers/rotors, flicker flames or cycle lights."""


def _pal(swatch, **kw):
    d = dict(K="#2a2438", G="#c9efff", W="#ffffff", P="#e6e6e6", N="#ff9eb0", E="#1b1b1b")
    d.update(kw)
    d["swatch"] = swatch
    return d


def _set(rows, pts, ch):
    out = [list(r) for r in rows]
    for x, y in pts:
        out[y][x] = ch
    return ["".join(r) for r in out]


def install(PETS):
    # ------------------------------------------------------------ propeller plane
    plane = [
        "................",
        "................",
        "................",
        "................",
        "..KK............",
        "..KAK....KKK....",
        "..KAAK..KGGGK..K",
        "..KAAAKKKGGGKK.K",
        ".KAAAAAAAAAAAAKK",
        ".KBAAAAAAAAALAKK",
        ".KAAAAAAAAAANAKK",
        "..KKKKWWWWKKKK.K",
        "....KWWWWWWK...K",
        ".....KKKKKK.....",
        "................",
        "................",
    ]
    prop_a = _set(plane, [(15, 6), (15, 7), (15, 11), (15, 12)], "Q")
    prop_b = _set(_set(plane, [(15, 6), (15, 7), (15, 11), (15, 12)], "."), [], "Q")
    PETS["plane"] = dict(
        group="sky", label="Plane", ar="طيارة", treats=["⛽", "☁️"],
        sounds={"en": ["Wheee!", "✈️", "Up, up!", "Brrrrr"], "ar": ["ويييي!", "✈️", "لفوق!", "بررررر"]},
        speed=1.4, bounce=0, head=0, eyes=[(12, 9)], float=True,
        palettes={
            "red": _pal("#ff6b6b", A="#ff6b6b", B="#ffffff", L="#fff3a6", Q="#8a8a96"),
            "sky": _pal("#7cc4ff", A="#7cc4ff", B="#ffd23f", L="#fff3a6", Q="#8a8a96"),
            "lemon": _pal("#ffe14d", A="#ffe14d", B="#ff6b6b", L="#ffffff", Q="#8a8a96"),
        },
        sprites=dict(idle=prop_a, move1=prop_a, move2=prop_b),
    )

    # ------------------------------------------------------------ jet
    jet = [
        "................",
        "................",
        "................",
        "................",
        "................",
        "..K.............",
        "..KK............",
        "..KAK......KK...",
        ".KAAAKKKKKKGGK..",
        "KAAAAAAAAAAAAAK.",
        "KBBBBBBBBBBBNAAK",
        ".KAAAAAAAAAAAAK.",
        "....KWWWWK......",
        ".....KKKK.......",
        "................",
        "................",
    ]
    jet2 = _set(jet, [(0, 9)], "P")
    jet2 = _set(jet2, [(0, 10)], "P")
    PETS["jet"] = dict(
        group="sky", label="Jet", ar="طيارة نفاثة", treats=["⛽", "☁️"],
        sounds={"en": ["Whoooosh!", "✈️", "Mach 1!", "Zoom!"], "ar": ["ووووش!", "✈️", "سرعة الصوت!", "زووم!"]},
        speed=1.9, bounce=0, head=0, eyes=[(12, 10)], float=True,
        palettes={
            "white": _pal("#f2f5fa", A="#f2f5fa", B="#2f7de1"),
            "grey": _pal("#9aa5b1", A="#aab4bf", B="#ffd23f"),
            "pink": _pal("#ffc1dc", A="#ffc1dc", B="#a78bfa"),
        },
        sprites=dict(idle=jet, move1=jet, move2=jet2),
    )

    # ------------------------------------------------------------ rocket (flame flickers)
    rocket = [
        "................",
        "................",
        "................",
        "................",
        "...KK...........",
        "...KBK...KKKK...",
        "...KBBKKKAAAAKK.",
        "...KAAAAAAGGAAAK",
        "...KAAAAAAGGAANK",
        "...KAAAAAAAAAAK.",
        "...KBBKKKKKKKK..",
        "...KBK..........",
        "...KK...........",
        "................",
        "................",
        "................",
    ]
    flame_a = _set(_set(rocket, [(2, 7), (2, 8), (1, 7), (1, 8)], "F"), [(2, 7), (2, 8)], "Y")
    flame_a = _set(flame_a, [(0, 8)], "F")
    flame_b = _set(_set(rocket, [(2, 7), (2, 8), (1, 8), (1, 9), (2, 9)], "F"), [(2, 8)], "Y")
    flame_b = _set(flame_b, [(0, 7), (0, 9)], "F")
    idle = _set(rocket, [(2, 7), (2, 8)], "F")
    PETS["rocket"] = dict(
        group="sky", label="Rocket", ar="صاروخ", treats=["⛽", "⭐"],
        sounds={"en": ["3, 2, 1... 🚀", "To the moon!", "⭐", "Whoosh!"], "ar": ["3، 2، 1... 🚀", "على القمر!", "⭐", "ووووش!"]},
        speed=2.0, bounce=0, head=0, eyes=[(10, 7)], float=True,
        palettes={
            "classic": _pal("#f2f5fa", A="#f2f5fa", B="#e53935", N="#e53935", F="#ff8a2a", Y="#ffe14d"),
            "pastel": _pal("#ffc1dc", A="#ffc1dc", B="#7cc4ff", N="#7cc4ff", F="#ff8a2a", Y="#ffe14d"),
            "space": _pal("#6a5acd", A="#7b6be0", B="#ffd23f", N="#ffd23f", F="#5af0ff", Y="#ffffff"),
        },
        sprites=dict(idle=idle, move1=flame_a, move2=flame_b),
    )

    # ------------------------------------------------------------ flying saucer (little alien, rim lights cycle)
    ufo = [
        "................",
        "................",
        ".....KKKKK......",
        "....KGGZGGK.....",
        "...KGZEZEZGK....",
        "...KGZZZZZGK....",
        ".KKKKKKKKKKKKK..",
        "KAAAAAAAAAAAAAK.",
        "KALAALAALAALAAK.",
        ".KAAAAAAAAAAAK..",
        "..KKKKKKKKKKK...",
        "....KBBBBBK.....",
        ".....KKKKK......",
        "................",
        "................",
        "................",
    ]
    ufo_b = list(ufo)
    ufo_b[8] = "KAALAALAALAALAK."
    beam = list(ufo_b)
    PETS["ufo"] = dict(
        group="sky", label="Flying Saucer", ar="صحن طائر", treats=["⭐", "🛸"],
        sounds={"en": ["Bleep bloop!", "👽 Hello earthling!", "Take me to your cookies 🍪", "⭐"],
                "ar": ["بليب بلوب!", "👽 مرحبا يا أرضي!", "ودّني للكوكيز 🍪", "⭐"]},
        speed=1.3, bounce=0, head=0, eyes=[(6, 4), (8, 4)], float=True,
        palettes={
            "silver": _pal("#c9d3df", A="#c9d3df", B="#9aa5b1", L="#ffe14d", Z="#7ddc6b", G="#d8f6ff"),
            "purple": _pal("#a78bfa", A="#a78bfa", B="#7c5fe0", L="#5af0ff", Z="#ff9ecb", G="#efe8ff"),
            "mint": _pal("#8fe3c8", A="#8fe3c8", B="#5ac8a8", L="#ff6b6b", Z="#ffd23f", G="#eafff8"),
        },
        sprites=dict(idle=ufo, move1=ufo, move2=beam),
    )

    # ------------------------------------------------------------ helicopter (rotor + tail rotor spin)
    heli = [
        "................",
        "................",
        "................",
        ".......KK.......",
        ".....KKKKKK.....",
        "....KAAAAGGK....",
        "B..KAAAAAGGGK...",
        "KKKKAAAAAAGGGK..",
        "B.KAAAAAAAAANAK.",
        "...KAAAAAAAAAK..",
        "....KKKKKKKKK...",
        ".....K....K.....",
        "...KKKKKKKKKK...",
        "................",
        "................",
        "................",
    ]
    rotor_a = _set(heli, [(x, 2) for x in range(1, 15)], "K")
    rotor_b = _set(_set(heli, [(x, 2) for x in range(5, 11)], "K"), [(0, 6), (0, 8)], ".")
    rotor_b = _set(rotor_b, [(0, 7)], "B")
    PETS["helicopter"] = dict(
        group="sky", label="Helicopter", ar="هليكوبتر", treats=["⛽", "☁️"],
        sounds={"en": ["Whup whup whup", "🚁", "Hover mode!", "Over here!"], "ar": ["فب فب فب", "🚁", "وضع التحليق!", "هنا!"]},
        speed=1.2, bounce=0, head=0, eyes=[(11, 8)], float=True,
        palettes={
            "orange": _pal("#ffb347", A="#ffb347", B="#4a4a56"),
            "blue": _pal("#7cc4ff", A="#7cc4ff", B="#4a4a56"),
            "green": _pal("#8fd36a", A="#8fd36a", B="#4a4a56"),
        },
        sprites=dict(idle=rotor_a, move1=rotor_a, move2=rotor_b),
    )
