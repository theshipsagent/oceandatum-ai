/**
 * Chart.js Visualization Configurations
 * Port Sulphur Terminal Navigation Analysis
 * Generated from navigation_data.json
 *
 * Maritime Color Scheme:
 * - Deep Water: #001f3f (Navy Blue)
 * - Medium Depth: #0074D9 (Ocean Blue)
 * - Shallow Water: #39CCCC (Teal)
 * - Surface: #7FDBFF (Light Blue)
 * - Alerts/Warnings: #FF851B (Orange)
 * - Critical: #FF4136 (Red)
 * - Success/Safe: #2ECC40 (Green)
 */

// Maritime Color Palette
const MARITIME_COLORS = {
  deepWater: '#001f3f',
  deepBlue: '#003f7f',
  oceanBlue: '#0074D9',
  mediumBlue: '#3D9BE9',
  teal: '#39CCCC',
  lightBlue: '#7FDBFF',
  surface: '#B3E5FC',
  spring: '#2ECC40',
  summer: '#FFDC00',
  fall: '#FF851B',
  winter: '#B10DC9',
  warning: '#FF851B',
  critical: '#FF4136',
  safe: '#2ECC40'
};

/**
 * 1. BATHYMETRIC DEPTH PROFILE CHART
 * Visualizes underwater depth zones from shore to deep navigation channel
 */
const bathymetricDepthConfig = {
  type: 'line',
  data: {
    labels: [
      '0 ft (Shore)',
      '50 ft',
      '100 ft',
      '150 ft',
      '200 ft',
      '250 ft',
      '300 ft',
      '350 ft',
      '400 ft',
      '450 ft',
      '500 ft (Channel Center)'
    ],
    datasets: [
      {
        label: 'Depth Profile (feet below NAVD 88)',
        data: [0, -10, -20, -30, -40, -50, -65, -80, -95, -110, -120],
        borderColor: MARITIME_COLORS.oceanBlue,
        backgroundColor: createGradient('depth'),
        fill: true,
        tension: 0.4,
        pointRadius: 5,
        pointHoverRadius: 7,
        pointBackgroundColor: MARITIME_COLORS.deepWater,
        pointBorderColor: '#fff',
        pointBorderWidth: 2
      },
      {
        label: 'Federal Maintenance Depth (-45 ft)',
        data: [-45, -45, -45, -45, -45, -45, -45, -45, -45, -45, -45],
        borderColor: MARITIME_COLORS.critical,
        borderDash: [10, 5],
        borderWidth: 2,
        fill: false,
        pointRadius: 0
      },
      {
        label: 'Existing Dock Operations (-52 ft draft)',
        data: [-52, -52, -52, -52, -52, -52, -52, -52, -52, -52, -52],
        borderColor: MARITIME_COLORS.safe,
        borderDash: [5, 5],
        borderWidth: 2,
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
        text: 'Bathymetric Depth Profile - Port Sulphur Terminal (RM 39.0)',
        font: { size: 18, weight: 'bold', family: 'Space Grotesk' },
        color: '#ffffff',
        padding: 20
      },
      subtitle: {
        display: true,
        text: 'Survey Date: May 18, 2016 | Datum: NAVD 88 | Source: T. Baker Smith Multi-Beam Survey',
        font: { size: 12, family: 'Space Grotesk' },
        color: 'rgba(255, 255, 255, 0.7)',
        padding: { bottom: 20 }
      },
      legend: {
        display: true,
        position: 'top',
        labels: {
          color: '#ffffff',
          font: { size: 12, family: 'Space Grotesk' },
          padding: 15,
          usePointStyle: true
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        borderColor: MARITIME_COLORS.oceanBlue,
        borderWidth: 1,
        padding: 12,
        displayColors: true,
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            const value = Math.abs(context.parsed.y);
            label += value.toFixed(1) + ' feet below datum';
            return label;
          },
          afterLabel: function(context) {
            const depth = Math.abs(context.parsed.y);
            if (depth >= 0 && depth < 20) return 'Zone: Near-Shore Transition';
            if (depth >= 20 && depth < 60) return 'Zone: Primary Docking';
            if (depth >= 60) return 'Zone: Deep Navigation Channel';
            return '';
          }
        }
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Distance from Shore (feet)',
          color: '#ffffff',
          font: { size: 14, weight: 'bold', family: 'Space Grotesk' }
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.8)',
          font: { size: 11, family: 'Space Grotesk' }
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
          drawBorder: false
        }
      },
      y: {
        title: {
          display: true,
          text: 'Depth (feet below NAVD 88)',
          color: '#ffffff',
          font: { size: 14, weight: 'bold', family: 'Space Grotesk' }
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.8)',
          font: { size: 11, family: 'Space Grotesk' },
          callback: function(value) {
            return value + ' ft';
          }
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
          drawBorder: false
        },
        reverse: true
      }
    }
  }
};

