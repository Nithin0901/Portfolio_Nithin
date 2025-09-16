// ====================
// GSAP ANIMATIONS
// ====================

gsap.registerPlugin(ScrollTrigger);

// Hero model entrance animation
gsap.fromTo('.hero .model-container', {
    scale: 0.8,
    opacity: 0,
    y: 50
}, {
    scale: 1,
    opacity: 1,
    y: 0,
    duration: 1.5,
    ease: 'power3.out',
    delay: 0.5
});

// About model scroll animation
gsap.to(".about-section .model-container", {
    scrollTrigger: {
        trigger: "#about",
        start: "top center",
        end: "bottom center",
        scrub: true,
    },
    y: 100,
    scale: 0.85,
    opacity: 0.6,
});

// Animate the vertical timeline line
gsap.to(".timeline-line", {
    scrollTrigger: {
        trigger: ".timeline",
        start: "top 80%",
        end: "bottom 20%",
        scrub: true,
    },
    scaleY: 1,
    ease: "none",
});

// Animate icon to move down as line grows
gsap.to(".timeline-icon", {
    scrollTrigger: {
        trigger: ".timeline",
        start: "top 80%",
        end: "bottom 20%",
        scrub: true,
    },
    y: () => {
        const timeline = document.querySelector(".timeline");
        if (timeline) {
            const lineHeight = timeline.offsetHeight;
            return lineHeight - 60;
        }
        return 0;
    },
    ease: "none"
});

// Animate each timeline card and its dot
gsap.utils.toArray(".timeline-item").forEach((item, i) => {
    const content = item.querySelector(".timeline-content");
    const dot = item.querySelector(".timeline-dot");
    
    if (content) {
        gsap.fromTo(content, {
            y: 100,
            opacity: 0
        }, {
            scrollTrigger: {
                trigger: item,
                start: "top 85%",
                toggleActions: "play none none reverse"
            },
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: "power3.out",
            delay: i * 0.1
        });
    }
    
    if (dot) {
        gsap.to(dot, {
            scrollTrigger: {
                trigger: item,
                start: "top 85%",
                toggleActions: "play none none none"
            },
            scale: 1,
            duration: 0.4,
            ease: "back.out(1.7)",
            delay: 0.2
        });
    }
});

// ====================
// PERFORMANCE OPTIMIZATION
// ====================

// Pause animations when not visible
const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            heroRenderer.domElement.style.display = 'block';
        } else {
            heroRenderer.domElement.style.display = 'none';
        }
    });
});

const aboutObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            aboutRenderer.domElement.style.display = 'block';
        } else {
            aboutRenderer.domElement.style.display = 'none';
        }
    });
});

// Observe the containers
const heroContainer = document.querySelector('#home .model-container');
const aboutContainer = document.querySelector('#about .model-container');

if (heroContainer) heroObserver.observe(heroContainer);
if (aboutContainer) aboutObserver.observe(aboutContainer);