/**
 * Chart.js Visualization Configurations for Port Sulphur Terminal Property
 * Generated from property_data.json
 * Date: 2026-01-22
 */

// Color palette for consistent styling
const CHART_COLORS = {
  primary: '#64ffb4',
  secondary: '#1e90ff',
  accent: '#ffa500',
  warning: '#ff6b6b',
  success: '#51cf66',
  info: '#339af0',
  dark: '#1a1a2e',
  light: '#e9ecef',
  gradient1: '#4c6ef5',
  gradient2: '#7950f2',
  gradient3: '#f03e3e',
  gradient4: '#12b886'
};

// Chart.js global defaults
const CHART_DEFAULTS = {
  font: {
    family: "'Space Grotesk', sans-serif",
    size: 12
  },
  color: 'rgba(255, 255, 255, 0.8)',
  backgroundColor: 'rgba(26, 26, 46, 0.9)',
  borderColor: 'rgba(255, 255, 255, 0.15)'
};

/**
 * 1. OWNERSHIP TIMELINE - Horizontal Bar Chart
 * Visualizes the property ownership and operational history from 1932-2025
 */
const ownershipTimelineConfig = {
  type: 'bar',
  data: {
    labels: [
      '1932: Sulfur Rights Acquisition',
      '1933: Operations Commence',
      '1933-1978: Peak Mining Period',
      '1981: Corporate Merger',
      '1980s-90s: Economic Decline',
      'Early 2000s: Operations Cease',
      '2005: Hurricane Katrina',
      'Post-2005: Remediation',
      '2025: Available for Development'
    ],
    datasets: [{
      label: 'Years Since Event',
      data: [
        2025 - 1932,  // 93 years
        2025 - 1933,  // 92 years
        1978 - 1933,  // 45 years operational period
        2025 - 1981,  // 44 years
        2000 - 1980,  // ~20 years
        2005 - 2000,  // ~5 years
        2025 - 2005,  // 20 years post-Katrina
        2025 - 2005,  // 20 years remediation
        0             // Current year
      ],
      backgroundColor: [
        'rgba(100, 255, 180, 0.7)',   // Acquisition - primary green
        'rgba(81, 207, 102, 0.7)',    // Operations commence - success green
        'rgba(51, 154, 240, 0.7)',    // Peak period - info blue
        'rgba(121, 80, 242, 0.7)',    // Merger - purple
        'rgba(255, 165, 0, 0.7)',     // Decline - orange warning
        'rgba(255, 107, 107, 0.7)',   // Cessation - red warning
        'rgba(240, 62, 62, 0.7)',     // Katrina - dark red
        'rgba(18, 184, 134, 0.7)',    // Remediation - teal
        'rgba(100, 255, 180, 0.9)'    // Available - primary green bright
      ],
      borderColor: 'rgba(255, 255, 255, 0.3)',
      borderWidth: 1
    }]
  },
  options: {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: 'Port Sulphur Terminal - Ownership & Operations Timeline (1932-2025)',
        font: {
          size: 18,
          weight: 'bold',
          family: "'Space Grotesk', sans-serif"
        },
        color: '#fff',
        padding: 20
      },
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: 'rgba(26, 26, 46, 0.95)',
        titleColor: '#64ffb4',
        bodyColor: '#fff',
        borderColor: '#64ffb4',
        borderWidth: 1,
        padding: 12,
        callbacks: {
          label: function(context) {
            const years = context.parsed.x;
            if (years === 0) {
              return 'Current Status: Available for Development';
            }
            return years + ' years from event to present';
          }
        }
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Years',
          color: 'rgba(255, 255, 255, 0.8)',
          font: {
            size: 14,
            family: "'Space Grotesk', sans-serif"
          }
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.7)'
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        }
      },
      y: {
        ticks: {
          color: 'rgba(255, 255, 255, 0.8)',
          font: {
            size: 11
          }
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.05)'
        }
      }
    }
  }
};

