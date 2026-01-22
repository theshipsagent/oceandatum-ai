/**
 * Environmental Charts for Port Sulphur Terminal Analysis
 * Chart.js visualization configurations
 *
 * Color Scheme:
 * - Primary: Blues/Greens from oceandatum.ai
 * - Accent: #64ffb4 (maritime green)
 * - Backgrounds: Dark gradient (#0a0a0a to #1a1a2e)
 */

// ============================================================================
// COLOR PALETTE
// ============================================================================

const COLORS = {
  // Primary colors
  accent: '#64ffb4',
  accentDark: '#3dda8a',

  // Status colors
  critical: '#ef5350',
  high: '#ff9800',
  medium: '#ffca28',
  low: '#66bb6a',
  completed: '#4caf50',

  // Blues/Greens
  blue1: '#2196f3',
  blue2: '#1976d2',
  blue3: '#0d47a1',
  green1: '#4caf50',
  green2: '#388e3c',
  green3: '#1b5e20',
  teal1: '#26a69a',
  teal2: '#00897b',

  // Grays
  gray1: 'rgba(255, 255, 255, 0.9)',
  gray2: 'rgba(255, 255, 255, 0.7)',
  gray3: 'rgba(255, 255, 255, 0.5)',
  gray4: 'rgba(255, 255, 255, 0.3)',

  // Backgrounds
  bgDark: '#0a0a0a',
  bgMedium: '#1a1a2e',
  bgLight: 'rgba(255, 255, 255, 0.05)'
};

// ============================================================================
// COMMON CHART OPTIONS
// ============================================================================

const commonOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      labels: {
        color: COLORS.gray1,
        font: {
          family: 'Space Grotesk, sans-serif',
          size: 12
        }
      }
    },
    tooltip: {
      backgroundColor: COLORS.bgMedium,
      titleColor: COLORS.accent,
      bodyColor: COLORS.gray1,
      borderColor: COLORS.gray4,
      borderWidth: 1,
      padding: 12,
      titleFont: {
        family: 'Space Grotesk, sans-serif',
        size: 14,
        weight: 'bold'
      },
      bodyFont: {
        family: 'Space Grotesk, sans-serif',
        size: 12
      }
    }
  },
  scales: {
    x: {
      ticks: {
        color: COLORS.gray2,
        font: {
          family: 'Space Grotesk, sans-serif',
          size: 11
        }
      },
      grid: {
        color: COLORS.gray4,
        borderColor: COLORS.gray4
      }
    },
    y: {
      ticks: {
        color: COLORS.gray2,
        font: {
          family: 'Space Grotesk, sans-serif',
          size: 11
        }
      },
      grid: {
        color: COLORS.gray4,
        borderColor: COLORS.gray4
      }
    }
  }
};

// ============================================================================
// 1. CONTAMINATION LEVELS BAR CHART
// ============================================================================

const contaminationLevelsConfig = {
  type: 'bar',
  data: {
    labels: [
      'Elemental Sulfur\n(mg/kg)',
      'Soil pH\n(Scale)',
      '2-Methylnaphthalene\n(Diesel)',
      'Naphthalene\n(Diesel)',
      'Lead\n(mg/kg)',
      'Arsenic\n(mg/kg)'
    ],
    datasets: [
      {
        label: 'Observed Concentration',
        data: [
          50900,  // Max elemental sulfur (mg/kg)
          2.5,    // Typical low pH
          null,   // Present in Area B-3 (qualitative)
          null,   // Present in TW-3 (qualitative)
          null,   // Present in TW-13/14 (qualitative)
          null    // Present in TW-13/14 (qualitative)
        ],
        backgroundColor: COLORS.critical,
        borderColor: COLORS.critical,
        borderWidth: 2
      },
      {
        label: 'Threshold/Standard',
        data: [
          10000,  // Sulfur threshold (mg/kg)
          3.0,    // pH threshold
          null,
          null,
          null,
          null
        ],
        backgroundColor: COLORS.medium,
        borderColor: COLORS.medium,
        borderWidth: 2
      }
    ]
  },
  options: {
    ...commonOptions,
    plugins: {
      ...commonOptions.plugins,
      title: {
        display: true,
        text: 'Soil & Groundwater Contamination Levels',
        color: COLORS.gray1,
        font: {
          family: 'Space Grotesk, sans-serif',
          size: 16,
          weight: 'bold'
        },
        padding: {
          top: 10,
          bottom: 20
        }
      },
      legend: {
        ...commonOptions.plugins.legend,
        position: 'top'
      },
      tooltip: {
        ...commonOptions.plugins.tooltip,
        callbacks: {
          afterLabel: function(context) {
            const labels = [
              'Max observed: 50,900 mg/kg\nThreshold: 10,000 mg/kg\nExceeds standard by 5x',
              'Typical range: 2.5-3.5 pH\nThreshold: 3.0 pH\nHighly acidic/phytotoxic',
              'Exceeds standards in Area B-3 and well TW-3',
              'Exceeds standards in monitoring well TW-3',
              'Exceeds standards in wells TW-13 and TW-14',
              'Exceeds standards in wells TW-13 and TW-14'
            ];
            return labels[context.dataIndex];
          }
        }
      }
    },
    scales: {
      ...commonOptions.scales,
      y: {
        ...commonOptions.scales.y,
        title: {
          display: true,
          text: 'Concentration (mg/kg) or pH Scale',
          color: COLORS.gray1,
          font: {
            family: 'Space Grotesk, sans-serif',
            size: 13
          }
        },
        beginAtZero: true
      }
    }
  }
};