/**
 * 2. CURRENT VELOCITY CHART BY SEASON
 * Shows seasonal current velocity patterns and operational implications
 */
const currentVelocityConfig = {
  type: 'bar',
  data: {
    labels: [
      'Spring High Water\n(Mar-Jun)',
      'Summer/Fall Normal\n(Jul-Oct)',
      'Winter Low Water\n(Nov-Feb)'
    ],
    datasets: [
      {
        label: 'Minimum Velocity (fps)',
        data: [2.5, 1.5, 1.0],
        backgroundColor: MARITIME_COLORS.teal,
        borderColor: MARITIME_COLORS.oceanBlue,
        borderWidth: 2
      },
      {
        label: 'Maximum Velocity (fps)',
        data: [4.0, 2.5, 1.5],
        backgroundColor: MARITIME_COLORS.oceanBlue,
        borderColor: MARITIME_COLORS.deepBlue,
        borderWidth: 2
      },
      {
        label: 'Extreme Velocity (fps)',
        data: [5.0, null, null],
        backgroundColor: MARITIME_COLORS.critical,
        borderColor: '#8B0000',
        borderWidth: 2
      },
      {
        label: 'Mooring Design Velocity (4.0 fps)',
        data: [4.0, 4.0, 4.0],
        type: 'line',
        borderColor: MARITIME_COLORS.warning,
        borderDash: [8, 4],
        borderWidth: 3,
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
        text: 'Seasonal Current Velocity Patterns - Mississippi River RM 39.0',
        font: { size: 18, weight: 'bold', family: 'Space Grotesk' },
        color: '#ffffff',
        padding: 20
      },
      subtitle: {
        display: true,
        text: 'Design Criteria: Normal Operations 2.0-2.5 fps | Extreme Events 4.0-5.0 fps',
        font: { size: 12, family: 'Space Grotesk' },
        color: 'rgba(255, 255, 255, 0.7)',
        padding: { bottom: 20 }
      },
      legend: {
        display: true,
        position: 'top',
        labels: {
          color: '#ffffff',
          font: { size: 12, family: 'Space Grotesk' },
          padding: 15,
          usePointStyle: true
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        borderColor: MARITIME_COLORS.oceanBlue,
        borderWidth: 1,
        padding: 12,
        callbacks: {
          afterBody: function(context) {
            const seasonIndex = context[0].dataIndex;
            const notes = [
              'Extreme current forces require enhanced mooring and additional tug assistance',
              'Optimal navigation scenarios - ideal for construction and maintenance',
              'Site depth advantage most valuable during this period'
            ];
            return '\n' + notes[seasonIndex];
          }
        }
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Season (Mississippi River Hydrological Patterns)',
          color: '#ffffff',
          font: { size: 14, weight: 'bold', family: 'Space Grotesk' }
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.8)',
          font: { size: 11, family: 'Space Grotesk' }
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
          drawBorder: false
        }
      },
      y: {
        title: {
          display: true,
          text: 'Current Velocity (feet per second)',
          color: '#ffffff',
          font: { size: 14, weight: 'bold', family: 'Space Grotesk' }
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.8)',
          font: { size: 11, family: 'Space Grotesk' },
          callback: function(value) {
            return value.toFixed(1) + ' fps';
          }
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
          drawBorder: false
        },
        beginAtZero: true,
        max: 6.0
      }
    }
  }
};

/**
 * 3. RIVER DISCHARGE PATTERNS CHART
 * Displays seasonal discharge volumes in cubic feet per second
 */
