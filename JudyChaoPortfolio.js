/* =============================================
   Judy Chao — Portfolio JS (multi-page ready)
   File: JudyChaoPortfolio.js
   ============================================= */

   (() => {
    // ----------------------------- Helpers
    const qs = (sel, el = document) => el.querySelector(sel);
    const qsa = (sel, el = document) => Array.from(el.querySelectorAll(sel));
    const clamp = (n, min, max) => Math.max(min, Math.min(max, n));
  
    // ----------------------------- 1) Hero background
    function setupHeroBackground() {
      const hero = qs('#profile');
      if (!hero) return;
      const bg = hero.getAttribute('data-bg');
      if (bg) hero.style.backgroundImage = `url("${bg}")`;
    }
  
    // ----------------------------- 2) Smooth scroll (same-page only)
    function setupSmoothScroll() {
      const links = qsa('a[href^="#"]');
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      links.forEach((link) => {
        link.addEventListener('click', (e) => {
          const hash = link.getAttribute('href');
          if (!hash || hash.length <= 1) return;
          const target = qs(hash);
          if (!target) return;
          e.preventDefault();
          const y = target.getBoundingClientRect().top + window.scrollY - 10;
          if (prefersReduced) window.scrollTo(0, y);
          else window.scrollTo({ top: y, behavior: 'smooth' });
          history.pushState(null, '', hash);
        });
      });
    }
  
    // ----------------------------- 3) Active nav highlight (section-based)
    function setupActiveNav() {
      const navLinks = qsa('.nav__link[href^="#"], a[href^="#"][data-nav]');
      if (!navLinks.length) return;
      const sections = navLinks.map((a) => qs(a.getAttribute('href'))).filter(Boolean);
      if (!sections.length) return;
  
      const io = new IntersectionObserver((entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const id = `#${entry.target.id}`;
            navLinks.forEach((a) => a.classList.toggle('is-active', a.getAttribute('href') === id));
          }
        }
      }, { root: null, rootMargin: '0px 0px -60% 0px', threshold: 0 });
  
      sections.forEach((sec) => io.observe(sec));
    }
  
    // ----------------------------- 4) Avatar lazy + fade-in (robust)
    // Fix: if image is already cached (img.complete === true), show immediately and never set back to 0.
    function initAvatar() {
      const img = qs('.avatar img');
      if (!img) return;
  
      const makeReady = () => {
        img.style.opacity = '1';
        img.classList.add('is-ready');
      };
  
      // If explicit opt-out of fade
      if (img.hasAttribute('data-no-fade')) {
        makeReady();
        return;
      }
  
      // If image already loaded from cache, show immediately and exit
      if (img.complete) {
        makeReady();
        return;
      }
  
      // Default: start hidden then fade in on load
      img.style.opacity = '0';
      img.style.transition = 'opacity .4s ease';
      img.loading = 'lazy';
      img.addEventListener('load', makeReady, { once: true });
  
      // Safety: if any script later forces it to 0, restore to 1
      const obs = new MutationObserver((muts) => {
        for (const m of muts) {
          if (m.type === 'attributes' && m.attributeName === 'style') {
            if (img.style.opacity === '0') makeReady();
          }
        }
      });
      obs.observe(img, { attributes: true, attributeFilter: ['style'] });
  
      // Error handler to avoid staying invisible forever
      img.addEventListener('error', () => {
        makeReady();
        try { toast('頭貼載入失敗：請確認檔名與路徑'); } catch(_){}
        console.warn('[Avatar] load error. Check image path.');
      }, { once: true });
    }
  
    // ----------------------------- 5) Buttons row actions
    function setupButtons() {
      const area = qs('.buttons') || document;
      area.addEventListener('click', (e) => {
        const btn = e.target.closest('[data-action]');
        if (!btn) return;
        const action = btn.getAttribute('data-action');
  
        if (action === 'contact') {
          const target = qs('#contact') || qs('[data-section="contact"]');
          if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else if (action === 'resume') {
          const directUrl = btn.getAttribute('data-url');
          if (directUrl) window.open(directUrl, '_blank', 'noopener');
          else {
            const ok = confirm('Open which version?\nOK = English\nCancel = 中文');
            const url = ok ? '趙子寧2025履歷英.pdf' : '趙子寧2025履歷中.pdf';
            window.open(url, '_blank', 'noopener');
          }
        } else if (action === 'email') {
          const mail = btn.getAttribute('data-email') || 'hello@example.com';
          window.location.href = `mailto:${mail}`;
        } else if (action === 'link') {
          const url = btn.getAttribute('data-url');
          if (url) window.open(url, '_blank', 'noopener');
        }
      });
    }
  
    // ----------------------------- 6) Lightbox via <dialog>
    function setupLightbox() {
      const cards = qsa('.project-card img');
      if (!cards.length || !('HTMLDialogElement' in window)) return;
  
      const dlg = document.createElement('dialog');
      dlg.setAttribute('aria-label', 'Image preview');
      dlg.style.padding = '0';
      dlg.style.border = 'none';
      dlg.style.background = 'transparent';
      dlg.innerHTML = `
        <div style="position:fixed; inset:0; background:rgba(0,0,0,.8); display:flex; align-items:center; justify-content:center;">
          <img id="_lb_img" alt="preview" style="max-width:92vw; max-height:86vh; border-radius:10px; box-shadow:0 10px 28px rgba(0,0,0,.6)" />
        </div>`;
      document.body.appendChild(dlg);
  
      const imgEl = qs('#_lb_img', dlg);
      cards.forEach((img) => {
        img.style.cursor = 'zoom-in';
        img.addEventListener('click', () => {
          imgEl.src = img.currentSrc || img.src;
          if (!dlg.open) dlg.showModal();
        });
      });
  
      dlg.addEventListener('click', () => dlg.close());
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && dlg.open) dlg.close();
      });
    }
  
    // ----------------------------- 7) Scroll reveal
    function setupReveal() {
      const els = qsa('.reveal');
      if (!els.length) return;
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReduced) return;
  
      els.forEach((el) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(8px)';
        el.style.transition = 'opacity .5s ease, transform .5s ease';
      });
  
      const io = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.style.opacity = '1';
            e.target.style.transform = 'translateY(0)';
            io.unobserve(e.target);
          }
        });
      }, { threshold: 0.15 });
  
      els.forEach((el) => io.observe(el));
    }
  
    // ----------------------------- 8) Tiny toast
    let _toastTimer = null;
    function toast(msg = '', timeout = 1800) {
      let el = qs('#_toast');
      if (!el) {
        el = document.createElement('div');
        el.id = '_toast';
        el.style.position = 'fixed';
        el.style.right = '16px';
        el.style.bottom = '16px';
        el.style.zIndex = '999';
        el.style.padding = '10px 12px';
        el.style.borderRadius = '10px';
        el.style.background = 'rgba(44,44,44,0.9)';
        el.style.color = 'white';
        el.style.boxShadow = '0 4px 10px rgba(0,0,0,.4)';
        el.style.fontSize = '14px';
        el.style.transition = 'opacity .2s';
        el.style.opacity = '0';
        document.body.appendChild(el);
      }
      el.textContent = msg;
      requestAnimationFrame(() => (el.style.opacity = '1'));
      clearTimeout(_toastTimer);
      _toastTimer = setTimeout(() => { el.style.opacity = '0'; }, timeout);
    }
  
    // ----------------------------- 9) Contact form (only runs if exists)
    function setupContactForm() {
      const form = qs('#contactForm');
      if (!form) return;
  
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = qs('#contactName')?.value?.trim();
        const email = qs('#contactEmail')?.value?.trim();
        const msg = qs('#contactMsg')?.value?.trim();
  
        if (!name || !email || !msg) {
          toast('請填寫完整資訊');
          return;
        }
        toast('已收到！我會盡快回覆你');
        form.reset();
      });
    }
  
    // ----------------------------- 10) Header shrink
    function setupHeaderShrink() {
      const header = qs('.header');
      if (!header) return;
      const baseH = 60;
      const onScroll = () => {
        const y = clamp(window.scrollY, 0, 120);
        header.style.backdropFilter = y > 6 ? 'blur(10px)' : 'blur(8px)';
        header.style.background = y > 6 ? 'rgba(17,17,22,0.82)' : 'rgba(17,17,22,0.75)';
        header.style.borderBottomColor = y > 6 ? '#2a2a3a' : '#232334';
        header.style.height = y > 30 ? baseH - 4 + 'px' : baseH + 'px';
      };
      onScroll();
      window.addEventListener('scroll', onScroll, { passive: true });
    }
  
    // ----------------------------- Init
    function init() {
      setupHeroBackground();
      setupSmoothScroll();
      setupActiveNav(); // no-op on multi-page unless section anchors exist
      initAvatar();
      setupButtons();
      setupLightbox();
      setupReveal();
      setupContactForm();
      setupHeaderShrink();
    }
  
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
    } else {
      init();
    }
  })();
  

