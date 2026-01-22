/**
 * Chart.js Visualization Configurations
 * Port Sulphur Terminal Market Analysis
 *
 * Generated: 2026-01-22
 * Data Source: market_data.json
 *
 * Dependencies: Chart.js v4.x
 * Include in HTML: <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
 */

// ============================================================================
// COLOR PALETTE - Oceandatum.ai Brand Colors
// ============================================================================

const COLORS = {
  primary: '#64ffb4',           // Maritime green (accent)
  primaryAlpha: 'rgba(100, 255, 180, 0.8)',
  background: '#0a0a0a',        // Dark background
  backgroundLight: '#1a1a2e',   // Lighter dark background
  text: 'rgba(255, 255, 255, 0.9)',
  textMuted: 'rgba(255, 255, 255, 0.7)',
  border: 'rgba(255, 255, 255, 0.2)',

  // Chart color schemes
  commodities: [
    '#64ffb4',  // Grain (primary green)
    '#ff6b6b',  // Petroleum (red)
    '#4ecdc4',  // Coal (teal)
    '#ffd93d',  // Other (yellow)
  ],

  volatility: [
    '#64ffb4',  // Normal (green)
    '#ffa500',  // Stress (orange)
    '#ff4444',  // Extreme (red)
  ],

  growth: [
    '#4ecdc4',  // Medium (teal)
    '#64ffb4',  // High (green)
    '#ffd93d',  // Aggressive (yellow)
  ],

  ports: [
    '#64ffb4',  // Mobile
    '#4ecdc4',  // New Orleans
    '#ffa500',  // Houston
    '#ff6b6b',  // Gramercy
    '#ffd93d',  // Baton Rouge
  ],

  intermodal: [
    '#ff4444',  // Southwest (declining)
    '#64ffb4',  // Northeast (growth)
    '#ff6b6b',  // PNW (decline)
    '#4ecdc4',  // Canada (growth)
  ]
};

// ============================================================================
// DEFAULT CHART OPTIONS
// ============================================================================

const defaultOptions = {
  responsive: true,
  maintainAspectRatio: true,
  plugins: {
    legend: {
      labels: {
        color: COLORS.text,
        font: {
          family: "'Space Grotesk', sans-serif",
          size: 12
        },
        padding: 15
      }
    },
    tooltip: {
      backgroundColor: COLORS.backgroundLight,
      titleColor: COLORS.text,
      bodyColor: COLORS.textMuted,
      borderColor: COLORS.border,
      borderWidth: 1,
      padding: 12,
      cornerRadius: 6,
      titleFont: {
        family: "'Space Grotesk', sans-serif",
        size: 14,
        weight: 'bold'
      },
      bodyFont: {
        family: "'Space Grotesk', sans-serif",
        size: 12
      }
    }
  },
  scales: {
    x: {
      ticks: {
        color: COLORS.textMuted,
        font: {
          family: "'Space Grotesk', sans-serif",
          size: 11
        }
      },
      grid: {
        color: COLORS.border,
        drawBorder: false
      }
    },
    y: {
      ticks: {
        color: COLORS.textMuted,
        font: {
          family: "'Space Grotesk', sans-serif",
          size: 11
        }
      },
      grid: {
        color: COLORS.border,
        drawBorder: false
      }
    }
  }
};

// ============================================================================
// 1. MISSISSIPPI RIVER COMMODITY MIX PIE CHART
// ============================================================================

