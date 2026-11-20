"""Original cute chibi cars (side view, facing right): big round spinning wheels, exhaust puffs,
blinking headlights. Every car shares the same chibi chassis (rows 11-15)."""

BASE = dict(K="#2e2633", G="#c9efff", L="#fff3a6", R="#ff6b6b", T="#4a4a56", H="#f0f0f5", P="#e6e6e6", N="#ff9eb0")


def _pal(swatch, **kw):
    d = dict(BASE)
    d.update(kw)
    d["swatch"] = swatch
    return d


# Big 5x5 wheels at cols 1-5 and 9-13. Frame B rotates the hub marks.
WHEELS_A = [
    "KAKKKAAAAAKKKAK.",
    ".KTTTKKKKKTTTK..",
    ".KTHTK...KTHTK..",
    ".KTTTK...KTTTK..",
    "..KKK.....KKK...",
]
WHEELS_B = [
    "KAKKKAAAAAKKKAK.",
    ".KHTTKKKKKHTTK..",
    ".KTTTK...KTTTK..",
    ".KTTHK...KTTHK..",
    "..KKK.....KKK...",
]


def _car(body, body2=None):
    """body: 11 rows (0-10) ending with the car's lower body; wheels are added below."""
    b2 = list(body2 or body)
    if b2[8][0] == ".":              # exhaust puff behind the car on the second frame
        b2[8] = "P" + b2[8][1:]
    elif b2[7][0] == ".":
        b2[7] = "P" + b2[7][1:]
    return dict(idle=body + WHEELS_A, move1=body + WHEELS_A, move2=b2 + WHEELS_B)


SOUNDS = {"en": ["Beep beep!", "Vroom!", "⛽?", "Honk!"], "ar": ["بيب بيب!", "فرووم!", "⛽؟", "طوط!"]}

# common lower body (rows 6-10): headlight L as an "eye", a pink cheek N, tail light R
LOWER = [
    ".KAAAAAAAAAAAK..",
    "KAAAAAAAAAAAALK.",
    "KAAAAAAAAAAANAK.",
    "KRAAAAAAAAAAAAK.",
    "KAAAAAAAAAAAAAK.",
]


