// main.js
document.addEventListener('DOMContentLoaded', (event) => {
    const sections = document.querySelectorAll('.fullscreen');
    let currentSection = 0;

    const navLinks = document.querySelectorAll('.main-nav a[href^="#"], .mobile-menu a[href^="#"]');

    function setActiveNavLink(sectionId) {
        if (!sectionId || !navLinks.length) return;
        navLinks.forEach(link => {
            const targetId = link.getAttribute('href') ? link.getAttribute('href').slice(1) : '';
            link.classList.toggle('active', targetId === sectionId);
        });
    }

    function showSection(index) {
        if (index < 0 || index >= sections.length) return;
        sections[index].scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    function handleKeydown(event) {
        const activeElement = document.activeElement;
        const tagName = activeElement ? activeElement.tagName.toLowerCase() : '';
        const isTextInput = tagName === 'input' || tagName === 'textarea' || (activeElement && activeElement.isContentEditable);

        if (isTextInput) {
            return;
        }

        if ((event.key === 'ArrowDown' || event.key === 'PageDown') && currentSection < sections.length - 1) {
            event.preventDefault();
            showSection(currentSection + 1);
        } else if ((event.key === 'ArrowUp' || event.key === 'PageUp') && currentSection > 0) {
            event.preventDefault();
            showSection(currentSection - 1);
        }
    }

    window.addEventListener('keydown', handleKeydown);

    // Smooth scroll for navigation tiles
    document.querySelectorAll('.nav-tiles a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').slice(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Animate sections on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => {
        observer.observe(section);
    });

    const activeSectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const section = entry.target;
                const index = Array.prototype.indexOf.call(sections, section);
                if (index !== -1) {
                    currentSection = index;
                }
                if (section.id) {
                    setActiveNavLink(section.id);
                }
            }
        });
    }, { threshold: 0.6 });

    sections.forEach(section => {
        activeSectionObserver.observe(section);
    });

    if (sections.length) {
        const initialSection = sections[0];
        if (initialSection.id) {
            setActiveNavLink(initialSection.id);
        }
    }

    // Add hamburger menu functionality
    const hamburgerButton = document.querySelector('.hamburger-button');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');

    if (hamburgerButton && mobileMenu && mobileMenuOverlay) {
        const toggleMobileMenu = (isOpen) => {
            const open = typeof isOpen === 'boolean' ? isOpen : !mobileMenu.classList.contains('active');

            mobileMenu.classList.toggle('active', open);
            mobileMenuOverlay.classList.toggle('active', open);
            hamburgerButton.classList.toggle('active', open);
            document.body.classList.toggle('menu-open', open);
            hamburgerButton.setAttribute('aria-expanded', open ? 'true' : 'false');
        };

        hamburgerButton.addEventListener('click', () => {
            toggleMobileMenu();
        });

        mobileMenuOverlay.addEventListener('click', () => {
            toggleMobileMenu(false);
        });

        // Close mobile menu when clicking a link
        document.querySelectorAll('.mobile-menu a').forEach(link => {
            link.addEventListener('click', () => {
                toggleMobileMenu(false);
            });
        });
    }
});