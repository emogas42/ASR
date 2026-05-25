/* ═══════════════════════════════════════════════════════════════════
   XIDMETLER.JS — Qida Təhlükəsizliyi Səhifəsi JavaScript
   ASR Development Consulting Group
   Professional, Clean, Fully Functional
   ═══════════════════════════════════════════════════════════════════ */

(function() {
  'use strict';

  /* ═══════════════════════════════════════════════════════════════
     1. DARK MODE ICONS
     ═══════════════════════════════════════════════════════════════ */
  const sun = '<circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>';
  const moon = '<path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>';

  /* ═══════════════════════════════════════════════════════════════
     2. GSAP ANIMATIONS
     ═══════════════════════════════════════════════════════════════ */
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    // Hero entrance animation
    const tl = gsap.timeline({ delay: 0.2 });
    tl.from('#heroBadge', { opacity: 0, y: 20, duration: 0.6, ease: 'power3.out' })
      .from('#heroEyebrow', { opacity: 0, y: 16, duration: 0.5, ease: 'power3.out' }, '-=.3')
      .from('#heroTitle', { opacity: 0, y: 24, duration: 0.7, ease: 'power3.out' }, '-=.35')
      .from('#heroDesc', { opacity: 0, y: 18, duration: 0.6, ease: 'power3.out' }, '-=.45')
      .from('#heroCta', { opacity: 0, y: 14, duration: 0.5, ease: 'power3.out' }, '-=.35')
      .from('#heroVisual .hero-stat-card', { opacity: 0, x: 30, duration: 0.5, ease: 'power3.out', stagger: 0.15 }, '-=.4');

    // Reveal animations for sections
    gsap.utils.toArray('.reveal').forEach(function(el) {
      gsap.fromTo(el,
        { opacity: 0, y: 32 },
        {
          opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' }
        }
      );
    });
  }

  /* ═══════════════════════════════════════════════════════════════
     3. FOOTER YEAR
     ═══════════════════════════════════════════════════════════════ */
  const footerYear = document.getElementById('footer-year');
  if (footerYear) {
    footerYear.textContent = new Date().getFullYear();
  }

  /* ═══════════════════════════════════════════════════════════════
     4. BACK TO TOP
     ═══════════════════════════════════════════════════════════════ */
  window.scrollToTop = function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  window.addEventListener('scroll', function() {
    const btn = document.getElementById('backToTop');
    if (btn) {
      if (window.scrollY > 400) {
        btn.classList.add('visible');
      } else {
        btn.classList.remove('visible');
      }
    }
  });

  /* ═══════════════════════════════════════════════════════════════
     5. MOBILE NAVIGATION
     ═══════════════════════════════════════════════════════════════ */
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileNav = document.getElementById('mobileNav');

  if (mobileToggle && mobileNav) {
    mobileToggle.addEventListener('click', function() {
      mobileNav.classList.toggle('open');
      mobileToggle.classList.toggle('open');
      const isOpen = mobileNav.classList.contains('open');
      mobileToggle.setAttribute('aria-expanded', String(isOpen));
    });
  }

  // Mobile sub-menus
  document.querySelectorAll('.mobile-chevron-btn.has-dropdown').forEach(function(btn) {
    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      const row = btn.closest('.mobile-nav-item');
      const sub = row ? row.querySelector('.mobile-sub') : null;
      const isOpen = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!isOpen));
      if (sub) {
        sub.classList.toggle('open', !isOpen);
        sub.style.maxHeight = !isOpen ? (sub.scrollHeight + 'px') : '0';
      }
    });
  });

  /* ═══════════════════════════════════════════════════════════════
     6. NAVBAR SCROLL EFFECT
     ═══════════════════════════════════════════════════════════════ */
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', function() {
      navbar.classList.toggle('scrolled', window.scrollY > 50);
    });
  }

  /* ═══════════════════════════════════════════════════════════════
     7. THEME SWITCH
     ═══════════════════════════════════════════════════════════════ */
  const themeSwitch = document.getElementById('theme-switch');
  if (themeSwitch) {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark') {
      document.body.classList.add('dark-mode');
    }
    themeSwitch.addEventListener('click', function() {
      document.body.classList.toggle('dark-mode');
      const isDark = document.body.classList.contains('dark-mode');
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
  }

  /* ═══════════════════════════════════════════════════════════════
     8. EXPERT CAROUSEL — FULLY FUNCTIONAL
     ═══════════════════════════════════════════════════════════════ */
  (function() {
    // Find the section with expert cards
    var allSections = document.querySelectorAll('#komanda');
    var section = null;
    allSections.forEach(function(s) {
      if (s.querySelector('.exp-card')) section = s;
    });
    if (!section) return;

    var expTrack = section.querySelector('.experts-track');
    var expOuter = section.querySelector('.experts-track-outer');
    var expDots  = section.querySelector('.exp-dots');
    var expPrev  = section.querySelector('.exp-prev');
    var expNext  = section.querySelector('.exp-next');

    if (!expTrack || !expOuter) return;

    var expCards   = Array.from(expTrack.querySelectorAll('.exp-card'));
    var expCurrent = 0;
    var expTimer   = null;
    var isDragging = false;
    var startX = 0;
    var scrollLeft = 0;

    function expPerView() {
      var w = window.innerWidth;
      if (w <= 640)  return 1;
      if (w <= 1024) return 2;
      return 3;
    }

    function expTotal() {
      return Math.max(1, Math.ceil(expCards.length / expPerView()));
    }

    function expBuildDots() {
      if (!expDots) return;
      expDots.innerHTML = '';
      var tot = expTotal();
      for (var i = 0; i < tot; i++) {
        (function(idx) {
          var d = document.createElement('button');
          d.className = 'exp-dot' + (idx === expCurrent ? ' active' : '');
          d.setAttribute('aria-label', 'Səhifə ' + (idx + 1));
          d.setAttribute('type', 'button');
          d.addEventListener('click', function() {
            expGoTo(idx);
            expRestart();
          });
          expDots.appendChild(d);
        })(i);
      }
    }

    function expGoTo(idx) {
      var pv  = expPerView();
      var tot = expTotal();
      expCurrent = ((idx % tot) + tot) % tot;

      var gap = 24;
      var outerWidth = expOuter.offsetWidth;
      var cardW = (outerWidth - (pv - 1) * gap) / pv;
      var translateX = expCurrent * (cardW + gap);

      expTrack.style.transform = 'translateX(-' + translateX + 'px)';

      if (expDots) {
        var dots = expDots.querySelectorAll('.exp-dot');
        dots.forEach(function(d, i) {
          d.classList.toggle('active', i === expCurrent);
        });
      }

      // Update arrow visibility
      if (expPrev) {
        expPrev.style.opacity = expCurrent === 0 ? '0.4' : '1';
        expPrev.style.pointerEvents = expCurrent === 0 ? 'none' : 'auto';
      }
      if (expNext) {
        expNext.style.opacity = expCurrent >= tot - 1 ? '0.4' : '1';
        expNext.style.pointerEvents = expCurrent >= tot - 1 ? 'none' : 'auto';
      }
    }

    function expRestart() {
      clearInterval(expTimer);
      expTimer = setInterval(function() {
        expGoTo(expCurrent + 1);
      }, 5000);
    }

    function expStop() {
      clearInterval(expTimer);
    }

    // Arrow buttons
    if (expPrev) {
      expPrev.addEventListener('click', function() {
        if (expCurrent > 0) {
          expGoTo(expCurrent - 1);
          expRestart();
        }
      });
    }

    if (expNext) {
      expNext.addEventListener('click', function() {
        if (expCurrent < expTotal() - 1) {
          expGoTo(expCurrent + 1);
          expRestart();
        }
      });
    }

    // Touch/Swipe support
    var touchStartX = 0;
    var touchEndX = 0;

    expOuter.addEventListener('touchstart', function(e) {
      touchStartX = e.touches[0].clientX;
      expStop();
    }, { passive: true });

    expOuter.addEventListener('touchend', function(e) {
      touchEndX = e.changedTouches[0].clientX;
      var diff = touchStartX - touchEndX;
      var threshold = 50;

      if (Math.abs(diff) > threshold) {
        if (diff > 0 && expCurrent < expTotal() - 1) {
          expGoTo(expCurrent + 1);
        } else if (diff < 0 && expCurrent > 0) {
          expGoTo(expCurrent - 1);
        }
      }
      expRestart();
    }, { passive: true });

    // Mouse drag support
    expOuter.addEventListener('mousedown', function(e) {
      isDragging = true;
      startX = e.pageX;
      expStop();
      expOuter.style.cursor = 'grabbing';
    });

    document.addEventListener('mouseup', function() {
      if (isDragging) {
        isDragging = false;
        expOuter.style.cursor = '';
        expRestart();
      }
    });

    document.addEventListener('mousemove', function(e) {
      if (!isDragging) return;
      e.preventDefault();
      var diff = startX - e.pageX;
      if (Math.abs(diff) > 80) {
        if (diff > 0 && expCurrent < expTotal() - 1) {
          expGoTo(expCurrent + 1);
        } else if (diff < 0 && expCurrent > 0) {
          expGoTo(expCurrent - 1);
        }
        isDragging = false;
        expOuter.style.cursor = '';
      }
    });

    // Resize handler
    var expResizeT;
    window.addEventListener('resize', function() {
      clearTimeout(expResizeT);
      expResizeT = setTimeout(function() {
        expBuildDots();
        expGoTo(expCurrent);
      }, 200);
    });

    // Pause on hover
    expOuter.addEventListener('mouseenter', expStop);
    expOuter.addEventListener('mouseleave', expRestart);

    // Initialize
    expBuildDots();
    expGoTo(0);
    expRestart();
  })();

  /* ═══════════════════════════════════════════════════════════════
     9. ACCORDION — PROCESS STEPS
     THE KEY FIX: Proper initialization with grid-template-rows
     ═══════════════════════════════════════════════════════════════ */
  (function() {
    var processGrid = document.querySelector('.process-grid');
    if (!processGrid) return;

    var steps = Array.from(processGrid.querySelectorAll('.process-step'));
    if (!steps.length) return;

    // Transform HTML structure for accordion
    steps.forEach(function(step) {
      // Skip if already transformed
      if (step.querySelector('.process-step-header')) return;

      var numEl   = step.querySelector('.process-step-num');
      var iconEl  = step.querySelector('.process-step-icon');
      var titleEl = step.querySelector('.process-step-title');
      var descEl  = step.querySelector('.process-step-desc');

      if (!titleEl || !descEl) return;

      // Create chevron
      var chevron = document.createElement('span');
      chevron.className = 'process-step-chevron';
      chevron.innerHTML = '<i class="fa-solid fa-chevron-down"></i>';
      chevron.setAttribute('aria-hidden', 'true');

      // Create header
      var header = document.createElement('div');
      header.className = 'process-step-header';
      if (iconEl) header.appendChild(iconEl);
      header.appendChild(titleEl);
      header.appendChild(chevron);

      // Create panel wrapper (needed for grid animation)
      var panelInner = document.createElement('div');
      panelInner.appendChild(descEl);

      var panel = document.createElement('div');
      panel.className = 'process-step-panel';
      panel.appendChild(panelInner);

      // Create body
      var body = document.createElement('div');
      body.className = 'process-step-body';
      body.appendChild(header);
      body.appendChild(panel);

      // Clear and rebuild
      while (step.firstChild) step.removeChild(step.firstChild);
      if (numEl) step.appendChild(numEl);
      step.appendChild(body);

      // Accessibility
      step.setAttribute('role', 'button');
      step.setAttribute('aria-expanded', 'false');
      step.setAttribute('tabindex', '0');
    });

    // Re-query after transformation
    steps = Array.from(processGrid.querySelectorAll('.process-step'));

    function openStep(step) {
      step.classList.add('ps-open');
      step.setAttribute('aria-expanded', 'true');
    }

    function closeStep(step) {
      step.classList.remove('ps-open');
      step.setAttribute('aria-expanded', 'false');
    }

    function toggleStep(step) {
      var isOpen = step.classList.contains('ps-open');
      steps.forEach(function(s) {
        if (s !== step) closeStep(s);
      });
      isOpen ? closeStep(step) : openStep(step);
    }

    steps.forEach(function(step) {
      step.addEventListener('click', function(e) {
        // Don't toggle if clicking a link inside
        if (e.target.closest('a')) return;
        toggleStep(step);
      });

      step.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggleStep(step);
        }
      });
    });

    // Open first step by default
    if (steps.length > 0) {
      openStep(steps[0]);
    }

    // Kill GSAP animations on process steps to avoid conflicts
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      ScrollTrigger.getAll().forEach(function(st) {
        var el = st.trigger;
        if (el && el.classList && el.classList.contains('process-step')) {
          st.kill();
          gsap.set(el, { clearProps: 'all' });
        }
      });
    }

    // Simple fade-in for process steps
    steps.forEach(function(step, i) {
      step.style.opacity = '0';
      step.style.transform = 'translateY(20px)';
      step.style.transition = 'opacity 0.6s ease, transform 0.6s ease';

      var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            setTimeout(function() {
              step.style.opacity = '1';
              step.style.transform = 'translateY(0)';
            }, i * 100);
            observer.unobserve(step);
          }
        });
      }, { threshold: 0.1 });

      observer.observe(step);
    });
  })();

})();
// Tab switching
const tabBtns = document.querySelectorAll('.tab-btn');
const panels = document.querySelectorAll('.service-panel');

