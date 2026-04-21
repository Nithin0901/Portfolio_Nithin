 
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

        // Add 3D tilt effects, filtering, and progressive reveal for project cards
        const projectCards = document.querySelectorAll('.project-card[data-tilt-card]');
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (!prefersReducedMotion) {
            projectCards.forEach((card) => {
                card.addEventListener('mousemove', (event) => {
                    const rect = card.getBoundingClientRect();
                    const x = event.clientX - rect.left;
                    const y = event.clientY - rect.top;
                    const centerX = rect.width / 2;
                    const centerY = rect.height / 2;
                    const rotateX = ((centerY - y) / centerY) * 6;
                    const rotateY = ((x - centerX) / centerX) * 6;
                    card.style.transform = `translateY(-10px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg)`;
                });

                card.addEventListener('mouseleave', () => {
                    card.style.transform = '';
                });
            });
        }

        const filterButtons = document.querySelectorAll('.project-filter-btn');
        const projectItems = document.querySelectorAll('.project-item');
        const viewMoreButton = document.getElementById('viewMoreProjects');
        let showAllProjects = false;

        const updateProjectCards = () => {
            let hiddenCount = 0;
            const selectedFilter = document.querySelector('.project-filter-btn.active')?.dataset.filter || 'all';

            projectItems.forEach((item) => {
                const category = item.dataset.category;
                const isFeatured = item.dataset.featured === 'true';
                const matchesFilter = selectedFilter === 'all' || category === selectedFilter;
                const shouldShow = matchesFilter && (selectedFilter !== 'all' || showAllProjects || isFeatured);

                item.classList.toggle('project-hidden', !shouldShow);

                if (selectedFilter === 'all' && matchesFilter && !isFeatured && !showAllProjects) {
                    hiddenCount++;
                }
            });

            if (viewMoreButton) {
                if (selectedFilter !== 'all') {
                    viewMoreButton.style.display = 'none';
                } else if (hiddenCount > 0) {
                    viewMoreButton.style.display = 'inline-flex';
                    viewMoreButton.textContent = 'View More Projects';
                } else if (showAllProjects) {
                    viewMoreButton.style.display = 'inline-flex';
                    viewMoreButton.textContent = 'Show Less';
                } else {
                    viewMoreButton.style.display = 'none';
                }
            }
        };

        filterButtons.forEach((button) => {
            button.addEventListener('click', () => {
                filterButtons.forEach((btn) => btn.classList.remove('active'));
                button.classList.add('active');
                showAllProjects = false;
                updateProjectCards();
            });
        });

        if (viewMoreButton) {
            viewMoreButton.addEventListener('click', () => {
                showAllProjects = !showAllProjects;
                updateProjectCards();
            });
        }

        updateProjectCards();
   

        
// <!-- GSAP CDN -->

  gsap.registerPlugin(ScrollTrigger);

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

  // Animate each card and its dot
  gsap.utils.toArray(".timeline-item").forEach((item, i) => {
    const content = item.querySelector(".timeline-content");
    const dot = item.querySelector(".timeline-dot");

    gsap.fromTo(content,
      { y: 100, opacity: 0 },
      {
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
  });


// Initialize Particles.js
particlesJS("particles-js", {
    "particles": {
        "number": {
            "value": 80,
            "density": {
                "enable": true,
                "value_area": 800
            }
        },
        "color": {
            "value": "#FF6B35"
        },
        "shape": {
            "type": "circle",
            "stroke": {
                "width": 0,
                "color": "#000000"
            },
            "polygon": {
                "nb_sides": 5
            }
        },
        "opacity": {
            "value": 0.3,
            "random": true,
            "anim": {
                "enable": false,
                "speed": 1,
                "opacity_min": 0.1,
                "sync": false
            }
        },
        "size": {
            "value": 3,
            "random": true,
            "anim": {
                "enable": false,
                "speed": 40,
                "size_min": 0.1,
                "sync": false
            }
        },
        "line_linked": {
            "enable": true,
            "distance": 150,
            "color": "#FF6B35",
            "opacity": 0.2,
            "width": 1
        },
        "move": {
            "enable": true,
            "speed": 2,
            "direction": "none",
            "random": false,
            "straight": false,
            "out_mode": "out",
            "bounce": false,
            "attract": {
                "enable": false,
                "rotateX": 600,
                "rotateY": 1200
            }
        }
    },
    "interactivity": {
        "detect_on": "canvas",
        "events": {
            "onhover": {
                "enable": true,
                "mode": "grab"
            },
            "onclick": {
                "enable": true,
                "mode": "push"
            },
            "resize": true
        },
        "modes": {
            "grab": {
                "distance": 140,
                "line_linked": {
                    "opacity": 0.5
                }
            },
            "bubble": {
                "distance": 400,
                "size": 40,
                "duration": 2,
                "opacity": 8,
                "speed": 3
            },
            "repulse": {
                "distance": 200,
                "duration": 0.4
            },
            "push": {
                "particles_nb": 4
            },
            "remove": {
                "particles_nb": 2
            }
        }
    },
    "retina_detect": true
});
  


  
