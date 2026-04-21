document.addEventListener('DOMContentLoaded', () => {
  const cards = Array.from(document.querySelectorAll('.project-card'));
  const filters = Array.from(document.querySelectorAll('.project-filter'));
  const counters = Array.from(document.querySelectorAll('.metric-number'));
  const previewModal = document.getElementById('projectPreviewModal');
  const previewTitle = document.getElementById('projectPreviewTitle');
  const previewImage = document.getElementById('projectPreviewImage');
  const closePreview = previewModal?.querySelector('.project-preview-close');

  filters.forEach((btn) => {
    btn.addEventListener('click', () => {
      const selected = btn.dataset.filter || 'all';

      filters.forEach((item) => {
        const active = item === btn;
        item.classList.toggle('is-active', active);
        item.setAttribute('aria-pressed', String(active));
      });

      cards.forEach((card) => {
        const category = card.dataset.category;
        const shouldShow = selected === 'all' || selected === category;
        card.classList.toggle('is-hidden', !shouldShow);
      });
    });
  });

  const countUp = (entry) => {
    const target = Number(entry.dataset.target || 0);
    let value = 0;
    const duration = 900;
    const stepTime = 16;
    const increment = Math.max(1, Math.round((target / duration) * stepTime));
    const timer = setInterval(() => {
      value += increment;
      if (value >= target) {
        value = target;
        clearInterval(timer);
      }
      entry.textContent = String(value);
    }, stepTime);
  };

  const counterObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(({ isIntersecting, target }) => {
      if (!isIntersecting) return;
      countUp(target);
      obs.unobserve(target);
    });
  }, { threshold: 0.4 });
  counters.forEach((item) => counterObserver.observe(item));

  cards.forEach((card) => {
    card.addEventListener('mousemove', (event) => {
      const rect = card.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const rotateY = ((x / rect.width) - 0.5) * 7;
      const rotateX = ((y / rect.height) - 0.5) * -7;
      card.style.transform = `translateY(-8px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  document.querySelectorAll('.project-preview-btn').forEach((button) => {
    button.addEventListener('click', () => {
      const project = button.closest('.project-card');
      if (!project || !previewModal || !previewTitle || !previewImage) return;
      previewTitle.textContent = project.dataset.project || '';
      previewImage.src = project.dataset.image || '';
      previewImage.alt = `${project.dataset.project || 'Project'} preview`;
      previewModal.classList.add('is-open');
      previewModal.setAttribute('aria-hidden', 'false');
    });
  });

  const closeModal = () => {
    if (!previewModal) return;
    previewModal.classList.remove('is-open');
    previewModal.setAttribute('aria-hidden', 'true');
  };

  closePreview?.addEventListener('click', closeModal);
  previewModal?.addEventListener('click', (event) => {
    if (event.target === previewModal) closeModal();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeModal();
  });

  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);

    gsap.from('.project-filter', {
      opacity: 0,
      y: 24,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '#projects',
        start: 'top 70%'
      }
    });

    gsap.from('.project-card', {
      opacity: 0,
      y: 40,
      scale: 0.95,
      duration: 0.7,
      stagger: 0.15,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.projects-grid',
        start: 'top 80%'
      }
    });
  }
});
