/**
 * Executive Summary Dashboard - Chart.js Configurations
 * Port Sulphur Freeport Facility Investment Analysis
 *
 * Generated: 2026-01-22
 * Data Source: executive_summary_data.json
 */

// Color palette for consistent branding
const chartColors = {
  primary: '#64ffb4',           // Maritime green
  secondary: '#4ecdc4',
  accent: '#45b7d1',
  warning: '#f7b731',
  danger: '#eb4d4b',
  dark: '#1a1a2e',
  darkGray: '#2d2d44',
  mediumGray: '#4a4a5e',
  lightGray: '#6b6b7e',
  white: '#ffffff',
  whiteTransparent: 'rgba(255, 255, 255, 0.9)',
  greenGradient: ['rgba(100, 255, 180, 0.8)', 'rgba(78, 205, 196, 0.6)'],
  blueGradient: ['rgba(69, 183, 209, 0.8)', 'rgba(78, 205, 196, 0.6)']
};

// Global chart defaults for consistent styling
const chartDefaults = {
  font: {
    family: "'Space Grotesk', sans-serif",
    size: 13,
    weight: '400'
  },
  color: chartColors.whiteTransparent,
  responsive: true,
  maintainAspectRatio: true
};

/**
 * 1. KEY METRICS DASHBOARD (Hero Section)
 * Compact display of critical property metrics
 */
const keyMetricsDashboardConfig = {
  type: 'bar',
  data: {
    labels: [
      'Property Size\n(acres)',
      'River Frontage\n(feet)',
      'Water Depth\n(feet)',
      'Years\nOperational'
    ],
    datasets: [{
      label: 'Key Metrics',
      data: [106.99, 10693, 52, 72],
      backgroundColor: [
        chartColors.primary,
        chartColors.secondary,
        chartColors.accent,
        chartColors.warning
      ],
      borderColor: chartColors.dark,
      borderWidth: 2,
      borderRadius: 6,
      barThickness: 'flex',
      maxBarThickness: 80
    }]
  },
  options: {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: 'Port Sulphur Facility - Key Metrics',
        font: {
          size: 18,
          weight: '600',
          family: chartDefaults.font.family
        },
        color: chartColors.white,
        padding: { top: 10, bottom: 20 }
      },
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: chartColors.darkGray,
        titleColor: chartColors.white,
        bodyColor: chartColors.whiteTransparent,
        borderColor: chartColors.primary,
        borderWidth: 1,
        padding: 12,
        displayColors: false,
        callbacks: {
          title: function(context) {
            return context[0].label.replace(/\n/g, ' ');
          },
          label: function(context) {
            const value = context.parsed.x.toLocaleString();
            const unit = ['acres', 'linear feet', 'foot draft', 'years'][context.dataIndex];
            return `${value} ${unit}`;
          }
        }
      }
    },
    scales: {
      x: {
        beginAtZero: true,
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
          drawBorder: false
        },
        ticks: {
          color: chartColors.whiteTransparent,
          font: chartDefaults.font,
          callback: function(value) {
            return value.toLocaleString();
          }
        }
      },
      y: {
        grid: {
          display: false,
          drawBorder: false
        },
        ticks: {
          color: chartColors.white,
          font: {
            size: 12,
            weight: '500',
            family: chartDefaults.font.family
          },
          autoSkip: false
        }
      }
    }
  }
};

/**
 * 2. INVESTMENT HIGHLIGHTS CHART
 * Stacked bar showing value propositions across categories
 */