// ============================================================================
// 2. FLOOD TIMELINE VISUALIZATION
// ============================================================================

const floodTimelineConfig = {
  type: 'bar',
  data: {
    labels: [
      'Hurricane Betsy\n(1965)',
      'Hurricane Camille\n(1969)',
      'Hurricane Katrina\n(2005)',
      'Hurricane Ida\n(2021)'
    ],
    datasets: [
      {
        label: 'Flood Depth (feet)',
        data: [0, 0, 22, 11.5], // Using average of Ida range (9-14 feet)
        backgroundColor: [
          COLORS.completed,
          COLORS.completed,
          COLORS.critical,
          COLORS.high
        ],
        borderColor: [
          COLORS.completed,
          COLORS.completed,
          COLORS.critical,
          COLORS.high
        ],
        borderWidth: 2
      },
      {
        label: 'Site Base Elevation',
        data: [8, 8, 8, 8],
        type: 'line',
        borderColor: COLORS.accent,
        backgroundColor: 'transparent',
        borderWidth: 3,
        borderDash: [10, 5],
        pointRadius: 5,
        pointBackgroundColor: COLORS.accent,
        pointBorderColor: COLORS.bgDark,
        pointBorderWidth: 2
      }
    ]
  },
  options: {
    ...commonOptions,
    plugins: {
      ...commonOptions.plugins,
      title: {
        display: true,
        text: 'Hurricane Flood History at Port Sulphur',
        color: COLORS.gray1,
        font: {
          family: 'Space Grotesk, sans-serif',
          size: 16,
          weight: 'bold'
        },
        padding: {
          top: 10,
          bottom: 20
        }
      },
      subtitle: {
        display: true,
        text: 'Base elevation: 8 feet above sea level',
        color: COLORS.gray2,
        font: {
          family: 'Space Grotesk, sans-serif',
          size: 12
        },
        padding: {
          bottom: 15
        }
      },
      tooltip: {
        ...commonOptions.plugins.tooltip,
        callbacks: {
          afterLabel: function(context) {
            const details = [
              'No flooding recorded',
              'No flooding recorded',
              'Catastrophic: 22 ft storm surge\nNearly all structures destroyed\nPopulation displaced from 3,000',
              'Major flooding: 9-14 ft storm surge\nPlaquemines Parish'
            ];
            return details[context.dataIndex];
          }
        }
      }
    },
    scales: {
      ...commonOptions.scales,
      y: {
        ...commonOptions.scales.y,
        title: {
          display: true,
          text: 'Feet Above Sea Level',
          color: COLORS.gray1,
          font: {
            family: 'Space Grotesk, sans-serif',
            size: 13
          }
        },
        beginAtZero: true,
        max: 25
      }
    }
  }
};

// ============================================================================
// 3. REMEDIATION STATUS TIMELINE
// ============================================================================