tabBtns.forEach(btn => {
  btn.addEventListener('click', function() {
    const targetId = this.getAttribute('data-target');
    tabBtns.forEach(b => b.classList.remove('active'));
    this.classList.add('active');
    panels.forEach(p => p.classList.remove('active'));
    const targetPanel = document.getElementById(targetId);
    if (targetPanel) {
      targetPanel.classList.add('active');
      targetPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ═══════════════════════════════════════════════════════════════
   MODAL SYSTEM - Xidmət Kartları üçün Tam Modal İdarəetmə
   ═══════════════════════════════════════════════════════════════ */

// ── Modal Açma ─────────────────────────────────────────────────
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (!modal) {
    console.error('Modal tapılmadı:', modalId);
    return;
  }

  // Scroll pozisiyasını saxla (səhifəni sabit saxlamaq üçün)
  const scrollY = window.scrollY || window.pageYOffset;
  document.body.style.position = 'fixed';
  document.body.style.top = '-' + scrollY + 'px';
  document.body.style.left = '0';
  document.body.style.right = '0';
  document.body.style.width = '100%';
  document.body.dataset.scrollY = scrollY;

  // Modalı göstər
  modal.classList.add('active');
  document.body.classList.add('modal-open');

  // Modal container scroll position reset
  const container = modal.querySelector('.modal-container');
  if (container) {
    container.scrollTop = 0;
  }

  // Focus trap üçün
  const focusableElements = modal.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  if (focusableElements.length > 0) {
    focusableElements[0].focus();
  }

  // Escape ilə bağlama
  document.addEventListener('keydown', handleEscape);
}

// ── Modal Bağlama ────────────────────────────────────────────────
function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (!modal) return;

  // Modalı gizlət
  modal.classList.remove('active');
  document.body.classList.remove('modal-open');

  // Səhifə scrollunu bərpa et
  const scrollY = document.body.dataset.scrollY || '0';
  document.body.style.position = '';
  document.body.style.top = '';
  document.body.style.left = '';
  document.body.style.right = '';
  document.body.style.width = '';
  window.scrollTo(0, parseInt(scrollY || '0'));
  delete document.body.dataset.scrollY;

  // Escape listener sil
  document.removeEventListener('keydown', handleEscape);
}

// ── Escape Handler ───────────────────────────────────────────────
function handleEscape(e) {
  if (e.key === 'Escape') {
    const activeModal = document.querySelector('.modal-overlay.active');
    if (activeModal) {
      closeModal(activeModal.id);
    }
  }
}

// ── Overlay Click ilə Bağlama ────────────────────────────────────
function initOverlayClick() {
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', function(e) {
      // Sadece overlay-e click olunubsa bağla (container-e yox)
      if (e.target === this) {
        closeModal(this.id);
      }
    });
  });
}

