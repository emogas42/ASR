/* ============================================================
   HORIZONTAL REEL CAROUSEL - JavaScript Controller
   Manages horizontal carousel and full-screen modal
   YouTube iframe embed support + swipe navigation
   ============================================================ */
 
class ReelCarousel {
  constructor() {
    this.currentPosition = 0;
    this.currentModalIndex = 0;
    this.cardWidth = 200;
    this.gap = 12;
    this.isMobile = false;
    this.isAnimating = false;
    this.reelVideos = [];
    this.touchStartY = 0;
    this.touchStartX = 0;
    this.init();
  }
 
  init() {
    this.videosGrid = document.querySelector('.reel-videos-grid');
    this.prevBtn = document.querySelector('.carousel-arrow-prev');
    this.nextBtn = document.querySelector('.carousel-arrow-next');
    this.modal = document.getElementById('reelModal');
    this.modalIframe = document.getElementById('modalIframe');
    this.modalTitle = document.getElementById('modalTitle');
    this.modalDesc = document.getElementById('modalDesc');

    this.navUp = document.querySelector('.reel-nav-up');
    this.navDown = document.querySelector('.reel-nav-down');
 
    if (!this.videosGrid) return;
 
    this.setupData();
    this.render();
    this.setupEventListeners();
    this.updateArrowStates();
  }
 
