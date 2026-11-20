// Pixel Pets: pixel-art pets that follow your cursor. Click a pet to customize it.
// https://github.com/mPhpMaster/pixel-pets (inspired by oneko.js)
// Self-contained: no images, no network, no eval. Works on strict-CSP pages too.
(function pixelPets() {
  "use strict";
  if (window.PixelPets && window.PixelPets.root) return;

  const PETS = {"cockatiel":{"treats":["🌻","🍎"],"label":"Cockatiel","ar":"كوكاتيل","sounds":["السلام عليكم","امواححح","🎶","Peace be upon you","Mwahhh"],"speed":1.2,"bounce":0,"palettes":{"lutino":{"swatch":"#fbe36a","K":"#4a4030","W":"#fbf7e8","w":"#e8dfbf","Y":"#fbe36a","y":"#f0cf3a","O":"#f5893a","E":"#b3202a","P":"#f2b5a5","G":"#efe2a0"},"grey":{"swatch":"#8f8f8f","K":"#2e2a26","W":"#a3a3a3","w":"#7c7c7c","Y":"#fff1a8","y":"#d9c76a","O":"#f5893a","E":"#1b1b1b","P":"#a59a8e","G":"#6d6d6d"},"white-face":{"swatch":"#ffffff","K":"#2e2a26","W":"#9a9a9a","w":"#777777","Y":"#ffffff","y":"#e6e6e6","O":"#ffffff","E":"#1b1b1b","P":"#a59a8e","G":"#666666"}},"sprites":{"idle":["........KK......","........KyK.....",".........KyK....","......KKKYyK....",".....KYYYYYYK...",".....KYYYYEYYK..",".....KYYYOOYPPK.",".....KWYYOOYKPK.",".....KWWYYYKK...","....KWWWWWWK....","....KWWwWWWK....","...KWWwwWWWK....","...KWwwwWWK.....","..KGwKPKKPK.....",".KGGK.P..P......","KGK............."],"move1":["................","......KK........",".....KWwK.......",".....KWWwK...KK.","......KWWwK.KyK.","......KWWWKKYYYK",".......KWWKYYEYK","....KKKKWWWYOOPK","..KKWWWWWWWWYKPK","KKGGWWWWWWWWKK..","KGGWWKKKWWWK....",".KGGK...KKK.....","..KK............","................","................","................"],"move2":["................","................","................",".............KK.","............KyK.","...........KYYYK","..........KYYEYK","....KKKKKKWYOOPK","..KKWWWWWWWWYKPK","KKGGWWWwwWWWKK..","KGGWWKWWwwKK....",".KGGK.KWwwwK....","..KK...KWwwK....",".......KWwK.....","........KK......","................"],"blink":["........KK......","........KyK.....",".........KyK....","......KKKYyK....",".....KYYYYYYK...",".....KYYYYKYYK..",".....KYYYOOYPPK.",".....KWYYOOYKPK.",".....KWWYYYKK...","....KWWWWWWK....","....KWWwWWWK....","...KWWwwWWWK....","...KWwwwWWK.....","..KGwKPKKPK.....",".KGGK.P..P......","KGK............."],"bob":["................",".........KK.....",".........KyK....","..........KyK...",".......KKKYyK...","......KYYYYYYK..","......KYYYYEYYK.","......KYYYOOYPPK",".....KKWYYOOYKPK","....KWWWWWWK....","....KWWwWWWK....","...KWWwwWWWK....","...KWwwwWWK.....","..KGwKPKKPK.....",".KGGK.P..P......","KGK............."]}},"cat":{"treats":["🐟"],"label":"Cat","ar":"قطة","sounds":["Meow","مياو","Purr~","😺","Mrrp?"],"speed":1.0,"bounce":0,"palettes":{"orange":{"swatch":"#f0a04b","K":"#3b2a1e","A":"#f0a04b","B":"#c96f22","N":"#f4a3a8","E":"#2a7a3b"},"black":{"swatch":"#2b2b2b","K":"#0e0e0e","A":"#2f2f35","B":"#1c1c20","N":"#e88f9a","E":"#e8c42b"},"grey":{"swatch":"#9aa0a6","K":"#33363a","A":"#9aa0a6","B":"#6f757b","N":"#f4a3a8","E":"#3b8ed6"},"white":{"swatch":"#f7f5f0","K":"#5a534a","A":"#f7f5f0","B":"#dcd6ca","N":"#f4a3a8","E":"#3b8ed6"}},"sprites":{"idle":["................","................","........K....K..",".......KAK..KAK.",".......KANKKKNAK",".......KAAAAAAAK",".......KAEAAEAAK",".......KAAANAAAK","..KK....KAAAAAK.",".KAK....KAAAAK..",".KAK...KAABAAAK.","..KAK..KAAABAAK.","...KAKKAAAABAAK.","....KAAAAAAABAK.",".....KAKKAAKAAK.","......KK.KKKKK.."],"move1":["................","................","................","................","...........K.K..",".K........KAKAK.","KAK.......KAAAAK","KAK.......KAAEAK",".KAK..KKKKKAAANK","..KAKKAAAAAAAAK.","...KAAAABAABAAK.","...KAAAABAABAK..","...KAAAAAAAAAK..","...KKAKKKKKAKK..","..KAK......KAK..","..KK.......KK..."],"move2":["................","................","................","................","...........K.K..","..........KAKAK.",".K........KAAAAK","KAK.......KAAEAK","KAK...KKKKKAAANK",".KAKKKAAAAAAAAK.","..KKAAAABAABAAK.","...KAAAABAABAK..","...KAAAAAAAAAK..","...KKAKKKKKAKK..","....KAK..KAK....","....KK...KK....."],"blink":["................","................","........K....K..",".......KAK..KAK.",".......KANKKKNAK",".......KAAAAAAAK",".......KAKAAKAAK",".......KAAANAAAK","..KK....KAAAAAK.",".KAK....KAAAAK..",".KAK...KAABAAAK.","..KAK..KAAABAAK.","...KAKKAAAABAAK.","....KAAAAAAABAK.",".....KAKKAAKAAK.","......KK.KKKKK.."],"bob":["................","................","................",".........K....K.","........KAK..KAK","........KANKKKNA","........KAAAAAAA","........KAEAAEAA","..KK....KAAANAAA",".KAK....KAAAAK..",".KAK...KAABAAAK.","..KAK..KAAABAAK.","...KAKKAAAABAAK.","....KAAAAAAABAK.",".....KAKKAAKAAK.","......KK.KKKKK.."]}},"dog":{"treats":["🦴"],"label":"Dog","ar":"كلب","sounds":["Woof!","هاو!","Arf arf","🦴?","*wags*"],"speed":1.1,"bounce":0,"palettes":{"brown":{"swatch":"#a8703f","K":"#2b1d12","A":"#a8703f","B":"#6e4423","W":"#ecd9bd","N":"#1b1b1b","E":"#1b1b1b"},"golden":{"swatch":"#e8b860","K":"#4a3418","A":"#e8b860","B":"#c48a35","W":"#fbefd5","N":"#2b1d12","E":"#2b1d12"},"husky":{"swatch":"#7d8790","K":"#1f2328","A":"#7d8790","B":"#3f464d","W":"#f4f4f4","N":"#1b1b1b","E":"#4aa3e0"},"black":{"swatch":"#26262a","K":"#000000","A":"#2a2a2f","B":"#141416","W":"#c79a6b","N":"#000000","E":"#c79a6b"}},"sprites":{"idle":["................","................",".......KKKK.....","......KAAAAK....",".....KBAAAEAKK..",".....KBAAAAAAAK.",".....KBKAAAAANK.","......KKAAAAKK..",".......KAAAAK...","..K....KAWAAK...",".KAK..KAWWAAK...",".KAK..KAWWAAK...","..KAK.KAAAAAAK..","...KAKAAAKAAAK..","....KAAAKKAAK...",".....KKKK.KKK..."],"move1":["................","................","................","..........KKKK..",".........KAAAAK.",".........KBAEAAK",".K.......KBAAAAN","KAK......KBKAAK.",".KAK.KKKKKKAAK..","..KAKAAAAAAAAK..","...KAAAAAAAAAK..","...KAAAAAAWWAK..","...KKAKKKKKAKK..","..KAK......KAK..","..KK.......KK...","................"],"move2":["................","................","................","..........KKKK..",".........KAAAAK.",".........KBAEAAK","K........KBAAAAN","KAK......KBKAAK.",".KAK.KKKKKKAAK..","..KAKAAAAAAAAK..","...KAAAAAAAAAK..","...KAAAAAAWWAK..","...KKAKKKKKAKK..","....KAK..KAK....","....KK...KK.....","................"],"blink":["................","................",".......KKKK.....","......KAAAAK....",".....KBAAAKAKK..",".....KBAAAAAAAK.",".....KBKAAAAANK.","......KKAAAAKK..",".......KAAAAK...","..K....KAWAAK...",".KAK..KAWWAAK...",".KAK..KAWWAAK...","..KAK.KAAAAAAK..","...KAKAAAKAAAK..","....KAAAKKAAK...",".....KKKK.KKK..."],"bob":["................","................","................","........KKKK....",".......KAAAAK...","......KBAAAEAKK.","......KBAAAAAAAK","......KBKAAAAANK",".......KKAAAAKK.","..K....KAWAAK...",".KAK..KAWWAAK...",".KAK..KAWWAAK...","..KAK.KAAAAAAK..","...KAKAAAKAAAK..","....KAAAKKAAK...",".....KKKK.KKK..."]}},"sparrow":{"treats":["🌻","🍞"],"label":"Sparrow","ar":"عصفور","sounds":["Tweet!","تويت","🎶","Chirp chirp"],"speed":1.3,"bounce":0,"palettes":{"sparrow":{"swatch":"#9a6a3c","K":"#2b2016","A":"#9a6a3c","C":"#efe6d4","B":"#d8c7a8","D":"#5e3e22","Y":"#3a3a3a","N":"#c9a08a","E":"#111111"},"canary":{"swatch":"#ffd83d","K":"#4a3a10","A":"#ffd83d","C":"#fff3a6","B":"#ffe57a","D":"#e0a800","Y":"#f0a868","N":"#f0a868","E":"#111111"},"bluebird":{"swatch":"#3d8fe0","K":"#13263d","A":"#3d8fe0","C":"#f2b07a","B":"#f6c79c","D":"#1f5a9e","Y":"#2b2b2b","N":"#5b5b5b","E":"#111111"}},"sprites":{"idle":["................","................","................","................","................","................","......KKKK......",".....KAAAAK.....",".....KAAAEAKK...",".....KCCAAAKYK..","...KKDCCCCKK....","..KDDDBBBBK.....",".KDDDBBBBBK.....","KDDKKBBBBK......","KK....KKKK......","......N.N......."],"move1":["................","................","................","....KK..........","...KDDK.........","...KDDDK........","....KDDDK..KKK..",".....KDDDKKAAAK.","......KDDKAAEAKK","..KKKKKBBBCCAKYK","KKDDBBBBBBBCKK..",".KKDKKBBBBKK....","....KKKKKK......","................","................","................"],"move2":["................","................","................","................","................","................","...........KKK..","..........KAAAK.",".........KAAEAKK","..KKKKKKKKBCCAKY","KKDDBBBBDDDDKK..",".KKDKKBKDDDDK...","....KKKKDDDK....","........KDDK....",".........KK.....","................"],"blink":["................","................","................","................","................","................","......KKKK......",".....KAAAAK.....",".....KAAAKAKK...",".....KCCAAAKYK..","...KKDCCCCKK....","..KDDDBBBBK.....",".KDDDBBBBBK.....","KDDKKBBBBK......","KK....KKKK......","......N.N......."],"bob":["................","................","................","................","................","................","................",".......KKKK.....","......KAAAAK....","......KAAAEAKK..","...KKDKCCAAAKYK.","..KDDDBBBBK.....",".KDDDBBBBBK.....","KDDKKBBBBK......","KK....KKKK......","......N.N......."]}},"rabbit":{"treats":["🥕"],"label":"Rabbit","ar":"أرنب","sounds":["*nom nom*","🥕?","♥","*thump*"],"speed":1.0,"bounce":3,"palettes":{"white":{"swatch":"#ffffff","K":"#5b5048","A":"#fbfaf7","B":"#e3ddd3","N":"#f4a3b4","W":"#ffffff","E":"#d0405a"},"brown":{"swatch":"#b88a62","K":"#3a2a1d","A":"#b88a62","B":"#8f6644","N":"#f4a3b4","W":"#f7efe4","E":"#1b1b1b"},"grey":{"swatch":"#9b9b9b","K":"#2f2f2f","A":"#a9a9a9","B":"#828282","N":"#f4a3b4","W":"#f2f2f2","E":"#1b1b1b"}},"sprites":{"idle":["........K..K....",".......KAKKAK...",".......KNKKNK...",".......KNKKNK...",".......KAKKAK...","......KAAAAAAK..","......KAAAEAAK..","......KAAAAANK..",".....KKAAAAAK...","....KAAAAAAAK...","...KAAAAABAAK...","..KWAAAABBAAK...","..KWAAAAAAAAK...","...KAAAAKAAAK...","....KKKKKKKKKK..","................"],"move1":["........K..K....",".......KAKKAK...",".......KNKKNK...",".......KNKKNK...",".......KAKKAK...","......KAAAAAAK..","......KAAAEAAK..","......KAAAAANK..",".....KKAAAAAK...","....KAAAAAAAK...","...KAAAAABAAK...","..KWAAAABBAAK...","..KWAAAAAAAAK...","...KAAAAKAAAK...","....KKKKKKKKKK..","................"],"move2":["........K..K....",".......KAKKAK...",".......KNKKNK...",".......KNKKNK...",".......KAKKAK...","......KAAAAAAK..","......KAAAEAAK..","......KAAAAANK..",".....KKAAAAAK...","....KAAAAAAAK...","...KAAAAABAAK...","..KWAAAABBAAK...","..KWAAAAAAAAK...","...KAAAAKAAAK...","....KKKKKKKKKK..","................"],"blink":["........K..K....",".......KAKKAK...",".......KNKKNK...",".......KNKKNK...",".......KAKKAK...","......KAAAAAAK..","......KAAAKAAK..","......KAAAAANK..",".....KKAAAAAK...","....KAAAAAAAK...","...KAAAAABAAK...","..KWAAAABBAAK...","..KWAAAAAAAAK...","...KAAAAKAAAK...","....KKKKKKKKKK..","................"],"bob":["................",".........K..K...","........KAKKAK..","........KNKKNK..","........KNKKNK..","........KAKKAK..",".......KAAAAAAK.",".......KAAAEAAK.",".....KKKAAAAANK.","....KAAAAAAAK...","...KAAAAABAAK...","..KWAAAABBAAK...","..KWAAAAAAAAK...","...KAAAAKAAAK...","....KKKKKKKKKK..","................"]}},"penguin":{"treats":["🐟"],"label":"Penguin","ar":"بطريق","sounds":["Brrr ❄️","🐟?","*waddle*","Hi!"],"speed":0.7,"bounce":1,"palettes":{"classic":{"swatch":"#26303a","K":"#0b0f14","A":"#26303a","W":"#fbfbfb","Y":"#f5a623","E":"#0b0f14"},"emperor":{"swatch":"#ffd27a","K":"#0b0f14","A":"#2c3644","W":"#fff6dc","Y":"#ffb43a","E":"#0b0f14"},"baby":{"swatch":"#b9bec4","K":"#3a3f45","A":"#a9afb6","W":"#ffffff","Y":"#3a3f45","E":"#1b1b1b"}},"sprites":{"idle":["................","................","......KKKK......",".....KAAAAK.....",".....KAAWEWK....",".....KAAWWWKYY..",".....KAAWWWKK...","....KAAWWWWWK...","...KAAAWWWWWK...","...KAAAWWWWWK...","..KAKAAWWWWWK...","..KK.KAWWWWWK...",".....KAWWWWWK...",".....KAAWWWWK...","......KKKKKK....","......YY..YY...."],"move1":["................","................","......KKKK......",".....KAAAAK.....",".....KAAWEWK....",".....KAAWWWKYY..",".....KAAWWWKK...","....KAAWWWWWK...","...KAAAWWWWWK...","...KAAAWWWWWK...","..KAKAAWWWWWK...","..KK.KAWWWWWK...",".....KAWWWWWK...",".....KAAWWWWK...","......KKKKKK....","......YY..YY...."],"move2":["................","................","......KKKK......",".....KAAAAK.....",".....KAAWEWK....",".....KAAWWWKYY..",".....KAAWWWKK...","....KAAWWWWWK...","...KAAAWWWWWK...","...KAAAWWWWWK...","..KAKAAWWWWWK...","..KK.KAWWWWWK...",".....KAWWWWWK...",".....KAAWWWWK...","......KKKKKK....","......YY..YY...."],"blink":["................","................","......KKKK......",".....KAAAAK.....",".....KAAWKWK....",".....KAAWWWKYY..",".....KAAWWWKK...","....KAAWWWWWK...","...KAAAWWWWWK...","...KAAAWWWWWK...","..KAKAAWWWWWK...","..KK.KAWWWWWK...",".....KAWWWWWK...",".....KAAWWWWK...","......KKKKKK....","......YY..YY...."],"bob":["................","................","................",".......KKKK.....","......KAAAAK....","......KAAWEWK...","......KAAWWWKYY.","....KAKAAWWWKK..","...KAAAWWWWWK...","...KAAAWWWWWK...","..KAKAAWWWWWK...","..KK.KAWWWWWK...",".....KAWWWWWK...",".....KAAWWWWK...","......KKKKKK....","......YY..YY...."]}},"fish":{"treats":["🦐"],"label":"Fish","ar":"سمكة","sounds":["blub","🫧","blub blub","..."],"speed":0.9,"bounce":0,"float":true,"palettes":{"goldfish":{"swatch":"#ff8a2a","K":"#5a2a08","A":"#ff8a2a","B":"#ffc04d","C":"#fff1d6","E":"#1b1b1b"},"blue-tang":{"swatch":"#2f7de1","K":"#0b1d36","A":"#2f7de1","B":"#ffd23f","C":"#0e2f5c","E":"#1b1b1b"},"clownfish":{"swatch":"#ff7a1a","K":"#1b1b1b","A":"#ff7a1a","B":"#1b1b1b","C":"#ffffff","E":"#1b1b1b"}},"sprites":{"idle":["................","................","................","................","................","........KKKK....","..KK...KAAAAK...","..KBK.KACAAAAK..","..KBBKAACAAEAAK.","...KBBAACAAAAAK.","..KBBKAACAAAAK..","..KBK.KACAAAK...","..KK...KKKKK....","................","................","................"],"move2":["................","................","................","................","................","........KKKK....","....K..KAAAAK...","...KBK.KACAAAAK.","...KBBKACAAEAAK.","..KBBBAACAAAAAK.",".KBBBKAACAAAAK..",".KBBK.KACAAAK...",".KK....KKKKK....","................","................","................"],"move1":["................","................","................","................","................","........KKKK....","..KK...KAAAAK...","..KBK.KACAAAAK..","..KBBKAACAAEAAK.","...KBBAACAAAAAK.","..KBBKAACAAAAK..","..KBK.KACAAAK...","..KK...KKKKK....","................","................","................"],"blink":["................","................","................","................","................","........KKKK....","..KK...KAAAAK...","..KBK.KACAAAAK..","..KBBKAACAAKAAK.","...KBBAACAAAAAK.","..KBBKAACAAAAK..","..KBK.KACAAAK...","..KK...KKKKK....","................","................","................"],"bob":["................","................","................","................","................","........KKKK....","..KK...KAAAAK...","..KBK.KACAAAAK..","..KBBKAACAAEAAK.","...KBBAACAAAAAK.","..KBBKAACAAAAK..","..KBK.KACAAAK...","..KK...KKKKK....","................","................","................"]}}};
  const STORE_KEY = "pixel-pets:v1";
  const SPEEDS = { slow: 6, normal: 10, fast: 16 };
  const SIZES = { S: 24, M: 32, L: 48, XL: 64 };
  const FRAME_MS = 100;
  const script = document.currentScript;

  // ------------------------------------------------------------ state & storage
  function defaults() {
    const ds = (script && script.dataset) || {};
    const type = PETS[ds.pet] ? ds.pet : "cockatiel";
    const colors = Object.keys(PETS[type].palettes);
    return {
      type,
      color: colors.includes(ds.color) ? ds.color : colors[0],
      size: SIZES[ds.size] ? ds.size : "M",
      speed: SPEEDS[ds.speed] ? ds.speed : "normal",
      talk: ds.talk !== "false",
    };
  }
  function load() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORE_KEY) || "null");
      if (Array.isArray(saved) && saved.length) {
        return saved.filter((p) => p && PETS[p.type] && PETS[p.type].palettes[p.color]);
      }
    } catch (_) {}
    return [];
  }
  function save() {
    try {
      localStorage.setItem(STORE_KEY, JSON.stringify(pets.map((p) => p.settings())));
    } catch (_) {}
  }

  // ------------------------------------------------------------ DOM (shadow root keeps page CSS out)
  const host = document.createElement("div");
  host.id = "pixel-pets";
  // Zero-size anchor (pets overflow out of it). A full-screen overlay gets removed by popup/overlay-blocker extensions.
  Object.assign(host.style, {
    position: "fixed", left: "0", top: "0", width: "0", height: "0",
    overflow: "visible", pointerEvents: "none", zIndex: "2147483647",
  });
  const root = host.attachShadow({ mode: "open" });

  const CSS = `
    :host { all: initial; }
    .pet { position: absolute; left: 0; top: 0; will-change: transform; }
    .pet canvas { display: block; image-rendering: pixelated; pointer-events: auto; cursor: pointer; }
    .bubble { position: absolute; bottom: 100%; left: 50%; transform: translateX(-50%); margin-bottom: 2px;
      background: #fff; color: #1d1a16; border: 2px solid #2b2418; border-radius: 8px; padding: 1px 6px;
      font: 600 12px/1.4 system-ui, -apple-system, "Segoe UI", sans-serif; white-space: nowrap; display: none;
      box-shadow: 2px 2px 0 rgba(0,0,0,.2); }
    .heart { position: absolute; pointer-events: none; font: 14px/1 system-ui, sans-serif; color: #e53950;
      animation: up 1.1s ease-out forwards; }
    @keyframes up { to { transform: translate(var(--dx, 0px), -34px) scale(.6); opacity: 0; } }
    .treat { position: absolute; font: 20px/1 system-ui, sans-serif; transform: translate(-50%, -50%);
      pointer-events: none; animation: drop .35s ease-out; }
    @keyframes drop { from { transform: translate(-50%, -140%); opacity: 0; } }
    .menu { position: absolute; pointer-events: auto; width: 248px; box-sizing: border-box;
      background: #fffdf6; color: #2b2418; border: 2px solid #2b2418; border-radius: 14px;
      box-shadow: 4px 4px 0 rgba(0,0,0,.18); padding: 10px 10px 12px; display: none;
      font: 13px/1.35 system-ui, -apple-system, "Segoe UI", sans-serif; user-select: none; }
    .menu.open { display: block; animation: pop .12s ease-out; }
    @keyframes pop { from { transform: scale(.94); opacity: 0; } }
    .top { display: flex; align-items: center; justify-content: space-between; font-weight: 700; }
    .x { all: unset; cursor: pointer; padding: 0 6px; font-size: 16px; border-radius: 6px; }
    .x:hover { background: #f1ead6; }
    h4 { margin: 10px 0 5px; font-size: 10.5px; letter-spacing: .07em; text-transform: uppercase; opacity: .6; }
    .grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 4px; }
    .row { display: flex; gap: 4px; flex-wrap: wrap; }
    .btn { all: unset; box-sizing: border-box; cursor: pointer; border: 2px solid transparent; border-radius: 8px;
      background: #f3eedf; padding: 4px 7px; text-align: center; font-size: 12px; white-space: nowrap; }
    .btn:hover { border-color: #cfc4a6; }
    .btn.on { border-color: #2b2418; background: #fff; }
    .btn:focus-visible { outline: 2px solid #3b82f6; outline-offset: 1px; }
    .pick { padding: 4px 2px 3px; font-size: 10.5px; }
    .pick canvas { width: 32px; height: 32px; image-rendering: pixelated; display: block; margin: 0 auto 1px; }
    .sw { width: 24px; height: 24px; padding: 0; border-radius: 50%; border: 2px solid #d8cfb6; }
    .sw.on { border-color: #2b2418; box-shadow: 0 0 0 2px #fffdf6 inset; }
    .grow { flex: 1; }
    .actions { display: grid; grid-template-columns: 1fr 1fr; gap: 4px; margin-top: 10px; }
    .danger:hover { border-color: #e0a0a0; background: #fff1f1; }
  `;
  try {
    const sheet = new CSSStyleSheet();
    sheet.replaceSync(CSS);
    root.adoptedStyleSheets = [sheet];
  } catch (_) {
    const style = document.createElement("style");
    style.textContent = CSS;
    root.append(style);
  }

  // ------------------------------------------------------------ rendering helpers
  function paint(ctx, rows, palette, flip) {
    ctx.clearRect(0, 0, 16, 16);
    for (let y = 0; y < 16; y++) {
      const row = rows[y];
      for (let x = 0; x < 16; x++) {
        const c = row[x];
        if (c === ".") continue;
        ctx.fillStyle = palette[c];
        ctx.fillRect(flip ? 15 - x : x, y, 1, 1);
      }
    }
  }
  function el(tag, cls, text) {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  }
  const rand = (a) => a[Math.floor(Math.random() * a.length)];

  // ------------------------------------------------------------ mouse
  let mouseX = innerWidth / 2, mouseY = innerHeight / 2;
  document.addEventListener("mousemove", (e) => { mouseX = e.clientX; mouseY = e.clientY; }, { passive: true });

  // ------------------------------------------------------------ Pet
  const pets = [];

  class Pet {
    constructor(s) {
      Object.assign(this, s);
      this.x = 32 + pets.length * 40;
      this.y = 32;
      this.facing = 1;
      this.frameCount = 0;
      this.idleTime = 0;
      this.idleAnim = null;
      this.idleFrame = 0;
      this.bubbleTimer = 0;
      this.treat = null;
      this.frozen = false;
      this.lift = 0;

      this.el = el("div", "pet");
      this.bubble = el("div", "bubble");
      this.canvas = el("canvas");
      this.canvas.width = 16;
      this.canvas.height = 16;
      this.canvas.title = "Click me!";
      this.ctx = this.canvas.getContext("2d");
      this.el.append(this.bubble, this.canvas);
      root.append(this.el);

      this.canvas.addEventListener("click", (e) => { e.stopPropagation(); menu.open(this); });
      this.applySize();
      this.draw("idle");
      this.place();
    }
    settings() { return { type: this.type, color: this.color, size: this.size, speed: this.speed, talk: this.talk }; }
    get def() { return PETS[this.type]; }
    get px() { return SIZES[this.size]; }
    applySize() {
      this.canvas.style.width = this.canvas.style.height = this.px + "px";
      this.el.style.width = this.el.style.height = this.px + "px";
    }
    draw(name) {
      this.sprite = name;
      paint(this.ctx, this.def.sprites[name], this.def.palettes[this.color], this.facing === -1);
    }
    place() {
      const h = this.px / 2;
      this.el.style.transform = `translate(${Math.round(this.x - h)}px, ${Math.round(this.y - h - this.lift)}px)`;
    }
    say(text, frames = 15) {
      this.bubble.textContent = text;
      this.bubble.style.display = "block";
      this.bubbleTimer = frames;
    }
    hush() { this.bubble.style.display = "none"; this.bubbleTimer = 0; }
    hearts(n = 4) {
      for (let i = 0; i < n; i++) {
        setTimeout(() => {
          const h = el("span", "heart", "♥");
          h.style.left = this.x - 6 + (Math.random() * 16 - 8) + "px";
          h.style.top = this.y - this.px / 2 - 4 + "px";
          h.style.setProperty("--dx", (Math.random() * 20 - 10).toFixed(0) + "px");
          root.append(h);
          setTimeout(() => h.remove(), 1200);
        }, i * 140);
      }
      this.idleAnim = "happy";
      this.idleFrame = 0;
      this.idleTime = 0;
    }
    dropTreat() {
      if (this.treat) this.treat.el.remove();
      const m = 40;
      const t = { x: m + Math.random() * (innerWidth - 2 * m), y: m + Math.random() * (innerHeight - 2 * m) };
      t.el = el("span", "treat", rand(this.def.treats || ["🍪"]));
      t.el.style.left = t.x + "px";
      t.el.style.top = t.y + "px";
      root.append(t.el);
      this.treat = t;
      this.idleTime = 0;
      this.idleAnim = null;
    }
    remove() {
      if (this.treat) this.treat.el.remove();
      this.el.remove();
      pets.splice(pets.indexOf(this), 1);
    }

    target() {
      if (this.treat) return { x: this.treat.x, y: this.treat.y, stop: 4 };
      const i = pets.indexOf(this);
      if (i <= 0) return { x: mouseX, y: mouseY, stop: Math.max(48, this.px * 1.3) };
      const a = i * 2.4, r = 30 + i * 12;            // spread extra pets around the cursor
      return { x: mouseX + Math.cos(a) * r, y: mouseY + Math.sin(a) * r, stop: 20 };
    }

    idle() {
      this.idleTime++;
      this.lift = this.def.float ? Math.round(Math.sin(this.frameCount / 4) * 2) : 0;

      if (this.idleTime > 10 && this.idleAnim === null && Math.random() < 1 / 120) {
        const opts = ["dance", "sleep", "blink", "blink"];
        if (this.talk) opts.push("talk", "talk");
        this.idleAnim = rand(opts);
        this.idleFrame = 0;
        if (this.idleAnim === "talk") this.say(rand(this.def.sounds), 18);
      }

      switch (this.idleAnim) {
        case "dance":
          this.draw(this.idleFrame % 4 < 2 ? "bob" : "idle");
          if (this.idleFrame % 8 === 0) this.facing = -this.facing;
          if (this.idleFrame > 32) this.idleAnim = null;
          break;
        case "happy":
          this.draw(this.idleFrame % 4 < 2 ? "bob" : "blink");
          if (this.idleFrame > 12) this.idleAnim = null;
          break;
        case "talk":
          this.draw(this.idleFrame % 4 === 1 ? "bob" : "idle");
          if (this.idleFrame > 14) this.idleAnim = null;
          break;
        case "sleep":
          this.draw("blink");
          if (this.idleFrame >= 6 && this.idleFrame % 10 === 6) this.say(this.idleFrame % 20 === 6 ? "z" : "z Z", 8);
          if (this.idleFrame > 200) this.idleAnim = null;
          break;
        case "blink":
          this.draw(this.idleFrame < 2 ? "blink" : "idle");
          if (this.idleFrame > 3) this.idleAnim = null;
          break;
        default:
          this.draw("idle");
          this.place();
          return;
      }
      this.idleFrame++;
      this.place();
    }

    frame() {
      this.frameCount++;
      if (this.bubbleTimer > 0 && --this.bubbleTimer === 0) this.hush();
      if (this.frozen) return;

      const t = this.target();
      const dx = this.x - t.x, dy = this.y - t.y;
      const dist = Math.hypot(dx, dy);
      const step = SPEEDS[this.speed] * this.def.speed * (this.treat ? 1.6 : 1);

      if (dist < Math.max(t.stop, step)) {
        if (this.treat) {                         // reached the treat: eat it
          this.x = t.x; this.y = t.y;
          this.treat.el.remove();
          this.treat = null;
          if (this.talk) this.say("*nom*", 8);
          this.hearts(3);
        }
        this.idle();
        return;
      }

      if (this.idleAnim === "sleep") this.hush();
      if (this.idleAnim !== "happy" || this.treat) { this.idleAnim = null; this.idleFrame = 0; }

      if (this.idleTime > 1 && !this.treat) {     // startled before moving off
        if (this.idleTime > 5 && this.talk) this.say("!", 4);
        this.draw("idle");
        this.idleTime = Math.min(this.idleTime, 7) - 1;
        return;
      }
      this.idleTime = 0;

      if (Math.abs(dx / dist) > 0.2) this.facing = dx < 0 ? 1 : -1;
      const odd = this.frameCount % 2 === 1;
      this.draw(odd ? "move1" : "move2");
      this.lift = this.def.float ? Math.round(Math.sin(this.frameCount / 2) * 2) : odd ? 0 : this.def.bounce;

      this.x -= (dx / dist) * step;
      this.y -= (dy / dist) * step;
      const h = this.px / 2;
      this.x = Math.min(Math.max(h, this.x), innerWidth - h);
      this.y = Math.min(Math.max(h, this.y), innerHeight - h);
      this.place();
    }
  }

  // ------------------------------------------------------------ Menu
  const menu = (() => {
    const box = el("div", "menu");
    box.setAttribute("role", "dialog");
    box.setAttribute("aria-label", "Pixel Pets settings");
    root.append(box);
    let pet = null;

    function section(title) { box.append(el("h4", null, title)); }
    function button(label, on, fn, cls = "") {
      const b = el("button", "btn " + cls + (on ? " on" : ""), label);
      b.type = "button";
      b.addEventListener("click", (e) => { e.stopPropagation(); fn(); });
      return b;
    }

    function render() {
      box.textContent = "";
      const def = PETS[pet.type];

      const top = el("div", "top");
      top.append(el("span", null, "🐾 " + def.label + " · " + def.ar));
      const x = el("button", "x", "×");
      x.type = "button";
      x.title = "Close (Esc)";
      x.addEventListener("click", (e) => { e.stopPropagation(); close(); });
      top.append(x);
      box.append(top);

      section("Pet");
      const grid = el("div", "grid");
      for (const [key, p] of Object.entries(PETS)) {
        const b = button("", key === pet.type, () => {
          pet.type = key;
          pet.color = Object.keys(p.palettes)[0];
          pet.hush();
          pet.draw("idle");
          if (pet.talk) pet.say(rand(p.sounds), 14);
          changed();
        }, "pick");
        const c = el("canvas");
        c.width = c.height = 16;
        paint(c.getContext("2d"), p.sprites.idle, Object.values(p.palettes)[0], false);
        b.append(c, document.createTextNode(p.label));
        b.title = p.ar;
        grid.append(b);
      }
      box.append(grid);

      section("Color");
      const colors = el("div", "row");
      for (const [key, pal] of Object.entries(def.palettes)) {
        const b = button("", key === pet.color, () => { pet.color = key; pet.draw(pet.sprite); changed(); }, "sw");
        b.style.background = pal.swatch;
        b.title = key;
        b.setAttribute("aria-label", key);
        colors.append(b);
      }
      box.append(colors);

      section("Size");
      const sizes = el("div", "row");
      for (const k of Object.keys(SIZES)) {
        sizes.append(button(k, k === pet.size, () => { pet.size = k; pet.applySize(); pet.place(); changed(); }, "grow"));
      }
      box.append(sizes);

      section("Speed");
      const speeds = el("div", "row");
      const icons = { slow: "🐢 Slow", normal: "🚶 Normal", fast: "⚡ Fast" };
      for (const k of Object.keys(SPEEDS)) {
        speeds.append(button(icons[k], k === pet.speed, () => { pet.speed = k; changed(); }, "grow"));
      }
      box.append(speeds);

      section("Speech");
      const talk = el("div", "row");
      talk.append(
        button("💬 On", pet.talk, () => { pet.talk = true; pet.say(rand(def.sounds), 12); changed(); }, "grow"),
        button("🤫 Off", !pet.talk, () => { pet.talk = false; pet.hush(); changed(); }, "grow"),
      );
      box.append(talk);

      const actions = el("div", "actions");
      actions.append(
        button("❤️ Pet", false, () => { pet.hearts(5); }),
        button("🍪 Treat", false, () => { const p = pet; close(); p.dropTreat(); }),
        button("➕ Add pet", false, () => {
          const type = rand(Object.keys(PETS));
          const p = add({ ...pet.settings(), type, color: rand(Object.keys(PETS[type].palettes)) });
          p.x = pet.x + 24; p.y = pet.y; p.place();
          save();
          open(p);
        }),
        button("🗑 Remove", false, () => { const p = pet; close(); p.remove(); save(); }, "danger"),
      );
      box.append(actions);
      position();
    }

    function position() {
      const w = 248, h = box.offsetHeight || 420, m = 8;
      let left = pet.x + pet.px / 2 + 10;
      if (left + w > innerWidth - m) left = pet.x - pet.px / 2 - 10 - w;
      let top = pet.y - h / 2;
      left = Math.max(m, Math.min(left, innerWidth - w - m));
      top = Math.max(m, Math.min(top, innerHeight - h - m));
      box.style.left = left + "px";
      box.style.top = top + "px";
    }

    function changed() { save(); render(); }

    function open(p) {
      if (pet && pet !== p) pet.frozen = false;
      pet = p;
      pet.frozen = true;
      pet.idleAnim = null;
      pet.draw("idle");
      box.classList.add("open");
      render();
    }
    function close() {
      if (pet) pet.frozen = false;
      pet = null;
      box.classList.remove("open");
    }

    document.addEventListener("click", (e) => { if (pet && !e.composedPath().includes(box)) close(); }, true);
    document.addEventListener("keydown", (e) => { if (pet && e.key === "Escape") close(); });
    return { open, close, get pet() { return pet; } };
  })();

  // ------------------------------------------------------------ boot
  function add(s) {
    const p = new Pet({ ...defaults(), ...s });
    pets.push(p);
    return p;
  }

  let destroyed = false;
  document.body.appendChild(host);
  // If something (e.g. an extension) removes us, put the pets back.
  const guard = new MutationObserver(() => {
    if (!destroyed && !host.isConnected) document.body.appendChild(host);
  });
  guard.observe(document.documentElement, { childList: true, subtree: true });
  const saved = load();
  (saved.length ? saved : [defaults()]).forEach(add);

  let last;
  function loop(t) {
    if (destroyed) return;                       // PixelPets.destroy() stops everything
    if (last === undefined) last = t;
    if (t - last > FRAME_MS) { last = t; for (const p of pets.slice()) p.frame(); }
    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);

  window.PixelPets = {
    root: host,
    types: Object.keys(PETS),
    get pets() { return pets.slice(); },
    add(opts = {}) {
      const type = PETS[opts.type] ? opts.type : "cockatiel";
      const p = add({ ...opts, type, color: PETS[type].palettes[opts.color] ? opts.color : Object.keys(PETS[type].palettes)[0] });
      save();
      return p;
    },
    reset() { try { localStorage.removeItem(STORE_KEY); } catch (_) {} },
    destroy() { destroyed = true; guard.disconnect(); menu.close(); host.remove(); delete window.PixelPets; },
  };
})();
