/**
 * hmjavier
 * Clase para generar arrays que se inyectan a los elementos del DOM
 */

var drawElementsIncidents = {
		init : function(codeNet) {
			if (codeNet != undefined) {
				this.builder(codeNet);
			} else {				
				cnocConnector.invokeMashup(cnocConnector.service9, {},drawElementsIncidents.selectCustom, "SelectCustomer", "opt");
				this.builder(codeNet);
			}

		},builder: function(codeNet) {
			
			cnocConnector.invokeMashup(
					cnocConnector.getLdap,
					{},
					function (data) {						
						if(data.aut.module[1]==="CLIENTE") {					
							$("#containerChartCompaniesSector").remove();
							$("#containerChartSector").remove();
							$("#containerChartIncidentsGroups").show();
							$("#mapIncidents").removeClass("chartCompaniesBySector");
							$("#mapIncidents").addClass("chartIncidentsGroups");
							cnocConnector.invokeMashup(
									cnocConnector.service5,
									{"code_net" : cnocConnector.codeNetGlobal},
									drawElementsIncidents.drawChartIncidentsGroups,
									"chartIncidentsGroups",
									"chartIncidentsGroupsI"
								);
							
						} else {
							$("#containerChartIncidentsGroups").hide();
							
							cnocConnector.invokeMashup(
									cnocConnector.service2, 
									{},
									drawElementsIncidents.drawChartCompaniesSector,
									"chartCompaniesSector",
									"chartCompaniesSectorI"
								);
							
							cnocConnector.invokeMashup(
									cnocConnector.service1,
									{},
									drawElementsIncidents.drawChartSector,
									"chartSector",
									"chartSectorI"
								);
							
						}
					},
					null,
					null
				);
			
			cnocConnector.invokeMashup(cnocConnector.service3, {"code_net" : codeNet},drawElementsIncidents.drawChartIncidentsPhase, "chartIncidentsPhase", "chartIncidentsPhaseI");
			cnocConnector.invokeMashup(cnocConnector.service4, {"code_net" : codeNet},drawElementsIncidents.drawChartIncidentsStatus, "chartIncidentsStatus", "chartIncidentsStatusI");
			cnocConnector.invokeMashup(cnocConnector.service8, {"code_net" : codeNet},drawElementsIncidents.detailIncidents, "listIncidents", "listIncidentsI");
			cnocConnector.invokeMashup(cnocConnector.serviceI9, {"code_net" : codeNet},drawElementsIncidents.drawCountAll, "countAllI", "countAllII");
			cnocConnector.invokeMashup(cnocConnector.serviceI10, {"code_net" : codeNet},drawElementsIncidents.drawCountAll, "countOpenI", "countOpenII");
			cnocConnector.invokeMashup(cnocConnector.serviceI11, {"code_net" : codeNet},drawElementsIncidents.drawCountAll, "countClosedI", "countClosedII");
			
			if (codeNet != undefined) {
				if(codeNet.indexOf('L')>=0){
					cnocConnector.invokeMashup(cnocConnector.service7, {"code_net" : codeNet},drawElementsIncidents.mapaInternacional, "mapIncidents", "mapIncidentsI");					
				}else{
					cnocConnector.invokeMashup(cnocConnector.service6, {"code_net" : codeNet},drawElementsIncidents.mapaNacional, "mapIncidents", "mapIncidentsI");
				}
			}else{
				cnocConnector.invokeMashup(cnocConnector.service7, {"code_net" : codeNet},drawElementsIncidents.mapaInternacional, "mapIncidents", "mapIncidentsI");
			}
			
		},selectCustom : function(datos, selector, opt) {
			
			var selText = cnocConnector.drawSelect(datos, selector, "incidents");
			cnocConnector.codeNetGlobal = $("#SelectCustomer").val();
			
			var codeNet = $("#SelectCustomer").val(); 

		}, drawChartSector: function(datos, container, divPie){
			var dataSector = new Array();
		    try {
		      if (datos.records.record.length > 1) {
		        for (var i = 0; i < datos.records.record.length; i++) {
		          var array = new Array();
		          array.push(datos.records.record[i].sector);
		          array.push(parseInt(datos.records.record[i].value));
		          dataSector.push(array);
		        }
		      } else {
		        var array = new Array();
		        array.push(datos.records.record.sector);
		        array.push(parseInt(datos.records.record.value));
		        dataSector.push(array);
		      }
		    } catch (err) {
		      dataSector = new Array();
		    }
		    var optChart = cnocConnector.drawChart("pie", container, "",dataSector, null);
		    
		    optChart.plotOptions.series.point.events.click = function () {
		    	cnocConnector.invokeMashup(cnocConnector.service2, {"sector":this.name},drawElementsIncidents.drawChartCompaniesSector, "chartCompaniesSector", "chartCompaniesSectorI");
		    };

		    var chart = new Highcharts.Chart(optChart);

		},drawChartCompaniesSector:function(datos, container, divPie){
			 	var categorias = new Array();
			    var totalIncidents = new Array();
			    
			    var i = 0;
			    
			    try {
			      if (datos.records.record.length > 1) {
			        for (i = 0; i < datos.records.record.length; i++) {
			          categorias[i] = datos.records.record[i].sector.toString();
			          totalIncidents[i] = parseInt(datos.records.record[i].value.toString());
			        }
			      } else {
			        categorias[0] = datos.records.record.sector.toString();
			        totalIncidents[0] = parseInt(datos.records.record.value.toString());
			      }
			    } catch (err) {
			      categorias = new Array();
			      totalIncidents = new Array();
			    }
			    var optChart = cnocConnector.drawChart("bar", container, "", totalIncidents, categorias);			    			    
			    optChart.plotOptions.series.point.events.click = function () {
			    		try {
					      if (datos.records.record.length > 1) {
					        for (i = 0; i < datos.records.record.length; i++) {
					        	if(datos.records.record[i].sector.toString() === this.category){
					        		cnocConnector.codeNetGlobal = datos.records.record[i].network_code.toString();
					        	}
					        }
					      } else {
					    	  cnocConnector.codeNetGlobal = datos.records.record.network_code.toString();
					      }
					    } catch (err) {
					    	console.log(err);
					    }					    
			    	cnocConnector.invokeMashup(cnocConnector.service3, {"code_net":cnocConnector.codeNetGlobal},drawElementsIncidents.drawChartIncidentsPhase, "chartIncidentsPhase", "chartIncidentsPhaseI");
			    	cnocConnector.invokeMashup(cnocConnector.service4, {"code_net":cnocConnector.codeNetGlobal},drawElementsIncidents.drawChartIncidentsStatus, "chartIncidentsStatus", "chartIncidentsStatusI");
			    	//cnocConnector.invokeMashup(cnocConnector.service6, {"code_net":cnocConnector.codeNetGlobal},drawElementsIncidents.mapaNacional, "mapIncidents", "mapIncidentsI");
			    	if(cnocConnector.codeNetGlobal.indexOf('L')>=0 || cnocConnector.codeNetGlobal.indexOf('N100233')>=0){
						cnocConnector.invokeMashup(cnocConnector.service7, {"code_net" : cnocConnector.codeNetGlobal},drawElementsIncidents.mapaInternacional, "mapIncidents", "mapIncidentsI");
					}else{
						cnocConnector.invokeMashup(cnocConnector.service6, {"code_net" : cnocConnector.codeNetGlobal},drawElementsIncidents.mapaNacional, "mapIncidents", "mapIncidentsI");
					}
			    	cnocConnector.invokeMashup(cnocConnector.service8, {"code_net" : cnocConnector.codeNetGlobal},drawElementsIncidents.detailIncidents, "listIncidents", "listIncidentsI");
			    	cnocConnector.invokeMashup(cnocConnector.serviceI9, {"code_net" : cnocConnector.codeNetGlobal},drawElementsIncidents.drawCountAll, "countAllI", "countAllII");
					cnocConnector.invokeMashup(cnocConnector.serviceI10, {"code_net" : cnocConnector.codeNetGlobal},drawElementsIncidents.drawCountAll, "countOpenI", "countOpenII");
					cnocConnector.invokeMashup(cnocConnector.serviceI11, {"code_net" : cnocConnector.codeNetGlobal},drawElementsIncidents.drawCountAll, "countClosedI", "countClosedII");
			    };
			    
			    var chart = new Highcharts.Chart( optChart );

		},drawChartIncidentsPhase:function(datos, container, divPie){
			var dataSector = new Array();
		    try {
		      if (datos.records.record.length > 1) {
		        for (var i = 0; i < datos.records.record.length; i++) {
		          var array = new Array();
		          array.push(datos.records.record[i].current_phase);
		          array.push(parseInt(datos.records.record[i].value));
		          dataSector.push(array);
		        }
		      } else {
		        var array = new Array();
		        array.push(datos.records.record.current_phase);
		        array.push(parseInt(datos.records.record.value));
		        dataSector.push(array);
		      }
		    } catch (err) {
		      dataSector = new Array();
		    }
		    var optChart = cnocConnector.drawChart("pie", container, "",dataSector, null);
		    
		    optChart.plotOptions.series.point.events.click = function () {
		    	cnocConnector.invokeMashup(cnocConnector.service4, {"code_net":cnocConnector.codeNetGlobal,"phase":this.name},drawElementsIncidents.drawChartIncidentsStatus, "chartIncidentsStatus", "chartIncidentsStatusI");
		    	cnocConnector.invokeMashup(cnocConnector.service8, {"code_net":cnocConnector.codeNetGlobal,"phase":this.name},drawElementsIncidents.detailIncidents, "listIncidents", "listIncidentsI");
		    };

		    var chart = new Highcharts.Chart(optChart);
		},drawChartIncidentsStatus:function(datos, container, divPie){
			var categorias = new Array();
			var totalIncidents = new Array();
			var i = 0;

			try {
				if (datos.records.record.length > 1) {
					for (i = 0; i < datos.records.record.length; i++) {
						categorias[i] = datos.records.record[i].problem_status.toString();
						totalIncidents[i] = parseInt(datos.records.record[i].value.toString());
					}
				} else {
					categorias[0] = datos.records.record.problem_status.toString();
					totalIncidents[0] = parseInt(datos.records.record.value.toString());
				}
			} catch (err) {
				categorias = new Array();
				totalIncidents = new Array();
			}
			
			var optChart = cnocConnector.drawChart("bar", container, "", totalIncidents, categorias);

			optChart.plotOptions.series.point.events.click = function() {
				cnocConnector.invokeMashup(cnocConnector.service8, {"code_net":cnocConnector.codeNetGlobal,"status":this.category},drawElementsIncidents.detailIncidents, "listIncidents", "listIncidentsI");
			};
			chart = new Highcharts.Chart(optChart);

			
			
		},drawChartIncidentsGroups:function(datos, container, divPie){
			var categorias = new Array();
			var totalIncidents = new Array();
			var i = 0;

			try {
				if (datos.records.record.length > 1) {
					for (i = 0; i < datos.records.record.length; i++) {
						categorias[i] = datos.records.record[i].group.toString();
						totalIncidents[i] = parseInt(datos.records.record[i].value.toString());
					}
				} else {
					categorias[0] = datos.records.record.group.toString();
					totalIncidents[0] = parseInt(datos.records.record.value.toString());
				}
			} catch (err) {
				categorias = new Array();
				totalIncidents = new Array();
			}
			
			var optChart = cnocConnector.drawChart("bar", container, "", totalIncidents, categorias);

			optChart.plotOptions.series.point.events.click = function() {
				cnocConnector.invokeMashup(cnocConnector.service8, {"group":this.category},drawElementsIncidents.detailIncidents, "listIncidents", "listIncidentsI");
			};
			chart = new Highcharts.Chart(optChart);

			
			
		},mapaNacional:function(datos, container, div){
			
			 var infoWindow = null;
			    /*MAPA NACIONAL*/

			      var array = [];
			      var states = [];
			      try {
			        if (datos.records.record.length > 1) {
			          for (var i = 0; i < datos.records.record.length; i++) {
			            array.push(datos.records.record[i].state);
			            array.push(parseInt(datos.records.record[i].conteo));
			            states.push(array);
			            array = [];
			          }
			        } else {
			          array.push(datos.records.record.state);
			          array.push(parseInt(datos.records.record.conteo));
			          states.push(array);
			          array = [];
			        }
			      } catch (err) {
			        states = new Array();
			      }
			      var mapOptions = {
			        zoom: 5,
			        center: new google.maps.LatLng(21.8833, -102.3),
			        mapTypeId: google.maps.MapTypeId.TERRAIN,
			        infoWindow: null,
			        styles: stylesMap
			      };
			      var mapaNacional;
			      map = new google.maps.Map(document.getElementById(container), mapOptions);
			      infoWindow = new google.maps.InfoWindow({
			        content: "Cargando . . ."
			      });
			      // Define the LatLng coordinates for the polygon.
			      var bounds = new google.maps.LatLngBounds();
			      var estados = polygons.mexico.records.record;
			      for (i = 0; i < estados.length; i++) {
			        var estado = estados[i];
			        var name = estado['name'].toUpperCase();
			        var polygon = [];
			        for (a = 0; a < states.length; a++) {
			          if (states[a][0] == estado['name'].toUpperCase()) {
			            var coords = estado['coords'];
			            for (j = 0; j < coords.length; j++) {
			              var coord = coords[j];
			              var point = new google.maps.LatLng(coord[1], coord[0]);
			              polygon.push(point);
			              bounds.extend(point);
			            }
			            // Construct the polygon.
			            mapaNacional = new google.maps.Polygon({
			              paths: polygon,
			              strokeColor: '#FF0000',
			              strokeOpacity: 0.8,
			              strokeWeight: 3,
			              fillColor: '#FF0000',
			              fillOpacity: 0.35,
			              info: states[a][0],
			              totalIncidents: states[a][1]
			            });
			            mapaNacional.setMap(map);
			            // Add a listener for the click event.
			            google.maps.event.addListener(mapaNacional, 'mouseover', function(event){
			            	var info = this.info;
						      var total = this.totalIncidents;
						      var contentString = '<div class="tooltipMap"><b>Total Incidents By State</b><br>' + 'Clicked location: <br> State: ' + info + ', Open Incidents: ' + total + '<br></div>';
						      // Replace the info window's content and position.
						      infoWindow.setContent(contentString);
						      infoWindow.setPosition(event.latLng);
						      infoWindow.open(map);
			            });
			            infoWindow = new google.maps.InfoWindow();
			            
			            google.maps.event.addListener(mapaNacional, 'click', function(){
			              //MainJs.parametros.param = this.info + MainJs.parametros.slide;
			              //PrestoConnector.invoke("ms_imgl_lista_inicidentes_por_estado", "Invoke",{ "state":this.info}, true, MainJs.drawGridAllTickets)
			            });
			          } //Cierre IF
			        } // Cierre FOR states
			      }
			      
		            google.maps.event.addListener(map, 'zoom_changed', function() {
		            	var zoomLevel = map.getZoom();
		                if (zoomLevel == 4) {
		                	cnocConnector.invokeMashup(cnocConnector.service7, {"code_net" : ""},drawElementsIncidents.mapaInternacional, "mapIncidents", "mapIncidentsI");
		                }
		              });

		},mapaInternacional: function(data, container, div){
			
			var mapOptions = {
					zoom: 2,
					center: new google.maps.LatLng(21.8833, -102.3),
					mapTypeId: google.maps.MapTypeId.TERRAIN, 
					infoWindow: null,
					styles: stylesMap
				};
			var mapaNacional;
			map = new google.maps.Map(document.getElementById(container), mapOptions);
			
			infoWindow = new google.maps.InfoWindow({
			        content: "Cargando . . ."
			});
			
			
			 var countries = {};

			    var records = data.records.record;

			    var totalServicios = 0;
			    
			    if(records.length > 1){
				    for (var i = 0; i < records.length; i++) {
				    	var record = records[i];
				    	countries[record['country']] = record;
				    	totalServicios += parseFloat(record['conteo']);
				    }
			    }else{
			    	var record = records;
			    	countries[record['country']] = record;
			    	totalServicios += parseFloat(record['conteo']);
			    }
			    

			    var rows = polygons.mundial.records.record;

			    jQuery.each(rows, function(index, item) {
				      var poly = [];

				      if (item[0] === "Antarctica")
				        return;

				      if (item[1].type == 'GeometryCollection') {

				        var geos = item[1].geometries;
				        jQuery.each(geos, function(g, k) {
				          poly.push(drawElementsIncidents.constructNewCoordinates(k));
				        });

				      } else {

				        poly = drawElementsIncidents.constructNewCoordinates(item[1].geometry);

				      }
				      
				      var color = countries[item[0].toUpperCase()] == null ? '#7B7B7B' : '#0000FF';
				      mapaNacional = new google.maps.Polygon({
				        paths : poly,
				        strokeColor : '#FFFFFF',
				        strokeOpacity : 1,
				        strokeWeight : 1,
				        fillColor : color,
				        fillOpacity : .5,
				        info : countries[item[0].toUpperCase()]
				      });
				      
				      mapaNacional.setMap(map);

				      if (countries[item[0].toUpperCase()] != null) {
				    	  
				    	// Add a listener for the click event.
				            google.maps.event.addListener(mapaNacional, 'mouseover', function(event){
				            	var info = this.info;
				                var total = this.totalIncidents;
				                var contentString = '<div class="tooltipMap"><b>Country:' + info['country'] + '</b><br>' + info['conteo'] + '<br></div>';
				                // Replace the info window's content and position.
				                infoWindow.setContent(contentString);
				                infoWindow.setPosition(event.latLng);
				                infoWindow.open(map);
				            });
				            infoWindow = new google.maps.InfoWindow();
				            
				            google.maps.event.addListener(mapaNacional, 'click', function(event) {
				                if (this.info['country'] === "MEXICO") {
				                	cnocConnector.invokeMashup(cnocConnector.service6, {"code_net":""},drawElementsIncidents.mapaNacional, "mapIncidents", "mapIncidentsI");
				                }
				              });
				      }
				    });
		},constructNewCoordinates : function(polygon) {

		    var newCoordinates = [];
		    var coordinates = polygon['coordinates'][0];
		    for (var i = 0; i < coordinates.length; i++) {
		      var point = new google.maps.LatLng(coordinates[i][1], coordinates[i][0]);
		      newCoordinates.push(point);
		    }

		    return newCoordinates;

		},detailIncidents: function(datos, container, divTable){
				var rowsData = new Array();
				try {
					if (datos.records.record.length > 1) {
						for ( var i = 0; i < datos.records.record.length; i++) {
							var fields = new Array();
							fields.push(datos.records.record[i].number.toString());
							fields.push(datos.records.record[i].interaction.toString());							
							fields.push(datos.records.record[i].company.toString());
							fields.push(datos.records.record[i].hostname.toString());
							fields.push(datos.records.record[i].brief_description.toString());
							fields.push(datos.records.record[i].service_uniqueid.toString());
							fields.push(datos.records.record[i].operator.toString());
							fields.push(datos.records.record[i].closure_code.toString());
							fields.push(datos.records.record[i].problem_status.toString());
							fields.push(datos.records.record[i].open_time.toString());
							fields.push(datos.records.record[i].last_update.toString());							
							fields.push(datos.records.record[i].close_time.toString());
							fields.push(datos.records.record[i].service_type.toString());
							rowsData.push(fields);
						}
					} else {
						var fields = new Array();
						fields.push(datos.records.record.number.toString());
						fields.push(datos.records.record.interaction.toString());							
						fields.push(datos.records.record.company.toString());
						fields.push(datos.records.record.hostname.toString());
						fields.push(datos.records.record.brief_description.toString());
						fields.push(datos.records.record.service_uniqueid.toString());
						fields.push(datos.records.record.operator.toString());
						fields.push(datos.records.record.closure_code.toString());
						fields.push(datos.records.record.problem_status.toString());
						fields.push(datos.records.record.open_time.toString());
						fields.push(datos.records.record.last_update.toString());
						fields.push(datos.records.record.close_time.toString());	
						fields.push(datos.records.record.service_type.toString());
						rowsData.push(fields);
					}
				} catch (err) {	
					console.log(err);
				};
				var rowsHeaders = [ {
					"sTitle" : "IM"
				}, {
					"sTitle" : "SID"
				}, {
					"sTitle" : "Company"
				}, {
					"sTitle" : "Node Name"
				}, {
					"sTitle" : "Description"
				}, {
					"sTitle" : "Reference"
				}, {
					"sTitle" : "Operator"
				}, {
					"sTitle" : "Resolution code"
				}, {
					"sTitle" : "Status"
				}, {
					"sTitle" : "Open Time"
				}, {
					"sTitle" : "Last Update"
				}, {
					"sTitle" : "Close Time"
				}, {
					"sTitle" : "Service Type"
				} ];
				cnocConnector.drawGrid(container, divTable, rowsData, rowsHeaders, false);
			},drawCountAll: function(datos, container, divTable){
				$("#"+container).empty();
				$("#"+container).append(datos.records.record.value.toString());
			},drawListNodeDetail: function(datos, container, divTable){
				try {
					$('#name').val(datos.records.record.name.toString());
					$('#nodevendor').val(datos.records.record.nodevendor.toString());
					$('#sysdescr').val(datos.records.record.sysdescr.toString());
					$('#lastupdatesec').val(datos.records.record.lastupdatesec.toString());
					$('#model').val(datos.records.record.model.toString());
					$('#per_cpu').val(datos.records.record.per_cpu.toString());
					$('#intfcollect').val(datos.records.record.intfcollect.toString());
					$('#sysuptime').val(datos.records.record.sysuptime.toString());
					$('#syscontact').val(datos.records.record.syscontact.toString());
					$('#processorram').val(datos.records.record.processorram.toString());
					$('#nrt').val(datos.records.record.nrt.toString());
					$('#musedio').val(datos.records.record.musedio.toString());
					$('#lastupdate').val(datos.records.record.lastupdate.toString());
					$('#reachability').val(datos.records.record.reachability.toString());
					$('#nodetype').val(datos.records.record.nodetype.toString());
					$('#serialnum').val(datos.records.record.serialnum.toString());
					$('#time_column').val(datos.records.record.time_column.toString());
					$('#per_mused ').val(datos.records.record.per_mused .toString());
					$('#availability').val(datos.records.record.availability.toString());
					$('#sysname').val(datos.records.record.sysname.toString());
				}catch(e){
					console.log(e);
				}
			},drawGetModel: function(datos, container, divTable){
				if(datos.records.record.model.toString() === "automatic"){
					$("#msgPingOnly").hide();
					cnocConnector.invokeMashup(cnocConnector.serviceI13, {"node" : datos.records.record.name.toString(), "codenet" : cnocConnector.codeNetGlobal},drawElementsIncidents.drawListNodeDetail, "listNodeDetail", "listNodeDetailG");
					cnocConnector.invokeMashup(cnocConnector.serviceI14, {"node" : datos.records.record.name.toString(), "codenet" : cnocConnector.codeNetGlobal},drawElementsIncidents.drawGridInterface, "listInterfaces", "listInterfacesG");
					
				}else{
					$("#msgPingOnly").show();
				}
			},drawGridInterface: function(datos, container, divTable){
				/*GENERA ARRAY DE DATOS A GRAFICAR*/
				var tableT = "";
				try {
					
					if (datos.records.record.length > 1) {
						for ( var i = 0; i < datos.records.record.length; i++) {
							var int1 = datos.records.record[i].ifadminstatus.toString();
							var int2 = datos.records.record[i].ifoperstatus.toString();
							var classC = "success";
							if(int1 === "up" && int2 === "up"){
								classC = "success";
							}else {
								classC = "danger";
							}
							
							tableT += "<tr class='"+classC+"'><td>"+datos.records.record[i].ifnode.toString()+"</td>";
							tableT += "<td>"+datos.records.record[i].ipadentaddr1.toString()+"</td>";
							tableT += "<td>"+datos.records.record[i].lastupdate.toString()+"</td>";
							tableT += "<td>"+datos.records.record[i].ifoperstatus.toString()+"</td>";
							tableT += "<td>"+datos.records.record[i].ifadminstatus.toString()+"</td></tr>";
						}
					} else {
						var int1 = datos.records.record.ifadminstatus.toString();
						var int2 = datos.records.record.ifoperstatus.toString();
						var classC = "success";
						if(int1 === "up" && int2 === "up"){
							classC = "success";
						}else {
							classC = "danger";
						}
						
						tableT += "<tr class='"+classC+"'><td>"+datos.records.record.ifnode.toString()+"</td>";
						tableT += "<td>"+datos.records.record.ipadentaddr1.toString()+"</td>";
						tableT += "<td>"+datos.records.record.lastupdate.toString()+"</td>";
						tableT += "<td>"+datos.records.record.ifoperstatus.toString()+"</td>";
						tableT += "<td>"+datos.records.record.ifadminstatus.toString()+"</td></tr>";
					}
				} catch (err) {};

				try {
					var rowsHeaders = [ {
						"sTitle" : "Interface"
					}, {
						"sTitle" : "IP"
					}, {
						"sTitle" : "Last Update"
					}, {
						"sTitle" : "Oper Status"
					}, {
						"sTitle" : "Admin Status"
					} ];
				} catch (err) {
				}
				;
				var grid = cnocConnector.drawGrid(container, divTable, tableT, rowsHeaders, false);
				
			},detailIncidentsNode: function(datos, container, divTable){
				var rowsData = new Array();
				try {
					if (datos.records.record.length > 1) {
						for ( var i = 0; i < datos.records.record.length; i++) {
							var fields = new Array();							
							fields.push(datos.records.record[i].number.toString());
							fields.push(datos.records.record[i].incident_id.toString());
							fields.push(datos.records.record[i].company.toString());
							fields.push(datos.records.record[i].open_time.toString());
							fields.push(datos.records.record[i].hostname.toString());
							fields.push(datos.records.record[i].brief_description.toString());
							fields.push(datos.records.record[i].problem_status.toString());
							fields.push(datos.records.record[i].resolution_code.toString());
							fields.push(datos.records.record[i].close_time.toString());
							rowsData.push(fields);
						}
					} else {
						var fields = new Array();
						fields.push(datos.records.record.number.toString());
						fields.push(datos.records.record.incident_id.toString());
						fields.push(datos.records.record.company.toString());
						fields.push(datos.records.record.open_time.toString());
						fields.push(datos.records.record.hostname.toString());
						fields.push(datos.records.record.brief_description.toString());
						fields.push(datos.records.record.problem_status.toString());
						fields.push(datos.records.record.resolution_code.toString());
						fields.push(datos.records.record.close_time.toString());
						rowsData.push(fields);
					}
				} catch (err) {	};
				var rowsHeaders = [ {
					"sTitle" : "IM"
				}, {
					"sTitle" : "SID"
				}, {
					"sTitle" : "Company"
				}, {
					"sTitle" : "Open Time"
				}, {
					"sTitle" : "Node Name"
				}, {
					"sTitle" : "Description"
				}, {
					"sTitle" : "Status"
				}, {
					"sTitle" : "Resolution Code"
				}, {
					"sTitle" : "Close Time"
				} ];
				cnocConnector.drawGrid(container, divTable, rowsData, rowsHeaders, false);
			},detailChangesNode: function(datos, container, divTable){
				var rowsData = new Array();
				try {
					if (datos.records.record.length > 1) {
						for ( var i = 0; i < datos.records.record.length; i++) {
							var fields = new Array();
							fields.push(datos.records.record[i].number.toString());
							fields.push(datos.records.record[i].company.toString());
							fields.push(datos.records.record[i].open_time.toString());
							fields.push(datos.records.record[i].hostname.toString());
							fields.push(datos.records.record[i].brief_description.toString());
							fields.push(datos.records.record[i].status.toString());
							fields.push(datos.records.record[i].phase.toString());
							fields.push(datos.records.record[i].type.toString());
							fields.push(datos.records.record[i].implementationcomments.toString());
							fields.push(datos.records.record[i].close_time.toString());
							rowsData.push(fields);
						}
					} else {
						var fields = new Array();
						fields.push(datos.records.record.number.toString());
						fields.push(datos.records.record.company.toString());
						fields.push(datos.records.record.open_time.toString());
						fields.push(datos.records.record.hostname.toString());
						fields.push(datos.records.record.brief_description.toString());
						fields.push(datos.records.record.status.toString());
						fields.push(datos.records.record.phase.toString());
						fields.push(datos.records.record.type.toString());
						fields.push(datos.records.record.implementationcomments.toString());
						fields.push(datos.records.record.close_time.toString());
						rowsData.push(fields);
					}
				} catch (err) {	};
				var rowsHeaders = [ {
					"sTitle" : "Change ID"
				}, {
					"sTitle" : "Company"
				}, {
					"sTitle" : "Open Time"
				}, {
					"sTitle" : "Node Name"
				}, {
					"sTitle" : "Description"
				}, {
					"sTitle" : "Status"
				}, {
					"sTitle" : "Phase"
				}, {
					"sTitle" : "Type"
				}, {
					"sTitle" : "Comments"
				}, {
					"sTitle" : "Close Time"
				} ];
				cnocConnector.drawGrid(container, divTable, rowsData, rowsHeaders, false);
			},activitiesIncidents: function(datos, container, divTable){
				var rowsData = new Array();
				try {
					if (datos.records.record.length > 1) {
						for ( var i = 0; i < datos.records.record.length; i++) {
							var fields = new Array();
							fields.push(datos.records.record[i].number.toString());
							fields.push(datos.records.record[i].description.toString());
							fields.push(datos.records.record[i].datestamp.toString());
							fields.push(datos.records.record[i].type.toString());
							fields.push(datos.records.record[i].operator.toString());
							rowsData.push(fields);
						}
					} else {
						var fields = new Array();
						fields.push(datos.records.record.number.toString());
						fields.push(datos.records.record.description.toString());
						fields.push(datos.records.record.datestamp.toString());
						fields.push(datos.records.record.type.toString());
						fields.push(datos.records.record.operator.toString());
						rowsData.push(fields);
					}
				} catch (err) {	};
				var rowsHeaders = [ {
					"sTitle" : "Incident ID"
				}, {
					"sTitle" : "Description"
				}, {
					"sTitle" : "Time"
				}, {
					"sTitle" : "Type"
				}, {
					"sTitle" : "Operator"
				}];
				cnocConnector.drawGrid(container, divTable, rowsData, rowsHeaders, false);	
			}		
};