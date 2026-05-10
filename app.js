// Navbar scroll
window.addEventListener("scroll", function () {
  var nav = document.getElementById("navbar");
  if (window.scrollY > 40) {
    nav.classList.add("scrolled");
  } else {
    nav.classList.remove("scrolled");
  }
});
 
// Scroll Spy
var spySections = document.querySelectorAll("section[id], footer[id]");
var spyNavLinks = document.querySelectorAll(".nav-menu .nav-link");
 
function updateSpy() {
  var scrollY = window.scrollY;
  var currentId = "";
  spySections.forEach(function(section) {
    var sectionTop = section.offsetTop - window.innerHeight / 3;
    var sectionHeight = section.offsetHeight;
    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      currentId = section.getAttribute("id");
    }
  });
  spyNavLinks.forEach(function(link) {
    link.classList.remove("active");
    if (currentId && link.getAttribute("href") === "#" + currentId) {
      link.classList.add("active");
    }
  });
}
window.addEventListener("scroll", updateSpy);
window.addEventListener("load", updateSpy);
 
// Mobile toggle
document.getElementById("mobileToggle").addEventListener("click", function () {
  this.classList.toggle("open");
  document.getElementById("mobileNav").classList.toggle("open");
});
document.querySelectorAll(".mobile-nav a, .mobile-nav .btn").forEach(function (el) {
  el.addEventListener("click", function () {
    document.getElementById("mobileToggle").classList.remove("open");
    document.getElementById("mobileNav").classList.remove("open");
  });
});
 
// Fade-in observer
var observer = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll(".fade-in").forEach(function (el) {
  observer.observe(el);
});
 
// Counters
var countersTriggered = false;
function animateCounters() {
  if (countersTriggered) return;
  var section = document.getElementById("counters");
  if (!section) return;
  var rect = section.getBoundingClientRect();
  if (rect.top < window.innerHeight - 80) {
    countersTriggered = true;
    document.querySelectorAll(".counter-num[data-target]").forEach(function (el) {
      var target = parseInt(el.getAttribute("data-target"));
      var suffix = el.textContent.indexOf("+") !== -1 ? "+" : "";
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
 
// Certs scroll
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
 
// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(function (a) {
  a.addEventListener("click", function (e) {
    var target = document.querySelector(this.getAttribute("href"));
    if (target) {
      e.preventDefault();
      var offset = target.getBoundingClientRect().top + window.scrollY - 47;
      window.scrollTo({ top: offset, behavior: "smooth" });
    }
  });
});
 
// Lightbox
function openLightbox(src, caption) {
  var lb = document.getElementById("cert-lightbox");
  var img = document.getElementById("cert-lightbox-img");
  var cap = document.getElementById("cert-lightbox-caption");
  img.src = src.trim();
  cap.textContent = caption;
  lb.style.display = "flex";
  setTimeout(function() { img.style.transform = "scale(1)"; }, 10);
  document.body.style.overflow = "hidden";
}
function closeLightbox() {
  var lb = document.getElementById("cert-lightbox");
  var img = document.getElementById("cert-lightbox-img");
  img.style.transform = "scale(0.9)";
  lb.style.display = "none";
  document.body.style.overflow = "auto";
}
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") closeLightbox();
});
 
// Footer year
var date = new Date();
document.getElementById("footer-year").textContent = date.getFullYear();
 
// ── HERO CAROUSEL ──
(function() {
  var heroTrack    = document.getElementById('slidesTrack');
  var heroDots     = document.querySelectorAll('.nav-dot');
  var heroSlides   = document.querySelectorAll('.slide');
  var heroPrevBtn  = document.getElementById('arrowPrev');
  var heroNextBtn  = document.getElementById('arrowNext');
  var heroNum      = document.getElementById('currentNum');
  var heroProgress = document.getElementById('progressLine');
 
  if (!heroTrack || !heroSlides.length) return;
 
  var heroCurrent  = 0;
  var heroTotal    = heroSlides.length;
  var heroTimer    = null;
  var AUTO         = 5000;
 
  function heroGoTo(index) {
    heroSlides[heroCurrent].classList.remove('active');
    heroDots[heroCurrent].classList.remove('active');
    heroCurrent = (index + heroTotal) % heroTotal;
    heroSlides[heroCurrent].classList.add('active');
    heroDots[heroCurrent].classList.add('active');
    heroTrack.style.transform = 'translateX(-' + (heroCurrent * 100) + '%)';
    heroNum.textContent = heroCurrent + 1;
    heroResetProgress();
  }
 
  function heroResetProgress() {
    heroProgress.style.width = '0%';
    heroProgress.style.transition = 'none';
    requestAnimationFrame(function() {
      heroProgress.style.transition = 'width ' + AUTO + 'ms linear';
      heroProgress.style.width = '100%';
    });
  }
 
  function heroStartAuto() {
    clearInterval(heroTimer);
    heroTimer = setInterval(function() { heroGoTo(heroCurrent + 1); }, AUTO);
    heroResetProgress();
  }
 
  heroPrevBtn.addEventListener('click', function() { heroGoTo(heroCurrent - 1); heroStartAuto(); });
  heroNextBtn.addEventListener('click', function() { heroGoTo(heroCurrent + 1); heroStartAuto(); });
 
  heroDots.forEach(function(dot) {
    dot.addEventListener('click', function() {
      heroGoTo(parseInt(dot.dataset.index));
      heroStartAuto();
    });
  });
 
  var heroTouchX = 0;
  var heroRoot = document.getElementById('heroCarousel');
  if (heroRoot) {
    heroRoot.addEventListener('touchstart', function(e) { heroTouchX = e.touches[0].clientX; }, { passive: true });
    heroRoot.addEventListener('touchend', function(e) {
      var diff = heroTouchX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 40) { heroGoTo(heroCurrent + (diff > 0 ? 1 : -1)); heroStartAuto(); }
    });
  }
 
  heroStartAuto();
})();
 
