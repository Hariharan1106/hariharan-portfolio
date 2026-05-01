/* ==============================
   PORTFOLIO.JS — Anantha Hariharan V
   ============================== */

// ── THEME TOGGLE ──────────────────────────────────────
const toggle = document.getElementById('toggle');
const html = document.documentElement;

const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
html.setAttribute('data-theme', savedTheme);

toggle.addEventListener('click', () => {
  const current = html.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('portfolio-theme', next);
});

// ── NAVBAR SCROLL EFFECT ──────────────────────────────
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  navbar.classList.toggle('scrolled', scrollY > 30);
  lastScroll = scrollY;
});

// ── HAMBURGER MENU ────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});

// Close mobile menu on link click
document.querySelectorAll('.mob-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
  });
});

// ── CUSTOM CURSOR ─────────────────────────────────────
const cursor = document.getElementById('cursor');
const cursorDot = document.getElementById('cursorDot');

if (window.innerWidth > 768) {
  let mouseX = 0, mouseY = 0;
  let curX = 0, curY = 0;

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorDot.style.left = mouseX + 'px';
    cursorDot.style.top = mouseY + 'px';
  });

  function animateCursor() {
    curX += (mouseX - curX) * 0.12;
    curY += (mouseY - curY) * 0.12;
    cursor.style.left = curX + 'px';
    cursor.style.top = curY + 'px';
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  // Hover effect on interactive elements
  const hoverTargets = document.querySelectorAll('a, button, .skill-card, .project-card, .form-input, .form-textarea');
  hoverTargets.forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
  });
}

// ── SCROLL REVEAL ─────────────────────────────────────
const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, {
  threshold: 0.12,
  rootMargin: '0px 0px -40px 0px'
});

revealEls.forEach(el => revealObserver.observe(el));

// ── SKILL BAR ANIMATION ───────────────────────────────
const skillCards = document.querySelectorAll('.skill-card');

const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.3 });

skillCards.forEach(card => skillObserver.observe(card));

// ── SMOOTH SCROLL FOR ANCHOR LINKS ────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    const offset = document.getElementById('navbar').offsetHeight;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

// ── ACTIVE NAV LINK HIGHLIGHTING ──────────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === '#' + entry.target.id) {
          link.style.color = 'var(--accent)';
        }
      });
    }
  });
}, { threshold: 0.5 });

sections.forEach(sec => sectionObserver.observe(sec));

// ── CONTACT FORM SUBMISSION ────────────────────────────
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

contactForm.addEventListener('submit', e => {
  e.preventDefault();
  const btn = contactForm.querySelector('button[type="submit"]');
  btn.textContent = 'Sending…';
  btn.disabled = true;

  setTimeout(() => {
    btn.textContent = 'Send Message →';
    btn.disabled = false;
    contactForm.reset();
    formSuccess.classList.add('show');
    setTimeout(() => formSuccess.classList.remove('show'), 4000);
  }, 1200);
});

// ── TYPING EFFECT ON HOME TAG ──────────────────────────
const homeTag = document.querySelector('.home-tag');
if (homeTag) {
  const text = 'Frontend Developer';
  homeTag.textContent = '';
  let i = 0;
  function typeChar() {
    if (i < text.length) {
      homeTag.textContent += text[i++];
      setTimeout(typeChar,60);
    }
  }
  // Start after a short delay
  setTimeout(typeChar, 400);
}

// ── STAGGER HOME REVEALS ON LOAD ──────────────────────
window.addEventListener('load', () => {
  document.querySelectorAll('.home .reveal').forEach(el => {
    el.classList.add('visible');
  });
});

// ── PARALLAX GRID OVERLAY ──────────────────────────────
const gridOverlay = document.querySelector('.home-grid-overlay');
if (gridOverlay) {
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    gridOverlay.style.transform = `translateY(${y * 0.3}px)`;
  }, { passive: true });
}