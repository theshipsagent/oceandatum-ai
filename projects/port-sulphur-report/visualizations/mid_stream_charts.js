/**
 * Mid Stream Facility - Chart.js Visualization Configurations
 * Generated from mid_stream_data.json
 * Date: 2026-01-22
 *
 * Port Sulphur Terminal Analysis - Mid Stream Mooring Facility
 * Mississippi River Mile 46.3 Above Head of Passes, Plaquemines Parish, LA
 */

// ============================================================================
// CHART 1: Mooring System Specifications Diagram
// ============================================================================

const mooringSystemSpecsConfig = {
  type: 'bar',
  data: {
    labels: [
      'Anchor Piles\n(Depth)',
      'Monopiles\n(Depth)',
      'Navigation\nBuoys',
      'Anchor\nPiles Qty',
      'Monopiles\nQty'
    ],
    datasets: [
      {
        label: 'Depth (feet) / Quantity',
        data: [200, 100, 5, 5, 12],
        backgroundColor: [
          'rgba(100, 255, 180, 0.8)',  // Maritime green
          'rgba(100, 200, 255, 0.8)',  // Ocean blue
          'rgba(255, 193, 7, 0.8)',    // Buoy yellow
          'rgba(100, 255, 180, 0.6)',  // Maritime green (lighter)
          'rgba(100, 200, 255, 0.6)'   // Ocean blue (lighter)
        ],
        borderColor: [
          'rgba(100, 255, 180, 1)',
          'rgba(100, 200, 255, 1)',
          'rgba(255, 193, 7, 1)',
          'rgba(100, 255, 180, 1)',
          'rgba(100, 200, 255, 1)'
        ],
        borderWidth: 2
      }
    ]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: 'Mooring System Specifications',
        font: {
          size: 18,
          weight: 'bold',
          family: 'Space Grotesk, sans-serif'
        },
        color: '#ffffff',
        padding: 20
      },
      subtitle: {
        display: true,
        text: '5-Point Anchor Configuration | 17 Total Piles (48" Diameter)',
        font: {
          size: 14,
          family: 'Space Grotesk, sans-serif'
        },
        color: 'rgba(255, 255, 255, 0.7)',
        padding: 10
      },
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleFont: {
          family: 'Space Grotesk, sans-serif',
          size: 14
        },
        bodyFont: {
          family: 'Space Grotesk, sans-serif',
          size: 13
        },
        padding: 12,
        callbacks: {
          label: function(context) {
            const label = context.label;
            const value = context.parsed.y;

            if (label.includes('Depth')) {
              return `Depth: ${value} feet below MLW`;
            } else if (label.includes('Buoys')) {
              return `Buoys: ${value} commercial-grade units`;
            } else {
              return `Quantity: ${value} piles`;
            }
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: 'rgba(255, 255, 255, 0.7)',
          font: {
            family: 'Space Grotesk, sans-serif'
          }
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        title: {
          display: true,
          text: 'Measurement (feet / quantity)',
          color: 'rgba(255, 255, 255, 0.7)',
          font: {
            family: 'Space Grotesk, sans-serif',
            size: 13
          }
        }
      },
      x: {
        ticks: {
          color: 'rgba(255, 255, 255, 0.7)',
          font: {
            family: 'Space Grotesk, sans-serif',
            size: 11
          }
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        }
      }
    }
  }
};

// ============================================================================
// CHART 2: Operational Capacity Scenarios
// ============================================================================

