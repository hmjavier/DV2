/**
 * Dark theme for Highcharts JS
 * @author Torstein Honsi
 */

// Load the fonts
/**
 * Dark theme for Highcharts JS
 * @author Torstein Honsi
 */

// Load the fonts
Highcharts.createElement('link', {
   href: 'http://fonts.googleapis.com/css?family=Unica+One',
   rel: 'stylesheet',
   type: 'text/css'
}, null, document.getElementsByTagName('head')[0]);

Highcharts.themeB = {
   colors: ['#17FF00', '#FF0202', '#FFE400',"#7798BF", "#aaeeee", "#ff0066", "#eeaaee",
      "#55BF3B", "#DF5353", "#7798BF", "#aaeeee"],
   chart: {
      backgroundColor: {
         linearGradient: { x1: 0, y1: 0, x2: 1, y2: 1 },
         stops: [
            [0, '#2a2a2b'],
            [1, '#3e3e40']
         ]
      },
      style: {
         fontFamily: "'Unica One', sans-serif"
      },
      plotBorderColor: '#606063'
   },
   title: {
      style: {
         color: '#E0E0E3',
         textTransform: 'uppercase',
         fontSize: '20px'
      }
   },
   subtitle: {
      style: {
         color: '#E0E0E3',
         textTransform: 'uppercase'
      }
   },
   xAxis: {
      gridLineColor: '#707073',
      labels: {
         style: {
            color: '#E0E0E3'
         }
      },
      lineColor: '#707073',
      minorGridLineColor: '#505053',
      tickColor: '#707073',
      title: {
         style: {
            color: '#A0A0A3'

         }
      }
   },
   yAxis: {
      gridLineColor: '#707073',
      labels: {
         style: {
            color: '#E0E0E3'
         }
      },
      lineColor: '#707073',
      minorGridLineColor: '#505053',
      tickColor: '#707073',
      tickWidth: 1,
      title: {
         style: {
            color: '#A0A0A3'
         }
      }
   },
   tooltip: {
      backgroundColor: 'rgba(0, 0, 0, 0.85)',
      style: {
         color: '#F0F0F0'
      }
   },
   plotOptions: {
      series: {
         dataLabels: {
            color: '#B0B0B3'
         },
         marker: {
            lineColor: '#333'
         }
      },
      boxplot: {
         fillColor: '#505053'
      },
      candlestick: {
         lineColor: 'white'
      },
      errorbar: {
         color: 'white'
      }
   },
   legend: {
      itemStyle: {
         color: '#E0E0E3'
      },
      itemHoverStyle: {
         color: '#FFF'
      },
      itemHiddenStyle: {
         color: '#606063'
      }
   },
   credits: {
      style: {
         color: '#666'
      }
   },
   labels: {
      style: {
         color: '#707073'
      }
   },

   drilldown: {
      activeAxisLabelStyle: {
         color: '#F0F0F3'
      },
      activeDataLabelStyle: {
         color: '#F0F0F3'
      }
   },

   navigation: {
      buttonOptions: {
         symbolStroke: '#DDDDDD',
         theme: {
            fill: '#505053'
         }
      }
   },

   // scroll charts
   rangeSelector: {
      buttonTheme: {
         fill: '#505053',
         stroke: '#000000',
         style: {
            color: '#CCC'
         },
         states: {
            hover: {
               fill: '#707073',
               stroke: '#000000',
               style: {
                  color: 'white'
               }
            },
            select: {
               fill: '#000003',
               stroke: '#000000',
               style: {
                  color: 'white'
               }
            }
         }
      },
      inputBoxBorderColor: '#505053',
      inputStyle: {
         backgroundColor: '#333',
         color: 'silver'
      },
      labelStyle: {
         color: 'silver'
      }
   },

   navigator: {
      handles: {
         backgroundColor: '#666',
         borderColor: '#AAA'
      },
      outlineColor: '#CCC',
      maskFill: 'rgba(255,255,255,0.1)',
      series: {
         color: '#7798BF',
         lineColor: '#A6C7ED'
      },
      xAxis: {
         gridLineColor: '#505053'
      }
   },

   scrollbar: {
      barBackgroundColor: '#808083',
      barBorderColor: '#808083',
      buttonArrowColor: '#CCC',
      buttonBackgroundColor: '#606063',
      buttonBorderColor: '#606063',
      rifleColor: '#FFF',
      trackBackgroundColor: '#404043',
      trackBorderColor: '#404043'
   },

   // special colors for some of the
   legendBackgroundColor: 'rgba(0, 0, 0, 0.5)',
   background2: '#505053',
   dataLabelsColor: '#B0B0B3',
   textColor: '#C0C0C0',
   contrastTextColor: '#F0F0F3',
   maskColor: 'rgba(255,255,255,0.3)'
};


/**
 * Sand-Signika theme for Highcharts JS
 * @author Torstein Honsi
 */

