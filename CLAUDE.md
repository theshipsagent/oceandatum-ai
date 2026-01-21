# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

**oceandatum.ai** is a professional static website showcasing maritime expertise, terminal development projects, and CV/biography. It uses pure HTML/CSS/JavaScript with no build process or dependencies.

- **Live Site**: https://oceandatum.ai
- **Repository**: https://github.com/theshipsagent/oceandatum-ai
- **Deployment**: GitHub Pages (automatic on push to `main` branch)
- **Custom Domain**: oceandatum.ai (configured via CNAME)

## Architecture

### Site Structure

This is a **static HTML site** with the following key pages:

```
index.html              # Landing page with video background
cv.html                 # CV/Biography with tabbed interface (CV, Biography, Bibliography)
projects/
  └── tampa-cement.html # Project showcase page
images/                 # Logos and graphics
videos/                 # Background video files
```

### Tabbed Interface System (cv.html, tampa-cement.html)

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
- **Mobile (<768px)**: Hamburger menu OR horizontal scroll navigation
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

### Bibliography System

The bibliography on cv.html (362 maritime works in 11 categories) is **statically generated** and embedded in the HTML. It is NOT dynamically loaded.

**Collapsible sections**:
- Each category is wrapped in `.bib-section` with `.bib-section-header` (clickable)
- JavaScript `toggleSection()` function manages expand/collapse state
- "Expand All" / "Collapse All" controls available
- Print mode auto-expands all sections via CSS `@media print`

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
4. Manually insert generated HTML into `cv.html`

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

The cv.html page has print-optimized CSS:

```css
@media print {
  .bib-section-content {
    display: block !important;  /* Auto-expand all sections */
  }
  .expand-icon, .bib-controls {
    display: none;  /* Hide interactive elements */
  }
}
```

Print button triggers `window.print()` for one-click PDF export.

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
4. Copy generated HTML into cv.html bibliography tab section
5. Commit and push

### Fixing Mobile Navigation Issues

The site uses horizontal scroll navigation on mobile. Key requirements:

- Parent container: `overflow-x: auto`, `scroll-snap-type: x mandatory`
- Child items: `scroll-snap-align: start`, `flex-shrink: 0`
- Minimum touch targets: 44px height
- Custom scrollbar styling for consistency

Refer to cv.html:253-312 for reference implementation.

## Important Notes

- **No dependencies**: Site runs without npm, webpack, or any build tools
- **No server-side code**: Pure static HTML/CSS/JavaScript
- **No database**: All content is embedded in HTML
- **No authentication**: Public site (previous React/TOTP app archived in `_archive_react_app/`)
- **Video optimization**: Background video compressed to ~10MB for fast loading
- **Browser support**: Modern browsers (Chrome, Firefox, Safari, mobile browsers)

## Documentation Files

- `README.md` - User-facing documentation with site features and structure
- `CHANGELOG.md` - Version history (semantic versioning)
- `DEPLOYMENT_STATUS.md` - Deployment verification checklist
- `MOBILE_NAVIGATION_FIXES.md` - Technical details on mobile navigation implementation

## Related Sites

- **theshipsagent.com** - Main business site
- **theshipsagent.xyz** - Development/testing site
