/**
 * The Living Archive — Archive & Search View
 * Real-time text search, dual-facet combinable filters (category + theme),
 * dynamic URL query synchronization, and evocative literary empty states.
 */

import { getAllEntries } from '../data/entries.js';
import { THEMES } from '../data/themes.js';
import { renderEntryCard, escapeHTML, capitalize } from './utils.js';

export class ArchiveView {
  /**
   * @param {HTMLElement} outlet
   * @param {Object} context { query: { theme?: string, category?: string, q?: string } }
   */
  constructor(outlet, context = {}) {
    this.outlet = outlet;
    this.entries = getAllEntries();
    
    // Active filter state initialized from URL query parameters
    this.searchQuery = (context.query?.q || '').trim();
    this.selectedCategory = (context.query?.category || 'all').toLowerCase();
    this.selectedTheme = context.query?.theme || 'all';

    this.categories = ['all', 'poem', 'essay', 'letter', 'story'];

    this.render();
    this.bindEvents();
    this.updateResults();
  }

  /**
   * Renders static layout and filter controls into outlet.
   */
  render() {
    document.title = 'Archive — The Living Archive';

    this.outlet.innerHTML = `
      <div class="container" style="padding-bottom: var(--space-20);">
        <!-- Archive Header -->
        <header class="archive-view-header">
          <span class="category-badge">Catalog & Index</span>
          <h1 style="margin-top: var(--space-2); margin-bottom: var(--space-3);">
            The Stacks
          </h1>
          <p style="font-family: var(--font-serif); font-size: var(--text-xl); color: var(--color-parchment); opacity: 0.85; max-width: 680px;">
            Search through poems, letters, essays, and stories. Filter by form or trace the emotional currents connecting each piece.
          </p>
        </header>

        <!-- Search & Dual-Facet Filter Controls -->
        <section class="archive-search-container" aria-label="Archive search and filters">
          <!-- Text Search Bar -->
          <div class="search-input-wrapper">
            <span class="search-icon" aria-hidden="true">✦</span>
            <input 
              type="search" 
              id="archive-search-input" 
              class="archive-search-input" 
              placeholder="Search by title, phrase, author, or excerpt..." 
              value="${escapeHTML(this.searchQuery)}"
              aria-label="Search archive content"
              autocomplete="off"
            />
            <button 
              type="button" 
              id="search-clear-btn" 
              class="search-clear-btn" 
              style="display: ${this.searchQuery ? 'block' : 'none'};" 
              aria-label="Clear search text"
            >
              ✕
            </button>
          </div>

          <!-- Filter Section -->
          <div class="filter-section">
            <!-- Form / Category Filter -->
            <div class="filter-row" role="group" aria-labelledby="category-filter-label">
              <span id="category-filter-label" class="filter-label">Form:</span>
              <div class="filter-pills-list">
                ${this.categories.map(cat => {
                  const isActive = this.selectedCategory === cat;
                  const label = cat === 'all' ? 'All Forms' : capitalize(cat) + 's';
                  return `
                    <button 
                      type="button" 
                      class="filter-pill ${isActive ? 'active' : ''}" 
                      data-filter-type="category" 
                      data-value="${cat}"
                      aria-pressed="${isActive}"
                    >
                      ${label}
                    </button>
                  `;
                }).join('')}
              </div>
            </div>

            <!-- Emotion / Theme Filter -->
            <div class="filter-row" role="group" aria-labelledby="theme-filter-label">
              <span id="theme-filter-label" class="filter-label">Theme:</span>
              <div class="filter-pills-list">
                <button 
                  type="button" 
                  class="filter-pill ${this.selectedTheme.toLowerCase() === 'all' ? 'active' : ''}" 
                  data-filter-type="theme" 
                  data-value="all"
                  aria-pressed="${this.selectedTheme.toLowerCase() === 'all'}"
                >
                  All Themes
                </button>
                ${THEMES.map(theme => {
                  const isActive = this.selectedTheme.toLowerCase() === theme.name.toLowerCase();
                  return `
                    <button 
                      type="button" 
                      class="filter-pill ${isActive ? 'active' : ''}" 
                      data-filter-type="theme" 
                      data-value="${escapeHTML(theme.name)}"
                      aria-pressed="${isActive}"
                    >
                      <span>${theme.glyph}</span>
                      <span>${escapeHTML(theme.name)}</span>
                    </button>
                  `;
                }).join('')}
              </div>
            </div>
          </div>
        </section>

        <!-- Stats Bar & Active Filters -->
        <div class="archive-stats-bar">
          <div id="archive-count-display" aria-live="polite">
            <!-- Dynamically populated -->
          </div>

          <button 
            type="button" 
            id="clear-all-filters-btn" 
            class="btn btn-ghost" 
            style="font-size: var(--text-xs); padding: 0.25rem 0.5rem; display: none;"
          >
            Clear all filters ✕
          </button>
        </div>

        <!-- Entry Grid / Empty State Outlet -->
        <div id="archive-results-outlet" class="archive-results-container" aria-live="polite">
          <!-- Dynamically populated -->
        </div>
      </div>
    `;
  }

