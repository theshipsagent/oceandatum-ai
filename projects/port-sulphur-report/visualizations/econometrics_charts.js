/**
 * Port Sulphur Terminal - Econometrics Chart.js Configurations
 * Generated: 2026-01-22
 * Data Source: econometrics_data.json
 *
 * Chart.js Version: 4.x
 * Color Scheme: Maritime professional with oceandatum.ai brand colors
 */

// Brand color palette
const COLORS = {
  primary: '#64ffb4',      // Maritime green accent
  secondary: '#3b82f6',    // Blue
  tertiary: '#8b5cf6',     // Purple
  warning: '#f59e0b',      // Orange/amber
  danger: '#ef4444',       // Red
  success: '#10b981',      // Green
  neutral: '#6b7280',      // Gray
  dark: '#1a1a2e',         // Dark background
  light: '#f3f4f6'         // Light gray
};

// Chart defaults for consistent styling
const CHART_DEFAULTS = {
  font: {
    family: "'Space Grotesk', sans-serif",
    size: 12
  },
  responsive: true,
  maintainAspectRatio: false,
  interaction: {
    mode: 'index',
    intersect: false
  },
  plugins: {
    legend: {
      display: true,
      position: 'top',
      labels: {
        color: '#fff',
        padding: 15,
        usePointStyle: true,
        font: {
          size: 11,
          family: "'Space Grotesk', sans-serif"
        }
      }
    },
    tooltip: {
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      titleColor: '#fff',
      bodyColor: '#fff',
      borderColor: COLORS.primary,
      borderWidth: 1,
      padding: 12,
      displayColors: true,
      callbacks: {}
    }
  }
};

/**
 * 1. FINANCIAL PROJECTIONS - Revenue vs Costs over 10 years
 */
export const financialProjectionsConfig = {
  type: 'line',
  data: {
    labels: ['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5', 'Year 6', 'Year 7', 'Year 8', 'Year 9', 'Year 10'],
    datasets: [
      {
        label: 'Revenue (Conservative)',
        data: [2.5, 4.2, 6.8, 9.5, 12.3, 14.8, 17.2, 19.5, 21.6, 23.4],
        borderColor: COLORS.primary,
        backgroundColor: 'rgba(100, 255, 180, 0.1)',
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointRadius: 5,
        pointHoverRadius: 7
      },
      {
        label: 'Revenue (Optimistic)',
        data: [3.8, 7.2, 11.5, 16.2, 21.5, 26.8, 32.0, 37.1, 42.0, 46.5],
        borderColor: COLORS.success,
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        borderWidth: 3,
        borderDash: [5, 5],
        fill: false,
        tension: 0.4,
        pointRadius: 5,
        pointHoverRadius: 7
      },
      {
        label: 'Operating Costs',
        data: [1.8, 2.2, 2.8, 3.4, 4.1, 4.8, 5.5, 6.2, 6.9, 7.6],
        borderColor: COLORS.warning,
        backgroundColor: 'rgba(245, 158, 11, 0.1)',
        borderWidth: 2,
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6
      },
      {
        label: 'Environmental Compliance',
        data: [0.325, 0.165, 0.130, 0.130, 0.130, 0.130, 0.130, 0.130, 0.130, 0.130],
        borderColor: COLORS.danger,
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        borderWidth: 2,
        fill: true,
        tension: 0.2,
        pointRadius: 4,
        pointHoverRadius: 6
      }
    ]
  },
  options: {
    ...CHART_DEFAULTS,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: '#fff',
          callback: function(value) {
            return '$' + value.toFixed(1) + 'M';
          }
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        title: {
          display: true,
          text: 'Revenue & Costs (USD Millions)',
          color: '#fff',
          font: {
            size: 13,
            weight: 'bold'
          }
        }
      },
      x: {
        ticks: {
          color: '#fff'
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.05)'
        }
      }
    },
    plugins: {
      ...CHART_DEFAULTS.plugins,
      title: {
        display: true,
        text: 'Port Sulphur Terminal - 10-Year Financial Projections',
        color: '#fff',
        font: {
          size: 16,
          weight: 'bold',
          family: "'Space Grotesk', sans-serif"
        },
        padding: 20
      },
      tooltip: {
        ...CHART_DEFAULTS.plugins.tooltip,
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            label += '$' + context.parsed.y.toFixed(2) + 'M';
            return label;
          }
        }
      }
    }
  }
};

