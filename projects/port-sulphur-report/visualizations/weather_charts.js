/**
 * Weather Charts Configuration for Port Sulphur Terminal
 * Chart.js visualization configurations generated from weather_data.json
 * Water-themed color palette (blues/greens)
 */

// Water-themed color palette
const colors = {
  deepBlue: '#0066CC',
  oceanBlue: '#0080FF',
  riverBlue: '#4A90E2',
  lightBlue: '#7FB3D5',
  tealGreen: '#3EADB8',
  seafoamGreen: '#64FFDA',
  warningOrange: '#FF9800',
  alertRed: '#FF5252',
  neutralGray: 'rgba(255,255,255,0.7)',
  backgroundOverlay: 'rgba(74, 144, 226, 0.1)'
};

/**
 * Chart 1: Seasonal Discharge Patterns (12 Months)
 * Line chart showing river discharge patterns throughout the year
 */
const seasonalDischargeConfig = {
  type: 'line',
  data: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'River Discharge (cubic feet/sec)',
        data: [
          180000,  // Jan - Winter Low Water
          180000,  // Feb - Winter Low Water
          450000,  // Mar - Spring High Water begins
          550000,  // Apr - Spring High Water peak
          550000,  // May - Spring High Water peak
          500000,  // Jun - Spring High Water ending
          300000,  // Jul - Summer/Fall Transition
          280000,  // Aug - Summer/Fall Transition
          280000,  // Sep - Summer/Fall Transition
          250000,  // Oct - Summer/Fall Transition
          180000,  // Nov - Winter Low Water begins
          165000   // Dec - Winter Low Water
        ],
        borderColor: colors.deepBlue,
        backgroundColor: 'rgba(0, 102, 204, 0.1)',
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointRadius: 5,
        pointHoverRadius: 8,
        pointBackgroundColor: colors.deepBlue,
        pointBorderColor: '#fff',
        pointBorderWidth: 2
      },
      {
        label: 'Water Velocity (feet/sec)',
        data: [
          1.5,   // Jan - Low velocity
          1.5,   // Feb - Low velocity
          4.0,   // Mar - High velocity begins
          4.5,   // Apr - Peak velocity
          4.5,   // May - Peak velocity
          4.0,   // Jun - High velocity ending
          2.5,   // Jul - Moderate velocity
          2.3,   // Aug - Moderate velocity
          2.3,   // Sep - Moderate velocity
          2.0,   // Oct - Moderate velocity
          1.5,   // Nov - Low velocity begins
          1.3    // Dec - Low velocity
        ],
        borderColor: colors.tealGreen,
        backgroundColor: 'rgba(62, 173, 184, 0.1)',
        borderWidth: 3,
        fill: false,
        tension: 0.4,
        pointRadius: 5,
        pointHoverRadius: 8,
        pointBackgroundColor: colors.tealGreen,
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        yAxisID: 'y-velocity'
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
        text: 'Mississippi River Seasonal Discharge Patterns at Port Sulphur',
        font: {
          size: 18,
          weight: 'bold'
        },
        color: colors.neutralGray,
        padding: 20
      },
      subtitle: {
        display: true,
        text: 'Annual cycle showing discharge (CFS) and water velocity (FPS) | Mile 48.6 AHP',
        font: {
          size: 14
        },
        color: 'rgba(255,255,255,0.6)',
        padding: {
          bottom: 20
        }
      },
      legend: {
        display: true,
        position: 'top',
        labels: {
          color: colors.neutralGray,
          font: {
            size: 13
          },
          padding: 15,
          usePointStyle: true
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: colors.riverBlue,
        borderWidth: 1,
        padding: 12,
        displayColors: true,
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.datasetIndex === 0) {
              label += new Intl.NumberFormat('en-US').format(context.parsed.y) + ' CFS';
            } else {
              label += context.parsed.y.toFixed(1) + ' FPS';
            }
            return label;
          },
          afterBody: function(tooltipItems) {
            const month = tooltipItems[0].label;
            const seasonInfo = {
              'Jan': 'Winter Low Water - Ideal for underwater work',
              'Feb': 'Winter Low Water - Precision maintenance window',
              'Mar': 'Spring High Water begins - Challenging conditions',
              'Apr': 'Spring High Water peak - Extreme velocities',
              'May': 'Spring High Water peak - Maximum structural loading',
              'Jun': 'Spring High Water ending - Enhanced tug requirements',
              'Jul': 'Prime Construction Window - Optimal conditions',
              'Aug': 'Prime Construction Window - Best construction period',
              'Sep': 'Construction Window - Hurricane season overlap',
              'Oct': 'Optimal Operations - Stable conditions',
              'Nov': 'Winter Low Water begins - Draft considerations',
              'Dec': 'Winter Low Water - Fog season begins'
            };
            return ['\n' + seasonInfo[month]];
          }
        }
      },
      annotation: {
        annotations: {
          highWaterZone: {
            type: 'box',
            xMin: 2,
            xMax: 5,
            backgroundColor: 'rgba(255, 82, 82, 0.1)',
            borderColor: colors.alertRed,
            borderWidth: 0
          },
          optimalZone: {
            type: 'box',
            xMin: 6,
            xMax: 9,
            backgroundColor: 'rgba(100, 255, 218, 0.1)',
            borderColor: colors.seafoamGreen,
            borderWidth: 0
          },
          lowWaterZone: {
            type: 'box',
            xMin: 10,
            xMax: 1,
            backgroundColor: 'rgba(127, 179, 213, 0.1)',
            borderColor: colors.lightBlue,
            borderWidth: 0
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
          drawBorder: false
        },
        ticks: {
          color: colors.neutralGray,
          font: {
            size: 12
          }
        }
      },
      y: {
        type: 'linear',
        display: true,
        position: 'left',
        title: {
          display: true,
          text: 'Discharge (CFS)',
          color: colors.neutralGray,
          font: {
            size: 13,
            weight: 'bold'
          }
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
          drawBorder: false
        },
        ticks: {
          color: colors.neutralGray,
          font: {
            size: 11
          },
          callback: function(value) {
            return (value / 1000) + 'k';
          }
        },
        min: 0,
        max: 650000
      },
      'y-velocity': {
        type: 'linear',
        display: true,
        position: 'right',
        title: {
          display: true,
          text: 'Velocity (FPS)',
          color: colors.neutralGray,
          font: {
            size: 13,
            weight: 'bold'
          }
        },
        grid: {
          drawOnChartArea: false,
          drawBorder: false
        },
        ticks: {
          color: colors.neutralGray,
          font: {
            size: 11
          },
          callback: function(value) {
            return value.toFixed(1) + ' fps';
          }
        },
        min: 0,
        max: 6
      }
    }
  }
};

