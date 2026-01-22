/**
 * Port Sulphur Terminal Historical Timeline Visualization
 *
 * Interactive timeline visualization for 87 historical events spanning 1000 BCE to 2025
 * Supports filtering by significance level and category, with period-based zoom controls
 *
 * Generated: 2026-01-22
 * Data Source: history_data.json
 */

// ============================================================================
// CONFIGURATION DATA
// ============================================================================

const TIMELINE_CONFIG = {
  metadata: {
    title: "Port Sulphur Terminal Historical Timeline",
    subtitle: "3,025 Years of History: From Indigenous Settlement to Industrial Reuse",
    location: "Port Sulphur, Plaquemines Parish, Louisiana",
    coordinates: { lat: 29.4669, lon: -89.6953 },
    totalEvents: 87,
    timespan: "1000 BCE - 2025 CE"
  },

  // Historical periods with color schemes
  periods: [
    {
      id: "prehistoric",
      name: "Prehistoric & Indigenous",
      startYear: -1000,
      endYear: 1500,
      color: "#8B4513",
      backgroundColor: "rgba(139, 69, 19, 0.1)",
      description: "Archaeological evidence of Chitimacha and Houma tribes"
    },
    {
      id: "colonial",
      name: "Colonial & Antebellum",
      startYear: 1541,
      endYear: 1869,
      color: "#4169E1",
      backgroundColor: "rgba(65, 105, 225, 0.1)",
      description: "European exploration and colonization"
    },
    {
      id: "early_industrial",
      name: "Early Industrialization",
      startYear: 1870,
      endYear: 1932,
      color: "#FF8C00",
      backgroundColor: "rgba(255, 140, 0, 0.1)",
      description: "Geological surveys and sulfur discovery"
    },
    {
      id: "construction",
      name: "Construction Era",
      startYear: 1932,
      endYear: 1939,
      color: "#228B22",
      backgroundColor: "rgba(34, 139, 34, 0.1)",
      description: "Facility construction and initial operations"
    },
    {
      id: "peak_operations",
      name: "Peak Operations",
      startYear: 1940,
      endYear: 1978,
      color: "#FFD700",
      backgroundColor: "rgba(255, 215, 0, 0.1)",
      description: "Wartime production and peak sulfur mining"
    },
    {
      id: "decline",
      name: "Decline & Closure",
      startYear: 1979,
      endYear: 2005,
      color: "#DC143C",
      backgroundColor: "rgba(220, 20, 60, 0.1)",
      description: "Market competition and Hurricane Katrina"
    },
    {
      id: "remediation",
      name: "Remediation & Reuse",
      startYear: 2005,
      endYear: 2025,
      color: "#64ffb4",
      backgroundColor: "rgba(100, 255, 180, 0.1)",
      description: "Environmental remediation and preparation for reuse"
    }
  ],

  // Event categories with styling
  categories: {
    indigenous: {
      label: "Indigenous Settlement",
      color: "#8B4513",
      icon: "🏛️"
    },
    exploration: {
      label: "Exploration",
      color: "#4682B4",
      icon: "🧭"
    },
    colonization: {
      label: "Colonization",
      color: "#4169E1",
      icon: "⚜️"
    },
    political: {
      label: "Political Events",
      color: "#800080",
      icon: "🏛️"
    },
    settlement: {
      label: "Settlement",
      color: "#6B8E23",
      icon: "🏘️"
    },
    infrastructure: {
      label: "Infrastructure",
      color: "#696969",
      icon: "🏗️"
    },
    economic: {
      label: "Economic Trends",
      color: "#FF8C00",
      icon: "📈"
    },
    corporate: {
      label: "Corporate Evolution",
      color: "#1E90FF",
      icon: "🏢"
    },
    technology: {
      label: "Technology",
      color: "#9370DB",
      icon: "⚙️"
    },
    acquisition: {
      label: "Land Acquisition",
      color: "#228B22",
      icon: "📋"
    },
    construction: {
      label: "Construction",
      color: "#32CD32",
      icon: "🏗️"
    },
    operations: {
      label: "Operations",
      color: "#FFD700",
      icon: "⚡"
    },
    expansion: {
      label: "Facility Expansion",
      color: "#FFA500",
      icon: "📦"
    },
    recognition: {
      label: "Awards & Recognition",
      color: "#DAA520",
      icon: "🏆"
    },
    disaster: {
      label: "Natural Disasters",
      color: "#8B0000",
      icon: "🌪️"
    },
    environmental: {
      label: "Environmental Issues",
      color: "#006400",
      icon: "🌿"
    },
    remediation: {
      label: "Remediation",
      color: "#64ffb4",
      icon: "♻️"
    },
    regulatory: {
      label: "Regulatory Compliance",
      color: "#4682B4",
      icon: "⚖️"
    },
    recovery: {
      label: "Disaster Recovery",
      color: "#20B2AA",
      icon: "🔧"
    },
    realestate: {
      label: "Real Estate",
      color: "#FF6347",
      icon: "🏢"
    }
  },

  // Significance levels
  significanceLevels: {
    critical: {
      label: "Critical",
      weight: 4,
      size: 16,
      description: "Major turning points in site history"
    },
    major: {
      label: "Major",
      weight: 3,
      size: 12,
      description: "Important developments affecting operations"
    },
    moderate: {
      label: "Moderate",
      weight: 2,
      size: 10,
      description: "Notable events with lasting impact"
    },
    minor: {
      label: "Minor",
      weight: 1,
      size: 8,
      description: "Supporting context and background events"
    }
  },

  // Zoom presets for different time periods
  zoomPresets: [
    {
      id: "full",
      label: "Full Timeline",
      startYear: -1000,
      endYear: 2025,
      description: "Complete 3,025-year history"
    },
    {
      id: "modern",
      label: "Modern Era",
      startYear: 1900,
      endYear: 2025,
      description: "20th-21st century industrial history"
    },
    {
      id: "construction_wartime",
      label: "Construction & Wartime",
      startYear: 1930,
      endYear: 1945,
      description: "Facility construction and WWII production"
    },
    {
      id: "peak_operations",
      label: "Peak Operations",
      startYear: 1945,
      endYear: 1978,
      description: "Maximum production and expansion"
    },
    {
      id: "decline_closure",
      label: "Decline & Closure",
      startYear: 1978,
      endYear: 2005,
      description: "Market competition and Hurricane Katrina"
    },
    {
      id: "remediation",
      label: "Remediation Era",
      startYear: 2005,
      endYear: 2025,
      description: "Environmental cleanup and reuse preparation"
    },
    {
      id: "freeport_operations",
      label: "Freeport Operations",
      startYear: 1932,
      endYear: 2005,
      description: "Complete 72-year operational period"
    }
  ]
};