const commodityMixConfig = {
  type: 'pie',
  data: {
    labels: ['Grain (60%)', 'Petroleum Products (17.5%)', 'Coal (12.5%)', 'Other (10%)'],
    datasets: [{
      label: 'Commodity Mix',
      data: [60, 17.5, 12.5, 10],
      backgroundColor: COLORS.commodities,
      borderColor: COLORS.background,
      borderWidth: 2,
      hoverOffset: 10
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      title: {
        display: true,
        text: 'Mississippi River System Commodity Composition',
        color: COLORS.text,
        font: {
          family: "'Space Grotesk', sans-serif",
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
        text: '500M tons annually (2019-2023 average)',
        color: COLORS.textMuted,
        font: {
          family: "'Space Grotesk', sans-serif",
          size: 12
        },
        padding: {
          bottom: 15
        }
      },
      legend: {
        position: 'bottom',
        labels: {
          color: COLORS.text,
          font: {
            family: "'Space Grotesk', sans-serif",
            size: 12
          },
          padding: 15,
          usePointStyle: true,
          pointStyle: 'circle'
        }
      },
      tooltip: {
        backgroundColor: COLORS.backgroundLight,
        titleColor: COLORS.text,
        bodyColor: COLORS.textMuted,
        borderColor: COLORS.border,
        borderWidth: 1,
        padding: 12,
        cornerRadius: 6,
        callbacks: {
          label: function(context) {
            const label = context.label || '';
            const value = context.parsed;
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = ((value / total) * 100).toFixed(1);
            return `${label}: ${percentage}% (${(500000000 * value / 100).toLocaleString()} tons)`;
          }
        }
      }
    }
  }
};

// ============================================================================
// 2. LMR MARKET SHARE COMPARISON (IRON & STEEL)
// ============================================================================

const marketShareConfig = {
  type: 'doughnut',
  data: {
    labels: ['LMR Ports (40%)', 'Other Gulf Coast Ports (60%)'],
    datasets: [{
      label: 'Market Share',
      data: [40, 60],
      backgroundColor: [COLORS.primary, COLORS.textMuted],
      borderColor: COLORS.background,
      borderWidth: 2,
      hoverOffset: 10
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      title: {
        display: true,
        text: 'Lower Mississippi River Ports - Iron & Steel Import Market Share',
        color: COLORS.text,
        font: {
          family: "'Space Grotesk', sans-serif",
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
        text: '2014-2023 average • Total Gulf Coast imports declining at -4.5% CAGR',
        color: COLORS.textMuted,
        font: {
          family: "'Space Grotesk', sans-serif",
          size: 11
        },
        padding: {
          bottom: 15
        }
      },
      legend: {
        position: 'bottom',
        labels: {
          color: COLORS.text,
          font: {
            family: "'Space Grotesk', sans-serif",
            size: 12
          },
          padding: 15,
          usePointStyle: true,
          pointStyle: 'circle'
        }
      },
      tooltip: {
        backgroundColor: COLORS.backgroundLight,
        titleColor: COLORS.text,
        bodyColor: COLORS.textMuted,
        borderColor: COLORS.border,
        borderWidth: 1,
        padding: 12,
        cornerRadius: 6,
        callbacks: {
          label: function(context) {
            const label = context.label || '';
            const value = context.parsed;
            return `${label}: ${value}%`;
          }
        }
      }
    }
  }
};

// ============================================================================
// 3. BARGE RATE VOLATILITY (ST. LOUIS TO GULF)
// ============================================================================

const bargeRateVolatilityConfig = {
  type: 'bar',
  data: {
    labels: ['Normal Conditions\n(Jan 2025)', 'Low-Water Stress\n(Jan 2023)', 'Extreme Crisis\n(Sep 2023)'],
    datasets: [{
      label: 'Barge Rate ($ per ton)',
      data: [17.94, 28.93, 52.91],
      backgroundColor: COLORS.volatility,
      borderColor: COLORS.volatility.map(c => c.replace(')', ', 1)')),
      borderWidth: 2,
      borderRadius: 6,
      hoverBackgroundColor: COLORS.volatility.map(c => c.replace(')', ', 0.9)')),
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      title: {
        display: true,
        text: 'St. Louis to Gulf Barge Rate Volatility Analysis',
        color: COLORS.text,
        font: {
          family: "'Space Grotesk', sans-serif",
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
        text: 'Rate inflation ranges from +61% (stress) to +195% (extreme crisis)',
        color: COLORS.textMuted,
        font: {
          family: "'Space Grotesk', sans-serif",
          size: 11
        },
        padding: {
          bottom: 15
        }
      },
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: COLORS.backgroundLight,
        titleColor: COLORS.text,
        bodyColor: COLORS.textMuted,
        borderColor: COLORS.border,
        borderWidth: 1,
        padding: 12,
        cornerRadius: 6,
        callbacks: {
          label: function(context) {
            const value = context.parsed.y;
            const baseline = 17.94;
            const increase = ((value - baseline) / baseline * 100).toFixed(0);
            return [
              `Rate: $${value.toFixed(2)} per ton`,
              increase > 0 ? `+${increase}% vs. normal` : 'Baseline rate'
            ];
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: COLORS.textMuted,
          font: {
            family: "'Space Grotesk', sans-serif",
            size: 11
          },
          callback: function(value) {
            return '$' + value.toFixed(0);
          }
        },
        grid: {
          color: COLORS.border,
          drawBorder: false
        },
        title: {
          display: true,
          text: 'Rate ($ per ton)',
          color: COLORS.text,
          font: {
            family: "'Space Grotesk', sans-serif",
            size: 12,
            weight: 'bold'
          }
        }
      },
      x: {
        ticks: {
          color: COLORS.textMuted,
          font: {
            family: "'Space Grotesk', sans-serif",
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
// 4. CONTAINER GROWTH PROJECTIONS (LMR PORTS)
// ============================================================================

const containerGrowthConfig = {
  type: 'line',
  data: {
    labels: ['2025', '2026', '2027', '2028', '2029', '2030', '2031', '2032'],
    datasets: [
      {
        label: 'Medium Growth (1.9% CAGR)',
        data: [400000, 407600, 415341, 423225, 431254, 439431, 447759, 456241],
        borderColor: COLORS.growth[0],
        backgroundColor: COLORS.growth[0].replace('1)', '0.1)'),
        borderWidth: 2,
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6,
        fill: false
      },
      {
        label: 'High Growth (2.3% CAGR)',
        data: [400000, 409200, 418613, 428242, 438091, 448164, 458464, 468996],
        borderColor: COLORS.growth[1],
        backgroundColor: COLORS.growth[1].replace('1)', '0.1)'),
        borderWidth: 2,
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6,
        fill: false
      },
      {
        label: 'Aggressive (4.45% CAGR)',
        data: [400000, 417800, 436391, 455805, 476069, 497212, 519264, 542257],
        borderColor: COLORS.growth[2],
        backgroundColor: COLORS.growth[2].replace('1)', '0.1)'),
        borderWidth: 3,
        tension: 0.4,
        pointRadius: 5,
        pointHoverRadius: 7,
        fill: false
      }
    ]
  },
  options: {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      title: {
        display: true,
        text: 'Lower Mississippi River Container Growth Projections (2025-2032)',
        color: COLORS.text,
        font: {
          family: "'Space Grotesk', sans-serif",
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
        text: 'Based on 400K TEU identified potential + organic growth scenarios',
        color: COLORS.textMuted,
        font: {
          family: "'Space Grotesk', sans-serif",
          size: 11
        },
        padding: {
          bottom: 15
        }
      },
      legend: {
        position: 'bottom',
        labels: {
          color: COLORS.text,
          font: {
            family: "'Space Grotesk', sans-serif",
            size: 12
          },
          padding: 15,
          usePointStyle: true
        }
      },
      tooltip: {
        backgroundColor: COLORS.backgroundLight,
        titleColor: COLORS.text,
        bodyColor: COLORS.textMuted,
        borderColor: COLORS.border,
        borderWidth: 1,
        padding: 12,
        cornerRadius: 6,
        callbacks: {
          label: function(context) {
            const value = context.parsed.y;
            return `${context.dataset.label}: ${value.toLocaleString()} TEU`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: false,
        ticks: {
          color: COLORS.textMuted,
          font: {
            family: "'Space Grotesk', sans-serif",
            size: 11
          },
          callback: function(value) {
            return (value / 1000).toFixed(0) + 'K';
          }
        },
        grid: {
          color: COLORS.border,
          drawBorder: false
        },
        title: {
          display: true,
          text: 'TEU (Twenty-foot Equivalent Units)',
          color: COLORS.text,
          font: {
            family: "'Space Grotesk', sans-serif",
            size: 12,
            weight: 'bold'
          }
        }
      },
      x: {
        ticks: {
          color: COLORS.textMuted,
          font: {
            family: "'Space Grotesk', sans-serif",
            size: 11
          }
        },
        grid: {
          color: COLORS.border,
          drawBorder: false
        }
      }
    }
  }
};

// ============================================================================
// 5. COMPETITIVE PORTS RANKING (IRON & STEEL IMPORTS)
// ============================================================================

const competitivePortsConfig = {
  type: 'bar',
  data: {
    labels: ['Port of Mobile', 'Port of New Orleans', 'Port of Houston', 'Gramercy', 'Baton Rouge'],
    datasets: [{
      label: 'Ranking Position',
      data: [1, 2, 3, 4, 5],
      backgroundColor: COLORS.ports,
      borderColor: COLORS.ports.map(c => c),
      borderWidth: 2,
      borderRadius: 6,
    }]
  },
  options: {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      title: {
        display: true,
        text: 'Gulf Coast Iron & Steel Import Port Rankings',
        color: COLORS.text,
        font: {
          family: "'Space Grotesk', sans-serif",
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
        text: 'Leading ports by volume (2014-2023 period) • LMR ports hold 40% market share',
        color: COLORS.textMuted,
        font: {
          family: "'Space Grotesk', sans-serif",
          size: 11
        },
        padding: {
          bottom: 15
        }
      },
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: COLORS.backgroundLight,
        titleColor: COLORS.text,
        bodyColor: COLORS.textMuted,
        borderColor: COLORS.border,
        borderWidth: 1,
        padding: 12,
        cornerRadius: 6,
        callbacks: {
          label: function(context) {
            const portInfo = {
              'Port of Mobile': 'Pig iron, slab',
              'Port of New Orleans': 'Pig iron, slab',
              'Port of Houston': 'Structural steel, shapes, pipe',
              'Gramercy': 'Pig iron, slab',
              'Baton Rouge': 'Pig iron, slab'
            };
            return [
              `Rank: #${context.parsed.x}`,
              `Primary: ${portInfo[context.label]}`
            ];
          }
        }
      }
    },
    scales: {
      x: {
        reverse: true,
        min: 0,
        max: 5,
        ticks: {
          color: COLORS.textMuted,
          font: {
            family: "'Space Grotesk', sans-serif",
            size: 11
          },
          stepSize: 1
        },
        grid: {
          color: COLORS.border,
          drawBorder: false
        },
        title: {
          display: true,
          text: 'Rank (1 = Highest Volume)',
          color: COLORS.text,
          font: {
            family: "'Space Grotesk', sans-serif",
            size: 12,
            weight: 'bold'
          }
        }
      },
      y: {
        ticks: {
          color: COLORS.textMuted,
          font: {
            family: "'Space Grotesk', sans-serif",
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
// 6. BONUS: INTERMODAL MIDWEST MARKET TRENDS
// ============================================================================

const intermodalTrendsConfig = {
  type: 'bar',
  data: {
    labels: ['Southwest\n(LA/Long Beach)', 'Northeast\n(NY/Norfolk)', 'Pacific NW\n(Seattle/Tacoma)', 'Canada\nPacific'],
    datasets: [{
      label: 'CAGR 2010-2023 (%)',
      data: [-0.5, 6.2, -6.1, 7.7],
      backgroundColor: COLORS.intermodal,
      borderColor: COLORS.intermodal.map(c => c),
      borderWidth: 2,
      borderRadius: 6,
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      title: {
        display: true,
        text: 'International Intermodal to Midwest - Growth Trends',
        color: COLORS.text,
        font: {
          family: "'Space Grotesk', sans-serif",
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
        text: 'CAGR 2010-2023 • Shift from West Coast to East Coast/Canada evident',
        color: COLORS.textMuted,
        font: {
          family: "'Space Grotesk', sans-serif",
          size: 11
        },
        padding: {
          bottom: 15
        }
      },
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: COLORS.backgroundLight,
        titleColor: COLORS.text,
        bodyColor: COLORS.textMuted,
        borderColor: COLORS.border,
        borderWidth: 1,
        padding: 12,
        cornerRadius: 6,
        callbacks: {
          label: function(context) {
            const value = context.parsed.y;
            const trend = value > 0 ? 'Growing' : 'Declining';
            return [
              `CAGR: ${value.toFixed(1)}%`,
              `Trend: ${trend}`
            ];
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: COLORS.textMuted,
          font: {
            family: "'Space Grotesk', sans-serif",
            size: 11
          },
          callback: function(value) {
            return value.toFixed(1) + '%';
          }
        },
        grid: {
          color: COLORS.border,
          drawBorder: false
        },
        title: {
          display: true,
          text: 'Compound Annual Growth Rate (%)',
          color: COLORS.text,
          font: {
            family: "'Space Grotesk', sans-serif",
            size: 12,
            weight: 'bold'
          }
        }
      },
      x: {
        ticks: {
          color: COLORS.textMuted,
          font: {
            family: "'Space Grotesk', sans-serif",
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
// 7. BONUS: GULF COAST IRON & STEEL IMPORTS TREND (2014-2023)
// ============================================================================

const ironSteelTrendConfig = {
  type: 'line',
  data: {
    labels: ['2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023'],
    datasets: [{
      label: 'Gulf Coast Iron & Steel Imports',
      data: [19745834, 17102534, 14527277, 16370427, 15754886, 13764320, 10870124, 15271898, 13424359, 12990436],
      borderColor: COLORS.primary,
      backgroundColor: COLORS.primaryAlpha.replace('0.8)', '0.1)'),
      borderWidth: 3,
      tension: 0.3,
      pointRadius: 5,
      pointHoverRadius: 7,
      pointBackgroundColor: COLORS.primary,
      pointBorderColor: COLORS.background,
      pointBorderWidth: 2,
      fill: true
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      title: {
        display: true,
        text: 'Gulf Coast Iron & Steel Imports Trend (2014-2023)',
        color: COLORS.text,
        font: {
          family: "'Space Grotesk', sans-serif",
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
        text: 'CAGR: -4.5% • Declining trend with COVID-19 impact in 2020',
        color: COLORS.textMuted,
        font: {
          family: "'Space Grotesk', sans-serif",
          size: 11
        },
        padding: {
          bottom: 15
        }
      },
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: COLORS.backgroundLight,
        titleColor: COLORS.text,
        bodyColor: COLORS.textMuted,
        borderColor: COLORS.border,
        borderWidth: 1,
        padding: 12,
        cornerRadius: 6,
        callbacks: {
          label: function(context) {
            const value = context.parsed.y;
            return `Tonnage: ${value.toLocaleString()} short tons`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: false,
        ticks: {
          color: COLORS.textMuted,
          font: {
            family: "'Space Grotesk', sans-serif",
            size: 11
          },
          callback: function(value) {
            return (value / 1000000).toFixed(1) + 'M';
          }
        },
        grid: {
          color: COLORS.border,
          drawBorder: false
        },
        title: {
          display: true,
          text: 'Short Tons (millions)',
          color: COLORS.text,
          font: {
            family: "'Space Grotesk', sans-serif",
            size: 12,
            weight: 'bold'
          }
        }
      },
      x: {
        ticks: {
          color: COLORS.textMuted,
          font: {
            family: "'Space Grotesk', sans-serif",
            size: 11
          }
        },
        grid: {
          color: COLORS.border,
          drawBorder: false
        }
      }
    }
  }
};

// ============================================================================
// EXPORT CONFIGURATIONS
// ============================================================================

// For use in HTML pages - example usage:
/*
  <canvas id="commodityMixChart"></canvas>
  <script>
    const ctx = document.getElementById('commodityMixChart').getContext('2d');
    new Chart(ctx, commodityMixConfig);
  </script>
*/

// Export for module systems (if applicable)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    commodityMixConfig,
    marketShareConfig,
    bargeRateVolatilityConfig,
    containerGrowthConfig,
    competitivePortsConfig,
    intermodalTrendsConfig,
    ironSteelTrendConfig,
    COLORS
  };
}

// ============================================================================
// INITIALIZATION HELPER FUNCTION
// ============================================================================

/**
 * Initialize all charts on the page
 * Call this function when DOM is ready
 *
 * @param {Object} canvasIds - Object mapping chart names to canvas element IDs
 * @example
 * initializeCharts({
 *   commodityMix: 'commodityMixCanvas',
 *   marketShare: 'marketShareCanvas',
 *   bargeRates: 'bargeRatesCanvas',
 *   containerGrowth: 'containerGrowthCanvas',
 *   competitivePorts: 'competitivePortsCanvas',
 *   intermodal: 'intermodalCanvas',
 *   ironSteel: 'ironSteelCanvas'
 * });
 */
function initializeCharts(canvasIds) {
  const charts = {};

  if (canvasIds.commodityMix) {
    const ctx1 = document.getElementById(canvasIds.commodityMix);
    if (ctx1) charts.commodityMix = new Chart(ctx1, commodityMixConfig);
  }

  if (canvasIds.marketShare) {
    const ctx2 = document.getElementById(canvasIds.marketShare);
    if (ctx2) charts.marketShare = new Chart(ctx2, marketShareConfig);
  }

  if (canvasIds.bargeRates) {
    const ctx3 = document.getElementById(canvasIds.bargeRates);
    if (ctx3) charts.bargeRates = new Chart(ctx3, bargeRateVolatilityConfig);
  }

  if (canvasIds.containerGrowth) {
    const ctx4 = document.getElementById(canvasIds.containerGrowth);
    if (ctx4) charts.containerGrowth = new Chart(ctx4, containerGrowthConfig);
  }

  if (canvasIds.competitivePorts) {
    const ctx5 = document.getElementById(canvasIds.competitivePorts);
    if (ctx5) charts.competitivePorts = new Chart(ctx5, competitivePortsConfig);
  }

  if (canvasIds.intermodal) {
    const ctx6 = document.getElementById(canvasIds.intermodal);
    if (ctx6) charts.intermodal = new Chart(ctx6, intermodalTrendsConfig);
  }

  if (canvasIds.ironSteel) {
    const ctx7 = document.getElementById(canvasIds.ironSteel);
    if (ctx7) charts.ironSteel = new Chart(ctx7, ironSteelTrendConfig);
  }

  return charts;
}

// ============================================================================
// RESPONSIVE CHART UPDATES
// ============================================================================

/**
 * Update chart configurations for mobile devices
 * Call this on window resize or orientation change
 */
function updateChartsForMobile() {
  const isMobile = window.innerWidth < 768;

  if (isMobile) {
    // Reduce font sizes for mobile
    const mobileOptions = {
      plugins: {
        title: { font: { size: 14 } },
        subtitle: { font: { size: 10 } },
        legend: { labels: { font: { size: 10 }, padding: 10 } }
      },
      scales: {
        x: { ticks: { font: { size: 9 } } },
        y: { ticks: { font: { size: 9 } } }
      }
    };

    return mobileOptions;
  }

  return null;
}

// ============================================================================
// PRINT/EXPORT UTILITIES
// ============================================================================

/**
 * Prepare charts for print/PDF export
 * Adjusts colors and sizes for better print quality
 */
function prepareChartsForPrint() {
  const printColors = {
    background: '#ffffff',
    text: '#000000',
    grid: '#cccccc'
  };

  return printColors;
}

// ============================================================================
// END OF CHART CONFIGURATIONS
// ============================================================================
