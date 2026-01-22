/**
 * Port Sulphur Terminal Image Gallery Configuration
 * Generated: 2026-01-22
 *
 * This configuration enables:
 * - Category filtering (Historical, Aerial, Regulatory)
 * - Geolocation mapping integration
 * - Lightbox functionality
 * - Timeline filtering by date
 */

const ImageGalleryConfig = {
  // Project metadata
  project: {
    name: "Port Sulphur Terminal Analysis",
    location: "Port Sulphur, Louisiana",
    coordinates: {
      latitude: 29.473414,
      longitude: -89.686632
    },
    description: "Former Freeport Sulphur Company maritime terminal facility on the Mississippi River",
    riverMile: 39,
    totalImages: 15
  },

  // Category definitions
  categories: {
    historical: {
      id: "historical",
      name: "Historical Photographs",
      description: "Library of Congress archival photographs from the Office of War Information collection, circa 1940s",
      count: 6,
      color: "#8B4513", // Sepia brown
      icon: "📷"
    },
    aerial: {
      id: "aerial",
      name: "Aerial & Satellite Views",
      description: "Modern aerial and satellite imagery showing property boundaries and geographic context",
      count: 8,
      color: "#4A90E2", // Sky blue
      icon: "🛰️"
    },
    regulatory: {
      id: "regulatory",
      name: "Regulatory Documents",
      description: "EPA ECHO facility reports and environmental compliance data",
      count: 1,
      color: "#2ECC71", // Green
      icon: "📋"
    }
  },

  // Image collection
  images: [
    {
      id: "img_001",
      filename: "2.11_loc_portsulhur_1.jpg",
      category: "historical",
      title: "Sulphur Conveyor Belt and Dock Infrastructure",
      description: "Black and white photograph showing conveyor belt systems and sulphur loading dock facilities at the Port Sulphur terminal. Visible infrastructure includes conveyor mechanisms, storage areas, and dock buildings. Catalogue reference: OWI 33875 D.",
      dateTaken: "1940s",
      dateApproximate: true,
      dateSort: 1945, // Midpoint for sorting
      source: "Library of Congress - Office of War Information Collection",
      archiveReference: "OWI 33875 D",
      format: "jpg",
      sizeBytes: 277585,
      filePath: "archive/images/2.11_loc_portsulhur_1.jpg",
      location: {
        facility: "Freeport Sulphur Company Port Sulphur Terminal",
        city: "Port Sulphur",
        state: "Louisiana",
        coordinates: {
          latitude: 29.473414,
          longitude: -89.686632,
          accuracy: "approximate"
        }
      },
      subjects: ["conveyor systems", "sulphur loading dock", "maritime infrastructure", "industrial facilities", "World War II era"],
      historicalContext: "Freeport Sulphur Company operated this facility from 1933-2005 as a logistics, refining, storage and shipping hub for sulphur operations. During WWII, sulphur was a critical strategic material for munitions production.",
      tags: ["historical", "sulphur_operations", "conveyor", "dock", "library_of_congress"],
      thumbnailPath: "archive/images/thumbnails/2.11_loc_portsulhur_1_thumb.jpg"
    },
    {
      id: "img_002",
      filename: "2.12_loc_portsulhur_2.jpg",
      category: "historical",
      title: "Sulphur Barge Loading Operations",
      description: "Aerial view of a barge loaded with sulphur at the Port Sulphur dock facility. The image shows conveyor systems, waterway access, and adjacent storage areas. Catalogue reference: OWI 478832 IMO.",
      dateTaken: "1940s",
      dateApproximate: true,
      dateSort: 1945,
      source: "Library of Congress - Office of War Information Collection",
      archiveReference: "OWI 478832 IMO",
      format: "jpg",
      sizeBytes: 282171,
      filePath: "archive/images/2.12_loc_portsulhur_2.jpg",
      location: {
        facility: "Freeport Sulphur Company Port Sulphur Terminal",
        city: "Port Sulphur",
        state: "Louisiana",
        coordinates: {
          latitude: 29.473414,
          longitude: -89.686632,
          accuracy: "approximate"
        }
      },
      subjects: ["barge loading", "sulphur cargo", "waterway operations", "Mississippi River commerce", "industrial shipping"],
      historicalContext: "This image captures the barge loading operations that were central to the facility's mission of shipping processed sulphur via the Mississippi River to Gulf of Mexico ports.",
      tags: ["historical", "barge", "sulphur_cargo", "river_operations", "library_of_congress"],
      thumbnailPath: "archive/images/thumbnails/2.12_loc_portsulhur_2_thumb.jpg"
    },
    {
      id: "img_003",
      filename: "2.13_loc_portsulhur_3.jpg",
      category: "historical",
      title: "Dock Pipework and Industrial Infrastructure",
      description: "View down the dock showing extensive pipework and industrial infrastructure including sulphur processing equipment, water tower, and facility buildings. Catalogue reference: OWI 33875 D.",
      dateTaken: "1940s",
      dateApproximate: true,
      dateSort: 1945,
      source: "Library of Congress - Office of War Information Collection",
      archiveReference: "OWI 33875 D",
      format: "jpg",
      sizeBytes: 286272,
      filePath: "archive/images/2.13_loc_portsulhur_3.jpg",
      location: {
        facility: "Freeport Sulphur Company Port Sulphur Terminal",
        city: "Port Sulphur",
        state: "Louisiana",
        coordinates: {
          latitude: 29.473414,
          longitude: -89.686632,
          accuracy: "approximate"
        }
      },
      subjects: ["industrial pipework", "processing facilities", "water tower", "dock infrastructure", "sulphur refining"],
      historicalContext: "The extensive pipework system transported hot molten sulphur from storage tanks to loading facilities. The Frasch Process required maintaining sulphur at high temperatures during transport and loading.",
      tags: ["historical", "pipework", "industrial_infrastructure", "frasch_process", "library_of_congress"],
      thumbnailPath: "archive/images/thumbnails/2.13_loc_portsulhur_3_thumb.jpg"
    },
    {
      id: "img_004",
      filename: "2.14_loc_portsulhur_4.jpg",
      category: "historical",
      title: "Waterfront Facilities and Towboats",
      description: "View of waterfront showing towboats including the 'Homer A. Burnell' moored at the dock, with processing buildings and employee housing visible in the background. Catalogue reference: OWI 33880 D.",
      dateTaken: "1940s",
      dateApproximate: true,
      dateSort: 1945,
      source: "Library of Congress - Office of War Information Collection",
      archiveReference: "OWI 33880 D",
      format: "jpg",
      sizeBytes: 237259,
      filePath: "archive/images/2.14_loc_portsulhur_4.jpg",
      location: {
        facility: "Freeport Sulphur Company Port Sulphur Terminal",
        city: "Port Sulphur",
        state: "Louisiana",
        coordinates: {
          latitude: 29.473414,
          longitude: -89.686632,
          accuracy: "approximate"
        }
      },
      subjects: ["towboats", "waterfront", "employee housing", "maritime vessels", "company town"],
      historicalContext: "Port Sulphur functioned as a company town with Freeport Sulphur providing housing and infrastructure for workers. The towboat fleet was essential for managing barge traffic on the Mississippi River.",
      tags: ["historical", "towboats", "waterfront", "company_town", "library_of_congress"],
      thumbnailPath: "archive/images/thumbnails/2.14_loc_portsulhur_4_thumb.jpg"
    },
    {
      id: "img_005",
      filename: "2.15_loc_portsulhur_5.jpg",
      category: "historical",
      title: "Port Sulphur Company Town Overview",
      description: "Wide-angle view of the Port Sulphur company town showing employee housing, water tower, and surrounding landscape. Catalogue reference: OWI 33881 D.",
      dateTaken: "1940s",
      dateApproximate: true,
      dateSort: 1945,
      source: "Library of Congress - Office of War Information Collection",
      archiveReference: "OWI 33881 D",
      format: "jpg",
      sizeBytes: 271959,
      filePath: "archive/images/2.15_loc_portsulhur_5.jpg",
      location: {
        facility: "Port Sulphur",
        city: "Port Sulphur",
        state: "Louisiana",
        coordinates: {
          latitude: 29.473414,
          longitude: -89.686632,
          accuracy: "approximate"
        }
      },
      subjects: ["company town", "residential housing", "urban planning", "water infrastructure", "community development"],
      historicalContext: "Freeport Sulphur developed Port Sulphur as a planned community to support its industrial operations, providing housing and amenities for workers and their families from 1933 until operations ceased.",
      tags: ["historical", "company_town", "residential", "urban_planning", "library_of_congress"],
      thumbnailPath: "archive/images/thumbnails/2.15_loc_portsulhur_5_thumb.jpg"
    },
    {
      id: "img_006",
      filename: "2.16_loc_portsulhur_6.jpg",
      category: "historical",
      title: "Gantry Crane and Barge Loading Operations",
      description: "Detailed view of a gantry crane in operation loading sulphur onto a barge. Shows conveyor systems, loading mechanisms, and dry sulphur storage. Catalogue reference: OWI 33912 D.",
      dateTaken: "1940s",
      dateApproximate: true,
      dateSort: 1945,
      source: "Library of Congress - Office of War Information Collection",
      archiveReference: "OWI 33912 D",
      format: "jpg",
      sizeBytes: 323625,
      filePath: "archive/images/2.16_loc_portsulhur_6.jpg",
      location: {
        facility: "Freeport Sulphur Company Port Sulphur Terminal",
        city: "Port Sulphur",
        state: "Louisiana",
        coordinates: {
          latitude: 29.473414,
          longitude: -89.686632,
          accuracy: "approximate"
        }
      },
      subjects: ["gantry crane", "cargo loading", "material handling", "barge operations", "industrial equipment"],
      historicalContext: "The facility employed 'vatting' operations creating acres of dry sulphur storage blocks, visible in this image. Gantry cranes and conveyors moved material from storage to barges for shipment.",
      tags: ["historical", "gantry_crane", "barge_loading", "vatting", "library_of_congress"],
      thumbnailPath: "archive/images/thumbnails/2.16_loc_portsulhur_6_thumb.jpg"
    },
    {
      id: "img_007",
      filename: "2.1_Pasted image 20250915193857.png",
      category: "aerial",
      title: "Property Boundary GIS View",
      description: "GIS public viewer screenshot showing property boundaries, parcel information, and aerial imagery of the Port Sulphur terminal site along the Mississippi River.",
      dateTaken: "2025-09-15",
      dateApproximate: false,
      dateSort: 2025,
      source: "GIS Public Viewer / Property Records System",
      archiveReference: null,
      format: "png",
      sizeBytes: 2239886,
      filePath: "archive/images/2.1_Pasted image 20250915193857.png",
      location: {
        facility: "Former Freeport McMoRan Port Sulphur Facility",
        city: "Port Sulphur",
        state: "Louisiana",
        parish: "Plaquemines",
        coordinates: {
          latitude: 29.473414,
          longitude: -89.686632,
          accuracy: "high"
        }
      },
      subjects: ["property boundaries", "GIS data", "parcel information", "aerial view", "Mississippi River"],
      historicalContext: "Current property status following cessation of operations in early 2000s and Hurricane Katrina damage in 2005. Site is being evaluated for redevelopment as a maritime terminal.",
      tags: ["aerial", "gis", "property_boundaries", "current", "due_diligence"],
      thumbnailPath: "archive/images/thumbnails/2.1_Pasted image 20250915193857_thumb.png"
    },
    {
      id: "img_008",
      filename: "2.2_Pasted image 20250915193959.png",
      category: "aerial",
      title: "Property Boundary GIS View - Alternate Angle",
      description: "Additional GIS public viewer screenshot showing detailed property boundary delineation and parcel data for the Port Sulphur terminal site.",
      dateTaken: "2025-09-15",
      dateApproximate: false,
      dateSort: 2025,
      source: "GIS Public Viewer / Property Records System",
      archiveReference: null,
      format: "png",
      sizeBytes: 2260018,
      filePath: "archive/images/2.2_Pasted image 20250915193959.png",
      location: {
        facility: "Former Freeport McMoRan Port Sulphur Facility",
        city: "Port Sulphur",
        state: "Louisiana",
        parish: "Plaquemines",
        coordinates: {
          latitude: 29.473414,
          longitude: -89.686632,
          accuracy: "high"
        }
      },
      subjects: ["property boundaries", "GIS data", "parcel information", "land survey", "property assessment"],
      historicalContext: "Property records and GIS data used for due diligence analysis of the former industrial site.",
      tags: ["aerial", "gis", "property_boundaries", "current", "due_diligence"],
      thumbnailPath: "archive/images/thumbnails/2.2_Pasted image 20250915193959_thumb.png"
    },
    {
      id: "img_009",
      filename: "2.3_Pasted image 20250915194045.png",
      category: "aerial",
      title: "Property Assessment GIS Data",
      description: "GIS viewer screenshot displaying property assessment data and boundary information for due diligence analysis.",
      dateTaken: "2025-09-15",
      dateApproximate: false,
      dateSort: 2025,
      source: "GIS Public Viewer / Property Records System",
      archiveReference: null,
      format: "png",
      sizeBytes: 2246083,
      filePath: "archive/images/2.3_Pasted image 20250915194045.png",
      location: {
        facility: "Former Freeport McMoRan Port Sulphur Facility",
        city: "Port Sulphur",
        state: "Louisiana",
        parish: "Plaquemines",
        coordinates: {
          latitude: 29.473414,
          longitude: -89.686632,
          accuracy: "high"
        }
      },
      subjects: ["property assessment", "GIS data", "tax parcel", "land records", "boundary survey"],
      historicalContext: "Tax parcel and assessment data for the former Freeport McMoRan facility site.",
      tags: ["aerial", "gis", "property_assessment", "current", "due_diligence"],
      thumbnailPath: "archive/images/thumbnails/2.3_Pasted image 20250915194045_thumb.png"
    },
    {
      id: "img_010",
      filename: "2.4_Pasted image 20250915194139.png",
      category: "aerial",
      title: "Parcel Boundary Detail View",
      description: "Detailed GIS view of parcel boundaries and property configuration along the Mississippi River waterfront.",
      dateTaken: "2025-09-15",
      dateApproximate: false,
      dateSort: 2025,
      source: "GIS Public Viewer / Property Records System",
      archiveReference: null,
      format: "png",
      sizeBytes: 2908577,
      filePath: "archive/images/2.4_Pasted image 20250915194139.png",
      location: {
        facility: "Former Freeport McMoRan Port Sulphur Facility",
        city: "Port Sulphur",
        state: "Louisiana",
        parish: "Plaquemines",
        coordinates: {
          latitude: 29.473414,
          longitude: -89.686632,
          accuracy: "high"
        }
      },
      subjects: ["parcel boundaries", "waterfront property", "river frontage", "property configuration", "land use"],
      historicalContext: "Current property configuration showing waterfront access critical for maritime terminal operations.",
      tags: ["aerial", "gis", "waterfront", "current", "due_diligence"],
      thumbnailPath: "archive/images/thumbnails/2.4_Pasted image 20250915194139_thumb.png"
    },
    {
      id: "img_011",
      filename: "2.5_Pasted image 20250915194729.png",
      category: "aerial",
      title: "Plaquemines Parish Parcel Assessor View",
      description: "Plaquemines Parish tax assessor parcel viewer showing detailed property information, boundaries, and surrounding parcels with color-coded land use zones.",
      dateTaken: "2025-09-15",
      dateApproximate: false,
      dateSort: 2025,
      source: "Plaquemines Parish Assessor GIS System",
      archiveReference: null,
      format: "png",
      sizeBytes: 3532851,
      filePath: "archive/images/2.5_Pasted image 20250915194729.png",
      location: {
        facility: "Former Freeport McMoRan Port Sulphur Facility",
        city: "Port Sulphur",
        state: "Louisiana",
        parish: "Plaquemines",
        coordinates: {
          latitude: 29.473414,
          longitude: -89.686632,
          accuracy: "high"
        }
      },
      subjects: ["tax parcel", "parish assessor data", "land use zoning", "property tax", "parcel map"],
      historicalContext: "Parish tax records showing current ownership and assessment status of the former industrial facility.",
      tags: ["aerial", "tax_parcel", "parish_records", "current", "due_diligence"],
      thumbnailPath: "archive/images/thumbnails/2.5_Pasted image 20250915194729_thumb.png"
    },
    {
      id: "img_012",
      filename: "2.6_Pasted image 20250915210317.png",
      category: "aerial",
      title: "Regional Context Aerial View",
      description: "Wide-area aerial/satellite view showing regional context of the Port Sulphur site in relation to surrounding properties and Mississippi River configuration.",
      dateTaken: "2025-09-15",
      dateApproximate: false,
      dateSort: 2025,
      source: "Satellite/Aerial Imagery Platform",
      archiveReference: null,
      format: "png",
      sizeBytes: 2998348,
      filePath: "archive/images/2.6_Pasted image 20250915210317.png",
      location: {
        facility: "Port Sulphur Region",
        city: "Port Sulphur",
        state: "Louisiana",
        parish: "Plaquemines",
        coordinates: {
          latitude: 29.473414,
          longitude: -89.686632,
          accuracy: "regional"
        }
      },
      subjects: ["regional context", "satellite imagery", "Mississippi River", "surrounding area", "geographic setting"],
      historicalContext: "Regional view showing the site's strategic location on the Mississippi River between New Orleans and the Gulf of Mexico.",
      tags: ["aerial", "regional", "satellite", "current", "due_diligence"],
      thumbnailPath: "archive/images/thumbnails/2.6_Pasted image 20250915210317_thumb.png"
    },
    {
      id: "img_013",
      filename: "2.7_Pasted image 20250915215835.png",
      category: "aerial",
      title: "Site Context Aerial Imagery",
      description: "Aerial view providing context for the Port Sulphur terminal site location and surrounding area.",
      dateTaken: "2025-09-15",
      dateApproximate: false,
      dateSort: 2025,
      source: "Aerial Imagery Platform",
      archiveReference: null,
      format: "png",
      sizeBytes: 2990871,
      filePath: "archive/images/2.7_Pasted image 20250915215835.png",
      location: {
        facility: "Port Sulphur Terminal Site",
        city: "Port Sulphur",
        state: "Louisiana",
        parish: "Plaquemines",
        coordinates: {
          latitude: 29.473414,
          longitude: -89.686632,
          accuracy: "high"
        }
      },
      subjects: ["site context", "aerial imagery", "property location", "topography", "land features"],
      historicalContext: "Current aerial view showing post-Katrina site conditions and surrounding development.",
      tags: ["aerial", "site_context", "current", "due_diligence"],
      thumbnailPath: "archive/images/thumbnails/2.7_Pasted image 20250915215835_thumb.png"
    },
    {
      id: "img_014",
      filename: "2.8_Pasted image 20250915215947.png",
      category: "aerial",
      title: "Detailed Site Aerial View",
      description: "Detailed aerial photograph showing the Port Sulphur terminal site configuration and immediate surroundings.",
      dateTaken: "2025-09-15",
      dateApproximate: false,
      dateSort: 2025,
      source: "Aerial Imagery Platform",
      archiveReference: null,
      format: "png",
      sizeBytes: 3138455,
      filePath: "archive/images/2.8_Pasted image 20250915215947.png",
      location: {
        facility: "Port Sulphur Terminal Site",
        city: "Port Sulphur",
        state: "Louisiana",
        parish: "Plaquemines",
        coordinates: {
          latitude: 29.473414,
          longitude: -89.686632,
          accuracy: "high"
        }
      },
      subjects: ["site detail", "aerial photography", "facility layout", "infrastructure", "property features"],
      historicalContext: "Detailed view of current site conditions for development planning and engineering assessment.",
      tags: ["aerial", "site_detail", "current", "due_diligence"],
      thumbnailPath: "archive/images/thumbnails/2.8_Pasted image 20250915215947_thumb.png"
    },
    {
      id: "img_015",
      filename: "2.9_Pasted image 20250919111230.png",
      category: "regulatory",
      title: "EPA ECHO Facility Report",
      description: "EPA ECHO (Enforcement and Compliance History Online) Detailed Facility Report for Freeport McMoRan Energy LLC - Port Sulphur Facility, showing compliance status, enforcement history, and regulatory information. Address: 28310 HWY 23, Port Sulphur, LA 70083. FRS ID: 110022408321.",
      dateTaken: "2025-09-19",
      dateApproximate: false,
      dateSort: 2025,
      source: "EPA ECHO Database",
      archiveReference: "FRS ID: 110022408321",
      format: "png",
      sizeBytes: 89047,
      filePath: "archive/images/2.9_Pasted image 20250919111230.png",
      location: {
        facility: "Freeport McMoRan Energy LLC - Port Sulphur Facility",
        address: "28310 HWY 23",
        city: "Port Sulphur",
        state: "Louisiana",
        zip: "70083",
        parish: "Plaquemines",
        coordinates: {
          latitude: 29.473414,
          longitude: -89.686632,
          accuracy: "exact",
          source: "EPA FRS Database"
        }
      },
      subjects: ["environmental compliance", "EPA database", "regulatory status", "facility history", "enforcement record"],
      regulatoryInfo: {
        frsId: "110022408321",
        epaRegion: "06",
        industry: "Mining (except Oil and Gas)",
        indianCountry: "N",
        lastMonitoringActivity: "08/11/2003",
        complianceStatus: "No Violation Identified"
      },
      historicalContext: "EPA regulatory compliance history for the former Freeport McMoRan facility, showing environmental monitoring and enforcement activities through 2003 when operations were winding down.",
      tags: ["regulatory", "epa_echo", "environmental_compliance", "facility_report", "due_diligence"],
      thumbnailPath: "archive/images/thumbnails/2.9_Pasted image 20250919111230_thumb.png"
    }
  ],

  // Gallery configuration
  config: {
    defaultView: "grid", // Options: "grid", "list", "map", "timeline"
    enableLightbox: true,
    enableFiltering: true,
    enableSearch: true,
    enableMap: true,
    enableTimeline: true,

    // Grid layout settings
    grid: {
      columns: {
        mobile: 1,
        tablet: 2,
        desktop: 3,
        wide: 4
      },
      gap: "1rem",
      aspectRatio: "4/3"
    },

    // Map settings
    map: {
      provider: "leaflet", // or "mapbox", "google"
      center: {
        latitude: 29.473414,
        longitude: -89.686632
      },
      zoom: 15,
      minZoom: 10,
      maxZoom: 18,
      clusterMarkers: true,
      markerColors: {
        historical: "#8B4513",
        aerial: "#4A90E2",
        regulatory: "#2ECC71"
      }
    },

    // Timeline settings
    timeline: {
      range: {
        start: 1940,
        end: 2025
      },
      defaultPeriod: "all", // Options: "all", "1940s", "2020s", etc.
      periods: [
        { id: "1940s", label: "1940s (WWII Era)", start: 1940, end: 1949 },
        { id: "2020s", label: "2020s (Current)", start: 2020, end: 2029 }
      ],
      orientation: "horizontal", // Options: "horizontal", "vertical"
      groupBy: "year" // Options: "year", "decade", "category"
    },

    // Lightbox settings
    lightbox: {
      showCaption: true,
      showMetadata: true,
      enableZoom: true,
      enableDownload: false,
      showNavigation: true,
      slideshow: {
        enabled: true,
        interval: 5000 // milliseconds
      },
      displayFields: [
        "title",
        "description",
        "dateTaken",
        "source",
        "archiveReference",
        "location.facility",
        "historicalContext"
      ]
    },

    // Filter settings
    filters: {
      categories: {
        enabled: true,
        multiSelect: true,
        showCount: true
      },
      dateRange: {
        enabled: true,
        type: "slider" // Options: "slider", "dropdown", "input"
      },
      subjects: {
        enabled: true,
        multiSelect: true,
        maxVisible: 10
      },
      location: {
        enabled: true,
        type: "dropdown"
      }
    },

    // Search settings
    search: {
      enabled: true,
      placeholder: "Search images by title, description, or tags...",
      searchFields: ["title", "description", "subjects", "tags", "historicalContext"],
      minCharacters: 3,
      debounceMs: 300
    },

    // Sort settings
    sort: {
      defaultOrder: "dateAsc", // Options: "dateAsc", "dateDesc", "titleAsc", "titleDesc", "category"
      options: [
        { id: "dateAsc", label: "Date (Oldest First)", field: "dateSort", order: "asc" },
        { id: "dateDesc", label: "Date (Newest First)", field: "dateSort", order: "desc" },
        { id: "titleAsc", label: "Title (A-Z)", field: "title", order: "asc" },
        { id: "titleDesc", label: "Title (Z-A)", field: "title", order: "desc" },
        { id: "category", label: "Category", field: "category", order: "asc" }
      ]
    },

    // Responsive breakpoints
    breakpoints: {
      mobile: 768,
      tablet: 1024,
      desktop: 1440
    }
  },

  // Helper methods
  methods: {
    /**
     * Get all images for a specific category
     * @param {string} categoryId - Category ID (historical, aerial, regulatory)
     * @returns {Array} Filtered images
     */
    getImagesByCategory(categoryId) {
      return this.images.filter(img => img.category === categoryId);
    },

    /**
     * Get images within a date range
     * @param {number} startYear - Start year
     * @param {number} endYear - End year
     * @returns {Array} Filtered images
     */
    getImagesByDateRange(startYear, endYear) {
      return this.images.filter(img =>
        img.dateSort >= startYear && img.dateSort <= endYear
      );
    },

    /**
     * Search images by text query
     * @param {string} query - Search query
     * @returns {Array} Filtered images
     */
    searchImages(query) {
      const lowerQuery = query.toLowerCase();
      return this.images.filter(img =>
        img.title.toLowerCase().includes(lowerQuery) ||
        img.description.toLowerCase().includes(lowerQuery) ||
        img.tags.some(tag => tag.toLowerCase().includes(lowerQuery)) ||
        img.subjects.some(subject => subject.toLowerCase().includes(lowerQuery)) ||
        img.historicalContext.toLowerCase().includes(lowerQuery)
      );
    },

    /**
     * Get all unique subjects across all images
     * @returns {Array} Sorted array of unique subjects
     */
    getAllSubjects() {
      const subjects = new Set();
      this.images.forEach(img => {
        img.subjects.forEach(subject => subjects.add(subject));
      });
      return Array.from(subjects).sort();
    },

    /**
     * Get all unique tags across all images
     * @returns {Array} Sorted array of unique tags
     */
    getAllTags() {
      const tags = new Set();
      this.images.forEach(img => {
        img.tags.forEach(tag => tags.add(tag));
      });
      return Array.from(tags).sort();
    },

    /**
     * Get images with valid coordinates for mapping
     * @returns {Array} Images with coordinate data
     */
    getGeolocatedImages() {
      return this.images.filter(img =>
        img.location &&
        img.location.coordinates &&
        img.location.coordinates.latitude &&
        img.location.coordinates.longitude
      );
    },

    /**
     * Get category statistics
     * @returns {Object} Statistics by category
     */
    getCategoryStats() {
      const stats = {};
      Object.keys(this.categories).forEach(categoryId => {
        const categoryImages = this.getImagesByCategory(categoryId);
        stats[categoryId] = {
          count: categoryImages.length,
          totalSize: categoryImages.reduce((sum, img) => sum + img.sizeBytes, 0),
          dateRange: {
            earliest: Math.min(...categoryImages.map(img => img.dateSort)),
            latest: Math.max(...categoryImages.map(img => img.dateSort))
          }
        };
      });
      return stats;
    },

    /**
     * Sort images by specified field and order
     * @param {Array} images - Images to sort
     * @param {string} field - Field to sort by
     * @param {string} order - Sort order ("asc" or "desc")
     * @returns {Array} Sorted images
     */
    sortImages(images, field, order = "asc") {
      return [...images].sort((a, b) => {
        let aVal = a[field];
        let bVal = b[field];

        // Handle nested properties (e.g., "location.city")
        if (field.includes(".")) {
          const parts = field.split(".");
          aVal = parts.reduce((obj, key) => obj?.[key], a);
          bVal = parts.reduce((obj, key) => obj?.[key], b);
        }

        if (typeof aVal === "string") {
          aVal = aVal.toLowerCase();
          bVal = bVal.toLowerCase();
        }

        if (order === "asc") {
          return aVal > bVal ? 1 : aVal < bVal ? -1 : 0;
        } else {
          return aVal < bVal ? 1 : aVal > bVal ? -1 : 0;
        }
      });
    },

    /**
     * Generate GeoJSON for map integration
     * @returns {Object} GeoJSON FeatureCollection
     */
    toGeoJSON() {
      return {
        type: "FeatureCollection",
        features: this.getGeolocatedImages().map(img => ({
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [
              img.location.coordinates.longitude,
              img.location.coordinates.latitude
            ]
          },
          properties: {
            id: img.id,
            title: img.title,
            description: img.description,
            category: img.category,
            dateTaken: img.dateTaken,
            thumbnailPath: img.thumbnailPath,
            filePath: img.filePath,
            source: img.source,
            accuracy: img.location.coordinates.accuracy
          }
        }))
      };
    }
  }
};

// Bind methods to the config object
Object.keys(ImageGalleryConfig.methods).forEach(methodName => {
  ImageGalleryConfig[methodName] = ImageGalleryConfig.methods[methodName].bind(ImageGalleryConfig);
});

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ImageGalleryConfig;
}

// Export for ES6 modules
if (typeof exports !== 'undefined') {
  exports.ImageGalleryConfig = ImageGalleryConfig;
}
