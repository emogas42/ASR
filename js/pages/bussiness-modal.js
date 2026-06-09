// ESC ilə bağlama
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    document.querySelectorAll('.pm-overlay.open').forEach(function (m) {
      m.classList.remove('open');
    });
  }
});

// Modal açılanda səhifə scroll-u dondur, bağlanda bərpa et
// Yalnız modal scroll etsin, səhifə arxa planda qalsın
document.querySelectorAll('.pm-overlay').forEach(function (overlay) {
  new MutationObserver(function () {
    const isOpen = overlay.classList.contains('open');
    
    if (isOpen) {
      // Səhifənin scroll pozisiyasını saxla
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      document.body.dataset.scrollY = scrollY;
      
      // Body-ni fiksə et (fixed position ilə)
      document.body.style.position = 'fixed';
      document.body.style.top = '-' + scrollY + 'px';
      document.body.style.left = '0';
      document.body.style.right = '0';
      document.body.style.width = '100%';
      
      // Modalın özü scroll etsin
      overlay.style.overflow = 'auto';
      overlay.style.position = 'fixed';
      overlay.style.top = '0';
      overlay.style.left = '0';
      overlay.style.right = '0';
      overlay.style.bottom = '0';
      overlay.style.zIndex = '9999';
    } else {
      // Body-ni bərpa et
      const scrollY = document.body.dataset.scrollY || '0';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
      
      // Keçmiş scroll pozisiyasına qayıt
      window.scrollTo(0, parseInt(scrollY || '0'));
      
      // dataset təmizlə
      delete document.body.dataset.scrollY;
    }
  }).observe(overlay, { attributes: true, attributeFilter: ['class'] });
});

