/* oceandatum.ai — shared map background (basemap) tiles
   Replaces CARTO basemaps, which began returning "API KEY REQUIRED" tiles in 2026-09.
   Uses Esri's Light / Dark Gray Canvas: no API key, attribution required.

   Usage (Leaflet must be loaded before the call, not before this file):
       odEsri('Light', { maxZoom: 19 }).addTo(map);
       odEsri('Dark',  { maxZoom: 18 });
   Returns an ordinary L.tileLayer, so addTo / removeLayer / layer controls all work.
   The matching label layer (city names etc.) is added and removed with it automatically. */
(function () {
    var ROOT = 'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_';
    var ATTR = 'Tiles &copy; <a href="https://www.esri.com/">Esri</a> &mdash; Esri, HERE, Garmin, &copy; OpenStreetMap contributors';

    window.odEsri = function (kind, options) {
        kind = (kind === 'Dark') ? 'Dark' : 'Light';
        var opts = Object.assign({}, options || {});
        delete opts.subdomains;
        opts.attribution = ATTR;
        opts.maxNativeZoom = 16;          // Esri canvas tiles stop at zoom 16; Leaflet scales beyond that
        if (!opts.maxZoom) opts.maxZoom = 19;

        var base = L.tileLayer(ROOT + kind + '_Gray_Base/MapServer/tile/{z}/{y}/{x}', opts);
        var labels = L.tileLayer(ROOT + kind + '_Gray_Reference/MapServer/tile/{z}/{y}/{x}', {
            maxNativeZoom: 16,
            maxZoom: opts.maxZoom,
            zIndex: 10                    // above the base tiles, below zones and markers
        });

        base.on('add', function () { if (base._map) labels.addTo(base._map); });
        base.on('remove', function () { labels.remove(); });
        return base;
    };
})();