// Load the fonts
Highcharts.createElement('link', {
   href: 'http://fonts.googleapis.com/css?family=Signika:400,700',
   rel: 'stylesheet',
   type: 'text/css'
}, null, document.getElementsByTagName('head')[0]);

// Add the background image to the container
Highcharts.wrap(Highcharts.Chart.prototype, 'getContainer', function (proceed) {
   proceed.call(this);
   //this.container.style.background = 'url(http://www.highcharts.com/samples/graphics/sand.png)';
});


Highcharts.themeW = {
   colors: ['#17FF00', '#FF0202', '#FFE400', "#7798BF", "#aaeeee", "#ff0066", "#eeaaee",
      "#55BF3B", "#DF5353", "#7798BF", "#aaeeee"],
   chart: {
      backgroundColor: null,
      style: {
         fontFamily: "Signika, serif"
      }
   },
   title: {
      style: {
         color: 'black',
         fontSize: '16px',
         fontWeight: 'bold'
      }
   },
   subtitle: {
      style: {
         color: 'black'
      }
   },
   tooltip: {
      borderWidth: 0
   },
   legend: {
      itemStyle: {
         fontWeight: 'bold',
         fontSize: '13px'
      }
   },
   xAxis: {
      labels: {
         style: {
            color: '#6e6e70'
         }
      }
   },
   yAxis: {
      labels: {
         style: {
            color: '#6e6e70'
         }
      }
   },
   plotOptions: {
      series: {
         shadow: true
      },
      candlestick: {
         lineColor: '#404048'
      },
      map: {
         shadow: false
      }
   },

   // Highstock specific
   navigator: {
      xAxis: {
         gridLineColor: '#D0D0D8'
      }
   },
   rangeSelector: {
      buttonTheme: {
         fill: 'white',
         stroke: '#C0C0C8',
         'stroke-width': 1,
         states: {
            select: {
               fill: '#D0D0D8'
            }
         }
      }
   },
   scrollbar: {
      trackBorderColor: '#C0C0C8'
   },

   // General
   background2: '#000000'
   
};

