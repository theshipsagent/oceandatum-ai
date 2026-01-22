/**
 * Due Diligence Charts - Chart.js Visualization Configurations
 * Port Sulphur Terminal Analysis
 * Generated: 2026-01-22
 *
 * Dependencies: Chart.js v4.x
 * Data Source: due_diligence_data.json
 */

const DueDiligenceCharts = {
  /**
   * Risk Assessment Matrix
   * Visualizes environmental risks by severity and category
   */
  riskAssessmentMatrix: {
    type: 'scatter',
    data: {
      datasets: [
        {
          label: 'Waterfront Contamination',
          data: [{
            x: 1, // Environmental category
            y: 3, // HIGH severity
            r: 20 // Bubble size
          }],
          backgroundColor: 'rgba(220, 53, 69, 0.7)',
          borderColor: 'rgba(220, 53, 69, 1)',
          borderWidth: 2
        },
        {
          label: 'Front Parcel Barge Slip',
          data: [{
            x: 1, // Environmental category
            y: 3, // HIGH severity
            r: 20
          }],
          backgroundColor: 'rgba(220, 53, 69, 0.7)',
          borderColor: 'rgba(220, 53, 69, 1)',
          borderWidth: 2
        },
        {
          label: 'Groundwater Contamination',
          data: [{
            x: 1, // Environmental category
            y: 2, // MEDIUM severity
            r: 15
          }],
          backgroundColor: 'rgba(255, 193, 7, 0.7)',
          borderColor: 'rgba(255, 193, 7, 1)',
          borderWidth: 2
        },
        {
          label: 'Location Risk (Below Sea Level)',
          data: [{
            x: 2, // Flood category
            y: 4, // CRITICAL severity
            r: 25
          }],
          backgroundColor: 'rgba(139, 0, 0, 0.8)',
          borderColor: 'rgba(139, 0, 0, 1)',
          borderWidth: 2
        },
        {
          label: 'Hurricane Impact (22ft flooding)',
          data: [{
            x: 2, // Flood category
            y: 4, // CRITICAL severity
            r: 25
          }],
          backgroundColor: 'rgba(139, 0, 0, 0.8)',
          borderColor: 'rgba(139, 0, 0, 1)',
          borderWidth: 2
        },
        {
          label: 'Sea Level Rise',
          data: [{
            x: 2, // Flood category
            y: 4, // CRITICAL severity
            r: 25
          }],
          backgroundColor: 'rgba(139, 0, 0, 0.8)',
          borderColor: 'rgba(139, 0, 0, 1)',
          borderWidth: 2
        },
        {
          label: 'Back Levee Overflow',
          data: [{
            x: 2, // Flood category
            y: 3, // HIGH severity
            r: 20
          }],
          backgroundColor: 'rgba(220, 53, 69, 0.7)',
          borderColor: 'rgba(220, 53, 69, 1)',
          borderWidth: 2
        },
        {
          label: 'Filled Sulfur Canal (Infrastructure)',
          data: [{
            x: 3, // Infrastructure category
            y: 2, // MEDIUM severity
            r: 15
          }],
          backgroundColor: 'rgba(255, 193, 7, 0.7)',
          borderColor: 'rgba(255, 193, 7, 1)',
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
          text: 'Risk Assessment Matrix: Severity vs. Category',
          font: {
            size: 18,
            weight: 'bold',
            family: 'Space Grotesk, sans-serif'
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
              size: 11
            },
            padding: 10,
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
          displayColors: true,
          callbacks: {
            label: function(context) {
              const severityLabels = ['', 'LOW', 'MEDIUM', 'HIGH', 'CRITICAL'];
              return context.dataset.label + ': ' + severityLabels[context.parsed.y] + ' severity';
            }
          }
        }
      },
      scales: {
        x: {
          type: 'linear',
          position: 'bottom',
          title: {
            display: true,
            text: 'Risk Category',
            color: '#ffffff',
            font: {
              size: 14,
              weight: 'bold',
              family: 'Space Grotesk, sans-serif'
            }
          },
          ticks: {
            stepSize: 1,
            color: '#ffffff',
            callback: function(value) {
              const categories = ['', 'Environmental', 'Flood', 'Infrastructure'];
              return categories[value] || '';
            }
          },
          grid: {
            color: 'rgba(255, 255, 255, 0.1)'
          },
          min: 0,
          max: 4
        },
        y: {
          type: 'linear',
          title: {
            display: true,
            text: 'Risk Severity',
            color: '#ffffff',
            font: {
              size: 14,
              weight: 'bold',
              family: 'Space Grotesk, sans-serif'
            }
          },
          ticks: {
            stepSize: 1,
            color: '#ffffff',
            callback: function(value) {
              const severityLabels = ['', 'LOW', 'MEDIUM', 'HIGH', 'CRITICAL'];
              return severityLabels[value] || '';
            }
          },
          grid: {
            color: 'rgba(255, 255, 255, 0.1)'
          },
          min: 0,
          max: 5
        }
      }
    }
  },

  /**
   * Required Assessments Cost Breakdown
   * Horizontal bar chart showing cost ranges for each assessment type
   */
  assessmentsCostBreakdown: {
    type: 'bar',
    data: {
      labels: [
        'Phase I ESA',
        'Phase II ESA',
        'Geotechnical Investigation',
        'Bulkhead/Wharf Assessment',
        'Sediment Testing'
      ],
      datasets: [
        {
          label: 'Minimum Cost',
          data: [3500, 15000, 20000, 15000, 10000],
          backgroundColor: 'rgba(100, 255, 180, 0.6)',
          borderColor: 'rgba(100, 255, 180, 1)',
          borderWidth: 2
        },
        {
          label: 'Maximum Cost',
          data: [6000, 50000, 75000, 40000, 30000],
          backgroundColor: 'rgba(255, 193, 7, 0.6)',
          borderColor: 'rgba(255, 193, 7, 1)',
          borderWidth: 2
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
          text: 'Required Assessments Cost Breakdown',
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
          text: 'Total Budget Range: $50,000 - $150,000+',
          font: {
            size: 14,
            family: 'Space Grotesk, sans-serif'
          },
          color: '#64ffb4',
          padding: 10
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
              return context.dataset.label + ': $' + context.parsed.x.toLocaleString();
            }
          }
        }
      },
      scales: {
        x: {
          title: {
            display: true,
            text: 'Cost (USD)',
            color: '#ffffff',
            font: {
              size: 14,
              weight: 'bold',
              family: 'Space Grotesk, sans-serif'
            }
          },
          ticks: {
            color: '#ffffff',
            callback: function(value) {
              return '$' + (value / 1000) + 'K';
            }
          },
          grid: {
            color: 'rgba(255, 255, 255, 0.1)'
          }
        },
        y: {
          ticks: {
            color: '#ffffff',
            font: {
              family: 'Space Grotesk, sans-serif',
              size: 12
            }
          },
          grid: {
            display: false
          }
        }
      }
    }
  },

  /**
   * Assessment Timeline
   * Gantt-style chart showing duration and priority of each assessment
   */
  assessmentTimeline: {
    type: 'bar',
    data: {
      labels: [
        'Phase I ESA\n(IMMEDIATE)',
        'Phase II ESA\n(HIGH)',
        'Geotechnical\n(HIGH)',
        'Bulkhead/Wharf\n(MEDIUM)',
        'Sediment Testing\n(MEDIUM)'
      ],
      datasets: [
        {
          label: 'Minimum Weeks',
          data: [3, 4, 4, 3, 2],
          backgroundColor: [
            'rgba(220, 53, 69, 0.7)',  // IMMEDIATE - red
            'rgba(255, 193, 7, 0.7)',  // HIGH - amber
            'rgba(255, 193, 7, 0.7)',  // HIGH - amber
            'rgba(100, 255, 180, 0.7)', // MEDIUM - green
            'rgba(100, 255, 180, 0.7)'  // MEDIUM - green
          ],
          borderColor: [
            'rgba(220, 53, 69, 1)',
            'rgba(255, 193, 7, 1)',
            'rgba(255, 193, 7, 1)',
            'rgba(100, 255, 180, 1)',
            'rgba(100, 255, 180, 1)'
          ],
          borderWidth: 2
        },
        {
          label: 'Maximum Weeks',
          data: [4, 8, 6, 4, 3],
          backgroundColor: [
            'rgba(139, 0, 0, 0.7)',    // IMMEDIATE - dark red
            'rgba(255, 152, 0, 0.7)',  // HIGH - orange
            'rgba(255, 152, 0, 0.7)',  // HIGH - orange
            'rgba(76, 175, 80, 0.7)',  // MEDIUM - medium green
            'rgba(76, 175, 80, 0.7)'   // MEDIUM - medium green
          ],
          borderColor: [
            'rgba(139, 0, 0, 1)',
            'rgba(255, 152, 0, 1)',
            'rgba(255, 152, 0, 1)',
            'rgba(76, 175, 80, 1)',
            'rgba(76, 175, 80, 1)'
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
          text: 'Assessment Timeline by Priority',
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
          text: 'Duration ranges for required assessments',
          font: {
            size: 13,
            family: 'Space Grotesk, sans-serif'
          },
          color: 'rgba(255, 255, 255, 0.7)',
          padding: 10
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
              return context.dataset.label + ': ' + context.parsed.y + ' weeks';
            }
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: '#ffffff',
            font: {
              family: 'Space Grotesk, sans-serif',
              size: 11
            }
          },
          grid: {
            display: false
          }
        },
        y: {
          title: {
            display: true,
            text: 'Duration (Weeks)',
            color: '#ffffff',
            font: {
              size: 14,
              weight: 'bold',
              family: 'Space Grotesk, sans-serif'
            }
          },
          ticks: {
            color: '#ffffff',
            stepSize: 1
          },
          grid: {
            color: 'rgba(255, 255, 255, 0.1)'
          },
          beginAtZero: true
        }
      }
    }
  },

  /**
   * Financial Implications Waterfall Chart
   * Shows cumulative financial impact from due diligence through remediation
   */
  financialWaterfall: {
    type: 'bar',
    data: {
      labels: [
        'Due Diligence\n(Min)',
        'Due Diligence\n(Max)',
        'Remediation\n(Min)',
        'Remediation\n(Max)',
        'Total Minimum\nExposure',
        'Total Maximum\nExposure'
      ],
      datasets: [
        {
          label: 'Financial Impact',
          data: [
            50000,      // Due diligence min
            150000,     // Due diligence max
            10000000,   // Remediation min
            30000000,   // Remediation max
            10050000,   // Total min (50K + 10M)
            30150000    // Total max (150K + 30M)
          ],
          backgroundColor: [
            'rgba(100, 255, 180, 0.6)',  // DD min - green
            'rgba(255, 193, 7, 0.6)',    // DD max - amber
            'rgba(255, 152, 0, 0.6)',    // Rem min - orange
            'rgba(220, 53, 69, 0.6)',    // Rem max - red
            'rgba(100, 255, 180, 0.8)',  // Total min - green
            'rgba(220, 53, 69, 0.8)'     // Total max - red
          ],
          borderColor: [
            'rgba(100, 255, 180, 1)',
            'rgba(255, 193, 7, 1)',
            'rgba(255, 152, 0, 1)',
            'rgba(220, 53, 69, 1)',
            'rgba(100, 255, 180, 1)',
            'rgba(220, 53, 69, 1)'
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
          text: 'Financial Implications Waterfall',
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
          text: 'Total financial exposure: $10M - $30M+ (plus ongoing obligations)',
          font: {
            size: 14,
            family: 'Space Grotesk, sans-serif'
          },
          color: '#64ffb4',
          padding: 10
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
          callbacks: {
            label: function(context) {
              const value = context.parsed.y;
              if (value >= 1000000) {
                return '$' + (value / 1000000).toFixed(2) + 'M';
              } else if (value >= 1000) {
                return '$' + (value / 1000).toFixed(0) + 'K';
              }
              return '$' + value.toLocaleString();
            }
          }
        },
        annotation: {
          annotations: {
            line1: {
              type: 'line',
              yMin: 10050000,
              yMax: 10050000,
              borderColor: 'rgba(100, 255, 180, 0.5)',
              borderWidth: 2,
              borderDash: [5, 5],
              label: {
                display: true,
                content: 'Minimum Total: $10.05M',
                position: 'start',
                backgroundColor: 'rgba(100, 255, 180, 0.8)',
                color: '#000000'
              }
            },
            line2: {
              type: 'line',
              yMin: 30150000,
              yMax: 30150000,
              borderColor: 'rgba(220, 53, 69, 0.5)',
              borderWidth: 2,
              borderDash: [5, 5],
              label: {
                display: true,
                content: 'Maximum Total: $30.15M',
                position: 'start',
                backgroundColor: 'rgba(220, 53, 69, 0.8)',
                color: '#ffffff'
              }
            }
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: '#ffffff',
            font: {
              family: 'Space Grotesk, sans-serif',
              size: 11
            }
          },
          grid: {
            display: false
          }
        },
        y: {
          type: 'logarithmic',
          title: {
            display: true,
            text: 'Cost (USD, log scale)',
            color: '#ffffff',
            font: {
              size: 14,
              weight: 'bold',
              family: 'Space Grotesk, sans-serif'
            }
          },
          ticks: {
            color: '#ffffff',
            callback: function(value) {
              if (value >= 1000000) {
                return '$' + (value / 1000000) + 'M';
              } else if (value >= 1000) {
                return '$' + (value / 1000) + 'K';
              }
              return '$' + value;
            }
          },
          grid: {
            color: 'rgba(255, 255, 255, 0.1)'
          }
        }
      }
    }
  },

  /**
   * Priority Actions Breakdown
   * Doughnut chart showing distribution of priority levels
   */
  priorityActionsBreakdown: {
    type: 'doughnut',
    data: {
      labels: ['IMMEDIATE', 'PRIORITY', 'ESSENTIAL', 'CRITICAL', 'REQUIRED'],
      datasets: [{
        label: 'Priority Actions',
        data: [1, 1, 1, 1, 1], // One action per priority level
        backgroundColor: [
          'rgba(220, 53, 69, 0.8)',   // IMMEDIATE - red
          'rgba(255, 152, 0, 0.8)',   // PRIORITY - orange
          'rgba(255, 193, 7, 0.8)',   // ESSENTIAL - amber
          'rgba(139, 0, 0, 0.8)',     // CRITICAL - dark red
          'rgba(100, 255, 180, 0.8)'  // REQUIRED - green
        ],
        borderColor: [
          'rgba(220, 53, 69, 1)',
          'rgba(255, 152, 0, 1)',
          'rgba(255, 193, 7, 1)',
          'rgba(139, 0, 0, 1)',
          'rgba(100, 255, 180, 1)'
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
          text: 'Priority Actions Distribution',
          font: {
            size: 18,
            weight: 'bold',
            family: 'Space Grotesk, sans-serif'
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
              const actions = [
                'Engage environmental consultant for Phase I ESA',
                'Verify RCRA generator status',
                'Comprehensive flood risk analysis',
                'Budget $10-30M for remediation',
                'Specialized environmental legal counsel'
              ];
              return context.label + ': ' + actions[context.dataIndex];
            }
          }
        }
      }
    }
  },

  /**
   * Ongoing Obligations Impact
   * Radar chart showing relative impact of ongoing maintenance obligations
   */
  ongoingObligations: {
    type: 'radar',
    data: {
      labels: [
        'EPA Oversight\n& Coordination',
        'Remedial Systems\nMaintenance',
        'Contamination Cap\nMaintenance',
        'Institutional\nControls',
        'Groundwater\nMonitoring',
        'Regulatory\nReporting'
      ],
      datasets: [{
        label: 'Ongoing Cost Impact',
        data: [4, 4, 3, 3, 4, 3], // Impact scores (1-5 scale)
        backgroundColor: 'rgba(220, 53, 69, 0.3)',
        borderColor: 'rgba(220, 53, 69, 1)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(220, 53, 69, 1)',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
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
          text: 'Ongoing Obligations Impact Assessment',
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
          text: 'Relative impact scores (1=Low, 5=Critical)',
          font: {
            size: 13,
            family: 'Space Grotesk, sans-serif'
          },
          color: 'rgba(255, 255, 255, 0.7)',
          padding: 10
        },
        legend: {
          display: true,
          labels: {
            color: '#ffffff',
            font: {
              family: 'Space Grotesk, sans-serif',
              size: 12
            },
            padding: 15
          }
        },
        tooltip: {
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          titleColor: '#64ffb4',
          bodyColor: '#ffffff',
          borderColor: '#64ffb4',
          borderWidth: 1,
          padding: 12
        }
      },
      scales: {
        r: {
          angleLines: {
            color: 'rgba(255, 255, 255, 0.2)'
          },
          grid: {
            color: 'rgba(255, 255, 255, 0.2)'
          },
          pointLabels: {
            color: '#ffffff',
            font: {
              family: 'Space Grotesk, sans-serif',
              size: 11
            }
          },
          ticks: {
            color: '#ffffff',
            backdropColor: 'transparent',
            stepSize: 1,
            min: 0,
            max: 5
          }
        }
      }
    }
  }
};

