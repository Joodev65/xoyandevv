/* ═══════════════════════════════════════════
   JjooooNime — Premium Anime Streaming
   JavaScript Architecture
   ═══════════════════════════════════════════ */

const API_BASE = '/api/endpoint';

// ─── Storage Keys ─────────────────────────
const STORAGE = {
  WATCH_HISTORY: 'jj_watch_history',
  BOOKMARKS: 'jj_bookmarks',
  SEARCH_HISTORY: 'jj_search_history',
  THEME: 'jj_theme',
  SETTINGS: 'jj_settings',
  CONTINUE_WATCHING: 'jj_continue_watching',
  RECENTLY_VIEWED: 'jj_recently_viewed'
};

// ─── SVG Icons ────────────────────────────
const ICONS = {
  play: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>`,
  search: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>`,
  bookmark: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"></path></svg>`,
  bookmarkFilled: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"></path></svg>`,
  history: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>`,
  settings: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path><circle cx="12" cy="12" r="3"></circle></svg>`,
  star: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`,
  starFilled: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`,
  chevronRight: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>`,
  chevronLeft: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>`,
  clock: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>`,
  calendar: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>`,
  tv: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="15" rx="2" ry="2"></rect><polyline points="17 2 12 7 7 2"></polyline></svg>`,
  film: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"></rect><line x1="7" y1="2" x2="7" y2="22"></line><line x1="17" y1="2" x2="17" y2="22"></line><line x1="2" y1="12" x2="22" y2="12"></line><line x1="2" y1="7" x2="7" y2="7"></line><line x1="2" y1="17" x2="7" y2="17"></line><line x1="17" y1="17" x2="22" y2="17"></line><line x1="17" y1="7" x2="22" y2="7"></line></svg>`,
  trending: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>`,
  fire: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.293-2.224.809-3.168"></path></svg>`,
  eye: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path><circle cx="12" cy="12" r="3"></circle></svg>`,
  download: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>`,
  share: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>`,
  trash: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>`,
  check: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`,
  x: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`,
  menu: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`,
  home: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>`,
  grid: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>`,
  shuffle: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 3 21 3 21 8"></polyline><line x1="4" y1="20" x2="21" y2="3"></line><polyline points="21 16 21 21 16 21"></polyline><line x1="15" y1="15" x2="21" y2="21"></line><line x1="4" y1="4" x2="9" y2="9"></line></svg>`,
  info: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>`,
  alertCircle: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`,
  loader: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="animate-spin"><line x1="12" y1="2" x2="12" y2="6"></line><line x1="12" y1="18" x2="12" y2="22"></line><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line><line x1="2" y1="12" x2="6" y2="12"></line><line x1="18" y1="12" x2="22" y2="12"></line><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line></svg>`
};

// ─── API Module ───────────────────────────
const API = {
  async fetch(action, params = {}) {
    const query = new URLSearchParams({ action, ...params }).toString();
    const response = await fetch(`${API_BASE}?${query}`);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return response.json();
  },

  home() { return this.fetch('home'); },
  anime(id) { return this.fetch('anime', { id }); },
  watch(id) { return this.fetch('watch', { id }); },
  search(q) { return this.fetch('search', { q }); },
  schedule() { return this.fetch('schedule'); },
  genres() { return this.fetch('genres'); },
  genre(id, page = 1) { return this.fetch('genre', { id, page }); },
  completed(page = 1) { return this.fetch('completed', { page }); },
  ongoing(page = 1) { return this.fetch('ongoing', { page }); },
  movies() { return this.fetch('movies'); },
  batch(id) { return this.fetch('batch', { id }); },
  server(id) { return this.fetch('server', { id }); },
  latest() { return this.fetch('latest'); },
  random() { return this.fetch('random'); }
};

// ─── Storage Module ───────────────────────
const Store = {
  get(key, defaultValue = []) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : defaultValue;
    } catch {
      return defaultValue;
    }
  },

  set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  },

  remove(key) {
    localStorage.removeItem(key);
  },

  // Watch History
  getHistory() { return this.get(STORAGE.WATCH_HISTORY); },

  addHistory(item) {
    const history = this.getHistory();
    const existing = history.findIndex(h => h.animeId === item.animeId && h.episodeId === item.episodeId);
    if (existing !== -1) history.splice(existing, 1);
    history.unshift(item);
    if (history.length > 50) history.pop();
    this.set(STORAGE.WATCH_HISTORY, history);
  },

  removeHistory(animeId, episodeId) {
    const history = this.getHistory().filter(h => !(h.animeId === animeId && h.episodeId === episodeId));
    this.set(STORAGE.WATCH_HISTORY, history);
  },

  clearHistory() {
    this.remove(STORAGE.WATCH_HISTORY);
  },

  // Bookmarks
  getBookmarks() { return this.get(STORAGE.BOOKMARKS); },

  addBookmark(item) {
    const bookmarks = this.getBookmarks();
    if (!bookmarks.find(b => b.animeId === item.animeId)) {
      bookmarks.unshift({ ...item, addedAt: Date.now() });
      this.set(STORAGE.BOOKMARKS, bookmarks);
      return true;
    }
    return false;
  },

  removeBookmark(animeId) {
    const bookmarks = this.getBookmarks().filter(b => b.animeId !== animeId);
    this.set(STORAGE.BOOKMARKS, bookmarks);
  },

  isBookmarked(animeId) {
    return this.getBookmarks().some(b => b.animeId === animeId);
  },

  // Search History
  getSearchHistory() { return this.get(STORAGE.SEARCH_HISTORY); },

  addSearch(query) {
    const history = this.getSearchHistory();
    const filtered = history.filter(h => h !== query);
    filtered.unshift(query);
    if (filtered.length > 10) filtered.pop();
    this.set(STORAGE.SEARCH_HISTORY, filtered);
  },

  clearSearchHistory() {
    this.remove(STORAGE.SEARCH_HISTORY);
  },

  // Continue Watching
  getContinueWatching() { return this.get(STORAGE.CONTINUE_WATCHING); },

  setContinueWatching(item) {
    const watching = this.getContinueWatching();
    const existing = watching.findIndex(w => w.animeId === item.animeId);
    if (existing !== -1) watching.splice(existing, 1);
    watching.unshift(item);
    if (watching.length > 20) watching.pop();
    this.set(STORAGE.CONTINUE_WATCHING, watching);
  },

  removeContinueWatching(animeId) {
    const watching = this.getContinueWatching().filter(w => w.animeId !== animeId);
    this.set(STORAGE.CONTINUE_WATCHING, watching);
  }
};

// ─── UI Components ────────────────────────
const UI = {
  // Create skeleton loading cards
  createSkeleton(count = 6) {
    return Array(count).fill(0).map(() => `
      <div class="anime-card">
        <div class="card-poster skeleton skeleton-poster"></div>
        <div class="card-info">
          <div class="skeleton skeleton-text"></div>
          <div class="skeleton skeleton-text short"></div>
        </div>
      </div>
    `).join('');
  },

  // Create anime card
  createAnimeCard(anime, type = 'default') {
    const statusBadge = anime.status === 'Ongoing' 
      ? `<span class="card-badge ongoing">Ongoing</span>`
      : anime.status === 'Completed'
      ? `<span class="card-badge completed">Completed</span>`
      : '';

    const episodes = anime.episodes 
      ? `<span class="card-episodes">EP ${anime.episodes}</span>` 
      : '';

    const score = anime.score && !isNaN(parseFloat(anime.score))
      ? `<span class="card-score">${ICONS.starFilled} ${anime.score}</span>`
      : '';

    const href = anime.animeId ? `/anime.html?id=${anime.animeId}` : '#';

    return `
      <a href="${href}" class="anime-card" data-anime-id="${anime.animeId || ''}">
        <div class="card-poster">
          <img src="${anime.poster || ''}" alt="${anime.title}" loading="lazy">
          ${statusBadge}
          ${episodes}
          <div class="card-overlay">
            <div class="card-play">${ICONS.play}</div>
          </div>
        </div>
        <div class="card-info">
          <div class="card-title">${anime.title}</div>
          <div class="card-meta">
            <span>${anime.releaseDay || anime.lastReleaseDate || anime.season || ''}</span>
            ${score}
          </div>
        </div>
      </a>
    `;
  },

  // Create section with cards
  createSection(title, icon, cards, link = null) {
    const linkHtml = link 
      ? `<a href="${link}" class="section-link">See All ${ICONS.chevronRight}</a>` 
      : '';

    return `
      <section class="section">
        <div class="container">
          <div class="section-header">
            <h2 class="section-title">${icon} ${title}</h2>
            ${linkHtml}
          </div>
          <div class="card-grid card-grid-lg">
            ${cards}
          </div>
        </div>
      </section>
    `;
  },

  // Create horizontal scroll section
  createScrollSection(title, icon, cards) {
    return `
      <section class="section">
        <div class="container">
          <div class="section-header">
            <h2 class="section-title">${icon} ${title}</h2>
          </div>
          <div class="scroll-container">
            ${cards}
          </div>
        </div>
      </section>
    `;
  },

  // Create empty state
  createEmptyState(icon, title, description, action = null) {
    const actionHtml = action 
      ? `<a href="${action.href}" class="btn btn-primary">${action.text}</a>` 
      : '';

    return `
      <div class="empty-state">
        <div class="empty-state-icon">${icon}</div>
        <h3 class="empty-state-title">${title}</h3>
        <p class="empty-state-desc">${description}</p>
        ${actionHtml}
      </div>
    `;
  },

  // Create pagination
  createPagination(current, total, baseUrl) {
    if (total <= 1) return '';

    let pages = [];
    const start = Math.max(1, current - 2);
    const end = Math.min(total, current + 2);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    const pageButtons = pages.map(p => `
      <a href="${baseUrl}?page=${p}" class="page-btn ${p === current ? 'active' : ''}">${p}</a>
    `).join('');

    return `
      <div class="pagination">
        <a href="${current > 1 ? `${baseUrl}?page=${current - 1}` : '#'}`" 
           class="page-btn" ${current <= 1 ? 'disabled' : ''}>
          ${ICONS.chevronLeft}
        </a>
        ${pageButtons}
        <a href="${current < total ? `${baseUrl}?page=${current + 1}` : '#'}`} 
           class="page-btn" ${current >= total ? 'disabled' : ''}>
          ${ICONS.chevronRight}
        </a>
      </div>
    `;
  },

  // Toast notification
  toast(message, type = 'info', duration = 3000) {
    const container = document.querySelector('.toast-container') || (() => {
      const c = document.createElement('div');
      c.className = 'toast-container';
      document.body.appendChild(c);
      return c;
    })();

    const icons = {
      success: ICONS.check,
      error: ICONS.alertCircle,
      info: ICONS.info
    };

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `${icons[type]} <span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.animation = 'toastOut 0.3s ease forwards';
      setTimeout(() => toast.remove(), 300);
    }, duration);
  },

  // Top loader
  showLoader() {
    let loader = document.querySelector('.top-loader');
    if (!loader) {
      loader = document.createElement('div');
      loader.className = 'top-loader';
      document.body.appendChild(loader);
    }
    loader.classList.add('active');
  },

  hideLoader() {
    const loader = document.querySelector('.top-loader');
    if (loader) loader.classList.remove('active');
  }
};

