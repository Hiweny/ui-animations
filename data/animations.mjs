/**
 * 动效收集数据源。
 * 新增一个动效：往数组里加一个对象即可，然后运行 `node build.mjs`。
 *
 * 字段说明：
 *   slug        深链文件名（animations/<slug>.html）
 *   name        中文名称
 *   desc        简短描述
 *   tags        标签数组
 *   source      来源链接（可空；为空则显示「本仓库原创」）
 *   author      作者 / 来源说明（可空）
 *   html        演示用 HTML
 *   css         演示用 CSS
 *   previewCss  仅用于首页卡片缩略预览的附加样式（可空，用来强制触发动效）
 */
export const animations = [
  {
    slug: 'sparkle-button',
    name: '星星闪光按钮',
    desc: '按钮四角藏着四颗小星星，鼠标悬停时依次旋转、放大、闪烁，图标同时旋转放大。纯 CSS 驱动，靠 --i 变量错开每颗星的动画延迟。',
    tags: ['button', 'sparkle', 'hover', '星轨'],
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
    slug: 'shimmer-button',
    name: '流光扫过按钮',
    desc: '一条倾斜的高光带沿按钮表面循环扫过，像金属反光。用 ::before 伪元素 + skewX 实现，不增加任何多余 DOM。',
    tags: ['button', 'shimmer', '流光', 'hover'],
    source: '',
    author: '本仓库原创',
    html: `<button class="btn-shimmer">Shimmer</button>`,
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
  background: linear-gradient(
    100deg,
    transparent 35%,
    rgba(255, 255, 255, 0.75) 50%,
    transparent 65%
  );
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
    html: `<button class="btn-orbit"><span>Orbit</span></button>`,
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
