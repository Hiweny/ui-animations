# UI 动效画廊 · ui-animations

收集好看的网页 UI 动效，并提供一个在线画廊：每个动效都有独立深链、实时预览，以及**合并在一起的 HTML + CSS 源码**，一键复制即可使用。

🔗 在线预览：https://hiweny.github.io/ui-animations/

## 特性

- **实时预览**：每个动效页面顶部用 `iframe` 沙箱实时运行，所见即所得。
- **一键复制**：源码面板把 HTML 和 CSS 放在一起（CSS 用 `<style>` 内联），点一下就复制全部，不用再来回切两个文件。
- **独立深链**：每个动效一个固定地址，方便收藏、分享（已同步到 ima 知识库）。
- **来源标注**：有出处的动效会标注作者与原始链接；本仓库原创的也会写明。

## 目录结构

```
.
├─ index.html            # 画廊首页（构建产物，勿手改）
├─ animations/           # 每个动效的深链页（构建产物，勿手改）
├─ assets/
│  ├─ site.css           # 站点样式
│  └─ site.js            # 渲染源码 + 一键复制
├─ data/
│  └─ animations.mjs     # ★ 动效数据源（唯一需要手工维护的文件）
└─ build.mjs             # 构建脚本：data → index.html + animations/*.html
```

## 如何新增一个动效

1. 打开 `data/animations.mjs`，往 `animations` 数组里追加一个对象：

```js
{
  slug: 'my-effect',        // 深链文件名，英文小写连字符
  name: '我的动效',
  desc: '一句话描述效果原理。',
  tags: ['button', 'hover'],
  source: '',                // 有出处就填原始链接，没有就留空
  author: '本仓库原创',
  html: `<button class="my-btn">Hi</button>`,
  css: `.my-btn { /* ... */ }`,
  previewCss: '',            // 可选：只在首页缩略图里额外生效的样式
}
```

2. 运行构建：

```bash
node build.mjs
```

3. 提交推送即可，GitHub Pages 会自动更新。

## 本地预览

```bash
node build.mjs
npx serve .        # 或任意静态服务器，直接双击 index.html 也行
```

## 许可

各动效版权归原作者所有，仓库内仅作收集与展示，并已标注来源。原创部分可自由使用。