  /**
   * Binds user events for search input, filter pills, and clear actions.
   */
  bindEvents() {
    const searchInput = this.outlet.querySelector('#archive-search-input');
    const searchClearBtn = this.outlet.querySelector('#search-clear-btn');
    const clearAllBtn = this.outlet.querySelector('#clear-all-filters-btn');

    // Debounced search input handler
    let debounceTimer;
    searchInput.addEventListener('input', (e) => {
      clearTimeout(debounceTimer);
      const val = e.target.value.trim();
      searchClearBtn.style.display = val ? 'block' : 'none';
      
      debounceTimer = setTimeout(() => {
        this.searchQuery = val;
        this.updateURL();
        this.updateResults();
      }, 180);
    });

    // Clear search text
    searchClearBtn.addEventListener('click', () => {
      searchInput.value = '';
      this.searchQuery = '';
      searchClearBtn.style.display = 'none';
      this.updateURL();
      this.updateResults();
      searchInput.focus();
    });

    // Filter pill selections
    const filterPills = this.outlet.querySelectorAll('.filter-pill');
    filterPills.forEach(pill => {
      pill.addEventListener('click', () => {
        const type = pill.dataset.filterType;
        const val = pill.dataset.value;

        if (type === 'category') {
          this.selectedCategory = val;
          this.updatePillGroup('category', val);
        } else if (type === 'theme') {
          this.selectedTheme = val;
          this.updatePillGroup('theme', val);
        }

        this.updateURL();
        this.updateResults();
      });
    });

    // Clear all filters button
    clearAllBtn.addEventListener('click', () => {
      this.resetAllFilters();
    });
  }

  /**
   * Updates visual active state of a pill group.
   * @param {string} type
   * @param {string} value
   */
  updatePillGroup(type, value) {
    const pills = this.outlet.querySelectorAll(`.filter-pill[data-filter-type="${type}"]`);
    pills.forEach(pill => {
      const match = pill.dataset.value.toLowerCase() === value.toLowerCase();
      pill.classList.toggle('active', match);
      pill.setAttribute('aria-pressed', match);
    });
  }

  /**
   * Resets all search queries and filters to defaults.
   */
  resetAllFilters() {
    this.searchQuery = '';
    this.selectedCategory = 'all';
    this.selectedTheme = 'all';

    const searchInput = this.outlet.querySelector('#archive-search-input');
    const searchClearBtn = this.outlet.querySelector('#search-clear-btn');
    if (searchInput) searchInput.value = '';
    if (searchClearBtn) searchClearBtn.style.display = 'none';

    this.updatePillGroup('category', 'all');
    this.updatePillGroup('theme', 'all');

    this.updateURL();
    this.updateResults();
  }

