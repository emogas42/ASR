/* ============================================================
   BLOG 1 JAVASCRIPT
   ============================================================ */

/* ----------------------------------------------------------
   Video Data & Modal Logic (YouTube - no controls)
   ---------------------------------------------------------- */
const videoData = {
    left: [
        {
            type: 'youtube',
            videoId: 'mqi0L6f8jso',
            thumb: 'https://img.youtube.com/vi/mqi0L6f8jso/maxresdefault.jpg',
            label: 'AQTA: Qida təhlükəsizliyi haqqında qanun',
            date: '25 May 2025'
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

        // Set YouTube embed URL with autoplay and NO controls (hides progress bar)
        modalFrame.src = 'https://www.youtube.com/embed/' + currentVideo.videoId + '?autoplay=1&rel=0&controls=0&modestbranding=1';

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
document.getElementById('footer-year').textContent = new Date().getFullYear();

// Dark mode
var darkmode = localStorage.getItem('darkmode');
var themeSwitch = document.getElementById('theme-switch');
function enableDarkmode() {
    document.body.classList.add('dark-mode');
    localStorage.setItem('darkmode', 'active');
}
function disableDarkmode() {
    document.body.classList.remove('dark-mode');
    localStorage.setItem('darkmode', null);
}
if (darkmode === "active") enableDarkmode();
themeSwitch.addEventListener("click", function() {
    darkmode = localStorage.getItem('darkmode');
    if (darkmode !== 'active') enableDarkmode();
    else disableDarkmode();
});