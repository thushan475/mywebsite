const words = ["Web Developer", "UI Designer", "Freelancer"];
let wordIndex = 0, charIndex = 0, isDeleting = false;
const typedEl = document.getElementById('typed');

function type() {
    const word = words[wordIndex];
    typedEl.textContent = isDeleting
        ? word.substring(0, charIndex - 1)
        : word.substring(0, charIndex + 1);
    isDeleting ? charIndex-- : charIndex++;
    let speed = isDeleting ? 45 : 85;
    if (!isDeleting && charIndex === word.length) { speed = 1600; isDeleting = true; }
    else if (isDeleting && charIndex === 0) { isDeleting = false; wordIndex = (wordIndex + 1) % words.length; speed = 500; }
    setTimeout(type, speed);
}
type();



const pc = document.getElementById('particles');
if (pc) for (let i = 0; i < 30; i++) {
    const p = document.createElement('div');
    p.classList.add('particle');
    const s = Math.random() * 4 + 1;
    p.style.cssText = `width:${s}px;height:${s}px;left:${Math.random()*100}%;top:${Math.random()*100}%;background:${Math.random()>.5?'var(--pink)':'var(--blue)'};animation-duration:${Math.random()*15+8}s;animation-delay:${Math.random()*10}s;`;
    pc.appendChild(p);
}

const io = new IntersectionObserver(entries => {
    entries.forEach((entry, idx) => {
        if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add('visible'), idx * 80);
            io.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });
document.querySelectorAll('.skill-card').forEach(c => io.observe(c));

(function () {
    var nav = document.querySelector('.navbar');
    var lastY = 0;
    var tick = false;
    window.addEventListener('scroll', function () {
        if (!tick) {
            requestAnimationFrame(function () {
                var y = window.scrollY;
                if (y < 60) nav.classList.remove('nav-hidden');
                else if (y > lastY) nav.classList.add('nav-hidden');
                else nav.classList.remove('nav-hidden');
                lastY = y;
                tick = false;
            });
            tick = true;
        }
    });
})();

// ── Lightbox scroll-lock  ──────────────────────────────────────────
document.addEventListener('click', function (e) {
    const anchor = e.target.closest('a[href^="#"]');
    if (!anchor) return;

    const href = anchor.getAttribute('href');

    if (href.startsWith('#lb') || href.startsWith('#as-lb') || href.startsWith('#project')) {
        document.body.classList.add('no-scroll');
    }

    if (href === '#') {
        document.body.classList.remove('no-scroll');
    }
});

window.addEventListener('hashchange', function () {
    if (!location.hash) {
        document.body.classList.remove('no-scroll');
    }
});