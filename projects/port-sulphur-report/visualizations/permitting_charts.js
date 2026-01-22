/**
 * Port Sulphur Terminal - Permitting & Regulatory Timeline Visualizations
 *
 * Chart.js configurations for regulatory permitting data
 * Generated: 2026-01-22
 * Source: permitting_data.json
 */

// ============================================================================
// CHART 1: Regulatory Timeline Gantt Chart (18-36 months estimated)
// ============================================================================

const regulatoryTimelineConfig = {
  type: 'bar',
  data: {
    labels: [
      'Pre-Application Consultation',
      'Environmental Assessment Phase',
      'Integrated Permit Application',
      'Regulatory Review',
      'Permit Issuance',
      'State & Local Permits'
    ],
    datasets: [{
      label: 'Minimum Timeline (months)',
      data: [2, 6, 3, 4, 1, 3], // Estimated minimum durations
      backgroundColor: 'rgba(54, 162, 235, 0.8)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 1
    }, {
      label: 'Maximum Timeline (months)',
      data: [3, 12, 5, 8, 2, 4], // Estimated maximum durations
      backgroundColor: 'rgba(255, 159, 64, 0.8)',
      borderColor: 'rgba(255, 159, 64, 1)',
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
        text: 'Regulatory Timeline: Phase Duration Estimates (18-36 months total)',
        font: {
          size: 16,
          weight: 'bold'
        },
        padding: 20
      },
      legend: {
        display: true,
        position: 'top'
      },
      tooltip: {
        callbacks: {
          afterLabel: function(context) {
            const phaseDescriptions = [
              'Initial USACE coordination, scope review, constraint identification',
              'Phase I/II ESA, risk assessment, species consultation, wetlands delineation',
              'Section 408, Section 10, Section 404 applications with technical documentation',
              'USACE review, public notice, agency coordination, regulatory questions',
              'Final permit conditions, documentation issuance, compliance requirements',
              'LDEQ environmental permits, parish building permits, zoning approvals'
            ];
            return phaseDescriptions[context.dataIndex];
          }
        }
      }
    },
    scales: {
      x: {
        stacked: false,
        title: {
          display: true,
          text: 'Duration (months)'
        },
        ticks: {
          stepSize: 2
        }
      },
      y: {
        stacked: false
      }
    }
  }
};

// ============================================================================
// CHART 2: Required Studies Timeline (Sequential Phases)
// ============================================================================

const studiesTimelineConfig = {
  type: 'line',
  data: {
    labels: [
      'Phase I ESA',
      'Phase II ESA',
      'Risk Assessment',
      'Remedial Investigation',
      'Feasibility Study',
      'Remedial Design'
    ],
    datasets: [{
      label: 'Study Sequence',
      data: [1, 2, 3, 4, 5, 6],
      fill: false,
      borderColor: 'rgba(75, 192, 192, 1)',
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      tension: 0.1,
      pointRadius: 8,
      pointHoverRadius: 10,
      pointBackgroundColor: 'rgba(75, 192, 192, 1)',
      pointBorderColor: '#fff',
      pointBorderWidth: 2
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: 'Required Environmental Studies - Sequential Progression',
        font: {
          size: 16,
          weight: 'bold'
        },
        padding: 20
      },
      legend: {
        display: false
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const studyDetails = [
              'Phase I ESA: Historical review, visual assessment, regulatory database search',
              'Phase II ESA: Soil/groundwater sampling, chemical analysis, contamination delineation',
              'Risk Assessment: Exposure pathway analysis, toxicity evaluation, risk characterization',
              'Remedial Investigation: Detailed contamination extent, media affected, migration pathways',
              'Feasibility Study: Technology evaluation, cost-benefit analysis, remedy selection',
              'Remedial Design: Final engineering plans, specifications, implementation schedule'
            ];
            return studyDetails[context.dataIndex];
          },
          afterLabel: function(context) {
            const triggers = [
              'Required - Not yet initiated',
              'Triggered if Phase I identifies contamination',
              'Required if contamination identified',
              'Required if remediation necessary',
              'Required if remediation necessary',
              'Required if remediation necessary'
            ];
            return 'Status: ' + triggers[context.dataIndex];
          }
        }
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Study Phase'
        },
        ticks: {
          autoSkip: false,
          maxRotation: 45,
          minRotation: 45
        }
      },
      y: {
        title: {
          display: true,
          text: 'Sequence Order'
        },
        min: 0,
        max: 7,
        ticks: {
          stepSize: 1,
          callback: function(value) {
            const labels = ['', 'Start', '', '', '', '', 'Complete'];
            return labels[value] || '';
          }
        }
      }
    }
  }
};