/**
 * 2. PROPERTY VALUATION COMPARISON - Bar Chart
 * Compares comparable property sales per acre in Plaquemines and surrounding parishes
 */
const propertyValuationConfig = {
  type: 'bar',
  data: {
    labels: [
      'Port Sulphur\n(Estimated)',
      'Phillips 66 Alliance\n(Plaquemines, 2023)',
      'St. Rosalie\n(Plaquemines, 2018)',
      'St. Rosalie\n(State Acq., 2022)',
      'Louisiana Int\'l Terminal\n(St. Bernard)',
      'Avondale 2018\n(Jefferson)',
      'Avondale 2024\n(Amended)',
      'Greenfield\n(St. James, Cancelled)'
    ],
    datasets: [{
      label: 'Price Per Acre ($)',
      data: [
        137420,   // Port Sulphur estimated
        156250,   // Phillips 66
        50833,    // St. Rosalie 2018
        60000,    // St. Rosalie 2022
        222222,   // Louisiana International Terminal
        236220,   // Avondale 2018
        1300000,  // Avondale 2024 amended
        30769     // Greenfield (cancelled)
      ],
      backgroundColor: [
        'rgba(100, 255, 180, 0.8)',   // Port Sulphur - primary
        'rgba(51, 154, 240, 0.7)',    // Phillips 66
        'rgba(255, 165, 0, 0.6)',     // St. Rosalie 2018
        'rgba(255, 165, 0, 0.8)',     // St. Rosalie 2022
        'rgba(121, 80, 242, 0.7)',    // Louisiana Int'l
        'rgba(18, 184, 134, 0.7)',    // Avondale 2018
        'rgba(240, 62, 62, 0.8)',     // Avondale 2024 (outlier)
        'rgba(255, 107, 107, 0.6)'    // Greenfield (cancelled)
      ],
      borderColor: 'rgba(255, 255, 255, 0.3)',
      borderWidth: 1
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: 'Louisiana Industrial Waterfront Property Valuations - Price Per Acre',
        font: {
          size: 18,
          weight: 'bold',
          family: "'Space Grotesk', sans-serif"
        },
        color: '#fff',
        padding: 20
      },
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: 'rgba(26, 26, 46, 0.95)',
        titleColor: '#64ffb4',
        bodyColor: '#fff',
        borderColor: '#64ffb4',
        borderWidth: 1,
        padding: 12,
        callbacks: {
          label: function(context) {
            const value = context.parsed.y;
            return '$' + value.toLocaleString() + ' per acre';
          }
        }
      }
    },
    scales: {
      x: {
        ticks: {
          color: 'rgba(255, 255, 255, 0.8)',
          font: {
            size: 10
          },
          maxRotation: 45,
          minRotation: 45
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.05)'
        }
      },
      y: {
        title: {
          display: true,
          text: 'Price Per Acre ($)',
          color: 'rgba(255, 255, 255, 0.8)',
          font: {
            size: 14,
            family: "'Space Grotesk', sans-serif"
          }
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.7)',
          callback: function(value) {
            return '$' + (value / 1000).toFixed(0) + 'k';
          }
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        }
      }
    }
  }
};

/**
 * 3. COMPARABLE TRANSACTIONS - Grouped Bar Chart
 * Shows total sale price, acreage, and price per acre for comparable properties
 */