const investmentHighlightsConfig = {
  type: 'bar',
  data: {
    labels: [
      'Strategic\nLocation',
      'Existing\nInfrastructure',
      'Environmental\nStatus',
      'Regional\nGrowth',
      'Market\nPosition',
      'Transportation\nNetwork'
    ],
    datasets: [{
      label: 'Investment Strength',
      data: [4, 4, 4, 4, 4, 4], // Each category has 4 bullet points
      backgroundColor: createGradient,
      borderColor: chartColors.primary,
      borderWidth: 2,
      borderRadius: 8,
      barThickness: 40
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: 'Investment Highlights: 6 Strategic Advantages',
        font: {
          size: 18,
          weight: '600',
          family: chartDefaults.font.family
        },
        color: chartColors.white,
        padding: { top: 10, bottom: 20 }
      },
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: chartColors.darkGray,
        titleColor: chartColors.white,
        bodyColor: chartColors.whiteTransparent,
        borderColor: chartColors.primary,
        borderWidth: 1,
        padding: 12,
        displayColors: false,
        callbacks: {
          title: function(context) {
            return context[0].label.replace(/\n/g, ' ');
          },
          label: function(context) {
            const categories = [
              ['52\' draft capability', '10,693 LF river frontage', 'Mile Marker 39 position', 'Highway 23 access'],
              ['Historic dock facility', '5,000 SF warehouse', 'Industrial zoning', 'Year-round navigation'],
              ['Remediation completed', 'No Superfund status', 'EPA verified', 'Development ready'],
              ['$21B Venture Global LNG', '$500M APM Terminal', '$85M rail spur', '$60B+ regional investment'],
              ['$68K/acre waterfront avg', '62% river frontage premium', 'Top-5 port target', 'Gulf proximity'],
              ['45\' maintained channel', 'Future rail access', '$169M bridge upgrade', '6 Class I railroads']
            ];
            return categories[context.dataIndex];
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false,
          drawBorder: false
        },
        ticks: {
          color: chartColors.white,
          font: {
            size: 11,
            weight: '500',
            family: chartDefaults.font.family
          },
          autoSkip: false,
          maxRotation: 0,
          minRotation: 0
        }
      },
      y: {
        beginAtZero: true,
        max: 5,
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
          drawBorder: false
        },
        ticks: {
          color: chartColors.whiteTransparent,
          font: chartDefaults.font,
          stepSize: 1,
          callback: function(value) {
            return value === 0 ? '0' : value + ' points';
          }
        },
        title: {
          display: true,
          text: 'Key Attributes per Category',
          color: chartColors.whiteTransparent,
          font: {
            size: 12,
            weight: '500',
            family: chartDefaults.font.family
          }
        }
      }
    }
  }
};

/**
 * 3. STRATEGIC ADVANTAGES RADAR CHART
 * Multidimensional view of competitive positioning
 */
const strategicAdvantagesRadarConfig = {
  type: 'radar',
  data: {
    labels: [
      'Deepest Water\nAccess',
      'Gulf\nProximity',
      'Remediated\nBrownfield',
      'Regional\nCluster',
      'Multimodal\nPotential',
      'Historic\nInfrastructure',
      'Industrial\nZoning',
      'Contiguous\nAcreage'
    ],
    datasets: [{
      label: 'Port Sulphur Competitive Advantage',
      data: [10, 9, 8, 10, 7, 6, 9, 8], // Relative strength scores (1-10)
      backgroundColor: 'rgba(100, 255, 180, 0.2)',
      borderColor: chartColors.primary,
      borderWidth: 3,
      pointBackgroundColor: chartColors.primary,
      pointBorderColor: chartColors.white,
      pointBorderWidth: 2,
      pointRadius: 6,
      pointHoverRadius: 8,
      pointHoverBackgroundColor: chartColors.white,
      pointHoverBorderColor: chartColors.primary
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      title: {
        display: true,
        text: 'Strategic Advantages: Competitive Positioning',
        font: {
          size: 18,
          weight: '600',
          family: chartDefaults.font.family
        },
        color: chartColors.white,
        padding: { top: 10, bottom: 20 }
      },
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: chartColors.darkGray,
        titleColor: chartColors.white,
        bodyColor: chartColors.whiteTransparent,
        borderColor: chartColors.primary,
        borderWidth: 1,
        padding: 12,
        displayColors: false,
        callbacks: {
          title: function(context) {
            return context[0].label.replace(/\n/g, ' ');
          },
          label: function(context) {
            const descriptions = [
              '52\' draft exceeds regional competitors',
              '3+ hour shipping time advantage to Gulf',
              'Lower regulatory risk vs. greenfield',
              '$60B+ in announced nearby projects',
              'River + highway + planned rail access',
              '92-year dock foundation in place',
              'ID3 permits heavy industrial use',
              '106.99 acres for phased development'
            ];
            return [
              `Strength: ${context.parsed.r}/10`,
              descriptions[context.dataIndex]
            ];
          }
        }
      }
    },
    scales: {
      r: {
        beginAtZero: true,
        max: 10,
        min: 0,
        ticks: {
          stepSize: 2,
          color: chartColors.whiteTransparent,
          backdropColor: 'transparent',
          font: {
            size: 11,
            family: chartDefaults.font.family
          }
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.2)',
          circular: true
        },
        angleLines: {
          color: 'rgba(255, 255, 255, 0.2)'
        },
        pointLabels: {
          color: chartColors.white,
          font: {
            size: 11,
            weight: '500',
            family: chartDefaults.font.family
          },
          padding: 15
        }
      }
    }
  }
};

