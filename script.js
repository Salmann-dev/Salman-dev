/**
 * Dark Glassmorphism Portfolio - Interactive Scripting
 * Vanilla JavaScript implementation for high performance & silky smooth UX
 */

document.addEventListener('DOMContentLoaded', () => {
  initTypingEffect();
  initSpotlightEffect();
  initHeaderScroll();
  initNavigation();
  initMobileMenu();
  initSkillFilters();
  initProjectModal();
  initContactForm();
  initHeroCodeCopy();
  initBackToTop();
});

/* ==========================================================================
   1. Dynamic Typing Effect (Hero Section)
   ========================================================================== */
function initTypingEffect() {
  const typedTarget = document.getElementById('dynamic-typed-text');
  if (!typedTarget) return;

  const phrases = [
    'Responsive Websites',
    'Clean UI Components',
    'Modern Frontends',
    'React Interfaces',
    'Freelance Projects'
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 90;

  function typeCycle() {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
      typedTarget.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 45;
    } else {
      typedTarget.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 90;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
      typingSpeed = 1800; // Pause at full word
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typingSpeed = 400; // Pause before new word
    }

    setTimeout(typeCycle, typingSpeed);
  }

  // Start with a small delay for smooth page entry
  setTimeout(typeCycle, 500);
}

/* ==========================================================================
   2. Dynamic Spotlight Cursor Tracker (Glowing Borders)
   ========================================================================== */
function initSpotlightEffect() {
  const spotlightCards = document.querySelectorAll('.spotlight-card, .project-card, .timeline-card, .contact-card-meta');

  spotlightCards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });
}

/* ==========================================================================
   3. Header Sticky Glass Effect on Scroll
   ========================================================================== */
function initHeaderScroll() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/* ==========================================================================
   4. Navigation Active State (IntersectionObserver)
   ========================================================================== */
function initNavigation() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');

  if (!sections.length || !navLinks.length) return;

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -60% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach((link) => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach((section) => observer.observe(section));
}

/* ==========================================================================
   5. Mobile Navigation Drawer with Light Dismiss
   ========================================================================== */
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobile-toggle');
  const closeBtn = document.getElementById('drawer-close');
  const drawer = document.getElementById('mobile-drawer');
  const backdrop = document.getElementById('drawer-backdrop');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link, .mobile-drawer .btn');

  if (!toggleBtn || !drawer || !backdrop) return;

  function openDrawer() {
    drawer.classList.add('open');
    backdrop.classList.add('active');
    toggleBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    drawer.classList.remove('open');
    backdrop.classList.remove('active');
    toggleBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  toggleBtn.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  backdrop.addEventListener('click', closeDrawer);

  mobileLinks.forEach((link) => {
    link.addEventListener('click', closeDrawer);
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) {
      closeDrawer();
    }
  });
}

/* ==========================================================================
   6. Interactive Skill Filter Tabs
   ========================================================================== */
function initSkillFilters() {
  const filterTabs = document.querySelectorAll('.filter-tab');
  const skillCards = document.querySelectorAll('.skill-card');

  if (!filterTabs.length || !skillCards.length) return;

  filterTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const category = tab.getAttribute('data-filter');

      filterTabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');

      skillCards.forEach((card) => {
        const cardCategory = card.getAttribute('data-category');
        if (category === 'all' || cardCategory === category) {
          card.classList.remove('hidden');
          card.style.animation = 'fadeIn 0.35s ease forwards';
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
}

/* ==========================================================================
   7. Featured Projects Details Modal (<dialog>)
   ========================================================================== */
const projectData = {
  copyforge: {
    title: 'Copyforge — AI Copywriting Tool',
    category: 'JavaScript • Gemini API • Vercel',
    description: 'A tool that generates on-brand product descriptions and social media posts for small businesses. Users describe their brand voice once, and the app generates copy that matches — powered by Google\'s Gemini API through a secure serverless backend.',
    bannerColor: 'from-cyan-900 to-blue-900',
    bannerIcon: 'sparkles',
    features: [
      'Serverless backend (Vercel Functions) keeps the API key secure server-side, never exposed to visitors.',
      'Custom brand voice input lets users generate copy that actually matches their tone, not generic AI output.',
      'Supports both product descriptions and platform-specific social media posts.',
      'Clean editorial-style UI built from scratch with plain HTML, CSS, and JavaScript — no framework overhead.'
    ],
    tags: ['JavaScript', 'Gemini API', 'Vercel Functions', 'HTML5', 'CSS3'],
    liveUrl: 'https://copyforge.vercel.app/',
    codeUrl: 'https://github.com/Salmann-dev/Copyforge'
  }
};

function initProjectModal() {
  const modal = document.getElementById('project-modal');
  const closeBtn = document.getElementById('modal-close-btn');
  const modalFooterClose = document.getElementById('modal-footer-close');
  const modalTitle = document.getElementById('modal-title');
  const modalTags = document.getElementById('modal-tags');
  const modalDesc = document.getElementById('modal-desc');
  const modalFeatures = document.getElementById('modal-features');
  const modalLiveBtn = document.getElementById('modal-live-btn');
  const modalCodeBtn = document.getElementById('modal-code-btn');
  const detailButtons = document.querySelectorAll('.btn-details');

  if (!modal) return;

  function openProject(projectId) {
    const data = projectData[projectId];
    if (!data) return;

    modalTitle.textContent = data.title;
    modalDesc.textContent = data.description;

    // Render tags
    modalTags.innerHTML = data.tags
      .map(tag => `<span class="project-tag">${tag}</span>`)
      .join('');

    // Render features
    modalFeatures.innerHTML = data.features
      .map(feat => `
        <li class="modal-feature-item">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          <span>${feat}</span>
        </li>
      `)
      .join('');

    if (modalLiveBtn) modalLiveBtn.href = data.liveUrl;
    if (modalCodeBtn) modalCodeBtn.href = data.codeUrl;

    modal.showModal();
  }

  detailButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const projectId = btn.getAttribute('data-project');
      openProject(projectId);
    });
  });

  function closeModal() {
    modal.close();
  }

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (modalFooterClose) modalFooterClose.addEventListener('click', closeModal);

  // Light dismiss: Close on backdrop click
  modal.addEventListener('click', (e) => {
    const dialogDimensions = modal.getBoundingClientRect();
    if (
      e.clientX < dialogDimensions.left ||
      e.clientX > dialogDimensions.right ||
      e.clientY < dialogDimensions.top ||
      e.clientY > dialogDimensions.bottom
    ) {
      modal.close();
    }
  });
}

