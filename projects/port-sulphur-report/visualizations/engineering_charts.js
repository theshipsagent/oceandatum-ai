/**
 * Engineering Charts Configuration for Port Sulphur Terminal Analysis
 * Generated from engineering_data.json
 *
 * Chart.js visualizations for:
 * - Seasonal operational patterns
 * - Discharge statistics
 * - Design parameters
 * - Construction windows
 */

// Color palette matching oceandatum.ai design
const COLORS = {
  primary: '#64ffb4',      // Maritime green accent
  secondary: '#4a9eff',    // Blue
  warning: '#ffb74d',      // Amber
  danger: '#ff6b6b',       // Red
  dark: '#0a0a0a',         // Background dark
  darkAlt: '#1a1a2e',      // Alternative dark
  text: 'rgba(255,255,255,0.9)',
  textLight: 'rgba(255,255,255,0.7)',
  border: 'rgba(255,255,255,0.2)',
  gridLines: 'rgba(255,255,255,0.1)'
};

// Global Chart.js defaults for dark theme
const CHART_DEFAULTS = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      labels: {
        color: COLORS.text,
        font: { family: 'Space Grotesk, sans-serif', size: 12 },
        padding: 15
      }
    },
    tooltip: {
      backgroundColor: 'rgba(26, 26, 46, 0.95)',
      titleColor: COLORS.primary,
      bodyColor: COLORS.text,
      borderColor: COLORS.border,
      borderWidth: 1,
      padding: 12,
      titleFont: { family: 'Space Grotesk, sans-serif', size: 13, weight: 'bold' },
      bodyFont: { family: 'Space Grotesk, sans-serif', size: 12 }
    }
  },
  scales: {
    x: {
      ticks: { color: COLORS.textLight, font: { family: 'Space Grotesk, sans-serif', size: 11 } },
      grid: { color: COLORS.gridLines }
    },
    y: {
      ticks: { color: COLORS.textLight, font: { family: 'Space Grotesk, sans-serif', size: 11 } },
      grid: { color: COLORS.gridLines }
    }
  }
};

/**
 * 1. SEASONAL OPERATIONAL PATTERNS CHART
 * Displays current velocity ranges by season with operational context
 */
const seasonalOperationsChart = {
  type: 'bar',
  data: {
    labels: [
      'Spring High Water\n(Mar-Jun)',
      'Summer/Fall Normal\n(Jul-Oct)',
      'Winter Low Water\n(Nov-Feb)'
    ],
    datasets: [
      {
        label: 'Maximum Velocity',
        data: [4.0, 2.5, 1.5], // ft/sec
        backgroundColor: COLORS.danger,
        borderColor: COLORS.danger,
        borderWidth: 2
      },
      {
        label: 'Minimum Velocity',
        data: [2.5, 1.5, 1.0], // ft/sec
        backgroundColor: COLORS.primary,
        borderColor: COLORS.primary,
        borderWidth: 2
      }
    ]
  },
  options: {
    ...CHART_DEFAULTS,
    plugins: {
      ...CHART_DEFAULTS.plugins,
      title: {
        display: true,
        text: 'Seasonal Current Velocity Patterns at Port Sulphur (RM 39)',
        color: COLORS.text,
        font: { family: 'Space Grotesk, sans-serif', size: 16, weight: 'bold' },
        padding: { top: 10, bottom: 20 }
      },
      subtitle: {
        display: true,
        text: 'Estimated velocities based on Belle Chasse USGS 07374525 hydrographic data',
        color: COLORS.textLight,
        font: { family: 'Space Grotesk, sans-serif', size: 11 },
        padding: { bottom: 20 }
      },
      legend: {
        ...CHART_DEFAULTS.plugins.legend,
        position: 'top'
      },
      tooltip: {
        ...CHART_DEFAULTS.plugins.tooltip,
        callbacks: {
          label: function(context) {
            return `${context.dataset.label}: ${context.parsed.y.toFixed(1)} ft/sec (${(context.parsed.y * 0.6818).toFixed(2)} mph)`;
          },
          afterLabel: function(context) {
            const seasonalInfo = {
              0: 'High current stress • Construction limitations • Maximum draft access',
              1: 'Optimal navigation • Best construction window • Standard operations',
              2: 'Low current stress • Underwater work ideal • Draft restrictions'
            };
            return '\n' + seasonalInfo[context.dataIndex];
          }
        }
      }
    },
    scales: {
      x: {
        ...CHART_DEFAULTS.scales.x,
        title: {
          display: true,
          text: 'Seasonal Period',
          color: COLORS.text,
          font: { family: 'Space Grotesk, sans-serif', size: 12, weight: 'bold' }
        }
      },
      y: {
        ...CHART_DEFAULTS.scales.y,
        title: {
          display: true,
          text: 'Current Velocity (ft/sec)',
          color: COLORS.text,
          font: { family: 'Space Grotesk, sans-serif', size: 12, weight: 'bold' }
        },
        beginAtZero: true,
        max: 4.5,
        ticks: {
          ...CHART_DEFAULTS.scales.y.ticks,
          callback: function(value) {
            return value.toFixed(1) + ' ft/s';
          }
        }
      }
    }
  }
};

