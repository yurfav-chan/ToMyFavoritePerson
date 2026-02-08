document.addEventListener('DOMContentLoaded', () => {
    const tapToPlayDiv = document.getElementById('tap-to-play');
    const tapButton = tapToPlayDiv.querySelector('.tap-button'); 
    const bgMusic = document.getElementById('bg-music');
    const introScreen = document.getElementById('intro');
    const mainContent = document.getElementById('content');
    const bgOverlay = document.getElementById('bg-overlay');
    const bgSlideshow = document.getElementById('bg-slideshow');
    const petalsContainer = document.getElementById('petals');
    const imageGallery = document.getElementById('image-gallery');
    const outroScreen = document.getElementById('outro');

    const fadeDuration = 1000; // 1 second
    const introScreenDisplayDuration = 3000; // 3 seconds for "For Abby" title

    // Pre-load the music
    if (bgMusic) {
        bgMusic.load();
    }

    const handleTapToEnter = () => {
        if (tapToPlayDiv.classList.contains('hidden') || tapToPlayDiv.style.opacity === '0') {
            return;
        }

        // 1. Play the music
        if (bgMusic) {
            bgMusic.loop = true;
            bgMusic.play().then(() => {
                console.log("Music started!");
            }).catch(error => {
                console.error("Music blocked:", error);
            });
        }

        // 2. Fade out the tap-to-play screen
        tapToPlayDiv.style.opacity = '0';
        tapToPlayDiv.style.pointerEvents = 'none';

        setTimeout(() => {
            tapToPlayDiv.classList.add('hidden');

            // 3. Show the "For Abby" Intro Screen immediately
            introScreen.classList.remove('hidden');
            introScreen.style.opacity = '1';

            // Start background effects
            if (bgSlideshow) {
                bgSlideshow.style.opacity = '1';
            }
            if (petalsContainer) {
                petalsContainer.style.opacity = '1';
                startPetalAnimation();
            }

            // 4. After the "For Abby" title shows, fade it out and show content
            setTimeout(() => {
                introScreen.style.opacity = '0';

                if (bgOverlay) {
                    bgOverlay.style.opacity = '0';
                }

                setTimeout(() => {
                    introScreen.classList.add('hidden');
                    if (bgOverlay) {
                        bgOverlay.classList.add('hidden');
                    }

                    // 5. Reveal main letter and gallery
                    mainContent.classList.remove('hidden');
                    window.scrollTo({ top: 0, behavior: 'auto' });

                    setupFadeOnScroll();
                    
                    imageGallery.classList.remove('hidden');
                    outroScreen.classList.remove('hidden');
                }, fadeDuration);

            }, introScreenDisplayDuration);

        }, fadeDuration);
    };

    if (tapButton) {
        tapButton.addEventListener('click', handleTapToEnter);
    }

    function startPetalAnimation() {
        if (petalsContainer && petalsContainer.children.length === 0) {
            for (let i = 0; i < 50; i++) {
                const petal = document.createElement('div');
                petal.classList.add('petal');
                petal.style.left = Math.random() * 100 + 'vw';
                petal.style.animationDelay = Math.random() * 5 + 's';
                petal.style.animationDuration = 5 + Math.random() * 10 + 's';
                petal.style.setProperty('--rotation', Math.random() * 360 + 'deg');
                petal.style.setProperty('--x-offset', (Math.random() - 0.5) * 40 + 'vw');
                petalsContainer.appendChild(petal);
            }
        }
    }

    const setupFadeOnScroll = () => {
        const fadeElements = document.querySelectorAll('.fade-on-scroll');
        const observerOptions = {
            root: null,
            threshold: 0.5 
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        fadeElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 1s ease-out, transform 1s ease-out';
            observer.observe(el);
        });
    };
});