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

const services = [
  {
    num:"01",
    title:"İnkişaf Layihələrinin İdarəolunması",
    desc:"USAID, Dünya Bankı və digər donor təşkilatların inkişaf layihələrini podratçı/subpodratçı qismində kompleks şəkildə həyata keçiririk.",
    badges:["Podratçı / Subpodratçı","Beynəlxalq Donorlar"],
    imgPlaceholder:true,
    imgAlt:"İnkişaf Layihələri",
    leftLabel:"Xidmət Təklifləri",
    leftItems:[
      "Hökumət orqanlarına iqtisadi siyasət və qanunvericilik sahəsində yüksəkixtisaslı yerli/beynəlxalq konsultantların cəlbi",
      "Təlimlər, seminarlar, konfranslar, dəyirmi masaların təşkili və idarəsi",
      "Kəmiyyət/keyfiyyət tədqiqatları, sorğular, müsahibələr, əhatəli hesabatlar",
      "Layihə materialları, təqdimat və təlim vəsaitlərinin hazırlanması və çapı",
      "Layihə sənəd və materiallarının peşəkar tərcüməsi",
      "Daxili/kənar monitorinq, qiymətləndirmə və hesabatların hazırlanması"
    ],
    highlight:"★ USAID ACT Layihəsi ($22M) və Dünya Bankı Məcburi Köçkünlər Layihəsini subpodratçı qismində idarə etmişik.",
    rightLabel:"İdarəetmə Prosesi",
    steps:[
      {n:"1",lbl:"Planlaşdırma",txt:"Layihə əhatəsi, resurslar, zaman cədvəli, KPI-ların müəyyənləşdirilməsi"},
      {n:"2",lbl:"Təşkilat",txt:"Komanda strukturu, kommunikasiya kanalları, benefisiarlarla koordinasiya"},
      {n:"3",lbl:"İcra",txt:"Fəaliyyətlərin həyata keçirilməsi, çıxarışların hazırlanması, hesabatlar"},
      {n:"4",lbl:"Monitorinq",txt:"Göstəricilərin izlənilməsi, düzəldici tədbirlər, yekun qiymətləndirmə"}
    ]
  },
  {
    num:"02",
    title:"Strateji İdarəetmə və Monitorinq-Qiymətləndirmə",
    desc:"Dövlət orqanları və özəl müəssisələrdə strateji planlaşdırma sessiyaları keçirir, hesabatlılıq sistemlərini qururuq. MQ sistemləri beynəlxalq metodologiya ilə qurulur.",
    badges:["Strateji Planlaşdırma","MQ Sistemi","KPI"],
    imgPlaceholder:true,
    imgAlt:"Strateji İdarəetmə",
    leftLabel:"Xidmət Təklifləri",
    leftItems:[
      "Fəaliyyət sahələrinin qiymətləndirilməsi və problemlərin müsahibələr vasitəsi ilə müəyyənləşdirilməsi",
      "Strateji hədəflərin, konkret vəzifələrin, proqram və layihələrin yenidən planlaşdırılması",
      "Dövlət və özəl qurumların strateji planının işlənib hazırlanması",
      "İdarəetmə hesabat sistemlərinin tətbiqi, hesabatlılıq sistemlərinin yaradılması",
      "Strateji planın icrasının kənar monitorinq və qiymətləndirilməsi",
      "İT əsaslı MQ sisteminin layihələndirilməsi, indikatorların müəyyənləşdirilməsi",
      "Büdcə və strateji planlaşdırma proseslərinin sinxronlaşdırılması"
    ],
    highlight:"★ Dövlət strukturları ilə iş təcrübəsi sayəsində MQ sistemlərini beynəlxalq metodologiya ilə qururuq.",
    rightLabel:"MQ Sistemi Komponentləri",
    steps:[
      {n:"1",lbl:"Planlaşdırma",txt:"İndikatorların müəyyən edilməsi, məlumat idarəetmə sistemi, məntiqi çərçivə"},
      {n:"2",lbl:"Monitorinq",txt:"Davamlı məlumat toplanması, müqayisəli analiz, aralıq nəticə izlənilməsi"},
      {n:"3",lbl:"Qiymətləndirmə",txt:"Nəticələrin qiymətləndirilməsi, öyrənilən dərslər, tövsiyələr"},
      {n:"4",lbl:"Hesabat",txt:"Qərar qəbuletmə üçün strateji hesabatların maraqlı tərəflərə təqdimi"}
    ]
  },
  {
    num:"03",
    title:"İqtisadi Siyasət Sənədləri və Qanunvericilik",
    desc:"Xarici ticarət, gömrük, rəqabət, qida təhlükəsizliyi, kənd təsərrüfatı, turizm və digər 10+ sahədə 60-dan çox qanunvericilik aktının hazırlanmasında iştirak təcrübəsi.",
    badges:["RIA Metodologiyası","60+ Qanunvericilik Aktı"],
    imgPlaceholder:true,
    imgAlt:"Qanunvericilik",
    leftLabel:"Xidmət Təklifləri",
    leftItems:[
      "Mövcud siyasət və islahatların təhlili əsasında islahat ssenarilərinin hazırlanması",
      "Mövcud/potensial iqtisadi böhranlar və cavab tədbirlərinin hazırlanması",
      "Rəqabətqabiliyyətlilik təhlili və sektoral inkişaf strategiyaları, yol xəritələri",
      "Ən qabaqcıl təcrübələrə uyğun yeni qanunların, qaydaların hazırlanması",
      "Mövcud qanunvericiliyin yeni qanunlara uyğunlaşdırılması paketi",
      "Qanun layihələrinin peşəkar linqvistik ekspertizası",
      "Tənzimləmə təsirinin qiymətləndirilməsi (RIA metodologiyası)",
      "Strateji Yol Xəritələri, rəsmi sənədlərin peşəkar tərcüməsi"
    ],
    highlight:"★ Azərbaycan Respublikasının əsas dövlət agentliklərinin yaradılmasında fəal iştirak (AQTA, KOBİA, ƏMİ və s.).",
    rightLabel:"İcra Mərhələləri",
    steps:[
      {n:"1",lbl:"Analiz",txt:"Mövcud qanunvericiliyin, beynəlxalq praktikanın və boşluqların analizi"},
      {n:"2",lbl:"Ssenari",txt:"İslahat ssenarilərinin hazırlanması, maraqlı tərəflərlə müzakirə"},
      {n:"3",lbl:"Hazırlama",txt:"Qanun layihəsinin, izahat sənədlərinin və RIA hesabatının hazırlanması"},
      {n:"4",lbl:"Ekspertiza",txt:"Linqvistik ekspertiza, uyğunlaşdırma paketi, son razılaşdırma"}
    ]
  },
  {
    num:"04",
    title:"Tədqiqat və Analitik Təhlillər",
    desc:"Yeni təşəbbüslərin, layihələrin və innovasiyaların texniki-iqtisadi əsaslandırılması. Dövlət investisiya layihələrinin gəlir-xərc analizi, risk qiymətləndirilməsi.",
    badges:["Feasibility Study","Ekonometrik Analiz"],
    imgPlaceholder:true,
    imgAlt:"Analitik Tədqiqat",
    leftLabel:"Xidmət Təklifləri",
    leftItems:[
      "Yeni təşəbbüslərin, layihələrin, innovasiyaların texniki-iqtisadi əsaslandırılması",
      "Dövlət investisiya layihələrinin gəlir-xərc təhlili",
      "Dövlət layihələri icrasının təsirinin qiymətləndirilməsi",
      "Yeni islahat və layihələrin risk təhlilinin aparılması",
      "Müxtəlif iqtisadi sahələrdə statistik və ekonometrik təhlil",
      "Dövlət qurumlarında analitik potensialın gücləndirilməsi",
      "Data vizuallaşdırma və interaktiv hesabatların hazırlanması"
    ],
    highlight:"★ Sorğuların aparılması, müsahibələrin təşkili, təşkilati potensial indekslərinin yaradılması daxildir.",
    rightLabel:"Analiz Prosesi",
    steps:[
      {n:"1",lbl:"Məlumat Toplama",txt:"Sorğular, müsahibələr, statistik məlumatların toplanması və yoxlanılması"},
      {n:"2",lbl:"Təhlil",txt:"Ekonometrik, statistik metodlarla dərin analiz; model qurulması"},
      {n:"3",lbl:"Hesabat",txt:"Vizuallaşdırılmış, dəlil əsaslı hesabatların hazırlanması; tövsiyələr"}
    ]
  },
  {
    num:"05",
    title:"Qida Təhlükəsizliyi — Tam Xidmət Paketi",
    desc:"AQTA yoxlamalarında sıfır cərimə, tam uyğunluq. 7 əsas xidmət sahəsi üzrə kompleks həllər. 15+ illik təcrübə, 50+ müştəri.",
    badges:["AQTA Standartları","HACCP · ISO 22000","BRCGS · IFS","100% Uyğunluq"],
    imgPlaceholder:true,
    imgAlt:"Qida Təhlükəsizliyi",
    isFood:true
  },
  {
    num:"06",
    title:"Dövlətlə Əlaqələr Xidmətləri",
    desc:"Dövlət qurumları ilə əlaqələrin peşəkar idarəsi. Dövlət strukturlarında bilavasitə işləmiş mütəxəssislərimiz sayəsində sürətli, qanuni uyğun nəticə.",
    badges:["Government Affairs","Tender Dəstəyi"],
    imgPlaceholder:true,
    imgAlt:"Dövlətlə Əlaqələr",
    leftLabel:"Xidmət İstiqamətləri",
    leftItems:[
      "Rəqabət sahəsində əlaqələrin idarəsi və qanunvericilik tələblərinə uyğunluq",
      "Standartların tətbiqi, texniki tənzimləmə sahəsindəki əlaqələr",
      "Dövlət satınalmaları — tender dəstəyi, proseslərin idarəsi",
      "Səhiyyə sahəsindəki tənzimləmə prosesləri ilə əlaqələr",
      "Ekologiya sahəsindəki əlaqələr, uyğunluq monitorinqi",
      "Qanunvericiliyə uyğunluğun qiymətləndirilməsi və idarə edilməsi",
      "Risklərin idarəsi, korporativ idarəetmə məsləhəti"
    ],
    highlight:"★ Dövlət strukturlarında bilavasitə rəsmi vəzifə tutmuş mütəxəssislərin birbaşa iştirakı ilə xidmət.",
    rightLabel:"Əsas Üstünlüklər",
    steps:[
      {n:"✓",lbl:"Peşəkar Komanda",txt:"Dövlət strukturlarında qərar verici vəzifə tutmuş ekspertlər"},
      {n:"✓",lbl:"Qanuni Uyğunluq",txt:"Cari qanunvericilik tələblərinə tam uyğunluq təminatı"},
      {n:"✓",lbl:"Sürətli Nəticə",txt:"Proseslərin sürətləndirilməsi, vaxt itkisinin minimuma endirilməsi"},
      {n:"✓",lbl:"7/24 Dəstək",txt:"Daimi əlaqə, operativ cavab, böhran anında dərhal müşayiət"}
    ]
  },
  {
    num:"07",
    title:"Biznesin İnkişafı Sahəsində Xidmətlər",
    desc:"Yeni biznes ideyalarından mövcud şirkətlərin optimallaşdırılmasına, investisiya cəlbindən maliyyə modelləşdirməsinə qədər hərtərəfli dəstək.",
    badges:["Biznes Plan","İnvestisiya Cəlbi","Feasibility"],
    imgPlaceholder:true,
    imgAlt:"Biznesin İnkişafı",
    leftLabel:"Xidmət Təklifləri",
    leftItems:[
      "Strateji idarəetmə sahəsində kompleks xidmətlər",
      "Biznes planların hazırlanması, feasibility analizinin aparılması",
      "Biznes ümumi auditi, hesabatların hazırlanması, hesabatlılıq sistemlərinin qurulması",
      "İnvestisiya cəlbi və investisiya matching xidmətləri",
      "Maliyyə modelləşdirməsi, maliyyə planlaşdırması",
      "Biznes proseslərinin optimallaşdırılması, itkinin azaldılması",
      "Korporativ idarəetmə, insan resursları sisteminin yenidən qurulması"
    ],
    highlight:"★ Dövlət investisiya layihələrinin texniki-iqtisadi əsaslandırılması və təsirinin qiymətləndirilməsi daxildir.",
    rightLabel:"Biznes İnkişaf Mərhələləri",
    steps:[
      {n:"1",lbl:"İdeya",txt:"Biznes konsepsiyasının müəyyənləşdirilməsi, ilkin qiymətləndirmə, bazar araşdırması"},
      {n:"2",lbl:"Analiz",txt:"Bazar, rəqabət, maliyyə proqnozları, risk analizinin aparılması"},
      {n:"3",lbl:"Plan",txt:"Hərtərəfli biznes planı, investisiya sənədi, maliyyə modeli"},
      {n:"4",lbl:"İcra",txt:"Həyata keçirmə mərhələsində davamlı dəstək, monitoring, düzəlişlər"}
    ]
  }
];
 
