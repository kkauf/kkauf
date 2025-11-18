// Typewriter function: reveal characters in-place while keeping layout stable
let typewriterSkip = false;
function typeWriter(element, text, speed = 50, delay = 0) {
    if (!element || !text) return Promise.resolve();

    const fullText = text;

    const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // If user prefers reduced motion or a skip has been requested, reveal instantly
    if (prefersReducedMotion || typewriterSkip) {
        element.textContent = fullText;
        element.style.opacity = '1';
        return Promise.resolve();
    }

    element.innerHTML = '';
    element.classList.add('typewriter');
    element.style.opacity = '1';

    // Build spans for each character so width/line breaks are fixed upfront
    const fragment = document.createDocumentFragment();
    const chars = [];
    for (let i = 0; i < fullText.length; i++) {
        const span = document.createElement('span');
        span.textContent = fullText.charAt(i);
        span.classList.add('typewriter-char');
        span.style.opacity = '0';
        fragment.appendChild(span);
        chars.push(span);
    }
    element.appendChild(fragment);

    // Add a simple blinking cursor for a more "typed" feel
    const cursor = document.createElement('span');
    cursor.classList.add('typewriter-cursor');
    element.appendChild(cursor);

    return new Promise(resolve => {
        setTimeout(() => {
            let i = 0;

            const step = () => {
                if (typewriterSkip) {
                    for (; i < chars.length; i++) {
                        chars[i].style.opacity = '1';
                    }
                    element.classList.remove('typewriter');
                    if (cursor && cursor.parentNode === element) {
                        element.removeChild(cursor);
                    }
                    resolve();
                    return;
                }

                if (i < chars.length) {
                    chars[i].style.opacity = '1';
                    const currentChar = fullText.charAt(i);
                    i++;

                    let nextDelay = speed;
                    if (/[.:!?]/.test(currentChar)) {
                        nextDelay = speed * 18;
                    }

                    setTimeout(step, nextDelay);
                } else {
                    element.classList.remove('typewriter');
                    if (cursor && cursor.parentNode === element) {
                        element.removeChild(cursor);
                    }
                    resolve();
                }
            };

            step();
        }, delay);
    });
}

// Animate Welcome Section
document.addEventListener('DOMContentLoaded', async () => {
    // Elements
    const welcomeH1Text = document.querySelector('#welcome-h1-text');
    const welcomeLine1 = document.querySelector('#welcome-line-1');
    const welcomeLine2 = document.querySelector('#welcome-line-2');
    const welcomeLine3 = document.querySelector('#welcome-line-3');
    const sections = document.querySelectorAll('.fullscreen');
    const aboutSection = document.querySelector('#about');
    const heroCta = document.querySelector('#welcome .availability-cta');

    // Allow users to complete the typewriter animation quickly on interaction
    let initialScrollY = window.scrollY || 0;
    const scrollThreshold = 80;
    let typewriterSkipTriggered = false;

    function triggerTypewriterSkip() {
        if (typewriterSkipTriggered) return;
        typewriterSkipTriggered = true;
        typewriterSkip = true;
    }

    window.addEventListener('scroll', () => {
        if (typewriterSkipTriggered) return;
        if (Math.abs(window.scrollY - initialScrollY) > scrollThreshold) {
            triggerTypewriterSkip();
        }
    }, { passive: true });

    document.addEventListener('pointerdown', () => {
        triggerTypewriterSkip();
    }, { once: true });

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

    // Hide hero CTA until after the intro animation
    if (heroCta) {
        heroCta.style.opacity = '0';
        heroCta.style.visibility = 'hidden';
    }

    // Welcome animation
    async function animateWelcomeSection() {
        const mainNav = document.querySelector('.main-nav');

        if (welcomeH1Text) {
            const line1Text = welcomeLine1 ? welcomeLine1.textContent : '';
            const line2Text = welcomeLine2 ? welcomeLine2.textContent : '';
            const line3Text = welcomeLine3 ? welcomeLine3.textContent : '';

            const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

            if (!prefersReducedMotion && welcomeLine1) {
                const spinnerTarget = welcomeLine1;
                spinnerTarget.classList.remove('hidden-until-animation');
                spinnerTarget.style.opacity = '1';
                spinnerTarget.setAttribute('aria-hidden', 'true');

                const frames = ['/', '-', '\\', '|'];
                let frameIndex = 0;

                const updateSpinner = () => {
                    spinnerTarget.textContent = frames[frameIndex];
                    frameIndex = (frameIndex + 1) % frames.length;
                };

                updateSpinner();
                const spinnerInterval = setInterval(updateSpinner, 150);

                await delay(1500);

                clearInterval(spinnerInterval);
                spinnerTarget.textContent = '';
                spinnerTarget.removeAttribute('aria-hidden');
            }

            if (welcomeLine1) {
                await typeWriter(welcomeLine1, line1Text, 15, 200);
            }
            if (welcomeLine2) {
                await typeWriter(welcomeLine2, line2Text, 12, 80);
            }
            if (welcomeLine3) {
                await typeWriter(welcomeLine3, line3Text, 12, 0);
            }

            await delay(250);

            // Show scroll prompt, nav, and hero CTA
            if (welcomeScrollPrompt && mainNav) {
                welcomeScrollPrompt.style.transition = 'opacity 0.25s ease, visibility 0.5s ease';
                welcomeScrollPrompt.style.visibility = 'visible';
                welcomeScrollPrompt.style.opacity = '1';

                mainNav.style.visibility = 'visible';
                mainNav.style.opacity = '1';
            }

            if (heroCta) {
                heroCta.style.transition = 'opacity 0.25s ease, visibility 0.5s ease';
                heroCta.style.visibility = 'visible';
                heroCta.style.opacity = '1';
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

    // Scroll to next section (fallback in case welcome animation did not attach listeners)
    document.querySelectorAll('.scroll-prompt').forEach(prompt => {
        prompt.addEventListener('click', () => {
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

// Simple About section animation hook so the observer has a target
async function animateAboutSection() {
    const aboutCard = document.querySelector('#about .about-card');
    if (aboutCard) {
        aboutCard.classList.add('slide-in');
    }
}