/**
 * 2. DISCHARGE STATISTICS HISTOGRAM
 * Historical discharge distribution from Belle Chasse station
 */
const dischargeStatisticsChart = {
  type: 'bar',
  data: {
    labels: [
      'Extreme Low\n(2023 Min)',
      '25th Percentile\nLow Normal',
      'Median\nNormal Navigation',
      '75th Percentile\nHigh Water',
      'Extreme High\n(2018 Max)'
    ],
    datasets: [{
      label: 'Discharge (cubic feet per second)',
      data: [131000, 222000, 283000, 379000, 645000],
      backgroundColor: [
        COLORS.warning,    // Extreme low - warning
        COLORS.primary,    // 25th percentile - good
        COLORS.secondary,  // Median - optimal
        COLORS.warning,    // 75th percentile - high
        COLORS.danger      // Extreme high - danger
      ],
      borderColor: COLORS.border,
      borderWidth: 1
    }]
  },
  options: {
    ...CHART_DEFAULTS,
    plugins: {
      ...CHART_DEFAULTS.plugins,
      title: {
        display: true,
        text: 'Mississippi River Discharge Statistics - Belle Chasse Station',
        color: COLORS.text,
        font: { family: 'Space Grotesk, sans-serif', size: 16, weight: 'bold' },
        padding: { top: 10, bottom: 20 }
      },
      subtitle: {
        display: true,
        text: 'USGS 07374525 (RM 76) - Historical discharge distribution',
        color: COLORS.textLight,
        font: { family: 'Space Grotesk, sans-serif', size: 11 },
        padding: { bottom: 20 }
      },
      legend: {
        display: false
      },
      tooltip: {
        ...CHART_DEFAULTS.plugins.tooltip,
        callbacks: {
          label: function(context) {
            const cfs = context.parsed.y;
            const cms = (cfs * 0.028317).toFixed(0); // Convert to cubic meters/sec
            return `${cfs.toLocaleString()} cfs (${cms} m³/s)`;
          },
          afterLabel: function(context) {
            const descriptions = [
              'Extreme low water - Draft restrictions',
              'Low normal - Standard operations',
              'Normal navigation - Optimal conditions',
              'High water operations - Maximum depths',
              'Extreme flood - High current stress'
            ];
            return '\n' + descriptions[context.dataIndex];
          }
        }
      }
    },
    scales: {
      x: {
        ...CHART_DEFAULTS.scales.x,
        title: {
          display: true,
          text: 'Flow Condition Category',
          color: COLORS.text,
          font: { family: 'Space Grotesk, sans-serif', size: 12, weight: 'bold' }
        }
      },
      y: {
        ...CHART_DEFAULTS.scales.y,
        title: {
          display: true,
          text: 'Discharge (cubic feet per second)',
          color: COLORS.text,
          font: { family: 'Space Grotesk, sans-serif', size: 12, weight: 'bold' }
        },
        beginAtZero: true,
        ticks: {
          ...CHART_DEFAULTS.scales.y.ticks,
          callback: function(value) {
            return (value / 1000).toFixed(0) + 'k cfs';
          }
        }
      }
    }
  }
};

