       // ===== TAB SWITCHING =====
        function switchMediaTab(tabName, clickedBtn) {
            document.querySelectorAll('.media-tab').forEach(function (tab) {
                tab.classList.remove('active');
            });
            clickedBtn.classList.add('active');
            document.querySelectorAll('.tab-content').forEach(function (content) {
                content.classList.remove('active');
            });
            var selectedTab = document.getElementById('tab-' + tabName);
            if (selectedTab) {
                selectedTab.classList.add('active');
            }
        }

        // ===== UNIVERSAL CARD TOGGLE - Only the clicked card opens/closes =====
        function toggleCard(cardId) {
            var card = document.getElementById(cardId);
            if (!card) return;

            // Check if this card is currently active
            var isActive = card.classList.contains('active');

            // Close ALL cards EVERYWHERE (complete isolation)
            var allCards = document.querySelectorAll('.news-card');
            for (var i = 0; i < allCards.length; i++) {
                allCards[i].classList.remove('active');
            }

            // If the clicked card wasn't active, open it now
            if (!isActive) {
                card.classList.add('active');
            }
        }

        // ===== MEDIA SCROLL =====
        function scrollMedia(containerId, direction) {
            var container = document.getElementById(containerId + '-scroll');
            if (container) {
                container.scrollBy({
                    left: direction * 340,
                    behavior: 'smooth'
                });
            }
        }

        // ===== FAQ ACCORDION =====
        function toggleFaq(el) {
            var item = el.parentElement;
            var isActive = item.classList.contains('active');
            document.querySelectorAll('.faq-item').forEach(function (i) {
                i.classList.remove('active');
            });
            if (!isActive) {
                item.classList.add('active');
            }
        }

        // ===== ESC to close =====
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') {
                document.querySelectorAll('.news-card').forEach(function (c) {
                    c.classList.remove('active');
                });
                document.querySelectorAll('.faq-item').forEach(function (i) {
                    i.classList.remove('active');
                });
            }
        });
        /* ============================================================
   VIDEO SCROLL CAROUSEL - Dynamic Video Cards
   Replaces static image cards with YouTube video cards
   ============================================================ */

class VideoScrollCarousel {
  constructor() {
    this.videosContainer = document.getElementById('videos-scroll');
    this.videos = [];
    this.init();
  }

  init() {
    this.setupData();
    this.render();
    this.setupScrollButtons();
  }

  // YouTube ID çıxar
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

  // YouTube thumbnail al
  getYouTubeThumbnail(videoId) {
    return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  }

  setupData() {
    // BURADA ÖZ VIDEOLARINI ƏLAVƏ ET
    this.videos = [
      {
        id: 1,
        videoUrl: 'https://www.youtube.com/watch?v=ufq_4iJfKyk',
        title: 'Qida Təhlükəsizliyi',
        date: '5 Fevral 2026'
      },
      {
        id: 2,
        videoUrl: 'https://www.youtube.com/watch?v=XKQtm5E2-I4',
        title: 'Strateji İdarəetmə',
        date: '8 Noyabr 2025'
      },
      {
        id: 3,
        videoUrl: 'https://www.youtube.com/watch?v=6huV36_GivA',
        title: 'Qanunvericilik',
        date: '12 Mart 2026'
      },
      {
        id: 4,
        videoUrl: 'https://www.youtube.com/watch?v=kOgeosI8tNg',
        title: 'Kənd Təsərrüfatı',
        date: '15 May 2026'
      },
      {
        id: 5,
        videoUrl: 'https://www.youtube.com/watch?v=CW9prv_I2Zc',
        title: 'Biznes İnkişafı',
        date: '20 İyul 2026'
      }
    ];
  }

