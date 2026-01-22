/**
 * Infrastructure Charts - Chart.js Configurations
 * Generated from infrastructure_data.json
 * Date: 2026-01-22
 *
 * This file contains Chart.js configurations for visualizing Port Sulphur Terminal
 * infrastructure data, including regional facilities comparison, investment analysis,
 * and facility specifications.
 */

// ============================================================================
// CHART 1: Regional Facilities Area Comparison
// ============================================================================

const regionalFacilitiesAreaChart = {
  type: 'bar',
  data: {
    labels: [
      'Port Sulphur Terminal',
      'NOLA Terminal LLC',
      'APM Terminals Phase 1',
      'APM Terminals Full',
      'Venture Global LNG'
    ],
    datasets: [{
      label: 'Total Area (acres)',
      data: [
        106.99,  // Port Sulphur
        152.8,   // NOLA Terminal
        200,     // APM Phase 1
        900,     // APM Full buildout
        632      // Venture Global LNG
      ],
      backgroundColor: [
        'rgba(100, 255, 180, 0.7)',  // Port Sulphur - maritime green
        'rgba(54, 162, 235, 0.7)',   // NOLA - blue
        'rgba(255, 206, 86, 0.7)',   // APM Phase 1 - yellow
        'rgba(255, 159, 64, 0.7)',   // APM Full - orange
        'rgba(153, 102, 255, 0.7)'   // Venture Global - purple
      ],
      borderColor: [
        'rgba(100, 255, 180, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(255, 159, 64, 1)',
        'rgba(153, 102, 255, 1)'
      ],
      borderWidth: 2
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: true,
    aspectRatio: 2,
    plugins: {
      title: {
        display: true,
        text: 'Regional Facilities Area Comparison',
        font: {
          size: 18,
          family: 'Space Grotesk, sans-serif',
          weight: 'bold'
        },
        color: '#ffffff',
        padding: 20
      },
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#64ffb4',
        bodyColor: '#ffffff',
        borderColor: '#64ffb4',
        borderWidth: 1,
        padding: 12,
        displayColors: false,
        callbacks: {
          label: function(context) {
            return context.parsed.y.toFixed(2) + ' acres';
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Area (acres)',
          color: '#ffffff',
          font: {
            size: 14,
            family: 'Space Grotesk, sans-serif'
          }
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.7)',
          font: {
            family: 'Space Grotesk, sans-serif'
          }
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        }
      },
      x: {
        ticks: {
          color: 'rgba(255, 255, 255, 0.7)',
          font: {
            family: 'Space Grotesk, sans-serif',
            size: 11
          },
          maxRotation: 45,
          minRotation: 45
        },
        grid: {
          display: false
        }
      }
    }
  }
};

// ============================================================================
// CHART 2: Infrastructure Investment Comparison
// ============================================================================

const infrastructureInvestmentChart = {
  type: 'bar',
  data: {
    labels: [
      'NOLA Terminal\nBond Financing',
      'APM Terminals\nContainer Terminal',
      'Venture Global\nLNG Facility',
      'Louisiana Int\'l\nTerminal',
      'Rail Spur\nExtension'
    ],
    datasets: [{
      label: 'Investment ($ Millions)',
      data: [
        97,      // NOLA Terminal bond financing (2024)
        500,     // APM Terminals
        21000,   // Venture Global LNG
        1800,    // Louisiana International Terminal
        85       // Rail spur extension
      ],
      backgroundColor: [
        'rgba(54, 162, 235, 0.7)',   // NOLA - blue
        'rgba(255, 206, 86, 0.7)',   // APM - yellow
        'rgba(153, 102, 255, 0.7)',  // Venture Global - purple
        'rgba(255, 99, 132, 0.7)',   // Louisiana Int'l - red
        'rgba(100, 255, 180, 0.7)'   // Rail - maritime green
      ],
      borderColor: [
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 99, 132, 1)',
        'rgba(100, 255, 180, 1)'
      ],
      borderWidth: 2
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: true,
    aspectRatio: 2,
    plugins: {
      title: {
        display: true,
        text: 'Regional Infrastructure Investment Comparison',
        font: {
          size: 18,
          family: 'Space Grotesk, sans-serif',
          weight: 'bold'
        },
        color: '#ffffff',
        padding: 20
      },
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#64ffb4',
        bodyColor: '#ffffff',
        borderColor: '#64ffb4',
        borderWidth: 1,
        padding: 12,
        displayColors: false,
        callbacks: {
          label: function(context) {
            const value = context.parsed.y;
            if (value >= 1000) {
              return '$' + (value / 1000).toFixed(2) + ' Billion';
            } else {
              return '$' + value.toFixed(0) + ' Million';
            }
          }
        }
      }
    },
    scales: {
      y: {
        type: 'logarithmic',
        beginAtZero: false,
        min: 50,
        title: {
          display: true,
          text: 'Investment ($ Millions, logarithmic scale)',
          color: '#ffffff',
          font: {
            size: 14,
            family: 'Space Grotesk, sans-serif'
          }
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.7)',
          font: {
            family: 'Space Grotesk, sans-serif'
          },
          callback: function(value) {
            if (value >= 1000) {
              return '$' + (value / 1000) + 'B';
            }
            return '$' + value + 'M';
          }
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        }
      },
      x: {
        ticks: {
          color: 'rgba(255, 255, 255, 0.7)',
          font: {
            family: 'Space Grotesk, sans-serif',
            size: 10
          },
          maxRotation: 0,
          minRotation: 0
        },
        grid: {
          display: false
        }
      }
    }
  }
};