/**
 * Chart 2: Historical Flood Events Timeline
 * Bar chart showing major flood events and their severity
 */
const historicalFloodEventsConfig = {
  type: 'bar',
  data: {
    labels: ['2005\nKatrina', '2012\nIsaac', '2018\nSpring Flood', '2019\nExtended Flood', '2021\nIda', '2023\nLow Water'],
    datasets: [
      {
        label: 'Storm Surge (feet)',
        data: [22, 8, 0, 0, 12, 0],
        backgroundColor: colors.deepBlue,
        borderColor: colors.deepBlue,
        borderWidth: 2,
        stack: 'Stack 0'
      },
      {
        label: 'River Discharge (100k CFS)',
        data: [0, 0, 6.5, 5.0, 0, 1.31],
        backgroundColor: colors.riverBlue,
        borderColor: colors.riverBlue,
        borderWidth: 2,
        stack: 'Stack 1'
      }
    ]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: 'Historical Flood Events at Port Sulphur (2005-2023)',
        font: {
          size: 18,
          weight: 'bold'
        },
        color: colors.neutralGray,
        padding: 20
      },
      subtitle: {
        display: true,
        text: 'Storm surge events (feet) and river flooding events (100k CFS)',
        font: {
          size: 14
        },
        color: 'rgba(255,255,255,0.6)',
        padding: {
          bottom: 20
        }
      },
      legend: {
        display: true,
        position: 'top',
        labels: {
          color: colors.neutralGray,
          font: {
            size: 13
          },
          padding: 15,
          usePointStyle: true
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: colors.riverBlue,
        borderWidth: 1,
        padding: 12,
        callbacks: {
          title: function(context) {
            return context[0].label.replace('\n', ' - ');
          },
          label: function(context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.datasetIndex === 0 && context.parsed.y > 0) {
              label += context.parsed.y + ' feet';
            } else if (context.datasetIndex === 1 && context.parsed.y > 0) {
              label += (context.parsed.y * 100000).toLocaleString() + ' CFS';
            } else {
              return null;
            }
            return label;
          },
          afterBody: function(tooltipItems) {
            const eventDetails = {
              0: ['Catastrophic storm surge', '~22 ft inundation at Port Sulphur', '~80% housing units affected'],
              1: ['Post-Katrina levee improvements validated', 'No major damage reported', 'Infrastructure resilience demonstrated'],
              2: ['Record-approaching peak flows', '~650,000 CFS discharge', 'Establishes design envelope'],
              3: ['Exceptional duration event', '>6 months sustained high water', 'Valuable infrastructure performance data'],
              4: ['Significant storm surge', 'Infrastructure resilience tested', 'Long-term debris impacts'],
              5: ['Extreme low water event', '131,000 CFS - record low', 'Deep-water terminal advantages demonstrated']
            };
            return ['\n'].concat(eventDetails[tooltipItems[0].dataIndex] || []);
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
          drawBorder: false
        },
        ticks: {
          color: colors.neutralGray,
          font: {
            size: 11
          }
        }
      },
      y: {
        stacked: false,
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
          drawBorder: false
        },
        ticks: {
          color: colors.neutralGray,
          font: {
            size: 11
          }
        },
        title: {
          display: true,
          text: 'Severity (feet for surge, 100k CFS for discharge)',
          color: colors.neutralGray,
          font: {
            size: 13,
            weight: 'bold'
          }
        }
      }
    }
  }
};

