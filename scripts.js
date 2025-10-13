// ============================================
// ALEXANDER FORUM – COMPLETE SCRIPTS
// ============================================

document.addEventListener('DOMContentLoaded', function() {
  
  // ============================================
  // 1. STICKY HEADER WITH SCROLL EFFECT
  // ============================================
  const siteHead = document.querySelector('.site-head');
  
  if (siteHead) {
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;
      if (currentScroll > 50) {
        siteHead.classList.add('scrolled');
      } else {
        siteHead.classList.remove('scrolled');
      }
      lastScroll = currentScroll;
    });
  }

  // ============================================
  // 2. DROPDOWN NAVIGATION (Desktop)
  // ============================================
  const dropdownToggle = document.querySelector('.nav-dropdown-toggle');
  const dropdownMenu = document.querySelector('.nav-dropdown-menu');
  const navDropdown = document.querySelector('.nav-dropdown');

  if (dropdownToggle && dropdownMenu) {
    // Toggle dropdown on button click
    dropdownToggle.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const isExpanded = dropdownToggle.getAttribute('aria-expanded') === 'true';
      
      if (isExpanded) {
        closeDropdown();
      } else {
        openDropdown();
      }
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
      if (navDropdown && !navDropdown.contains(e.target)) {
        closeDropdown();
      }
    });

    // Close dropdown on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeDropdown();
      }
    });

    // Close dropdown when clicking on menu item
    const dropdownLinks = dropdownMenu.querySelectorAll('a');
    dropdownLinks.forEach(link => {
      link.addEventListener('click', () => {
        closeDropdown();
      });
    });

    function openDropdown() {
      dropdownToggle.setAttribute('aria-expanded', 'true');
      dropdownMenu.classList.add('active');
    }

    function closeDropdown() {
      dropdownToggle.setAttribute('aria-expanded', 'false');
      dropdownMenu.classList.remove('active');
    }
  }

  // ============================================
  // 3. MOBILE HAMBURGER MENU
  // ============================================
  const mobileToggle = document.querySelector('.mobile-menu-toggle');
  const miniNav = document.querySelector('.mini-nav');
  
  if (mobileToggle && miniNav) {
    mobileToggle.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      const isOpen = miniNav.classList.contains('mobile-open');
      
      if (isOpen) {
        // Close menu
        miniNav.classList.remove('mobile-open');
        mobileToggle.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
        mobileToggle.setAttribute('aria-label', 
          mobileToggle.getAttribute('lang') === 'de' ? 'Menü öffnen' : 'Open menu');
        document.body.style.overflow = '';
      } else {
        // Open menu
        miniNav.classList.add('mobile-open');
        mobileToggle.classList.add('active');
        mobileToggle.setAttribute('aria-expanded', 'true');
        mobileToggle.setAttribute('aria-label', 
          mobileToggle.getAttribute('lang') === 'de' ? 'Menü schließen' : 'Close menu');
        document.body.style.overflow = 'hidden';
      }
    });
    
    // Close mobile menu when clicking on a link
    const mobileLinks = miniNav.querySelectorAll('a');
    mobileLinks.forEach(link => {
      link.addEventListener('click', function() {
        miniNav.classList.remove('mobile-open');
        mobileToggle.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
    
    // Close mobile menu on escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && miniNav.classList.contains('mobile-open')) {
        miniNav.classList.remove('mobile-open');
        mobileToggle.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  }

  // ============================================
  // 4. MODAL FOR INSPIRATIONS (Alexander Figures)
  // ============================================
  const modal = document.getElementById('modal');
  const modalBody = document.getElementById('modal-body');
  const modalClose = document.querySelector('.modal-close');
  const modalTriggers = document.querySelectorAll('[data-target]');

  // Detect language from HTML lang attribute
  const lang = document.documentElement.lang || 'de';

  // Modal content data - German
  const modalContentDE = {
    'alexander-great-detail': {
      title: 'Alexander der Große',
      subtitle: 'Strategie & Anpassungsfähigkeit',
      content: `
        <p><strong>356–323 v. Chr.</strong> – Makedonischer König und Feldherr, dessen Feldzüge ein Reich von Griechenland bis Indien schufen.</p>
        
        <h5>Resilienz-Perspektive</h5>
        <p>Alexander zeigt, wie schnelle Entscheidungen unter Unsicherheit und kulturelle Übersetzungsarbeit Systeme stabilisieren können – aber auch, wie unkontrollierte Macht destruktiv wirkt.</p>
        
        <h5>Zentrale Lektionen</h5>
        <ul>
          <li><strong>Entscheiden unter Unsicherheit:</strong> Tempo und Klarheit in komplexen Lagen</li>
          <li><strong>Kulturelle Synthese:</strong> Integration verschiedener Traditionen als Stabilisierungsfaktor</li>
          <li><strong>Macht reflektieren:</strong> Die Notwendigkeit von Checks and Balances</li>
          <li><strong>Logistik als Fundament:</strong> Versorgungslinien sichern langfristige Handlungsfähigkeit</li>
        </ul>
        
        <h5>Ambivalenzen</h5>
        <p>Seine Eroberungen waren gewaltsam und forderten enormes Leid. Die Lehre: Führungsstärke ohne ethische Reflexion führt zu Schäden, die Generationen überdauern.</p>
      `
    },
    'hypatia-detail': {
      title: 'Hypatia von Alexandria',
      subtitle: 'Bildung als Leuchtturm',
      content: `
        <p><strong>ca. 355–415 n. Chr.</strong> – Philosophin, Mathematikerin und Astronomin im spätantiken Alexandria.</p>
        
        <h5>Resilienz-Perspektive</h5>
        <p>Hypatia verkörpert die stabilisierende Kraft von Bildung und rationalem Diskurs in Krisenzeiten. Ihr Wirken zeigt: Wissensräume schaffen kulturelle Resilienz.</p>
        
        <h5>Zentrale Lektionen</h5>
        <ul>
          <li><strong>Bildung als Immunsystem:</strong> Kritisches Denken schützt Gesellschaften</li>
          <li><strong>Dialogräume erhalten:</strong> Orte des Austauschs stabilisieren in Umbrüchen</li>
          <li><strong>Interdisziplinarität:</strong> Mathematik, Philosophie, Astronomie als Gesamtperspektive</li>
          <li><strong>Vorbildfunktion:</strong> Persönliche Integrität stärkt institutionelles Vertrauen</li>
        </ul>
        
        <h5>Vermächtnis</h5>
        <p>Ihr gewaltsamer Tod durch religiöse Fanatiker erinnert daran, dass Aufklärung und Vernunft immer wieder verteidigt werden müssen.</p>
      `
    },
    'david-neel-detail': {
      title: 'Alexandra David-Néel',
      subtitle: 'Mut an den Rändern',
      content: `
        <p><strong>1868–1969</strong> – Französische Reisende, Buddhistin und Autorin, erste westliche Frau in Lhasa.</p>
        
        <h5>Resilienz-Perspektive</h5>
        <p>David-Néel zeigt, wie Exploration, Neugier und innere Disziplin persönliche Resilienz aufbauen. Ihre Reisen waren physisch und psychisch herausfordernd – und stärkten ihre Selbstwirksamkeit.</p>
        
        <h5>Zentrale Lektionen</h5>
        <ul>
          <li><strong>Grenzen überschreiten:</strong> Neue Umgebungen fördern Anpassungsfähigkeit</li>
          <li><strong>Innere Ordnung:</strong> Meditation und Selbstführung als Ankerpunkte</li>
          <li><strong>Kulturelle Sensibilität:</strong> Respekt vor dem Fremden als Lernressource</li>
          <li><strong>Langfristperspektive:</strong> Geduld und Ausdauer in der Verfolgung großer Ziele</li>
        </ul>
        
        <h5>Vermächtnis</h5>
        <p>Ihre Schriften über tibetischen Buddhismus und ihre Lebensgeschichte inspirieren bis heute Menschen, die ihre Komfortzone verlassen wollen.</p>
      `
    },
    'kollontai-detail': {
      title: 'Alexandra Kollontai',
      subtitle: 'Solidarität gestalten',
      content: `
        <p><strong>1872–1952</strong> – Sowjetische Revolutionärin, Feministin und Diplomatin. Erste Frau in einer Regierung weltweit.</p>
        
        <h5>Resilienz-Perspektive</h5>
        <p>Kollontai kämpfte für strukturelle Veränderungen: Kinderbetreuung, Frauenrechte, soziale Absicherung. Sie verstand: Kollektive Resilienz braucht faire Institutionen.</p>
        
        <h5>Zentrale Lektionen</h5>
        <ul>
          <li><strong>Strukturelle Gerechtigkeit:</strong> Faire Systeme erhöhen gesellschaftliche Widerstandskraft</li>
          <li><strong>Soziale Netze:</strong> Solidarität als Fundament von Resilienz</li>
          <li><strong>Hartnäckigkeit:</strong> Reformarbeit braucht langen Atem gegen Widerstände</li>
          <li><strong>Geschlechtergerechtigkeit:</strong> Gleichstellung als stabilisierender Faktor</li>
        </ul>
        
        <h5>Ambivalenzen</h5>
        <p>Ihre Verstrickung in das sowjetische System zeigt die Spannung zwischen Idealismus und politischer Realität. Lehre: Systemkritik muss auch die eigenen Strukturen einschließen.</p>
      `
    },
    'solschenizyn-detail': {
      title: 'Alexander Solschenizyn',
      subtitle: 'Wahrheit als Widerstand',
      content: `
        <p><strong>1918–2008</strong> – Russischer Schriftsteller, Dissident und Nobelpreisträger. Überlebte acht Jahre Gulag.</p>
        
        <h5>Resilienz-Perspektive</h5>
        <p>Solschenizyn überlebte extreme Bedingungen durch Sinnorientierung und die Verpflichtung zur Zeugenschaft. Sein Werk zeigt: Wahrheit ist eine Form von Widerstand.</p>
        
        <h5>Zentrale Lektionen</h5>
        <ul>
          <li><strong>Sinnorientierung:</strong> Viktor Frankls Erkenntnisse praktisch gelebt</li>
          <li><strong>Erinnerungskultur:</strong> Dokumentation schützt vor Wiederholung</li>
          <li><strong>Moralische Klarheit:</strong> Persönliche Integrität unter Druck bewahren</li>
          <li><strong>Zeugenschaft:</strong> Erlebtes dokumentieren schafft historische Verantwortung</li>
        </ul>
        
        <h5>Vermächtnis</h5>
        <p>Der „Archipel Gulag" ist ein Jahrhundertwerk über Trauma, Macht und die Fähigkeit des Menschen, unter unmenschlichen Bedingungen Würde zu bewahren.</p>
      `
    },
    'fleming-detail': {
      title: 'Alexander Fleming',
      subtitle: 'Fehler als Fundgrube',
      content: `
        <p><strong>1881–1955</strong> – Schottischer Bakteriologe, Entdecker des Penicillins. Nobelpreis 1945.</p>
        
        <h5>Resilienz-Perspektive</h5>
        <p>Flemings Entdeckung war ein Glücksfall – aber nur, weil er offen für das Unerwartete war. Seine Geschichte zeigt: Fehlerkultur und Beobachtungsgabe sind Resilienzfaktoren.</p>
        
        <h5>Zentrale Lektionen</h5>
        <ul>
          <li><strong>Serendipität nutzen:</strong> Zufälle produktiv machen durch Aufmerksamkeit</li>
          <li><strong>Fehlerfreundlichkeit:</strong> Kulturen, die Experimente erlauben, innovieren besser</li>
          <li><strong>Schnelle Translation:</strong> Von der Entdeckung zur Anwendung</li>
          <li><strong>Interdisziplinäre Zusammenarbeit:</strong> Penicillin wurde erst durch Teamwork massentauglich</li>
        </ul>
        
        <h5>Vermächtnis</h5>
        <p>Penicillin rettete Millionen Leben und revolutionierte die Medizin. Flemings Offenheit für das Unerwartete ist ein Modell für resiliente Forschung.</p>
      `
    },
    'humboldt-detail': {
      title: 'Alexander von Humboldt',
      subtitle: 'Vernetzung sichtbar machen',
      content: `
        <p><strong>1769–1859</strong> – Preußischer Naturforscher, Geograph und Universalgelehrter. Begründer der modernen Geographie.</p>
        
        <h5>Resilienz-Perspektive</h5>
        <p>Humboldt verstand die Erde als vernetztes System. Seine Arbeit zeigt: Resilienz entsteht durch Systemverständnis und die Fähigkeit, Wechselwirkungen zu sehen.</p>
        
        <h5>Zentrale Lektionen</h5>
        <ul>
          <li><strong>Systemdenken:</strong> Alles hängt mit allem zusammen</li>
          <li><strong>Langfristperspektive:</strong> Klimawandel und Ökologie früh erkannt</li>
          <li><strong>Interdisziplinarität:</strong> Naturwissenschaft, Kultur und Politik verbinden</li>
          <li><strong>Datenbasierte Analyse:</strong> Messungen als Grundlage für Verständnis</li>
        </ul>
        
        <h5>Vermächtnis</h5>
        <p>Humboldts Warnung vor der Zerstörung natürlicher Gleichgewichte ist heute aktueller denn je. Seine Methode – genau beobachten, vernetzen, langfristig denken – ist ein Modell für resiliente Wissenschaft.</p>
      `
    }
  };

  // Modal content data - English
  const modalContentEN = {
    'alexander-great-detail': {
      title: 'Alexander the Great',
      subtitle: 'Strategy & Adaptability',
      content: `
        <p><strong>356–323 BC</strong> – Macedonian king and military commander whose campaigns created an empire from Greece to India.</p>
        
        <h5>Resilience Perspective</h5>
        <p>Alexander shows how rapid decisions under uncertainty and cultural translation work can stabilize systems – but also how uncontrolled power acts destructively.</p>
        
        <h5>Key Lessons</h5>
        <ul>
          <li><strong>Deciding under uncertainty:</strong> Speed and clarity in complex situations</li>
          <li><strong>Cultural synthesis:</strong> Integration of different traditions as a stabilizing factor</li>
          <li><strong>Reflecting on power:</strong> The necessity of checks and balances</li>
          <li><strong>Logistics as foundation:</strong> Supply lines secure long-term capability</li>
        </ul>
        
        <h5>Ambivalences</h5>
        <p>His conquests were violent and demanded enormous suffering. The lesson: Leadership without ethical reflection leads to damage that lasts generations.</p>
      `
    },
    'hypatia-detail': {
      title: 'Hypatia of Alexandria',
      subtitle: 'Education as Beacon',
      content: `
        <p><strong>ca. 355–415 AD</strong> – Philosopher, mathematician and astronomer in late ancient Alexandria.</p>
        
        <h5>Resilience Perspective</h5>
        <p>Hypatia embodies the stabilizing power of education and rational discourse in times of crisis. Her work shows: Knowledge spaces create cultural resilience.</p>
        
        <h5>Key Lessons</h5>
        <ul>
          <li><strong>Education as immune system:</strong> Critical thinking protects societies</li>
          <li><strong>Maintaining dialogue spaces:</strong> Places of exchange stabilize during upheavals</li>
          <li><strong>Interdisciplinarity:</strong> Mathematics, philosophy, astronomy as holistic perspective</li>
          <li><strong>Role model function:</strong> Personal integrity strengthens institutional trust</li>
        </ul>
        
        <h5>Legacy</h5>
        <p>Her violent death by religious fanatics reminds us that enlightenment and reason must be defended again and again.</p>
      `
    },
    'david-neel-detail': {
      title: 'Alexandra David-Néel',
      subtitle: 'Courage at the Edges',
      content: `
        <p><strong>1868–1969</strong> – French traveler, Buddhist and author, first Western woman in Lhasa.</p>
        
        <h5>Resilience Perspective</h5>
        <p>David-Néel shows how exploration, curiosity and inner discipline build personal resilience. Her journeys were physically and psychologically challenging – and strengthened her self-efficacy.</p>
        
        <h5>Key Lessons</h5>
        <ul>
          <li><strong>Crossing boundaries:</strong> New environments foster adaptability</li>
          <li><strong>Inner order:</strong> Meditation and self-leadership as anchor points</li>
          <li><strong>Cultural sensitivity:</strong> Respect for the foreign as learning resource</li>
          <li><strong>Long-term perspective:</strong> Patience and perseverance in pursuing great goals</li>
        </ul>
        
        <h5>Legacy</h5>
        <p>Her writings on Tibetan Buddhism and her life story continue to inspire people who want to leave their comfort zone.</p>
      `
    },
    'kollontai-detail': {
      title: 'Alexandra Kollontai',
      subtitle: 'Shaping Solidarity',
      content: `
        <p><strong>1872–1952</strong> – Soviet revolutionary, feminist and diplomat. First woman in a government worldwide.</p>
        
        <h5>Resilience Perspective</h5>
        <p>Kollontai fought for structural changes: childcare, women's rights, social security. She understood: Collective resilience needs fair institutions.</p>
        
        <h5>Key Lessons</h5>
        <ul>
          <li><strong>Structural justice:</strong> Fair systems increase societal resilience</li>
          <li><strong>Social networks:</strong> Solidarity as foundation of resilience</li>
          <li><strong>Persistence:</strong> Reform work requires long-term endurance against resistance</li>
          <li><strong>Gender justice:</strong> Equality as stabilizing factor</li>
        </ul>
        
        <h5>Ambivalences</h5>
        <p>Her entanglement in the Soviet system shows the tension between idealism and political reality. Lesson: System critique must also include one's own structures.</p>
      `
    },
    'solschenizyn-detail': {
      title: 'Alexander Solzhenitsyn',
      subtitle: 'Truth as Resistance',
      content: `
        <p><strong>1918–2008</strong> – Russian writer, dissident and Nobel Prize winner. Survived eight years in the Gulag.</p>
        
        <h5>Resilience Perspective</h5>
        <p>Solzhenitsyn survived extreme conditions through meaning-orientation and commitment to witnessing. His work shows: Truth is a form of resistance.</p>
        
        <h5>Key Lessons</h5>
        <ul>
          <li><strong>Meaning-orientation:</strong> Viktor Frankl's insights practically lived</li>
          <li><strong>Culture of remembrance:</strong> Documentation protects from repetition</li>
          <li><strong>Moral clarity:</strong> Preserving personal integrity under pressure</li>
          <li><strong>Witnessing:</strong> Documenting experiences creates historical responsibility</li>
        </ul>
        
        <h5>Legacy</h5>
        <p>"The Gulag Archipelago" is a century work about trauma, power and humanity's ability to preserve dignity under inhumane conditions.</p>
      `
    },
    'fleming-detail': {
      title: 'Alexander Fleming',
      subtitle: 'Mistakes as Treasure Trove',
      content: `
        <p><strong>1881–1955</strong> – Scottish bacteriologist, discoverer of penicillin. Nobel Prize 1945.</p>
        
        <h5>Resilience Perspective</h5>
        <p>Fleming's discovery was a stroke of luck – but only because he was open to the unexpected. His story shows: Error culture and observational skills are resilience factors.</p>
        
        <h5>Key Lessons</h5>
        <ul>
          <li><strong>Using serendipity:</strong> Making chance productive through attention</li>
          <li><strong>Error-friendliness:</strong> Cultures that allow experiments innovate better</li>
          <li><strong>Rapid translation:</strong> From discovery to application</li>
          <li><strong>Interdisciplinary collaboration:</strong> Penicillin only became mass-ready through teamwork</li>
        </ul>
        
        <h5>Legacy</h5>
        <p>Penicillin saved millions of lives and revolutionized medicine. Fleming's openness to the unexpected is a model for resilient research.</p>
      `
    },
    'humboldt-detail': {
      title: 'Alexander von Humboldt',
      subtitle: 'Making Networks Visible',
      content: `
        <p><strong>1769–1859</strong> – Prussian natural scientist, geographer and polymath. Founder of modern geography.</p>
        
        <h5>Resilience Perspective</h5>
        <p>Humboldt understood the Earth as a networked system. His work shows: Resilience emerges through system understanding and the ability to see interactions.</p>
        
        <h5>Key Lessons</h5>
        <ul>
          <li><strong>Systems thinking:</strong> Everything is connected</li>
          <li><strong>Long-term perspective:</strong> Climate change and ecology recognized early</li>
          <li><strong>Interdisciplinarity:</strong> Connecting natural science, culture and politics</li>
          <li><strong>Data-based analysis:</strong> Measurements as basis for understanding</li>
        </ul>
        
        <h5>Legacy</h5>
        <p>Humboldt's warning about destroying natural balances is more relevant today than ever. His method – observe precisely, connect, think long-term – is a model for resilient science.</p>
      `
    }
  };

  // Select the appropriate content based on language
  const modalContent = lang === 'en' ? modalContentEN : modalContentDE;

  // Open modal
  if (modalTriggers.length > 0) {
    modalTriggers.forEach(trigger => {
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        const target = trigger.getAttribute('data-target');
        const data = modalContent[target];
        
        if (data && modal && modalBody) {
          modalBody.innerHTML = `
            <h3>${data.title}</h3>
            <p class="tagline" style="color: var(--af-navy-600); font-weight: 700; margin-bottom: 1rem;">${data.subtitle}</p>
            ${data.content}
          `;
          modal.classList.add('active');
          document.body.style.overflow = 'hidden';
          
          // Focus modal for accessibility
          modal.focus();
        }
      });
    });
  }

  // Close modal
  function closeModalWindow() {
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (modalClose) {
    modalClose.addEventListener('click', closeModalWindow);
  }

  if (modal) {
    // Close on overlay click
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModalWindow();
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModalWindow();
      }
    });
  }

  // ============================================
  // 5. SMOOTH SCROLL FOR ANCHOR LINKS
  // ============================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      
      // Skip if it's just "#" or modal trigger
      if (href === '#' || this.hasAttribute('data-target')) return;
      
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        
        // Get header height for offset
        const headerHeight = siteHead ? siteHead.offsetHeight : 0;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
        
        // Update URL without triggering page jump
        if (history.pushState) {
          history.pushState(null, null, href);
        }
      }
    });
  });

  // ============================================
  // 6. ACTIVE NAV HIGHLIGHTING (based on scroll)
  // ============================================
  const sections = document.querySelectorAll('section[id], h2[id]');
  const navLinks = document.querySelectorAll('.mini-nav a[href^="#"]');

  if (sections.length > 0 && navLinks.length > 0) {
    window.addEventListener('scroll', () => {
      let current = '';
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - 200)) {
          current = section.getAttribute('id');
        }
      });

      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
          link.classList.add('active');
        }
      });
    });
  }

});

// ============================================
// UTILITY FUNCTIONS
// ============================================

// Debounce function for performance
function debounce(func, wait = 20, immediate = true) {
  let timeout;
  return function() {
    const context = this, args = arguments;
    const later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

// Check if element is in viewport
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}