const operationalCapacityConfig = {
  type: 'bar',
  data: {
    labels: ['Conservative', 'Base Case', 'Optimistic'],
    datasets: [
      {
        label: 'Annual Vessel Calls',
        data: [104, 156, 208],
        backgroundColor: 'rgba(100, 255, 180, 0.8)',
        borderColor: 'rgba(100, 255, 180, 1)',
        borderWidth: 2,
        yAxisID: 'y'
      },
      {
        label: 'Calls per Week',
        data: [2, 3, 4],
        backgroundColor: 'rgba(100, 200, 255, 0.8)',
        borderColor: 'rgba(100, 200, 255, 1)',
        borderWidth: 2,
        yAxisID: 'y1'
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
        text: 'Operational Capacity Scenarios',
        font: {
          size: 18,
          weight: 'bold',
          family: 'Space Grotesk, sans-serif'
        },
        color: '#ffffff',
        padding: 20
      },
      subtitle: {
        display: true,
        text: 'Based on 280 Operating Days per Year | Supramax Vessel Capacity',
        font: {
          size: 14,
          family: 'Space Grotesk, sans-serif'
        },
        color: 'rgba(255, 255, 255, 0.7)',
        padding: 10
      },
      legend: {
        display: true,
        position: 'top',
        labels: {
          color: 'rgba(255, 255, 255, 0.9)',
          font: {
            family: 'Space Grotesk, sans-serif',
            size: 13
          },
          padding: 15
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleFont: {
          family: 'Space Grotesk, sans-serif',
          size: 14
        },
        bodyFont: {
          family: 'Space Grotesk, sans-serif',
          size: 13
        },
        padding: 12
      }
    },
    scales: {
      y: {
        type: 'linear',
        display: true,
        position: 'left',
        beginAtZero: true,
        ticks: {
          color: 'rgba(255, 255, 255, 0.7)',
          font: {
            family: 'Space Grotesk, sans-serif'
          }
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        title: {
          display: true,
          text: 'Annual Vessel Calls',
          color: 'rgba(255, 255, 255, 0.7)',
          font: {
            family: 'Space Grotesk, sans-serif',
            size: 13
          }
        }
      },
      y1: {
        type: 'linear',
        display: true,
        position: 'right',
        beginAtZero: true,
        ticks: {
          color: 'rgba(255, 255, 255, 0.7)',
          font: {
            family: 'Space Grotesk, sans-serif'
          }
        },
        grid: {
          drawOnChartArea: false
        },
        title: {
          display: true,
          text: 'Calls per Week',
          color: 'rgba(255, 255, 255, 0.7)',
          font: {
            family: 'Space Grotesk, sans-serif',
            size: 13
          }
        }
      },
      x: {
        ticks: {
          color: 'rgba(255, 255, 255, 0.7)',
          font: {
            family: 'Space Grotesk, sans-serif',
            size: 12
          }
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        }
      }
    }
  }
};

// ============================================================================
// CHART 3: Revenue Projections Comparison
// ============================================================================

const revenueProjectionsConfig = {
  type: 'bar',
  data: {
    labels: ['Conservative', 'Base Case', 'Optimistic'],
    datasets: [
      {
        label: 'Gross Revenue',
        data: [2590000, 3880000, 5180000],
        backgroundColor: 'rgba(100, 255, 180, 0.8)',
        borderColor: 'rgba(100, 255, 180, 1)',
        borderWidth: 2
      },
      {
        label: 'Net Revenue (after 20% OpEx)',
        data: [2070000, 3100000, 4140000],
        backgroundColor: 'rgba(100, 200, 255, 0.8)',
        borderColor: 'rgba(100, 200, 255, 1)',
        borderWidth: 2
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
        text: 'Annual Revenue Projections by Scenario',
        font: {
          size: 18,
          weight: 'bold',
          family: 'Space Grotesk, sans-serif'
        },
        color: '#ffffff',
        padding: 20
      },
      subtitle: {
        display: true,
        text: 'Revenue per Call: $24,900 ($0.78/GRT + $1,500 security fee) | 30,000 GRT Supramax Vessels',
        font: {
          size: 14,
          family: 'Space Grotesk, sans-serif'
        },
        color: 'rgba(255, 255, 255, 0.7)',
        padding: 10
      },
      legend: {
        display: true,
        position: 'top',
        labels: {
          color: 'rgba(255, 255, 255, 0.9)',
          font: {
            family: 'Space Grotesk, sans-serif',
            size: 13
          },
          padding: 15
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleFont: {
          family: 'Space Grotesk, sans-serif',
          size: 14
        },
        bodyFont: {
          family: 'Space Grotesk, sans-serif',
          size: 13
        },
        padding: 12,
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            label += new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
              minimumFractionDigits: 0
            }).format(context.parsed.y);
            return label;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: 'rgba(255, 255, 255, 0.7)',
          font: {
            family: 'Space Grotesk, sans-serif'
          },
          callback: function(value) {
            return '$' + (value / 1000000).toFixed(1) + 'M';
          }
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        title: {
          display: true,
          text: 'Annual Revenue (USD)',
          color: 'rgba(255, 255, 255, 0.7)',
          font: {
            family: 'Space Grotesk, sans-serif',
            size: 13
          }
        }
      },
      x: {
        ticks: {
          color: 'rgba(255, 255, 255, 0.7)',
          font: {
            family: 'Space Grotesk, sans-serif',
            size: 12
          }
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        }
      }
    }
  }
};

// ============================================================================
// CHART 4: Cost Breakdown - Base Case ($7.5M Total)
// ============================================================================

const costBreakdownConfig = {
  type: 'doughnut',
  data: {
    labels: [
      'Pile Installation & Materials',
      'Marine Construction Management',
      'Engineering/Permitting',
      'Revetment Repair',
      'Mooring/Navigation System',
      'Land Improvements',
      'Captive Dock Barge'
    ],
    datasets: [{
      label: 'Infrastructure Investment',
      data: [
        3000000,  // Average of pile installation (1.8M-4.2M)
        2300000,  // Average of construction management (1.5M-3.1M)
        1050000,  // Average of engineering (0.7M-1.4M)
        800000,   // Average of revetment (0.4M-1.2M)
        550000,   // Average of mooring system (0.3M-0.8M)
        450000,   // Average of land improvements (0.3M-0.6M)
        350000    // Average of dock barge (0.2M-0.5M)
      ],
      backgroundColor: [
        'rgba(100, 255, 180, 0.8)',  // Pile installation - maritime green
        'rgba(100, 200, 255, 0.8)',  // Construction mgmt - ocean blue
        'rgba(255, 193, 7, 0.8)',    // Engineering - yellow
        'rgba(156, 39, 176, 0.8)',   // Revetment - purple
        'rgba(255, 87, 34, 0.8)',    // Mooring system - orange
        'rgba(76, 175, 80, 0.8)',    // Land improvements - green
        'rgba(33, 150, 243, 0.8)'    // Dock barge - blue
      ],
      borderColor: [
        'rgba(100, 255, 180, 1)',
        'rgba(100, 200, 255, 1)',
        'rgba(255, 193, 7, 1)',
        'rgba(156, 39, 176, 1)',
        'rgba(255, 87, 34, 1)',
        'rgba(76, 175, 80, 1)',
        'rgba(33, 150, 243, 1)'
      ],
      borderWidth: 2
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: 'Total Infrastructure Investment Breakdown',
        font: {
          size: 18,
          weight: 'bold',
          family: 'Space Grotesk, sans-serif'
        },
        color: '#ffffff',
        padding: 20
      },
      subtitle: {
        display: true,
        text: 'Base Case: $7.5M Total | Range: $5.2M - $10.8M',
        font: {
          size: 14,
          family: 'Space Grotesk, sans-serif'
        },
        color: 'rgba(255, 255, 255, 0.7)',
        padding: 10
      },
      legend: {
        display: true,
        position: 'right',
        labels: {
          color: 'rgba(255, 255, 255, 0.9)',
          font: {
            family: 'Space Grotesk, sans-serif',
            size: 12
          },
          padding: 12,
          boxWidth: 15
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleFont: {
          family: 'Space Grotesk, sans-serif',
          size: 14
        },
        bodyFont: {
          family: 'Space Grotesk, sans-serif',
          size: 13
        },
        padding: 12,
        callbacks: {
          label: function(context) {
            const label = context.label || '';
            const value = context.parsed;
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = ((value / total) * 100).toFixed(1);

            const formattedValue = new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
              minimumFractionDigits: 0
            }).format(value);

            return `${label}: ${formattedValue} (${percentage}%)`;
          }
        }
      }
    }
  }
};

