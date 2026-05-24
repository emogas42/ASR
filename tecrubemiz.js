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


