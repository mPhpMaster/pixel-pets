"""Original chibi anime-style characters (no existing characters). Front view, RPG-style walk."""


def _walk(body, leg, shoe):
    idle = body + [f"....K{leg}K.K{leg}K.....", f"....K{shoe}K.K{shoe}K....."]
    m1 = body + [f"....K{leg}K.K{shoe}K.....", f"....K{shoe}K........."]
    m2 = body + [f"....K{shoe}K.K{leg}K.....", f"........K{shoe}K....."]
    return dict(idle=idle, move1=m1, move2=m2)


EYES = [(5, 6), (5, 7), (9, 6), (9, 7)]


def install(PETS):
    PETS["magical-girl"] = dict(
        group="anime", label="Magical Girl", ar="فتاة سحرية", treats=["🍡", "🍓"],
        sounds={"en": ["✨ Sparkle!", "Love & stars!", "♥", "Hehe~"], "ar": ["✨ بريق!", "حب ونجوم!", "♥", "هيهي~"]},
        speed=1.0, bounce=1, head=10, eyes=EYES,
        palettes={
            "pink": dict(swatch="#ff8fc8", K="#4a2440", H="#ff8fc8", S="#ffe3d1", E="#5a2a7a", N="#ff9eb0", M="#c0506a",
                         C="#fff4fa", c="#ffb8dc", A="#ffd84a", W="#ffffff", L="#ff6fa8"),
            "mint": dict(swatch="#7fe0c8", K="#1f4a40", H="#7fe0c8", S="#ffe3d1", E="#1f6a5a", N="#ff9eb0", M="#c0506a",
                         C="#f2fffb", c="#b8f0e0", A="#ffd84a", W="#ffffff", L="#3fbfa0"),
            "lavender": dict(swatch="#b9a2ff", K="#33245a", H="#b9a2ff", S="#ffe3d1", E="#4a2a9a", N="#ff9eb0", M="#c0506a",
                             C="#f8f4ff", c="#d9ccff", A="#ffd84a", W="#ffffff", L="#8a6fe0"),
        },
        sprites=_walk([
            "....KKKKKKK.....",
            "...KHHHHHHHK....",
            "..KHHHHHHHAHK...",
            "KKHHHHHHHHHHHKK.",
            "HKHHSSSSSSSHHKH.",
            "HKHSSSSSSSSSHKH.",
            "HKHSSESSSESSHKH.",
            "HKHSSESSSESSHKH.",
            "HKHSNSSSSSNSHKH.",
            "HHKHSSSMSSSHKHH.",
            "KH..KCCACCK..HK.",
            ".K.KSCCCCCSK.K..",
            "...KcCCCCCcK....",
            "..KcWcWcWcWcK...",
        ], "S", "L"),
    )

    PETS["ninja"] = dict(
        group="anime", label="Ninja", ar="نينجا", treats=["🍙", "🍡"],
        sounds={"en": ["Nin nin!", "*poof*", "🍙?", "Shh..."], "ar": ["نِن نِن!", "*بوف*", "🍙؟", "شششش..."]},
        speed=1.3, bounce=1, head=10, eyes=EYES,
        palettes={
            "navy": dict(swatch="#2b3550", K="#141824", C="#2b3550", A="#e0453a", S="#ffe0cc", E="#1b1b1b"),
            "shadow": dict(swatch="#2a2a2e", K="#0a0a0c", C="#2f2f35", A="#8a4fe0", S="#ffe0cc", E="#1b1b1b"),
            "snow": dict(swatch="#e8ecf2", K="#4a5260", C="#e8ecf2", A="#3a7bd5", S="#ffe0cc", E="#1b1b1b"),
        },
        sprites=_walk([
            "....KKKKKKK.....",
            "...KCCCCCCCK....",
            "..KCCCCCCCCCK...",
            ".KAAAAAAAAAAAKAA",
            ".KCCCCCCCCCCCK.A",
            ".KCSSSSSSSSSCK..",
            ".KCSSESSSESSCK..",
            ".KCSSESSSESSCK..",
            ".KCCCCCCCCCCCK..",
            "..KCCCCCCCCCK...",
            "....KCCCCCK.....",
            "...KSCCCCCSK....",
            "...KCAAAAACK....",
            "...KCCCCCCCK....",
        ], "C", "K"),
    )

    PETS["neko-girl"] = dict(
        group="anime", label="Neko Girl", ar="فتاة القطة", treats=["🐟", "🍰"],
        sounds={"en": ["Nya~", "Nyan!", "🐟?", "*purr*"], "ar": ["نيا~", "نيان!", "🐟؟", "*خرخرة*"]},
        speed=1.1, bounce=1, head=10, eyes=EYES,
        palettes={
            "orange": dict(swatch="#ffb052", K="#4a2c17", H="#ffb052", N="#ff9eb0", S="#ffe3d1", E="#2e7d5b", M="#c0506a",
                           C="#8ad0ff", W="#ffffff", L="#5a3a2a"),
            "black": dict(swatch="#2f2f38", K="#0d0d12", H="#34343e", N="#ff8fa6", S="#ffe3d1", E="#d4a017", M="#c0506a",
                          C="#ff8fb8", W="#ffffff", L="#2b2b33"),
            "white": dict(swatch="#f5f5f5", K="#6b6157", H="#fbfbfb", N="#ffa3b5", S="#ffe3d1", E="#3c7fd6", M="#c0506a",
                          C="#b9a2ff", W="#ffffff", L="#6b6157"),
        },
        sprites=_walk([
            "..KK.......KK...",
            "..KNHKKKKKHNK...",
            "..KHHHHHHHHHK...",
            ".KHHHHHHHHHHHK..",
            ".KHHSSHSHSSHHK..",
            ".KHSSSSSSSSSHK..",
            ".KHSSESSSESSHK..",
            ".KHSSESSSESSHK..",
            ".KHSNSSSSSNSHK..",
            "..KHSSSMSSSHK...",
            "....KCCCCCK.....",
            "...KSCCWCCSK....",
            "...KCCCCCCCK.KHK",
            "...KCCCCCCCKKHK.",
        ], "S", "L"),
    )

    PETS["samurai"] = dict(
        group="anime", label="Samurai", ar="ساموراي", treats=["🍵", "🍙"],
        sounds={"en": ["Hai!", "*bows*", "🍵?", "Honor!"], "ar": ["هاي!", "*ينحني*", "🍵؟", "شرف!"]},
        speed=1.0, bounce=1, head=10, eyes=EYES,
        palettes={
            "blue": dict(swatch="#3a6fb0", K="#141418", H="#2b2b33", S="#ffe0cc", E="#2a1a10", N="#ff9eb0", M="#a04050",
                         C="#3a6fb0", W="#f4f0e6", A="#e0c04a", D="#4a4a5c", L="#a07850"),
            "red": dict(swatch="#c0392b", K="#1a0f0f", H="#2b2b33", S="#ffe0cc", E="#2a1a10", N="#ff9eb0", M="#a04050",
                        C="#c0392b", W="#f4f0e6", A="#2b2b33", D="#3a3a44", L="#a07850"),
            "green": dict(swatch="#3f8f5a", K="#10180f", H="#5a3a2a", S="#ffe0cc", E="#2a1a10", N="#ff9eb0", M="#a04050",
                          C="#3f8f5a", W="#f4f0e6", A="#e0c04a", D="#5a4a3a", L="#a07850"),
        },
        sprites=_walk([
            "......KKK.......",
            ".....KHHHK......",
            "...KKKHHHKKK....",
            "..KHHHHHHHHHK...",
            ".KHHSSSSSSSHHK..",
            ".KHSSSSSSSSSHK..",
            ".KHSSESSSESSHK..",
            ".KHSSESSSESSHK..",
            ".KHSNSSSSSNSHK..",
            "..KHSSSMSSSHK...",
            "....KWCCCWK.....",
            "...KSCWCWCSK....",
            "...KAAAAAAAK....",
            "..KDDDDDDDDDK...",
        ], "D", "L"),
    )

    PETS["little-witch"] = dict(
        group="anime", label="Little Witch", ar="ساحرة صغيرة", treats=["🍬", "🎃"],
        sounds={"en": ["Abracadabra~", "✨🧹", "*giggle*", "Poof!"], "ar": ["أبرا كدابرا~", "✨🧹", "*ضحكة*", "بوف!"]},
        speed=1.0, bounce=1, head=10, eyes=[(5, 7), (5, 8), (9, 7), (9, 8)],
        palettes={
            "purple": dict(swatch="#5b3a9a", K="#221433", P="#5b3a9a", A="#ffd84a", H="#ff9b5a", S="#ffe3d1", E="#2a6a4a",
                           N="#ff9eb0", M="#c0506a", C="#4a2f7a", L="#2b1d12"),
            "midnight": dict(swatch="#2a2a33", K="#0d0d12", P="#2a2a33", A="#9fd0ff", H="#e8e8f0", S="#ffe3d1", E="#8a2a9a",
                             N="#ff9eb0", M="#c0506a", C="#33334a", L="#1a1a22"),
            "pink": dict(swatch="#e86aa8", K="#4a1a33", P="#e86aa8", A="#fff2a8", H="#ffd8a8", S="#ffe3d1", E="#6a2a8a",
                         N="#ff9eb0", M="#c0506a", C="#c04a8a", L="#4a1a33"),
        },
        sprites=_walk([
            ".........KK.....",
            "........KPPK....",
            ".......KPPPK....",
            "......KPPPPK....",
            ".KPPPPPPAPPPPPK.",
            "KPPPPPPPPPPPPPPK",
            ".KHHSSSSSSSHHK..",
            ".KHSSESSSESSHK..",
            ".KHSSESSSESSHK..",
            ".KHSNSSMSSNSHK..",
            ".KHKCCCCCCCKHK..",
            ".KHKSCCCCCSKHK..",
            "..KCCCCCCCCCK...",
            ".KCCCCCCCCCCCK..",
        ], "S", "L"),
    )


