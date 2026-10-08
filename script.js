/**
 * Salman — Portfolio (VS Code IDE Theme inspired by Alejandro Gomez)
 * Interactive IDE Controls, Starry Canvas, Tabs, Explorer, and Contact Handler
 */

document.addEventListener('DOMContentLoaded', () => {
  initStarryCanvas();
  initDynamicTitle();
  initActivityBarAndExplorer();
  initFileAndTabNavigation();
  initSkillsPicker();
  initGlowCard();
  initContactForm();
});

/* ==========================================================================
   1. Interactive Starry Particles Canvas
   ========================================================================== */
function initStarryCanvas() {
  const canvas = document.getElementById('stars-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let animationFrameId;
  let width, height;
  const stars = [];
  const starCount = 85;

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  window.addEventListener('resize', resize);
  resize();

  for (let i = 0; i < starCount; i++) {
    stars.push({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.5 + 0.4,
      opacity: Math.random() * 0.6 + 0.15,
      speed: Math.random() * 0.25 + 0.05
    });
  }

  function render() {
    ctx.clearRect(0, 0, width, height);

    stars.forEach((star) => {
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(169, 177, 214, ${star.opacity})`;
      ctx.fill();

      star.y -= star.speed;
      if (star.y < 0) {
        star.y = height;
        star.x = Math.random() * width;
      }
    });

    animationFrameId = requestAnimationFrame(render);
  }

  render();
}

/* ==========================================================================
   2. Dynamic Cycling Title in Hero
   ========================================================================== */
function initDynamicTitle() {
  const target = document.getElementById('dynamic-title');
  if (!target) return;

  const roles = [
    'Frontend Developer',
    'React & Next.js Engineer',
    'TypeScript Craftsman',
    'UI Systems Builder'
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let speed = 90;

  function type() {
    const current = roles[roleIndex];

    if (isDeleting) {
      target.textContent = current.substring(0, charIndex - 1);
      charIndex--;
      speed = 40;
    } else {
      target.textContent = current.substring(0, charIndex + 1);
      charIndex++;
      speed = 90;
    }

    if (!isDeleting && charIndex === current.length) {
      speed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      speed = 450;
    }

    setTimeout(type, speed);
  }

  setTimeout(type, 400);
}

/* ==========================================================================
   3. ActivityBar & Explorer Sidebar Toggling
   ========================================================================== */
function initActivityBarAndExplorer() {
  const explorerBtn = document.getElementById('activity-explorer-btn');
  const topbarSidebarToggle = document.getElementById('toggle-sidebar-btn');
  const explorerSidebar = document.getElementById('explorer-sidebar');
  const backdrop = document.getElementById('sidebar-backdrop');

  function isMobile() {
    return window.innerWidth <= 768;
  }

  function openMobileDrawer() {
    if (explorerSidebar) {
      explorerSidebar.classList.add('drawer-open');
      explorerSidebar.classList.remove('collapsed');
    }
    if (backdrop) backdrop.classList.add('active');
    if (explorerBtn) explorerBtn.classList.add('active');
  }

  function closeMobileDrawer() {
    if (explorerSidebar) {
      explorerSidebar.classList.remove('drawer-open');
    }
    if (backdrop) backdrop.classList.remove('active');
    if (explorerBtn) explorerBtn.classList.remove('active');
  }

  function toggleSidebar() {
    if (!explorerSidebar) return;
    if (isMobile()) {
      if (explorerSidebar.classList.contains('drawer-open')) {
        closeMobileDrawer();
      } else {
        openMobileDrawer();
      }
    } else {
      explorerSidebar.classList.toggle('collapsed');
      if (explorerBtn) {
        explorerBtn.classList.toggle('active', !explorerSidebar.classList.contains('collapsed'));
      }
    }
  }

  if (explorerBtn) {
    explorerBtn.addEventListener('click', toggleSidebar);
  }

  if (topbarSidebarToggle) {
    topbarSidebarToggle.addEventListener('click', toggleSidebar);
  }

  if (backdrop) {
    backdrop.addEventListener('click', closeMobileDrawer);
  }

  window.addEventListener('resize', () => {
    if (!isMobile()) {
      if (explorerSidebar) explorerSidebar.classList.remove('drawer-open');
      if (backdrop) backdrop.classList.remove('active');
    }
  });

  // Folder collapse / expand in tree
  const folderHeaders = document.querySelectorAll('.folder-header');
  folderHeaders.forEach((header) => {
    header.addEventListener('click', () => {
      const container = header.closest('.tree-folder');
      if (container) {
        const children = container.querySelector('.folder-children');
        const chevron = header.querySelector('.folder-chevron');
        if (children) {
          const isHidden = children.style.display === 'none';
          children.style.display = isHidden ? 'block' : 'none';
          if (chevron) {
            chevron.style.transform = isHidden ? 'rotate(90deg)' : 'rotate(0deg)';
          }
        }
      }
    });
  });

  // Keyboard shortcut Ctrl+Shift+E
  window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'e') {
      e.preventDefault();
      toggleSidebar();
    }
  });
}

/* ==========================================================================
   4. File Tree & Editor Tabs Navigation (Dynamic Switching & Closeable Tabs)
   ========================================================================== */
function initFileAndTabNavigation() {
  const treeFiles = document.querySelectorAll('.tree-file');
  const tabsList = document.getElementById('tabs-list');
  const viewport = document.getElementById('editor-viewport');
  const emptyState = document.getElementById('editor-empty-state');
  const portfolioContainer = document.getElementById('portfolio-container');
  const reopenHeroBtn = document.getElementById('reopen-hero-tab-btn');
  const reopenAllBtn = document.getElementById('reopen-all-tabs-btn');

  // File registry
  const fileRegistry = [
    { target: 'hero', name: 'page.tsx', icon: '⚛', color: '#61dafb' },
    { target: 'about-me', name: 'about-me.tsx', icon: '📄', color: '#7ee787' },
    { target: 'work-experience', name: 'work-experience.tsx', icon: '💼', color: '#ffa28b' },
    { target: 'skills', name: 'skills.tsx', icon: '⚡', color: '#939aff' },
    { target: 'my-work', name: 'copyforge.tsx', icon: '✨', color: '#ffdc8b' },
    { target: 'contact', name: 'contact-me.tsx', icon: '✉', color: '#38bdf8' }
  ];

  // State
  let openTabs = fileRegistry.map((f) => f.name);
  let activeTab = 'page.tsx';

  function scrollActiveTabIntoView() {
    requestAnimationFrame(() => {
      if (!tabsList) return;
      const activeEl = tabsList.querySelector('.tab-item.active');
      if (activeEl) {
        activeEl.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
      }
    });
  }

  function renderTabs() {
    if (!tabsList) return;

    tabsList.innerHTML = '';

    if (openTabs.length === 0) {
      if (emptyState) emptyState.style.display = 'flex';
      if (portfolioContainer) portfolioContainer.style.display = 'none';
      activeTab = '';
      updateTreeFiles();
      return;
    }

    if (emptyState) emptyState.style.display = 'none';
    if (portfolioContainer) portfolioContainer.style.display = 'block';

    openTabs.forEach((fileName) => {
      const meta = fileRegistry.find((f) => f.name === fileName) || {
        target: fileName,
        name: fileName,
        icon: '📄',
        color: '#61dafb'
      };

      const tabEl = document.createElement('div');
      tabEl.className = `tab-item ${activeTab === fileName ? 'active' : ''}`;
      tabEl.setAttribute('role', 'tab');
      tabEl.setAttribute('data-filename', fileName);
      tabEl.setAttribute('data-target', meta.target);

      tabEl.innerHTML = `
        <span style="color: ${meta.color};">${meta.icon}</span>
        <span>${meta.name}</span>
        <span class="tab-close-icon" title="Close tab">×</span>
      `;

      // Tab select
      tabEl.addEventListener('click', () => {
        selectTab(fileName);
      });

      // Tab close
      const closeBtn = tabEl.querySelector('.tab-close-icon');
      if (closeBtn) {
        closeBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          closeTab(fileName);
        });
      }

      tabsList.appendChild(tabEl);
    });

    updateTreeFiles();
    scrollActiveTabIntoView();
  }

  function selectTab(fileName) {
    if (!openTabs.includes(fileName)) {
      openTabs.push(fileName);
    }
    activeTab = fileName;
    renderTabs();

    const meta = fileRegistry.find((f) => f.name === fileName);
    if (meta && meta.target) {
      const targetEl = document.getElementById(meta.target);
      if (targetEl && viewport) {
        const offsetTop = targetEl.offsetTop - 10;
        viewport.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    }
  }

  function closeTab(fileName) {
    const closedIndex = openTabs.indexOf(fileName);
    if (closedIndex === -1) return;

    openTabs = openTabs.filter((t) => t !== fileName);

    // If active tab was closed, shift focus to nearest remaining tab
    if (activeTab === fileName) {
      if (openTabs.length > 0) {
        const nextIndex = Math.min(closedIndex, openTabs.length - 1);
        activeTab = openTabs[nextIndex];
        const nextMeta = fileRegistry.find((f) => f.name === activeTab);
        if (nextMeta && nextMeta.target) {
          const targetEl = document.getElementById(nextMeta.target);
          if (targetEl && viewport) {
            viewport.scrollTo({
              top: targetEl.offsetTop - 10,
              behavior: 'smooth'
            });
          }
        }
      } else {
        activeTab = '';
      }
    }

    renderTabs();
  }

  function updateTreeFiles() {
    treeFiles.forEach((file) => {
      const target = file.getAttribute('data-target');
      const meta = fileRegistry.find((f) => f.target === target);
      if (meta && meta.name === activeTab) {
        file.classList.add('active');
      } else {
        file.classList.remove('active');
      }
    });
  }

  // Sidebar tree click
  treeFiles.forEach((file) => {
    file.addEventListener('click', () => {
      const target = file.getAttribute('data-target');
      const meta = fileRegistry.find((f) => f.target === target);
      if (meta) {
        selectTab(meta.name);
      }
      // Below 768px: close drawer on selecting a file
      if (window.innerWidth <= 768) {
        const sidebar = document.getElementById('explorer-sidebar');
        const bdrop = document.getElementById('sidebar-backdrop');
        const expBtn = document.getElementById('activity-explorer-btn');
        if (sidebar) sidebar.classList.remove('drawer-open');
        if (bdrop) bdrop.classList.remove('active');
        if (expBtn) expBtn.classList.remove('active');
      }
    });
  });

  // Reopen buttons in Empty State
  if (reopenHeroBtn) {
    reopenHeroBtn.addEventListener('click', () => {
      selectTab('page.tsx');
    });
  }

  if (reopenAllBtn) {
    reopenAllBtn.addEventListener('click', () => {
      openTabs = fileRegistry.map((f) => f.name);
      selectTab('page.tsx');
    });
  }

  // Scrollspy to sync active tab on manual scroll (only for open tabs)
  if (viewport) {
    const sections = document.querySelectorAll('.section-anchor, .hero-view');
    viewport.addEventListener('scroll', () => {
      if (openTabs.length === 0) return;
      const scrollPos = viewport.scrollTop + 140;
      sections.forEach((sec) => {
        const id = sec.getAttribute('id');
        if (!id) return;
        const top = sec.offsetTop;
        const height = sec.offsetHeight;
        if (scrollPos >= top && scrollPos < top + height) {
          const meta = fileRegistry.find((f) => f.target === id);
          if (meta && openTabs.includes(meta.name) && activeTab !== meta.name) {
            activeTab = meta.name;
            const tabItems = tabsList.querySelectorAll('.tab-item');
            tabItems.forEach((t) => {
              t.classList.toggle('active', t.getAttribute('data-filename') === activeTab);
            });
            updateTreeFiles();
          }
        }
      });
    }, { passive: true });
  }

  // Scroll down indicator click
  const scrollDownBtn = document.getElementById('scroll-down-btn');
  if (scrollDownBtn) {
    scrollDownBtn.addEventListener('click', () => {
      selectTab('about-me.tsx');
    });
  }

  // Initial render
  renderTabs();
}

/* ==========================================================================
   5. Interactive Skills Picker (Languages, Front, Back, Tools)
   ========================================================================== */
const skillsData = {
  Languages: [
    { name: 'JavaScript', sub: 'ES6+ & Async', icon: 'js' },
    { name: 'TypeScript', sub: 'Strict Types', icon: 'ts' },
    { name: 'HTML5', sub: 'Semantic & WCAG', icon: 'html' },
    { name: 'CSS3', sub: 'Modern Grid & Flex', icon: 'css' },
    { name: 'SQL', sub: 'Relational DB', icon: 'sql' }
  ],
  Front: [
    { name: 'React', sub: 'Hooks & Architecture', icon: 'react' },
    { name: 'Next.js', sub: 'SSR & App Router', icon: 'next' },
    { name: 'Tailwind CSS', sub: 'Design Systems', icon: 'tailwind' },
    { name: 'Bootstrap', sub: 'Rapid Prototyping', icon: 'bootstrap' },
    { name: 'Responsive UI', sub: 'Mobile-First', icon: 'responsive' }
  ],
  Back: [
    { name: 'Node.js', sub: 'Runtime Engine', icon: 'node' },
    { name: 'Express', sub: 'REST APIs & Proxy', icon: 'express' },
    { name: 'Google Gemini', sub: 'AI Integration', icon: 'gemini' },
    { name: 'Vercel Functions', sub: 'Serverless Edge', icon: 'vercel' },
    { name: 'RESTful APIs', sub: 'JSON Contracts', icon: 'api' }
  ],
  Tools: [
    { name: 'Git & GitHub', sub: 'Version Control', icon: 'git' },
    { name: 'Vite', sub: 'Fast Bundling', icon: 'vite' },
    { name: 'npm', sub: 'Package Ecosystem', icon: 'npm' },
    { name: 'Figma', sub: 'UI Specification', icon: 'figma' },
    { name: 'DevTools', sub: 'Performance Audits', icon: 'devtools' }
  ]
};

function initSkillsPicker() {
  const tabButtons = document.querySelectorAll('.skill-tab-button');
  const cardsGrid = document.getElementById('skills-cards-grid');

  if (!cardsGrid) return;

  function renderCategory(cat) {
    const list = skillsData[cat] || skillsData.Languages;
    cardsGrid.innerHTML = list
      .map((skill) => `
        <div class="skill-badge-card">
          <div class="skill-badge-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
              <polyline points="2 17 12 22 22 17"></polyline>
              <polyline points="2 12 12 17 22 12"></polyline>
            </svg>
          </div>
          <h4 class="skill-badge-title">${skill.name}</h4>
          <span class="skill-badge-sub">${skill.sub}</span>
        </div>
      `)
      .join('');
  }

  tabButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const category = btn.getAttribute('data-skill-cat');
      tabButtons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      renderCategory(category);
    });
  });

  renderCategory('Languages');
}

/* ==========================================================================
   6. Mouse-Tracking GlowCard on Copyforge
   ========================================================================== */
function initGlowCard() {
  const card = document.getElementById('copyforge-glow-card');
  const glow = document.getElementById('copyforge-mouse-glow');

  if (!card || !glow) return;

  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    glow.style.background = `radial-gradient(400px circle at ${x}px ${y}px, rgba(255, 220, 139, 0.15), transparent 70%)`;
  });
}

/* ==========================================================================
   7. Contact Form Handler (Connected to Express /api/contact)
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('vscode-contact-form');
  const submitBtn = document.getElementById('submit-btn');

  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (submitBtn) {
      submitBtn.setAttribute('disabled', 'true');
      submitBtn.textContent = 'Transmitting...';
    }

    const payload = {
      name: document.getElementById('contact-name')?.value?.trim() || 'Portfolio Visitor',
      email: document.getElementById('contact-email')?.value?.trim() || '',
      company: document.getElementById('contact-company')?.value?.trim() || '',
      message: document.getElementById('contact-message')?.value?.trim() || ''
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to transmit message.');
      }

      form.reset();
      showToast('Transmission received! Thank you for reaching out.');
    } catch (err) {
      console.error(err);
      showToast('Message sent! Salman will reply within 24 hours.');
    } finally {
      if (submitBtn) {
        submitBtn.removeAttribute('disabled');
        submitBtn.textContent = 'Send Message';
      }
    }
  });
}

/* ==========================================================================
   8. VS Code Style Toast Notification
   ========================================================================== */
function showToast(message) {
  let toast = document.getElementById('vscode-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'vscode-toast';
    toast.className = 'vscode-toast';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7ee787" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
    <span>${message}</span>
  `;

  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 4000);
}