// ============================================================================
// TIMELINE EVENTS DATA
// ============================================================================

const TIMELINE_EVENTS = [
  {
    year: -1000,
    date: "circa 1000 BCE",
    period: "prehistoric",
    category: "indigenous",
    title: "Early Human Occupation",
    description: "Archaeological evidence indicates human occupation with shell middens and ceramic artifacts from Marksville and Coles Creek cultures",
    significance: "minor"
  },
  {
    year: 1541,
    date: "1541",
    period: "colonial",
    category: "exploration",
    title: "De Soto Expedition",
    description: "Hernando de Soto's expedition explores the Mississippi River Delta region",
    significance: "minor"
  },
  {
    year: 1690,
    date: "circa 1690s",
    period: "colonial",
    category: "colonization",
    title: "French Colonization Begins",
    description: "French establish Plaquemines as strategic buffer against Spanish claims",
    significance: "minor"
  },
  {
    year: 1746,
    date: "1746",
    period: "colonial",
    category: "infrastructure",
    title: "Fort St. Philip Construction",
    description: "Fort St. Philip constructed near MM 39 for river defense",
    significance: "minor"
  },
  {
    year: 1760,
    date: "circa 1760s",
    period: "colonial",
    category: "settlement",
    title: "Isleño Settler Communities",
    description: "Spanish rule brings Isleño settlers from Canary Islands, establishing fishing and trapping communities",
    significance: "minor"
  },
  {
    year: 1803,
    date: "1803",
    period: "colonial",
    category: "political",
    title: "Louisiana Purchase",
    description: "Area integrated into United States territory through Louisiana Purchase",
    significance: "moderate"
  },
  {
    year: 1834,
    date: "1834",
    period: "early_industrial",
    category: "corporate",
    title: "Phelps, Dodge & Company Formed",
    description: "Phelps, Dodge & Company formed as metals and mercantile firm (eventual merger partner)",
    significance: "minor"
  },
  {
    year: 1870,
    date: "circa 1870s",
    period: "early_industrial",
    category: "economic",
    title: "Shift to Commercial Fishing",
    description: "Post-Reconstruction Plaquemines Parish shifts to commercial fishing, oyster harvesting, and citrus farming",
    significance: "minor"
  },
  {
    year: 1887,
    date: "1887",
    period: "early_industrial",
    category: "corporate",
    title: "American Metal Company Founded",
    description: "The American Metal Company founded (eventual merger partner)",
    significance: "minor"
  },
  {
    year: 1894,
    date: "1894",
    period: "early_industrial",
    category: "technology",
    title: "Frasch Process Patent",
    description: "Frasch Process patented, enabling sulfur extraction from salt domes using superheated water",
    significance: "major"
  },
  {
    year: 1900,
    date: "circa early 1900s",
    period: "early_industrial",
    category: "exploration",
    title: "Sulfur Deposits Identified",
    description: "Geological surveys identify sulfur deposits at Lake Grande Écaille",
    significance: "major"
  },
  {
    year: 1912,
    date: "1912",
    period: "early_industrial",
    category: "corporate",
    title: "Freeport Sulphur Company Founded",
    description: "Freeport Sulphur founded (renamed Freeport Minerals Company in 1971), establishing city of Freeport, Texas near sulfur mines",
    significance: "major"
  },
  {
    year: 1918,
    date: "1918",
    period: "early_industrial",
    category: "corporate",
    title: "Climax Molybdenum Company Founded",
    description: "Climax Molybdenum Company founded to mine molybdenum near Leadville, Colorado (eventual merger partner)",
    significance: "minor"
  },
  {
    year: 1932,
    date: "1932",
    period: "construction",
    category: "acquisition",
    title: "Sulfur Rights Acquired",
    description: "Freeport Sulphur Company acquires sulfur mining rights for Lake Grande Écaille (10 miles west of Port Sulphur)",
    significance: "critical"
  },
  {
    year: 1932,
    date: "1932-1933",
    period: "construction",
    category: "construction",
    title: "Facility Construction Begins",
    description: "Construction of Port Sulphur facility begins to support logistics, refining, and shipping operations",
    significance: "critical"
  },
  {
    year: 1933,
    date: "1933",
    period: "construction",
    category: "infrastructure",
    title: "Concrete Dock Completed",
    description: "24' x 433' concrete dock completed, rated for 10,000 tons with 52' draft access",
    significance: "major"
  },
  {
    year: 1933,
    date: "1933",
    period: "construction",
    category: "operations",
    title: "Operations Commence",
    description: "Port Sulphur facility begins operations processing sulfur from Grande Écaille via Frasch Process",
    significance: "critical"
  },
  {
    year: 1933,
    date: "1933-1978",
    period: "peak_operations",
    category: "operations",
    title: "Primary Mine Operations Period",
    description: "Grande Écaille serves as primary sulfur mine with Port Sulphur as logistics and shipping hub",
    significance: "critical"
  },
  {
    year: 1933,
    date: "1933-2005",
    period: "peak_operations",
    category: "operations",
    title: "72 Years of Continuous Operations",
    description: "Port Sulphur facility operates continuously as logistics, refining, storage and shipping hub for 72 years",
    significance: "critical"
  },
  {
    year: 1940,
    date: "circa 1940s-1970s",
    period: "peak_operations",
    category: "operations",
    title: "Multi-Site Operations Support",
    description: "Facility supports multiple Frasch Process sulfur mines throughout Louisiana, including offshore Main Pass Block 299 (50 miles offshore, 300' water depth)",
    significance: "major"
  },
  {
    year: 1943,
    date: "August 27, 1943",
    period: "peak_operations",
    category: "recognition",
    title: "Times Picayune Coverage",
    description: "The Times Picayune publishes article on Freeport Sulphur wartime operations",
    significance: "minor"
  },
  {
    year: 1944,
    date: "1944",
    period: "peak_operations",
    category: "recognition",
    title: "Army-Navy 'E' Award",
    description: "Facility receives Army-Navy 'E' Award for excellence in wartime defense production during WWII",
    significance: "major"
  },
  {
    year: 1944,
    date: "July 15, 1944",
    period: "peak_operations",
    category: "recognition",
    title: "Times Picayune Award Coverage",
    description: "The Times Picayune reports on Army-Navy 'E' Award presentation",
    significance: "minor"
  },
  {
    year: 1950,
    date: "circa 1950s",
    period: "peak_operations",
    category: "expansion",
    title: "Facility Expansions",
    description: "Major expansions add liquid sulfur shipment capabilities",
    significance: "major"
  },
  {
    year: 1955,
    date: "1955",
    period: "peak_operations",
    category: "operations",
    title: "First Liquid Sulfur Barge",
    description: "First liquid sulfur barge load shipped from Port Sulphur facility",
    significance: "moderate"
  },
  {
    year: 1957,
    date: "1957",
    period: "peak_operations",
    category: "corporate",
    title: "American Metal Climax Merger",
    description: "Climax Molybdenum merges with American Metal Company to form American Metal Climax Inc. (AMAX)",
    significance: "minor"
  },
  {
    year: 1960,
    date: "circa 1960s-1970s",
    period: "peak_operations",
    category: "economic",
    title: "Peak Operations Period",
    description: "Facility at peak operational capacity with extensive 'vatting' operations creating acres of dry sulfur storage blocks",
    significance: "major"
  },
  {
    year: 1967,
    date: "1967",
    period: "peak_operations",
    category: "corporate",
    title: "PT Freeport Indonesia Established",
    description: "Freeport Sulphur establishes PT Freeport Indonesia to develop Ertsberg copper deposit",
    significance: "minor"
  },
  {
    year: 1969,
    date: "1969",
    period: "peak_operations",
    category: "corporate",
    title: "McMoRan Exploration Formed",
    description: "McMoRan Exploration formed as independent oil and gas exploration company in South Louisiana (eventual merger partner)",
    significance: "minor"
  },
  {
    year: 1971,
    date: "1971",
    period: "peak_operations",
    category: "corporate",
    title: "Freeport Minerals Rename",
    description: "Freeport Sulphur Company renamed to Freeport Minerals Company",
    significance: "minor"
  },
  {
    year: 1978,
    date: "1978",
    period: "decline",
    category: "operations",
    title: "Grande Écaille Mine Closure",
    description: "Primary sulfur mining operations cease at Grande Écaille mine after 45 years",
    significance: "major"
  },
  {
    year: 1980,
    date: "1980s",
    period: "decline",
    category: "economic",
    title: "Economic Decline Begins",
    description: "Economic decline begins due to market competition from recovered sulfur (oil/gas refining byproducts)",
    significance: "major"
  },
  {
    year: 1981,
    date: "1981",
    period: "decline",
    category: "corporate",
    title: "Freeport-McMoRan Inc. Merger",
    description: "McMoRan Oil & Gas merges with Freeport Minerals to create Freeport-McMoRan Inc. (FTX), becoming major oil/gas producer with interests in sulfur, copper, and gold",
    significance: "major"
  },
  {
    year: 1985,
    date: "1985",
    period: "decline",
    category: "corporate",
    title: "Cyprus Minerals Spin-off",
    description: "Cyprus Minerals Company spun off by Amoco (eventual acquisition by Phelps Dodge)",
    significance: "minor"
  },
  {
    year: 1988,
    date: "1988",
    period: "decline",
    category: "corporate",
    title: "FCX NYSE Listing",
    description: "Freeport-McMoRan Copper Company, Inc. (FCX) lists on New York Stock Exchange following Grasberg discovery",
    significance: "moderate"
  },
  {
    year: 1990,
    date: "1990s",
    period: "decline",
    category: "operations",
    title: "Continued Decline",
    description: "Reduced operations continue through 1990s, though sulfur processing persists at diminished capacity",
    significance: "moderate"
  },
  {
    year: 1991,
    date: "1991",
    period: "decline",
    category: "corporate",
    title: "FCX Name Change",
    description: "Freeport-McMoRan changes name to Freeport-McMoRan Copper & Gold Inc. to reflect growth in gold reserves",
    significance: "minor"
  },
  {
    year: 1993,
    date: "1993",
    period: "decline",
    category: "corporate",
    title: "Cyprus Amax Formation",
    description: "AMAX merges with Cyprus Minerals to form Cyprus Amax Minerals Company",
    significance: "minor"
  },
  {
    year: 1995,
    date: "1995",
    period: "decline",
    category: "corporate",
    title: "FCX Spin-off from FTX",
    description: "Remaining 80% of FCX spun off from FTX to form independent public company",
    significance: "minor"
  },
  {
    year: 1997,
    date: "1997",
    period: "decline",
    category: "corporate",
    title: "FTX Merger with IMC Global",
    description: "FTX merges into IMC Global Inc.",
    significance: "minor"
  },
  {
    year: 1999,
    date: "1999",
    period: "decline",
    category: "corporate",
    title: "Phelps Dodge Acquires Cyprus Amax",
    description: "Phelps Dodge acquires Cyprus Amax Minerals Company, including multiple mines and Climax Molybdenum",
    significance: "minor"
  },
  {
    year: 2000,
    date: "early 2000s",
    period: "decline",
    category: "operations",
    title: "Operations Cease",
    description: "All sulfur operations at Port Sulphur facility cease due to market competition",
    significance: "major"
  },
  {
    year: 2000,
    date: "early 2000s",
    period: "decline",
    category: "environmental",
    title: "Environmental Concerns Emerge",
    description: "Environmental concerns documented including acid generation, heavy metals mobilization, and groundwater impacts from 72 years of operations",
    significance: "moderate"
  },
  {
    year: 2001,
    date: "2001",
    period: "decline",
    category: "corporate",
    title: "ICMM Founding Member",
    description: "FCX becomes founding member of International Council on Mining & Metals (ICMM)",
    significance: "minor"
  },
  {
    year: 2005,
    date: "August 29, 2005",
    period: "remediation",
    category: "disaster",
    title: "Hurricane Katrina Destruction",
    description: "Hurricane Katrina delivers catastrophic damage with 22' storm surge and 75 kt winds, destroying remaining sulfur facility infrastructure and displacing contaminants",
    significance: "critical"
  },
  {
    year: 2005,
    date: "2005",
    period: "remediation",
    category: "operations",
    title: "End of Freeport Operations",
    description: "Hurricane Katrina marks definitive end of 72-year Freeport Sulphur Company operations at Port Sulphur",
    significance: "critical"
  },
  {
    year: 2005,
    date: "post-2005",
    period: "remediation",
    category: "remediation",
    title: "Site Clearance Begins",
    description: "Post-Katrina site clearance operations begin with FEMA assistance",
    significance: "moderate"
  },
  {
    year: 2007,
    date: "2007",
    period: "remediation",
    category: "corporate",
    title: "FCX Acquires Phelps Dodge",
    description: "FCX acquires Phelps Dodge, becoming world's largest publicly traded copper producer in largest mining acquisition in history",
    significance: "moderate"
  },
  {
    year: 2007,
    date: "2007",
    period: "remediation",
    category: "recovery",
    title: "FEMA Water Treatment Funding",
    description: "FEMA provides $1.5M funding for water treatment infrastructure recovery",
    significance: "moderate"
  },
  {
    year: 2009,
    date: "2009",
    period: "remediation",
    category: "environmental",
    title: "Environmental Assessment Under RECAP",
    description: "Environmental assessments conducted under Louisiana DEQ's Risk Evaluation/Corrective Action Program (RECAP) addressing sulfuric acid and heavy metals contamination",
    significance: "major"
  },
  {
    year: 2013,
    date: "2013",
    period: "remediation",
    category: "corporate",
    title: "Oil & Gas Acquisitions",
    description: "FCX acquires Plains Exploration & Production and McMoRan Exploration Co., creating U.S.-based natural resource company",
    significance: "minor"
  },
  {
    year: 2014,
    date: "2014",
    period: "remediation",
    category: "corporate",
    title: "Freeport-McMoRan Inc. Name Change",
    description: "Corporate name simplified from Freeport-McMoRan Copper & Gold Inc. to Freeport-McMoRan Inc.",
    significance: "minor"
  },
  {
    year: 2015,
    date: "2015",
    period: "remediation",
    category: "corporate",
    title: "Strategic Refocus on Copper",
    description: "FCX announces new strategy to focus on global leading position in copper industry",
    significance: "minor"
  },
  {
    year: 2016,
    date: "2016",
    period: "remediation",
    category: "corporate",
    title: "Asset Sales for Debt Reduction",
    description: "FCX generates $8 billion cash through asset sales including Tenke Fungurume and substantially all oil & gas assets",
    significance: "minor"
  },
  {
    year: 2018,
    date: "2018",
    period: "remediation",
    category: "corporate",
    title: "Indonesian Partnership",
    description: "FCX completes transaction with Indonesian government regarding PT-FI's long-term mining rights",
    significance: "minor"
  },
  {
    year: 2020,
    date: "circa 2020-2024",
    period: "remediation",
    category: "remediation",
    title: "Environmental Remediation Program",
    description: "Freeport-McMoRan conducts comprehensive remediation involving lime neutralization, soil amendments, and groundwater treatment",
    significance: "major"
  },
  {
    year: 2024,
    date: "2024",
    period: "remediation",
    category: "remediation",
    title: "Remediation Completion",
    description: "Environmental remediation completed per Freeport-McMoRan 2024 Sustainability Report",
    significance: "major"
  },
  {
    year: 2024,
    date: "2024",
    period: "remediation",
    category: "regulatory",
    title: "LDEQ 'Ready for Reuse' Status",
    description: "Site receives verified 'ready for reuse' status from Louisiana Department of Environmental Quality (LDEQ)",
    significance: "major"
  },
  {
    year: 2024,
    date: "2024",
    period: "remediation",
    category: "regulatory",
    title: "EPA No Enforcement Actions",
    description: "EPA ECHO database confirms no ongoing enforcement actions (AI #168766)",
    significance: "moderate"
  },
  {
    year: 2025,
    date: "September 2025",
    period: "remediation",
    category: "realestate",
    title: "Property Listed for Sale",
    description: "106.99-acre industrial waterfront property listed for $14.7M, emphasizing deep-water access for potential dock expansion",
    significance: "major"
  }
];