/*Highcharts.createElement('link', {
   href: 'http://fonts.googleapis.com/css?family=Unica+One',
   rel: 'stylesheet',
   type: 'text/css'
}, null, document.getElementsByTagName('head')[0]);

Highcharts.theme = {
		colors: ["#DDDF0D", "#55BF3B", "#DF5353", "#7798BF", "#aaeeee", "#ff0066", "#eeaaee",
		           "#55BF3B", "#DF5353", "#7798BF", "#aaeeee"],
		  chart: {
		    backgroundColor: {
		      linearGradient: { x1: 0, y1: 0, x2: 1, y2: 1 },
		      stops: [
		        [0, 'rgb(48, 48, 96)'],
		        [1, 'rgb(0, 0, 0)']
		      ]
		    },
		    borderColor: '#000000',
		    borderWidth: 2,
		    className: 'dark-container',
		    plotBackgroundColor: 'rgba(255, 255, 255, .1)',
		    plotBorderColor: '#CCCCCC',
		    plotBorderWidth: 1
		  },
		  title: {
		    style: {
		      color: '#C0C0C0',
		      font: 'bold 10px "Trebuchet MS", Verdana, sans-serif'
		    }
		  },
		  subtitle: {
		    style: {
		      color: '#666666',
		      font: 'bold 10px "Trebuchet MS", Verdana, sans-serif'
		    }
		  },
		  xAxis: {
		    gridLineColor: '#333333',
		    gridLineWidth: 1,
		    labels: {
		      style: {
		        color: '#A0A0A0'
		      }
		    },
		    lineColor: '#A0A0A0',
		    tickColor: '#A0A0A0',
		    title: {
		      style: {
		        color: '#CCC',
		        fontWeight: 'bold',
		        fontSize: '10px',
		        fontFamily: 'Trebuchet MS, Verdana, sans-serif'
		        
		      }
		    }
		  },
		  yAxis: {
		    gridLineColor: '#333333',
		    labels: {
		      style: {
		        color: '#A0A0A0'
		      }
		    },
		    lineColor: '#A0A0A0',
		    minorTickInterval: null,
		    tickColor: '#A0A0A0',
		    tickWidth: 1,
		    title: {
		      style: {
		        color: '#CCC',
		        fontWeight: 'bold',
		        fontSize: '10px',
		        fontFamily: 'Trebuchet MS, Verdana, sans-serif'
		      }
		    }
		  },
		  tooltip: {
		    backgroundColor: 'rgba(0, 0, 0, 0.75)',
		    style: {
		      color: '#F0F0F0'
		    }
		  },
		  toolbar: {
		    itemStyle: {
		      color: 'silver'
		    }
		  },
		  plotOptions: {
		    line: {
		      dataLabels: {
		        color: '#CCC'
		      },
		      marker: {
		        lineColor: '#333'
		      }
		    },
		    spline: {
		      marker: {
		        lineColor: '#333'
		      }
		    },
		    scatter: {
		      marker: {
		        lineColor: '#333'
		      }
		    },
		    candlestick: {
		      lineColor: 'white'
		    }
		  },
		  legend: {
		    itemStyle: {
		      font: '9pt Trebuchet MS, Verdana, sans-serif',
		      color: '#A0A0A0'
		    },
		    itemHoverStyle: {
		      color: '#FFF'
		    },
		    itemHiddenStyle: {
		      color: '#444'
		    }
		  },
		  credits: {
		    style: {
		      color: '#666'
		    }
		  },
		  labels: {
		    style: {
		      color: '#CCC'
		    }
		  },
		  
		  navigation: {
		    buttonOptions: {
		      symbolStroke: '#DDDDDD',
		      hoverSymbolStroke: '#FFFFFF',
		      theme: {
		        fill: {
		          linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
		          stops: [
		            [0.4, '#606060'],
		            [0.6, '#333333']
		          ]
		        },
		        stroke: '#000000'
		      }
		    }
		  },
		  
		  // scroll charts
		  rangeSelector: {
		    buttonTheme: {
		      fill: {
		        linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
		        stops: [
		          [0.4, '#888'],
		          [0.6, '#555']
		        ]
		      },
		      stroke: '#000000',
		      style: {
		        color: '#CCC',
		        fontWeight: 'bold'
		      },
		      states: {
		        hover: {
		          fill: {
		            linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
		            stops: [
		              [0.4, '#BBB'],
		              [0.6, '#888']
		            ]
		          },
		          stroke: '#000000',
		          style: {
		            color: 'white'
		          }
		        },
		        select: {
		          fill: {
		            linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
		            stops: [
		              [0.1, '#000'],
		              [0.3, '#333']
		            ]
		          },
		          stroke: '#000000',
		          style: {
		            color: 'yellow'
		          }
		        }
		      }
		    },
		    inputStyle: {
		      backgroundColor: '#333',
		      color: 'silver'
		    },
		    labelStyle: {
		      color: 'silver'
		    }
		  },
		  
		  navigator: {
		    handles: {
		      backgroundColor: '#666',
		      borderColor: '#AAA'
		    },
		    outlineColor: '#CCC',
		    maskFill: 'rgba(16, 16, 16, 0.5)',
		    series: {
		      color: '#7798BF',
		      lineColor: '#A6C7ED'
		    }
		  },
		  
		  scrollbar: {
		    barBackgroundColor: {
		      linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
		      stops: [
		        [0.4, '#888'],
		        [0.6, '#555']
		      ]
		    },
		    barBorderColor: '#CCC',
		    buttonArrowColor: '#CCC',
		    buttonBackgroundColor: {
		      linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
		      stops: [
		        [0.4, '#888'],
		        [0.6, '#555']
		      ]
		    },
		    buttonBorderColor: '#CCC',
		    rifleColor: '#FFF',
		    trackBackgroundColor: {
		      linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
		      stops: [
		        [0, '#000'],
		        [1, '#333']
		      ]
		    },
		    trackBorderColor: '#666'
		  },
		  
		  // special colors for some of the
		  legendBackgroundColor: 'rgba(0, 0, 0, 0.5)',
		  legendBackgroundColorSolid: 'rgb(35, 35, 70)',
		  dataLabelsColor: '#444',
		  textColor: '#C0C0C0',
		  maskColor: 'rgba(255,255,255,0.3)'
};
*/
var stylesMap = [{'featureType':'water','stylers':[{'color':'#021019'}]},{'featureType':'landscape','stylers':[{'color':'#08304b'}]},{'featureType':'poi','elementType':'geometry','stylers':[{'color':'#0c4152'},{'lightness':5}]},{'featureType':'road.highway','elementType':'geometry.fill','stylers':[{'color':'#000000'}]},{'featureType':'road.highway','elementType':'geometry.stroke','stylers':[{'color':'#0b434f'},{'lightness':25}]},{'featureType':'road.arterial','elementType':'geometry.fill','stylers':[{'color':'#000000'}]},{'featureType':'road.arterial','elementType':'geometry.stroke','stylers':[{'color':'#0b3d51'},{'lightness':16}]},{'featureType':'road.local','elementType':'geometry','stylers':[{'color':'#000000'}]},{'elementType':'labels.text.fill','stylers':[{'color':'#ffffff'}]},{'elementType':'labels.text.stroke','stylers':[{'color':'#000000'},{'lightness':13}]},{'featureType':'transit','stylers':[{'color':'#146474'}]},{'featureType':'administrative','elementType':'geometry.fill','stylers':[{'color':'#000000'}]},{'featureType':'administrative','elementType':'geometry.stroke','stylers':[{'color':'#144b53'},{'lightness':14},{'weight':1.4}]}];