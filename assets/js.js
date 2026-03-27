/* ============================================
   THUSHAN PORTFOLIO — script.js (Updated)
   ============================================ */

/* ── 1. Custom Cursor ───────────────────────── */
const dot  = document.querySelector('.cursor-dot');
const ring = document.querySelector('.cursor-ring');

let mouseX = 0, mouseY = 0;
let ringX  = 0, ringY  = 0;

/* Track velocity for directional animation */
let prevMouseX = 0, prevMouseY = 0;
let velX = 0, velY = 0;

document.addEventListener('mousemove', e => {
    velX = e.clientX - mouseX;
    velY = e.clientY - mouseY;

    mouseX = e.clientX;
    mouseY = e.clientY;

    dot.style.left = mouseX + 'px';
    dot.style.top  = mouseY + 'px';

    createDirectionalTrail(e.clientX, e.clientY, velX, velY);
});

function animateRing() {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    ring.style.left = ringX + 'px';
    ring.style.top  = ringY + 'px';
    requestAnimationFrame(animateRing);
}
animateRing();

document.querySelectorAll('a, button, .btn, .dot, .social-btn').forEach(el => {
    el.addEventListener('mouseenter', () => {
        dot.style.transform    = 'translate(-50%,-50%) scale(2.5)';
        ring.style.width       = '56px';
        ring.style.height      = '56px';
        ring.style.borderColor = 'rgba(79,195,247,0.9)';
    });
    el.addEventListener('mouseleave', () => {
        dot.style.transform    = 'translate(-50%,-50%) scale(1)';
        ring.style.width       = '36px';
        ring.style.height      = '36px';
        ring.style.borderColor = 'rgba(233,30,140,0.55)';
    });
});


/* ── 2. Directional Mouse Trail ─────────────── */
/*
   Mouse direction අනුව streak / comet effect දෙනවා.
   Left → pink streaks, Right → blue streaks,
   Up/Down → purple. Speed වැඩි වෙලා තියෙනකොට
   longer streaks create වෙනවා.
*/

let trailThrottle = 0;

function createDirectionalTrail(x, y, vx, vy) {
    trailThrottle++;
    if (trailThrottle % 2 !== 0) return;

    const speed = Math.sqrt(vx * vx + vy * vy);
    if (speed < 1) return; // Standing still → no trail

    /* Comet streak — elongated in movement direction */
    const streak = document.createElement('div');
    streak.classList.add('mouse-streak');

    const length   = Math.min(speed * 3.5, 60);
    const angle    = Math.atan2(vy, vx) * (180 / Math.PI);
    const opacity  = Math.min(speed / 15, 1);

    /* Color based on horizontal direction */
    let color;
    if (Math.abs(vx) > Math.abs(vy)) {
        color = vx > 0 ? '#4fc3f7' : '#e91e8c'; // right = blue, left = pink
    } else {
        color = vy > 0 ? '#9c27b0' : '#a5d6a7';  // down = purple, up = green
    }

    streak.style.cssText = `
        left: ${x}px;
        top: ${y}px;
        width: ${length}px;
        height: ${Math.max(2, speed * 0.4)}px;
        background: linear-gradient(90deg, transparent, ${color});
        transform: translate(-100%, -50%) rotate(${angle}deg);
        transform-origin: right center;
        opacity: ${opacity};
        box-shadow: 0 0 ${speed}px ${color};
    `;

    document.body.appendChild(streak);

    /* Fade out */
    requestAnimationFrame(() => {
        streak.style.transition = 'opacity 0.4s ease, width 0.4s ease';
        streak.style.opacity    = '0';
        streak.style.width      = '0px';
    });

    setTimeout(() => streak.remove(), 450);

    /* Sparkle burst at high speed */
    if (speed > 12) {
        createSpeedBurst(x, y, color, speed);
    }
}

function createSpeedBurst(x, y, color, speed) {
    const count = Math.floor(speed / 6);
    for (let i = 0; i < count; i++) {
        const spark = document.createElement('div');
        spark.classList.add('mouse-trail');

        const size  = Math.random() * 5 + 2;
        const angle = Math.random() * 360;
        const dist  = Math.random() * 25 + 8;

        spark.style.cssText = `
            left: ${x}px;
            top: ${y}px;
            width: ${size}px;
            height: ${size}px;
            background: ${color};
            box-shadow: 0 0 ${size * 2}px ${color};
            --tx: ${Math.cos(angle * Math.PI / 180) * dist}px;
            --ty: ${Math.sin(angle * Math.PI / 180) * dist}px;
        `;
        document.body.appendChild(spark);
        setTimeout(() => spark.remove(), 700);
    }
}


/* ── 3. Navbar Auto-Hide on Scroll ───────────── */
/*
   Scroll down → navbar hide.
   Scroll up හෝ mouse top 80px ට ගියාම → show.

*/

// ==========================
// Navbar hide/show on scroll
// ==========================
/* ========== Navbar Hide/Show Unified ========== */
/* ================= Navbar Hide/Show on Scroll ================= */
/* ================= Navbar Hide/Show on Scroll (FIXED) ================= */
/* ----------------------------------------------
   3. Navbar Auto-Hide on Scroll (FIXED)
   ---------------------------------------------- */
const navbar = document.querySelector('.navbar');
let lastScrollTop = 0;
const scrollThreshold = 10; // පොඩ්ඩක් scroll වුණාම වැඩ කරන්න