  // Extract YouTube video ID from various URL formats
  getYouTubeId(url) {
    if (!url) return null;
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
      /youtube\.com\/shorts\/([^&\n?#]+)/
    ];
    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) return match[1];
    }
    return null;
  }
 
  setupData() {
    this.reelVideos = [
      {
        id: 1,
        thumbnail: 'https://img.youtube.com/vi/WZSk9IL6Ryo/hqdefault.jpg',
        video: 'https://www.youtube.com/watch?v=WZSk9IL6Ryo',
        title: 'Qida Təhlükəsizliyi',
        description: 'HACCP və ISO 22000 standartları ilə keyfiyyətin təmin edilməsi'
      },
      {
        id: 2,
         thumbnail: 'https://img.youtube.com/vi/kqY28PYOjJ0/hqdefault.jpg',
        video: 'https://www.youtube.com/watch?v=kqY28PYOjJ0',
      
        title: 'Strateji İdarəetmə',
        description: 'Biznesin inkişafı üçün fərqli yanaşma və stratejik planlar'
      },
      {
        id: 3,
         thumbnail: 'https://img.youtube.com/vi/rCDN9-ppCvQ/hqdefault.jpg',
        video: 'https://www.youtube.com/watch?v=rCDN9-ppCvQ',
        title: 'Qanunvericilik',
        description: 'Dövlət tənzimləməsi və qanunvericilik layihələri hazırlanması'
      },
      {
        id: 4,
       thumbnail: 'https://img.youtube.com/vi/CW9prv_I2Zc/hqdefault.jpg',
        video: 'https://www.youtube.com/watch?v=CW9prv_I2Zc',
        title: 'Kənd Təsərrüfatı',
        description: 'Müasir texnologiyalar ilə kənd təsərrüfatının məhsuldarlığının artırılması'
      },
      {
        id: 5,
        
         thumbnail: 'https://img.youtube.com/vi/ot1OSJTwNhc/hqdefault.jpg',
        video: 'https://www.youtube.com/watch?v=ot1OSJTwNhc',
        title: 'Biznes İnkişafı',
        description: 'Sizin şirkətiniz üçün xüsusi həllər və inkişaf strategiyaları'
      },
      {
        id: 6,
        thumbnail: 'https://img.youtube.com/vi/6huV36_GivA/hqdefault.jpg',
        video: 'https://www.youtube.com/watch?v=6huV36_GivA&t=14s',
        title: 'Ərzaq Sənayesi',
        description: 'Ərzaq sənayesinin keyfiyyətinin yüksəldilməsi və standardlaşdırılması'
      },
      {
        id: 7,
        thumbnail: 'https://img.youtube.com/vi/kOgeosI8tNg/hqdefault.jpg',
        video: 'https://www.youtube.com/watch?v=kOgeosI8tNg',
        title: 'Səhiyyə Xidmətləri',
        description: 'Səhiyyə sisteminin təkmilləşdirilməsi və standartlaşdırılması'
      },
      {
        id: 8,
        thumbnail: 'https://img.youtube.com/vi/hGrT3-8gHhM/hqdefault.jpg',
        video: 'https://www.youtube.com/watch?v=hGrT3-8gHhM',
        title: 'Ticarət Xidmətləri',
        description: 'Ticarət sektorunun inkişafı və beynəlxalq standartlarla uyğunluq'
      },
      {
        id: 9,
        thumbnail: 'https://img.youtube.com/vi/GXHNusVP7sE/hqdefault.jpg',
        video: 'https://www.youtube.com/watch?v=GXHNusVP7sE',
        title: 'Dövlət Əlaqələri',
        description: 'Dövlət qurumları ilə əlaqələrin idarə olunması və əmtəə qeydiyyatı'
      }
    ];
  }
 
  render() {
    this.videosGrid.innerHTML = '';
    
    this.reelVideos.forEach((reel, index) => {
      const card = document.createElement('div');
      card.className = 'reel-card';
      card.innerHTML = `
        <img class="reel-card-image" src="${reel.thumbnail}" alt="${reel.title}" />
        <div class="reel-card-overlay">
          <button class="reel-play-btn" aria-label="Oynat">
            <i class="fas fa-play"></i>
          </button>
        </div>
      `;
      
      card.addEventListener('click', () => this.openModal(index));
      this.videosGrid.appendChild(card);
    });
  }
 
  setupEventListeners() {
    this.prevBtn.addEventListener('click', () => this.scrollPrev());
    this.nextBtn.addEventListener('click', () => this.scrollNext());
    if (this.navUp) this.navUp.addEventListener('click', () => this.scrollPrev());
    if (this.navDown) this.navDown.addEventListener('click', () => this.scrollNext());
 
    // Modal close button
    document.querySelector('.reel-modal-close').addEventListener('click', () => {
      this.closeModal();
    });
 
    // Close modal on outside click (only on the dark background, not the video area)
    this.modal.addEventListener('click', (e) => {
      if (e.target === this.modal) {
        this.closeModal();
      }
    });
 
    // Modal prev/next arrows
    document.querySelector('.reel-modal-prev').addEventListener('click', () => {
      this.navigateModal(-1);
    });
    document.querySelector('.reel-modal-next').addEventListener('click', () => {
      this.navigateModal(1);
    });
 
    // Close on ESC, arrow keys for navigation
    document.addEventListener('keydown', (e) => {
      if (!this.modal.classList.contains('active')) return;
      if (e.key === 'Escape') this.closeModal();
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') this.navigateModal(1);
      if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') this.navigateModal(-1);
    });
 
    // Touch/swipe support on modal
    this.modal.addEventListener('touchstart', (e) => {
      this.touchStartY = e.touches[0].clientY;
      this.touchStartX = e.touches[0].clientX;
    }, { passive: true });
 
    this.modal.addEventListener('touchend', (e) => {
      const deltaY = this.touchStartY - e.changedTouches[0].clientY;
      const deltaX = this.touchStartX - e.changedTouches[0].clientX;
      // Vertical swipe (primary for reels)
      if (Math.abs(deltaY) > Math.abs(deltaX) && Math.abs(deltaY) > 50) {
        if (deltaY > 0) this.navigateModal(1);  // swipe up → next
        else this.navigateModal(-1);             // swipe down → prev
      }
    }, { passive: true });

    // Prevent background scroll while modal is open
    this.modal.addEventListener('touchmove', (e) => {
      e.preventDefault();
    }, { passive: false });
 
    // Responsive card width adjustment
    this.updateCardWidth();
    window.addEventListener('resize', () => {
      const wasMobile = this.isMobile;
      this.updateCardWidth();
      if (wasMobile !== this.isMobile) {
        this.currentPosition = 0;
        if (this.isMobile) { const t = document.querySelector('.reel-carousel-track'); if (t) t.scrollTo({ top: 0, behavior: 'instant' }); } else { this.videosGrid.style.transform = 'translateX(0)'; }
      }
      this.updateArrowStates();
    });

    // Sync currentPosition with native scroll (for scroll-snap on mobile)
    const trackEl = document.querySelector('.reel-carousel-track');
    if (trackEl) {
      trackEl.addEventListener('scroll', () => {
        if (this.isMobile && trackEl.clientHeight > 0) {
          this.currentPosition = Math.round(trackEl.scrollTop / trackEl.clientHeight);
          this.updateArrowStates();
        }
      }, { passive: true });
    }
  }
 
  navigateModal(direction) {
    const newIndex = this.currentModalIndex + direction;
    if (newIndex >= 0 && newIndex < this.reelVideos.length) {
      this.currentModalIndex = newIndex;
      this.loadModalContent(this.reelVideos[newIndex]);
      this.updateModalNavBtns();
    }
  }
 
  updateModalNavBtns() {
    const prevBtn = document.querySelector('.reel-modal-prev');
    const nextBtn = document.querySelector('.reel-modal-next');
    prevBtn.style.opacity = this.currentModalIndex === 0 ? '0.3' : '1';
    nextBtn.style.opacity = this.currentModalIndex === this.reelVideos.length - 1 ? '0.3' : '1';
    prevBtn.disabled = this.currentModalIndex === 0;
    nextBtn.disabled = this.currentModalIndex === this.reelVideos.length - 1;
  }
 
  loadModalContent(reel) {
    const ytId = this.getYouTubeId(reel.video);
    if (ytId) {
      // YouTube embed
      this.modalIframe.src = `https://www.youtube.com/embed/${ytId}?autoplay=1&rel=0&modestbranding=1`;
      this.modalIframe.style.display = 'block';
    } else {
      // Direct video fallback
      this.modalIframe.src = '';
      this.modalIframe.style.display = 'none';
    }
    this.modalTitle.textContent = reel.title;
    this.modalDesc.textContent = reel.description;
 
    // Counter update
    const counter = document.querySelector('.reel-modal-counter');
    if (counter) {
      counter.textContent = `${this.currentModalIndex + 1} / ${this.reelVideos.length}`;
    }
  }
 
  updateCardWidth() {
    const width = window.innerWidth;
    this.isMobile = width <= 768;
    if (width <= 480) {
      this.cardWidth = 120;
      this.gap = 8;
    } else if (width <= 768) {
      this.cardWidth = 140;
      this.gap = 10;
    } else if (width <= 1200) {
      this.cardWidth = 180;
      this.gap = 12;
    } else {
      this.cardWidth = 200;
      this.gap = 12;
    }
  }
 
  scrollPrev() {
    if (this.isAnimating) return;
    if (this.currentPosition > 0) {
      this.currentPosition -= 1;
      this.animate();
    }
  }
 
  scrollNext() {
    if (this.isAnimating) return;
    const maxPosition = this.reelVideos.length - this.getVisibleCards();
    if (this.currentPosition < maxPosition) {
      this.currentPosition += 1;
      this.animate();
    }
  }
 
  getVisibleCards() {
    if (this.isMobile) return 1;
    const track = document.querySelector('.reel-carousel-track');
    const trackWidth = track.clientWidth;
    return Math.floor(trackWidth / (this.cardWidth + this.gap));
  }
 
  animate() {
    this.isAnimating = true;
    if (this.isMobile) {
      const track = document.querySelector('.reel-carousel-track');
      track.scrollTo({ top: this.currentPosition * track.clientHeight, behavior: 'smooth' });
    } else {
      const offset = this.currentPosition * (this.cardWidth + this.gap);
      this.videosGrid.style.transform = `translateX(-${offset}px)`;
    }
    setTimeout(() => {
      this.isAnimating = false;
      this.updateArrowStates();
    }, 500);
  }
 
  updateArrowStates() {
    const maxPosition = this.reelVideos.length - this.getVisibleCards();
    this.prevBtn.disabled = this.currentPosition === 0;
    this.nextBtn.disabled = this.currentPosition >= maxPosition;
    if (this.navUp) this.navUp.disabled = this.currentPosition === 0;
    if (this.navDown) this.navDown.disabled = this.currentPosition >= maxPosition;
  }
 
  openModal(index) {
    this.currentModalIndex = index;
    this.loadModalContent(this.reelVideos[index]);
    this.updateModalNavBtns();
    this._savedScrollY = window.scrollY;
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = '-' + this._savedScrollY + 'px';
    document.body.style.width = '100%';
    this.modal.classList.add('active');
  }
 
  closeModal() {
    this.modal.classList.remove('active');
    document.body.style.overflow = '';
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
    window.scrollTo(0, this._savedScrollY || 0);
    // Stop the iframe by clearing src
    if (this.modalIframe) {
      this.modalIframe.src = '';
    }
  }
}
 
// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new ReelCarousel();
});