/**
 * 3. DESIGN PARAMETERS RADAR CHART
 * Multi-dimensional view of design requirements across conditions
 */
const designParametersChart = {
  type: 'radar',
  data: {
    labels: [
      'Current Loading\n(normalized)',
      'Mooring Capacity\nRequirement',
      'Scour Protection\nIntensity',
      'Foundation\nComplexity',
      'Construction\nDifficulty',
      'Operational\nFlexibility'
    ],
    datasets: [
      {
        label: 'Extreme High Water (4.0 ft/sec)',
        data: [100, 100, 100, 90, 80, 60], // Normalized percentages
        backgroundColor: 'rgba(255, 107, 107, 0.2)',
        borderColor: COLORS.danger,
        borderWidth: 2,
        pointBackgroundColor: COLORS.danger,
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: COLORS.danger
      },
      {
        label: 'Normal Operations (2.0-2.5 ft/sec)',
        data: [60, 65, 70, 70, 50, 100], // Normalized percentages
        backgroundColor: 'rgba(74, 158, 255, 0.2)',
        borderColor: COLORS.secondary,
        borderWidth: 2,
        pointBackgroundColor: COLORS.secondary,
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: COLORS.secondary
      },
      {
        label: 'Low Water (1.0-1.5 ft/sec)',
        data: [30, 40, 40, 60, 30, 70], // Normalized percentages
        backgroundColor: 'rgba(100, 255, 180, 0.2)',
        borderColor: COLORS.primary,
        borderWidth: 2,
        pointBackgroundColor: COLORS.primary,
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: COLORS.primary
      }
    ]
  },
  options: {
    ...CHART_DEFAULTS,
    plugins: {
      ...CHART_DEFAULTS.plugins,
      title: {
        display: true,
        text: 'Design Parameters Across Operating Conditions',
        color: COLORS.text,
        font: { family: 'Space Grotesk, sans-serif', size: 16, weight: 'bold' },
        padding: { top: 10, bottom: 20 }
      },
      subtitle: {
        display: true,
        text: 'Normalized requirements (0-100 scale) for structural and operational systems',
        color: COLORS.textLight,
        font: { family: 'Space Grotesk, sans-serif', size: 11 },
        padding: { bottom: 20 }
      },
      legend: {
        ...CHART_DEFAULTS.plugins.legend,
        position: 'bottom'
      },
      tooltip: {
        ...CHART_DEFAULTS.plugins.tooltip,
        callbacks: {
          label: function(context) {
            return `${context.dataset.label}: ${context.parsed.r}/100`;
          }
        }
      }
    },
    scales: {
      r: {
        angleLines: { color: COLORS.gridLines },
        grid: { color: COLORS.gridLines },
        pointLabels: {
          color: COLORS.text,
          font: { family: 'Space Grotesk, sans-serif', size: 10 }
        },
        ticks: {
          color: COLORS.textLight,
          backdropColor: 'transparent',
          font: { family: 'Space Grotesk, sans-serif', size: 9 }
        },
        suggestedMin: 0,
        suggestedMax: 100
      }
    }
  }
};

/**
 * 4. CONSTRUCTION WINDOW TIMELINE
 * Gantt-style visualization of seasonal construction opportunities
 */