window.addEventListener('scroll', () => {
    let currentScroll = window.pageYOffset || document.documentElement.scrollTop;

    // පොඩි දුරක් scroll වෙනකන් ඉන්නවා (Smooth look)
    if (Math.abs(lastScrollTop - currentScroll) <= scrollThreshold) return;

    // Scroll Down - Hide Navbar
    if (currentScroll > lastScrollTop && currentScroll > 150) {
        navbar.classList.add('nav-hidden');
    }
    // Scroll Up - Show Navbar
    else {
        navbar.classList.remove('nav-hidden');
    }

    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
}, { passive: true });

// Mouse screen එකේ උඩට (80px) ගියොත් navbar එක පෙන්වන්න
document.addEventListener('mousemove', e => {
    if (e.clientY < 80) {
        navbar.classList.remove('nav-hidden');
    }
});


/* ── 4. Typing Effect ─────────────────────────── */
/*
   "Web Developer & UI Designer" first phrase.
   Delete → next phrase → loop.
*/
const phrases = [
    'Web Developer & UI Designer',
    'Frontend Magic Maker',
    'Creative Problem Solver',
    'Clean Code Craftsman',
];
let pi = 0, ci = 0, deleting = false;
const typedEl = document.getElementById('typed');

function type() {
    const current = phrases[pi];
    if (!deleting) {
        typedEl.textContent = current.slice(0, ci + 1);
        ci++;
        if (ci === current.length) {
            deleting = true;
            setTimeout(type, 1800);
            return;
        }
        setTimeout(type, 75);
    } else {
        typedEl.textContent = current.slice(0, ci - 1);
        ci--;
        if (ci === 0) {
            deleting = false;
            pi = (pi + 1) % phrases.length;
            setTimeout(type, 400);
            return;
        }
        setTimeout(type, 40);
    }
}
type();


/* ── 5. Image Carousel ───────────────────────── */
const slides = document.querySelectorAll('.carousel-slide');
const dots   = document.querySelectorAll('.dot');
let current  = 0;
let carouselTimer;

function goTo(index) {
    slides[current].classList.remove('active');
    slides[current].classList.add('exiting');
    dots[current].classList.remove('active');

    const prev = current;
    setTimeout(() => {
        slides[prev].classList.remove('exiting');
        current = index;
        slides[current].classList.add('active');
        dots[current].classList.add('active');
    }, 50);
}

function nextSlide() { goTo((current + 1) % slides.length); }

function startCarousel() { carouselTimer = setInterval(nextSlide, 3000); }

dots.forEach(d => {
    d.addEventListener('click', () => {
        clearInterval(carouselTimer);
        goTo(parseInt(d.dataset.index));
        startCarousel();
    });
});

startCarousel();


/* ── 6. Parallax Tilt on Hero Right ──────────── */
const heroSection = document.querySelector('.hero');
const heroRight   = document.querySelector('.hero-right');

heroSection.addEventListener('mousemove', e => {
    const rect = heroSection.getBoundingClientRect();
    const rx   = (e.clientX - rect.left - rect.width  / 2) / rect.width;
    const ry   = (e.clientY - rect.top  - rect.height / 2) / rect.height;
    heroRight.style.transform = `perspective(900px) rotateY(${rx * 10}deg) rotateX(${-ry * 6}deg) translateZ(10px)`;
});

heroSection.addEventListener('mouseleave', () => {
    heroRight.style.transform = 'perspective(900px) rotateY(0deg) rotateX(0deg) translateZ(0)';
});


/* ── 7. Floating Particles ───────────────────── */
const particleContainer = document.getElementById('particles');
const PARTICLE_COUNT    = 38;

for (let i = 0; i < PARTICLE_COUNT; i++) {
    const p    = document.createElement('div');
    p.classList.add('particle');
    const size = Math.random() * 3 + 1;
    const hue  = Math.random() > 0.5 ? '330, 60%, 60%' : '200, 80%, 65%';
    p.style.cssText = `
        width:${size}px; height:${size}px;
        left:${Math.random() * 100}%; top:${Math.random() * 100 + 100}%;
        background:hsl(${hue}); box-shadow:0 0 ${size*4}px hsl(${hue});
        animation-duration:${Math.random()*18+12}s;
        animation-delay:${Math.random()*-20}s;
    `;
    particleContainer.appendChild(p);
}


/* ── 8. Active Nav Link on Scroll ────────────── */
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    sections.forEach(section => {
        const sTop = section.offsetTop - 100;
        const sH   = section.offsetHeight;
        if (scrollY >= sTop && scrollY < sTop + sH) {
            navLinks.forEach(a => a.classList.remove('active'));
            const link = document.querySelector(`.nav-links a[href="#${section.id}"]`);
            if (link) link.classList.add('active');
        }
    });
}, { passive: true });


/* ── 9. Mouse Glow on Hero ───────────────────── */
const heroEl = document.querySelector('.hero');

heroEl.addEventListener('mousemove', e => {
    const x = (e.clientX / window.innerWidth)  * 100;
    const y = (e.clientY / window.innerHeight) * 100;
    heroEl.style.background = `
        radial-gradient(ellipse 50% 50% at ${x}% ${y}%, rgba(233,30,140,0.10) 0%, transparent 55%),
        radial-gradient(ellipse 80% 60% at 15% 60%, rgba(233,30,140,0.10) 0%, transparent 60%),
        radial-gradient(ellipse 60% 80% at 85% 40%, rgba(79,195,247,0.09) 0%, transparent 60%),
        #0a0a0f
    `;
});

heroEl.addEventListener('mouseleave', () => {
    heroEl.style.background = '';
});