// ── Kart Click Event-ləri ────────────────────────────────────────
function initFeatureCards() {
  const cards = document.querySelectorAll('.feature-card[data-modal]');

  cards.forEach(card => {
    // Cursor pointer əlavə et
    card.style.cursor = 'pointer';

    card.addEventListener('click', function(e) {
      const modalId = this.dataset.modal;
      if (modalId) {
        openModal(modalId);
      }
    });

    // Hover effekti
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-8px)';
    });

    card.addEventListener('mouseleave', function() {
      this.style.transform = '';
    });
  });
}

// ── Accordion (Mstep) Toggle ─────────────────────────────────────
function toggleMstep(element) {
  // Bütün qardaş elementləri bağla (accordion davranışı - optional)
  // Əgər bir açılırsa digərləri bağlansın istəyirsinizsə aşağıdakı kodu aktiv edin
  /*
  const parent = element.closest('.modal-steps');
  if (parent) {
    parent.querySelectorAll('.mstep.ms-open').forEach(openStep => {
      if (openStep !== element) {
        openStep.classList.remove('ms-open');
      }
    });
  }
  */

  // Click olunan elementi toggle et
  element.classList.toggle('ms-open');
}

// ── Scrollbar Width Hesablama (padding-right fix) ────────────────
function getScrollbarWidth() {
  const outer = document.createElement('div');
  outer.style.visibility = 'hidden';
  outer.style.overflow = 'scroll';
  outer.style.msOverflowStyle = 'scrollbar';
  document.body.appendChild(outer);

  const inner = document.createElement('div');
  outer.appendChild(inner);

  const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;
  outer.parentNode.removeChild(outer);

  return scrollbarWidth;
}