// ─── Navbar Component ─────────────────────
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  // Scroll behavior
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const current = window.pageYOffset;
    if (current > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    lastScroll = current;
  }, { passive: true });

  // Mobile menu
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileMenuClose = document.querySelector('.mobile-menu-close');
  const mobileMenuBackdrop = document.querySelector('.mobile-menu-backdrop');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => mobileMenu.classList.add('active'));
    mobileMenuClose?.addEventListener('click', () => mobileMenu.classList.remove('active'));
    mobileMenuBackdrop?.addEventListener('click', () => mobileMenu.classList.remove('active'));
  }

  // Search overlay
  const searchBtn = document.querySelector('.search-btn');
  const searchOverlay = document.querySelector('.search-overlay');
  const searchClose = document.querySelector('.search-close');
  const searchInput = document.querySelector('.search-input');

  if (searchBtn && searchOverlay) {
    searchBtn.addEventListener('click', () => {
      searchOverlay.classList.add('active');
      searchInput?.focus();
    });
    searchClose?.addEventListener('click', () => searchOverlay.classList.remove('active'));

    // Close on escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') searchOverlay.classList.remove('active');
    });
  }

  // Search functionality
  if (searchInput) {
    let debounceTimer;
    searchInput.addEventListener('input', (e) => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => performSearch(e.target.value), 400);
    });

    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const query = e.target.value.trim();
        if (query) {
          Store.addSearch(query);
          window.location.href = `/search.html?q=${encodeURIComponent(query)}`;
        }
      }
    });
  }

  // Update bookmark badge
  updateBookmarkBadge();
}

