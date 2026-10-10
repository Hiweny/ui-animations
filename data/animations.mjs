/**
 * 动效收集数据源。
 * 新增一个动效：往数组里加一个对象即可，然后运行 `node build.mjs`。
 *
 * 字段说明：
 *   slug        深链文件名（animations/<slug>.html）
 *   name        中文名称
 *   desc        简短描述
 *   tags        标签数组
 *   html        演示用 HTML
 *   css         演示用 CSS
 *   js          可选：演示用 JS（会与 HTML/CSS 一起出现在复制面板）
 *   previewCss  仅首页卡片缩略预览的附加样式（可选）
 *   source      来源链接（可选）
 *   author      作者/出处（可选）
 */
export const animations = [
  {
    slug: 'sparkle-button',
    name: '星星闪光按钮',
    desc: '按钮四角藏着四颗小星星，鼠标悬停时依次旋转、放大、闪烁，图标同时旋转放大。纯 CSS 驱动，靠 --i 变量错开每颗星的动画延迟。',
    tags: ['button', 'star', 'sparkle', 'hover'],
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
    slug: 'star-burst-button',
    name: '点击星星爆裂按钮',
    desc: '点击按钮时从中心向四周迸射出 12 颗小星星，呈放射状飞散并淡出。星星由 JS 动态生成，飞行距离与角度随机。',
    tags: ['button', 'star', 'click'],
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
    slug: 'gradient-flow-text',
    name: '流光渐变文字',
    desc: '文字用四色渐变填充并循环流动，像液态金属反光。靠 background-size 放大后用 background-position 位移实现无缝循环。',
    tags: ['text', 'gradient', 'flow'],
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
    tags: ['button', 'ripple', 'click'],
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
    tags: ['button', 'shimmer', 'hover'],
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
    tags: ['button', 'border', 'gradient'],
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

  {
    slug: 'aurora-glow-button',
    name: '霓彩光晕按钮',
    desc: '按钮底色是青粉蓝三色渐变，悬停时背后的一圈锥形彩虹光晕会模糊扩散开来，像极光从边缘溢出。',
    tags: ['button', 'gradient', 'glow'],
    source: 'https://uiverse.io/Spacious74/lazy-dragonfly-64',
    author: 'Uiverse · Spacious74',
    html: `<div class="flex">
  <button class="outer-cont">Ai Button</button>
</div>`,
    css: `.flex {
  display: flex;
  align-items: center;
  gap: 5px;
}
.outer-cont {
  padding: 12px 20px;
  border: none;
  font-size: 1rem;
  cursor: pointer;
  position: relative;
  background: linear-gradient(90deg, #5bfcc4, #f593e4, #71a4f0);
  border-radius: 12px;
  color: #fff;
  transition: all 0.3s ease;
  box-shadow:
    inset 0px 0px 5px #ffffffa9,
    inset 0px 35px 30px #000,
    0px 5px 10px #000000cc;
  text-shadow: 1px 1px 1px #000;
}
.outer-cont::before {
  content: "";
  position: absolute;
  inset: 0;
  margin: auto;
  border-radius: 12px;
  filter: blur(0);
  z-index: -1;
  box-shadow: none;
  background: conic-gradient(
    #00000000 80deg,
    #40baf7,
    #f34ad7,
    #5bfcc4,
    #00000000 280deg
  );
  transition: all 0.3s ease;
}
.outer-cont:hover::before {
  filter: blur(15px);
}
.outer-cont:active::before {
  filter: blur(5px);
  transform: translateY(1px);
}
.outer-cont:active {
  box-shadow:
    inset 0px 0px 5px #ffffffa9,
    inset 0px 35px 30px #000;
  margin-top: 3px;
}`,
    previewCss: '',
  },

  {
    slug: 'bloom-button',
    name: '花朵绽放按钮',
    desc: '按钮四周藏着六朵小花，悬停时花瓣变大并绕着各自中心缓慢自转，文字底色同时变浅。每朵花由四片花瓣用 grid 拼成。',
    tags: ['button', 'flower', 'hover'],
    source: 'https://uiverse.io/yaroslavas2001/lovely-fox-50',
    author: 'Uiverse · yaroslavas2001',
    html: `<button class="btn">
  <div class="wrapper">
    <span class="text">Flowers</span>
    <div class="flower flower1"><div class="petal"></div><div class="petal two"></div><div class="petal three"></div><div class="petal four"></div></div>
    <div class="flower flower2"><div class="petal"></div><div class="petal two"></div><div class="petal three"></div><div class="petal four"></div></div>
    <div class="flower flower3"><div class="petal"></div><div class="petal two"></div><div class="petal three"></div><div class="petal four"></div></div>
    <div class="flower flower4"><div class="petal"></div><div class="petal two"></div><div class="petal three"></div><div class="petal four"></div></div>
    <div class="flower flower5"><div class="petal"></div><div class="petal two"></div><div class="petal three"></div><div class="petal four"></div></div>
    <div class="flower flower6"><div class="petal"></div><div class="petal two"></div><div class="petal three"></div><div class="petal four"></div></div>
  </div>
</button>`,
    css: `.btn {
  height: 4em;
  width: 12em;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: 0px solid black;
  cursor: pointer;
}
.wrapper {
  height: 2em;
  width: 8em;
  position: relative;
  background: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
}
.text {
  font-size: 17px;
  z-index: 1;
  color: #000;
  padding: 4px 12px;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.7);
  transition: all 0.5s ease;
}
.flower {
  display: grid;
  grid-template-columns: 1em 1em;
  position: absolute;
  transition: grid-template-columns 0.8s ease;
}
.flower1 { top: -12px; left: -13px; transform: rotate(5deg); }
.flower2 { bottom: -5px; left: 8px; transform: rotate(35deg); }
.flower3 { bottom: -15px; transform: rotate(0deg); }
.flower4 { top: -14px; transform: rotate(15deg); }
.flower5 { right: 11px; top: -3px; transform: rotate(25deg); }
.flower6 { right: -15px; bottom: -15px; transform: rotate(30deg); }
.petal {
  height: 1em;
  width: 1em;
  border-radius: 40% 70% / 7% 90%;
  background: linear-gradient(#07a6d7, #93e0ee);
  border: 0.5px solid #96d1ec;
  z-index: 0;
  transition: width 0.8s ease, height 0.8s ease;
}
.two { transform: rotate(90deg); }
.three { transform: rotate(270deg); }
.four { transform: rotate(180deg); }
.btn:hover .petal {
  background: linear-gradient(#0761d7, #93bdee);
  border: 0.5px solid #96b4ec;
}
.btn:hover .flower { grid-template-columns: 1.5em 1.5em; }
.btn:hover .flower .petal { width: 1.5em; height: 1.5em; }
.btn:hover .text { background: rgba(255, 255, 255, 0.4); }
.btn:hover div.flower1 { animation: 15s linear 0s normal none infinite running flower1; }
@keyframes flower1 { 0% { transform: rotate(5deg); } 100% { transform: rotate(365deg); } }
.btn:hover div.flower2 { animation: 13s linear 1s normal none infinite running flower2; }
@keyframes flower2 { 0% { transform: rotate(35deg); } 100% { transform: rotate(-325deg); } }
.btn:hover div.flower3 { animation: 16s linear 1s normal none infinite running flower3; }
@keyframes flower3 { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
.btn:hover div.flower4 { animation: 17s linear 1s normal none infinite running flower4; }
@keyframes flower4 { 0% { transform: rotate(15deg); } 100% { transform: rotate(375deg); } }
.btn:hover div.flower5 { animation: 20s linear 1s normal none infinite running flower5; }
@keyframes flower5 { 0% { transform: rotate(25deg); } 100% { transform: rotate(-335deg); } }
.btn:hover div.flower6 { animation: 15s linear 1s normal none infinite running flower6; }
@keyframes flower6 { 0% { transform: rotate(30deg); } 100% { transform: rotate(390deg); } }`,
    previewCss: '',
  },

  {
    slug: 'aurora-switch',
    name: '彩虹光晕开关',
    desc: '开关背后是一团由多个彩色径向渐变叠加、模糊 20px 的光晕，整个开关还带轻微的 3D 摆动。拨动时滑块滑到另一侧，轨道变深色。',
    tags: ['switch', 'toggle', 'gradient'],
    source: 'https://uiverse.io/EddyBel/slimy-penguin-36',
    author: 'Uiverse · EddyBel',
    html: `<label class="switch">
  <input type="checkbox" class="input__check">
  <span class="slider"></span>
</label>`,
    css: `.switch {
  font-size: 17px;
  position: relative;
  display: inline-block;
  width: 3.5em;
  height: 2em;
  transform-style: preserve-3d;
  perspective: 500px;
  animation: toggle__animation 3s infinite;
}
.switch::before {
  content: "";
  position: absolute;
  width: 100%; height: 100%;
  left: 0; top: 0;
  filter: blur(20px);
  z-index: -1;
  border-radius: 50px;
  background-color: #d8ff99;
  background-image: radial-gradient(at 21% 46%, hsla(183,65%,60%,1) 0px, transparent 50%),
    radial-gradient(at 23% 25%, hsla(359,74%,70%,1) 0px, transparent 50%),
    radial-gradient(at 20% 1%, hsla(267,83%,75%,1) 0px, transparent 50%),
    radial-gradient(at 86% 87%, hsla(204,69%,68%,1) 0px, transparent 50%),
    radial-gradient(at 99% 41%, hsla(171,72%,77%,1) 0px, transparent 50%),
    radial-gradient(at 55% 24%, hsla(138,60%,62%,1) 0px, transparent 50%);
}
.switch input { opacity: 0; width: 0; height: 0; }
.slider {
  position: absolute;
  cursor: pointer;
  top: 0; left: 0; right: 0; bottom: 0;
  background-color: #fdfefedc;
  transition: .4s;
  border-radius: 30px;
}
.slider:before {
  position: absolute;
  content: "";
  height: 1.4em; width: 1.4em;
  left: 0.3em; bottom: 0.35em;
  transition: .4s;
  border-radius: 50%;
  box-shadow: rgba(0, 0, 0, 0.17) 0px -10px 10px 0px inset, rgba(0, 0, 0, 0.09) 0px -1px 15px -8px;
  background-color: #ff99fd;
  background-image: radial-gradient(at 81% 39%, hsla(327,79%,79%,1) 0px, transparent 50%),
    radial-gradient(at 11% 72%, hsla(264,64%,79%,1) 0px, transparent 50%),
    radial-gradient(at 23% 20%, hsla(75,98%,71%,1) 0px, transparent 50%);
}
.input__check:checked + .slider { background-color: #17202A; }
.input__check:checked + .slider:before { transform: translateX(1.5em); }
@keyframes toggle__animation {
  0%, 100% { transform: translateY(-10px) rotateX(15deg) rotateY(-20deg); }
  50% { transform: translateY(0px) rotateX(15deg) rotateY(-20deg); }
}`,
    previewCss: '',
  },

  {
    slug: 'meteor-star-bg',
    name: '流星星空背景',
    desc: '斜向流星从左上方划向右下，配合四散分布的星点呼吸式闪烁。流星用渐变色条 + translate3d 位移，星星用透明度与缩放模拟眨眼。',
    tags: ['background', 'star', 'meteor', 'twinkle'],
    source: '',
    author: '本仓库原创',
    html: `<div class="bg-fx" aria-hidden="true">
  <span class="meteor" style="--x:-12%;--delay:0s;--dur:6.5s"></span>
  <span class="meteor" style="--x:6%;--delay:1.8s;--dur:7.8s"></span>
  <span class="meteor" style="--x:24%;--delay:3.6s;--dur:7s"></span>
  <span class="meteor" style="--x:44%;--delay:0.9s;--dur:8.4s"></span>
  <span class="meteor" style="--x:63%;--delay:2.7s;--dur:6.8s"></span>
  <span class="meteor" style="--x:82%;--delay:4.5s;--dur:9s"></span>
  <span class="star" style="--x:10%;--y:18%;--delay:0s;--dur:2.6s"></span>
  <span class="star" style="--x:22%;--y:42%;--delay:.6s;--dur:3.4s"></span>
  <span class="star" style="--x:34%;--y:12%;--delay:1.2s;--dur:2.9s"></span>
  <span class="star" style="--x:46%;--y:66%;--delay:.3s;--dur:3.8s"></span>
  <span class="star" style="--x:58%;--y:28%;--delay:1.5s;--dur:2.4s"></span>
  <span class="star" style="--x:70%;--y:54%;--delay:.9s;--dur:3.2s"></span>
  <span class="star" style="--x:82%;--y:16%;--delay:2.1s;--dur:2.7s"></span>
  <span class="star" style="--x:93%;--y:38%;--delay:.4s;--dur:4.2s"></span>
  <span class="star" style="--x:16%;--y:78%;--delay:1.8s;--dur:3.1s"></span>
  <span class="star" style="--x:28%;--y:58%;--delay:.2s;--dur:2.8s"></span>
  <span class="star" style="--x:40%;--y:88%;--delay:2.4s;--dur:3.6s"></span>
  <span class="star" style="--x:52%;--y:34%;--delay:1.1s;--dur:2.5s"></span>
  <span class="star" style="--x:64%;--y:72%;--delay:.7s;--dur:3.9s"></span>
  <span class="star" style="--x:76%;--y:46%;--delay:2.0s;--dur:2.3s"></span>
  <span class="star" style="--x:88%;--y:64%;--delay:1.4s;--dur:3.3s"></span>
  <span class="star" style="--x:6%;--y:52%;--delay:.5s;--dur:3.7s"></span>
</div>`,
    css: `body{background:radial-gradient(1200px 600px at 80% -10%, #1e1b4b 0%, transparent 60%), radial-gradient(900px 500px at -10% 10%, rgba(15,118,110,.25) 0%, transparent 55%), #070a13;}
.bg-fx{position:fixed;inset:0;overflow:hidden;pointer-events:none;z-index:0}
.bg-fx .meteor{
  position:absolute;top:-8%;left:var(--x);
  width:150px;height:2px;border-radius:2px;
  background:linear-gradient(90deg,rgba(255,255,255,0) 0%,rgba(199,210,254,.55) 45%,rgba(255,255,255,.95) 100%);
  filter:drop-shadow(0 0 6px rgba(199,210,254,.85));
  opacity:0;transform:rotate(35deg);
  animation:meteor-fall var(--dur,7s) linear infinite;
  animation-delay:var(--delay,0s);
}
@keyframes meteor-fall{
  0%{opacity:0;transform:rotate(35deg) translate3d(0,0,0)}
  12%{opacity:1}
  72%{opacity:1}
  100%{opacity:0;transform:rotate(35deg) translate3d(120vw,0,0)}
}
.bg-fx .star{
  position:absolute;top:var(--y);left:var(--x);
  width:2px;height:2px;border-radius:50%;
  background:#fff;
  box-shadow:0 0 6px 1px rgba(199,210,254,.9);
  opacity:.12;
  animation:star-twinkle var(--dur,3s) ease-in-out infinite;
  animation-delay:var(--delay,0s);
}
@keyframes star-twinkle{
  0%,100%{opacity:.12;transform:scale(.6)}
  50%{opacity:1;transform:scale(1.35)}
}

@media (prefers-reduced-motion: reduce){
  .bg-fx .meteor{animation:none;opacity:.2}
  .bg-fx .star{animation:none;opacity:.5}
}`,
    previewCss: '',
  },

  {
    slug: 'starry-sky-tunnel',
    name: '星空隧道背景',
    desc: 'Canvas 绘制的 3D 星空隧道，800 个粒子从远处飞向镜头。粒子随机为实心星、描边星、圆点、十字、光晕、闪光六种形态，配六种霓虹色并各自旋转、闪烁。',
    tags: ['background', 'canvas', 'star', '3d'],
    source: 'https://github.com/Hiweny/starry-sky-video-bg',
    author: 'Hiweny',
    html: `<canvas id="scene"></canvas>`,
    css: `* { margin: 0; padding: 0; box-sizing: border-box; }
html, body {
  width: 100%; height: 100%;
  overflow: hidden;
  background: #000;
}
canvas {
  display: block;
  width: 100%; height: 100%;
}`,
    js: `(() => {
  const canvas = document.getElementById('scene');
  const ctx = canvas.getContext('2d');
  let W, H, dpr;
  let time = 0;
  let particles = [];
  const PARTICLE_COUNT = 800;
  const SPEED = 2.5;
  const COLORS = [
    { r: 80, g: 230, b: 255 },
    { r: 200, g: 100, b: 255 },
    { r: 255, g: 80, b: 180 },
    { r: 120, g: 220, b: 255 },
    { r: 255, g: 255, b: 255 },
    { r: 255, g: 150, b: 255 },
  ];
  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  function randomColor() {
    return COLORS[Math.floor(Math.random() * COLORS.length)];
  }
  function createParticle() {
    const type = Math.random();
    let shape;
    if (type < 0.30) shape = 'filled-star';
    else if (type < 0.50) shape = 'outline-star';
    else if (type < 0.65) shape = 'dot';
    else if (type < 0.78) shape = 'cross';
    else if (type < 0.88) shape = 'glow';
    else shape = 'sparkle';
    const color = randomColor();
    const z = Math.random() * 2000 + 500;
    return {
      x: (Math.random() - 0.5) * W * 3,
      y: (Math.random() - 0.5) * H * 3,
      z: z,
      baseZ: z,
      size: 2 + Math.random() * 12,
      color: color,
      shape: shape,
      phase: Math.random() * Math.PI * 2,
      twinkleSpeed: 0.5 + Math.random() * 2,
      rotation: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.02,
    };
  }
  function initParticles() {
    particles = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const p = createParticle();
      p.z = Math.random() * 2500;
      particles.push(p);
    }
  }
  function drawStar(cx, cy, size, color, alpha, rotation) {
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(rotation);
    ctx.beginPath();
    const spikes = 5;
    const outerR = size;
    const innerR = size * 0.4;
    for (let i = 0; i < spikes * 2; i++) {
      const r = i % 2 === 0 ? outerR : innerR;
      const a = (i * Math.PI) / spikes - Math.PI / 2;
      if (i === 0) ctx.moveTo(Math.cos(a) * r, Math.sin(a) * r);
      else ctx.lineTo(Math.cos(a) * r, Math.sin(a) * r);
    }
    ctx.closePath();
    ctx.fillStyle = \`rgba(\${color.r}, \${color.g}, \${color.b}, \${alpha})\`;
    ctx.shadowColor = \`rgba(\${color.r}, \${color.g}, \${color.b}, \${alpha * 0.8})\`;
    ctx.shadowBlur = size * 1.5;
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.restore();
  }
  function drawOutlineStar(cx, cy, size, color, alpha, rotation) {
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(rotation);
    ctx.beginPath();
    const spikes = 5;
    const outerR = size;
    const innerR = size * 0.4;
    for (let i = 0; i < spikes * 2; i++) {
      const r = i % 2 === 0 ? outerR : innerR;
      const a = (i * Math.PI) / spikes - Math.PI / 2;
      if (i === 0) ctx.moveTo(Math.cos(a) * r, Math.sin(a) * r);
      else ctx.lineTo(Math.cos(a) * r, Math.sin(a) * r);
    }
    ctx.closePath();
    ctx.strokeStyle = \`rgba(\${color.r}, \${color.g}, \${color.b}, \${alpha})\`;
    ctx.lineWidth = Math.max(0.5, size * 0.12);
    ctx.shadowColor = \`rgba(\${color.r}, \${color.g}, \${color.b}, \${alpha * 0.6})\`;
    ctx.shadowBlur = size;
    ctx.stroke();
    ctx.shadowBlur = 0;
    ctx.restore();
  }
  function drawCross(cx, cy, size, color, alpha) {
    ctx.save();
    ctx.translate(cx, cy);
    ctx.strokeStyle = \`rgba(\${color.r}, \${color.g}, \${color.b}, \${alpha})\`;
    ctx.lineWidth = Math.max(0.5, size * 0.15);
    ctx.shadowColor = \`rgba(\${color.r}, \${color.g}, \${color.b}, \${alpha * 0.7})\`;
    ctx.shadowBlur = size * 0.8;
    const r = size * 0.7;
    ctx.beginPath();
    ctx.moveTo(0, -r); ctx.lineTo(0, r);
    ctx.moveTo(-r, 0); ctx.lineTo(r, 0);
    ctx.stroke();
    ctx.shadowBlur = 0;
    ctx.restore();
  }
  function drawGlow(cx, cy, size, color, alpha) {
    const grd = ctx.createRadialGradient(cx, cy, 0, cx, cy, size * 3);
    grd.addColorStop(0, \`rgba(\${color.r}, \${color.g}, \${color.b}, \${alpha * 0.6})\`);
    grd.addColorStop(0.5, \`rgba(\${color.r}, \${color.g}, \${color.b}, \${alpha * 0.2})\`);
    grd.addColorStop(1, \`rgba(\${color.r}, \${color.g}, \${color.b}, 0)\`);
    ctx.fillStyle = grd;
    ctx.beginPath();
    ctx.arc(cx, cy, size * 3, 0, Math.PI * 2);
    ctx.fill();
  }
  function drawDot(cx, cy, size, color, alpha) {
    ctx.beginPath();
    ctx.arc(cx, cy, Math.max(0.5, size * 0.35), 0, Math.PI * 2);
    ctx.fillStyle = \`rgba(\${color.r}, \${color.g}, \${color.b}, \${alpha})\`;
    ctx.shadowColor = \`rgba(\${color.r}, \${color.g}, \${color.b}, \${alpha * 0.8})\`;
    ctx.shadowBlur = size * 1.2;
    ctx.fill();
    ctx.shadowBlur = 0;
  }
  function drawSparkle(cx, cy, size, color, alpha, rotation) {
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(rotation);
    ctx.strokeStyle = \`rgba(\${color.r}, \${color.g}, \${color.b}, \${alpha})\`;
    ctx.lineWidth = Math.max(0.5, size * 0.1);
    ctx.shadowColor = \`rgba(\${color.r}, \${color.g}, \${color.b}, \${alpha * 0.7})\`;
    ctx.shadowBlur = size;
    const r = size * 0.8;
    ctx.beginPath();
    ctx.moveTo(0, -r); ctx.lineTo(0, r);
    ctx.moveTo(-r * 0.5, -r * 0.3); ctx.lineTo(r * 0.5, r * 0.3);
    ctx.moveTo(-r * 0.5, r * 0.3); ctx.lineTo(r * 0.5, -r * 0.3);
    ctx.stroke();
    ctx.shadowBlur = 0;
    ctx.restore();
  }
  function animate() {
    time += 0.016;
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, W, H);
    const centerX = W / 2;
    const centerY = H / 2;
    const focalLength = 400;
    particles.sort((a, b) => b.z - a.z);
    for (const p of particles) {
      p.z -= SPEED * (1 + (2500 - p.z) / 2500);
      p.rotation += p.rotSpeed;
      if (p.z <= 10) {
        Object.assign(p, createParticle());
        p.z = 2500;
        continue;
      }
      const scale = focalLength / p.z;
      const sx = centerX + p.x * scale;
      const sy = centerY + p.y * scale;
      const projectedSize = p.size * scale;
      if (sx < -50 || sx > W + 50 || sy < -50 || sy > H + 50) continue;
      let alpha = 1;
      if (p.z > 2000) alpha = (2500 - p.z) / 500;
      if (p.z < 200) alpha = p.z / 200;
      alpha = Math.max(0, Math.min(1, alpha));
      const twinkle = 0.7 + 0.3 * Math.sin(time * p.twinkleSpeed + p.phase);
      alpha *= twinkle;
      if (projectedSize < 0.3) {
        ctx.beginPath();
        ctx.arc(sx, sy, Math.max(0.3, projectedSize), 0, Math.PI * 2);
        ctx.fillStyle = \`rgba(\${p.color.r}, \${p.color.g}, \${p.color.b}, \${alpha * 0.6})\`;
        ctx.fill();
        continue;
      }
      switch (p.shape) {
        case 'filled-star':
          drawStar(sx, sy, projectedSize, p.color, alpha, p.rotation);
          break;
        case 'outline-star':
          drawOutlineStar(sx, sy, projectedSize, p.color, alpha, p.rotation);
          break;
        case 'cross':
          drawCross(sx, sy, projectedSize, p.color, alpha);
          break;
        case 'glow':
          drawGlow(sx, sy, projectedSize, p.color, alpha);
          break;
        case 'sparkle':
          drawSparkle(sx, sy, projectedSize, p.color, alpha, p.rotation);
          break;
        default:
          drawDot(sx, sy, projectedSize, p.color, alpha);
      }
    }
    requestAnimationFrame(animate);
  }
  window.addEventListener('resize', resize);
  resize();
  initParticles();
  animate();
})();`,
    previewCss: '',
  },
];
