 HEAD
# The Living Archive ✦

> *"Some feelings refuse to stay unwritten."*

**The Living Archive** is a dark-academia digital literary archive that connects poems, essays, letters, and short stories through shared human emotions, memories, and experiences.

Unlike traditional publishing platforms and Substack clones that organize writing around authors, chronological feeds, or follower counts, here the **interconnections between pieces of writing** form the core experience. A visitor exploring *"Longing"* might discover a coastal poem about missing someone, a personal essay on leaving an old home, an anonymous letter to someone they never got to say goodbye to, and a story about childhood nostalgia. Each piece connects to multiple themes, inviting readers into continuous exploration rather than an algorithmic dead end.

---

## ✦ Table of Contents
1. [What Makes It Different](#-what-makes-it-different)
2. [Core Features](#-core-features)
3. [Design System & Aesthetics](#-design-system--aesthetics)
4. [Architecture & Technical Choices](#-architecture--technical-choices)
   - [Why Vanilla SVG Instead of a Chart Library?](#why-vanilla-svg-instead-of-a-chart-library)
   - [Hash-Based Client-Side Routing](#hash-based-client-side-routing)
   - [Accessible Form Architecture](#accessible-form-architecture)
5. [Project Structure](#-project-structure)
6. [Local Setup & Running Locally](#-local-setup--running-locally)
7. [Full-Stack Roadmap](#-full-stack-roadmap)
8. [Screenshots & Visual Preview](#-screenshots--visual-preview)
9. [Accessibility & Standards Compliance](#-accessibility--standards-compliance)

---

## ✦ What Makes It Different

| Conventional Publishing Platforms | The Living Archive |
| :--- | :--- |
| **Organized by creator**: Feeds follow authors, dates, or engagement metrics. | **Organized by resonance**: Writing is clustered by emotional currents (*Longing*, *Belonging*, *Grief*, *Freedom*, *Memory*, *Home*, *Solitude*). |
| **Chronological feed walls**: Readers reach the bottom of a timeline and stop. | **Perpetual exploration**: Every piece bridges to adjacent themes and companion writings. |
| **Algorithmic incentives**: Loud headlines designed for clicks. | **Dark-academia curatorial sanctuary**: Generous whitespace, quiet manuscript paper surfaces, and emotionally restrained original writing. |

---

## ✦ Core Features

### 1. The Interactive Constellation (Signature Feature)
- **Data-Driven Topology**: Theme nodes and connecting lines are algorithmically computed from the literary entries in [`data/entries.js`](file:///c:/Users/Aarthi%20S/OneDrive/Desktop/the%20living%20archive/data/entries.js).
- **Dynamic Star Sizes**: Node radius scales with how frequently a theme is represented.
- **Dynamic Edge Weights**: Connecting line thickness scales with theme co-occurrence.
- **Responsive Scalability**: Built entirely in vanilla SVG with a scalable `viewBox`, ensuring crisp rendering from mobile viewports (360px) to ultra-wide displays (1440px+).
- **Interactive Illuminations**: Hovering or focusing a star reveals its essence and piece count. Selecting a star illuminates all connected neighbors, dims unrelated currents, and opens an immediate reading drawer below the map.
- **Ambient Celestial Motion**: Delicate star twinkling and cosmic drifting, strictly guarded by `prefers-reduced-motion`.

### 2. The Reading Room
- **Illuminated Parchment Canvas**: High-contrast, paper-like reading card (`#F4EEDF`) with deckled gold edges set against the deep ink-and-forest interface.
- **Poetic Formatting**: Poems automatically preserve line breaks, stanza spacing, and cadence; prose entries format comfortable, readable line lengths (60–75 characters) with curatorial drop caps.
- **Resonance Recommendations**: Evaluates shared thematic overlap to recommend companion writings at the end of each piece.
- **Sequential Anthology Browsing**: Two-way previous and next pagination for sequential reading.

### 3. Explore & Discover (The Stacks)
- **Real-Time Debounced Search**: Instant full-text searching across titles, excerpts, authors, and bodies.
- **Dual-Facet Combinable Filters**: Filter by **Form** (*Poems, Essays, Letters, Stories*) and by **Theme** (*Longing, Grief, Solitude, etc.*) simultaneously.
- **URL Query Synchronization**: Filter states sync to URL hashes (e.g., `#/archive?theme=Solitude&category=letter`), making searches bookmarkable and shareable without page reloads.
- **Evocative Empty State**: Thoughtful feedback when zero results match: *"Nothing here yet. Some feelings are still unwritten."*

### 4. Entrust a Piece (Submission System)
- **Dark-Academia Contribution Form**: Supports poems, letters, essays, and stories.
- **Archivist's Seal Toggle**: Allows authors to submit anonymously or under a pseudonym.
- **Multi-Select Theme Picker**: Interactive emotional current badges.
- **Accessible Inline Validation**: Real-time feedback with `aria-invalid`, `aria-describedby`, and `aria-live="polite"` screen-reader announcements.
- **Live Memory Ingestion**: Newly entrusted pieces are instantly added to the live catalog, appearing in the archive, reading room, and constellation graph.
- **Drop-In Backend Hook**: Clear async handler prepared for migration to a real REST/GraphQL API.

---

## ✦ Design System & Aesthetics

Defined entirely using CSS custom properties in [`css/tokens.css`](file:///c:/Users/Aarthi%20S/OneDrive/Desktop/the%20living%20archive/css/tokens.css):

```css
:root {
  --color-ink: #101713;             /* Deepest canvas background */
  --color-forest: #243D2D;          /* Panels and card surfaces */
  --color-parchment: #E8DFC8;       /* Primary text & reading surface */
  --color-parchment-light: #F4EEDF; /* High-contrast reading paper */
  --color-moss: #82916A;            /* Secondary accents and fine lines */
  --color-aged-gold: #B69A62;       /* Key highlights and constellation stars */
  --color-muted: #A8B0A2;           /* Subdued secondary text */
}
```

- **Typography**:
  - Headings & Manuscripts: **Cormorant Garamond** (Google Fonts) — an expressive, classic serif font.
  - Controls, Metadata & Labels: **DM Sans** (Google Fonts) — clean, highly readable geometric sans-serif.
- **Atmosphere**: Frosted glass masthead, fine moss dividers, subtle aged-gold halos, and deckle-edged paper surfaces.

---

## ✦ Architecture & Technical Choices

### Why Vanilla SVG Instead of a Chart Library?
1. **Zero Dependencies & Zero Bloat**: Libraries like D3, Chart.js, or Cytoscape add 80KB–300KB of third-party bundle weight. The Living Archive is 100% dependency-free vanilla JavaScript and SVG.
2. **Total Stylistic & Animation Control**: SVG elements are styled directly with CSS variables (`tokens.css`), matching the dark-academia aesthetic effortlessly without overriding canvas shaders or canvas pixel ratios.
3. **Native Accessibility (A11y)**: Every SVG node is rendered as an accessible group with `tabindex="0"`, `role="button"`, and descriptive `aria-label` tags. Screen reader and keyboard users can navigate the stars with standard <kbd>Tab</kbd> and <kbd>Enter</kbd> controls—something difficult with HTML5 `<canvas>` charting tools.
4. **Fluid Vector Scaling**: The SVG `viewBox="0 0 900 580"` guarantees resolution-independent sharpness on high-DPI Retina screens and small mobile displays without pixelation.

### Hash-Based Client-Side Routing
Uses modern ES modules with a lightweight, dependency-free router ([`js/router.js`](file:///c:/Users/Aarthi%20S/OneDrive/Desktop/the%20living%20archive/js/router.js)):
- `#/`: Archive Homepage & Constellation
- `#/archive`: The Stacks (Search & Dual-Facet Filters)
- `#/read/:id`: The Reading Room
- `#/submit`: Entrust a Piece

Hash-based routing ensures the application functions as a static site hosted anywhere (GitHub Pages, Netlify, Vercel, or a local file server) without requiring server-side URL rewrite configuration.

### Accessible Form Architecture
The submission form in [`js/submit.js`](file:///c:/Users/Aarthi%20S/OneDrive/Desktop/the%20living%20archive/js/submit.js) strictly respects W3C WAI-ARIA guidelines:
- Explicit `<label for="...">` associations.
- `aria-describedby` linking error containers to inputs.
- `aria-invalid="true"` toggled dynamically upon failed validation.
- `aria-live="polite"` announcing errors to assistive tech without interrupting ongoing speech.
- Automatic focus redirection to the first invalid field.

---

## ✦ Project Structure

```text
the-living-archive/
├── index.html                   # Semantic HTML5 root, masthead, skip-link, and #app outlet
│
├── css/
│   ├── tokens.css               # Design tokens (palette, typography, parchment surfaces, shadows)
│   ├── base.css                 # Reset, typography rules, focus rings, reduced-motion queries
│   ├── components.css           # Masthead, navigation, cards, filter pills, reading surface, form
│   └── constellation.css        # SVG styling, nodes, glow effects, connections, ambient drift
│
├── js/
│   ├── main.js                  # Application bootstrap, router mounting, view dispatching
│   ├── router.js                # Hash-based routing (#/, #/archive, #/read/:id, #/submit)
│   ├── utils.js                 # Helpers (reading time calc, slugify, DOM card markup, poem formatter)
│   ├── constellation.js         # Algorithmic SVG star graph, co-occurrence calculations, preview drawer
│   ├── archive.js               # Filter engine (theme & category), real-time search, grid renderer
│   ├── reader.js                # Parchment reader room, poem stanza handling, related piece discovery
│   └── submit.js                # Accessible submission form validation, local sync, future API hook
│
├── data/
│   ├── themes.js                # Canonical theme definitions with descriptions & tone glyphs
│   └── entries.js               # 14 original literary pieces (poems, essays, anonymous letters, stories)
│
└── README.md                    # Project documentation, technical architecture, and roadmap
```

---

## ✦ Local Setup & Running Locally

Since the application uses standard **native ES modules** (`import`/`export`), it should be served over HTTP rather than opened as a raw `file://` URL (due to browser CORS security policies).

### Option 1: Python (Built-in on most systems)
```bash
# In the project directory:
python -m http.server 3000
```
Then open your browser to: **`http://localhost:3000`**

### Option 2: Node.js / npx
```bash
# In the project directory:
npx serve .
# or
npx http-server -p 3000
```

### Option 3: VS Code Live Server
Right-click `index.html` in VS Code and select **"Open with Live Server"**.

---

## ✦ Full-Stack Roadmap

The front-end code is deliberately structured with clear abstractions so that it can be evolved into a full-stack platform:

1. **Database Persistence**:
   - Migrate [`data/entries.js`](file:///c:/Users/Aarthi%20S/OneDrive/Desktop/the%20living%20archive/data/entries.js) into PostgreSQL or SQLite with Prisma ORM.
   - Relational schema linking `Entries`, `Themes`, and `EntryThemes` (many-to-many relationship).
2. **Backend API**:
   - Implement Node.js / Express or Python / FastAPI endpoints:
     - `GET /api/entries`: Query entries with pagination, category filter, and theme filters.
     - `GET /api/entries/:id`: Fetch a single entry with calculated related pieces.
     - `POST /api/entries`: Validate and insert newly entrusted submissions.
     - `GET /api/constellation`: Pre-calculate node weights and co-occurrence matrices on the server.
3. **Editorial & Curation Dashboard**:
   - Moderation queue for community submissions before public inclusion in the main archive.
   - Tag editor to re-anchor pieces to new emerging themes.
4. **Audio Archival Extensions**:
   - Spoken-word audio recordings embedded directly into the parchment reading room.

---

## ✦ Screenshots & Visual Preview

<!-- Placeholder for portfolio screenshots -->
| Constellation Star Map | Parchment Reading Room |
| :---: | :---: |
| *(Screenshot Placeholder: SVG Constellation with highlighted connections and preview drawer)* | *(Screenshot Placeholder: Cormorant Garamond poem with stanza formatting and deckle edge)* |

| The Stacks (Archive & Filters) | Entrust a Piece (Form) |
| :---: | :---: |
| *(Screenshot Placeholder: Dual-facet filter pills and real-time search)* | *(Screenshot Placeholder: Accessible dark-academia submission form)* |

---

## ✦ Accessibility & Standards Compliance

- **Keyboard Navigation**: Complete tab stops across masthead, navigation links, constellation nodes, filter pills, search clear buttons, and reading room pagination.
- **Color Contrast**: All primary reading text achieves WCAG AA / AAA contrast ratios against both deep forest surfaces and parchment reading surfaces.
- **Accessible Names**: All icon buttons and interactive stars include explicit `aria-label` tags.
- **Screen Reader Announcements**: Route changes and search result counts are broadcast via `aria-live="polite"`.
- **Reduced Motion Support**: All keyframe animations (star twinkling, node pulses, slide-ins) automatically disable when `prefers-reduced-motion: reduce` is enabled in the user's operating system.

---

*Curated with care for The Living Archive. Some feelings refuse to stay unwritten.*

# The-Living-Archive-
A digital literary archive where poems, letters, essays, and stories intertwine through shared emotions, memories, and human experiences. 

