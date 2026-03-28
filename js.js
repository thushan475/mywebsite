document.addEventListener("DOMContentLoaded", () => {

    // ==================== TYPING EFFECT ====================
    const words = ["Web Developer", "UI Designer", "Freelancer"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    const typedElement = document.getElementById('typed');

    if (typedElement) {
        function type() {
            const currentWord = words[wordIndex];

            if (isDeleting) {
                typedElement.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typedElement.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
            }

            let typeSpeed = isDeleting ? 50 : 90;

            if (!isDeleting && charIndex === currentWord.length) {
                typeSpeed = 1400;
                isDeleting = true;
            }
            else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                typeSpeed = 400;
            }

            setTimeout(type, typeSpeed);
        }

        type();
    }

    // ==================== SKILLS DATA ====================
    const skillsData = [
        { name: "HTML5", icon: "fab fa-html5", color: "#e34f26", desc: "Semantic markup and modern web structure." },
        { name: "CSS3", icon: "fab fa-css3-alt", color: "#1572b6", desc: "Advanced styling, animations & responsive design." },
        { name: "JavaScript", icon: "fab fa-js", color: "#f7df1e", desc: "Interactive web experiences and DOM manipulation." },
        { name: "React", icon: "fab fa-react", color: "#61dafb", desc: "Building dynamic user interfaces." },
        { name: "Java", icon: "fas fa-code", color: "#007396", desc: "Backend development and OOP." },
        { name: "MySQL", icon: "fas fa-database", color: "#4479a1", desc: "Relational database design and queries." },
        { name: "Figma", icon: "fab fa-figma", color: "#f24e1e", desc: "UI/UX design and prototyping." },
        { name: "Tailwind", icon: "fas fa-wind", color: "#06b6d4", desc: "Utility-first CSS framework." },
        { name: "Git", icon: "fab fa-git-alt", color: "#f05032", desc: "Version control and collaboration." }
    ];

    // ==================== ELEMENTS ====================
    const globe = document.getElementById('globe');
    const canvas = document.getElementById('connectionCanvas');

    if (!globe || !canvas) return; // prevent crash

    const ctx = canvas.getContext('2d');
    const popupOverlay = document.getElementById('popupOverlay');
    const popupIcon = document.getElementById('popupIcon');
    const popupName = document.getElementById('popupName');
    const popupDesc = document.getElementById('popupDesc');
    const closeBtn = document.getElementById('closeBtn');

    let angle = 0;
    let isDragging = false;
    let prevX = 0;
    let velocity = 0;

    // ==================== CANVAS SIZE ====================
    function resizeCanvas() {
        canvas.width = globe.offsetWidth;
        canvas.height = globe.offsetHeight;
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // ==================== CREATE ICONS ====================
    skillsData.forEach((skill, i) => {
        const iconEl = document.createElement('div');
        iconEl.className = 'skill-icon';
        iconEl.innerHTML = `<i class="${skill.icon}"></i>`;
        iconEl.style.color = skill.color;

        const radius = 260;
        const phi = (i / skillsData.length) * Math.PI * 2;

        const x = Math.cos(phi) * radius;
        const y = Math.sin(phi) * (radius * 0.6);

        iconEl.style.left = `calc(50% + ${x}px)`;
        iconEl.style.top = `calc(50% + ${y}px)`;

        iconEl.addEventListener('click', (e) => {
            e.stopPropagation();
            showPopup(skill);
        });

        globe.appendChild(iconEl);
    });

    // ==================== DRAW CONNECTIONS ====================
    function drawConnections() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const icons = document.querySelectorAll('.skill-icon');

        ctx.strokeStyle = 'rgba(255,255,255,0.08)';
        ctx.lineWidth = 1;

        for (let i = 0; i < icons.length; i++) {
            for (let j = i + 1; j < icons.length; j++) {

                const x1 = icons[i].offsetLeft + icons[i].offsetWidth / 2;
                const y1 = icons[i].offsetTop + icons[i].offsetHeight / 2;

                const x2 = icons[j].offsetLeft + icons[j].offsetWidth / 2;
                const y2 = icons[j].offsetTop + icons[j].offsetHeight / 2;

                ctx.beginPath();
                ctx.moveTo(x1, y1);
                ctx.lineTo(x2, y2);
                ctx.stroke();
            }
        }
    }

    // ==================== ANIMATION ====================
    function animate() {
        if (!isDragging) {
            angle += 0.15;
            globe.style.transform = `rotateY(${angle}deg) rotateX(20deg)`;
        }

        drawConnections();
        requestAnimationFrame(animate);
    }

    animate();

    // ==================== DRAG CONTROL ====================
    globe.addEventListener('mousedown', (e) => {
        isDragging = true;
        prevX = e.clientX;
    });

    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;

        const delta = e.clientX - prevX;
        angle += delta * 0.8;
        velocity = delta * 0.6;

        globe.style.transform = `rotateY(${angle}deg) rotateX(20deg)`;
        prevX = e.clientX;
    });

    document.addEventListener('mouseup', () => {
        if (!isDragging) return;

        isDragging = false;

        let inertia = setInterval(() => {
            if (Math.abs(velocity) < 0.3) {
                clearInterval(inertia);
                return;
            }

            angle += velocity;
            globe.style.transform = `rotateY(${angle}deg) rotateX(20deg)`;
            velocity *= 0.92;
        }, 16);
    });

    // ==================== POPUP ====================
    function showPopup(skill) {
        popupIcon.innerHTML = `<i class="${skill.icon}"></i>`;
        popupIcon.style.color = skill.color;
        popupName.textContent = skill.name;
        popupDesc.textContent = skill.desc;
        popupOverlay.style.display = 'flex';
    }

    function closePopup() {
        popupOverlay.style.display = 'none';
    }

    closeBtn.addEventListener('click', closePopup);

    popupOverlay.addEventListener('click', (e) => {
        if (e.target === popupOverlay) closePopup();
    });

});