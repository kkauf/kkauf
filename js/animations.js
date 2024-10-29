// Typewriter function
function typeWriter(element, text, speed = 50, delay = 0) {
    element.textContent = ''; // Clear existing text
    element.classList.add('typewriter');
    
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

// Animate welcome-section
document.addEventListener('DOMContentLoaded', async () => {
    const welcomeH1Text = document.querySelector('#welcome-h1-text');
    const welcomeH2Text = document.querySelector('#welcome-h2-text');
    const scrollPrompt = document.querySelector('.scroll-prompt');

    // Initially hide the scroll prompt
    if (scrollPrompt) {
        scrollPrompt.style.opacity = '0';
        scrollPrompt.style.visibility = 'hidden';
    }

    // Helper function to create a delay
    const delay = (ms) => {
        return new Promise(resolve => {
            setTimeout(resolve, ms);
        });
    };

    async function animateAllText() {
        try {
            if (welcomeH1Text && welcomeH2Text) {
                await typeWriter(welcomeH1Text, 'Hi there!', 120);
                await typeWriter(welcomeH2Text, "I'm Konstantin.", 120, 120);
                
                // Wait for 500ms
                await delay(500);
                
                // Make sure this executes after the delay
                if (scrollPrompt) {
                    scrollPrompt.style.transition = 'opacity 0.5s ease, visibility 0.5s ease';
                    scrollPrompt.style.visibility = 'visible';
                    scrollPrompt.style.opacity = '1';
                }
            }
        } catch (error) {
            console.error('Animation error:', error);
        }
    }
    
    // Make sure to actually call the function
    animateAllText();
});