// ===== CONFIG =====
const CONFIG = {
    typewriterText: "Antes de que digas algo... solo lee",
    typewriterSpeed: 60,
    heartsInterval: 500,
    petalsInterval: 600,
    particlesCount: 50,
    starsCount: 100,
    shootingStarInterval: 4000,
    bubblesCount: 8,
    introHeartsCount: 35,
    isMobile: window.innerWidth <= 768
};

if (CONFIG.isMobile) {
    CONFIG.particlesCount = 28;
    CONFIG.starsCount = 60;
    CONFIG.heartsInterval = 700;
    CONFIG.petalsInterval = 900;
    CONFIG.bubblesCount = 5;
    CONFIG.introHeartsCount = 25;
}

// ===== DOM READY =====
document.addEventListener('DOMContentLoaded', () => {
    startLoadingScreen();
});

// ===== LOADING SCREEN =====
function startLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    const progressBar = document.getElementById('loading-progress');
    const percentageEl = document.getElementById('loading-percentage');
    const messageEl = document.getElementById('loading-message');
    const timerEl = document.getElementById('loading-timer');
    
    if (!loadingScreen || !progressBar || !percentageEl || !messageEl || !timerEl) {
        console.error('Elementos de carga no encontrados');
        return;
    }
    
    const messages = [
        'Preparando algo especial...',
        'Construyendo tu pagina, Marianita...',
        'Agregando corazones... 💕',
        'Poniendo Star Shopping de fondo...',
        'Haciendo que todo se vea lindo para ti...',
    ];
    
    let currentMsg = 0;
    let percentage = 0;
    
    // Cambiar mensajes cada 300ms
    const msgInterval = setInterval(() => {
        if (currentMsg < messages.length - 1) {
            currentMsg++;
            messageEl.style.animation = 'none';
            messageEl.offsetHeight;
            messageEl.style.animation = 'fadeInOut 0.6s ease-in-out';
            messageEl.textContent = messages[currentMsg];
        }
    }, 300);
    
    // Animar porcentaje hasta 69%
    const progressInterval = setInterval(() => {
        if (percentage < 69) {
            percentage += 2;
            percentage = Math.min(69, percentage);
            progressBar.style.width = percentage + '%';
            percentageEl.textContent = Math.floor(percentage) + '%';
        } else {
            clearInterval(progressInterval);
        }
    }, 30);
    
    // SIEMPRE pausar en 69% después de 1.5 segundos
    setTimeout(() => {
        clearInterval(msgInterval);
        clearInterval(progressInterval);
        
        // Forzar 69%
        percentage = 69;
        progressBar.style.width = '69%';
        percentageEl.textContent = '69%';
        
        messageEl.style.animation = 'none';
        messageEl.offsetHeight;
        messageEl.style.animation = 'fadeInOut 0.6s ease-in-out';
        messageEl.textContent = 'Espera... para continuar di "te quiero" en tu mente 😏';
        messageEl.style.fontSize = '1rem';
        messageEl.style.color = '#f7a8c4';
        
        // Iniciar countdown
        setTimeout(() => {
            let countdown = 10;
            timerEl.textContent = countdown;
            timerEl.classList.add('active');
            
            if (navigator.vibrate) navigator.vibrate(50);
            
            const countdownInterval = setInterval(() => {
                countdown--;
                
                if (countdown > 0) {
                    timerEl.textContent = countdown;
                }
                
                // Hacer más urgente en los últimos 3 segundos
                if (countdown <= 2 && countdown > 0) {
                    timerEl.classList.add('urgent');
                    if (navigator.vibrate) navigator.vibrate([40, 30, 40]);
                } else if (countdown === 3 && navigator.vibrate) {
                    navigator.vibrate(30);
                }
                
                if (countdown <= 0) {
                    clearInterval(countdownInterval);
                    timerEl.textContent = '0';
                    timerEl.classList.add('urgent');
                    
                    setTimeout(() => {
                        timerEl.classList.remove('active', 'urgent');
                        timerEl.textContent = '';
                        
                        // Mensaje final
                        messageEl.textContent = 'Sabia que lo ibas a decir 😌💕';
                        messageEl.style.fontSize = '1.1rem';
                        
                        if (navigator.vibrate) navigator.vibrate([50, 30, 50]);
                        
                        // Continuar carga rápido
                        setTimeout(() => {
                            const finalInterval = setInterval(() => {
                                if (percentage < 100) {
                                    percentage += 5;
                                    percentage = Math.min(100, percentage);
                                    progressBar.style.width = percentage + '%';
                                    percentageEl.textContent = Math.floor(percentage) + '%';
                                } else {
                                    clearInterval(finalInterval);
                                    
                                    messageEl.textContent = 'Listo! Aqui vamos... 🎉';
                                    
                                    setTimeout(() => {
                                        loadingScreen.classList.add('fade-out');
                                        
                                        setTimeout(() => {
                                            loadingScreen.style.display = 'none';
                                            document.getElementById('intro-screen').classList.remove('hidden');
                                            createStars();
                                            createIntroBgHearts();
                                            initIntroFlow();
                                        }, 800);
                                    }, 300);
                                }
                            }, 40);
                        }, 800);
                    }, 500);
                }
            }, 1000);
        }, 500);
    }, 1500);
}