const comparableTransactionsConfig = {
  type: 'bar',
  data: {
    labels: [
      'Phillips 66 Alliance\n(2023)',
      'St. Rosalie\n(2022)',
      'LA Int\'l Terminal\n(St. Bernard)',
      'Avondale Marine\n(2018)',
      'Greenfield Project\n(Cancelled)'
    ],
    datasets: [
      {
        label: 'Total Sale Price ($M)',
        data: [500, 36, 18, 60, 40],
        backgroundColor: 'rgba(100, 255, 180, 0.7)',
        borderColor: 'rgba(100, 255, 180, 1)',
        borderWidth: 1,
        yAxisID: 'y'
      },
      {
        label: 'Total Acreage',
        data: [3200, 600, 81, 254, 1300],
        backgroundColor: 'rgba(51, 154, 240, 0.7)',
        borderColor: 'rgba(51, 154, 240, 1)',
        borderWidth: 1,
        yAxisID: 'y1'
      },
      {
        label: 'Price Per Acre ($K)',
        data: [156.25, 60, 222.22, 236.22, 30.77],
        backgroundColor: 'rgba(255, 165, 0, 0.7)',
        borderColor: 'rgba(255, 165, 0, 1)',
        borderWidth: 1,
        yAxisID: 'y2'
      }
    ]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index',
      intersect: false
    },
    plugins: {
      title: {
        display: true,
        text: 'Comparable Industrial Waterfront Transactions - Multi-Metric Analysis',
        font: {
          size: 18,
          weight: 'bold',
          family: "'Space Grotesk', sans-serif"
        },
        color: '#fff',
        padding: 20
      },
      legend: {
        display: true,
        position: 'top',
        labels: {
          color: 'rgba(255, 255, 255, 0.8)',
          font: {
            size: 12,
            family: "'Space Grotesk', sans-serif"
          },
          padding: 15
        }
      },
      tooltip: {
        backgroundColor: 'rgba(26, 26, 46, 0.95)',
        titleColor: '#64ffb4',
        bodyColor: '#fff',
        borderColor: '#64ffb4',
        borderWidth: 1,
        padding: 12
      }
    },
    scales: {
      x: {
        ticks: {
          color: 'rgba(255, 255, 255, 0.8)',
          font: {
            size: 11
          }
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.05)'
        }
      },
      y: {
        type: 'linear',
        display: true,
        position: 'left',
        title: {
          display: true,
          text: 'Sale Price ($M)',
          color: 'rgba(100, 255, 180, 1)',
          font: {
            size: 13,
            family: "'Space Grotesk', sans-serif"
          }
        },
        ticks: {
          color: 'rgba(100, 255, 180, 0.8)',
          callback: function(value) {
            return '$' + value + 'M';
          }
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        }
      },
      y1: {
        type: 'linear',
        display: true,
        position: 'right',
        title: {
          display: true,
          text: 'Total Acreage',
          color: 'rgba(51, 154, 240, 1)',
          font: {
            size: 13,
            family: "'Space Grotesk', sans-serif"
          }
        },
        ticks: {
          color: 'rgba(51, 154, 240, 0.8)'
        },
        grid: {
          drawOnChartArea: false
        }
      },
      y2: {
        type: 'linear',
        display: false,
        position: 'right',
        grid: {
          drawOnChartArea: false
        }
      }
    }
  }
};

/**
 * 4. DEVELOPMENT COSTS BREAKDOWN - Doughnut Chart
 * Estimates for due diligence and redevelopment costs
 */
