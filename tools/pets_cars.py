"""Original cute cars (side view, facing right). Wheels spin, exhaust puffs, headlights blink."""

BASE = dict(K="#2e2633", G="#bfe9ff", L="#fff3a6", R="#ff5a5a", T="#5a5a66", H="#f0f0f5", P="#e6e6e6")


def _pal(swatch, **kw):
    d = dict(BASE)
    d.update(kw)
    d["swatch"] = swatch
    return d


def _car(body, body2=None):
    """body: 12 rows (0-11). Adds a wheel row set; frame 2 spins the hubs and puffs exhaust."""
    def wheels(spin):
        top = ["K" if c != "." else "." for c in body[11]]
        for x in (3, 4, 5, 10, 11, 12):
            top[x] = "T"
        if spin:
            mid, low = "..KHTHK..KHTHK..", "..KTHTK..KTHTK.."
        else:
            mid, low = "..KTHTK..KTHTK..", "..KHTHK..KHTHK.."
        return ["".join(top), mid, low, "...KKK....KKK..."]

    def puff(rows):
        rows = list(rows)
        for y in (10, 11):
            if rows[y][0] == ".":
                rows[y] = "P" + rows[y][1:]
                break
        return rows

    b2 = body2 or body
    return dict(
        idle=body + wheels(False),
        move1=body + wheels(False),
        move2=puff(b2) + wheels(True),
    )


SOUNDS = {"en": ["Beep beep!", "Vroom!", "⛽?", "Honk!"], "ar": ["بيب بيب!", "فرووم!", "⛽؟", "طوط!"]}


