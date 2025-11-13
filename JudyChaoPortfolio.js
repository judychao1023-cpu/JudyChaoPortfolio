/* =============================================
   Judy Chao — Portfolio JS (multi-page)
   File: JudyChaoPortfolio.js
   ============================================= */

   (() => {
    const qs = (sel, el = document) => el.querySelector(sel);
    const qsa = (sel, el = document) => Array.from(el.querySelectorAll(sel));
  
    /* ---------- Hero 背景：讀 data-bg ---------- */
    function setupHeroBackground() {
      const hero = qs('.hero--welcome');
      if (!hero) return;
      const bg = hero.getAttribute('data-bg');
      if (bg) {
        hero.style.backgroundImage = `url("${bg}")`;
      }
    }
  
    /* ---------- Nav 漢堡切換 ---------- */
    function setupNavToggle() {
      const btn = qs('.nav-toggle');
      const links = qsa('.nav__link');
      if (!btn) return;
  
      btn.addEventListener('click', () => {
        const isOpen = document.body.classList.toggle('nav-open');
        btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      });
  
      // 點選任一選單後收起
      links.forEach(link => {
        link.addEventListener('click', () => {
          document.body.classList.remove('nav-open');
          btn.setAttribute('aria-expanded', 'false');
        });
      });
    }
  
    /* ---------- Avatar 淡入（About 頁） ---------- */
    function initAvatar() {
      const img = qs('.avatar img');
      if (!img) return;
  
      const makeReady = () => {
        img.classList.add('is-ready');
        img.style.opacity = '1';
      };
  
      // 如果圖片已快取載入
      if (img.complete && img.naturalWidth > 0) {
        makeReady();
        return;
      }
  
      // 正常載入流程
      img.addEventListener('load', makeReady, { once: true });
      img.addEventListener('error', () => {
        // 載入失敗也讓它顯示，避免一直 0
        img.style.opacity = '1';
        console.warn('[Avatar] load error, please check judy2.jpg path.');
      }, { once: true });
    }
  
    /* ---------- Back to top ---------- */
    function setupBackToTop() {
      const btn = qs('#backToTop');
      if (!btn) return;
  
      const showAt = 200;
      const onScroll = () => {
        if (window.scrollY > showAt) btn.classList.add('show');
        else btn.classList.remove('show');
      };
  
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
  
      btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  
    /* ---------- Lightbox (Projects + Gallery) ---------- */
    function setupLightbox() {
      const imgs = [
        ...qsa('.project-card img'),
        ...qsa('.gallery__item img')
      ];
      if (!imgs.length || !('HTMLDialogElement' in window)) return;
  
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
  
      imgs.forEach(img => {
        img.style.cursor = 'zoom-in';
        img.addEventListener('click', () => {
          imgEl.src = img.currentSrc || img.src;
          if (!dlg.open) dlg.showModal();
        });
      });
  
      dlg.addEventListener('click', () => dlg.close());
      document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && dlg.open) dlg.close();
      });
    }
  
    /* ---------- Scroll Reveal (reveal class) ---------- */
    function setupReveal() {
      const els = qsa('.reveal');
      if (!els.length) return;
  
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReduced) {
        els.forEach(el => {
          el.style.opacity = '1';
          el.style.transform = 'none';
        });
        return;
      }
  
      els.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(8px)';
        el.style.transition = 'opacity .5s ease, transform .5s ease';
      });
  
      const io = new IntersectionObserver(entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.style.opacity = '1';
            e.target.style.transform = 'translateY(0)';
            io.unobserve(e.target);
          }
        });
      }, { threshold: 0.15 });
  
      els.forEach(el => io.observe(el));
    }
  
    /* ---------- Header 小小收縮 / 背景微調 ---------- */
    function setupHeaderShrink() {
      const header = qs('.header');
      if (!header) return;
  
      const onScroll = () => {
        const y = Math.max(0, Math.min(window.scrollY, 120));
        header.style.backdropFilter = y > 6 ? 'blur(10px)' : 'blur(8px)';
        header.style.background = y > 6 ? 'rgba(17,17,22,0.86)' : 'rgba(17,17,22,0.78)';
        header.style.borderBottomColor = y > 6 ? '#2a2a3a' : '#232334';
      };
  
      onScroll();
      window.addEventListener('scroll', onScroll, { passive: true });
    }
  
    /* ---------- Init ---------- */
    function init() {
      setupHeroBackground();
      setupNavToggle();
      initAvatar();
      setupBackToTop();
      setupLightbox();
      setupReveal();
      setupHeaderShrink();
    }
  
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
    } else {
      init();
    }
  })();

  // ===============================
// Gallery Lightbox
// ===============================
document.addEventListener('DOMContentLoaded', function () {
    const lightbox = document.getElementById('lightbox');
    if (!lightbox) return; // 只有在 gallery.html 才會執行
  
    const overlay = lightbox.querySelector('.lightbox__overlay');
    const imgEl = lightbox.querySelector('.lightbox__img');
    const btnClose = lightbox.querySelector('.lightbox__close');
    const btnPrev = lightbox.querySelector('.lightbox__arrow--prev');
    const btnNext = lightbox.querySelector('.lightbox__arrow--next');
    const thumbs = Array.from(document.querySelectorAll('.gallery__item img'));
  
    let currentIndex = 0;
  
    // 打開 lightbox
    function openLightbox(index) {
      if (!thumbs.length) return;
      currentIndex = index;
      const src = thumbs[currentIndex].getAttribute('src');
      imgEl.src = src;
      lightbox.classList.add('is-open');
      document.body.style.overflow = 'hidden'; // 禁止後面滾動
    }
  
    // 關閉
    function closeLightbox() {
      lightbox.classList.remove('is-open');
      document.body.style.overflow = '';
    }
  
    // 換圖
    function showNext(delta) {
      if (!thumbs.length) return;
      currentIndex = (currentIndex + delta + thumbs.length) % thumbs.length;
      const src = thumbs[currentIndex].getAttribute('src');
      imgEl.src = src;
    }
  
    // 點縮圖 → 開啟
    thumbs.forEach((img, idx) => {
      img.addEventListener('click', () => {
        openLightbox(idx);
      });
    });
  
    // 關閉事件
    btnClose.addEventListener('click', closeLightbox);
    overlay.addEventListener('click', closeLightbox);
  
    // 左右箭頭
    btnPrev.addEventListener('click', () => showNext(-1));
    btnNext.addEventListener('click', () => showNext(1));
  
    // 鍵盤支援：Esc / ← →
    window.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('is-open')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') showNext(-1);
      if (e.key === 'ArrowRight') showNext(1);
    });
  });
  