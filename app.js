
    // Navbar scroll
    window.addEventListener("scroll", function () {
      const nav = document.getElementById("navbar");
      if (window.scrollY > 40) {
        nav.classList.add("scrolled");
      } else {
        nav.classList.remove("scrolled");
      }
    });

    // Scroll Spy
    const spySections = document.querySelectorAll("section[id], footer[id]");
    const spyNavLinks = document.querySelectorAll(".nav-menu .nav-link");

    function updateSpy() {
      const scrollY = window.scrollY;
      let current = "";

      spySections.forEach((section) => {
        const sectionTop = section.offsetTop - window.innerHeight / 3;
        const sectionHeight = section.offsetHeight;
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
          current = section.getAttribute("id");
        }
      });

      spyNavLinks.forEach((link) => {
        link.classList.remove("active");
        if (current && link.getAttribute("href") === "#" + current) {
          link.classList.add("active");
        }
      });
    }

    window.addEventListener("scroll", updateSpy);
    window.addEventListener("load", updateSpy);


    // Mobile toggle
    document
      .getElementById("mobileToggle")
      .addEventListener("click", function () {
        this.classList.toggle("open");
        document.getElementById("mobileNav").classList.toggle("open");
      });
    document
      .querySelectorAll(".mobile-nav a, .mobile-nav .btn")
      .forEach(function (el) {
        el.addEventListener("click", function () {
          document.getElementById("mobileToggle").classList.remove("open");
          document.getElementById("mobileNav").classList.remove("open");
        });
      });

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.12 },
    );
    document.querySelectorAll(".fade-in").forEach(function (el) {
      observer.observe(el);
    });
    var countersTriggered = false;
    function animateCounters() {
      if (countersTriggered) return;
      var section = document.getElementById("counters");
      if (!section) return;
      var rect = section.getBoundingClientRect();
      if (rect.top < window.innerHeight - 80) {
        countersTriggered = true;
        document
          .querySelectorAll(".counter-num[data-target]")
          .forEach(function (el) {
            var target = parseInt(el.getAttribute("data-target"));
            var suffix = el.textContent.indexOf("+") !== -1 ? "+" : "";
            var start = 0;
            var duration = 1800;
            var startTime = null;
            function step(ts) {
              if (!startTime) startTime = ts;
              var progress = Math.min((ts - startTime) / duration, 1);
              var eased = 1 - Math.pow(1 - progress, 3);
              el.textContent = Math.floor(eased * target) + suffix;
              if (progress < 1) requestAnimationFrame(step);
              else el.textContent = target + suffix;
            }
            requestAnimationFrame(step);
          });
      }
    }
    window.addEventListener("scroll", animateCounters);
    animateCounters();


    function scrollCerts(dir) {
      var track = document.getElementById("certsTrack");
      track.scrollLeft += dir * 260;
    }

    // Gallery filter
    document.querySelectorAll(".gallery-tab").forEach(function (tab) {
      tab.addEventListener("click", function () {
        document.querySelectorAll(".gallery-tab").forEach(function (t) {
          t.classList.remove("active");
        });
        this.classList.add("active");
        var cat = this.getAttribute("data-cat");
        document.querySelectorAll(".gallery-item").forEach(function (item) {
          if (cat === "all" || item.getAttribute("data-cat") === cat) {
            item.style.display = "flex";
            item.style.gridColumn = "";
          } else {
            item.style.display = "none";
            item.style.gridColumn = "";
          }
        });
      });
    });
    document.querySelectorAll('a[href^="#"]').forEach(function (a) {
      a.addEventListener("click", function (e) {
        var target = document.querySelector(this.getAttribute("href"));
        if (target) {
          e.preventDefault();
          var offset =
            target.getBoundingClientRect().top + window.scrollY - 47;
          window.scrollTo({ top: offset, behavior: "smooth" });
        }
      });
    });

    function openLightbox(src, caption) {
      const lb = document.getElementById("cert-lightbox");
      const img = document.getElementById("cert-lightbox-img");
      const cap = document.getElementById("cert-lightbox-caption");

      // Şəklin yolunu təmizləyirik (boşluqları silirik)
      img.src = src.trim();
      cap.textContent = caption;

      // Modalı göstəririk
      lb.style.display = "flex";

      // Animasiya üçün kiçik gecikmə
      setTimeout(() => {
        img.style.transform = "scale(1)";
      }, 10);

      // Arxa fonun scroll olmasını dayandırırıq
      document.body.style.overflow = "hidden";
    }

    function closeLightbox() {
      const lb = document.getElementById("cert-lightbox");
      const img = document.getElementById("cert-lightbox-img");

      img.style.transform = "scale(0.9)";
      lb.style.display = "none";

      // Scroll-u bərpa edirik
      document.body.style.overflow = "auto";
    }

    // Klaviaturada ESC düyməsi ilə bağlamaq üçün
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeLightbox();
    });
    //footer 
    let date = new Date()
    let year = date.getFullYear()
    document.getElementById("footer-year").textContent = year

///carousel
const track = document.getElementById('slidesTrack');
const dots = document.querySelectorAll('.nav-dot');
const slides = document.querySelectorAll('.slide');
const prevBtn = document.getElementById('arrowPrev');
const nextBtn = document.getElementById('arrowNext');
const currentNum = document.getElementById('currentNum');
const progressLine = document.getElementById('progressLine');

let current = 0;
let total = slides.length;
let autoTimer, progressTimer;
let progressW = 0;
const AUTO_INTERVAL = 5000;

function goTo(index) {
  slides[current].classList.remove('active');
  dots[current].classList.remove('active');
  current = (index + total) % total;
  slides[current].classList.add('active');
  dots[current].classList.add('active');
  track.style.transform = `translateX(-${current * 100}%)`;
  currentNum.textContent = current + 1;
  resetProgress();
}

function resetProgress() {
  clearInterval(progressTimer);
  progressW = 0;
  progressLine.style.width = '0%';
  progressLine.style.transition = 'none';
  requestAnimationFrame(() => {
    progressLine.style.transition = `width ${AUTO_INTERVAL}ms linear`;
    progressLine.style.width = '100%';
  });
}

function startAuto() {
  clearInterval(autoTimer);
  autoTimer = setInterval(() => goTo(current + 1), AUTO_INTERVAL);
  resetProgress();
}

prevBtn.addEventListener('click', () => { clearInterval(autoTimer); goTo(current - 1); startAuto(); });
nextBtn.addEventListener('click', () => { clearInterval(autoTimer); goTo(current + 1); startAuto(); });

dots.forEach(dot => {
  dot.addEventListener('click', () => {
    clearInterval(autoTimer);
    goTo(parseInt(dot.dataset.index));
    startAuto();
  });
});

let touchStartX = 0;
const root = document.getElementById('heroCarousel');
root.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, {passive:true});
root.addEventListener('touchend', e => {
  const diff = touchStartX - e.changedTouches[0].clientX;
  if (Math.abs(diff) > 40) { clearInterval(autoTimer); goTo(current + (diff > 0 ? 1 : -1)); startAuto(); }
});

startAuto();
  