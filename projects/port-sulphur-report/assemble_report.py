#!/usr/bin/env python3
"""
Port Sulphur Report Assembly Script
Combines all 17 section HTML files into a single complete report
"""

import os
from pathlib import Path

# Base directory
BASE_DIR = Path(__file__).parent
SECTIONS_DIR = BASE_DIR / "sections"
OUTPUT_FILE = BASE_DIR / "port-sulphur-report.html"

# Section files in order
SECTIONS = [
    "executive_summary_section.html",
    "environmental_section.html",
    "navigation_section.html",
    "infrastructure_section.html",
    "weather_section.html",
    "property_section.html",
    "images_section.html",
    "market_section.html",
    "mid_stream_section.html",
    "history_section.html",
    "econometrics_section.html",
    "capex_section.html",
    "permitting_section.html",
    "due_diligence_section.html",
    "engineering_section.html",
    "geospatial_section.html",
    "permits_section.html"
]

# Tab configuration
TABS = [
    {"id": "executive", "label": "Executive Summary"},
    {"id": "environmental", "label": "Environmental"},
    {"id": "navigation", "label": "Navigation"},
    {"id": "infrastructure", "label": "Infrastructure"},
    {"id": "weather", "label": "Weather"},
    {"id": "property", "label": "Property"},
    {"id": "images", "label": "Images"},
    {"id": "market", "label": "Market"},
    {"id": "midstream", "label": "Midstream"},
    {"id": "history", "label": "History"},
    {"id": "econometrics", "label": "Financial"},
    {"id": "capex", "label": "CAPEX"},
    {"id": "permitting", "label": "Permitting"},
    {"id": "due-diligence", "label": "Due Diligence"},
    {"id": "engineering", "label": "Engineering"},
    {"id": "geospatial", "label": "Geospatial"},
    {"id": "permits", "label": "Permits"}
]

HTML_HEAD = """<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Port Sulphur Terminal - Comprehensive Analysis of 106.99-Acre Deep-Water Industrial Site at Mississippi River Mile 39">
    <title>Port Sulphur Terminal | Comprehensive Analysis</title>

    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;600;700&display=swap" rel="stylesheet">

    <!-- Chart.js -->
    <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js"></script>

    <!-- Cloudflare Web Analytics -->
    <script defer src='https://static.cloudflareinsights.com/beacon.min.js' data-cf-beacon='{"token": "5169a56446ff4380ad2f1785a86804b8"}'></script>

    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Space Grotesk', -apple-system, BlinkMacSystemFont, sans-serif;
            background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%);
            color: #fff;
            line-height: 1.6;
        }

        /* Navigation */
        .navbar {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            background: rgba(0,0,0,0.8);
            backdrop-filter: blur(20px) saturate(180%);
            border-bottom: 1px solid rgba(255,255,255,0.15);
            padding: 1rem 2rem;
            z-index: 1000;
        }

        .navbar-content {
            max-width: 1400px;
            margin: 0 auto;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }

        .navbar-brand {
            font-size: 1.2rem;
            font-weight: 600;
            color: #fff;
        }

        /* Tab Navigation */
        .tab-nav {
            position: sticky;
            top: 60px;
            background: rgba(0,0,0,0.9);
            border-bottom: 1px solid rgba(255,255,255,0.2);
            z-index: 100;
            overflow-x: auto;
            display: flex;
            padding: 0 1rem;
        }

        .tab-button {
            padding: 1rem 1.5rem;
            background: none;
            border: none;
            color: rgba(255,255,255,0.7);
            cursor: pointer;
            font-family: 'Space Grotesk', sans-serif;
            font-size: 0.9rem;
            transition: all 0.3s ease;
            white-space: nowrap;
            border-bottom: 2px solid transparent;
        }

        .tab-button:hover {
            color: #fff;
            background: rgba(255,255,255,0.05);
        }

        .tab-button.active {
            color: #64ffb4;
            border-bottom-color: #64ffb4;
        }

        /* Content */
        .content {
            padding-top: 120px;
            max-width: 1400px;
            margin: 0 auto;
            padding-left: 2rem;
            padding-right: 2rem;
            padding-bottom: 4rem;
        }

        .tab-content {
            display: none;
        }

        .tab-content.active {
            display: block;
        }

        /* Mobile */
        @media (max-width: 768px) {
            .tab-button {
                padding: 0.8rem 1rem;
                font-size: 0.85rem;
            }
            .content {
                padding-left: 1rem;
                padding-right: 1rem;
            }
        }
    </style>
</head>
<body>
    <!-- Navbar -->
    <nav class="navbar">
        <div class="navbar-content">
            <div class="navbar-brand">Port Sulphur Terminal Analysis</div>
        </div>
    </nav>

    <!-- Tab Navigation -->
    <div class="tab-nav">
"""