// ============================================================================
// KEY MILESTONES (Featured Events)
// ============================================================================

const KEY_MILESTONES = [
  {
    id: "founding",
    year: 1912,
    title: "Freeport Sulphur Company Founded",
    description: "Establishment of the company that would develop Port Sulphur operations",
    impact: "critical"
  },
  {
    id: "acquisition",
    year: 1932,
    title: "Sulfur Rights Acquisition",
    description: "Freeport acquires Lake Grande Écaille sulfur mining rights, initiating Port Sulphur development",
    impact: "critical"
  },
  {
    id: "commissioning",
    year: 1933,
    title: "Facility Commissioning",
    description: "Port Sulphur facility begins operations with completion of concrete dock",
    impact: "critical"
  },
  {
    id: "wartime_peak",
    year: 1944,
    title: "Wartime Production Excellence",
    description: "Army-Navy 'E' Award recognizes critical defense production contributions",
    impact: "major"
  },
  {
    id: "liquid_sulfur",
    year: 1955,
    title: "Liquid Sulfur Shipping Begins",
    description: "Facility capabilities expand to include liquid sulfur barge shipments",
    impact: "moderate"
  },
  {
    id: "mine_closure",
    year: 1978,
    title: "Grande Écaille Mine Closure",
    description: "Primary sulfur mine ceases operations after 45 years, marking beginning of decline",
    impact: "major"
  },
  {
    id: "operations_end",
    year: 2000,
    title: "Operations Cessation",
    description: "All sulfur operations cease due to market competition from recovered sulfur",
    impact: "major"
  },
  {
    id: "katrina",
    year: 2005,
    title: "Hurricane Katrina Destruction",
    description: "Catastrophic hurricane destroys remaining infrastructure, ending 72-year operational history",
    impact: "critical"
  },
  {
    id: "remediation_complete",
    year: 2024,
    title: "Environmental Remediation Completion",
    description: "Site remediation completed and verified as 'ready for reuse' by LDEQ",
    impact: "major"
  },
  {
    id: "market_listing",
    year: 2025,
    title: "Property Listed for Industrial Reuse",
    description: "Site marketed for new industrial development with deep-water access",
    impact: "moderate"
  }
];

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Get period configuration by ID
 */
