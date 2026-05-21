/* ═══════════════════════════════════════════════════════════════════
   LAYIHƏLƏR.JS — ASR Development Consulting Group
   Lightbox + Accordion — Production Ready
   ═══════════════════════════════════════════════════════════════════ */
 
(function () {
  'use strict';
 
  /* ═══════════════════════════════════════════════════════════════
     1. DATA — Layihə şəkillər kitabxanası
     Hər project üçün şəkillərin tam siyahısını buraya əlavə edin.
     Gələcəkdə yeni layihə əlavə etmək üçün yeni açar əlavə edin.
     ═══════════════════════════════════════════════════════════════ */
  var projectImages = {
    project1: [
      {
        src: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=1400&q=85&auto=format&fit=crop',
        alt: 'Layihə iclas — qanunvericilik islahatları'
      },
      {
        src: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1400&q=85&auto=format&fit=crop',
        alt: 'Sahə sorğusu'
      },
      {
        src: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1400&q=85&auto=format&fit=crop',
        alt: 'Analitik hesabat'
      },
      {
        src: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1400&q=85&auto=format&fit=crop',
        alt: 'Maraqlı tərəflər görüşü'
      },
      {
        src: 'https://images.unsplash.com/photo-1560523159-4a9692d222ef?w=1400&q=85&auto=format&fit=crop',
        alt: 'İcra mərhələsi'
      }
    ],
    project2: [
      {
        src: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=1400&q=85&auto=format&fit=crop',
        alt: 'Strateji planlaşdırma sessiyası'
      },
      {
        src: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1400&q=85&auto=format&fit=crop',
        alt: 'Analitik panel'
      },
      {
        src: 'https://images.unsplash.com/photo-1531545514256-b1400bc00f31?w=1400&q=85&auto=format&fit=crop',
        alt: 'Komanda görüşü'
      },
      {
        src: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1400&q=85&auto=format&fit=crop',
        alt: 'Prezentasiya'
      },
      {
        src: 'https://images.unsplash.com/photo-1434626881859-194d67b2b86f?w=1400&q=85&auto=format&fit=crop',
        alt: 'Sənəd hazırlığı'
      }
    ]
    /* Yeni layihə əlavə etmək üçün:
    project3: [
      { src: 'images/project3/1.jpg', alt: 'Şəkil başlığı' },
      ...
    ]
    */
  };
 
  /* ═══════════════════════════════════════════════════════════════
     2. LIGHTBOX STATE
     ═══════════════════════════════════════════════════════════════ */
  var lb = {
    overlay:    null,
    img:        null,
    counter:    null,
    btnClose:   null,
    btnPrev:    null,
    btnNext:    null,
    images:     [],
    current:    0,
    isOpen:     false,
    transitioning: false
  };
 
  /* ═══════════════════════════════════════════════════════════════
     3. LIGHTBOX — INIT (DOM hazır olduqdan sonra çağırılır)
     ═══════════════════════════════════════════════════════════════ */
  function initLightbox() {
    lb.overlay  = document.getElementById('prjLightbox');
    lb.img      = document.getElementById('prjLbImg');
    lb.counter  = document.getElementById('prjLbCounter');
    lb.btnClose = document.getElementById('prjLbClose');
    lb.btnPrev  = document.getElementById('prjLbPrev');
    lb.btnNext  = document.getElementById('prjLbNext');
 
    if (!lb.overlay) {
      console.warn('Lightbox HTML tapılmadı (#prjLightbox). layiheler.css/html-ni yoxlayın.');
      return;
    }
 
    /* Bağla düyməsi */
    lb.btnClose.addEventListener('click', closeLightbox);
 
    /* Overlay-ə klik (şəkilin özü xaricindəki sahəyə) */
    lb.overlay.addEventListener('click', function (e) {
      if (e.target === lb.overlay || e.target === lb.img.parentElement) {
        closeLightbox();
      }
    });
 
    /* Əvvəlki / Növbəti */
    lb.btnPrev.addEventListener('click', function () { lbNavigate(-1); });
    lb.btnNext.addEventListener('click', function () { lbNavigate(1); });
 
    /* Klaviatura */
    document.addEventListener('keydown', function (e) {
      if (!lb.isOpen) return;
      if (e.key === 'Escape')      { closeLightbox(); }
      if (e.key === 'ArrowLeft')   { lbNavigate(-1); }
      if (e.key === 'ArrowRight')  { lbNavigate(1); }
    });
 
    /* Touch / Swipe dəstəyi */
    var touchStartX = 0;
    lb.overlay.addEventListener('touchstart', function (e) {
      touchStartX = e.touches[0].clientX;
    }, { passive: true });
 
    lb.overlay.addEventListener('touchend', function (e) {
      var diff = touchStartX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) {
        lbNavigate(diff > 0 ? 1 : -1);
      }
    }, { passive: true });
  }
 
  /* ═══════════════════════════════════════════════════════════════
     4. LIGHTBOX — OPEN
     projectKey: 'project1', 'project2', ...
     startIndex: hansı şəkildən başlasın (0-based)
     ═══════════════════════════════════════════════════════════════ */
  function openLightbox(projectKey, startIndex) {
    var images = projectImages[projectKey];
    if (!images || !images.length) {
      console.warn('Layihə şəkilləri tapılmadı:', projectKey);
      return;
    }
    if (!lb.overlay) {
      console.warn('Lightbox init edilməyib.');
      return;
    }
 
    lb.images  = images;
    lb.current = startIndex || 0;
    lb.isOpen  = true;
 
    lbRender(lb.current, false);
 
    lb.overlay.classList.add('lb-open');
    document.body.style.overflow = 'hidden';
 
    /* Focus management */
    lb.btnClose.focus();
  }
 
  /* Qlobal olaraq çağırıla bilsin (HTML onclick="openLightbox(...)" üçün) */
  window.openLightbox = openLightbox;
 
  /* ═══════════════════════════════════════════════════════════════
     5. LIGHTBOX — CLOSE
     ═══════════════════════════════════════════════════════════════ */
  function closeLightbox() {
    if (!lb.isOpen) return;
    lb.overlay.classList.remove('lb-open');
    document.body.style.overflow = '';
    lb.isOpen = false;
  }
 
  /* ═══════════════════════════════════════════════════════════════
     6. LIGHTBOX — NAVİGATE
     ═══════════════════════════════════════════════════════════════ */
  function lbNavigate(direction) {
    if (lb.transitioning) return;
    var next = lb.current + direction;
    if (next < 0 || next >= lb.images.length) return;
    lbRender(next, true);
  }
 
  /* ═══════════════════════════════════════════════════════════════
     7. LIGHTBOX — RENDER IMAGE
     ═══════════════════════════════════════════════════════════════ */
  function lbRender(index, animate) {
    lb.current = index;
    var data = lb.images[index];
 
    if (animate) {
      lb.transitioning = true;
      lb.img.classList.add('lb-transitioning');
 
      setTimeout(function () {
        lb.img.src = data.src;
        lb.img.alt = data.alt || '';
        lb.img.classList.remove('lb-transitioning');
        lb.transitioning = false;
      }, 220);
    } else {
      lb.img.src = data.src;
      lb.img.alt = data.alt || '';
    }
 
    /* Counter */
    lb.counter.textContent = (index + 1) + ' / ' + lb.images.length;
 
    /* Button states */
    lb.btnPrev.disabled = (index === 0);
    lb.btnNext.disabled = (index === lb.images.length - 1);
  }
 
  /* ═══════════════════════════════════════════════════════════════
     8. ACCORDION — toggleAccordion
     HTML: onclick="toggleAccordion(this)"
     ═══════════════════════════════════════════════════════════════ */
  function toggleAccordion(trigger) {
    var item   = trigger.closest('.accordion-item');
    var body   = item ? item.querySelector('.accordion-body') : null;
    if (!item || !body) return;
 
    var isOpen = trigger.getAttribute('aria-expanded') === 'true';
 
    if (isOpen) {
      /* Bağla */
      trigger.setAttribute('aria-expanded', 'false');
      body.classList.remove('open');
    } else {
      /* Aç */
      trigger.setAttribute('aria-expanded', 'true');
      body.classList.add('open');
    }
  }
 
  /* Qlobal olaraq çağırıla bilsin */
  window.toggleAccordion = toggleAccordion;
 
  /* ═══════════════════════════════════════════════════════════════
     9. GALLERY ITEMS — Hər kiçik şəkilə ayrıca tıklama
     ═══════════════════════════════════════════════════════════════ */
  function initGalleryClicks() {
    document.querySelectorAll('.layihe-gallery').forEach(function (gallery) {
      var projectKey = gallery.getAttribute('data-project-key') || null;
      var items      = gallery.querySelectorAll('.layihe-gallery-item');
 
      items.forEach(function (item, idx) {
        item.style.cursor = 'pointer';
        item.addEventListener('click', function (e) {
          e.stopPropagation();
          if (projectKey) {
            openLightbox(projectKey, idx);
          } else {
            /* Fallback: gallerinin data-project atributuna bax */
            var card = gallery.closest('[data-project]');
            var pkey = card ? 'project' + card.getAttribute('data-project') : null;
            if (pkey) openLightbox(pkey, idx);
          }
        });
      });
 
      /* Enter/Space klaviatura dəstəyi */
      gallery.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          var card = gallery.closest('[data-project]');
          var pkey = card ? 'project' + card.getAttribute('data-project') : null;
          if (pkey) openLightbox(pkey, 0);
        }
      });
    });
  }
 
  /* ═══════════════════════════════════════════════════════════════
     10. REVEAL ANIMATION (IntersectionObserver)
     ═══════════════════════════════════════════════════════════════ */
  function initReveal() {
    var cards = document.querySelectorAll('.layihe-card');
    if (!cards.length) return;
 
    if (!('IntersectionObserver' in window)) {
      /* Fallback: hamısını göstər */
      cards.forEach(function (c) {
        c.classList.remove('lp-reveal');
      });
      return;
    }
 
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('lp-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
 
    cards.forEach(function (card, i) {
      card.classList.add('lp-reveal');
      card.style.transitionDelay = (i * 0.12) + 's';
      observer.observe(card);
    });
  }
 
  /* ═══════════════════════════════════════════════════════════════
     11. DOM READY — Hamısını başlat
     ═══════════════════════════════════════════════════════════════ */
  function onReady() {
    initLightbox();
    initGalleryClicks();
    initReveal();
  }
 
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', onReady);
  } else {
    onReady();
  }
 
})();