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
    slug: 'sci-fi-switch',
    name: '科幻能量开关',
    desc: '科幻风格的拨动开关，关闭时是幽蓝，打开后整体转为荧绿。轨道里有流动的扫描线，圆形滑块内有脉冲核心、掠过的高光、上升的粒子与旋转的能量环。',
    tags: ['switch', 'toggle', 'sci-fi'],
    source: 'https://uiverse.io/reglobby/stupid-penguin-97',
    author: 'Uiverse · reglobby',
    html: `<div class="toggle-container">
  <div class="toggle-wrap">
    <input type="checkbox" class="toggle-input" id="sciToggle">
    <label class="toggle-track" for="sciToggle">
      <div class="holo-glow"></div>
      <div class="track-lines"><div class="track-line"></div></div>
      <div class="interface-lines">
        <div class="interface-line"></div>
        <div class="interface-line"></div>
        <div class="interface-line"></div>
        <div class="interface-line"></div>
        <div class="interface-line"></div>
        <div class="interface-line"></div>
      </div>
      <div class="toggle-data">
        <span class="data-text off">OFF</span>
        <span class="data-text on">ON</span>
        <span class="status-indicator off"></span>
        <span class="status-indicator on"></span>
      </div>
      <div class="toggle-thumb">
        <div class="thumb-core"></div>
        <div class="thumb-inner"></div>
        <div class="thumb-scan"></div>
        <div class="thumb-particles">
          <div class="thumb-particle"></div>
          <div class="thumb-particle"></div>
          <div class="thumb-particle"></div>
          <div class="thumb-particle"></div>
          <div class="thumb-particle"></div>
        </div>
        <div class="energy-rings">
          <div class="energy-ring"></div>
          <div class="energy-ring"></div>
          <div class="energy-ring"></div>
        </div>
      </div>
      <div class="toggle-reflection"></div>
    </label>
    <div class="toggle-label">SYSTEM STATUS</div>
  </div>
</div>`,
    css: `.toggle-container {
  position: relative;
  width: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
  perspective: 800px;
  z-index: 5;
}
.toggle-wrap {
  position: relative;
  width: 100%;
  height: 60px;
  transform-style: preserve-3d;
}
.toggle-input {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}
.toggle-track {
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(0, 30, 60, 0.4);
  border-radius: 30px;
  cursor: pointer;
  box-shadow: 0 0 15px rgba(0, 80, 255, 0.2), inset 0 0 10px rgba(0, 0, 0, 0.8);
  overflow: hidden;
  backdrop-filter: blur(5px);
  transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
  border: 1px solid rgba(0, 150, 255, 0.3);
}
.toggle-track::before {
  content: "";
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background: radial-gradient(ellipse at center, rgba(0, 80, 255, 0.1) 0%, rgba(0, 0, 0, 0) 70%),
    linear-gradient(90deg, rgba(0, 60, 120, 0.1) 0%, rgba(0, 30, 60, 0.2) 100%);
  opacity: 0.6;
  transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
}
.toggle-track::after {
  content: "";
  position: absolute;
  top: 2px; left: 2px; right: 2px;
  height: 10px;
  background: linear-gradient(90deg, rgba(0, 170, 255, 0.3) 0%, rgba(0, 80, 255, 0.1) 100%);
  border-radius: 30px 30px 0 0;
  opacity: 0.7;
  filter: blur(1px);
}
.track-lines {
  position: absolute;
  top: 50%; left: 0;
  width: 100%; height: 1px;
  transform: translateY(-50%);
  overflow: hidden;
}
.track-line {
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background: repeating-linear-gradient(90deg, rgba(0, 150, 255, 0.3) 0px, rgba(0, 150, 255, 0.3) 5px, transparent 5px, transparent 15px);
  animation: track-line-move 3s linear infinite;
}
@keyframes track-line-move { 0% { transform: translateX(0); } 100% { transform: translateX(20px); } }
.toggle-thumb {
  position: absolute;
  width: 54px; height: 54px;
  left: 3px; top: 3px;
  background: radial-gradient(circle, rgba(10, 40, 90, 0.9) 0%, rgba(0, 20, 50, 0.8) 100%);
  border-radius: 50%;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.5), inset 0 0 15px rgba(0, 150, 255, 0.5);
  transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
  z-index: 2;
  border: 1px solid rgba(0, 170, 255, 0.6);
  overflow: hidden;
  transform-style: preserve-3d;
}
.thumb-core {
  position: absolute;
  width: 40px; height: 40px;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  background: radial-gradient(circle, rgba(0, 180, 255, 0.6) 0%, rgba(0, 50, 120, 0.2) 100%);
  border-radius: 50%;
  box-shadow: 0 0 20px rgba(0, 150, 255, 0.5);
  opacity: 0.9;
  transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
}
.thumb-inner {
  position: absolute;
  width: 25px; height: 25px;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  background: radial-gradient(circle, rgba(255, 255, 255, 0.8) 0%, rgba(100, 200, 255, 0.5) 100%);
  border-radius: 50%;
  box-shadow: 0 0 10px rgba(100, 200, 255, 0.7);
  opacity: 0.7;
  transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
  animation: pulse 2s infinite alternate;
}
@keyframes pulse {
  0% { opacity: 0.5; transform: translate(-50%, -50%) scale(0.9); }
  100% { opacity: 0.8; transform: translate(-50%, -50%) scale(1.1); }
}
.thumb-scan {
  position: absolute;
  width: 100%; height: 5px;
  background: linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgba(0, 150, 255, 0.5) 20%, rgba(255, 255, 255, 0.8) 50%, rgba(0, 150, 255, 0.5) 80%, rgba(0, 0, 0, 0) 100%);
  top: 0; left: 0;
  filter: blur(1px);
  animation: thumb-scan 2s linear infinite;
  opacity: 0.7;
}
@keyframes thumb-scan {
  0% { top: -5px; opacity: 0; }
  20% { opacity: 0.7; }
  80% { opacity: 0.7; }
  100% { top: 54px; opacity: 0; }
}
.thumb-particles { position: absolute; width: 100%; height: 100%; top: 0; left: 0; overflow: hidden; }
.thumb-particle {
  position: absolute;
  width: 3px; height: 3px;
  background: rgba(100, 200, 255, 0.8);
  border-radius: 50%;
  box-shadow: 0 0 5px rgba(100, 200, 255, 0.8);
  animation: thumb-particle-float 3s infinite ease-out;
  opacity: 0;
}
.thumb-particle:nth-child(1) { top: 70%; left: 30%; animation-delay: 0.2s; }
.thumb-particle:nth-child(2) { top: 60%; left: 60%; animation-delay: 0.6s; }
.thumb-particle:nth-child(3) { top: 50%; left: 40%; animation-delay: 1s; }
.thumb-particle:nth-child(4) { top: 40%; left: 70%; animation-delay: 1.4s; }
.thumb-particle:nth-child(5) { top: 80%; left: 50%; animation-delay: 1.8s; }
@keyframes thumb-particle-float {
  0% { transform: translateY(0) scale(1); opacity: 0; }
  20% { opacity: 0.8; }
  100% { transform: translateY(-30px) scale(0); opacity: 0; }
}
.toggle-data { position: absolute; width: 100%; height: 100%; z-index: 1; }
.data-text {
  position: absolute;
  font-size: 12px; font-weight: 500;
  letter-spacing: 1px; text-transform: uppercase;
  transition: all 0.5s ease;
}
.data-text.off { right: 12px; top: 50%; transform: translateY(-50%); opacity: 1; color: rgba(0, 150, 255, 0.6); text-shadow: 0 0 5px rgba(0, 100, 255, 0.4); }
.data-text.on { left: 15px; top: 50%; transform: translateY(-50%); opacity: 0; color: rgba(0, 255, 150, 0.6); text-shadow: 0 0 5px rgba(0, 255, 100, 0.4); }
.status-indicator {
  position: absolute;
  width: 10px; height: 10px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(0, 180, 255, 0.8) 0%, rgba(0, 80, 200, 0.4) 100%);
  box-shadow: 0 0 10px rgba(0, 150, 255, 0.5);
  animation: blink 2s infinite alternate;
  transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
}
.status-indicator.off { top: 25px; right: 15px; }
.status-indicator.on { top: 25px; left: 15px; opacity: 0; background: radial-gradient(circle, rgba(0, 255, 150, 0.8) 0%, rgba(0, 200, 80, 0.4) 100%); box-shadow: 0 0 10px rgba(0, 255, 150, 0.5); }
@keyframes blink { 0%, 100% { opacity: 0.5; transform: scale(0.9); } 50% { opacity: 1; transform: scale(1.1); } }
.energy-rings { position: absolute; width: 54px; height: 54px; left: 3px; top: 3px; pointer-events: none; z-index: 1; transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1); }
.energy-ring { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); border-radius: 50%; border: 2px solid transparent; opacity: 0; }
.energy-ring:nth-child(1) { width: 50px; height: 50px; border-top-color: rgba(0, 150, 255, 0.5); border-right-color: rgba(0, 150, 255, 0.3); animation: spin 3s linear infinite; }
.energy-ring:nth-child(2) { width: 40px; height: 40px; border-bottom-color: rgba(0, 150, 255, 0.5); border-left-color: rgba(0, 150, 255, 0.3); animation: spin 2s linear infinite reverse; }
.energy-ring:nth-child(3) { width: 30px; height: 30px; border-left-color: rgba(0, 150, 255, 0.5); border-top-color: rgba(0, 150, 255, 0.3); animation: spin 1.5s linear infinite; }
@keyframes spin { 0% { transform: translate(-50%, -50%) rotate(0deg); } 100% { transform: translate(-50%, -50%) rotate(360deg); } }
.interface-lines { position: absolute; width: 100%; height: 100%; pointer-events: none; }
.interface-line { position: absolute; background: rgba(0, 150, 255, 0.3); transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1); }
.interface-line:nth-child(1) { width: 15px; height: 1px; bottom: -5px; left: 20px; }
.interface-line:nth-child(2) { width: 1px; height: 8px; bottom: -12px; left: 35px; }
.interface-line:nth-child(3) { width: 25px; height: 1px; bottom: -12px; left: 35px; }
.interface-line:nth-child(4) { width: 15px; height: 1px; bottom: -5px; right: 20px; }
.interface-line:nth-child(5) { width: 1px; height: 8px; bottom: -12px; right: 35px; }
.interface-line:nth-child(6) { width: 25px; height: 1px; bottom: -12px; right: 10px; }
.toggle-reflection { position: absolute; width: 100%; height: 100%; top: 0; left: 0; background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 40%); border-radius: 30px; pointer-events: none; }
.toggle-label { position: relative; margin-top: 20px; font-size: 14px; text-transform: uppercase; letter-spacing: 2px; text-align: center; color: rgba(0, 150, 255, 0.7); text-shadow: 0 0 10px rgba(0, 100, 255, 0.5); transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1); }
.holo-glow { position: absolute; width: 100%; height: 100%; border-radius: 30px; background: radial-gradient(ellipse at center, rgba(0, 150, 255, 0.2) 0%, rgba(0, 0, 0, 0) 70%); filter: blur(10px); opacity: 0.5; transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1); z-index: 0; }
.toggle-input:checked + .toggle-track { background: rgba(0, 60, 30, 0.4); border-color: rgba(0, 255, 150, 0.3); box-shadow: 0 0 15px rgba(0, 255, 150, 0.2), inset 0 0 10px rgba(0, 0, 0, 0.8); }
.toggle-input:checked + .toggle-track::before { background: radial-gradient(ellipse at center, rgba(0, 255, 150, 0.1) 0%, rgba(0, 0, 0, 0) 70%), linear-gradient(90deg, rgba(0, 120, 60, 0.1) 0%, rgba(0, 60, 30, 0.2) 100%); }
.toggle-input:checked + .toggle-track::after { background: linear-gradient(90deg, rgba(0, 255, 150, 0.3) 0%, rgba(0, 160, 80, 0.1) 100%); }
.toggle-input:checked + .toggle-track .track-line { background: repeating-linear-gradient(90deg, rgba(0, 255, 150, 0.3) 0px, rgba(0, 255, 150, 0.3) 5px, transparent 5px, transparent 15px); animation-direction: reverse; }
.toggle-input:checked + .toggle-track .toggle-thumb { left: calc(100% - 57px); background: radial-gradient(circle, rgba(10, 90, 40, 0.9) 0%, rgba(0, 50, 20, 0.8) 100%); border-color: rgba(0, 255, 150, 0.6); box-shadow: 0 2px 15px rgba(0, 0, 0, 0.5), inset 0 0 15px rgba(0, 255, 150, 0.5); }
.toggle-input:checked + .toggle-track .thumb-core { background: radial-gradient(circle, rgba(0, 255, 150, 0.6) 0%, rgba(0, 120, 50, 0.2) 100%); box-shadow: 0 0 20px rgba(0, 255, 150, 0.5); }
.toggle-input:checked + .toggle-track .thumb-inner { background: radial-gradient(circle, rgba(255, 255, 255, 0.8) 0%, rgba(100, 255, 200, 0.5) 100%); box-shadow: 0 0 10px rgba(100, 255, 200, 0.7); }
.toggle-input:checked + .toggle-track .thumb-scan { background: linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgba(0, 255, 150, 0.5) 20%, rgba(255, 255, 255, 0.8) 50%, rgba(0, 255, 150, 0.5) 80%, rgba(0, 0, 0, 0) 100%); }
.toggle-input:checked + .toggle-track .thumb-particle { background: rgba(100, 255, 200, 0.8); box-shadow: 0 0 5px rgba(100, 255, 200, 0.8); }
.toggle-input:checked + .toggle-track .data-text.off { opacity: 0; }
.toggle-input:checked + .toggle-track .data-text.on { opacity: 1; }
.toggle-input:checked + .toggle-track .status-indicator.off { opacity: 0; }
.toggle-input:checked + .toggle-track .status-indicator.on { opacity: 1; }
.toggle-input:checked + .toggle-track .energy-rings { left: calc(100% - 57px); }
.toggle-input:checked + .toggle-track .energy-ring { opacity: 1; }
.toggle-input:checked + .toggle-track .energy-ring:nth-child(1) { border-top-color: rgba(0, 255, 150, 0.5); border-right-color: rgba(0, 255, 150, 0.3); }
.toggle-input:checked + .toggle-track .energy-ring:nth-child(2) { border-bottom-color: rgba(0, 255, 150, 0.5); border-left-color: rgba(0, 255, 150, 0.3); }
.toggle-input:checked + .toggle-track .energy-ring:nth-child(3) { border-left-color: rgba(0, 255, 150, 0.5); border-top-color: rgba(0, 255, 150, 0.3); }
.toggle-input:checked + .toggle-track .interface-line { background: rgba(0, 255, 150, 0.3); }
.toggle-input:checked ~ .toggle-label { color: rgba(0, 255, 150, 0.7); text-shadow: 0 0 10px rgba(0, 255, 150, 0.5); }
.toggle-input:checked + .toggle-track .holo-glow { background: radial-gradient(ellipse at center, rgba(0, 255, 150, 0.2) 0%, rgba(0, 0, 0, 0) 70%); }
.toggle-input:hover + .toggle-track { box-shadow: 0 0 20px rgba(0, 150, 255, 0.3), inset 0 0 10px rgba(0, 0, 0, 0.8); }
.toggle-input:checked:hover + .toggle-track { box-shadow: 0 0 20px rgba(0, 255, 150, 0.3), inset 0 0 10px rgba(0, 0, 0, 0.8); }`,
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
    slug: 'back-to-top-button',
    name: '悬浮回到顶部按钮',
    desc: '固定在右下角的圆形按钮，滚动超过一屏后淡入浮现，点击平滑滚回顶部；悬停时描边与图标亮起光晕。',
    tags: ['button', 'scroll', 'utility'],
    source: '',
    author: '本仓库原创',
    html: `<button id="toTop" class="to-top" type="button" aria-label="回到顶部">
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 19V5"/><path d="M5 12l7-7 7 7"/></svg>
</button>`,
    css: `.to-top{
  position:fixed;right:22px;bottom:22px;width:46px;height:46px;
  border:1px solid #334155;border-radius:50%;
  display:grid;place-items:center;cursor:pointer;
  color:#c7d2fe;background:rgba(15,21,36,.85);backdrop-filter:blur(6px);
  opacity:0;visibility:hidden;transform:translateY(12px);
  transition:opacity .3s ease,transform .3s ease,visibility .3s ease,box-shadow .3s ease,border-color .3s ease;
  z-index:50;
}
.to-top svg{width:20px;height:20px}
.to-top.show{opacity:1;visibility:visible;transform:translateY(0)}
.to-top:hover{border-color:#6366f1;color:#fff;box-shadow:0 0 18px color-mix(in srgb,#6366f1 60%,transparent)}
.to-top:active{transform:translateY(1px) scale(.96)}`,
    js: `var btn=document.querySelector('.to-top');
if(btn){
  btn.classList.add('show');
  window.addEventListener('scroll',function(){
    if(window.scrollY>240) btn.classList.add('show');
    else btn.classList.remove('show');
  },{passive:true});
  btn.addEventListener('click',function(){ window.scrollTo({top:0,behavior:'smooth'}); });
}`,
    previewCss: '',
  },
];
