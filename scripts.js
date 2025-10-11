// Alexander Forum – scripts.js
// Modal system & Sticky header

document.addEventListener('DOMContentLoaded', function() {
  
  // ==================== MODAL SYSTEM ====================
  const modal = document.getElementById('modal');
  const modalBody = document.getElementById('modal-body');
  const closeBtn = modal ? modal.querySelector('.modal-close') : null;
  
  // Content database for all persons (DE & EN)
  const content = {
    'alexander-great-detail': {
      de: {
        title: 'Alexander der Große – Strategie & Anpassungsfähigkeit',
        html: `
          <p><strong>Kurz:</strong> Brillanter Stratege mit ambivalenter Bilanz: Vernetzung und Wissenszirkulation – aber auch Gewalt und Expansion.</p>
          <p>Lehrreich ist der Umgang mit Unsicherheit: schnelles Entscheiden, Lernen im Feld, kulturelle Übersetzungsarbeit (Verwaltung, Sprachen, Eliten). Genauso lehrreich ist die Grenze: Macht, die nicht reflektiert wird, produziert neue Verwundbarkeit. Resiliente Führung verbindet Mut mit Selbstbegrenzung.</p>
          <h5>Unsere Lektionen</h5>
          <ul>
            <li>Schnell lernen, sauber korrigieren.</li>
            <li>Lokale Kontexte ernst nehmen.</li>
            <li>Ethik-Checks in Strategien einbauen.</li>
          </ul>
        `
      },
      en: {
        title: 'Alexander the Great – Strategy & Adaptability',
        html: `
          <p><strong>Brief:</strong> Brilliant strategist with ambivalent legacy: connectivity and knowledge circulation – but also violence and expansion.</p>
          <p>What's instructive is the handling of uncertainty: quick decision-making, learning in the field, cultural translation work (administration, languages, elites). Equally instructive is the limit: Power that isn't reflected produces new vulnerability. Resilient leadership combines courage with self-limitation.</p>
          <h5>Our Lessons</h5>
          <ul>
            <li>Learn quickly, correct cleanly.</li>
            <li>Take local contexts seriously.</li>
            <li>Build ethics checks into strategies.</li>
          </ul>
        `
      }
    },
    'hypatia-detail': {
      de: {
        title: 'Hypatia von Alexandria – Bildung als Leuchtturm',
        html: `
          <p><strong>Kurz:</strong> Philosophin, Mathematikerin, Lehrerin; Symbol für rationales Denken und Lehrtradition in stürmischen Zeiten.</p>
          <p>Hypatia lehrte in einem der bedeutendsten Wissenszentren der Antike. Ihre Bedeutung liegt weniger in einem einzelnen Werk als in der Praxis: lehren, diskutieren, Methoden weitergeben. In Phasen sozialer Spannung schützt genau das – geteilte Maßstäbe, Fairness im Argument, überprüfbare Gründe – vor dem Abgleiten in Mythos und Gewalt. Bildung wird so zur gesellschaftlichen Resilienzleistung.</p>
          <h5>Unsere Lektionen</h5>
          <ul>
            <li>In Bildung investieren: Sie wirkt langsam, aber nachhaltig.</li>
            <li>Kritikfähig bleiben: Debattenkultur ist Stabilitätskultur.</li>
            <li>Vermitteln statt predigen: Methoden stärken Selbstwirksamkeit.</li>
          </ul>
        `
      },
      en: {
        title: 'Hypatia of Alexandria – Education as Lighthouse',
        html: `
          <p><strong>Brief:</strong> Philosopher, mathematician, teacher; symbol of rational thinking and teaching tradition in turbulent times.</p>
          <p>Hypatia taught in one of antiquity's most important knowledge centers. Her significance lies less in a single work than in practice: teaching, discussing, passing on methods. In phases of social tension, precisely this protects – shared standards, fairness in argument, verifiable reasons – from sliding into myth and violence. Education thus becomes a societal resilience achievement.</p>
          <h5>Our Lessons</h5>
          <ul>
            <li>Invest in education: It works slowly but sustainably.</li>
            <li>Remain capable of criticism: Debate culture is stability culture.</li>
            <li>Mediate rather than preach: Methods strengthen self-efficacy.</li>
          </ul>
        `
      }
    },
    'david-neel-detail': {
      de: {
        title: 'Alexandra David-Néel – Mut an den Rändern',
        html: `
          <p><strong>Kurz:</strong> Reisende, Tibetforscherin, Autorin – ein Beispiel für persönliche Robustheit und kulturelle Offenheit.</p>
          <p>David-Néel vereinte Abenteuer, Askese und präzise Beobachtung. Ihre Grenzgänge – teils verkleidet, oft unter realen Risiken – zeigen, wie innere Ordnung (Rituale, Atem, Fokus) und Respekt gegenüber dem Anderen zu resilientem Handeln führen. Exploration ohne Hybris ist eine Schule der Selbstführung.</p>
          <h5>Unsere Lektionen</h5>
          <ul>
            <li>Selbstführung trainieren (Routine, Atem, Schlaf, Bewegung).</li>
            <li>Neugier kultivieren, Urteile aufschieben.</li>
            <li>Risiko bewerten, Grenzen achten, trotzdem gehen.</li>
          </ul>
        `
      },
      en: {
        title: 'Alexandra David-Néel – Courage at the Margins',
        html: `
          <p><strong>Brief:</strong> Traveler, Tibet researcher, author – an example of personal robustness and cultural openness.</p>
          <p>David-Néel combined adventure, asceticism and precise observation. Her boundary crossings – partly disguised, often under real risks – show how inner order (rituals, breath, focus) and respect for the Other lead to resilient action. Exploration without hubris is a school of self-leadership.</p>
          <h5>Our Lessons</h5>
          <ul>
            <li>Train self-leadership (routine, breath, sleep, movement).</li>
            <li>Cultivate curiosity, suspend judgment.</li>
            <li>Assess risk, respect boundaries, go anyway.</li>
          </ul>
        `
      }
    },
    'kollontai-detail': {
      de: {
        title: 'Alexandra Kollontai – Solidarität gestalten',
        html: `
          <p><strong>Kurz:</strong> Politikerin, Feministin, Diplomatin; eine der ersten Frauen als Ministerin und Botschafterin. Arbeitsschwerpunkt: soziale Rechte, Schutz vor Armut, Teilhabe.</p>
          <p>Kollontai steht für die Einsicht, dass individuelle Resilienz an Grenzen stößt, wenn Strukturen ungerecht sind. Ihre Agenda – Kinderbetreuung, soziale Sicherung, Arbeitnehmerinnenrechte – versteht Resilienz als kollektive Aufgabe. Institutionen, die Care-Arbeit und Verwundbarkeit mitdenken, erhöhen die Krisenrobustheit der ganzen Gesellschaft.</p>
          <h5>Unsere Lektionen</h5>
          <ul>
            <li>Resilienzpolitik ist Sozialpolitik: Absicherung beugt Krisenfolgen vor.</li>
            <li>Institutionen fair machen – so entsteht Vertrauen.</li>
            <li>Hartnäckig verhandeln: Wandel ist ein Prozess, kein Sprint.</li>
          </ul>
        `
      },
      en: {
        title: 'Alexandra Kollontai – Shaping Solidarity',
        html: `
          <p><strong>Brief:</strong> Politician, feminist, diplomat; one of the first women as minister and ambassador. Focus: social rights, protection from poverty, participation.</p>
          <p>Kollontai stands for the insight that individual resilience hits limits when structures are unjust. Her agenda – childcare, social security, workers' rights – understands resilience as a collective task. Institutions that consider care work and vulnerability increase the crisis robustness of the entire society.</p>
          <h5>Our Lessons</h5>
          <ul>
            <li>Resilience policy is social policy: Security prevents crisis consequences.</li>
            <li>Make institutions fair – that's how trust emerges.</li>
            <li>Negotiate persistently: Change is a process, not a sprint.</li>
          </ul>
        `
      }
    },
    'solschenizyn-detail': {
      de: {
        title: 'Alexander Solschenizyn – Wahrheit als Widerstand',
        html: `
          <p><strong>Kurz:</strong> Schriftsteller und Zeuge politischer Gewalt; sein Werk ringt um Sinn, Erinnerung und Verantwortlichkeit.</p>
          <p>Resilienz heißt hier, zerstörte Wirklichkeiten neu zu erzählen. Zeugenschaft schützt vor Verdrängung, Sinn stiftet Richtung, und öffentliche Debatten schaffen Räume für Heilung. Solschenizyn erinnert daran: Ohne Wahrheit bleibt Resilienz Fassade.</p>
          <h5>Unsere Lektionen</h5>
          <ul>
            <li>Erinnerungspolitik ist Gesundheitsprävention.</li>
            <li>Sinnquellen stärken (Werte, Zugehörigkeit, Praxis).</li>
            <li>Zeugenschaft institutionell sichern.</li>
          </ul>
        `
      },
      en: {
        title: 'Alexander Solzhenitsyn – Truth as Resistance',
        html: `
          <p><strong>Brief:</strong> Writer and witness of political violence; his work grapples with meaning, memory and accountability.</p>
          <p>Resilience here means re-narrating destroyed realities. Witnessing protects against repression, meaning provides direction, and public debates create spaces for healing. Solzhenitsyn reminds us: Without truth, resilience remains facade.</p>
          <h5>Our Lessons</h5>
          <ul>
            <li>Memory politics is health prevention.</li>
            <li>Strengthen sources of meaning (values, belonging, practice).</li>
            <li>Secure witnessing institutionally.</li>
          </ul>
        `
      }
    },
    'fleming-detail': {
      de: {
        title: 'Alexander Fleming – Fehler als Fundgrube',
        html: `
          <p><strong>Kurz:</strong> Entdecker des Penicillins; Beispiel für serendipitäre Innovation durch genaue Beobachtung.</p>
          <p>Eine „verpatzte" Petrischale führte zur Entdeckung mit globaler Wirkung. Die Botschaft: Schaffe Bedingungen, in denen Zufall nützlich werden darf – mit Fehlerkultur, schneller Prototypisierung und Brücken zwischen Labor und Anwendung.</p>
          <h5>Unsere Lektionen</h5>
          <ul>
            <li>Fehler sichtbar machen und auswerten.</li>
            <li>Von Beobachtung zu Prototyp – ohne Umwege.</li>
            <li>Wissenschaftliche Demut als Stärke.</li>
          </ul>
        `
      },
      en: {
        title: 'Alexander Fleming – Errors as Goldmine',
        html: `
          <p><strong>Brief:</strong> Discoverer of penicillin; example of serendipitous innovation through careful observation.</p>
          <p>A "botched" Petri dish led to a discovery with global impact. The message: Create conditions in which chance can become useful – with error culture, rapid prototyping and bridges between lab and application.</p>
          <h5>Our Lessons</h5>
          <ul>
            <li>Make errors visible and evaluate them.</li>
            <li>From observation to prototype – without detours.</li>
            <li>Scientific humility as strength.</li>
          </ul>
        `
      }
    },
    'humboldt-detail': {
      de: {
        title: 'Alexander von Humboldt – Vernetzung & Systemdenken',
        html: `
          <p><strong>Kurz:</strong> Naturforscher und Weltdenker; verknüpfte Ökologie, Klima, Daten und Kultur.</p>
          <p>Humboldt zeigt, wie Resilienz jenseits des Individuums gedacht wird: in Ökosystemen, Institutionen und Praktiken. Wer Wechselwirkungen erkennt, vermeidet Kurzschluss-Politik und baut robuste Pfade – wissenschaftlich fundiert, sozial eingebettet, langfristig.</p>
          <h5>Unsere Lektionen</h5>
          <ul>
            <li>Interdisziplinarität institutionalisieren.</li>
            <li>Lokales Handeln mit globalem Blick koppeln.</li>
            <li>Langfristhorizonte gegen reine Effizienzlogik.</li>
          </ul>
        `
      },
      en: {
        title: 'Alexander von Humboldt – Connection & Systems Thinking',
        html: `
          <p><strong>Brief:</strong> Natural scientist and world thinker; connected ecology, climate, data and culture.</p>
          <p>Humboldt shows how resilience is thought beyond the individual: in ecosystems, institutions and practices. Those who recognize interactions avoid short-circuit politics and build robust pathways – scientifically grounded, socially embedded, long-term.</p>
          <h5>Our Lessons</h5>
          <ul>
            <li>Institutionalize interdisciplinarity.</li>
            <li>Couple local action with global perspective.</li>
            <li>Long-term horizons against pure efficiency logic.</li>
          </ul>
        `
      }
    }
  };
  
  // Detect language from HTML lang attribute
  const lang = document.documentElement.lang === 'en' ? 'en' : 'de';
  
  // Find all buttons with data-target
  const buttons = document.querySelectorAll('.btn[data-target]');
  
  if (modal && modalBody && buttons.length > 0) {
    buttons.forEach(button => {
      button.addEventListener('click', function() {
        const targetId = this.getAttribute('data-target');
        const data = content[targetId];
        
        if (data && data[lang]) {
          // Fill modal with correct language
          modalBody.innerHTML = `<h3>${data[lang].title}</h3>${data[lang].html}`;
          // Show modal
          modal.classList.add('active');
          document.body.style.overflow = 'hidden';
        }
      });
    });
    
    // Close modal function
    function closeModal() {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
    
    // Close button
    if (closeBtn) {
      closeBtn.addEventListener('click', closeModal);
    }
    
    // Close on overlay click (outside content)
    modal.addEventListener('click', function(e) {
      if (e.target === modal) {
        closeModal();
      }
    });
    
    // Close with ESC key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
      }
    });
  }
  
  // ==================== STICKY HEADER ====================
  const siteHead = document.querySelector('.site-head');
  
  if (siteHead) {
    window.addEventListener('scroll', function() {
      const currentScroll = window.pageYOffset;
      
      if (currentScroll > 50) {
        siteHead.classList.add('scrolled');
      } else {
        siteHead.classList.remove('scrolled');
      }
    });
  }
  
});
