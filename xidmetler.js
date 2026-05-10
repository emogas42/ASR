   const dmToggle=document.getElementById('dmToggle');
    const dmIcon=document.getElementById('dmIcon');
    const sun='<circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>';
    const moon='<path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>';
    let dark=false;
    dmToggle.addEventListener('click',()=>{dark=!dark;document.body.classList.toggle('dark-mode',dark);dmIcon.innerHTML=dark?sun:moon;});

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
    