const constructionWindowChart = {
  type: 'bar',
  data: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Optimal Marine Construction',
        data: [0, 0, 0, 0, 0, 0, 90, 90, 90, 90, 0, 0], // July-October
        backgroundColor: COLORS.primary,
        borderColor: COLORS.primary,
        borderWidth: 1
      },
      {
        label: 'Underwater Work Window',
        data: [85, 85, 0, 0, 0, 0, 0, 0, 0, 0, 85, 85], // November-February
        backgroundColor: COLORS.secondary,
        borderColor: COLORS.secondary,
        borderWidth: 1
      },
      {
        label: 'Restricted Construction',
        data: [0, 0, 40, 40, 40, 40, 0, 0, 0, 0, 0, 0], // March-June (limited)
        backgroundColor: COLORS.danger,
        borderColor: COLORS.danger,
        borderWidth: 1
      }
    ]
  },
  options: {
    ...CHART_DEFAULTS,
    plugins: {
      ...CHART_DEFAULTS.plugins,
      title: {
        display: true,
        text: 'Seasonal Construction Windows - Port Sulphur Terminal',
        color: COLORS.text,
        font: { family: 'Space Grotesk, sans-serif', size: 16, weight: 'bold' },
        padding: { top: 10, bottom: 20 }
      },
      subtitle: {
        display: true,
        text: 'Construction feasibility by month based on hydrologic conditions',
        color: COLORS.textLight,
        font: { family: 'Space Grotesk, sans-serif', size: 11 },
        padding: { bottom: 20 }
      },
      legend: {
        ...CHART_DEFAULTS.plugins.legend,
        position: 'top'
      },
      tooltip: {
        ...CHART_DEFAULTS.plugins.tooltip,
        callbacks: {
          label: function(context) {
            if (context.parsed.y === 0) return null;
            return `${context.dataset.label}: ${context.parsed.y}% feasible`;
          },
          afterLabel: function(context) {
            const monthConditions = {
              0: 'Low water - Ideal for underwater work',
              1: 'Low water - Ideal for underwater work',
              2: 'High water begins - Limited construction',
              3: 'High water - High current restrictions',
              4: 'High water - High current restrictions',
              5: 'High water - High current restrictions',
              6: 'Normal flow - Optimal construction period',
              7: 'Normal flow - Optimal construction period',
              8: 'Normal flow - Optimal construction period',
              9: 'Normal flow - Optimal construction period',
              10: 'Low water transition - Good for underwater work',
              11: 'Low water - Ideal for underwater work'
            };
            return context.parsed.y > 0 ? '\n' + monthConditions[context.dataIndex] : null;
          }
        }
      }
    },
    scales: {
      x: {
        ...CHART_DEFAULTS.scales.x,
        stacked: false,
        title: {
          display: true,
          text: 'Month',
          color: COLORS.text,
          font: { family: 'Space Grotesk, sans-serif', size: 12, weight: 'bold' }
        }
      },
      y: {
        ...CHART_DEFAULTS.scales.y,
        stacked: false,
        title: {
          display: true,
          text: 'Construction Feasibility (%)',
          color: COLORS.text,
          font: { family: 'Space Grotesk, sans-serif', size: 12, weight: 'bold' }
        },
        beginAtZero: true,
        max: 100,
        ticks: {
          ...CHART_DEFAULTS.scales.y.ticks,
          callback: function(value) {
            return value + '%';
          }
        }
      }
    }
  }
};

/**
 * 5. DESIGN VELOCITY COMPARISON CHART
 * Compare design velocities across different conditions
 */