/**
 * 4. RISK FACTORS VS. MITIGATION MATRIX
 * Horizontal bar chart showing risk severity and mitigation strength
 */
const riskMitigationMatrixConfig = {
  type: 'bar',
  data: {
    labels: [
      'Flood/Hurricane\nExposure',
      'Infrastructure\nAge',
      'Environmental\nLegacy',
      'Rail\nConnectivity',
      'Captive Cargo\nDominance'
    ],
    datasets: [
      {
        label: 'Risk Severity',
        data: [9, 7, 6, 5, 6], // Risk severity scores (1-10)
        backgroundColor: chartColors.danger,
        borderColor: chartColors.dark,
        borderWidth: 2,
        borderRadius: 6
      },
      {
        label: 'Mitigation Strength',
        data: [7, 8, 9, 8, 7], // Mitigation effectiveness scores (1-10)
        backgroundColor: chartColors.primary,
        borderColor: chartColors.dark,
        borderWidth: 2,
        borderRadius: 6
      }
    ]
  },
  options: {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: 'Risk Assessment: Severity vs. Mitigation',
        font: {
          size: 18,
          weight: '600',
          family: chartDefaults.font.family
        },
        color: chartColors.white,
        padding: { top: 10, bottom: 20 }
      },
      legend: {
        display: true,
        position: 'top',
        align: 'end',
        labels: {
          color: chartColors.white,
          font: {
            size: 12,
            weight: '500',
            family: chartDefaults.font.family
          },
          padding: 15,
          usePointStyle: true,
          pointStyle: 'rectRounded'
        }
      },
      tooltip: {
        backgroundColor: chartColors.darkGray,
        titleColor: chartColors.white,
        bodyColor: chartColors.whiteTransparent,
        borderColor: chartColors.primary,
        borderWidth: 1,
        padding: 12,
        callbacks: {
          title: function(context) {
            return context[0].label.replace(/\n/g, ' ');
          },
          label: function(context) {
            const risks = [
              'Katrina: 22 feet flooding',
              '92-year-old dock requires evaluation',
              '72 years sulfur processing',
              'No direct rail currently',
              '80-90% cargo bypasses port'
            ];
            const mitigations = [
              'Elevated facilities + insurance',
              'Phased inspection + capital plan',
              'Phase I/II ESA + indemnification',
              '$85M extension by 2028-2029',
              'Target 5-10M tons non-captive'
            ];
            const score = context.parsed.x;
            const detail = context.datasetIndex === 0 ? risks[context.dataIndex] : mitigations[context.dataIndex];
            return [
              `${context.dataset.label}: ${score}/10`,
              detail
            ];
          }
        }
      }
    },
    scales: {
      x: {
        beginAtZero: true,
        max: 10,
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
          drawBorder: false
        },
        ticks: {
          color: chartColors.whiteTransparent,
          font: chartDefaults.font,
          stepSize: 2
        },
        title: {
          display: true,
          text: 'Score (1-10)',
          color: chartColors.whiteTransparent,
          font: {
            size: 12,
            weight: '500',
            family: chartDefaults.font.family
          }
        }
      },
      y: {
        grid: {
          display: false,
          drawBorder: false
        },
        ticks: {
          color: chartColors.white,
          font: {
            size: 11,
            weight: '500',
            family: chartDefaults.font.family
          },
          autoSkip: false
        }
      }
    }
  }
};