/**
 * 2. ROI CALCULATIONS - Cumulative ROI over 15 years
 */
export const roiCalculationsConfig = {
  type: 'line',
  data: {
    labels: ['Year 1', 'Year 3', 'Year 5', 'Year 7', 'Year 10', 'Year 12', 'Year 15'],
    datasets: [
      {
        label: 'Conservative ROI (Low Scenario)',
        data: [-75, -42, -18, 8, 45, 68, 95],
        borderColor: COLORS.secondary,
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointRadius: 6,
        pointHoverRadius: 8
      },
      {
        label: 'Base Case ROI',
        data: [-68, -28, 12, 52, 110, 145, 185],
        borderColor: COLORS.primary,
        backgroundColor: 'rgba(100, 255, 180, 0.1)',
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointRadius: 6,
        pointHoverRadius: 8
      },
      {
        label: 'Optimistic ROI (High Scenario)',
        data: [-55, -5, 58, 125, 225, 295, 380],
        borderColor: COLORS.success,
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointRadius: 6,
        pointHoverRadius: 8
      },
      {
        label: 'Breakeven Threshold',
        data: [0, 0, 0, 0, 0, 0, 0],
        borderColor: COLORS.neutral,
        borderWidth: 2,
        borderDash: [10, 5],
        fill: false,
        pointRadius: 0
      }
    ]
  },
  options: {
    ...CHART_DEFAULTS,
    scales: {
      y: {
        ticks: {
          color: '#fff',
          callback: function(value) {
            return value + '%';
          }
        },
        grid: {
          color: function(context) {
            if (context.tick.value === 0) {
              return 'rgba(255, 255, 255, 0.3)';
            }
            return 'rgba(255, 255, 255, 0.1)';
          },
          lineWidth: function(context) {
            if (context.tick.value === 0) {
              return 2;
            }
            return 1;
          }
        },
        title: {
          display: true,
          text: 'Cumulative Return on Investment (%)',
          color: '#fff',
          font: {
            size: 13,
            weight: 'bold'
          }
        }
      },
      x: {
        ticks: {
          color: '#fff'
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.05)'
        }
      }
    },
    plugins: {
      ...CHART_DEFAULTS.plugins,
      title: {
        display: true,
        text: 'Port Sulphur Terminal - ROI Projections (15-Year Horizon)',
        color: '#fff',
        font: {
          size: 16,
          weight: 'bold',
          family: "'Space Grotesk', sans-serif"
        },
        padding: 20
      },
      tooltip: {
        ...CHART_DEFAULTS.plugins.tooltip,
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y === 0 && context.dataset.label === 'Breakeven Threshold') {
              label += 'Breakeven (0%)';
            } else {
              label += context.parsed.y.toFixed(1) + '% ROI';
            }
            return label;
          }
        }
      },
      annotation: {
        annotations: {
          breakeven: {
            type: 'line',
            yMin: 0,
            yMax: 0,
            borderColor: COLORS.neutral,
            borderWidth: 2,
            borderDash: [10, 5],
            label: {
              display: true,
              content: 'Breakeven',
              position: 'end'
            }
          }
        }
      }
    }
  }
};

/**
 * 3. MARKET GROWTH PROJECTIONS - TEU Container Capacity Growth
 */