const designVelocityChart = {
  type: 'horizontalBar',
  data: {
    labels: [
      'Extreme High\n(Spring Flood)',
      'High Water\n(Spring)',
      'Normal Operations\n(Summer/Fall)',
      'Low Water\n(Winter)',
      'Current @ Belle Chasse\n(Sep 2025 observed)'
    ],
    datasets: [{
      label: 'Current Velocity (ft/sec)',
      data: [4.0, 3.25, 2.0, 1.25, 1.94], // Midpoint values except for observed
      backgroundColor: [
        COLORS.danger,
        COLORS.warning,
        COLORS.secondary,
        COLORS.primary,
        '#9c27b0' // Purple for observed data
      ],
      borderColor: COLORS.border,
      borderWidth: 1
    }]
  },
  options: {
    indexAxis: 'y',
    ...CHART_DEFAULTS,
    plugins: {
      ...CHART_DEFAULTS.plugins,
      title: {
        display: true,
        text: 'Design Current Velocity Specifications',
        color: COLORS.text,
        font: { family: 'Space Grotesk, sans-serif', size: 16, weight: 'bold' },
        padding: { top: 10, bottom: 20 }
      },
      subtitle: {
        display: true,
        text: 'Port Sulphur RM 39 - Design basis for structural analysis',
        color: COLORS.textLight,
        font: { family: 'Space Grotesk, sans-serif', size: 11 },
        padding: { bottom: 20 }
      },
      legend: {
        display: false
      },
      tooltip: {
        ...CHART_DEFAULTS.plugins.tooltip,
        callbacks: {
          label: function(context) {
            const fps = context.parsed.x;
            const mph = (fps * 0.6818).toFixed(2);
            const knots = (fps * 0.5925).toFixed(2);
            return [
              `Velocity: ${fps.toFixed(2)} ft/sec`,
              `Equivalent: ${mph} mph`,
              `Equivalent: ${knots} knots`
            ];
          },
          afterLabel: function(context) {
            const requirements = [
              'Maximum structural loading design',
              'Heavy-duty mooring & fender systems',
              'Standard operating design basis',
              'Minimum current loading',
              'Actual observation - Belle Chasse'
            ];
            return '\n' + requirements[context.dataIndex];
          }
        }
      }
    },
    scales: {
      x: {
        ...CHART_DEFAULTS.scales.x,
        title: {
          display: true,
          text: 'Current Velocity (ft/sec)',
          color: COLORS.text,
          font: { family: 'Space Grotesk, sans-serif', size: 12, weight: 'bold' }
        },
        beginAtZero: true,
        max: 4.5,
        ticks: {
          ...CHART_DEFAULTS.scales.x.ticks,
          callback: function(value) {
            return value.toFixed(1);
          }
        }
      },
      y: {
        ...CHART_DEFAULTS.scales.y,
        title: {
          display: true,
          text: 'Design Condition',
          color: COLORS.text,
          font: { family: 'Space Grotesk, sans-serif', size: 12, weight: 'bold' }
        }
      }
    }
  }
};

/**
 * DESIGN PARAMETERS TABLE DATA
 * Structured data for HTML table generation
 */
