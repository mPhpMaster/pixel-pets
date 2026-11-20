"""More cute pets + original classic characters (pirate, astronaut, chef, knight, ghost, superhero)."""
from pets_walk import lean, with_rows
from pets_anime import _walk, EYES, FACE, HAIR


def _set(rows, pts, ch):
    out = [list(r) for r in rows]
    for x, y in pts:
        out[y][x] = ch
    return ["".join(r) for r in out]


def install_pets(PETS):
    # ------------------------------------------------------------ bear cub (side walk)
    bear = [
        "................",
        "................",
        "................",
        "..........KK.KK.",
        ".........KAAKAAK",
        "........KAAAAAAK",
        "........KAAAAEAK",
        ".KKKKKKKAAAAWWWK",
        "KAAAAAAAAAAWWKK.",
        "KAAAAAAAAANAAK..",
        "KAAAAAAAAAAAK...",
        ".KAAAAAAAAAAK...",
        ".KKKKKKKKKKKK...",
    ]
    PETS["bear"] = dict(
        label="Bear Cub", ar="دبدوب", treats=["🍯", "🐟"],
        sounds={"en": ["Grr~", "🍯?", "*hug*", "♥"], "ar": ["غررر~", "🍯؟", "*حضن*", "♥"]},
        speed=0.9, bounce=1, head=7, eyes=[(13, 6)],
        palettes={
            "brown": dict(swatch="#a0703f", K="#3a2414", A="#a0703f", W="#e8c9a0", N="#ff9eb0", E="#1b1b1b"),
            "polar": dict(swatch="#f6f4ef", K="#6b6560", A="#f8f6f2", W="#ffffff", N="#ffa3b5", E="#1b1b1b"),
            "honey": dict(swatch="#e0a64a", K="#4a2c10", A="#e8b05a", W="#fff0d0", N="#ff9eb0", E="#1b1b1b"),
        },
        sprites=dict(
            idle=bear + [".KAK.....KAK....", ".KK......KK.....", "................"],
            move1=bear + ["KAK.......KAK...", "KK........KK....", "................"],
            move2=bear + ["...KAK..KAK.....", "...KK...KK......", "................"],
        ),
    )

    # ------------------------------------------------------------ corgi (side walk, short legs)
    corgi = [
        "................",
        "................",
        "................",
        "................",
        "...........K.K..",
        "..........KAKAK.",
        ".........KAAAAAK",
        ".........KAAAEAK",
        ".KAK.....KWAAWWK",
        "..KAKKKKKKWWWWK.",
        "..KAAAAAAAAANWK.",
        "..KAAAAAAAWWWK..",
        "..KKKKKKKKKKKK..",
    ]
    PETS["corgi"] = dict(
        label="Corgi", ar="كورجي", treats=["🦴", "🧀"],
        sounds={"en": ["Woof!", "*wiggles*", "🦴?", "♥"], "ar": ["هاو!", "*يهز نفسه*", "🦴؟", "♥"]},
        speed=1.15, bounce=1, head=8, eyes=[(13, 7)],
        palettes={
            "red": dict(swatch="#e8964a", K="#4a2a12", A="#e8964a", W="#ffffff", N="#ff9eb0", E="#1b1b1b"),
            "tricolor": dict(swatch="#3a3236", K="#120e10", A="#3e3539", W="#ffffff", N="#ff9eb0", E="#1b1b1b"),
            "cream": dict(swatch="#f2d7a8", K="#5a4127", A="#f2d7a8", W="#ffffff", N="#ff9eb0", E="#1b1b1b"),
        },
        sprites=dict(
            idle=corgi + ["...KWK...KWK....", "...KK....KK.....", "................"],
            move1=corgi + ["..KWK.....KWK...", "..KK......KK....", "................"],
            move2=corgi + ["....KWK.KWK.....", "....KK..KK......", "................"],
        ),
    )

    # ------------------------------------------------------------ mouse (side scurry)
    mouse = [
        "................",
        "................",
        "................",
        "................",
        "................",
        "................",
        ".........KK.....",
        "........KNNK....",
        "....KKKKKNNKK...",
        "...KAAAAAKKAAK..",
        "..KAAAAAAAAAEAK.",
        "KKAAAAAAAAAAAANK",
        "K.KAAAAAAAAAAK..",
        "...KKKKKKKKKK...",
    ]
    PETS["mouse"] = dict(
        label="Mouse", ar="فأر صغير", treats=["🧀"],
        sounds={"en": ["Squeak!", "🧀?", "*nibble*", "♥"], "ar": ["صيصي!", "🧀؟", "*يقرض*", "♥"]},
        speed=1.25, bounce=1, head=9, eyes=[(12, 10)],
        palettes={
            "grey": dict(swatch="#a3a8b0", K="#3a3d42", A="#b0b5bd", N="#ffa3b5", E="#1b1b1b"),
            "white": dict(swatch="#ffffff", K="#6b6157", A="#fdfbf7", N="#ffa3b5", E="#c0304a"),
            "brown": dict(swatch="#b08a68", K="#3a2a1d", A="#b8926e", N="#ff9eb0", E="#1b1b1b"),
        },
        sprites=dict(
            idle=mouse + ["....KNK..KNK....", "................"],
            move1=mouse + ["...KNK....KNK...", "................"],
            move2=mouse + [".....KNK.KNK....", "................"],
        ),
    )

    # ------------------------------------------------------------ unicorn (chibi: big head, big eye, pastel mane)
    uni = [
        "..........K.....",
        ".........KYK.K..",
        ".....KKKKKYKAK..",
        "....KPPAAAAAAK..",
        "...KPQPAAAAAAAK.",
        "...KPQAAAAAWEAK.",
        "...KPPAAAAAEEAK.",
        "..KPQPAAAAAANAAK",
        "..KQPKKAAAAAAAK.",
        ".KPQKKAAAAAAAK..",
        "KQPKKAAAAAAAAK..",
        "KPQKAAAAAAAAAK..",
        ".KK.KKKKKKKKKK..",
    ]
    PETS["unicorn"] = dict(
        label="Unicorn", ar="يونيكورن", treats=["🍬", "🌈"],
        sounds={"en": ["✨ Neigh~", "🌈", "Magic!", "♥"], "ar": ["✨ صهيل~", "🌈", "سحر!", "♥"]},
        speed=1.15, bounce=1, head=8, eyes=[(11, 5), (12, 5), (11, 6), (12, 6)],
        palettes={
            "classic": dict(swatch="#ff9ecb", K="#6b5a7a", A="#ffffff", P="#ff9ecb", Q="#9fd3ff", Y="#ffd84a", H="#c9b8ff", N="#ffb3c7", E="#3a2a4a", W="#ffffff"),
            "lavender": dict(swatch="#ece4ff", K="#4a3a6a", A="#ece4ff", P="#7fe0c8", Q="#ffd84a", Y="#ffd84a", H="#a78bfa", N="#ffb3c7", E="#2a1a4a", W="#ffffff"),
            "mint": dict(swatch="#dcfbe9", K="#2f5a4a", A="#dcfbe9", P="#b18cff", Q="#ff9ecb", Y="#ffd84a", H="#7fd0a8", N="#ffb3c7", E="#1a3a2a", W="#ffffff"),
        },
        sprites=dict(
            idle=uni + ["....KAK..KAK....", "....KHK..KHK....", "................"],
            move1=uni + ["...KAK....KAK...", "...KHK....KHK...", "................"],
            move2=uni + [".....KAKKAK.....", ".....KHKKHK.....", "................"],
        ),
    )

    # ------------------------------------------------------------ koala (front waddle)
    koala = [
        "................",
        ".KKK.....KKK....",
        "KAWAKKKKKAWAK...",
        "KAWAAAAAAAWAK...",
        ".KAAAAAAAAAK....",
        ".KAEAAAAAEAK....",
        ".KNAAKKKAANK....",
        ".KAAAAKAAAAK....",
        "..KAAAAAAAK.....",
        "..KAAWWWAAK.....",
        ".KAAAWWWAAAK....",
        ".KAKAWWWAKAK....",
        "..KAAAAAAAK.....",
        "..KKKKKKKKK.....",
        "...KK...KK......",
        "................",
    ]
    PETS["koala"] = dict(
        label="Koala", ar="كوالا", treats=["🌿"],
        sounds={"en": ["*sleepy*", "🌿?", "Zzz", "♥"], "ar": ["*نعسان*", "🌿؟", "ززز", "♥"]},
        speed=0.65, bounce=1, head=8, eyes=[(3, 5), (9, 5)],
        palettes={
            "grey": dict(swatch="#9aa3ad", K="#3a3f46", A="#a3acb6", W="#f4f4f4", N="#ff9eb0", E="#1b1b1b"),
            "brown": dict(swatch="#a08a74", K="#3a2a1d", A="#ab957e", W="#f4ece2", N="#ff9eb0", E="#1b1b1b"),
            "pink": dict(swatch="#f2c4d4", K="#6b3a4a", A="#f5ccda", W="#ffffff", N="#ff8fb0", E="#2a1a20"),
        },
        sprites=dict(
            idle=koala,
            move1=with_rows(lean(koala, 16, 1), {14: "....KK..........", 15: "................"}),
            move2=with_rows(lean(koala, 16, 2), {14: "..........KK....", 15: "................"}),
        ),
    )

    # ------------------------------------------------------------ owl (front, flaps wings, floats)
    owl = [
        "................",
        "................",
        "................",
        "..KK.......KK...",
        "..KAKKKKKKKAK...",
        ".KAAAAAAAAAAAK..",
        ".KAWWWAAAWWWAK..",
        ".KAWEWAYAWEWAK..",
        ".KAWWWAYAWWWAK..",
        ".KAAAAAAAAAAAK..",
        ".KBAAACCCAAABK..",
        ".KBAACCCCCAABK..",
        ".KBAACCCCCAABK..",
        "..KBAACCCAABK...",
        "...KKKKKKKKK....",
        "....YY...YY.....",
    ]
    up = _set(owl, [(0, 8), (0, 9), (14, 8), (14, 9)], "B")
    down = _set(owl, [(0, 11), (0, 12), (14, 11), (14, 12)], "B")
    PETS["owl"] = dict(
        label="Owl", ar="بومة", treats=["🫐", "🍓"],
        sounds={"en": ["Hoo hoo!", "🦉", "*blinks*", "Whoo?"], "ar": ["هوو هوو!", "🦉", "*يرمش*", "مين؟"]},
        speed=1.1, bounce=0, head=9, eyes=[(4, 7), (10, 7)], float=True,
        palettes={
            "brown": dict(swatch="#a0754f", K="#3a2414", A="#a0754f", B="#7a5536", C="#f2dfc2", W="#ffffff", Y="#f2b13a", E="#1b1b1b"),
            "snowy": dict(swatch="#f4f4f4", K="#5a6068", A="#f6f6f6", B="#cfd6dc", C="#ffffff", W="#fffbe6", Y="#3a3a3a", E="#d49a12"),
            "pink": dict(swatch="#f2a7c3", K="#5a2a3e", A="#f2a7c3", B="#d97aa0", C="#ffe6f0", W="#ffffff", Y="#ffb347", E="#2a1a20"),
        },
        sprites=dict(idle=owl, move1=up, move2=down),
    )