export const marketGrowthConfig = {
  type: 'line',
  data: {
    labels: ['2025', '2027', '2030', '2033', '2036', '2040', '2045'],
    datasets: [
      {
        label: 'Medium Growth (1.9% CAGR)',
        data: [400, 431, 485, 545, 613, 713, 871],
        borderColor: COLORS.secondary,
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointRadius: 5,
        pointHoverRadius: 7
      },
      {
        label: 'High Growth (2.3% CAGR)',
        data: [400, 439, 503, 576, 659, 786, 998],
        borderColor: COLORS.primary,
        backgroundColor: 'rgba(100, 255, 180, 0.1)',
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointRadius: 5,
        pointHoverRadius: 7
      },
      {
        label: 'Aggressive Growth (4.45% CAGR)',
        data: [400, 437, 515, 608, 717, 905, 1283],
        borderColor: COLORS.success,
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointRadius: 5,
        pointHoverRadius: 7
      },
      {
        label: 'Port NOLA Capacity Limit',
        data: [1000, 1000, 1000, 1000, 1000, 1000, 1000],
        borderColor: COLORS.danger,
        borderWidth: 2,
        borderDash: [10, 5],
        fill: false,
        pointRadius: 0
      }
    ]
  },
  options: {
    ...CHART_DEFAULTS,
    scales: {
      y: {
        beginAtZero: false,
        min: 300,
        ticks: {
          color: '#fff',
          callback: function(value) {
            return value.toLocaleString() + ' TEU';
          }
        },
        grid: {
          color: function(context) {
            if (context.tick.value === 1000) {
              return 'rgba(239, 68, 68, 0.3)';
            }
            return 'rgba(255, 255, 255, 0.1)';
          }
        },
        title: {
          display: true,
          text: 'Container Capacity (Twenty-Foot Equivalent Units)',
          color: '#fff',
          font: {
            size: 13,
            weight: 'bold'
          }
        }
      },
      x: {
        ticks: {
          color: '#fff'
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.05)'
        }
      }
    },
    plugins: {
      ...CHART_DEFAULTS.plugins,
      title: {
        display: true,
        text: 'Container Terminal Market Growth Projections (TEU)',
        color: '#fff',
        font: {
          size: 16,
          weight: 'bold',
          family: "'Space Grotesk', sans-serif"
        },
        padding: 20
      },
      subtitle: {
        display: true,
        text: 'Port of New Orleans capacity constraint creates regional opportunity by 2040',
        color: 'rgba(255, 255, 255, 0.7)',
        font: {
          size: 11,
          family: "'Space Grotesk', sans-serif"
        },
        padding: {
          bottom: 10
        }
      },
      tooltip: {
        ...CHART_DEFAULTS.plugins.tooltip,
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            label += context.parsed.y.toLocaleString() + ' TEU';
            return label;
          },
          afterLabel: function(context) {
            if (context.dataset.label && context.dataset.label.includes('CAGR')) {
              const match = context.dataset.label.match(/\((.*?)\)/);
              if (match) {
                return 'Growth Rate: ' + match[1];
              }
            }
            return '';
          }
        }
      }
    }
  }
};

/**
 * 4. LAND VALUATION COMPARISON - Bar Chart
 */