function getPeriod(periodId) {
  return TIMELINE_CONFIG.periods.find(p => p.id === periodId);
}

/**
 * Get category configuration by ID
 */
function getCategory(categoryId) {
  return TIMELINE_CONFIG.categories[categoryId];
}

/**
 * Get significance level configuration
 */
function getSignificanceLevel(level) {
  return TIMELINE_CONFIG.significanceLevels[level];
}

/**
 * Filter events by significance level
 * @param {string[]} levels - Array of significance levels to include
 * @returns {Array} Filtered events
 */
function filterBySignificance(levels) {
  if (!levels || levels.length === 0) return TIMELINE_EVENTS;
  return TIMELINE_EVENTS.filter(event => levels.includes(event.significance));
}

/**
 * Filter events by category
 * @param {string[]} categories - Array of category IDs to include
 * @returns {Array} Filtered events
 */
function filterByCategory(categories) {
  if (!categories || categories.length === 0) return TIMELINE_EVENTS;
  return TIMELINE_EVENTS.filter(event => categories.includes(event.category));
}

/**
 * Filter events by period
 * @param {string} periodId - Period ID to filter by
 * @returns {Array} Filtered events
 */
function filterByPeriod(periodId) {
  if (!periodId) return TIMELINE_EVENTS;
  return TIMELINE_EVENTS.filter(event => event.period === periodId);
}

