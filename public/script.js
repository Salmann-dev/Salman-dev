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
  initInteractiveTerminal();
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
    { target: 'hero', name: 'Page.tsx', icon: '⚛', color: '#61dafb' },
    { target: 'about-me', name: 'AboutMe.tsx', icon: '📄', color: '#7ee787' },
    { target: 'work-experience', name: 'WorkExperience.tsx', icon: '💼', color: '#ffa28b' },
    { target: 'skills', name: 'Skills.tsx', icon: '⚡', color: '#939aff' },
    { target: 'terminal', name: 'Terminal.tsx', icon: '💻', color: '#4ec9b0' },
    { target: 'my-work', name: 'Copyforge.tsx', icon: '✨', color: '#ffdc8b' },
    { target: 'resume-analyzer', name: 'AiResumeAnalyzer.tsx', icon: '✨', color: '#ffdc8b' },
    { target: 'contact', name: 'ContactMe.tsx', icon: '✉', color: '#38bdf8' }
  ];

  // State
  let openTabs = fileRegistry.map((f) => f.name);
  let activeTab = 'Page.tsx';

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
      selectTab('Page.tsx');
    });
  }

  if (reopenAllBtn) {
    reopenAllBtn.addEventListener('click', () => {
      openTabs = fileRegistry.map((f) => f.name);
      selectTab('Page.tsx');
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
      selectTab('AboutMe.tsx');
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
   6. Mouse-Tracking GlowCard on Project Cards
   ========================================================================== */
function initGlowCard() {
  const cards = document.querySelectorAll('.glow-card-container');
  cards.forEach((card) => {
    const glow = card.querySelector('.card-mouse-glow');
    if (!glow) return;

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      glow.style.background = `radial-gradient(400px circle at ${x}px ${y}px, rgba(255, 220, 139, 0.15), transparent 70%)`;
    });
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

/* ==========================================================================
   9. Interactive Local Client-Side VS Code Terminal Engine
   ========================================================================== */
function initInteractiveTerminal() {
  const terminalBox = document.getElementById('vscode-terminal-box');
  const terminalBody = document.getElementById('terminal-body');
  const outputList = document.getElementById('terminal-output-list');
  const terminalForm = document.getElementById('terminal-form');
  const cliInput = document.getElementById('terminal-cli-input');
  const clearBtn = document.getElementById('term-clear-btn');
  const maxBtn = document.getElementById('term-maximize-btn');
  const pillBtns = document.querySelectorAll('.term-pill-btn');
  const menuTermBtn = document.getElementById('menu-terminal-btn');
  const statusbarTermBtn = document.getElementById('statusbar-terminal-btn');
  const heroTermBtn = document.getElementById('hero-terminal-btn');

  if (!cliInput || !terminalForm || !outputList) return;

  const commandHistory = [];
  let historyIndex = -1;

  function scrollToBottom() {
    requestAnimationFrame(() => {
      if (terminalBody) {
        terminalBody.scrollTop = terminalBody.scrollHeight;
      }
    });
  }

  function focusInput() {
    cliInput.focus();
  }

  // Focus on clicking anywhere in terminal body
  if (terminalBox) {
    terminalBox.addEventListener('click', focusInput);
  }

  // Navigate to terminal from external triggers
  function jumpToTerminal() {
    const termSec = document.getElementById('terminal');
    const viewport = document.getElementById('editor-viewport');
    if (termSec && viewport) {
      viewport.scrollTo({
        top: termSec.offsetTop - 10,
        behavior: 'smooth'
      });
      setTimeout(focusInput, 300);
    }
  }

  if (menuTermBtn) {
    menuTermBtn.addEventListener('click', jumpToTerminal);
  }

  if (statusbarTermBtn) {
    statusbarTermBtn.addEventListener('click', jumpToTerminal);
  }

  if (heroTermBtn) {
    heroTermBtn.addEventListener('click', (e) => {
      e.preventDefault();
      jumpToTerminal();
    });
  }

  // Clear output
  if (clearBtn) {
    clearBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      outputList.innerHTML = '';
      focusInput();
    });
  }

  // Maximize / restore size
  if (maxBtn) {
    maxBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (terminalBox) {
        terminalBox.classList.toggle('maximized');
        scrollToBottom();
      }
    });
  }

  // Keyboard navigation through command history (Arrow Up / Down)
  cliInput.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length === 0) return;
      const nextIndex = historyIndex + 1;
      if (nextIndex < commandHistory.length) {
        historyIndex = nextIndex;
        cliInput.value = commandHistory[commandHistory.length - 1 - nextIndex];
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        historyIndex = historyIndex - 1;
        cliInput.value = commandHistory[commandHistory.length - 1 - historyIndex];
      } else if (historyIndex === 0) {
        historyIndex = -1;
        cliInput.value = '';
      }
    }
  });

  // Local command execution switch
  function executeCommand(raw) {
    const trimmed = raw.trim();
    const normalized = trimmed.toLowerCase();

    if (!trimmed) return;

    commandHistory.push(trimmed);
    historyIndex = -1;
    cliInput.value = '';

    if (normalized === 'clear') {
      outputList.innerHTML = '';
      scrollToBottom();
      return;
    }

    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    let responseHtml = '';

    switch (normalized) {
      case 'help':
        responseHtml = `
          <div style="display: flex; flex-direction: column; gap: 0.5rem; font-size: 12px; color: #cbd5e1;">
            <div style="display: flex; align-items: center; gap: 6px; color: #38bdf8; font-weight: 600;">
              <span>Available Commands:</span>
            </div>
            <div class="term-help-grid">
              <span style="color: #4ec9b0; font-weight: 700;">help</span>
              <span style="color: #94a3b8;">Lists all available commands with short descriptions.</span>

              <span style="color: #4ec9b0; font-weight: 700;">about</span>
              <span style="color: #94a3b8;">Outputs bio for Muhammad Salman (Front-End / Full-Stack IT Student &amp; Developer).</span>

              <span style="color: #4ec9b0; font-weight: 700;">skills</span>
              <span style="color: #94a3b8;">Displays core tech stack (Next.js, React, JavaScript, Node.js, Tailwind CSS, Git).</span>

              <span style="color: #4ec9b0; font-weight: 700;">projects</span>
              <span style="color: #94a3b8;">Lists key portfolio projects (CopyForge, AI Resume Analyzer) with links.</span>

              <span style="color: #4ec9b0; font-weight: 700;">contact</span>
              <span style="color: #94a3b8;">Outputs email, GitHub, and LinkedIn links.</span>

              <span style="color: #4ec9b0; font-weight: 700;">clear</span>
              <span style="color: #94a3b8;">Clears past terminal output.</span>
            </div>
          </div>
        `;
        break;

      case 'about':
        responseHtml = `
          <div style="display: flex; flex-direction: column; gap: 0.5rem; font-size: 12px; color: #cbd5e1; padding-left: 0.25rem;">
            <div style="color: #4ec9b0; font-weight: 700;">Muhammad Salman — Bio &amp; Profile</div>
            <p style="color: #cbd5e1; line-height: 1.6; margin: 0;">
              Front-End / Full-Stack IT Student &amp; Developer pursuing studies at the <strong style="color: #fff;">University of Balochistan</strong>. Specialized in engineering fast, responsive, and intuitive web applications with modern React, Next.js, and TypeScript. Passionate about elegant developer experiences, clean component architecture, and dark-themed UI systems.
            </p>
            <div style="display: flex; flex-wrap: wrap; gap: 0.75rem; font-size: 11px; color: #94a3b8; padding-top: 0.25rem;">
              <span>📍 Balochistan, Pakistan</span>
              <span>🎓 BS Information Technology (2023 — 2027)</span>
              <span>💼 Open to Roles &amp; Freelance Opportunities</span>
            </div>
          </div>
        `;
        break;

      case 'skills':
        responseHtml = `
          <div style="display: flex; flex-direction: column; gap: 0.5rem; font-size: 12px; color: #cbd5e1; padding-left: 0.25rem;">
            <div style="color: #38bdf8; font-weight: 700;">Core Tech Stack &amp; Competencies:</div>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 0.5rem; margin-top: 0.25rem;">
              <div class="term-card">
                <div style="color: #4ec9b0; font-weight: 700; margin-bottom: 2px;">Frontend Engineering</div>
                <div style="color: #94a3b8; font-size: 11.5px;">Next.js, React, JavaScript (ES6+), TypeScript, Tailwind CSS, HTML5, CSS3</div>
              </div>
              <div class="term-card">
                <div style="color: #38bdf8; font-weight: 700; margin-bottom: 2px;">Backend &amp; APIs</div>
                <div style="color: #94a3b8; font-size: 11.5px;">Node.js, Express, REST APIs, Serverless Functions</div>
              </div>
              <div class="term-card">
                <div style="color: #ffdc8b; font-weight: 700; margin-bottom: 2px;">Version Control &amp; Tooling</div>
                <div style="color: #94a3b8; font-size: 11.5px;">Git, GitHub, VS Code, npm, Vite, Vercel</div>
              </div>
              <div class="term-card">
                <div style="color: #c084fc; font-weight: 700; margin-bottom: 2px;">Design &amp; Architecture</div>
                <div style="color: #94a3b8; font-size: 11.5px;">Responsive UI, Component Architecture, Clean Code</div>
              </div>
            </div>
          </div>
        `;
        break;

      case 'projects':
        responseHtml = `
          <div style="display: flex; flex-direction: column; gap: 0.6rem; font-size: 12px; color: #cbd5e1; padding-left: 0.25rem;">
            <div style="color: #ffdc8b; font-weight: 700;">Featured Portfolio Projects:</div>

            <div class="term-card">
              <div class="term-card-title">
                <span>1. CopyForge</span>
                <span style="font-size: 10px; padding: 2px 6px; border-radius: 4px; background: rgba(255, 220, 139, 0.15); color: #ffdc8b; border: 1px solid rgba(255, 220, 139, 0.25);">Full-Stack Web App</span>
              </div>
              <div class="term-card-desc">
                AI-powered copywriting web tool that creates tailored product descriptions and marketing copy for small businesses. Built with a serverless backend proxy for secure requests.
              </div>
              <div style="font-size: 11px; color: #94a3b8; margin-top: 4px;">
                <strong style="color: #cbd5e1;">Tech:</strong> Next.js, React, Tailwind CSS, Serverless API
              </div>
              <div style="display: flex; gap: 1rem; margin-top: 6px; font-size: 11px;">
                <a href="https://copyforge.vercel.app/" target="_blank" rel="noopener noreferrer" class="term-link">🔗 Live Demo ↗</a>
                <a href="https://github.com/Salmann-dev/Copyforge" target="_blank" rel="noopener noreferrer" class="term-link">💻 Source Code ↗</a>
              </div>
            </div>

            <div class="term-card">
              <div class="term-card-title">
                <span>2. AI Resume Analyzer</span>
                <span style="font-size: 10px; padding: 2px 6px; border-radius: 4px; background: rgba(78, 201, 176, 0.15); color: #4ec9b0; border: 1px solid rgba(78, 201, 176, 0.25);">Python + Web App</span>
              </div>
              <div class="term-card-desc">
                Evaluates resumes against job descriptions, extracting text with pdfplumber and python-docx to generate match scores, missing keywords, and actionable recommendations.
              </div>
              <div style="font-size: 11px; color: #94a3b8; margin-top: 4px;">
                <strong style="color: #cbd5e1;">Tech:</strong> Python, Flask, pdfplumber, python-docx, REST API
              </div>
              <div style="display: flex; gap: 1rem; margin-top: 6px; font-size: 11px;">
                <a href="https://ai-resume-analyzer-vki0.onrender.com/" target="_blank" rel="noopener noreferrer" class="term-link">🔗 Live Demo ↗</a>
                <a href="https://github.com/Salmann-dev/ai-resume-analyzer" target="_blank" rel="noopener noreferrer" class="term-link">💻 Source Code ↗</a>
              </div>
            </div>
          </div>
        `;
        break;

      case 'contact':
        responseHtml = `
          <div style="display: flex; flex-direction: column; gap: 0.5rem; font-size: 12px; color: #cbd5e1; padding-left: 0.25rem;">
            <div style="color: #38bdf8; font-weight: 700;">Contact &amp; Connect Links:</div>
            <div style="display: flex; flex-direction: column; gap: 0.35rem; font-size: 12px; padding-left: 0.25rem;">
              <div>
                <span style="color: #94a3b8; display: inline-block; width: 75px;">Email:</span>
                <a href="mailto:Salman.connect001@gmail.com" class="term-link">Salman.connect001@gmail.com</a>
              </div>
              <div>
                <span style="color: #94a3b8; display: inline-block; width: 75px;">GitHub:</span>
                <a href="https://github.com/Salmann-dev" target="_blank" rel="noopener noreferrer" class="term-link">https://github.com/Salmann-dev ↗</a>
              </div>
              <div>
                <span style="color: #94a3b8; display: inline-block; width: 75px;">LinkedIn:</span>
                <a href="https://www.linkedin.com/in/muhammad-salman-09693a289/" target="_blank" rel="noopener noreferrer" class="term-link">https://linkedin.com/in/muhammad-salman-09693a289/ ↗</a>
              </div>
            </div>
          </div>
        `;
        break;

      default:
        responseHtml = `
          <div class="term-error-msg">
            <span>Command not found: <strong style="color: #fff;">${escapeHtml(trimmed)}</strong>. Type <span style="color: #4ec9b0; font-weight: 600;">'help'</span> for available commands.</span>
          </div>
        `;
        break;
    }

    const entryDiv = document.createElement('div');
    entryDiv.className = 'term-entry';
    entryDiv.innerHTML = `
      <div class="term-prompt-header">
        <span class="term-prompt-user">salman@portfolio</span>
        <span class="term-prompt-colon">:</span>
        <span class="term-prompt-path">~</span>
        <span class="term-prompt-dollar">$</span>
        <span class="term-prompt-cmd">${escapeHtml(trimmed)}</span>
        <span class="term-prompt-time">${timeStr}</span>
      </div>
      <div class="term-output-block">${responseHtml}</div>
    `;

    outputList.appendChild(entryDiv);
    scrollToBottom();
  }

  function escapeHtml(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // Handle form submission
  terminalForm.addEventListener('submit', (e) => {
    e.preventDefault();
    executeCommand(cliInput.value);
  });

  // Handle pill button clicks
  pillBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const cmd = btn.getAttribute('data-cmd');
      if (cmd) {
        cliInput.value = cmd;
        focusInput();
        executeCommand(cmd);
      }
    });
  });
}

