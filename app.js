
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

      img.src = src.trim();
      cap.textContent = caption;

      lb.style.display = "flex";

      setTimeout(() => {
        img.style.transform = "scale(1)";
      }, 10);

      document.body.style.overflow = "hidden";
    }

    function closeLightbox() {
      const lb = document.getElementById("cert-lightbox");
      const img = document.getElementById("cert-lightbox-img");

      img.style.transform = "scale(0.9)";
      lb.style.display = "none";

      document.body.style.overflow = "auto";
    }

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

  function toggleItem(element) {
    const allItems = document.querySelectorAll('.accordion-item');
    allItems.forEach(item => {
      if (item !== element) {
        item.classList.remove('active');
      }
    });

    element.classList.toggle('active');
  }
const blogItems = document.querySelectorAll('.blog-item');
const modal = document.getElementById('blogModal');

blogItems.forEach(item => {
  item.addEventListener('click', function() {
    const date = this.querySelector('.blog-date').innerText;
    const title = this.querySelector('.blog-title').innerText;
    const excerpt = this.querySelector('.blog-excerpt').innerText;

    document.getElementById('modalDate').innerText = date;
    document.getElementById('modalTitle').innerText = title;
    
    document.getElementById('modalContent').innerHTML = `
      <p>${excerpt}</p>
      <p style="margin-top:1rem">Bu mövzu haqqında daha ətraflı analitik məlumat və qanunvericilik tələbləri tezliklə tam versiyada təqdim olunacaqdır.</p>
    `;

    modal.style.display = 'flex';
    document.body.classList.add('modal-open');
  });
});

function closeModal() {
  modal.style.display = 'none';
  document.body.classList.remove('modal-open');
}

window.onclick = function(event) {
  if (event.target == modal) {
    closeModal();
  }
}


const backToTopBtn = document.getElementById("backToTop");

window.onscroll = function() {
  if (document.body.scrollTop > 400 || document.documentElement.scrollTop > 400) {
    backToTopBtn.classList.add("show");
  } else {
    backToTopBtn.classList.remove("show");
  }
};

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth" 
  });
}
// Language Toggle
(function () {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const btnAZ = document.getElementById('langAZ');
  const btnEN = document.getElementById('langEN');

  if (!btnAZ || !btnEN) return;

  if (currentPage === 'index-en.html') {
    btnEN.classList.add('active');
    btnAZ.classList.remove('active');
  } else {
    btnAZ.classList.add('active');
    btnEN.classList.remove('active');
  }
})();

let darkmode =  localStorage.getItem('darkmode')
const themeSwitch = document.getElementById('theme-switch')

const enableDarkmode = ()=>{
    document.body.classList.add('dark-mode')
    localStorage.setItem('darkmode', 'active')
}

const disableDarkmode = ()=>{
    document.body.classList.remove('dark-mode')
    localStorage.setItem('darkmode', null)
    }

    if (darkmode==="active") enableDarkmode();

themeSwitch.addEventListener("click", ()=>{
    darkmode= localStorage.getItem('darkmode')
    if (darkmode!=='active'){
        enableDarkmode();
    }else{
        disableDarkmode();
    }
})

(function() {
  var section  = document.getElementById('komanda');
  if (!section) return;

  var expTrack    = section.querySelector('.experts-track');
  var expDots     = section.querySelector('.exp-dots');
  var expBtnPrev  = section.querySelector('.exp-prev');
  var expBtnNext  = section.querySelector('.exp-next');
  var expOuter    = section.querySelector('.experts-track-outer');
  var expCards    = Array.from(expTrack.querySelectorAll('.exp-card'));

  var expCurrent   = 0;
  var expAutoTimer = null;

  function expPerView() {
    if (window.innerWidth <= 640)  return 1;
    if (window.innerWidth <= 1024) return 2;
    return 3;
  }

  function expGetTotal() { return Math.ceil(expCards.length / expPerView()); }

  function expBuildDots() {
    expDots.innerHTML = '';
    for (var i = 0; i < expGetTotal(); i++) {
      (function(idx) {
        var d = document.createElement('button');
        d.className = 'exp-dot' + (idx === expCurrent ? ' active' : '');
        d.setAttribute('aria-label', 'Səhifə ' + (idx + 1));
        d.addEventListener('click', function() { expGoTo(idx); expResetAuto(); });
        expDots.appendChild(d);
      })(i);
    }
  }

  function expGoTo(idx) {
    var pv    = expPerView();
    var total = expGetTotal();
    expCurrent = ((idx % total) + total) % total;
    var outerW = expOuter.offsetWidth;
    var gap    = 24;
    var cardW  = (outerW - (pv - 1) * gap) / pv;
    expTrack.style.transform = 'translateX(-' + (expCurrent * pv * (cardW + gap)) + 'px)';
    expDots.querySelectorAll('.exp-dot').forEach(function(d, i) {
      d.classList.toggle('active', i === expCurrent);
    });
  }

  function expNext() { expGoTo(expCurrent + 1); }
  function expPrev() { expGoTo(expCurrent - 1); }

  function expStartAuto() {
    clearInterval(expAutoTimer);
    expAutoTimer = setInterval(expNext, 5000);
  }

  function expResetAuto() { expStartAuto(); }

  expBtnPrev.addEventListener('click', function() { expPrev(); expResetAuto(); });
  expBtnNext.addEventListener('click', function() { expNext(); expResetAuto(); });

  var expTouchStartX = 0;
  expOuter.addEventListener('touchstart', function(e) {
    expTouchStartX = e.touches[0].clientX;
  }, { passive: true });
  expOuter.addEventListener('touchend', function(e) {
    var diff = expTouchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) { diff > 0 ? expNext() : expPrev(); expResetAuto(); }
  });

  var expResizeTimer;
  window.addEventListener('resize', function() {
    clearTimeout(expResizeTimer);
    expResizeTimer = setTimeout(function() { expBuildDots(); expGoTo(expCurrent); }, 200);
  });

  expBuildDots();
  expGoTo(0);
  expStartAuto();
})();





  