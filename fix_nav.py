#!/usr/bin/env python3
"""Harmonize nav across all remaining oceandatum.ai pages."""
import re, os

BASE = '/private/tmp/oceandatum-ai'

# ── CSS injected before </head> for ALL pages that don't yet have hamburger ──
HAMBURGER_CSS = """
/* ── Standard Nav (hamburger + mobile menu) ── */
.navbar-link { font-size: 0.82rem; color: rgba(255,255,255,0.75); text-decoration: none;
  padding: 0.35rem 0.75rem; border: 1px solid rgba(255,255,255,0.15); border-radius: 6px;
  transition: all 0.3s; white-space: nowrap; }
.navbar-link:hover { color: #64ffb4; border-color: rgba(100,255,180,0.4); background: rgba(100,255,180,0.05); }
.social-icons { display: flex; gap: 0.5rem; align-items: center; }
.social-icon { font-size: 0.75rem; color: rgba(255,255,255,0.6); text-decoration: none;
  width: 28px; height: 28px; display: flex; align-items: center; justify-content: center;
  border: 1px solid rgba(255,255,255,0.2); border-radius: 50%; transition: all 0.3s; }
.social-icon:hover { color: #64ffb4; border-color: rgba(100,255,180,0.4); }
.hamburger-button { display: none; background: none; border: 1px solid rgba(255,255,255,0.2);
  border-radius: 6px; color: rgba(255,255,255,0.8); cursor: pointer;
  padding: 0.4rem 0.6rem; font-size: 1.1rem; line-height: 1; transition: all 0.3s; }
.hamburger-button:hover { border-color: #64ffb4; color: #64ffb4; background: rgba(100,255,180,0.05); }
.mobile-menu { display: none; max-height: 0; overflow: hidden;
  background: rgba(5,15,25,0.98); border-bottom: 1px solid rgba(100,255,180,0.15);
  position: fixed; top: 53px; left: 0; right: 0; z-index: 999; }
.mobile-menu.active { display: block; max-height: 500px; }
.mobile-menu-section { padding: 10px 0; }
.mobile-menu-item a { display: block; padding: 12px 24px; color: rgba(255,255,255,0.8);
  text-decoration: none; font-size: 0.9rem; border-bottom: 1px solid rgba(255,255,255,0.06); transition: all 0.2s; }
.mobile-menu-item a:hover { background: rgba(100,255,180,0.1); color: #64ffb4; padding-left: 30px; }
@media (max-width: 768px) {
  .hamburger-button { display: block; }
  .navbar-right .social-icons, .navbar-right .navbar-link { display: none; }
  .navbar-right { display: flex; gap: 0.5rem; }
  .navbar { padding: 0.6rem 1rem; }
}
"""

# Additional CSS for pages using .sn (which have no .navbar CSS at all)
NAVBAR_FULL_CSS = """
/* ── Standard Navbar ── */
.navbar { position: fixed; top: 0; left: 0; right: 0; background: rgba(0,0,0,0.5);
  backdrop-filter: blur(20px) saturate(180%); -webkit-backdrop-filter: blur(20px) saturate(180%);
  border-bottom: 1px solid rgba(255,255,255,0.12); padding: 0.8rem 2rem; z-index: 1000;
  display: flex; align-items: center; justify-content: space-between; font-family: 'Space Grotesk', sans-serif; }
.navbar-brand { font-size: 0.85rem; font-weight: 300; font-style: italic; color: rgba(255,255,255,0.7); }
.navbar-brand a { color: rgba(255,255,255,0.9); font-weight: 600; font-style: normal;
  text-decoration: none; transition: color 0.3s; }
.navbar-brand a:hover { color: #64ffb4; }
.navbar-right { display: flex; align-items: center; gap: 0.75rem; flex-wrap: wrap; }
"""

HAMBURGER_JS = """<script>
(function() {
  var btn = document.getElementById('hamburgerBtn');
  var menu = document.getElementById('mobileMenu');
  if (btn && menu) {
    btn.addEventListener('click', function(e) { e.stopPropagation(); menu.classList.toggle('active'); });
    document.addEventListener('click', function(e) {
      if (!menu.contains(e.target) && !btn.contains(e.target)) menu.classList.remove('active');
    });
  }
})();
</script>"""

LI_SVG = '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>'

def nav_html(p):
    return f"""<nav class="navbar">
    <span class="navbar-brand"></span>
    <div class="navbar-right">
        <button class="hamburger-button" id="hamburgerBtn" aria-label="Menu">&#9776;</button>
        <div class="social-icons">
            <a href="https://www.linkedin.com/in/williamsdavis/" target="_blank" class="social-icon" title="LinkedIn">{LI_SVG}</a>
        </div>
        <a href="{p}index.html" class="navbar-link">Home</a>
        <a href="https://whatsapp.com/channel/0029VbBE27p4IBhIrzjoRD36" target="_blank" class="navbar-link">News Feed</a>
        <a href="{p}posts.html" class="navbar-link">Blog</a>
        <a href="{p}tools/maritime-ai-role.html" class="navbar-link">Role Brief</a>
        <a href="{p}cv.html" class="navbar-link">CV</a>
        <a href="mailto:wsd@oceandatum.ai" class="navbar-link">Contact</a>
        <a href="{p}login.html" class="navbar-link">Projects</a>
    </div>
    <div class="mobile-menu" id="mobileMenu">
        <div class="mobile-menu-section">
            <div class="mobile-menu-item"><a href="{p}index.html">Home</a></div>
            <div class="mobile-menu-item"><a href="https://whatsapp.com/channel/0029VbBE27p4IBhIrzjoRD36" target="_blank">News Feed</a></div>
            <div class="mobile-menu-item"><a href="{p}posts.html">Blog</a></div>
            <div class="mobile-menu-item"><a href="{p}tools/maritime-ai-role.html">Role Brief</a></div>
            <div class="mobile-menu-item"><a href="{p}cv.html">CV</a></div>
            <div class="mobile-menu-item"><a href="mailto:wsd@oceandatum.ai">Contact</a></div>
            <div class="mobile-menu-item"><a href="{p}login.html">Projects</a></div>
        </div>
    </div>
</nav>"""

