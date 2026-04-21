 
        // Typing animation
        // const typingText = document.querySelector('.typing-text');
        // const texts = ['Nithin', 'a Developer', 'a Designer', 'a Problem Solver'];
        // let textIndex = 0;
        // let charIndex = 0;
        // let isDeleting = false;

        // function typeWriter() {
        //     const currentText = texts[textIndex];
            
        //     if (!isDeleting && charIndex <= currentText.length) {
        //         typingText.textContent = currentText.substring(0, charIndex);
        //         charIndex++;
        //         setTimeout(typeWriter, 100);
        //     } else if (isDeleting && charIndex >= 0) {
        //         typingText.textContent = currentText.substring(0, charIndex);
        //         charIndex--;
        //         setTimeout(typeWriter, 50);
        //     } else {
        //         isDeleting = !isDeleting;
        //         if (!isDeleting) {
        //             textIndex = (textIndex + 1) % texts.length;
        //         }
        //         setTimeout(typeWriter, 1000);
        //     }
        // }

        // Start typing animation
        // typeWriter();

        // Navbar scroll effect
        window.addEventListener('scroll', function() {
            const navbar = document.querySelector('.navbar');
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Update active nav link on scroll
        window.addEventListener('scroll', function() {
            const sections = document.querySelectorAll('section[id]');
            const navLinks = document.querySelectorAll('.nav-link');
            
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (scrollY >= (sectionTop - 200)) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + current) {
                    link.classList.add('active');
                }
            });
        });

        // Intersection Observer for animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        // Observe all animated elements
        document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right').forEach(el => {
            observer.observe(el);
        });

        // Form submission
        document.querySelector('form').addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show success message
            const button = this.querySelector('button[type="submit"]');
            const originalText = button.textContent;
            button.textContent = 'Sending...';
            button.disabled = true;
            
            // Simulate form submission
            setTimeout(() => {
                button.textContent = 'Message Sent!';
                button.style.background = 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)';
                
                setTimeout(() => {
                    button.textContent = originalText;
                    button.disabled = false;
                    button.style.background = '';
                    this.reset();
                }, 2000);
            }, 1500);
        });

        // Add parallax effect to floating shapes
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const shapes = document.querySelectorAll('.shape');
            
            shapes.forEach((shape, index) => {
                const speed = 0.5 + (index * 0.2);
                shape.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
            });
        });


// GSAP and section-specific interactions
if (window.gsap && window.ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);

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

  gsap.utils.toArray(".timeline-item").forEach((item, i) => {
    const content = item.querySelector(".timeline-content");
    const dot = item.querySelector(".timeline-dot");

    gsap.fromTo(
      content,
      { y: 100, opacity: 0 },
      {
        scrollTrigger: {
          trigger: item,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power3.out",
        delay: i * 0.1,
      }
    );

    gsap.to(dot, {
      scrollTrigger: {
        trigger: item,
        start: "top 85%",
        toggleActions: "play none none none",
      },
      scale: 1,
      duration: 0.4,
      ease: "back.out(1.7)",
      delay: 0.2,
    });
  });

  gsap.from(".skill-orb-card", {
    opacity: 0,
    y: 24,
    stagger: 0.08,
    duration: 0.7,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".skills-showcase-grid",
      start: "top 82%",
      once: true,
    },
  });

  gsap.from(".innovative-card", {
    opacity: 0,
    y: 30,
    stagger: 0.14,
    duration: 0.8,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".project-grid",
      start: "top 82%",
      once: true,
    },
  });
}

const projectFilterButtons = document.querySelectorAll('.project-filter-btn');
const projectCards = document.querySelectorAll('.project-grid .project-card');

projectFilterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;

    projectFilterButtons.forEach((btn) => btn.classList.remove('active'));
    button.classList.add('active');

    projectCards.forEach((card) => {
      const categories = (card.dataset.category || '').split(' ');
      const isVisible = filter === 'all' || categories.includes(filter);
      card.classList.toggle('is-hidden', !isVisible);
    });
  });
});

const metricObserver = new IntersectionObserver((entries, obs) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;

    const counter = entry.target;
    const target = Number(counter.dataset.target || 0);
    const duration = 1000;
    const start = performance.now();

    const tick = (time) => {
      const progress = Math.min((time - start) / duration, 1);
      counter.textContent = Math.floor(progress * target).toString();
      if (progress < 1) requestAnimationFrame(tick);
      else counter.textContent = target.toString();
    };

    requestAnimationFrame(tick);
    obs.unobserve(counter);
  });
}, { threshold: 0.35 });

document.querySelectorAll('.metric-number').forEach((counter) => metricObserver.observe(counter));

const modal = document.querySelector('.project-preview-modal');
const modalImage = document.querySelector('.project-preview-image');
const modalTitle = document.querySelector('.project-preview-title');
const modalDescription = document.querySelector('.project-preview-description');
const modalClose = document.querySelector('.project-preview-close');

if (modal && modalImage && modalTitle && modalDescription && modalClose) {
  document.querySelectorAll('.project-preview-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.project-card');
      if (!card) return;

      modalImage.src = card.dataset.preview || '';
      modalTitle.textContent = card.dataset.title || 'Project Preview';
      modalDescription.textContent = card.dataset.desc || '';
      modal.classList.add('open');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    });
  });

  const closeModal = () => {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  modalClose.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) closeModal();
  });
}

let rafId = null;
const updateParallaxCards = () => {
  const scrollY = window.scrollY || window.pageYOffset;
  projectCards.forEach((card, index) => {
    const shift = Math.sin((scrollY + index * 45) * 0.0025) * 4;
    if (!card.classList.contains('is-hidden')) {
      card.style.setProperty('--parallax-shift', `${shift}px`);
    }
  });
  rafId = null;
};

window.addEventListener('scroll', () => {
  if (!rafId) rafId = requestAnimationFrame(updateParallaxCards);
}, { passive: true });
