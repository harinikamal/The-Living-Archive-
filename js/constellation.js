/**
 * The Living Archive — Constellation Engine
 * Generates an interactive SVG network graph from literary themes and entries.
 * Calculates node radii from theme frequencies and connecting line weights from co-occurrences.
 */

import { THEMES } from '../data/themes.js';
import { getAllEntries, getEntriesByTheme } from '../data/entries.js';
import { renderEntryCard, escapeHTML } from './utils.js';

export class Constellation {
  /**
   * @param {HTMLElement} containerElement
   */
  constructor(containerElement) {
    this.container = containerElement;
    this.entries = getAllEntries();
    this.themes = THEMES;
    this.selectedTheme = null;
    this.hoveredTheme = null;

    this.width = 900;
    this.height = 580;
    this.centerX = this.width / 2;
    this.centerY = this.height / 2 - 15;

    // Computed graph data
    this.themeStats = {};
    this.edges = [];
    this.nodes = [];

    this.init();
  }

  /**
   * Analyzes data, calculates graph topology, and renders DOM elements.
   */
  init() {
    this.calculateTopology();
    this.render();
    this.bindEvents();
  }

  /**
   * Computes frequencies and co-occurrences from the entry dataset.
   */
  calculateTopology() {
    // 1. Theme frequencies
    const counts = {};
    this.themes.forEach(theme => {
      counts[theme.name] = 0;
    });

    this.entries.forEach(entry => {
      entry.themes.forEach(themeName => {
        if (counts[themeName] !== undefined) {
          counts[themeName]++;
        }
      });
    });

    const maxCount = Math.max(...Object.values(counts), 1);
    this.themeStats = counts;

    // 2. Pairwise co-occurrences
    const coOccur = {};
    for (let i = 0; i < this.themes.length; i++) {
      for (let j = i + 1; j < this.themes.length; j++) {
        const themeA = this.themes[i].name;
        const themeB = this.themes[j].name;
        const key = `${themeA}__${themeB}`;
        
        let shared = 0;
        this.entries.forEach(entry => {
          if (entry.themes.includes(themeA) && entry.themes.includes(themeB)) {
            shared++;
          }
        });

        if (shared > 0) {
          coOccur[key] = shared;
        }
      }
    }

    // 3. Generate celestial elliptical layout for nodes
    const totalNodes = this.themes.length;
    this.nodes = this.themes.map((theme, index) => {
      const count = counts[theme.name] || 1;
      
      // Organic celestial ellipse calculation
      const angle = (index / totalNodes) * 2 * Math.PI - Math.PI / 2;
      // Slight radius breathing variation so it feels like a genuine night sky
      const radiusVariationX = index % 2 === 0 ? 300 : 275;
      const radiusVariationY = index % 2 === 0 ? 190 : 170;

      const x = Math.round(this.centerX + radiusVariationX * Math.cos(angle));
      const y = Math.round(this.centerY + radiusVariationY * Math.sin(angle));

      // Radius scaled by entry count
      const baseRadius = 7;
      const radius = Math.round(baseRadius + (count / maxCount) * 8);

      return {
        id: theme.id,
        name: theme.name,
        description: theme.description,
        glyph: theme.glyph,
        count,
        x,
        y,
        radius
      };
    });

    // 4. Generate edges
    this.edges = [];
    Object.entries(coOccur).forEach(([key, weight]) => {
      const [nameA, nameB] = key.split('__');
      const nodeA = this.nodes.find(n => n.name === nameA);
      const nodeB = this.nodes.find(n => n.name === nameB);

      if (nodeA && nodeB) {
        this.edges.push({
          source: nodeA,
          target: nodeB,
          weight
        });
      }
    });
  }

  /**
   * Generates decorative background star dust particles.
   * @returns {string} SVG circle elements
   */
  renderAmbientStars() {
    const stars = [
      { x: 120, y: 80, r: 1.2, t: 'twinkle-1' },
      { x: 260, y: 140, r: 1.5, t: 'twinkle-2' },
      { x: 410, y: 60, r: 1.0, t: 'twinkle-3' },
      { x: 740, y: 110, r: 1.6, t: 'twinkle-1' },
      { x: 810, y: 220, r: 1.2, t: 'twinkle-2' },
      { x: 160, y: 460, r: 1.4, t: 'twinkle-3' },
      { x: 310, y: 510, r: 1.2, t: 'twinkle-1' },
      { x: 590, y: 520, r: 1.5, t: 'twinkle-2' },
      { x: 780, y: 440, r: 1.0, t: 'twinkle-3' },
      { x: 450, y: 290, r: 1.8, t: 'twinkle-1' }, // Center faint star
      { x: 670, y: 260, r: 1.2, t: 'twinkle-3' },
      { x: 220, y: 310, r: 1.1, t: 'twinkle-2' }
    ];

    return stars.map(s => `
      <circle cx="${s.x}" cy="${s.y}" r="${s.r}" class="ambient-star ${s.t}" aria-hidden="true" />
    `).join('');
  }