/* ==========================================================================
   8. Interactive Contact Form with Validation & Feedback State
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('portfolio-contact-form');
  const successState = document.getElementById('form-success-state');
  const resetBtn = document.getElementById('form-reset-btn');
  const messageInput = document.getElementById('contact-message');
  const charCounter = document.getElementById('char-count');
  const submitBtn = document.getElementById('submit-btn');

  if (!form) return;

  // Real-time character counter
  if (messageInput && charCounter) {
    messageInput.addEventListener('input', () => {
      const count = messageInput.value.length;
      charCounter.textContent = `${count} / 500`;
      if (count > 480) {
        charCounter.style.color = '#f59e0b';
      } else {
        charCounter.style.color = '#64748b';
      }
    });
  }

  // Handle Form Submission
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Prevent submission if already loading
    if (submitBtn.classList.contains('loading')) return;

    // Check validity
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    // Toggle loading state
    submitBtn.classList.add('loading');
    submitBtn.setAttribute('disabled', 'true');

    // Simulate async submission with network feedback
    setTimeout(() => {
      submitBtn.classList.remove('loading');
      submitBtn.removeAttribute('disabled');

      // Hide form and show success state
      form.style.display = 'none';
      if (successState) {
        successState.classList.add('active');
      }
    }, 1200);
  });

  // Reset form handler
  if (resetBtn && successState) {
    resetBtn.addEventListener('click', () => {
      form.reset();
      if (charCounter) charCounter.textContent = '0 / 500';
      successState.classList.remove('active');
      form.style.display = 'block';
      const firstInput = form.querySelector('input');
      if (firstInput) firstInput.focus();
    });
  }
}

/* ==========================================================================
   9. Hero Code Snippet Copy Action
   ========================================================================== */
function initHeroCodeCopy() {
  const copyBtn = document.getElementById('hero-copy-code');
  if (!copyBtn) return;

  const codeToCopy = `export const developer: EngineerProfile = {
  name: "Salman",
  role: "Frontend Developer",
  focusAreas: [
    "Responsive Web Design",
    "React & Modern JavaScript",
    "Freelance Client Projects"
  ],
  metrics: {
    lighthouseScore: 99,
    yearsBuilding: 1,
    cleanCode: true
  }
};`;

  copyBtn.addEventListener('click', async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(codeToCopy);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = codeToCopy;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }

      const originalText = copyBtn.innerHTML;
      copyBtn.innerHTML = `
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#34d399" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
        <span style="color: #34d399;">Copied!</span>
      `;

      setTimeout(() => {
        copyBtn.innerHTML = originalText;
      }, 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  });
}

/* ==========================================================================
   10. Back to Top Button
   ========================================================================== */
function initBackToTop() {
  const backBtn = document.getElementById('back-to-top');
  if (!backBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      backBtn.classList.add('visible');
    } else {
      backBtn.classList.remove('visible');
    }
  }, { passive: true });

  backBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}
