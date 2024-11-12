// Typewriter function
function typeWriter(element, text, speed = 50, delay = 0) {
    element.textContent = ''; // Clear existing text
    element.classList.add('typewriter');
    element.style.opacity = '1';

    return new Promise(resolve => {
        setTimeout(() => {
            let i = 0;
            const timer = setInterval(() => {
                if (i < text.length) {
                    element.textContent += text.charAt(i);
                    i++;
                } else {
                    clearInterval(timer);
                    resolve();
                }
            }, speed);
        }, delay);
    });
}

// Animate Welcome Section
document.addEventListener('DOMContentLoaded', async () => {
    // Elements
    const welcomeH1Text = document.querySelector('#welcome-h1-text');
    const welcomeH2Text = document.querySelector('#welcome-h2-text');
    const sections = document.querySelectorAll('.fullscreen');
    const aboutSection = document.querySelector('#about');



    // Helper function for delay
    function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Hide only the welcome section's scroll prompt
    const welcomeScrollPrompt = document.querySelector('#welcome .scroll-prompt');
    if (welcomeScrollPrompt) {
        welcomeScrollPrompt.style.opacity = '0';
        welcomeScrollPrompt.style.visibility = 'hidden';
    }

    // Welcome animation
    async function animateWelcomeSection() {
        const mainNav = document.querySelector('.main-nav');
    
    if (welcomeH1Text && welcomeH2Text) {
        await typeWriter(welcomeH1Text, welcomeH1Text.textContent, 75);
        await typeWriter(welcomeH2Text, welcomeH2Text.textContent, 25);
        
        await delay(250)
        
        // Show both scroll prompt and nav
        if (welcomeScrollPrompt && mainNav) {
            welcomeScrollPrompt.style.transition = 'opacity 0.25s ease, visibility 0.5s ease';
            welcomeScrollPrompt.style.visibility = 'visible';
            welcomeScrollPrompt.style.opacity = '1';
            
            mainNav.style.visibility = 'visible';
            mainNav.style.opacity = '1';
        }

            // Set up click handlers for ALL scroll prompts
            document.querySelectorAll('.scroll-prompt').forEach(prompt => {
                prompt.addEventListener('click', () => {
                    const currentSection = prompt.closest('.fullscreen');
                    scrollToNextSection(currentSection);
                });
            });
        }
    }

    // Find next section
    function scrollToNextSection(currentSection) {
        // Convert sections to array to find current index
        const sectionsArray = Array.from(sections);
        const currentIndex = sectionsArray.indexOf(currentSection);

        // If there's a next section, scroll to it
        if (currentIndex < sectionsArray.length - 1) {
            sectionsArray[currentIndex + 1].scrollIntoView({ behavior: 'smooth' });
        }
    }

    // Scroll to next section   
    document.querySelectorAll('.scroll-prompt').forEach(prompt => {
        prompt.addEventListener('click', () => {
            // Find the parent section of this scroll prompt
            const currentSection = prompt.closest('.fullscreen');
            scrollToNextSection(currentSection);
        });
    });


    // Intersection Observer for About section
    const observerCallback = (entries) => {
        entries.forEach(async (entry) => {
            if (entry.isIntersecting) {
                // Only animate once
                observer.unobserve(entry.target);
                await animateAboutSection();
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, {
        threshold: 0.3
    });

    // Start observing about section
    if (aboutSection) {
        observer.observe(aboutSection);
    }

    // Start welcome animation
    await animateWelcomeSection();
});