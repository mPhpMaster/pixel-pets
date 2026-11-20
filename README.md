# Pixel Pets 🐾

Tiny pixel-art pets that follow your cursor around the page. **Click a pet** to pick its type, color, size and speed, give it a treat, or add more pets. Inspired by [oneko.js](https://github.com/adryd325/oneko.js).

<p align="center"><img src="demo.gif" alt="Pixel Pets: cockatiel, cat, dog, sparrow, rabbit, penguin, fish"></p>

## Pets

| Pet | عربي | Colors | Treat |
|---|---|---|---|
| 🦜 Cockatiel | كوكاتيل | lutino · grey · white-face | 🌻 🍎 |
| 🐱 Cat | قطة | orange · black · grey · white | 🐟 |
| 🐶 Dog | كلب | brown · golden · husky · black | 🦴 |
| 🐦 Sparrow | عصفور | sparrow · canary · bluebird | 🌻 🍞 |
| 🐰 Rabbit | أرنب | white · brown · grey | 🥕 |
| 🐧 Penguin | بطريق | classic · emperor · baby | 🐟 |
| 🐟 Fish | سمكة | goldfish · blue-tang · clownfish | 🦐 |

Each pet moves its own way: birds flap, cats and dogs walk, the rabbit hops, the penguin waddles and the fish floats.

## Features

<img src="menu.png" align="right" width="280" alt="Pet menu">

- **Click any pet** to open its menu:
  - **Pet**: switch between the 7 animals
  - **Color**: 3–4 color variants per animal
  - **Size**: S, M, L, XL
  - **Speed**: 🐢 slow, 🚶 normal, ⚡ fast
  - **Speech**: turn the talking bubbles on or off
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
<script src="https://cdn.jsdelivr.net/gh/mPhpMaster/pixel-pets@v1.0.0/pets.js"></script>
```

To choose the starting pet, add data attributes (all optional):
```html
<script src="https://cdn.jsdelivr.net/gh/mPhpMaster/pixel-pets@v1.0.0/pets.js"
        data-pet="cat" data-color="black" data-size="L" data-speed="fast" data-talk="true"></script>
```

| Attribute | Values |
|---|---|
| `data-pet` | `cockatiel` `cat` `dog` `sparrow` `rabbit` `penguin` `fish` |
| `data-color` | see the table above |
| `data-size` | `S` `M` `L` `XL` |
| `data-speed` | `slow` `normal` `fast` |
| `data-talk` | `true` `false` |

Settings the visitor saves from the menu take priority over these defaults.

### On any page (DevTools console)
Open the console (F12), paste the full contents of [`pets.js`](pets.js), and press Enter.

### JavaScript API
```js
PixelPets.add({ type: "dog", color: "husky", size: "L" }); // add a pet
PixelPets.pets;      // current pets
PixelPets.types;     // available pet types
PixelPets.reset();   // forget saved settings
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
