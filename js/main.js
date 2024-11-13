// main.js
document.addEventListener('DOMContentLoaded', (event) => {
    const sections = document.querySelectorAll('.fullscreen');
    let currentSection = 0;

    function showSection(index) {
        sections[index].scrollIntoView({ behavior: 'smooth' });
    }

    function handleScroll() {
        const scrollPosition = window.pageYOffset;
        sections.forEach((section, index) => {
            if (scrollPosition >= section.offsetTop - window.innerHeight / 2) {
                currentSection = index;
            }
        });
    }

    function handleKeydown(event) {
        if (event.key === 'ArrowDown' && currentSection < sections.length - 1) {
            showSection(currentSection + 1);
        } else if (event.key === 'ArrowUp' && currentSection > 0) {
            showSection(currentSection - 1);
        }
    }

    window.addEventListener('scroll', handleScroll);
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
}); 


// Add hamburger menu functionality
document.querySelector('.hamburger-button').addEventListener('click', function() {
    this.classList.toggle('active');
    document.querySelector('.mobile-menu').classList.toggle('active');
    document.querySelector('.mobile-menu-overlay').classList.toggle('active');
    document.querySelector('.mobile-menu-overlay').classList.remove('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
        document.querySelector('.mobile-menu').classList.remove('active');
        document.querySelector('.hamburger-button').classList.remove('active');
    });
});