/**
 * 5. REGIONAL DEVELOPMENT COMPARISON
 * Bubble chart comparing property value, acreage, and investment potential
 */
const regionalDevelopmentComparisonConfig = {
  type: 'scatter',
  data: {
    datasets: [
      {
        label: 'Port Sulphur (Target Property)',
        data: [{
          x: 106.99, // Acreage
          y: 137420, // Price per acre baseline
          r: 25 // Investment potential (bubble size)
        }],
        backgroundColor: 'rgba(100, 255, 180, 0.7)',
        borderColor: chartColors.primary,
        borderWidth: 3,
        pointStyle: 'star'
      },
      {
        label: 'Avondale Marine (2024)',
        data: [{
          x: 12, // Estimated acreage
          y: 1300000,
          r: 30
        }],
        backgroundColor: 'rgba(235, 77, 75, 0.6)',
        borderColor: chartColors.danger,
        borderWidth: 2
      },
      {
        label: 'Violet Dock',
        data: [{
          x: 18, // Estimated acreage
          y: 222222,
          r: 15
        }],
        backgroundColor: 'rgba(247, 183, 49, 0.6)',
        borderColor: chartColors.warning,
        borderWidth: 2
      },
      {
        label: 'Phillips 66 Alliance',
        data: [{
          x: 80, // Estimated acreage
          y: 156250,
          r: 18
        }],
        backgroundColor: 'rgba(69, 183, 209, 0.6)',
        borderColor: chartColors.accent,
        borderWidth: 2
      },
      {
        label: 'Port Nickel Complex',
        data: [{
          x: 387,
          y: 68000, // Regional waterfront avg
          r: 22
        }],
        backgroundColor: 'rgba(78, 205, 196, 0.6)',
        borderColor: chartColors.secondary,
        borderWidth: 2
      },
      {
        label: 'Gold River Mega Site',
        data: [{
          x: 985,
          y: 39559, // General parish avg
          r: 20
        }],
        backgroundColor: 'rgba(160, 160, 180, 0.6)',
        borderColor: chartColors.mediumGray,
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
        text: 'Regional Industrial Properties: Comparison Matrix',
        font: {
          size: 18,
          weight: '600',
          family: chartDefaults.font.family
        },
        color: chartColors.white,
        padding: { top: 10, bottom: 20 }
      },
      legend: {
        display: true,
        position: 'right',
        labels: {
          color: chartColors.white,
          font: {
            size: 11,
            weight: '400',
            family: chartDefaults.font.family
          },
          padding: 10,
          usePointStyle: true,
          pointStyle: 'circle'
        }
      },
      tooltip: {
        backgroundColor: chartColors.darkGray,
        titleColor: chartColors.white,
        bodyColor: chartColors.whiteTransparent,
        borderColor: chartColors.primary,
        borderWidth: 1,
        padding: 12,
        callbacks: {
          title: function(context) {
            return context[0].dataset.label;
          },
          label: function(context) {
            const acres = context.parsed.x.toFixed(2);
            const pricePerAcre = context.parsed.y.toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD',
              minimumFractionDigits: 0
            });
            const potential = context.raw.r;
            return [
              `Acreage: ${acres} acres`,
              `Price/Acre: ${pricePerAcre}`,
              `Investment Score: ${potential}/30`
            ];
          }
        }
      }
    },
    scales: {
      x: {
        type: 'logarithmic',
        position: 'bottom',
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
          drawBorder: false
        },
        ticks: {
          color: chartColors.whiteTransparent,
          font: chartDefaults.font,
          callback: function(value) {
            return value.toLocaleString() + ' ac';
          }
        },
        title: {
          display: true,
          text: 'Property Size (acres, log scale)',
          color: chartColors.whiteTransparent,
          font: {
            size: 12,
            weight: '500',
            family: chartDefaults.font.family
          }
        }
      },
      y: {
        type: 'logarithmic',
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
          drawBorder: false
        },
        ticks: {
          color: chartColors.whiteTransparent,
          font: chartDefaults.font,
          callback: function(value) {
            if (value >= 1000000) {
              return '$' + (value / 1000000).toFixed(1) + 'M';
            } else if (value >= 1000) {
              return '$' + (value / 1000).toFixed(0) + 'K';
            }
            return '$' + value;
          }
        },
        title: {
          display: true,
          text: 'Price per Acre (log scale)',
          color: chartColors.whiteTransparent,
          font: {
            size: 12,
            weight: '500',
            family: chartDefaults.font.family
          }
        }
      }
    }
  }
};

