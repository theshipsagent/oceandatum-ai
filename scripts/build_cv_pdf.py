"""Build a white, Letter-size print PDF of the CV from cv.html (single source of content).

Usage (from the repo root):
    python3 scripts/build_cv_pdf.py                 # writes ~/Downloads/William_S_Davis_III_CV_<date>.pdf
    python3 scripts/build_cv_pdf.py path/to/out.pdf

Edit wording in cv.html only; this script restyles it as a clean white document
(solid black text, no transparency or blur effects) and prints it with headless Chrome.
"""
import re
import subprocess
import sys
import tempfile
from datetime import date
from pathlib import Path

SRC = Path(__file__).resolve().parent.parent / 'cv.html'
CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
PDF_OUT = Path(sys.argv[1]) if len(sys.argv) > 1 else Path.home() / 'Downloads' / f'William_S_Davis_III_CV_{date.today().isoformat()}.pdf'
OUT = Path(tempfile.mkdtemp()) / 'cv_print.html'

src = SRC.read_text()

name = re.search(r'<div class="cv-header">\s*<h1>(.*?)</h1>', src, re.S).group(1)
subtitle = re.search(r'<p class="cv-subtitle">(.*?)</p>', src, re.S).group(1)
contact = re.search(r'<div class="cv-contact">(.*?)</div>', src, re.S).group(1).strip()
body = re.search(r'<div class="cv-body">(.*?)</div>\s*<div class="site-footer">', src, re.S).group(1)

# Print tweaks: no horizontal rules (section headings carry their own rule),
# links render as plain black text.
body = re.sub(r'\s*<hr>\s*', '\n', body)
body = re.sub(r'<a href="[^"]*">(.*?)</a>', r'\1', body)
body = body.replace(' (see Role Brief)', '')
contact = re.sub(r'<a href="mailto:[^"]*">(.*?)</a>', r'\1', contact)
contact = re.sub(r'</?strong>', '', contact)

CSS = """
/* Static (non-variable) font files: Chrome embeds these as real fonts.
   The Google Fonts variable file gets embedded as Type 3, which renders soft/grey in Preview. */
@font-face { font-family: 'Space Grotesk'; font-weight: 400; font-style: normal; src: url('https://cdn.jsdelivr.net/npm/@fontsource/space-grotesk@5/files/space-grotesk-latin-400-normal.woff2') format('woff2'); }
@font-face { font-family: 'Space Grotesk'; font-weight: 500; font-style: normal; src: url('https://cdn.jsdelivr.net/npm/@fontsource/space-grotesk@5/files/space-grotesk-latin-500-normal.woff2') format('woff2'); }
@font-face { font-family: 'Space Grotesk'; font-weight: 700; font-style: normal; src: url('https://cdn.jsdelivr.net/npm/@fontsource/space-grotesk@5/files/space-grotesk-latin-700-normal.woff2') format('woff2'); }
@page { size: Letter; margin: 0.45in 0.55in 0.45in 0.55in; }
* { box-sizing: border-box; margin: 0; padding: 0; }
html { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
body {
  font-family: 'Space Grotesk', -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
  color: #111; background: #fff;
  font-size: 9.1pt; line-height: 1.26;
  -webkit-font-smoothing: antialiased;
}
header { text-align: center; padding-bottom: 6pt; border-bottom: 1.2pt solid #111; margin-bottom: 4pt; }
header h1 { font-size: 19pt; font-weight: 700; letter-spacing: 0.06em; }
header .subtitle { font-size: 10pt; color: #1d5c4a; font-weight: 500; margin-top: 1pt; }
header .contact { font-size: 9pt; color: #333; margin-top: 3pt; }

h2 {
  font-size: 9.8pt; font-weight: 700; text-transform: uppercase; letter-spacing: 0.09em;
  color: #111; border-bottom: 0.6pt solid #999; padding-bottom: 2pt;
  margin: 6pt 0 3pt; break-after: avoid;
}
h3, h4 { display: flex; justify-content: space-between; align-items: baseline; gap: 0 10pt; }
h3 { break-after: avoid; }
h3 { font-size: 9.6pt; font-weight: 700; margin-top: 4.5pt; }
h4 { font-size: 9.4pt; font-weight: 500; color: #222; margin-top: 1pt; }
.location, .dates { font-weight: 400; color: #444; font-size: 8.8pt; white-space: nowrap; }
h3 .former { font-weight: 400; color: #555; font-size: 8.6pt; margin-left: 5pt; }

p { margin-bottom: 3pt; color: #1a1a1a; }
p strong { font-weight: 700; color: #111; }
p.subhead { margin: 5pt 0 1.5pt; break-after: avoid; }
p.subhead strong { font-size: 8.6pt; text-transform: uppercase; letter-spacing: 0.07em; color: #1d5c4a; }
p.titles-held { font-size: 8.8pt; color: #333; margin-top: 3pt; }

ul { padding-left: 11pt; margin-bottom: 3pt; }
ul ul { margin: 1pt 0; }
li { margin-bottom: 0.6pt; color: #1a1a1a; break-inside: avoid; }
li::marker { color: #1d5c4a; }

.phases { margin: 2pt 0 2pt; }
.phase { display: grid; grid-template-columns: 62pt 1fr; gap: 0 6pt; color: #1a1a1a; }
.phase .dates { font-size: 8.8pt; }

.competencies-grid { display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 1pt 10pt; list-style: none; padding-left: 0; }
.competencies-grid li { font-size: 8.6pt; }
.two-column { columns: 3; column-gap: 12pt; list-style: none; padding-left: 0; }
.two-column li { font-size: 8.4pt; margin-bottom: 0.6pt; }
p.subhead + ul.two-column { columns: 2; list-style: disc; padding-left: 11pt; }
p.subhead + ul.two-column li { font-size: 8.8pt; }
h4 + ul.two-column { margin-top: 2pt; }
h4:not(:has(.dates)) { font-size: 8.6pt; text-transform: uppercase; letter-spacing: 0.07em; color: #1d5c4a; font-weight: 700; margin-top: 6pt; }
"""

html = f"""<!doctype html>
<html lang="en"><head><meta charset="utf-8">
<title>William S. Davis III — CV</title>

<style>{CSS}</style></head>
<body>
<header>
  <h1>{name}</h1>
  <div class="subtitle">{subtitle}</div>
  <div class="contact">{contact} | oceandatum.ai</div>
</header>
{body}
</body></html>"""

OUT.write_text(html)
subprocess.run([CHROME, '--headless=new', '--disable-gpu', '--no-pdf-header-footer',
                '--virtual-time-budget=5000', f'--print-to-pdf={PDF_OUT}', OUT.as_uri()],
               check=True, stderr=subprocess.DEVNULL)
print(PDF_OUT)
