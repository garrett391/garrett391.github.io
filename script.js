/* ═══════════════════════════════════════════════════════════
   garrett-michael.github.io — shared behaviour
   Loaded by index.html and every page under projects/
   ═══════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  /* ── Résumé / print ── */
  var pdf = document.getElementById('pdf');
  if (pdf) pdf.addEventListener('click', function () { window.print(); });

  /* ── scroll reveal ──
     Content is visible by default; the .js class on <html> is what
     hides it, so nothing disappears if this script fails to load. */
  var items = document.querySelectorAll('.rv');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -6% 0px', threshold: 0.1 });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add('in'); });
  }

  /* ── screenshot lightbox ──
     Every .shot img becomes clickable. Wrapping each in a real
     <button> keeps it keyboard-reachable without extra ARIA. */
  var lb = document.getElementById('lb');
  if (!lb) return;

  var lbImg   = document.getElementById('lbImg'),
      lbCap   = document.getElementById('lbCap'),
      lbClose = document.getElementById('lbClose'),
      lastFocus = null;

  document.querySelectorAll('.shot').forEach(function (fig) {
    var img = fig.querySelector('img');
    var cap = fig.querySelector('figcaption');
    if (!img) return;

    var btn = document.createElement('button');
    btn.type = 'button';
    btn.setAttribute('aria-label', 'Enlarge: ' + (img.alt || 'screenshot'));
    img.parentNode.insertBefore(btn, img);
    btn.appendChild(img);

    btn.addEventListener('click', function () {
      lastFocus = btn;
      lbImg.src = img.currentSrc || img.src;
      lbImg.alt = img.alt || '';
      lbCap.textContent = cap ? cap.textContent : '';
      lb.hidden = false;
      document.body.style.overflow = 'hidden';
      lbClose.focus();
    });
  });

  function close() {
    lb.hidden = true;
    lbImg.src = '';
    document.body.style.overflow = '';
    if (lastFocus) lastFocus.focus();
  }

  lbClose.addEventListener('click', close);
  lb.addEventListener('click', function (e) { if (e.target === lb) close(); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !lb.hidden) close();
  });
})();
