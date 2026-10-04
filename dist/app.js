(() => {
  const config = window.schoolConfig;
  const dialog = document.querySelector('#contact-dialog');
  let previousFocus;
  const modalContext = dialog.querySelector('.dialog-context');
  const openNotice = context => {
    previousFocus = document.activeElement;
    modalContext.textContent = context ?? '';
    modalContext.hidden = !context;
    dialog.showModal();
    document.body.classList.add('dialog-open');
    dialog.querySelector('.close-dialog').focus();
  };
  const closeNotice = () => dialog.close();
  dialog.querySelector('.close-dialog').addEventListener('click', closeNotice);
  dialog.querySelector('.close-action').removeAttribute('data-contact');
  dialog.querySelector('.close-action').addEventListener('click', closeNotice);
  dialog.addEventListener('click', e => {
    if (e.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    if (e.clientX < rect.left || e.clientX > rect.right || e.clientY < rect.top || e.clientY > rect.bottom) closeNotice();
  });
  dialog.addEventListener('close', () => {
    document.body.classList.remove('dialog-open');
    previousFocus?.focus();
  });
  dialog.addEventListener('keydown', e => {
    if (e.key !== 'Tab') return;
    const controls = [...dialog.querySelectorAll('button, a[href], input, select, textarea, [tabindex="0"]')].filter(el => !el.disabled && el.getClientRects().length);
    if (!controls.length) return;
    if (e.shiftKey && document.activeElement === controls[0]) { e.preventDefault(); controls.at(-1).focus(); }
    if (!e.shiftKey && document.activeElement === controls.at(-1)) { e.preventDefault(); controls[0].focus(); }
  });
  const whatsappUrl = (phone, message) => `https://wa.me/${phone.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
  document.querySelectorAll('[data-contact]').forEach(b => b.addEventListener('click', () => {
    const type = b.dataset.contact;
    const target = config.contacts[type];
    if (target) {
      const url = type === 'whatsapp' ? whatsappUrl(target, `Olá! Tenho interesse em ${b.dataset.course ?? 'uma aula experimental'} da Arte Sobre as Cordas.`) : target;
      window.open(url, '_blank', 'noopener,noreferrer');
    } else openNotice(b.dataset.course ? `Seu interesse: ${b.dataset.course}.` : null);
  }));
  document.querySelectorAll('[data-online]').forEach(b => b.addEventListener('click', () => {
    const lesson = config.onlineLessons.find(l => l.id === b.dataset.online);
    if (lesson.availabilityConfirmed && lesson.whatsapp) window.open(whatsappUrl(lesson.whatsapp, lesson.initialMessage), '_blank', 'noopener,noreferrer');
    else openNotice(`Seu interesse: aulas online de ${lesson.instrument.toLowerCase()}.`);
  }));
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileNav = document.querySelector('#mobile-nav');
  const setMenu = open => {
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    mobileNav.classList.toggle('is-open', open);
  };
  menuToggle.addEventListener('click', () => setMenu(menuToggle.getAttribute('aria-expanded') !== 'true'));
  mobileNav.addEventListener('click', e => { if(e.target.closest('a')) setMenu(false); });
  document.addEventListener('click', e => { if(!e.target.closest('.site-header')) setMenu(false); });
  mobileNav.addEventListener('keydown', e => {
    const links = [...mobileNav.querySelectorAll('a')];
    if(e.key === 'Tab' && !e.shiftKey && e.target === links.at(-1)) { e.preventDefault(); setMenu(false); menuToggle.focus(); }
  });
  const more = document.querySelector('.more-toggle');
  const setMore = open => more.setAttribute('aria-expanded',String(open));
  more.addEventListener('click', () => setMore(more.getAttribute('aria-expanded')!=='true'));
  document.addEventListener('click', e => { if(!e.target.closest('.nav-more')) setMore(false); });
  document.querySelector('.nav-more').addEventListener('focusout', e => { if(!e.currentTarget.contains(e.relatedTarget)) setMore(false); });
  document.addEventListener('keydown', e => {
    if(e.key !== 'Escape') return;
    if(menuToggle.getAttribute('aria-expanded')==='true') {setMenu(false);menuToggle.focus();}
    if(more.getAttribute('aria-expanded')==='true') {setMore(false);more.focus();}
  });
  matchMedia('(min-width: 1061px)').addEventListener('change', e => { if(e.matches) setMenu(false); });
  const tabs = [...document.querySelectorAll('[role="tab"]')];
  const primeTabImage = (tab, priority = 'low') => {
    const img = document.getElementById(tab.getAttribute('aria-controls'))?.querySelector('img');
    if (!img) return;
    img.fetchPriority = priority;
    img.loading = 'eager';
  };
  const selectTab = selected => tabs.forEach(t => {
    const active = t === selected;
    t.setAttribute('aria-selected',String(active)); t.tabIndex=active?0:-1;
    document.getElementById(t.getAttribute('aria-controls')).hidden = !active;
    if (active) primeTabImage(t, 'high');
  });
  tabs.forEach((t,i) => {
    t.addEventListener('pointerenter',()=>primeTabImage(t));
    t.addEventListener('focus',()=>primeTabImage(t));
    t.addEventListener('click',()=>selectTab(t));
    t.addEventListener('keydown',e=>{
      let n;
      if(e.key==='ArrowRight') n=(i+1)%tabs.length;
      if(e.key==='ArrowLeft') n=(i+tabs.length-1)%tabs.length;
      if(e.key==='Home') n=0;
      if(e.key==='End') n=tabs.length-1;
      if(n!==undefined) {e.preventDefault(); selectTab(tabs[n]); tabs[n].focus();}
    });
  });
  const onlineSection = document.querySelector('.online-selection');
  const scrollAccents = [
    { anchor: document.querySelector('.discipline-strip'), target: document.querySelector('.discipline-strip .container'), direction: 1 },
    { anchor: document.querySelector('.stage-art'), target: document.querySelector('.stage-staff'), direction: -1 },
  ].filter(item => item.anchor && item.target);
  if (scrollAccents.length) {
    const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
    let motionFrame = 0;
    const updateAccents = () => {
      motionFrame = 0;
      const compact = innerWidth <= 760;
      const positions = scrollAccents.map(item => {
        const rect = item.anchor.getBoundingClientRect();
        const progress = Math.min(1, Math.max(0, (innerHeight - rect.top) / (innerHeight + rect.height)));
        const amplitude = item.direction === 1 ? (compact ? 10 : 28) : (compact ? 18 : 32);
        return { target: item.target, shift: (progress * 2 - 1) * amplitude * item.direction };
      });
      positions.forEach(({ target, shift }) => target.style.setProperty('--scroll-shift', `${shift.toFixed(2)}px`));
    };
    const queueMotion = () => {
      if (!reducedMotion.matches && !motionFrame) motionFrame = requestAnimationFrame(updateAccents);
    };
    reducedMotion.addEventListener('change', () => {
      cancelAnimationFrame(motionFrame);
      motionFrame = 0;
      scrollAccents.forEach(({ target }) => target.style.removeProperty('--scroll-shift'));
      queueMotion();
    });
    addEventListener('scroll', queueMotion, { passive: true });
    addEventListener('resize', queueMotion);
    queueMotion();
  }
  if (onlineSection && 'IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver(entries => {
      if (!entries.some(e => e.isIntersecting)) return;
      tabs.forEach(tab => primeTabImage(tab));
      imageObserver.disconnect();
    }, { rootMargin: '240px' });
    imageObserver.observe(onlineSection);
  }
  if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if(entry.isIntersecting) {entry.target.classList.add('is-visible');observer.unobserve(entry.target);}
    }), {threshold:0.05});
    document.querySelectorAll('.reveal').forEach(el => {
      if(el.getBoundingClientRect().top > innerHeight) observer.observe(el);
    });
  }
})();
