document.addEventListener('DOMContentLoaded', () => {
    // Initialize Animations
    AOS.init({
        once: true,
        offset: 100,
        duration: 800,
        easing: 'ease-out-cubic',
    });

    // --- Custom Cursor Implementation ---
    const cursorContainer = document.getElementById('cursor-container');
    const trailLength = 12;
    const trails = [];

    // Create trail elements
    for (let i = 0; i < trailLength; i++) {
        const dot = document.createElement('div');
        dot.className = 'cursor-dot';
        cursorContainer.appendChild(dot);
        trails.push({
            element: dot,
            x: -100,
            y: -100
        });
    }

    let mouseX = -100;
    let mouseY = -100;

    // Track mouse movement
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        // Initial visibility
        if (mouseY > -100) {
            cursorContainer.style.opacity = '1';
        }
    });

    // Animation Loop
    function animateCursor() {
        let targetX = mouseX;
        let targetY = mouseY;

        trails.forEach((trail, index) => {
            // The first point follows the mouse, others follow the previous point
            const prevX = index === 0 ? mouseX : trails[index - 1].x;
            const prevY = index === 0 ? mouseY : trails[index - 1].y;

            // Smooth follow logic (LERP)
            trail.x += (prevX - trail.x) * 0.25;
            trail.y += (prevY - trail.y) * 0.25;

            // Calculate scale based on index (tapering effect)
            const scale = 1 - (index / trailLength);

            // Apply transform
            trail.element.style.transform = `
                translate(${trail.x}px, ${trail.y}px) 
                translate(-50%, -50%) 
                scale(${scale})
            `;
        });

        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // --- Particles Background ---
    const canvas = document.getElementById('particles-canvas');
    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];

    // Configuration
    const particleCount = 60; // Adjust for density
    const connectionDistance = 150;
    const mouseDistance = 200;

    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }

    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.size = Math.random() * 2 + 1;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            // Bounce off edges
            if (this.x < 0 || this.x > width) this.vx *= -1;
            if (this.y < 0 || this.y > height) this.vy *= -1;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
            ctx.fill();
        }
    }

    function initParticles() {
        particles = [];
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }

    function animateParticles() {
        ctx.clearRect(0, 0, width, height);

        particles.forEach((p, index) => {
            p.update();
            p.draw();

            // Connect particles
            for (let j = index + 1; j < particles.length; j++) {
                const p2 = particles[j];
                const dx = p.x - p2.x;
                const dy = p.y - p2.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < connectionDistance) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 * (1 - distance / connectionDistance)})`;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.stroke();
                }
            }
        });

        requestAnimationFrame(animateParticles);
    }

    // Initialize Particles
    window.addEventListener('resize', () => {
        resize();
        initParticles();
    });
    resize();
    initParticles();
    animateParticles();

    // Scroll to section logic
    const exploreBtn = document.querySelector('.explore-btn');
    if (exploreBtn) {
        exploreBtn.addEventListener('click', () => {
            document.getElementById('skills').scrollIntoView({ behavior: 'smooth' });
        });
    }

    // --- 3D Tilt Effect ---
    const nameElement = document.querySelector(".name-outline");

    if (nameElement) {
        document.addEventListener('mousemove', (e) => {
            const { clientX, clientY } = e;
            const { left, top, width, height } = nameElement.getBoundingClientRect();

            // Calculate center of element
            const centerX = left + width / 2;
            const centerY = top + height / 2;

            // Distance from center
            const deltaX = clientX - centerX;
            const deltaY = clientY - centerY;

            // Calculate rotation (max 20 degrees)
            // Rotate Y based on X distance (inverse)
            // Rotate X based on Y distance
            const rotateY = (deltaX / (window.innerWidth / 2)) * 20;
            const rotateX = -(deltaY / (window.innerHeight / 2)) * 20;

            nameElement.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
    }
});
