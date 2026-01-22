/**
 * ========================================
 * PORT SULPHUR TERMINAL - ARCGIS MAP CONFIGURATION
 * ========================================
 *
 * Interactive mapping for Port Sulphur Terminal analysis using ArcGIS JavaScript API v4.28
 *
 * This configuration loads and displays multiple geographic layers:
 * - Terminal location and property boundaries
 * - Bathymetry (depth contours and zones)
 * - Navigation channels and aids
 * - Environmental contamination sites and flood zones
 * - Regional infrastructure (facilities, pipelines, rail)
 *
 * Data Sources:
 * - T. Baker Smith Bathymetric Survey (May 2016)
 * - LDEQ Environmental Records
 * - USACE Navigation Charts
 * - Infrastructure Synthesis Data
 *
 * Compatible with: ArcGIS JavaScript API v4.28
 * No API key required for public layers
 *
 * @author Port Sulphur Terminal Analysis Team
 * @version 1.0.0
 * @date 2026-01-22
 */

(function() {
  'use strict';

  /**
   * Main initialization function
   * Call this function with a container element ID to initialize the map
   *
   * @param {string} containerId - DOM element ID for map container
   * @param {Object} options - Configuration options
   * @returns {Promise<Object>} Resolves with {map, view, layers} when loaded
   */
  window.initializePortSulphurMap = function(containerId, options = {}) {
    return new Promise((resolve, reject) => {
      // Require ArcGIS modules
      require([
        "esri/Map",
        "esri/views/MapView",
        "esri/layers/FeatureLayer",
        "esri/layers/GraphicsLayer",
        "esri/Graphic",
        "esri/widgets/Legend",
        "esri/widgets/LayerList",
        "esri/widgets/BasemapGallery",
        "esri/widgets/Expand",
        "esri/widgets/Measurement",
        "esri/widgets/Search",
        "esri/widgets/Compass",
        "esri/widgets/ScaleBar",
        "esri/PopupTemplate",
        "esri/symbols/SimpleMarkerSymbol",
        "esri/symbols/SimpleLineSymbol",
        "esri/symbols/SimpleFillSymbol"
      ], function(
        Map, MapView, FeatureLayer, GraphicsLayer, Graphic,
        Legend, LayerList, BasemapGallery, Expand, Measurement, Search, Compass, ScaleBar,
        PopupTemplate, SimpleMarkerSymbol, SimpleLineSymbol, SimpleFillSymbol
      ) {

        try {
          // ===================================
          // CONFIGURATION
          // ===================================
          const config = {
            center: options.center || [-89.686632, 29.473414], // Port Sulphur Terminal
            zoom: options.zoom || 14,
            basemap: options.basemap || "satellite",
            showWidgets: options.showWidgets !== false,
            showLayerToggle: options.showLayerToggle !== false
          };

          // ===================================
          // CREATE MAP AND VIEW
          // ===================================
          const map = new Map({
            basemap: config.basemap
          });

          const view = new MapView({
            container: containerId,
            map: map,
            center: config.center,
            zoom: config.zoom,
            constraints: {
              minZoom: 10,
              maxZoom: 18
            },
            popup: {
              dockEnabled: true,
              dockOptions: {
                buttonEnabled: false,
                breakpoint: false,
                position: "bottom-right"
              }
            }
          });

          // Loading indicator
          view.when(() => {
            console.log("Port Sulphur map initialized successfully");
          }).catch(error => {
            console.error("Map initialization error:", error);
            reject(error);
          });

          // ===================================
          // LAYER 1: TERMINAL LOCATION POINT
          // ===================================
          const terminalLocationLayer = new GraphicsLayer({
            id: "terminal-location",
            title: "Port Sulphur Terminal",
            visible: true,
            listMode: "show"
          });

          const terminalPoint = new Graphic({
            geometry: {
              type: "point",
              longitude: -89.686632,
              latitude: 29.473414
            },
            symbol: {
              type: "simple-marker",
              color: [255, 87, 34, 1], // Deep orange
              size: 18,
              outline: {
                color: [255, 255, 255, 1],
                width: 3
              }
            },
            attributes: {
              name: "Port Sulphur Terminal",
              address: "28310 Highway 23, Port Sulphur, LA 70083",
              area_acres: 106.99,
              river_mile: 39,
              river_frontage_ft: 10693,
              draft_ft: 52,
              bank: "West Bank",
              status: "Available for Development"
            },
            popupTemplate: {
              title: "<b>{name}</b>",
              content: `
                <div style="font-family: Arial, sans-serif;">
                  <table style="width: 100%; font-size: 0.9rem;">
                    <tr><td><b>Address:</b></td><td>{address}</td></tr>
                    <tr><td><b>Total Area:</b></td><td>{area_acres} acres</td></tr>
                    <tr><td><b>River Frontage:</b></td><td>{river_frontage_ft:NumberFormat} linear feet</td></tr>
                    <tr><td><b>River Mile:</b></td><td>RM {river_mile}</td></tr>
                    <tr><td><b>Channel Draft:</b></td><td>{draft_ft} feet</td></tr>
                    <tr><td><b>Bank Position:</b></td><td>{bank}</td></tr>
                    <tr><td><b>Status:</b></td><td>{status}</td></tr>
                  </table>
                  <div style="margin-top: 10px; padding: 10px; background: #e3f2fd; border-radius: 4px;">
                    <b>Key Advantages:</b>
                    <ul style="margin: 5px 0; padding-left: 20px; font-size: 0.85rem;">
                      <li>Exceptional 52-foot natural draft</li>
                      <li>Over 2 miles of river frontage</li>
                      <li>Direct federal channel access</li>
                      <li>39 miles to Gulf of Mexico</li>
                    </ul>
                  </div>
                </div>
              `
            }
          });

          terminalLocationLayer.add(terminalPoint);
          map.add(terminalLocationLayer);

          // ===================================
          // LAYER 2: BATHYMETRY (DEPTH ZONES)
          // ===================================
          const bathymetryLayer = new FeatureLayer({
            id: "bathymetry",
            title: "Bathymetry & Depth Zones",
            visible: true,
            source: [
              // Near-Shore Transition Zone (0 to -20 feet)
              {
                geometry: {
                  type: "polygon",
                  rings: [[
                    [-89.694, 29.466],
                    [-89.695, 29.466],
                    [-89.695, 29.465],
                    [-89.694, 29.465],
                    [-89.694, 29.466]
                  ]]
                },
                attributes: {
                  zone_name: "Near-Shore Transition Zone",
                  depth_from: 0,
                  depth_to: -20,
                  depth_range: "0 to -20 feet",
                  vessel_access: "Limited draft",
                  color_zone: "shallow"
                }
              },
              // Primary Docking Zone (-20 to -60 feet)
              {
                geometry: {
                  type: "polygon",
                  rings: [[
                    [-89.6945, 29.466],
                    [-89.6955, 29.466],
                    [-89.6955, 29.464],
                    [-89.6945, 29.464],
                    [-89.6945, 29.466]
                  ]]
                },
                attributes: {
                  zone_name: "Primary Docking Zone",
                  depth_from: -20,
                  depth_to: -60,
                  depth_range: "-20 to -60 feet",
                  vessel_access: "Medium-draft vessels",
                  color_zone: "medium"
                }
              },
              // Deep Navigation Channel (-60 to -120 feet)
              {
                geometry: {
                  type: "polygon",
                  rings: [[
                    [-89.695, 29.467],
                    [-89.696, 29.467],
                    [-89.696, 29.463],
                    [-89.695, 29.463],
                    [-89.695, 29.467]
                  ]]
                },
                attributes: {
                  zone_name: "Deep Navigation Channel",
                  depth_from: -60,
                  depth_to: -120,
                  depth_range: "-60 to -120 feet",
                  vessel_access: "Panamax and larger vessels",
                  color_zone: "deep"
                }
              }
            ],
            fields: [
              { name: "ObjectID", type: "oid" },
              { name: "zone_name", type: "string" },
              { name: "depth_from", type: "integer" },
              { name: "depth_to", type: "integer" },
              { name: "depth_range", type: "string" },
              { name: "vessel_access", type: "string" },
              { name: "color_zone", type: "string" }
            ],
            objectIdField: "ObjectID",
            geometryType: "polygon",
            renderer: {
              type: "unique-value",
              field: "color_zone",
              uniqueValueInfos: [
                {
                  value: "shallow",
                  symbol: {
                    type: "simple-fill",
                    color: [144, 238, 144, 0.3], // Light green
                    outline: {
                      color: [76, 175, 80],
                      width: 1.5
                    }
                  },
                  label: "Shallow (0 to -20 ft)"
                },
                {
                  value: "medium",
                  symbol: {
                    type: "simple-fill",
                    color: [30, 136, 229, 0.4], // Blue
                    outline: {
                      color: [25, 118, 210],
                      width: 1.5
                    }
                  },
                  label: "Primary Docking (-20 to -60 ft)"
                },
                {
                  value: "deep",
                  symbol: {
                    type: "simple-fill",
                    color: [13, 71, 161, 0.5], // Dark blue
                    outline: {
                      color: [13, 71, 161],
                      width: 2
                    }
                  },
                  label: "Deep Channel (-60 to -120 ft)"
                }
              ]
            },
            popupTemplate: {
              title: "<b>{zone_name}</b>",
              content: `
                <div style="font-family: Arial, sans-serif;">
                  <p><b>Depth Range:</b> {depth_range}</p>
                  <p><b>Vessel Access:</b> {vessel_access}</p>
                  <div style="margin-top: 10px; padding: 8px; background: #f5f5f5; border-radius: 4px; font-size: 0.85rem;">
                    Survey Date: May 18, 2016<br>
                    Surveyor: T. Baker Smith, LLC<br>
                    Equipment: Multi-beam Echo-sounder<br>
                    Datum: NAVD 88
                  </div>
                </div>
              `
            }
          });

          map.add(bathymetryLayer);

          // ===================================
          // LAYER 3: NAVIGATION CHANNELS & AIDS
          // ===================================
          const navigationLayer = new FeatureLayer({
            id: "navigation",
            title: "Navigation Channels & Aids",
            visible: true,
            source: [
              // Federal Navigation Channel
              {
                geometry: {
                  type: "polyline",
                  paths: [[
                    [-89.695, 29.470],
                    [-89.695, 29.468],
                    [-89.695, 29.466],
                    [-89.695, 29.464],
                    [-89.695, 29.462],
                    [-89.695, 29.460]
                  ]]
                },
                attributes: {
                  name: "Federal Navigation Channel Centerline",
                  river_mile_start: 39.7,
                  river_mile_end: 37.5,
                  maintained_depth: 45,
                  typical_depth: 90,
                  feature_type: "channel"
                }
              },
              // Navigation Aids
              {
                geometry: {
                  type: "point",
                  longitude: -89.695,
                  latitude: 29.468
                },
                attributes: {
                  name: "Nestor Canal Light",
                  aid_type: "Light",
                  river_mile: 39.8,
                  feature_type: "aid"
                }
              },
              {
                geometry: {
                  type: "point",
                  longitude: -89.695,
                  latitude: 29.467
                },
                attributes: {
                  name: "Port Sulphur Anchorage Upper Daybeacon",
                  aid_type: "Daybeacon",
                  river_mile: 39.7,
                  feature_type: "aid"
                }
              },
              {
                geometry: {
                  type: "point",
                  longitude: -89.695,
                  latitude: 29.463
                },
                attributes: {
                  name: "Port Sulphur Anchorage Lower Daybeacon",
                  aid_type: "Daybeacon",
                  river_mile: 37.5,
                  feature_type: "aid"
                }
              }
            ],
            fields: [
              { name: "ObjectID", type: "oid" },
              { name: "name", type: "string" },
              { name: "river_mile", type: "double" },
              { name: "feature_type", type: "string" },
              { name: "aid_type", type: "string" },
              { name: "maintained_depth", type: "integer" },
              { name: "typical_depth", type: "integer" }
            ],
            objectIdField: "ObjectID",
            geometryType: "polyline",
            renderer: {
              type: "unique-value",
              field: "feature_type",
              uniqueValueInfos: [
                {
                  value: "channel",
                  symbol: {
                    type: "simple-line",
                    color: [0, 188, 212, 1], // Cyan
                    width: 3,
                    style: "solid"
                  },
                  label: "Navigation Channel"
                },
                {
                  value: "aid",
                  symbol: {
                    type: "simple-marker",
                    color: [255, 235, 59, 1], // Yellow
                    size: 10,
                    style: "diamond",
                    outline: {
                      color: [33, 33, 33],
                      width: 2
                    }
                  },
                  label: "Navigation Aids"
                }
              ]
            },
            popupTemplate: {
              title: "<b>{name}</b>",
              content: function(feature) {
                const attrs = feature.graphic.attributes;
                if (attrs.feature_type === "channel") {
                  return `
                    <div style="font-family: Arial, sans-serif;">
                      <p><b>River Mile Range:</b> RM ${attrs.river_mile_start} - ${attrs.river_mile_end}</p>
                      <p><b>Maintained Depth:</b> ${attrs.maintained_depth} feet (USACE)</p>
                      <p><b>Typical Depth:</b> ${attrs.typical_depth} feet</p>
                      <p style="margin-top: 8px; font-size: 0.85rem; color: #666;">
                        Two-way large vessel traffic capable
                      </p>
                    </div>
                  `;
                } else {
                  return `
                    <div style="font-family: Arial, sans-serif;">
                      <p><b>Type:</b> ${attrs.aid_type}</p>
                      <p><b>River Mile:</b> RM ${attrs.river_mile}</p>
                      <p style="margin-top: 8px; font-size: 0.85rem; color: #666;">
                        USCG-maintained navigation aid
                      </p>
                    </div>
                  `;
                }
              }
            }
          });

          map.add(navigationLayer);

          // ===================================
          // LAYER 4: ENVIRONMENTAL ZONES
          // ===================================
          const environmentalLayer = new FeatureLayer({
            id: "environmental",
            title: "Environmental Concerns",
            visible: true,
            source: [
              // Facility Location (contamination center)
              {
                geometry: {
                  type: "point",
                  longitude: -89.686632,
                  latitude: 29.473414
                },
                attributes: {
                  name: "Former Freeport-McMoRan Facility",
                  site_id: "FRS-110022408321",
                  operations_period: "1933-2005",
                  concern_level: "High",
                  primary_contaminants: "Elemental sulfur, acidic soil, heavy metals",
                  status: "Remediated - EPA oversight",
                  feature_type: "superfund"
                }
              },
              // 2009 Contamination Impact Zone
              {
                geometry: {
                  type: "point",
                  longitude: -89.686632,
                  latitude: 29.473414
                },
                attributes: {
                  name: "2009 Acidic Water Release Site",
                  incident_date: "April 27, 2009",
                  contaminant: "Low pH water (pH 1.7-1.73)",
                  downstream_extent: "1.5 miles",
                  concern_level: "Medium",
                  status: "Remediated June 2009",
                  feature_type: "incident"
                }
              },
              // Diesel Release Area
              {
                geometry: {
                  type: "point",
                  longitude: -89.687,
                  latitude: 29.474
                },
                attributes: {
                  name: "Diesel Release Site (2016)",
                  discovery_date: "July 18, 2016",
                  contaminants: "Diesel hydrocarbons, lead, arsenic",
                  concern_level: "Medium",
                  status: "No Further Action (limited areas)",
                  feature_type: "contamination"
                }
              },
              // Hurricane Katrina Flood Zone
              {
                geometry: {
                  type: "polygon",
                  rings: [[
                    [-89.700, 29.485],
                    [-89.673, 29.485],
                    [-89.673, 29.460],
                    [-89.700, 29.460],
                    [-89.700, 29.485]
                  ]]
                },
                attributes: {
                  name: "Hurricane Katrina Flood Extent (2005)",
                  event_date: "August 29, 2005",
                  flood_depth: 22,
                  base_elevation: 8,
                  concern_level: "Critical",
                  feature_type: "flood"
                }
              }
            ],
            fields: [
              { name: "ObjectID", type: "oid" },
              { name: "name", type: "string" },
              { name: "concern_level", type: "string" },
              { name: "status", type: "string" },
              { name: "feature_type", type: "string" },
              { name: "contaminant", type: "string" },
              { name: "flood_depth", type: "integer" }
            ],
            objectIdField: "ObjectID",
            renderer: {
              type: "unique-value",
              field: "concern_level",
              uniqueValueInfos: [
                {
                  value: "Critical",
                  symbol: {
                    type: "simple-fill",
                    color: [244, 67, 54, 0.2], // Red
                    outline: {
                      color: [198, 40, 40],
                      width: 2
                    }
                  },
                  label: "Critical Concern"
                },
                {
                  value: "High",
                  symbol: {
                    type: "simple-marker",
                    color: [244, 67, 54, 0.9], // Red
                    size: 14,
                    style: "x",
                    outline: {
                      color: [255, 255, 255],
                      width: 2
                    }
                  },
                  label: "High Concern"
                },
                {
                  value: "Medium",
                  symbol: {
                    type: "simple-marker",
                    color: [255, 152, 0, 0.9], // Orange
                    size: 12,
                    style: "circle",
                    outline: {
                      color: [255, 255, 255],
                      width: 2
                    }
                  },
                  label: "Medium Concern"
                }
              ]
            },
            popupTemplate: {
              title: "<b>{name}</b>",
              content: function(feature) {
                const attrs = feature.graphic.attributes;
                let content = `<div style="font-family: Arial, sans-serif;">`;

                if (attrs.feature_type === "flood") {
                  content += `
                    <p><b>Event Date:</b> ${attrs.event_date}</p>
                    <p><b>Flood Depth:</b> ${attrs.flood_depth} feet</p>
                    <p><b>Base Elevation:</b> ${attrs.base_elevation} feet</p>
                    <div style="margin-top: 10px; padding: 10px; background: #ffebee; border-radius: 4px;">
                      <b>Impact:</b> Catastrophic flooding, complete destruction of structures
                    </div>
                  `;
                } else if (attrs.feature_type === "superfund") {
                  content += `
                    <p><b>Operations:</b> ${attrs.operations_period}</p>
                    <p><b>Site ID:</b> ${attrs.site_id}</p>
                    <p><b>Contaminants:</b> ${attrs.primary_contaminants}</p>
                    <p><b>Status:</b> ${attrs.status}</p>
                    <div style="margin-top: 10px; padding: 10px; background: #fff3e0; border-radius: 4px; font-size: 0.85rem;">
                      <b>Note:</b> EPA Non-NPL Superfund site with ongoing oversight
                    </div>
                  `;
                } else {
                  content += `
                    <p><b>Concern Level:</b> ${attrs.concern_level}</p>
                    <p><b>Status:</b> ${attrs.status}</p>
                    ${attrs.contaminant ? `<p><b>Contaminant:</b> ${attrs.contaminant}</p>` : ''}
                  `;
                }

                content += `</div>`;
                return content;
              }
            }
          });

          map.add(environmentalLayer);

          // ===================================
          // LAYER 5: INFRASTRUCTURE POINTS
          // ===================================
          const infrastructureLayer = new FeatureLayer({
            id: "infrastructure",
            title: "Regional Infrastructure",
            visible: true,
            source: [
              // Port Sulphur Terminal
              {
                geometry: {
                  type: "point",
                  longitude: -89.765,
                  latitude: 29.465
                },
                attributes: {
                  name: "Port Sulphur Terminal",
                  facility_type: "Terminal",
                  area_acres: 106.99,
                  status: "Existing",
                  icon_type: "terminal"
                }
              },
              // Existing Dock
              {
                geometry: {
                  type: "point",
                  longitude: -89.6920,
                  latitude: 29.4715
                },
                attributes: {
                  name: "Existing Concrete Dock",
                  facility_type: "Dock",
                  dimensions: "24' x 433'",
                  capacity: "10,000 tons",
                  status: "Existing",
                  icon_type: "dock"
                }
              },
              // Warehouse
              {
                geometry: {
                  type: "point",
                  longitude: -89.6945,
                  latitude: 29.4715
                },
                attributes: {
                  name: "Warehouse Facility",
                  facility_type: "Warehouse",
                  area_sf: 5000,
                  status: "Existing",
                  icon_type: "warehouse"
                }
              },
              // Venture Global LNG
              {
                geometry: {
                  type: "point",
                  longitude: -89.760,
                  latitude: 29.460
                },
                attributes: {
                  name: "Venture Global Plaquemines LNG",
                  facility_type: "LNG Export",
                  area_acres: 632,
                  investment: "$21 billion",
                  status: "Under Construction",
                  icon_type: "lng"
                }
              },
              // APM Terminals
              {
                geometry: {
                  type: "point",
                  longitude: -89.770,
                  latitude: 29.470
                },
                attributes: {
                  name: "APM Terminals Container Terminal",
                  facility_type: "Container Terminal",
                  area_acres: 200,
                  investment: "$500 million",
                  status: "Planned (2028)",
                  icon_type: "container"
                }
              },
              // NOLA Terminal
              {
                geometry: {
                  type: "point",
                  longitude: -89.895,
                  latitude: 29.748
                },
                attributes: {
                  name: "NOLA Terminal LLC",
                  facility_type: "Deep-water Terminal",
                  area_acres: 152.8,
                  berths: 3,
                  status: "Operating",
                  icon_type: "terminal"
                }
              }
            ],
            fields: [
              { name: "ObjectID", type: "oid" },
              { name: "name", type: "string" },
              { name: "facility_type", type: "string" },
              { name: "status", type: "string" },
              { name: "icon_type", type: "string" },
              { name: "area_acres", type: "double" },
              { name: "investment", type: "string" }
            ],
            objectIdField: "ObjectID",
            geometryType: "point",
            renderer: {
              type: "unique-value",
              field: "icon_type",
              uniqueValueInfos: [
                {
                  value: "terminal",
                  symbol: {
                    type: "simple-marker",
                    color: [156, 39, 176, 1], // Purple
                    size: 14,
                    style: "square",
                    outline: {
                      color: [255, 255, 255],
                      width: 2
                    }
                  },
                  label: "Terminals"
                },
                {
                  value: "dock",
                  symbol: {
                    type: "simple-marker",
                    color: [33, 150, 243, 1], // Blue
                    size: 10,
                    style: "circle",
                    outline: {
                      color: [255, 255, 255],
                      width: 2
                    }
                  },
                  label: "Docks"
                },
                {
                  value: "warehouse",
                  symbol: {
                    type: "simple-marker",
                    color: [121, 85, 72, 1], // Brown
                    size: 10,
                    style: "square",
                    outline: {
                      color: [255, 255, 255],
                      width: 1.5
                    }
                  },
                  label: "Warehouses"
                },
                {
                  value: "lng",
                  symbol: {
                    type: "simple-marker",
                    color: [255, 193, 7, 1], // Amber
                    size: 16,
                    style: "diamond",
                    outline: {
                      color: [255, 255, 255],
                      width: 2
                    }
                  },
                  label: "LNG Facilities"
                },
                {
                  value: "container",
                  symbol: {
                    type: "simple-marker",
                    color: [76, 175, 80, 1], // Green
                    size: 14,
                    style: "square",
                    outline: {
                      color: [255, 255, 255],
                      width: 2
                    }
                  },
                  label: "Container Terminals"
                }
              ]
            },
            popupTemplate: {
              title: "<b>{name}</b>",
              content: `
                <div style="font-family: Arial, sans-serif;">
                  <p><b>Type:</b> {facility_type}</p>
                  <p><b>Status:</b> {status}</p>
                  ${"{area_acres}" ? "<p><b>Area:</b> {area_acres} acres</p>" : ""}
                  ${"{investment}" ? "<p><b>Investment:</b> {investment}</p>" : ""}
                </div>
              `
            }
          });

          map.add(infrastructureLayer);

          // ===================================
          // LAYER 6: PROPERTY BOUNDARIES
          // ===================================
          const propertyLayer = new FeatureLayer({
            id: "property",
            title: "Property Boundaries",
            visible: true,
            source: [
              // Main Parcel
              {
                geometry: {
                  type: "polygon",
                  rings: [[
                    [-89.6920, 29.4695],
                    [-89.6920, 29.4735],
                    [-89.6975, 29.4735],
                    [-89.6975, 29.4695],
                    [-89.6920, 29.4695]
                  ]]
                },
                attributes: {
                  name: "Port Sulphur Main Parcel",
                  total_acres: 106.99,
                  river_frontage_lf: 10693,
                  highway_frontage_lf: 2500,
                  zoning: "Industrial District 3",
                  feature_type: "parcel"
                }
              },
              // River Frontage Line
              {
                geometry: {
                  type: "polyline",
                  paths: [[
                    [-89.6920, 29.4695],
                    [-89.6920, 29.4735]
                  ]]
                },
                attributes: {
                  name: "Mississippi River Frontage",
                  length_lf: 10693,
                  length_miles: 2.025,
                  feature_type: "river_frontage"
                }
              },
              // Highway 23 Frontage
              {
                geometry: {
                  type: "polyline",
                  paths: [[
                    [-89.6975, 29.4695],
                    [-89.6975, 29.4735]
                  ]]
                },
                attributes: {
                  name: "Highway 23 Frontage",
                  length_lf: 2500,
                  length_miles: 0.473,
                  feature_type: "highway_frontage"
                }
              }
            ],
            fields: [
              { name: "ObjectID", type: "oid" },
              { name: "name", type: "string" },
              { name: "feature_type", type: "string" },
              { name: "total_acres", type: "double" },
              { name: "length_lf", type: "integer" }
            ],
            objectIdField: "ObjectID",
            renderer: {
              type: "unique-value",
              field: "feature_type",
              uniqueValueInfos: [
                {
                  value: "parcel",
                  symbol: {
                    type: "simple-fill",
                    color: [255, 152, 0, 0.15], // Orange transparent
                    outline: {
                      color: [255, 87, 34],
                      width: 3,
                      style: "solid"
                    }
                  },
                  label: "Property Boundary"
                },
                {
                  value: "river_frontage",
                  symbol: {
                    type: "simple-line",
                    color: [33, 150, 243], // Blue
                    width: 4,
                    style: "solid"
                  },
                  label: "River Frontage"
                },
                {
                  value: "highway_frontage",
                  symbol: {
                    type: "simple-line",
                    color: [158, 158, 158], // Gray
                    width: 3,
                    style: "dash"
                  },
                  label: "Highway Frontage"
                }
              ]
            },
            popupTemplate: {
              title: "<b>{name}</b>",
              content: function(feature) {
                const attrs = feature.graphic.attributes;
                if (attrs.feature_type === "parcel") {
                  return `
                    <div style="font-family: Arial, sans-serif;">
                      <p><b>Total Area:</b> ${attrs.total_acres} acres</p>
                      <p><b>River Frontage:</b> ${attrs.river_frontage_lf.toLocaleString()} linear feet (2.0 miles)</p>
                      <p><b>Highway Frontage:</b> ${attrs.highway_frontage_lf.toLocaleString()} linear feet</p>
                      <p><b>Zoning:</b> ${attrs.zoning}</p>
                      <div style="margin-top: 10px; padding: 8px; background: #fff3e0; border-radius: 4px; font-size: 0.85rem;">
                        <b>Note:</b> Boundaries are approximate. Survey required for exact coordinates.
                      </div>
                    </div>
                  `;
                } else {
                  return `
                    <div style="font-family: Arial, sans-serif;">
                      <p><b>Length:</b> ${attrs.length_lf.toLocaleString()} linear feet (${attrs.length_miles} miles)</p>
                    </div>
                  `;
                }
              }
            }
          });

          map.add(propertyLayer);

          // ===================================
          // WIDGETS
          // ===================================
          if (config.showWidgets) {
            // Legend Widget (bottom-left)
            const legend = new Legend({
              view: view,
              style: "card"
            });
            view.ui.add(legend, "bottom-left");

            // Layer List Widget (top-right)
            const layerList = new LayerList({
              view: view,
              listItemCreatedFunction: function(event) {
                const item = event.item;
                item.panel = {
                  content: "legend",
                  open: false
                };
              }
            });
            const layerListExpand = new Expand({
              view: view,
              content: layerList,
              expanded: false,
              expandIconClass: "esri-icon-layer-list"
            });
            view.ui.add(layerListExpand, "top-right");

            // Basemap Gallery Widget
            const basemapGallery = new BasemapGallery({
              view: view
            });
            const basemapExpand = new Expand({
              view: view,
              content: basemapGallery,
              expanded: false,
              expandIconClass: "esri-icon-basemap"
            });
            view.ui.add(basemapExpand, "top-right");

            // Measurement Widget (bottom-right)
            const measurement = new Measurement({
              view: view
            });
            const measurementExpand = new Expand({
              view: view,
              content: measurement,
              expanded: false,
              expandIconClass: "esri-icon-measure"
            });
            view.ui.add(measurementExpand, "bottom-right");

            // Search Widget
            const searchWidget = new Search({
              view: view
            });
            view.ui.add(searchWidget, "top-left");

            // Compass Widget
            const compass = new Compass({
              view: view
            });
            view.ui.add(compass, "top-left");

            // Scale Bar
            const scaleBar = new ScaleBar({
              view: view,
              unit: "dual"
            });
            view.ui.add(scaleBar, "bottom-left");
          }

          // ===================================
          // CUSTOM LAYER TOGGLE PANEL
          // ===================================
          if (config.showLayerToggle) {
            const togglePanel = document.createElement("div");
            togglePanel.className = "layer-toggle-panel";
            togglePanel.style.cssText = `
              background: rgba(0, 0, 0, 0.8);
              backdrop-filter: blur(10px);
              color: white;
              padding: 15px;
              border-radius: 8px;
              font-family: 'Segoe UI', Arial, sans-serif;
              font-size: 0.9rem;
              max-width: 250px;
            `;

            togglePanel.innerHTML = `
              <div style="font-weight: 600; margin-bottom: 10px; border-bottom: 1px solid rgba(255,255,255,0.3); padding-bottom: 8px;">
                Map Layers
              </div>
              <label style="display: flex; align-items: center; margin-bottom: 8px; cursor: pointer;">
                <input type="checkbox" id="toggle-terminal" checked style="margin-right: 8px;">
                <span>Terminal Location</span>
              </label>
              <label style="display: flex; align-items: center; margin-bottom: 8px; cursor: pointer;">
                <input type="checkbox" id="toggle-bathymetry" checked style="margin-right: 8px;">
                <span>Bathymetry</span>
              </label>
              <label style="display: flex; align-items: center; margin-bottom: 8px; cursor: pointer;">
                <input type="checkbox" id="toggle-navigation" checked style="margin-right: 8px;">
                <span>Navigation</span>
              </label>
              <label style="display: flex; align-items: center; margin-bottom: 8px; cursor: pointer;">
                <input type="checkbox" id="toggle-environmental" checked style="margin-right: 8px;">
                <span>Environmental</span>
              </label>
              <label style="display: flex; align-items: center; margin-bottom: 8px; cursor: pointer;">
                <input type="checkbox" id="toggle-infrastructure" checked style="margin-right: 8px;">
                <span>Infrastructure</span>
              </label>
              <label style="display: flex; align-items: center; cursor: pointer;">
                <input type="checkbox" id="toggle-property" checked style="margin-right: 8px;">
                <span>Property Boundaries</span>
              </label>
            `;

            view.ui.add(togglePanel, "top-left");

            // Toggle event listeners
            document.getElementById("toggle-terminal").addEventListener("change", (e) => {
              terminalLocationLayer.visible = e.target.checked;
            });
            document.getElementById("toggle-bathymetry").addEventListener("change", (e) => {
              bathymetryLayer.visible = e.target.checked;
            });
            document.getElementById("toggle-navigation").addEventListener("change", (e) => {
              navigationLayer.visible = e.target.checked;
            });
            document.getElementById("toggle-environmental").addEventListener("change", (e) => {
              environmentalLayer.visible = e.target.checked;
            });
            document.getElementById("toggle-infrastructure").addEventListener("change", (e) => {
              infrastructureLayer.visible = e.target.checked;
            });
            document.getElementById("toggle-property").addEventListener("change", (e) => {
              propertyLayer.visible = e.target.checked;
            });
          }

          // ===================================
          // MOBILE OPTIMIZATION
          // ===================================
          function optimizeForMobile() {
            const isMobile = window.innerWidth <= 768;

            if (isMobile) {
              // Simplify UI for mobile
              view.ui.components = ["attribution"];

              // Add minimal controls
              if (config.showWidgets) {
                const compass = new Compass({ view: view });
                view.ui.add(compass, "top-left");
              }

              // Adjust popup
              view.popup.dockOptions.position = "bottom-center";
            }
          }

          window.addEventListener("resize", optimizeForMobile);
          optimizeForMobile();

          // ===================================
          // RESOLVE PROMISE
          // ===================================
          const mapObject = {
            map: map,
            view: view,
            layers: {
              terminal: terminalLocationLayer,
              bathymetry: bathymetryLayer,
              navigation: navigationLayer,
              environmental: environmentalLayer,
              infrastructure: infrastructureLayer,
              property: propertyLayer
            }
          };

          view.when(() => {
            resolve(mapObject);
          }).catch(error => {
            reject(error);
          });

        } catch (error) {
          console.error("Error initializing Port Sulphur map:", error);
          reject(error);
        }
      });
    });
  };

  /**
   * Helper function to load GeoJSON file and add as layer
   * @param {string} url - URL to GeoJSON file
   * @param {Object} layerConfig - Layer configuration
   * @returns {Promise<FeatureLayer>}
   */
  window.loadGeoJSONLayer = function(url, layerConfig) {
    return fetch(url)
      .then(response => response.json())
      .then(geojson => {
        // Convert GeoJSON to ArcGIS FeatureLayer source
        const features = geojson.features.map(feature => ({
          geometry: feature.geometry,
          attributes: feature.properties
        }));

        return new FeatureLayer({
          source: features,
          ...layerConfig
        });
      })
      .catch(error => {
        console.error("Error loading GeoJSON:", error);
        throw error;
      });
  };

  // Log initialization
  console.log("Port Sulphur ArcGIS Map Configuration loaded");
  console.log("To initialize: initializePortSulphurMap('mapContainerId', options)");
})();
