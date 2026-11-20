/*! Pixel Pets: cute pixel-art pets that follow your cursor. Click a pet to customize it. https://github.com/mPhpMaster/pixel-pets (MIT) */
// Self-contained: no images, no network, no eval. Works on strict-CSP pages too.
(function pixelPets() {
  "use strict";
  if (window.PixelPets && window.PixelPets.root) return;

  const PETS = {"cat":{"treats":["🐟"],"label":"Cat","ar":"قطة","sounds":{"en":["Meow","Purr~","Mrrp?","😺"],"ar":["مياو","خرررر~","مياو؟","😺"]},"speed":1.0,"bounce":0,"palettes":{"orange":{"swatch":"#f6a54c","K":"#4a2c17","A":"#f6a54c","W":"#fff6e8","N":"#ff9eb0","E":"#2b1a10"},"black":{"swatch":"#2f2f38","K":"#0d0d12","A":"#34343e","W":"#5a5a66","N":"#ff8fa6","E":"#f5d34a"},"grey":{"swatch":"#a3aab3","K":"#3a3f46","A":"#a9b0b8","W":"#f3f5f7","N":"#ff9eb0","E":"#1d2733"},"white":{"swatch":"#ffffff","K":"#6b6157","A":"#fffdf8","W":"#ffffff","N":"#ffa3b5","E":"#3c7fd6"}},"sprites":{"idle":["................",".KK........KK...",".KAK......KAK...",".KNAKKKKKKANK...",".KAAAAAAAAAAK...","KAAAAAAAAAAAAK..","KAAAEAAAAEAAAK..","KAAAEAAAAEAAAK..","KANAAWWWWAANAK..",".KAAAWNNWAAAK...","..KKAAAAAAKK....","...KAWWWWAK.KK..","..KAAWWWWAAKAK..","..KAAWWWWAAKAK..","..KAAAAAAAAKK...","...KWKKKKWK....."],"move1":["................","................","........KK...KK.","........KAK.KAK.",".......KANKKKNAK",".......KAAAAAAAK",".K.....KAAAAEAAK","KAK....KAAAAEAAK","KAK....KANAAWWNK",".KAK...KAAAAWWK.","..KAKKKKKAAAAK..","...KAAAAAKKKK...","...KAAAAWWAK....","...KKAKKKKAK....","..KAK....KAK....","..KK.....KK....."],"move2":["................","................","................","........KK...KK.","........KAK.KAK.",".......KANKKKNAK",".......KAAAAAAAK",".K.....KAAAAEAAK","KAK....KAAAAEAAK","KAK....KANAAWWNK",".KAK...KAAAAWWK.","..KAKKKKKAAAAK..","...KAAAAAKKKK...","...KAAAAWWAK....","....KAK.KAK.....","....KK..KK......"],"blink":["................",".KK........KK...",".KAK......KAK...",".KNAKKKKKKANK...",".KAAAAAAAAAAK...","KAAAAAAAAAAAAK..","KAAAKAAAAKAAAK..","KAAAKAAAAKAAAK..","KANAAWWWWAANAK..",".KAAAWNNWAAAK...","..KKAAAAAAKK....","...KAWWWWAK.KK..","..KAAWWWWAAKAK..","..KAAWWWWAAKAK..","..KAAAAAAAAKK...","...KWKKKKWK....."],"bob":["................","................","..KK........KK..","..KAK......KAK..","..KNAKKKKKKANK..","..KAAAAAAAAAAK..",".KAAAAAAAAAAAAK.",".KAAAEAAAAEAAAK.",".KAAAEAAAAEAAAK.",".KANAAWWWWAANAK.","..KAAAWNNWAAAK..","...KAWWWWAK.KK..","..KAAWWWWAAKAK..","..KAAWWWWAAKAK..","..KAAAAAAAAKK...","...KWKKKKWK....."]}},"dog":{"treats":["🦴"],"label":"Dog","ar":"كلب","sounds":{"en":["Woof!","Arf arf","🦴?","*wags*"],"ar":["هاو!","هاو هاو","🦴؟","*يهز ذيله*"]},"speed":1.1,"bounce":0,"palettes":{"brown":{"swatch":"#a8703f","K":"#2b1d12","A":"#a8703f","B":"#6e4423","W":"#ecd9bd","N":"#1b1b1b","E":"#1b1b1b"},"golden":{"swatch":"#e8b860","K":"#4a3418","A":"#e8b860","B":"#c48a35","W":"#fbefd5","N":"#2b1d12","E":"#2b1d12"},"husky":{"swatch":"#7d8790","K":"#1f2328","A":"#7d8790","B":"#3f464d","W":"#f4f4f4","N":"#1b1b1b","E":"#4aa3e0"},"black":{"swatch":"#26262a","K":"#000000","A":"#2a2a2f","B":"#141416","W":"#c79a6b","N":"#000000","E":"#c79a6b"}},"sprites":{"idle":["................","................",".......KKKK.....","......KAAAAK....",".....KBAAAEAKK..",".....KBAAAAAAAK.",".....KBKAAAAANK.","......KKAAAAKK..",".......KAAAAK...","..K....KAWAAK...",".KAK..KAWWAAK...",".KAK..KAWWAAK...","..KAK.KAAAAAAK..","...KAKAAAKAAAK..","....KAAAKKAAK...",".....KKKK.KKK..."],"move1":["................","................","................","..........KKKK..",".........KAAAAK.",".........KBAEAAK",".K.......KBAAAAN","KAK......KBKAAK.",".KAK.KKKKKKAAK..","..KAKAAAAAAAAK..","...KAAAAAAAAAK..","...KAAAAAAWWAK..","...KKAKKKKKAKK..","..KAK......KAK..","..KK.......KK...","................"],"move2":["................","................","................","..........KKKK..",".........KAAAAK.",".........KBAEAAK","K........KBAAAAN","KAK......KBKAAK.",".KAK.KKKKKKAAK..","..KAKAAAAAAAAK..","...KAAAAAAAAAK..","...KAAAAAAWWAK..","...KKAKKKKKAKK..","....KAK..KAK....","....KK...KK.....","................"],"blink":["................","................",".......KKKK.....","......KAAAAK....",".....KBAAAKAKK..",".....KBAAAAAAAK.",".....KBKAAAAANK.","......KKAAAAKK..",".......KAAAAK...","..K....KAWAAK...",".KAK..KAWWAAK...",".KAK..KAWWAAK...","..KAK.KAAAAAAK..","...KAKAAAKAAAK..","....KAAAKKAAK...",".....KKKK.KKK..."],"bob":["................","................","................","........KKKK....",".......KAAAAK...","......KBAAAEAKK.","......KBAAAAAAAK","......KBKAAAAANK",".......KKAAAAKK.","..K....KAWAAK...",".KAK..KAWWAAK...",".KAK..KAWWAAK...","..KAK.KAAAAAAK..","...KAKAAAKAAAK..","....KAAAKKAAK...",".....KKKK.KKK..."]}},"cockatiel":{"treats":["🌻","🍎"],"label":"Cockatiel","ar":"كوكاتيل","sounds":{"en":["Peace be upon you","Mwahhh","🎶","Hello!"],"ar":["السلام عليكم","امواححح","🎶","هلا!"]},"speed":1.2,"bounce":0,"palettes":{"lutino":{"swatch":"#fbe36a","K":"#4a4030","W":"#fbf7e8","w":"#e8dfbf","Y":"#fbe36a","y":"#f0cf3a","O":"#f5893a","E":"#b3202a","P":"#f2b5a5","G":"#efe2a0"},"grey":{"swatch":"#8f8f8f","K":"#2e2a26","W":"#a3a3a3","w":"#7c7c7c","Y":"#fff1a8","y":"#d9c76a","O":"#f5893a","E":"#1b1b1b","P":"#a59a8e","G":"#6d6d6d"},"white-face":{"swatch":"#ffffff","K":"#2e2a26","W":"#9a9a9a","w":"#777777","Y":"#ffffff","y":"#e6e6e6","O":"#ffffff","E":"#1b1b1b","P":"#a59a8e","G":"#666666"}},"sprites":{"idle":["........KK......","........KyK.....",".........KyK....","......KKKYyK....",".....KYYYYYYK...",".....KYYYYEYYK..",".....KYYYOOYPPK.",".....KWYYOOYKPK.",".....KWWYYYKK...","....KWWWWWWK....","....KWWwWWWK....","...KWWwwWWWK....","...KWwwwWWK.....","..KGwKPKKPK.....",".KGGK.P..P......","KGK............."],"move1":["................","......KK........",".....KWwK.......",".....KWWwK...KK.","......KWWwK.KyK.","......KWWWKKYYYK",".......KWWKYYEYK","....KKKKWWWYOOPK","..KKWWWWWWWWYKPK","KKGGWWWWWWWWKK..","KGGWWKKKWWWK....",".KGGK...KKK.....","..KK............","................","................","................"],"move2":["................","................","................",".............KK.","............KyK.","...........KYYYK","..........KYYEYK","....KKKKKKWYOOPK","..KKWWWWWWWWYKPK","KKGGWWWwwWWWKK..","KGGWWKWWwwKK....",".KGGK.KWwwwK....","..KK...KWwwK....",".......KWwK.....","........KK......","................"],"blink":["........KK......","........KyK.....",".........KyK....","......KKKYyK....",".....KYYYYYYK...",".....KYYYYKYYK..",".....KYYYOOYPPK.",".....KWYYOOYKPK.",".....KWWYYYKK...","....KWWWWWWK....","....KWWwWWWK....","...KWWwwWWWK....","...KWwwwWWK.....","..KGwKPKKPK.....",".KGGK.P..P......","KGK............."],"bob":["................",".........KK.....",".........KyK....","..........KyK...",".......KKKYyK...","......KYYYYYYK..","......KYYYYEYYK.","......KYYYOOYPPK",".....KKWYYOOYKPK","....KWWWWWWK....","....KWWwWWWK....","...KWWwwWWWK....","...KWwwwWWK.....","..KGwKPKKPK.....",".KGGK.P..P......","KGK............."]}},"hamster":{"label":"Hamster","ar":"هامستر","treats":["🌻","🥜"],"sounds":{"en":["*squeak*","🌻?","*cheeks full*","♥"],"ar":["*صيصي*","🌻؟","*خدوده مليانة*","♥"]},"speed":0.9,"bounce":1,"palettes":{"golden":{"swatch":"#eaa95e","K":"#5a3517","A":"#eaa95e","W":"#fff4e2","N":"#ff9eb0","E":"#2a1a10"},"white":{"swatch":"#ffffff","K":"#6e6259","A":"#fffaf3","W":"#ffffff","N":"#ffa3b5","E":"#c0304a"},"grey":{"swatch":"#a7a29c","K":"#3d3934","A":"#b3ada6","W":"#f6f3ef","N":"#ff9eb0","E":"#1e1a17"},"cocoa":{"swatch":"#8b5a3c","K":"#2f1b10","A":"#8b5a3c","W":"#f2dcc5","N":"#ff9eb0","E":"#1a0f09"}},"sprites":{"idle":["................","................","................","...KK.....KK....","..KNNKKKKKNNK...",".KAAAAAAAAAAAK..","KAAAAAAAAAAAAAK.","KAAAEAAAAAEAAAK.","KAAAEAAAAAEAAAK.","KANAAAWWWAAANAK.","KAAAAWWNWWAAAAK.","KAAAWWWWWWWAAAK.","KAAAWWWWWWWAAAK.",".KAAWWWWWWWAAK..","..KKAAAAAAAKK...","...KNK...KNK...."],"move1":["................","................","................","................","..........KK....","....KKKKKKNNK...","...KAAAAAAAAAK..","..KAAAAAAAAAAAK.","..KAAAAAAAAEAAK.",".KAAAAAAAAAEANK.",".KAAAAAAAWWWWK..",".KWWAAAAWWWWWK..","..KWWWWWWWWWK...","...KKKKKKKKKK...","..KNK.....KNK...","................"],"move2":["................","................","................","................","..........KK....","....KKKKKKNNK...","...KAAAAAAAAAK..","..KAAAAAAAAAAAK.","..KAAAAAAAAEAAK.",".KAAAAAAAAAEANK.",".KAAAAAAAWWWWK..",".KWWAAAAWWWWWK..","..KWWWWWWWWWK...","...KKKKKKKKKK...","....KNK.KNK.....","................"],"blink":["................","................","................","...KK.....KK....","..KNNKKKKKNNK...",".KAAAAAAAAAAAK..","KAAAAAAAAAAAAAK.","KAAAKAAAAAKAAAK.","KAAAKAAAAAKAAAK.","KANAAAWWWAAANAK.","KAAAAWWNWWAAAAK.","KAAAWWWWWWWAAAK.","KAAAWWWWWWWAAAK.",".KAAWWWWWWWAAK..","..KKAAAAAAAKK...","...KNK...KNK...."],"bob":["................","................","................","................","....KK.....KK...","...KNNKKKKKNNK..","..KAAAAAAAAAAAK.",".KAAAAAAAAAAAAAK",".KAAAEAAAAAEAAAK",".KAAAEAAAAAEAAAK","KKANAAAWWWAAANAK","KAAAWWWWWWWAAAK.","KAAAWWWWWWWAAAK.",".KAAWWWWWWWAAK..","..KKAAAAAAAKK...","...KNK...KNK...."]}},"rabbit":{"treats":["🥕"],"label":"Rabbit","ar":"أرنب","sounds":{"en":["*nom nom*","🥕?","♥","*thump*"],"ar":["*قرمشة*","🥕؟","♥","*دبدبة*"]},"speed":1.0,"bounce":3,"palettes":{"white":{"swatch":"#ffffff","K":"#5b5048","A":"#fbfaf7","B":"#e3ddd3","N":"#f4a3b4","W":"#ffffff","E":"#d0405a"},"brown":{"swatch":"#b88a62","K":"#3a2a1d","A":"#b88a62","B":"#8f6644","N":"#f4a3b4","W":"#f7efe4","E":"#1b1b1b"},"grey":{"swatch":"#9b9b9b","K":"#2f2f2f","A":"#a9a9a9","B":"#828282","N":"#f4a3b4","W":"#f2f2f2","E":"#1b1b1b"}},"sprites":{"idle":["........K..K....",".......KAKKAK...",".......KNKKNK...",".......KNKKNK...",".......KAKKAK...","......KAAAAAAK..","......KAAAEAAK..","......KAAAAANK..",".....KKAAAAAK...","....KAAAAAAAK...","...KAAAAABAAK...","..KWAAAABBAAK...","..KWAAAAAAAAK...","...KAAAAKAAAK...","....KKKKKKKKKK..","................"],"move1":["................","................","........K.K.....",".......KNKNK....",".......KNKNK....",".......KAKAK....","......KAAAAAK...",".....KAAAAEAAK..",".....KAAAAAAANK.","...KKKAAAAAAK...","..KAAAAAAAAK....",".KWAAAAAAAAK....",".KWAAAAAAAAAK...","..KAAAABAAAAK...","..KKKKKKKKKKKK..","................"],"move2":["................","................","................",".....KK.........","....KNNK..KK....",".....KNNKKAAK...","......KKAAAAAK..",".......KAAAEAK..","...KKKKAAAAAANK.",".KKAAAAAAAAAKK..","KWAAAAAAAAAK....","KWAAAAAAAAK.....",".KKAAKKKAAK.....","KAAKK...KAK.....","KK.......KAK....","..........KK...."],"blink":["........K..K....",".......KAKKAK...",".......KNKKNK...",".......KNKKNK...",".......KAKKAK...","......KAAAAAAK..","......KAAAKAAK..","......KAAAAANK..",".....KKAAAAAK...","....KAAAAAAAK...","...KAAAAABAAK...","..KWAAAABBAAK...","..KWAAAAAAAAK...","...KAAAAKAAAK...","....KKKKKKKKKK..","................"],"bob":["................",".........K..K...","........KAKKAK..","........KNKKNK..","........KNKKNK..","........KAKKAK..",".......KAAAAAAK.",".......KAAAEAAK.",".....KKKAAAAANK.","....KAAAAAAAK...","...KAAAAABAAK...","..KWAAAABBAAK...","..KWAAAAAAAAK...","...KAAAAKAAAK...","....KKKKKKKKKK..","................"]}},"panda":{"label":"Panda","ar":"باندا","treats":["🎋"],"sounds":{"en":["*munch*","🎋?","*roll*","♥"],"ar":["*يقرمش*","🎋؟","*يتدحرج*","♥"]},"speed":0.7,"bounce":1,"palettes":{"panda":{"swatch":"#2b2b2b","K":"#141414","W":"#ffffff","B":"#2b2b2b","N":"#ffa3b5","E":"#ffffff"},"red-panda":{"swatch":"#d9622b","K":"#3a1a0c","W":"#f7e9d8","B":"#b24a1d","N":"#ff9eb0","E":"#ffffff"},"brown":{"swatch":"#8a6a50","K":"#2a1d14","W":"#f4ece2","B":"#6b4c36","N":"#ffa3b5","E":"#ffffff"}},"sprites":{"idle":["................",".KK........KK...","KBBK......KBBK..","KBBKKKKKKKKBBK..",".KWWWWWWWWWWK...","KWWWWWWWWWWWWK..","KWWBBWWWWBBWWK..","KWBBEWWWWEBBWK..","KWNBBWWWWBBNWK..",".KWWWWBBWWWWK...","..KKWWWWWWKK....",".KBBKWWWWKBBK...","KBBBKWWWWKBBBK..",".KBKWWWWWWKBK...",".KBBKWWWWKBBK...",".KKKKKKKKKKKK..."],"move1":["................","................","................","........KK..KK..","........KBK.KBK.",".......KWWWWWWWK",".......KWWWWBBWK",".......KWWWWBEWK",".......KWNWWWWBK","..KKKKKKKWWWWWK.",".KWWWWWWBBBKKK..",".KWWWWWWBBBK....",".KBBKKKKKBBK....","KBK.......KBK...","KK.........KK...","................"],"move2":["................","................","................","........KK..KK..","........KBK.KBK.",".......KWWWWWWWK",".......KWWWWBBWK",".......KWWWWBEWK",".......KWNWWWWBK","..KKKKKKKWWWWWK.",".KWWWWWWBBBKKK..",".KWWWWWWBBBK....",".KBBKKKKKBBK....","..KBK...KBK.....","..KK....KK......","................"],"blink":["................",".KK........KK...","KBBK......KBBK..","KBBKKKKKKKKBBK..",".KWWWWWWWWWWK...","KWWWWWWWWWWWWK..","KWWBBWWWWBBWWK..","KWBBKWWWWKBBWK..","KWNBBWWWWBBNWK..",".KWWWWBBWWWWK...","..KKWWWWWWKK....",".KBBKWWWWKBBK...","KBBBKWWWWKBBBK..",".KBKWWWWWWKBK...",".KBBKWWWWKBBK...",".KKKKKKKKKKKK..."],"bob":["................","................","..KK........KK..",".KBBK......KBBK.",".KBBKKKKKKKKBBK.","..KWWWWWWWWWWK..",".KWWWWWWWWWWWWK.",".KWWBBWWWWBBWWK.",".KWBBEWWWWEBBWK.",".KWNBBWWWWBBNWK.","..KWWWWBBWWWWK..",".KBBKWWWWKBBK...","KBBBKWWWWKBBBK..",".KBKWWWWWWKBK...",".KBBKWWWWKBBK...",".KKKKKKKKKKKK..."]}},"fox":{"label":"Fox","ar":"ثعلب","treats":["🍇"],"sounds":{"en":["Yip!","*pounce*","🦊","Hehe"],"ar":["ييب!","*ينقض*","🦊","هيهي"]},"speed":1.15,"bounce":1,"palettes":{"red":{"swatch":"#f07a2e","K":"#4a1f0a","A":"#f07a2e","W":"#fff7ee","B":"#3a2418","N":"#ff9eb0","E":"#2a140a"},"arctic":{"swatch":"#f2f5f8","K":"#59636e","A":"#f4f7fa","W":"#ffffff","B":"#9aa5b1","N":"#ffa3b5","E":"#2a3440"},"fennec":{"swatch":"#efd2a4","K":"#5a4127","A":"#efd2a4","W":"#fff9ef","B":"#b98a57","N":"#ffa3b5","E":"#2a1d10"}},"sprites":{"idle":[".K.........K....",".KBK.....KBK....",".KAAK...KAAK....",".KANAKKKANAK....","KAAAAAAAAAAAK...","KAAAAAAAAAAAK...","KAAEAAAAAEAAK...","KWAEAAAAAEAWK...","KWWWWWKWWWWWK...",".KWWWWWWWWWK....","..KKAWWWAKK..KK.","..KAAWWWAAK.KAAK",".KAAAWWWAAAKAAAK",".KAAAWWWAAAKAWWK",".KBAAAAAAABKKWK.","..KKKKKKKKKK.K.."],"move1":["................","................",".........K..K...","........KBKKBK..","........KAAAAK..",".......KAAAAAAK.",".......KAAAAEAK.",".KKK...KAAAAAAAK","KAAAK..KWWWWWWBK","KAAWAK..KWWWWK..",".KWWAKKKKAAAK...","..KKAAAAAAWWK...","...KAAAAAAWWK...","...KKBKKKKBKK...","..KBK....KBK....","..KK.....KK....."],"move2":["................","................",".........K..K...","........KBKKBK..","........KAAAAK..",".......KAAAAAAK.",".......KAAAAEAK.",".KKK...KAAAAAAAK","KAAAK..KWWWWWWBK","KAAWAK..KWWWWK..",".KWWAKKKKAAAK...","..KKAAAAAAWWK...","...KAAAAAAWWK...","...KKBKKKKBKK...","....KBK.KBK.....","....KK..KK......"],"blink":[".K.........K....",".KBK.....KBK....",".KAAK...KAAK....",".KANAKKKANAK....","KAAAAAAAAAAAK...","KAAAAAAAAAAAK...","KAAKAAAAAKAAK...","KWAKAAAAAKAWK...","KWWWWWKWWWWWK...",".KWWWWWWWWWK....","..KKAWWWAKK..KK.","..KAAWWWAAK.KAAK",".KAAAWWWAAAKAAAK",".KAAAWWWAAAKAWWK",".KBAAAAAAABKKWK.","..KKKKKKKKKK.K.."],"bob":["................","..K.........K...","..KBK.....KBK...","..KAAK...KAAK...","..KANAKKKANAK...",".KAAAAAAAAAAAK..",".KAAAAAAAAAAAK..",".KAAEAAAAAEAAK..",".KWAEAAAAAEAWK..",".KWWWWWKWWWWWK..","..KWWWWWWWWWKKK.","..KAAWWWAAK.KAAK",".KAAAWWWAAAKAAAK",".KAAAWWWAAAKAWWK",".KBAAAAAAABKKWK.","..KKKKKKKKKK.K.."]}},"capybara":{"label":"Capybara","ar":"كابيبارا","treats":["🍊","🍉"],"sounds":{"en":["...","*chill*","🍊?","*vibing*"],"ar":["...","*رايق*","🍊؟","*مسترخي*"]},"speed":0.6,"bounce":0,"palettes":{"brown":{"swatch":"#b07c4f","K":"#3a2414","A":"#b07c4f","B":"#5a3a22","N":"#e8998a","E":"#2a1a10"},"caramel":{"swatch":"#d9a066","K":"#4a2f17","A":"#d9a066","B":"#7a5232","N":"#f2a397","E":"#2a1a10"},"cocoa":{"swatch":"#6e4a33","K":"#24160c","A":"#7a5238","B":"#3a2416","N":"#e8998a","E":"#140b05"}},"sprites":{"idle":["................","................","................","................","...........KK...","...KKKKKKKKAAKK.","..KAAAAAAAAAAAAK",".KAAAAAAAAAAEAAK",".KAAAAAAAAAAAAAK",".KAAAAAAAAAANABK",".KAAAAAAAAAAAAK.",".KBAAAAAAAAAAK..","..KAAAAAAAAAAK..","..KKKKKKKKKKKK..","..KBK.....KBK...","..KK......KK...."],"move1":["................","................","................","................","...........KK...","...KKKKKKKKAAKK.","..KAAAAAAAAAAAAK",".KAAAAAAAAAAEAAK",".KAAAAAAAAAAAAAK",".KAAAAAAAAAANABK",".KAAAAAAAAAAAAK.",".KBAAAAAAAAAAK..","..KAAAAAAAAAAK..","..KKKKKKKKKKKK..",".KBK.......KBK..",".KK........KK..."],"move2":["................","................","................","................","...........KK...","...KKKKKKKKAAKK.","..KAAAAAAAAAAAAK",".KAAAAAAAAAAEAAK",".KAAAAAAAAAAAAAK",".KAAAAAAAAAANABK",".KAAAAAAAAAAAAK.",".KBAAAAAAAAAAK..","..KAAAAAAAAAAK..","..KKKKKKKKKKKK..","....KBK..KBK....","....KK...KK....."],"blink":["................","................","................","................","...........KK...","...KKKKKKKKAAKK.","..KAAAAAAAAAAAAK",".KAAAAAAAAAAKAAK",".KAAAAAAAAAAAAAK",".KAAAAAAAAAANABK",".KAAAAAAAAAAAAK.",".KBAAAAAAAAAAK..","..KAAAAAAAAAAK..","..KKKKKKKKKKKK..","..KBK.....KBK...","..KK......KK...."],"bob":["................","................","................","................","................","............KK..","..KAKKKKKKKKAAKK",".KAAAAAAAAAAEAAK",".KAAAAAAAAAAAAAK",".KAAAAAAAAAANABK",".KAAAAAAAAAAAAK.",".KBAAAAAAAAAAK..","..KAAAAAAAAAAK..","..KKKKKKKKKKKK..","..KBK.....KBK...","..KK......KK...."]}},"hedgehog":{"label":"Hedgehog","ar":"قنفذ","treats":["🍓","🐛"],"sounds":{"en":["*sniff sniff*","🍓?","*curls up*","♥"],"ar":["*يتشمم*","🍓؟","*يتكور*","♥"]},"speed":0.8,"bounce":0,"palettes":{"brown":{"swatch":"#7a5a44","K":"#3a2a1e","B":"#7a5a44","b":"#a07a5c","A":"#f3d9b8","N":"#ffa3b5","E":"#1b1b1b"},"albino":{"swatch":"#f0e6dc","K":"#7a6a5c","B":"#efe4d8","b":"#ffffff","A":"#fff4ea","N":"#ffa3b5","E":"#c0304a"},"chocolate":{"swatch":"#4a3428","K":"#1e140e","B":"#4a3428","b":"#6e5040","A":"#e8c9a4","N":"#ff9eb0","E":"#140b05"}},"sprites":{"idle":["................","................","................","................","................",".....K.K.K......","...KKbKbKbK.....","..KBbBbBbBBKK...",".KBBBBBBBBBAAK..","KbBbBbBbBBAAEAK.","KBBBBBBBBANAAAAK",".KbBbBbBBAAAAKK.","..KBBBBBAAAAK...","...KKKKKKKKK....","...KAK...KAK....","................"],"move1":["................","................","................","................","................",".....K.K.K......","...KKbKbKbK.....","..KBbBbBbBBKK...",".KBBBBBBBBBAAK..","KbBbBbBbBBAAEAK.","KBBBBBBBBANAAAAK",".KbBbBbBBAAAAKK.","..KBBBBBAAAAK...","...KKKKKKKKK....","..KAK.....KAK...","................"],"move2":["................","................","................","................","................",".....K.K.K......","...KKbKbKbK.....","..KBbBbBbBBKK...",".KBBBBBBBBBAAK..","KbBbBbBbBBAAEAK.","KBBBBBBBBANAAAAK",".KbBbBbBBAAAAKK.","..KBBBBBAAAAK...","...KKKKKKKKK....",".....KAK.KAK....","................"],"blink":["................","................","................","................","................",".....K.K.K......","...KKbKbKbK.....","..KBbBbBbBBKK...",".KBBBBBBBBBAAK..","KbBbBbBbBBAAKAK.","KBBBBBBBBANAAAAK",".KbBbBbBBAAAAKK.","..KBBBBBAAAAK...","...KKKKKKKKK....","...KAK...KAK....","................"],"bob":["................","................","................","................","................","................","......K.K.K.....","..KBKKbKbKbKK...",".KBBBBBBBBBAAK..","KbBbBbBbBBAAEAK.","KBBBBBBBBANAAAAK",".KbBbBbBBAAAAKK.","..KBBBBBAAAAK...","...KKKKKKKKK....","...KAK...KAK....","................"]}},"lamb":{"label":"Lamb","ar":"خروف","treats":["🌿","🍀"],"sounds":{"en":["Baa~","Meeh","☁️","♥"],"ar":["ماااع~","مييه","☁️","♥"]},"speed":0.85,"bounce":1,"palettes":{"white":{"swatch":"#f5c9a8","K":"#5a5048","W":"#ffffff","F":"#f5c9a8","N":"#ff8fa6","E":"#2a1a10"},"black-face":{"swatch":"#3a3434","K":"#2f2a2a","W":"#f6f2ea","F":"#3a3434","N":"#ff8fa6","E":"#ffffff"},"pink":{"swatch":"#ffd6e8","K":"#7a4a5c","W":"#ffd6e8","F":"#fff0e6","N":"#ff7fa0","E":"#2a1a20"}},"sprites":{"idle":["................","................","................","...........KK...","..........KWWK..","..K.K.K..KWWWWK.",".KWKWKWKKFFFFFFK","KWWWWWWKKFFFFEFK","KWWWWWWKFKFFFEFK","KWWWWWWWKFFNFFFK","KWWWWWWWWKFFFFK.","KWWWWWWWWWKKKK..",".KWWWWWWWWWWWK..","..KWKWKWKWKWK...","...KFK...KFK....","...KK....KK....."],"move1":["................","................","................","...........KK...","..........KWWK..","..K.K.K..KWWWWK.",".KWKWKWKKFFFFFFK","KWWWWWWKKFFFFEFK","KWWWWWWKFKFFFEFK","KWWWWWWWKFFNFFFK","KWWWWWWWWKFFFFK.","KWWWWWWWWWKKKK..",".KWWWWWWWWWWWK..","..KWKWKWKWKWK...","..KFK.....KFK...","..KK......KK...."],"move2":["................","................","................","...........KK...","..........KWWK..","..K.K.K..KWWWWK.",".KWKWKWKKFFFFFFK","KWWWWWWKKFFFFEFK","KWWWWWWKFKFFFEFK","KWWWWWWWKFFNFFFK","KWWWWWWWWKFFFFK.","KWWWWWWWWWKKKK..",".KWWWWWWWWWWWK..","..KWKWKWKWKWK...","....KFK.KFK.....","....KK..KK......"],"blink":["................","................","................","...........KK...","..........KWWK..","..K.K.K..KWWWWK.",".KWKWKWKKFFFFFFK","KWWWWWWKKFFFFKFK","KWWWWWWKFKFFFKFK","KWWWWWWWKFFNFFFK","KWWWWWWWWKFFFFK.","KWWWWWWWWWKKKK..",".KWWWWWWWWWWWK..","..KWKWKWKWKWK...","...KFK...KFK....","...KK....KK....."],"bob":["................","................","................","................","............KK..","...........KWWK.","...K.K.K..KWWWWK","..KWKWKWKKFFFFFF",".KWWWWWWKKFFFFEF",".KWWWWWWKFKFFFEF","KKWWWWWWWKFFNFFF","KWWWWWWWWWKKKK..",".KWWWWWWWWWWWK..","..KWKWKWKWKWK...","...KFK...KFK....","...KK....KK....."]}},"piglet":{"label":"Piglet","ar":"خنزير صغير","treats":["🍎","🌽"],"sounds":{"en":["Oink!","*snort*","🍎?","♥"],"ar":["أوينك!","*خنخنة*","🍎؟","♥"]},"speed":0.9,"bounce":1,"palettes":{"pink":{"swatch":"#ffb3c7","K":"#6b2f40","A":"#ffb3c7","S":"#e8829e","N":"#ff7fa0","E":"#2a1218"},"mud":{"swatch":"#c88a6a","K":"#4a2a1a","A":"#d9a080","S":"#a86848","N":"#ff8fa0","E":"#2a1218"},"black":{"swatch":"#3a3236","K":"#120e10","A":"#453c40","S":"#e8829e","N":"#ff7fa0","E":"#f5f5f5"}},"sprites":{"idle":["................","................","................","................","..........KK....","....KKKKKKSSK...","...KAAAAAAAAAK..",".KKAAAAAAAAAEAK.",".KAAAAAAAAANASSK",".KAAAAAAAAAAASSK",".KAAAAAAAAAAAKK.","..KAAAAAAAAAAK..","..KKKKKKKKKKKK..","..KAK.....KAK...","..KSK.....KSK...","................"],"move1":["................","................","................","................","..........KK....","....KKKKKKSSK...","...KAAAAAAAAAK..",".KKAAAAAAAAAEAK.",".KAAAAAAAAANASSK",".KAAAAAAAAAAASSK",".KAAAAAAAAAAAKK.","..KAAAAAAAAAAK..","..KKKKKKKKKKKK..",".KAK.......KAK..",".KSK.......KSK..","................"],"move2":["................","................","................","................","..........KK....","....KKKKKKSSK...","...KAAAAAAAAAK..",".KKAAAAAAAAAEAK.",".KAAAAAAAAANASSK",".KAAAAAAAAAAASSK",".KAAAAAAAAAAAKK.","..KAAAAAAAAAAK..","..KKKKKKKKKKKK..","....KAK..KAK....","....KSK..KSK....","................"],"blink":["................","................","................","................","..........KK....","....KKKKKKSSK...","...KAAAAAAAAAK..",".KKAAAAAAAAAKAK.",".KAAAAAAAAANASSK",".KAAAAAAAAAAASSK",".KAAAAAAAAAAAKK.","..KAAAAAAAAAAK..","..KKKKKKKKKKKK..","..KAK.....KAK...","..KSK.....KSK...","................"],"bob":["................","................","................","................","................","...........KK...","...KAKKKKKKSSK..",".KKAAAAAAAAAEAK.",".KAAAAAAAAANASSK",".KAAAAAAAAAAASSK",".KAAAAAAAAAAAKK.","..KAAAAAAAAAAK..","..KKKKKKKKKKKK..","..KAK.....KAK...","..KSK.....KSK...","................"]}},"duckling":{"label":"Duckling","ar":"بطة","treats":["🍞","🌽"],"sounds":{"en":["Quack!","Peep peep","🦆","♥"],"ar":["كواك!","بيب بيب","🦆","♥"]},"speed":0.85,"bounce":1,"palettes":{"yellow":{"swatch":"#ffe14d","K":"#6b4d0e","A":"#ffe14d","B":"#f5c518","N":"#ffab9c","Y":"#ff9b3d","E":"#2a1d05"},"white":{"swatch":"#ffffff","K":"#6b6157","A":"#ffffff","B":"#e8e4dd","N":"#ffb3a6","Y":"#ff9b3d","E":"#1e1a17"},"mallard":{"swatch":"#3f8f4f","K":"#1d2b1f","A":"#3f8f4f","B":"#8b6a4a","N":"#ff9eb0","Y":"#f2c230","E":"#111111"}},"sprites":{"idle":["................","................","................","......KKKK......",".....KAAAAK.....","....KAAAAAAK....","....KAAAAEAK....","....KANAAAAYYK..","....KAAAAAAYYK..","..KKKAAAAAAKK...",".KAAKAAAAAAAK...","KAAAAKBBBAAAAK..","KAAAAAKBBAAAAK..",".KAAAAAKKAAAK...","..KKKKKKKKKK....","....YY...YY....."],"move1":["................","................","................",".......KKKK.....","......KAAAAK....",".....KAAAAAAK...",".....KAAAAEAK...",".....KANAAAAYYK.",".....KAAAAAAYYK.","..KKKAAAAAAKK...",".KAAKAAAAAAAK...","KAAAAKBBBAAAAK..","KAAAAAKBBAAAAK..",".KAAAAAKKAAAK...","..KKKKKKKKKK....","...YY.....YY...."],"move2":["................","................","................","......KKKK......",".....KAAAAK.....","....KAAAAAAK....","....KAAAAEAK....","....KANAAAAYYK..","....KAAAAAAYYK..","..KKKAAAAAAKK...",".KAAKAAAAAAAK...","KAAAAKBBBAAAAK..","KAAAAAKBBAAAAK..",".KAAAAAKKAAAK...","..KKKKKKKKKK....",".....YY.YY......"],"blink":["................","................","................","......KKKK......",".....KAAAAK.....","....KAAAAAAK....","....KAAAAKAK....","....KANAAAAYYK..","....KAAAAAAYYK..","..KKKAAAAAAKK...",".KAAKAAAAAAAK...","KAAAAKBBBAAAAK..","KAAAAAKBBAAAAK..",".KAAAAAKKAAAK...","..KKKKKKKKKK....","....YY...YY....."],"bob":["................","................","................","................",".......KKKK.....","......KAAAAK....",".....KAAAAAAK...",".....KAAAAEAK...",".....KANAAAAYYK.","..KKKKAAAAAAYYK.",".KAAKAAAAAAAK...","KAAAAKBBBAAAAK..","KAAAAAKBBAAAAK..",".KAAAAAKKAAAK...","..KKKKKKKKKK....","....YY...YY....."]}},"frog":{"label":"Frog","ar":"ضفدع","treats":["🪰"],"sounds":{"en":["Ribbit","🪰?","*hop*","Croak~"],"ar":["نق نق","🪰؟","*نطة*","نقيق~"]},"speed":1.0,"bounce":2,"palettes":{"green":{"swatch":"#7ccf5a","K":"#1f4a17","A":"#7ccf5a","B":"#d9f2b8","W":"#ffffff","N":"#ff9eb0","E":"#111111"},"pink":{"swatch":"#ff9ecb","K":"#6b2447","A":"#ff9ecb","B":"#ffe1ef","W":"#ffffff","N":"#ff6fa1","E":"#111111"},"blue":{"swatch":"#5aa9e6","K":"#173a5c","A":"#5aa9e6","B":"#d4ecff","W":"#ffffff","N":"#ff9eb0","E":"#111111"}},"sprites":{"idle":["................","................","................","................","..KKK....KKK....",".KWEWK..KWEWK...",".KWWWKKKKWWWK...","KAAAAAAAAAAAAK..","KANAAAAAAAANAK..","KAAAAKKKKAAAAK..",".KAABBBBBBAAK...",".KABBBBBBBBAK...","KAABBBBBBBBAAK..","KAAKBBBBBBKAAK..",".KKAKKKKKKAKK...","..KK......KK...."],"move1":["................","................","................","................","..KKK....KKK....",".KWEWK..KWEWK...",".KWWWKKKKWWWK...","KAAAAAAAAAAAAK..","KANAAAAAAAANAK..","KAAAAKKKKAAAAK..",".KAABBBBBBAAK...",".KABBBBBBBBAK...","KAABBBBBBBBAAK..","KAAKBBBBBBKAAK..",".KKAKKKKKKAKK...","..KK......KK...."],"move2":["................","..KKK....KKK....",".KWEWK..KWEWK...",".KWWWKKKKWWWK...","KAAAAAAAAAAAAK..","KANAAAAAAAANAK..","KAAAAKKKKAAAAK..",".KAABBBBBBAAK...",".KABBBBBBBBAK...","KAABBBBBBBBAAK..","KAAKBBBBBBKAAK..",".KAK......KAK...",".KAK......KAK...","KAAK......KAAK..","KKK........KKK..","................"],"blink":["................","................","................","................","..KKK....KKK....",".KWKWK..KWKWK...",".KWWWKKKKWWWK...","KAAAAAAAAAAAAK..","KANAAAAAAAANAK..","KAAAAKKKKAAAAK..",".KAABBBBBBAAK...",".KABBBBBBBBAK...","KAABBBBBBBBAAK..","KAAKBBBBBBKAAK..",".KKAKKKKKKAKK...","..KK......KK...."],"bob":["................","................","................","................","................","...KKK....KKK...","..KWEWK..KWEWK..","..KWWWKKKKWWWK..",".KAAAAAAAAAAAAK.","KKANAAAAAAAANAK.",".KAABBBBBBAAK...",".KABBBBBBBBAK...","KAABBBBBBBBAAK..","KAAKBBBBBBKAAK..",".KKAKKKKKKAKK...","..KK......KK...."]}},"turtle":{"label":"Turtle","ar":"سلحفاة","treats":["🥬","🍓"],"sounds":{"en":["*slow*","🥬?","...zzz","♥"],"ar":["*على مهلي*","🥬؟","...زززز","♥"]},"speed":0.45,"bounce":0,"palettes":{"green":{"swatch":"#5fb35a","K":"#1f3d1c","G":"#5fb35a","g":"#3e8a3c","Y":"#e9d48a","A":"#9fd27a","N":"#ff9eb0","E":"#111111"},"brown":{"swatch":"#b07c4f","K":"#3a2414","G":"#b07c4f","g":"#7a5232","Y":"#efd9a6","A":"#c2d98a","N":"#ff9eb0","E":"#111111"},"sea":{"swatch":"#4aa3c7","K":"#123547","G":"#4aa3c7","g":"#2a6f8f","Y":"#f1e3b8","A":"#8fd3b0","N":"#ff9eb0","E":"#111111"}},"sprites":{"idle":["................","................","................","................","................","................","....KKKKKK......","...KGGgGGGK.....","..KGgGGGgGGK.KK.",".KGGGGgGGGGKKAAK",".KGgGGGGgGGKAAEK","KYYYYYYYYYYKAANK",".KKKKKKKKKKKKKK.",".KAK......KAK...",".KK.......KK....","................"],"move1":["................","................","................","................","................","................","....KKKKKK......","...KGGgGGGK.....","..KGgGGGgGGK.KK.",".KGGGGgGGGGKKAAK",".KGgGGGGgGGKAAEK","KYYYYYYYYYYKAANK",".KKKKKKKKKKKKKK.","KAK.......KAK...","KK........KK....","................"],"move2":["................","................","................","................","................","................","....KKKKKK......","...KGGgGGGK.....","..KGgGGGgGGK.KK.",".KGGGGgGGGGKKAAK",".KGgGGGGgGGKAAEK","KYYYYYYYYYYKAANK",".KKKKKKKKKKKKKK.","..KAK...KAK.....","..KK....KK......","................"],"blink":["................","................","................","................","................","................","....KKKKKK......","...KGGgGGGK.....","..KGgGGGgGGK.KK.",".KGGGGgGGGGKKAAK",".KGgGGGGgGGKAAKK","KYYYYYYYYYYKAANK",".KKKKKKKKKKKKKK.",".KAK......KAK...",".KK.......KK....","................"],"bob":["................","................","................","................","................","................","....KKKKKK......","...KGGgGGGK.....","..KGgGGGgGGK.KK.",".KGGGGgGGGGKKAAK",".KGgGGGGgGGKAAEK","KYYYYYYYYYYKAANK",".KKKKKKKKKKKKKK.",".KAK......KAK...",".KK.......KK....","................"]}},"penguin":{"treats":["🐟"],"label":"Penguin","ar":"بطريق","sounds":{"en":["Brrr ❄️","🐟?","*waddle*","Hi!"],"ar":["برررد ❄️","🐟؟","*يتمايل*","هلا!"]},"speed":0.7,"bounce":1,"palettes":{"classic":{"swatch":"#26303a","K":"#0b0f14","A":"#26303a","W":"#fbfbfb","Y":"#f5a623","E":"#0b0f14"},"emperor":{"swatch":"#ffd27a","K":"#0b0f14","A":"#2c3644","W":"#fff6dc","Y":"#ffb43a","E":"#0b0f14"},"baby":{"swatch":"#b9bec4","K":"#3a3f45","A":"#a9afb6","W":"#ffffff","Y":"#3a3f45","E":"#1b1b1b"}},"sprites":{"idle":["................","................","......KKKK......",".....KAAAAK.....",".....KAAWEWK....",".....KAAWWWKYY..",".....KAAWWWKK...","....KAAWWWWWK...","...KAAAWWWWWK...","...KAAAWWWWWK...","..KAKAAWWWWWK...","..KK.KAWWWWWK...",".....KAWWWWWK...",".....KAAWWWWK...","......KKKKKK....","......YY..YY...."],"move1":["................","................",".....KKKK.......","....KAAAAK......","....KAAWEWK.....","....KAAWWWKYY...","....KAAWWWKK....","...KAAWWWWWK....","..KAAAWWWWWK....","..KAAAWWWWWK....",".KAKAAWWWWWK....",".KK.KAWWWWWK....","....KAWWWWWK....","....KAAWWWWK....",".....KKKKKK.....",".....YY........."],"move2":["................","................",".......KKKK.....","......KAAAAK....","......KAAWEWK...","......KAAWWWKYY.","......KAAWWWKK..",".....KAAWWWWWK..","....KAAAWWWWWK..","....KAAAWWWWWK..","...KAKAAWWWWWK..","...KK.KAWWWWWK..","......KAWWWWWK..","......KAAWWWWK..",".......KKKKKK...","..........YY...."],"blink":["................","................","......KKKK......",".....KAAAAK.....",".....KAAWKWK....",".....KAAWWWKYY..",".....KAAWWWKK...","....KAAWWWWWK...","...KAAAWWWWWK...","...KAAAWWWWWK...","..KAKAAWWWWWK...","..KK.KAWWWWWK...",".....KAWWWWWK...",".....KAAWWWWK...","......KKKKKK....","......YY..YY...."],"bob":["................","................","................",".......KKKK.....","......KAAAAK....","......KAAWEWK...","......KAAWWWKYY.","....KAKAAWWWKK..","...KAAAWWWWWK...","...KAAAWWWWWK...","..KAKAAWWWWWK...","..KK.KAWWWWWK...",".....KAWWWWWK...",".....KAAWWWWK...","......KKKKKK....","......YY..YY...."]}},"sparrow":{"treats":["🌻","🍞"],"label":"Sparrow","ar":"عصفور","sounds":{"en":["Tweet!","Chirp chirp","🎶"],"ar":["تويت!","زقزقة","🎶"]},"speed":1.3,"bounce":0,"palettes":{"sparrow":{"swatch":"#9a6a3c","K":"#2b2016","A":"#9a6a3c","C":"#efe6d4","B":"#d8c7a8","D":"#5e3e22","Y":"#3a3a3a","N":"#c9a08a","E":"#111111"},"canary":{"swatch":"#ffd83d","K":"#4a3a10","A":"#ffd83d","C":"#fff3a6","B":"#ffe57a","D":"#e0a800","Y":"#f0a868","N":"#f0a868","E":"#111111"},"bluebird":{"swatch":"#3d8fe0","K":"#13263d","A":"#3d8fe0","C":"#f2b07a","B":"#f6c79c","D":"#1f5a9e","Y":"#2b2b2b","N":"#5b5b5b","E":"#111111"}},"sprites":{"idle":["................","................","................","................","................","................","......KKKK......",".....KAAAAK.....",".....KAAAEAKK...",".....KCCAAAKYK..","...KKDCCCCKK....","..KDDDBBBBK.....",".KDDDBBBBBK.....","KDDKKBBBBK......","KK....KKKK......","......N.N......."],"move1":["................","................","................","....KK..........","...KDDK.........","...KDDDK........","....KDDDK..KKK..",".....KDDDKKAAAK.","......KDDKAAEAKK","..KKKKKBBBCCAKYK","KKDDBBBBBBBCKK..",".KKDKKBBBBKK....","....KKKKKK......","................","................","................"],"move2":["................","................","................","................","................","................","...........KKK..","..........KAAAK.",".........KAAEAKK","..KKKKKKKKBCCAKY","KKDDBBBBDDDDKK..",".KKDKKBKDDDDK...","....KKKKDDDK....","........KDDK....",".........KK.....","................"],"blink":["................","................","................","................","................","................","......KKKK......",".....KAAAAK.....",".....KAAAKAKK...",".....KCCAAAKYK..","...KKDCCCCKK....","..KDDDBBBBK.....",".KDDDBBBBBK.....","KDDKKBBBBK......","KK....KKKK......","......N.N......."],"bob":["................","................","................","................","................","................","................",".......KKKK.....","......KAAAAK....","......KAAAEAKK..","...KKDKCCAAAKYK.","..KDDDBBBBK.....",".KDDDBBBBBK.....","KDDKKBBBBK......","KK....KKKK......","......N.N......."]}},"fish":{"treats":["🦐"],"label":"Fish","ar":"سمكة","sounds":{"en":["blub","🫧","blub blub","..."],"ar":["بلب","🫧","بلب بلب","..."]},"speed":0.9,"bounce":0,"float":true,"palettes":{"goldfish":{"swatch":"#ff8a2a","K":"#5a2a08","A":"#ff8a2a","B":"#ffc04d","C":"#fff1d6","E":"#1b1b1b"},"blue-tang":{"swatch":"#2f7de1","K":"#0b1d36","A":"#2f7de1","B":"#ffd23f","C":"#0e2f5c","E":"#1b1b1b"},"clownfish":{"swatch":"#ff7a1a","K":"#1b1b1b","A":"#ff7a1a","B":"#1b1b1b","C":"#ffffff","E":"#1b1b1b"}},"sprites":{"idle":["................","................","................","................","................","........KKKK....","..KK...KAAAAK...","..KBK.KACAAAAK..","..KBBKAACAAEAAK.","...KBBAACAAAAAK.","..KBBKAACAAAAK..","..KBK.KACAAAK...","..KK...KKKKK....","................","................","................"],"move2":["................","................","................","................","................","........KKKK....","....K..KAAAAK...","...KBK.KACAAAAK.","...KBBKACAAEAAK.","..KBBBAACAAAAAK.",".KBBBKAACAAAAK..",".KBBK.KACAAAK...",".KK....KKKKK....","................","................","................"],"move1":["................","................","................","................","................","........KKKK....","..KK...KAAAAK...","..KBK.KACAAAAK..","..KBBKAACAAEAAK.","...KBBAACAAAAAK.","..KBBKAACAAAAK..","..KBK.KACAAAK...","..KK...KKKKK....","................","................","................"],"blink":["................","................","................","................","................","........KKKK....","..KK...KAAAAK...","..KBK.KACAAAAK..","..KBBKAACAAKAAK.","...KBBAACAAAAAK.","..KBBKAACAAAAK..","..KBK.KACAAAK...","..KK...KKKKK....","................","................","................"],"bob":["................","................","................","................","................","........KKKK....","..KK...KAAAAK...","..KBK.KACAAAAK..","..KBBKAACAAEAAK.","...KBBAACAAAAAK.","..KBBKAACAAAAK..","..KBK.KACAAAK...","..KK...KKKKK....","................","................","................"]}},"bear":{"label":"Bear Cub","ar":"دبدوب","treats":["🍯","🐟"],"sounds":{"en":["Grr~","🍯?","*hug*","♥"],"ar":["غررر~","🍯؟","*حضن*","♥"]},"speed":0.9,"bounce":1,"palettes":{"brown":{"swatch":"#a0703f","K":"#3a2414","A":"#a0703f","W":"#e8c9a0","N":"#ff9eb0","E":"#1b1b1b"},"polar":{"swatch":"#f6f4ef","K":"#6b6560","A":"#f8f6f2","W":"#ffffff","N":"#ffa3b5","E":"#1b1b1b"},"honey":{"swatch":"#e0a64a","K":"#4a2c10","A":"#e8b05a","W":"#fff0d0","N":"#ff9eb0","E":"#1b1b1b"}},"sprites":{"idle":["................","................","................","..........KK.KK.",".........KAAKAAK","........KAAAAAAK","........KAAAAEAK",".KKKKKKKAAAAWWWK","KAAAAAAAAAAWWKK.","KAAAAAAAAANAAK..","KAAAAAAAAAAAK...",".KAAAAAAAAAAK...",".KKKKKKKKKKKK...",".KAK.....KAK....",".KK......KK.....","................"],"move1":["................","................","................","..........KK.KK.",".........KAAKAAK","........KAAAAAAK","........KAAAAEAK",".KKKKKKKAAAAWWWK","KAAAAAAAAAAWWKK.","KAAAAAAAAANAAK..","KAAAAAAAAAAAK...",".KAAAAAAAAAAK...",".KKKKKKKKKKKK...","KAK.......KAK...","KK........KK....","................"],"move2":["................","................","................","..........KK.KK.",".........KAAKAAK","........KAAAAAAK","........KAAAAEAK",".KKKKKKKAAAAWWWK","KAAAAAAAAAAWWKK.","KAAAAAAAAANAAK..","KAAAAAAAAAAAK...",".KAAAAAAAAAAK...",".KKKKKKKKKKKK...","...KAK..KAK.....","...KK...KK......","................"],"blink":["................","................","................","..........KK.KK.",".........KAAKAAK","........KAAAAAAK","........KAAAAKAK",".KKKKKKKAAAAWWWK","KAAAAAAAAAAWWKK.","KAAAAAAAAANAAK..","KAAAAAAAAAAAK...",".KAAAAAAAAAAK...",".KKKKKKKKKKKK...",".KAK.....KAK....",".KK......KK.....","................"],"bob":["................","................","................","................","...........KK.KK","..........KAAKAA",".........KAAAAAA",".KKKKKKKAKAAAAEA","KAAAAAAAAAAWWKK.","KAAAAAAAAANAAK..","KAAAAAAAAAAAK...",".KAAAAAAAAAAK...",".KKKKKKKKKKKK...",".KAK.....KAK....",".KK......KK.....","................"]}},"corgi":{"label":"Corgi","ar":"كورجي","treats":["🦴","🧀"],"sounds":{"en":["Woof!","*wiggles*","🦴?","♥"],"ar":["هاو!","*يهز نفسه*","🦴؟","♥"]},"speed":1.15,"bounce":1,"palettes":{"red":{"swatch":"#e8964a","K":"#4a2a12","A":"#e8964a","W":"#ffffff","N":"#ff9eb0","E":"#1b1b1b"},"tricolor":{"swatch":"#3a3236","K":"#120e10","A":"#3e3539","W":"#ffffff","N":"#ff9eb0","E":"#1b1b1b"},"cream":{"swatch":"#f2d7a8","K":"#5a4127","A":"#f2d7a8","W":"#ffffff","N":"#ff9eb0","E":"#1b1b1b"}},"sprites":{"idle":["................","................","................","................","...........K.K..","..........KAKAK.",".........KAAAAAK",".........KAAAEAK",".KAK.....KWAAWWK","..KAKKKKKKWWWWK.","..KAAAAAAAAANWK.","..KAAAAAAAWWWK..","..KKKKKKKKKKKK..","...KWK...KWK....","...KK....KK.....","................"],"move1":["................","................","................","................","...........K.K..","..........KAKAK.",".........KAAAAAK",".........KAAAEAK",".KAK.....KWAAWWK","..KAKKKKKKWWWWK.","..KAAAAAAAAANWK.","..KAAAAAAAWWWK..","..KKKKKKKKKKKK..","..KWK.....KWK...","..KK......KK....","................"],"move2":["................","................","................","................","...........K.K..","..........KAKAK.",".........KAAAAAK",".........KAAAEAK",".KAK.....KWAAWWK","..KAKKKKKKWWWWK.","..KAAAAAAAAANWK.","..KAAAAAAAWWWK..","..KKKKKKKKKKKK..","....KWK.KWK.....","....KK..KK......","................"],"blink":["................","................","................","................","...........K.K..","..........KAKAK.",".........KAAAAAK",".........KAAAKAK",".KAK.....KWAAWWK","..KAKKKKKKWWWWK.","..KAAAAAAAAANWK.","..KAAAAAAAWWWK..","..KKKKKKKKKKKK..","...KWK...KWK....","...KK....KK.....","................"],"bob":["................","................","................","................","................","............K.K.","...........KAKAK","..........KAAAAA",".KAK.....KKAAAEA","..KAKKKKKKWWWWK.","..KAAAAAAAAANWK.","..KAAAAAAAWWWK..","..KKKKKKKKKKKK..","...KWK...KWK....","...KK....KK.....","................"]}},"mouse":{"label":"Mouse","ar":"فأر صغير","treats":["🧀"],"sounds":{"en":["Squeak!","🧀?","*nibble*","♥"],"ar":["صيصي!","🧀؟","*يقرض*","♥"]},"speed":1.25,"bounce":1,"palettes":{"grey":{"swatch":"#a3a8b0","K":"#3a3d42","A":"#b0b5bd","N":"#ffa3b5","E":"#1b1b1b"},"white":{"swatch":"#ffffff","K":"#6b6157","A":"#fdfbf7","N":"#ffa3b5","E":"#c0304a"},"brown":{"swatch":"#b08a68","K":"#3a2a1d","A":"#b8926e","N":"#ff9eb0","E":"#1b1b1b"}},"sprites":{"idle":["................","................","................","................","................","................",".........KK.....","........KNNK....","....KKKKKNNKK...","...KAAAAAKKAAK..","..KAAAAAAAAAEAK.","KKAAAAAAAAAAAANK","K.KAAAAAAAAAAK..","...KKKKKKKKKK...","....KNK..KNK....","................"],"move1":["................","................","................","................","................","................",".........KK.....","........KNNK....","....KKKKKNNKK...","...KAAAAAKKAAK..","..KAAAAAAAAAEAK.","KKAAAAAAAAAAAANK","K.KAAAAAAAAAAK..","...KKKKKKKKKK...","...KNK....KNK...","................"],"move2":["................","................","................","................","................","................",".........KK.....","........KNNK....","....KKKKKNNKK...","...KAAAAAKKAAK..","..KAAAAAAAAAEAK.","KKAAAAAAAAAAAANK","K.KAAAAAAAAAAK..","...KKKKKKKKKK...",".....KNK.KNK....","................"],"blink":["................","................","................","................","................","................",".........KK.....","........KNNK....","....KKKKKNNKK...","...KAAAAAKKAAK..","..KAAAAAAAAAKAK.","KKAAAAAAAAAAAANK","K.KAAAAAAAAAAK..","...KKKKKKKKKK...","....KNK..KNK....","................"],"bob":["................","................","................","................","................","................","................","..........KK....",".........KNNK...","...KAKKKKKNNKK..","..KAAAAAAAAAEAK.","KKAAAAAAAAAAAANK","K.KAAAAAAAAAAK..","...KKKKKKKKKK...","....KNK..KNK....","................"]}},"unicorn":{"label":"Unicorn","ar":"يونيكورن","treats":["🍬","🌈"],"sounds":{"en":["✨ Neigh~","🌈","Magic!","♥"],"ar":["✨ صهيل~","🌈","سحر!","♥"]},"speed":1.15,"bounce":1,"palettes":{"classic":{"swatch":"#ff9ecb","K":"#6b5a7a","A":"#ffffff","P":"#ff9ecb","Q":"#9fd3ff","Y":"#ffd84a","H":"#c9b8ff","N":"#ffb3c7","E":"#3a2a4a","W":"#ffffff"},"lavender":{"swatch":"#ece4ff","K":"#4a3a6a","A":"#ece4ff","P":"#7fe0c8","Q":"#ffd84a","Y":"#ffd84a","H":"#a78bfa","N":"#ffb3c7","E":"#2a1a4a","W":"#ffffff"},"mint":{"swatch":"#dcfbe9","K":"#2f5a4a","A":"#dcfbe9","P":"#b18cff","Q":"#ff9ecb","Y":"#ffd84a","H":"#7fd0a8","N":"#ffb3c7","E":"#1a3a2a","W":"#ffffff"}},"sprites":{"idle":["..........K.....",".........KYK.K..",".....KKKKKYKAK..","....KPPAAAAAAK..","...KPQPAAAAAAAK.","...KPQAAAAAWEAK.","...KPPAAAAAEEAK.","..KPQPAAAAAANAAK","..KQPKKAAAAAAAK.",".KPQKKAAAAAAAK..","KQPKKAAAAAAAAK..","KPQKAAAAAAAAAK..",".KK.KKKKKKKKKK..","....KAK..KAK....","....KHK..KHK....","................"],"move1":["..........K.....",".........KYK.K..",".....KKKKKYKAK..","....KPPAAAAAAK..","...KPQPAAAAAAAK.","...KPQAAAAAWEAK.","...KPPAAAAAEEAK.","..KPQPAAAAAANAAK","..KQPKKAAAAAAAK.",".KPQKKAAAAAAAK..","KQPKKAAAAAAAAK..","KPQKAAAAAAAAAK..",".KK.KKKKKKKKKK..","...KAK....KAK...","...KHK....KHK...","................"],"move2":["..........K.....",".........KYK.K..",".....KKKKKYKAK..","....KPPAAAAAAK..","...KPQPAAAAAAAK.","...KPQAAAAAWEAK.","...KPPAAAAAEEAK.","..KPQPAAAAAANAAK","..KQPKKAAAAAAAK.",".KPQKKAAAAAAAK..","KQPKKAAAAAAAAK..","KPQKAAAAAAAAAK..",".KK.KKKKKKKKKK..",".....KAKKAK.....",".....KHKKHK.....","................"],"blink":["..........K.....",".........KYK.K..",".....KKKKKYKAK..","....KPPAAAAAAK..","...KPQPAAAAAAAK.","...KPQAAAAAKKAK.","...KPPAAAAAKKAK.","..KPQPAAAAAANAAK","..KQPKKAAAAAAAK.",".KPQKKAAAAAAAK..","KQPKKAAAAAAAAK..","KPQKAAAAAAAAAK..",".KK.KKKKKKKKKK..","....KAK..KAK....","....KHK..KHK....","................"],"bob":["................","...........K....","..........KYK.K.","......KKKKKYKAK.",".....KPPAAAAAAK.","....KPQPAAAAAAAK","....KPQAAAAAWEAK","....KPPAAAAAEEAK","..KKPQPAAAAAANAA",".KPQKKAAAAAAAK..","KQPKKAAAAAAAAK..","KPQKAAAAAAAAAK..",".KK.KKKKKKKKKK..","....KAK..KAK....","....KHK..KHK....","................"]}},"koala":{"label":"Koala","ar":"كوالا","treats":["🌿"],"sounds":{"en":["*sleepy*","🌿?","Zzz","♥"],"ar":["*نعسان*","🌿؟","ززز","♥"]},"speed":0.65,"bounce":1,"palettes":{"grey":{"swatch":"#9aa3ad","K":"#3a3f46","A":"#a3acb6","W":"#f4f4f4","N":"#ff9eb0","E":"#1b1b1b"},"brown":{"swatch":"#a08a74","K":"#3a2a1d","A":"#ab957e","W":"#f4ece2","N":"#ff9eb0","E":"#1b1b1b"},"pink":{"swatch":"#f2c4d4","K":"#6b3a4a","A":"#f5ccda","W":"#ffffff","N":"#ff8fb0","E":"#2a1a20"}},"sprites":{"idle":["................",".KKK.....KKK....","KAWAKKKKKAWAK...","KAWAAAAAAAWAK...",".KAAAAAAAAAK....",".KAEAAAAAEAK....",".KNAAKKKAANK....",".KAAAAKAAAAK....","..KAAAAAAAK.....","..KAAWWWAAK.....",".KAAAWWWAAAK....",".KAKAWWWAKAK....","..KAAAAAAAK.....","..KKKKKKKKK.....","...KK...KK......","................"],"move1":["................","..KKK.....KKK...",".KAWAKKKKKAWAK..",".KAWAAAAAAAWAK..","..KAAAAAAAAAK...","..KAEAAAAAEAK...","..KNAAKKKAANK...","..KAAAAKAAAAK...","...KAAAAAAAK....","...KAAWWWAAK....","..KAAAWWWAAAK...","..KAKAWWWAKAK...","...KAAAAAAAK....","...KKKKKKKKK....","....KK..........","................"],"move2":["................","...KKK.....KKK..","..KAWAKKKKKAWAK.","..KAWAAAAAAAWAK.","...KAAAAAAAAAK..","...KAEAAAAAEAK..","...KNAAKKKAANK..","...KAAAAKAAAAK..","....KAAAAAAAK...","....KAAWWWAAK...","...KAAAWWWAAAK..","...KAKAWWWAKAK..","....KAAAAAAAK...","....KKKKKKKKK...","..........KK....","................"],"blink":["................",".KKK.....KKK....","KAWAKKKKKAWAK...","KAWAAAAAAAWAK...",".KAAAAAAAAAK....",".KAKAAAAAKAK....",".KNAAKKKAANK....",".KAAAAKAAAAK....","..KAAAAAAAK.....","..KAAWWWAAK.....",".KAAAWWWAAAK....",".KAKAWWWAKAK....","..KAAAAAAAK.....","..KKKKKKKKK.....","...KK...KK......","................"],"bob":["................","................","..KKK.....KKK...",".KAWAKKKKKAWAK..",".KAWAAAAAAAWAK..","..KAAAAAAAAAK...","..KAEAAAAAEAK...","..KNAAKKKAANK...","..KAAAAKAAAAK...","..KAAWWWAAK.....",".KAAAWWWAAAK....",".KAKAWWWAKAK....","..KAAAAAAAK.....","..KKKKKKKKK.....","...KK...KK......","................"]}},"owl":{"label":"Owl","ar":"بومة","treats":["🫐","🍓"],"sounds":{"en":["Hoo hoo!","🦉","*blinks*","Whoo?"],"ar":["هوو هوو!","🦉","*يرمش*","مين؟"]},"speed":1.1,"bounce":0,"float":true,"palettes":{"brown":{"swatch":"#a0754f","K":"#3a2414","A":"#a0754f","B":"#7a5536","C":"#f2dfc2","W":"#ffffff","Y":"#f2b13a","E":"#1b1b1b"},"snowy":{"swatch":"#f4f4f4","K":"#5a6068","A":"#f6f6f6","B":"#cfd6dc","C":"#ffffff","W":"#fffbe6","Y":"#3a3a3a","E":"#d49a12"},"pink":{"swatch":"#f2a7c3","K":"#5a2a3e","A":"#f2a7c3","B":"#d97aa0","C":"#ffe6f0","W":"#ffffff","Y":"#ffb347","E":"#2a1a20"}},"sprites":{"idle":["................","................","................","..KK.......KK...","..KAKKKKKKKAK...",".KAAAAAAAAAAAK..",".KAWWWAAAWWWAK..",".KAWEWAYAWEWAK..",".KAWWWAYAWWWAK..",".KAAAAAAAAAAAK..",".KBAAACCCAAABK..",".KBAACCCCCAABK..",".KBAACCCCCAABK..","..KBAACCCAABK...","...KKKKKKKKK....","....YY...YY....."],"move1":["................","................","................","..KK.......KK...","..KAKKKKKKKAK...",".KAAAAAAAAAAAK..",".KAWWWAAAWWWAK..",".KAWEWAYAWEWAK..","BKAWWWAYAWWWAKB.","BKAAAAAAAAAAAKB.",".KBAAACCCAAABK..",".KBAACCCCCAABK..",".KBAACCCCCAABK..","..KBAACCCAABK...","...KKKKKKKKK....","....YY...YY....."],"move2":["................","................","................","..KK.......KK...","..KAKKKKKKKAK...",".KAAAAAAAAAAAK..",".KAWWWAAAWWWAK..",".KAWEWAYAWEWAK..",".KAWWWAYAWWWAK..",".KAAAAAAAAAAAK..",".KBAAACCCAAABK..","BKBAACCCCCAABKB.","BKBAACCCCCAABKB.","..KBAACCCAABK...","...KKKKKKKKK....","....YY...YY....."],"blink":["................","................","................","..KK.......KK...","..KAKKKKKKKAK...",".KAAAAAAAAAAAK..",".KAWWWAAAWWWAK..",".KAWKWAYAWKWAK..",".KAWWWAYAWWWAK..",".KAAAAAAAAAAAK..",".KBAAACCCAAABK..",".KBAACCCCCAABK..",".KBAACCCCCAABK..","..KBAACCCAABK...","...KKKKKKKKK....","....YY...YY....."],"bob":["................","................","................","................","...KK.......KK..","...KAKKKKKKKAK..","..KAAAAAAAAAAAK.","..KAWWWAAAWWWAK.","..KAWEWAYAWEWAK.",".KKAWWWAYAWWWAK.",".KBAAACCCAAABK..",".KBAACCCCCAABK..",".KBAACCCCCAABK..","..KBAACCCAABK...","...KKKKKKKKK....","....YY...YY....."]}},"magical-girl":{"group":"anime","label":"Magical Girl","ar":"فتاة سحرية","treats":["🍡","🍓"],"sounds":{"en":["✨ Sparkle!","Love & stars!","♥","Hehe~"],"ar":["✨ بريق!","حب ونجوم!","♥","هيهي~"]},"speed":1.0,"bounce":1,"palettes":{"pink":{"swatch":"#ff8fc8","K":"#4a2440","H":"#ff8fc8","S":"#ffe3d1","E":"#5a2a7a","N":"#ff9eb0","M":"#c0506a","C":"#fff4fa","c":"#ffb8dc","A":"#ffd84a","W":"#ffffff","L":"#ff6fa8"},"mint":{"swatch":"#7fe0c8","K":"#1f4a40","H":"#7fe0c8","S":"#ffe3d1","E":"#1f6a5a","N":"#ff9eb0","M":"#c0506a","C":"#f2fffb","c":"#b8f0e0","A":"#ffd84a","W":"#ffffff","L":"#3fbfa0"},"lavender":{"swatch":"#b9a2ff","K":"#33245a","H":"#b9a2ff","S":"#ffe3d1","E":"#4a2a9a","N":"#ff9eb0","M":"#c0506a","C":"#f8f4ff","c":"#d9ccff","A":"#ffd84a","W":"#ffffff","L":"#8a6fe0"}},"sprites":{"idle":["....KKKKKKK.....","...KHHHHHHHK....","..KHHHHHHHAHK...","KKHHHHHHHHHHHKK.","HKHHSSSSSSSHHKH.","HKHSSSSSSSSSHKH.","HKHSSESSSESSHKH.","HKHSSESSSESSHKH.","HKHSNSSSSSNSHKH.","HHKHSSSMSSSHKHH.","KH..KCCACCK..HK.",".K.KSCCCCCSK.K..","...KcCCCCCcK....","..KcWcWcWcWcK...","....KSK.KSK.....","....KLK.KLK....."],"move1":["....KKKKKKK.....","...KHHHHHHHK....","..KHHHHHHHAHK...","KKHHHHHHHHHHHKK.","HKHHSSSSSSSHHKH.","HKHSSSSSSSSSHKH.","HKHSSESSSESSHKH.","HKHSSESSSESSHKH.","HKHSNSSSSSNSHKH.","HHKHSSSMSSSHKHH.","KH..KCCACCK..HK.",".K.KSCCCCCSK.K..","...KcCCCCCcK....","..KcWcWcWcWcK...","....KSK.KLK.....","....KLK........."],"move2":["....KKKKKKK.....","...KHHHHHHHK....","..KHHHHHHHAHK...","KKHHHHHHHHHHHKK.","HKHHSSSSSSSHHKH.","HKHSSSSSSSSSHKH.","HKHSSESSSESSHKH.","HKHSSESSSESSHKH.","HKHSNSSSSSNSHKH.","HHKHSSSMSSSHKHH.","KH..KCCACCK..HK.",".K.KSCCCCCSK.K..","...KcCCCCCcK....","..KcWcWcWcWcK...","....KLK.KSK.....","........KLK....."],"blink":["....KKKKKKK.....","...KHHHHHHHK....","..KHHHHHHHAHK...","KKHHHHHHHHHHHKK.","HKHHSSSSSSSHHKH.","HKHSSSSSSSSSHKH.","HKHSSKSSSKSSHKH.","HKHSSKSSSKSSHKH.","HKHSNSSSSSNSHKH.","HHKHSSSMSSSHKHH.","KH..KCCACCK..HK.",".K.KSCCCCCSK.K..","...KcCCCCCcK....","..KcWcWcWcWcK...","....KSK.KSK.....","....KLK.KLK....."],"bob":["................",".....KKKKKKK....","....KHHHHHHHK...","...KHHHHHHHAHK..",".KKHHHHHHHHHHHKK",".HKHHSSSSSSSHHKH",".HKHSSSSSSSSSHKH",".HKHSSESSSESSHKH",".HKHSSESSSESSHKH",".HKHSNSSSSSNSHKH","KHHKHSSSMSSSHKHH",".K.KSCCCCCSK.K..","...KcCCCCCcK....","..KcWcWcWcWcK...","....KSK.KSK.....","....KLK.KLK....."]}},"ninja":{"group":"anime","label":"Ninja","ar":"نينجا","treats":["🍙","🍡"],"sounds":{"en":["Nin nin!","*poof*","🍙?","Shh..."],"ar":["نِن نِن!","*بوف*","🍙؟","شششش..."]},"speed":1.3,"bounce":1,"palettes":{"navy":{"swatch":"#2b3550","K":"#141824","C":"#2b3550","A":"#e0453a","S":"#ffe0cc","E":"#1b1b1b"},"shadow":{"swatch":"#2a2a2e","K":"#0a0a0c","C":"#2f2f35","A":"#8a4fe0","S":"#ffe0cc","E":"#1b1b1b"},"snow":{"swatch":"#e8ecf2","K":"#4a5260","C":"#e8ecf2","A":"#3a7bd5","S":"#ffe0cc","E":"#1b1b1b"}},"sprites":{"idle":["....KKKKKKK.....","...KCCCCCCCK....","..KCCCCCCCCCK...",".KAAAAAAAAAAAKAA",".KCCCCCCCCCCCK.A",".KCSSSSSSSSSCK..",".KCSSESSSESSCK..",".KCSSESSSESSCK..",".KCCCCCCCCCCCK..","..KCCCCCCCCCK...","....KCCCCCK.....","...KSCCCCCSK....","...KCAAAAACK....","...KCCCCCCCK....","....KCK.KCK.....","....KKK.KKK....."],"move1":["....KKKKKKK.....","...KCCCCCCCK....","..KCCCCCCCCCK...",".KAAAAAAAAAAAKAA",".KCCCCCCCCCCCK.A",".KCSSSSSSSSSCK..",".KCSSESSSESSCK..",".KCSSESSSESSCK..",".KCCCCCCCCCCCK..","..KCCCCCCCCCK...","....KCCCCCK.....","...KSCCCCCSK....","...KCAAAAACK....","...KCCCCCCCK....","....KCK.KKK.....","....KKK........."],"move2":["....KKKKKKK.....","...KCCCCCCCK....","..KCCCCCCCCCK...",".KAAAAAAAAAAAKAA",".KCCCCCCCCCCCK.A",".KCSSSSSSSSSCK..",".KCSSESSSESSCK..",".KCSSESSSESSCK..",".KCCCCCCCCCCCK..","..KCCCCCCCCCK...","....KCCCCCK.....","...KSCCCCCSK....","...KCAAAAACK....","...KCCCCCCCK....","....KKK.KCK.....","........KKK....."],"blink":["....KKKKKKK.....","...KCCCCCCCK....","..KCCCCCCCCCK...",".KAAAAAAAAAAAKAA",".KCCCCCCCCCCCK.A",".KCSSSSSSSSSCK..",".KCSSKSSSKSSCK..",".KCSSKSSSKSSCK..",".KCCCCCCCCCCCK..","..KCCCCCCCCCK...","....KCCCCCK.....","...KSCCCCCSK....","...KCAAAAACK....","...KCCCCCCCK....","....KCK.KCK.....","....KKK.KKK....."],"bob":["................",".....KKKKKKK....","....KCCCCCCCK...","...KCCCCCCCCCK..","..KAAAAAAAAAAAKA","..KCCCCCCCCCCCK.","..KCSSSSSSSSSCK.","..KCSSESSSESSCK.","..KCSSESSSESSCK.","..KCCCCCCCCCCCK.","...KCCCCCCCCCK..","...KSCCCCCSK....","...KCAAAAACK....","...KCCCCCCCK....","....KCK.KCK.....","....KKK.KKK....."]}},"neko-girl":{"group":"anime","label":"Neko Girl","ar":"فتاة القطة","treats":["🐟","🍰"],"sounds":{"en":["Nya~","Nyan!","🐟?","*purr*"],"ar":["نيا~","نيان!","🐟؟","*خرخرة*"]},"speed":1.1,"bounce":1,"palettes":{"orange":{"swatch":"#ffb052","K":"#4a2c17","H":"#ffb052","N":"#ff9eb0","S":"#ffe3d1","E":"#2e7d5b","M":"#c0506a","C":"#8ad0ff","W":"#ffffff","L":"#5a3a2a"},"black":{"swatch":"#2f2f38","K":"#0d0d12","H":"#34343e","N":"#ff8fa6","S":"#ffe3d1","E":"#d4a017","M":"#c0506a","C":"#ff8fb8","W":"#ffffff","L":"#2b2b33"},"white":{"swatch":"#f5f5f5","K":"#6b6157","H":"#fbfbfb","N":"#ffa3b5","S":"#ffe3d1","E":"#3c7fd6","M":"#c0506a","C":"#b9a2ff","W":"#ffffff","L":"#6b6157"}},"sprites":{"idle":["..KK.......KK...","..KNHKKKKKHNK...","..KHHHHHHHHHK...",".KHHHHHHHHHHHK..",".KHHSSHSHSSHHK..",".KHSSSSSSSSSHK..",".KHSSESSSESSHK..",".KHSSESSSESSHK..",".KHSNSSSSSNSHK..","..KHSSSMSSSHK...","....KCCCCCK.....","...KSCCWCCSK....","...KCCCCCCCK.KHK","...KCCCCCCCKKHK.","....KSK.KSK.....","....KLK.KLK....."],"move1":["..KK.......KK...","..KNHKKKKKHNK...","..KHHHHHHHHHK...",".KHHHHHHHHHHHK..",".KHHSSHSHSSHHK..",".KHSSSSSSSSSHK..",".KHSSESSSESSHK..",".KHSSESSSESSHK..",".KHSNSSSSSNSHK..","..KHSSSMSSSHK...","....KCCCCCK.....","...KSCCWCCSK....","...KCCCCCCCK.KHK","...KCCCCCCCKKHK.","....KSK.KLK.....","....KLK........."],"move2":["..KK.......KK...","..KNHKKKKKHNK...","..KHHHHHHHHHK...",".KHHHHHHHHHHHK..",".KHHSSHSHSSHHK..",".KHSSSSSSSSSHK..",".KHSSESSSESSHK..",".KHSSESSSESSHK..",".KHSNSSSSSNSHK..","..KHSSSMSSSHK...","....KCCCCCK.....","...KSCCWCCSK....","...KCCCCCCCK.KHK","...KCCCCCCCKKHK.","....KLK.KSK.....","........KLK....."],"blink":["..KK.......KK...","..KNHKKKKKHNK...","..KHHHHHHHHHK...",".KHHHHHHHHHHHK..",".KHHSSHSHSSHHK..",".KHSSSSSSSSSHK..",".KHSSKSSSKSSHK..",".KHSSKSSSKSSHK..",".KHSNSSSSSNSHK..","..KHSSSMSSSHK...","....KCCCCCK.....","...KSCCWCCSK....","...KCCCCCCCK.KHK","...KCCCCCCCKKHK.","....KSK.KSK.....","....KLK.KLK....."],"bob":["................","...KK.......KK..","...KNHKKKKKHNK..","...KHHHHHHHHHK..","..KHHHHHHHHHHHK.","..KHHSSHSHSSHHK.","..KHSSSSSSSSSHK.","..KHSSESSSESSHK.","..KHSSESSSESSHK.","..KHSNSSSSSNSHK.","...KHSSSMSSSHK..","...KSCCWCCSK....","...KCCCCCCCK.KHK","...KCCCCCCCKKHK.","....KSK.KSK.....","....KLK.KLK....."]}},"samurai":{"group":"anime","label":"Samurai","ar":"ساموراي","treats":["🍵","🍙"],"sounds":{"en":["Hai!","*bows*","🍵?","Honor!"],"ar":["هاي!","*ينحني*","🍵؟","شرف!"]},"speed":1.0,"bounce":1,"palettes":{"blue":{"swatch":"#3a6fb0","K":"#141418","H":"#2b2b33","S":"#ffe0cc","E":"#2a1a10","N":"#ff9eb0","M":"#a04050","C":"#3a6fb0","W":"#f4f0e6","A":"#e0c04a","D":"#4a4a5c","L":"#a07850"},"red":{"swatch":"#c0392b","K":"#1a0f0f","H":"#2b2b33","S":"#ffe0cc","E":"#2a1a10","N":"#ff9eb0","M":"#a04050","C":"#c0392b","W":"#f4f0e6","A":"#2b2b33","D":"#3a3a44","L":"#a07850"},"green":{"swatch":"#3f8f5a","K":"#10180f","H":"#5a3a2a","S":"#ffe0cc","E":"#2a1a10","N":"#ff9eb0","M":"#a04050","C":"#3f8f5a","W":"#f4f0e6","A":"#e0c04a","D":"#5a4a3a","L":"#a07850"}},"sprites":{"idle":["......KKK.......",".....KHHHK......","...KKKHHHKKK....","..KHHHHHHHHHK...",".KHHSSSSSSSHHK..",".KHSSSSSSSSSHK..",".KHSSESSSESSHK..",".KHSSESSSESSHK..",".KHSNSSSSSNSHK..","..KHSSSMSSSHK...","....KWCCCWK.....","...KSCWCWCSK....","...KAAAAAAAK....","..KDDDDDDDDDK...","....KDK.KDK.....","....KLK.KLK....."],"move1":["......KKK.......",".....KHHHK......","...KKKHHHKKK....","..KHHHHHHHHHK...",".KHHSSSSSSSHHK..",".KHSSSSSSSSSHK..",".KHSSESSSESSHK..",".KHSSESSSESSHK..",".KHSNSSSSSNSHK..","..KHSSSMSSSHK...","....KWCCCWK.....","...KSCWCWCSK....","...KAAAAAAAK....","..KDDDDDDDDDK...","....KDK.KLK.....","....KLK........."],"move2":["......KKK.......",".....KHHHK......","...KKKHHHKKK....","..KHHHHHHHHHK...",".KHHSSSSSSSHHK..",".KHSSSSSSSSSHK..",".KHSSESSSESSHK..",".KHSSESSSESSHK..",".KHSNSSSSSNSHK..","..KHSSSMSSSHK...","....KWCCCWK.....","...KSCWCWCSK....","...KAAAAAAAK....","..KDDDDDDDDDK...","....KLK.KDK.....","........KLK....."],"blink":["......KKK.......",".....KHHHK......","...KKKHHHKKK....","..KHHHHHHHHHK...",".KHHSSSSSSSHHK..",".KHSSSSSSSSSHK..",".KHSSKSSSKSSHK..",".KHSSKSSSKSSHK..",".KHSNSSSSSNSHK..","..KHSSSMSSSHK...","....KWCCCWK.....","...KSCWCWCSK....","...KAAAAAAAK....","..KDDDDDDDDDK...","....KDK.KDK.....","....KLK.KLK....."],"bob":["................",".......KKK......","......KHHHK.....","....KKKHHHKKK...","...KHHHHHHHHHK..","..KHHSSSSSSSHHK.","..KHSSSSSSSSSHK.","..KHSSESSSESSHK.","..KHSSESSSESSHK.","..KHSNSSSSSNSHK.","...KHSSSMSSSHK..","...KSCWCWCSK....","...KAAAAAAAK....","..KDDDDDDDDDK...","....KDK.KDK.....","....KLK.KLK....."]}},"little-witch":{"group":"anime","label":"Little Witch","ar":"ساحرة صغيرة","treats":["🍬","🎃"],"sounds":{"en":["Abracadabra~","✨🧹","*giggle*","Poof!"],"ar":["أبرا كدابرا~","✨🧹","*ضحكة*","بوف!"]},"speed":1.0,"bounce":1,"palettes":{"purple":{"swatch":"#5b3a9a","K":"#221433","P":"#5b3a9a","A":"#ffd84a","H":"#ff9b5a","S":"#ffe3d1","E":"#2a6a4a","N":"#ff9eb0","M":"#c0506a","C":"#4a2f7a","L":"#2b1d12"},"midnight":{"swatch":"#2a2a33","K":"#0d0d12","P":"#2a2a33","A":"#9fd0ff","H":"#e8e8f0","S":"#ffe3d1","E":"#8a2a9a","N":"#ff9eb0","M":"#c0506a","C":"#33334a","L":"#1a1a22"},"pink":{"swatch":"#e86aa8","K":"#4a1a33","P":"#e86aa8","A":"#fff2a8","H":"#ffd8a8","S":"#ffe3d1","E":"#6a2a8a","N":"#ff9eb0","M":"#c0506a","C":"#c04a8a","L":"#4a1a33"}},"sprites":{"idle":[".........KK.....","........KPPK....",".......KPPPK....","......KPPPPK....",".KPPPPPPAPPPPPK.","KPPPPPPPPPPPPPPK",".KHHSSSSSSSHHK..",".KHSSESSSESSHK..",".KHSSESSSESSHK..",".KHSNSSMSSNSHK..",".KHKCCCCCCCKHK..",".KHKSCCCCCSKHK..","..KCCCCCCCCCK...",".KCCCCCCCCCCCK..","....KSK.KSK.....","....KLK.KLK....."],"move1":[".........KK.....","........KPPK....",".......KPPPK....","......KPPPPK....",".KPPPPPPAPPPPPK.","KPPPPPPPPPPPPPPK",".KHHSSSSSSSHHK..",".KHSSESSSESSHK..",".KHSSESSSESSHK..",".KHSNSSMSSNSHK..",".KHKCCCCCCCKHK..",".KHKSCCCCCSKHK..","..KCCCCCCCCCK...",".KCCCCCCCCCCCK..","....KSK.KLK.....","....KLK........."],"move2":[".........KK.....","........KPPK....",".......KPPPK....","......KPPPPK....",".KPPPPPPAPPPPPK.","KPPPPPPPPPPPPPPK",".KHHSSSSSSSHHK..",".KHSSESSSESSHK..",".KHSSESSSESSHK..",".KHSNSSMSSNSHK..",".KHKCCCCCCCKHK..",".KHKSCCCCCSKHK..","..KCCCCCCCCCK...",".KCCCCCCCCCCCK..","....KLK.KSK.....","........KLK....."],"blink":[".........KK.....","........KPPK....",".......KPPPK....","......KPPPPK....",".KPPPPPPAPPPPPK.","KPPPPPPPPPPPPPPK",".KHHSSSSSSSHHK..",".KHSSKSSSKSSHK..",".KHSSKSSSKSSHK..",".KHSNSSMSSNSHK..",".KHKCCCCCCCKHK..",".KHKSCCCCCSKHK..","..KCCCCCCCCCK...",".KCCCCCCCCCCCK..","....KSK.KSK.....","....KLK.KLK....."],"bob":["................","..........KK....",".........KPPK...","........KPPPK...",".......KPPPPK...","..KPPPPPPAPPPPPK",".KPPPPPPPPPPPPPP","..KHHSSSSSSSHHK.","..KHSSESSSESSHK.","..KHSSESSSESSHK.",".KKHSNSSMSSNSHK.",".KHKSCCCCCSKHK..","..KCCCCCCCCCK...",".KCCCCCCCCCCCK..","....KSK.KSK.....","....KLK.KLK....."]}},"kitsune":{"group":"anime","label":"Kitsune","ar":"كيتسونه","treats":["🍣","🍡"],"sounds":{"en":["Kon kon!","🦊✨","*tail swish*","Hehe~"],"ar":["كون كون!","🦊✨","*يهز ذيله*","هيهي~"]},"speed":1.15,"bounce":1,"palettes":{"white":{"swatch":"#f6f2ea","K":"#5a3a2a","H":"#f3f1f8","N":"#ff9eb0","S":"#ffe3d1","E":"#c47a12","M":"#c0506a","C":"#ffffff","A":"#e0453a","T":"#ffb052","W":"#ffffff","L":"#e0453a"},"golden":{"swatch":"#ffc86b","K":"#5a3517","H":"#ffc86b","N":"#ff9eb0","S":"#ffe3d1","E":"#8a3a12","M":"#c0506a","C":"#ffffff","A":"#e0453a","T":"#ffc86b","W":"#ffffff","L":"#e0453a"},"shadow":{"swatch":"#3a3a44","K":"#0d0d12","H":"#3a3a44","N":"#ff9eb0","S":"#ffe3d1","E":"#d4a017","M":"#c0506a","C":"#2f2f38","A":"#8a4fe0","T":"#3a3a44","W":"#d9ccff","L":"#8a4fe0"}},"sprites":{"idle":["..KK.......KK...","..KNHKKKKKHNK...","..KHHHHHHHHHK...",".KHHHHHHHHHHHK..",".KHHSSSSSSSHHK..",".KHSSSSSSSSSHK..",".KHSSESSSESSHK..",".KHSSESSSESSHK..",".KHSNSSSSSNSHK..","..KHSSSMSSSHK...","....KCCACCK.....","...KSCCCCCSK.KK.","...KCCAAACCKKTTK","...KCCCCCCCKTTWK","....KSK.KSK.....","....KLK.KLK....."],"move1":["..KK.......KK...","..KNHKKKKKHNK...","..KHHHHHHHHHK...",".KHHHHHHHHHHHK..",".KHHSSSSSSSHHK..",".KHSSSSSSSSSHK..",".KHSSESSSESSHK..",".KHSSESSSESSHK..",".KHSNSSSSSNSHK..","..KHSSSMSSSHK...","....KCCACCK.....","...KSCCCCCSK.KK.","...KCCAAACCKKTTK","...KCCCCCCCKTTWK","....KSK.KLK.....","....KLK........."],"move2":["..KK.......KK...","..KNHKKKKKHNK...","..KHHHHHHHHHK...",".KHHHHHHHHHHHK..",".KHHSSSSSSSHHK..",".KHSSSSSSSSSHK..",".KHSSESSSESSHK..",".KHSSESSSESSHK..",".KHSNSSSSSNSHK..","..KHSSSMSSSHK...","....KCCACCK.....","...KSCCCCCSK.KK.","...KCCAAACCKKTTK","...KCCCCCCCKTTWK","....KLK.KSK.....","........KLK....."],"blink":["..KK.......KK...","..KNHKKKKKHNK...","..KHHHHHHHHHK...",".KHHHHHHHHHHHK..",".KHHSSSSSSSHHK..",".KHSSSSSSSSSHK..",".KHSSKSSSKSSHK..",".KHSSKSSSKSSHK..",".KHSNSSSSSNSHK..","..KHSSSMSSSHK...","....KCCACCK.....","...KSCCCCCSK.KK.","...KCCAAACCKKTTK","...KCCCCCCCKTTWK","....KSK.KSK.....","....KLK.KLK....."],"bob":["................","...KK.......KK..","...KNHKKKKKHNK..","...KHHHHHHHHHK..","..KHHHHHHHHHHHK.","..KHHSSSSSSSHHK.","..KHSSSSSSSSSHK.","..KHSSESSSESSHK.","..KHSSESSSESSHK.","..KHSNSSSSSNSHK.","...KHSSSMSSSHK..","...KSCCCCCSK.KK.","...KCCAAACCKKTTK","...KCCCCCCCKTTWK","....KSK.KSK.....","....KLK.KLK....."]}},"shrine-maiden":{"group":"anime","label":"Shrine Maiden","ar":"كاهنة المعبد","treats":["🍡","🍵"],"sounds":{"en":["Blessings!","*sweeps*","⛩️","Good luck~"],"ar":["بركة!","*تكنس*","⛩️","بالتوفيق~"]},"speed":0.95,"bounce":1,"palettes":{"classic":{"swatch":"#d93a3a","K":"#141418","H":"#1f1b24","S":"#ffe3d1","E":"#6a2a3a","N":"#ff9eb0","M":"#c0506a","W":"#ffffff","D":"#d93a3a","L":"#f4f0e6"},"silver":{"swatch":"#d8dbe4","K":"#4a5260","H":"#d8dbe4","S":"#ffe3d1","E":"#3a5a9a","N":"#ff9eb0","M":"#c0506a","W":"#ffffff","D":"#c0392b","L":"#f4f0e6"},"autumn":{"swatch":"#e8862a","K":"#2a160c","H":"#8a4a2a","S":"#ffe3d1","E":"#4a2a1a","N":"#ff9eb0","M":"#c0506a","W":"#ffffff","D":"#e8862a","L":"#f4f0e6"}},"sprites":{"idle":["....KKKKKKK.....","...KHHHHHHHKWW..","..KHHHHHHHHHK...",".KHHHHHHHHHHHK..",".KHHSSSSSSSHHK..",".KHSSSSSSSSSHK..",".KHSSESSSESSHK..",".KHSSESSSESSHK..",".KHSNSSSSSNSHK..","..KHSSSMSSSHK...",".KHKWWWWWWWKHK..",".KHKSWWWWWSKHK..","..KDDDDDDDDDK...","..KDDDDDDDDDK...","....KDK.KDK.....","....KLK.KLK....."],"move1":["....KKKKKKK.....","...KHHHHHHHKWW..","..KHHHHHHHHHK...",".KHHHHHHHHHHHK..",".KHHSSSSSSSHHK..",".KHSSSSSSSSSHK..",".KHSSESSSESSHK..",".KHSSESSSESSHK..",".KHSNSSSSSNSHK..","..KHSSSMSSSHK...",".KHKWWWWWWWKHK..",".KHKSWWWWWSKHK..","..KDDDDDDDDDK...","..KDDDDDDDDDK...","....KDK.KLK.....","....KLK........."],"move2":["....KKKKKKK.....","...KHHHHHHHKWW..","..KHHHHHHHHHK...",".KHHHHHHHHHHHK..",".KHHSSSSSSSHHK..",".KHSSSSSSSSSHK..",".KHSSESSSESSHK..",".KHSSESSSESSHK..",".KHSNSSSSSNSHK..","..KHSSSMSSSHK...",".KHKWWWWWWWKHK..",".KHKSWWWWWSKHK..","..KDDDDDDDDDK...","..KDDDDDDDDDK...","....KLK.KDK.....","........KLK....."],"blink":["....KKKKKKK.....","...KHHHHHHHKWW..","..KHHHHHHHHHK...",".KHHHHHHHHHHHK..",".KHHSSSSSSSHHK..",".KHSSSSSSSSSHK..",".KHSSKSSSKSSHK..",".KHSSKSSSKSSHK..",".KHSNSSSSSNSHK..","..KHSSSMSSSHK...",".KHKWWWWWWWKHK..",".KHKSWWWWWSKHK..","..KDDDDDDDDDK...","..KDDDDDDDDDK...","....KDK.KDK.....","....KLK.KLK....."],"bob":["................",".....KKKKKKK....","....KHHHHHHHKWW.","...KHHHHHHHHHK..","..KHHHHHHHHHHHK.","..KHHSSSSSSSHHK.","..KHSSSSSSSSSHK.","..KHSSESSSESSHK.","..KHSSESSSESSHK.","..KHSNSSSSSNSHK.",".KHKHSSSMSSSHK..",".KHKSWWWWWSKHK..","..KDDDDDDDDDK...","..KDDDDDDDDDK...","....KDK.KDK.....","....KLK.KLK....."]}},"student":{"group":"anime","label":"Student","ar":"طالبة","treats":["🍱","🍓"],"sounds":{"en":["Ohayo!","Late for school!","📚","Senpai?"],"ar":["صباح الخير!","تأخرت عالمدرسة!","📚","سينباي؟"]},"speed":1.2,"bounce":1,"palettes":{"navy":{"swatch":"#2b3a6a","K":"#2a1d14","H":"#6b4a33","S":"#ffe3d1","E":"#3a2a1a","N":"#ff9eb0","M":"#c0506a","B":"#2b3a6a","A":"#e0453a","W":"#ffffff","L":"#2b1d12"},"black":{"swatch":"#26262c","K":"#0d0d12","H":"#1f1b24","S":"#ffe3d1","E":"#3a2a4a","N":"#ff9eb0","M":"#c0506a","B":"#26262c","A":"#e0453a","W":"#ffffff","L":"#1a1a1f"},"green":{"swatch":"#2f6a4f","K":"#2a160c","H":"#c97a3a","S":"#ffe3d1","E":"#2a4a2a","N":"#ff9eb0","M":"#c0506a","B":"#2f6a4f","A":"#ffd84a","W":"#ffffff","L":"#2b1d12"}},"sprites":{"idle":["....KKKKKKK.....","...KHHHHHHHK....","..KHHHHHHHHHK...",".KHHHHHHHHHHHK..",".KHHSSSSSSSHHK..",".KHSSSSSSSSSHK..",".KHSSESSSESSHK..",".KHSSESSSESSHK..",".KHSNSSSSSNSHK..","..KHSSSMSSSHK...","....KBBABBK.....","...KSBWWWBSK....","...KBBBBBBBK....","..KBBBBBBBBBK...","....KSK.KSK.....","....KLK.KLK....."],"move1":["....KKKKKKK.....","...KHHHHHHHK....","..KHHHHHHHHHK...",".KHHHHHHHHHHHK..",".KHHSSSSSSSHHK..",".KHSSSSSSSSSHK..",".KHSSESSSESSHK..",".KHSSESSSESSHK..",".KHSNSSSSSNSHK..","..KHSSSMSSSHK...","....KBBABBK.....","...KSBWWWBSK....","...KBBBBBBBK....","..KBBBBBBBBBK...","....KSK.KLK.....","....KLK........."],"move2":["....KKKKKKK.....","...KHHHHHHHK....","..KHHHHHHHHHK...",".KHHHHHHHHHHHK..",".KHHSSSSSSSHHK..",".KHSSSSSSSSSHK..",".KHSSESSSESSHK..",".KHSSESSSESSHK..",".KHSNSSSSSNSHK..","..KHSSSMSSSHK...","....KBBABBK.....","...KSBWWWBSK....","...KBBBBBBBK....","..KBBBBBBBBBK...","....KLK.KSK.....","........KLK....."],"blink":["....KKKKKKK.....","...KHHHHHHHK....","..KHHHHHHHHHK...",".KHHHHHHHHHHHK..",".KHHSSSSSSSHHK..",".KHSSSSSSSSSHK..",".KHSSKSSSKSSHK..",".KHSSKSSSKSSHK..",".KHSNSSSSSNSHK..","..KHSSSMSSSHK...","....KBBABBK.....","...KSBWWWBSK....","...KBBBBBBBK....","..KBBBBBBBBBK...","....KSK.KSK.....","....KLK.KLK....."],"bob":["................",".....KKKKKKK....","....KHHHHHHHK...","...KHHHHHHHHHK..","..KHHHHHHHHHHHK.","..KHHSSSSSSSHHK.","..KHSSSSSSSSSHK.","..KHSSESSSESSHK.","..KHSSESSSESSHK.","..KHSNSSSSSNSHK.","...KHSSSMSSSHK..","...KSBWWWBSK....","...KBBBBBBBK....","..KBBBBBBBBBK...","....KSK.KSK.....","....KLK.KLK....."]}},"mecha-pilot":{"group":"anime","label":"Mecha Pilot","ar":"طيار روبوت","treats":["🍔","🧃"],"sounds":{"en":["Launching!","Roger!","🚀","*beep*"],"ar":["انطلاق!","حاضر!","🚀","*بيب*"]},"speed":1.3,"bounce":1,"palettes":{"blue":{"swatch":"#3a7bd5","K":"#141c2a","H":"#3a7bd5","S":"#ffe3d1","E":"#1b2a4a","N":"#ff9eb0","M":"#c0506a","A":"#ff8a2a","C":"#f4f6fa"},"red":{"swatch":"#e0453a","K":"#1a0f0f","H":"#e0453a","S":"#ffe3d1","E":"#4a1a1a","N":"#ff9eb0","M":"#c0506a","A":"#e0453a","C":"#2a2a33"},"teal":{"swatch":"#2aa198","K":"#0f2422","H":"#2aa198","S":"#ffe3d1","E":"#14403c","N":"#ff9eb0","M":"#c0506a","A":"#ffd84a","C":"#f4f6fa"}},"sprites":{"idle":["....KKKKKKK.....","...KHHHHHHHK....","..KHHHHHHHHHK...",".KHHHHHHHHHHHK..",".AHHSSSSSSSHHA..",".AHSSSSSSSSSHA..",".KHSSESSSESSHK..",".KHSSESSSESSHK..",".KHSNSSSSSNSHK..","..KHSSSMSSSHK...","....KCCACCK.....","...KACCCCCAK....","...KCCAAACCK....","...KCCCCCCCK....","....KCK.KCK.....","....KAK.KAK....."],"move1":["....KKKKKKK.....","...KHHHHHHHK....","..KHHHHHHHHHK...",".KHHHHHHHHHHHK..",".AHHSSSSSSSHHA..",".AHSSSSSSSSSHA..",".KHSSESSSESSHK..",".KHSSESSSESSHK..",".KHSNSSSSSNSHK..","..KHSSSMSSSHK...","....KCCACCK.....","...KACCCCCAK....","...KCCAAACCK....","...KCCCCCCCK....","....KCK.KAK.....","....KAK........."],"move2":["....KKKKKKK.....","...KHHHHHHHK....","..KHHHHHHHHHK...",".KHHHHHHHHHHHK..",".AHHSSSSSSSHHA..",".AHSSSSSSSSSHA..",".KHSSESSSESSHK..",".KHSSESSSESSHK..",".KHSNSSSSSNSHK..","..KHSSSMSSSHK...","....KCCACCK.....","...KACCCCCAK....","...KCCAAACCK....","...KCCCCCCCK....","....KAK.KCK.....","........KAK....."],"blink":["....KKKKKKK.....","...KHHHHHHHK....","..KHHHHHHHHHK...",".KHHHHHHHHHHHK..",".AHHSSSSSSSHHA..",".AHSSSSSSSSSHA..",".KHSSKSSSKSSHK..",".KHSSKSSSKSSHK..",".KHSNSSSSSNSHK..","..KHSSSMSSSHK...","....KCCACCK.....","...KACCCCCAK....","...KCCAAACCK....","...KCCCCCCCK....","....KCK.KCK.....","....KAK.KAK....."],"bob":["................",".....KKKKKKK....","....KHHHHHHHK...","...KHHHHHHHHHK..","..KHHHHHHHHHHHK.","..AHHSSSSSSSHHA.","..AHSSSSSSSSSHA.","..KHSSESSSESSHK.","..KHSSESSSESSHK.","..KHSNSSSSSNSHK.","...KHSSSMSSSHK..","...KACCCCCAK....","...KCCAAACCK....","...KCCCCCCCK....","....KCK.KCK.....","....KAK.KAK....."]}},"dragon-princess":{"group":"anime","label":"Dragon Princess","ar":"أميرة التنين","treats":["🍖","💎"],"sounds":{"en":["Rawr~","🔥","Bow, peasant!","♥"],"ar":["راوورر~","🔥","انحنِ!","♥"]},"speed":1.0,"bounce":1,"palettes":{"red":{"swatch":"#c0392b","K":"#3a0f12","H":"#c0392b","R":"#ffe8b0","N":"#ff9eb0","S":"#ffe3d1","E":"#d4a017","M":"#c0506a","C":"#ff9ecb","A":"#ffd84a","T":"#c0392b","L":"#ffd84a"},"blue":{"swatch":"#3a7bd5","K":"#0f1d3a","H":"#3a7bd5","R":"#e8f4ff","N":"#ff9eb0","S":"#ffe3d1","E":"#2ad4c0","M":"#c0506a","C":"#b8e0ff","A":"#ffffff","T":"#3a7bd5","L":"#ffffff"},"green":{"swatch":"#2f9a5a","K":"#0f2a18","H":"#2f9a5a","R":"#fff2c0","N":"#ff9eb0","S":"#ffe3d1","E":"#e0453a","M":"#c0506a","C":"#e0ffd0","A":"#ffd84a","T":"#2f9a5a","L":"#ffd84a"}},"sprites":{"idle":["..KK.......KK...","..KRHKKKKKHRK...","..KHHHHHHHHHK...",".KHHHHHHHHHHHK..",".KHHSSSSSSSHHK..",".KHSSSSSSSSSHK..",".KHSSESSSESSHK..",".KHSSESSSESSHK..",".KHSNSSSSSNSHK..","..KHSSSMSSSHK...","....KCCACCK.....","...KSCCCCCSK.KK.","...KCCCCCCCKKTTK","..KCCCCCCCCCKTK.","....KSK.KSK.....","....KLK.KLK....."],"move1":["..KK.......KK...","..KRHKKKKKHRK...","..KHHHHHHHHHK...",".KHHHHHHHHHHHK..",".KHHSSSSSSSHHK..",".KHSSSSSSSSSHK..",".KHSSESSSESSHK..",".KHSSESSSESSHK..",".KHSNSSSSSNSHK..","..KHSSSMSSSHK...","....KCCACCK.....","...KSCCCCCSK.KK.","...KCCCCCCCKKTTK","..KCCCCCCCCCKTK.","....KSK.KLK.....","....KLK........."],"move2":["..KK.......KK...","..KRHKKKKKHRK...","..KHHHHHHHHHK...",".KHHHHHHHHHHHK..",".KHHSSSSSSSHHK..",".KHSSSSSSSSSHK..",".KHSSESSSESSHK..",".KHSSESSSESSHK..",".KHSNSSSSSNSHK..","..KHSSSMSSSHK...","....KCCACCK.....","...KSCCCCCSK.KK.","...KCCCCCCCKKTTK","..KCCCCCCCCCKTK.","....KLK.KSK.....","........KLK....."],"blink":["..KK.......KK...","..KRHKKKKKHRK...","..KHHHHHHHHHK...",".KHHHHHHHHHHHK..",".KHHSSSSSSSHHK..",".KHSSSSSSSSSHK..",".KHSSKSSSKSSHK..",".KHSSKSSSKSSHK..",".KHSNSSSSSNSHK..","..KHSSSMSSSHK...","....KCCACCK.....","...KSCCCCCSK.KK.","...KCCCCCCCKKTTK","..KCCCCCCCCCKTK.","....KSK.KSK.....","....KLK.KLK....."],"bob":["................","...KK.......KK..","...KRHKKKKKHRK..","...KHHHHHHHHHK..","..KHHHHHHHHHHHK.","..KHHSSSSSSSHHK.","..KHSSSSSSSSSHK.","..KHSSESSSESSHK.","..KHSSESSSESSHK.","..KHSNSSSSSNSHK.","...KHSSSMSSSHK..","...KSCCCCCSK.KK.","...KCCCCCCCKKTTK","..KCCCCCCCCCKTK.","....KSK.KSK.....","....KLK.KLK....."]}},"robot":{"group":"anime","label":"Robot","ar":"روبوت","treats":["🔋","🔩"],"sounds":{"en":["Beep boop","01001000 01101001","🔋?","Hello, human!"],"ar":["بيب بوب","01001000 01101001","🔋؟","مرحبا يا إنسان!"]},"speed":1.0,"bounce":1,"palettes":{"silver":{"swatch":"#c9d3df","K":"#2a3340","M":"#c9d3df","G":"#1b2a3a","E":"#5af0ff","A":"#ff5a7a","N":"#ff9eb0"},"gold":{"swatch":"#f2c94c","K":"#4a3a10","M":"#f2c94c","G":"#2a2410","E":"#7dff8a","A":"#ff5a7a","N":"#ff9eb0"},"pink":{"swatch":"#ffc1dc","K":"#6b2f4a","M":"#ffc1dc","G":"#3a1a2a","E":"#ffe14d","A":"#7a5af0","N":"#ff9eb0"}},"sprites":{"idle":[".......K........","......KAK.......",".......K........","..KKKKKKKKKKK...",".KMMMMMMMMMMMK..",".KMKKKKKKKKKMK..",".KMKGGGGGGGKMK..",".KMKGEGGGEGKMK..",".KMKGNGGGNGKMK..",".KMKKKKKKKKKMK..",".KMMMMMMMMMMMK..","....KMMMMMK.....","...KMKAAAKMK....","...KKMMMMMKK....","....KMK.KMK.....","....KKK.KKK....."],"move1":[".......K........","......KAK.......",".......K........","..KKKKKKKKKKK...",".KMMMMMMMMMMMK..",".KMKKKKKKKKKMK..",".KMKGGGGGGGKMK..",".KMKGEGGGEGKMK..",".KMKGNGGGNGKMK..",".KMKKKKKKKKKMK..",".KMMMMMMMMMMMK..","....KMMMMMK.....","...KMKAAAKMK....","...KKMMMMMKK....","....KMK.KKK.....","....KKK........."],"move2":[".......K........","......KAK.......",".......K........","..KKKKKKKKKKK...",".KMMMMMMMMMMMK..",".KMKKKKKKKKKMK..",".KMKGGGGGGGKMK..",".KMKGEGGGEGKMK..",".KMKGNGGGNGKMK..",".KMKKKKKKKKKMK..",".KMMMMMMMMMMMK..","....KMMMMMK.....","...KMKAAAKMK....","...KKMMMMMKK....","....KKK.KMK.....","........KKK....."],"blink":[".......K........","......KAK.......",".......K........","..KKKKKKKKKKK...",".KMMMMMMMMMMMK..",".KMKKKKKKKKKMK..",".KMKGGGGGGGKMK..",".KMKGKGGGKGKMK..",".KMKGNGGGNGKMK..",".KMKKKKKKKKKMK..",".KMMMMMMMMMMMK..","....KMMMMMK.....","...KMKAAAKMK....","...KKMMMMMKK....","....KMK.KMK.....","....KKK.KKK....."],"bob":["................","........K.......",".......KAK......","........K.......","...KKKKKKKKKKK..","..KMMMMMMMMMMMK.","..KMKKKKKKKKKMK.","..KMKGGGGGGGKMK.","..KMKGEGGGEGKMK.","..KMKGNGGGNGKMK.",".KKMKKKKKKKKKMK.","....KMMMMMK.....","...KMKAAAKMK....","...KKMMMMMKK....","....KMK.KMK.....","....KKK.KKK....."]}},"pirate":{"group":"heroes","label":"Pirate","ar":"قرصان","treats":["🪙","🍖"],"sounds":{"en":["Arrr!","Ahoy!","🏴‍☠️ Treasure!","Yo ho ho~"],"ar":["آررر!","أهوي!","🏴‍☠️ كنز!","يو هو هو~"]},"speed":1.1,"bounce":1,"palettes":{"classic":{"swatch":"#2b2b33","K":"#141418","B":"#2b2b33","W":"#ffffff","H":"#6b4a33","S":"#ffe0cc","E":"#2a1a10","N":"#ff9eb0","M":"#a04050","A":"#e0453a","C":"#3a5a9a","L":"#3a2a1a"},"red":{"swatch":"#c0392b","K":"#1a0f0f","B":"#c0392b","W":"#ffd84a","H":"#1f1b24","S":"#ffe0cc","E":"#2a1a10","N":"#ff9eb0","M":"#a04050","A":"#ffffff","C":"#2b2b33","L":"#3a2a1a"},"navy":{"swatch":"#2b3a6a","K":"#0f1424","B":"#2b3a6a","W":"#ffd84a","H":"#c97a3a","S":"#ffe0cc","E":"#2a1a10","N":"#ff9eb0","M":"#a04050","A":"#3a7bd5","C":"#6b4a33","L":"#2b1d12"}},"sprites":{"idle":["....KKKKKKK.....","...KBBBBBBBK....","..KBBBBWBBBBK...","KKKKKKKKKKKKKKK.",".KHHSSSSSSSHHK..",".KHKSSSSSSSSHK..",".KHSKKSSSESSHK..",".KHSKKSSSESSHK..",".KHSNSSSSSNSHK..","..KHSSSMSSSHK...","....KWAWAWK.....","...KSWAWAWSK....","...KCCCCCCCK....","...KCCCCCCCK....","....KCK.KCK.....","....KLK.KLK....."],"move1":["....KKKKKKK.....","...KBBBBBBBK....","..KBBBBWBBBBK...","KKKKKKKKKKKKKKK.",".KHHSSSSSSSHHK..",".KHKSSSSSSSSHK..",".KHSKKSSSESSHK..",".KHSKKSSSESSHK..",".KHSNSSSSSNSHK..","..KHSSSMSSSHK...","....KWAWAWK.....","...KSWAWAWSK....","...KCCCCCCCK....","...KCCCCCCCK....","....KCK.KLK.....","....KLK........."],"move2":["....KKKKKKK.....","...KBBBBBBBK....","..KBBBBWBBBBK...","KKKKKKKKKKKKKKK.",".KHHSSSSSSSHHK..",".KHKSSSSSSSSHK..",".KHSKKSSSESSHK..",".KHSKKSSSESSHK..",".KHSNSSSSSNSHK..","..KHSSSMSSSHK...","....KWAWAWK.....","...KSWAWAWSK....","...KCCCCCCCK....","...KCCCCCCCK....","....KLK.KCK.....","........KLK....."],"blink":["....KKKKKKK.....","...KBBBBBBBK....","..KBBBBWBBBBK...","KKKKKKKKKKKKKKK.",".KHHSSSSSSSHHK..",".KHKSSSSSSSSHK..",".KHSKKSSSKSSHK..",".KHSKKSSSKSSHK..",".KHSNSSSSSNSHK..","..KHSSSMSSSHK...","....KWAWAWK.....","...KSWAWAWSK....","...KCCCCCCCK....","...KCCCCCCCK....","....KCK.KCK.....","....KLK.KLK....."],"bob":["................",".....KKKKKKK....","....KBBBBBBBK...","...KBBBBWBBBBK..",".KKKKKKKKKKKKKKK","..KHHSSSSSSSHHK.","..KHKSSSSSSSSHK.","..KHSKKSSSESSHK.","..KHSKKSSSESSHK.","..KHSNSSSSSNSHK.","...KHSSSMSSSHK..","...KSWAWAWSK....","...KCCCCCCCK....","...KCCCCCCCK....","....KCK.KCK.....","....KLK.KLK....."]}},"astronaut":{"group":"heroes","label":"Astronaut","ar":"رائد فضاء","treats":["🍫","⭐"],"sounds":{"en":["One small step~","🌙","Houston?","Zero gravity!"],"ar":["خطوة صغيرة~","🌙","هيوستن؟","انعدام الجاذبية!"]},"speed":0.9,"bounce":2,"palettes":{"white":{"swatch":"#f4f6fa","K":"#2a3340","W":"#f4f6fa","G":"#9fd8ff","S":"#ffe0cc","E":"#2a1a10","N":"#ff9eb0","M":"#a04050","A":"#e0453a","B":"#8a8a96"},"orange":{"swatch":"#ff9a3c","K":"#3a2210","W":"#ffa64d","G":"#bfe9ff","S":"#ffe0cc","E":"#2a1a10","N":"#ff9eb0","M":"#a04050","A":"#2a5ad8","B":"#6b6b78"},"pink":{"swatch":"#ffc1dc","K":"#5a2a3e","W":"#ffd0e4","G":"#e8dcff","S":"#ffe0cc","E":"#2a1a10","N":"#ff9eb0","M":"#a04050","A":"#a78bfa","B":"#c08aa8"}},"sprites":{"idle":["....KKKKKKK.....","...KWWWWWWWK....","..KWGGGGGGGWK...",".KWGSSSSSSSGWK..",".KWGSESSSESGWK..",".KWGSESSSESGWK..",".KWGSNSSSNSGWK..",".KWGSSSMSSSGWK..",".KWWGGGGGGGWWK..","..KWWWWWWWWWK...","....KWAWWWK.....","...KWWWWWWWK....","...KWWAAAWWK....","...KWWWWWWWK....","....KWK.KWK.....","....KBK.KBK....."],"move1":["....KKKKKKK.....","...KWWWWWWWK....","..KWGGGGGGGWK...",".KWGSSSSSSSGWK..",".KWGSESSSESGWK..",".KWGSESSSESGWK..",".KWGSNSSSNSGWK..",".KWGSSSMSSSGWK..",".KWWGGGGGGGWWK..","..KWWWWWWWWWK...","....KWAWWWK.....","...KWWWWWWWK....","...KWWAAAWWK....","...KWWWWWWWK....","....KWK.KBK.....","....KBK........."],"move2":["....KKKKKKK.....","...KWWWWWWWK....","..KWGGGGGGGWK...",".KWGSSSSSSSGWK..",".KWGSESSSESGWK..",".KWGSESSSESGWK..",".KWGSNSSSNSGWK..",".KWGSSSMSSSGWK..",".KWWGGGGGGGWWK..","..KWWWWWWWWWK...","....KWAWWWK.....","...KWWWWWWWK....","...KWWAAAWWK....","...KWWWWWWWK....","....KBK.KWK.....","........KBK....."],"blink":["....KKKKKKK.....","...KWWWWWWWK....","..KWGGGGGGGWK...",".KWGSSSSSSSGWK..",".KWGSKSSSKSGWK..",".KWGSKSSSKSGWK..",".KWGSNSSSNSGWK..",".KWGSSSMSSSGWK..",".KWWGGGGGGGWWK..","..KWWWWWWWWWK...","....KWAWWWK.....","...KWWWWWWWK....","...KWWAAAWWK....","...KWWWWWWWK....","....KWK.KWK.....","....KBK.KBK....."],"bob":["................",".....KKKKKKK....","....KWWWWWWWK...","...KWGGGGGGGWK..","..KWGSSSSSSSGWK.","..KWGSESSSESGWK.","..KWGSESSSESGWK.","..KWGSNSSSNSGWK.","..KWGSSSMSSSGWK.","..KWWGGGGGGGWWK.","....KWAWWWK.....","...KWWWWWWWK....","...KWWAAAWWK....","...KWWWWWWWK....","....KWK.KWK.....","....KBK.KBK....."]}},"chef":{"group":"heroes","label":"Chef","ar":"طباخ","treats":["🧁","🍳"],"sounds":{"en":["Bon appétit!","🍳","Delicious!","*chef's kiss*"],"ar":["بالعافية!","🍳","لذيذ!","*بوسة الشيف*"]},"speed":1.0,"bounce":1,"palettes":{"classic":{"swatch":"#ffffff","K":"#3a2a1a","W":"#ffffff","H":"#6b4a33","S":"#ffe0cc","E":"#2a1a10","N":"#ff9eb0","M":"#a04050","A":"#e0453a","C":"#4a4a56","L":"#2b2b33"},"pastry":{"swatch":"#ffd6e8","K":"#5a2a3e","W":"#fff4fa","H":"#e8b05a","S":"#ffe0cc","E":"#2a1a10","N":"#ff9eb0","M":"#a04050","A":"#ff8fb8","C":"#c08aa8","L":"#5a2a3e"},"bbq":{"swatch":"#2b2b33","K":"#0d0d12","W":"#ffffff","H":"#1f1b24","S":"#ffe0cc","E":"#2a1a10","N":"#ff9eb0","M":"#a04050","A":"#ff8a2a","C":"#2b2b33","L":"#141418"}},"sprites":{"idle":["....KKKKKKK.....","...KWWWWWWWK....","...KWWWWWWWK....","..KKKKKKKKKKK...",".KHHSSSSSSSHHK..",".KHSSSSSSSSSHK..",".KHSSESSSESSHK..",".KHSSESSSESSHK..",".KHSNSSSSSNSHK..","..KHSSSMSSSHK...","....KWWAWWK.....","...KSWWAWWSK....","...KWWWWWWWK....","...KCCCCCCCK....","....KCK.KCK.....","....KLK.KLK....."],"move1":["....KKKKKKK.....","...KWWWWWWWK....","...KWWWWWWWK....","..KKKKKKKKKKK...",".KHHSSSSSSSHHK..",".KHSSSSSSSSSHK..",".KHSSESSSESSHK..",".KHSSESSSESSHK..",".KHSNSSSSSNSHK..","..KHSSSMSSSHK...","....KWWAWWK.....","...KSWWAWWSK....","...KWWWWWWWK....","...KCCCCCCCK....","....KCK.KLK.....","....KLK........."],"move2":["....KKKKKKK.....","...KWWWWWWWK....","...KWWWWWWWK....","..KKKKKKKKKKK...",".KHHSSSSSSSHHK..",".KHSSSSSSSSSHK..",".KHSSESSSESSHK..",".KHSSESSSESSHK..",".KHSNSSSSSNSHK..","..KHSSSMSSSHK...","....KWWAWWK.....","...KSWWAWWSK....","...KWWWWWWWK....","...KCCCCCCCK....","....KLK.KCK.....","........KLK....."],"blink":["....KKKKKKK.....","...KWWWWWWWK....","...KWWWWWWWK....","..KKKKKKKKKKK...",".KHHSSSSSSSHHK..",".KHSSSSSSSSSHK..",".KHSSKSSSKSSHK..",".KHSSKSSSKSSHK..",".KHSNSSSSSNSHK..","..KHSSSMSSSHK...","....KWWAWWK.....","...KSWWAWWSK....","...KWWWWWWWK....","...KCCCCCCCK....","....KCK.KCK.....","....KLK.KLK....."],"bob":["................",".....KKKKKKK....","....KWWWWWWWK...","....KWWWWWWWK...","...KKKKKKKKKKK..","..KHHSSSSSSSHHK.","..KHSSSSSSSSSHK.","..KHSSESSSESSHK.","..KHSSESSSESSHK.","..KHSNSSSSSNSHK.","...KHSSSMSSSHK..","...KSWWAWWSK....","...KWWWWWWWK....","...KCCCCCCCK....","....KCK.KCK.....","....KLK.KLK....."]}},"knight":{"group":"heroes","label":"Knight","ar":"فارس","treats":["🍗","🍎"],"sounds":{"en":["For honor!","⚔️","*clank clank*","Huzzah!"],"ar":["من أجل الشرف!","⚔️","*طق طق*","هوزا!"]},"speed":0.95,"bounce":1,"palettes":{"silver":{"swatch":"#c9d3df","K":"#2a3340","I":"#c9d3df","A":"#e0453a","S":"#ffe0cc","E":"#2a1a10","N":"#ff9eb0","M":"#a04050"},"gold":{"swatch":"#f2c94c","K":"#4a3a10","I":"#f2c94c","A":"#2a5ad8","S":"#ffe0cc","E":"#2a1a10","N":"#ff9eb0","M":"#a04050"},"dark":{"swatch":"#4a4a5c","K":"#0d0d14","I":"#555568","A":"#a78bfa","S":"#ffe0cc","E":"#2a1a10","N":"#ff9eb0","M":"#a04050"}},"sprites":{"idle":["......KAK.......","....KKKAKKK.....","...KIIIIIIIK....","..KIIIIIIIIIK...",".KIISSSSSSSIIK..",".KISSSSSSSSSIK..",".KISSESSSESSIK..",".KISSESSSESSIK..",".KISNSSSSSNSIK..","..KISSSMSSSIK...","....KIIAIIK.....","...KIIAAAIIK....","...KIIIAIIIK....","...KIIIIIIIK....","....KIK.KIK.....","....KKK.KKK....."],"move1":["......KAK.......","....KKKAKKK.....","...KIIIIIIIK....","..KIIIIIIIIIK...",".KIISSSSSSSIIK..",".KISSSSSSSSSIK..",".KISSESSSESSIK..",".KISSESSSESSIK..",".KISNSSSSSNSIK..","..KISSSMSSSIK...","....KIIAIIK.....","...KIIAAAIIK....","...KIIIAIIIK....","...KIIIIIIIK....","....KIK.KKK.....","....KKK........."],"move2":["......KAK.......","....KKKAKKK.....","...KIIIIIIIK....","..KIIIIIIIIIK...",".KIISSSSSSSIIK..",".KISSSSSSSSSIK..",".KISSESSSESSIK..",".KISSESSSESSIK..",".KISNSSSSSNSIK..","..KISSSMSSSIK...","....KIIAIIK.....","...KIIAAAIIK....","...KIIIAIIIK....","...KIIIIIIIK....","....KKK.KIK.....","........KKK....."],"blink":["......KAK.......","....KKKAKKK.....","...KIIIIIIIK....","..KIIIIIIIIIK...",".KIISSSSSSSIIK..",".KISSSSSSSSSIK..",".KISSKSSSKSSIK..",".KISSKSSSKSSIK..",".KISNSSSSSNSIK..","..KISSSMSSSIK...","....KIIAIIK.....","...KIIAAAIIK....","...KIIIAIIIK....","...KIIIIIIIK....","....KIK.KIK.....","....KKK.KKK....."],"bob":["................",".......KAK......",".....KKKAKKK....","....KIIIIIIIK...","...KIIIIIIIIIK..","..KIISSSSSSSIIK.","..KISSSSSSSSSIK.","..KISSESSSESSIK.","..KISSESSSESSIK.","..KISNSSSSSNSIK.","...KISSSMSSSIK..","...KIIAAAIIK....","...KIIIAIIIK....","...KIIIIIIIK....","....KIK.KIK.....","....KKK.KKK....."]}},"ghost":{"group":"heroes","label":"Ghost","ar":"شبح","treats":["🍬","🎃"],"sounds":{"en":["Boo!","👻","Ooooo~","*floats*"],"ar":["بخ!","👻","ووووو~","*يطفو*"]},"speed":0.9,"bounce":0,"float":true,"palettes":{"white":{"swatch":"#fbfbff","K":"#5a5a7a","W":"#fbfbff","E":"#2a2a3a","N":"#ffb3c7","M":"#2a2a3a"},"mint":{"swatch":"#d9fff0","K":"#2f6a5a","W":"#e0fff3","E":"#1a3a30","N":"#ffb3c7","M":"#1a3a30"},"lilac":{"swatch":"#eadcff","K":"#5a4a8a","W":"#efe4ff","E":"#2a1a4a","N":"#ffb3c7","M":"#2a1a4a"}},"sprites":{"idle":["................","................","................",".....KKKKK......","...KKWWWWWKK....","..KWWWWWWWWWK...",".KWWWWWWWWWWWK..",".KWWEWWWWWEWWK..",".KWWEWWWWWEWWK..",".KWNWWWMWWWNWK..",".KWWWWWWWWWWWK..",".KWWWWWWWWWWWK..",".KWWWWWWWWWWWK..",".KWWKKWWWKKWWK..","..KK..KKK..KK...","................"],"move1":["................","................","................",".....KKKKK......","...KKWWWWWKK....","..KWWWWWWWWWK...",".KWWWWWWWWWWWK..",".KWWEWWWWWEWWK..",".KWWEWWWWWEWWK..",".KWNWWWMWWWNWK..",".KWWWWWWWWWWWK..",".KWWWWWWWWWWWK..",".KWWWWWWWWWWWK..",".KWWKKWWWKKWWK..","..KK..KKK..KK...","................"],"move2":["................","................","................",".....KKKKK......","...KKWWWWWKK....","..KWWWWWWWWWK...",".KWWWWWWWWWWWK..",".KWWEWWWWWEWWK..",".KWWEWWWWWEWWK..",".KWNWWWMWWWNWK..",".KWWWWWWWWWWWK..",".KWWWWWWWWWWWK..",".KWWWWWWWWWWWK..",".KWKKWWWKKWWWK..","..K..KKK..KKK...","................"],"blink":["................","................","................",".....KKKKK......","...KKWWWWWKK....","..KWWWWWWWWWK...",".KWWWWWWWWWWWK..",".KWWKWWWWWKWWK..",".KWWKWWWWWKWWK..",".KWNWWWMWWWNWK..",".KWWWWWWWWWWWK..",".KWWWWWWWWWWWK..",".KWWWWWWWWWWWK..",".KWWKKWWWKKWWK..","..KK..KKK..KK...","................"],"bob":["................","................","................",".....KKKKK......","...KKWWWWWKK....","..KWWWWWWWWWK...",".KWWWWWWWWWWWK..",".KWWEWWWWWEWWK..",".KWWEWWWWWEWWK..",".KWNWWWMWWWNWK..",".KWWWWWWWWWWWK..",".KWWWWWWWWWWWK..",".KWWWWWWWWWWWK..",".KWWKKWWWKKWWK..","..KK..KKK..KK...","................"]}},"superhero":{"group":"heroes","label":"Superhero","ar":"بطل خارق","treats":["🍕","⭐"],"sounds":{"en":["To the rescue!","⭐","Hero time!","*cape swish*"],"ar":["للإنقاذ!","⭐","وقت البطولة!","*يرفرف بالعباءة*"]},"speed":1.5,"bounce":1,"palettes":{"blue":{"swatch":"#2a5ad8","K":"#141824","H":"#2b2b33","S":"#ffe0cc","E":"#ffffff","N":"#ff9eb0","M":"#a04050","A":"#2a5ad8","C":"#2a5ad8","Y":"#ffd23f","R":"#e0453a","B":"#e0453a"},"pink":{"swatch":"#ff5aa0","K":"#3a0f24","H":"#ffd84a","S":"#ffe0cc","E":"#ffffff","N":"#ff9eb0","M":"#a04050","A":"#7a4ae0","C":"#ff5aa0","Y":"#ffffff","R":"#7a4ae0","B":"#7a4ae0"},"green":{"swatch":"#2fa85a","K":"#0f2418","H":"#5a3a2a","S":"#ffe0cc","E":"#ffffff","N":"#ff9eb0","M":"#a04050","A":"#1f1f24","C":"#2fa85a","Y":"#ffd23f","R":"#1f1f24","B":"#1f1f24"}},"sprites":{"idle":["....KKKKKKK.....","...KHHHHHHHK....","..KHHHHHHHHHK...",".KHHHHHHHHHHHK..",".KHHSSSSSSSHHK..",".KHSSSSSSSSSHK..",".KHSAEAAAEASHK..",".KHSAEAAAEASHK..",".KHSNSSSSSNSHK..","..KHSSSMSSSHK...","...RKCCYCCKR....","..RKSCCCCCSKR...","..RKCCCCCCCKR...",".RRKCCCCCCCKRR..","....KCK.KCK.....","....KBK.KBK....."],"move1":["....KKKKKKK.....","...KHHHHHHHK....","..KHHHHHHHHHK...",".KHHHHHHHHHHHK..",".KHHSSSSSSSHHK..",".KHSSSSSSSSSHK..",".KHSAEAAAEASHK..",".KHSAEAAAEASHK..",".KHSNSSSSSNSHK..","..KHSSSMSSSHK...","...RKCCYCCKR....","..RKSCCCCCSKR...","..RKCCCCCCCKR...",".RRKCCCCCCCKRR..","....KCK.KBK.....","....KBK........."],"move2":["....KKKKKKK.....","...KHHHHHHHK....","..KHHHHHHHHHK...",".KHHHHHHHHHHHK..",".KHHSSSSSSSHHK..",".KHSSSSSSSSSHK..",".KHSAEAAAEASHK..",".KHSAEAAAEASHK..",".KHSNSSSSSNSHK..","..KHSSSMSSSHK...","...RKCCYCCKR....","..RKSCCCCCSKR...","..RKCCCCCCCKR...",".RRKCCCCCCCKRR..","....KBK.KCK.....","........KBK....."],"blink":["....KKKKKKK.....","...KHHHHHHHK....","..KHHHHHHHHHK...",".KHHHHHHHHHHHK..",".KHHSSSSSSSHHK..",".KHSSSSSSSSSHK..",".KHSAKAAAKASHK..",".KHSAKAAAKASHK..",".KHSNSSSSSNSHK..","..KHSSSMSSSHK...","...RKCCYCCKR....","..RKSCCCCCSKR...","..RKCCCCCCCKR...",".RRKCCCCCCCKRR..","....KCK.KCK.....","....KBK.KBK....."],"bob":["................",".....KKKKKKK....","....KHHHHHHHK...","...KHHHHHHHHHK..","..KHHHHHHHHHHHK.","..KHHSSSSSSSHHK.","..KHSSSSSSSSSHK.","..KHSAEAAAEASHK.","..KHSAEAAAEASHK.","..KHSNSSSSSNSHK.","...KHSSSMSSSHK..","..RKSCCCCCSKR...","..RKCCCCCCCKR...",".RRKCCCCCCCKRR..","....KCK.KCK.....","....KBK.KBK....."]}}};
  const STORE_KEY = "pixel-pets:v1";
  const SPEEDS = { slow: 6, normal: 10, fast: 16 };
  const SIZES = { S: 24, M: 32, L: 48, XL: 64 };
  const FRAME_MS = 100;
  const script = document.currentScript;
  const LANG_KEY = "pixel-pets:lang";
  const SCROLL_KEY = "pixel-pets:scroll";

  // ------------------------------------------------------------ i18n
  const I18N = {
    en: {
      dir: "ltr", pets: "Pets", anime: "Anime", heroes: "Characters", color: "Color", size: "Size", speed: "Speed", speech: "Speech", language: "Language",
      slow: "🐢 Slow", normal: "🚶 Normal", fast: "⚡ Fast", on: "💬 On", off: "🤫 Off",
      love: "❤️ Pet", treat: "🍪 Treat", add: "➕ Add pet", remove: "🗑 Remove",
      close: "Close (Esc)", clickMe: "Click me!", nom: "*nom*", settings: "Pixel Pets settings",
      scroll: "On scroll", screen: "📌 Stay on screen", page: "📜 Move with page",
    },
    ar: {
      dir: "rtl", pets: "حيوانات", anime: "أنمي", heroes: "شخصيات", color: "اللون", size: "الحجم", speed: "السرعة", speech: "الكلام", language: "اللغة",
      slow: "🐢 بطيء", normal: "🚶 عادي", fast: "⚡ سريع", on: "💬 تشغيل", off: "🤫 إيقاف",
      love: "❤️ دلّعه", treat: "🍪 حلاوة", add: "➕ حيوان جديد", remove: "🗑 حذف",
      close: "إغلاق (Esc)", clickMe: "اضغط عليّ!", nom: "*هام هام*", settings: "إعدادات الحيوانات",
      scroll: "عند التمرير", screen: "📌 يبقى بمكانه", page: "📜 يتحرك مع الصفحة",
    },
  };
  let lang = (() => {
    try { const l = localStorage.getItem(LANG_KEY); if (I18N[l]) return l; } catch (_) {}
    const d = script && script.dataset && script.dataset.lang;
    return I18N[d] ? d : "en";
  })();
  // "screen": pets keep their place on screen while scrolling; "page": they scroll away with the content.
  let scrollMode = (() => {
    try { const m = localStorage.getItem(SCROLL_KEY); if (m === "screen" || m === "page") return m; } catch (_) {}
    const d = script && script.dataset && script.dataset.scroll;
    return d === "page" ? "page" : "screen";
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
    .menu { position: absolute; pointer-events: auto; width: 272px; box-sizing: border-box;
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
    .tabs { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 3px; margin: 10px 0 6px; padding: 3px; background: #f3eedf; border-radius: 10px; }
    .btn.tab { padding: 4px 1px; font-size: 11px; line-height: 1.25; background: transparent; white-space: pre-line; }
    .btn.tab.on { background: #fff; border-color: #2b2418; }
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
      if (scrollMode === "screen") {
        const h = this.px / 2;
        this.x = Math.min(Math.max(h, this.x), innerWidth - h);
        this.y = Math.min(Math.max(h, this.y), innerHeight - h);
      }
      this.place();
    }
  }

  // ------------------------------------------------------------ Menu
  const menu = (() => {
    const box = el("div", "menu");
    box.setAttribute("role", "dialog");
    
    root.append(box);
    let pet = null;
    let tab = null;

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

      // character picker: one tab per group
      const groups = ["pets", "anime", "heroes"].filter((g) => Object.values(PETS).some((p) => (p.group || "pets") === g));
      if (!groups.includes(tab)) tab = def.group || "pets";
      const tabs = el("div", "tabs");
      const icons = { pets: "🐾", anime: "✨", heroes: "🎭" };
      for (const g of groups) {
        tabs.append(button(icons[g] + "\n" + T(g), g === tab, () => { tab = g; render(); }, "tab"));
      }
      box.append(tabs);
      const grid = el("div", "grid");
      for (const [key, p] of Object.entries(PETS).filter(([, p]) => (p.group || "pets") === tab)) {
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

      section(T("scroll"));
      const scr = el("div", "row");
      for (const m of ["screen", "page"]) {
        scr.append(button(T(m), m === scrollMode, () => {
          scrollMode = m;
          try { localStorage.setItem(SCROLL_KEY, m); } catch (_) {}
          render();
        }, "grow"));
      }
      box.append(scr);

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
      const w = 272, h = box.offsetHeight || 420, m = 8;
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
      if (pet !== p) tab = null;
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
    return { open, close, position: () => pet && position(), get pet() { return pet; } };
  })();

  // ------------------------------------------------------------ scroll behaviour
  let lastSX = window.scrollX, lastSY = window.scrollY;
  window.addEventListener("scroll", () => {
    const dx = window.scrollX - lastSX, dy = window.scrollY - lastSY;
    lastSX = window.scrollX; lastSY = window.scrollY;
    if (scrollMode !== "page" || (!dx && !dy)) return;
    for (const p of pets) {
      p.x -= dx; p.y -= dy; p.place();
      if (p.treat) {
        p.treat.x -= dx; p.treat.y -= dy;
        p.treat.el.style.left = p.treat.x + "px";
        p.treat.el.style.top = p.treat.y + "px";
      }
    }
    menu.position();
  }, { passive: true });

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
    get scrollMode() { return scrollMode; },
    setScroll(m) { if (m === "screen" || m === "page") { scrollMode = m; try { localStorage.setItem(SCROLL_KEY, m); } catch (_) {} if (menu.pet) menu.open(menu.pet); } },
    setLang(l) { if (I18N[l]) { lang = l; try { localStorage.setItem(LANG_KEY, l); } catch (_) {} if (menu.pet) menu.open(menu.pet); } },
    reset() { try { localStorage.removeItem(STORE_KEY); localStorage.removeItem(LANG_KEY); localStorage.removeItem(SCROLL_KEY); } catch (_) {} },
    destroy() { destroyed = true; guard.disconnect(); menu.close(); host.remove(); delete window.PixelPets; },
  };
})();
