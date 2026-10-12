/**
 * The Living Archive — Submit View
 * Dark-academia submission form with accessible inline validation,
 * dynamic theme selection, in-memory archive sync, and clean API hook for future backend.
 */

import { THEMES } from '../data/themes.js';
import { addEntry } from '../data/entries.js';
import { calculateReadingTime, slugify, escapeHTML } from './utils.js';

export class SubmitView {
  /**
   * @param {HTMLElement} outlet
   */
  constructor(outlet) {
    this.outlet = outlet;
    this.render();
    this.bindEvents();
  }

  /**
   * Renders the submission form interface.
   */
  render() {
    document.title = 'Submit a Piece — The Living Archive';

    this.outlet.innerHTML = `
      <div class="container container-narrow submit-view-container">
        <!-- Header -->
        <header class="submit-header">
          <span class="category-badge">Archival Contribution</span>
          <h1 style="margin-top: var(--space-2); margin-bottom: var(--space-3);">
            Entrust a Piece
          </h1>
          <p style="font-family: var(--font-serif); font-size: var(--text-xl); color: var(--color-parchment); opacity: 0.85;">
            Whether a poem kept in a coat pocket, an unsent letter, or an essay on leaving home—every piece helps map the architecture of what remains unsaid.
          </p>
        </header>

        <!-- Main Form Container -->
        <div id="submit-card-wrapper" class="submit-card">
          <form id="archive-submit-form" class="submit-form" novalidate aria-label="Archive submission form">
            
            <!-- Title Field -->
            <div class="form-group">
              <label for="entry-title" class="form-label">
                <span>Title of the Piece</span>
                <span class="required-mark" aria-hidden="true">*</span>
              </label>
              <input 
                type="text" 
                id="entry-title" 
                name="title" 
                class="form-input" 
                placeholder="e.g. Salt and Juniper" 
                required 
                aria-describedby="title-error"
              />
              <div id="title-error" class="form-error" aria-live="polite"></div>
            </div>

            <!-- Form / Category & Author Row -->
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: var(--space-6);">
              <!-- Category Field -->
              <div class="form-group">
                <label for="entry-category" class="form-label">
                  <span>Literary Form</span>
                  <span class="required-mark" aria-hidden="true">*</span>
                </label>
                <select id="entry-category" name="category" class="form-select" required aria-describedby="category-error">
                  <option value="" disabled selected>Select a form...</option>
                  <option value="poem">Poem (stanzas & line breaks preserved)</option>
                  <option value="essay">Essay (prose & reflection)</option>
                  <option value="letter">Letter (addressed or unsent)</option>
                  <option value="story">Short Story (narrative & fragment)</option>
                </select>
                <div id="category-error" class="form-error" aria-live="polite"></div>
              </div>

              <!-- Author Name Field -->
              <div class="form-group">
                <label for="entry-author" class="form-label">
                  <span>Author Name or Pseudonym</span>
                  <span id="author-required-mark" class="required-mark" aria-hidden="true">*</span>
                </label>
                <input 
                  type="text" 
                  id="entry-author" 
                  name="author" 
                  class="form-input" 
                  placeholder="e.g. Elena Vance" 
                  required 
                  aria-describedby="author-error"
                />
                <div id="author-error" class="form-error" aria-live="polite"></div>
                
                <!-- Anonymous Toggle -->
                <label class="anonymous-toggle">
                  <input type="checkbox" id="entry-anonymous" name="isAnonymous" />
                  <span>Publish anonymously under the archivist's seal</span>
                </label>
              </div>
            </div>

            <!-- Emotional Currents / Themes (Multi-Select) -->
            <div class="form-group" role="group" aria-labelledby="themes-picker-label">
              <label id="themes-picker-label" class="form-label">
                <span>Thematic Currents (Select 1 to 4)</span>
                <span class="required-mark" aria-hidden="true">*</span>
              </label>
              <p class="form-hint">
                Choose the emotions or motifs that tether your piece to other writings in the archive.
              </p>
              
              <div class="theme-select-grid">
                ${THEMES.map(theme => `
                  <label class="theme-checkbox-pill">
                    <input 
                      type="checkbox" 
                      name="themes" 
                      value="${escapeHTML(theme.name)}" 
                      aria-describedby="themes-error"
                    />
                    <span class="pill-content">
                      <span aria-hidden="true">${theme.glyph}</span>
                      <span>${escapeHTML(theme.name)}</span>
                    </span>
                  </label>
                `).join('')}
              </div>
              <div id="themes-error" class="form-error" aria-live="polite"></div>
            </div>

            <!-- Body Text Area -->
            <div class="form-group">
              <label for="entry-body" class="form-label">
                <span>The Manuscript</span>
                <span class="required-mark" aria-hidden="true">*</span>
              </label>
              <p class="form-hint">
                For poetry, stanza breaks and lines will be preserved exactly as typed.
              </p>
              <textarea 
                id="entry-body" 
                name="body" 
                class="form-textarea" 
                placeholder="Write or paste your words here..." 
                required 
                aria-describedby="body-error"
              ></textarea>
              <div id="body-error" class="form-error" aria-live="polite"></div>
            </div>

            <!-- Optional Note to Curator -->
            <div class="form-group">
              <label for="entry-note" class="form-label">
                <span>Curator's Note (Optional)</span>
              </label>
              <input 
                type="text" 
                id="entry-note" 
                name="note" 
                class="form-input" 
                placeholder="Context, dedication, or year written (not displayed publicly)" 
              />
            </div>

            <!-- Submit Button -->
            <div style="display: flex; justify-content: flex-end; padding-top: var(--space-4); border-top: 1px solid rgba(130, 145, 106, 0.15);">
              <button type="submit" id="submit-piece-btn" class="btn btn-primary" style="padding: var(--space-3) var(--space-8); font-size: var(--text-base);">
                Entrust to Archive ✦
              </button>
            </div>
          </form>
        </div>
      </div>
    `;
  }

