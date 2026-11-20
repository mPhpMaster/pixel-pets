/*! Pixel Pets: cute pixel-art pets that follow your cursor. Click a pet to customize it. https://github.com/mPhpMaster/pixel-pets (MIT) */
// Self-contained: no images, no network, no eval. Works on strict-CSP pages too.
(function pixelPets() {
  "use strict";
  if (window.PixelPets && window.PixelPets.root) return;

  const PETS = {"cat":{"treats":["🐟"],"label":"Cat","ar":"قطة","sounds":{"en":["Meow","Purr~","Mrrp?","😺"],"ar":["مياو","خرررر~","مياو؟","😺"]},"speed":1.0,"bounce":0,"palettes":{"orange":{"swatch":"#f6a54c","K":"#4a2c17","A":"#f6a54c","W":"#fff6e8","N":"#ff9eb0","E":"#2b1a10"},"black":{"swatch":"#2f2f38","K":"#0d0d12","A":"#34343e","W":"#5a5a66","N":"#ff8fa6","E":"#f5d34a"},"grey":{"swatch":"#a3aab3","K":"#3a3f46","A":"#a9b0b8","W":"#f3f5f7","N":"#ff9eb0","E":"#1d2733"},"white":{"swatch":"#ffffff","K":"#6b6157","A":"#fffdf8","W":"#ffffff","N":"#ffa3b5","E":"#3c7fd6"}},"sprites":{"idle":["................",".KK........KK...",".KAK......KAK...",".KNAKKKKKKANK...",".KAAAAAAAAAAK...","KAAAAAAAAAAAAK..","KAAAEAAAAEAAAK..","KAAAEAAAAEAAAK..","KANAAWWWWAANAK..",".KAAAWNNWAAAK...","..KKAAAAAAKK....","...KAWWWWAK.KK..","..KAAWWWWAAKAK..","..KAAWWWWAAKAK..","..KAAAAAAAAKK...","...KWKKKKWK....."],"move1":["................","................","........KK...KK.","........KAK.KAK.",".......KANKKKNAK",".......KAAAAAAAK",".K.....KAAAAEAAK","KAK....KAAAAEAAK","KAK....KANAAWWNK",".KAK...KAAAAWWK.","..KAKKKKKAAAAK..","...KAAAAAKKKK...","...KAAAAWWAK....","...KKAKKKKAK....","..KAK....KAK....","..KK.....KK....."],"move2":["................","................","................","........KK...KK.","........KAK.KAK.",".......KANKKKNAK",".......KAAAAAAAK",".K.....KAAAAEAAK","KAK....KAAAAEAAK","KAK....KANAAWWNK",".KAK...KAAAAWWK.","..KAKKKKKAAAAK..","...KAAAAAKKKK...","...KAAAAWWAK....","....KAK.KAK.....","....KK..KK......"],"blink":["................",".KK........KK...",".KAK......KAK...",".KNAKKKKKKANK...",".KAAAAAAAAAAK...","KAAAAAAAAAAAAK..","KAAAKAAAAKAAAK..","KAAAKAAAAKAAAK..","KANAAWWWWAANAK..",".KAAAWNNWAAAK...","..KKAAAAAAKK....","...KAWWWWAK.KK..","..KAAWWWWAAKAK..","..KAAWWWWAAKAK..","..KAAAAAAAAKK...","...KWKKKKWK....."],"bob":["................","................","..KK........KK..","..KAK......KAK..","..KNAKKKKKKANK..","..KAAAAAAAAAAK..",".KAAAAAAAAAAAAK.",".KAAAEAAAAEAAAK.",".KAAAEAAAAEAAAK.",".KANAAWWWWAANAK.","..KAAAWNNWAAAK..","...KAWWWWAK.KK..","..KAAWWWWAAKAK..","..KAAWWWWAAKAK..","..KAAAAAAAAKK...","...KWKKKKWK....."]}},"dog":{"treats":["🦴"],"label":"Dog","ar":"كلب","sounds":{"en":["Woof!","Arf arf","🦴?","*wags*"],"ar":["هاو!","هاو هاو","🦴؟","*يهز ذيله*"]},"speed":1.1,"bounce":0,"palettes":{"brown":{"swatch":"#a8703f","K":"#2b1d12","A":"#a8703f","B":"#6e4423","W":"#ecd9bd","N":"#1b1b1b","E":"#1b1b1b"},"golden":{"swatch":"#e8b860","K":"#4a3418","A":"#e8b860","B":"#c48a35","W":"#fbefd5","N":"#2b1d12","E":"#2b1d12"},"husky":{"swatch":"#7d8790","K":"#1f2328","A":"#7d8790","B":"#3f464d","W":"#f4f4f4","N":"#1b1b1b","E":"#4aa3e0"},"black":{"swatch":"#26262a","K":"#000000","A":"#2a2a2f","B":"#141416","W":"#c79a6b","N":"#000000","E":"#c79a6b"}},"sprites":{"idle":["................","................",".......KKKK.....","......KAAAAK....",".....KBAAAEAKK..",".....KBAAAAAAAK.",".....KBKAAAAANK.","......KKAAAAKK..",".......KAAAAK...","..K....KAWAAK...",".KAK..KAWWAAK...",".KAK..KAWWAAK...","..KAK.KAAAAAAK..","...KAKAAAKAAAK..","....KAAAKKAAK...",".....KKKK.KKK..."],"move1":["................","................","................","..........KKKK..",".........KAAAAK.",".........KBAEAAK",".K.......KBAAAAN","KAK......KBKAAK.",".KAK.KKKKKKAAK..","..KAKAAAAAAAAK..","...KAAAAAAAAAK..","...KAAAAAAWWAK..","...KKAKKKKKAKK..","..KAK......KAK..","..KK.......KK...","................"],"move2":["................","................","................","..........KKKK..",".........KAAAAK.",".........KBAEAAK","K........KBAAAAN","KAK......KBKAAK.",".KAK.KKKKKKAAK..","..KAKAAAAAAAAK..","...KAAAAAAAAAK..","...KAAAAAAWWAK..","...KKAKKKKKAKK..","....KAK..KAK....","....KK...KK.....","................"],"blink":["................","................",".......KKKK.....","......KAAAAK....",".....KBAAAKAKK..",".....KBAAAAAAAK.",".....KBKAAAAANK.","......KKAAAAKK..",".......KAAAAK...","..K....KAWAAK...",".KAK..KAWWAAK...",".KAK..KAWWAAK...","..KAK.KAAAAAAK..","...KAKAAAKAAAK..","....KAAAKKAAK...",".....KKKK.KKK..."],"bob":["................","................","................","........KKKK....",".......KAAAAK...","......KBAAAEAKK.","......KBAAAAAAAK","......KBKAAAAANK",".......KKAAAAKK.","..K....KAWAAK...",".KAK..KAWWAAK...",".KAK..KAWWAAK...","..KAK.KAAAAAAK..","...KAKAAAKAAAK..","....KAAAKKAAK...",".....KKKK.KKK..."]}},"cockatiel":{"treats":["🌻","🍎"],"label":"Cockatiel","ar":"كوكاتيل","sounds":{"en":["Peace be upon you","Mwahhh","🎶","Hello!"],"ar":["السلام عليكم","امواححح","🎶","هلا!"]},"speed":1.2,"bounce":0,"palettes":{"lutino":{"swatch":"#fbe36a","K":"#4a4030","W":"#fbf7e8","w":"#e8dfbf","Y":"#fbe36a","y":"#f0cf3a","O":"#f5893a","E":"#b3202a","P":"#f2b5a5","G":"#efe2a0"},"grey":{"swatch":"#8f8f8f","K":"#2e2a26","W":"#a3a3a3","w":"#7c7c7c","Y":"#fff1a8","y":"#d9c76a","O":"#f5893a","E":"#1b1b1b","P":"#a59a8e","G":"#6d6d6d"},"white-face":{"swatch":"#ffffff","K":"#2e2a26","W":"#9a9a9a","w":"#777777","Y":"#ffffff","y":"#e6e6e6","O":"#ffffff","E":"#1b1b1b","P":"#a59a8e","G":"#666666"}},"sprites":{"idle":["........KK......","........KyK.....",".........KyK....","......KKKYyK....",".....KYYYYYYK...",".....KYYYYEYYK..",".....KYYYOOYPPK.",".....KWYYOOYKPK.",".....KWWYYYKK...","....KWWWWWWK....","....KWWwWWWK....","...KWWwwWWWK....","...KWwwwWWK.....","..KGwKPKKPK.....",".KGGK.P..P......","KGK............."],"move1":["................","......KK........",".....KWwK.......",".....KWWwK...KK.","......KWWwK.KyK.","......KWWWKKYYYK",".......KWWKYYEYK","....KKKKWWWYOOPK","..KKWWWWWWWWYKPK","KKGGWWWWWWWWKK..","KGGWWKKKWWWK....",".KGGK...KKK.....","..KK............","................","................","................"],"move2":["................","................","................",".............KK.","............KyK.","...........KYYYK","..........KYYEYK","....KKKKKKWYOOPK","..KKWWWWWWWWYKPK","KKGGWWWwwWWWKK..","KGGWWKWWwwKK....",".KGGK.KWwwwK....","..KK...KWwwK....",".......KWwK.....","........KK......","................"],"blink":["........KK......","........KyK.....",".........KyK....","......KKKYyK....",".....KYYYYYYK...",".....KYYYYKYYK..",".....KYYYOOYPPK.",".....KWYYOOYKPK.",".....KWWYYYKK...","....KWWWWWWK....","....KWWwWWWK....","...KWWwwWWWK....","...KWwwwWWK.....","..KGwKPKKPK.....",".KGGK.P..P......","KGK............."],"bob":["................",".........KK.....",".........KyK....","..........KyK...",".......KKKYyK...","......KYYYYYYK..","......KYYYYEYYK.","......KYYYOOYPPK",".....KKWYYOOYKPK","....KWWWWWWK....","....KWWwWWWK....","...KWWwwWWWK....","...KWwwwWWK.....","..KGwKPKKPK.....",".KGGK.P..P......","KGK............."]}},"hamster":{"label":"Hamster","ar":"هامستر","treats":["🌻","🥜"],"sounds":{"en":["*squeak*","🌻?","*cheeks full*","♥"],"ar":["*صيصي*","🌻؟","*خدوده مليانة*","♥"]},"speed":0.9,"bounce":1,"palettes":{"golden":{"swatch":"#eaa95e","K":"#5a3517","A":"#eaa95e","W":"#fff4e2","N":"#ff9eb0","E":"#2a1a10"},"white":{"swatch":"#ffffff","K":"#6e6259","A":"#fffaf3","W":"#ffffff","N":"#ffa3b5","E":"#c0304a"},"grey":{"swatch":"#a7a29c","K":"#3d3934","A":"#b3ada6","W":"#f6f3ef","N":"#ff9eb0","E":"#1e1a17"},"cocoa":{"swatch":"#8b5a3c","K":"#2f1b10","A":"#8b5a3c","W":"#f2dcc5","N":"#ff9eb0","E":"#1a0f09"}},"sprites":{"idle":["................","................","................","...KK.....KK....","..KNNKKKKKNNK...",".KAAAAAAAAAAAK..","KAAAAAAAAAAAAAK.","KAAAEAAAAAEAAAK.","KAAAEAAAAAEAAAK.","KANAAAWWWAAANAK.","KAAAAWWNWWAAAAK.","KAAAWWWWWWWAAAK.","KAAAWWWWWWWAAAK.",".KAAWWWWWWWAAK..","..KKAAAAAAAKK...","...KNK...KNK...."],"move1":["................","................","................","................","..........KK....","....KKKKKKNNK...","...KAAAAAAAAAK..","..KAAAAAAAAAAAK.","..KAAAAAAAAEAAK.",".KAAAAAAAAAEANK.",".KAAAAAAAWWWWK..",".KWWAAAAWWWWWK..","..KWWWWWWWWWK...","...KKKKKKKKKK...","..KNK.....KNK...","................"],"move2":["................","................","................","................","..........KK....","....KKKKKKNNK...","...KAAAAAAAAAK..","..KAAAAAAAAAAAK.","..KAAAAAAAAEAAK.",".KAAAAAAAAAEANK.",".KAAAAAAAWWWWK..",".KWWAAAAWWWWWK..","..KWWWWWWWWWK...","...KKKKKKKKKK...","....KNK.KNK.....","................"],"blink":["................","................","................","...KK.....KK....","..KNNKKKKKNNK...",".KAAAAAAAAAAAK..","KAAAAAAAAAAAAAK.","KAAAKAAAAAKAAAK.","KAAAKAAAAAKAAAK.","KANAAAWWWAAANAK.","KAAAAWWNWWAAAAK.","KAAAWWWWWWWAAAK.","KAAAWWWWWWWAAAK.",".KAAWWWWWWWAAK..","..KKAAAAAAAKK...","...KNK...KNK...."],"bob":["................","................","................","................","....KK.....KK...","...KNNKKKKKNNK..","..KAAAAAAAAAAAK.",".KAAAAAAAAAAAAAK",".KAAAEAAAAAEAAAK",".KAAAEAAAAAEAAAK","KKANAAAWWWAAANAK","KAAAWWWWWWWAAAK.","KAAAWWWWWWWAAAK.",".KAAWWWWWWWAAK..","..KKAAAAAAAKK...","...KNK...KNK...."]}},"rabbit":{"treats":["🥕"],"label":"Rabbit","ar":"أرنب","sounds":{"en":["*nom nom*","🥕?","♥","*thump*"],"ar":["*قرمشة*","🥕؟","♥","*دبدبة*"]},"speed":1.0,"bounce":3,"palettes":{"white":{"swatch":"#ffffff","K":"#5b5048","A":"#fbfaf7","B":"#e3ddd3","N":"#f4a3b4","W":"#ffffff","E":"#d0405a"},"brown":{"swatch":"#b88a62","K":"#3a2a1d","A":"#b88a62","B":"#8f6644","N":"#f4a3b4","W":"#f7efe4","E":"#1b1b1b"},"grey":{"swatch":"#9b9b9b","K":"#2f2f2f","A":"#a9a9a9","B":"#828282","N":"#f4a3b4","W":"#f2f2f2","E":"#1b1b1b"}},"sprites":{"idle":["........K..K....",".......KAKKAK...",".......KNKKNK...",".......KNKKNK...",".......KAKKAK...","......KAAAAAAK..","......KAAAEAAK..","......KAAAAANK..",".....KKAAAAAK...","....KAAAAAAAK...","...KAAAAABAAK...","..KWAAAABBAAK...","..KWAAAAAAAAK...","...KAAAAKAAAK...","....KKKKKKKKKK..","................"],"move1":["................","................","........K.K.....",".......KNKNK....",".......KNKNK....",".......KAKAK....","......KAAAAAK...",".....KAAAAEAAK..",".....KAAAAAAANK.","...KKKAAAAAAK...","..KAAAAAAAAK....",".KWAAAAAAAAK....",".KWAAAAAAAAAK...","..KAAAABAAAAK...","..KKKKKKKKKKKK..","................"],"move2":["................","................","................",".....KK.........","....KNNK..KK....",".....KNNKKAAK...","......KKAAAAAK..",".......KAAAEAK..","...KKKKAAAAAANK.",".KKAAAAAAAAAKK..","KWAAAAAAAAAK....","KWAAAAAAAAK.....",".KKAAKKKAAK.....","KAAKK...KAK.....","KK.......KAK....","..........KK...."],"blink":["........K..K....",".......KAKKAK...",".......KNKKNK...",".......KNKKNK...",".......KAKKAK...","......KAAAAAAK..","......KAAAKAAK..","......KAAAAANK..",".....KKAAAAAK...","....KAAAAAAAK...","...KAAAAABAAK...","..KWAAAABBAAK...","..KWAAAAAAAAK...","...KAAAAKAAAK...","....KKKKKKKKKK..","................"],"bob":["................",".........K..K...","........KAKKAK..","........KNKKNK..","........KNKKNK..","........KAKKAK..",".......KAAAAAAK.",".......KAAAEAAK.",".....KKKAAAAANK.","....KAAAAAAAK...","...KAAAAABAAK...","..KWAAAABBAAK...","..KWAAAAAAAAK...","...KAAAAKAAAK...","....KKKKKKKKKK..","................"]}},"panda":{"label":"Panda","ar":"باندا","treats":["🎋"],"sounds":{"en":["*munch*","🎋?","*roll*","♥"],"ar":["*يقرمش*","🎋؟","*يتدحرج*","♥"]},"speed":0.7,"bounce":1,"palettes":{"panda":{"swatch":"#2b2b2b","K":"#141414","W":"#ffffff","B":"#2b2b2b","N":"#ffa3b5","E":"#ffffff"},"red-panda":{"swatch":"#d9622b","K":"#3a1a0c","W":"#f7e9d8","B":"#b24a1d","N":"#ff9eb0","E":"#ffffff"},"brown":{"swatch":"#8a6a50","K":"#2a1d14","W":"#f4ece2","B":"#6b4c36","N":"#ffa3b5","E":"#ffffff"}},"sprites":{"idle":["................",".KK........KK...","KBBK......KBBK..","KBBKKKKKKKKBBK..",".KWWWWWWWWWWK...","KWWWWWWWWWWWWK..","KWWBBWWWWBBWWK..","KWBBEWWWWEBBWK..","KWNBBWWWWBBNWK..",".KWWWWBBWWWWK...","..KKWWWWWWKK....",".KBBKWWWWKBBK...","KBBBKWWWWKBBBK..",".KBKWWWWWWKBK...",".KBBKWWWWKBBK...",".KKKKKKKKKKKK..."],"move1":["................","................","................","........KK..KK..","........KBK.KBK.",".......KWWWWWWWK",".......KWWWWBBWK",".......KWWWWBEWK",".......KWNWWWWBK","..KKKKKKKWWWWWK.",".KWWWWWWBBBKKK..",".KWWWWWWBBBK....",".KBBKKKKKBBK....","KBK.......KBK...","KK.........KK...","................"],"move2":["................","................","................","........KK..KK..","........KBK.KBK.",".......KWWWWWWWK",".......KWWWWBBWK",".......KWWWWBEWK",".......KWNWWWWBK","..KKKKKKKWWWWWK.",".KWWWWWWBBBKKK..",".KWWWWWWBBBK....",".KBBKKKKKBBK....","..KBK...KBK.....","..KK....KK......","................"],"blink":["................",".KK........KK...","KBBK......KBBK..","KBBKKKKKKKKBBK..",".KWWWWWWWWWWK...","KWWWWWWWWWWWWK..","KWWBBWWWWBBWWK..","KWBBKWWWWKBBWK..","KWNBBWWWWBBNWK..",".KWWWWBBWWWWK...","..KKWWWWWWKK....",".KBBKWWWWKBBK...","KBBBKWWWWKBBBK..",".KBKWWWWWWKBK...",".KBBKWWWWKBBK...",".KKKKKKKKKKKK..."],"bob":["................","................","..KK........KK..",".KBBK......KBBK.",".KBBKKKKKKKKBBK.","..KWWWWWWWWWWK..",".KWWWWWWWWWWWWK.",".KWWBBWWWWBBWWK.",".KWBBEWWWWEBBWK.",".KWNBBWWWWBBNWK.","..KWWWWBBWWWWK..",".KBBKWWWWKBBK...","KBBBKWWWWKBBBK..",".KBKWWWWWWKBK...",".KBBKWWWWKBBK...",".KKKKKKKKKKKK..."]}},"fox":{"label":"Fox","ar":"ثعلب","treats":["🍇"],"sounds":{"en":["Yip!","*pounce*","🦊","Hehe"],"ar":["ييب!","*ينقض*","🦊","هيهي"]},"speed":1.15,"bounce":1,"palettes":{"red":{"swatch":"#f07a2e","K":"#4a1f0a","A":"#f07a2e","W":"#fff7ee","B":"#3a2418","N":"#ff9eb0","E":"#2a140a"},"arctic":{"swatch":"#f2f5f8","K":"#59636e","A":"#f4f7fa","W":"#ffffff","B":"#9aa5b1","N":"#ffa3b5","E":"#2a3440"},"fennec":{"swatch":"#efd2a4","K":"#5a4127","A":"#efd2a4","W":"#fff9ef","B":"#b98a57","N":"#ffa3b5","E":"#2a1d10"}},"sprites":{"idle":[".K.........K....",".KBK.....KBK....",".KAAK...KAAK....",".KANAKKKANAK....","KAAAAAAAAAAAK...","KAAAAAAAAAAAK...","KAAEAAAAAEAAK...","KWAEAAAAAEAWK...","KWWWWWKWWWWWK...",".KWWWWWWWWWK....","..KKAWWWAKK..KK.","..KAAWWWAAK.KAAK",".KAAAWWWAAAKAAAK",".KAAAWWWAAAKAWWK",".KBAAAAAAABKKWK.","..KKKKKKKKKK.K.."],"move1":["................","................",".........K..K...","........KBKKBK..","........KAAAAK..",".......KAAAAAAK.",".......KAAAAEAK.",".KKK...KAAAAAAAK","KAAAK..KWWWWWWBK","KAAWAK..KWWWWK..",".KWWAKKKKAAAK...","..KKAAAAAAWWK...","...KAAAAAAWWK...","...KKBKKKKBKK...","..KBK....KBK....","..KK.....KK....."],"move2":["................","................",".........K..K...","........KBKKBK..","........KAAAAK..",".......KAAAAAAK.",".......KAAAAEAK.",".KKK...KAAAAAAAK","KAAAK..KWWWWWWBK","KAAWAK..KWWWWK..",".KWWAKKKKAAAK...","..KKAAAAAAWWK...","...KAAAAAAWWK...","...KKBKKKKBKK...","....KBK.KBK.....","....KK..KK......"],"blink":[".K.........K....",".KBK.....KBK....",".KAAK...KAAK....",".KANAKKKANAK....","KAAAAAAAAAAAK...","KAAAAAAAAAAAK...","KAAKAAAAAKAAK...","KWAKAAAAAKAWK...","KWWWWWKWWWWWK...",".KWWWWWWWWWK....","..KKAWWWAKK..KK.","..KAAWWWAAK.KAAK",".KAAAWWWAAAKAAAK",".KAAAWWWAAAKAWWK",".KBAAAAAAABKKWK.","..KKKKKKKKKK.K.."],"bob":["................","..K.........K...","..KBK.....KBK...","..KAAK...KAAK...","..KANAKKKANAK...",".KAAAAAAAAAAAK..",".KAAAAAAAAAAAK..",".KAAEAAAAAEAAK..",".KWAEAAAAAEAWK..",".KWWWWWKWWWWWK..","..KWWWWWWWWWKKK.","..KAAWWWAAK.KAAK",".KAAAWWWAAAKAAAK",".KAAAWWWAAAKAWWK",".KBAAAAAAABKKWK.","..KKKKKKKKKK.K.."]}},"capybara":{"label":"Capybara","ar":"كابيبارا","treats":["🍊","🍉"],"sounds":{"en":["...","*chill*","🍊?","*vibing*"],"ar":["...","*رايق*","🍊؟","*مسترخي*"]},"speed":0.6,"bounce":0,"palettes":{"brown":{"swatch":"#b07c4f","K":"#3a2414","A":"#b07c4f","B":"#5a3a22","N":"#e8998a","E":"#2a1a10"},"caramel":{"swatch":"#d9a066","K":"#4a2f17","A":"#d9a066","B":"#7a5232","N":"#f2a397","E":"#2a1a10"},"cocoa":{"swatch":"#6e4a33","K":"#24160c","A":"#7a5238","B":"#3a2416","N":"#e8998a","E":"#140b05"}},"sprites":{"idle":["................","................","................","................","...........KK...","...KKKKKKKKAAKK.","..KAAAAAAAAAAAAK",".KAAAAAAAAAAEAAK",".KAAAAAAAAAAAAAK",".KAAAAAAAAAANABK",".KAAAAAAAAAAAAK.",".KBAAAAAAAAAAK..","..KAAAAAAAAAAK..","..KKKKKKKKKKKK..","..KBK.....KBK...","..KK......KK...."],"move1":["................","................","................","................","...........KK...","...KKKKKKKKAAKK.","..KAAAAAAAAAAAAK",".KAAAAAAAAAAEAAK",".KAAAAAAAAAAAAAK",".KAAAAAAAAAANABK",".KAAAAAAAAAAAAK.",".KBAAAAAAAAAAK..","..KAAAAAAAAAAK..","..KKKKKKKKKKKK..",".KBK.......KBK..",".KK........KK..."],"move2":["................","................","................","................","...........KK...","...KKKKKKKKAAKK.","..KAAAAAAAAAAAAK",".KAAAAAAAAAAEAAK",".KAAAAAAAAAAAAAK",".KAAAAAAAAAANABK",".KAAAAAAAAAAAAK.",".KBAAAAAAAAAAK..","..KAAAAAAAAAAK..","..KKKKKKKKKKKK..","....KBK..KBK....","....KK...KK....."],"blink":["................","................","................","................","...........KK...","...KKKKKKKKAAKK.","..KAAAAAAAAAAAAK",".KAAAAAAAAAAKAAK",".KAAAAAAAAAAAAAK",".KAAAAAAAAAANABK",".KAAAAAAAAAAAAK.",".KBAAAAAAAAAAK..","..KAAAAAAAAAAK..","..KKKKKKKKKKKK..","..KBK.....KBK...","..KK......KK...."],"bob":["................","................","................","................","................","............KK..","..KAKKKKKKKKAAKK",".KAAAAAAAAAAEAAK",".KAAAAAAAAAAAAAK",".KAAAAAAAAAANABK",".KAAAAAAAAAAAAK.",".KBAAAAAAAAAAK..","..KAAAAAAAAAAK..","..KKKKKKKKKKKK..","..KBK.....KBK...","..KK......KK...."]}},"hedgehog":{"label":"Hedgehog","ar":"قنفذ","treats":["🍓","🐛"],"sounds":{"en":["*sniff sniff*","🍓?","*curls up*","♥"],"ar":["*يتشمم*","🍓؟","*يتكور*","♥"]},"speed":0.8,"bounce":0,"palettes":{"brown":{"swatch":"#7a5a44","K":"#3a2a1e","B":"#7a5a44","b":"#a07a5c","A":"#f3d9b8","N":"#ffa3b5","E":"#1b1b1b"},"albino":{"swatch":"#f0e6dc","K":"#7a6a5c","B":"#efe4d8","b":"#ffffff","A":"#fff4ea","N":"#ffa3b5","E":"#c0304a"},"chocolate":{"swatch":"#4a3428","K":"#1e140e","B":"#4a3428","b":"#6e5040","A":"#e8c9a4","N":"#ff9eb0","E":"#140b05"}},"sprites":{"idle":["................","................","................","................","................",".....K.K.K......","...KKbKbKbK.....","..KBbBbBbBBKK...",".KBBBBBBBBBAAK..","KbBbBbBbBBAAEAK.","KBBBBBBBBANAAAAK",".KbBbBbBBAAAAKK.","..KBBBBBAAAAK...","...KKKKKKKKK....","...KAK...KAK....","................"],"move1":["................","................","................","................","................",".....K.K.K......","...KKbKbKbK.....","..KBbBbBbBBKK...",".KBBBBBBBBBAAK..","KbBbBbBbBBAAEAK.","KBBBBBBBBANAAAAK",".KbBbBbBBAAAAKK.","..KBBBBBAAAAK...","...KKKKKKKKK....","..KAK.....KAK...","................"],"move2":["................","................","................","................","................",".....K.K.K......","...KKbKbKbK.....","..KBbBbBbBBKK...",".KBBBBBBBBBAAK..","KbBbBbBbBBAAEAK.","KBBBBBBBBANAAAAK",".KbBbBbBBAAAAKK.","..KBBBBBAAAAK...","...KKKKKKKKK....",".....KAK.KAK....","................"],"blink":["................","................","................","................","................",".....K.K.K......","...KKbKbKbK.....","..KBbBbBbBBKK...",".KBBBBBBBBBAAK..","KbBbBbBbBBAAKAK.","KBBBBBBBBANAAAAK",".KbBbBbBBAAAAKK.","..KBBBBBAAAAK...","...KKKKKKKKK....","...KAK...KAK....","................"],"bob":["................","................","................","................","................","................","......K.K.K.....","..KBKKbKbKbKK...",".KBBBBBBBBBAAK..","KbBbBbBbBBAAEAK.","KBBBBBBBBANAAAAK",".KbBbBbBBAAAAKK.","..KBBBBBAAAAK...","...KKKKKKKKK....","...KAK...KAK....","................"]}},"lamb":{"label":"Lamb","ar":"خروف","treats":["🌿","🍀"],"sounds":{"en":["Baa~","Meeh","☁️","♥"],"ar":["ماااع~","مييه","☁️","♥"]},"speed":0.85,"bounce":1,"palettes":{"white":{"swatch":"#fbf8f1","K":"#6b6157","W":"#fbf8f1","F":"#f2d7c2","N":"#ffa3b5","E":"#1b1b1b"},"black-face":{"swatch":"#2f2a2a","K":"#3a3434","W":"#f6f2ea","F":"#2f2a2a","N":"#ff9eb0","E":"#ffffff"},"pink":{"swatch":"#ffd6e5","K":"#7a4a5c","W":"#ffd6e5","F":"#fff0e6","N":"#ff8fb0","E":"#2a1a20"}},"sprites":{"idle":["................","................","................","................","....K.K.K.......","...KWKWKWK.KKK..","..KWWWWWWWKKFFFK",".KWWWWWWWWKFFEFK","KWWWWWWWWWKFNFFK","KWWWWWWWWWWKFFK.","KWWWWWWWWWWWKK..",".KWWWWWWWWWWK...","..KKKKKKKKKKK...","..KFK.....KFK...","..KK......KK....","................"],"move1":["................","................","................","................","....K.K.K.......","...KWKWKWK.KKK..","..KWWWWWWWKKFFFK",".KWWWWWWWWKFFEFK","KWWWWWWWWWKFNFFK","KWWWWWWWWWWKFFK.","KWWWWWWWWWWWKK..",".KWWWWWWWWWWK...","..KKKKKKKKKKK...",".KFK.......KFK..",".KK........KK...","................"],"move2":["................","................","................","................","....K.K.K.......","...KWKWKWK.KKK..","..KWWWWWWWKKFFFK",".KWWWWWWWWKFFEFK","KWWWWWWWWWKFNFFK","KWWWWWWWWWWKFFK.","KWWWWWWWWWWWKK..",".KWWWWWWWWWWK...","..KKKKKKKKKKK...","....KFK..KFK....","....KK...KK.....","................"],"blink":["................","................","................","................","....K.K.K.......","...KWKWKWK.KKK..","..KWWWWWWWKKFFFK",".KWWWWWWWWKFFKFK","KWWWWWWWWWKFNFFK","KWWWWWWWWWWKFFK.","KWWWWWWWWWWWKK..",".KWWWWWWWWWWK...","..KKKKKKKKKKK...","..KFK.....KFK...","..KK......KK....","................"],"bob":["................","................","................","................","................",".....K.K.K......","..KWKWKWKWKKKKKK",".KWWWWWWWWKFFEFK","KWWWWWWWWWKFNFFK","KWWWWWWWWWWKFFK.","KWWWWWWWWWWWKK..",".KWWWWWWWWWWK...","..KKKKKKKKKKK...","..KFK.....KFK...","..KK......KK....","................"]}},"piglet":{"label":"Piglet","ar":"خنزير صغير","treats":["🍎","🌽"],"sounds":{"en":["Oink!","*snort*","🍎?","♥"],"ar":["أوينك!","*خنخنة*","🍎؟","♥"]},"speed":0.9,"bounce":1,"palettes":{"pink":{"swatch":"#ffb3c7","K":"#6b2f40","A":"#ffb3c7","S":"#e8829e","N":"#ff7fa0","E":"#2a1218"},"mud":{"swatch":"#c88a6a","K":"#4a2a1a","A":"#d9a080","S":"#a86848","N":"#ff8fa0","E":"#2a1218"},"black":{"swatch":"#3a3236","K":"#120e10","A":"#453c40","S":"#e8829e","N":"#ff7fa0","E":"#f5f5f5"}},"sprites":{"idle":["................","................","................","................","..........KK....","....KKKKKKSSK...","...KAAAAAAAAAK..",".KKAAAAAAAAAEAK.",".KAAAAAAAAANASSK",".KAAAAAAAAAAASSK",".KAAAAAAAAAAAKK.","..KAAAAAAAAAAK..","..KKKKKKKKKKKK..","..KAK.....KAK...","..KSK.....KSK...","................"],"move1":["................","................","................","................","..........KK....","....KKKKKKSSK...","...KAAAAAAAAAK..",".KKAAAAAAAAAEAK.",".KAAAAAAAAANASSK",".KAAAAAAAAAAASSK",".KAAAAAAAAAAAKK.","..KAAAAAAAAAAK..","..KKKKKKKKKKKK..",".KAK.......KAK..",".KSK.......KSK..","................"],"move2":["................","................","................","................","..........KK....","....KKKKKKSSK...","...KAAAAAAAAAK..",".KKAAAAAAAAAEAK.",".KAAAAAAAAANASSK",".KAAAAAAAAAAASSK",".KAAAAAAAAAAAKK.","..KAAAAAAAAAAK..","..KKKKKKKKKKKK..","....KAK..KAK....","....KSK..KSK....","................"],"blink":["................","................","................","................","..........KK....","....KKKKKKSSK...","...KAAAAAAAAAK..",".KKAAAAAAAAAKAK.",".KAAAAAAAAANASSK",".KAAAAAAAAAAASSK",".KAAAAAAAAAAAKK.","..KAAAAAAAAAAK..","..KKKKKKKKKKKK..","..KAK.....KAK...","..KSK.....KSK...","................"],"bob":["................","................","................","................","................","...........KK...","...KAKKKKKKSSK..",".KKAAAAAAAAAEAK.",".KAAAAAAAAANASSK",".KAAAAAAAAAAASSK",".KAAAAAAAAAAAKK.","..KAAAAAAAAAAK..","..KKKKKKKKKKKK..","..KAK.....KAK...","..KSK.....KSK...","................"]}},"duckling":{"label":"Duckling","ar":"بطة","treats":["🍞","🌽"],"sounds":{"en":["Quack!","Peep peep","🦆","♥"],"ar":["كواك!","بيب بيب","🦆","♥"]},"speed":0.85,"bounce":1,"palettes":{"yellow":{"swatch":"#ffe14d","K":"#6b4d0e","A":"#ffe14d","B":"#f5c518","N":"#ffab9c","Y":"#ff9b3d","E":"#2a1d05"},"white":{"swatch":"#ffffff","K":"#6b6157","A":"#ffffff","B":"#e8e4dd","N":"#ffb3a6","Y":"#ff9b3d","E":"#1e1a17"},"mallard":{"swatch":"#3f8f4f","K":"#1d2b1f","A":"#3f8f4f","B":"#8b6a4a","N":"#ff9eb0","Y":"#f2c230","E":"#111111"}},"sprites":{"idle":["................","................","................","......KKKK......",".....KAAAAK.....","....KAAAAAAK....","....KAAAAEAK....","....KANAAAAYYK..","....KAAAAAAYYK..","..KKKAAAAAAKK...",".KAAKAAAAAAAK...","KAAAAKBBBAAAAK..","KAAAAAKBBAAAAK..",".KAAAAAKKAAAK...","..KKKKKKKKKK....","....YY...YY....."],"move1":["................","................","................",".......KKKK.....","......KAAAAK....",".....KAAAAAAK...",".....KAAAAEAK...",".....KANAAAAYYK.",".....KAAAAAAYYK.","..KKKAAAAAAKK...",".KAAKAAAAAAAK...","KAAAAKBBBAAAAK..","KAAAAAKBBAAAAK..",".KAAAAAKKAAAK...","..KKKKKKKKKK....","...YY.....YY...."],"move2":["................","................","................","......KKKK......",".....KAAAAK.....","....KAAAAAAK....","....KAAAAEAK....","....KANAAAAYYK..","....KAAAAAAYYK..","..KKKAAAAAAKK...",".KAAKAAAAAAAK...","KAAAAKBBBAAAAK..","KAAAAAKBBAAAAK..",".KAAAAAKKAAAK...","..KKKKKKKKKK....",".....YY.YY......"],"blink":["................","................","................","......KKKK......",".....KAAAAK.....","....KAAAAAAK....","....KAAAAKAK....","....KANAAAAYYK..","....KAAAAAAYYK..","..KKKAAAAAAKK...",".KAAKAAAAAAAK...","KAAAAKBBBAAAAK..","KAAAAAKBBAAAAK..",".KAAAAAKKAAAK...","..KKKKKKKKKK....","....YY...YY....."],"bob":["................","................","................","................",".......KKKK.....","......KAAAAK....",".....KAAAAAAK...",".....KAAAAEAK...",".....KANAAAAYYK.","..KKKKAAAAAAYYK.",".KAAKAAAAAAAK...","KAAAAKBBBAAAAK..","KAAAAAKBBAAAAK..",".KAAAAAKKAAAK...","..KKKKKKKKKK....","....YY...YY....."]}},"frog":{"label":"Frog","ar":"ضفدع","treats":["🪰"],"sounds":{"en":["Ribbit","🪰?","*hop*","Croak~"],"ar":["نق نق","🪰؟","*نطة*","نقيق~"]},"speed":1.0,"bounce":2,"palettes":{"green":{"swatch":"#7ccf5a","K":"#1f4a17","A":"#7ccf5a","B":"#d9f2b8","W":"#ffffff","N":"#ff9eb0","E":"#111111"},"pink":{"swatch":"#ff9ecb","K":"#6b2447","A":"#ff9ecb","B":"#ffe1ef","W":"#ffffff","N":"#ff6fa1","E":"#111111"},"blue":{"swatch":"#5aa9e6","K":"#173a5c","A":"#5aa9e6","B":"#d4ecff","W":"#ffffff","N":"#ff9eb0","E":"#111111"}},"sprites":{"idle":["................","................","................","................","..KKK....KKK....",".KWEWK..KWEWK...",".KWWWKKKKWWWK...","KAAAAAAAAAAAAK..","KANAAAAAAAANAK..","KAAAAKKKKAAAAK..",".KAABBBBBBAAK...",".KABBBBBBBBAK...","KAABBBBBBBBAAK..","KAAKBBBBBBKAAK..",".KKAKKKKKKAKK...","..KK......KK...."],"move1":["................","................","................","................","..KKK....KKK....",".KWEWK..KWEWK...",".KWWWKKKKWWWK...","KAAAAAAAAAAAAK..","KANAAAAAAAANAK..","KAAAAKKKKAAAAK..",".KAABBBBBBAAK...",".KABBBBBBBBAK...","KAABBBBBBBBAAK..","KAAKBBBBBBKAAK..",".KKAKKKKKKAKK...","..KK......KK...."],"move2":["................","..KKK....KKK....",".KWEWK..KWEWK...",".KWWWKKKKWWWK...","KAAAAAAAAAAAAK..","KANAAAAAAAANAK..","KAAAAKKKKAAAAK..",".KAABBBBBBAAK...",".KABBBBBBBBAK...","KAABBBBBBBBAAK..","KAAKBBBBBBKAAK..",".KAK......KAK...",".KAK......KAK...","KAAK......KAAK..","KKK........KKK..","................"],"blink":["................","................","................","................","..KKK....KKK....",".KWKWK..KWKWK...",".KWWWKKKKWWWK...","KAAAAAAAAAAAAK..","KANAAAAAAAANAK..","KAAAAKKKKAAAAK..",".KAABBBBBBAAK...",".KABBBBBBBBAK...","KAABBBBBBBBAAK..","KAAKBBBBBBKAAK..",".KKAKKKKKKAKK...","..KK......KK...."],"bob":["................","................","................","................","................","...KKK....KKK...","..KWEWK..KWEWK..","..KWWWKKKKWWWK..",".KAAAAAAAAAAAAK.","KKANAAAAAAAANAK.",".KAABBBBBBAAK...",".KABBBBBBBBAK...","KAABBBBBBBBAAK..","KAAKBBBBBBKAAK..",".KKAKKKKKKAKK...","..KK......KK...."]}},"turtle":{"label":"Turtle","ar":"سلحفاة","treats":["🥬","🍓"],"sounds":{"en":["*slow*","🥬?","...zzz","♥"],"ar":["*على مهلي*","🥬؟","...زززز","♥"]},"speed":0.45,"bounce":0,"palettes":{"green":{"swatch":"#5fb35a","K":"#1f3d1c","G":"#5fb35a","g":"#3e8a3c","Y":"#e9d48a","A":"#9fd27a","N":"#ff9eb0","E":"#111111"},"brown":{"swatch":"#b07c4f","K":"#3a2414","G":"#b07c4f","g":"#7a5232","Y":"#efd9a6","A":"#c2d98a","N":"#ff9eb0","E":"#111111"},"sea":{"swatch":"#4aa3c7","K":"#123547","G":"#4aa3c7","g":"#2a6f8f","Y":"#f1e3b8","A":"#8fd3b0","N":"#ff9eb0","E":"#111111"}},"sprites":{"idle":["................","................","................","................","................","................","....KKKKKK......","...KGGgGGGK.....","..KGgGGGgGGK.KK.",".KGGGGgGGGGKKAAK",".KGgGGGGgGGKAAEK","KYYYYYYYYYYKAANK",".KKKKKKKKKKKKKK.",".KAK......KAK...",".KK.......KK....","................"],"move1":["................","................","................","................","................","................","....KKKKKK......","...KGGgGGGK.....","..KGgGGGgGGK.KK.",".KGGGGgGGGGKKAAK",".KGgGGGGgGGKAAEK","KYYYYYYYYYYKAANK",".KKKKKKKKKKKKKK.","KAK.......KAK...","KK........KK....","................"],"move2":["................","................","................","................","................","................","....KKKKKK......","...KGGgGGGK.....","..KGgGGGgGGK.KK.",".KGGGGgGGGGKKAAK",".KGgGGGGgGGKAAEK","KYYYYYYYYYYKAANK",".KKKKKKKKKKKKKK.","..KAK...KAK.....","..KK....KK......","................"],"blink":["................","................","................","................","................","................","....KKKKKK......","...KGGgGGGK.....","..KGgGGGgGGK.KK.",".KGGGGgGGGGKKAAK",".KGgGGGGgGGKAAKK","KYYYYYYYYYYKAANK",".KKKKKKKKKKKKKK.",".KAK......KAK...",".KK.......KK....","................"],"bob":["................","................","................","................","................","................","....KKKKKK......","...KGGgGGGK.....","..KGgGGGgGGK.KK.",".KGGGGgGGGGKKAAK",".KGgGGGGgGGKAAEK","KYYYYYYYYYYKAANK",".KKKKKKKKKKKKKK.",".KAK......KAK...",".KK.......KK....","................"]}},"penguin":{"treats":["🐟"],"label":"Penguin","ar":"بطريق","sounds":{"en":["Brrr ❄️","🐟?","*waddle*","Hi!"],"ar":["برررد ❄️","🐟؟","*يتمايل*","هلا!"]},"speed":0.7,"bounce":1,"palettes":{"classic":{"swatch":"#26303a","K":"#0b0f14","A":"#26303a","W":"#fbfbfb","Y":"#f5a623","E":"#0b0f14"},"emperor":{"swatch":"#ffd27a","K":"#0b0f14","A":"#2c3644","W":"#fff6dc","Y":"#ffb43a","E":"#0b0f14"},"baby":{"swatch":"#b9bec4","K":"#3a3f45","A":"#a9afb6","W":"#ffffff","Y":"#3a3f45","E":"#1b1b1b"}},"sprites":{"idle":["................","................","......KKKK......",".....KAAAAK.....",".....KAAWEWK....",".....KAAWWWKYY..",".....KAAWWWKK...","....KAAWWWWWK...","...KAAAWWWWWK...","...KAAAWWWWWK...","..KAKAAWWWWWK...","..KK.KAWWWWWK...",".....KAWWWWWK...",".....KAAWWWWK...","......KKKKKK....","......YY..YY...."],"move1":["................","................",".....KKKK.......","....KAAAAK......","....KAAWEWK.....","....KAAWWWKYY...","....KAAWWWKK....","...KAAWWWWWK....","..KAAAWWWWWK....","..KAAAWWWWWK....",".KAKAAWWWWWK....",".KK.KAWWWWWK....","....KAWWWWWK....","....KAAWWWWK....",".....KKKKKK.....",".....YY........."],"move2":["................","................",".......KKKK.....","......KAAAAK....","......KAAWEWK...","......KAAWWWKYY.","......KAAWWWKK..",".....KAAWWWWWK..","....KAAAWWWWWK..","....KAAAWWWWWK..","...KAKAAWWWWWK..","...KK.KAWWWWWK..","......KAWWWWWK..","......KAAWWWWK..",".......KKKKKK...","..........YY...."],"blink":["................","................","......KKKK......",".....KAAAAK.....",".....KAAWKWK....",".....KAAWWWKYY..",".....KAAWWWKK...","....KAAWWWWWK...","...KAAAWWWWWK...","...KAAAWWWWWK...","..KAKAAWWWWWK...","..KK.KAWWWWWK...",".....KAWWWWWK...",".....KAAWWWWK...","......KKKKKK....","......YY..YY...."],"bob":["................","................","................",".......KKKK.....","......KAAAAK....","......KAAWEWK...","......KAAWWWKYY.","....KAKAAWWWKK..","...KAAAWWWWWK...","...KAAAWWWWWK...","..KAKAAWWWWWK...","..KK.KAWWWWWK...",".....KAWWWWWK...",".....KAAWWWWK...","......KKKKKK....","......YY..YY...."]}},"sparrow":{"treats":["🌻","🍞"],"label":"Sparrow","ar":"عصفور","sounds":{"en":["Tweet!","Chirp chirp","🎶"],"ar":["تويت!","زقزقة","🎶"]},"speed":1.3,"bounce":0,"palettes":{"sparrow":{"swatch":"#9a6a3c","K":"#2b2016","A":"#9a6a3c","C":"#efe6d4","B":"#d8c7a8","D":"#5e3e22","Y":"#3a3a3a","N":"#c9a08a","E":"#111111"},"canary":{"swatch":"#ffd83d","K":"#4a3a10","A":"#ffd83d","C":"#fff3a6","B":"#ffe57a","D":"#e0a800","Y":"#f0a868","N":"#f0a868","E":"#111111"},"bluebird":{"swatch":"#3d8fe0","K":"#13263d","A":"#3d8fe0","C":"#f2b07a","B":"#f6c79c","D":"#1f5a9e","Y":"#2b2b2b","N":"#5b5b5b","E":"#111111"}},"sprites":{"idle":["................","................","................","................","................","................","......KKKK......",".....KAAAAK.....",".....KAAAEAKK...",".....KCCAAAKYK..","...KKDCCCCKK....","..KDDDBBBBK.....",".KDDDBBBBBK.....","KDDKKBBBBK......","KK....KKKK......","......N.N......."],"move1":["................","................","................","....KK..........","...KDDK.........","...KDDDK........","....KDDDK..KKK..",".....KDDDKKAAAK.","......KDDKAAEAKK","..KKKKKBBBCCAKYK","KKDDBBBBBBBCKK..",".KKDKKBBBBKK....","....KKKKKK......","................","................","................"],"move2":["................","................","................","................","................","................","...........KKK..","..........KAAAK.",".........KAAEAKK","..KKKKKKKKBCCAKY","KKDDBBBBDDDDKK..",".KKDKKBKDDDDK...","....KKKKDDDK....","........KDDK....",".........KK.....","................"],"blink":["................","................","................","................","................","................","......KKKK......",".....KAAAAK.....",".....KAAAKAKK...",".....KCCAAAKYK..","...KKDCCCCKK....","..KDDDBBBBK.....",".KDDDBBBBBK.....","KDDKKBBBBK......","KK....KKKK......","......N.N......."],"bob":["................","................","................","................","................","................","................",".......KKKK.....","......KAAAAK....","......KAAAEAKK..","...KKDKCCAAAKYK.","..KDDDBBBBK.....",".KDDDBBBBBK.....","KDDKKBBBBK......","KK....KKKK......","......N.N......."]}},"fish":{"treats":["🦐"],"label":"Fish","ar":"سمكة","sounds":{"en":["blub","🫧","blub blub","..."],"ar":["بلب","🫧","بلب بلب","..."]},"speed":0.9,"bounce":0,"float":true,"palettes":{"goldfish":{"swatch":"#ff8a2a","K":"#5a2a08","A":"#ff8a2a","B":"#ffc04d","C":"#fff1d6","E":"#1b1b1b"},"blue-tang":{"swatch":"#2f7de1","K":"#0b1d36","A":"#2f7de1","B":"#ffd23f","C":"#0e2f5c","E":"#1b1b1b"},"clownfish":{"swatch":"#ff7a1a","K":"#1b1b1b","A":"#ff7a1a","B":"#1b1b1b","C":"#ffffff","E":"#1b1b1b"}},"sprites":{"idle":["................","................","................","................","................","........KKKK....","..KK...KAAAAK...","..KBK.KACAAAAK..","..KBBKAACAAEAAK.","...KBBAACAAAAAK.","..KBBKAACAAAAK..","..KBK.KACAAAK...","..KK...KKKKK....","................","................","................"],"move2":["................","................","................","................","................","........KKKK....","....K..KAAAAK...","...KBK.KACAAAAK.","...KBBKACAAEAAK.","..KBBBAACAAAAAK.",".KBBBKAACAAAAK..",".KBBK.KACAAAK...",".KK....KKKKK....","................","................","................"],"move1":["................","................","................","................","................","........KKKK....","..KK...KAAAAK...","..KBK.KACAAAAK..","..KBBKAACAAEAAK.","...KBBAACAAAAAK.","..KBBKAACAAAAK..","..KBK.KACAAAK...","..KK...KKKKK....","................","................","................"],"blink":["................","................","................","................","................","........KKKK....","..KK...KAAAAK...","..KBK.KACAAAAK..","..KBBKAACAAKAAK.","...KBBAACAAAAAK.","..KBBKAACAAAAK..","..KBK.KACAAAK...","..KK...KKKKK....","................","................","................"],"bob":["................","................","................","................","................","........KKKK....","..KK...KAAAAK...","..KBK.KACAAAAK..","..KBBKAACAAEAAK.","...KBBAACAAAAAK.","..KBBKAACAAAAK..","..KBK.KACAAAK...","..KK...KKKKK....","................","................","................"]}},"magical-girl":{"group":"anime","label":"Magical Girl","ar":"فتاة سحرية","treats":["🍡","🍓"],"sounds":{"en":["✨ Sparkle!","Love & stars!","♥","Hehe~"],"ar":["✨ بريق!","حب ونجوم!","♥","هيهي~"]},"speed":1.0,"bounce":1,"palettes":{"pink":{"swatch":"#ff8fc8","K":"#4a2440","H":"#ff8fc8","S":"#ffe3d1","E":"#5a2a7a","N":"#ff9eb0","M":"#c0506a","C":"#fff4fa","c":"#ffb8dc","A":"#ffd84a","W":"#ffffff","L":"#ff6fa8"},"mint":{"swatch":"#7fe0c8","K":"#1f4a40","H":"#7fe0c8","S":"#ffe3d1","E":"#1f6a5a","N":"#ff9eb0","M":"#c0506a","C":"#f2fffb","c":"#b8f0e0","A":"#ffd84a","W":"#ffffff","L":"#3fbfa0"},"lavender":{"swatch":"#b9a2ff","K":"#33245a","H":"#b9a2ff","S":"#ffe3d1","E":"#4a2a9a","N":"#ff9eb0","M":"#c0506a","C":"#f8f4ff","c":"#d9ccff","A":"#ffd84a","W":"#ffffff","L":"#8a6fe0"}},"sprites":{"idle":["....KKKKKKK.....","...KHHHHHHHK....","..KHHHHHHHAHK...","KKHHHHHHHHHHHKK.","HKHHSSSSSSSHHKH.","HKHSSSSSSSSSHKH.","HKHSSESSSESSHKH.","HKHSSESSSESSHKH.","HKHSNSSSSSNSHKH.","HHKHSSSMSSSHKHH.","KH..KCCACCK..HK.",".K.KSCCCCCSK.K..","...KcCCCCCcK....","..KcWcWcWcWcK...","....KSK.KSK.....","....KLK.KLK....."],"move1":["....KKKKKKK.....","...KHHHHHHHK....","..KHHHHHHHAHK...","KKHHHHHHHHHHHKK.","HKHHSSSSSSSHHKH.","HKHSSSSSSSSSHKH.","HKHSSESSSESSHKH.","HKHSSESSSESSHKH.","HKHSNSSSSSNSHKH.","HHKHSSSMSSSHKHH.","KH..KCCACCK..HK.",".K.KSCCCCCSK.K..","...KcCCCCCcK....","..KcWcWcWcWcK...","....KSK.KLK.....","....KLK........."],"move2":["....KKKKKKK.....","...KHHHHHHHK....","..KHHHHHHHAHK...","KKHHHHHHHHHHHKK.","HKHHSSSSSSSHHKH.","HKHSSSSSSSSSHKH.","HKHSSESSSESSHKH.","HKHSSESSSESSHKH.","HKHSNSSSSSNSHKH.","HHKHSSSMSSSHKHH.","KH..KCCACCK..HK.",".K.KSCCCCCSK.K..","...KcCCCCCcK....","..KcWcWcWcWcK...","....KLK.KSK.....","........KLK....."],"blink":["....KKKKKKK.....","...KHHHHHHHK....","..KHHHHHHHAHK...","KKHHHHHHHHHHHKK.","HKHHSSSSSSSHHKH.","HKHSSSSSSSSSHKH.","HKHSSKSSSKSSHKH.","HKHSSKSSSKSSHKH.","HKHSNSSSSSNSHKH.","HHKHSSSMSSSHKHH.","KH..KCCACCK..HK.",".K.KSCCCCCSK.K..","...KcCCCCCcK....","..KcWcWcWcWcK...","....KSK.KSK.....","....KLK.KLK....."],"bob":["................",".....KKKKKKK....","....KHHHHHHHK...","...KHHHHHHHAHK..",".KKHHHHHHHHHHHKK",".HKHHSSSSSSSHHKH",".HKHSSSSSSSSSHKH",".HKHSSESSSESSHKH",".HKHSSESSSESSHKH",".HKHSNSSSSSNSHKH","KHHKHSSSMSSSHKHH",".K.KSCCCCCSK.K..","...KcCCCCCcK....","..KcWcWcWcWcK...","....KSK.KSK.....","....KLK.KLK....."]}},"ninja":{"group":"anime","label":"Ninja","ar":"نينجا","treats":["🍙","🍡"],"sounds":{"en":["Nin nin!","*poof*","🍙?","Shh..."],"ar":["نِن نِن!","*بوف*","🍙؟","شششش..."]},"speed":1.3,"bounce":1,"palettes":{"navy":{"swatch":"#2b3550","K":"#141824","C":"#2b3550","A":"#e0453a","S":"#ffe0cc","E":"#1b1b1b"},"shadow":{"swatch":"#2a2a2e","K":"#0a0a0c","C":"#2f2f35","A":"#8a4fe0","S":"#ffe0cc","E":"#1b1b1b"},"snow":{"swatch":"#e8ecf2","K":"#4a5260","C":"#e8ecf2","A":"#3a7bd5","S":"#ffe0cc","E":"#1b1b1b"}},"sprites":{"idle":["....KKKKKKK.....","...KCCCCCCCK....","..KCCCCCCCCCK...",".KAAAAAAAAAAAKAA",".KCCCCCCCCCCCK.A",".KCSSSSSSSSSCK..",".KCSSESSSESSCK..",".KCSSESSSESSCK..",".KCCCCCCCCCCCK..","..KCCCCCCCCCK...","....KCCCCCK.....","...KSCCCCCSK....","...KCAAAAACK....","...KCCCCCCCK....","....KCK.KCK.....","....KKK.KKK....."],"move1":["....KKKKKKK.....","...KCCCCCCCK....","..KCCCCCCCCCK...",".KAAAAAAAAAAAKAA",".KCCCCCCCCCCCK.A",".KCSSSSSSSSSCK..",".KCSSESSSESSCK..",".KCSSESSSESSCK..",".KCCCCCCCCCCCK..","..KCCCCCCCCCK...","....KCCCCCK.....","...KSCCCCCSK....","...KCAAAAACK....","...KCCCCCCCK....","....KCK.KKK.....","....KKK........."],"move2":["....KKKKKKK.....","...KCCCCCCCK....","..KCCCCCCCCCK...",".KAAAAAAAAAAAKAA",".KCCCCCCCCCCCK.A",".KCSSSSSSSSSCK..",".KCSSESSSESSCK..",".KCSSESSSESSCK..",".KCCCCCCCCCCCK..","..KCCCCCCCCCK...","....KCCCCCK.....","...KSCCCCCSK....","...KCAAAAACK....","...KCCCCCCCK....","....KKK.KCK.....","........KKK....."],"blink":["....KKKKKKK.....","...KCCCCCCCK....","..KCCCCCCCCCK...",".KAAAAAAAAAAAKAA",".KCCCCCCCCCCCK.A",".KCSSSSSSSSSCK..",".KCSSKSSSKSSCK..",".KCSSKSSSKSSCK..",".KCCCCCCCCCCCK..","..KCCCCCCCCCK...","....KCCCCCK.....","...KSCCCCCSK....","...KCAAAAACK....","...KCCCCCCCK....","....KCK.KCK.....","....KKK.KKK....."],"bob":["................",".....KKKKKKK....","....KCCCCCCCK...","...KCCCCCCCCCK..","..KAAAAAAAAAAAKA","..KCCCCCCCCCCCK.","..KCSSSSSSSSSCK.","..KCSSESSSESSCK.","..KCSSESSSESSCK.","..KCCCCCCCCCCCK.","...KCCCCCCCCCK..","...KSCCCCCSK....","...KCAAAAACK....","...KCCCCCCCK....","....KCK.KCK.....","....KKK.KKK....."]}},"neko-girl":{"group":"anime","label":"Neko Girl","ar":"فتاة القطة","treats":["🐟","🍰"],"sounds":{"en":["Nya~","Nyan!","🐟?","*purr*"],"ar":["نيا~","نيان!","🐟؟","*خرخرة*"]},"speed":1.1,"bounce":1,"palettes":{"orange":{"swatch":"#ffb052","K":"#4a2c17","H":"#ffb052","N":"#ff9eb0","S":"#ffe3d1","E":"#2e7d5b","M":"#c0506a","C":"#8ad0ff","W":"#ffffff","L":"#5a3a2a"},"black":{"swatch":"#2f2f38","K":"#0d0d12","H":"#34343e","N":"#ff8fa6","S":"#ffe3d1","E":"#d4a017","M":"#c0506a","C":"#ff8fb8","W":"#ffffff","L":"#2b2b33"},"white":{"swatch":"#f5f5f5","K":"#6b6157","H":"#fbfbfb","N":"#ffa3b5","S":"#ffe3d1","E":"#3c7fd6","M":"#c0506a","C":"#b9a2ff","W":"#ffffff","L":"#6b6157"}},"sprites":{"idle":["..KK.......KK...","..KNHKKKKKHNK...","..KHHHHHHHHHK...",".KHHHHHHHHHHHK..",".KHHSSHSHSSHHK..",".KHSSSSSSSSSHK..",".KHSSESSSESSHK..",".KHSSESSSESSHK..",".KHSNSSSSSNSHK..","..KHSSSMSSSHK...","....KCCCCCK.....","...KSCCWCCSK....","...KCCCCCCCK.KHK","...KCCCCCCCKKHK.","....KSK.KSK.....","....KLK.KLK....."],"move1":["..KK.......KK...","..KNHKKKKKHNK...","..KHHHHHHHHHK...",".KHHHHHHHHHHHK..",".KHHSSHSHSSHHK..",".KHSSSSSSSSSHK..",".KHSSESSSESSHK..",".KHSSESSSESSHK..",".KHSNSSSSSNSHK..","..KHSSSMSSSHK...","....KCCCCCK.....","...KSCCWCCSK....","...KCCCCCCCK.KHK","...KCCCCCCCKKHK.","....KSK.KLK.....","....KLK........."],"move2":["..KK.......KK...","..KNHKKKKKHNK...","..KHHHHHHHHHK...",".KHHHHHHHHHHHK..",".KHHSSHSHSSHHK..",".KHSSSSSSSSSHK..",".KHSSESSSESSHK..",".KHSSESSSESSHK..",".KHSNSSSSSNSHK..","..KHSSSMSSSHK...","....KCCCCCK.....","...KSCCWCCSK....","...KCCCCCCCK.KHK","...KCCCCCCCKKHK.","....KLK.KSK.....","........KLK....."],"blink":["..KK.......KK...","..KNHKKKKKHNK...","..KHHHHHHHHHK...",".KHHHHHHHHHHHK..",".KHHSSHSHSSHHK..",".KHSSSSSSSSSHK..",".KHSSKSSSKSSHK..",".KHSSKSSSKSSHK..",".KHSNSSSSSNSHK..","..KHSSSMSSSHK...","....KCCCCCK.....","...KSCCWCCSK....","...KCCCCCCCK.KHK","...KCCCCCCCKKHK.","....KSK.KSK.....","....KLK.KLK....."],"bob":["................","...KK.......KK..","...KNHKKKKKHNK..","...KHHHHHHHHHK..","..KHHHHHHHHHHHK.","..KHHSSHSHSSHHK.","..KHSSSSSSSSSHK.","..KHSSESSSESSHK.","..KHSSESSSESSHK.","..KHSNSSSSSNSHK.","...KHSSSMSSSHK..","...KSCCWCCSK....","...KCCCCCCCK.KHK","...KCCCCCCCKKHK.","....KSK.KSK.....","....KLK.KLK....."]}},"samurai":{"group":"anime","label":"Samurai","ar":"ساموراي","treats":["🍵","🍙"],"sounds":{"en":["Hai!","*bows*","🍵?","Honor!"],"ar":["هاي!","*ينحني*","🍵؟","شرف!"]},"speed":1.0,"bounce":1,"palettes":{"blue":{"swatch":"#3a6fb0","K":"#141418","H":"#2b2b33","S":"#ffe0cc","E":"#2a1a10","N":"#ff9eb0","M":"#a04050","C":"#3a6fb0","W":"#f4f0e6","A":"#e0c04a","D":"#4a4a5c","L":"#a07850"},"red":{"swatch":"#c0392b","K":"#1a0f0f","H":"#2b2b33","S":"#ffe0cc","E":"#2a1a10","N":"#ff9eb0","M":"#a04050","C":"#c0392b","W":"#f4f0e6","A":"#2b2b33","D":"#3a3a44","L":"#a07850"},"green":{"swatch":"#3f8f5a","K":"#10180f","H":"#5a3a2a","S":"#ffe0cc","E":"#2a1a10","N":"#ff9eb0","M":"#a04050","C":"#3f8f5a","W":"#f4f0e6","A":"#e0c04a","D":"#5a4a3a","L":"#a07850"}},"sprites":{"idle":["......KKK.......",".....KHHHK......","...KKKHHHKKK....","..KHHHHHHHHHK...",".KHHSSSSSSSHHK..",".KHSSSSSSSSSHK..",".KHSSESSSESSHK..",".KHSSESSSESSHK..",".KHSNSSSSSNSHK..","..KHSSSMSSSHK...","....KWCCCWK.....","...KSCWCWCSK....","...KAAAAAAAK....","..KDDDDDDDDDK...","....KDK.KDK.....","....KLK.KLK....."],"move1":["......KKK.......",".....KHHHK......","...KKKHHHKKK....","..KHHHHHHHHHK...",".KHHSSSSSSSHHK..",".KHSSSSSSSSSHK..",".KHSSESSSESSHK..",".KHSSESSSESSHK..",".KHSNSSSSSNSHK..","..KHSSSMSSSHK...","....KWCCCWK.....","...KSCWCWCSK....","...KAAAAAAAK....","..KDDDDDDDDDK...","....KDK.KLK.....","....KLK........."],"move2":["......KKK.......",".....KHHHK......","...KKKHHHKKK....","..KHHHHHHHHHK...",".KHHSSSSSSSHHK..",".KHSSSSSSSSSHK..",".KHSSESSSESSHK..",".KHSSESSSESSHK..",".KHSNSSSSSNSHK..","..KHSSSMSSSHK...","....KWCCCWK.....","...KSCWCWCSK....","...KAAAAAAAK....","..KDDDDDDDDDK...","....KLK.KDK.....","........KLK....."],"blink":["......KKK.......",".....KHHHK......","...KKKHHHKKK....","..KHHHHHHHHHK...",".KHHSSSSSSSHHK..",".KHSSSSSSSSSHK..",".KHSSKSSSKSSHK..",".KHSSKSSSKSSHK..",".KHSNSSSSSNSHK..","..KHSSSMSSSHK...","....KWCCCWK.....","...KSCWCWCSK....","...KAAAAAAAK....","..KDDDDDDDDDK...","....KDK.KDK.....","....KLK.KLK....."],"bob":["................",".......KKK......","......KHHHK.....","....KKKHHHKKK...","...KHHHHHHHHHK..","..KHHSSSSSSSHHK.","..KHSSSSSSSSSHK.","..KHSSESSSESSHK.","..KHSSESSSESSHK.","..KHSNSSSSSNSHK.","...KHSSSMSSSHK..","...KSCWCWCSK....","...KAAAAAAAK....","..KDDDDDDDDDK...","....KDK.KDK.....","....KLK.KLK....."]}},"little-witch":{"group":"anime","label":"Little Witch","ar":"ساحرة صغيرة","treats":["🍬","🎃"],"sounds":{"en":["Abracadabra~","✨🧹","*giggle*","Poof!"],"ar":["أبرا كدابرا~","✨🧹","*ضحكة*","بوف!"]},"speed":1.0,"bounce":1,"palettes":{"purple":{"swatch":"#5b3a9a","K":"#221433","P":"#5b3a9a","A":"#ffd84a","H":"#ff9b5a","S":"#ffe3d1","E":"#2a6a4a","N":"#ff9eb0","M":"#c0506a","C":"#4a2f7a","L":"#2b1d12"},"midnight":{"swatch":"#2a2a33","K":"#0d0d12","P":"#2a2a33","A":"#9fd0ff","H":"#e8e8f0","S":"#ffe3d1","E":"#8a2a9a","N":"#ff9eb0","M":"#c0506a","C":"#33334a","L":"#1a1a22"},"pink":{"swatch":"#e86aa8","K":"#4a1a33","P":"#e86aa8","A":"#fff2a8","H":"#ffd8a8","S":"#ffe3d1","E":"#6a2a8a","N":"#ff9eb0","M":"#c0506a","C":"#c04a8a","L":"#4a1a33"}},"sprites":{"idle":[".........KK.....","........KPPK....",".......KPPPK....","......KPPPPK....",".KPPPPPPAPPPPPK.","KPPPPPPPPPPPPPPK",".KHHSSSSSSSHHK..",".KHSSESSSESSHK..",".KHSSESSSESSHK..",".KHSNSSMSSNSHK..",".KHKCCCCCCCKHK..",".KHKSCCCCCSKHK..","..KCCCCCCCCCK...",".KCCCCCCCCCCCK..","....KSK.KSK.....","....KLK.KLK....."],"move1":[".........KK.....","........KPPK....",".......KPPPK....","......KPPPPK....",".KPPPPPPAPPPPPK.","KPPPPPPPPPPPPPPK",".KHHSSSSSSSHHK..",".KHSSESSSESSHK..",".KHSSESSSESSHK..",".KHSNSSMSSNSHK..",".KHKCCCCCCCKHK..",".KHKSCCCCCSKHK..","..KCCCCCCCCCK...",".KCCCCCCCCCCCK..","....KSK.KLK.....","....KLK........."],"move2":[".........KK.....","........KPPK....",".......KPPPK....","......KPPPPK....",".KPPPPPPAPPPPPK.","KPPPPPPPPPPPPPPK",".KHHSSSSSSSHHK..",".KHSSESSSESSHK..",".KHSSESSSESSHK..",".KHSNSSMSSNSHK..",".KHKCCCCCCCKHK..",".KHKSCCCCCSKHK..","..KCCCCCCCCCK...",".KCCCCCCCCCCCK..","....KLK.KSK.....","........KLK....."],"blink":[".........KK.....","........KPPK....",".......KPPPK....","......KPPPPK....",".KPPPPPPAPPPPPK.","KPPPPPPPPPPPPPPK",".KHHSSSSSSSHHK..",".KHSSKSSSKSSHK..",".KHSSKSSSKSSHK..",".KHSNSSMSSNSHK..",".KHKCCCCCCCKHK..",".KHKSCCCCCSKHK..","..KCCCCCCCCCK...",".KCCCCCCCCCCCK..","....KSK.KSK.....","....KLK.KLK....."],"bob":["................","..........KK....",".........KPPK...","........KPPPK...",".......KPPPPK...","..KPPPPPPAPPPPPK",".KPPPPPPPPPPPPPP","..KHHSSSSSSSHHK.","..KHSSESSSESSHK.","..KHSSESSSESSHK.",".KKHSNSSMSSNSHK.",".KHKSCCCCCSKHK..","..KCCCCCCCCCK...",".KCCCCCCCCCCCK..","....KSK.KSK.....","....KLK.KLK....."]}}};
  const STORE_KEY = "pixel-pets:v1";
  const SPEEDS = { slow: 6, normal: 10, fast: 16 };
  const SIZES = { S: 24, M: 32, L: 48, XL: 64 };
  const FRAME_MS = 100;
  const script = document.currentScript;
  const LANG_KEY = "pixel-pets:lang";

  // ------------------------------------------------------------ i18n
  const I18N = {
    en: {
      dir: "ltr", pets: "Pets", anime: "Anime", color: "Color", size: "Size", speed: "Speed", speech: "Speech", language: "Language",
      slow: "🐢 Slow", normal: "🚶 Normal", fast: "⚡ Fast", on: "💬 On", off: "🤫 Off",
      love: "❤️ Pet", treat: "🍪 Treat", add: "➕ Add pet", remove: "🗑 Remove",
      close: "Close (Esc)", clickMe: "Click me!", nom: "*nom*", settings: "Pixel Pets settings",
    },
    ar: {
      dir: "rtl", pets: "الحيوانات", anime: "شخصيات أنمي", color: "اللون", size: "الحجم", speed: "السرعة", speech: "الكلام", language: "اللغة",
      slow: "🐢 بطيء", normal: "🚶 عادي", fast: "⚡ سريع", on: "💬 تشغيل", off: "🤫 إيقاف",
      love: "❤️ دلّعه", treat: "🍪 حلاوة", add: "➕ حيوان جديد", remove: "🗑 حذف",
      close: "إغلاق (Esc)", clickMe: "اضغط عليّ!", nom: "*هام هام*", settings: "إعدادات الحيوانات",
    },
  };
  let lang = (() => {
    try { const l = localStorage.getItem(LANG_KEY); if (I18N[l]) return l; } catch (_) {}
    const d = script && script.dataset && script.dataset.lang;
    return I18N[d] ? d : "en";
  })();
  const T = (k) => I18N[lang][k];
  const petName = (d) => (lang === "ar" ? d.ar : d.label);
  const petSounds = (d) => d.sounds[lang] || d.sounds.en;

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
    .menu { position: absolute; pointer-events: auto; width: 256px; box-sizing: border-box;
      background: #fffdf6; color: #2b2418; border: 2px solid #2b2418; border-radius: 14px;
      box-shadow: 4px 4px 0 rgba(0,0,0,.18); padding: 10px 10px 12px; display: none; max-height: calc(100vh - 16px); overflow-y: auto;
      font: 13px/1.35 system-ui, -apple-system, "Segoe UI", sans-serif; user-select: none; }
    .menu.open { display: block; animation: pop .12s ease-out; }
    @keyframes pop { from { transform: scale(.94); opacity: 0; } }
    .top { display: flex; align-items: center; justify-content: space-between; font-weight: 700; }
    .x { all: unset; cursor: pointer; padding: 0 6px; font-size: 16px; border-radius: 6px; }
    .x:hover { background: #f1ead6; }
    h4 { margin: 10px 0 5px; font-size: 10.5px; letter-spacing: .07em; text-transform: uppercase; opacity: .6; }
    .grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 4px; }
    .row { display: flex; gap: 4px; flex-wrap: wrap; }
    .btn { all: unset; box-sizing: border-box; cursor: pointer; border: 2px solid transparent; border-radius: 8px;
      background: #f3eedf; padding: 4px 7px; text-align: center; font-size: 12px; white-space: nowrap; }
    .btn:hover { border-color: #cfc4a6; }
    .btn.on { border-color: #2b2418; background: #fff; }
    .btn:focus-visible { outline: 2px solid #3b82f6; outline-offset: 1px; }
    .pick { padding: 4px 1px 3px; font-size: 10px; line-height: 1.15; white-space: normal; overflow-wrap: anywhere; }
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
      this.bubble.dir = "auto";
      this.canvas = el("canvas");
      this.canvas.width = 16;
      this.canvas.height = 16;
      this.canvas.title = T("clickMe");
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
        if (this.idleAnim === "talk") this.say(rand(petSounds(this.def)), 18);
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
          if (this.talk) this.say(T("nom"), 8);
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
      box.dir = T("dir");
      box.setAttribute("aria-label", T("settings"));
      const def = PETS[pet.type];

      const top = el("div", "top");
      top.append(el("span", null, "🐾 " + petName(def)));
      const x = el("button", "x", "×");
      x.type = "button";
      x.title = T("close");
      x.addEventListener("click", (e) => { e.stopPropagation(); close(); });
      top.append(x);
      box.append(top);

      for (const group of ["pets", "anime"]) {
        const entries = Object.entries(PETS).filter(([, p]) => (p.group === "anime" ? "anime" : "pets") === group);
        if (!entries.length) continue;
        section(T(group));
        const grid = el("div", "grid");
        for (const [key, p] of entries) {
          const b = button("", key === pet.type, () => {
            pet.type = key;
            pet.color = Object.keys(p.palettes)[0];
            pet.hush();
            pet.draw("idle");
            if (pet.talk) pet.say(rand(petSounds(p)), 14);
            changed();
          }, "pick");
          const c = el("canvas");
          c.width = c.height = 16;
          paint(c.getContext("2d"), p.sprites.idle, Object.values(p.palettes)[0], false);
          b.append(c, document.createTextNode(petName(p)));
          b.title = petName(p);
          grid.append(b);
        }
        box.append(grid);
      }

      section(T("color"));
      const colors = el("div", "row");
      for (const [key, pal] of Object.entries(def.palettes)) {
        const b = button("", key === pet.color, () => { pet.color = key; pet.draw(pet.sprite); changed(); }, "sw");
        b.style.background = pal.swatch;
        b.title = key;
        b.setAttribute("aria-label", key);
        colors.append(b);
      }
      box.append(colors);

      section(T("size"));
      const sizes = el("div", "row");
      for (const k of Object.keys(SIZES)) {
        sizes.append(button(k, k === pet.size, () => { pet.size = k; pet.applySize(); pet.place(); changed(); }, "grow"));
      }
      box.append(sizes);

      section(T("speed"));
      const speeds = el("div", "row");
            for (const k of Object.keys(SPEEDS)) {
        speeds.append(button(T(k), k === pet.speed, () => { pet.speed = k; changed(); }, "grow"));
      }
      box.append(speeds);

      section(T("speech"));
      const talk = el("div", "row");
      talk.append(
        button(T("on"), pet.talk, () => { pet.talk = true; pet.say(rand(petSounds(def)), 12); changed(); }, "grow"),
        button(T("off"), !pet.talk, () => { pet.talk = false; pet.hush(); changed(); }, "grow"),
      );
      box.append(talk);

      section(T("language"));
      const langs = el("div", "row");
      for (const [code, label] of [["en", "English"], ["ar", "العربية"]]) {
        langs.append(button(label, code === lang, () => {
          lang = code;
          try { localStorage.setItem(LANG_KEY, code); } catch (_) {}
          for (const p of pets) p.canvas.title = T("clickMe");
          render();
        }, "grow"));
      }
      box.append(langs);

      const actions = el("div", "actions");
      actions.append(
        button(T("love"), false, () => { pet.hearts(5); }),
        button(T("treat"), false, () => { const p = pet; close(); p.dropTreat(); }),
        button(T("add"), false, () => {
          const type = rand(Object.keys(PETS));
          const p = add({ ...pet.settings(), type, color: rand(Object.keys(PETS[type].palettes)) });
          p.x = pet.x + 24; p.y = pet.y; p.place();
          save();
          open(p);
        }),
        button(T("remove"), false, () => { const p = pet; close(); p.remove(); save(); }, "danger"),
      );
      box.append(actions);
      position();
    }

    function position() {
      const w = 256, h = box.offsetHeight || 420, m = 8;
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
    get lang() { return lang; },
    setLang(l) { if (I18N[l]) { lang = l; try { localStorage.setItem(LANG_KEY, l); } catch (_) {} if (menu.pet) menu.open(menu.pet); } },
    reset() { try { localStorage.removeItem(STORE_KEY); localStorage.removeItem(LANG_KEY); } catch (_) {} },
    destroy() { destroyed = true; guard.disconnect(); menu.close(); host.remove(); delete window.PixelPets; },
  };
})();