/**
 * Chart 3: Storm Surge Severity Analysis
 * Horizontal bar chart comparing storm surge heights
 */
const stormSurgeSeverityConfig = {
  type: 'bar',
  data: {
    labels: ['Hurricane Katrina\n(2005)', 'Hurricane Ida\n(2021)', 'Hurricane Isaac\n(2012)', '100-Year Event\n(Design Standard)'],
    datasets: [
      {
        label: 'Storm Surge Height (feet)',
        data: [22, 12, 8, 15],
        backgroundColor: [
          colors.alertRed,
          colors.warningOrange,
          colors.tealGreen,
          colors.deepBlue
        ],
        borderColor: [
          colors.alertRed,
          colors.warningOrange,
          colors.tealGreen,
          colors.deepBlue
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
        text: 'Storm Surge Severity Comparison at Port Sulphur',
        font: {
          size: 18,
          weight: 'bold'
        },
        color: colors.neutralGray,
        padding: 20
      },
      subtitle: {
        display: true,
        text: 'Federal levee system provides 100-year level protection (1% annual exceedance)',
        font: {
          size: 14
        },
        color: 'rgba(255,255,255,0.6)',
        padding: {
          bottom: 20
        }
      },
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: colors.riverBlue,
        borderWidth: 1,
        padding: 12,
        callbacks: {
          title: function(context) {
            return context[0].label.replace('\n', ' - ');
          },
          label: function(context) {
            return 'Storm Surge: ' + context.parsed.x + ' feet';
          },
          afterBody: function(tooltipItems) {
            const details = {
              0: ['\nCatastrophic damage', 'Sulfur facility structures destroyed', 'Led to HSDRRS improvements'],
              1: ['\nSignificant infrastructure test', 'Debris impacts persist', 'Post-Katrina systems validated'],
              2: ['\nPost-Katrina levee validation', 'Visible water lines showed systems held', 'No major damage reported'],
              3: ['\nFederal HSDRRS design standard', 'Based on combined storm parameters', 'Not solely wind speed category']
            };
            return details[tooltipItems[0].dataIndex] || [];
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
          drawBorder: false
        },
        ticks: {
          color: colors.neutralGray,
          font: {
            size: 11
          },
          callback: function(value) {
            return value + ' ft';
          }
        },
        title: {
          display: true,
          text: 'Storm Surge Height (feet)',
          color: colors.neutralGray,
          font: {
            size: 13,
            weight: 'bold'
          }
        }
      },
      y: {
        grid: {
          display: false,
          drawBorder: false
        },
        ticks: {
          color: colors.neutralGray,
          font: {
            size: 12
          }
        }
      }
    }
  }
};

/**
 * Chart 4: Operational Windows Chart
 * Stacked area chart showing construction vs vessel operation suitability
 */
const operationalWindowsConfig = {
  type: 'line',
  data: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Construction Suitability',
        data: [70, 70, 30, 20, 20, 35, 95, 100, 90, 80, 65, 65],
        borderColor: colors.seafoamGreen,
        backgroundColor: 'rgba(100, 255, 218, 0.3)',
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointRadius: 5,
        pointHoverRadius: 8,
        pointBackgroundColor: colors.seafoamGreen,
        pointBorderColor: '#fff',
        pointBorderWidth: 2
      },
      {
        label: 'Vessel Operations Suitability',
        data: [75, 75, 60, 65, 65, 70, 90, 95, 90, 90, 70, 65],
        borderColor: colors.riverBlue,
        backgroundColor: 'rgba(74, 144, 226, 0.3)',
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointRadius: 5,
        pointHoverRadius: 8,
        pointBackgroundColor: colors.riverBlue,
        pointBorderColor: '#fff',
        pointBorderWidth: 2
      },
      {
        label: 'Underwater Work Suitability',
        data: [90, 95, 40, 25, 25, 30, 60, 65, 65, 70, 85, 90],
        borderColor: colors.tealGreen,
        backgroundColor: 'rgba(62, 173, 184, 0.3)',
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointRadius: 5,
        pointHoverRadius: 8,
        pointBackgroundColor: colors.tealGreen,
        pointBorderColor: '#fff',
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
    plugins: {
      title: {
        display: true,
        text: 'Operational Windows Throughout the Year',
        font: {
          size: 18,
          weight: 'bold'
        },
        color: colors.neutralGray,
        padding: 20
      },
      subtitle: {
        display: true,
        text: 'Relative suitability ratings (0-100) for different operations at Port Sulphur',
        font: {
          size: 14
        },
        color: 'rgba(255,255,255,0.6)',
        padding: {
          bottom: 20
        }
      },
      legend: {
        display: true,
        position: 'top',
        labels: {
          color: colors.neutralGray,
          font: {
            size: 13
          },
          padding: 15,
          usePointStyle: true
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: colors.riverBlue,
        borderWidth: 1,
        padding: 12,
        callbacks: {
          label: function(context) {
            return context.dataset.label + ': ' + context.parsed.y + '%';
          },
          afterBody: function(tooltipItems) {
            const month = tooltipItems[0].dataIndex;
            const conditions = [
              'Winter Low Water: Fog risk (15-25 days), cold fronts, ideal for underwater work',
              'Winter Low Water: Precision maintenance window, fog season continues',
              'Spring High Water begins: Velocities increase to 3.5-5.0 fps',
              'Spring High Water peak: Extreme velocities, enhanced tug requirements',
              'Spring High Water peak: Maximum structural loading conditions',
              'Spring High Water ends: Hurricane season begins June 1',
              'PRIME CONSTRUCTION WINDOW: Optimal conditions, 2.0-3.0 fps velocity',
              'PRIME CONSTRUCTION WINDOW: Best construction period, peak hurricane season',
              'Construction window continues: Hurricane season peak activity',
              'Optimal operations: Stable conditions, hurricane season ends Nov 30',
              'Winter Low Water begins: Draft considerations, fog season starts',
              'Winter Low Water: Fog season, cold fronts, low velocity (1.2-1.8 fps)'
            ];
            return ['\n' + conditions[month]];
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
          drawBorder: false
        },
        ticks: {
          color: colors.neutralGray,
          font: {
            size: 12
          }
        }
      },
      y: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
          drawBorder: false
        },
        ticks: {
          color: colors.neutralGray,
          font: {
            size: 11
          },
          callback: function(value) {
            return value + '%';
          }
        },
        title: {
          display: true,
          text: 'Operational Suitability (%)',
          color: colors.neutralGray,
          font: {
            size: 13,
            weight: 'bold'
          }
        },
        min: 0,
        max: 100
      }
    }
  }
};