// ============================================================================
// CHART 3: Permit Types Breakdown (Federal, State, Local)
// ============================================================================

const permitTypesConfig = {
  type: 'doughnut',
  data: {
    labels: [
      'Federal Permits (4)',
      'State Permits (1)',
      'Local Permits (3)'
    ],
    datasets: [{
      label: 'Number of Permits',
      data: [4, 1, 3],
      backgroundColor: [
        'rgba(54, 162, 235, 0.8)',   // Federal - Blue
        'rgba(255, 206, 86, 0.8)',   // State - Yellow
        'rgba(75, 192, 192, 0.8)'    // Local - Teal
      ],
      borderColor: [
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)'
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
        text: 'Permit Types by Regulatory Level',
        font: {
          size: 16,
          weight: 'bold'
        },
        padding: 20
      },
      legend: {
        display: true,
        position: 'right'
      },
      tooltip: {
        callbacks: {
          afterLabel: function(context) {
            const permitDetails = [
              [
                'Section 408 Permission (USACE)',
                'Section 10 Permit (USACE)',
                'Section 404 Permit (USACE)',
                'Surface Water Discharge (USACE)'
              ],
              [
                'Environmental Compliance (LDEQ)'
              ],
              [
                'Building Permits (Plaquemines Parish)',
                'Development Permits (Plaquemines Parish)',
                'Zoning Approvals (Plaquemines Parish)'
              ]
            ];
            return permitDetails[context.dataIndex];
          }
        }
      }
    }
  }
};

// ============================================================================
// CHART 4: Regulatory Agencies Involvement (Jurisdiction Analysis)
// ============================================================================

const agenciesInvolvementConfig = {
  type: 'radar',
  data: {
    labels: [
      'Navigation',
      'Wetlands',
      'Environmental',
      'Building/Zoning',
      'Security',
      'Federal Project Mods'
    ],
    datasets: [{
      label: 'USACE New Orleans District',
      data: [5, 5, 3, 0, 1, 5],
      fill: true,
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      borderColor: 'rgba(54, 162, 235, 1)',
      pointBackgroundColor: 'rgba(54, 162, 235, 1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(54, 162, 235, 1)'
    }, {
      label: 'EPA Region 6',
      data: [0, 0, 5, 0, 0, 0],
      fill: true,
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: 'rgba(255, 99, 132, 1)',
      pointBackgroundColor: 'rgba(255, 99, 132, 1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(255, 99, 132, 1)'
    }, {
      label: 'Louisiana DEQ',
      data: [0, 1, 5, 0, 0, 0],
      fill: true,
      backgroundColor: 'rgba(255, 206, 86, 0.2)',
      borderColor: 'rgba(255, 206, 86, 1)',
      pointBackgroundColor: 'rgba(255, 206, 86, 1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(255, 206, 86, 1)'
    }, {
      label: 'Plaquemines Parish',
      data: [0, 0, 0, 5, 0, 0],
      fill: true,
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      pointBackgroundColor: 'rgba(75, 192, 192, 1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(75, 192, 192, 1)'
    }, {
      label: 'USCG / CBP',
      data: [3, 0, 0, 0, 5, 0],
      fill: true,
      backgroundColor: 'rgba(153, 102, 255, 0.2)',
      borderColor: 'rgba(153, 102, 255, 1)',
      pointBackgroundColor: 'rgba(153, 102, 255, 1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(153, 102, 255, 1)'
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: 'Regulatory Agencies Jurisdiction Matrix',
        font: {
          size: 16,
          weight: 'bold'
        },
        padding: 20
      },
      legend: {
        display: true,
        position: 'bottom'
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const agencyRoles = {
              'USACE New Orleans District': {
                'Navigation': 'Section 10 permits, navigation safety, aids to navigation',
                'Wetlands': 'Section 404 permits, wetlands protection',
                'Environmental': 'Environmental compliance coordination',
                'Building/Zoning': 'Not applicable',
                'Security': 'Coordination with USCG',
                'Federal Project Mods': 'Section 408 permission, revetment approvals'
              },
              'EPA Region 6': {
                'Environmental': 'Superfund oversight, soil contamination standards, compliance'
              },
              'Louisiana DEQ': {
                'Wetlands': 'State wetlands protection coordination',
                'Environmental': 'LAC 33 soil remediation, groundwater protection, RBCA protocols'
              },
              'Plaquemines Parish': {
                'Building/Zoning': 'Building permits, development permits, zoning approvals'
              },
              'USCG / CBP': {
                'Navigation': 'Navigation safety standards, aids to navigation',
                'Security': 'Maritime security, international cargo operations, port security'
              }
            };

            const agency = context.dataset.label;
            const category = context.label;
            const role = agencyRoles[agency]?.[category];

            if (role) {
              return context.dataset.label + ': ' + role;
            }
            return context.dataset.label + ': No jurisdiction';
          }
        }
      }
    },
    scales: {
      r: {
        angleLines: {
          display: true
        },
        suggestedMin: 0,
        suggestedMax: 5,
        ticks: {
          stepSize: 1
        }
      }
    }
  }
};

