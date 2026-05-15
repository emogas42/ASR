  //  const dmToggle=document.getElementById('dmToggle');
  //   const dmIcon=document.getElementById('dmIcon');
    const sun='<circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>';
    const moon='<path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>';
    let dark=false;
    // dmToggle.addEventListener('click',()=>{dark=!dark;document.body.classList.toggle('dark-mode',dark);dmIcon.innerHTML=dark?sun:moon;});

    gsap.registerPlugin(ScrollTrigger);
    const tl=gsap.timeline({delay:.2});
    tl.from('#heroBadge',{opacity:0,y:20,duration:.6,ease:'power3.out'})
      .from('#heroEyebrow',{opacity:0,y:16,duration:.5,ease:'power3.out'},'-=.3')
      .from('#heroTitle',{opacity:0,y:24,duration:.7,ease:'power3.out'},'-=.35')
      .from('#heroDesc',{opacity:0,y:18,duration:.6,ease:'power3.out'},'-=.45')
      .from('#heroCta',{opacity:0,y:14,duration:.5,ease:'power3.out'},'-=.35')
      .from('#heroVisual .hero-stat-card',{opacity:0,x:30,duration:.5,ease:'power3.out',stagger:.15},'-=.4');

    gsap.utils.toArray('.reveal').forEach(el=>{
      gsap.fromTo(el,{opacity:0,y:32},{opacity:1,y:0,duration:.7,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 88%',toggleActions:'play none none none'}});
    });
    gsap.utils.toArray('.process-step').forEach((el,i)=>{
      gsap.fromTo(el,{opacity:0,x:-30},{opacity:1,x:0,duration:.65,ease:'power3.out',delay:i*.08,scrollTrigger:{trigger:el,start:'top 90%',toggleActions:'play none none none'}});
    });
        // Footer year
    document.getElementById('footer-year').textContent = new Date().getFullYear();
 
    // Back to top
    function scrollToTop() { window.scrollTo({ top: 0, behavior: 'smooth' }); }
    window.addEventListener('scroll', () => {
      const btn = document.getElementById('backToTop');
      if (window.scrollY > 400) btn.classList.add('visible');
      else btn.classList.remove('visible');
    });
 
    // Mobile nav toggle
    const mobileToggle = document.getElementById('mobileToggle');
    const mobileNav = document.getElementById('mobileNav');
    if (mobileToggle && mobileNav) {
      mobileToggle.addEventListener('click', () => {
        mobileNav.classList.toggle('open');
        mobileToggle.classList.toggle('active');
      });
    }
 
    // Mobile sub-menus
    document.querySelectorAll('.mobile-chevron-btn.has-dropdown').forEach(btn => {
      btn.addEventListener('click', () => {
        const row = btn.closest('.mobile-nav-item');
        const sub = row.querySelector('.mobile-sub');
        const isOpen = btn.getAttribute('aria-expanded') === 'true';
        btn.setAttribute('aria-expanded', String(!isOpen));
        if (sub) sub.style.display = isOpen ? 'none' : 'flex';
      });
    });
 
    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    if (navbar) {
      window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
      });
    }
 
    // Theme switch
    const themeSwitch = document.getElementById('theme-switch');
    if (themeSwitch) {
      const saved = localStorage.getItem('theme');
      if (saved === 'dark') document.body.classList.add('dark-mode');
      themeSwitch.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
      });
    }

    /* ═══════════════════════════════════════════════════════════════════
   xidmetler-03claude.js
   — YALNIZ .process-section üçün:
     1) HTML strukturunu accordion üçün yenidən qurur
        (process-step-icon, process-step-title, process-step-desc
         elementlərini process-step-header + process-step-panel içinə alır)
     2) Accordion açma/bağlama məntiqini idarə edir
     3) xidmetler.js-in .process-step GSAP animasiyasını
        altdan-yuxarı (y:52→0) ilə override edir
   — Başqa heç bir koda toxunmur.
   ═══════════════════════════════════════════════════════════════════ */
 