// ============================================================================
// CHART 3: Storage Capacity Comparison (Multi-type)
// ============================================================================

const storageCapacityChart = {
  type: 'bar',
  data: {
    labels: [
      'NOLA Terminal\n(Liquid Storage)',
      'APM Phase 1\n(Container)',
      'Louisiana Int\'l\n(Container)'
    ],
    datasets: [
      {
        label: 'Liquid Storage (Million Barrels)',
        data: [10, null, null],  // NOLA Terminal crude oil storage
        backgroundColor: 'rgba(54, 162, 235, 0.7)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 2,
        yAxisID: 'y-liquid'
      },
      {
        label: 'Container Capacity (Thousand TEU/year)',
        data: [null, 700, 2000],  // APM Phase 1 estimated, Louisiana Int'l
        backgroundColor: 'rgba(255, 206, 86, 0.7)',
        borderColor: 'rgba(255, 206, 86, 1)',
        borderWidth: 2,
        yAxisID: 'y-container'
      }
    ]
  },
  options: {
    responsive: true,
    maintainAspectRatio: true,
    aspectRatio: 2,
    plugins: {
      title: {
        display: true,
        text: 'Regional Facilities Storage & Capacity Comparison',
        font: {
          size: 18,
          family: 'Space Grotesk, sans-serif',
          weight: 'bold'
        },
        color: '#ffffff',
        padding: 20
      },
      legend: {
        display: true,
        position: 'top',
        labels: {
          color: '#ffffff',
          font: {
            family: 'Space Grotesk, sans-serif',
            size: 12
          },
          padding: 15,
          usePointStyle: true
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#64ffb4',
        bodyColor: '#ffffff',
        borderColor: '#64ffb4',
        borderWidth: 1,
        padding: 12,
        callbacks: {
          label: function(context) {
            if (context.datasetIndex === 0 && context.parsed.y !== null) {
              return 'Liquid Storage: ' + context.parsed.y + ' million barrels';
            } else if (context.datasetIndex === 1 && context.parsed.y !== null) {
              return 'Container Capacity: ' + (context.parsed.y * 1000).toLocaleString() + ' TEU/year';
            }
            return '';
          }
        }
      }
    },
    scales: {
      'y-liquid': {
        type: 'linear',
        position: 'left',
        beginAtZero: true,
        title: {
          display: true,
          text: 'Liquid Storage (Million Barrels)',
          color: 'rgba(54, 162, 235, 1)',
          font: {
            size: 13,
            family: 'Space Grotesk, sans-serif'
          }
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.7)',
          font: {
            family: 'Space Grotesk, sans-serif'
          }
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        }
      },
      'y-container': {
        type: 'linear',
        position: 'right',
        beginAtZero: true,
        title: {
          display: true,
          text: 'Container Capacity (Thousand TEU/year)',
          color: 'rgba(255, 206, 86, 1)',
          font: {
            size: 13,
            family: 'Space Grotesk, sans-serif'
          }
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.7)',
          font: {
            family: 'Space Grotesk, sans-serif'
          }
        },
        grid: {
          drawOnChartArea: false
        }
      },
      x: {
        ticks: {
          color: 'rgba(255, 255, 255, 0.7)',
          font: {
            family: 'Space Grotesk, sans-serif',
            size: 11
          },
          maxRotation: 0,
          minRotation: 0
        },
        grid: {
          display: false
        }
      }
    }
  }
};

