// main.js
document.addEventListener('DOMContentLoaded', (event) => {
    const sections = document.querySelectorAll('.fullscreen');
    let currentSection = 0;

    // Function to scroll to next section
    function scrollToNextSection() {
        if (currentSection < sections.length - 1) {
            currentSection++;
            sections[currentSection].scrollIntoView({ behavior: 'smooth' });
        }
    }

    // Add click event to scroll prompt
    const scrollPrompt = document.querySelector('.scroll-prompt');
    if (scrollPrompt) {
        scrollPrompt.style.cursor = 'pointer';
        scrollPrompt.addEventListener('click', scrollToNextSection);
    }

    // Update current section on scroll
    function handleScroll() {
        const scrollPosition = window.pageYOffset;
        sections.forEach((section, index) => {
            if (scrollPosition >= section.offsetTop - window.innerHeight / 2) {
                currentSection = index;
            }
        });
    }

    // Handle keyboard navigation
    function handleKeydown(event) {
        if (event.key === 'ArrowDown' && currentSection < sections.length - 1) {
            scrollToNextSection();
        } else if (event.key === 'ArrowUp' && currentSection > 0) {
            currentSection--;
            sections[currentSection].scrollIntoView({ behavior: 'smooth' });
        }
    }

    // Add event listeners
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