// ============================================================================
// CHART 5: Mooring System Detailed Cost Analysis
// ============================================================================

const mooringSystemCostConfig = {
  type: 'bar',
  data: {
    labels: [
      'Anchor Piles\n(5 × 48" × 200\')',
      'Marine\nInstallation',
      'Navigation\nBuoys (5)',
      'Anchor\nChains (5)',
      'Quick-Release\nHardware',
      'Engineering\n& Design',
      'Installation\nCoordination',
      'Testing &\nCommissioning'
    ],
    datasets: [
      {
        label: 'Low Estimate',
        data: [1500000, 400000, 200000, 175000, 75000, 150000, 100000, 75000],
        backgroundColor: 'rgba(100, 200, 255, 0.6)',
        borderColor: 'rgba(100, 200, 255, 1)',
        borderWidth: 2
      },
      {
        label: 'High Estimate',
        data: [2100000, 600000, 325000, 275000, 125000, 250000, 180000, 125000],
        backgroundColor: 'rgba(100, 255, 180, 0.6)',
        borderColor: 'rgba(100, 255, 180, 1)',
        borderWidth: 2
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
        text: 'Mooring Buoy System - Detailed Cost Analysis',
        font: {
          size: 18,
          weight: 'bold',
          family: 'Space Grotesk, sans-serif'
        },
        color: '#ffffff',
        padding: 20
      },
      subtitle: {
        display: true,
        text: 'Total System Cost: $2.7M (Conservative) to $4.0M (High-End) | Most Likely: $3.4M',
        font: {
          size: 14,
          family: 'Space Grotesk, sans-serif'
        },
        color: 'rgba(255, 255, 255, 0.7)',
        padding: 10
      },
      legend: {
        display: true,
        position: 'top',
        labels: {
          color: 'rgba(255, 255, 255, 0.9)',
          font: {
            family: 'Space Grotesk, sans-serif',
            size: 13
          },
          padding: 15
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleFont: {
          family: 'Space Grotesk, sans-serif',
          size: 14
        },
        bodyFont: {
          family: 'Space Grotesk, sans-serif',
          size: 13
        },
        padding: 12,
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            label += new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
              minimumFractionDigits: 0
            }).format(context.parsed.y);
            return label;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: 'rgba(255, 255, 255, 0.7)',
          font: {
            family: 'Space Grotesk, sans-serif'
          },
          callback: function(value) {
            return '$' + (value / 1000000).toFixed(1) + 'M';
          }
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        title: {
          display: true,
          text: 'Cost (USD)',
          color: 'rgba(255, 255, 255, 0.7)',
          font: {
            family: 'Space Grotesk, sans-serif',
            size: 13
          }
        }
      },
      x: {
        ticks: {
          color: 'rgba(255, 255, 255, 0.7)',
          font: {
            family: 'Space Grotesk, sans-serif',
            size: 10
          }
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        }
      }
    }
  }
};