const riverDischargeConfig = {
  type: 'line',
  data: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Typical Minimum Discharge (cfs)',
        data: [
          175000, 195000, 375000, 400000, 450000, 425000,
          300000, 250000, 240000, 230000, 160000, 140000
        ],
        borderColor: MARITIME_COLORS.teal,
        backgroundColor: 'rgba(57, 204, 204, 0.1)',
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6
      },
      {
        label: 'Typical Maximum Discharge (cfs)',
        data: [
          222000, 240000, 500000, 480000, 490000, 470000,
          379000, 320000, 300000, 280000, 200000, 180000
        ],
        borderColor: MARITIME_COLORS.oceanBlue,
        backgroundColor: 'rgba(0, 116, 217, 0.2)',
        fill: '-1',
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6
      },
      {
        label: 'Spring High Water Threshold (375,000 cfs)',
        data: Array(12).fill(375000),
        borderColor: MARITIME_COLORS.critical,
        borderDash: [10, 5],
        borderWidth: 2,
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
        text: 'Mississippi River Seasonal Discharge Patterns - Port Sulphur Area',
        font: { size: 18, weight: 'bold', family: 'Space Grotesk' },
        color: '#ffffff',
        padding: 20
      },
      subtitle: {
        display: true,
        text: 'Data Source: USGS Belle Chasse Monitoring Station (RM 76, 37 miles downstream)',
        font: { size: 12, family: 'Space Grotesk' },
        color: 'rgba(255, 255, 255, 0.7)',
        padding: { bottom: 20 }
      },
      legend: {
        display: true,
        position: 'top',
        labels: {
          color: '#ffffff',
          font: { size: 12, family: 'Space Grotesk' },
          padding: 15,
          usePointStyle: true
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        borderColor: MARITIME_COLORS.oceanBlue,
        borderWidth: 1,
        padding: 12,
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            label += context.parsed.y.toLocaleString() + ' cfs';
            return label;
          }
        }
      },
      annotation: {
        annotations: {
          springHighWater: {
            type: 'box',
            xMin: 2,
            xMax: 5,
            backgroundColor: 'rgba(255, 65, 54, 0.1)',
            borderColor: MARITIME_COLORS.critical,
            borderWidth: 0,
            label: {
              display: true,
              content: 'Spring High Water',
              position: 'start',
              color: '#ffffff',
              font: { size: 10 }
            }
          },
          summerFall: {
            type: 'box',
            xMin: 6,
            xMax: 9,
            backgroundColor: 'rgba(46, 204, 64, 0.1)',
            borderColor: MARITIME_COLORS.safe,
            borderWidth: 0,
            label: {
              display: true,
              content: 'Summer/Fall Normal',
              position: 'start',
              color: '#ffffff',
              font: { size: 10 }
            }
          },
          winterLow: {
            type: 'box',
            xMin: -0.5,
            xMax: 1.5,
            backgroundColor: 'rgba(177, 13, 201, 0.1)',
            borderColor: MARITIME_COLORS.winter,
            borderWidth: 0,
            label: {
              display: true,
              content: 'Winter Low',
              position: 'start',
              color: '#ffffff',
              font: { size: 10 }
            }
          },
          winterLow2: {
            type: 'box',
            xMin: 10,
            xMax: 11.5,
            backgroundColor: 'rgba(177, 13, 201, 0.1)',
            borderColor: MARITIME_COLORS.winter,
            borderWidth: 0
          }
        }
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Month',
          color: '#ffffff',
          font: { size: 14, weight: 'bold', family: 'Space Grotesk' }
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.8)',
          font: { size: 11, family: 'Space Grotesk' }
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
          drawBorder: false
        }
      },
      y: {
        title: {
          display: true,
          text: 'Discharge (cubic feet per second)',
          color: '#ffffff',
          font: { size: 14, weight: 'bold', family: 'Space Grotesk' }
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.8)',
          font: { size: 11, family: 'Space Grotesk' },
          callback: function(value) {
            return (value / 1000).toFixed(0) + 'k';
          }
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
          drawBorder: false
        },
        beginAtZero: true
      }
    }
  }
};

/**
 * 4. NAVIGATION AIDS LOCATION CHART
 * Maps navigation aids by river mile position
 */