const developmentCostsConfig = {
  type: 'doughnut',
  data: {
    labels: [
      'Phase I/II ESA',
      'Structural Dock Inspection',
      'Flood Modeling & Risk Assessment',
      'Additional Due Diligence',
      'Redevelopment & Monitoring (Min)',
      'Redevelopment & Monitoring (Max)'
    ],
    datasets: [{
      label: 'Estimated Cost ($)',
      data: [
        100000,   // ESA average (50k-150k)
        50000,    // Dock inspection average (25k-75k)
        22500,    // Flood modeling average (15k-30k)
        327500,   // Remaining due diligence (to reach 500k-750k total avg = 625k)
        8000000,  // Min redevelopment
        25000000  // Max redevelopment
      ],
      backgroundColor: [
        'rgba(100, 255, 180, 0.8)',   // ESA
        'rgba(51, 154, 240, 0.8)',    // Dock inspection
        'rgba(121, 80, 242, 0.8)',    // Flood modeling
        'rgba(255, 165, 0, 0.8)',     // Additional DD
        'rgba(18, 184, 134, 0.7)',    // Min redevelopment
        'rgba(240, 62, 62, 0.8)'      // Max redevelopment
      ],
      borderColor: 'rgba(255, 255, 255, 0.3)',
      borderWidth: 2
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: 'Estimated Development & Due Diligence Costs Breakdown',
        font: {
          size: 18,
          weight: 'bold',
          family: "'Space Grotesk', sans-serif"
        },
        color: '#fff',
        padding: 20
      },
      legend: {
        display: true,
        position: 'right',
        labels: {
          color: 'rgba(255, 255, 255, 0.8)',
          font: {
            size: 12,
            family: "'Space Grotesk', sans-serif"
          },
          padding: 15,
          boxWidth: 15
        }
      },
      tooltip: {
        backgroundColor: 'rgba(26, 26, 46, 0.95)',
        titleColor: '#64ffb4',
        bodyColor: '#fff',
        borderColor: '#64ffb4',
        borderWidth: 1,
        padding: 12,
        callbacks: {
          label: function(context) {
            const label = context.label || '';
            const value = context.parsed;
            const percentage = ((value / 33500000) * 100).toFixed(1);
            return label + ': $' + value.toLocaleString() + ' (' + percentage + '%)';
          }
        }
      }
    }
  }
};

/**
 * 5. INFRASTRUCTURE PREMIUM COMPARISON - Radar Chart
 * Shows premium percentages for various infrastructure features
 */
const infrastructurePremiumsConfig = {
  type: 'radar',
  data: {
    labels: [
      'Deep Water Access\n(45-48ft)',
      'Existing Dock\nFacilities',
      'Natural Deep\nWater',
      'Direct Highway\nAccess',
      'River Frontage\nPremium',
      'Interstate\nProximity'
    ],
    datasets: [{
      label: 'Premium Percentage (%)',
      data: [
        20,   // Deep water access (15-25% avg)
        27.5, // Dock facilities (20-35% avg)
        12.5, // Natural deep water (10-15% avg)
        12.5, // Highway access (10-15% avg)
        62,   // River frontage premium
        7.5   // Interstate proximity (5-10% avg)
      ],
      backgroundColor: 'rgba(100, 255, 180, 0.3)',
      borderColor: 'rgba(100, 255, 180, 1)',
      pointBackgroundColor: 'rgba(100, 255, 180, 1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(100, 255, 180, 1)',
      borderWidth: 2,
      pointRadius: 5,
      pointHoverRadius: 7
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: 'Infrastructure Features - Valuation Premium Analysis',
        font: {
          size: 18,
          weight: 'bold',
          family: "'Space Grotesk', sans-serif"
        },
        color: '#fff',
        padding: 20
      },
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: 'rgba(26, 26, 46, 0.95)',
        titleColor: '#64ffb4',
        bodyColor: '#fff',
        borderColor: '#64ffb4',
        borderWidth: 1,
        padding: 12,
        callbacks: {
          label: function(context) {
            return 'Premium: ' + context.parsed.r + '%';
          }
        }
      }
    },
    scales: {
      r: {
        angleLines: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.15)'
        },
        pointLabels: {
          color: 'rgba(255, 255, 255, 0.8)',
          font: {
            size: 11,
            family: "'Space Grotesk', sans-serif"
          }
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.7)',
          backdropColor: 'rgba(26, 26, 46, 0.8)',
          callback: function(value) {
            return value + '%';
          }
        },
        suggestedMin: 0,
        suggestedMax: 70
      }
    }
  }
};

/**
 * 6. FLOOD RISK ANALYSIS - Line Chart
 * Historical hurricane impacts and storm surge heights
 */