  render() {
    if (!this.videosContainer) return;

    this.videosContainer.innerHTML = '';

    this.videos.forEach((video) => {
      const ytId = this.getYouTubeId(video.videoUrl);
      const thumbnail = ytId ? this.getYouTubeThumbnail(ytId) : 'https://via.placeholder.com/600x400/1a1a2e/ffffff?text=Video';

      const card = document.createElement('div');
      card.className = 'media-item video-item';
      card.innerHTML = `
        <div class="media-thumb" data-video-url="${video.videoUrl}">
          <img src="${thumbnail}" alt="${video.title}">
          <div class="play-overlay"><i class="fas fa-play-circle"></i></div>
        </div>
        <div class="media-info">
          <h4>${video.title}</h4>
          <span><i class="far fa-calendar"></i> ${video.date}</span>
        </div>
      `;

      // Kliklə modal aç - BURADA ƏSAS DƏYİŞİKLİK
      const thumb = card.querySelector('.media-thumb');
      thumb.addEventListener('click', () => {
        this.openVideoModal(video);
      });

      this.videosContainer.appendChild(card);
    });
  }

  // Scroll düymələrini işə sal
  setupScrollButtons() {
    const prevBtn = document.querySelector('.media-scroll-btn.prev');
    const nextBtn = document.querySelector('.media-scroll-btn.next');

    if (prevBtn) {
      prevBtn.onclick = () => this.scrollMedia('videos', -1);
    }
    if (nextBtn) {
      nextBtn.onclick = () => this.scrollMedia('videos', 1);
    }
  }

  // Scroll funksiyası
  scrollMedia(type, direction) {
    const container = document.getElementById(type + '-scroll');
    if (!container) return;

    const scrollAmount = 320; // Bir kartın təxmini eni + gap
    container.scrollBy({
      left: direction * scrollAmount,
      behavior: 'smooth'
    });
  }

  // Video modal aç
  openVideoModal(video) {
    const ytId = this.getYouTubeId(video.videoUrl);
    if (!ytId) {
      console.error('YouTube ID tapılmadı:', video.videoUrl);
      return;
    }

    // Əvvəlki reel modalı varsa onu istifadə et
    const modal = document.getElementById('reelModal');
    const modalIframe = document.getElementById('modalIframe');
    const modalTitle = document.getElementById('modalTitle');
    const modalDesc = document.getElementById('modalDesc');

    if (modal && modalIframe) {
      // Reel modalını istifadə et
      modalIframe.src = `https://www.youtube.com/embed/${ytId}?autoplay=1&rel=0&modestbranding=1`;
      if (modalTitle) modalTitle.textContent = video.title;
      if (modalDesc) modalDesc.textContent = video.date;
      
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    } else {
      // Əgər reel modalı yoxdursa, sadə yeni modal yarat
      this.createSimpleModal(ytId, video.title, video.date);
    }
  }

  // Sadə modal yarat (əgər reel modalı yoxdursa)
  createSimpleModal(videoId, title, date) {
    // Köhnə modalı sil
    const oldModal = document.getElementById('videoModal');
    if (oldModal) oldModal.remove();

    const modal = document.createElement('div');
    modal.id = 'videoModal';
    modal.style.cssText = `
      position: fixed;
      top: 0; left: 0;
      width: 100%; height: 100%;
      background: rgba(0,0,0,0.9);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999;
    `;

    modal.innerHTML = `
      <div style="position: relative; width: 90%; max-width: 800px;">
        <button onclick="document.getElementById('videoModal').remove(); document.body.style.overflow=''" 
          style="position: absolute; top: -40px; right: 0; background: none; border: none; color: white; font-size: 24px; cursor: pointer;">
          <i class="fas fa-times"></i>
        </button>
        <div style="position: relative; padding-bottom: 56.25%;">
          <iframe 
            src="https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1"
            style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none; border-radius: 8px;"
            allow="autoplay; encrypted-media" 
            allowfullscreen>
          </iframe>
        </div>
        <div style="color: white; margin-top: 15px;">
          <h3 style="margin: 0;">${title}</h3>
          <span style="opacity: 0.7;"><i class="far fa-calendar"></i> ${date}</span>
        </div>
      </div>
    `;

    // Xaricə klikləyəndə bağla
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.remove();
        document.body.style.overflow = '';
      }
    });

    // ESC ilə bağla
    const escHandler = (e) => {
      if (e.key === 'Escape') {
        modal.remove();
        document.body.style.overflow = '';
        document.removeEventListener('keydown', escHandler);
      }
    };
    document.addEventListener('keydown', escHandler);

    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
  }
}

// DOM hazır olanda başlat
document.addEventListener('DOMContentLoaded', () => {
  new VideoScrollCarousel();
});