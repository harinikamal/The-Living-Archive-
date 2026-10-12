/**
 * The Living Archive — The Reading Room
 * Renders the full text of an entry on an illuminated parchment surface,
 * preserves poetry stanzas and prose line lengths, and suggests related entries.
 */

import { getAllEntries, getEntryById, getRelatedEntries } from '../data/entries.js';
import { renderEntryCard, formatLiteraryBody, escapeHTML } from './utils.js';

/**
 * Renders the reading room view for a specific entry.
 * @param {HTMLElement} outlet
 * @param {Object} context { params: { id: string } }
 */
export function renderReaderView(outlet, context) {
  const entryId = context.params?.id;
  const entry = getEntryById(entryId);
  const allEntries = getAllEntries();

  // Handle entry not found
  if (!entry) {
    document.title = 'Piece Not Found — The Living Archive';
    outlet.innerHTML = `
      <div class="container container-narrow" style="padding-top: var(--space-16); padding-bottom: var(--space-20); text-align: center;">
        <span class="category-badge">Not Found</span>
        <h1 style="margin-top: var(--space-3); margin-bottom: var(--space-4);">
          Lost in the Stacks
        </h1>
        <p style="font-family: var(--font-serif); font-size: var(--text-xl); color: var(--color-muted); max-width: 500px; margin: 0 auto var(--space-8);">
          The piece you are searching for does not exist in our catalog or may have been unwritten.
        </p>
        <a href="#/archive" class="btn btn-primary">
          Return to Archive ✦
        </a>
      </div>
    `;
    return;
  }

  // Set document title
  document.title = `${entry.title} — The Living Archive`;

  // Compute previous and next sequential entries
  const currentIndex = allEntries.findIndex(e => e.id === entry.id);
  const prevEntry = currentIndex > 0 ? allEntries[currentIndex - 1] : null;
  const nextEntry = currentIndex < allEntries.length - 1 ? allEntries[currentIndex + 1] : null;

  // Compute related entries based on shared themes
  const relatedEntries = getRelatedEntries(entry, 3);

  // Author representation
  const authorMarkup = entry.isAnonymous
    ? '<span class="reader-anon-badge">Anonymous</span>'
    : `<span>by ${escapeHTML(entry.author)}</span>`;

  // Format theme chips linking to filtered archive
  const themePills = entry.themes
    .map(theme => `
      <a href="#/archive?theme=${encodeURIComponent(theme)}" class="reader-theme-pill" aria-label="Explore more pieces tagged with ${escapeHTML(theme)}">
        ✦ ${escapeHTML(theme)}
      </a>
    `)
    .join('');

  outlet.innerHTML = `
    <article class="reader-view-container container container-narrow" aria-labelledby="reading-title">
      <!-- Breadcrumb Bar -->
      <nav class="reader-breadcrumb" aria-label="Reader breadcrumbs">
        <a href="#/archive" class="breadcrumb-link">
          <span>&larr;</span>
          <span>Return to Archive</span>
        </a>
        <div style="display: flex; gap: var(--space-2); align-items: center;">
          <span class="category-badge">${escapeHTML(entry.category)}</span>
          <span style="color: var(--color-moss);">&bull;</span>
          <span class="reading-time">${escapeHTML(entry.readingTime)}</span>
        </div>
      </nav>

      <!-- Illuminated Parchment Paper Reading Surface -->
      <div class="reader-parchment-paper">
        <header class="reader-header">
          <h1 id="reading-title" class="reader-title">
            ${escapeHTML(entry.title)}
          </h1>
          <div class="reader-byline">
            ${authorMarkup}
          </div>
        </header>

        <!-- Literary Body Content -->
        <div class="reader-body" data-category="${escapeHTML(entry.category)}">
          ${formatLiteraryBody(entry.body, entry.category)}
        </div>

        <!-- Themes Explored in This Piece -->
        <footer class="reader-themes-footer">
          <span class="reader-themes-label">Themes explored:</span>
          <div style="display: flex; flex-wrap: wrap; gap: var(--space-2);">
            ${themePills}
          </div>
        </footer>
      </div>

      <!-- Previous & Next Sequential Navigation -->
      <nav class="reader-pagination" aria-label="Sequential archive reading navigation">
        ${prevEntry ? `
          <a href="#/read/${encodeURIComponent(prevEntry.id)}" class="pagination-card prev" aria-label="Read previous piece: ${escapeHTML(prevEntry.title)}">
            <span class="pagination-label">&larr; Previous Piece</span>
            <span class="pagination-title">${escapeHTML(prevEntry.title)}</span>
          </a>
        ` : `<div></div>`}

        ${nextEntry ? `
          <a href="#/read/${encodeURIComponent(nextEntry.id)}" class="pagination-card next" aria-label="Read next piece: ${escapeHTML(nextEntry.title)}">
            <span class="pagination-label">Next Piece &rarr;</span>
            <span class="pagination-title">${escapeHTML(nextEntry.title)}</span>
          </a>
        ` : `<div></div>`}
      </nav>

      <!-- Continue Exploring (Shared Theme Recommendations) -->
      ${relatedEntries.length > 0 ? `
        <section class="reader-related-section" aria-labelledby="related-title">
          <div style="margin-bottom: var(--space-6);">
            <span class="category-badge">Resonances</span>
            <h2 id="related-title" style="font-size: var(--text-2xl); color: var(--color-parchment-light); margin-top: var(--space-1);">
              Continue Exploring
            </h2>
            <p style="font-size: var(--text-sm); color: var(--color-muted);">
              Other writings bound by overlapping themes and memories.
            </p>
          </div>

          <div class="related-grid" role="list" aria-label="Related literary pieces">
            ${relatedEntries.map(rel => renderEntryCard(rel)).join('')}
          </div>
        </section>
      ` : ''}
    </article>
  `;
}
