// kkauf.com: mobile menu and current-section marker in the nav.
document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.querySelector('.nav-toggle');
    const links = document.getElementById('nav-links');

    if (toggle && links) {
        const setOpen = (open) => {
            links.classList.toggle('is-open', open);
            toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
            toggle.textContent = open ? 'Close' : 'Menu';
        };
        toggle.addEventListener('click', () => setOpen(!links.classList.contains('is-open')));
        links.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setOpen(false)));
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') setOpen(false);
        });
    }

    const navLinks = Array.from(document.querySelectorAll('.nav-links a[href^="#"]'));
    const sections = navLinks
        .map((a) => document.getElementById(a.getAttribute('href').slice(1)))
        .filter(Boolean);

    if (!('IntersectionObserver' in window) || !sections.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            navLinks.forEach((a) => {
                if (a.getAttribute('href') === '#' + entry.target.id) {
                    a.setAttribute('aria-current', 'true');
                } else {
                    a.removeAttribute('aria-current');
                }
            });
        });
    }, { rootMargin: '-45% 0px -50% 0px' });

    sections.forEach((s) => observer.observe(s));
});