// ============================================================================
// CHART 5: Critical Path Analysis (Timeline Dependencies)
// ============================================================================

const criticalPathConfig = {
  type: 'bar',
  data: {
    labels: [
      'Month 1-2',
      'Month 3-8',
      'Month 9-12',
      'Month 13-20',
      'Month 21-22',
      'Month 23-26'
    ],
    datasets: [{
      label: 'Critical Path Activities',
      data: [2, 6, 4, 8, 2, 4],
      backgroundColor: [
        'rgba(255, 99, 132, 0.8)',
        'rgba(54, 162, 235, 0.8)',
        'rgba(255, 206, 86, 0.8)',
        'rgba(75, 192, 192, 0.8)',
        'rgba(153, 102, 255, 0.8)',
        'rgba(255, 159, 64, 0.8)'
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
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
        text: 'Critical Path Timeline (26-Month Base Scenario)',
        font: {
          size: 16,
          weight: 'bold'
        },
        padding: 20
      },
      legend: {
        display: false
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const activities = [
              'Pre-Application Consultation: USACE coordination, scope review, Programmatic EA review',
              'Environmental Assessment: Phase I/II ESA, risk assessment, species/wetlands studies',
              'Integrated Application: Section 408/10/404 applications, technical documentation',
              'Regulatory Review: USACE review, public notice, agency coordination, Q&A',
              'Permit Issuance: Final conditions, documentation, compliance requirements',
              'State/Local Permits: LDEQ permits, parish building permits, zoning'
            ];
            return activities[context.dataIndex];
          },
          afterLabel: function(context) {
            return 'Duration: ' + context.parsed.y + ' months';
          }
        }
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Timeline Phase'
        }
      },
      y: {
        title: {
          display: true,
          text: 'Duration (months)'
        },
        beginAtZero: true,
        ticks: {
          stepSize: 2
        }
      }
    }
  }
};

// ============================================================================
// CHART 6: Permit Application Complexity Matrix
// ============================================================================

const complexityMatrixConfig = {
  type: 'bubble',
  data: {
    datasets: [{
      label: 'Section 408 Permission',
      data: [{
        x: 9, // Complexity (1-10)
        y: 8, // Duration (months)
        r: 25 // Importance/Impact
      }],
      backgroundColor: 'rgba(255, 99, 132, 0.6)',
      borderColor: 'rgba(255, 99, 132, 1)',
      borderWidth: 2
    }, {
      label: 'Section 10 Permit',
      data: [{
        x: 7,
        y: 6,
        r: 20
      }],
      backgroundColor: 'rgba(54, 162, 235, 0.6)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 2
    }, {
      label: 'Section 404 Permit',
      data: [{
        x: 8,
        y: 7,
        r: 18
      }],
      backgroundColor: 'rgba(255, 206, 86, 0.6)',
      borderColor: 'rgba(255, 206, 86, 1)',
      borderWidth: 2
    }, {
      label: 'LDEQ Environmental',
      data: [{
        x: 6,
        y: 4,
        r: 15
      }],
      backgroundColor: 'rgba(75, 192, 192, 0.6)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 2
    }, {
      label: 'Parish Building Permits',
      data: [{
        x: 3,
        y: 3,
        r: 10
      }],
      backgroundColor: 'rgba(153, 102, 255, 0.6)',
      borderColor: 'rgba(153, 102, 255, 1)',
      borderWidth: 2
    }, {
      label: 'Surface Water Discharge',
      data: [{
        x: 5,
        y: 4,
        r: 12
      }],
      backgroundColor: 'rgba(255, 159, 64, 0.6)',
      borderColor: 'rgba(255, 159, 64, 1)',
      borderWidth: 2
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: 'Permit Complexity vs. Duration vs. Impact',
        subtitle: {
          display: true,
          text: 'Bubble size = project impact; Position = complexity vs. timeline'
        },
        font: {
          size: 16,
          weight: 'bold'
        },
        padding: 20
      },
      legend: {
        display: true,
        position: 'right'
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const permit = context.dataset.label;
            const complexity = context.parsed.x;
            const duration = context.parsed.y;
            const impact = context.raw.r;
            return [
              permit,
              'Complexity: ' + complexity + '/10',
              'Duration: ' + duration + ' months',
              'Impact: ' + impact + '/25'
            ];
          }
        }
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Application Complexity (1-10)'
        },
        min: 0,
        max: 10,
        ticks: {
          stepSize: 1
        }
      },
      y: {
        title: {
          display: true,
          text: 'Estimated Duration (months)'
        },
        min: 0,
        max: 10,
        ticks: {
          stepSize: 1
        }
      }
    }
  }
};