// ============================================================================
// CHART 6: Project Timeline Gantt-Style Bar Chart
// ============================================================================

const projectTimelineConfig = {
  type: 'bar',
  data: {
    labels: ['Permitting Phase', 'Construction Phase', 'Total Project'],
    datasets: [
      {
        label: 'Minimum Duration (months)',
        data: [18, 6, 24],
        backgroundColor: 'rgba(100, 200, 255, 0.8)',
        borderColor: 'rgba(100, 200, 255, 1)',
        borderWidth: 2
      },
      {
        label: 'Maximum Duration (months)',
        data: [36, 15, 51],
        backgroundColor: 'rgba(255, 193, 7, 0.8)',
        borderColor: 'rgba(255, 193, 7, 1)',
        borderWidth: 2
      }
    ]
  },
  options: {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index',
      intersect: false
    },
    plugins: {
      title: {
        display: true,
        text: 'Development Timeline',
        font: {
          size: 18,
          weight: 'bold',
          family: 'Space Grotesk, sans-serif'
        },
        color: '#ffffff',
        padding: 20
      },
      subtitle: {
        display: true,
        text: 'Section 408 & 404/10 Permitting | Marine Construction | Total: 24-51 Months',
        font: {
          size: 14,
          family: 'Space Grotesk, sans-serif'
        },
        color: 'rgba(255, 255, 255, 0.7)',
        padding: 10
      },
      legend: {
        display: true,
        position: 'top',
        labels: {
          color: 'rgba(255, 255, 255, 0.9)',
          font: {
            family: 'Space Grotesk, sans-serif',
            size: 13
          },
          padding: 15
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleFont: {
          family: 'Space Grotesk, sans-serif',
          size: 14
        },
        bodyFont: {
          family: 'Space Grotesk, sans-serif',
          size: 13
        },
        padding: 12,
        callbacks: {
          label: function(context) {
            return context.dataset.label + ': ' + context.parsed.x + ' months';
          }
        }
      }
    },
    scales: {
      x: {
        beginAtZero: true,
        ticks: {
          color: 'rgba(255, 255, 255, 0.7)',
          font: {
            family: 'Space Grotesk, sans-serif'
          },
          callback: function(value) {
            return value + ' mo';
          }
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        title: {
          display: true,
          text: 'Duration (months)',
          color: 'rgba(255, 255, 255, 0.7)',
          font: {
            family: 'Space Grotesk, sans-serif',
            size: 13
          }
        }
      },
      y: {
        ticks: {
          color: 'rgba(255, 255, 255, 0.7)',
          font: {
            family: 'Space Grotesk, sans-serif',
            size: 12
          }
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        }
      }
    }
  }
};

// ============================================================================
// CHART 7: Barge Fleeting Capacity Visualization
// ============================================================================

const bargeFleeting CapacityConfig = {
  type: 'bar',
  data: {
    labels: ['Barge Positions', 'Monopiles', 'Grid Width', 'Grid Length'],
    datasets: [{
      label: 'Capacity/Dimensions',
      data: [56, 12, 8, 7],
      backgroundColor: [
        'rgba(100, 255, 180, 0.8)',
        'rgba(100, 200, 255, 0.8)',
        'rgba(255, 193, 7, 0.8)',
        'rgba(156, 39, 176, 0.8)'
      ],
      borderColor: [
        'rgba(100, 255, 180, 1)',
        'rgba(100, 200, 255, 1)',
        'rgba(255, 193, 7, 1)',
        'rgba(156, 39, 176, 1)'
      ],
      borderWidth: 2
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: 'Barge Fleeting Operations',
        font: {
          size: 18,
          weight: 'bold',
          family: 'Space Grotesk, sans-serif'
        },
        color: '#ffffff',
        padding: 20
      },
      subtitle: {
        display: true,
        text: '7-Tier × 8-Wide Grid | 9 Acres Water Surface | 200\' × 35\' Standard Barges',
        font: {
          size: 14,
          family: 'Space Grotesk, sans-serif'
        },
        color: 'rgba(255, 255, 255, 0.7)',
        padding: 10
      },
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleFont: {
          family: 'Space Grotesk, sans-serif',
          size: 14
        },
        bodyFont: {
          family: 'Space Grotesk, sans-serif',
          size: 13
        },
        padding: 12,
        callbacks: {
          label: function(context) {
            const label = context.label;
            const value = context.parsed.y;

            if (label.includes('Positions')) {
              return `Total Barge Positions: ${value}`;
            } else if (label.includes('Monopiles')) {
              return `Monopiles (48" × 100'): ${value} units`;
            } else if (label.includes('Width')) {
              return `Grid Width: ${value} barges`;
            } else if (label.includes('Length')) {
              return `Grid Length: ${value} tiers`;
            }
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: 'rgba(255, 255, 255, 0.7)',
          font: {
            family: 'Space Grotesk, sans-serif'
          }
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        title: {
          display: true,
          text: 'Quantity / Count',
          color: 'rgba(255, 255, 255, 0.7)',
          font: {
            family: 'Space Grotesk, sans-serif',
            size: 13
          }
        }
      },
      x: {
        ticks: {
          color: 'rgba(255, 255, 255, 0.7)',
          font: {
            family: 'Space Grotesk, sans-serif',
            size: 12
          }
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        }
      }
    }
  }
};

// ============================================================================
// EXPORT CONFIGURATIONS
// ============================================================================

// Export for use in HTML pages
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    mooringSystemSpecsConfig,
    operationalCapacityConfig,
    revenueProjectionsConfig,
    costBreakdownConfig,
    mooringSystemCostConfig,
    projectTimelineConfig,
    bargeFleetingCapacityConfig
  };
}