  /**
   * Binds interaction listeners: anonymous toggle and form validation submit.
   */
  bindEvents() {
    const form = this.outlet.querySelector('#archive-submit-form');
    const anonCheckbox = this.outlet.querySelector('#entry-anonymous');
    const authorInput = this.outlet.querySelector('#entry-author');
    const authorMark = this.outlet.querySelector('#author-required-mark');
    const authorError = this.outlet.querySelector('#author-error');

    // Toggle anonymous state
    anonCheckbox.addEventListener('change', (e) => {
      if (e.target.checked) {
        authorInput.value = '';
        authorInput.disabled = true;
        authorInput.placeholder = 'Anonymous contributor';
        authorInput.removeAttribute('aria-invalid');
        authorMark.style.display = 'none';
        authorError.textContent = '';
      } else {
        authorInput.disabled = false;
        authorInput.placeholder = 'e.g. Elena Vance';
        authorMark.style.display = 'inline';
      }
    });

    // Form submit handler
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      await this.handleSubmit(form);
    });
  }

  /**
   * Validates form inputs and dispatches entry storage.
   * @param {HTMLFormElement} form
   */
  async handleSubmit(form) {
    const titleInput = form.querySelector('#entry-title');
    const categorySelect = form.querySelector('#entry-category');
    const authorInput = form.querySelector('#entry-author');
    const anonCheckbox = form.querySelector('#entry-anonymous');
    const bodyInput = form.querySelector('#entry-body');
    const themeCheckboxes = form.querySelectorAll('input[name="themes"]:checked');

    let isValid = true;
    let firstErrorField = null;

    // Helper to set error
    const setError = (input, errorId, message) => {
      input.setAttribute('aria-invalid', 'true');
      const errEl = this.outlet.querySelector(`#${errorId}`);
      if (errEl) errEl.textContent = message;
      if (!firstErrorField) firstErrorField = input;
      isValid = false;
    };

    // Helper to clear error
    const clearError = (input, errorId) => {
      input.removeAttribute('aria-invalid');
      const errEl = this.outlet.querySelector(`#${errorId}`);
      if (errEl) errEl.textContent = '';
    };

    // 1. Validate Title
    const titleVal = titleInput.value.trim();
    if (!titleVal) {
      setError(titleInput, 'title-error', 'Please provide a title for your piece.');
    } else if (titleVal.length < 2) {
      setError(titleInput, 'title-error', 'Title must be at least 2 characters.');
    } else {
      clearError(titleInput, 'title-error');
    }

    // 2. Validate Category
    const categoryVal = categorySelect.value;
    if (!categoryVal) {
      setError(categorySelect, 'category-error', 'Please choose a literary form.');
    } else {
      clearError(categorySelect, 'category-error');
    }

    // 3. Validate Author
    const isAnonymous = anonCheckbox.checked;
    const authorVal = isAnonymous ? 'Anonymous' : authorInput.value.trim();
    if (!isAnonymous) {
      if (!authorVal) {
        setError(authorInput, 'author-error', 'Author name is required unless submitting anonymously.');
      } else if (authorVal.length < 2) {
        setError(authorInput, 'author-error', 'Author name must be at least 2 characters.');
      } else {
        clearError(authorInput, 'author-error');
      }
    } else {
      clearError(authorInput, 'author-error');
    }

    // 4. Validate Themes
    const selectedThemes = Array.from(themeCheckboxes).map(cb => cb.value);
    const themesError = this.outlet.querySelector('#themes-error');
    if (selectedThemes.length === 0) {
      themesError.textContent = 'Please choose at least 1 theme.';
      if (!firstErrorField) firstErrorField = form.querySelector('input[name="themes"]');
      isValid = false;
    } else {
      themesError.textContent = '';
    }

    // 5. Validate Body
    const bodyVal = bodyInput.value.trim();
    if (!bodyVal) {
      setError(bodyInput, 'body-error', 'Please enter the manuscript text.');
    } else if (bodyVal.length < 15) {
      setError(bodyInput, 'body-error', 'Manuscript must contain at least 15 characters.');
    } else {
      clearError(bodyInput, 'body-error');
    }

    // If invalid, focus first error field
    if (!isValid) {
      if (firstErrorField) firstErrorField.focus();
      return;
    }

    // Generate excerpt from opening sentence or lines
    const cleanExcerpt = bodyVal.split('\n')[0].slice(0, 140) + '...';

    // Construct entry payload
    const newEntry = {
      id: slugify(titleVal) + '-' + Math.floor(100 + Math.random() * 900),
      title: titleVal,
      category: categoryVal,
      author: authorVal,
      isAnonymous: isAnonymous,
      themes: selectedThemes,
      excerpt: cleanExcerpt,
      body: bodyVal,
      readingTime: calculateReadingTime(bodyVal),
      featured: false
    };

    /* =========================================================================
       FULL-STACK EXPANSION HOOK
       When connected to a database/backend API later, swap this block for:
       
       try {
         const res = await fetch('/api/entries', {
           method: 'POST',
           headers: { 'Content-Type': 'application/json' },
           body: JSON.stringify(newEntry)
         });
         const saved = await res.json();
       } catch (err) {
         // handle network error
       }
       ========================================================================= */

    // Save in active archive memory
    addEntry(newEntry);

    // Render celebratory confirmation state
    this.renderConfirmation(newEntry);
  }

  /**
   * Renders in-style archival confirmation card after successful submission.
   * @param {Object} entry
   */
  renderConfirmation(entry) {
    const cardWrapper = this.outlet.querySelector('#submit-card-wrapper');
    if (!cardWrapper) return;

    cardWrapper.innerHTML = `
      <div class="submit-confirmation-card" role="region" aria-label="Submission success confirmation">
        <div class="confirmation-star" aria-hidden="true">✦</div>
        
        <h2 class="confirmation-title">
          Entered into the Catalog
        </h2>

        <p class="confirmation-quote">
          "${escapeHTML(entry.title)}" has been quietly cataloged under 
          ${entry.themes.map(t => `<strong>${escapeHTML(t)}</strong>`).join(', ')}. 
          It is now woven into the archive constellation and available in the stacks.
        </p>

        <div class="confirmation-actions">
          <a href="#/read/${encodeURIComponent(entry.id)}" class="btn btn-primary">
            Read your piece now ✦
          </a>
          <a href="#/archive" class="btn btn-secondary">
            View in Archive
          </a>
          <button type="button" class="btn btn-ghost" id="submit-another-btn">
            Entrust another piece
          </button>
        </div>
      </div>
    `;

    // Hook 'submit another piece' button
    const submitAnotherBtn = cardWrapper.querySelector('#submit-another-btn');
    if (submitAnotherBtn) {
      submitAnotherBtn.addEventListener('click', () => {
        this.render();
        this.bindEvents();
      });
    }

    // Scroll to confirmation
    cardWrapper.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}

/**
 * Submit route handler invoked by router.
 * @param {HTMLElement} outlet
 */
export function renderSubmitView(outlet) {
  new SubmitView(outlet);
}