const navigationAidsConfig = {
  type: 'scatter',
  data: {
    datasets: [
      {
        label: 'Lights',
        data: [
          { x: 39.8, y: 1, label: 'Nestor Canal Light' },
          { x: 37.0, y: 1, label: 'Home Place Lights (Lower)' },
          { x: 37.6, y: 1, label: 'Home Place Lights (Upper)' }
        ],
        backgroundColor: MARITIME_COLORS.warning,
        borderColor: '#FFD700',
        borderWidth: 2,
        pointRadius: 10,
        pointHoverRadius: 12,
        pointStyle: 'star'
      },
      {
        label: 'Daybeacons',
        data: [
          { x: 39.7, y: 0.5, label: 'Port Sulphur Anchorage Upper' },
          { x: 37.5, y: 0.5, label: 'Port Sulphur Anchorage Lower' }
        ],
        backgroundColor: MARITIME_COLORS.teal,
        borderColor: MARITIME_COLORS.oceanBlue,
        borderWidth: 2,
        pointRadius: 8,
        pointHoverRadius: 10,
        pointStyle: 'triangle'
      },
      {
        label: 'Terminal Location (RM 39.0)',
        data: [{ x: 39.0, y: 0.75, label: 'Port Sulphur Terminal' }],
        backgroundColor: MARITIME_COLORS.critical,
        borderColor: '#ffffff',
        borderWidth: 3,
        pointRadius: 12,
        pointHoverRadius: 14,
        pointStyle: 'rectRot'
      }
    ]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: 'Navigation Aids - Mississippi River Mile 37.0 to 39.8 AHP',
        font: { size: 18, weight: 'bold', family: 'Space Grotesk' },
        color: '#ffffff',
        padding: 20
      },
      subtitle: {
        display: true,
        text: 'Port Sulphur Anchorage Zone (RM 37.5 - 39.7) | Chart Reference: USACE Chart No. 90',
        font: { size: 12, family: 'Space Grotesk' },
        color: 'rgba(255, 255, 255, 0.7)',
        padding: { bottom: 20 }
      },
      legend: {
        display: true,
        position: 'top',
        labels: {
          color: '#ffffff',
          font: { size: 12, family: 'Space Grotesk' },
          padding: 15,
          usePointStyle: true
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        borderColor: MARITIME_COLORS.oceanBlue,
        borderWidth: 1,
        padding: 12,
        callbacks: {
          title: function(context) {
            return context[0].raw.label || '';
          },
          label: function(context) {
            return 'River Mile: ' + context.parsed.x.toFixed(1) + ' AHP';
          },
          afterLabel: function(context) {
            const rm = context.parsed.x;
            if (rm >= 37.5 && rm <= 39.7) {
              return 'Location: Within Port Sulphur Anchorage Zone';
            }
            return '';
          }
        }
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'River Mile (Above Head of Passes)',
          color: '#ffffff',
          font: { size: 14, weight: 'bold', family: 'Space Grotesk' }
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.8)',
          font: { size: 11, family: 'Space Grotesk' },
          callback: function(value) {
            return 'RM ' + value.toFixed(1);
          }
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
          drawBorder: false
        },
        min: 36.5,
        max: 40.5
      },
      y: {
        display: false,
        min: 0,
        max: 1.5
      }
    }
  }
};

/**
 * BONUS: DEPTH ZONES COMPARISON CHART
 * Horizontal bar chart comparing depth capabilities across zones
 */