function buildHeroImg(s){
  // Replace the placeholder div with: <img src="path/to/image.jpg" alt="${s.imgAlt}">
  return `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;flex-direction:column;gap:.5rem;color:rgba(200,146,42,0.5)">
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
    <span style="font-size:.5625rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase;opacity:.7">${s.imgAlt} — Şəkil əlavə edin</span>
  </div>`;
}
 
function buildPanel(id){
  const s = services[id];
  if(s.isFood) return buildFoodPanel(s);
 
  const steps = s.steps.map(st=>`
    <div class="svc-step">
      <div class="svc-step-dot">${st.n}</div>
      <div>
        <div class="svc-step-lbl">${st.lbl}</div>
        <div class="svc-step-txt">${st.txt}</div>
      </div>
    </div>`).join('');
 
  const items = s.leftItems.map(i=>`<div class="svc-list-item">${i}</div>`).join('');
  const badges = s.badges.map(b=>`<span class="svc-badge">${b}</span>`).join('');
 
  return `
    <div class="svc-panel-hero">
      ${buildHeroImg(s)}
      <div class="svc-panel-hero-overlay"></div>
      <div class="svc-panel-hero-content">
        <div>
          <h3>${s.title}</h3>
          <p>${s.desc}</p>
        </div>
      </div>
    </div>
    <div class="svc-panel-body">
      <div class="svc-meta-badges">${badges}</div>
      <div class="svc-panel-grid">
        <div>
          <div class="svc-col-label">${s.leftLabel}</div>
          <div class="svc-list">${items}</div>
          ${s.highlight?`<div class="svc-highlight">${s.highlight}</div>`:''}
        </div>
        <div>
          <div class="svc-col-label">${s.rightLabel}</div>
          <div class="svc-steps">${steps}</div>
        </div>
      </div>
    </div>`;
}
 
