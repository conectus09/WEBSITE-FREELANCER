/* =============================================
   script.js — Portfolio Website JavaScript
   ============================================= */

// ——— DOM READY ———
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initMobileMenu();
  initScrollReveal();
  initContactForm();
  initSmoothScroll();
  initActiveNavLinks();
});


// ——— NAVBAR: Scroll state ———
function initNavbar() {
  const navbar = document.getElementById('navbar');

  const handleScroll = () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Run on load
}


// ——— MOBILE MENU ———
function initMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
  });

  // Close menu on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target) && navLinks.classList.contains('open')) {
      hamburger.classList.remove('active');
      navLinks.classList.remove('open');
      document.body.style.overflow = '';
    }
  });
}


// ——— SCROLL REVEAL ———
function initScrollReveal() {
  const revealEls = document.querySelectorAll('.reveal, .reveal-right');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Don't unobserve — keep visible once seen
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -50px 0px'
  });

  revealEls.forEach(el => observer.observe(el));
}


// ——— CONTACT FORM ———
function initContactForm() {
  const form = document.getElementById('contactForm');
  const successMsg = document.getElementById('formSuccess');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const btn = form.querySelector('button[type="submit"]');
    const originalHTML = btn.innerHTML;

    // Loading state
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
    btn.disabled = true;
    btn.style.opacity = '0.8';

    // Simulate sending (replace with actual fetch/emailJS/formspree)
    setTimeout(() => {
      btn.innerHTML = originalHTML;
      btn.disabled = false;
      btn.style.opacity = '1';

      // Show success
      successMsg.classList.add('show');
      form.reset();

      // Hide success after 5 seconds
      setTimeout(() => {
        successMsg.classList.remove('show');
      }, 5000);
    }, 1800);
  });
}


// ——— SMOOTH SCROLL (for anchor links) ———
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (!target) return;

      e.preventDefault();

      const navbarH = document.getElementById('navbar').offsetHeight;
      const targetPos = target.getBoundingClientRect().top + window.scrollY - navbarH;

      window.scrollTo({
        top: targetPos,
        behavior: 'smooth'
      });
    });
  });
}


// ——— ACTIVE NAV LINKS (highlight current section) ———
function initActiveNavLinks() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.remove('active-link');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active-link');
          }
        });
      }
    });
  }, {
    threshold: 0.45
  });

  sections.forEach(section => observer.observe(section));
}


// ——— COUNTER ANIMATION for hero stats ———
function animateCounter(el, target, duration = 1500) {
  const start = 0;
  const step = (timestamp) => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // ease out cubic
    el.textContent = Math.floor(eased * target) + (el.dataset.suffix || '');
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

// Trigger counter when hero stats are visible
const statNumbers = document.querySelectorAll('.stat-number');
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const text = el.textContent.trim();

      if (text.includes('10+')) {
        animateCounterText(el, 10, '+');
      } else if (text.includes('1') && text.length <= 2) {
        animateCounterText(el, 1, '');
      } else if (text.includes('20')) {
        animateCounterText(el, 20, '');
      }

      statsObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

statNumbers.forEach(el => statsObserver.observe(el));

function animateCounterText(el, target, suffix) {
  const duration = 1200;
  const startTime = performance.now();

  const update = (currentTime) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target) + suffix;
    if (progress < 1) requestAnimationFrame(update);
  };

  requestAnimationFrame(update);
}


// ——— TYPING EFFECT for hero heading (subtle cursor) ———
const heroHeading = document.querySelector('.hero-heading');
if (heroHeading) {
  // Add subtle entrance animation via class
  heroHeading.style.animationFillMode = 'both';
}


// ——— PARALLAX: subtle background shapes on scroll ———
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const shapes = document.querySelectorAll('.shape');

  shapes.forEach((shape, i) => {
    const speed = [0.03, 0.05, 0.04][i] || 0.03;
    const direction = i % 2 === 0 ? 1 : -1;
    shape.style.transform = `translateY(${scrollY * speed * direction}px)`;
  });
}, { passive: true });


// ——— CARD TILT EFFECT (subtle 3D on hover) ———
document.querySelectorAll('.service-card, .why-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const tiltX = ((y - centerY) / centerY) * 4;
    const tiltY = ((x - centerX) / centerX) * -4;

    card.style.transform = `translateY(-6px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
    card.style.transformStyle = 'preserve-3d';
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.transformStyle = '';
  });
});


// ——— ACTIVE LINK STYLE INJECTION ———
const style = document.createElement('style');
style.textContent = `
  .nav-links a.active-link {
    color: var(--accent) !important;
  }
  .nav-links a.active-link::after {
    width: 100% !important;
  }
`;
document.head.appendChild(style);
