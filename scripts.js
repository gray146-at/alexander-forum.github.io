// ============================================
// ALEXANDER FORUM – SCRIPTS
// Navigation, UI helpers, consent and analytics
// ============================================

(function() {
  'use strict';

  // ============================================
  // MICROSOFT CLARITY CONSENT
  // ============================================
  const CLARITY_PROJECT_ID = 'wyevmz4pr0';
  const CONSENT_KEY = 'af_clarity_consent_v1';

  function getStoredConsent() {
    try {
      return window.localStorage.getItem(CONSENT_KEY);
    } catch (e) {
      return null;
    }
  }

  function setStoredConsent(value) {
    try {
      window.localStorage.setItem(CONSENT_KEY, value);
    } catch (e) {
      // If localStorage is blocked, keep the choice for the current page only.
      window.__afClarityConsent = value;
    }
  }

  function removeStoredConsent() {
    try {
      window.localStorage.removeItem(CONSENT_KEY);
    } catch (e) {
      window.__afClarityConsent = null;
    }
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

  function injectConsentStyles() {
    if (document.getElementById('af-consent-styles')) return;

    const style = document.createElement('style');
    style.id = 'af-consent-styles';
    style.textContent = `
      #af-consent-banner {
        position: fixed;
        left: 1rem;
        right: 1rem;
        bottom: 1rem;
        z-index: 99999;
        display: flex;
        justify-content: center;
        pointer-events: none;
      }

      .af-consent-box {
        max-width: 760px;
        width: min(760px, 100%);
        background: rgba(15, 42, 58, 0.98);
        color: #fff;
        border: 1px solid rgba(255, 255, 255, 0.18);
        border-radius: 14px;
        padding: 1rem 1.15rem;
        box-shadow: 0 16px 40px rgba(0, 0, 0, 0.35);
        pointer-events: auto;
        font-family: Georgia, 'Palatino Linotype', 'Times New Roman', serif;
      }

      .af-consent-box p {
        margin: 0 0 .9rem;
        font-size: .95rem;
        line-height: 1.5;
      }

      .af-consent-actions {
        display: flex;
        flex-wrap: wrap;
        gap: .65rem;
      }

      .af-consent-actions button {
        min-height: 42px;
        cursor: pointer;
        border-radius: 8px;
        border: 1px solid rgba(255, 255, 255, 0.28);
        padding: .55rem .85rem;
        font-family: inherit;
        font-size: .95rem;
        font-weight: 700;
      }

      #af-consent-accept {
        background: #fff;
        color: #0f2a3a;
      }

      #af-consent-decline {
        background: transparent;
        color: #fff;
      }

      #af-privacy-settings {
        cursor: pointer;
      }

      @media (max-width: 600px) {
        #af-consent-banner {
          left: .75rem;
          right: .75rem;
          bottom: .75rem;
        }

        .af-consent-box {
          padding: .9rem;
        }

        .af-consent-actions button {
          width: 100%;
        }
      }
    `;
    document.head.appendChild(style);
  }

  function createConsentBanner() {
    if (document.getElementById('af-consent-banner')) return;

    injectConsentStyles();

    const isEnglish = (document.documentElement.lang || '').toLowerCase().startsWith('en');
    const banner = document.createElement('div');
    banner.id = 'af-consent-banner';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-live', 'polite');
    banner.setAttribute('aria-label', isEnglish ? 'Statistics consent' : 'Statistik-Einwilligung');

    banner.innerHTML = isEnglish ? `
      <div class="af-consent-box">
        <p>
          For our statistics, optional website analytics are helpful: they show which content is useful and where we can improve the site.
          If you agree, usage data such as page views, clicks and sessions may be processed.
        </p>
        <div class="af-consent-actions">
          <button type="button" id="af-consent-accept">Allow optional statistics</button>
          <button type="button" id="af-consent-decline">Continue without statistics</button>
        </div>
      </div>
    ` : `
      <div class="af-consent-box">
        <p>
          Für unsere Statistik ist eine optionale Website-Analyse hilfreich: Sie zeigt uns, welche Inhalte nützlich sind und wo wir die Seite verbessern können.
          Wenn Sie zustimmen, können Nutzungsdaten wie Seitenaufrufe, Klicks und Sitzungen verarbeitet werden.
        </p>
        <div class="af-consent-actions">
          <button type="button" id="af-consent-accept">Optionale Statistik erlauben</button>
          <button type="button" id="af-consent-decline">Ohne Statistik fortfahren</button>
        </div>
      </div>
    `;

    document.body.appendChild(banner);

    const accept = document.getElementById('af-consent-accept');
    const decline = document.getElementById('af-consent-decline');

    if (accept) {
      accept.addEventListener('click', function() {
        setStoredConsent('granted');
        banner.remove();
        loadMicrosoftClarity();
      });
    }

    if (decline) {
      decline.addEventListener('click', function() {
        setStoredConsent('denied');
        banner.remove();
        denyMicrosoftClarity();
      });
    }
  }

  function createPrivacySettingsLink() {
    const footerNav = document.querySelector('.foot-nav');
    if (!footerNav || document.getElementById('af-privacy-settings')) return;

    const isEnglish = (document.documentElement.lang || '').toLowerCase().startsWith('en');

    const sep = document.createElement('span');
    sep.className = 'sep';
    sep.textContent = '·';

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

    footerNav.appendChild(sep);
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
  // SITE UI
  // ============================================
  function initStickyHeader() {
    const siteHead = document.querySelector('.site-head');
    if (!siteHead) return;

    function updateHeaderState() {
      if (window.pageYOffset > 50) {
        siteHead.classList.add('scrolled');
      } else {
        siteHead.classList.remove('scrolled');
      }
    }

    updateHeaderState();
    window.addEventListener('scroll', updateHeaderState, { passive: true });
  }

  function initDropdownNavigation() {
    const dropdownToggle = document.querySelector('.nav-dropdown-toggle');
    const dropdownMenu = document.querySelector('.nav-dropdown-menu');
    const navDropdown = document.querySelector('.nav-dropdown');

    if (!dropdownToggle || !dropdownMenu) return;

    function openDropdown() {
      dropdownToggle.setAttribute('aria-expanded', 'true');
      dropdownMenu.classList.add('active');
    }

    function closeDropdown() {
      dropdownToggle.setAttribute('aria-expanded', 'false');
      dropdownMenu.classList.remove('active');
    }

    dropdownToggle.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      const isExpanded = dropdownToggle.getAttribute('aria-expanded') === 'true';
      isExpanded ? closeDropdown() : openDropdown();
    });

    document.addEventListener('click', function(e) {
      if (navDropdown && !navDropdown.contains(e.target)) {
        closeDropdown();
      }
    });

    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') closeDropdown();
    });

    dropdownMenu.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', closeDropdown);
    });
  }

  function initMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const miniNav = document.querySelector('.mini-nav');
    if (!mobileToggle || !miniNav) return;

    const isEnglish = (document.documentElement.lang || '').toLowerCase().startsWith('en');

    function closeMenu() {
      miniNav.classList.remove('mobile-open');
      mobileToggle.classList.remove('active');
      mobileToggle.setAttribute('aria-expanded', 'false');
      mobileToggle.setAttribute('aria-label', isEnglish ? 'Open menu' : 'Menü öffnen');
      document.body.style.overflow = '';
    }

    function openMenu() {
      miniNav.classList.add('mobile-open');
      mobileToggle.classList.add('active');
      mobileToggle.setAttribute('aria-expanded', 'true');
      mobileToggle.setAttribute('aria-label', isEnglish ? 'Close menu' : 'Menü schließen');
      document.body.style.overflow = 'hidden';
    }

    mobileToggle.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      miniNav.classList.contains('mobile-open') ? closeMenu() : openMenu();
    });

    miniNav.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && miniNav.classList.contains('mobile-open')) {
        closeMenu();
      }
    });
  }

  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
      anchor.addEventListener('click', function(e) {
        const href = anchor.getAttribute('href');
        if (!href || href === '#' || anchor.hasAttribute('data-target')) return;

        const target = document.querySelector(href);
        if (!target) return;

        e.preventDefault();
        const siteHead = document.querySelector('.site-head');
        const headerHeight = siteHead ? siteHead.offsetHeight : 0;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });

        if (history.pushState) {
          history.pushState(null, '', href);
        }
      });
    });
  }

  function initActiveNavHighlighting() {
    const sections = document.querySelectorAll('section[id], h2[id]');
    const navLinks = document.querySelectorAll('.mini-nav a[href^="#"]');
    if (!sections.length || !navLinks.length) return;

    function updateActiveLink() {
      let current = '';

      sections.forEach(function(section) {
        const sectionTop = section.offsetTop;
        if (window.pageYOffset >= sectionTop - 200) {
          current = section.getAttribute('id');
        }
      });

      navLinks.forEach(function(link) {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
          link.classList.add('active');
        }
      });
    }

    updateActiveLink();
    window.addEventListener('scroll', updateActiveLink, { passive: true });
  }

  function initBasicModalFallback() {
    const modal = document.getElementById('modal');
    const modalBody = document.getElementById('modal-body');
    const modalClose = document.querySelector('.modal-close');
    const triggers = document.querySelectorAll('[data-target]');

    if (!modal || !modalBody || !triggers.length) return;

    function closeModal() {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }

    triggers.forEach(function(trigger) {
      trigger.addEventListener('click', function(e) {
        e.preventDefault();
        const parent = trigger.closest('article, section, .inspiration-card');
        const title = parent ? parent.querySelector('h2, h3') : null;
        const teaser = parent ? parent.querySelector('.short, .teaser, p') : null;

        modalBody.innerHTML = `
          ${title ? '<h3>' + title.textContent + '</h3>' : ''}
          ${teaser ? '<p>' + teaser.textContent + '</p>' : ''}
        `;

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        modal.focus();
      });
    });

    if (modalClose) {
      modalClose.addEventListener('click', closeModal);
    }

    modal.addEventListener('click', function(e) {
      if (e.target === modal) closeModal();
    });

    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
      }
    });
  }

  function init() {
    initConsent();
    initStickyHeader();
    initDropdownNavigation();
    initMobileMenu();
    initSmoothScroll();
    initActiveNavHighlighting();
    initBasicModalFallback();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
