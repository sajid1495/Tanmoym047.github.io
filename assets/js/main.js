// Main JS for portfolio: menu toggle, dark mode, smooth scroll, simple form handling
document.addEventListener('DOMContentLoaded', function () {
  // mobile menu
  const menuBtn = document.getElementById('menuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  menuBtn && menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
  });

  // No dark mode: page stays white-only. Removed dark toggle.
  // Theme handling: support light/dark with system fallback and persistence
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = document.getElementById('themeIcon');
  const applyTheme = (theme) => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.body.classList.remove('bg-white', 'text-slate-800');
      document.body.classList.add('bg-slate-900', 'text-slate-100');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('bg-slate-900', 'text-slate-100');
      document.body.classList.add('bg-white', 'text-slate-800');
    }
    // update icon
    if (themeIcon) {
      if (theme === 'dark') {
        themeIcon.innerHTML = '<path stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>';
      } else {
        themeIcon.innerHTML = '<circle cx="12" cy="12" r="4" stroke="currentColor" stroke-width="1.5" /><path stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" d="M12 2v1M12 21v1M4.2 4.2l.7.7M19.1 19.1l.7.7M2 12h1M21 12h1M4.2 19.8l.7-.7M19.1 4.9l.7-.7"/>';
      }
    }
  };

  // determine initial theme
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialTheme = savedTheme ? savedTheme : (prefersDark ? 'dark' : 'light');
  applyTheme(initialTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
      const next = current === 'dark' ? 'light' : 'dark';
      localStorage.setItem('theme', next);
      applyTheme(next);
    });
  }

  // smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href.length > 1) {
        e.preventDefault();
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // close mobile menu after click
        if (!mobileMenu.classList.contains('hidden')) mobileMenu.classList.add('hidden');
      }
    });
  });

  // contact form handling (client-side only)
  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const name = data.get('name')?.toString().trim();
      const email = data.get('email')?.toString().trim();
      const message = data.get('message')?.toString().trim();

      if (!name || !email || !message) {
        status.textContent = 'Please fill all fields.';
        return;
      }

      // simple email validation
      const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRx.test(email)) {
        status.textContent = 'Please enter a valid email.';
        return;
      }

      // fake send (client-only). Replace with real API call as needed.
      status.textContent = 'Sending...';
      setTimeout(() => {
        status.textContent = 'Thanks — message sent (demo only).';
        form.reset();
      }, 800);
    });
  }

  // populate year in footer
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});