const floodRiskConfig = {
  type: 'line',
  data: {
    labels: [
      'Hurricane Betsy\n(1965)',
      'Hurricane Camille\n(1969)',
      'Hurricane Katrina\n(2005)',
      'Hurricane Ida\n(2021)'
    ],
    datasets: [
      {
        label: 'Storm Surge Height (feet)',
        data: [0, 0, 22, 11.5], // Ida range: 9-14, using midpoint
        borderColor: 'rgba(240, 62, 62, 1)',
        backgroundColor: 'rgba(240, 62, 62, 0.3)',
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointRadius: 6,
        pointHoverRadius: 8
      },
      {
        label: 'Site Elevation (feet)',
        data: [8, 8, 8, 8],
        borderColor: 'rgba(100, 255, 180, 1)',
        backgroundColor: 'rgba(100, 255, 180, 0.1)',
        borderWidth: 2,
        borderDash: [10, 5],
        fill: false,
        pointRadius: 0
      }
    ]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: 'Historical Hurricane Impacts - Storm Surge vs. Site Elevation',
        font: {
          size: 18,
          weight: 'bold',
          family: "'Space Grotesk', sans-serif"
        },
        color: '#fff',
        padding: 20
      },
      legend: {
        display: true,
        position: 'top',
        labels: {
          color: 'rgba(255, 255, 255, 0.8)',
          font: {
            size: 12,
            family: "'Space Grotesk', sans-serif"
          },
          padding: 15
        }
      },
      tooltip: {
        backgroundColor: 'rgba(26, 26, 46, 0.95)',
        titleColor: '#64ffb4',
        bodyColor: '#fff',
        borderColor: '#64ffb4',
        borderWidth: 1,
        padding: 12,
        callbacks: {
          label: function(context) {
            return context.dataset.label + ': ' + context.parsed.y + ' feet';
          }
        }
      }
    },
    scales: {
      x: {
        ticks: {
          color: 'rgba(255, 255, 255, 0.8)',
          font: {
            size: 11
          }
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.05)'
        }
      },
      y: {
        title: {
          display: true,
          text: 'Height (feet)',
          color: 'rgba(255, 255, 255, 0.8)',
          font: {
            size: 14,
            family: "'Space Grotesk', sans-serif"
          }
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.7)',
          callback: function(value) {
            return value + ' ft';
          }
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        suggestedMin: 0,
        suggestedMax: 25
      }
    }
  }
};

/**
 * 7. REGIONAL INDUSTRIAL INVESTMENT - Bar Chart
 * Major industrial projects in Plaquemines Parish region
 */
const regionalInvestmentConfig = {
  type: 'bar',
  data: {
    labels: [
      'Venture Global\nPlaquemines LNG',
      'VG LNG Expansion\n(2025)',
      'APM Terminals\nContainer Terminal',
      'Gateway Port\nRail Spur',
      'Belle Chasse\nBridge Replacement',
      'Highway 23\nWidening'
    ],
    datasets: [{
      label: 'Investment Amount ($M)',
      data: [21000, 18000, 500, 85, 169, 17],
      backgroundColor: [
        'rgba(100, 255, 180, 0.8)',
        'rgba(51, 154, 240, 0.8)',
        'rgba(121, 80, 242, 0.8)',
        'rgba(255, 165, 0, 0.8)',
        'rgba(18, 184, 134, 0.8)',
        'rgba(240, 62, 62, 0.8)'
      ],
      borderColor: 'rgba(255, 255, 255, 0.3)',
      borderWidth: 1
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: 'Major Regional Industrial Investments - Plaquemines Parish & Vicinity',
        font: {
          size: 18,
          weight: 'bold',
          family: "'Space Grotesk', sans-serif"
        },
        color: '#fff',
        padding: 20
      },
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: 'rgba(26, 26, 46, 0.95)',
        titleColor: '#64ffb4',
        bodyColor: '#fff',
        borderColor: '#64ffb4',
        borderWidth: 1,
        padding: 12,
        callbacks: {
          label: function(context) {
            return 'Investment: $' + context.parsed.y.toLocaleString() + 'M';
          }
        }
      }
    },
    scales: {
      x: {
        ticks: {
          color: 'rgba(255, 255, 255, 0.8)',
          font: {
            size: 11
          }
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.05)'
        }
      },
      y: {
        type: 'logarithmic',
        title: {
          display: true,
          text: 'Investment ($M, log scale)',
          color: 'rgba(255, 255, 255, 0.8)',
          font: {
            size: 14,
            family: "'Space Grotesk', sans-serif"
          }
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.7)',
          callback: function(value) {
            if (value === 10 || value === 100 || value === 1000 || value === 10000) {
              return '$' + value + 'M';
            }
            return null;
          }
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        }
      }
    }
  }
};