/**
 * 6. FINANCIAL SNAPSHOT - DOUGHNUT CHART
 * Property valuation range visualization
 */
const financialSnapshotConfig = {
  type: 'doughnut',
  data: {
    labels: [
      'Baseline Valuation ($14.7M)',
      'Low Range ($5.3M)',
      'High Range ($26.8M)'
    ],
    datasets: [{
      data: [14.7, 5.3, 26.8], // Values in millions
      backgroundColor: [
        chartColors.primary,
        chartColors.warning,
        chartColors.accent
      ],
      borderColor: chartColors.dark,
      borderWidth: 3,
      hoverOffset: 15
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      title: {
        display: true,
        text: 'Estimated Property Valuation Range',
        font: {
          size: 18,
          weight: '600',
          family: chartDefaults.font.family
        },
        color: chartColors.white,
        padding: { top: 10, bottom: 20 }
      },
      legend: {
        display: true,
        position: 'bottom',
        labels: {
          color: chartColors.white,
          font: {
            size: 12,
            weight: '400',
            family: chartDefaults.font.family
          },
          padding: 15,
          usePointStyle: true
        }
      },
      tooltip: {
        backgroundColor: chartColors.darkGray,
        titleColor: chartColors.white,
        bodyColor: chartColors.whiteTransparent,
        borderColor: chartColors.primary,
        borderWidth: 1,
        padding: 12,
        callbacks: {
          label: function(context) {
            const label = context.label;
            const value = context.parsed;
            const basis = ['$137,420/acre baseline', '$50,000/acre (low)', '$250,000/acre (premium)'][context.dataIndex];
            return [
              label,
              `Total: $${value.toFixed(1)}M`,
              `Basis: ${basis}`
            ];
          }
        }
      }
    }
  }
};

/**
 * 7. INFRASTRUCTURE PREMIUM COMPARISON
 * Bar chart showing value premiums for different features
 */
const infrastructurePremiumConfig = {
  type: 'bar',
  data: {
    labels: [
      'Bay\nWaterfront',
      'River\nWaterfront',
      'Canal\nWaterfront',
      'Port\nProximity',
      'Rail\nAccess',
      'Existing\nDock',
      'Deep Water\n45-48ft',
      'Highway\nAccess'
    ],
    datasets: [{
      label: 'Premium Percentage',
      data: [107, 62, 61, 40, 30, 35, 25, 20],
      backgroundColor: createGradient,
      borderColor: chartColors.primary,
      borderWidth: 2,
      borderRadius: 6
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: 'Infrastructure Features: Market Value Premiums',
        font: {
          size: 18,
          weight: '600',
          family: chartDefaults.font.family
        },
        color: chartColors.white,
        padding: { top: 10, bottom: 20 }
      },
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: chartColors.darkGray,
        titleColor: chartColors.white,
        bodyColor: chartColors.whiteTransparent,
        borderColor: chartColors.primary,
        borderWidth: 1,
        padding: 12,
        callbacks: {
          title: function(context) {
            return context[0].label.replace(/\n/g, ' ');
          },
          label: function(context) {
            const value = context.parsed.y;
            const portSulphurFeatures = [
              '✗ Not bay waterfront',
              '✓ Port Sulphur has river frontage',
              '✗ Not canal waterfront',
              '✓ Adjacent to Louisiana Gateway Port',
              '○ Planned rail by 2028-2029',
              '✓ Historic 92-year dock in place',
              '✓ 52\' draft capability',
              '✓ 2,500 LF Highway 23 frontage'
            ];
            return [
              `Premium: ${value}%`,
              portSulphurFeatures[context.dataIndex]
            ];
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false,
          drawBorder: false
        },
        ticks: {
          color: chartColors.white,
          font: {
            size: 11,
            weight: '500',
            family: chartDefaults.font.family
          },
          autoSkip: false
        }
      },
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
          drawBorder: false
        },
        ticks: {
          color: chartColors.whiteTransparent,
          font: chartDefaults.font,
          callback: function(value) {
            return value + '%';
          }
        },
        title: {
          display: true,
          text: 'Value Premium (%)',
          color: chartColors.whiteTransparent,
          font: {
            size: 12,
            weight: '500',
            family: chartDefaults.font.family
          }
        }
      }
    }
  }
};