  /**
   * Synchronizes browser URL hash with active query state.
   */
  updateURL() {
    const params = new URLSearchParams();
    if (this.selectedTheme && this.selectedTheme.toLowerCase() !== 'all') {
      params.set('theme', this.selectedTheme);
    }
    if (this.selectedCategory && this.selectedCategory !== 'all') {
      params.set('category', this.selectedCategory);
    }
    if (this.searchQuery) {
      params.set('q', this.searchQuery);
    }

    const paramStr = params.toString();
    const newHash = paramStr ? `#/archive?${paramStr}` : '#/archive';
    
    // Update hash without triggering redundant full reload
    if (window.location.hash !== newHash) {
      history.replaceState(null, '', newHash);
    }
  }

  /**
   * Filters entries according to active search and facets, then renders results.
   */
  updateResults() {
    const query = this.searchQuery.toLowerCase();
    const activeCategory = this.selectedCategory.toLowerCase();
    const activeTheme = this.selectedTheme.toLowerCase();

    const filtered = this.entries.filter(entry => {
      // Category filter
      if (activeCategory !== 'all' && entry.category.toLowerCase() !== activeCategory) {
        return false;
      }

      // Theme filter
      if (activeTheme !== 'all' && !entry.themes.some(t => t.toLowerCase() === activeTheme)) {
        return false;
      }

      // Search query filter
      if (query) {
        const titleMatch = entry.title.toLowerCase().includes(query);
        const authorMatch = entry.author.toLowerCase().includes(query);
        const excerptMatch = entry.excerpt.toLowerCase().includes(query);
        const bodyMatch = entry.body.toLowerCase().includes(query);
        const themeMatch = entry.themes.some(t => t.toLowerCase().includes(query));

        if (!titleMatch && !authorMatch && !excerptMatch && !bodyMatch && !themeMatch) {
          return false;
        }
      }

      return true;
    });

    // Update count display
    const countDisplay = this.outlet.querySelector('#archive-count-display');
    const clearAllBtn = this.outlet.querySelector('#clear-all-filters-btn');
    const hasActiveFilters = query || activeCategory !== 'all' || activeTheme !== 'all';

    if (countDisplay) {
      countDisplay.innerHTML = `
        Showing <span class="archive-count-badge">${filtered.length}</span> of 
        <span>${this.entries.length}</span> pieces
      `;
    }

    if (clearAllBtn) {
      clearAllBtn.style.display = hasActiveFilters ? 'inline-flex' : 'none';
    }

    // Render results grid or atmospheric empty state
    const resultsOutlet = this.outlet.querySelector('#archive-results-outlet');
    if (!resultsOutlet) return;

    if (filtered.length > 0) {
      resultsOutlet.innerHTML = `
        <div class="archive-grid" role="list" aria-label="Archive entries">
          ${filtered.map(entry => renderEntryCard(entry)).join('')}
        </div>
      `;
    } else {
      resultsOutlet.innerHTML = `
        <div class="empty-state">
          <p class="empty-state-quote">
            "Nothing here yet. Some feelings are still unwritten."
          </p>
          <p class="empty-state-sub">
            No pieces match your current criteria. Broaden your search or reset filters to continue exploring the stacks.
          </p>
          <button type="button" class="btn btn-secondary" id="empty-state-reset-btn" style="margin-top: var(--space-4);">
            Reset all filters ✦
          </button>
        </div>
      `;

      const emptyResetBtn = resultsOutlet.querySelector('#empty-state-reset-btn');
      if (emptyResetBtn) {
        emptyResetBtn.addEventListener('click', () => {
          this.resetAllFilters();
        });
      }
    }
  }
}

/**
 * Archive route handler invoked by router.
 * @param {HTMLElement} outlet
 * @param {Object} context
 */
export function renderArchiveView(outlet, context) {
  new ArchiveView(outlet, context);
}