/**
 * 8. PROPERTY SPECIFICATIONS - Polar Area Chart
 * Key property metrics (acreage, frontage, depth)
 */
const propertySpecsConfig = {
  type: 'polarArea',
  data: {
    labels: [
      'Total Acreage',
      'River Frontage\n(×100 LF)',
      'Highway Frontage\n(×100 LF)',
      'Channel Depth\n(feet)',
      'Site Elevation\n(feet)'
    ],
    datasets: [{
      label: 'Property Metrics',
      data: [
        107,    // 106.99 acres
        107,    // 10,693 LF / 100
        25,     // 2,500 LF / 100
        45,     // 45 ft channel depth
        8       // 8 ft elevation
      ],
      backgroundColor: [
        'rgba(100, 255, 180, 0.7)',
        'rgba(51, 154, 240, 0.7)',
        'rgba(121, 80, 242, 0.7)',
        'rgba(255, 165, 0, 0.7)',
        'rgba(240, 62, 62, 0.7)'
      ],
      borderColor: 'rgba(255, 255, 255, 0.5)',
      borderWidth: 2
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: 'Port Sulphur Terminal - Key Property Specifications',
        font: {
          size: 18,
          weight: 'bold',
          family: "'Space Grotesk', sans-serif"
        },
        color: '#fff',
        padding: 20
      },
      legend: {
        display: true,
        position: 'right',
        labels: {
          color: 'rgba(255, 255, 255, 0.8)',
          font: {
            size: 11,
            family: "'Space Grotesk', sans-serif"
          },
          padding: 12
        }
      },
      tooltip: {
        backgroundColor: 'rgba(26, 26, 46, 0.95)',
        titleColor: '#64ffb4',
        bodyColor: '#fff',
        borderColor: '#64ffb4',
        borderWidth: 1,
        padding: 12,
        callbacks: {
          label: function(context) {
            const label = context.label || '';
            const value = context.parsed.r;
            if (label.includes('Acreage')) {
              return 'Total: 106.99 acres';
            } else if (label.includes('River Frontage')) {
              return 'River: 10,693 linear feet';
            } else if (label.includes('Highway Frontage')) {
              return 'Highway 23: 2,500 linear feet';
            } else if (label.includes('Channel Depth')) {
              return 'Depth: 45+ feet';
            } else if (label.includes('Elevation')) {
              return 'Elevation: 8 feet ASL';
            }
            return label + ': ' + value;
          }
        }
      }
    },
    scales: {
      r: {
        angleLines: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.15)'
        },
        pointLabels: {
          color: 'rgba(255, 255, 255, 0.8)',
          font: {
            size: 11,
            family: "'Space Grotesk', sans-serif"
          }
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.7)',
          backdropColor: 'rgba(26, 26, 46, 0.8)',
          display: false
        }
      }
    }
  }
};

// Export all chart configurations
export {
  ownershipTimelineConfig,
  propertyValuationConfig,
  comparableTransactionsConfig,
  developmentCostsConfig,
  infrastructurePremiumsConfig,
  floodRiskConfig,
  regionalInvestmentConfig,
  propertySpecsConfig,
  CHART_COLORS,
  CHART_DEFAULTS
};