/**
 * Helper function to create gradient fills for charts
 * Must be called within chart context to access canvas
 */
function createGradient(context) {
  const chart = context.chart;
  const {ctx, chartArea} = chart;

  if (!chartArea) {
    return chartColors.primary;
  }

  const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
  gradient.addColorStop(0, 'rgba(100, 255, 180, 0.8)');
  gradient.addColorStop(1, 'rgba(78, 205, 196, 0.4)');
  return gradient;
}

/**
 * INITIALIZATION FUNCTIONS
 * Call these functions to render charts in the dashboard
 */

// Initialize all charts when DOM is ready
function initializeExecutiveSummaryDashboard() {
  // Chart 1: Key Metrics Dashboard
  const keyMetricsCanvas = document.getElementById('keyMetricsChart');
  if (keyMetricsCanvas) {
    new Chart(keyMetricsCanvas, keyMetricsDashboardConfig);
  }

  // Chart 2: Investment Highlights
  const investmentHighlightsCanvas = document.getElementById('investmentHighlightsChart');
  if (investmentHighlightsCanvas) {
    new Chart(investmentHighlightsCanvas, investmentHighlightsConfig);
  }

  // Chart 3: Strategic Advantages Radar
  const strategicAdvantagesCanvas = document.getElementById('strategicAdvantagesChart');
  if (strategicAdvantagesCanvas) {
    new Chart(strategicAdvantagesCanvas, strategicAdvantagesRadarConfig);
  }

  // Chart 4: Risk Mitigation Matrix
  const riskMitigationCanvas = document.getElementById('riskMitigationChart');
  if (riskMitigationCanvas) {
    new Chart(riskMitigationCanvas, riskMitigationMatrixConfig);
  }

  // Chart 5: Regional Development Comparison
  const regionalComparisonCanvas = document.getElementById('regionalComparisonChart');
  if (regionalComparisonCanvas) {
    new Chart(regionalComparisonCanvas, regionalDevelopmentComparisonConfig);
  }

  // Chart 6: Financial Snapshot
  const financialSnapshotCanvas = document.getElementById('financialSnapshotChart');
  if (financialSnapshotCanvas) {
    new Chart(financialSnapshotCanvas, financialSnapshotConfig);
  }

  // Chart 7: Infrastructure Premium
  const infrastructurePremiumCanvas = document.getElementById('infrastructurePremiumChart');
  if (infrastructurePremiumCanvas) {
    new Chart(infrastructurePremiumCanvas, infrastructurePremiumConfig);
  }
}

// Auto-initialize on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeExecutiveSummaryDashboard);
} else {
  initializeExecutiveSummaryDashboard();
}

/**
 * EXPORT CONFIGURATIONS
 * For manual chart initialization or testing
 */
export {
  keyMetricsDashboardConfig,
  investmentHighlightsConfig,
  strategicAdvantagesRadarConfig,
  riskMitigationMatrixConfig,
  regionalDevelopmentComparisonConfig,
  financialSnapshotConfig,
  infrastructurePremiumConfig,
  chartColors,
  chartDefaults,
  initializeExecutiveSummaryDashboard
};