// ============================================================================
// CHART 4: Vessel Capacity & Berth Comparison
// ============================================================================

const vesselCapacityChart = {
  type: 'bar',
  data: {
    labels: [
      'Port Sulphur\nTerminal',
      'NOLA Terminal\nLLC',
      'APM Terminals\nContainer'
    ],
    datasets: [
      {
        label: 'Deepwater Berths',
        data: [1, 3, 2],  // Port Sulphur (1 dock), NOLA (3 berths), APM (est. 2 phase 1)
        backgroundColor: 'rgba(100, 255, 180, 0.7)',
        borderColor: 'rgba(100, 255, 180, 1)',
        borderWidth: 2
      }
    ]
  },
  options: {
    responsive: true,
    maintainAspectRatio: true,
    aspectRatio: 2.5,
    plugins: {
      title: {
        display: true,
        text: 'Regional Facilities Deepwater Berth Capacity',
        font: {
          size: 18,
          family: 'Space Grotesk, sans-serif',
          weight: 'bold'
        },
        color: '#ffffff',
        padding: 20
      },
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#64ffb4',
        bodyColor: '#ffffff',
        borderColor: '#64ffb4',
        borderWidth: 1,
        padding: 12,
        displayColors: false,
        callbacks: {
          label: function(context) {
            const labels = [
              'Port Sulphur: 1 dock (24\' × 433\')',
              'NOLA Terminal: 3 berths (Capesize/Suez Max capable)',
              'APM Terminals: 2+ berths (14,000-18,000 TEU vessels)'
            ];
            return labels[context.dataIndex];
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 4,
        title: {
          display: true,
          text: 'Number of Deepwater Berths',
          color: '#ffffff',
          font: {
            size: 14,
            family: 'Space Grotesk, sans-serif'
          }
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.7)',
          font: {
            family: 'Space Grotesk, sans-serif'
          },
          stepSize: 1
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        }
      },
      x: {
        ticks: {
          color: 'rgba(255, 255, 255, 0.7)',
          font: {
            family: 'Space Grotesk, sans-serif',
            size: 12
          },
          maxRotation: 0,
          minRotation: 0
        },
        grid: {
          display: false
        }
      }
    }
  }
};

// ============================================================================
// CHART 5: River Mile Location & Proximity to Gulf
// ============================================================================

const riverMileProximityChart = {
  type: 'scatter',
  data: {
    datasets: [
      {
        label: 'Port Sulphur Terminal',
        data: [{ x: 39, y: 39 }],  // River mile, Distance to Gulf
        backgroundColor: 'rgba(100, 255, 180, 0.8)',
        borderColor: 'rgba(100, 255, 180, 1)',
        borderWidth: 3,
        pointRadius: 12,
        pointHoverRadius: 15
      },
      {
        label: 'NOLA Terminal LLC',
        data: [{ x: 59, y: 59 }],
        backgroundColor: 'rgba(54, 162, 235, 0.8)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 3,
        pointRadius: 10,
        pointHoverRadius: 13
      }
    ]
  },
  options: {
    responsive: true,
    maintainAspectRatio: true,
    aspectRatio: 2,
    plugins: {
      title: {
        display: true,
        text: 'Facility Location: River Mile vs. Distance to Gulf of Mexico',
        font: {
          size: 18,
          family: 'Space Grotesk, sans-serif',
          weight: 'bold'
        },
        color: '#ffffff',
        padding: 20
      },
      legend: {
        display: true,
        position: 'top',
        labels: {
          color: '#ffffff',
          font: {
            family: 'Space Grotesk, sans-serif',
            size: 12
          },
          padding: 15,
          usePointStyle: true
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#64ffb4',
        bodyColor: '#ffffff',
        borderColor: '#64ffb4',
        borderWidth: 1,
        padding: 12,
        callbacks: {
          label: function(context) {
            return [
              context.dataset.label,
              'River Mile: ' + context.parsed.x,
              'Distance to Gulf: ' + context.parsed.y + ' miles',
              context.datasetIndex === 0 ? 'Closest deep-water terminal to open water' : ''
            ].filter(Boolean);
          }
        }
      },
      annotation: {
        annotations: {
          optimalZone: {
            type: 'box',
            xMin: 35,
            xMax: 45,
            backgroundColor: 'rgba(100, 255, 180, 0.1)',
            borderColor: 'rgba(100, 255, 180, 0.3)',
            borderWidth: 1,
            label: {
              display: true,
              content: 'Optimal Gulf Access Zone',
              position: 'center',
              color: 'rgba(100, 255, 180, 0.8)',
              font: {
                size: 11,
                family: 'Space Grotesk, sans-serif'
              }
            }
          }
        }
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'River Mile (from Head of Passes)',
          color: '#ffffff',
          font: {
            size: 14,
            family: 'Space Grotesk, sans-serif'
          }
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.7)',
          font: {
            family: 'Space Grotesk, sans-serif'
          }
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        min: 30,
        max: 70
      },
      y: {
        title: {
          display: true,
          text: 'Distance to Gulf of Mexico (miles)',
          color: '#ffffff',
          font: {
            size: 14,
            family: 'Space Grotesk, sans-serif'
          }
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.7)',
          font: {
            family: 'Space Grotesk, sans-serif'
          }
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        min: 30,
        max: 70
      }
    }
  }
};