// ── CSS Dəyişənləri Yoxlama və Təyin Et ──────────────────────────
function initCSSVariables() {
  const root = document.documentElement;

  // Əgər CSS dəyişənləri təyin olunmayıbsa default dəyərlər
  const defaults = {
    '--bg-card': '#ffffff',
    '--bg-secondary': '#f8fafc',
    '--border': '#e2e8f0',
    '--text': '#334155',
    '--text-muted': '#64748b',
    '--heading': '#0f172a',
    '--gold': '#c8922a',
    '--navy': '#1b4280',
    '--haqqimizda-title': '#e8e4dc'
  };

  Object.entries(defaults).forEach(([key, value]) => {
    const current = getComputedStyle(root).getPropertyValue(key).trim();
    if (!current) {
      root.style.setProperty(key, value);
    }
  });

  // Scrollbar width dəyişəni
  const sbWidth = getScrollbarWidth();
  root.style.setProperty('--scrollbar-width', sbWidth + 'px');
}

// ── Responsive Düzəlişlər ─────────────────────────────────────────
function initResponsiveFixes() {
  // Mobil cihazlarda viewport height düzəlişi
  function setVH() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', vh + 'px');
  }

  setVH();
  window.addEventListener('resize', setVH);

  // iOS Safari bottom bar problemi üçün
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  if (isIOS) {
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
      overlay.style.paddingBottom = 'env(safe-area-inset-bottom, 20px)';
    });
  }
}

// ── Z-Index Düzəlişləri ──────────────────────────────────────────
function fixZIndex() {
  // Navbar z-index-ini yoxla və modal-dan aşağı sal
  const navbar = document.querySelector('nav, .navbar, header, .header');
  if (navbar) {
    const navZIndex = parseInt(window.getComputedStyle(navbar).zIndex) || 100;
    if (navZIndex >= 9000) {
      navbar.style.zIndex = '8999';
    }
  }

  // Modal overlay-lərin z-index-ini təmin et
  document.querySelectorAll('.modal-overlay').forEach((modal, index) => {
    modal.style.zIndex = (9000 + index).toString();
  });
}

// ── İnitializasiya ───────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', function() {
  initCSSVariables();
  initFeatureCards();
  initOverlayClick();
  initResponsiveFixes();
  fixZIndex();

  // Close button event listener-ləri (onclick attribute alternativi)
  document.querySelectorAll('.modal-close').forEach(btn => {
    // onclick attribute varsa, event listener əlavə et
    const overlay = btn.closest('.modal-overlay');
    if (overlay && !btn.onclick) {
      btn.addEventListener('click', function() {
        closeModal(overlay.id);
      });
    }
  });

  console.log('✅ Modal sistemi aktivləşdirildi');
});



/* ═══════════════════════════════════════════════════════════════
   10. CUSTOMERS TABLE CAROUSEL — MOBILE MODE
   ═══════════════════════════════════════════════════════════════ */
