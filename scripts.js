// ============================================
// ALEXANDER FORUM – SCRIPTS
// Einwilligung und Statistik, Sprachpaare, E-Mail-Schutz.
// Navigation und Gestaltung kommen ohne JavaScript aus (styles.css).
// ============================================

(function() {
  'use strict';

  const isEnglish = (document.documentElement.lang || '').toLowerCase().startsWith('en');

  // ============================================
  // MICROSOFT CLARITY: nur nach Einwilligung
  // ============================================
  const CLARITY_PROJECT_ID = 'wyevmz4pr0';
  const CONSENT_KEY = 'af_clarity_consent_v1';

  function getStoredConsent() {
    try { return window.localStorage.getItem(CONSENT_KEY); } catch (e) { return null; }
  }

  function setStoredConsent(value) {
    try { window.localStorage.setItem(CONSENT_KEY, value); } catch (e) { /* privates Fenster */ }
  }

  function removeStoredConsent() {
    try { window.localStorage.removeItem(CONSENT_KEY); } catch (e) { /* privates Fenster */ }
  }

  function loadMicrosoftClarity() {
    if (window.__afClarityLoaded) return;
    window.__afClarityLoaded = true;

    (function(c, l, a, r, i, t, y) {
      c[a] = c[a] || function() {
        (c[a].q = c[a].q || []).push(arguments);
      };
      t = l.createElement(r);
      t.async = 1;
      t.src = 'https://www.clarity.ms/tag/' + i + '?ref=bwt';
      y = l.getElementsByTagName(r)[0];
      y.parentNode.insertBefore(t, y);
    })(window, document, 'clarity', 'script', CLARITY_PROJECT_ID);

    window.clarity('consentv2', {
      ad_Storage: 'denied',
      analytics_Storage: 'granted'
    });
  }

  function denyMicrosoftClarity() {
    if (window.clarity) {
      window.clarity('consentv2', {
        ad_Storage: 'denied',
        analytics_Storage: 'denied'
      });
      window.clarity('consent', false);
    }
  }

  function createConsentBanner() {
    if (document.getElementById('af-consent-banner')) return;

    const banner = document.createElement('div');
    banner.id = 'af-consent-banner';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-live', 'polite');
    banner.setAttribute('aria-label', isEnglish ? 'Statistics consent' : 'Statistik-Einwilligung');

    banner.innerHTML = isEnglish ? `
      <div class="af-consent-box">
        <p>
          May we use Microsoft Clarity to measure how this site is used? It sets cookies. You can change this at any time under “Privacy settings”. <a href="/en/privacy/">Privacy</a>
        </p>
        <div class="af-consent-actions">
          <button type="button" id="af-consent-accept">Allow</button>
          <button type="button" id="af-consent-decline">Decline</button>
        </div>
      </div>
    ` : `
      <div class="af-consent-box">
        <p>
          Dürfen wir mit Microsoft Clarity messen, wie diese Seite genutzt wird? Dabei werden Cookies gesetzt. Sie können das jederzeit unter „Datenschutz-Einstellungen“ ändern. <a href="/datenschutz/">Datenschutz</a>
        </p>
        <div class="af-consent-actions">
          <button type="button" id="af-consent-accept">Zulassen</button>
          <button type="button" id="af-consent-decline">Ablehnen</button>
        </div>
      </div>
    `;

    document.body.appendChild(banner);

    document.getElementById('af-consent-accept').addEventListener('click', function() {
      setStoredConsent('granted');
      banner.remove();
      loadMicrosoftClarity();
    });

    document.getElementById('af-consent-decline').addEventListener('click', function() {
      setStoredConsent('denied');
      banner.remove();
      denyMicrosoftClarity();
    });
  }

  function createPrivacySettingsLink() {
    const footerNav = document.querySelector('.foot-nav');
    if (!footerNav || document.getElementById('af-privacy-settings')) return;

    const link = document.createElement('a');
    link.href = '#';
    link.id = 'af-privacy-settings';
    link.textContent = isEnglish ? 'Privacy settings' : 'Datenschutz-Einstellungen';
    link.addEventListener('click', function(e) {
      e.preventDefault();
      removeStoredConsent();
      denyMicrosoftClarity();
      createConsentBanner();
    });
    footerNav.appendChild(link);
  }

  function initConsent() {
    const savedConsent = getStoredConsent() || window.__afClarityConsent;

    if (savedConsent === 'granted') {
      loadMicrosoftClarity();
    } else if (savedConsent === 'denied') {
      denyMicrosoftClarity();
    } else {
      createConsentBanner();
    }

    createPrivacySettingsLink();
  }

  // ============================================
  // SIMPLE ANALYTICS (ohne Cookies)
  // ============================================
  function loadSimpleAnalytics() {
    if (window.__afSimpleAnalyticsLoaded) return;
    if (document.querySelector('script[src*="scripts.simpleanalyticscdn.com/latest.js"]')) return;
    window.__afSimpleAnalyticsLoaded = true;

    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://scripts.simpleanalyticscdn.com/latest.js';
    script.setAttribute('data-collect-dnt', 'true');
    document.body.appendChild(script);
  }

  // ============================================
  // SPRACHPAARE
  // ============================================
  const PAARE = {
    '/': '/en/',
    '/ueber-uns/': '/en/about/',
    '/warum-alexander/': '/en/why-alexander/',
    '/publikationen/': '/en/publications/',
    '/resilienz/': '/en/resilience/',
    '/gleichzeitigkeit/': '/en/era-of-simultaneity/',
    '/impressum/': '/en/imprint/',
    '/datenschutz/': '/en/privacy/'
  };
  Object.keys(PAARE).forEach(function(k) { PAARE[PAARE[k]] = k; });

  function getLanguagePair(pathname) {
    const clean = pathname.replace(/\/+$/, '/') || '/';
    return PAARE[clean] || null;
  }

  function updateAlternateLinks() {
    const pair = getLanguagePair(window.location.pathname);
    if (!pair) return;

    const origin = window.location.origin;
    const currentLang = isEnglish ? 'en' : 'de';
    const otherLang = isEnglish ? 'de' : 'en';

    function upsertAlternate(lang, href) {
      let link = document.querySelector('link[rel="alternate"][hreflang="' + lang + '"]');
      if (!link) {
        link = document.createElement('link');
        link.rel = 'alternate';
        link.hreflang = lang;
        document.head.appendChild(link);
      }
      link.href = href;
    }

    upsertAlternate(currentLang, origin + window.location.pathname);
    upsertAlternate(otherLang, origin + pair);
    upsertAlternate('x-default', isEnglish ? origin + pair : origin + window.location.pathname);
  }

  function normalizeEnglishViewerLinks() {
    if (!isEnglish) return;
    document.querySelectorAll('a[href*="/viewer/index.html?"]').forEach(function(link) {
      const url = new URL(link.getAttribute('href'), window.location.origin);
      if (!url.searchParams.has('lang')) {
        url.searchParams.set('lang', 'en');
        link.setAttribute('href', url.pathname + url.search + url.hash);
      }
    });
  }

  // ============================================
  // E-MAIL-SCHUTZ
  // Im HTML steht nur „name (at) domain“; hier wird der Link zusammengesetzt.
  // ============================================
  // Nur diese Adressen werden zusammengesetzt; der Seitentext dient bloß als Schlüssel.
  const POSTFAECHER = {
    kontakt: ['kontakt', 'alexanderforum.org'],
    research: ['research', 'alexanderforum.org']
  };

  function assembleMailLinks() {
    document.querySelectorAll('[data-post-name][data-post-domain]').forEach(function(el) {
      const schluessel = el.getAttribute('data-post-name');
      const eintrag = Object.prototype.hasOwnProperty.call(POSTFAECHER, schluessel) ? POSTFAECHER[schluessel] : null;
      if (!eintrag) return;
      const address = eintrag[0] + String.fromCharCode(64) + eintrag[1];
      const a = document.createElement('a');
      a.href = 'mailto:' + address;
      a.textContent = address;
      el.replaceWith(a);
    });
  }

  function init() {
    assembleMailLinks();
    loadSimpleAnalytics();
    updateAlternateLinks();
    normalizeEnglishViewerLinks();
    initConsent();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