// ============================================================================
// CHART 6: Rail Infrastructure Development Timeline
// ============================================================================

const railTimelineChart = {
  type: 'bar',
  data: {
    labels: [
      'NOGC Railway\n(Existing)',
      'Rail Spur\nDesign Study\n(Completed)',
      'Preliminary\nEngineering\n(Funded)',
      'Construction\nBids\n(Expected)',
      'Rail Spur\nCompletion\n(Projected)'
    ],
    datasets: [{
      label: 'Timeline Milestones',
      data: [
        { x: 'NOGC Railway\n(Existing)', y: 2010, milestone: 'NOGC Railway operational' },
        { x: 'Rail Spur\nDesign Study\n(Completed)', y: 2025, milestone: 'Design study completed May 2025' },
        { x: 'Preliminary\nEngineering\n(Funded)', y: 2025, milestone: '$10M funding approved June 2025' },
        { x: 'Construction\nBids\n(Expected)', y: 2025, milestone: 'Bids expected Q4 2025' },
        { x: 'Rail Spur\nCompletion\n(Projected)', y: 2029, milestone: 'Completion projected 2028-2029' }
      ],
      backgroundColor: [
        'rgba(100, 255, 180, 0.7)',  // Existing - green
        'rgba(54, 162, 235, 0.7)',   // Completed - blue
        'rgba(255, 206, 86, 0.7)',   // Funded - yellow
        'rgba(255, 159, 64, 0.7)',   // Expected - orange
        'rgba(153, 102, 255, 0.7)'   // Projected - purple
      ],
      borderColor: [
        'rgba(100, 255, 180, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(255, 159, 64, 1)',
        'rgba(153, 102, 255, 1)'
      ],
      borderWidth: 2,
      barThickness: 40
    }]
  },
  options: {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: true,
    aspectRatio: 1.5,
    plugins: {
      title: {
        display: true,
        text: 'Rail Infrastructure Development Timeline',
        font: {
          size: 18,
          family: 'Space Grotesk, sans-serif',
          weight: 'bold'
        },
        color: '#ffffff',
        padding: 20
      },
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#64ffb4',
        bodyColor: '#ffffff',
        borderColor: '#64ffb4',
        borderWidth: 1,
        padding: 12,
        displayColors: false,
        callbacks: {
          label: function(context) {
            return context.raw.milestone;
          }
        }
      }
    },
    scales: {
      x: {
        min: 2008,
        max: 2030,
        title: {
          display: true,
          text: 'Year',
          color: '#ffffff',
          font: {
            size: 14,
            family: 'Space Grotesk, sans-serif'
          }
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.7)',
          font: {
            family: 'Space Grotesk, sans-serif'
          },
          stepSize: 2
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        }
      },
      y: {
        ticks: {
          color: 'rgba(255, 255, 255, 0.7)',
          font: {
            family: 'Space Grotesk, sans-serif',
            size: 11
          }
        },
        grid: {
          display: false
        }
      }
    }
  }
};

// ============================================================================
// CHART 7: Port Authority Financial Position
// ============================================================================

