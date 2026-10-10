import { writeFileSync, mkdirSync, rmSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { animations } from './data/animations.mjs';

const ROOT = dirname(fileURLToPath(import.meta.url));
const OUT_ANIM = join(ROOT, 'animations');

/** 组合成「一键复制」的完整源码：HTML + <style>CSS</style> 放一块 */
function combinedSource(a) {
  return `${a.html}\n\n<style>\n${a.css}\n</style>`;
}

/** iframe srcdoc 属性转义：只需处理 & 和 " */
function attr(value) {
  return String(value).replace(/&/g, '&amp;').replace(/"/g, '&quot;');
}

/** 生成用于预览的 iframe srcdoc */
function previewDoc(a, extraCss = '') {
  return `<!doctype html>
<html lang="zh-CN">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<style>
  html,body{height:100%;margin:0}
  body{
    display:grid;place-items:center;
    background:#080c16;
    padding:24px;
    box-sizing:border-box;
  }
${a.css}
${extraCss}
</style>
</head>
<body>
${a.html}
</body>
</html>`;
}

function tagsHtml(tags) {
  return tags.map((t) => `<span class="tag">${t}</span>`).join('');
}

const HEAD = (title, desc) => `<!doctype html>
<html lang="zh-CN">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${title}</title>
<meta name="description" content="${desc}">
<link rel="stylesheet" href="{{BASE}}assets/site.css">
</head>
<body>`;

const FOOT = `
<footer class="site-footer">
  <div class="wrap">
    <p>UI 动效画廊 · 持续收集中 · <a href="{{REPO}}" target="_blank" rel="noopener">GitHub 仓库</a></p>
  </div>
</footer>
</body>
</html>`;

const REPO = 'https://github.com/Hiweny/ui-animations';
const SITE = 'https://hiweny.github.io/ui-animations';

/* ----------------------------- 详情页 ----------------------------- */
function detailPage(a) {
  const base = '../';
  const src = combinedSource(a);
  const sourceHtml = a.source
    ? `<a href="${a.source}" target="_blank" rel="noopener">查看来源 ↗</a>`
    : '';
  const authorHtml = a.author ? `<span class="tag">${a.author}</span>` : '';

  return (
    HEAD(`${a.name} · UI 动效画廊`, a.desc).replaceAll('{{BASE}}', base) +
    `
<div class="wrap">
  <header class="anim-head">
    <a class="back-link" href="${base}index.html">← 返回画廊</a>
    <h1 class="anim-title">${a.name}</h1>
    <p class="anim-desc">${a.desc}</p>
    <div class="anim-meta">
      ${authorHtml}
      ${sourceHtml}
      <a href="${SITE}/animations/${a.slug}.html" target="_blank" rel="noopener">深链 ↗</a>
    </div>
  </header>

  <section class="stage">
    <iframe title="${a.name} 实时预览" loading="lazy" srcdoc="${attr(previewDoc(a))}"></iframe>
  </section>

  <section class="code-panel">
    <div class="code-bar">
      <span class="label">HTML + CSS · 一键复制</span>
      <button class="copy-btn" type="button" data-copy="#src">复制全部代码</button>
    </div>
    <pre class="code" id="src" data-src="#raw"></pre>
  </section>
</div>

<script type="text/plain" id="raw">${src.replace(/<\/script>/gi, '<\\/script>')}</script>
<script src="${base}assets/site.js"></script>` +
    FOOT.replaceAll('{{REPO}}', REPO)
  );
}

/* ----------------------------- 首页 ----------------------------- */
function indexPage(list) {
  const cards = list
    .map(
      (a) => `
    <article class="card">
      <div class="card-stage">
        <iframe title="${a.name} 预览" loading="lazy" srcdoc="${attr(previewDoc(a, a.previewCss))}"></iframe>
      </div>
      <div class="card-body">
        <h2 class="card-name">${a.name}</h2>
        <p class="card-desc">${a.desc}</p>
        <div class="card-tags">${tagsHtml(a.tags)}</div>
        <div class="card-actions">
          <a class="btn-link primary" href="animations/${a.slug}.html">查看 / 复制代码</a>
        </div>
      </div>
    </article>`
    )
    .join('\n');

  return (
    HEAD('UI 动效画廊 · 精美网页动效收集', '收集精美的网页 UI 动效，每个都有实时预览、深链和一键复制的 HTML+CSS 源码。').replaceAll(
      '{{BASE}}',
      ''
    ) +
    `
<div class="wrap">
  <header class="site-header">
    <h1 class="site-title">UI 动效画廊</h1>
    <p class="site-sub">
      收藏好看的网页动效 —— 每个动效一个独立深链，点进去就能看到实时效果，
      下方提供 HTML 与 CSS 合并在一起的源码，一键复制即可用。<br>
      当前收录 <strong>${list.length}</strong> 个动效。
    </p>
  </header>

  <main class="grid">${cards}
  </main>
</div>` +
    FOOT.replaceAll('{{REPO}}', REPO)
  );
}

/* ----------------------------- 输出 ----------------------------- */
if (existsSync(OUT_ANIM)) rmSync(OUT_ANIM, { recursive: true, force: true });
mkdirSync(OUT_ANIM, { recursive: true });

writeFileSync(join(ROOT, 'index.html'), indexPage(animations), 'utf8');
for (const a of animations) {
  writeFileSync(join(OUT_ANIM, `${a.slug}.html`), detailPage(a), 'utf8');
}

console.log(`✔ 生成完成：index.html + ${animations.length} 个动效深链页`);
for (const a of animations) console.log(`   · animations/${a.slug}.html`);