// ============================================================================
// CHART 7: Optimization Factors Impact
// ============================================================================

const optimizationImpactConfig = {
  type: 'bar',
  data: {
    labels: [
      'Early Pre-App\nConsultation',
      'Comprehensive\nApplication Package',
      'Proper Technical\nDocumentation',
      'Concurrent Permit\nProcessing',
      'Programmatic EA\nStandards',
      'Early Environmental\nAssessment'
    ],
    datasets: [{
      label: 'Timeline Reduction (months)',
      data: [3, 4, 2, 6, 3, 4],
      backgroundColor: 'rgba(75, 192, 192, 0.8)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 2
    }, {
      label: 'Cost Savings Potential (relative)',
      data: [5, 6, 4, 8, 5, 7],
      backgroundColor: 'rgba(153, 102, 255, 0.8)',
      borderColor: 'rgba(153, 102, 255, 1)',
      borderWidth: 2
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: 'Timeline Optimization Factors: Impact Analysis',
        font: {
          size: 16,
          weight: 'bold'
        },
        padding: 20
      },
      legend: {
        display: true,
        position: 'top'
      },
      tooltip: {
        callbacks: {
          afterLabel: function(context) {
            const benefits = [
              'Understand requirements before design commitment; identify issues early',
              'Reduce review cycles; minimize information requests; faster processing',
              'Avoid design revisions; reduce back-and-forth with regulators',
              'Single point coordination; reduced waiting between sequential permits',
              'Use standardized criteria; reduce project-specific studies',
              'Prevent late-stage discoveries; avoid costly remediation delays'
            ];
            return benefits[context.dataIndex];
          }
        }
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Optimization Strategy'
        },
        ticks: {
          autoSkip: false
        }
      },
      y: {
        title: {
          display: true,
          text: 'Impact Level'
        },
        beginAtZero: true
      }
    }
  }
};

// ============================================================================
// EXPORT FOR HTML INTEGRATION
// ============================================================================

// Function to initialize all charts
function initializePermittingCharts() {
  // Chart 1: Regulatory Timeline
  const ctx1 = document.getElementById('regulatoryTimelineChart');
  if (ctx1) {
    new Chart(ctx1, regulatoryTimelineConfig);
  }

  // Chart 2: Studies Timeline
  const ctx2 = document.getElementById('studiesTimelineChart');
  if (ctx2) {
    new Chart(ctx2, studiesTimelineConfig);
  }

  // Chart 3: Permit Types
  const ctx3 = document.getElementById('permitTypesChart');
  if (ctx3) {
    new Chart(ctx3, permitTypesConfig);
  }

  // Chart 4: Agencies Involvement
  const ctx4 = document.getElementById('agenciesInvolvementChart');
  if (ctx4) {
    new Chart(ctx4, agenciesInvolvementConfig);
  }

  // Chart 5: Critical Path
  const ctx5 = document.getElementById('criticalPathChart');
  if (ctx5) {
    new Chart(ctx5, criticalPathConfig);
  }

  // Chart 6: Complexity Matrix
  const ctx6 = document.getElementById('complexityMatrixChart');
  if (ctx6) {
    new Chart(ctx6, complexityMatrixConfig);
  }

  // Chart 7: Optimization Impact
  const ctx7 = document.getElementById('optimizationImpactChart');
  if (ctx7) {
    new Chart(ctx7, optimizationImpactConfig);
  }
}

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializePermittingCharts);
} else {
  initializePermittingCharts();
}

// Export configurations for manual initialization
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    regulatoryTimelineConfig,
    studiesTimelineConfig,
    permitTypesConfig,
    agenciesInvolvementConfig,
    criticalPathConfig,
    complexityMatrixConfig,
    optimizationImpactConfig,
    initializePermittingCharts
  };
}
