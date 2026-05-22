/* ============================================================
   TECRUBEMIZ.JS — ASR Development Consulting Group
   Təcrübəmiz Səhifəsi JavaScript
   GSAP Animations + Table Filters + Pagination + Theme + Mobile Nav
   ============================================================ */

(function() {
  'use strict';

  /* ═══════════════════════════════════════════════════════════════
     1. GSAP ANIMATIONS with ScrollTrigger
     ═══════════════════════════════════════════════════════════════ */
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    gsap.utils.toArray('[data-gsap="fade-up"]').forEach(function(el) {
      var delay = parseFloat(el.getAttribute('data-delay')) || 0;
      gsap.fromTo(el,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          delay: delay,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            toggleActions: 'play none none none',
            once: true
          }
        }
      );
    });

    gsap.utils.toArray('.cases-grid').forEach(function(grid) {
      gsap.fromTo(grid.querySelectorAll('.case-card'),
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: grid,
            start: 'top 85%',
            toggleActions: 'play none none none',
            once: true
          }
        }
      );
    });

    gsap.fromTo('.clients-stats-bar',
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.clients-stats-bar',
          start: 'top 90%',
          toggleActions: 'play none none none',
          once: true
        }
      }
    );

    gsap.fromTo('.cta-inner',
      { opacity: 0, y: 30, scale: 0.97 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.cta-section',
          start: 'top 85%',
          toggleActions: 'play none none none',
          once: true
        }
      }
    );
  }

  /* ═══════════════════════════════════════════════════════════════
     2. TABLE SEARCH, FILTER & PAGINATION
     ═══════════════════════════════════════════════════════════════ */
  var searchInput  = document.getElementById('clientSearch');
  var filterBtns   = document.querySelectorAll('.filter-btn');
  var allRows      = Array.from(document.querySelectorAll('#clientsTable tbody tr'));
  var clientCount  = document.getElementById('clientCount');
  var paginationEl = document.querySelector('.table-pagination');

  var ROWS_PER_PAGE = 5;
  var currentFilter = 'all';
  var currentSearch = '';
  var currentPage   = 1;

  /* ── Filtrə uyğun cərgələri tap ── */
  function getFilteredRows() {
    return allRows.filter(function(row) {
      var category = row.getAttribute('data-category') || '';
      var nameEl   = row.querySelector('.col-name strong');
      var subEl    = row.querySelector('.client-sub');
      var name     = nameEl ? nameEl.textContent.toLowerCase() : '';
      var sub      = subEl  ? subEl.textContent.toLowerCase()  : '';

      var matchesFilter = currentFilter === 'all' || category === currentFilter;
      var matchesSearch = !currentSearch ||
                          name.indexOf(currentSearch) > -1 ||
                          sub.indexOf(currentSearch)  > -1;
      return matchesFilter && matchesSearch;
    });
  }

  /* ── Pagination düymələrini yenilə ── */
  function renderPagination(totalRows) {
    if (!paginationEl) return;

    var totalPages = Math.max(1, Math.ceil(totalRows / ROWS_PER_PAGE));

    /* Əgər currentPage artıq mövcud deyilsə, 1-ə qayıt */
    if (currentPage > totalPages) currentPage = 1;

    paginationEl.innerHTML = '';

    /* ← Əvvəlki düyməsi */
    var prevBtn = document.createElement('button');
    prevBtn.className = 'page-btn' + (currentPage === 1 ? ' disabled' : '');
    prevBtn.setAttribute('aria-label', 'Əvvəlki');
    prevBtn.innerHTML = '<i class="fa-solid fa-chevron-left"></i>';
    if (currentPage > 1) {
      prevBtn.addEventListener('click', function() {
        currentPage--;
        applyTable();
      });
    }
    paginationEl.appendChild(prevBtn);

    /* Səhifə nömrəsi düymələri */
    for (var p = 1; p <= totalPages; p++) {
      (function(page) {
        var btn = document.createElement('button');
        btn.className = 'page-btn' + (page === currentPage ? ' active' : '');
        btn.textContent = page;
        btn.addEventListener('click', function() {
          currentPage = page;
          applyTable();
        });
        paginationEl.appendChild(btn);
      })(p);
    }

    /* → Növbəti düyməsi */
    var nextBtn = document.createElement('button');
    nextBtn.className = 'page-btn' + (currentPage === totalPages ? ' disabled' : '');
    nextBtn.setAttribute('aria-label', 'Növbəti');
    nextBtn.innerHTML = '<i class="fa-solid fa-chevron-right"></i>';
    if (currentPage < totalPages) {
      nextBtn.addEventListener('click', function() {
        currentPage++;
        applyTable();
      });
    }
    paginationEl.appendChild(nextBtn);
  }

  /* ── Cədvəli tətbiq et ── */
  function applyTable() {
    var filtered = getFilteredRows();
    var total    = filtered.length;

    /* Bütün sətirləri gizlət */
    allRows.forEach(function(r) { r.style.display = 'none'; });

    /* Cari səhifəyə uyğun sətirləri göstər */
    var start = (currentPage - 1) * ROWS_PER_PAGE;
    var end   = start + ROWS_PER_PAGE;
    var pageRows = filtered.slice(start, end);

    pageRows.forEach(function(row) {
      row.style.display = '';
      if (typeof gsap !== 'undefined') {
        gsap.fromTo(row, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' });
      }
    });

    /* Sayğac */
    if (clientCount) {
      clientCount.textContent = total;
    }

    /* Pagination yenilə */
    renderPagination(total);
  }

  /* ── Axtarış ── */
  if (searchInput) {
    searchInput.addEventListener('input', function() {
      currentSearch = this.value.toLowerCase().trim();
      currentPage   = 1;
      applyTable();
    });
  }

  /* ── Filter düymələri ── */
  filterBtns.forEach(function(btn) {
    btn.addEventListener('click', function() {
      filterBtns.forEach(function(b) { b.classList.remove('active'); });
      this.classList.add('active');
      currentFilter = this.getAttribute('data-filter');
      currentPage   = 1;
      applyTable();
    });
  });

  /* ── İlk yüklənmə ── */
  applyTable();

  /* ═══════════════════════════════════════════════════════════════
     3. MOBILE NAVIGATION
     ═══════════════════════════════════════════════════════════════ */
  var mobileToggle = document.getElementById('mobileToggle');
  var mobileNav    = document.getElementById('mobileNav');

  if (mobileToggle && mobileNav) {
    mobileToggle.addEventListener('click', function() {
      mobileNav.classList.toggle('open');
      mobileToggle.classList.toggle('open');
      var isOpen = mobileNav.classList.contains('open');
      mobileToggle.setAttribute('aria-expanded', String(isOpen));
    });
  }

  document.querySelectorAll('.mobile-chevron-btn.has-dropdown').forEach(function(btn) {
    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      var row    = btn.closest('.mobile-nav-item');
      var sub    = row ? row.querySelector('.mobile-sub') : null;
      var isOpen = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!isOpen));
      if (sub) {
        sub.classList.toggle('open', !isOpen);
        sub.style.maxHeight = !isOpen ? (sub.scrollHeight + 'px') : '0';
      }
    });
  });

  /* ═══════════════════════════════════════════════════════════════
     4. NAVBAR SCROLL EFFECT
     ═══════════════════════════════════════════════════════════════ */
  var navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', function() {
      navbar.classList.toggle('scrolled', window.scrollY > 50);
    });
  }

  /* ═══════════════════════════════════════════════════════════════
     5. THEME SWITCH
     ═══════════════════════════════════════════════════════════════ */
  var themeSwitch = document.getElementById('theme-switch');
  if (themeSwitch) {
    var saved = localStorage.getItem('theme');
    if (saved === 'dark') {
      document.body.classList.add('dark-mode');
    }
    themeSwitch.addEventListener('click', function() {
      document.body.classList.toggle('dark-mode');
      var isDark = document.body.classList.contains('dark-mode');
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
  }

  /* ═══════════════════════════════════════════════════════════════
     6. BACK TO TOP
     ═══════════════════════════════════════════════════════════════ */
  window.scrollToTop = function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  window.addEventListener('scroll', function() {
    var btn = document.getElementById('backToTop');
    if (btn) {
      btn.classList.toggle('show', window.scrollY > 400);
    }
  });

  /* ═══════════════════════════════════════════════════════════════
     7. FOOTER YEAR
     ═══════════════════════════════════════════════════════════════ */
  var footerYear = document.getElementById('footer-year');
  if (footerYear) {
    footerYear.textContent = new Date().getFullYear();
  }

  /* ═══════════════════════════════════════════════════════════════
     8. SMOOTH SCROLL for anchor links
     ═══════════════════════════════════════════════════════════════ */
  document.querySelectorAll('a[href^="#"]').forEach(function(link) {
    link.addEventListener('click', function(e) {
      var href = this.getAttribute('href');
      if (href === '#') return;
      var target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        var offset = navbar ? navbar.offsetHeight : 80;
        var top    = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

})();