// ============================================================================
// HELPER FUNCTIONS FOR CHART INITIALIZATION
// ============================================================================

/**
 * Initialize all mid-stream charts
 * @param {Object} canvasIds - Object containing canvas element IDs
 * @example
 * initializeMidStreamCharts({
 *   mooringSpecs: 'mooringSystemChart',
 *   operationalCapacity: 'operationalCapacityChart',
 *   revenue: 'revenueProjectionsChart',
 *   costBreakdown: 'costBreakdownChart',
 *   mooringCost: 'mooringCostChart',
 *   timeline: 'timelineChart',
 *   bargeFleeting: 'bargeFleetingChart'
 * });
 */
function initializeMidStreamCharts(canvasIds) {
  const charts = {};

  if (canvasIds.mooringSpecs) {
    const ctx1 = document.getElementById(canvasIds.mooringSpecs);
    if (ctx1) charts.mooringSpecs = new Chart(ctx1, mooringSystemSpecsConfig);
  }

  if (canvasIds.operationalCapacity) {
    const ctx2 = document.getElementById(canvasIds.operationalCapacity);
    if (ctx2) charts.operationalCapacity = new Chart(ctx2, operationalCapacityConfig);
  }

  if (canvasIds.revenue) {
    const ctx3 = document.getElementById(canvasIds.revenue);
    if (ctx3) charts.revenue = new Chart(ctx3, revenueProjectionsConfig);
  }

  if (canvasIds.costBreakdown) {
    const ctx4 = document.getElementById(canvasIds.costBreakdown);
    if (ctx4) charts.costBreakdown = new Chart(ctx4, costBreakdownConfig);
  }

  if (canvasIds.mooringCost) {
    const ctx5 = document.getElementById(canvasIds.mooringCost);
    if (ctx5) charts.mooringCost = new Chart(ctx5, mooringSystemCostConfig);
  }

  if (canvasIds.timeline) {
    const ctx6 = document.getElementById(canvasIds.timeline);
    if (ctx6) charts.timeline = new Chart(ctx6, projectTimelineConfig);
  }

  if (canvasIds.bargeFleeting) {
    const ctx7 = document.getElementById(canvasIds.bargeFleeting);
    if (ctx7) charts.bargeFleeting = new Chart(ctx7, bargeFleetingCapacityConfig);
  }

  return charts;
}

