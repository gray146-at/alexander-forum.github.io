// Alexander Forum – scripts.js (Updated with Dropdown Navigation)

document.addEventListener('DOMContentLoaded', () => {
  
  // ===== STICKY HEADER SCROLL EFFECT =====
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

  // ===== DROPDOWN NAVIGATION =====
  const dropdownToggle = document.querySelector('.nav-dropdown-toggle');
  const dropdownMenu = document.querySelector('.nav-dropdown-menu');
  const navDropdown = document.querySelector('.nav-dropdown');

  if (dropdownToggle && dropdownMenu) {
    // Toggle dropdown on button click
    dropdownToggle.addEventListener('click', (e) => {
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

  // ===== MODAL FOR INSPIRATIONS =====
  const modal = document.getElementById('modal');
  const modalBody = document.getElementById('modal-body');
  const modalClose = document.querySelector('.modal-close');
  const modalTriggers = document.querySelectorAll('[data-target]');

  // Modal content data
  const modalContent = {
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

  // Open modal
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

  // Close modal
  function closeModal() {
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }

  if (modal) {
    // Close on overlay click
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
      }
    });
  }

  // ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      
      // Skip if it's just "#" or modal trigger
      if (href === '#' || this.hasAttribute('data-target')) return;
      
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        
        // Update URL without triggering page jump
        if (history.pushState) {
          history.pushState(null, null, href);
        }
      }
    });
  });

  // ===== ACTIVE NAV HIGHLIGHTING (based on scroll position) =====
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