// ─── Search Functionality ─────────────────
async function performSearch(query) {
  const resultsContainer = document.querySelector('.search-results');
  if (!resultsContainer) return;

  if (!query.trim()) {
    renderSearchHistory();
    return;
  }

  resultsContainer.innerHTML = `<div class="text-center mt-4">${ICONS.loader}</div>`;

  try {
    const data = await API.search(query);
    const results = data.data?.animeList || [];

    if (results.length === 0) {
      resultsContainer.innerHTML = UI.createEmptyState(
        ICONS.search,
        'No results found',
        `We couldn't find any anime matching "${query}"`,
        null
      );
      return;
    }

    resultsContainer.innerHTML = results.map(anime => `
      <a href="/anime.html?id=${anime.animeId}" class="search-result-item" onclick="Store.addSearch('${query.replace(/'/g, "\'")}')">
        <img src="${anime.poster}" alt="${anime.title}" loading="lazy">
        <div class="search-result-info">
          <div class="search-result-title">${anime.title}</div>
          <div class="search-result-meta">${anime.status || ''} ${anime.score ? '• ' + anime.score : ''}</div>
        </div>
      </a>
    `).join('');
  } catch (err) {
    resultsContainer.innerHTML = UI.createEmptyState(
      ICONS.alertCircle,
      'Search Error',
      'Failed to perform search. Please try again.'
    );
  }
}

