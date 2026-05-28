document.addEventListener('DOMContentLoaded', function() {
  // Footer ili yenilə
  var yearEl = document.getElementById('footer-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // =========================================
  // ACCORDION
  // =========================================
  var headers = document.querySelectorAll('.sector-accordion-header');

  headers.forEach(function(header) {
    header.addEventListener('click', function() {
      var item = this.closest('.sector-accordion-item');
      var body = item.querySelector('.sector-accordion-body');
      var isOpen = item.classList.contains('is-open');

      // Bütün digərlərini bağla
      document.querySelectorAll('.sector-accordion-item').forEach(function(otherItem) {
        if (otherItem !== item) {
          otherItem.classList.remove('is-open');
          otherItem.querySelector('.sector-accordion-header').setAttribute('aria-expanded', 'false');
          var otherBody = otherItem.querySelector('.sector-accordion-body');
          if (otherBody) otherBody.style.maxHeight = null;
        }
      });

      // Cari elementi aç/bağla
      if (isOpen) {
        item.classList.remove('is-open');
        this.setAttribute('aria-expanded', 'false');
        if (body) body.style.maxHeight = null;
      } else {
        item.classList.add('is-open');
        this.setAttribute('aria-expanded', 'true');
        if (body) body.style.maxHeight = body.scrollHeight + 60 + 'px';
      }
    });
  });

  // =========================================
  // EXPERTS CAROUSEL (eyni turizm.js strukturu)
  // =========================================
  var track = document.querySelector('.experts-track');
  var trackOuter = document.querySelector('.experts-track-outer');
  var prevBtn = document.querySelector('.exp-prev');
  var nextBtn = document.querySelector('.exp-next');
  var dotsContainer = document.querySelector('.exp-dots');

  if (!track) return;

  var cards = Array.from(track.querySelectorAll('.exp-card'));
  var currentIndex = 0;
  var cardsPerPage = 3;

  function getCardsPerPage() {
    if (window.innerWidth < 640) return 1;
    if (window.innerWidth < 1024) return 2;
    return 3;
  }

  function getTotalPages() {
    return Math.ceil(cards.length / getCardsPerPage());
  }

  function updateCarousel() {
    cardsPerPage = getCardsPerPage();
    var totalPages = getTotalPages();
    if (currentIndex >= totalPages) currentIndex = totalPages - 1;

    var cardWidth = cards[0] ? cards[0].offsetWidth : 0;
    var gap = 24;
    var offset = currentIndex * cardsPerPage * (cardWidth + gap);
    track.style.transform = 'translateX(-' + offset + 'px)';

    // Dots
    if (dotsContainer) {
      dotsContainer.innerHTML = '';
      for (var i = 0; i < totalPages; i++) {
        var dot = document.createElement('button');
        dot.className = 'exp-dot' + (i === currentIndex ? ' active' : '');
        dot.setAttribute('aria-label', (i + 1) + '-ci səhifə');
        dot.addEventListener('click', (function(idx) {
          return function() {
            currentIndex = idx;
            updateCarousel();
          };
        })(i));
        dotsContainer.appendChild(dot);
      }
    }

    if (prevBtn) prevBtn.disabled = currentIndex === 0;
    if (nextBtn) nextBtn.disabled = currentIndex >= totalPages - 1;
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', function() {
      if (currentIndex > 0) { currentIndex--; updateCarousel(); }
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', function() {
      if (currentIndex < getTotalPages() - 1) { currentIndex++; updateCarousel(); }
    });
  }

  window.addEventListener('resize', function() { updateCarousel(); });
  updateCarousel();
});
