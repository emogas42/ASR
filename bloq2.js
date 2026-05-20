
   /* ----------------------------------------------------------
       Video Carousel Data & Logic
       ---------------------------------------------------------- */
    const videoData = {
      left: [
        { thumb: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&h=225&fit=crop', label: 'ISO 22000:2018 əsas dəyişikliklər' },
        { thumb: 'https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?w=400&h=225&fit=crop', label: 'HLS strukturu təlimi' },
        { thumb: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=225&fit=crop', label: 'Risk əsaslı yanaşma praktiki' }
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
      currentIndex[side] += direction;
      if (currentIndex[side] < 0) currentIndex[side] = data.length - 1;
      else if (currentIndex[side] >= data.length) currentIndex[side] = 0;
      updateVideoDisplay(side);
    }

    function updateVideoDisplay(side) {
      const data = videoData[side];
      const index = currentIndex[side];
      const cap = side.charAt(0).toUpperCase() + side.slice(1);

      document.getElementById('videoThumb' + cap).src = data[index].thumb;
      document.getElementById('videoLabel' + cap).textContent = data[index].label;
      document.getElementById('videoCounter' + cap).textContent = (index + 1) + ' / ' + data.length;

      const dots = document.getElementById('videoDots' + cap).children;
      for (let i = 0; i < dots.length; i++) {
        dots[i].classList.toggle('active', i === index);
      }
    }

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
       Mobile Navigation
       ---------------------------------------------------------- */
    document.getElementById('mobileToggle').addEventListener('click', function () {
      this.classList.toggle('open');
      document.getElementById('mobileNav').classList.toggle('open');
    });

    document.querySelectorAll('.mobile-chevron-btn').forEach(btn => {
      btn.addEventListener('click', function () {
        const expanded = this.getAttribute('aria-expanded') === 'true';
        this.setAttribute('aria-expanded', !expanded);
        this.closest('.mobile-nav-item').querySelector('.mobile-sub').classList.toggle('open');
      });
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