/**
 * Chart 5: Hurricane Season Risk Assessment (Bonus Chart)
 * Doughnut chart showing monthly hurricane risk distribution
 */
const hurricaneSeasonRiskConfig = {
  type: 'doughnut',
  data: {
    labels: ['June', 'July', 'August', 'September', 'October', 'November', 'Off-Season'],
    datasets: [{
      label: 'Hurricane Activity Risk',
      data: [8, 12, 25, 30, 18, 7, 0],
      backgroundColor: [
        'rgba(127, 179, 213, 0.8)',
        'rgba(74, 144, 226, 0.8)',
        'rgba(255, 152, 0, 0.8)',
        'rgba(255, 82, 82, 0.8)',
        'rgba(255, 152, 0, 0.8)',
        'rgba(74, 144, 226, 0.8)',
        'rgba(62, 173, 184, 0.3)'
      ],
      borderColor: [
        colors.lightBlue,
        colors.riverBlue,
        colors.warningOrange,
        colors.alertRed,
        colors.warningOrange,
        colors.riverBlue,
        colors.tealGreen
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
        text: 'Hurricane Season Risk Distribution',
        font: {
          size: 18,
          weight: 'bold'
        },
        color: colors.neutralGray,
        padding: 20
      },
      subtitle: {
        display: true,
        text: 'Relative hurricane activity risk by month (June 1 - November 30)',
        font: {
          size: 14
        },
        color: 'rgba(255,255,255,0.6)',
        padding: {
          bottom: 20
        }
      },
      legend: {
        display: true,
        position: 'right',
        labels: {
          color: colors.neutralGray,
          font: {
            size: 13
          },
          padding: 12,
          usePointStyle: true
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: colors.riverBlue,
        borderWidth: 1,
        padding: 12,
        callbacks: {
          label: function(context) {
            return context.label + ': ' + context.parsed + '% risk';
          },
          afterBody: function(tooltipItems) {
            const notes = {
              0: ['\nSeason begins June 1', 'Lower activity period'],
              1: ['\nPrime construction window', 'Lower hurricane risk', 'Optimal conditions'],
              2: ['\nPrime construction window', 'Peak season begins', 'Monitoring required'],
              3: ['\nPEAK HURRICANE ACTIVITY', 'Highest risk period', 'Enhanced monitoring critical'],
              4: ['\nPeak season continues', 'Elevated risk', 'Flexible scheduling needed'],
              5: ['\nSeason ends November 30', 'Risk decreases', 'Winter conditions begin'],
              6: ['\nDecember - May', 'No tropical cyclone risk', 'Other weather factors apply']
            };
            return notes[tooltipItems[0].dataIndex] || [];
          }
        }
      }
    }
  }
};

/**
 * Export all chart configurations
 */
const weatherCharts = {
  seasonalDischarge: seasonalDischargeConfig,
  historicalFloodEvents: historicalFloodEventsConfig,
  stormSurgeSeverity: stormSurgeSeverityConfig,
  operationalWindows: operationalWindowsConfig,
  hurricaneSeasonRisk: hurricaneSeasonRiskConfig,
  colors: colors
};

// Make available for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = weatherCharts;
}