/**
 * Destroy all charts (for cleanup)
 * @param {Object} charts - Object containing Chart.js instances
 */
function destroyMidStreamCharts(charts) {
  Object.values(charts).forEach(chart => {
    if (chart && typeof chart.destroy === 'function') {
      chart.destroy();
    }
  });
}

// ============================================================================
// DATA SUMMARY
// ============================================================================

const midStreamDataSummary = {
  facility: {
    type: 'Midstream Dry Cargo Mooring Facility',
    location: 'Mississippi River Mile 46.3 Above Head of Passes, Plaquemines Parish, LA',
    permitNumber: 'MVN-2025-00276-EPP'
  },
  mooring: {
    configuration: '5-point anchor mooring system',
    anchorPiles: 5,
    monopiles: 12,
    totalPiles: 17,
    pileDiameter: '48 inches',
    anchorDepth: '200 feet',
    monopileDepth: '100 feet',
    navigationBuoys: 5
  },
  capacity: {
    designVessel: 'Supramax Bulk Carrier (750\' × 106\')',
    maxLOA: '800 feet',
    maxBeam: '75 feet',
    typicalGRT: 30000,
    bargePositions: 56,
    bargeGrid: '7-tier × 8-wide',
    waterSurfaceArea: '9 acres'
  },
  financial: {
    totalInvestment: {
      low: 5200000,
      base: 7500000,
      high: 10800000
    },
    revenuePerCall: 24900,
    scenarios: {
      conservative: { calls: 104, grossRevenue: 2590000, netRevenue: 2070000 },
      baseCase: { calls: 156, grossRevenue: 3880000, netRevenue: 3100000 },
      optimistic: { calls: 208, grossRevenue: 5180000, netRevenue: 4140000 }
    }
  },
  timeline: {
    permitting: '18-36 months',
    construction: '6-15 months',
    total: '24-51 months'
  }
};
