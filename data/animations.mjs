/**
 * 动效收集数据源。
 * 新增一个动效：往数组里加一个对象即可，然后运行 `node build.mjs`。
 *
 * 字段说明：
 *   slug        深链文件名（animations/<slug>.html）
 *   name        中文名称
 *   desc        简短描述
 *   tags        标签数组
 *   source      来源链接（可空）
 *   author      作者 / 来源说明
 *   html        演示用 HTML
 *   css         演示用 CSS
 *   js          可选：演示用 JS（会与 HTML/CSS 一起出现在复制面板）
 *   previewCss  仅首页卡片缩略预览的附加样式（可选）
 */
export const animations = [
  {
    slug: 'sparkle-button',
    name: '星星闪光按钮',
    desc: '按钮四角藏着四颗小星星，鼠标悬停时依次旋转、放大、闪烁，图标同时旋转放大。纯 CSS 驱动，靠 --i 变量错开每颗星的动画延迟。',
    tags: ['button', 'star', 'sparkle', 'hover'],
    source: '',
    author: '来源：主人知识库收藏',
    html: `<button class="btn-sparkle">
  <span class="btn-sparkle-star" style="--i:0" aria-hidden="true"></span>
  <span class="btn-sparkle-star" style="--i:1" aria-hidden="true"></span>
  <span class="btn-sparkle-star" style="--i:2" aria-hidden="true"></span>
  <span class="btn-sparkle-star" style="--i:3" aria-hidden="true"></span>
  <svg class="btn-sparkle-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2l2.3 7.7L22 12l-7.7 2.3L12 22l-2.3-7.7L2 12l7.7-2.3z"/></svg>
  Generate
</button>`,
    css: `.btn-sparkle {
  --c: var(--btn-color, #3b82f6);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5em;
  font: 600 var(--btn-size, 18px)/1.2 system-ui, sans-serif;
  cursor: pointer;
  position: relative;
  padding: 0.8em 1.7em;
  border: 0;
  border-radius: 2em;
  background: linear-gradient(135deg, var(--c), color-mix(in srgb, var(--c) 45%, #d946ef));
  color: #fff;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.btn-sparkle-icon {
  width: 1.1em;
  height: 1.1em;
  transition: transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.btn-sparkle-star {
  position: absolute;
  width: 1.3em;
  height: 1.3em;
  background: color-mix(in srgb, var(--c) 15%, #fbbf24);
  clip-path: polygon(50% 0, 62% 38%, 100% 50%, 62% 62%, 50% 100%, 38% 62%, 0 50%, 38% 38%);
  transform: scale(0);
  pointer-events: none;
}
.btn-sparkle-star:nth-child(1) { top: -1.1em; left: 0.5em; }
.btn-sparkle-star:nth-child(2) { top: -0.85em; right: 0; width: 0.85em; height: 0.85em; background: var(--c); }
.btn-sparkle-star:nth-child(3) { bottom: -1.15em; right: 1.2em; }
.btn-sparkle-star:nth-child(4) { bottom: -0.55em; left: -0.8em; width: 0.85em; height: 0.85em; background: var(--c); }
.btn-sparkle:is(:hover, :focus-visible) {
  transform: translateY(-0.1em);
  box-shadow: 0 0.4em 1.2em color-mix(in srgb, var(--c) 40%, transparent);
}
.btn-sparkle:is(:hover, :focus-visible) .btn-sparkle-icon { transform: rotate(90deg) scale(1.2); }
.btn-sparkle:is(:hover, :focus-visible) .btn-sparkle-star {
  animation: btn-sparkle-twinkle 1.2s ease-in-out calc(var(--i) * 0.3s) infinite;
}
@keyframes btn-sparkle-twinkle {
  0%, 100% { transform: scale(0) rotate(0deg); }
  35%      { transform: scale(1) rotate(45deg); }
  65%      { transform: scale(0.85) rotate(90deg); }
}

@media (prefers-reduced-motion: reduce) {
  .btn-sparkle, .btn-sparkle *, .btn-sparkle::before, .btn-sparkle::after, .btn-sparkle *::before, .btn-sparkle *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}`,
    previewCss: `.btn-sparkle-star { animation: btn-sparkle-twinkle 1.2s ease-in-out calc(var(--i) * 0.3s) infinite; }`,
  },

  {
    slug: 'orbiting-stars-button',
    name: '星环环绕按钮',
    desc: '五颗小星星沿一个圆形轨道持续环绕按钮旋转，像行星轨道。用绝对定位 + rotate/translateX 组合，并用 --a 变量给每颗星设置负延迟错开起始角度。',
    tags: ['button', 'star', 'orbit', '星环'],
    source: 'https://seangeng.com/writing/the-galaxy-button',
    author: '灵感：The Galaxy Button（重写实现）',
    html: `<button class="btn-galaxy">
  <i class="orbit-star" style="--a:0"></i>
  <i class="orbit-star" style="--a:72"></i>
  <i class="orbit-star" style="--a:144"></i>
  <i class="orbit-star" style="--a:216"></i>
  <i class="orbit-star" style="--a:288"></i>
  <span>Galaxy</span>
</button>`,
    css: `.btn-galaxy {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 0.5em;
  padding: 0.9em 2.2em;
  border: 0;
  border-radius: 999px;
  font: 700 17px/1.2 system-ui, sans-serif;
  color: #fff;
  cursor: pointer;
  background: radial-gradient(120% 160% at 50% 0%, #6366f1, #1e1b4b 75%);
  box-shadow: 0 12px 30px -14px #6366f1;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}
.btn-galaxy:hover {
  transform: translateY(-2px);
  box-shadow: 0 18px 36px -14px #6366f1;
}
.btn-galaxy .orbit-star {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 7px;
  height: 7px;
  margin: -3.5px;
  border-radius: 50%;
  background: #fde68a;
  box-shadow: 0 0 10px #fbbf24;
  pointer-events: none;
  animation: galaxy-orbit 4s linear infinite;
  animation-delay: calc(var(--a) * -4s / 360);
}
@keyframes galaxy-orbit {
  from { transform: rotate(0deg) translateX(62px) rotate(0deg); }
  to   { transform: rotate(360deg) translateX(62px) rotate(-360deg); }
}

@media (prefers-reduced-motion: reduce) {
  .btn-galaxy .orbit-star { animation: none; opacity: 0; }
}`,
    previewCss: '',
  },

  {
    slug: 'twinkle-starfield',
    name: '闪烁星空背景',
    desc: '两层不同密度、不同速度的星点叠加成星空，缓慢明暗呼吸。用 radial-gradient 在重复背景里画星点，不产生任何多余 DOM，适合当 Hero 背景。',
    tags: ['background', 'star', 'twinkle', '星空'],
    source: '',
    author: '本仓库原创',
    html: `<div class="starfield">
  <span class="starfield-text">Starfield</span>
</div>`,
    css: `.starfield {
  position: relative;
  width: 100%;
  max-width: 420px;
  height: 190px;
  border-radius: 16px;
  overflow: hidden;
  display: grid;
  place-items: center;
  background: radial-gradient(120% 110% at 50% 0%, #1e1b4b, #05070f 72%);
  border: 1px solid #1f2937;
}
.starfield::before,
.starfield::after {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
}
.starfield::before {
  background-image:
    radial-gradient(1.6px 1.6px at 24px 34px, #ffffff, transparent),
    radial-gradient(1.4px 1.4px at 92px 68px, #fde68a, transparent),
    radial-gradient(1.8px 1.8px at 140px 26px, #c7d2fe, transparent),
    radial-gradient(1.2px 1.2px at 60px 118px, #ffffff, transparent),
    radial-gradient(1.5px 1.5px at 118px 142px, #fca5a5, transparent);
  background-size: 180px 180px;
  animation: twinkle 3.6s ease-in-out infinite alternate;
}
.starfield::after {
  background-image:
    radial-gradient(1.1px 1.1px at 44px 22px, #ffffff, transparent),
    radial-gradient(1.3px 1.3px at 160px 96px, #a5b4fc, transparent),
    radial-gradient(1px 1px at 110px 40px, #ffffff, transparent),
    radial-gradient(1.4px 1.4px at 20px 150px, #fde68a, transparent);
  background-size: 240px 240px;
  animation: twinkle 5.2s ease-in-out infinite alternate-reverse;
}
.starfield-text {
  position: relative;
  z-index: 1;
  font: 800 26px/1.2 system-ui, sans-serif;
  letter-spacing: 0.06em;
  background: linear-gradient(120deg, #c7d2fe, #fde68a, #a5b4fc);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
@keyframes twinkle {
  from { opacity: 0.22; }
  to   { opacity: 1; }
}

@media (prefers-reduced-motion: reduce) {
  .starfield::before, .starfield::after { animation: none; opacity: 0.75; }
}`,
    previewCss: '',
  },

  {
    slug: 'star-burst-button',
    name: '点击星星爆裂按钮',
    desc: '点击按钮时从中心向四周迸射出 12 颗小星星，呈放射状飞散并淡出。星星由 JS 动态生成，飞行距离与角度随机。',
    tags: ['button', 'star', 'click', '粒子'],
    source: '',
    author: '本仓库原创',
    html: `<button class="btn-burst" type="button">点我放星星</button>`,
    css: `.btn-burst {
  position: relative;
  padding: 0.9em 1.9em;
  border: 0;
  border-radius: 999px;
  font: 700 17px/1.2 system-ui, sans-serif;
  color: #4a2c00;
  cursor: pointer;
  background: linear-gradient(135deg, #fde68a, #fbbf24);
  box-shadow: 0 12px 26px -14px #f59e0b;
  transition: transform 0.15s ease;
}
.btn-burst:active { transform: scale(0.96); }
.burst-star {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 10px;
  height: 10px;
  margin: -5px;
  background: #fbbf24;
  clip-path: polygon(50% 0, 62% 38%, 100% 50%, 62% 62%, 50% 100%, 38% 62%, 0 50%, 38% 38%);
  pointer-events: none;
  animation: burst 0.9s ease-out forwards;
}
@keyframes burst {
  0%   { transform: translate(0, 0) scale(0.4) rotate(0deg); opacity: 1; }
  100% { transform: translate(var(--x), var(--y)) scale(1.1) rotate(160deg); opacity: 0; }
}

@media (prefers-reduced-motion: reduce) {
  .burst-star { display: none; }
}`,
    js: `document.querySelectorAll('.btn-burst').forEach(function (btn) {
  btn.addEventListener('click', function () {
    for (var i = 0; i < 12; i++) {
      var s = document.createElement('span');
      s.className = 'burst-star';
      var ang = (Math.PI * 2 * i) / 12;
      var dist = 42 + Math.random() * 40;
      s.style.setProperty('--x', Math.cos(ang) * dist + 'px');
      s.style.setProperty('--y', Math.sin(ang) * dist + 'px');
      btn.appendChild(s);
      setTimeout(function (el) { return function () { el.remove(); }; }(s), 900);
    }
  });
});`,
    previewCss: '',
  },

  {
    slug: 'rainbow-border-button',
    name: '彩虹旋转描边按钮',
    desc: '按钮背后藏着一个 conic-gradient 彩虹环，持续旋转，只在边缘露出 2px 成为流动的彩色描边。用 z-index 分层实现，无需 mask。',
    tags: ['button', 'rainbow', 'border', 'gradient'],
    source: '',
    author: '本仓库原创',
    html: `<button class="btn-rainbow" type="button"><span>Rainbow</span></button>`,
    css: `.btn-rainbow {
  position: relative;
  z-index: 0;
  padding: 0.9em 2.2em;
  border: 0;
  border-radius: 999px;
  font: 700 17px/1.2 system-ui, sans-serif;
  color: #e5e7eb;
  cursor: pointer;
  background: #0b1020;
  transition: color 0.3s ease;
}
.btn-rainbow::before {
  content: '';
  position: absolute;
  inset: -2px;
  border-radius: inherit;
  z-index: -1;
  background: conic-gradient(#f43f5e, #f59e0b, #22d3ee, #a855f7, #f43f5e);
  animation: rainbow-spin 3s linear infinite;
}
.btn-rainbow:hover { color: #fff; }
@keyframes rainbow-spin {
  to { transform: rotate(360deg); }
}

@media (prefers-reduced-motion: reduce) {
  .btn-rainbow::before { animation: none; }
}`,
    previewCss: '',
  },

  {
    slug: 'neon-glow-button',
    name: '霓虹发光按钮',
    desc: '描边与文字带霓虹光晕并持续呼吸，悬停时整颗按钮亮起白光、背景透出色彩。用 box-shadow 内外双层 + color-mix 控制光晕强度。',
    tags: ['button', 'neon', 'glow', 'hover'],
    source: '',
    author: '本仓库原创',
    html: `<button class="btn-neon" type="button">Neon</button>`,
    css: `.btn-neon {
  --c: #22d3ee;
  padding: 0.9em 2em;
  border: 2px solid var(--c);
  border-radius: 12px;
  background: transparent;
  color: var(--c);
  font: 700 16px/1 system-ui, sans-serif;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  cursor: pointer;
  text-shadow: 0 0 8px color-mix(in srgb, var(--c) 70%, transparent);
  box-shadow:
    0 0 8px color-mix(in srgb, var(--c) 60%, transparent),
    inset 0 0 8px color-mix(in srgb, var(--c) 35%, transparent);
  animation: neon-pulse 2.2s ease-in-out infinite alternate;
  transition: color 0.3s ease, background 0.3s ease, box-shadow 0.3s ease;
}
.btn-neon:hover {
  color: #fff;
  background: color-mix(in srgb, var(--c) 18%, transparent);
  box-shadow:
    0 0 22px var(--c),
    inset 0 0 16px color-mix(in srgb, var(--c) 45%, transparent);
  animation-play-state: paused;
}
@keyframes neon-pulse {
  from { filter: brightness(0.92); }
  to   { filter: brightness(1.18); }
}

@media (prefers-reduced-motion: reduce) {
  .btn-neon { animation: none; }
}`,
    previewCss: '',
  },

  {
    slug: 'gradient-flow-text',
    name: '流光渐变文字',
    desc: '文字用四色渐变填充并循环流动，像液态金属反光。靠 background-size 放大后用 background-position 位移实现无缝循环。',
    tags: ['text', 'gradient', 'flow', '流光'],
    source: '',
    author: '本仓库原创',
    html: `<div class="text-flow">Star Flow</div>`,
    css: `.text-flow {
  font: 800 38px/1.2 system-ui, sans-serif;
  letter-spacing: -0.01em;
  background: linear-gradient(90deg, #818cf8, #22d3ee, #f472b6, #818cf8);
  background-size: 200% 100%;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  animation: text-flow 4s linear infinite;
}
@keyframes text-flow {
  to { background-position: -200% 0; }
}

@media (prefers-reduced-motion: reduce) {
  .text-flow { animation: none; }
}`,
    previewCss: '',
  },

  {
    slug: 'ripple-button',
    name: '点击涟漪按钮',
    desc: '点击位置生成一圈白色涟漪扩散淡出，模拟水面波纹。涟漪大小按按钮尺寸计算，位置跟随鼠标落点。',
    tags: ['button', 'ripple', 'click', '涟漪'],
    source: '',
    author: '本仓库原创',
    html: `<button class="btn-ripple" type="button">点我涟漪</button>`,
    css: `.btn-ripple {
  position: relative;
  overflow: hidden;
  padding: 0.9em 2.2em;
  border: 0;
  border-radius: 12px;
  font: 700 17px/1.2 system-ui, sans-serif;
  color: #fff;
  cursor: pointer;
  background: linear-gradient(135deg, #0ea5e9, #6366f1);
  box-shadow: 0 12px 26px -14px #6366f1;
}
.btn-ripple .ripple {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.5);
  transform: scale(0);
  pointer-events: none;
  animation: ripple-out 0.6s ease-out forwards;
}
@keyframes ripple-out {
  to { transform: scale(2.6); opacity: 0; }
}

@media (prefers-reduced-motion: reduce) {
  .btn-ripple .ripple { display: none; }
}`,
    js: `document.querySelectorAll('.btn-ripple').forEach(function (btn) {
  btn.addEventListener('click', function (e) {
    var r = btn.getBoundingClientRect();
    var d = Math.max(r.width, r.height) * 1.2;
    var s = document.createElement('span');
    s.className = 'ripple';
    s.style.width = d + 'px';
    s.style.height = d + 'px';
    s.style.left = (e.clientX - r.left - d / 2) + 'px';
    s.style.top = (e.clientY - r.top - d / 2) + 'px';
    btn.appendChild(s);
    setTimeout(function () { s.remove(); }, 620);
  });
});`,
    previewCss: '',
  },

  {
    slug: 'shimmer-button',
    name: '流光扫过按钮',
    desc: '一条倾斜的高光带沿按钮表面循环扫过，像金属反光。用 ::before 伪元素 + skewX 实现，不增加任何多余 DOM。',
    tags: ['button', 'shimmer', '流光', 'hover'],
    source: '',
    author: '本仓库原创',
    html: `<button class="btn-shimmer" type="button">Shimmer</button>`,
    css: `.btn-shimmer {
  --c: var(--btn-color, #6366f1);
  position: relative;
  overflow: hidden;
  isolation: isolate;
  padding: 0.85em 2.1em;
  border: 0;
  border-radius: 0.9em;
  font: 700 17px/1.2 system-ui, sans-serif;
  color: #fff;
  cursor: pointer;
  background: linear-gradient(135deg, var(--c), color-mix(in srgb, var(--c) 40%, #0ea5e9));
  box-shadow: 0 10px 24px -12px color-mix(in srgb, var(--c) 70%, transparent);
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}
.btn-shimmer::before {
  content: '';
  position: absolute;
  inset: -30% -60%;
  background: linear-gradient(100deg, transparent 35%, rgba(255, 255, 255, 0.75) 50%, transparent 65%);
  transform: translateX(-110%) skewX(-18deg);
  animation: btn-shimmer-sweep 2.6s ease-in-out infinite;
  pointer-events: none;
}
.btn-shimmer:hover {
  transform: translateY(-2px);
  box-shadow: 0 16px 32px -14px color-mix(in srgb, var(--c) 85%, transparent);
}
@keyframes btn-shimmer-sweep {
  0%        { transform: translateX(-110%) skewX(-18deg); }
  55%, 100% { transform: translateX(110%) skewX(-18deg); }
}

@media (prefers-reduced-motion: reduce) {
  .btn-shimmer::before { animation: none; }
}`,
    previewCss: '',
  },

  {
    slug: 'gradient-border-glow',
    name: '渐变流光描边',
    desc: '用 @property 注册角度变量，让一圈 conic-gradient 描边持续旋转，悬停时整圈发光。现代 CSS 单元素实现，无需伪元素堆叠。',
    tags: ['button', 'border', 'gradient', 'glow'],
    source: '',
    author: '本仓库原创',
    html: `<button class="btn-orbit" type="button"><span>Orbit</span></button>`,
    css: `@property --orbit-angle {
  syntax: '<angle>';
  initial-value: 0deg;
  inherits: false;
}

.btn-orbit {
  position: relative;
  padding: 2px;
  border: 0;
  border-radius: 999px;
  cursor: pointer;
  background: conic-gradient(
    from var(--orbit-angle),
    transparent 0deg,
    #22d3ee 60deg,
    #a855f7 140deg,
    transparent 200deg,
    transparent 360deg
  );
  animation: btn-orbit-spin 3.2s linear infinite;
  transition: filter 0.3s ease, transform 0.25s ease;
}
.btn-orbit span {
  display: block;
  padding: 0.8em 2.1em;
  border-radius: 999px;
  background: #0b1020;
  color: #e5e7eb;
  font: 700 17px/1.2 system-ui, sans-serif;
}
.btn-orbit:hover {
  filter: drop-shadow(0 0 14px rgba(168, 85, 247, 0.7));
  transform: translateY(-2px);
}
@keyframes btn-orbit-spin {
  to { --orbit-angle: 360deg; }
}

@media (prefers-reduced-motion: reduce) {
  .btn-orbit { animation: none; }
}`,
    previewCss: '',
  },
];