// Accordion
function toggleItem(element) {
  document.querySelectorAll('.accordion-item').forEach(function(item) {
    if (item !== element) item.classList.remove('active');
  });
  element.classList.toggle('active');
}
 
// Blog modal
var blogItems = document.querySelectorAll('.blog-item');
var blogModal = document.getElementById('blogModal');
blogItems.forEach(function(item) {
  item.addEventListener('click', function() {
    var date  = this.querySelector('.blog-date').innerText;
    var title = this.querySelector('.blog-title').innerText;
    var excerpt = this.querySelector('.blog-excerpt').innerText;
    document.getElementById('modalDate').innerText = date;
    document.getElementById('modalTitle').innerText = title;
    document.getElementById('modalContent').innerHTML =
      '<p>' + excerpt + '</p>' +
      '<p style="margin-top:1rem">Bu mövzu haqqında daha ətraflı analitik məlumat və qanunvericilik tələbləri tezliklə tam versiyada təqdim olunacaqdır.</p>';
    blogModal.style.display = 'flex';
    document.body.classList.add('modal-open');
  });
});
function closeModal() {
  blogModal.style.display = 'none';
  document.body.classList.remove('modal-open');
}
window.addEventListener('click', function(event) {
  if (event.target === blogModal) closeModal();
});
 
// Back to top
var backToTopBtn = document.getElementById("backToTop");
window.addEventListener("scroll", function() {
  if (window.scrollY > 400) {
    backToTopBtn.classList.add("show");
  } else {
    backToTopBtn.classList.remove("show");
  }
});
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}
 
// Language toggle
(function () {
  var currentPage = window.location.pathname.split('/').pop() || 'index.html';
  var btnAZ = document.getElementById('langAZ');
  var btnEN = document.getElementById('langEN');
  if (!btnAZ || !btnEN) return;
  if (currentPage === 'index-en.html') {
    btnEN.classList.add('active');
    btnAZ.classList.remove('active');
  } else {
    btnAZ.classList.add('active');
    btnEN.classList.remove('active');
  }
})();
 
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
 
// ── EKSPERT CAROUSEL ──
(function() {
  var section = document.getElementById('komanda');
  if (!section) return;
 
  var expTrack   = section.querySelector('.experts-track');
  var expDots    = section.querySelector('.exp-dots');
  var expPrev    = section.querySelector('.exp-prev');
  var expNext    = section.querySelector('.exp-next');
  var expOuter   = section.querySelector('.experts-track-outer');
  var expCards   = Array.from(expTrack.querySelectorAll('.exp-card'));
 
  var expCurrent = 0;
  var expTimer   = null;
 
  function expPerView() {
    if (window.innerWidth <= 640)  return 1;
    if (window.innerWidth <= 1024) return 2;
    return 3;
  }
 
  function expTotal() { return Math.ceil(expCards.length / expPerView()); }
 
  function expBuildDots() {
    expDots.innerHTML = '';
    for (var i = 0; i < expTotal(); i++) {
      (function(idx) {
        var d = document.createElement('button');
        d.className = 'exp-dot' + (idx === expCurrent ? ' active' : '');
        d.setAttribute('aria-label', 'Səhifə ' + (idx + 1));
        d.addEventListener('click', function() { expGoTo(idx); expRestart(); });
        expDots.appendChild(d);
      })(i);
    }
  }
 
  function expGoTo(idx) {
    var pv  = expPerView();
    var tot = expTotal();
    expCurrent = ((idx % tot) + tot) % tot;
    var gap   = 24;
    var cardW = (expOuter.offsetWidth - (pv - 1) * gap) / pv;
    expTrack.style.transform = 'translateX(-' + (expCurrent * pv * (cardW + gap)) + 'px)';
    expDots.querySelectorAll('.exp-dot').forEach(function(d, i) {
      d.classList.toggle('active', i === expCurrent);
    });
  }
 
  function expRestart() {
    clearInterval(expTimer);
    expTimer = setInterval(function() { expGoTo(expCurrent + 1); }, 5000);
  }
 
  expPrev.addEventListener('click', function() { expGoTo(expCurrent - 1); expRestart(); });
  expNext.addEventListener('click', function() { expGoTo(expCurrent + 1); expRestart(); });
 
  var expTouchX = 0;
  expOuter.addEventListener('touchstart', function(e) { expTouchX = e.touches[0].clientX; }, { passive: true });
  expOuter.addEventListener('touchend', function(e) {
    var diff = expTouchX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      diff > 0 ? expGoTo(expCurrent + 1) : expGoTo(expCurrent - 1);
      expRestart();
    }
  });
 
  var expResizeT;
  window.addEventListener('resize', function() {
    clearTimeout(expResizeT);
    expResizeT = setTimeout(function() { expBuildDots(); expGoTo(expCurrent); }, 200);
  });
 
  expBuildDots();
  expGoTo(0);
  expRestart();
})();