const portAuthorityFinancialsChart = {
  type: 'doughnut',
  data: {
    labels: [
      'Operating Revenue',
      'Non-Operating Revenue',
      'Capital Assets (net)',
      'Net Position'
    ],
    datasets: [{
      label: 'Financial Position ($M)',
      data: [
        6,      // Operating revenue
        32,     // Non-operating revenue
        75.4,   // Capital assets
        116.8   // Net position
      ],
      backgroundColor: [
        'rgba(100, 255, 180, 0.7)',  // Operating - maritime green
        'rgba(54, 162, 235, 0.7)',   // Non-operating - blue
        'rgba(255, 206, 86, 0.7)',   // Capital - yellow
        'rgba(153, 102, 255, 0.7)'   // Net position - purple
      ],
      borderColor: [
        'rgba(100, 255, 180, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(153, 102, 255, 1)'
      ],
      borderWidth: 2
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: true,
    aspectRatio: 2,
    plugins: {
      title: {
        display: true,
        text: 'Plaquemines Port Financial Position (2022)',
        font: {
          size: 18,
          family: 'Space Grotesk, sans-serif',
          weight: 'bold'
        },
        color: '#ffffff',
        padding: 20
      },
      legend: {
        display: true,
        position: 'right',
        labels: {
          color: '#ffffff',
          font: {
            family: 'Space Grotesk, sans-serif',
            size: 12
          },
          padding: 15,
          usePointStyle: true
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#64ffb4',
        bodyColor: '#ffffff',
        borderColor: '#64ffb4',
        borderWidth: 1,
        padding: 12,
        callbacks: {
          label: function(context) {
            const label = context.label || '';
            const value = context.parsed;
            return label + ': $' + value.toFixed(1) + 'M';
          }
        }
      }
    }
  }
};

// ============================================================================
// EXPORT ALL CHART CONFIGURATIONS
// ============================================================================

const infrastructureCharts = {
  regionalFacilitiesArea: regionalFacilitiesAreaChart,
  infrastructureInvestment: infrastructureInvestmentChart,
  storageCapacity: storageCapacityChart,
  vesselCapacity: vesselCapacityChart,
  riverMileProximity: riverMileProximityChart,
  railTimeline: railTimelineChart,
  portAuthorityFinancials: portAuthorityFinancialsChart
};

// Export for use in HTML pages
if (typeof module !== 'undefined' && module.exports) {
  module.exports = infrastructureCharts;
}

// ============================================================================
// HELPER FUNCTIONS FOR CHART INITIALIZATION
// ============================================================================

/**
 * Initialize a chart in a specified canvas element
 * @param {string} canvasId - The ID of the canvas element
 * @param {string} chartKey - The key of the chart configuration in infrastructureCharts
 * @returns {Chart} The initialized Chart.js instance
 */
function initInfrastructureChart(canvasId, chartKey) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) {
    console.error(`Canvas element with ID '${canvasId}' not found`);
    return null;
  }

  const ctx = canvas.getContext('2d');
  const chartConfig = infrastructureCharts[chartKey];

  if (!chartConfig) {
    console.error(`Chart configuration '${chartKey}' not found`);
    return null;
  }

  return new Chart(ctx, chartConfig);
}

/**
 * Initialize all infrastructure charts
 * Expects canvas elements with IDs matching the pattern: {chartKey}Chart
 * Example: regionalFacilitiesAreaChart, infrastructureInvestmentChart, etc.
 */
function initAllInfrastructureCharts() {
  const charts = {};

  for (const [key, config] of Object.entries(infrastructureCharts)) {
    const canvasId = key + 'Chart';
    const chart = initInfrastructureChart(canvasId, key);
    if (chart) {
      charts[key] = chart;
    }
  }

  return charts;
}

// ============================================================================
// USAGE EXAMPLE
// ============================================================================

/*
HTML structure example:

<div class="chart-container">
  <canvas id="regionalFacilitiesAreaChart"></canvas>
</div>

<div class="chart-container">
  <canvas id="infrastructureInvestmentChart"></canvas>
</div>

<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js"></script>
<script src="infrastructure_charts.js"></script>
<script>
  // Initialize all charts
  const charts = initAllInfrastructureCharts();

  // Or initialize individual charts
  const areaChart = initInfrastructureChart('regionalFacilitiesAreaChart', 'regionalFacilitiesArea');
</script>

CSS styling recommendation:

.chart-container {
  position: relative;
  width: 100%;
  max-width: 1200px;
  margin: 2rem auto;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

@media print {
  .chart-container {
    page-break-inside: avoid;
    break-inside: avoid;
  }
}
*/
