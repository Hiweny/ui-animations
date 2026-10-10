// 一键复制：直接读取 <pre><code> 的文本（源码已是静态写死，无需 JS 渲染）
function bindCopy() {
  document.addEventListener('click', function (e) {
    var btn = e.target.closest('[data-copy]');
    if (!btn) return;
    var pre = document.querySelector(btn.getAttribute('data-copy'));
    if (!pre) return;
    var text = pre.innerText || pre.textContent || '';
    text = text.replace(/^\n+/, '').replace(/\s+$/, '');

    var done = function () {
      var old = btn.getAttribute('data-label') || btn.textContent;
      btn.setAttribute('data-label', old);
      btn.textContent = '已复制 ✓';
      btn.classList.add('copied');
      setTimeout(function () {
        btn.textContent = old;
        btn.classList.remove('copied');
      }, 1600);
    };

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(done, function () { fallback(text, done); });
    } else {
      fallback(text, done);
    }
  });
}

function fallback(text, done) {
  var ta = document.createElement('textarea');
  ta.value = text;
  ta.style.position = 'fixed';
  ta.style.top = '-9999px';
  document.body.appendChild(ta);
  ta.select();
  try { document.execCommand('copy'); } catch (err) {}
  ta.remove();
  done();
}

// 回到顶部：向下滚动时隐藏，向上滚动时浮现，点击平滑回到顶部
function bindToTop() {
  var btn = document.getElementById('toTop');
  if (!btn) return;
  var lastY = window.scrollY || 0;
  var ticking = false;

  function update() {
    var y = window.scrollY || 0;
    if (y < 120) btn.classList.remove('show');
    else if (y < lastY - 4) btn.classList.add('show');
    else if (y > lastY + 4) btn.classList.remove('show');
    lastY = y;
    ticking = false;
  }

  window.addEventListener('scroll', function () {
    if (!ticking) { ticking = true; requestAnimationFrame(update); }
  }, { passive: true });

  btn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// 预览自适应：子页测量内容真实尺寸后回报，父页按内容调整预览区高度，保证 UI 完整展示
function bindPreviewFit() {
  window.addEventListener('message', function (e) {
    var d = e.data;
    if (!d || !d.__animSize) return;
    var frames = document.querySelectorAll('iframe');
    var ifr = null;
    for (var i = 0; i < frames.length; i++) {
      if (frames[i].contentWindow === e.source) { ifr = frames[i]; break; }
    }
    if (!ifr) return;
    var stage = ifr.closest('.card-stage') || ifr.closest('.stage');
    if (!stage) return;
    var detail = stage.classList.contains('stage');
    var pad = detail ? 88 : 40;
    var minInner = detail ? 160 : 110;
    var maxInner = detail ? 420 : 300;
    var inner = Math.round(d.h * d.s);
    if (inner < minInner) inner = minInner;
    if (inner > maxInner) inner = maxInner;
    ifr.style.height = inner + 'px';
    stage.style.height = (inner + pad) + 'px';
  });
}

// 低端设备识别：手机/低内存/省流时，首页装饰动效降级
function isLowPerf() {
  try {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return true;
    var c = navigator.connection || {};
    if (c.saveData || /slow-2g|2g|3g/.test(c.effectiveType || '')) return true;
    if (window.innerWidth <= 820) {
      var cores = navigator.hardwareConcurrency;
      if (cores && cores <= 4) return true;
      var mem = navigator.deviceMemory;
      if (mem && mem <= 4) return true;
    }
  } catch (e) {}
  return false;
}

function applyPerf() {
  if (isLowPerf()) document.documentElement.classList.add('perf-lite');
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', function () { applyPerf(); bindCopy(); bindPreviewFit(); bindToTop(); });
} else {
  applyPerf();
  bindCopy();
  bindPreviewFit();
  bindToTop();
}