(function() {
  'use strict';

  // Get all table rows from the desktop table
  var tableRows = document.querySelectorAll('.clients-table tbody tr');
  if (!tableRows.length) return;

  var carouselTrack = document.getElementById('customersCarouselTrack');
  var customersPrev = document.getElementById('customersPrev');
  var customersNext = document.getElementById('customersNext');
  var customersDots = document.getElementById('customersDots');

  if (!carouselTrack) return;

  var currentIndex = 0;
  var autoplayTimer = null;

  // Build carousel cards from table rows
  function buildCarouselCards() {
    carouselTrack.innerHTML = '';
    tableRows.forEach(function(row) {
      var card = createCardFromRow(row);
      carouselTrack.appendChild(card);
    });
  }

  // Create a card element from a table row
  function createCardFromRow(row) {
    var card = document.createElement('div');
    card.className = 'customer-card';

    var logoCell = row.querySelector('.col-logo img');
    var nameCell = row.querySelector('.col-name strong');
    var subCell = row.querySelector('.client-sub');
    var sectorCell = row.querySelector('.col-sector .sector-badge');
    var servicesCell = row.querySelector('.col-services .service-tags-row');
    var statusCell = row.querySelector('.col-status .status-badge');

    var logoSrc = logoCell ? logoCell.src : '';
    var name = nameCell ? nameCell.textContent : '';
    var sub = subCell ? subCell.textContent : '';
    var sector = sectorCell ? sectorCell.textContent : '';
    var sectorClass = sectorCell ? sectorCell.className : '';

    card.innerHTML = `
      <div class="customer-card-header">
        <div class="customer-card-logo">
          ${logoSrc ? '<img src="' + logoSrc + '" alt="' + name + '" loading="lazy" />' : ''}
        </div>
        <div class="customer-card-name">
          <strong>${name}</strong>
          ${sub ? '<span class="customer-card-sub">' + sub + '</span>' : ''}
        </div>
      </div>

      <div class="customer-card-content">
        <div class="customer-card-row">
          <div class="customer-card-label">Sektor</div>
          <div class="customer-card-value">
            <span class="${sectorClass}">${sector}</span>
          </div>
        </div>

        <div class="customer-card-row">
          <div class="customer-card-label">Xidmətlər</div>
          <div class="customer-card-value">
            ${servicesCell ? servicesCell.innerHTML : ''}
          </div>
        </div>

        <div class="customer-card-row">
          <div class="customer-card-label">Status</div>
          <div class="customer-card-value">
            ${statusCell ? statusCell.outerHTML : ''}
          </div>
        </div>
      </div>
    `;

    return card;
  }

  // Build dots
  function buildDots() {
    customersDots.innerHTML = '';
    var totalCards = tableRows.length;

    for (var i = 0; i < totalCards; i++) {
      (function(idx) {
        var dot = document.createElement('button');
        dot.className = 'carousel-dot' + (idx === currentIndex ? ' active' : '');
        dot.setAttribute('type', 'button');
        dot.setAttribute('aria-label', 'Kart ' + (idx + 1));
        dot.addEventListener('click', function() {
          goToCard(idx);
          restartAutoplay();
        });
        customersDots.appendChild(dot);
      })(i);
    }
  }

  // Go to specific card
  function goToCard(idx) {
    var totalCards = tableRows.length;
    currentIndex = ((idx % totalCards) + totalCards) % totalCards;

    var track = carouselTrack;
    var cards = track.querySelectorAll('.customer-card');
    if (!cards.length) return;

    var cardWidth = cards[0].offsetWidth;
    var gap = parseFloat(window.getComputedStyle(track).gap) || 20;
    var translateX = currentIndex * (cardWidth + gap);

    track.style.transform = 'translateX(-' + translateX + 'px)';

    // Update dots
    var dots = customersDots.querySelectorAll('.carousel-dot');
    dots.forEach(function(d, i) {
      d.classList.toggle('active', i === currentIndex);
    });

    // Update arrow states
    updateArrowStates();
  }

  // Update arrow visibility
  function updateArrowStates() {
    var totalCards = tableRows.length;
    if (customersPrev) {
      customersPrev.disabled = currentIndex === 0;
      customersPrev.style.opacity = currentIndex === 0 ? '0.4' : '1';
    }
    if (customersNext) {
      customersNext.disabled = currentIndex >= totalCards - 1;
      customersNext.style.opacity = currentIndex >= totalCards - 1 ? '0.4' : '1';
    }
  }

  // Autoplay
  function autoplay() {
    var totalCards = tableRows.length;
    if (currentIndex < totalCards - 1) {
      goToCard(currentIndex + 1);
    } else {
      goToCard(0);
    }
  }

  function startAutoplay() {
    clearInterval(autoplayTimer);
    autoplayTimer = setInterval(autoplay, 5000);
  }

  function stopAutoplay() {
    clearInterval(autoplayTimer);
  }

  function restartAutoplay() {
    stopAutoplay();
    startAutoplay();
  }

  // Arrow button events
  if (customersPrev) {
    customersPrev.addEventListener('click', function() {
      if (currentIndex > 0) {
        goToCard(currentIndex - 1);
        restartAutoplay();
      }
    });
  }

  if (customersNext) {
    customersNext.addEventListener('click', function() {
      if (currentIndex < tableRows.length - 1) {
        goToCard(currentIndex + 1);
        restartAutoplay();
      }
    });
  }

  // Touch/Swipe support
  var touchStartX = 0;
  var touchEndX = 0;

  carouselTrack.addEventListener('touchstart', function(e) {
    touchStartX = e.touches[0].clientX;
    stopAutoplay();
  }, { passive: true });

  carouselTrack.addEventListener('touchend', function(e) {
    touchEndX = e.changedTouches[0].clientX;
    var diff = touchStartX - touchEndX;
    var threshold = 50;

    if (Math.abs(diff) > threshold) {
      if (diff > 0 && currentIndex < tableRows.length - 1) {
        goToCard(currentIndex + 1);
      } else if (diff < 0 && currentIndex > 0) {
        goToCard(currentIndex - 1);
      }
    }
    restartAutoplay();
  }, { passive: true });

  // Pause on hover
  if (carouselTrack.parentElement) {
    carouselTrack.parentElement.addEventListener('mouseenter', stopAutoplay);
    carouselTrack.parentElement.addEventListener('mouseleave', restartAutoplay);
  }

  // Resize handler
  var resizeTimer;
  window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
      goToCard(currentIndex);
    }, 200);
  });

  // Initialize
  buildCarouselCards();
  buildDots();
  goToCard(0);
  startAutoplay();
})();
  const aqroData = [
    {
      title: "Bitki Sağlamlığı və Aqronomluq Xidmətləri",
      desc: "Məhsulun istehsalından ixracına qədər olan bütün mərhələlərdə təhlükəsizliyi təmin etmək, zərərvericilərin yayılmasının qarşısını almaq və beynəlxalq bazarlara çıxışı asanlaşdırmaq.",
      icon: "fa-solid fa-seedling",
      items: [
        { title: "Vegetasiya dövründə sahələrin monitorinqi və nəzarət", desc: "Bitki inkişafının mütəmadi izlənilməsi və risklərin vaxtında müəyyən olunması təmin edilir." },
        { title: "Zərərvericilər və bitki xəstəliklərinin diaqnostikası", desc: "Xəstəlik və zərərvericilərə qarşı effektiv və təhlükəsiz mübarizə tədbirləri hazırlanır." },
        { title: "Gübrələmə və bitki qidalanma planları", desc: "Bitkinin inkişaf mərhələlərinə uyğun qidalanma proqramları tərtib olunur." },
        { title: "İnteqrir zərərverici idarəetmə (IPM)", desc: "Kimyəvi və bioloji metodların balanslı tətbiqi ilə davamlı mühafizə sistemi qurulur." },
        { title: "Pestisidlərin təhlükəsiz istifadəsi", desc: "Pestisidlərin norma və təhlükəsizlik tələblərinə uyğun tətbiqi təmin edilir." },
        { title: "Fermerlər üçün aqronomik konsultasiya", desc: "Fermerlərə istehsal prosesində texniki və praktiki dəstək göstərilir." },
        { title: "Aqronomluq xidmətlərinin outsoursinqi", desc: "Müəssisələr üçün peşəkar aqronom xidmətlərinin tam idarə olunması həyata keçirilir." },
        { title: "Qalıq maddə (MRL) tələblərinə uyğunluq", desc: "Məhsulların beynəlxalq qalıq maddə limitlərinə uyğunluğu yoxlanılır." },
        { title: "Risk analizi və təhlükə qiymətləndirilməsi", desc: "Fitosanitar risklər analiz edilərək qabaqlayıcı tədbirlər müəyyən olunur." },
        { title: "GLOBALG.A.P sertifikat dəstəyi", desc: "Beynəlxalq kənd təsərrüfatı standartlarına uyğun sertifikatlaşdırma prosesi təşkil edilir." }
      ]
    },
    {
      title: "İxrac üzrə Xidmətlər",
      desc: "Hədəf bazarların tələblərinin öyrənilməsindən ixrac sertifikatlarının alınmasına qədər tam dəstək.",
      icon: "fa-solid fa-plane-departure",
      items: [
        { title: "İdxalçı ölkə tələblərinin araşdırılması", desc: "Hədəf ölkələrin qanunvericilik və texniki tələbləri analiz olunur." },
        // { title: "İxracatçı qeydiyyatı və təsdiq dəstəyi", desc: "Şirkətin xarici bazarda qeydiyyat və təsdiq prosedurlarına dəstək göstərilir." },
        // { title: "Məhsul qeydiyyatı dəstəyi", desc: "Məhsul qeydiyyatı üçün tələb olunan sənədləşmə və proses idarə olunur." },
        { title: "Məhsul müayinəsi və uyğunluq yoxlanışı", desc: "Məhsulun laborator və texniki uyğunluq göstəriciləri əvvəlcədən qiymətləndirilir." },
        { title: "Fitosanitar audit və sənədləşmə", desc: "Təsərrüfatların fitosanitar standartlara uyğunluğu yoxlanılır və sənədləşdirilir." },
        { title: "İxrac sertifikatlarının alınması və müraciətlərin idarəsi", desc: "İxrac üçün tələb olunan rəsmi müraciət və sertifikatlaşdırma prosesi həyata keçirilir." }
      ]
    },
    {
      title: "Pestisid və Gübrə Qeydiyyatı",
      desc: "Texniki dosyelərdən etiket uyğunluğuna qədər qeydiyyat proseslərinin tam idarə edilməsi.",
      icon: "fa-solid fa-flask",
      items: [
        { title: "Texniki dosyelərin hazırlanması", desc: "Qeydiyyat üçün tələb olunan texniki sənədlər hazırlanır." },
        { title: "Qeydiyyat prosesinin idarə olunması", desc: "Məhsulların ilkin və yenilənmiş qeydiyyat prosedurları icra olunur." },
        { title: "Sənədlərin yenilənməsi", desc: "Qüvvədə olan sənədlərdə tələb olunan dəyişikliklər həyata keçirilir." }
      ]
    },
    {
      title: "HACCP Sistemi",
      desc: "Qida təhlükəsizliyi risklərinin idarə olunması, sanitariya planları və beynəlxalq standartlara uyğun sənədləşmə.",
      icon: "fa-solid fa-shield-virus",
      items: [
        { title: "HACCP sisteminin qurulması", desc: "Qida təhlükəsizliyi risklərinin idarə olunması sistemi yaradılır." },
        { title: "Risk analizi və CCP müəyyən edilməsi", desc: "İstehsal prosesində risk yaradan nöqtələr müəyyən edilir və nəzarətə götürülür." },
        { title: "Sanitariya və gigiyena planları", desc: "Gigiyena və sanitariya qaydalarına uyğun prosedurlar hazırlanır." },
        { title: "HACCP və qida təhlükəsizliyi təlimləri", desc: "Personal üçün praktiki və nəzəri təlimlər təşkil olunur." },
        { title: "Daxili audit və monitorinq", desc: "Müəssisədaxili nəzarət və yoxlama mexanizmləri formalaşdırılır." },
        { title: "Beynəlxalq standartlara uyğun sənədləşmə", desc: "Sənədləşmə beynəlxalq qida təhlükəsizliyi standartlarına uyğun hazırlanır." }
      ]
    },
    {
      title: "İzlənmə Sistemi Xidmətləri",
      desc: "Məhsulun bütün mərhələlər üzrə izlənilməsi, geri çağırma prosedurları və audit mexanizmləri.",
      icon: "fa-solid fa-barcode",
      items: [
        { title: "Məhsul izlənəbilirlik sistemi", desc: "Məhsulun bütün mərhələlər üzrə izlənilməsi təmin edilir." },
        { title: "Partiya və kodlaşdırma sistemləri", desc: "Məhsullar üçün kodlaşdırma və partiya idarəetmə sistemi qurulur." },
        { title: "Tədarük zəncirinin sənədləşdirilməsi", desc: "Tədarük və istehsal mərhələlərinin tam qeydiyyatı aparılır." },
        { title: "Geri çağırma prosedurları", desc: "Riskli məhsulların bazardan operativ geri çağırılması sistemi hazırlanır." },
        { title: "Qeydiyyat və nəzarət formaları", desc: "İzləmə və nəzarət üçün standart formalar hazırlanır." },
        { title: "Elektron və manual izləmə", desc: "Müəssisəyə uyğun izləmə sistemi tətbiq edilir." },
        { title: "Audit və monitorinq mexanizmləri", desc: "Daimi nəzarət və uyğunluq yoxlama prosedurları yaradılır." }
      ]
    },
     {
      title: "GLOBALG.A.P. Sertifikat Dəstəyi",
      desc: "GLOBALG.A.P. — kənd təsərrüfatı məhsullarının beynəlxalq bazarlara çıxışı üçün tələb olunan \"vizadır\". 1997-ci ildə Avropanın aparıcı pərakəndə satış şəbəkələri tərəfindən yaradılmış (əvvəlcə EUREPGAP adı ilə), 2007-ci ildə qlobal miqyasda yenidən brendlənmiş bu standart bu gün 80-dən çox ölkədə 100-dən artıq akkreditə edilmiş qurum tərəfindən tətbiq edilir. ASR Development bu prosesi — ilkin boşluq analizindən müvəffəqiyyətli auditə qədər — tam idarə edir.",
      icon: "fa-solid fa-certificate",
      extraInfo: [
        { label: "Yaranma ili", val: "1997 (EUREPGAP → 2007 GLOBALG.A.P.)" },
        { label: "Əhatə",       val: "80+ ölkə, 100+ akkreditə qurumu" },
        { label: "Əsas bazarlar", val: "AB, Böyük Britaniya, ABŞ, Asiyanın böyük bazarları" },
        { label: "Audit növü",  val: "İllik məcburi + gözlənilməz yoxlama" }
      ],
      items: [
        {
          title: "Boşluq analizi (Gap Analysis)",
          desc: "Müəssisənin mövcud vəziyyəti GLOBALG.A.P. tələbləri ilə müqayisə edilir, uyğunsuzluqlar müəyyən olunur."
        },
        {
          title: "Sənədləşmə və sistem qurulması",
          desc: "Pestisid jurnalı, gübrə planı, izlənəbilirlik qeydləri, risk qiymətləndirmə formaları hazırlanır."
        },
        {
          title: "Daxili audit (Pre-audit)",
          desc: "Rəsmi auditdən əvvəl bütün nəzarət nöqtələri (Control Points) yoxlanılır, kritik qüsurlar aradan qaldırılır."
        },

        {
          title: "Sertifikat alınması və GGN nömrəsi",
          desc: "Uğurlu auditin ardından GLOBALG.A.P. Number (GGN) verilir — beynəlxalq bazarlarda məhsulun tanınmasını təmin edir."
        },
        {
          title: "İllik yenilənmə dəstəyi",
          desc: "Sertifikatın saxlanılması üçün illik audit hazırlığı, standart yeniləmələrinin izlənməsi davam etdirilir."
        }
      ]
    }
   
  ];

  let aqroScrollY = 0;

  function aqroOpenModal(i) {
    const d = aqroData[i];
    const overlay = document.getElementById('aqroModalOverlay');
    aqroScrollY = window.scrollY || window.pageYOffset;

    document.getElementById('aqroModalIcon').innerHTML = `<i class="${d.icon}"></i>`;
    document.getElementById('aqroModalTitle').textContent = d.title;
    document.getElementById('aqroModalDesc').textContent = d.desc;
    document.getElementById('aqroModalItems').innerHTML = d.items.map(item => `
      <div class="aqro-modal-item">
        <div class="aqro-modal-item-marker"><i class="fa-solid fa-check"></i></div>
        <div class="aqro-modal-item-content">
          <div class="aqro-modal-item-title">${item.title}</div>
          <div class="aqro-modal-item-desc">${item.desc}</div>
        </div>
      </div>
    `).join('');

    document.body.style.position = 'fixed';
    document.body.style.top = `-${aqroScrollY}px`;
    document.body.style.width = '100%';
    document.body.style.overflow = 'hidden';
    overlay.classList.add('active');
  }

  function aqroCloseModal(e) {
    if (e && e.target !== e.currentTarget) return;
    document.getElementById('aqroModalOverlay').classList.remove('active');
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
    document.body.style.overflow = '';
    window.scrollTo(0, aqroScrollY);
  }

  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') aqroCloseModal(); });

  /* ============================================================
   LAYIHELER-KATALOG.JS — ASR Development Consulting Group
   Qanunvericilik Layihələri Kataloqu
   Accordion + Filter + Search + Pagination (5/page, 20 total)
   ============================================================ */
 