/**
 * Filter events by year range
 * @param {number} startYear - Start year
 * @param {number} endYear - End year
 * @returns {Array} Filtered events
 */
function filterByYearRange(startYear, endYear) {
  return TIMELINE_EVENTS.filter(event =>
    event.year >= startYear && event.year <= endYear
  );
}

/**
 * Get events for a specific zoom preset
 * @param {string} presetId - Zoom preset ID
 * @returns {Object} Preset configuration and filtered events
 */
function getZoomPreset(presetId) {
  const preset = TIMELINE_CONFIG.zoomPresets.find(p => p.id === presetId);
  if (!preset) return null;

  return {
    preset,
    events: filterByYearRange(preset.startYear, preset.endYear)
  };
}

/**
 * Group events by period
 * @returns {Object} Events grouped by period ID
 */
function groupByPeriod() {
  const grouped = {};
  TIMELINE_CONFIG.periods.forEach(period => {
    grouped[period.id] = TIMELINE_EVENTS.filter(e => e.period === period.id);
  });
  return grouped;
}

/**
 * Group events by category
 * @returns {Object} Events grouped by category
 */
function groupByCategory() {
  const grouped = {};
  Object.keys(TIMELINE_CONFIG.categories).forEach(cat => {
    grouped[cat] = TIMELINE_EVENTS.filter(e => e.category === cat);
  });
  return grouped;
}