  /**
   * Renders the complete Constellation interface into the container.
   */
  render() {
    this.container.innerHTML = `
      <!-- Toolbar Controls -->
      <div class="constellation-toolbar">
        <div class="constellation-instruction">
          <span class="dot-guide" aria-hidden="true">✦</span>
          <span>Click or focus on any star to illuminate its connected writings</span>
        </div>
        <button type="button" class="constellation-reset-btn" id="constellation-reset" style="display: none;" aria-label="Reset selection and view all stars">
          Clear selection ✕
        </button>
      </div>

      <!-- Canvas Area -->
      <div class="constellation-canvas-container">
        <!-- Floating Tooltip -->
        <div class="constellation-tooltip" id="constellation-tooltip" role="tooltip" aria-hidden="true">
          <div class="tooltip-title" id="tooltip-title"></div>
          <div class="tooltip-desc" id="tooltip-desc"></div>
          <div class="tooltip-meta" id="tooltip-meta"></div>
        </div>

        <svg 
          viewBox="0 0 ${this.width} ${this.height}" 
          class="constellation-svg" 
          aria-label="Interactive Theme Constellation Map"
          role="img"
        >
          <defs>
            <radialGradient id="starGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stop-color="#CEB47A" stop-opacity="0.85" />
              <stop offset="60%" stop-color="#B69A62" stop-opacity="0.35" />
              <stop offset="100%" stop-color="#82916A" stop-opacity="0" />
            </radialGradient>
          </defs>

          <!-- Ambient Stars -->
          <g class="ambient-stars-group" aria-hidden="true">
            ${this.renderAmbientStars()}
          </g>

          <!-- Connecting Edges -->
          <g class="edges-group" aria-hidden="true">
            ${this.edges.map(edge => {
              const strokeWidth = 1 + edge.weight * 0.7;
              return `
                <line 
                  x1="${edge.source.x}" 
                  y1="${edge.source.y}" 
                  x2="${edge.target.x}" 
                  y2="${edge.target.y}" 
                  class="constellation-edge"
                  data-source="${escapeHTML(edge.source.name)}"
                  data-target="${escapeHTML(edge.target.name)}"
                  data-weight="${edge.weight}"
                  stroke-width="${strokeWidth}"
                />
              `;
            }).join('')}
          </g>

          <!-- Star Nodes -->
          <g class="nodes-group">
            ${this.nodes.map(node => {
              const labelOffsetY = node.y > this.centerY ? node.radius + 18 : -(node.radius + 10);
              const countOffsetY = labelOffsetY + (node.y > this.centerY ? 13 : -11);

              return `
                <g 
                  class="constellation-node-group" 
                  tabindex="0" 
                  role="button"
                  data-theme="${escapeHTML(node.name)}"
                  data-desc="${escapeHTML(node.description)}"
                  data-count="${node.count}"
                  aria-label="Theme ${escapeHTML(node.name)}. ${node.count} pieces. Press Enter to view related writings."
                  transform="translate(0, 0)"
                >
                  <!-- Outer soft glow -->
                  <circle cx="${node.x}" cy="${node.y}" r="${node.radius * 2.4}" class="node-glow" fill="url(#starGlow)" />
                  <!-- Orbital ring -->
                  <circle cx="${node.x}" cy="${node.y}" r="${node.radius * 1.5}" class="node-ring" />
                  <!-- Star core -->
                  <circle cx="${node.x}" cy="${node.y}" r="${node.radius}" class="node-core" />
                  
                  <!-- Theme name label -->
                  <text x="${node.x}" y="${node.y + labelOffsetY}" class="node-label">
                    ${escapeHTML(node.name)}
                  </text>
                  <!-- Entry count pill text -->
                  <text x="${node.x}" y="${node.y + countOffsetY}" class="node-count-label">
                    ${node.count} ${node.count === 1 ? 'piece' : 'pieces'}
                  </text>
                </g>
              `;
            }).join('')}
          </g>
        </svg>
      </div>

      <!-- Preview Drawer (Appears below SVG on selection) -->
      <div class="constellation-preview-panel" id="constellation-preview-panel" aria-live="polite">
        <!-- Rendered dynamically on node select -->
      </div>
    `;
  }