def install(PETS):
    PETS["bubble-car"] = dict(
        group="cars", label="Bubble Car", ar="سيارة فقاعة", treats=["⛽", "🧽"], sounds=SOUNDS,
        speed=1.2, bounce=1, head=0, eyes=[(13, 7)],
        palettes={
            "pink": _pal("#ff9ecb", A="#ff9ecb"),
            "mint": _pal("#8fe3c8", A="#8fe3c8"),
            "lemon": _pal("#ffe14d", A="#ffe14d"),
        },
        sprites=_car([
            "................",
            "................",
            ".....KKKKK......",
            "....KGGGGGK.....",
            "...KGGGKGGGK....",
            "..KAAAAAAAAAK...",
        ] + LOWER),
    )

    PETS["taxi"] = dict(
        group="cars", label="Taxi", ar="تاكسي", treats=["⛽", "🧽"],
        sounds={"en": ["Taxi!", "Beep beep!", "Where to?", "🚕"], "ar": ["تاكسي!", "بيب بيب!", "على وين؟", "🚕"]},
        speed=1.3, bounce=1, head=0, eyes=[(13, 7)],
        palettes={
            "yellow": _pal("#ffd23f", A="#ffd23f", B="#2b2b33"),
            "black": _pal("#34343c", A="#3a3a44", B="#ffd23f", K="#0d0d12"),
            "green": _pal("#5fd38a", A="#5fd38a", B="#ffffff"),
        },
        sprites=_car([
            "................",
            "......KBBK......",
            "....KKKKKKKK....",
            "...KGGGKKGGGK...",
            "..KGGGGKKGGGGK..",
            "..KBABABABABAK..",
        ] + LOWER),
    )

    police = [
        "................",
        "......KRCK......",
        "....KKKKKKKK....",
        "...KGGGKKGGGK...",
        "..KGGGGKKGGGGK..",
        "..KCCCCCCCCCCK..",
    ] + LOWER
    police2 = list(police)
    police2[1] = "......KCRK......"
    PETS["police-car"] = dict(
        group="cars", label="Police Car", ar="سيارة شرطة", treats=["🍩", "⛽"],
        sounds={"en": ["Wee-woo!", "Freeze! 🍩", "Beep beep!", "🚨"], "ar": ["ويوو ويوو!", "قف! 🍩", "بيب بيب!", "🚨"]},
        speed=1.5, bounce=1, head=0, eyes=[(13, 7)],
        palettes={
            "classic": _pal("#ffffff", A="#ffffff", C="#2a5ad8"),
            "night": _pal("#2f3440", A="#353b48", C="#5aa0ff", K="#0d0f14"),
            "pink": _pal("#ffd6e8", A="#ffd6e8", C="#ff5aa0"),
        },
        sprites=_car(police, police2),
    )

    PETS["race-car"] = dict(
        group="cars", label="Race Car", ar="سيارة سباق", treats=["⛽", "🏁"],
        sounds={"en": ["Vroooom!", "🏁", "Too fast!", "Zoom zoom"], "ar": ["فرووووم!", "🏁", "سريع مرة!", "زوم زوم"]},
        speed=1.8, bounce=0, head=0, eyes=[(13, 7)],
        palettes={
            "red": _pal("#e53935", A="#e53935", B="#ffffff"),
            "blue": _pal("#2f7de1", A="#2f7de1", B="#ffd23f"),
            "green": _pal("#2fa85a", A="#2fa85a", B="#ffffff"),
        },
        sprites=_car([
            "................",
            "................",
            "................",
            "KK.....KKK......",
            "KBK...KGGGK.....",
            "KBKKKKAAAAAKK...",
            ".KAAAABBBAAAAK..",
            "KAAAABBBBBAAALK.",
            "KAAAAABBBAAANAK.",
            "KRAAAAAAAAAAAAK.",
            "KAAAAAAAAAAAAAK.",
        ]),
    )

    PETS["ice-cream-van"] = dict(
        group="cars", label="Ice Cream Van", ar="شاحنة آيسكريم", treats=["🍦", "🍨"],
        sounds={"en": ["🎶 Ding-a-ling", "🍦?", "Ice cream!", "Yum~"], "ar": ["🎶 تن تن تن", "🍦؟", "آيسكريم!", "يمّي~"]},
        speed=1.0, bounce=1, head=0, eyes=[(13, 7)],
        palettes={
            "sky": _pal("#b8f0ff", A="#b8f0ff", B="#ff9ecb", W="#ff9ecb", C="#e0a35c", G="#f2fbff"),
            "pink": _pal("#ffd6e8", A="#ffd6e8", B="#8fe3ff", W="#8fe3ff", C="#e0a35c", G="#fff6fa"),
            "mint": _pal("#c8f5dc", A="#c8f5dc", B="#ffb36b", W="#fff3a6", C="#e0a35c", G="#f2fff8"),
        },
        sprites=_car([
            "......KWK.......",
            ".....KWWWK......",
            "..KKKKKCKKKKK...",
            ".KAAAAAAAAAGGK..",
            ".KAKGGKGGKAGGK..",
            ".KBABABABABABK..",
        ] + LOWER),
    )

    PETS["mini-bus"] = dict(
        group="cars", label="Mini Bus", ar="باص صغير", treats=["⛽", "🧽"],
        sounds={"en": ["All aboard!", "Beep beep!", "Next stop~", "🚌"], "ar": ["اركبوا!", "بيب بيب!", "المحطة الجاية~", "🚌"]},
        speed=0.9, bounce=1, head=0, eyes=[(13, 7)],
        palettes={
            "orange": _pal("#ffb347", A="#ffb347", B="#fff3d6"),
            "yellow": _pal("#ffd23f", A="#ffd23f", B="#2b2b33"),
            "red": _pal("#e85a4f", A="#e85a4f", B="#ffffff"),
        },
        sprites=_car([
            "................",
            ".KKKKKKKKKKKK...",
            "KAAAAAAAAAAAAK..",
            "KAGGKGGKGGGGAK..",
            "KAGGKGGKGGGGAK..",
            "KBBBBBBBBBBBBK..",
        ] + LOWER),
    )
