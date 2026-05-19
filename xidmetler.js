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
      var translateX = expCurrent * pv * (cardW + gap);

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