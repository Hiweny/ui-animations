// 把 <script type="text/plain"> 里的源码渲染到 <pre data-src="#id">
function renderSources() {
  document.querySelectorAll('pre[data-src]').forEach(function (pre) {
    var sel = pre.getAttribute('data-src');
    var src = document.querySelector(sel);
    if (src) pre.textContent = src.textContent.replace(/^\n+/, '').replace(/\s+$/, '');
  });
}

// 一键复制
function bindCopy() {
  document.addEventListener('click', async function (e) {
    var btn = e.target.closest('[data-copy]');
    if (!btn) return;
    var pre = document.querySelector(btn.getAttribute('data-copy'));
    if (!pre) return;
    var text = pre.textContent;
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      var ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand('copy'); } catch (e2) {}
      ta.remove();
    }
    var old = btn.getAttribute('data-label') || btn.textContent;
    btn.setAttribute('data-label', old);
    btn.textContent = '已复制 ✓';
    btn.classList.add('copied');
    setTimeout(function () {
      btn.textContent = old;
      btn.classList.remove('copied');
    }, 1600);
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', function () { renderSources(); bindCopy(); });
} else {
  renderSources(); bindCopy();
}
