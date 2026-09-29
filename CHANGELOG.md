# Changelog

Dated record of changes to oceandatum.ai. Newest first.

## 2026-09-28 — stopping point (`stable-2026-09-28b`)

### CV
- Rewrote `cv.html` content: corrected facts (the old office list, "authored ~500 works", and several titles/dates were wrong), removed self-praise and company financials, reorganized as a timeline plus work-by-area.
- Web CV wording now matches `assets/docs/William_S_Davis_III_Resume.pdf` word for word (PDF is authoritative, produced in Cowork).
- Added **Download PDF** button at the top of the CV page; removed the print-based navbar "PDF" button from `cv.html`.
- Restyled CV layout: right-aligned dates and locations, Host role timeline, accent sub-headings, tighter lists, readable body links.

### Navigation
- Removed **News Feed** (WhatsApp channel link) from the desktop navbar and mobile menu on all 56 pages.

### Login
- `login.html`: case-insensitive username, trimmed password, iPhone keyboards no longer auto-capitalize the username.
- Login now works with iPhone Safari "Block All Cookies": submit handler is attached before any storage access and all storage calls are guarded. Same guard added to the auth check on `projects-hub.html`, `projects/port-sulphur.html`, `projects/port-sulphur-midstream.html`, `projects/port-sulphur-report/port-sulphur-report.html`, and `projects/tampa-cement.html` (previously a storage error also disabled the hub's menu and logout).

### Tooling
- `scripts/build_cv_pdf.py`: builds a white Letter PDF from `cv.html` via headless Chrome using static font files (avoids Type 3 fonts, the cause of grey/fuzzy PDF text). Parked — the Cowork PDF is in use.
- `.claude/launch.json`: local preview server config (port 8766).
- `.gitignore`: `_archive/` (local backups) excluded.

### Open items
See **Current State → Known issues / next up** in `CLAUDE.md`.
