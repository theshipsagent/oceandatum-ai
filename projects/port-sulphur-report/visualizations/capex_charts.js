/**
 * Port Sulphur Terminal - CAPEX Data Visualization Configurations
 * Generated from capex_data.json
 *
 * Chart.js v4.x configurations for investment analysis visualization
 * Total Investment Range: $27.95M - $52.65M
 * Timeline: 39-81 months
 *
 * Usage:
 * Include Chart.js library and this file, then instantiate charts with:
 * new Chart(ctx, CAPEX_CHARTS.investmentBreakdown);
 */

const CAPEX_CHARTS = {

  /**
   * 1. TOTAL INVESTMENT BREAKDOWN - PIE CHART
   * Shows the base case distribution of $35M total investment
   */
  investmentBreakdown: {
    type: 'pie',
    data: {
      labels: [
        'Property Acquisition',
        'Environmental Remediation',
        'Initial Development',
        'Due Diligence & Assessments'
      ],
      datasets: [{
        label: 'Investment Distribution',
        data: [
          14700000,  // Acquisition
          15000000,  // Environmental Remediation (base case)
          3500000,   // Initial Development (base case)
          100000     // Due Diligence (base case)
        ],
        backgroundColor: [
          'rgba(100, 255, 180, 0.8)',  // Maritime green
          'rgba(255, 99, 132, 0.8)',    // Red (risk indicator)
          'rgba(54, 162, 235, 0.8)',    // Blue
          'rgba(255, 206, 86, 0.8)'     // Yellow
        ],
        borderColor: [
          'rgba(100, 255, 180, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)'
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
          text: 'Total Project Investment Breakdown (Base Case: $35M)',
          font: {
            size: 18,
            family: 'Space Grotesk, sans-serif',
            weight: 'bold'
          },
          color: 'rgba(255, 255, 255, 0.9)',
          padding: 20
        },
        legend: {
          position: 'bottom',
          labels: {
            color: 'rgba(255, 255, 255, 0.8)',
            font: {
              size: 12,
              family: 'Space Grotesk, sans-serif'
            },
            padding: 15,
            usePointStyle: true
          }
        },
        tooltip: {
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          titleFont: {
            size: 14,
            family: 'Space Grotesk, sans-serif'
          },
          bodyFont: {
            size: 13,
            family: 'Space Grotesk, sans-serif'
          },
          padding: 12,
          displayColors: true,
          callbacks: {
            label: function(context) {
              const label = context.label || '';
              const value = context.parsed || 0;
              const total = context.dataset.data.reduce((a, b) => a + b, 0);
              const percentage = ((value / total) * 100).toFixed(1);
              return `${label}: $${(value / 1000000).toFixed(1)}M (${percentage}%)`;
            }
          }
        }
      }
    }
  },

  /**
   * 2. COST CATEGORIES COMPARISON - GROUPED BAR CHART
   * Shows low, base, and high estimates for major cost categories
   */
  costCategoriesComparison: {
    type: 'bar',
    data: {
      labels: [
        'Acquisition',
        'Environmental\nRemediation',
        'Infrastructure\n(Scenario A)',
        'Infrastructure\n(Scenario B)',
        'Due Diligence'
      ],
      datasets: [
        {
          label: 'Low Estimate',
          data: [14.7, 8.0, 5.2, 6.9, 0.05],
          backgroundColor: 'rgba(54, 162, 235, 0.7)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        },
        {
          label: 'Base Case',
          data: [14.7, 15.0, 7.5, 15.0, 0.1],
          backgroundColor: 'rgba(100, 255, 180, 0.7)',
          borderColor: 'rgba(100, 255, 180, 1)',
          borderWidth: 1
        },
        {
          label: 'High Estimate',
          data: [14.7, 25.0, 10.8, 27.7, 0.15],
          backgroundColor: 'rgba(255, 99, 132, 0.7)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          grid: {
            color: 'rgba(255, 255, 255, 0.1)'
          },
          ticks: {
            color: 'rgba(255, 255, 255, 0.8)',
            font: {
              size: 11,
              family: 'Space Grotesk, sans-serif'
            }
          }
        },
        y: {
          beginAtZero: true,
          grid: {
            color: 'rgba(255, 255, 255, 0.1)'
          },
          ticks: {
            color: 'rgba(255, 255, 255, 0.8)',
            font: {
              size: 12,
              family: 'Space Grotesk, sans-serif'
            },
            callback: function(value) {
              return '$' + value + 'M';
            }
          },
          title: {
            display: true,
            text: 'Cost (Millions USD)',
            color: 'rgba(255, 255, 255, 0.9)',
            font: {
              size: 14,
              family: 'Space Grotesk, sans-serif',
              weight: 'bold'
            }
          }
        }
      },
      plugins: {
        title: {
          display: true,
          text: 'Major Cost Categories by Estimate Range',
          font: {
            size: 18,
            family: 'Space Grotesk, sans-serif',
            weight: 'bold'
          },
          color: 'rgba(255, 255, 255, 0.9)',
          padding: 20
        },
        legend: {
          position: 'top',
          labels: {
            color: 'rgba(255, 255, 255, 0.8)',
            font: {
              size: 12,
              family: 'Space Grotesk, sans-serif'
            },
            padding: 15,
            usePointStyle: true
          }
        },
        tooltip: {
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          titleFont: {
            size: 14,
            family: 'Space Grotesk, sans-serif'
          },
          bodyFont: {
            size: 13,
            family: 'Space Grotesk, sans-serif'
          },
          padding: 12,
          callbacks: {
            label: function(context) {
              return context.dataset.label + ': $' + context.parsed.y.toFixed(2) + 'M';
            }
          }
        }
      }
    }
  },

  /**
   * 3. PROJECT TIMELINE - HORIZONTAL BAR CHART (GANTT-STYLE)
   * Shows development phases with duration ranges
   */
  projectTimeline: {
    type: 'bar',
    data: {
      labels: [
        'Phase 1:\nDue Diligence',
        'Phase 2:\nRemediation',
        'Phase 3:\nPermitting',
        'Phase 4:\nConstruction',
        'TOTAL DURATION'
      ],
      datasets: [
        {
          label: 'Minimum Duration (months)',
          data: [3, 12, 18, 6, 39],
          backgroundColor: 'rgba(54, 162, 235, 0.7)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        },
        {
          label: 'Maximum Duration (months)',
          data: [6, 24, 36, 15, 81],
          backgroundColor: 'rgba(255, 99, 132, 0.7)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1
        }
      ]
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          beginAtZero: true,
          grid: {
            color: 'rgba(255, 255, 255, 0.1)'
          },
          ticks: {
            color: 'rgba(255, 255, 255, 0.8)',
            font: {
              size: 12,
              family: 'Space Grotesk, sans-serif'
            },
            callback: function(value) {
              return value + ' mo';
            }
          },
          title: {
            display: true,
            text: 'Duration (Months)',
            color: 'rgba(255, 255, 255, 0.9)',
            font: {
              size: 14,
              family: 'Space Grotesk, sans-serif',
              weight: 'bold'
            }
          }
        },
        y: {
          grid: {
            color: 'rgba(255, 255, 255, 0.1)'
          },
          ticks: {
            color: 'rgba(255, 255, 255, 0.8)',
            font: {
              size: 11,
              family: 'Space Grotesk, sans-serif'
            }
          }
        }
      },
      plugins: {
        title: {
          display: true,
          text: 'Development Timeline: 39-81 Months (3.25-6.75 Years)',
          font: {
            size: 18,
            family: 'Space Grotesk, sans-serif',
            weight: 'bold'
          },
          color: 'rgba(255, 255, 255, 0.9)',
          padding: 20
        },
        legend: {
          position: 'top',
          labels: {
            color: 'rgba(255, 255, 255, 0.8)',
            font: {
              size: 12,
              family: 'Space Grotesk, sans-serif'
            },
            padding: 15,
            usePointStyle: true
          }
        },
        tooltip: {
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          titleFont: {
            size: 14,
            family: 'Space Grotesk, sans-serif'
          },
          bodyFont: {
            size: 13,
            family: 'Space Grotesk, sans-serif'
          },
          padding: 12,
          callbacks: {
            label: function(context) {
              const months = context.parsed.x;
              const years = (months / 12).toFixed(1);
              return context.dataset.label.replace(' (months)', '') + ': ' + months + ' months (' + years + ' years)';
            }
          }
        }
      }
    }
  },

  /**
   * 4. REVENUE POTENTIAL SCENARIOS - BAR CHART
   * Compares gross and net annual revenue across utilization scenarios
   */
  revenueScenarios: {
    type: 'bar',
    data: {
      labels: [
        'Conservative\n(2 calls/week)',
        'Base Case\n(3 calls/week)',
        'Optimistic\n(4 calls/week)'
      ],
      datasets: [
        {
          label: 'Gross Annual Revenue',
          data: [2.59, 3.88, 5.18],
          backgroundColor: 'rgba(100, 255, 180, 0.7)',
          borderColor: 'rgba(100, 255, 180, 1)',
          borderWidth: 1
        },
        {
          label: 'Net Annual Revenue (after 20% OpEx)',
          data: [2.07, 3.10, 4.14],
          backgroundColor: 'rgba(54, 162, 235, 0.7)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          grid: {
            color: 'rgba(255, 255, 255, 0.1)'
          },
          ticks: {
            color: 'rgba(255, 255, 255, 0.8)',
            font: {
              size: 11,
              family: 'Space Grotesk, sans-serif'
            }
          }
        },
        y: {
          beginAtZero: true,
          grid: {
            color: 'rgba(255, 255, 255, 0.1)'
          },
          ticks: {
            color: 'rgba(255, 255, 255, 0.8)',
            font: {
              size: 12,
              family: 'Space Grotesk, sans-serif'
            },
            callback: function(value) {
              return '$' + value + 'M';
            }
          },
          title: {
            display: true,
            text: 'Annual Revenue (Millions USD)',
            color: 'rgba(255, 255, 255, 0.9)',
            font: {
              size: 14,
              family: 'Space Grotesk, sans-serif',
              weight: 'bold'
            }
          }
        }
      },
      plugins: {
        title: {
          display: true,
          text: 'Midstream Mooring Facility - Annual Revenue Potential',
          font: {
            size: 18,
            family: 'Space Grotesk, sans-serif',
            weight: 'bold'
          },
          color: 'rgba(255, 255, 255, 0.9)',
          padding: 20
        },
        subtitle: {
          display: true,
          text: 'Supramax vessels (30,000 GRT) @ $0.78/GRT + $1,500 security fee',
          font: {
            size: 12,
            family: 'Space Grotesk, sans-serif'
          },
          color: 'rgba(255, 255, 255, 0.7)',
          padding: {
            bottom: 10
          }
        },
        legend: {
          position: 'top',
          labels: {
            color: 'rgba(255, 255, 255, 0.8)',
            font: {
              size: 12,
              family: 'Space Grotesk, sans-serif'
            },
            padding: 15,
            usePointStyle: true
          }
        },
        tooltip: {
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          titleFont: {
            size: 14,
            family: 'Space Grotesk, sans-serif'
          },
          bodyFont: {
            size: 13,
            family: 'Space Grotesk, sans-serif'
          },
          padding: 12,
          callbacks: {
            label: function(context) {
              return context.dataset.label + ': $' + context.parsed.y.toFixed(2) + 'M';
            },
            afterLabel: function(context) {
              if (context.datasetIndex === 0) {
                const calls = [104, 156, 208][context.dataIndex];
                return `(${calls} annual vessel calls)`;
              }
            }
          }
        }
      }
    }
  },

  /**
   * 5. INFRASTRUCTURE SCENARIOS COMPARISON - STACKED BAR CHART
   * Compares component costs for Scenario A vs Scenario B
   */
  infrastructureScenarios: {
    type: 'bar',
    data: {
      labels: [
        'Pile Installation',
        'Mooring/Navigation',
        'Dock Barge',
        'Marine Construction',
        'Land Improvements',
        'Engineering/Permitting'
      ],
      datasets: [
        {
          label: 'Scenario A - Low',
          data: [1.8, 0.3, 0.2, 1.5, 0.3, 0.7],
          backgroundColor: 'rgba(54, 162, 235, 0.6)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
          stack: 'scenario-a'
        },
        {
          label: 'Scenario A - High',
          data: [4.2, 0.8, 0.5, 3.1, 0.6, 1.4],
          backgroundColor: 'rgba(54, 162, 235, 0.9)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
          stack: 'scenario-a-high'
        },
        {
          label: 'Scenario B - Low',
          data: [2.4, 0.8, 0.3, 2.5, 0.4, 0.5],
          backgroundColor: 'rgba(255, 206, 86, 0.6)',
          borderColor: 'rgba(255, 206, 86, 1)',
          borderWidth: 1,
          stack: 'scenario-b'
        },
        {
          label: 'Scenario B - High',
          data: [9.2, 2.5, 0.8, 12.0, 1.2, 2.0],
          backgroundColor: 'rgba(255, 206, 86, 0.9)',
          borderColor: 'rgba(255, 206, 86, 1)',
          borderWidth: 1,
          stack: 'scenario-b-high'
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          grid: {
            color: 'rgba(255, 255, 255, 0.1)'
          },
          ticks: {
            color: 'rgba(255, 255, 255, 0.8)',
            font: {
              size: 10,
              family: 'Space Grotesk, sans-serif'
            }
          }
        },
        y: {
          beginAtZero: true,
          stacked: false,
          grid: {
            color: 'rgba(255, 255, 255, 0.1)'
          },
          ticks: {
            color: 'rgba(255, 255, 255, 0.8)',
            font: {
              size: 12,
              family: 'Space Grotesk, sans-serif'
            },
            callback: function(value) {
              return '$' + value + 'M';
            }
          },
          title: {
            display: true,
            text: 'Cost (Millions USD)',
            color: 'rgba(255, 255, 255, 0.9)',
            font: {
              size: 14,
              family: 'Space Grotesk, sans-serif',
              weight: 'bold'
            }
          }
        }
      },
      plugins: {
        title: {
          display: true,
          text: 'Infrastructure Development Scenarios Cost Breakdown',
          font: {
            size: 18,
            family: 'Space Grotesk, sans-serif',
            weight: 'bold'
          },
          color: 'rgba(255, 255, 255, 0.9)',
          padding: 20
        },
        subtitle: {
          display: true,
          text: 'Scenario A: $5.2M-$10.8M | Scenario B: $6.9M-$27.7M',
          font: {
            size: 12,
            family: 'Space Grotesk, sans-serif'
          },
          color: 'rgba(255, 255, 255, 0.7)',
          padding: {
            bottom: 10
          }
        },
        legend: {
          position: 'top',
          labels: {
            color: 'rgba(255, 255, 255, 0.8)',
            font: {
              size: 11,
              family: 'Space Grotesk, sans-serif'
            },
            padding: 12,
            usePointStyle: true
          }
        },
        tooltip: {
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          titleFont: {
            size: 14,
            family: 'Space Grotesk, sans-serif'
          },
          bodyFont: {
            size: 13,
            family: 'Space Grotesk, sans-serif'
          },
          padding: 12,
          callbacks: {
            label: function(context) {
              return context.dataset.label + ': $' + context.parsed.y.toFixed(2) + 'M';
            }
          }
        }
      }
    }
  },

  /**
   * 6. TOTAL INVESTMENT RANGE - DOUGHNUT CHART
   * Shows minimum vs maximum total project investment
   */
  totalInvestmentRange: {
    type: 'doughnut',
    data: {
      labels: ['Minimum Investment', 'Maximum Investment'],
      datasets: [{
        label: 'Total Project Investment Range',
        data: [27.95, 52.65],
        backgroundColor: [
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 99, 132, 0.8)'
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(255, 99, 132, 1)'
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
          text: 'Total Project Investment Range',
          font: {
            size: 18,
            family: 'Space Grotesk, sans-serif',
            weight: 'bold'
          },
          color: 'rgba(255, 255, 255, 0.9)',
          padding: 20
        },
        subtitle: {
          display: true,
          text: 'Base Case Estimate: $35.0M',
          font: {
            size: 14,
            family: 'Space Grotesk, sans-serif'
          },
          color: 'rgba(100, 255, 180, 0.9)',
          padding: {
            bottom: 10
          }
        },
        legend: {
          position: 'bottom',
          labels: {
            color: 'rgba(255, 255, 255, 0.8)',
            font: {
              size: 12,
              family: 'Space Grotesk, sans-serif'
            },
            padding: 15,
            usePointStyle: true
          }
        },
        tooltip: {
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          titleFont: {
            size: 14,
            family: 'Space Grotesk, sans-serif'
          },
          bodyFont: {
            size: 13,
            family: 'Space Grotesk, sans-serif'
          },
          padding: 12,
          callbacks: {
            label: function(context) {
              return context.label + ': $' + context.parsed.toFixed(2) + 'M';
            }
          }
        }
      }
    }
  },

  /**
   * 7. ENVIRONMENTAL REMEDIATION BREAKDOWN - HORIZONTAL BAR CHART
   * Shows cost range for environmental assessments and remediation
   */
  environmentalCosts: {
    type: 'bar',
    data: {
      labels: [
        'Phase I ESA',
        'Phase II ESA',
        'Comprehensive\nPhase II',
        'Total Remediation\n(Soil/Water/Sediment)',
        'Ongoing Monitoring\n(Annual)'
      ],
      datasets: [
        {
          label: 'Low Estimate',
          data: [0.0035, 0.015, 0.15, 8.0, 0],
          backgroundColor: 'rgba(100, 255, 180, 0.6)',
          borderColor: 'rgba(100, 255, 180, 1)',
          borderWidth: 1
        },
        {
          label: 'High Estimate',
          data: [0.006, 0.05, 0.30, 25.0, 0],
          backgroundColor: 'rgba(255, 99, 132, 0.6)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1
        }
      ]
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          type: 'logarithmic',
          grid: {
            color: 'rgba(255, 255, 255, 0.1)'
          },
          ticks: {
            color: 'rgba(255, 255, 255, 0.8)',
            font: {
              size: 11,
              family: 'Space Grotesk, sans-serif'
            },
            callback: function(value) {
              if (value < 0.01) return '$' + (value * 1000).toFixed(0) + 'K';
              return '$' + value.toFixed(2) + 'M';
            }
          },
          title: {
            display: true,
            text: 'Cost (Logarithmic Scale)',
            color: 'rgba(255, 255, 255, 0.9)',
            font: {
              size: 14,
              family: 'Space Grotesk, sans-serif',
              weight: 'bold'
            }
          }
        },
        y: {
          grid: {
            color: 'rgba(255, 255, 255, 0.1)'
          },
          ticks: {
            color: 'rgba(255, 255, 255, 0.8)',
            font: {
              size: 10,
              family: 'Space Grotesk, sans-serif'
            }
          }
        }
      },
      plugins: {
        title: {
          display: true,
          text: 'Environmental Assessment & Remediation Cost Range',
          font: {
            size: 18,
            family: 'Space Grotesk, sans-serif',
            weight: 'bold'
          },
          color: 'rgba(255, 255, 255, 0.9)',
          padding: 20
        },
        subtitle: {
          display: true,
          text: 'Legacy sulfur processing contamination (1933-2005)',
          font: {
            size: 12,
            family: 'Space Grotesk, sans-serif'
          },
          color: 'rgba(255, 255, 255, 0.7)',
          padding: {
            bottom: 10
          }
        },
        legend: {
          position: 'top',
          labels: {
            color: 'rgba(255, 255, 255, 0.8)',
            font: {
              size: 12,
              family: 'Space Grotesk, sans-serif'
            },
            padding: 15,
            usePointStyle: true
          }
        },
        tooltip: {
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          titleFont: {
            size: 14,
            family: 'Space Grotesk, sans-serif'
          },
          bodyFont: {
            size: 13,
            family: 'Space Grotesk, sans-serif'
          },
          padding: 12,
          callbacks: {
            label: function(context) {
              const value = context.parsed.x;
              if (value < 0.01) {
                return context.dataset.label + ': $' + (value * 1000).toFixed(0) + 'K';
              }
              return context.dataset.label + ': $' + value.toFixed(2) + 'M';
            }
          }
        }
      }
    }
  },

  /**
   * 8. CUMULATIVE TIMELINE CHART - LINE CHART
   * Shows cumulative investment over project timeline
   */
  cumulativeInvestment: {
    type: 'line',
    data: {
      labels: ['Month 0', 'Month 6', 'Month 12', 'Month 30', 'Month 48', 'Month 60'],
      datasets: [
        {
          label: 'Base Case Investment',
          data: [
            14.7,   // Acquisition at start
            14.8,   // + Due diligence (6 months)
            17.3,   // + Partial remediation (12 months)
            29.8,   // + Full remediation (30 months)
            33.0,   // + Partial construction (48 months)
            35.0    // + Project complete (60 months)
          ],
          borderColor: 'rgba(100, 255, 180, 1)',
          backgroundColor: 'rgba(100, 255, 180, 0.2)',
          borderWidth: 3,
          fill: true,
          tension: 0.4,
          pointRadius: 5,
          pointHoverRadius: 7,
          pointBackgroundColor: 'rgba(100, 255, 180, 1)',
          pointBorderColor: 'rgba(255, 255, 255, 1)',
          pointBorderWidth: 2
        },
        {
          label: 'Maximum Investment',
          data: [
            14.7,   // Acquisition at start
            14.85,  // + Due diligence (6 months)
            20.0,   // + Partial remediation (12 months)
            39.85,  // + Full remediation (30 months)
            47.0,   // + Partial construction (48 months)
            52.65   // + Project complete (60 months max estimate)
          ],
          borderColor: 'rgba(255, 99, 132, 1)',
          backgroundColor: 'rgba(255, 99, 132, 0.1)',
          borderWidth: 2,
          borderDash: [5, 5],
          fill: false,
          tension: 0.4,
          pointRadius: 4,
          pointHoverRadius: 6,
          pointBackgroundColor: 'rgba(255, 99, 132, 1)',
          pointBorderColor: 'rgba(255, 255, 255, 1)',
          pointBorderWidth: 2
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
      scales: {
        x: {
          grid: {
            color: 'rgba(255, 255, 255, 0.1)'
          },
          ticks: {
            color: 'rgba(255, 255, 255, 0.8)',
            font: {
              size: 12,
              family: 'Space Grotesk, sans-serif'
            }
          },
          title: {
            display: true,
            text: 'Project Timeline (Months)',
            color: 'rgba(255, 255, 255, 0.9)',
            font: {
              size: 14,
              family: 'Space Grotesk, sans-serif',
              weight: 'bold'
            }
          }
        },
        y: {
          beginAtZero: true,
          grid: {
            color: 'rgba(255, 255, 255, 0.1)'
          },
          ticks: {
            color: 'rgba(255, 255, 255, 0.8)',
            font: {
              size: 12,
              family: 'Space Grotesk, sans-serif'
            },
            callback: function(value) {
              return '$' + value + 'M';
            }
          },
          title: {
            display: true,
            text: 'Cumulative Investment (Millions USD)',
            color: 'rgba(255, 255, 255, 0.9)',
            font: {
              size: 14,
              family: 'Space Grotesk, sans-serif',
              weight: 'bold'
            }
          }
        }
      },
      plugins: {
        title: {
          display: true,
          text: 'Cumulative Investment Over Project Timeline',
          font: {
            size: 18,
            family: 'Space Grotesk, sans-serif',
            weight: 'bold'
          },
          color: 'rgba(255, 255, 255, 0.9)',
          padding: 20
        },
        subtitle: {
          display: true,
          text: 'Investment progression from acquisition through construction completion',
          font: {
            size: 12,
            family: 'Space Grotesk, sans-serif'
          },
          color: 'rgba(255, 255, 255, 0.7)',
          padding: {
            bottom: 10
          }
        },
        legend: {
          position: 'top',
          labels: {
            color: 'rgba(255, 255, 255, 0.8)',
            font: {
              size: 12,
              family: 'Space Grotesk, sans-serif'
            },
            padding: 15,
            usePointStyle: true
          }
        },
        tooltip: {
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          titleFont: {
            size: 14,
            family: 'Space Grotesk, sans-serif'
          },
          bodyFont: {
            size: 13,
            family: 'Space Grotesk, sans-serif'
          },
          padding: 12,
          callbacks: {
            label: function(context) {
              return context.dataset.label + ': $' + context.parsed.y.toFixed(2) + 'M';
            }
          }
        }
      }
    }
  }
};

/**
 * UTILITY FUNCTIONS
 */

// Function to initialize all charts at once
function initializeAllCharts(containerIds) {
  const charts = {};

  if (containerIds.investmentBreakdown) {
    charts.investmentBreakdown = new Chart(
      document.getElementById(containerIds.investmentBreakdown),
      CAPEX_CHARTS.investmentBreakdown
    );
  }

  if (containerIds.costCategoriesComparison) {
    charts.costCategoriesComparison = new Chart(
      document.getElementById(containerIds.costCategoriesComparison),
      CAPEX_CHARTS.costCategoriesComparison
    );
  }

  if (containerIds.projectTimeline) {
    charts.projectTimeline = new Chart(
      document.getElementById(containerIds.projectTimeline),
      CAPEX_CHARTS.projectTimeline
    );
  }

  if (containerIds.revenueScenarios) {
    charts.revenueScenarios = new Chart(
      document.getElementById(containerIds.revenueScenarios),
      CAPEX_CHARTS.revenueScenarios
    );
  }

  if (containerIds.infrastructureScenarios) {
    charts.infrastructureScenarios = new Chart(
      document.getElementById(containerIds.infrastructureScenarios),
      CAPEX_CHARTS.infrastructureScenarios
    );
  }

  if (containerIds.totalInvestmentRange) {
    charts.totalInvestmentRange = new Chart(
      document.getElementById(containerIds.totalInvestmentRange),
      CAPEX_CHARTS.totalInvestmentRange
    );
  }

  if (containerIds.environmentalCosts) {
    charts.environmentalCosts = new Chart(
      document.getElementById(containerIds.environmentalCosts),
      CAPEX_CHARTS.environmentalCosts
    );
  }

  if (containerIds.cumulativeInvestment) {
    charts.cumulativeInvestment = new Chart(
      document.getElementById(containerIds.cumulativeInvestment),
      CAPEX_CHARTS.cumulativeInvestment
    );
  }

  return charts;
}

// Export for use in modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { CAPEX_CHARTS, initializeAllCharts };
}
