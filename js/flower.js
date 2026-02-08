document.addEventListener('DOMContentLoaded', () => {
    const tapButton = document.querySelector('.tap-button');
    const tapToPlayDiv = document.getElementById('tap-to-play');
    const bgMusic = document.getElementById('bg-music');
    const roseIntroScreen = document.getElementById('rose-intro');
    const introScreen = document.getElementById('intro');
    const mainContent = document.getElementById('content');
    const petalsContainer = document.getElementById('petals');

    tapButton.addEventListener('click', () => {
        // Start Music
        bgMusic.play();

        // Start Animations
        tapToPlayDiv.style.opacity = '0';
        setTimeout(() => {
            tapToPlayDiv.classList.add('hidden');
            
            // Bloom Roses
            roseIntroScreen.classList.remove('hidden');
            roseIntroScreen.style.opacity = '1';
            
            setTimeout(() => document.querySelector('.rose.r1').classList.add('active'), 500);
            setTimeout(() => document.querySelector('.rose.r2').classList.add('active'), 1000);
            setTimeout(() => document.querySelector('.rose.r3').classList.add('active'), 1500);

            // Intro Screen
            setTimeout(() => {
                roseIntroScreen.style.opacity = '0';
                introScreen.classList.remove('hidden');
                introScreen.style.opacity = '1';
                startPetalAnimation();

                // Show Content
                setTimeout(() => {
                    introScreen.style.opacity = '0';
                    setTimeout(() => {
                        introScreen.classList.add('hidden');
                        mainContent.classList.remove('hidden');
                    }, 1000);
                }, 3000);
            }, 4000);
        }, 1000);
    });

    function startPetalAnimation() {
        for (let i = 0; i < 40; i++) {
            const petal = document.createElement('div');
            petal.classList.add('petal');
            petal.style.left = Math.random() * 100 + 'vw';
            petal.style.animationDuration = (Math.random() * 5 + 5) + 's';
            petalsContainer.appendChild(petal);
        }
    }
});