function buildFoodPanel(s){
  const badges = s.badges.map(b=>`<span class="svc-badge">${b}</span>`).join('');
  return `
    <div class="svc-panel-hero">
      ${buildHeroImg(s)}
      <div class="svc-panel-hero-overlay"></div>
      <div class="svc-panel-hero-content">
        <div>
          <h3>${s.title}</h3>
          <p>${s.desc}</p>
        </div>
      </div>
    </div>
    <div class="svc-panel-body">
      <div class="svc-meta-badges">${badges}</div>
 
      <div style="margin-bottom:2rem">
        <div class="svc-col-label" style="margin-bottom:1rem">Qarşılaşdığınız Risklər</div>
        <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:1rem">
          <div>
            <div class="svc-col-label" style="color:var(--orange);letter-spacing:.1em">Hüquqi Risklər</div>
            <div class="risk-row"><span class="risk-level risk-high">Yüksək</span><span class="risk-txt">AQTA yoxlamalarında cərimə (1 500–8 000 AZN)</span></div>
            <div class="risk-row"><span class="risk-level risk-high">Yüksək</span><span class="risk-txt">Fəaliyyətin dayandırılması riski</span></div>
            <div class="risk-row"><span class="risk-level risk-high">Yüksək</span><span class="risk-txt">Məhsul geri çağırma riski</span></div>
            <div class="risk-row"><span class="risk-level risk-med">Orta</span><span class="risk-txt">Hüquqi məsuliyyət, inzibati sanksiyalar</span></div>
          </div>
          <div>
            <div class="svc-col-label" style="color:var(--orange);letter-spacing:.1em">Sağlamlıq Riskləri</div>
            <div class="risk-row"><span class="risk-level risk-high">Yüksək</span><span class="risk-txt">Kütləvi qida zəhərlənməsi hadisələri</span></div>
            <div class="risk-row"><span class="risk-level risk-high">Yüksək</span><span class="risk-txt">Brend imicinin zədələnməsi</span></div>
            <div class="risk-row"><span class="risk-level risk-med">Orta</span><span class="risk-txt">Allergen məlumatı çatışmazlığı, etiket xətaları</span></div>
          </div>
        </div>
      </div>
 
      <div class="svc-panel-grid" style="margin-bottom:2rem">
        <div>
          <div class="svc-col-label">7 Xidmət Modulu</div>
          <div class="svc-steps">
            <div class="svc-step"><div class="svc-step-dot" style="font-size:.45rem">1-2G</div><div><div class="svc-step-lbl">Uyğunluq Auditi</div><div class="svc-step-txt">Sanitar-texniki, məhsul/etiket, təchizat zənciri, sənədləşmə — 4 modul audit. Gap analysis ilə yol xəritəsi.</div></div></div>
            <div class="svc-step"><div class="svc-step-dot" style="font-size:.45rem">3-5G</div><div><div class="svc-step-lbl">Tələblərin İcrası Məsləhəti</div><div class="svc-step-txt">AQTA qanunvericiliyinə tam uyğunluq üçün peşəkar məsləhət, boşluqların aradan qaldırılması.</div></div></div>
            <div class="svc-step"><div class="svc-step-dot" style="font-size:.45rem">1-3A</div><div><div class="svc-step-lbl">HACCP Sisteminin Qurulması</div><div class="svc-step-txt">Axın sxemləri → Təhlükə analizi → KNN/Limitlər → Monitorinq sistemi → Sənədləşmə (5 addımlı).</div></div></div>
            <div class="svc-step"><div class="svc-step-dot" style="font-size:.45rem">2-4H</div><div><div class="svc-step-lbl">İzləniləbilirlik Sistemi</div><div class="svc-step-txt">NK-107 uyğun "bir addım öncə–sonra" prinsipi. Lot nömrələmə, geri çağırma planı, qeydiyyat sistemi.</div></div></div>
            <div class="svc-step"><div class="svc-step-dot" style="font-size:.45rem">5-20G</div><div><div class="svc-step-lbl">Müəssisə Layihələndirilməsi</div><div class="svc-step-txt">Texnoloji zonalaşdırma, havalandırma/su/işıq/drenaj, personal hərəkəti planlaması, AQTA uyğunluq.</div></div></div>
            <div class="svc-step"><div class="svc-step-dot" style="font-size:.45rem">1-5G</div><div><div class="svc-step-lbl">İxtisaslaşdırılmış Təlimlər</div><div class="svc-step-txt">Ümumi gigiyena, ISO 22000:2018, HACCP prinsipləri, izləmə/markalanma — 4 modul, sertifikat.</div></div></div>
            <div class="svc-step"><div class="svc-step-dot" style="font-size:.45rem;letter-spacing:-.04em">365</div><div><div class="svc-step-lbl">Autsorsinq — Davamlı Müşayiət</div><div class="svc-step-txt">365 gün nəzarət: AQTA yazışmaları, yoxlamalarda müşayiət, aylıq daxili audit, heyət təlimlər.</div></div></div>
          </div>
        </div>
        <div>
          <div class="svc-col-label">Nəticələr — 17 Əsas Fayda</div>
          <div class="svc-benefits-grid">
            <div class="svc-benefit"><div class="svc-benefit-title">Sıfır Cərimə</div><div class="svc-benefit-txt">AQTA yoxlamalarında qüsursuz nəticə</div></div>
            <div class="svc-benefit"><div class="svc-benefit-title">Bağlanma Sığortası</div><div class="svc-benefit-txt">Müəssisənin bağlanması riskinin tam aradan qaldırılması</div></div>
            <div class="svc-benefit"><div class="svc-benefit-title">Hüquqi Müdafiə</div><div class="svc-benefit-txt">Rəsmi yoxlamalarda peşəkar təmsilçilik</div></div>
            <div class="svc-benefit"><div class="svc-benefit-title">Keyfiyyət Stabilliyı</div><div class="svc-benefit-txt">Məhsul keyfiyyəti + müştəri məmnuniyyəti artımı</div></div>
            <div class="svc-benefit"><div class="svc-benefit-title">İxrac İmkanı</div><div class="svc-benefit-txt">Xarici bazarlara ixrac tələblərinin aşılması</div></div>
            <div class="svc-benefit"><div class="svc-benefit-title">Brend İmic</div><div class="svc-benefit-txt">"Təhlükəsiz şirkət" bazarda tanınma</div></div>
            <div class="svc-benefit"><div class="svc-benefit-title">Resurs Qənaəti</div><div class="svc-benefit-txt">Optimallaşdırılmış proseslər, brak azalması</div></div>
            <div class="svc-benefit"><div class="svc-benefit-title">7/24 Dəstək</div><div class="svc-benefit-txt">Davamlı konsaltinq, operativ problemlərin həlli</div></div>
          </div>
          <div class="cert-strip">
            <span class="cert-pill">HACCP</span>
            <span class="cert-pill">ISO 22000</span>
            <span class="cert-pill">BRCGS</span>
            <span class="cert-pill">IFS</span>
          </div>
        </div>
      </div>
 
      <div>
        <div class="svc-col-label" style="margin-bottom:1rem">İşə Başlama Prosesi</div>
        <div class="onboard-steps">
          <div class="onboard-step">
            <div class="svc-step-dot">Addım 1</div>
            <div class="svc-step-lbl">İlkin Audit &amp; Gap</div>
            <div class="svc-step-txt">Mövcud vəziyyətin diaqnostikası, boşluqların aşkarlanması</div>
          </div>
          <div class="onboard-step">
            <div class="svc-step-dot">Addım 2</div>
            <div class="svc-step-lbl">Yol Xəritəsi</div>
            <div class="svc-step-txt">Prioritetləşdirilmiş düzəliş planının razılaşdırılması</div>
          </div>
          <div class="onboard-step">
            <div class="svc-step-dot">Addım 3</div>
            <div class="svc-step-lbl">Müqavilə &amp; Başlama</div>
            <div class="svc-step-txt">Rəsmi müqavilə imzalanması, komandanın təyinatı</div>
          </div>
          <div class="onboard-step">
            <div class="svc-step-dot">Addım 4</div>
            <div class="svc-step-lbl">30/60/90 Gün Planı</div>
            <div class="svc-step-txt">Mərhələli tətbiq, nəzarət sistemi, hesabatlar</div>
          </div>
        </div>
      </div>
    </div>`;
}
 
