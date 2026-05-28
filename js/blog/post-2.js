/* ----------------------------------------------------------
   Video Carousel Data & Logic
   ---------------------------------------------------------- */
    const videoData = {
      left: [
        { 
          type: 'youtube',
          videoId: 'RMahE1JsgY8',
          thumb: 'https://img.youtube.com/vi/RMahE1JsgY8/maxresdefault.jpg',
          label: 'AQTA: Uyğunsuzluq aşkarlanan məhsullar dövriyyədən çıxarılıb',
          date: '3 Yanvar 2025'
        }
      ],
      right: [
        { thumb: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&h=225&fit=crop', label: 'Keçid strategiyası praktiki təlim' },
        { thumb: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400&h=225&fit=crop', label: 'Boşluq analizi metodologiyası' },
        { thumb: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=225&fit=crop', label: 'Audit hazırlığı təlimi' }
      ]
    };

    const currentIndex = { left: 0, right: 0 };

    function changeVideo(side, direction) {
      const data = videoData[side];
      if (data.length <= 1) return; // Don't navigate if only 1 video

      currentIndex[side] += direction;
      if (currentIndex[side] < 0) currentIndex[side] = data.length - 1;
      else if (currentIndex[side] >= data.length) currentIndex[side] = 0;
      updateVideoDisplay(side);
    }

    function updateVideoDisplay(side) {
      const data = videoData[side];
      const index = currentIndex[side];
      const cap = side.charAt(0).toUpperCase() + side.slice(1);
      const currentVideo = data[index];

      // Update thumbnail image
      const thumbImg = document.getElementById('videoThumb' + cap);
      if (thumbImg) {
        thumbImg.src = currentVideo.thumb;
        thumbImg.alt = currentVideo.label;
      }

      // Update title
      const label = document.getElementById('videoLabel' + cap);
      if (label) {
        label.textContent = currentVideo.label;
      }

      // Update counter
      const counter = document.getElementById('videoCounter' + cap);
      if (counter) {
        counter.textContent = (index + 1) + ' / ' + data.length;
      }

      // Update dots
      const dots = document.getElementById('videoDots' + cap);
      if (dots) {
        const dotElements = dots.children;
        for (let i = 0; i < dotElements.length; i++) {
          dotElements[i].classList.toggle('active', i === index);
        }
      }
    }

    /* ----------------------------------------------------------
       Video Modal / Lightbox
       ---------------------------------------------------------- */
    function openVideoModal() {
      const data = videoData.left;
      const index = currentIndex.left;
      const currentVideo = data[index];

      if (currentVideo.type === 'youtube') {
        const modalOverlay = document.getElementById('videoModalOverlay');
        const modalFrame = document.getElementById('videoModalFrame');

        // Set YouTube embed URL with autoplay
        modalFrame.src = 'https://www.youtube.com/embed/' + currentVideo.videoId + '?autoplay=1&rel=0';

        // Show modal
        modalOverlay.classList.add('active');

        // Prevent body scroll
        document.body.style.overflow = 'hidden';
      }
    }

    function closeVideoModal() {
      const modalOverlay = document.getElementById('videoModalOverlay');
      const modalFrame = document.getElementById('videoModalFrame');

      // Hide modal
      modalOverlay.classList.remove('active');

      // Stop video by clearing src
      setTimeout(() => {
        modalFrame.src = '';
      }, 400);

      // Restore body scroll
      document.body.style.overflow = '';
    }

    // Close modal on Escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        closeVideoModal();
      }
    });

    /* ----------------------------------------------------------
       ScrollSpy: Active Section Highlighting
       ---------------------------------------------------------- */
    const blogContent = document.getElementById('blogContent');
    const articleSections = document.querySelectorAll('.article-section');
    const tocLinks = document.querySelectorAll('.blog-toc-list a');

    function updateActiveLink() {
      let current = '';
      const scrollPos = blogContent.scrollTop + 160;

      articleSections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (scrollPos >= sectionTop) {
          current = section.getAttribute('id');
        }
      });

      if (!current && articleSections.length > 0) {
        current = articleSections[0].getAttribute('id');
      }

      tocLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
          link.classList.add('active');
        }
      });
    }

    blogContent.addEventListener('scroll', () => {
      updateActiveLink();

      // Navbar scrolled state
      const navbar = document.getElementById('navbar');
      if (blogContent.scrollTop > 10) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }

      // Back to top visibility
      const backToTop = document.getElementById('backToTop');
      if (blogContent.scrollTop > 600) {
        backToTop.classList.add('show');
      } else {
        backToTop.classList.remove('show');
      }
    });

    // Smooth scroll for TOC links
    tocLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
          blogContent.scrollTo({
            top: targetSection.offsetTop - 20,
            behavior: 'smooth'
          });
        }
      });
    });

    updateActiveLink();

    /* ----------------------------------------------------------
       Theme Switcher
       ---------------------------------------------------------- */
    document.getElementById('theme-switch').addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
    });

    /* ----------------------------------------------------------
       Back to Top
       ---------------------------------------------------------- */
    document.getElementById('backToTop').addEventListener('click', () => {
      blogContent.scrollTo({ top: 0, behavior: 'smooth' });
    });

    /* ----------------------------------------------------------
       Footer Year
       ---------------------------------------------------------- */
    const footerYear = document.getElementById('footer-year');
    if (footerYear) {
      footerYear.textContent = new Date().getFullYear();
    }