export const landValuationConfig = {
  type: 'bar',
  data: {
    labels: [
      'General Parish Land',
      'Parish Waterfront Industrial',
      'Southeast LA Regional',
      'Port Sulphur Property',
      'Port Nickel (per acre equiv.)',
      'Batture Orleans (per acre)'
    ],
    datasets: [
      {
        label: 'Price per Acre (USD)',
        data: [39559, 68000, 12544, 137407, 0, 500000],
        backgroundColor: [
          'rgba(107, 114, 128, 0.8)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(139, 92, 246, 0.8)',
          'rgba(100, 255, 180, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(245, 158, 11, 0.8)'
        ],
        borderColor: [
          COLORS.neutral,
          COLORS.secondary,
          COLORS.tertiary,
          COLORS.primary,
          COLORS.success,
          COLORS.warning
        ],
        borderWidth: 2,
        borderRadius: 6,
        borderSkipped: false
      }
    ]
  },
  options: {
    ...CHART_DEFAULTS,
    indexAxis: 'y',
    scales: {
      x: {
        beginAtZero: true,
        ticks: {
          color: '#fff',
          callback: function(value) {
            if (value >= 1000000) {
              return '$' + (value / 1000000).toFixed(1) + 'M';
            }
            return '$' + (value / 1000).toFixed(0) + 'K';
          }
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        title: {
          display: true,
          text: 'Price per Acre (USD)',
          color: '#fff',
          font: {
            size: 13,
            weight: 'bold'
          }
        }
      },
      y: {
        ticks: {
          color: '#fff',
          font: {
            size: 11
          }
        },
        grid: {
          display: false
        }
      }
    },
    plugins: {
      ...CHART_DEFAULTS.plugins,
      title: {
        display: true,
        text: 'Plaquemines Parish Land Valuation Comparison',
        color: '#fff',
        font: {
          size: 16,
          weight: 'bold',
          family: "'Space Grotesk', sans-serif"
        },
        padding: 20
      },
      subtitle: {
        display: true,
        text: 'Port Sulphur commands 102% premium over market average due to 52\' draft and MM39 location',
        color: 'rgba(255, 255, 255, 0.7)',
        font: {
          size: 11,
          family: "'Space Grotesk', sans-serif"
        },
        padding: {
          bottom: 10
        }
      },
      tooltip: {
        ...CHART_DEFAULTS.plugins.tooltip,
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            const value = context.parsed.x;
            if (value >= 1000000) {
              label += '$' + (value / 1000000).toFixed(2) + 'M';
            } else if (value >= 1000) {
              label += '$' + (value / 1000).toFixed(1) + 'K';
            } else {
              label += '$' + value.toLocaleString();
            }
            label += ' per acre';
            return label;
          }
        }
      },
      legend: {
        display: false
      }
    }
  }
};

/**
 * 5. INFRASTRUCTURE PREMIUMS COMPARISON - Radar/Spider Chart
 */
export const infrastructurePremiumsConfig = {
  type: 'radar',
  data: {
    labels: [
      'River Frontage',
      'Bay Access',
      'Canal Access',
      'Lake Access',
      'Rail Access',
      'Highway Access',
      'Port Proximity'
    ],
    datasets: [
      {
        label: 'Infrastructure Premium (%)',
        data: [62, 107, 61, 15, 22.5, 15, 32.5],
        backgroundColor: 'rgba(100, 255, 180, 0.2)',
        borderColor: COLORS.primary,
        borderWidth: 3,
        pointBackgroundColor: COLORS.primary,
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: COLORS.primary,
        pointRadius: 6,
        pointHoverRadius: 8
      },
      {
        label: 'Port Sulphur Advantages',
        data: [62, 0, 0, 0, 0, 15, 32.5],
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        borderColor: COLORS.secondary,
        borderWidth: 2,
        borderDash: [5, 5],
        pointBackgroundColor: COLORS.secondary,
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: COLORS.secondary,
        pointRadius: 5,
        pointHoverRadius: 7
      }
    ]
  },
  options: {
    ...CHART_DEFAULTS,
    scales: {
      r: {
        beginAtZero: true,
        max: 120,
        ticks: {
          color: '#fff',
          backdropColor: 'transparent',
          callback: function(value) {
            return value + '%';
          },
          stepSize: 20
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.15)'
        },
        angleLines: {
          color: 'rgba(255, 255, 255, 0.15)'
        },
        pointLabels: {
          color: '#fff',
          font: {
            size: 11,
            family: "'Space Grotesk', sans-serif"
          }
        }
      }
    },
    plugins: {
      ...CHART_DEFAULTS.plugins,
      title: {
        display: true,
        text: 'Infrastructure Premiums - Market Comparison',
        color: '#fff',
        font: {
          size: 16,
          weight: 'bold',
          family: "'Space Grotesk', sans-serif"
        },
        padding: 20
      },
      subtitle: {
        display: true,
        text: 'Typical market premiums vs Port Sulphur actual advantages',
        color: 'rgba(255, 255, 255, 0.7)',
        font: {
          size: 11,
          family: "'Space Grotesk', sans-serif"
        },
        padding: {
          bottom: 10
        }
      },
      tooltip: {
        ...CHART_DEFAULTS.plugins.tooltip,
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            label += context.parsed.r.toFixed(1) + '% premium';
            return label;
          }
        }
      }
    }
  }
};