def install_heroes(PETS):
    # ------------------------------------------------------------ pirate
    PETS["pirate"] = dict(
        group="heroes", label="Pirate", ar="قرصان", treats=["🪙", "🍖"],
        sounds={"en": ["Arrr!", "Ahoy!", "🏴‍☠️ Treasure!", "Yo ho ho~"], "ar": ["آررر!", "أهوي!", "🏴‍☠️ كنز!", "يو هو هو~"]},
        speed=1.1, bounce=1, head=10, eyes=[(9, 6), (9, 7)],
        palettes={
            "classic": dict(swatch="#2b2b33", K="#141418", B="#2b2b33", W="#ffffff", H="#6b4a33", S="#ffe0cc", E="#2a1a10",
                            N="#ff9eb0", M="#a04050", A="#e0453a", C="#3a5a9a", L="#3a2a1a"),
            "red": dict(swatch="#c0392b", K="#1a0f0f", B="#c0392b", W="#ffd84a", H="#1f1b24", S="#ffe0cc", E="#2a1a10",
                        N="#ff9eb0", M="#a04050", A="#ffffff", C="#2b2b33", L="#3a2a1a"),
            "navy": dict(swatch="#2b3a6a", K="#0f1424", B="#2b3a6a", W="#ffd84a", H="#c97a3a", S="#ffe0cc", E="#2a1a10",
                         N="#ff9eb0", M="#a04050", A="#3a7bd5", C="#6b4a33", L="#2b1d12"),
        },
        sprites=_walk([
            "....KKKKKKK.....",
            "...KBBBBBBBK....",
            "..KBBBBWBBBBK...",
            "KKKKKKKKKKKKKKK.",
            ".KHHSSSSSSSHHK..",
            ".KHKSSSSSSSSHK..",
            ".KHSKKSSSESSHK..",
            ".KHSKKSSSESSHK..",
            ".KHSNSSSSSNSHK..",
            "..KHSSSMSSSHK...",
            "....KWAWAWK.....",
            "...KSWAWAWSK....",
            "...KCCCCCCCK....",
            "...KCCCCCCCK....",
        ], "C", "L"),
    )

    # ------------------------------------------------------------ astronaut
    PETS["astronaut"] = dict(
        group="heroes", label="Astronaut", ar="رائد فضاء", treats=["🍫", "⭐"],
        sounds={"en": ["One small step~", "🌙", "Houston?", "Zero gravity!"], "ar": ["خطوة صغيرة~", "🌙", "هيوستن؟", "انعدام الجاذبية!"]},
        speed=0.9, bounce=2, head=9, eyes=[(5, 4), (5, 5), (9, 4), (9, 5)],
        palettes={
            "white": dict(swatch="#f4f6fa", K="#2a3340", W="#f4f6fa", G="#9fd8ff", S="#ffe0cc", E="#2a1a10", N="#ff9eb0",
                          M="#a04050", A="#e0453a", B="#8a8a96"),
            "orange": dict(swatch="#ff9a3c", K="#3a2210", W="#ffa64d", G="#bfe9ff", S="#ffe0cc", E="#2a1a10", N="#ff9eb0",
                           M="#a04050", A="#2a5ad8", B="#6b6b78"),
            "pink": dict(swatch="#ffc1dc", K="#5a2a3e", W="#ffd0e4", G="#e8dcff", S="#ffe0cc", E="#2a1a10", N="#ff9eb0",
                         M="#a04050", A="#a78bfa", B="#c08aa8"),
        },
        sprites=_walk([
            "....KKKKKKK.....",
            "...KWWWWWWWK....",
            "..KWGGGGGGGWK...",
            ".KWGSSSSSSSGWK..",
            ".KWGSESSSESGWK..",
            ".KWGSESSSESGWK..",
            ".KWGSNSSSNSGWK..",
            ".KWGSSSMSSSGWK..",
            ".KWWGGGGGGGWWK..",
            "..KWWWWWWWWWK...",
            "....KWAWWWK.....",
            "...KWWWWWWWK....",
            "...KWWAAAWWK....",
            "...KWWWWWWWK....",
        ], "W", "B"),
    )

    # ------------------------------------------------------------ chef
    PETS["chef"] = dict(
        group="heroes", label="Chef", ar="طباخ", treats=["🧁", "🍳"],
        sounds={"en": ["Bon appétit!", "🍳", "Delicious!", "*chef's kiss*"], "ar": ["بالعافية!", "🍳", "لذيذ!", "*بوسة الشيف*"]},
        speed=1.0, bounce=1, head=10, eyes=EYES,
        palettes={
            "classic": dict(swatch="#ffffff", K="#3a2a1a", W="#ffffff", H="#6b4a33", S="#ffe0cc", E="#2a1a10", N="#ff9eb0",
                            M="#a04050", A="#e0453a", C="#4a4a56", L="#2b2b33"),
            "pastry": dict(swatch="#ffd6e8", K="#5a2a3e", W="#fff4fa", H="#e8b05a", S="#ffe0cc", E="#2a1a10", N="#ff9eb0",
                           M="#a04050", A="#ff8fb8", C="#c08aa8", L="#5a2a3e"),
            "bbq": dict(swatch="#2b2b33", K="#0d0d12", W="#ffffff", H="#1f1b24", S="#ffe0cc", E="#2a1a10", N="#ff9eb0",
                        M="#a04050", A="#ff8a2a", C="#2b2b33", L="#141418"),
        },
        sprites=_walk([
            "....KKKKKKK.....",
            "...KWWWWWWWK....",
            "...KWWWWWWWK....",
            "..KKKKKKKKKKK...",
            ".KHHSSSSSSSHHK..",
        ] + FACE + [
            "....KWWAWWK.....",
            "...KSWWAWWSK....",
            "...KWWWWWWWK....",
            "...KCCCCCCCK....",
        ], "C", "L"),
    )

    # ------------------------------------------------------------ knight
    PETS["knight"] = dict(
        group="heroes", label="Knight", ar="فارس", treats=["🍗", "🍎"],
        sounds={"en": ["For honor!", "⚔️", "*clank clank*", "Huzzah!"], "ar": ["من أجل الشرف!", "⚔️", "*طق طق*", "هوزا!"]},
        speed=0.95, bounce=1, head=10, eyes=EYES,
        palettes={
            "silver": dict(swatch="#c9d3df", K="#2a3340", I="#c9d3df", A="#e0453a", S="#ffe0cc", E="#2a1a10", N="#ff9eb0", M="#a04050"),
            "gold": dict(swatch="#f2c94c", K="#4a3a10", I="#f2c94c", A="#2a5ad8", S="#ffe0cc", E="#2a1a10", N="#ff9eb0", M="#a04050"),
            "dark": dict(swatch="#4a4a5c", K="#0d0d14", I="#555568", A="#a78bfa", S="#ffe0cc", E="#2a1a10", N="#ff9eb0", M="#a04050"),
        },
        sprites=_walk([
            "......KAK.......",
            "....KKKAKKK.....",
            "...KIIIIIIIK....",
            "..KIIIIIIIIIK...",
            ".KIISSSSSSSIIK..",
            ".KISSSSSSSSSIK..",
            ".KISSESSSESSIK..",
            ".KISSESSSESSIK..",
            ".KISNSSSSSNSIK..",
            "..KISSSMSSSIK...",
            "....KIIAIIK.....",
            "...KIIAAAIIK....",
            "...KIIIAIIIK....",
            "...KIIIIIIIK....",
        ], "I", "K"),
    )

    # ------------------------------------------------------------ ghost (floats, wavy tail)
    ghost = [
        "................",
        "................",
        "................",
        ".....KKKKK......",
        "...KKWWWWWKK....",
        "..KWWWWWWWWWK...",
        ".KWWWWWWWWWWWK..",
        ".KWWEWWWWWEWWK..",
        ".KWWEWWWWWEWWK..",
        ".KWNWWWMWWWNWK..",
        ".KWWWWWWWWWWWK..",
        ".KWWWWWWWWWWWK..",
        ".KWWWWWWWWWWWK..",
        ".KWWKKWWWKKWWK..",
        "..KK..KKK..KK...",
        "................",
    ]
    ghost2 = with_rows(ghost, {13: ".KWKKWWWKKWWWK..", 14: "..K..KKK..KKK..."})
    PETS["ghost"] = dict(
        group="heroes", label="Ghost", ar="شبح", treats=["🍬", "🎃"],
        sounds={"en": ["Boo!", "👻", "Ooooo~", "*floats*"], "ar": ["بخ!", "👻", "ووووو~", "*يطفو*"]},
        speed=0.9, bounce=0, head=0, eyes=[(4, 7), (4, 8), (10, 7), (10, 8)], float=True,
        palettes={
            "white": dict(swatch="#fbfbff", K="#5a5a7a", W="#fbfbff", E="#2a2a3a", N="#ffb3c7", M="#2a2a3a"),
            "mint": dict(swatch="#d9fff0", K="#2f6a5a", W="#e0fff3", E="#1a3a30", N="#ffb3c7", M="#1a3a30"),
            "lilac": dict(swatch="#eadcff", K="#5a4a8a", W="#efe4ff", E="#2a1a4a", N="#ffb3c7", M="#2a1a4a"),
        },
        sprites=dict(idle=ghost, move1=ghost, move2=ghost2),
    )

    # ------------------------------------------------------------ superhero (original: mask, cape, star)
    PETS["superhero"] = dict(
        group="heroes", label="Superhero", ar="بطل خارق", treats=["🍕", "⭐"],
        sounds={"en": ["To the rescue!", "⭐", "Hero time!", "*cape swish*"], "ar": ["للإنقاذ!", "⭐", "وقت البطولة!", "*يرفرف بالعباءة*"]},
        speed=1.5, bounce=1, head=10, eyes=EYES,
        palettes={
            "blue": dict(swatch="#2a5ad8", K="#141824", H="#2b2b33", S="#ffe0cc", E="#ffffff", N="#ff9eb0", M="#a04050",
                         A="#2a5ad8", C="#2a5ad8", Y="#ffd23f", R="#e0453a", B="#e0453a"),
            "pink": dict(swatch="#ff5aa0", K="#3a0f24", H="#ffd84a", S="#ffe0cc", E="#ffffff", N="#ff9eb0", M="#a04050",
                         A="#7a4ae0", C="#ff5aa0", Y="#ffffff", R="#7a4ae0", B="#7a4ae0"),
            "green": dict(swatch="#2fa85a", K="#0f2418", H="#5a3a2a", S="#ffe0cc", E="#ffffff", N="#ff9eb0", M="#a04050",
                          A="#1f1f24", C="#2fa85a", Y="#ffd23f", R="#1f1f24", B="#1f1f24"),
        },
        sprites=_walk(HAIR + [
            ".KHSSSSSSSSSHK..",
            ".KHSAEAAAEASHK..",
            ".KHSAEAAAEASHK..",
            ".KHSNSSSSSNSHK..",
            "..KHSSSMSSSHK...",
            "...RKCCYCCKR....",
            "..RKSCCCCCSKR...",
            "..RKCCCCCCCKR...",
            ".RRKCCCCCCCKRR..",
        ], "C", "B"),
    )
