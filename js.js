
<!-- ==================== JAVASCRIPT ==================== -->

    // ==================== TYPING EFFECT ====================
    const words    = ["Web Developer", "UI Designer", "Freelancer"];
    let wordIndex  = 0, charIndex = 0, isDeleting = false;
    const typedEl  = document.getElementById('typed');

    function type() {
    const word = words[wordIndex];
    typedEl.textContent = isDeleting
    ? word.substring(0, charIndex - 1)
    : word.substring(0, charIndex + 1);
    isDeleting ? charIndex-- : charIndex++;
    let speed = isDeleting ? 45 : 85;
    if (!isDeleting && charIndex === word.length)  { speed = 1600; isDeleting = true; }
    else if (isDeleting && charIndex === 0)         { isDeleting = false; wordIndex = (wordIndex + 1) % words.length; speed = 500; }
    setTimeout(type, speed);
}
    type();

    // ==================== CUSTOM CURSOR ====================
    const dot  = document.querySelector('.cursor-dot');
    const ring = document.querySelector('.cursor-ring');
    let mx = 0, my = 0, rx = 0, ry = 0;

    document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.transform = `translate(${mx}px,${my}px)`;
    const t = document.createElement('div');
    t.className = 'mouse-trail';
    Object.assign(t.style, {
    left: mx + 'px', top: my + 'px',
    background: Math.random() > .5 ? 'var(--pink)' : 'var(--blue)',
    boxShadow:  Math.random() > .5 ? '0 0 10px var(--pink)' : '0 0 10px var(--blue)'
});
    document.body.appendChild(t);
    setTimeout(() => t.remove(), 800);
});

    (function loop() {
    rx += (mx - rx) * .12; ry += (my - ry) * .12;
    ring.style.transform = `translate(${rx}px,${ry}px)`;
    requestAnimationFrame(loop);
})();

    document.querySelectorAll('a,button').forEach(el => {
    el.addEventListener('mouseenter', () => { ring.style.width = ring.style.height = '50px'; ring.style.borderColor = 'rgba(156,39,176,.6)'; });
    el.addEventListener('mouseleave', () => { ring.style.width = ring.style.height = '36px'; ring.style.borderColor = 'rgba(233,30,140,.55)'; });
});

    // ==================== PARTICLES ====================
    const pc = document.getElementById('particles');
    if (pc) for (let i = 0; i < 30; i++) {
    const p = document.createElement('div');
    p.classList.add('particle');
    const s = Math.random() * 4 + 1;
    p.style.cssText = `width:${s}px;height:${s}px;left:${Math.random()*100}%;top:${Math.random()*100}%;background:${Math.random()>.5?'var(--pink)':'var(--blue)'};animation-duration:${Math.random()*15+8}s;animation-delay:${Math.random()*10}s;`;
    pc.appendChild(p);
}

    // ==================== SKILL CARDS SCROLL REVEAL ====================
    const io = new IntersectionObserver(entries => {
    entries.forEach((entry, idx) => {
        if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add('visible'), idx * 80);
            io.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });
    document.querySelectorAll('.skill-card').forEach(c => io.observe(c));

    // ==================== NAVBAR SCROLL HIDE ====================
    (function () {
    var nav   = document.querySelector('.navbar');
    var lastY = 0;
    var tick  = false;
    window.addEventListener('scroll', function () {
    if (!tick) {
    requestAnimationFrame(function () {
    var y = window.scrollY;
    if (y < 60)       nav.classList.remove('nav-hidden');
    else if (y > lastY) nav.classList.add('nav-hidden');
    else              nav.classList.remove('nav-hidden');
    lastY = y;
    tick  = false;
    });
    tick = true;
  }
 });
  })();



