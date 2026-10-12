/**
 * The Living Archive — Utilities
 * Helper functions for DOM rendering, text formatting, and string manipulation.
 */

/**
 * Escapes HTML characters to prevent XSS.
 * @param {string} str
 * @returns {string}
 */
export function escapeHTML(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * Capitalizes the first letter of a word.
 * @param {string} string
 * @returns {string}
 */
export function capitalize(string) {
  if (!string) return '';
  return string.charAt(0).toUpperCase() + string.slice(1);
}

/**
 * Calculates approximate reading time from raw text.
 * @param {string} text
 * @returns {string} e.g. "3 min read"
 */
export function calculateReadingTime(text) {
  if (!text) return '1 min read';
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(words / 180));
  return `${minutes} min read`;
}

/**
 * Converts a title to a URL-friendly slug.
 * @param {string} text
 * @returns {string}
 */
export function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');
}

/**
 * Formats a body string for display:
 * - If it's a poem, preserves stanzas and line breaks with proper poetic styling.
 * - Otherwise, splits double line breaks into paragraphs.
 * @param {string} body
 * @param {string} category
 * @returns {string} HTML string
 */
export function formatLiteraryBody(body, category = 'essay') {
  if (!body) return '';

  if (category.toLowerCase() === 'poem') {
    // Split by stanzas (double newline)
    const stanzas = body.split(/\n\s*\n/);
    return stanzas
      .map(stanza => {
        const lines = stanza.split('\n').map(line => escapeHTML(line)).join('<br>');
        return `<p class="poem-stanza">${lines}</p>`;
      })
      .join('\n');
  }

  // For essays, letters, and stories: split into paragraphs
  const paragraphs = body.split(/\n\s*\n/);
  return paragraphs
    .map(p => `<p class="prose-paragraph">${escapeHTML(p).replace(/\n/g, '<br>')}</p>`)
    .join('\n');
}

/**
 * Renders an entry card component markup.
 * @param {Object} entry
 * @returns {string} HTML string
 */
export function renderEntryCard(entry) {
  const themeChips = entry.themes
    .map(theme => `
      <a href="#/archive?theme=${encodeURIComponent(theme)}" class="chip" aria-label="Filter by theme ${escapeHTML(theme)}">
        ${escapeHTML(theme)}
      </a>
    `)
    .join('');

  const authorDisplay = entry.isAnonymous
    ? '<span class="author-anon">Anonymous</span>'
    : escapeHTML(entry.author);

  return `
    <article class="archive-card" data-id="${escapeHTML(entry.id)}" data-category="${escapeHTML(entry.category)}">
      <div>
        <div class="archive-card-meta">
          <span class="category-badge">${escapeHTML(entry.category)}</span>
          <span class="reading-time">${escapeHTML(entry.readingTime)}</span>
        </div>
        
        <h3 class="archive-card-title">
          <a href="#/read/${encodeURIComponent(entry.id)}" aria-label="Read ${escapeHTML(entry.title)}">
            ${escapeHTML(entry.title)}
          </a>
        </h3>
        
        <div class="archive-card-author">by ${authorDisplay}</div>
        
        <p class="archive-card-excerpt">${escapeHTML(entry.excerpt)}</p>
      </div>

      <div class="archive-card-footer">
        <div class="archive-card-themes" role="list" aria-label="Themes for this piece">
          ${themeChips}
        </div>
        <a href="#/read/${encodeURIComponent(entry.id)}" class="btn btn-ghost" style="padding: 0.25rem 0.5rem; font-size: var(--text-xs);" aria-label="Read full piece ${escapeHTML(entry.title)}">
          Read piece ✦
        </a>
      </div>
    </article>
  `;
}