def generate_tab_buttons():
    """Generate tab button HTML"""
    buttons = []
    for i, tab in enumerate(TABS):
        active_class = " active" if i == 0 else ""
        buttons.append(f'        <button class="tab-button{active_class}" onclick="showTab(\'{tab["id"]}\')">{tab["label"]}</button>')
    return "\n".join(buttons)

HTML_CONTENT_START = """    </div>

    <!-- Main Content -->
    <div class="content">
"""

HTML_FOOTER = """    </div>

    <!-- Visualization Scripts -->
    <script src="visualizations/environmental_charts.js"></script>
    <script src="visualizations/navigation_charts.js"></script>
    <script src="visualizations/infrastructure_charts.js"></script>
    <script src="visualizations/weather_charts.js"></script>
    <script src="visualizations/property_charts.js"></script>
    <script src="visualizations/images_gallery.js"></script>
    <script src="visualizations/market_charts.js"></script>
    <script src="visualizations/mid_stream_charts.js"></script>
    <script src="visualizations/history_timeline.js"></script>
    <script src="visualizations/econometrics_charts.js"></script>
    <script src="visualizations/capex_charts.js"></script>
    <script src="visualizations/permitting_charts.js"></script>
    <script src="visualizations/due_diligence_charts.js"></script>
    <script src="visualizations/executive_summary_charts.js"></script>
    <script src="visualizations/engineering_charts.js"></script>
    <script src="visualizations/geospatial_charts.js"></script>
    <script src="visualizations/permits_charts.js"></script>

    <!-- Navigation Script -->
    <script>
        function showTab(tabId) {
            // Hide all tabs
            document.querySelectorAll('.tab-content').forEach(tab => {
                tab.classList.remove('active');
            });

            // Show selected tab
            const selectedTab = document.getElementById(tabId);
            if (selectedTab) {
                selectedTab.classList.add('active');
            }

            // Update button states
            document.querySelectorAll('.tab-button').forEach(button => {
                button.classList.remove('active');
            });
            event.target.classList.add('active');

            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    </script>
</body>
</html>
"""

def read_section_file(filename):
    """Read a section HTML file"""
    filepath = SECTIONS_DIR / filename
    if not filepath.exists():
        print(f"Warning: {filename} not found")
        return ""

    with open(filepath, 'r', encoding='utf-8') as f:
        return f.read()

def wrap_section_content(content, tab_id, is_first=False):
    """Wrap section content in tab-content div"""
    active_class = " active" if is_first else ""
    return f'<div id="{tab_id}" class="tab-content{active_class}">\n{content}\n</div>\n\n'

def main():
    print("Assembling Port Sulphur Report...")

    # Start building the complete HTML
    html_parts = [HTML_HEAD]
    html_parts.append(generate_tab_buttons())
    html_parts.append(HTML_CONTENT_START)

    # Read and add each section
    for i, (section_file, tab) in enumerate(zip(SECTIONS, TABS)):
        print(f"Reading {section_file}...")
        content = read_section_file(section_file)
        if content:
            wrapped_content = wrap_section_content(content, tab["id"], i == 0)
            html_parts.append(wrapped_content)

    # Add footer
    html_parts.append(HTML_FOOTER)

    # Write the complete file
    print(f"Writing complete report to {OUTPUT_FILE}...")
    with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
        f.write(''.join(html_parts))

    print(f"✓ Complete! Report generated: {OUTPUT_FILE}")
    print(f"  Total size: {OUTPUT_FILE.stat().st_size / 1024:.1f} KB")

if __name__ == "__main__":
    main()