const overlay = document.getElementById('svcOverlay');
const panel = document.getElementById('svcPanel');
const panelContent = document.getElementById('svcPanelContent');
const grid = document.getElementById('svcGrid');
 
function openSvc(id){
  panelContent.innerHTML = buildPanel(id);
  overlay.classList.add('active');
  grid.classList.add('has-open');
  document.body.style.overflow='hidden';
  // reset panel scroll
  panel.scrollTop=0;
}
 
function closeSvc(){
  overlay.classList.remove('active');
  grid.classList.remove('has-open');
  document.body.style.overflow='';
}
 
function handleOverlayClick(e){
  if(e.target===overlay) closeSvc();
}
 
document.addEventListener('keydown',e=>{
  if(e.key==='Escape') closeSvc();
});
app.js

// ── Niyə Biz — theme toggle ───────────────────────
(function () {
  const html  = document.documentElement;
  const btn   = document.getElementById('themeBtn');
  const label = document.getElementById('themeLabel');
 
  // Load saved preference
  const saved = localStorage.getItem('asrTheme');
  if (saved === 'dark') apply('dark');
 
  btn.addEventListener('click', function () {
    const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    apply(next);
    localStorage.setItem('asrTheme', next);
  });
 
  function apply(theme) {
    html.setAttribute('data-theme', theme);
    label.textContent = theme === 'dark' ? 'Light mode' : 'Dark mode';
  }
})();
