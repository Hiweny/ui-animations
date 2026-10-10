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

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', function () { bindCopy(); bindToTop(); });
} else {
  bindCopy();
  bindToTop();
}