const depthZonesConfig = {
  type: 'bar',
  data: {
    labels: [
      'Near-Shore Transition\n(0 to -20 ft)',
      'Primary Docking Zone\n(-20 to -60 ft)',
      'Deep Navigation Channel\n(-60 to -120 ft)'
    ],
    datasets: [
      {
        label: 'Maximum Depth (feet)',
        data: [20, 60, 120],
        backgroundColor: [
          MARITIME_COLORS.surface,
          MARITIME_COLORS.teal,
          MARITIME_COLORS.deepBlue
        ],
        borderColor: [
          MARITIME_COLORS.lightBlue,
          MARITIME_COLORS.oceanBlue,
          MARITIME_COLORS.deepWater
        ],
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
        text: 'Underwater Depth Zones - Port Sulphur Terminal',
        font: { size: 18, weight: 'bold', family: 'Space Grotesk' },
        color: '#ffffff',
        padding: 20
      },
      subtitle: {
        display: true,
        text: 'Federal Maintenance: -45 ft minimum | Existing Operations: -52 ft draft capability',
        font: { size: 12, family: 'Space Grotesk' },
        color: 'rgba(255, 255, 255, 0.7)',
        padding: { bottom: 20 }
      },
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        borderColor: MARITIME_COLORS.oceanBlue,
        borderWidth: 1,
        padding: 12,
        callbacks: {
          afterBody: function(context) {
            const zoneIndex = context[0].dataIndex;
            const capabilities = [
              'Limited draft access - May require approach channel dredging',
              'Suitable for medium-draft vessels - Current dock operations',
              'Panamax and Post-Panamax capable - 60-120 ft depths'
            ];
            return '\n' + capabilities[zoneIndex];
          }
        }
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Depth (feet below NAVD 88)',
          color: '#ffffff',
          font: { size: 14, weight: 'bold', family: 'Space Grotesk' }
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.8)',
          font: { size: 11, family: 'Space Grotesk' },
          callback: function(value) {
            return value + ' ft';
          }
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
          drawBorder: false
        },
        beginAtZero: true
      },
      y: {
        ticks: {
          color: 'rgba(255, 255, 255, 0.8)',
          font: { size: 11, family: 'Space Grotesk' }
        },
        grid: {
          display: false,
          drawBorder: false
        }
      }
    }
  }
};

/**
 * HELPER FUNCTION: Create gradient for depth visualization
 * Note: This function should be called with canvas context
 */
function createGradient(type) {
  // This is a placeholder - actual gradient creation requires canvas context
  // Use this pattern when initializing charts:
  // const ctx = document.getElementById('chartId').getContext('2d');
  // const gradient = ctx.createLinearGradient(0, 0, 0, 400);
  // gradient.addColorStop(0, MARITIME_COLORS.surface);
  // gradient.addColorStop(0.3, MARITIME_COLORS.teal);
  // gradient.addColorStop(0.7, MARITIME_COLORS.oceanBlue);
  // gradient.addColorStop(1, MARITIME_COLORS.deepWater);
  return 'rgba(0, 116, 217, 0.3)'; // Fallback color
}

/**
 * INITIALIZATION FUNCTION
 * Call this function to create all charts on page load
 */
function initializeNavigationCharts() {
  // Bathymetric Depth Profile
  const depthCanvas = document.getElementById('bathymetricDepthChart');
  if (depthCanvas) {
    const depthCtx = depthCanvas.getContext('2d');
    const depthGradient = depthCtx.createLinearGradient(0, 0, 0, 400);
    depthGradient.addColorStop(0, 'rgba(179, 229, 252, 0.3)');
    depthGradient.addColorStop(0.3, 'rgba(57, 204, 204, 0.3)');
    depthGradient.addColorStop(0.7, 'rgba(0, 116, 217, 0.3)');
    depthGradient.addColorStop(1, 'rgba(0, 31, 63, 0.5)');
    bathymetricDepthConfig.data.datasets[0].backgroundColor = depthGradient;
    new Chart(depthCtx, bathymetricDepthConfig);
  }

  // Current Velocity Chart
  const velocityCanvas = document.getElementById('currentVelocityChart');
  if (velocityCanvas) {
    new Chart(velocityCanvas.getContext('2d'), currentVelocityConfig);
  }

  // River Discharge Chart
  const dischargeCanvas = document.getElementById('riverDischargeChart');
  if (dischargeCanvas) {
    new Chart(dischargeCanvas.getContext('2d'), riverDischargeConfig);
  }

  // Navigation Aids Chart
  const navAidsCanvas = document.getElementById('navigationAidsChart');
  if (navAidsCanvas) {
    new Chart(navAidsCanvas.getContext('2d'), navigationAidsConfig);
  }

  // Depth Zones Chart
  const depthZonesCanvas = document.getElementById('depthZonesChart');
  if (depthZonesCanvas) {
    new Chart(depthZonesCanvas.getContext('2d'), depthZonesConfig);
  }
}

// Export configurations for use in HTML
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    bathymetricDepthConfig,
    currentVelocityConfig,
    riverDischargeConfig,
    navigationAidsConfig,
    depthZonesConfig,
    initializeNavigationCharts,
    MARITIME_COLORS
  };
}
