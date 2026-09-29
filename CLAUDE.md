# CLAUDE.md

> ⛔ **WRONG-PROJECT GUARD — READ FIRST.**
> This repo is **oceandatum.ai ONLY** (William's maritime personal site).
> **OnlyVans Panama** (Claas's van-travel demo) does **NOT** belong here.
> A terminal sometimes opens in this dir by mistake — if your task is OnlyVans,
> stop and `cd ~/dev/onlyvans-panama/` (deploys to `theshipsagent.com/onlyvans/`).
> Never commit OnlyVans content to this repo.

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Current State — stopping point 2026-09-29 (tag `stable-2026-09-29`)

Read this first. It is the handoff point for any further changes.

### What is live
- **Navbar (all pages):** Home · Blog · Role Brief · CV · Contact · Projects. **News Feed (WhatsApp channel) was removed site-wide** — failed workaround, do not re-add.
- **Shared navbar (2026-09-28):** all 56 navbar pages load `assets/od-navbar.css` + `assets/od-navbar.js`. **Never add navbar CSS or a hamburger script to a page** — two hamburger scripts cancel each other (menu opens then closes). Each page keeps its own nav HTML (links, `../` prefixes). Look is chosen by a class on `<nav>`: none = compact (project/tool pages), `navbar-pill`, `navbar-main`, plus `navbar-hub` (projects hub, coal map, hold cleaning) and `navbar-top` (grain guide, z-index 1100). Page-level `body.light-mode` and `@media print` navbar rules are allowed and stay on the page.
  - Hamburger at **≤640px** (phones). Wider: `od-navbar.js` checks the bar fits on one row; if not, hides the social icons, then falls back to the hamburger (`html.od-nav-no-social` / `html.od-nav-collapsed`).
  - New page: copy the `<nav>` block from a page of the same style, then add `<link rel="stylesheet" href="…assets/od-navbar.css">` in `<head>` and `<script src="…assets/od-navbar.js"></script>` after `</nav>`.
- **Map backgrounds (2026-09-28):** CARTO basemaps now return "API KEY REQUIRED" tiles. All Leaflet maps use `odEsri('Light'|'Dark', options)` from `assets/od-basemap.js` (Esri Gray Canvas + label layer, no key). Do not use `basemaps.cartocdn.com` again. Pages that embed maps in iframes add `?v=YYYY-MM-DD` to the `src`; bump it when a map changes so browsers don't show a cached copy.
- **CV (`cv.html`):** content matches `assets/docs/William_S_Davis_III_Resume.pdf` **word for word**. The PDF is authoritative; it was produced outside this repo (Cowork). A **Download PDF** button at the top of the CV page downloads that file. The old navbar "PDF" (print) button was removed from `cv.html` only.
- **Projects login (`login.html`):** client-side "curtain" gate, one shared username/password for everyone (see `login.html`). Works with iPhone Safari "Block All Cookies" on — all storage access is guarded (`safeStorage()` in login.html; `try/catch` around the auth check on `projects-hub.html` and the 4 gated project pages). Username is case-insensitive; password is trimmed.

### How to update the CV
1. Replace `assets/docs/William_S_Davis_III_Resume.pdf` (same filename) with the new PDF.
2. Update `cv.html` wording to match the PDF **verbatim** — web styling stays, wording follows the PDF.
3. Preview locally, then commit and push.
- Tone rules for any CV/bio wording: plain facts, no adulation, no stats unless needed, no company financials.
- `scripts/build_cv_pdf.py` can generate a white Letter PDF from `cv.html` (headless Chrome). **Parked** — the Cowork PDF is the one in use. If used: fuzzy/grey PDF text = Type 3 fonts from variable web fonts; the script uses static font files to avoid it.

### Local preview
- `.claude/launch.json` defines a preview server (port 8766) for the Claude app's browser pane. It stops when the pane closes.
- Independent alternative: `python3 -m http.server 8770 --bind 127.0.0.1` from the repo root, then open `http://127.0.0.1:8770/`.
- **Check the address bar:** `oceandatum.ai` = live site; `localhost` / `127.0.0.1` = local copy with unpushed changes.

### Known issues / next up (not done)
1. **Navbar follow-ups (optional):** on compact pages the phone hamburger sits mid-bar (empty brand + space-between — unchanged look); `projects/hold-cleaning-intelligence.html` uses the hamburger up to ~790px (long brand + PDF button). Navbar Contact links go to `wsd@oceandatum.ai`, but `datum@oceandatum.ai` is noted as the canonical public contact — owner to confirm.
2. **`projects/construction-materials.html`:** console error at load (`themeToggle` button no longer exists) — pre-existing, harmless, not fixed.
3. **SECURITY — done 2026-09-28:** `_user_notes/totp+prompt_011626_1132.md` untracked (`git rm --cached`; local copy kept; `_user_notes/` is in `.gitignore`). It is **still in git history** of the public repo (commits before 2026-09-28). TOTP was parked/unused; if any code in it was ever used for a live account, treat it as exposed and reset it. Scrubbing history (git filter-repo + force push) only if the owner asks.
4. **Cloudflare Worker — REMOVED 2026-09-29.** `oceandatum-auth` (routes `/login`, `/register`, `/admin`, `/api/*`, `/test/*`) deleted by owner; verified all now served by GitHub Pages (`/login` = the site's own `login.html`). Empty KV namespaces `AUTH_KV` / `AUTH_KV_preview` (0 B) may remain — harmless. If real protection is ever needed, use Cloudflare Access, not a custom Worker.

## Repository Overview

**oceandatum.ai** is a professional static website showcasing maritime expertise, terminal development projects, and a CV. It uses pure HTML/CSS/JavaScript with no build process or dependencies.

- **Live Site**: https://oceandatum.ai
- **Repository**: https://github.com/theshipsagent/oceandatum-ai
- **Deployment**: GitHub Pages (automatic on push to `main` branch)
- **Custom Domain**: oceandatum.ai (configured via CNAME)

## Architecture

### Site Structure

This is a **static HTML site** with the following key pages:

```
index.html              # Landing page with video background
cv.html                 # CV (single page, no tabs) with Download PDF button
tools/bibliography.html # Professional bibliography (362 works)
projects/
  └── tampa-cement.html # Project showcase page
images/                 # Logos and graphics
videos/                 # Background video files
```

### Tabbed Interface System (tampa-cement.html)

`cv.html` no longer has tabs (no Biography or Bibliography tab); it is a single page.

Pages use a custom JavaScript tab system:

- **Tab switching**: `showTab(tabName)` function toggles visibility of `.tab-content` elements
- **Mobile navigation**: Horizontal scrolling with CSS `scroll-snap-type` and custom scrollbar styling
- **Touch optimization**: 44px minimum touch targets, smooth scrolling behavior
- **Tab state**: Managed via `.active` class on both `.tab-button` and `.tab-content`

**Key implementation pattern**:
```javascript
function showTab(tabName) {
  // Hide all tabs
  const tabs = document.querySelectorAll('.tab-content');
  tabs.forEach(tab => tab.classList.remove('active'));

  // Show selected tab
  document.getElementById(tabName).classList.add('active');

  // Update button states
  const buttons = document.querySelectorAll('.tab-button');
  buttons.forEach(button => button.classList.remove('active'));
}
```

### Mobile Navigation Pattern

All pages implement responsive navigation with:

- **Desktop**: Standard horizontal navigation bar
- **Phones (≤640px)**: Hamburger menu (shared `assets/od-navbar.css/js` — see Current State)
- **Touch handling**: Proper event listeners for mobile interactions
- **Scroll snap**: CSS scroll-snap-align for smooth tab transitions

**CSS Pattern**:
```css
.tab-nav {
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
}

.tab-button {
  scroll-snap-align: start;
  min-width: max-content;
}
```

### Bibliography

The bibliography (362 maritime works) lives on its own page, `tools/bibliography.html`. It is not part of `cv.html`.

## Development Workflow

### Making Changes

This is a **static site with no build process**. To update:

1. Edit HTML/CSS/JavaScript files directly
2. Test locally (optional: use Python's built-in server)
3. Commit and push to `main` branch
4. GitHub Pages deploys automatically in 1-2 minutes

### Local Testing

```bash
# Serve locally with Python (if needed for testing)
python -m http.server 8000

# Then visit http://localhost:8000
```

No installation, compilation, or build steps required.

### Git Workflow

```bash
# Standard workflow
git add .
git commit -m "Description of changes"
git push origin main

# Site updates automatically on GitHub Pages
```

## Bibliography Management (Python Scripts)

Python scripts are used **offline** to process bibliography data from Zotero CSV exports. These are NOT part of the deployed site.

**Workflow**:
1. Export bibliography from Zotero to CSV
2. Run Python scripts to categorize and format entries
3. Generate HTML snippet with `build_final_bibliography.py`
4. Update `tools/bibliography.html` with the generated output

**Key scripts**:
- `build_final_bibliography.py` - Main script to generate bibliography HTML from categorized CSV
- `bibliography_processor.py` - Parse and clean Zotero CSV exports
- `create_category_csv.py` - Helper to create categorization templates
- `consolidate_bibliography.py` - Merge and deduplicate entries

**Python requirements**: Standard library only (csv, re, pathlib, collections)

## Design System

### Typography
- **Font**: Space Grotesk (Google Fonts)
- Sizes: 0.85rem (navbar), 0.9rem (links), standard body text

### Color Scheme
- **Background**: Dark gradient (#0a0a0a to #1a1a2e)
- **Text**: White with opacity variations (0.7-0.9)
- **Accent**: #64ffb4 (maritime green) for hover states
- **Borders**: rgba(255,255,255,0.15-0.2)

### Layout Patterns
- **Glassmorphism navbar**: `backdrop-filter: blur(20px) saturate(180%)`
- **Content containers**: max-width constraints with center alignment
- **Responsive breakpoints**: 768px (mobile), 1024px (tablet)

## Print/PDF Functionality

- **CV:** do not rely on printing the dark web page (browser print of the dark theme gave grey/fuzzy output for months). The CV page offers **Download PDF** (`assets/docs/William_S_Davis_III_Resume.pdf`).
- Other pages: `od-theme-pdf.js` injects a navbar "PDF" button that calls `window.print()`; `od-lightmode.css` supplies the `@media print` rules.

## Analytics

Cloudflare Web Analytics installed on:
- index.html
- cv.html

**Token**: `5169a56446ff4380ad2f1785a86804b8`

## Common Tasks

### Adding a New Project

1. Create `projects/project-name.html` based on existing project template
2. Copy navigation bar and mobile menu structure from `tampa-cement.html`
3. Update index.html to link to new project
4. Commit and push

### Updating Bibliography

1. Export new Zotero data to CSV
2. Edit CSV to assign categories (manual step)
3. Run `python build_final_bibliography.py` to generate HTML
4. Update `tools/bibliography.html` with the generated output
5. Commit and push

### Fixing Mobile Navigation Issues

The site uses horizontal scroll navigation on mobile. Key requirements:

- Parent container: `overflow-x: auto`, `scroll-snap-type: x mandatory`
- Child items: `scroll-snap-align: start`, `flex-shrink: 0`
- Minimum touch targets: 44px height
- Custom scrollbar styling for consistency


## Important Notes

- **No dependencies**: Site runs without npm, webpack, or any build tools
- **No server-side code**: Pure static HTML/CSS/JavaScript
- **No database**: All content is embedded in HTML
- **Authentication**: client-side curtain login only (`login.html` → `projects-hub.html`), not real security. Previous React/TOTP app archived in `_archive_react_app/`
- **Video optimization**: Background video compressed to ~10MB for fast loading
- **Browser support**: Modern browsers (Chrome, Firefox, Safari, mobile browsers)

## Documentation Files

- `CLAUDE.md` - This file; **Current State** section at the top is the handoff point
- `CHANGELOG.md` - Dated record of changes
- `README.md` - User-facing documentation with site features and structure

## Related Sites

- **theshipsagent.com** - Main business site
- **theshipsagent.xyz** - Development/testing site
