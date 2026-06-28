/* ============================================================
   main.js — shared scripts
   ============================================================ */

/* Mark body so CSS reveal-hiding activates only with JS */
document.body.classList.add('js-ready');

/* ---- Scroll reveal via IntersectionObserver ---- */
(function initReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll('.reveal, .reveal-group').forEach((el) => {
    observer.observe(el);
  });
})();

/* ---- Active nav link ---- */
(function setActiveNav() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav__link').forEach((link) => {
    const href = link.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html')) {
      link.classList.add('is-active');
    }
  });
})();

/* ---- Case study: reading progress bar ---- */
(function initProgressBar() {
  const bar = document.querySelector('.progress-bar');
  if (!bar) return;

  function update() {
    const scrollTop = window.scrollY;
    const docH = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = docH > 0 ? (scrollTop / docH) * 100 + '%' : '0%';
  }

  window.addEventListener('scroll', update, { passive: true });
  update();
})();

/* ---- Case study: sticky side nav highlighting ---- */
(function initSideNav() {
  const sideLinks = document.querySelectorAll('.side-nav__link');
  if (!sideLinks.length) return;

  const sections = Array.from(sideLinks).map((link) => {
    const id = link.getAttribute('href').slice(1);
    return { link, el: document.getElementById(id) };
  }).filter((s) => s.el);

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          sideLinks.forEach((l) => l.classList.remove('is-active'));
          const active = sections.find((s) => s.el === entry.target);
          if (active) active.link.classList.add('is-active');
        }
      });
    },
    { threshold: 0.3, rootMargin: '-80px 0px -60% 0px' }
  );

  sections.forEach(({ el }) => observer.observe(el));
})();