def inject_css_before_head_close(html, css):
    """Inject a <style> block just before </head>."""
    tag = f'<style>{css}</style>\n'
    return html.replace('</head>', tag + '</head>', 1)

def inject_js_before_body_close(html, js):
    """Inject JS just before </body>."""
    return html.replace('</body>', js + '\n</body>', 1)

def replace_sn_nav(html, prefix):
    """Replace <nav class="sn">...</nav> with standard nav."""
    pattern = re.compile(r'<nav class="sn">.*?</nav>', re.DOTALL)
    return pattern.sub(nav_html(prefix), html, count=1)

def replace_navbar_nav(html, prefix):
    """Replace <nav class="navbar">...</nav> with standard nav."""
    pattern = re.compile(r'<nav class="navbar">.*?</nav>', re.DOTALL)
    return pattern.sub(nav_html(prefix), html, count=1)

def already_done(html):
    """Check if page already has the full standard hamburger nav."""
    return 'hamburgerBtn' in html and 'mobileMenu' in html and 'News Feed' in html

def process_sn_page(filepath, prefix, add_body_padding=True):
    """Process a page that currently has .sn nav."""
    with open(filepath, 'r', encoding='utf-8') as f:
        html = f.read()
    if already_done(html):
        print(f'  SKIP (already done): {filepath}')
        return False
    if '<nav class="sn">' not in html:
        print(f'  SKIP (no .sn nav found): {filepath}')
        return False

    padding_css = '\nbody { padding-top: 56px; }\n' if add_body_padding else ''
    full_css = NAVBAR_FULL_CSS + HAMBURGER_CSS + padding_css

    html = inject_css_before_head_close(html, full_css)
    html = replace_sn_nav(html, prefix)
    html = inject_js_before_body_close(html, HAMBURGER_JS)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(html)
    print(f'  DONE (sn): {filepath}')
    return True

def process_navbar_page(filepath, prefix):
    """Process a page that has .navbar but no hamburger."""
    with open(filepath, 'r', encoding='utf-8') as f:
        html = f.read()
    if already_done(html):
        print(f'  SKIP (already done): {filepath}')
        return False
    if '<nav class="navbar">' not in html:
        print(f'  SKIP (no .navbar found): {filepath}')
        return False

    html = inject_css_before_head_close(html, HAMBURGER_CSS)
    html = replace_navbar_nav(html, prefix)
    html = inject_js_before_body_close(html, HAMBURGER_JS)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(html)
    print(f'  DONE (navbar): {filepath}')
    return True

def p(rel):
    return os.path.join(BASE, rel)

print("=== Processing .sn nav pages (prefix ../) ===")
sn_one_deep = [
    'projects/construction-materials.html',
    'projects/inland-waterway-platform.html',
    'projects/maritime-voyage-analysis.html',
    'projects/plaquemines-pipeline-report.html',
    'projects/sesco-supply-chain.html',
    'projects/mile-76-port-development.html',
    'projects/egyptian-fertilizer-us-market.html',
    'projects/plaquemines-parish-workforce.html',
    'projects/tampa-cement.html',
    'tools/sedna-analysis.html',
    'tools/think-tank.html',
    'tools/usace-permits.html',
    'tools/value-tracker.html',
    'tools/barge-fleet-analysis.html',
    'tools/lower-miss-river-map.html',
]
for rel in sn_one_deep:
    process_sn_page(p(rel), '../')

print("\n=== Processing .navbar pages (prefix ../) ===")
navbar_one_deep = [
    'projects/port-sulphur.html',
    'projects/port-sulphur-midstream.html',
    'projects/masters-defense.html',
    'projects/class1-railroad-corridors.html',
    'projects/ship-agency-strategy-v2.html',
    'projects/us-thermal-coal-india.html',
]
for rel in navbar_one_deep:
    process_navbar_page(p(rel), '../')

print("\n=== Processing .navbar pages (prefix ../../) ===")
navbar_two_deep = [
    'projects/rail-analytics/index.html',
    'projects/rail-analytics/cement-costing.html',
    'projects/rail-analytics/gateway-issues.html',
    'projects/rail-analytics/geospatial.html',
    'projects/rail-analytics/markets-routing.html',
    'projects/rail-analytics/merger-analysis.html',
    'projects/rail-analytics/network-model.html',
    'projects/rail-analytics/nola-gateway.html',
    'projects/rail-analytics/waybill-flows.html',
    'projects/ship-agency-ai/buy-vs-build-reality.html',
    'projects/ship-agency-ai/why-you-cant-buy-this.html',
    'projects/ship-agency-ai/autonomous-ship-agency-platform.html',
    'projects/ship-agency-ai/sedna-analysis.html',
]
for rel in navbar_two_deep:
    process_navbar_page(p(rel), '../../')

print("\n=== Processing port-sulphur-report (prefix ../../) ===")
process_navbar_page(p('projects/port-sulphur-report/port-sulphur-report.html'), '../../')

print("\n=== Processing tools .navbar pages (prefix ../) ===")
navbar_tools = [
    'tools/bibliography.html',
    'tools/data-sources.html',
]
for rel in navbar_tools:
    process_navbar_page(p(rel), '../')

print("\nDone.")
