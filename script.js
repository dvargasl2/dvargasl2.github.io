/* ========== NAVBAR: scroll effect ========== */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
});

/* ========== MOBILE MENU ========== */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

// Close menu on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

/* ========== TYPED TEXT ========== */
const phrases = [
  'CS + IE Student @ Uniandes',
  'Python & Java Developer',
  'Trilingual Communicator',
  'Teaching Assistant',
  'Problem Solver'
];
let phraseIndex = 0;
let charIndex   = 0;
let deleting    = false;
const typedEl   = document.getElementById('typed-text');

function type() {
  const current = phrases[phraseIndex];
  if (!deleting) {
    typedEl.textContent = current.slice(0, charIndex + 1);
    charIndex++;
    if (charIndex === current.length) {
      deleting = true;
      setTimeout(type, 1800);
      return;
    }
  } else {
    typedEl.textContent = current.slice(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      deleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
    }
  }
  setTimeout(type, deleting ? 40 : 70);
}
type();

/* ========== INTERSECTION OBSERVER: reveal on scroll ========== */
const revealEls = document.querySelectorAll(
  '.timeline-card, .skill-category, .focus-card, .beyond-card, .project-card, .contact-card, .about-stats, .about-languages'
);
revealEls.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger siblings
        const siblings = Array.from(entry.target.parentElement?.children || []);
        const idx = siblings.indexOf(entry.target);
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, idx * 80);
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);
revealEls.forEach(el => observer.observe(el));

/* ========== LANGUAGE BARS ========== */
const langObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.lang-fill').forEach(bar => {
          bar.classList.add('animated');
        });
        langObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.3 }
);
const langSection = document.querySelector('.about-languages');
if (langSection) langObserver.observe(langSection);

/* ========== ACTIVE NAV LINK on scroll ========== */
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    const top = sec.offsetTop - 80;
    if (window.scrollY >= top) current = sec.getAttribute('id');
  });
  navAnchors.forEach(a => {
    a.style.color = a.getAttribute('href') === `#${current}` ? 'var(--accent)' : '';
  });
}, { passive: true });
