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

// 回到顶部：滚动超过一屏后淡入，点击平滑回到顶部，并带一圈读进度环
function bindToTop() {
  var btn = document.getElementById('toTop');
  if (!btn) return;
  var onScroll = function () {
    if (window.scrollY > 240) btn.classList.add('show');
    else btn.classList.remove('show');
  };
  btn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', function () { bindCopy(); bindToTop(); });
} else {
  bindCopy();
  bindToTop();
}
