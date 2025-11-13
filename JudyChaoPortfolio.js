// =============================================
// Judy Chao — Portfolio JS (imperative style)
// Matches your music-player code style: simple globals,
// direct DOM updates, minimal abstractions.
// File: JudyChaoPortfolio.js
// =============================================

// ---------- Global state ----------
let headerShrunk = false

// ---------- Helpers (minimal) ----------
function $(sel, el){ return (el||document).querySelector(sel) }
function $all(sel, el){ return Array.from((el||document).querySelectorAll(sel)) }

// ---------- 1) Hero 背景（與 #songplayer 類似寫法） ----------
function setHeroBackground(){
  const hero = $('#profile')
  if(!hero) return
  const url = hero.getAttribute('data-bg')
  if(url){ hero.style.backgroundImage = `url(${url})` }
}

// ---------- 2) 平滑卷動（簡化版） ----------
function bindSmoothScroll(){
  const links = $all('a[href^="#"]')
  links.forEach(link=>{
    link.addEventListener('click', function(e){
      const hash = link.getAttribute('href')
      if(!hash || hash.length<=1) return
      const target = $(hash)
      if(!target) return
      e.preventDefault()
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
      history.pushState(null, '', hash)
    })
  })
}

// ---------- 3) 導航高亮（與你的 if/else 範式一致） ----------
function setActiveNav(){
  const navLinks = $all('.nav__link[href^="#"], a[href^="#"][data-nav]')
  if(navLinks.length===0) return

  const sections = navLinks
    .map(a => $(a.getAttribute('href')))
    .filter(Boolean)

  const io = new IntersectionObserver(function(entries){
    for(const entry of entries){
      if(entry.isIntersecting === true){
        const id = '#' + entry.target.id
        navLinks.forEach(a=>{
          if(a.getAttribute('href') === id){ a.classList.add('is-active') }
          else { a.classList.remove('is-active') }
        })
      }
    }
  }, { root: null, rootMargin: '0px 0px -60% 0px', threshold: 0 })

  sections.forEach(sec=> io.observe(sec))
}

// ---------- 4) Avatar lazy + 淡入（簡潔） ----------
function initAvatar(){
  const img = $('.avatar img')
  if(!img) return
  img.style.opacity = '0'
  img.style.transition = 'opacity .4s ease'
  img.loading = 'lazy'
  img.addEventListener('load', function(){ img.style.opacity = '1' })
}

// ---------- 5) 小型提示（toast） ----------
let _toastTimer = null
function showToast(msg){
  let el = $('#_toast')
  if(!el){
    el = document.createElement('div')
    el.id = '_toast'
    el.style.position = 'fixed'
    el.style.right = '16px'
    el.style.bottom = '16px'
    el.style.zIndex = '999'
    el.style.padding = '10px 12px'
    el.style.borderRadius = '10px'
    el.style.background = 'rgba(44,44,44,0.9)'
    el.style.color = 'white'
    el.style.boxShadow = '0 4px 10px rgba(0,0,0,.4)'
    el.style.fontSize = '14px'
    el.style.transition = 'opacity .2s'
    el.style.opacity = '0'
    document.body.appendChild(el)
  }
  el.textContent = msg
  requestAnimationFrame(()=>{ el.style.opacity = '1' })
  clearTimeout(_toastTimer)
  _toastTimer = setTimeout(()=>{ el.style.opacity = '0' }, 1800)
}

// ---------- 6) Buttons（採用 data-action 與 if/else 判斷） ----------
function bindButtons(){
  const area = $('.buttons') || document
  area.addEventListener('click', function(e){
    const btn = e.target.closest('[data-action]')
    if(!btn) return
    const action = btn.getAttribute('data-action')

    if(action === 'contact'){
      const target = $('#contact') || $('[data-section="contact"]')
      if(target){ target.scrollIntoView({ behavior: 'smooth', block: 'start' }) }
    }
    else if(action === 'resume'){
      const directUrl = btn.getAttribute('data-url')
      if(directUrl){
        window.open(directUrl, '_blank', 'noopener')
      } else {
        // 沒有 data-url -> 快速選語言（OK=EN / Cancel=中文）
        const ok = confirm('Open which version?\nOK = English\nCancel = 中文')
        const url = ok ? '趙子寧2025履歷英.pdf' : '趙子寧2025履歷中.pdf'
        window.open(url, '_blank', 'noopener')
      }
    }
    else if(action === 'email'){
      const mail = btn.getAttribute('data-email') || 'hello@example.com'
      window.location.href = 'mailto:' + mail
    }
    else if(action === 'link'){
      const url = btn.getAttribute('data-url')
      if(url){ window.open(url, '_blank', 'noopener') }
    }
  })
}