/**
 * Helper function to initialize all charts
 * @param {Object} canvasIds - Object mapping chart names to canvas element IDs
 * @returns {Object} - Object containing all Chart.js instances
 */
function initializeDueDiligenceCharts(canvasIds) {
  const charts = {};

  if (canvasIds.riskMatrix) {
    charts.riskMatrix = new Chart(
      document.getElementById(canvasIds.riskMatrix),
      DueDiligenceCharts.riskAssessmentMatrix
    );
  }

  if (canvasIds.costBreakdown) {
    charts.costBreakdown = new Chart(
      document.getElementById(canvasIds.costBreakdown),
      DueDiligenceCharts.assessmentsCostBreakdown
    );
  }

  if (canvasIds.timeline) {
    charts.timeline = new Chart(
      document.getElementById(canvasIds.timeline),
      DueDiligenceCharts.assessmentTimeline
    );
  }

  if (canvasIds.waterfall) {
    charts.waterfall = new Chart(
      document.getElementById(canvasIds.waterfall),
      DueDiligenceCharts.financialWaterfall
    );
  }

  if (canvasIds.priorities) {
    charts.priorities = new Chart(
      document.getElementById(canvasIds.priorities),
      DueDiligenceCharts.priorityActionsBreakdown
    );
  }

  if (canvasIds.obligations) {
    charts.obligations = new Chart(
      document.getElementById(canvasIds.obligations),
      DueDiligenceCharts.ongoingObligations
    );
  }

  return charts;
}

/**
 * Example usage:
 *
 * const charts = initializeDueDiligenceCharts({
 *   riskMatrix: 'risk-matrix-canvas',
 *   costBreakdown: 'cost-breakdown-canvas',
 *   timeline: 'timeline-canvas',
 *   waterfall: 'waterfall-canvas',
 *   priorities: 'priorities-canvas',
 *   obligations: 'obligations-canvas'
 * });
 */

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { DueDiligenceCharts, initializeDueDiligenceCharts };
}
