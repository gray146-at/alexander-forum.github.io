/* Sprachumschalter DE/EN wie auf Widerstandskraft: kleine Pille unten links.
   Liest die Sprachfassungen aus <link rel="alternate" hreflang>, markiert die aktuelle Sprache.
   Farbe der aktuellen Sprache über data-farbe am Script-Tag. Ohne JavaScript bleibt der Link „English/Deutsch“ im Kopf. */
(function () {
  'use strict';
  var skript = document.currentScript;
  var farbe = (skript && skript.getAttribute('data-farbe')) || '#151515';
  var ziele = {};
  Array.prototype.forEach.call(document.querySelectorAll('link[rel="alternate"][hreflang]'), function (l) {
    var h = (l.getAttribute('hreflang') || '').toLowerCase();
    if (h === 'de' || h === 'en') ziele[h] = l.getAttribute('href');
  });
  if (!ziele.de || !ziele.en) return;
  var aktuell = (document.documentElement.lang || 'de').toLowerCase().slice(0, 2);
  var stil = document.createElement('style');
  stil.textContent =
    '.sprache{position:fixed;left:16px;bottom:16px;z-index:50;display:flex;gap:2px;padding:4px;border-radius:999px;' +
    'background:rgba(255,255,255,.94);box-shadow:0 2px 14px rgba(0,0,0,.16);font:600 13px/1 system-ui,-apple-system,"Segoe UI",sans-serif}' +
    '.sprache a{display:block;padding:8px 12px;border-radius:999px;color:#151515;text-decoration:none;letter-spacing:.05em}' +
    '.sprache a:hover{background:rgba(0,0,0,.06);color:#151515}' +
    '.sprache a[aria-current="page"]{background:' + farbe + ';color:#fff}' +
    '.sprache a:focus-visible{outline:2px solid ' + farbe + ';outline-offset:2px}' +
    '@media print{.sprache{display:none}}';
  document.head.appendChild(stil);
  var nav = document.createElement('nav');
  nav.className = 'sprache';
  nav.setAttribute('aria-label', 'Sprache / Language');
  nav.setAttribute('translate', 'no');
  ['de', 'en'].forEach(function (s) {
    var a = document.createElement('a');
    a.href = ziele[s];
    a.textContent = s.toUpperCase();
    a.setAttribute('hreflang', s);
    a.setAttribute('lang', s);
    if (s === aktuell) a.setAttribute('aria-current', 'page');
    nav.appendChild(a);
  });
  document.body.appendChild(nav);
})();