FACE = [
    ".KHSSSSSSSSSHK..",
    ".KHSSESSSESSHK..",
    ".KHSSESSSESSHK..",
    ".KHSNSSSSSNSHK..",
    "..KHSSSMSSSHK...",
]
HAIR = [
    "....KKKKKKK.....",
    "...KHHHHHHHK....",
    "..KHHHHHHHHHK...",
    ".KHHHHHHHHHHHK..",
    ".KHHSSSSSSSHHK..",
]
EARS = [  # animal ears replace the first two rows
    "..KK.......KK...",
    "..KNHKKKKKHNK...",
]


def install_more(PETS):
    PETS["kitsune"] = dict(
        group="anime", label="Kitsune", ar="كيتسونه", treats=["🍣", "🍡"],
        sounds={"en": ["Kon kon!", "🦊✨", "*tail swish*", "Hehe~"], "ar": ["كون كون!", "🦊✨", "*يهز ذيله*", "هيهي~"]},
        speed=1.15, bounce=1, head=10, eyes=EYES,
        palettes={
            "white": dict(swatch="#f6f2ea", K="#5a3a2a", H="#f3f1f8", N="#ff9eb0", S="#ffe3d1", E="#c47a12", M="#c0506a",
                          C="#ffffff", A="#e0453a", T="#ffb052", W="#ffffff", L="#e0453a"),
            "golden": dict(swatch="#ffc86b", K="#5a3517", H="#ffc86b", N="#ff9eb0", S="#ffe3d1", E="#8a3a12", M="#c0506a",
                           C="#ffffff", A="#e0453a", T="#ffc86b", W="#ffffff", L="#e0453a"),
            "shadow": dict(swatch="#3a3a44", K="#0d0d12", H="#3a3a44", N="#ff9eb0", S="#ffe3d1", E="#d4a017", M="#c0506a",
                           C="#2f2f38", A="#8a4fe0", T="#3a3a44", W="#d9ccff", L="#8a4fe0"),
        },
        sprites=_walk(EARS + HAIR[2:] + FACE + [
            "....KCCACCK.....",
            "...KSCCCCCSK.KK.",
            "...KCCAAACCKKTTK",
            "...KCCCCCCCKTTWK",
        ], "S", "L"),
    )

    PETS["shrine-maiden"] = dict(
        group="anime", label="Shrine Maiden", ar="كاهنة المعبد", treats=["🍡", "🍵"],
        sounds={"en": ["Blessings!", "*sweeps*", "⛩️", "Good luck~"], "ar": ["بركة!", "*تكنس*", "⛩️", "بالتوفيق~"]},
        speed=0.95, bounce=1, head=10, eyes=EYES,
        palettes={
            "classic": dict(swatch="#d93a3a", K="#141418", H="#1f1b24", S="#ffe3d1", E="#6a2a3a", N="#ff9eb0", M="#c0506a",
                            W="#ffffff", D="#d93a3a", L="#f4f0e6"),
            "silver": dict(swatch="#d8dbe4", K="#4a5260", H="#d8dbe4", S="#ffe3d1", E="#3a5a9a", N="#ff9eb0", M="#c0506a",
                           W="#ffffff", D="#c0392b", L="#f4f0e6"),
            "autumn": dict(swatch="#e8862a", K="#2a160c", H="#8a4a2a", S="#ffe3d1", E="#4a2a1a", N="#ff9eb0", M="#c0506a",
                           W="#ffffff", D="#e8862a", L="#f4f0e6"),
        },
        sprites=_walk([
            "....KKKKKKK.....",
            "...KHHHHHHHKWW..",
            "..KHHHHHHHHHK...",
            ".KHHHHHHHHHHHK..",
            ".KHHSSSSSSSHHK..",
        ] + FACE + [
            ".KHKWWWWWWWKHK..",
            ".KHKSWWWWWSKHK..",
            "..KDDDDDDDDDK...",
            "..KDDDDDDDDDK...",
        ], "D", "L"),
    )

    PETS["student"] = dict(
        group="anime", label="Student", ar="طالبة", treats=["🍱", "🍓"],
        sounds={"en": ["Ohayo!", "Late for school!", "📚", "Senpai?"], "ar": ["صباح الخير!", "تأخرت عالمدرسة!", "📚", "سينباي؟"]},
        speed=1.2, bounce=1, head=10, eyes=EYES,
        palettes={
            "navy": dict(swatch="#2b3a6a", K="#2a1d14", H="#6b4a33", S="#ffe3d1", E="#3a2a1a", N="#ff9eb0", M="#c0506a",
                         B="#2b3a6a", A="#e0453a", W="#ffffff", L="#2b1d12"),
            "black": dict(swatch="#26262c", K="#0d0d12", H="#1f1b24", S="#ffe3d1", E="#3a2a4a", N="#ff9eb0", M="#c0506a",
                          B="#26262c", A="#e0453a", W="#ffffff", L="#1a1a1f"),
            "green": dict(swatch="#2f6a4f", K="#2a160c", H="#c97a3a", S="#ffe3d1", E="#2a4a2a", N="#ff9eb0", M="#c0506a",
                          B="#2f6a4f", A="#ffd84a", W="#ffffff", L="#2b1d12"),
        },
        sprites=_walk(HAIR + FACE + [
            "....KBBABBK.....",
            "...KSBWWWBSK....",
            "...KBBBBBBBK....",
            "..KBBBBBBBBBK...",
        ], "S", "L"),
    )

    PETS["mecha-pilot"] = dict(
        group="anime", label="Mecha Pilot", ar="طيار روبوت", treats=["🍔", "🧃"],
        sounds={"en": ["Launching!", "Roger!", "🚀", "*beep*"], "ar": ["انطلاق!", "حاضر!", "🚀", "*بيب*"]},
        speed=1.3, bounce=1, head=10, eyes=EYES,
        palettes={
            "blue": dict(swatch="#3a7bd5", K="#141c2a", H="#3a7bd5", S="#ffe3d1", E="#1b2a4a", N="#ff9eb0", M="#c0506a",
                         A="#ff8a2a", C="#f4f6fa"),
            "red": dict(swatch="#e0453a", K="#1a0f0f", H="#e0453a", S="#ffe3d1", E="#4a1a1a", N="#ff9eb0", M="#c0506a",
                        A="#e0453a", C="#2a2a33"),
            "teal": dict(swatch="#2aa198", K="#0f2422", H="#2aa198", S="#ffe3d1", E="#14403c", N="#ff9eb0", M="#c0506a",
                         A="#ffd84a", C="#f4f6fa"),
        },
        sprites=_walk(HAIR[:4] + [
            ".AHHSSSSSSSHHA..",
            ".AHSSSSSSSSSHA..",
        ] + FACE[1:] + [
            "....KCCACCK.....",
            "...KACCCCCAK....",
            "...KCCAAACCK....",
            "...KCCCCCCCK....",
        ], "C", "A"),
    )

    PETS["dragon-princess"] = dict(
        group="anime", label="Dragon Princess", ar="أميرة التنين", treats=["🍖", "💎"],
        sounds={"en": ["Rawr~", "🔥", "Bow, peasant!", "♥"], "ar": ["راوورر~", "🔥", "انحنِ!", "♥"]},
        speed=1.0, bounce=1, head=10, eyes=EYES,
        palettes={
            "red": dict(swatch="#c0392b", K="#3a0f12", H="#c0392b", R="#ffe8b0", N="#ff9eb0", S="#ffe3d1", E="#d4a017",
                        M="#c0506a", C="#ff9ecb", A="#ffd84a", T="#c0392b", L="#ffd84a"),
            "blue": dict(swatch="#3a7bd5", K="#0f1d3a", H="#3a7bd5", R="#e8f4ff", N="#ff9eb0", S="#ffe3d1", E="#2ad4c0",
                         M="#c0506a", C="#b8e0ff", A="#ffffff", T="#3a7bd5", L="#ffffff"),
            "green": dict(swatch="#2f9a5a", K="#0f2a18", H="#2f9a5a", R="#fff2c0", N="#ff9eb0", S="#ffe3d1", E="#e0453a",
                          M="#c0506a", C="#e0ffd0", A="#ffd84a", T="#2f9a5a", L="#ffd84a"),
        },
        sprites=_walk([
            "..KK.......KK...",
            "..KRHKKKKKHRK...",
        ] + HAIR[2:] + FACE + [
            "....KCCACCK.....",
            "...KSCCCCCSK.KK.",
            "...KCCCCCCCKKTTK",
            "..KCCCCCCCCCKTK.",
        ], "S", "L"),
    )

    PETS["robot"] = dict(
        group="anime", label="Robot", ar="روبوت", treats=["🔋", "🔩"],
        sounds={"en": ["Beep boop", "01001000 01101001", "🔋?", "Hello, human!"],
                "ar": ["بيب بوب", "01001000 01101001", "🔋؟", "مرحبا يا إنسان!"]},
        speed=1.0, bounce=1, head=10, eyes=[(5, 7), (9, 7)],
        palettes={
            "silver": dict(swatch="#c9d3df", K="#2a3340", M="#c9d3df", G="#1b2a3a", E="#5af0ff", A="#ff5a7a", N="#ff9eb0"),
            "gold": dict(swatch="#f2c94c", K="#4a3a10", M="#f2c94c", G="#2a2410", E="#7dff8a", A="#ff5a7a", N="#ff9eb0"),
            "pink": dict(swatch="#ffc1dc", K="#6b2f4a", M="#ffc1dc", G="#3a1a2a", E="#ffe14d", A="#7a5af0", N="#ff9eb0"),
        },
        sprites=_walk([
            ".......K........",
            "......KAK.......",
            ".......K........",
            "..KKKKKKKKKKK...",
            ".KMMMMMMMMMMMK..",
            ".KMKKKKKKKKKMK..",
            ".KMKGGGGGGGKMK..",
            ".KMKGEGGGEGKMK..",
            ".KMKGNGGGNGKMK..",
            ".KMKKKKKKKKKMK..",
            ".KMMMMMMMMMMMK..",
            "....KMMMMMK.....",
            "...KMKAAAKMK....",
            "...KKMMMMMKK....",
        ], "M", "K"),
    )