(function () {
  'use strict';
 
  /* ── Konfiqurasiya ── */
  var ITEMS_PER_PAGE = 5;
 
  /* ── DOM elementləri ── */
  var accordion    = document.getElementById('katAccordion');
  var filterBtns   = document.querySelectorAll('.kat-filter-btn');
  var searchInput  = document.getElementById('katSearch');
  var paginationEl = document.getElementById('katPagination');
  var countNum     = document.getElementById('katCountNum');
  var resultsInfo  = document.getElementById('katResultsInfo');
  var emptyState   = document.getElementById('katEmpty');
 
  if (!accordion) return;
 
  /* ── Bütün accordion kartlarını al ── */
  var allCards = Array.from(accordion.querySelectorAll('.kat-card'));
 
  /* ── State ── */
  var state = {
    filter: 'all',
    search: '',
    page: 1
  };
 
  /* ═══════════════════════════════════════════════════════════
     1. FİLTR + AXTARIŞ
     ═══════════════════════════════════════════════════════════ */
  function getFilteredCards() {
    return allCards.filter(function (card) {
      var category = card.getAttribute('data-category') || '';
      var text     = (card.querySelector('.kat-card-title') || {}).textContent || '';
      var desc     = (card.querySelector('.kat-card-desc')  || {}).textContent || '';
 
      var matchCat    = state.filter === 'all' || category === state.filter;
      var matchSearch = !state.search ||
        text.toLowerCase().indexOf(state.search) > -1 ||
        desc.toLowerCase().indexOf(state.search) > -1;
 
      return matchCat && matchSearch;
    });
  }
 
  /* ═══════════════════════════════════════════════════════════
     2. PAGİNATİON RENDER
     ═══════════════════════════════════════════════════════════ */
  function renderPagination(total) {
    if (!paginationEl) return;
 
    var totalPages = Math.max(1, Math.ceil(total / ITEMS_PER_PAGE));
    if (state.page > totalPages) state.page = totalPages;
 
    paginationEl.innerHTML = '';
 
    /* ← Əvvəlki */
    var prevBtn = document.createElement('button');
    prevBtn.className = 'kat-page-btn' + (state.page === 1 ? ' kat-page-disabled' : '');
    prevBtn.setAttribute('aria-label', 'Əvvəlki səhifə');
    prevBtn.innerHTML = '<i class="fa-solid fa-chevron-left"></i>';
    if (state.page > 1) {
      prevBtn.addEventListener('click', function () {
        state.page--;
        render();
        scrollToSection();
      });
    }
    paginationEl.appendChild(prevBtn);
 
    /* Səhifə nömrələri — smart window */
    var win = buildPageWindow(totalPages, state.page);
    var prev = null;
    win.forEach(function (p) {
      if (prev !== null && p - prev > 1) {
        var dots = document.createElement('span');
        dots.className = 'kat-page-dots';
        dots.textContent = '…';
        paginationEl.appendChild(dots);
      }
      (function (page) {
        var btn = document.createElement('button');
        btn.className = 'kat-page-btn' + (page === state.page ? ' kat-page-active' : '');
        btn.textContent = page;
        btn.setAttribute('aria-label', page + '. səhifə');
        if (page === state.page) btn.setAttribute('aria-current', 'page');
        btn.addEventListener('click', function () {
          state.page = page;
          render();
          scrollToSection();
        });
        paginationEl.appendChild(btn);
      })(p);
      prev = p;
    });
 
    /* → Növbəti */
    var nextBtn = document.createElement('button');
    nextBtn.className = 'kat-page-btn' + (state.page === totalPages ? ' kat-page-disabled' : '');
    nextBtn.setAttribute('aria-label', 'Növbəti səhifə');
    nextBtn.innerHTML = '<i class="fa-solid fa-chevron-right"></i>';
    if (state.page < totalPages) {
      nextBtn.addEventListener('click', function () {
        state.page++;
        render();
        scrollToSection();
      });
    }
    paginationEl.appendChild(nextBtn);
  }
 
  /* Smart page window: always show 1, last, ±1 around current */
  function buildPageWindow(total, current) {
    var set = {};
    [1, total, current - 1, current, current + 1].forEach(function (p) {
      if (p >= 1 && p <= total) set[p] = true;
    });
    return Object.keys(set).map(Number).sort(function (a, b) { return a - b; });
  }
 
  /* ═══════════════════════════════════════════════════════════
     3. ANA RENDER
     ═══════════════════════════════════════════════════════════ */
  function render() {
    var filtered = getFilteredCards();
    var total    = filtered.length;
    var start    = (state.page - 1) * ITEMS_PER_PAGE;
    var end      = start + ITEMS_PER_PAGE;
 
    /* Bütün kartları gizlət */
    allCards.forEach(function (c) { c.classList.add('kat-hidden'); });
 
    /* Cari səhifə kartlarını göstər */
    var pageCards = filtered.slice(start, end);
    pageCards.forEach(function (card, i) {
      card.classList.remove('kat-hidden');
      /* GSAP varsa gözəl fade-in */
      if (typeof gsap !== 'undefined') {
        gsap.fromTo(card,
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.35, delay: i * 0.07, ease: 'power2.out' }
        );
      }
    });
 
    /* Boş hal */
    if (emptyState) {
      emptyState.classList.toggle('show', total === 0);
    }
 
    /* Sayğac */
    if (countNum) countNum.textContent = total;
 
    /* Alt məlumat */
    if (resultsInfo) {
      var showing = Math.min(end, total) - start;
      if (total === 0) {
        resultsInfo.innerHTML = '<strong>0</strong> nəticə tapıldı';
      } else {
        resultsInfo.innerHTML =
          '<strong>' + (start + 1) + '–' + Math.min(end, total) + '</strong>' +
          ' / <strong>' + total + '</strong> layihə';
      }
    }
 
    /* Pagination */
    renderPagination(total);
  }
 
  /* Kataloq section-a yumşaq scroll */
  function scrollToSection() {
    var section = document.getElementById('katalog');
    if (!section) return;
    var nav    = document.getElementById('navbar');
    var offset = nav ? nav.offsetHeight + 20 : 90;
    var top    = section.getBoundingClientRect().top + window.pageYOffset - offset;
    window.scrollTo({ top: top, behavior: 'smooth' });
  }
 
  /* ═══════════════════════════════════════════════════════════
     4. ACCORDION OPEN / CLOSE
     ═══════════════════════════════════════════════════════════ */
  allCards.forEach(function (card) {
    var header = card.querySelector('.kat-card-header');
    var body   = card.querySelector('.kat-card-body');
 
    if (!header || !body) return;
 
    header.addEventListener('click', function () {
      var isOpen = card.classList.contains('kat-open');
 
      /* Digər açıqları bağla */
      allCards.forEach(function (c) {
        if (c !== card && c.classList.contains('kat-open')) {
          c.classList.remove('kat-open');
          var b = c.querySelector('.kat-card-body');
          var h = c.querySelector('.kat-card-header');
          if (b) b.style.maxHeight = '0';
          if (h) h.setAttribute('aria-expanded', 'false');
        }
      });
 
      /* Cari kartı toggle et */
      if (isOpen) {
        card.classList.remove('kat-open');
        body.style.maxHeight = '0';
        header.setAttribute('aria-expanded', 'false');
      } else {
        card.classList.add('kat-open');
        body.style.maxHeight = body.scrollHeight + 'px';
        header.setAttribute('aria-expanded', 'true');
 
        /* Açılan kartı görünüşə gətir */
        setTimeout(function () {
          var nav    = document.getElementById('navbar');
          var offset = nav ? nav.offsetHeight + 12 : 80;
          var top    = card.getBoundingClientRect().top + window.pageYOffset - offset;
          if (card.getBoundingClientRect().top < offset) {
            window.scrollTo({ top: top, behavior: 'smooth' });
          }
        }, 100);
      }
    });
  });
 
  /* ═══════════════════════════════════════════════════════════
     5. FİLTR DÜYMƏLƏRİ
     ═══════════════════════════════════════════════════════════ */
  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      filterBtns.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      state.filter = btn.getAttribute('data-filter') || 'all';
      state.page   = 1;
      /* Açıq accordion-ları bağla */
      allCards.forEach(function (c) {
        c.classList.remove('kat-open');
        var b = c.querySelector('.kat-card-body');
        if (b) b.style.maxHeight = '0';
      });
      render();
    });
  });
 
  /* ═══════════════════════════════════════════════════════════
     6. AXTARIŞ
     ═══════════════════════════════════════════════════════════ */
  if (searchInput) {
    searchInput.addEventListener('input', function () {
      state.search = this.value.toLowerCase().trim();
      state.page   = 1;
      render();
    });
    /* ESC ilə təmizlə */
    searchInput.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        searchInput.value = '';
        state.search = '';
        state.page   = 1;
        render();
      }
    });
  }
 
  /* ═══════════════════════════════════════════════════════════
     7. İLK YÜKLƏNMƏ + GSAP ScrollTrigger
     ═══════════════════════════════════════════════════════════ */
  render();
 
  /* GSAP fade-up animasiya (əgər mövcuddursa) */
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.fromTo('.katalog-header',
      { opacity: 0, y: 28 },
      {
        opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
        scrollTrigger: {
          trigger: '#katalog',
          start: 'top 88%',
          toggleActions: 'play none none none',
          once: true
        }
      }
    );
    gsap.fromTo('.katalog-toolbar',
      { opacity: 0, y: 18 },
      {
        opacity: 1, y: 0, duration: 0.55, delay: 0.15, ease: 'power3.out',
        scrollTrigger: {
          trigger: '#katalog',
          start: 'top 85%',
          toggleActions: 'play none none none',
          once: true
        }
      }
    );
  }
 
})();