const designParametersTable = {
  title: 'Design Parameters Specification Summary',
  subtitle: 'Port Sulphur Terminal - Engineering Design Criteria',
  sections: [
    {
      category: 'Current Velocities',
      parameters: [
        {
          parameter: 'Extreme High (Spring Flood)',
          value: '4.0 ft/sec',
          condition: 'Spring flood conditions',
          requirement: 'Maximum structural loading'
        },
        {
          parameter: 'High Water Range',
          value: '2.5 - 4.0 ft/sec',
          condition: 'Spring high water (Mar-Jun)',
          requirement: 'Heavy-duty mooring and fender systems'
        },
        {
          parameter: 'Normal Operations',
          value: '1.5 - 2.5 ft/sec',
          condition: 'Summer/fall (Jul-Oct)',
          requirement: 'Standard operating design basis'
        },
        {
          parameter: 'Low Water Range',
          value: '1.0 - 1.5 ft/sec',
          condition: 'Winter low water (Nov-Feb)',
          requirement: 'Minimum current loading'
        }
      ]
    },
    {
      category: 'Structural Requirements - Foundations',
      parameters: [
        {
          parameter: 'Current Loading Design',
          value: '4+ ft/sec',
          condition: 'Maximum velocity accommodation',
          requirement: 'Must accommodate extreme spring flood velocities'
        },
        {
          parameter: 'Scour Protection',
          value: 'Critical system',
          condition: 'High-velocity periods',
          requirement: 'Required during all high current conditions'
        },
        {
          parameter: 'Variable Conditions',
          value: 'Full range design',
          condition: 'Variable water levels and loading',
          requirement: 'Design for 1.0-4.0 ft/sec operational envelope'
        }
      ]
    },
    {
      category: 'Structural Requirements - Mooring Systems',
      parameters: [
        {
          parameter: 'Bollards & Cleats',
          value: 'High-capacity',
          condition: 'Extreme current forces',
          requirement: 'Design for maximum spring flood forces'
        },
        {
          parameter: 'Fender Systems',
          value: 'Heavy-duty',
          condition: 'Vessel impact protection',
          requirement: 'Accommodate large vessel impacts in high current'
        }
      ]
    },
    {
      category: 'Revetment Interface Requirements',
      parameters: [
        {
          parameter: 'Penetration Procedures',
          value: 'USACE Standard',
          condition: 'June 1999 standard drawing',
          requirement: 'Full compliance with revetment penetration procedures'
        },
        {
          parameter: 'Collar & Seal Systems',
          value: 'Full thickness',
          condition: 'Protective mat integration',
          requirement: 'Engineered collar spanning full mat thickness'
        },
        {
          parameter: 'Toe Protection',
          value: 'Additional provisions',
          condition: 'Base of revetment',
          requirement: 'Additional protection measures required'
        },
        {
          parameter: 'Performance Monitoring',
          value: 'Long-term',
          condition: 'Continuous assessment',
          requirement: 'Ongoing monitoring of penetration integrity'
        }
      ]
    },
    {
      category: 'Construction Constraints',
      parameters: [
        {
          parameter: 'Optimal Marine Construction',
          value: 'July - October',
          condition: 'Normal flow period',
          requirement: 'Best window for general marine construction'
        },
        {
          parameter: 'Underwater Work Window',
          value: 'November - February',
          condition: 'Low water period',
          requirement: 'Ideal for underwater construction activities'
        },
        {
          parameter: 'Restricted Period',
          value: 'March - June',
          condition: 'Spring high water',
          requirement: 'High velocities restrict marine construction'
        },
        {
          parameter: 'Revetment Protection',
          value: 'Critical infrastructure',
          condition: 'All construction phases',
          requirement: 'Minimize stress, avoid lateral loading, engineering oversight'
        }
      ]
    }
  ]
};

/**
 * CONSTRUCTION WINDOW TIMELINE DATA
 * Structured data for timeline visualization
 */
const constructionTimeline = {
  title: 'Annual Construction Window Planning',
  subtitle: 'Optimal timing for different construction activities at Port Sulphur',
  windows: [
    {
      period: 'January - February',
      duration: '2 months',
      type: 'Underwater Work Window',
      feasibility: 85,
      conditions: {
        discharge: '131,000 - 222,000 cfs',
        velocity: '1.0 - 1.5 ft/sec',
        stage: 'Low water'
      },
      advantages: [
        'Minimal current stress on structures',
        'Ideal for underwater construction',
        'Low-risk maintenance window',
        'Reduced operational costs'
      ],
      limitations: [
        'Draft restrictions for vessel access',
        'Light-loading requirements',
        'Potential channel shoaling'
      ],
      recommendedActivities: [
        'Underwater pile installation',
        'Foundation work below waterline',
        'Submerged infrastructure inspection',
        'Dredging operations'
      ]
    },
    {
      period: 'March - June',
      duration: '4 months',
      type: 'Restricted Construction',
      feasibility: 40,
      conditions: {
        discharge: '375,000+ cfs',
        velocity: '2.5 - 4.0 ft/sec',
        stage: 'High water'
      },
      advantages: [
        'Maximum draft access',
        'Optimal depths for large vessels',
        'Natural channel maintenance'
      ],
      limitations: [
        'High current structural loading',
        'Difficult vessel mooring',
        'Limited marine construction',
        'Flooding risk'
      ],
      recommendedActivities: [
        'Shore-based construction only',
        'Material delivery with large vessels',
        'Planning and permitting',
        'Equipment mobilization on land'
      ]
    },
    {
      period: 'July - October',
      duration: '4 months',
      type: 'Optimal Marine Construction',
      feasibility: 90,
      conditions: {
        discharge: '222,000 - 379,000 cfs',
        velocity: '1.5 - 2.5 ft/sec',
        stage: 'Normal operations'
      },
      advantages: [
        'Balanced depth and current',
        'Optimal vessel handling',
        'Predictable conditions',
        'Standard equipment adequate'
      ],
      limitations: [
        'Standard navigation protocols required',
        'Seasonal transition to low water'
      ],
      recommendedActivities: [
        'Pile driving and foundation work',
        'Dock and wharf construction',
        'Heavy equipment operations',
        'Mooring system installation',
        'Fender system installation',
        'General marine construction'
      ]
    },
    {
      period: 'November - December',
      duration: '2 months',
      type: 'Underwater Work Window',
      feasibility: 85,
      conditions: {
        discharge: '131,000 - 222,000 cfs',
        velocity: '1.0 - 1.5 ft/sec',
        stage: 'Low water transition'
      },
      advantages: [
        'Low current stress',
        'Good underwater visibility',
        'Reduced operational risk',
        'Cost-effective operations'
      ],
      limitations: [
        'Decreasing depths',
        'Draft restrictions beginning',
        'Weather considerations'
      ],
      recommendedActivities: [
        'Final underwater work',
        'Infrastructure inspection',
        'Maintenance activities',
        'Testing and commissioning'
      ]
    }
  ]
};

