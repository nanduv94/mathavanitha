// Hamburger menu
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');
if (hamburger) {
  hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
}

// Intersection Observer for animate-on-scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 100);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el));

// Count-up animation for stat numbers
const countEls = document.querySelectorAll('.stat-num[data-count]');
const countObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = parseInt(el.dataset.count);
      let current = 0;
      const step = Math.ceil(target / 40);
      const timer = setInterval(() => {
        current = Math.min(current + step, target);
        el.textContent = current + '+';
        if (current >= target) clearInterval(timer);
      }, 40);
      countObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });
countEls.forEach(el => countObserver.observe(el));

// Contact form AJAX
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('.btn-submit');
    btn.textContent = 'Sending…'; btn.disabled = true;
    const data = {
      name: contactForm.name.value,
      email: contactForm.email.value,
      message: contactForm.message.value,
    };
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (json.success) {
        document.getElementById('formSuccess').style.display = 'block';
        contactForm.reset();
      }
    } catch (_) {}
    btn.textContent = 'Send Message'; btn.disabled = false;
  });
}

// Nav scroll style
window.addEventListener('scroll', () => {
  const nav = document.querySelector('.nav');
  if (window.scrollY > 40) nav.style.boxShadow = '0 2px 20px rgba(0,0,0,.08)';
  else nav.style.boxShadow = 'none';
});