/**
 * 6. BARGE TRANSPORTATION ECONOMICS - Rate Comparison
 */
export const bargeRatesConfig = {
  type: 'bar',
  data: {
    labels: [
      'Normal Conditions\n(Min)',
      'Normal Conditions\n(Max)',
      'Low Water Crisis\n(Min)',
      'Low Water Crisis\n(Max)',
      'Historical Peak\n(2023)',
      'MM39 Diversion\nPremium (Normal)',
      'MM39 Diversion\nPremium (Crisis)'
    ],
    datasets: [
      {
        label: 'Rate per Ton (USD)',
        data: [15, 20, 20, 25, 52.91, 3, 6.5],
        backgroundColor: [
          'rgba(16, 185, 129, 0.8)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(239, 68, 68, 0.8)',
          'rgba(139, 92, 246, 0.8)',
          'rgba(100, 255, 180, 0.8)',
          'rgba(100, 255, 180, 0.8)'
        ],
        borderColor: [
          COLORS.success,
          COLORS.secondary,
          COLORS.warning,
          COLORS.danger,
          COLORS.tertiary,
          COLORS.primary,
          COLORS.primary
        ],
        borderWidth: 2,
        borderRadius: 6,
        borderSkipped: false
      }
    ]
  },
  options: {
    ...CHART_DEFAULTS,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: '#fff',
          callback: function(value) {
            return '$' + value.toFixed(2);
          }
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        title: {
          display: true,
          text: 'Rate per Ton (USD)',
          color: '#fff',
          font: {
            size: 13,
            weight: 'bold'
          }
        }
      },
      x: {
        ticks: {
          color: '#fff',
          font: {
            size: 10
          },
          maxRotation: 0,
          minRotation: 0
        },
        grid: {
          display: false
        }
      }
    },
    plugins: {
      ...CHART_DEFAULTS.plugins,
      title: {
        display: true,
        text: 'Mississippi River Barge Transportation Economics',
        color: '#fff',
        font: {
          size: 16,
          weight: 'bold',
          family: "'Space Grotesk', sans-serif"
        },
        padding: 20
      },
      subtitle: {
        display: true,
        text: 'St. Louis to Gulf rates and MM39 diversion premiums (per ton)',
        color: 'rgba(255, 255, 255, 0.7)',
        font: {
          size: 11,
          family: "'Space Grotesk', sans-serif"
        },
        padding: {
          bottom: 10
        }
      },
      tooltip: {
        ...CHART_DEFAULTS.plugins.tooltip,
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            label += '$' + context.parsed.y.toFixed(2) + ' per ton';
            return label;
          },
          afterLabel: function(context) {
            const labels = [
              '500M annual river tonnage',
              'Standard upper range',
              'Water restrictions',
              'Severe water restrictions',
              'Extreme drought peak',
              'Average premium for diversion',
              'Crisis premium for diversion'
            ];
            return labels[context.dataIndex];
          }
        }
      },
      legend: {
        display: false
      }
    }
  }
};

/**
 * 7. DEVELOPMENT COSTS BREAKDOWN - Doughnut Chart
 */
