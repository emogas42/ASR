/* ============================================
   SECTORS DETAIL PAGE — JavaScript
   ASR Development Consulting Group
   Vanilla JS, no dependencies
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
  initSectorNavigation();
  initScrollSpy();
  initSmoothScroll();
});

/**
 * Initialize sector navigation sidebar
 * Handles click events on sidebar links and active state management
 */
function initSectorNavigation() {
  const sidebarLinks = document.querySelectorAll('.sidebar-link');

  sidebarLinks.forEach(function(link) {
    link.addEventListener('click', function(e) {
      e.preventDefault();

      const targetId = this.getAttribute('href');
      const targetCard = document.querySelector(targetId);

      if (targetCard) {
        // Update active state
        sidebarLinks.forEach(function(l) { l.classList.remove('active'); });
        this.classList.add('active');

        // Smooth scroll to target
        const navbarHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--navbar-h')) || 80;
        const offsetTop = targetCard.offsetTop - navbarHeight - 24;

        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });
}

/**
 * Initialize ScrollSpy
 * Automatically updates sidebar active state based on scroll position
 */
function initScrollSpy() {
  const sidebarLinks = document.querySelectorAll('.sidebar-link');
  const sectorCards = document.querySelectorAll('.sector-detail-card');
  const navbarHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--navbar-h')) || 80;

  let ticking = false;

  function updateActiveLink() {
    const scrollPos = window.scrollY + navbarHeight + 100;

    sectorCards.forEach(function(card) {
      const cardTop = card.offsetTop;
      const cardBottom = cardTop + card.offsetHeight;
      const cardId = card.getAttribute('id');

      if (scrollPos >= cardTop && scrollPos < cardBottom) {
        sidebarLinks.forEach(function(link) {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + cardId) {
            link.classList.add('active');
          }
        });
      }
    });

    ticking = false;
  }

  window.addEventListener('scroll', function() {
    if (!ticking) {
      window.requestAnimationFrame(updateActiveLink);
      ticking = true;
    }
  });
}

/**
 * Initialize smooth scroll for all anchor links
 */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement && !this.closest('.sidebar-nav')) {
        e.preventDefault();
        const navbarHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--navbar-h')) || 80;
        const offsetTop = targetElement.offsetTop - navbarHeight - 24;

        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });
}