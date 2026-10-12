/**
 * The Living Archive — Main Application Bootstrap
 * Connects routes, initializes views, and manages global lifecycle.
 */

import { router } from './router.js';
import { getFeaturedEntries, getAllEntries } from '../data/entries.js';
import { THEMES } from '../data/themes.js';
import { renderEntryCard, escapeHTML } from './utils.js';

import { Constellation } from './constellation.js';

/**
 * Renders the Archive Homepage View
 * @param {HTMLElement} outlet
 */
export function renderHomeView(outlet) {
  document.title = 'The Living Archive — Some feelings refuse to stay unwritten';

  const featuredEntries = getFeaturedEntries();
  const allEntries = getAllEntries();

  outlet.innerHTML = `
    <!-- Hero / Masthead Quote Section -->
    <section class="hero-section" aria-labelledby="hero-title">
      <div class="container hero-container">
        <div class="hero-content">
          <div class="hero-badge">
            <span class="star-mark" aria-hidden="true">✦</span>
            <span>A Digital Literary Anthology</span>
          </div>

          <h1 id="hero-title" class="hero-title">
            Some feelings refuse to stay unwritten.
          </h1>

          <p class="hero-lead">
            Most publishing platforms organize words around follower counts or dates. 
            Here, writing is held together by invisible currents: the longing of a coastal poem, 
            the grief inside an emptied house, the quiet freedom found above a greenhouse. 
            Wander through shared themes instead of reaching the end of a feed.
          </p>

          <div class="hero-actions">
            <a href="#constellation-section" class="btn btn-primary" id="btn-hero-constellation">
              Explore Constellation ✦
            </a>
            <a href="#/archive" class="btn btn-secondary">
              Browse Entire Archive (${allEntries.length})
            </a>
          </div>
        </div>

        <!-- Quick Theme Bar -->
        <div class="hero-theme-ribbon" aria-label="Quick explore themes">
          <span class="ribbon-label">Emotional Currents:</span>
          <div class="ribbon-chips">
            ${THEMES.map(theme => `
              <a href="#/archive?theme=${encodeURIComponent(theme.name)}" class="chip" title="${escapeHTML(theme.description)}">
                <span>${theme.glyph}</span>
                <span>${escapeHTML(theme.name)}</span>
              </a>
            `).join('')}
          </div>
        </div>
      </div>
    </section>

    <!-- Constellation Section -->
    <section id="constellation-section" class="constellation-section" aria-labelledby="constellation-title">
      <div class="container">
        <div class="section-header">
          <div>
            <span class="category-badge">Interactive Map</span>
            <h2 id="constellation-title" class="section-title">The Theme Constellation</h2>
          </div>
          <p class="section-description">
            Each star represents an emotional anchor; each fine line connects themes that recur together within a piece of writing. Select any node to illuminate its connections.
          </p>
        </div>

        <!-- Interactive SVG Constellation Mount -->
        <div id="constellation-container" class="constellation-wrapper" aria-label="Interactive Theme Constellation graph">
          <!-- Rendered via js/constellation.js -->
        </div>
      </div>
    </section>

    <!-- Featured Writing Section -->
    <section class="featured-section" aria-labelledby="featured-title">
      <div class="container">
        <div class="section-header">
          <div>
            <span class="category-badge">Curated Works</span>
            <h2 id="featured-title" class="section-title">Featured from the Stacks</h2>
          </div>
          <a href="#/archive" class="btn btn-ghost" style="align-self: flex-end;">
            View all ${allEntries.length} pieces &rarr;
          </a>
        </div>

        <div class="featured-grid" role="list" aria-label="Featured literary pieces">
          ${featuredEntries.map(entry => renderEntryCard(entry)).join('')}
        </div>
      </div>
    </section>

    <!-- Literary Philosophy Colophon -->
    <section class="manifesto-section">
      <div class="container">
        <div class="manifesto-card">
          <span class="category-badge">Archival Note</span>
          <blockquote class="manifesto-quote">
            "To place two strangers' writings beside one another because they both know the smell of coastal rain is not cataloging. It is keeping company with memory."
          </blockquote>
          <div class="manifesto-footer">
            <span class="manifesto-cite">— From the Archive Curator's Journal</span>
            <a href="#/submit" class="btn btn-secondary" style="font-size: var(--text-xs); padding: 0.35rem 0.75rem;">
              Contribute your own words ✦
            </a>
          </div>
        </div>
      </div>
    </section>
  `;

  // Mount the interactive SVG Constellation
  const constellationContainer = outlet.querySelector('#constellation-container');
  if (constellationContainer) {
    new Constellation(constellationContainer);
  }

  // Smooth scroll for hero constellation anchor
  const heroConstellationBtn = outlet.querySelector('#btn-hero-constellation');
  if (heroConstellationBtn) {
    heroConstellationBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.getElementById('constellation-section');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }
}

import { renderArchiveView } from './archive.js';
import { renderReaderView } from './reader.js';
import { renderSubmitView } from './submit.js';

// Router Setup
router.addRoute('/', renderHomeView);
router.addRoute('/archive', renderArchiveView);
router.addRoute('/read/:id', renderReaderView);
router.addRoute('/submit', renderSubmitView);

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  const appOutlet = document.getElementById('app');
  if (appOutlet) {
    router.init(appOutlet);
  }
});
