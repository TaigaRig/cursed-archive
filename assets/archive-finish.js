/* Cursed Archive — unified progressive interaction layer. */
(() => {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = window.matchMedia('(pointer: fine)').matches;
  const root = document.documentElement;
  const hero = document.querySelector('.hero-media img');
  const targets = document.querySelectorAll('.section-head,.system-poster,.cast-feature,.cast-mini,.domain-card,.incident-grid,.support-frame');
  if (!reduce && 'IntersectionObserver' in window) {
    targets.forEach((el, i) => { el.classList.add('js-reveal', 'is-pending'); el.dataset.delay = String(i % 4); });
    const observer = new IntersectionObserver((entries, obs) => { entries.forEach(entry => { if (!entry.isIntersecting) return; entry.target.classList.remove('is-pending'); entry.target.classList.add('is-visible'); obs.unobserve(entry.target); }); }, { threshold: .12, rootMargin: '0px 0px -8% 0px' });
    targets.forEach(el => observer.observe(el));
  }
  let scrollFrame = 0;
  const updateScroll = () => { const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight); const progress = Math.min(1, Math.max(0, window.scrollY / max)); root.style.setProperty('--scroll-progress', progress.toFixed(4)); if (hero && !reduce) hero.style.setProperty('--hero-drift', Math.min(42, window.scrollY * .055).toFixed(1) + 'px'); scrollFrame = 0; };
  window.addEventListener('scroll', () => { if (!scrollFrame) scrollFrame = window.requestAnimationFrame(updateScroll); }, { passive: true }); updateScroll();
  if (fine && !reduce) document.querySelectorAll('.tilt').forEach(el => {
    el.addEventListener('pointermove', event => { const rect = el.getBoundingClientRect(), x = (event.clientX - rect.left) / rect.width - .5, y = (event.clientY - rect.top) / rect.height - .5; el.style.setProperty('--pointer-rx', (-y * 3.5).toFixed(2) + 'deg'); el.style.setProperty('--pointer-ry', (x * 4).toFixed(2) + 'deg'); }, { passive: true });
    el.addEventListener('pointerleave', () => { el.style.removeProperty('--pointer-rx'); el.style.removeProperty('--pointer-ry'); });
  });
})();