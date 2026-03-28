// script.js
// Globe section removed — skills now use a pure CSS/HTML grid.
// Add future sections (projects, contact, etc.) here.

document.addEventListener("DOMContentLoaded", () => {

    // ── Active nav link on scroll ──────────────────────────────────────────
    const sections = document.querySelectorAll('section[id]');
    const navLinks  = document.querySelectorAll('.nav-links a');

    const activateLink = () => {
        let current = '';
        sections.forEach(sec => {
            if (window.scrollY >= sec.offsetTop - 120) current = sec.getAttribute('id');
        });
        navLinks.forEach(a => {
            a.classList.remove('active');
            if (a.getAttribute('href') === '#' + current) a.classList.add('active');
        });
    };

    window.addEventListener('scroll', activateLink, { passive: true });
    activateLink();

});