const remediationTimelineConfig = {
  type: 'line',
  data: {
    labels: [
      '2009',
      '2010-2013',
      '2014',
      '2015',
      '2016',
      '2017-2018',
      '2019',
      '2020-2025',
      '2026'
    ],
    datasets: [
      {
        label: 'Emergency Response (2009 Acidic Release)',
        data: [100, 100, 100, 100, 100, 100, 100, 100, 100],
        borderColor: COLORS.completed,
        backgroundColor: 'rgba(76, 175, 80, 0.1)',
        fill: true,
        borderWidth: 2,
        pointRadius: 5,
        pointBackgroundColor: COLORS.completed
      },
      {
        label: 'Diesel Release Remediation',
        data: [null, null, null, null, 30, 60, 80, 90, 95],
        borderColor: COLORS.medium,
        backgroundColor: 'rgba(255, 202, 40, 0.1)',
        fill: true,
        borderWidth: 2,
        pointRadius: 5,
        pointBackgroundColor: COLORS.medium
      },
      {
        label: 'Settlement Agreement Compliance',
        data: [null, null, 50, 80, 100, 100, 100, 100, 100],
        borderColor: COLORS.blue1,
        backgroundColor: 'rgba(33, 150, 243, 0.1)',
        fill: true,
        borderWidth: 2,
        pointRadius: 5,
        pointBackgroundColor: COLORS.blue1
      }
    ]
  },
  options: {
    ...commonOptions,
    plugins: {
      ...commonOptions.plugins,
      title: {
        display: true,
        text: 'Environmental Remediation Progress Timeline',
        color: COLORS.gray1,
        font: {
          family: 'Space Grotesk, sans-serif',
          size: 16,
          weight: 'bold'
        },
        padding: {
          top: 10,
          bottom: 20
        }
      },
      tooltip: {
        ...commonOptions.plugins.tooltip,
        callbacks: {
          afterLabel: function(context) {
            const year = context.label;
            if (year === '2009' && context.datasetIndex === 0) {
              return 'Completed 2009-07-10\nCloseout: LDEQ Doc 6484954';
            } else if (year === '2014' && context.datasetIndex === 2) {
              return 'Settlement Agreement SA-WE-13-0083';
            } else if (year === '2016' && context.datasetIndex === 1) {
              return 'Discovery of diesel release\nPhase II ESA conducted';
            } else if (year === '2019' && context.datasetIndex === 2) {
              return '$100M coastal environmental settlement';
            } else if (year === '2026' && context.datasetIndex === 1) {
              return 'Ongoing monitoring\nLimited area exceedances remain';
            }
            return '';
          }
        }
      }
    },
    scales: {
      ...commonOptions.scales,
      y: {
        ...commonOptions.scales.y,
        title: {
          display: true,
          text: 'Completion Status (%)',
          color: COLORS.gray1,
          font: {
            family: 'Space Grotesk, sans-serif',
            size: 13
          }
        },
        beginAtZero: true,
        max: 100
      }
    }
  }
};

// ============================================================================
// 4. ENVIRONMENTAL INCIDENTS CHART
// ============================================================================

const environmentalIncidentsConfig = {
  type: 'bubble',
  data: {
    datasets: [
      {
        label: '2009 Acidic Water Release',
        data: [{
          x: new Date('2009-04-27').getTime(),
          y: 1.7,  // Minimum pH
          r: 30    // Size represents severity
        }],
        backgroundColor: 'rgba(239, 83, 80, 0.6)',
        borderColor: COLORS.critical,
        borderWidth: 2
      },
      {
        label: '2009 River Discharge #1',
        data: [{
          x: new Date('2009-09-05').getTime(),
          y: 5.5,  // Below pH 6.0
          r: 10
        }],
        backgroundColor: 'rgba(255, 152, 0, 0.6)',
        borderColor: COLORS.high,
        borderWidth: 2
      },
      {
        label: '2009 River Discharge #2',
        data: [{
          x: new Date('2009-09-14').getTime(),
          y: 5.5,  // Below pH 6.0
          r: 12
        }],
        backgroundColor: 'rgba(255, 152, 0, 0.6)',
        borderColor: COLORS.high,
        borderWidth: 2
      },
      {
        label: '2009 River Discharge #3',
        data: [{
          x: new Date('2009-09-17').getTime(),
          y: 5.8,  // Below pH 6.0
          r: 5
        }],
        backgroundColor: 'rgba(255, 202, 40, 0.6)',
        borderColor: COLORS.medium,
        borderWidth: 2
      },
      {
        label: '2016 Diesel Release',
        data: [{
          x: new Date('2016-07-18').getTime(),
          y: 7.0,  // Neutral pH (different contaminant type)
          r: 15
        }],
        backgroundColor: 'rgba(33, 150, 243, 0.6)',
        borderColor: COLORS.blue1,
        borderWidth: 2
      }
    ]
  },
  options: {
    ...commonOptions,
    plugins: {
      ...commonOptions.plugins,
      title: {
        display: true,
        text: 'Environmental Incidents Timeline',
        color: COLORS.gray1,
        font: {
          family: 'Space Grotesk, sans-serif',
          size: 16,
          weight: 'bold'
        },
        padding: {
          top: 10,
          bottom: 20
        }
      },
      subtitle: {
        display: true,
        text: 'Bubble size represents incident severity',
        color: COLORS.gray2,
        font: {
          family: 'Space Grotesk, sans-serif',
          size: 12
        },
        padding: {
          bottom: 15
        }
      },
      tooltip: {
        ...commonOptions.plugins.tooltip,
        callbacks: {
          label: function(context) {
            const incident = context.dataset.label;
            const date = new Date(context.parsed.x).toLocaleDateString();
            const details = {
              '2009 Acidic Water Release': '5.8M lbs released\npH 1.7\n1.5 miles downstream impact',
              '2009 River Discharge #1': '300 gallons\nDirect Mississippi River discharge\nHole in line',
              '2009 River Discharge #2': '720 gallons\nDirect Mississippi River discharge\nValve leak',
              '2009 River Discharge #3': '2 gallons\nDirect Mississippi River discharge\nNew valve leak',
              '2016 Diesel Release': 'Former AST location\nPhase II ESA conducted\nRECAP program'
            };
            return `${incident}\n${date}\n${details[incident]}`;
          }
        }
      }
    },
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'year',
          displayFormats: {
            year: 'yyyy'
          }
        },
        ticks: {
          color: COLORS.gray2,
          font: {
            family: 'Space Grotesk, sans-serif',
            size: 11
          }
        },
        grid: {
          color: COLORS.gray4,
          borderColor: COLORS.gray4
        },
        title: {
          display: true,
          text: 'Incident Date',
          color: COLORS.gray1,
          font: {
            family: 'Space Grotesk, sans-serif',
            size: 13
          }
        }
      },
      y: {
        ...commonOptions.scales.y,
        title: {
          display: true,
          text: 'pH Level',
          color: COLORS.gray1,
          font: {
            family: 'Space Grotesk, sans-serif',
            size: 13
          }
        },
        min: 0,
        max: 8,
        ticks: {
          ...commonOptions.scales.y.ticks,
          callback: function(value) {
            return value === 7 ? value + ' (Neutral)' : value;
          }
        }
      }
    }
  }
};