def install(PETS):
    PETS["bubble-car"] = dict(
        group="cars", label="Bubble Car", ar="سيارة فقاعة", treats=["⛽", "🧽"], sounds=SOUNDS,
        speed=1.2, bounce=1, head=0, eyes=[(14, 8)],
        palettes={
            "pink": _pal("#ff9ecb", A="#ff9ecb"),
            "mint": _pal("#8fe3c8", A="#8fe3c8"),
            "lemon": _pal("#ffe14d", A="#ffe14d"),
        },
        sprites=_car([
            "................",
            "................",
            "................",
            "................",
            "......KKKKK.....",
            ".....KGGKGGK....",
            "....KGGGKGGGK...",
            "..KKAAAAAAAAAKK.",
            ".KAAAAAAAAAAAALK",
            ".KAAAAAAAAAAAAAK",
            ".KRAAAAAAAAAAAAK",
            ".KAAAAAAAAAAAAAK",
        ]),
    )

    PETS["taxi"] = dict(
        group="cars", label="Taxi", ar="تاكسي", treats=["⛽", "🧽"],
        sounds={"en": ["Taxi!", "Beep beep!", "Where to?", "🚕"], "ar": ["تاكسي!", "بيب بيب!", "على وين؟", "🚕"]},
        speed=1.3, bounce=1, head=0, eyes=[(14, 7)],
        palettes={
            "yellow": _pal("#ffd23f", A="#ffd23f", B="#2b2b33"),
            "black": _pal("#2f2f35", A="#34343c", B="#ffd23f", K="#0d0d12"),
            "green": _pal("#5fd38a", A="#5fd38a", B="#ffffff"),
        },
        sprites=_car([
            "................",
            "................",
            "......KBBK......",
            "....KKKKKKKK....",
            "...KGGGKKGGGK...",
            "..KGGGGKKGGGGK..",
            ".KAAAAAAAAAAAAK.",
            ".KAAAAAAAAAAAALK",
            ".KBABABABABABAAK",
            ".KRAAAAAAAAAAAAK",
            ".KAAAAAAAAAAAAAK",
            ".KAAAAAAAAAAAAAK",
        ]),
    )

    police = [
        "................",
        "................",
        "......KRCK......",
        "....KKKKKKKK....",
        "...KGGGKKGGGK...",
        "..KGGGGKKGGGGK..",
        ".KAAAAAAAAAAAAK.",
        ".KAAAAAAAAAAAALK",
        ".KCCCCCCCCCCCCAK",
        ".KRAAAAAAAAAAAAK",
        ".KAAAAAAAAAAAAAK",
        ".KAAAAAAAAAAAAAK",
    ]
    police2 = list(police)
    police2[2] = "......KCRK......"
    PETS["police-car"] = dict(
        group="cars", label="Police Car", ar="سيارة شرطة", treats=["🍩", "⛽"],
        sounds={"en": ["Wee-woo!", "Freeze! 🍩", "Beep beep!", "🚨"], "ar": ["ويوو ويوو!", "قف! 🍩", "بيب بيب!", "🚨"]},
        speed=1.5, bounce=1, head=0, eyes=[(14, 7)],
        palettes={
            "classic": _pal("#ffffff", A="#ffffff", C="#2a5ad8"),
            "night": _pal("#2b2f3a", A="#2f3440", C="#5aa0ff", K="#0d0f14"),
            "pink": _pal("#ffd6e8", A="#ffd6e8", C="#ff5aa0"),
        },
        sprites=_car(police, police2),
    )

    PETS["race-car"] = dict(
        group="cars", label="Race Car", ar="سيارة سباق", treats=["⛽", "🏁"],
        sounds={"en": ["Vroooom!", "🏁", "Too fast!", "Zoom zoom"], "ar": ["فرووووم!", "🏁", "سريع مرة!", "زوم زوم"]},
        speed=1.8, bounce=0, head=0, eyes=[(14, 10)],
        palettes={
            "red": _pal("#e53935", A="#e53935", B="#ffffff"),
            "blue": _pal("#2f7de1", A="#2f7de1", B="#ffd23f"),
            "green": _pal("#2fa85a", A="#2fa85a", B="#ffffff"),
        },
        sprites=_car([
            "................",
            "................",
            "................",
            "................",
            "................",
            "................",
            "........KK......",
            ".......KGGK.....",
            "KK....KGGGGKK...",
            "KBKKKKKAAAAAAKK.",
            "KAAAAAABBAAAAALK",
            ".KAAAAABBAAAAAAK",
        ]),
    )

    PETS["ice-cream-van"] = dict(
        group="cars", label="Ice Cream Van", ar="شاحنة آيسكريم", treats=["🍦", "🍨"],
        sounds={"en": ["🎶 Ding-a-ling", "🍦?", "Ice cream!", "Yum~"], "ar": ["🎶 تن تن تن", "🍦؟", "آيسكريم!", "يمّي~"]},
        speed=1.0, bounce=1, head=0, eyes=[(14, 7)],
        palettes={
            "sky": _pal("#b8f0ff", A="#b8f0ff", B="#ff9ecb", W="#ff9ecb", C="#e0a35c", G="#e8f6ff"),
            "pink": _pal("#ffd6e8", A="#ffd6e8", B="#8fe3ff", W="#8fe3ff", C="#e0a35c", G="#fff4fa"),
            "mint": _pal("#c8f5dc", A="#c8f5dc", B="#ffb36b", W="#fff3a6", C="#e0a35c", G="#f0fff6"),
        },
        sprites=_car([
            "................",
            "..........KWK...",
            ".........KWWWK..",
            "..KKKKKKKKKCKKK.",
            ".KAAAAAAAAAKGGGK",
            ".KAKGGKGGKAKGGGK",
            ".KAKGGKGGKAAAAAK",
            ".KAKKKKKKKAAAALK",
            ".KBABABABABABABK",
            ".KRAAAAAAAAAAAAK",
            ".KAAAAAAAAAAAAAK",
            ".KAAAAAAAAAAAAAK",
        ]),
    )

    PETS["mini-bus"] = dict(
        group="cars", label="Mini Bus", ar="باص صغير", treats=["⛽", "🧽"],
        sounds={"en": ["All aboard!", "Beep beep!", "Next stop~", "🚌"], "ar": ["اركبوا!", "بيب بيب!", "المحطة الجاية~", "🚌"]},
        speed=0.9, bounce=1, head=0, eyes=[(14, 8)],
        palettes={
            "orange": _pal("#ffb347", A="#ffb347", B="#fff3d6"),
            "yellow": _pal("#ffd23f", A="#ffd23f", B="#2b2b33"),
            "red": _pal("#e85a4f", A="#e85a4f", B="#ffffff"),
        },
        sprites=_car([
            "................",
            "................",
            "................",
            ".KKKKKKKKKKKKKK.",
            "KAAAAAAAAAAAAAAK",
            "KAGGKGGKGGKGGGAK",
            "KAGGKGGKGGKGGGAK",
            "KAAAAAAAAAAAAAAK",
            "KBBBBBBBBBBBBBLK",
            "KRAAAAAAAAAAAAAK",
            "KAAAAAAAAAAAAAAK",
            "KAAAAAAAAAAAAAAK",
        ]),
    )