/**
 * REGULATORY COMPLIANCE CHECKLIST
 * Key requirements for engineering compliance
 */
const regulatoryChecklist = {
  title: 'Engineering Regulatory Compliance Requirements',
  sections: [
    {
      regulation: 'Section 408 - Rivers and Harbors Act',
      authority: 'USACE New Orleans District (CEMVN-ED-LC)',
      requirements: [
        'Permission for any development affecting MR&T project features',
        'Compliance with June 1999 revetment penetration procedures',
        'Integration with 2025 Programmatic Environmental Assessment',
        'Engineered collar and seal systems for mat penetrations',
        'Long-term performance monitoring plan'
      ]
    },
    {
      regulation: 'Section 10 - Rivers and Harbors Act',
      authority: 'USACE Regulatory Division',
      requirements: [
        'Permits for structures in/over navigable waters',
        'Navigation safety assessment',
        'Environmental protection measures',
        'Coordination with water-dependent uses',
        'Can be processed simultaneously with Section 408'
      ]
    },
    {
      regulation: 'Section 404 - Clean Water Act',
      authority: 'USACE Regulatory Division',
      requirements: [
        'Permits for fill material placement',
        'Structural foundation approvals',
        'Scour protection systems',
        'Approach materials evaluation',
        'Pile foundations addressed as regulated fill'
      ]
    },
    {
      regulation: '33 CFR 207.200 - Anchoring Restrictions',
      authority: 'U.S. Coast Guard / USACE',
      requirements: [
        'No anchoring over revetted banks without authorization',
        'Vessel positioning via designated anchorage areas',
        'Approved mooring systems required',
        'Reference Coast Pilot 5 for guidance'
      ]
    }
  ]
};

/**
 * EXPORT ALL CONFIGURATIONS
 */
if (typeof module !== 'undefined' && module.exports) {
  // Node.js environment
  module.exports = {
    seasonalOperationsChart,
    dischargeStatisticsChart,
    designParametersChart,
    constructionWindowChart,
    designVelocityChart,
    designParametersTable,
    constructionTimeline,
    regulatoryChecklist,
    COLORS,
    CHART_DEFAULTS
  };
} else {
  // Browser environment - attach to window
  window.engineeringCharts = {
    seasonalOperationsChart,
    dischargeStatisticsChart,
    designParametersChart,
    constructionWindowChart,
    designVelocityChart,
    designParametersTable,
    constructionTimeline,
    regulatoryChecklist,
    COLORS,
    CHART_DEFAULTS
  };
}