// ============================================================================
// 5. RISK LEVEL SUMMARY (DOUGHNUT CHART)
// ============================================================================

const riskLevelSummaryConfig = {
  type: 'doughnut',
  data: {
    labels: ['Critical Risk', 'High Risk', 'Medium Risk'],
    datasets: [{
      data: [3, 3, 2], // From key_findings: 3 critical, 3 high, 2 medium
      backgroundColor: [
        COLORS.critical,
        COLORS.high,
        COLORS.medium
      ],
      borderColor: [
        COLORS.critical,
        COLORS.high,
        COLORS.medium
      ],
      borderWidth: 2
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        ...commonOptions.plugins.legend,
        position: 'bottom'
      },
      title: {
        display: true,
        text: 'Environmental Risk Assessment Summary',
        color: COLORS.gray1,
        font: {
          family: 'Space Grotesk, sans-serif',
          size: 16,
          weight: 'bold'
        },
        padding: {
          top: 10,
          bottom: 20
        }
      },
      tooltip: {
        ...commonOptions.plugins.tooltip,
        callbacks: {
          label: function(context) {
            const labels = [
              'Critical: Environmental incidents, flood vulnerability, coastal hazards',
              'High: Operational history, soil contamination, groundwater issues',
              'Medium: Regulatory status, recent diesel contamination'
            ];
            return labels[context.dataIndex];
          },
          afterLabel: function(context) {
            return `${context.parsed} findings`;
          }
        }
      }
    }
  }
};

// ============================================================================
// 6. CONTAMINATION ZONES MAP DATA (for potential Leaflet integration)
// ============================================================================

const contaminationZonesData = {
  sulfur_vating_areas: {
    name: 'Sulfur Vating/Storage Areas',
    severity: 'Critical',
    contaminants: ['Elemental Sulfur', 'Acidic Soil (pH 2.5-3.5)', 'Heavy Metals'],
    color: COLORS.critical,
    coordinates: [-89.686632, 29.473414] // Approximate
  },
  diesel_release_area: {
    name: 'Diesel Release Site',
    severity: 'High',
    contaminants: ['Diesel Hydrocarbons', 'PAHs', 'Lead', 'Arsenic'],
    color: COLORS.high,
    coordinates: [-89.686632, 29.473414] // Approximate
  },
  waterfront_area: {
    name: 'Mississippi River Waterfront',
    severity: 'High',
    contaminants: ['Legacy Sulfur Processing', 'Soil/Sediment Contamination'],
    color: COLORS.high,
    coordinates: [-89.686632, 29.473414] // Approximate
  },
  barge_slip: {
    name: 'Old Barge Slip',
    severity: 'Medium',
    contaminants: ['Buried Contamination', 'Structural Concerns'],
    color: COLORS.medium,
    coordinates: [-89.686632, 29.473414] // Approximate
  }
};

// ============================================================================
// 7. EXPORT ALL CONFIGURATIONS
// ============================================================================

// Export for use in HTML
const EnvironmentalCharts = {
  configs: {
    contaminationLevels: contaminationLevelsConfig,
    floodTimeline: floodTimelineConfig,
    remediationTimeline: remediationTimelineConfig,
    environmentalIncidents: environmentalIncidentsConfig,
    riskLevelSummary: riskLevelSummaryConfig
  },
  colors: COLORS,
  contaminationZones: contaminationZonesData
};

// For Node.js/module environments
if (typeof module !== 'undefined' && module.exports) {
  module.exports = EnvironmentalCharts;
}