/**
 * Get statistics about the timeline
 * @returns {Object} Timeline statistics
 */
function getTimelineStats() {
  const stats = {
    totalEvents: TIMELINE_EVENTS.length,
    timespan: {
      start: Math.min(...TIMELINE_EVENTS.map(e => e.year)),
      end: Math.max(...TIMELINE_EVENTS.map(e => e.year)),
      years: 0
    },
    bySignificance: {},
    byCategory: {},
    byPeriod: {}
  };

  stats.timespan.years = stats.timespan.end - stats.timespan.start;

  // Count by significance
  Object.keys(TIMELINE_CONFIG.significanceLevels).forEach(level => {
    stats.bySignificance[level] = TIMELINE_EVENTS.filter(e => e.significance === level).length;
  });

  // Count by category
  Object.keys(TIMELINE_CONFIG.categories).forEach(cat => {
    stats.byCategory[cat] = TIMELINE_EVENTS.filter(e => e.category === cat).length;
  });

  // Count by period
  TIMELINE_CONFIG.periods.forEach(period => {
    stats.byPeriod[period.id] = TIMELINE_EVENTS.filter(e => e.period === period.id).length;
  });

  return stats;
}

// ============================================================================
// CHART.JS CONFIGURATION GENERATOR
// ============================================================================

