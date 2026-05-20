
/* ============================================================
   BLOG 3 JAVASCRIPT (Izolyasiya edilmis funksionalliq)
   ============================================================ */

// Video Karusel
const b3videoData = {
    left: [
        { thumb: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&h=225&fit=crop', label: 'Temperatur nəzarəti praktiki' },
        { thumb: 'https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?w=400&h=225&fit=crop', label: 'Çapraz çirklənmənin qarşısının alınması' },
        { thumb: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=225&fit=crop', label: 'Allergen idarəetməsi' }
    ],
    right: [
        { thumb: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&h=225&fit=crop', label: 'HACCP restoranda tətbiqi' },
        { thumb: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400&h=225&fit=crop', label: 'Personal gigiyenası təlimi' },
        { thumb: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=225&fit=crop', label: 'Geri çağırma planı hazırlığı' }
    ]
};
const b3currentIndex = { left: 0, right: 0 };

function b3changeVideo(side, direction) {
    const data = b3videoData[side];
    b3currentIndex[side] += direction;
    if (b3currentIndex[side] < 0) b3currentIndex[side] = data.length - 1;
    else if (b3currentIndex[side] >= data.length) b3currentIndex[side] = 0;
    b3updateVideoDisplay(side);
}

function b3updateVideoDisplay(side) {
    const data = b3videoData[side];
    const index = b3currentIndex[side];
    const cap = side.charAt(0).toUpperCase() + side.slice(1);
    document.getElementById('b3thumb' + cap).src = data[index].thumb;
    document.getElementById('b3label' + cap).textContent = data[index].label;
    document.getElementById('b3counter' + cap).textContent = (index + 1) + ' / ' + data.length;
    const dots = document.getElementById('b3dots' + cap).children;
    for (let i = 0; i < dots.length; i++) dots[i].classList.toggle('active', i === index);
}

// Scrollspy: Aktiv bolmenin isiqlanmasi
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

// ========== YENI: Tema deyishdirici + localStorage sync ==========
document.getElementById('theme-switch').addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('asr-theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
});
// ========== /YENI ==========

// Mobil nav toggle
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

// Back to top
document.getElementById('backToTop').addEventListener('click', () => {
    b3content.scrollTo({ top: 0, behavior: 'smooth' });
});
if (localStorage.getItem('asr-theme') === 'dark') {
    document.body.classList.add('dark-mode');
}
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
themeSwitch.addEventListener("click", function () {
    darkmode = localStorage.getItem('darkmode');
    if (darkmode !== 'active') enableDarkmode();
    else disableDarkmode();
});