export const developmentCostsConfig = {
  type: 'doughnut',
  data: {
    labels: [
      'Property Acquisition',
      'Environmental Verification (Max)',
      'Remediation Potential (Mid-range)',
      'Infrastructure Development',
      'Annual Compliance (10 years)',
      'Contingency Reserve'
    ],
    datasets: [
      {
        label: 'Cost Allocation (USD)',
        data: [14.7, 0.325, 16.5, 25, 1.3, 5],
        backgroundColor: [
          'rgba(100, 255, 180, 0.8)',
          'rgba(239, 68, 68, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(139, 92, 246, 0.8)',
          'rgba(107, 114, 128, 0.8)'
        ],
        borderColor: [
          COLORS.primary,
          COLORS.danger,
          COLORS.warning,
          COLORS.secondary,
          COLORS.tertiary,
          COLORS.neutral
        ],
        borderWidth: 2,
        hoverOffset: 15
      }
    ]
  },
  options: {
    ...CHART_DEFAULTS,
    plugins: {
      ...CHART_DEFAULTS.plugins,
      title: {
        display: true,
        text: 'Total Development Cost Breakdown',
        color: '#fff',
        font: {
          size: 16,
          weight: 'bold',
          family: "'Space Grotesk', sans-serif"
        },
        padding: 20
      },
      subtitle: {
        display: true,
        text: 'Estimated total project investment: $62.825M',
        color: 'rgba(255, 255, 255, 0.7)',
        font: {
          size: 11,
          family: "'Space Grotesk', sans-serif"
        },
        padding: {
          bottom: 10
        }
      },
      tooltip: {
        ...CHART_DEFAULTS.plugins.tooltip,
        callbacks: {
          label: function(context) {
            let label = context.label || '';
            if (label) {
              label += ': ';
            }
            const value = context.parsed;
            label += '$' + value.toFixed(2) + 'M';

            // Calculate percentage
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = ((value / total) * 100).toFixed(1);
            label += ' (' + percentage + '%)';

            return label;
          }
        }
      },
      legend: {
        display: true,
        position: 'right',
        labels: {
          color: '#fff',
          padding: 15,
          font: {
            size: 11,
            family: "'Space Grotesk', sans-serif"
          },
          generateLabels: function(chart) {
            const data = chart.data;
            if (data.labels.length && data.datasets.length) {
              return data.labels.map((label, i) => {
                const value = data.datasets[0].data[i];
                const total = data.datasets[0].data.reduce((a, b) => a + b, 0);
                const percentage = ((value / total) * 100).toFixed(1);

                return {
                  text: label + ': $' + value.toFixed(2) + 'M (' + percentage + '%)',
                  fillStyle: data.datasets[0].backgroundColor[i],
                  strokeStyle: data.datasets[0].borderColor[i],
                  lineWidth: 2,
                  hidden: false,
                  index: i
                };
              });
            }
            return [];
          }
        }
      }
    }
  }
};

/**
 * 8. REGIONAL INDUSTRIAL INVESTMENT - Bar Chart
 */
export const regionalInvestmentConfig = {
  type: 'bar',
  data: {
    labels: [
      'Venture Global\nPlaquemines LNG',
      'APM Terminals\nContainer Facility',
      'Louisiana International\nTerminal',
      'Rail Spur\nExtension',
      'Port Sulphur\nOpportunity'
    ],
    datasets: [
      {
        label: 'Investment Value (USD Millions)',
        data: [21000, 500, 1800, 85, 62.825],
        backgroundColor: [
          'rgba(139, 92, 246, 0.8)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(100, 255, 180, 0.8)'
        ],
        borderColor: [
          COLORS.tertiary,
          COLORS.secondary,
          COLORS.success,
          COLORS.warning,
          COLORS.primary
        ],
        borderWidth: 2,
        borderRadius: 6,
        borderSkipped: false
      }
    ]
  },
  options: {
    ...CHART_DEFAULTS,
    scales: {
      y: {
        type: 'logarithmic',
        ticks: {
          color: '#fff',
          callback: function(value) {
            if (value === 10 || value === 100 || value === 1000 || value === 10000) {
              return '$' + value.toLocaleString() + 'M';
            }
            return '';
          }
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        title: {
          display: true,
          text: 'Investment Value (USD Millions, Log Scale)',
          color: '#fff',
          font: {
            size: 13,
            weight: 'bold'
          }
        }
      },
      x: {
        ticks: {
          color: '#fff',
          font: {
            size: 10
          },
          maxRotation: 0,
          minRotation: 0
        },
        grid: {
          display: false
        }
      }
    },
    plugins: {
      ...CHART_DEFAULTS.plugins,
      title: {
        display: true,
        text: 'Regional Industrial Development Investment Context',
        color: '#fff',
        font: {
          size: 16,
          weight: 'bold',
          family: "'Space Grotesk', sans-serif"
        },
        padding: 20
      },
      subtitle: {
        display: true,
        text: 'Total active regional projects: $23.4B+ (logarithmic scale)',
        color: 'rgba(255, 255, 255, 0.7)',
        font: {
          size: 11,
          family: "'Space Grotesk', sans-serif"
        },
        padding: {
          bottom: 10
        }
      },
      tooltip: {
        ...CHART_DEFAULTS.plugins.tooltip,
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            const value = context.parsed.y;
            if (value >= 1000) {
              label += '$' + (value / 1000).toFixed(1) + 'B';
            } else {
              label += '$' + value.toFixed(1) + 'M';
            }
            return label;
          },
          afterLabel: function(context) {
            const descriptions = [
              '8,500,000 tons CO2/year, 8000 construction jobs',
              '200 acres Phase 1, 1000 acres expansion potential',
              'St. Bernard Parish deep water terminal',
              'Federal funding 85%, connects to UP at Westwego',
              'Estimated total development cost'
            ];
            return descriptions[context.dataIndex];
          }
        }
      },
      legend: {
        display: false
      }
    }
  }
};

