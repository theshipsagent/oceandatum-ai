#!/usr/bin/env python3
"""
Add ESRI ArcGIS map initialization script to port-sulphur-report.html

This script adds JavaScript to initialize maps on page load for sections that have map containers.
"""

import os
from pathlib import Path

# Base directory
BASE_DIR = Path(__file__).parent
REPORT_FILE = BASE_DIR / "port-sulphur-report.html"

# Map initialization JavaScript to add
MAP_INIT_SCRIPT = """
    <!-- Map Initialization Script -->
    <script>
    // Initialize ESRI ArcGIS maps after page load
    document.addEventListener('DOMContentLoaded', function() {
        // Wait for ESRI API to load
        setTimeout(function() {
            // Environmental map
            const envMap = document.getElementById('environmental-map');
            if (envMap && typeof initializePortSulphurMap === 'function') {
                initializePortSulphurMap('environmental-map', {
                    layers: ['terminal', 'environmental', 'bathymetry'],
                    zoom: 14
                }).catch(err => console.error('Environmental map initialization failed:', err));
            }

            // Navigation map
            const navMap = document.getElementById('navigation-map');
            if (navMap && typeof initializePortSulphurMap === 'function') {
                initializePortSulphurMap('navigation-map', {
                    layers: ['terminal', 'navigation', 'bathymetry'],
                    zoom: 13
                }).catch(err => console.error('Navigation map initialization failed:', err));
            }

            // Infrastructure map
            const infraMap = document.getElementById('infrastructure-map');
            if (infraMap && typeof initializePortSulphurMap === 'function') {
                initializePortSulphurMap('infrastructure-map', {
                    layers: ['terminal', 'infrastructure', 'property'],
                    zoom: 14
                }).catch(err => console.error('Infrastructure map initialization failed:', err));
            }

            // Property map
            const propMap = document.getElementById('property-map');
            if (propMap && typeof initializePortSulphurMap === 'function') {
                initializePortSulphurMap('property-map', {
                    layers: ['terminal', 'property'],
                    zoom: 15
                }).catch(err => console.error('Property map initialization failed:', err));
            }
        }, 2000); // Wait 2 seconds for ESRI API to fully load
    });
    </script>
"""

def add_map_initialization():
    """Add map initialization script before </body> tag"""

    if not REPORT_FILE.exists():
        print(f"Error: {REPORT_FILE} not found")
        return False

    # Read the file
    with open(REPORT_FILE, 'r', encoding='utf-8') as f:
        content = f.read()

    # Check if already added
    if "Map Initialization Script" in content:
        print("Map initialization script already present in report")
        return True

    # Find the </body> tag and insert before it
    body_close_pos = content.rfind('</body>')
    if body_close_pos == -1:
        print("Error: Could not find </body> tag")
        return False

    # Insert the script
    new_content = content[:body_close_pos] + MAP_INIT_SCRIPT + '\n' + content[body_close_pos:]

    # Write back
    with open(REPORT_FILE, 'w', encoding='utf-8') as f:
        f.write(new_content)

    print(f"✓ Map initialization script added to {REPORT_FILE}")
    print(f"  Maps will initialize 2 seconds after page load")
    print(f"  Total file size: {len(new_content) / 1024:.1f} KB")
    return True

if __name__ == "__main__":
    add_map_initialization()