// ---------- 7) Project 圖片燈箱（簡易 <dialog>） ----------
function bindLightbox(){
  const imgs = $all('.project-card img')
  if(imgs.length===0 || !('HTMLDialogElement' in window)) return

  const dlg = document.createElement('dialog')
  dlg.setAttribute('aria-label', 'Image preview')
  dlg.style.padding = '0'
  dlg.style.border = 'none'
  dlg.style.background = 'transparent'
  dlg.innerHTML = `
    <div style="position:fixed; inset:0; background:rgba(0,0,0,.8); display:flex; align-items:center; justify-content:center;">
      <img id="_lb_img" alt="preview" style="max-width:92vw; max-height:86vh; border-radius:10px; box-shadow:0 10px 28px rgba(0,0,0,.6)" />
    </div>`
  document.body.appendChild(dlg)

  const imgEl = $('#_lb_img', dlg)
  imgs.forEach(function(img){
    img.style.cursor = 'zoom-in'
    img.addEventListener('click', function(){
      imgEl.src = img.currentSrc || img.src
      if(!dlg.open) dlg.showModal()
    })
  })

  dlg.addEventListener('click', function(){ dlg.close() })
  document.addEventListener('keydown', function(e){ if(e.key==='Escape' && dlg.open) dlg.close() })
}

// ---------- 8) Scroll reveal（與你 if/else 邏輯一致） ----------
function bindReveal(){
  const els = $all('.reveal')
  if(els.length===0) return

  const prefersReduced = matchMedia('(prefers-reduced-motion: reduce)').matches
  if(prefersReduced === true) return

  els.forEach(function(el){
    el.style.opacity = '0'
    el.style.transform = 'translateY(8px)'
    el.style.transition = 'opacity .5s ease, transform .5s ease'
  })

  const io = new IntersectionObserver(function(entries){
    for(const e of entries){
      if(e.isIntersecting === true){
        e.target.style.opacity = '1'
        e.target.style.transform = 'translateY(0)'
        io.unobserve(e.target)
      }
    }
  }, { threshold: 0.15 })

  els.forEach(el=> io.observe(el))
}

// ---------- 9) Contact 表單（小型處理） ----------
function bindContactForm(){
  const form = $('#contactForm')
  if(!form) return

  form.addEventListener('submit', function(e){
    e.preventDefault()
    const name = $('#contactName')?.value?.trim()
    const email = $('#contactEmail')?.value?.trim()
    const msg = $('#contactMsg')?.value?.trim()

    if(!name || !email || !msg){
      showToast('請填寫完整資訊')
    } else {
      showToast('已收到！我會盡快回覆你')
      form.reset()
    }
  })
}

// ---------- 10) Header 微縮（if / else） ----------
function handleHeaderOnScroll(){
  const header = $('.header')
  if(!header) return

  function onScroll(){
    const y = window.scrollY
    if(y > 6 && headerShrunk === false){
      header.style.backdropFilter = 'blur(10px)'
      header.style.background = 'rgba(17,17,22,0.82)'
      header.style.borderBottomColor = '#2a2a3a'
      headerShrunk = true
    } else if(y <= 6 && headerShrunk === true){
      header.style.backdropFilter = 'blur(8px)'
      header.style.background = 'rgba(17,17,22,0.75)'
      header.style.borderBottomColor = '#232334'
      headerShrunk = false
    }
  }

  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
}

// ---------- Init（一步步呼叫，像你的 loadSong() 方式） ----------
function initPortfolio(){
  setHeroBackground()
  bindSmoothScroll()
  setActiveNav()
  initAvatar()
  bindButtons()
  bindLightbox()
  bindReveal()
  bindContactForm()
  handleHeaderOnScroll()
}

if(document.readyState === 'loading'){
  document.addEventListener('DOMContentLoaded', initPortfolio)
} else {
  initPortfolio()
}