// ===== INTRO BG HEARTS =====
function createIntroBgHearts() {
    const container = document.getElementById('intro-bg-hearts');
    if (!container) return;
    const heartChars = ['\u2764', '\u2665', '\u2661', '\uD83D\uDC95', '\uD83D\uDC96', '\uD83E\uDE77'];
    for (let i = 0; i < CONFIG.introHeartsCount; i++) {
        const heart = document.createElement('div');
        heart.classList.add('intro-bg-heart');
        heart.textContent = heartChars[Math.floor(Math.random() * heartChars.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.fontSize = (Math.random() * 30 + 14) + 'px';
        heart.style.animationDuration = (Math.random() * 6 + 5) + 's';
        heart.style.animationDelay = (Math.random() * 4) + 's';
        heart.style.color = `rgba(247,168,196,${Math.random() * 0.25 + 0.1})`;
        container.appendChild(heart);
    }

    // Continuously spawn new hearts on the intro screen
    const introHeartInterval = setInterval(() => {
        const introScreen = document.getElementById('intro-screen');
        if (!introScreen || introScreen.classList.contains('hidden')) {
            clearInterval(introHeartInterval);
            return;
        }
        const heart = document.createElement('div');
        heart.classList.add('intro-bg-heart');
        heart.textContent = heartChars[Math.floor(Math.random() * heartChars.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.fontSize = (Math.random() * 28 + 14) + 'px';
        heart.style.animationDuration = (Math.random() * 6 + 5) + 's';
        heart.style.animationDelay = '0s';
        heart.style.color = `rgba(247,168,196,${Math.random() * 0.25 + 0.1})`;
        container.appendChild(heart);
        setTimeout(() => { if (heart.parentNode) heart.remove(); }, 12000);
    }, 600);
}

// ===== INTRO FLOW: carta con candado -> confirmaciones escalonadas -> abrir =====
function initIntroFlow() {
    const introScreen = document.getElementById('intro-screen');
    const lockedLetter = document.getElementById('locked-letter');
    const confirmOverlay = document.getElementById('confirm-overlay');
    const confirmText = document.getElementById('confirm-text');
    const confirmYes = document.getElementById('confirm-yes');
    const confirmNo = document.getElementById('confirm-no');
    const confirmBox = document.getElementById('confirm-box');

    const steps = [
        { text: "Segura que quieres abrir esto? \uD83E\uDD28", yes: "Si", no: "No" },
        { text: "Segurisima? \uD83D\uDE0F", yes: "Que si", no: "Mmm no" },
        { text: "Segurisisisisisima?? \uD83D\uDE33", yes: "QUE SIII", no: "Ya no" },
        { text: "Ok... despues no digas que no te pregunte \uD83D\uDE08", yes: "Abre ya!", no: "Me arrepenti" }
    ];

    let currentStep = 0;

    // Click en la carta con candado
    introScreen.addEventListener('click', () => {
        if (introScreen.classList.contains('opening')) return;
        
        // Trigger unlock animation
        lockedLetter.classList.add('unlocking');
        
        if (navigator.vibrate) navigator.vibrate([50, 30, 50]);

        setTimeout(() => {
            introScreen.classList.add('opening');
        }, 800);

        setTimeout(() => {
            introScreen.classList.add('hidden');
            // Mostrar primer dialogo
            currentStep = 0;
            showConfirmStep(currentStep);
            confirmOverlay.classList.remove('hidden');
        }, 2000);
    });

    function showConfirmStep(index) {
        const step = steps[index];
        confirmText.textContent = step.text;
        confirmYes.textContent = step.yes;
        confirmNo.textContent = step.no;

        // Re-trigger animacion
        confirmBox.style.animation = 'none';
        confirmBox.offsetHeight;
        confirmBox.style.animation = 'popIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
    }

    // Boton SI en el dialogo
    confirmYes.addEventListener('click', () => {
        if (navigator.vibrate) navigator.vibrate(30);
        currentStep++;

        if (currentStep < steps.length) {
            showConfirmStep(currentStep);
        } else {
            // Paso final: abrir la pagina
            confirmOverlay.classList.add('hidden');
            document.getElementById('main-content').classList.remove('hidden');
            document.getElementById('music-toggle').classList.remove('hidden');

            // Musica
            const bgMusic = document.getElementById('bg-music');
            if (bgMusic) {
                bgMusic.volume = 0.5;
                bgMusic.play().then(() => {
                    document.getElementById('music-toggle').classList.add('playing');
                }).catch(() => {});
            }

            startAllAnimations();
            initMusicToggle();
        }
    });

    // Boton NO en el dialogo
    confirmNo.addEventListener('click', () => {
        if (navigator.vibrate) navigator.vibrate(20);

        const noResponses = [
            "Va pues, respeto tu decision... mentira, dale si \uD83D\uDE02",
            "Enserio no? Ok dale si, hazlo por mi \uD83E\uDD7A",
            "Bueno ya... si le das que no otra vez me voy a poner triste \uD83D\uDE22",
            "Ultima vez que pregunto... (mentira) \uD83D\uDE05"
        ];

        confirmText.textContent = noResponses[Math.min(currentStep, noResponses.length - 1)];
        confirmYes.textContent = "Ok dale si";
        confirmNo.textContent = "...";

        confirmBox.style.animation = 'none';
        confirmBox.offsetHeight;
        confirmBox.style.animation = 'popIn 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)';
    });
}

// ===== MUSIC TOGGLE =====
function initMusicToggle() {
    const musicBtn = document.getElementById('music-toggle');
    const bgMusic = document.getElementById('bg-music');
    if (!musicBtn || !bgMusic) return;

    musicBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (bgMusic.paused) {
            bgMusic.play();
            musicBtn.classList.add('playing');
            musicBtn.innerHTML = '\uD83C\uDFB5';
        } else {
            bgMusic.pause();
            musicBtn.classList.remove('playing');
            musicBtn.innerHTML = '\uD83D\uDD07';
        }
    });
}

// ===== START ALL =====
function startAllAnimations() {
    initParticles();
    startFloatingHearts();
    startPetals();
    startTypewriter();
    startShootingStars();
    createLightBubbles();
    createHeroSparkles();
    initScrollAnimations();
    initButtons();
    initQuotesSlider();
    initHeartbeatCounter();
    initEmojiInteraction();
    initClickHearts();
    initCompatibilityMeter();
    initSiNoGame();
}

// ===== STARS =====
function createStars() {
    for (let i = 0; i < CONFIG.starsCount; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.setProperty('--duration', (Math.random() * 3 + 2) + 's');
        star.style.setProperty('--delay', Math.random() * 3 + 's');
        const s = (Math.random() * 2.5 + 1) + 'px';
        star.style.width = s;
        star.style.height = s;
        document.body.appendChild(star);
    }
}

// ===== PARTICLES =====
function initParticles() {
    const canvas = document.getElementById('particles-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let particles = [];
    let pointerX = -1000, pointerY = -1000;

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    function setPointer(x, y) { pointerX = x; pointerY = y; }
    document.addEventListener('mousemove', e => setPointer(e.clientX, e.clientY));
    document.addEventListener('touchmove', e => {
        if (e.touches[0]) setPointer(e.touches[0].clientX, e.touches[0].clientY);
    }, { passive: true });

    class P {
        constructor() { this.reset(); }
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2.5 + 0.8;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.opacity = Math.random() * 0.4 + 0.15;
            // Night blue to pastel pink hue range
            this.hue = Math.random() > 0.5 ? (Math.random() * 30 + 330) : (Math.random() * 20 + 220);
        }
        update() {
            const dx = pointerX - this.x, dy = pointerY - this.y;
            const d = Math.sqrt(dx * dx + dy * dy);
            if (d < 150) { this.vx += dx * 0.00015; this.vy += dy * 0.00015; }
            this.vx *= 0.998; this.vy *= 0.998;
            this.x += this.vx; this.y += this.vy;
            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `hsla(${this.hue},65%,72%,${this.opacity})`;
            ctx.fill();
        }
    }

    for (let i = 0; i < CONFIG.particlesCount; i++) particles.push(new P());

    const maxDist = CONFIG.isMobile ? 75 : 105;

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (const p of particles) { p.update(); p.draw(); }
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const d = Math.sqrt(dx * dx + dy * dy);
                if (d < maxDist) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(247,168,196,${(1 - d / maxDist) * 0.1})`;
                    ctx.lineWidth = 0.4;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
        requestAnimationFrame(animate);
    }
    animate();
}

// ===== HEARTS =====
function startFloatingHearts() {
    const c = document.getElementById('floating-hearts');
    if (!c) return;
    const h = ['\u2764\uFE0F', '\uD83D\uDC95', '\uD83D\uDC96', '\uD83D\uDC97', '\uD83E\uDE77', '\uD83D\uDC98', '\u2665', '\uD83D\uDC93'];

    function create() {
        const el = document.createElement('div');
        el.classList.add('floating-heart');
        el.textContent = h[Math.floor(Math.random() * h.length)];
        el.style.left = Math.random() * 100 + '%';
        el.style.fontSize = (Math.random() * 20 + 12) + 'px';
        el.style.animationDuration = (Math.random() * 5 + 6) + 's';
        el.style.setProperty('--sway', (Math.random() * 60 - 30) + 'px');
        c.appendChild(el);
        setTimeout(() => { if (el.parentNode) el.remove(); }, 12000);
    }

    setInterval(create, CONFIG.heartsInterval);
    // Spawn an initial burst of hearts
    for (let i = 0; i < 8; i++) setTimeout(create, i * 300);
}

// ===== PETALS =====
function startPetals() {
    const c = document.getElementById('petals-container');
    if (!c) return;
    const colors = [
        'radial-gradient(ellipse,#f7a8c4,#e8799e)',
        'radial-gradient(ellipse,#fcc5d8,#f7a8c4)',
        'radial-gradient(ellipse,#f8b4cc,#d4567a)'
    ];

    function create() {
        const el = document.createElement('div');
        el.classList.add('petal');
        el.style.left = Math.random() * 100 + '%';
        const s = (Math.random() * 8 + 7) + 'px';
        el.style.width = s;
        el.style.height = s;
        el.style.animationDuration = (Math.random() * 5 + 6) + 's';
        el.style.setProperty('--drift', (Math.random() * 100 - 50) + 'px');
        el.style.background = colors[Math.floor(Math.random() * colors.length)];
        c.appendChild(el);
        setTimeout(() => { if (el.parentNode) el.remove(); }, 11000);
    }

    setInterval(create, CONFIG.petalsInterval);
}

// ===== SHOOTING STARS =====
function startShootingStars() {
    const c = document.getElementById('shooting-stars');
    if (!c) return;

    function create() {
        const el = document.createElement('div');
        el.classList.add('shooting-star');
        el.style.left = Math.random() * 60 + '%';
        el.style.top = Math.random() * 35 + '%';
        el.style.animationDuration = (Math.random() * 0.8 + 0.6) + 's';
        c.appendChild(el);
        setTimeout(() => { if (el.parentNode) el.remove(); }, 1800);
    }

    setInterval(create, CONFIG.shootingStarInterval);
    setTimeout(create, 2000);
}

// ===== LIGHT BUBBLES =====
function createLightBubbles() {
    const c = document.getElementById('light-bubbles');
    if (!c) return;
    for (let i = 0; i < CONFIG.bubblesCount; i++) {
        const el = document.createElement('div');
        el.classList.add('light-bubble');
        const s = (Math.random() * 130 + 45) + 'px';
        el.style.width = s;
        el.style.height = s;
        el.style.left = Math.random() * 100 + '%';
        el.style.top = Math.random() * 100 + '%';
        el.style.animationDuration = (Math.random() * 8 + 7) + 's';
        el.style.animationDelay = (Math.random() * 4) + 's';
        c.appendChild(el);
    }
}

// ===== HERO SPARKLES =====
function createHeroSparkles() {
    const c = document.getElementById('hero-sparkles');
    if (!c) return;
    for (let i = 0; i < 20; i++) {
        const el = document.createElement('div');
        el.classList.add('sparkle');
        el.style.left = Math.random() * 100 + '%';
        el.style.top = Math.random() * 100 + '%';
        el.style.animationDelay = (Math.random() * 3) + 's';
        el.style.animationDuration = (Math.random() * 2 + 1.5) + 's';
        c.appendChild(el);
    }
}

// ===== TYPEWRITER =====
function startTypewriter() {
    const el = document.getElementById('typewriter');
    if (!el) return;
    const text = CONFIG.typewriterText;
    let i = 0;

    const cursor = document.createElement('span');
    cursor.classList.add('typewriter-cursor');
    el.appendChild(cursor);

    function type() {
        if (i < text.length) {
            el.insertBefore(document.createTextNode(text.charAt(i)), cursor);
            i++;
            setTimeout(type, CONFIG.typewriterSpeed);
        } else {
            setTimeout(() => { cursor.style.display = 'none'; }, 2500);
        }
    }

    setTimeout(type, 800);
}

// ===== SCROLL ANIMATIONS =====
function initScrollAnimations() {
    const obs = new IntersectionObserver((entries) => {
        entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.08, rootMargin: '0px 0px -20px 0px' });

    document.querySelectorAll('.fade-in-up, .slide-in-left, .slide-in-right, .scale-in').forEach(el => obs.observe(el));
}

// ===== HEARTBEAT COUNTER =====
function initHeartbeatCounter() {
    const countEl = document.getElementById('heartbeat-count');
    const section = document.getElementById('heartbeat-section');
    if (!countEl || !section) return;

    let done = false;
    const obs = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting && !done) {
                done = true;
                animateCounter(countEl, 0, 4827, 2500);
            }
        });
    }, { threshold: 0.3 });
    obs.observe(section);
}

function animateCounter(el, start, end, dur) {
    const t0 = performance.now();
    function tick(t) {
        const p = Math.min((t - t0) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.floor(start + (end - start) * eased).toLocaleString();
        if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
}

// ===== QUOTES SLIDER =====
function initQuotesSlider() {
    const cards = document.querySelectorAll('.quote-card');
    const dots = document.getElementById('quotes-dots');
    if (!cards.length || !dots) return;

    let cur = 0;

    cards.forEach((_, i) => {
        const d = document.createElement('button');
        d.classList.add('quote-dot');
        if (i === 0) d.classList.add('active');
        d.addEventListener('click', () => go(i));
        dots.appendChild(d);
    });

    function go(i) {
        cards.forEach(c => c.classList.remove('active'));
        dots.querySelectorAll('.quote-dot').forEach(d => d.classList.remove('active'));
        cards[i].classList.add('active');
        dots.children[i].classList.add('active');
        cur = i;
    }

    setInterval(() => go((cur + 1) % cards.length), 5000);

    // Swipe
    let sx = 0;
    const slider = document.getElementById('quotes-slider');
    if (!slider) return;
    slider.addEventListener('touchstart', e => { sx = e.touches[0].clientX; }, { passive: true });
    slider.addEventListener('touchend', e => {
        const diff = sx - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 40) {
            go(diff > 0 ? (cur + 1) % cards.length : (cur - 1 + cards.length) % cards.length);
        }
    }, { passive: true });
}

// ===== EMOJI INTERACTION =====
function initEmojiInteraction() {
    const style = document.createElement('style');
    style.textContent = `@keyframes emojiPop { 0%{transform:scale(1) rotate(0)} 20%{transform:scale(1.4) rotate(10deg)} 40%{transform:scale(0.9) rotate(-6deg)} 60%{transform:scale(1.15) rotate(4deg)} 80%{transform:scale(0.98) rotate(-2deg)} 100%{transform:scale(1) rotate(0)} }`;
    document.head.appendChild(style);

    document.querySelectorAll('.emoji-item').forEach(item => {
        item.addEventListener('click', () => {
            item.style.animation = 'none';
            item.offsetHeight;
            item.style.animation = 'emojiPop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
            const r = item.getBoundingClientRect();
            for (let i = 0; i < 6; i++) createMiniHeart(r.left + r.width / 2, r.top + r.height / 2);
            if (navigator.vibrate) navigator.vibrate(25);
        });
    });
}

function createMiniHeart(x, y) {
    const el = document.createElement('div');
    const hearts = ['\u2764', '\uD83D\uDC96', '\u2728', '\uD83E\uDE77'];
    el.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    el.style.cssText = `position:fixed;left:${x}px;top:${y}px;font-size:${Math.random() * 8 + 12}px;pointer-events:none;z-index:9999;transition:all 0.8s cubic-bezier(0.16, 1, 0.3, 1);opacity:1;`;
    document.body.appendChild(el);
    const a = Math.random() * Math.PI * 2;
    const d = Math.random() * 60 + 30;
    requestAnimationFrame(() => {
        el.style.transform = `translate(${Math.cos(a)*d}px,${Math.sin(a)*d - 40}px) scale(0.3) rotate(${Math.random()*60-30}deg)`;
        el.style.opacity = '0';
    });
    setTimeout(() => el.remove(), 800);
}

// ===== CLICK HEARTS =====
function initClickHearts() {
    function spawn(x, y) {
        const emojis = ['\uD83D\uDC96', '\u2764\uFE0F', '\u2728', '\uD83E\uDE77', '\uD83D\uDC95'];
        const el = document.createElement('div');
        el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        el.style.cssText = `position:fixed;left:${x}px;top:${y}px;font-size:${Math.random()*10+20}px;pointer-events:none;z-index:9999;transition:all 1s cubic-bezier(0.16, 1, 0.3, 1);opacity:1;transform:scale(0.5);`;
        document.body.appendChild(el);
        requestAnimationFrame(() => {
            el.style.transform = `translateY(-${Math.random()*60+60}px) scale(1.1) rotate(${Math.random()*30-15}deg)`;
            el.style.opacity = '0';
        });
        setTimeout(() => el.remove(), 1000);
    }

    document.addEventListener('click', e => {
        if (document.getElementById('main-content').classList.contains('hidden')) return;
        if (e.target.closest('button, .emoji-item, .quote-dot')) return;
        spawn(e.clientX, e.clientY);
    });
}

// ===== BUTTONS =====
function initButtons() {
    const btnYes = document.getElementById('btn-yes');
    const btnNo = document.getElementById('btn-no');
    const qSection = document.getElementById('question-section');
    const ySection = document.getElementById('yes-section');
    if (!btnYes || !btnNo || !qSection || !ySection) return;

    let noCount = 0;

    btnYes.addEventListener('click', () => {
        if (navigator.vibrate) navigator.vibrate([40, 20, 40, 20, 80]);
        qSection.classList.add('hidden');
        ySection.classList.remove('hidden');
        launchFireworks();
        launchConfetti();
        burstHearts();
        ySection.scrollIntoView({ behavior: 'smooth' });
    });

    const noMsgs = [
        "Enserio? \uD83D\uDE44",
        "Neta? Piensalo bien \uD83D\uDE12",
        "Ya dale que si \uD83D\uDE29",
        "Me vas a hacer llorar \uD83D\uDE2D",
        "Ya no hay boton de no \uD83D\uDE05",
    ];

    btnNo.addEventListener('click', () => {
        noCount++;
        if (navigator.vibrate) navigator.vibrate(25);

        if (noCount <= noMsgs.length) {
            btnNo.textContent = noMsgs[noCount - 1];
        }

        const s = Math.max(0.15, 1 - noCount * 0.15);
        btnNo.style.transform = `scale(${s})`;
        btnYes.style.transform = `scale(${1 + noCount * 0.12})`;
        btnYes.style.boxShadow = `0 6px ${25 + noCount * 5}px rgba(232,121,158,${0.4 + noCount * 0.08})`;

        // Mover el boton
        const container = btnNo.closest('.buttons-container');
        if (container) {
            const mx = container.offsetWidth / 3;
            btnNo.style.position = 'relative';
            btnNo.style.left = ((Math.random() - 0.5) * mx) + 'px';
            btnNo.style.top = ((Math.random() - 0.5) * 60) + 'px';
            btnNo.style.transition = 'left 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), top 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), transform 0.3s ease';
        }

        if (noCount >= 5) {
            btnNo.style.opacity = '0';
            btnNo.style.pointerEvents = 'none';
        }
    });
}

// ===== FIREWORKS =====
function launchFireworks() {
    const c = document.getElementById('fireworks-container');
    if (!c) return;
    const colors = ['#f7a8c4','#e8799e','#fcc5d8','#ffd700','#7a7aff','#d4567a','#fff'];
    const count = CONFIG.isMobile ? 10 : 16;

    function boom() {
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight * 0.5;
        const n = CONFIG.isMobile ? 20 : 32;

        for (let i = 0; i < n; i++) {
            const p = document.createElement('div');
            const col = colors[Math.floor(Math.random() * colors.length)];
            p.style.cssText = `position:absolute;width:${Math.random()*3+3}px;height:${Math.random()*3+3}px;border-radius:50%;left:${x}px;top:${y}px;background:${col};box-shadow:0 0 6px ${col};pointer-events:none;`;
            c.appendChild(p);

            const angle = (i / n) * Math.PI * 2;
            const vel = Math.random() * 110 + 40;
            const tx = Math.cos(angle) * vel;
            const ty = Math.sin(angle) * vel;
            let t0 = null;

            function anim(ts) {
                if (!t0) t0 = ts;
                const prog = (ts - t0) / 1500;
                if (prog < 1) {
                    p.style.left = (x + tx * prog) + 'px';
                    p.style.top = (y + ty * prog + 130 * prog * prog) + 'px';
                    p.style.opacity = 1 - prog;
                    requestAnimationFrame(anim);
                } else p.remove();
            }
            requestAnimationFrame(anim);
        }
    }

    let i = 0;
    const iv = setInterval(() => { boom(); i++; if (i > count) clearInterval(iv); }, 300);
}

// ===== CONFETTI =====
function launchConfetti() {
    const c = document.getElementById('confetti-container');
    if (!c) return;
    const colors = ['#f7a8c4','#e8799e','#fcc5d8','#ffd700','#fff','#d4567a','#7a7aff','#141852'];
    const n = CONFIG.isMobile ? 60 : 120;

    for (let i = 0; i < n; i++) {
        setTimeout(() => {
            const p = document.createElement('div');
            p.classList.add('confetti-piece');
            const col = colors[Math.floor(Math.random() * colors.length)];
            const sz = Math.random() * 7 + 4;
            p.style.left = Math.random() * 100 + '%';
            p.style.width = sz + 'px';
            p.style.height = (Math.random() > 0.5 ? sz : sz * 0.5) + 'px';
            p.style.background = col;
            p.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
            p.style.animationDuration = (Math.random() * 2.5 + 2) + 's';
            c.appendChild(p);
            setTimeout(() => p.remove(), 5000);
        }, i * 15);
    }
}

// ===== BURST HEARTS =====
function burstHearts() {
    const c = document.getElementById('floating-hearts');
    if (!c) return;
    const h = ['\u2764\uFE0F','\uD83D\uDC95','\uD83D\uDC96','\uD83C\uDF89','\u2728','\uD83C\uDF1F','\uD83E\uDE77','\uD83D\uDC93'];
    const n = CONFIG.isMobile ? 20 : 35;

    for (let i = 0; i < n; i++) {
        setTimeout(() => {
            const el = document.createElement('div');
            el.classList.add('floating-heart');
            el.textContent = h[Math.floor(Math.random() * h.length)];
            el.style.left = Math.random() * 100 + '%';
            el.style.fontSize = (Math.random() * 22 + 14) + 'px';
            el.style.animationDuration = (Math.random() * 3 + 3) + 's';
            el.style.setProperty('--sway', (Math.random() * 70 - 35) + 'px');
            c.appendChild(el);
            setTimeout(() => { if (el.parentNode) el.remove(); }, 7000);
        }, i * 50);
    }
}

// ===== PARALLAX =====
window.addEventListener('scroll', () => {
    const s = window.pageYOffset;
    const hero = document.querySelector('.hero-content');
    if (hero && s < window.innerHeight) {
        hero.style.transform = `translateY(${s * 0.2}px)`;
        hero.style.opacity = Math.max(0, 1 - s * 0.0015);
    }
}, { passive: true });

// ===== RESIZE =====
window.addEventListener('resize', () => { CONFIG.isMobile = window.innerWidth <= 768; });

// ===== COMPATIBILIDAD METER =====
function initCompatibilityMeter() {
    const section = document.getElementById('compatibility-section');
    const fill = document.getElementById('compatibility-fill');
    const percentage = document.getElementById('compatibility-percentage');
    const verdict = document.getElementById('compatibility-verdict');
    
    if (!section || !fill || !percentage || !verdict) return;

    let done = false;
    const obs = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting && !done) {
                done = true;
                setTimeout(() => {
                    // Animate to 97%
                    let current = 0;
                    const target = 97;
                    const duration = 2500;
                    const start = performance.now();

                    function animate(time) {
                        const elapsed = time - start;
                        const progress = Math.min(elapsed / duration, 1);
                        const eased = 1 - Math.pow(1 - progress, 3);
                        current = Math.floor(eased * target);
                        
                        percentage.textContent = current + '%';
                        fill.style.width = current + '%';

                        if (progress < 1) {
                            requestAnimationFrame(animate);
                        } else {
                            percentage.textContent = target + '%';
                            fill.style.width = target + '%';
                            verdict.textContent = 'Match casi perfecto 🔥';
                        }
                    }
                    requestAnimationFrame(animate);
                }, 300);
            }
        });
    }, { threshold: 0.3 });
    obs.observe(section);
}

// ===== SI O NO GAME =====
function initSiNoGame() {
    const questions = document.querySelectorAll('.sino-question');
    if (!questions.length) return;

    const yesResponses = [
        'Sabia que ibas a decir que si 😏',
        'Esa es mi Marianita 😌',
        'Me encanta tu respuesta 💕',
        'Lo sabia! 😎',
        'Uff, me hiciste sonreir 😊'
    ];

    const noResponses = [
        'Nooo, di que si va 😤',
        'Anda di que si pues 🥺',
        'Dale que si, no seas asi 😢',
        'Venga, di que si 😏',
        'Respuesta incorrecta, di que si jaja 😅',
        'Ey ey ey, di que si mejor 😌'
    ];

    questions.forEach(question => {
        const btns = question.querySelectorAll('.sino-btn');
        const result = question.querySelector('.sino-result');
        const expectedAnswer = question.dataset.answer;

        btns.forEach(btn => {
            btn.addEventListener('click', () => {
                const value = btn.dataset.value;
                
                if (navigator.vibrate) {
                    navigator.vibrate(value === 'si' ? [40, 20, 40] : 30);
                }

                if (value === 'si') {
                    // Solo marca como respondida si dice SI
                    if (question.classList.contains('answered')) return;
                    question.classList.add('answered');
                    result.textContent = yesResponses[Math.floor(Math.random() * yesResponses.length)];
                    result.style.color = '#f7a8c4';
                    
                    // Reset after delay
                    setTimeout(() => {
                        question.classList.remove('answered');
                        result.textContent = '';
                    }, 4000);
                } else {
                    // Si dice NO, mostrar mensaje pidiendo que diga SI (no marca como respondida)
                    result.textContent = noResponses[Math.floor(Math.random() * noResponses.length)];
                    result.style.color = '#e8799e';
                    
                    // Limpiar el mensaje después de un rato pero permitir responder de nuevo
                    setTimeout(() => {
                        result.textContent = '';
                    }, 3000);
                }
            });
        });
    });
}

// ===== MESSAGE FORM HANDLER =====
function initMessageForm() {
    const form = document.getElementById('message-form');
    const textarea = document.getElementById('message-textarea');
    const submitBtn = document.getElementById('message-submit-btn');
    const statusEl = document.getElementById('message-status');
    
    if (!form || !textarea || !submitBtn || !statusEl) return;
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const message = textarea.value.trim();
        
        if (!message) {
            statusEl.textContent = 'Por favor escribe algo primero...';
            statusEl.className = 'message-status error';
            return;
        }
        
        // Deshabilitar botón mientras se envía
        submitBtn.disabled = true;
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Enviando... ⏳';
        statusEl.textContent = '';
        statusEl.className = 'message-status';
        
        try {
            // Enviar mensaje a Web3Forms
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    access_key: '601face4-1d4b-462c-98c1-c8f168bab50f',
                    subject: '💌 Mensaje de Marianita - San Valentin',
                    from_name: 'Marianita 💕',
                    message: message,
                    fecha: new Date().toLocaleString('es-CO', { timeZone: 'America/Bogota' }),
                    botcheck: ''
                })
            });
            
            const data = await response.json();
            
            if (data.success) {
                // Éxito - el mensaje se envió automáticamente
                statusEl.textContent = '¡Mensaje enviado! 💕 Ya me llegó, gracias hermosa';
                statusEl.className = 'message-status success';
                submitBtn.textContent = 'Enviado ✓';
                
                // Vibración de éxito
                if (navigator.vibrate) navigator.vibrate([50, 30, 50, 30, 100]);
                
                // Confetti extra de corazones
                for (let i = 0; i < 20; i++) {
                    setTimeout(() => {
                        const heart = document.createElement('div');
                        heart.textContent = ['💕', '💖', '💗', '💓', '💝', '💞'][Math.floor(Math.random() * 6)];
                        heart.style.cssText = `position:fixed;left:${Math.random()*100}%;top:-30px;font-size:${Math.random()*20+15}px;pointer-events:none;z-index:9999;animation:floatUp ${Math.random()*2+2.5}s linear forwards;opacity:0.9;`;
                        document.body.appendChild(heart);
                        setTimeout(() => heart.remove(), 5000);
                    }, i * 60);
                }
                
                // Limpiar formulario después de 5 segundos
                setTimeout(() => {
                    textarea.value = '';
                    submitBtn.textContent = 'Enviar otro mensaje 💌';
                    submitBtn.disabled = false;
                    statusEl.textContent = '';
                }, 5000);
                
            } else {
                throw new Error(data.message || 'Error al enviar');
            }
            
        } catch (error) {
            console.error('Error enviando mensaje:', error);
            
            statusEl.textContent = 'Hubo un error... intenta de nuevo 😅';
            statusEl.className = 'message-status error';
            
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                statusEl.textContent = '';
            }, 3000);
        }
    });
}

// Inicializar el formulario de mensajes
document.addEventListener('DOMContentLoaded', () => {
    // Esperar a que la sección de respuesta "SÍ" sea visible para inicializar el formulario
    const checkYesSection = setInterval(() => {
        const yesSection = document.getElementById('yes-section');
        if (yesSection && !yesSection.classList.contains('hidden')) {
            setTimeout(() => {
                initMessageForm();
            }, 2500);
            clearInterval(checkYesSection);
        }
    }, 500);
});