  /**
   * Attaches mouse, keyboard, and resize event handlers.
   */
  bindEvents() {
    const nodeGroups = this.container.querySelectorAll('.constellation-node-group');
    const tooltip = this.container.querySelector('#constellation-tooltip');
    const tooltipTitle = this.container.querySelector('#tooltip-title');
    const tooltipDesc = this.container.querySelector('#tooltip-desc');
    const tooltipMeta = this.container.querySelector('#tooltip-meta');
    const resetBtn = this.container.querySelector('#constellation-reset');

    // Node interactions
    nodeGroups.forEach(nodeEl => {
      const themeName = nodeEl.dataset.theme;
      const themeDesc = nodeEl.dataset.desc;
      const themeCount = nodeEl.dataset.count;

      // Mouseenter / focus
      const handleEnter = (e) => {
        if (!this.selectedTheme) {
          this.hoverNode(themeName);
        }

        // Show tooltip positioned near node
        const rect = nodeEl.getBoundingClientRect();
        const containerRect = this.container.querySelector('.constellation-canvas-container').getBoundingClientRect();
        
        tooltipTitle.textContent = themeName;
        tooltipDesc.textContent = themeDesc;
        tooltipMeta.textContent = `${themeCount} ${themeCount === '1' ? 'piece' : 'pieces'} connected`;
        
        const left = rect.left - containerRect.left + rect.width / 2;
        const top = rect.top - containerRect.top;

        tooltip.style.left = `${left}px`;
        tooltip.style.top = `${top}px`;
        tooltip.classList.add('visible');
        tooltip.setAttribute('aria-hidden', 'false');
      };

      // Mouseleave / blur
      const handleLeave = () => {
        if (!this.selectedTheme) {
          this.unhoverNodes();
        }
        tooltip.classList.remove('visible');
        tooltip.setAttribute('aria-hidden', 'true');
      };

      // Click / select
      const handleSelect = (e) => {
        e.preventDefault();
        tooltip.classList.remove('visible');
        if (this.selectedTheme === themeName) {
          this.deselectAll();
        } else {
          this.selectTheme(themeName);
        }
      };

      nodeEl.addEventListener('mouseenter', handleEnter);
      nodeEl.addEventListener('mouseleave', handleLeave);
      nodeEl.addEventListener('focus', handleEnter);
      nodeEl.addEventListener('blur', handleLeave);
      nodeEl.addEventListener('click', handleSelect);

      // Keyboard selection (Enter or Space)
      nodeEl.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleSelect(e);
        } else if (e.key === 'Escape') {
          this.deselectAll();
        }
      });
    });

    // Reset button
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        this.deselectAll();
      });
    }

    // Canvas click outside nodes deselects
    const svgEl = this.container.querySelector('.constellation-svg');
    if (svgEl) {
      svgEl.addEventListener('click', (e) => {
        if (e.target.tagName === 'svg' || e.target.classList.contains('ambient-star') || e.target.classList.contains('edges-group')) {
          this.deselectAll();
        }
      });
    }
  }

  /**
   * Highlights a hovered node and its incident edges.
   * @param {string} themeName
   */
  hoverNode(themeName) {
    const edges = this.container.querySelectorAll('.constellation-edge');
    edges.forEach(edge => {
      const isConnected = edge.dataset.source === themeName || edge.dataset.target === themeName;
      if (isConnected) {
        edge.classList.add('highlighted');
      } else {
        edge.classList.add('dimmed');
      }
    });
  }

  /**
   * Clears hover state on edges.
   */
  unhoverNodes() {
    const edges = this.container.querySelectorAll('.constellation-edge');
    edges.forEach(edge => {
      edge.classList.remove('highlighted', 'dimmed');
    });
  }

  /**
   * Finds all themes connected to the given theme.
   * @param {string} themeName
   * @returns {string[]}
   */
  getConnectedThemes(themeName) {
    const connected = new Set();
    this.edges.forEach(edge => {
      if (edge.source.name === themeName) {
        connected.add(edge.target.name);
      } else if (edge.target.name === themeName) {
        connected.add(edge.source.name);
      }
    });
    return Array.from(connected);
  }

  /**
   * Activates a theme node, highlights connections, dims others, and shows preview panel.
   * @param {string} themeName
   */
  selectTheme(themeName) {
    this.selectedTheme = themeName;
    const connectedThemes = this.getConnectedThemes(themeName);

    const nodeGroups = this.container.querySelectorAll('.constellation-node-group');
    const edges = this.container.querySelectorAll('.constellation-edge');
    const resetBtn = this.container.querySelector('#constellation-reset');

    // Update nodes visual states
    nodeGroups.forEach(node => {
      const name = node.dataset.theme;
      node.classList.remove('active', 'connected', 'dimmed');

      if (name === themeName) {
        node.classList.add('active');
        node.setAttribute('aria-expanded', 'true');
      } else if (connectedThemes.includes(name)) {
        node.classList.add('connected');
        node.setAttribute('aria-expanded', 'false');
      } else {
        node.classList.add('dimmed');
        node.setAttribute('aria-expanded', 'false');
      }
    });

    // Update edges visual states
    edges.forEach(edge => {
      edge.classList.remove('highlighted', 'dimmed');
      const isIncident = edge.dataset.source === themeName || edge.dataset.target === themeName;
      if (isIncident) {
        edge.classList.add('highlighted');
      } else {
        edge.classList.add('dimmed');
      }
    });

    if (resetBtn) {
      resetBtn.style.display = 'inline-flex';
    }

    this.renderPreviewPanel(themeName, connectedThemes);
  }

  /**
   * Clears selection and returns the constellation to idle state.
   */
  deselectAll() {
    this.selectedTheme = null;
    const nodeGroups = this.container.querySelectorAll('.constellation-node-group');
    const edges = this.container.querySelectorAll('.constellation-edge');
    const previewPanel = this.container.querySelector('#constellation-preview-panel');
    const resetBtn = this.container.querySelector('#constellation-reset');

    nodeGroups.forEach(node => {
      node.classList.remove('active', 'connected', 'dimmed');
      node.removeAttribute('aria-expanded');
    });

    edges.forEach(edge => {
      edge.classList.remove('highlighted', 'dimmed');
    });

    if (previewPanel) {
      previewPanel.classList.remove('active');
      previewPanel.innerHTML = '';
    }

    if (resetBtn) {
      resetBtn.style.display = 'none';
    }
  }

  /**
   * Renders matching entries in the preview panel below the SVG map.
   * @param {string} themeName
   * @param {string[]} connectedThemes
   */
  renderPreviewPanel(themeName, connectedThemes) {
    const previewPanel = this.container.querySelector('#constellation-preview-panel');
    if (!previewPanel) return;

    const themeObj = this.themes.find(t => t.name === themeName) || { name: themeName, glyph: '✦', description: '' };
    const matchingEntries = getEntriesByTheme(themeName);

    const connectedPills = connectedThemes
      .map(name => `
        <button type="button" class="chip" data-quick-theme="${escapeHTML(name)}" aria-label="Switch focus to connected theme ${escapeHTML(name)}">
          ${escapeHTML(name)}
        </button>
      `)
      .join('');

    previewPanel.innerHTML = `
      <div class="preview-panel-header">
        <div>
          <h3 class="preview-panel-theme-title">
            <span class="theme-glyph">${themeObj.glyph}</span>
            <span>${escapeHTML(themeObj.name)}</span>
          </h3>
          <p class="preview-panel-description">
            "${escapeHTML(themeObj.description)}"
          </p>
          <div class="preview-connected-themes">
            <span>Co-occurs with:</span>
            ${connectedPills}
          </div>
        </div>

        <a href="#/archive?theme=${encodeURIComponent(themeName)}" class="btn btn-secondary" style="font-size: var(--text-xs); padding: 0.4rem 0.85rem;">
          View all in Archive (${matchingEntries.length}) &rarr;
        </a>
      </div>

      <div class="preview-entries-grid" role="list" aria-label="Pieces exploring ${escapeHTML(themeName)}">
        ${matchingEntries.slice(0, 3).map(entry => renderEntryCard(entry)).join('')}
      </div>
    `;

    previewPanel.classList.add('active');

    // Attach quick switcher listeners on connected pills
    const pills = previewPanel.querySelectorAll('[data-quick-theme]');
    pills.forEach(pill => {
      pill.addEventListener('click', () => {
        const nextTheme = pill.dataset.quickTheme;
        this.selectTheme(nextTheme);
      });
    });

    // Smooth scroll to preview panel for comfortable reading
    previewPanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
}
