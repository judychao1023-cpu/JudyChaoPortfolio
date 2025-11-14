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
        ...qsa('.project-card img')
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
      
      setupReveal();
      setupHeaderShrink();
    }
  
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
    } else {
      init();
    }
  })();

 /* ===============================
   Gallery Lightbox
   =============================== */

const figures = document.querySelectorAll(".gallery__item");
let lightboxIndex = 0;
let lightboxImages = [];

// 建立 Lightbox DOM
const lightbox = document.createElement("div");
lightbox.className = "lightbox";
lightbox.innerHTML = `
  <div class="lightbox-overlay"></div>
  <button class="lightbox-close">×</button>
  <button class="lightbox-prev">‹</button>
  <img class="lightbox-img">
  <button class="lightbox-next">›</button>
`;
document.body.appendChild(lightbox);

const imgEl = lightbox.querySelector(".lightbox-img");

function openLightbox(images, index) {
  lightboxImages = images;
  lightboxIndex = index;
  imgEl.src = lightboxImages[lightboxIndex];
  lightbox.classList.add("show");
}

figures.forEach(fig => {
  fig.addEventListener("click", () => {
    const listAttr = fig.dataset.images;
    let imgs = [];
    let startIndex = 0;   // ✅ 一律從第一張（index 0）開始

    if (listAttr) {
      // 有 data-images → 一組圖（第一張就是封面）
      imgs = listAttr.split(",").map(s => s.trim());
    } else {
      // 沒 data-images → 單張圖，用自己這張
      const imgTag = fig.querySelector("img");
      if (imgTag) {
        imgs = [imgTag.src];
      }
    }

    if (!imgs.length) return;  // 保險
    openLightbox(imgs, startIndex);
  });
});

lightbox.querySelector(".lightbox-close").onclick = () => {
  lightbox.classList.remove("show");
};

lightbox.querySelector(".lightbox-prev").onclick = () => {
  lightboxIndex = (lightboxIndex - 1 + lightboxImages.length) % lightboxImages.length;
  imgEl.src = lightboxImages[lightboxIndex];
};

lightbox.querySelector(".lightbox-next").onclick = () => {
  lightboxIndex = (lightboxIndex + 1) % lightboxImages.length;
  imgEl.src = lightboxImages[lightboxIndex];
};
