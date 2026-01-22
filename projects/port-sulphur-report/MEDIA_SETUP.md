# Port Sulphur Report - Media Setup Guide

## Quick Reference: Adding Images and Documents

### Option 1: Add Images (If Available)

**Step 1: Find source images**

Check these locations:
```
G:\My Drive\LLM\project_port_sulphur\archive\images\
```

**Step 2: Create folder structure**

```bash
cd "G:\My Drive\LLM\theshipsagent.github.io\oceandatum.ai\projects\port-sulphur-report"
mkdir images
mkdir images\historical
mkdir images\aerial
mkdir images\regulatory
```

**Step 3: Copy images**

Copy images to appropriate folders:
- Historical photos (1933-2005 operations) → `images/historical/`
- Aerial/satellite views → `images/aerial/`
- Maps and diagrams → `images/regulatory/`

**Step 4: Update image paths**

Edit `sections/images_section.html` and replace placeholder URLs:

Find:
```javascript
src: 'https://via.placeholder.com/800x600/1a1a2e/64ffb4?text=Historical+Image+1'
```

Replace with:
```javascript
src: '../images/historical/1944-town-of-port-sulphur.jpg'
```

**Step 5: Optimize images**

For web deployment:
- Resize large images to max 1920px width
- Compress JPEGs to 80-90% quality
- Use online tools: TinyPNG, ImageOptim, or Squoosh

**Step 6: Re-run assembly**

```bash
python assemble_report.py
```

---

### Option 2: Add Documents (PDFs)

**Step 1: Create document folders**

```bash
cd "G:\My Drive\LLM\theshipsagent.github.io\oceandatum.ai\projects\port-sulphur-report"
mkdir documents
mkdir documents\permits
mkdir documents\environmental
mkdir documents\engineering
mkdir documents\financial
mkdir documents\historical
```

**Step 2: Copy PDF documents**

From source materials at:
```
G:\My Drive\LLM\project_port_sulphur\archive\
```

**Step 3: Add document links to sections**

Example for `sections/permits_section.html`:

```html
<div class="content-block">
    <h3>Available Documents</h3>

    <div class="document-grid">
        <div class="document-card">
            <div class="doc-icon">📄</div>
            <div class="doc-info">
                <h4>Section 408 Permit Application</h4>
                <p>MVN-2025-00276-EPP - USACE permit application for midstream mooring facility</p>
                <a href="../documents/permits/MVN-2025-00276-EPP.pdf" class="doc-download" download>
                    Download PDF (2.3 MB)
                </a>
            </div>
        </div>

        <div class="document-card">
            <div class="doc-icon">📄</div>
            <div class="doc-info">
                <h4>Louisiana Coastal Use Permit</h4>
                <p>P20250196 - State permit for coastal zone activities</p>
                <a href="../documents/permits/coastal-use-permit.pdf" class="doc-download" download>
                    Download PDF (1.1 MB)
                </a>
            </div>
        </div>

        <!-- Add more documents -->
    </div>
</div>
```

**Step 4: Add CSS for document cards**

Add to section styles:

```css
.document-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
    margin-top: 1.5rem;
}

.document-card {
    display: flex;
    gap: 1rem;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 8px;
    padding: 1.5rem;
    transition: all 0.3s ease;
}

.document-card:hover {
    background: rgba(255, 255, 255, 0.08);
    border-color: #64ffb4;
}

.doc-icon {
    font-size: 2.5rem;
    flex-shrink: 0;
}

.doc-info {
    flex: 1;
}

.doc-info h4 {
    color: #64ffb4;
    margin-bottom: 0.5rem;
    font-size: 1.1rem;
}

.doc-info p {
    color: rgba(255, 255, 255, 0.7);
    font-size: 0.9rem;
    margin-bottom: 1rem;
}

.doc-download {
    display: inline-block;
    padding: 0.5rem 1rem;
    background: #64ffb4;
    color: #0a0a0a;
    text-decoration: none;
    border-radius: 6px;
    font-size: 0.85rem;
    font-weight: 600;
    transition: all 0.3s ease;
}

.doc-download:hover {
    background: #7fffc4;
    transform: translateY(-2px);
}
```