/**
 * Generate Chart.js timeline configuration
 * @param {Object} options - Configuration options
 * @returns {Object} Chart.js configuration object
 */
function generateChartConfig(options = {}) {
  const {
    filterSignificance = ['critical', 'major', 'moderate', 'minor'],
    filterCategories = [],
    filterPeriod = null,
    startYear = -1000,
    endYear = 2025,
    showLabels = true,
    showTooltips = true
  } = options;

  let events = TIMELINE_EVENTS;

  // Apply filters
  if (filterSignificance.length > 0) {
    events = events.filter(e => filterSignificance.includes(e.significance));
  }
  if (filterCategories.length > 0) {
    events = events.filter(e => filterCategories.includes(e.category));
  }
  if (filterPeriod) {
    events = events.filter(e => e.period === filterPeriod);
  }
  events = events.filter(e => e.year >= startYear && e.year <= endYear);

  // Prepare datasets
  const datasets = TIMELINE_CONFIG.periods.map(period => {
    const periodEvents = events.filter(e => e.period === period.id);

    return {
      label: period.name,
      data: periodEvents.map(event => ({
        x: event.year,
        y: TIMELINE_CONFIG.significanceLevels[event.significance].weight,
        event: event
      })),
      backgroundColor: period.color,
      borderColor: period.color,
      pointRadius: periodEvents.map(e =>
        TIMELINE_CONFIG.significanceLevels[e.significance].size
      ),
      pointHoverRadius: periodEvents.map(e =>
        TIMELINE_CONFIG.significanceLevels[e.significance].size + 4
      )
    };
  });

  return {
    type: 'scatter',
    data: { datasets },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          type: 'linear',
          position: 'bottom',
          min: startYear,
          max: endYear,
          title: {
            display: true,
            text: 'Year',
            font: { size: 14, weight: 'bold' }
          },
          grid: {
            color: 'rgba(255, 255, 255, 0.1)'
          },
          ticks: {
            color: 'rgba(255, 255, 255, 0.7)',
            callback: function(value) {
              if (value < 0) return `${Math.abs(value)} BCE`;
              return value;
            }
          }
        },
        y: {
          type: 'linear',
          min: 0,
          max: 5,
          title: {
            display: true,
            text: 'Significance',
            font: { size: 14, weight: 'bold' }
          },
          grid: {
            color: 'rgba(255, 255, 255, 0.1)'
          },
          ticks: {
            color: 'rgba(255, 255, 255, 0.7)',
            stepSize: 1,
            callback: function(value) {
              const levels = ['', 'Minor', 'Moderate', 'Major', 'Critical'];
              return levels[value] || '';
            }
          }
        }
      },
      plugins: {
        legend: {
          display: true,
          position: 'top',
          labels: {
            color: 'rgba(255, 255, 255, 0.9)',
            font: { size: 12 },
            usePointStyle: true,
            padding: 15
          }
        },
        tooltip: {
          enabled: showTooltips,
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          titleColor: '#64ffb4',
          bodyColor: 'rgba(255, 255, 255, 0.9)',
          borderColor: '#64ffb4',
          borderWidth: 1,
          padding: 12,
          displayColors: true,
          callbacks: {
            title: function(context) {
              const event = context[0].raw.event;
              return event.title;
            },
            label: function(context) {
              const event = context.raw.event;
              return [
                `Date: ${event.date}`,
                `Category: ${getCategory(event.category).label}`,
                `Significance: ${event.significance.charAt(0).toUpperCase() + event.significance.slice(1)}`,
                '',
                event.description
              ];
            }
          }
        }
      },
      interaction: {
        mode: 'point',
        intersect: false
      }
    }
  };
}