/**
 * EXPORT ALL CONFIGURATIONS
 */
export const allCharts = {
  financialProjections: financialProjectionsConfig,
  roiCalculations: roiCalculationsConfig,
  marketGrowth: marketGrowthConfig,
  landValuation: landValuationConfig,
  infrastructurePremiums: infrastructurePremiumsConfig,
  bargeRates: bargeRatesConfig,
  developmentCosts: developmentCostsConfig,
  regionalInvestment: regionalInvestmentConfig
};

/**
 * HELPER FUNCTION: Initialize all charts
 *
 * Usage:
 * import { initializeAllCharts } from './econometrics_charts.js';
 * initializeAllCharts({
 *   financialProjections: 'chartCanvas1',
 *   roiCalculations: 'chartCanvas2',
 *   // ... etc
 * });
 */
export function initializeAllCharts(canvasIds) {
  const charts = {};

  if (canvasIds.financialProjections) {
    charts.financialProjections = new Chart(
      document.getElementById(canvasIds.financialProjections),
      financialProjectionsConfig
    );
  }

  if (canvasIds.roiCalculations) {
    charts.roiCalculations = new Chart(
      document.getElementById(canvasIds.roiCalculations),
      roiCalculationsConfig
    );
  }

  if (canvasIds.marketGrowth) {
    charts.marketGrowth = new Chart(
      document.getElementById(canvasIds.marketGrowth),
      marketGrowthConfig
    );
  }

  if (canvasIds.landValuation) {
    charts.landValuation = new Chart(
      document.getElementById(canvasIds.landValuation),
      landValuationConfig
    );
  }

  if (canvasIds.infrastructurePremiums) {
    charts.infrastructurePremiums = new Chart(
      document.getElementById(canvasIds.infrastructurePremiums),
      infrastructurePremiumsConfig
    );
  }

  if (canvasIds.bargeRates) {
    charts.bargeRates = new Chart(
      document.getElementById(canvasIds.bargeRates),
      bargeRatesConfig
    );
  }

  if (canvasIds.developmentCosts) {
    charts.developmentCosts = new Chart(
      document.getElementById(canvasIds.developmentCosts),
      developmentCostsConfig
    );
  }

  if (canvasIds.regionalInvestment) {
    charts.regionalInvestment = new Chart(
      document.getElementById(canvasIds.regionalInvestment),
      regionalInvestmentConfig
    );
  }

  return charts;
}

/**
 * HELPER FUNCTION: Destroy all charts (for cleanup)
 */
export function destroyAllCharts(chartInstances) {
  Object.values(chartInstances).forEach(chart => {
    if (chart && typeof chart.destroy === 'function') {
      chart.destroy();
    }
  });
}

/**
 * RESPONSIVE UTILITIES
 */
export function updateChartsOnResize(chartInstances) {
  window.addEventListener('resize', () => {
    Object.values(chartInstances).forEach(chart => {
      if (chart && typeof chart.resize === 'function') {
        chart.resize();
      }
    });
  });
}

// Default export
export default allCharts;