function renderSearchHistory() {
  const container = document.querySelector('.search-results');
  if (!container) return;

  const history = Store.getSearchHistory();

  if (history.length === 0) {
    container.innerHTML = `
      <div class="text-center mt-4" style="color: var(--text-muted)">
        ${ICONS.search} Start typing to search anime
      </div>
    `;
    return;
  }

  container.innerHTML = `
    <div class="search-history">
      <div class="search-history-title">Recent Searches</div>
      ${history.map(q => `
        <div class="search-history-item" onclick="window.location.href='/search.html?q=${encodeURIComponent(q)}'">
          ${ICONS.clock} <span>${q}</span>
        </div>
      `).join('')}
    </div>
  `;
}

// ─── Bookmark Badge ───────────────────────
function updateBookmarkBadge() {
  const badge = document.querySelector('.bookmark-btn .badge');
  if (badge) {
    const count = Store.getBookmarks().length;
    badge.style.display = count > 0 ? 'block' : 'none';
  }
}

// ─── Ripple Effect ────────────────────────
function initRipple() {
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.btn');
    if (!btn) return;

    const rect = btn.getBoundingClientRect();
    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    const size = Math.max(rect.width, rect.height);
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
    ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
    btn.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });
}

// ─── Intersection Observer for Lazy Animations ─
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '50px' });

  document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));
}

// ─── Image Lazy Loading with Fade ─────────
function initLazyImages() {
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src || img.src;
        img.onload = () => img.classList.add('loaded');
        imageObserver.unobserve(img);
      }
    });
  }, { rootMargin: '100px' });

  document.querySelectorAll('img[loading="lazy"]').forEach(img => imageObserver.observe(img));
}

// ─── Initialize on DOM Ready ────────────────
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initRipple();
  initScrollAnimations();
  initLazyImages();

  // Page-specific initialization
  const page = document.body.dataset.page;
  if (page && typeof window[`init${page.charAt(0).toUpperCase() + page.slice(1)}Page`] === 'function') {
    window[`init${page.charAt(0).toUpperCase() + page.slice(1)}Page`]();
  }
});

// ─── Export for global use ────────────────
window.API = API;
window.Store = Store;
window.UI = UI;
window.ICONS = ICONS;
window.STORAGE = STORAGE;