**Step 5: Check file sizes**

GitHub has a 100 MB per-file limit. Check PDF sizes:

```bash
cd documents
dir /s
```

If any file is > 50 MB, consider:
- Compressing with Adobe Acrobat or online tools
- Splitting into multiple files
- Using Git LFS (Large File Storage)

---

### Option 3: Keep Current Setup (Recommended for Quick Deployment)

**Current status:**
- ✓ Images use placeholder.com (functional, no file uploads needed)
- ✓ Image gallery works with filters and lightbox
- ✓ Notice banner explains placeholders
- ✓ Maps configured (no files needed, uses ESRI API)
- ✓ Ready to deploy immediately

**Advantages:**
- Zero additional setup
- Smaller repository size
- Faster page load
- Can add media later without redeployment

**To deploy immediately:**
1. Run `deploy_port_sulphur.bat`
2. Wait 1-2 minutes for GitHub Pages build
3. Visit live site

---

## File Size Considerations

### Current report (without media):
```
port-sulphur-report.html:    593 KB
sections/ (17 files):        ~2.5 MB
data/ (17 files):            ~500 KB
visualizations/ (17 files):  ~1.2 MB
arcgis_config.js:            ~80 KB
-----------------------------------
Total:                       ~4.8 MB
```

### With images (estimated):
```
Historical photos (6):       ~3-5 MB
Aerial views (8):           ~5-8 MB
Regulatory maps (1):        ~1 MB
-----------------------------------
Additional:                  ~9-14 MB
New total:                   ~14-19 MB
```

### With documents (estimated):
```
Permits (3-5 PDFs):         ~10-20 MB
Environmental (3-5 PDFs):   ~15-30 MB
Engineering (2-4 PDFs):     ~20-40 MB
Financial (2-3 PDFs):       ~5-10 MB
Historical (1-2 PDFs):      ~2-5 MB
-----------------------------------
Additional:                  ~52-105 MB
New total:                   ~66-124 MB
```

**GitHub Pages limits:**
- Repository: 1 GB (soft limit)
- Per file: 100 MB (hard limit)
- Bandwidth: 100 GB/month

---

## Recommended Approach

**Phase 1: Deploy Core Report (Now)**
- Deploy report with placeholder images
- Maps work via ESRI API (no files needed)
- Get site live and functional
- Total size: ~5 MB

**Phase 2: Add Critical Images (Later)**
- Add 5-10 key images only
- Historical photos of facility
- Current satellite views
- Property boundary maps
- Total addition: ~5-10 MB

**Phase 3: Add Documents (As Needed)**
- Add public/non-confidential documents only
- Link from relevant sections
- Consider hosting large files elsewhere (Google Drive, Dropbox)
- Use "View Document" links instead of downloads

---

## Quick Deployment Checklist

- [x] Report assembled (593 KB)
- [x] 17 sections generated
- [x] Maps configured (ESRI API)
- [x] Charts configured (60+ visualizations)
- [x] History tab JavaScript fixed
- [x] Midstream standalone page created
- [x] Map initialization added
- [ ] Choose: Keep placeholders OR add real images
- [ ] Choose: Skip documents OR add PDFs
- [ ] Run deployment script
- [ ] Verify live site
- [ ] Link from index.html

**Ready to deploy:** Yes (with placeholder images, working maps)

---

## Commands Summary

```bash
# Deploy immediately (no media needed)
deploy_port_sulphur.bat

# Add images later
mkdir images\historical images\aerial images\regulatory
# Copy images
python assemble_report.py
git add projects/port-sulphur-report/images/
git commit -m "Add Port Sulphur images"
git push origin main

# Add documents later
mkdir documents\permits documents\environmental
# Copy PDFs
git add projects/port-sulphur-report/documents/
git commit -m "Add Port Sulphur documents"
git push origin main
```
