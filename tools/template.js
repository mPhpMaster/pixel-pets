/*! Pixel Pets: cute pixel-art pets that follow your cursor. Click a pet to customize it. https://github.com/mPhpMaster/pixel-pets (MIT) */
// Self-contained: no images, no network, no eval. Works on strict-CSP pages too.
(function pixelPets() {
  "use strict";
  if (window.PixelPets && window.PixelPets.root) return;

  const PETS = __PETS__;
  const STORE_KEY = "pixel-pets:v1";
  const SPEEDS = { slow: 6, normal: 10, fast: 16 };
  const SIZES = { S: 24, M: 32, L: 48, XL: 64 };
  const FRAME_MS = 100;
  const script = document.currentScript;
  const LANG_KEY = "pixel-pets:lang";
  const SCROLL_KEY = "pixel-pets:scroll";
  const NIGHT_KEY = "pixel-pets:night";

  // ------------------------------------------------------------ i18n
  const I18N = {
    en: {
      dir: "ltr", pets: "Pets", anime: "Anime", heroes: "Characters", color: "Color", size: "Size", speed: "Speed", speech: "Speech", language: "Language",
      slow: "🐢 Slow", normal: "🚶 Normal", fast: "⚡ Fast", on: "💬 On", off: "🤫 Off",
      love: "❤️ Pet", treat: "🍪 Treat", add: "➕ Add pet", remove: "🗑 Remove",
      close: "Close (Esc)", clickMe: "Click me!", nom: "*nom*", settings: "Pixel Pets settings",
      scroll: "On scroll", screen: "📌 Stay on screen", page: "📜 Move with page",
      hey: "Hey!", wee: "Wheee!", dizzy: "@_@", catchMe: "Catch me~", caught: "Got you!", yawn: "*yawn*",
      night: "Night", nightOn: "🌙 Sleep at night", nightOff: "☀️ Always awake",
    },
    ar: {
      dir: "rtl", pets: "حيوانات", anime: "أنمي", heroes: "شخصيات", color: "اللون", size: "الحجم", speed: "السرعة", speech: "الكلام", language: "اللغة",
      slow: "🐢 بطيء", normal: "🚶 عادي", fast: "⚡ سريع", on: "💬 تشغيل", off: "🤫 إيقاف",
      love: "❤️ دلّعه", treat: "🍪 حلاوة", add: "➕ حيوان جديد", remove: "🗑 حذف",
      close: "إغلاق (Esc)", clickMe: "اضغط عليّ!", nom: "*هام هام*", settings: "إعدادات الحيوانات",
      scroll: "عند التمرير", screen: "📌 يبقى بمكانه", page: "📜 يتحرك مع الصفحة",
      hey: "هيه!", wee: "وييي!", dizzy: "@_@", catchMe: "امسكني~", caught: "مسكتك!", yawn: "*تثاؤب*",
      night: "الليل", nightOn: "🌙 ينام بالليل", nightOff: "☀️ صاحي دايم",
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
  // Night mode: between 23:00 and 06:00 (visitor's local time) pets get sleepy.
  let nightSleep = (() => {
    try { const v = localStorage.getItem(NIGHT_KEY); if (v === "on" || v === "off") return v === "on"; } catch (_) {}
    return !(script && script.dataset && script.dataset.night === "false");
  })();
  const isNight = () => { const h = new Date().getHours(); return nightSleep && (h >= 23 || h < 6); };
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
    .pet canvas { display: block; image-rendering: pixelated; pointer-events: auto; cursor: grab; touch-action: none; }
    .pet.held canvas { cursor: grabbing; }
    .bubble { position: absolute; bottom: 100%; left: 50%; transform: translateX(-50%); margin-bottom: 2px;
      background: #fff; color: #1d1a16; border: 2px solid #2b2418; border-radius: 8px; padding: 1px 6px;
      font: 600 12px/1.4 system-ui, -apple-system, "Segoe UI", sans-serif; white-space: nowrap; display: none;
      box-shadow: 2px 2px 0 rgba(0,0,0,.2); }
    .pet.low .bubble { bottom: auto; top: 100%; margin: 2px 0 0; }
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
  let lastMouseMove = performance.now();
  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX; mouseY = e.clientY;
    lastMouseMove = performance.now();
    if (play && play.type === "nap") stopPlay(true);
  }, { passive: true });

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
      this.rot = 0;            // tumble angle while thrown
      this.dragging = false;   // held by the pointer
      this.air = false;        // flying after a throw
      this.vx = 0; this.vy = 0;
      this.playTarget = null;  // set by the play engine (chase / nap)
      this.playSpeed = 1;
      this.napping = false;

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

      this.canvas.addEventListener("click", (e) => {
        e.stopPropagation();
        if (this.justDragged) { this.justDragged = false; return; }
        menu.open(this);
      });
      this.canvas.addEventListener("pointerdown", (e) => this.grab(e));
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
      this.canvas.style.transform = this.rot ? `rotate(${Math.round(this.rot)}deg)` : "";
      this.el.classList.toggle("low", this.y - h < 30);   // near the top edge: show the bubble below
    }

    // ---- pick up & throw
    grab(e) {
      if (e.button !== 0) return;
      const startX = e.clientX, startY = e.clientY;
      const offX = this.x - startX, offY = this.y - startY;
      const samples = [];
      let moved = false;
      const move = (ev) => {
        if (!moved && Math.hypot(ev.clientX - startX, ev.clientY - startY) < 5) return;
        if (!moved) {
          moved = true;
          menu.close();
          if (play) stopPlay(false);
          this.dragging = true; this.air = false; this.rot = 0;
          this.idleAnim = null; this.lift = 0;
          this.el.classList.add("held");
          this.draw("blink");
          if (this.talk) this.say(T("hey"), 10);
        }
        this.x = ev.clientX + offX; this.y = ev.clientY + offY;
        samples.push({ x: this.x, y: this.y, t: performance.now() });
        if (samples.length > 6) samples.shift();
        this.rot = Math.max(-25, Math.min(25, (ev.movementX || 0) * 2));
        this.place();
      };
      const up = () => {
        document.removeEventListener("pointermove", move);
        document.removeEventListener("pointerup", up);
        document.removeEventListener("pointercancel", up);
        if (!moved) return;                       // a plain click: let the click handler open the menu
        this.justDragged = true;
        setTimeout(() => { this.justDragged = false; }, 0);
        this.dragging = false;
        this.el.classList.remove("held");
        const a = samples[0], b = samples[samples.length - 1];
        const dt = a && b ? Math.max(16, b.t - a.t) / 1000 : 1;
        this.vx = a && b ? Math.max(-2500, Math.min(2500, (b.x - a.x) / dt)) : 0;
        this.vy = a && b ? Math.max(-2500, Math.min(2500, (b.y - a.y) / dt)) : 0;
        this.air = true;
        if (this.talk && Math.hypot(this.vx, this.vy) > 400) this.say(T("wee"), 10);
      };
      document.addEventListener("pointermove", move);
      document.addEventListener("pointerup", up);
      document.addEventListener("pointercancel", up);
    }

    physics(dt) {                                 // called every animation frame while thrown
      const float = !!this.def.float;
      const h = this.px / 2, W = innerWidth, H = innerHeight;
      if (!float) this.vy += 2200 * dt;           // gravity
      const drag = Math.exp(-(float ? 2.2 : 0.25) * dt);
      this.vx *= drag; if (float) this.vy *= drag;
      this.x += this.vx * dt; this.y += this.vy * dt;
      this.rot += this.vx * dt * 1.2;
      let floor = false;
      if (this.x < h) { this.x = h; this.vx = -this.vx * 0.6; }
      if (this.x > W - h) { this.x = W - h; this.vx = -this.vx * 0.6; }
      if (this.y < h) { this.y = h; this.vy = -this.vy * 0.6; }
      if (this.y > H - h) {
        this.y = H - h; floor = true;
        this.vy = -this.vy * 0.5; this.vx *= 0.75;
        if (Math.abs(this.vy) < 140) this.vy = 0;
      }
      this.place();
      const speed = Math.hypot(this.vx, this.vy);
      if ((floor && speed < 60) || (float && speed < 40)) this.land();
    }

    land() {
      this.air = false;
      this.vx = this.vy = 0;
      this.rot = 0;
      this.draw("blink");
      if (this.talk) this.say(T("dizzy"), 12);
      this.idleTime = 8;                          // a moment to recover, then back to the cursor
      this.idleAnim = null;
      this.place();
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
      if (play && play.pets.includes(this)) stopPlay(false);
      if (this.treat) this.treat.el.remove();
      this.el.remove();
      pets.splice(pets.indexOf(this), 1);
    }

    target() {
      if (this.treat) return { x: this.treat.x, y: this.treat.y, stop: 4 };
      if (this.playTarget) return this.playTarget;
      const i = pets.indexOf(this);
      if (i <= 0) return { x: mouseX, y: mouseY, stop: Math.max(48, this.px * 1.3) };
      const a = i * 2.4, r = 30 + i * 12;            // spread extra pets around the cursor
      return { x: mouseX + Math.cos(a) * r, y: mouseY + Math.sin(a) * r, stop: 20 };
    }

    idle() {
      this.idleTime++;
      this.lift = this.def.float ? Math.round(Math.sin(this.frameCount / 4) * 2) : 0;

      if (isNight() && this.idleTime > 25 && this.idleAnim === null) {   // night: doze off quickly
        if (this.talk) this.say(T("yawn"), 10);
        this.idleAnim = "sleep";
        this.idleFrame = 0;
      }
      if (this.idleTime > 10 && this.idleAnim === null && Math.random() < 1 / 120) {
        const opts = isNight() ? ["sleep", "blink"] : ["dance", "sleep", "blink", "blink"];
        if (this.talk && !isNight()) opts.push("talk", "talk");
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
          if (this.idleFrame > 200 && !this.napping && !isNight()) this.idleAnim = null;
          if (this.idleFrame > 400) this.idleFrame = 6;
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
      if (this.frozen || this.dragging) return;
      if (this.air) { this.draw(this.frameCount % 2 ? "move1" : "move2"); return; }

      const t = this.target();
      const dx = this.x - t.x, dy = this.y - t.y;
      const dist = Math.hypot(dx, dy);
      const step = SPEEDS[this.speed] * this.def.speed * (this.treat ? 1.6 : 1) * this.playSpeed * (isNight() ? 0.7 : 1);

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
      this.napping = false;

      if (this.idleTime > 1 && !this.treat && !(play && play.type === "chase")) {     // startled before moving off
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

      section(T("night"));
      const nt = el("div", "row");
      for (const v of [true, false]) {
        nt.append(button(T(v ? "nightOn" : "nightOff"), v === nightSleep, () => {
          nightSleep = v;
          try { localStorage.setItem(NIGHT_KEY, v ? "on" : "off"); } catch (_) {}
          render();
        }, "grow"));
      }
      box.append(nt);

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

  // ------------------------------------------------------------ playing together (2+ pets)
  let play = null;   // { type: "chase" | "nap", pets: [...], ... }
  const free = (p) => !p.dragging && !p.air && !p.treat && !p.frozen;

  function startPlay(type) {
    const cands = pets.filter(free);
    if (cands.length < 2) return false;
    if (type === "chase") {
      const a = rand(cands), b = rand(cands.filter((p) => p !== a));
      play = { type, pets: [a, b], chaser: a, runner: b, catches: 0, until: performance.now() + 12000, pauseUntil: 0 };
      a.idleAnim = b.idleAnim = null; a.hush(); b.hush();
      if (a.talk) a.say("!", 6);
      if (b.talk) b.say(T("catchMe"), 12);
    } else {
      const group = cands.slice(0, 4);
      const cx = group.reduce((s, p) => s + p.x, 0) / group.length;
      const cy = group.reduce((s, p) => s + p.y, 0) / group.length;
      play = { type, pets: group };
      group.forEach((p, i) => {
        const gap = Math.max(26, p.px * 0.9);
        p.playTarget = {
          x: Math.min(Math.max(40, cx + (i - (group.length - 1) / 2) * gap), innerWidth - 40),
          y: Math.min(Math.max(40, cy), innerHeight - 40),
          stop: 3,
        };
        p.idleAnim = null;
      });
    }
    return true;
  }

  function stopPlay(wake) {
    if (!play) return;
    for (const p of play.pets) {
      p.playTarget = null; p.playSpeed = 1; p.napping = false;
      if (wake && p.idleAnim === "sleep") { p.idleAnim = null; p.hush(); p.idleTime = 8; }
    }
    play = null;
  }

  function playTick(now) {
    if (!play) {
      if (pets.length < 2 || menu.pet || now - lastMouseMove < 4000) return;
      if (Math.random() < 1 / 50) startPlay(rand(["chase", "chase", "nap"]));
      return;
    }
    if (play.pets.some((p) => !pets.includes(p) || p.dragging || p.air)) return stopPlay(false);

    if (play.type === "chase") {
      const { chaser: a, runner: b } = play;
      if (now > play.until || play.catches >= 3) return stopPlay(false);
      if (now < play.pauseUntil) { a.playTarget = { x: a.x, y: a.y, stop: 999 }; b.playTarget = { x: b.x, y: b.y, stop: 999 }; return; }
      const dx = b.x - a.x, dy = b.y - a.y, d = Math.hypot(dx, dy) || 1;
      if (d < Math.max(22, (a.px + b.px) / 3)) {             // caught! swap roles
        if (a.talk) a.say(T("caught"), 10);
        b.hearts(2);
        play.catches++;
        play.chaser = b; play.runner = a;
        play.pauseUntil = now + 900;
        return;
      }
      const m = 30;
      a.playTarget = { x: b.x, y: b.y, stop: 2 }; a.playSpeed = 1.15;
      b.playTarget = {
        x: Math.min(Math.max(m, b.x + (dx / d) * 90), innerWidth - m),
        y: Math.min(Math.max(m, b.y + (dy / d) * 90), innerHeight - m),
        stop: 2,
      };
      b.playSpeed = 0.9;
    } else {                                                      // nap: gather, then sleep side by side
      const cx = play.pets.reduce((s, p) => s + p.x, 0) / play.pets.length;
      for (const p of play.pets) {
        const t = p.playTarget;
        if (t && Math.hypot(p.x - t.x, p.y - t.y) < 12 && !p.napping) {
          p.napping = true;
          p.facing = p.x < cx ? 1 : -1;
          p.idleAnim = "sleep"; p.idleFrame = 0; p.idleTime = 20;
        }
      }
    }
  }

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

  let last, lastPhys, running = false;
  function loop(t) {
    if (destroyed || document.hidden) { running = false; return; }   // paused while the tab is hidden
    if (last === undefined) last = t;
    const dt = Math.min(0.05, ((t - (lastPhys === undefined ? t : lastPhys)) / 1000));
    lastPhys = t;
    for (const p of pets) if (p.air) p.physics(dt);                 // smooth throw physics every frame
    if (t - last > FRAME_MS) { last = t; playTick(performance.now()); for (const p of pets.slice()) p.frame(); }
    requestAnimationFrame(loop);
  }
  function start() {
    if (running || destroyed || document.hidden) return;
    running = true; last = undefined; lastPhys = undefined;
    requestAnimationFrame(loop);
  }
  // Save battery: stop all animation while the tab is in the background.
  document.addEventListener("visibilitychange", start);
  start();

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
    get paused() { return !running; },
    play(type = "chase") { stopPlay(false); return startPlay(type === "nap" ? "nap" : "chase"); },
    stopPlay() { stopPlay(true); },
    setNightSleep(on) { nightSleep = !!on; try { localStorage.setItem(NIGHT_KEY, on ? "on" : "off"); } catch (_) {} if (menu.pet) menu.open(menu.pet); },
    setScroll(m) { if (m === "screen" || m === "page") { scrollMode = m; try { localStorage.setItem(SCROLL_KEY, m); } catch (_) {} if (menu.pet) menu.open(menu.pet); } },
    setLang(l) { if (I18N[l]) { lang = l; try { localStorage.setItem(LANG_KEY, l); } catch (_) {} if (menu.pet) menu.open(menu.pet); } },
    reset() { try { [STORE_KEY, LANG_KEY, SCROLL_KEY, NIGHT_KEY].forEach((k) => localStorage.removeItem(k)); } catch (_) {} },
    destroy() { destroyed = true; guard.disconnect(); menu.close(); host.remove(); delete window.PixelPets; },
  };
})();
