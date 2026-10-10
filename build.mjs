import { writeFileSync, mkdirSync, rmSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { animations } from './data/animations.mjs';

const ROOT = dirname(fileURLToPath(import.meta.url));
const OUT_ANIM = join(ROOT, 'animations');

const REPO = 'https://github.com/Hiweny/ui-animations';
const SITE = 'https://hiweny.github.io/ui-animations';

/** 组合成「一键复制」的完整源码：HTML + <style>CSS</style> [+ <script>JS</script>] */
function combinedSource(a) {
  let s = `${a.html}\n\n<style>\n${a.css}\n</style>`;
  if (a.js) s += `\n\n<script>\n${a.js}\n</script>`;
  return s;
}

/** HTML 转义：让源码能作为纯文本直接写在 <pre><code> 里（不依赖 JS 渲染） */
function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

/** iframe srcdoc 属性转义 */
function attr(v) {
  return String(v).replace(/&/g, '&amp;').replace(/"/g, '&quot;');
}

/** 实时预览用的独立文档 */
function previewDoc(a, extraCss = '') {
  return `<!doctype html>\n<html lang="zh-CN">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width,initial-scale=1">\n<style>\n  html,body{height:100%;margin:0}\n  body{display:grid;place-items:center;background:#080c16;padding:24px;box-sizing:border-box}\n${a.css}\n${extraCss}\n</style>\n</head>\n<body>\n${a.html}\n${a.js ? `<script>\n${a.js}\n<\/script>` : ''}\n</body>\n</html>`;
}

function tagsHtml(tags) {
  return tags.map((t) => `<span class="tag">${t}</span>`).join('');
}

function head(title, desc, base) {
  return `<!doctype html>\n<html lang="zh-CN">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width,initial-scale=1">\n<title>${title}</title>\n<meta name="description" content="${desc}">\n<link rel="canonical" href="${SITE}/{{PATH}}">\n<link rel="stylesheet" href="${base}assets/site.css">\n</head>\n<body>`;
}

const FOOT = `\n<footer class="site-footer">\n  <div class="wrap">\n    <p>UI 动效画廊 · 持续收集中 · <a href="${REPO}" target="_blank" rel="noopener">GitHub 仓库</a></p>\n  </div>\n</footer>\n</body>\n</html>`;

/* ----------------------------- 动效详情页 ----------------------------- */
function detailPage(a) {
  const base = '../';
  const src = combinedSource(a);
  const url = `${SITE}/animations/${a.slug}.html`;
  const sourceHtml = a.source
    ? `<a href="${a.source}" target="_blank" rel="noopener">查看灵感来源 ↗</a>`
    : '';

  return (
    head(`${a.name} · UI 动效画廊`, a.desc, base).replace('{{PATH}}', `animations/${a.slug}.html`) +
    `
<div class="wrap">
  <header class="anim-head">
    <a class="back-link" href="${base}index.html">← 返回画廊</a>
    <h1 class="anim-title">${a.name}</h1>
    <p class="anim-desc">${a.desc}</p>
    <div class="anim-meta">
      <span class="tag">${a.author}</span>
      ${sourceHtml}
    </div>
    <p class="anim-url">深链地址：<a href="${url}">${url}</a></p>
  </header>

  <section class="stage" aria-label="实时预览">
    <iframe title="${a.name} 实时预览" loading="lazy" srcdoc="${attr(previewDoc(a))}"></iframe>
  </section>

  <section class="code-panel">
    <div class="code-bar">
      <span class="label">HTML + CSS${a.js ? ' + JS' : ''} · 一键复制</span>
      <button class="copy-btn" type="button" data-copy="#src">复制全部代码</button>
    </div>
    <pre class="code" id="src"><code>${esc(src)}</code></pre>
  </section>

  <section class="anim-tags">
    <h2 class="anim-subtitle">标签</h2>
    <div class="card-tags">${tagsHtml(a.tags)}</div>
  </section>
</div>
<script src="${base}assets/site.js"></script>` +
    FOOT
  );
}

/* ----------------------------- 画廊首页 ----------------------------- */
function indexPage(list) {
  const cards = list
    .map((a) => {
      const url = `${SITE}/animations/${a.slug}.html`;
      return `
    <article class="card">
      <div class="card-stage">
        <iframe title="${a.name} 预览" loading="lazy" srcdoc="${attr(previewDoc(a, a.previewCss))}"></iframe>
      </div>
      <div class="card-body">
        <h2 class="card-name">${a.name}</h2>
        <p class="card-desc">${a.desc}</p>
        <div class="card-tags">${tagsHtml(a.tags)}</div>
        <p class="card-url">深链：<a href="animations/${a.slug}.html">${url}</a></p>
        <div class="card-actions">
          <a class="btn-link primary" href="animations/${a.slug}.html">查看 / 复制代码</a>
        </div>
      </div>
    </article>`;
    })
    .join('\n');

  const nav = list
    .map((a) => `      <li><a href="animations/${a.slug}.html">${a.name}</a> — ${SITE}/animations/${a.slug}.html</li>`)
    .join('\n');

  return (
    head('UI 动效画廊 · 精美网页动效收集', '收集精美的网页 UI 动效，每个都有实时预览、独立深链和一键复制的 HTML+CSS 源码。', '').replace('{{PATH}}', '') +
    `
<div class="wrap">
  <header class="site-header">
    <h1 class="site-title">UI 动效画廊</h1>
    <p class="site-sub">
      收藏好看的网页动效 —— 每个动效一个独立深链，点进去就能看到实时效果，
      下方提供 HTML 与 CSS 合并在一起的源码，一键复制即可用。<br>
      当前收录 <strong>${list.length}</strong> 个动效。
    </p>
    <p class="site-actions">
      <a class="btn-sparkle" href="animations/sparkle-button.html">
        <span class="btn-sparkle-star" style="--i:0" aria-hidden="true"></span>
        <span class="btn-sparkle-star" style="--i:1" aria-hidden="true"></span>
        <span class="btn-sparkle-star" style="--i:2" aria-hidden="true"></span>
        <span class="btn-sparkle-star" style="--i:3" aria-hidden="true"></span>
        <svg class="btn-sparkle-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2l2.3 7.7L22 12l-7.7 2.3L12 22l-2.3-7.7L2 12l7.7-2.3z"/></svg>
        看一个星星按钮
      </a>
    </p>
  </header>

  <main class="grid">${cards}
  </main>

  <section class="sitemap">
    <h2 class="anim-subtitle">全部动效深链</h2>
    <ul>
${nav}
    </ul>
  </section>
</div>` +
    FOOT
  );
}

/* ----------------------------- 输出 ----------------------------- */
if (existsSync(OUT_ANIM)) rmSync(OUT_ANIM, { recursive: true, force: true });
mkdirSync(OUT_ANIM, { recursive: true });

writeFileSync(join(ROOT, 'index.html'), indexPage(animations), 'utf8');
for (const a of animations) {
  writeFileSync(join(OUT_ANIM, `${a.slug}.html`), detailPage(a), 'utf8');
}

/* sitemap.xml：方便搜索引擎 / 知识库抓取全部深链 */
const urls = [`${SITE}/`, ...animations.map((a) => `${SITE}/animations/${a.slug}.html`)];
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
  .map((u) => `  <url><loc>${u}</loc></url>`)
  .join('\n')}\n</urlset>\n`;
writeFileSync(join(ROOT, 'sitemap.xml'), sitemap, 'utf8');
writeFileSync(join(ROOT, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${SITE}/sitemap.xml\n`, 'utf8');

console.log(`✔ 生成完成：index.html + ${animations.length} 个深链页 + sitemap.xml`);