// ============================================================================
// HTML TIMELINE GENERATOR (Alternative to Chart.js)
// ============================================================================

/**
 * Generate HTML timeline visualization
 * @param {string} containerId - ID of container element
 * @param {Object} options - Configuration options
 */
function generateHTMLTimeline(containerId, options = {}) {
  const {
    filterSignificance = ['critical', 'major', 'moderate', 'minor'],
    filterCategories = [],
    startYear = -1000,
    endYear = 2025,
    showPeriodBackgrounds = true
  } = options;

  let events = TIMELINE_EVENTS;

  // Apply filters
  if (filterSignificance.length > 0) {
    events = events.filter(e => filterSignificance.includes(e.significance));
  }
  if (filterCategories.length > 0) {
    events = events.filter(e => filterCategories.includes(e.category));
  }
  events = events.filter(e => e.year >= startYear && e.year <= endYear);

  const container = document.getElementById(containerId);
  if (!container) {
    console.error(`Container #${containerId} not found`);
    return;
  }

  container.innerHTML = '';
  container.className = 'history-timeline';

  // Create timeline structure
  const timelineTrack = document.createElement('div');
  timelineTrack.className = 'timeline-track';

  // Add period backgrounds
  if (showPeriodBackgrounds) {
    TIMELINE_CONFIG.periods.forEach(period => {
      if (period.endYear >= startYear && period.startYear <= endYear) {
        const periodBg = document.createElement('div');
        periodBg.className = 'period-background';
        periodBg.style.backgroundColor = period.backgroundColor;
        periodBg.style.left = `${((period.startYear - startYear) / (endYear - startYear)) * 100}%`;
        periodBg.style.width = `${((period.endYear - period.startYear) / (endYear - startYear)) * 100}%`;
        periodBg.innerHTML = `<span class="period-label">${period.name}</span>`;
        timelineTrack.appendChild(periodBg);
      }
    });
  }

  // Add events
  events.forEach(event => {
    const eventEl = document.createElement('div');
    eventEl.className = `timeline-event significance-${event.significance}`;

    const position = ((event.year - startYear) / (endYear - startYear)) * 100;
    eventEl.style.left = `${position}%`;

    const category = getCategory(event.category);
    const period = getPeriod(event.period);

    eventEl.innerHTML = `
      <div class="event-marker" style="background-color: ${category.color};">
        <span class="event-icon">${category.icon}</span>
      </div>
      <div class="event-label" style="border-color: ${category.color};">
        <div class="event-date">${event.date}</div>
        <div class="event-title">${event.title}</div>
        <div class="event-category">${category.label}</div>
      </div>
      <div class="event-tooltip">
        <h4>${event.title}</h4>
        <p class="tooltip-date">${event.date}</p>
        <p class="tooltip-category">${category.icon} ${category.label}</p>
        <p class="tooltip-description">${event.description}</p>
        <p class="tooltip-significance">Significance: ${event.significance}</p>
      </div>
    `;

    timelineTrack.appendChild(eventEl);
  });

  container.appendChild(timelineTrack);
}

// ============================================================================
// EXPORT FOR USE IN OTHER MODULES
// ============================================================================

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    TIMELINE_CONFIG,
    TIMELINE_EVENTS,
    KEY_MILESTONES,
    getPeriod,
    getCategory,
    getSignificanceLevel,
    filterBySignificance,
    filterByCategory,
    filterByPeriod,
    filterByYearRange,
    getZoomPreset,
    groupByPeriod,
    groupByCategory,
    getTimelineStats,
    generateChartConfig,
    generateHTMLTimeline
  };
}
