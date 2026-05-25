/* ============================================================
   BLOG 3 JAVASCRIPT (Izolyasiya edilmis funksionalliq)
   ============================================================ */

/* ----------------------------------------------------------
   Video Data & Modal Logic
   ---------------------------------------------------------- */
const videoData = {
    left: [
        {
            type: 'youtube',
            videoId: 'uPlm2tZMk8Q',
            thumb: 'https://img.youtube.com/vi/uPlm2tZMk8Q/maxresdefault.jpg',
            label: 'AQTA: Qida təhlükəsizliyi haqqında qanun',
            date: '3 Yanvar 2025'
        }
    ]
};

const currentIndex = { left: 0 };

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
const b3content = document.getElementById('b3Content');
const b3sections = document.querySelectorAll('.b3-section');
const b3tocLinks = document.querySelectorAll('.b3-toc-list a');

function b3updateActiveLink() {
    let current = '';
    const scrollPos = b3content.scrollTop + 160;

    b3sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (scrollPos >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    if (!current && b3sections.length > 0) {
        current = b3sections[0].getAttribute('id');
    }

    b3tocLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
}

b3content.addEventListener('scroll', () => {
    b3updateActiveLink();

    // Navbar scrolled state
    const navbar = document.getElementById('navbar');
    if (b3content.scrollTop > 10) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');

    // Back to top
    const backToTop = document.getElementById('backToTop');
    if (b3content.scrollTop > 600) backToTop.classList.add('show');
    else backToTop.classList.remove('show');
});

b3tocLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            b3content.scrollTo({
                top: targetSection.offsetTop - 20,
                behavior: 'smooth'
            });
        }
    });
});

b3updateActiveLink();

/* ----------------------------------------------------------
   Theme Switcher
   ---------------------------------------------------------- */
document.getElementById('theme-switch').addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('asr-theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
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
    b3content.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ----------------------------------------------------------
   Footer Year
   ---------------------------------------------------------- */
const footerYear = document.getElementById('footer-year');
if (footerYear) {
    footerYear.textContent = new Date().getFullYear();
}

/* ----------------------------------------------------------
   Dark Mode LocalStorage Sync
   ---------------------------------------------------------- */
if (localStorage.getItem('asr-theme') === 'dark') {
    document.body.classList.add('dark-mode');
}