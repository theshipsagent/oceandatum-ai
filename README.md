# oceandatum.ai - Maritime Intelligence Portfolio

A professional static website showcasing maritime expertise, terminal development projects, and CV/biography.

## Live Site

**https://oceandatum.ai**

## Features

✅ **Professional Landing Page** - Video background with maritime branding
✅ **CV/Biography Page** - Interactive tabbed interface with print/PDF export
✅ **Professional Bibliography** - 362 curated maritime works in 11 categories
✅ **Project Portfolio** - Tampa Cement Terminal market intelligence
✅ **Mobile-Optimized** - Horizontal scrolling navigation and touch-friendly interface
✅ **Print/PDF Export** - One-click professional document generation
✅ **Analytics** - Cloudflare Web Analytics for visitor tracking
✅ **Zero Maintenance** - Pure HTML/CSS/JS, no build process

## Site Structure

```
oceandatum.ai/
├── index.html              # Landing page
├── cv.html                 # CV/Biography page with tabs
├── projects/
│   └── tampa-cement.html   # Tampa Cement Terminal project
├── images/                 # Site images and logos
├── videos/                 # Background videos
└── public/                 # Static assets
```

## Key Pages

### Landing Page (index.html)
- Video background (oceandatum_loop_HD.mp4)
- Company branding and tagline
- Navigation to CV and Projects
- Social media integration

### CV/Biography Page (cv.html)
- **Three Tabbed Sections:**
  - CV - Professional experience and qualifications
  - Biography - Career narrative and history
  - Bibliography - 362 curated works across 11 maritime categories
- **Features:**
  - Mobile-responsive navigation with horizontal scrolling
  - Collapsible bibliography sections with expand/collapse controls
  - Table of contents with jump links
  - Print/PDF export button (bibliography auto-expands for print)
  - Professional formatting optimized for both screen and print
  - Social media icons and website links
  - Touch-friendly navigation on all devices

### Projects
- Tampa Cement Terminal - Comprehensive market intelligence report
- Future projects to be added

## Bibliography Categories

The CV/Bio page includes a comprehensive professional bibliography with 362 curated works organized into 11 categories:

1. **Business of Shipping** (21 works) - Ship agency, management, operations, strategy
2. **Cargo Operations** (25 works) - Stowage, handling, tankers, specialized cargo
3. **Chartering** (27 works) - Charter parties, laytime, demurrage, fixtures
4. **Claims & Insurance** (18 works) - P&I, marine insurance, cargo claims
5. **Commodities** (16 works) - Grain, petroleum, steel, bulk commodities
6. **Econometrics** (46 works) - Transport economics, shipping markets, analytics
7. **Historical** (88 works) - Maritime history, regional development
8. **Maritime Law** (34 works) - Legal, regulations, conventions, admiralty
9. **Port Operations** (33 works) - Terminals, stevedoring, port management
10. **Supply Chain** (36 works) - Logistics, distribution, multimodal transport
11. **Trade Documentation** (18 works) - Bills of lading, export/import, customs

**Features:**
- Collapsible sections (default collapsed for easy navigation)
- Expand All / Collapse All controls
- Table of contents with jump links
- Alphabetical sorting by author within each category
- Print/PDF optimized (auto-expands all sections)

## Analytics

Cloudflare Web Analytics is installed on:
- Landing page (index.html)
- CV page (cv.html)

**Token:** `5169a56446ff4380ad2f1785a86804b8`

View analytics at: https://dash.cloudflare.com/

## Deployment

### GitHub Pages
Hosted on GitHub Pages with custom domain.

**Repository:** https://github.com/theshipsagent/oceandatum-ai

**Deployment:** Automatic on push to `main` branch

### How to Update

1. Edit HTML files directly
2. Commit changes:
   ```bash
   git add .
   git commit -m "Update description"
   git push origin main
   ```
3. Site updates automatically in 1-2 minutes

## Custom Domain Setup

- Domain: oceandatum.ai
- CNAME file present for GitHub Pages
- DNS configured through domain registrar

## Design

- **Font:** Space Grotesk (Google Fonts)
- **Color Scheme:** Dark maritime theme with accent green
- **Style:** Professional, technical, maritime industry-focused
- **Video:** Custom ocean/maritime footage for brand immersion

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Android)

## Performance

- Lightweight static HTML
- Optimized video (compressed to ~10MB)
- Fast loading (<2s on 3G)
- No external dependencies except fonts

## Maintenance

**Required:** None
**Optional:** Content updates as needed

No build process, no dependencies, no breaking changes.

## Related Sites

- **theshipsagent.com** - Main business site
- **theshipsagent.xyz** - Development/testing site

## Archive

Previous React app with TOTP authentication archived in `_archive_react_app/` (excluded from git).

## Contact

William S. Davis III
wsd@theshipsagent.com
https://linkedin.com/in/williamsdavis

---

*Last Updated: January 21, 2026*
*Version: 2.1 (Bibliography & Mobile Nav Update)*