(function () {
  'use strict';
 
  /* ── 1. HTML-i accordion strukturuna çevir ──────────────────────── */
  document.querySelectorAll('.process-step').forEach(function (step) {
 
    /* Artıq çevrilib — təkrar işləmə */
    if (step.querySelector('.process-step-header')) return;
 
    var numEl   = step.querySelector('.process-step-num');
    var iconEl  = step.querySelector('.process-step-icon');
    var titleEl = step.querySelector('.process-step-title');
    var descEl  = step.querySelector('.process-step-desc');
 
    if (!titleEl || !descEl) return;
 
    /* -- Chevron elementi yarat -- */
    var chevron = document.createElement('span');
    chevron.className = 'process-step-chevron';
    chevron.innerHTML = '<i class="fa-solid fa-chevron-down"></i>';
    chevron.setAttribute('aria-hidden', 'true');
 
    /* -- Header qrupu -- */
    var header = document.createElement('div');
    header.className = 'process-step-header';
    if (iconEl)  header.appendChild(iconEl);
    header.appendChild(titleEl);
    header.appendChild(chevron);
 
    /* -- Panel qrupu -- */
    var panel = document.createElement('div');
    panel.className = 'process-step-panel';
    panel.setAttribute('role', 'region');
    panel.appendChild(descEl);
 
    /* -- Body qrupu -- */
    var body = document.createElement('div');
    body.className = 'process-step-body';
    body.appendChild(header);
    body.appendChild(panel);
 
    /* Step içindəki hər şeyi sil, yenisini qur */
    /* numEl-i özü saxlayırıq (step-in birbaşa uşağı kimi) */
    while (step.firstChild) step.removeChild(step.firstChild);
    if (numEl) step.appendChild(numEl);
    step.appendChild(body);
 
    /* Accessibility */
    step.setAttribute('role', 'button');
    step.setAttribute('aria-expanded', 'false');
    step.setAttribute('tabindex', '0');
  });
 
  /* ── 2. Accordion click / keyboard məntiq ───────────────────────── */
  var steps = Array.from(document.querySelectorAll('.process-step'));
 
  function openStep(step) {
    step.classList.add('ps-open');
    step.setAttribute('aria-expanded', 'true');
  }
 
  function closeStep(step) {
    step.classList.remove('ps-open');
    step.setAttribute('aria-expanded', 'false');
  }
 
  function toggleStep(step) {
    var isOpen = step.classList.contains('ps-open');
 
    /* Bütün digərlərini bağla */
    steps.forEach(function (s) { if (s !== step) closeStep(s); });
 
    if (isOpen) {
      closeStep(step);
    } else {
      openStep(step);
    }
  }
 
  steps.forEach(function (step) {
    step.addEventListener('click', function () {
      toggleStep(step);
    });
    step.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleStep(step);
      }
    });
  });
 
  /* İlk addımı avtomatik aç */
  if (steps.length > 0) openStep(steps[0]);
 
  /* ── 3. GSAP: mövcud .process-step ScrollTrigger-ləri kill et ────── */
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    /* GSAP yoxdursa, sadəcə görünür et */
    steps.forEach(function (s) {
      s.style.opacity = '1';
      s.style.transform = 'none';
    });
    return;
  }
 
  ScrollTrigger.getAll().forEach(function (st) {
    var el = st.trigger;
    if (el && el.classList && el.classList.contains('process-step')) {
      st.kill();
      gsap.set(el, { clearProps: 'all' });
    }
  });
 
  /* ── 4. Yeni animasiya: altdan yuxarı, stagger ──────────────────── */
  steps.forEach(function (el, i) {
    gsap.set(el, { opacity: 0, y: 52 });
 
    gsap.to(el, {
      opacity   : 1,
      y         : 0,
      duration  : 0.68,
      ease      : 'power3.out',
      delay     : i * 0.09,
      scrollTrigger: {
        trigger      : el,
        start        : 'top 91%',
        toggleActions: 'play none none none'
      }
    });
  });
 
})();
    