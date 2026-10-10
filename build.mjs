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
  return `<!doctype html>\n<html lang="zh-CN">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width,initial-scale=1">\n<title>${title}</title>\n<meta name="description" content="${desc}">\n<link rel="canonical" href="${SITE}/{{PATH}}">\n<link rel="icon" type="image/svg+xml" href="${base}favicon.svg">\n<link rel="apple-touch-icon" href="${base}favicon.svg">\n<link rel="stylesheet" href="${base}assets/site.css">\n</head>\n<body>`;
}

const FOOT = `\n<footer class="site-footer">\n  <div class="wrap">\n    <a href="${REPO}" target="_blank" rel="noopener">GitHub</a>\n  </div>\n</footer>\n<button id="toTop" class="to-top" type="button" aria-label="回到顶部">\n  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 19V5"/><path d="M5 12l7-7 7 7"/></svg>\n</button>\n</body>\n</html>`;

/* ----------------------------- 动效详情页 ----------------------------- */
function detailPage(a) {
  const base = '../';
  const src = combinedSource(a);

  return (
    head(`${a.name} · UI 动效画廊`, a.desc, base).replace('{{PATH}}', `animations/${a.slug}.html`) +
    `
<div class="wrap">
  <header class="anim-head">
    <a class="back-link" href="${base}index.html">← 返回</a>
    <h1 class="anim-title">${a.name}</h1>
    <p class="anim-desc">${a.desc}</p>
    <div class="card-tags">${tagsHtml(a.tags)}</div>
  </header>

  <section class="stage" aria-label="实时预览">
    <iframe title="${a.name} 实时预览" loading="lazy" srcdoc="${attr(previewDoc(a))}"></iframe>
  </section>

  <section class="code-panel">
    <div class="code-bar">
      <span class="label">HTML + CSS${a.js ? ' + JS' : ''}</span>
      <button class="copy-btn" type="button" data-copy="#src">复制全部代码</button>
    </div>
    <pre class="code" id="src"><code>${esc(src)}</code></pre>
  </section>
</div>
<script src="${base}assets/site.js"></script>` +
    FOOT
  );
}

/* ----------------------------- 画廊首页 ----------------------------- */
function indexPage(list) {
  const cards = list
    .map(
      (a) => `
    <article class="card">
      <a class="card-link" href="animations/${a.slug}.html">
        <div class="card-stage">
          <iframe title="${a.name} 预览" loading="lazy" srcdoc="${attr(previewDoc(a, a.previewCss))}"></iframe>
        </div>
        <div class="card-body">
          <h2 class="card-name">${a.name}</h2>
          <p class="card-desc">${a.desc}</p>
          <div class="card-tags">${tagsHtml(a.tags)}</div>
        </div>
      </a>
    </article>`
    )
    .join('\n');

  return (
    head('UI 动效画廊', '精美的网页 UI 动效合集，实时预览与一键复制源码。', '').replace('{{PATH}}', '') +
    `
<div class="wrap">
  <header class="site-header">
    <h1 class="site-title">UI 动效画廊</h1>
  </header>
  <main class="grid">${cards}
  </main>
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

/* sitemap.xml / robots.txt：方便搜索引擎与知识库抓取全部深链 */
const urls = [`${SITE}/`, ...animations.map((a) => `${SITE}/animations/${a.slug}.html`)];
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
  .map((u) => `  <url><loc>${u}</loc></url>`)
  .join('\n')}\n</urlset>\n`;
writeFileSync(join(ROOT, 'sitemap.xml'), sitemap, 'utf8');
writeFileSync(join(ROOT, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${SITE}/sitemap.xml\n`, 'utf8');

console.log(`✔ 生成完成：index.html + ${animations.length} 个深链页 + sitemap.xml`);
