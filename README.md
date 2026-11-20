# Pixel Pets 🐾

Tiny, cute pixel-art pets that follow your cursor around the page. **Click a pet** to pick its type, color, size and speed, switch the language (English / العربية), give it a treat, or add more pets. Inspired by [oneko.js](https://github.com/adryd325/oneko.js).

<p align="center"><img src="demo.gif" alt="Pixel Pets: cat, dog, cockatiel, hamster, rabbit, panda, fox, duckling, frog, penguin, sparrow, fish"></p>

## Pets

| Pet | عربي | Colors | Treat |
|---|---|---|---|
| 🐱 Cat | قطة | orange · black · grey · white | 🐟 |
| 🐶 Dog | كلب | brown · golden · husky · black | 🦴 |
| 🦜 Cockatiel | كوكاتيل | lutino · grey · white-face | 🌻 🍎 |
| 🐹 Hamster | هامستر | golden · white · grey · cocoa | 🌻 🥜 |
| 🐰 Rabbit | أرنب | white · brown · grey | 🥕 |
| 🐼 Panda | باندا | panda · red-panda · brown | 🎋 |
| 🦊 Fox | ثعلب | red · arctic · fennec | 🍇 |
| 🐥 Duckling | بطة | yellow · white · mallard | 🍞 🌽 |
| 🐸 Frog | ضفدع | green · pink · blue | 🪰 |
| 🐧 Penguin | بطريق | classic · emperor · baby | 🐟 |
| 🐦 Sparrow | عصفور | sparrow · canary · bluebird | 🌻 🍞 |
| 🐟 Fish | سمكة | goldfish · blue-tang · clownfish | 🦐 |

Each pet moves its own way: birds flap, cats and dogs walk, the rabbit and frog hop, penguins, pandas and ducklings waddle, and the fish floats.

## Features

<img src="menu.png" align="right" width="280" alt="Pet menu">

- **Click any pet** to open its menu:
  - **Pet**: switch between the 12 animals
  - **Color**: 3–4 color variants per animal
  - **Size**: S, M, L, XL
  - **Speed**: 🐢 slow, 🚶 normal, ⚡ fast
  - **Speech**: turn the talking bubbles on or off
  - **Language**: English (default) or العربية. The menu switches to right-to-left, and the pets talk in Arabic
  - **❤️ Pet**: hearts, plus a happy little dance
  - **🍪 Treat**: drops the pet's favorite snack somewhere on the page; the pet rushes over and eats it
  - **➕ Add pet**: add more pets (each one is set up separately)
  - **🗑 Remove**: remove this pet
- **Idle life:** pets blink, dance, talk and fall asleep (`z Z`). They also get startled (`!`) when you move away.
- **Remembers you:** your pets and their settings are saved in `localStorage`.
- **Zero assets:** every sprite is drawn on a `<canvas>` from code. No images, no network requests, no `eval`, so it works on strict-CSP sites (GitHub, for example) and won't clash with the page's CSS (the pets live in a Shadow DOM).

<br clear="right">

## Usage

### On your site
```html
<script src="https://cdn.jsdelivr.net/gh/mPhpMaster/pixel-pets@v1.1.0/pets.js"></script>
```

To choose the starting pet, add data attributes (all optional):
```html
<script src="https://cdn.jsdelivr.net/gh/mPhpMaster/pixel-pets@v1.1.0/pets.js"
        data-pet="cat" data-color="black" data-size="L" data-speed="fast" data-talk="true" data-lang="en"></script>
```

| Attribute | Values |
|---|---|
| `data-pet` | `cat` `dog` `cockatiel` `hamster` `rabbit` `panda` `fox` `duckling` `frog` `penguin` `sparrow` `fish` |
| `data-color` | see the table above |
| `data-size` | `S` `M` `L` `XL` |
| `data-speed` | `slow` `normal` `fast` |
| `data-talk` | `true` `false` |
| `data-lang` | `en` (default) `ar` |

Settings the visitor saves from the menu take priority over these defaults.

### On any page (DevTools console)
Open the console (F12), paste the full contents of [`pets.js`](pets.js), and press Enter.

### JavaScript API
```js
PixelPets.add({ type: "dog", color: "husky", size: "L" }); // add a pet
PixelPets.pets;      // current pets
PixelPets.types;     // available pet types
PixelPets.setLang("ar"); // menu + speech language: "en" | "ar"
PixelPets.reset();   // forget saved pets and language
PixelPets.destroy(); // remove everything
```

## Customizing / adding pets

All the sprites are in [`tools/pets_data.py`](tools/pets_data.py) as 16×16 text grids, with one letter per palette color. Each pet has `idle`, `move1` and `move2` frames. The blink and dance frames are generated from those. To add a pet, a color, a phrase or a treat, edit that file and rebuild:

```bash
python3 tools/build.py      # writes pets.js
python3 tools/preview.py    # optional: renders every sprite to /tmp/pets_preview.png (needs Pillow)
```

## Credits
Inspired by [adryd325/oneko.js](https://github.com/adryd325/oneko.js). All pixel art here is original. See also [parrot.js](https://github.com/mPhpMaster/parrot.js), the single-cockatiel version.

## License
MIT
