/**
 * hmjavier
 * Clase para generar arrays que se inyectan a los elementos del DOM
 */

var drawElementsGral = {
		dataChartMemory : [],
		treeInterfaz: "",
		init : function(codeNet) {

			if (codeNet != undefined) {
				
				this.builder(codeNet);
			
			} else {
				
				cnocConnector.invokeMashup(cnocConnector.service9, {},drawElementsGral.selectCustom, "SelectCustomer", "opt");
			}

		},builder: function(codenet){				
			
			//cnocConnector.invokeMashup(cnocConnector.service24, {"jsonC":'{"requestData":{"model":"nmis_rrd","model_view":"graph","parameters":{"1402459367":"10-Jun-2014 23:02:47","time_period":"time_difference","10-Jun-2014 22:47:47":"end_date","end_date":"10-Jun-2014 23:02:47","start_date":"3-Jun-2014 23:02:47","end_date_raw":1402459367,"start_date_raw":1401854567,"resource_index":"","graph_type":"nodehealth","index_graph_type":"","axis":"0","node":"sbm_010035_la_castilla-n000093-ci0000005356","translation":"","field":"avgBusy1"},"options":{"xAxisType":"datetime"},"data_source":"local_nmis"}}'},drawElementsIncidents.drawPerformance, "chartSector", "chartSectorI");
			//cnocConnector.invokeMashup(cnocConnector.service24, {"jsonC":'{"requestData":{"model":"nmis_rrd","model_view":"graph","parameters":{"1403067600":"18-Jun-2014 00:00:00","end_date_raw":1403067600,"start_date_raw":1402462800,"graph_type":"nodehealth","node":"sbm_010035_la_castilla-n000093-ci0000005356","translation":"","field":"MemoryFreePROC"}}}'},drawElementsGral.drawPerformance, "containerHealt", "MemoryFreePROC");
			//cnocConnector.invokeMashup(cnocConnector.service24, {"jsonC":'{"requestData":{"model":"nmis_rrd","model_view":"graph","parameters":{"1403067600":"18-Jun-2014 00:00:00","end_date_raw":1403067600,"start_date_raw":1402462800,"graph_type":"interface","node":"sbm_145039_diaz_de_berlanga-n000093-ci0000005302","translation":"","field":"ifOutOctets","resource_index": "3","index_graph_type": ""}}}'},drawElementsGral.drawPerformance, "containerInterfaz", "ifOutOctets");
			/* function getdataPerformacne*/
			
			//drawElementsGral.drawChartPerformanceMemory("containerHealt", "MemoryP");
		
			cnocConnector.invokeMashup(cnocConnector.service13, {"codenet" : codenet},drawElementsGral.drawListNodes, "listNodes", "listNodesG");
			
			cnocConnector.invokeMashup(cnocConnector.service12, {"codenet" : codenet},drawElementsGral.chartGroups, "chartGrupos", "chartGruposG");
			
			if(codenet.indexOf('L')>=0 ){
				this.mapaMundial(codenet);
			}else{
				this.mapaGeneral(codenet);
			}
			
			cnocConnector.invokeMashup(cnocConnector.service11, {"codenet" : codenet,"status" : ""},drawElementsGral.countStatus, "countAll", "countAllG");
			cnocConnector.invokeMashup(cnocConnector.service11, {"codenet" : codenet,"status" : "reachable"},drawElementsGral.countStatus, "countReachable", "countReachableG");
			cnocConnector.invokeMashup(cnocConnector.service11, {"codenet" : codenet,"status" : "degraded"},drawElementsGral.countStatus, "countDegraded", "countDegradedG");
			cnocConnector.invokeMashup(cnocConnector.service11, {"codenet" : codenet,"status" : "unreachable"},drawElementsGral.countStatus, "countUnreachable", "countUnreachableG");
			cnocConnector.invokeMashup(cnocConnector.service5, {"code_net" : codenet},drawElementsGral.countTotal, "cOpen", "cOpenG");
			cnocConnector.invokeMashup(cnocConnector.service15, {"code_net" : codenet},drawElementsGral.countTotal, "cIncident", "cIncidentG");			
		
		},selectCustom : function(datos, selector, opt) {

			var selText = cnocConnector.drawSelect(datos, selector, "general");
			drawElementsGral.builder($("#SelectCustomer").val());

		},countStatus: function(datos, container, divPanel){
			var rowsData = new Array();
			try {
				var fields = new Array();
				fields.push(datos.records.record.column1.toString());
				rowsData.push(fields);

			} catch (err) {};
			
			var panelText = cnocConnector.drawPanel(rowsData, container, divPanel);

			
		},mapaGeneral:function(codenet){
			$( "#mapGral").mask("Waiting...");
			var states = [];

			$.ajax({
				type : 'GET',
				dataType : 'json',
				url : 'http://localhost:8080/dashboardMap/getLocationNodeList?network_code='+codenet,
				//url : 'https://dashboard-i2.cnoc.telmexit.com/dashboardMap/getLocationNodeList?network_code='+codenet,
				error : function(jqXHR, textStatus, errorThrown) {
					console.log(jqXHR);
					$( "#mapGral").unmask();
					//drawElementsGral.mapaGeneral(cnocConnector.codeNetGlobal);
				},
				success : function(response) {
					
					$.each( response, function( key, val ) {
						var array = [];
						var reachableT = 0;
						var degradedT = 0;
						var unreachableT = 0;
						var color ="#22FF00";
						$.each( val, function( key, val ) {
							if(key.toString() === "reachable"){
								reachableT = val;
							}
							
							if(key.toString() === "degraded"){
								degradedT = val;
							}
							
							if(key.toString() === "unreachable"){
								unreachableT = val;
							}
						});
						
						var totalN = parseInt(unreachableT) + parseInt(degradedT) + parseInt(reachableT);
						
						if(parseInt(unreachableT)> (totalN * .02)){
							color = "#FF1600";
						}else if(parseInt(degradedT)> (totalN * .05)){
							color = "#FFE200";
						}else {
							color ="#22FF00";
						}
						
						array.push(key);
						//array.push("reachable: "+(eval(reachable)==undefined?0:eval(reachable))+" <br> degraded: "+eval(degraded)+"<br> unreachable: "+eval(unreachable));
						array.push("Normal: "+reachableT+" <br> Warning: "+degradedT+"<br> Critical: "+unreachableT);
						array.push(color);
						states.push(array);
						
					});

		            var mapOptions = {
							zoom: 5,
							center: new google.maps.LatLng(21.8833, -102.3),
							mapTypeId: google.maps.MapTypeId.TERRAIN, 
							infoWindow: null,
							styles: stylesMap
						};
					var mapaNacional;
					map = new google.maps.Map(document.getElementById('mapGral'), mapOptions);
					
					infoWindow = new google.maps.InfoWindow({
					        content: "Cargando . . ."
					});
					
					 var bounds = new google.maps.LatLngBounds();
				     var estados = polygons.mexico.records.record;

				      for (var i = 0; i < estados.length; i++) {
				        var estado = estados[i];
				        var polygon = [];	

				        for (var a = 0; a< states.length; a++) {				        	
				        	
				        	if(states[a][0].indexOf(estado['name'].toUpperCase()) >-1 ){

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
				              strokeColor: states[a][2],
				              strokeOpacity: 0.8,
				              strokeWeight: 3,
				              fillColor: states[a][2],
				              fillOpacity: 0.35,
				              info: states[a][0],
				              totalIncidents: states[a][1]
				            });
				            mapaNacional.setMap(map);
				            // Add a listener for the click event.
				            google.maps.event.addListener(mapaNacional, 'mouseover', function(event){
				            	var info = this.info;
				                var total = this.totalIncidents;
				                var contentString = '<div class="tooltipMap"><b>Total Nodes by Status:</b><br>' + 'State: ' + info + ' <br>' + total + '<br></div>';
				                // Replace the info window's content and position.
				                infoWindow.setContent(contentString);
				                infoWindow.setPosition(event.latLng);
				                infoWindow.open(map);
				            });
				            infoWindow = new google.maps.InfoWindow();
				            
				            google.maps.event.addListener(mapaNacional, 'click', function(){
				              //alert("click");
				            });

				            
				          } //Cierre IF
				        } // Cierre FOR states
				      }
				      $( "#mapGral").unmask();
				}
			});

		},mapaMundial:function(codenet){
			$( "#mapGral").mask("Waiting...");

			$.ajax({
				type : 'GET',
				dataType : 'json',
				url : 'http://localhost:8080/dashboardMap/getInternationalNodeList?network_code='+codenet,
				//url : 'https://dashboard-i2.cnoc.telmexit.com/dashboardMap/getInternationalNodeList?network_code='+codenet,
				error : function(jqXHR, textStatus, errorThrown) {
					console.log(jqXHR);
					$( "#mapGral").unmask();
					//drawElementsGral.mapaMundial(cnocConnector.codeNetGlobal);
				},
				success : function(response) {
					var records = [];
					$.each( response, function( key, val ) {
						var reachableT = 0;
						var degradedT = 0;
						var unreachableT = 0;
						var color ="#22FF00";
						$.each( val, function( key, val ) {
							if(key.toString() === "reachable"){
								reachableT = val;
							}
							
							if(key.toString() === "degraded"){
								degradedT = val;
							}
							
							if(key.toString() === "unreachable"){
								unreachableT = val;
							}
						});	
						
						var totalN = parseInt(unreachableT) + parseInt(degradedT) + parseInt(reachableT);
						
						if(parseInt(unreachableT)> (totalN * .02)){
							color = "#FF1600";
						}else if(parseInt(degradedT)> (totalN * .05)){
							color = "#FFE200";
						}else {
							color ="#22FF00";
						}
						records.push({country:key, conteo: "Normal: "+reachableT+" <br> Warning: "+degradedT+"<br> Critical: "+unreachableT, color:color});
							
					});
					
					var mapOptions = {
							zoom: 2,
							center: new google.maps.LatLng(21.8833, -102.3),
							mapTypeId: google.maps.MapTypeId.TERRAIN, 
							infoWindow: null,
							styles: stylesMap
						};
					var mapaNacional;
					map = new google.maps.Map(document.getElementById('mapGral'), mapOptions);
					
					infoWindow = new google.maps.InfoWindow({
					        content: "Cargando . . ."
					});
					
					
					var countries = {};

				    var totalServicios = 0;

				    
				    for (var i = 0; i < records.length; i++) {
					      var record = records[i];

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
				          poly.push(drawElementsGral.constructNewCoordinates(k));
				        });

				      } else {

				        poly = drawElementsGral.constructNewCoordinates(item[1].geometry);

				      }
				      
				      var color = countries[item[0].toUpperCase()] == null ? '#7B7B7B' : '#0000FF';
				      try{
				    	  color = countries[item[0].toUpperCase()].color;
				      }catch(e){
				      }
				      
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
				      }
				    });
					$( "#mapGral").unmask();
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

		  },chartGroups:function(datos, container, divgroups){
			
			var categorias = new Array();
			var unreachable = new Array();
			var reachable = new Array();
			var degraded = new Array();
			var i = 0;

			try {
				if (datos.records.record.length > 1) {
					for (i = 0; i < datos.records.record.length; i++) {
						categorias.push(datos.records.record[i].groups.toString());
						unreachable.push(parseInt(datos.records.record[i].unreachable.toString()));
						reachable.push(parseInt(datos.records.record[i].reachable.toString()));
						degraded.push(parseInt(datos.records.record[i].degraded.toString()));
					}
				} else {
					categorias.push(datos.records.record.groups.toString());
					unreachable.push(parseInt(datos.records.record.unreachable.toString()));
					reachable.push(parseInt(datos.records.record.reachable.toString()));
					degraded.push(parseInt(datos.records.record.degraded.toString()));
				}
			} catch (err) {
				var categorias = new Array();
				var unreachable = new Array();
				var reachable = new Array();
				var degraded = new Array();
			}
			
			var totalNodos = [{
					"name" : "Normal",
					"data" : reachable,									
				},{
					"name" : "Critical",
					"data" : unreachable,									
				},{
					"name" : "Warning",
					"data" : degraded,									
				}];

			var optChart = cnocConnector.drawChartGroups("bar", container, "",totalNodos, categorias);			
			chart = new Highcharts.Chart(optChart);
			
			
	},drawListNodes: function (datos, container, divTable){
		jQuery("#" + container).empty();	
		var tableT = "";
		try {
			if (datos.records.record.length > 1) {
				for ( var i = 0; i < datos.records.record.length; i++) {
					if(datos.records.record[i].status_value.toString()==="degraded"){
						tableT += "<tr class='listNodesF warning'><td>"+datos.records.record[i].name.toString()+"</td></tr>";
					}else if(datos.records.record[i].status_value.toString()==="reachable"){
						tableT += "<tr class='listNodesF success'><td>"+datos.records.record[i].name.toString()+"</td></tr>";
					}else if(datos.records.record[i].status_value.toString()==="unreachable"){
						tableT += "<tr class='listNodesF danger'><td>"+datos.records.record[i].name.toString()+"</td></tr>";
					};					
				};
			} else {
				if(datos.records.record.status_value.toString()==="degraded"){
					tableT += "<tr class='listNodesF warning'><td>"+datos.records.record.name.toString()+"</td></tr>";
				}else if(datos.records.record.status_value.toString()==="reachable"){
					tableT += "<tr class='listNodesF success'><td>"+datos.records.record.name.toString()+"</td></tr>";
				}else if(datos.records.record.status_value.toString()==="unreachable"){
					tableT += "<tr class='listNodesF danger'><td>"+datos.records.record.name.toString()+"</td></tr>";
				}
			}
		} catch (err) {	};
		/*GENERA ARRAY DE ENCABEZADOS DE GRAFICA*/
		try {
			var rowsHeaders = [{
				"sTitle" : "Node Name"
			}];
		} catch (err) {	};
		
		var grid = cnocConnector.drawGrid(container, divTable, tableT, rowsHeaders, false);		
	},countTotal: function(datos, container, divPanel){
		/*GENERA ARRAY DE DATOS A GRAFICAR*/
		var rowsData = new Array();
		if(container === "relatedIncidentsC" || container === "relatedChangesC"){
			var fields = new Array();
			try{
				if(datos.records.record.length > 1){
					fields.push(datos.records.record.length);
					rowsData.push(fields);
				}else{					
					fields.push(1);
					rowsData.push(fields);
				}							
			}catch(e){
				fields.push(0);
				rowsData.push(fields);
			}					
		}else{
			try {
				var fields = new Array();
				fields.push(datos.records.record.column1.toString());
				rowsData.push(fields);

			} catch (err) {};
		}
				
		
		var panelText = cnocConnector.drawPanel(rowsData, container, divPanel);
	},topGrid: function(datos, container, divTable){
		var rowsData = new Array();
		try {
			if (datos.records.record.length > 1) {
				for ( var i = 0; i < datos.records.record.length; i++) {
					var fields = new Array();
					fields.push(datos.records.record[i].top.toString());
					fields.push(datos.records.record[i].name.toString());
					rowsData.push(fields);
				}
			} else {
				var fields = new Array();
				fields.push(datos.records.record.top.toString());
				fields.push(datos.records.record.name.toString());
				rowsData.push(fields);
			}
		} catch (err) {	};
		var rowsHeaders = [ {
			"sTitle" : "Percent"
		}, {
			"sTitle" : "Node Name"
		} ];
		cnocConnector.drawGrid(container, divTable, rowsData, rowsHeaders, false);
		
	},detailIncidents: function(datos, container, divTable){
		var rowsData = new Array();
		try {
			if (datos.records.record.length > 1) {
				for ( var i = 0; i < datos.records.record.length; i++) {
					var fields = new Array();
					fields.push(datos.records.record[i].im.toString());
					fields.push(datos.records.record[i].incident_id.toString());
					fields.push(datos.records.record[i].company.toString());
					fields.push(datos.records.record[i].open_time.toString());
					fields.push(datos.records.record[i].ci_name.toString());
					fields.push(datos.records.record[i].brief_description.toString());
					fields.push(datos.records.record[i].problem_status.toString());					
					rowsData.push(fields);
				}
			} else {
				var fields = new Array();
				fields.push(datos.records.record.im.toString());
				fields.push(datos.records.record.incident_id.toString());
				fields.push(datos.records.record.company.toString());
				fields.push(datos.records.record.open_time.toString());
				fields.push(datos.records.record.ci_name.toString());
				fields.push(datos.records.record.brief_description.toString());
				fields.push(datos.records.record.problem_status.toString());
				rowsData.push(fields);
			}
		} catch (err) {	};
		var rowsHeaders = [ {
			"sTitle" : "IM"
		}, {
			"sTitle" : "SID"
		},{
			"sTitle" : "Company"
		}, {
			"sTitle" : "Open Time"
		}, {
			"sTitle" : "Node Name"
		}, {
			"sTitle" : "Description"
		}, {
			"sTitle" : "Status"
		} ];
		cnocConnector.drawGrid(container, divTable, rowsData, rowsHeaders, false);
	},gridChangesList : function(datos, container, divTable) {

		/*GENERA ARRAY DE DATOS A GRAFICAR*/
		var rowsData = new Array();
		try {
			if (datos.records.record.length > 1) {
				for ( var i = 0; i < datos.records.record.length; i++) {
					var fields = new Array();
					fields.push(datos.records.record[i].number.toString());
					fields.push(datos.records.record[i].location.toString());
					fields.push(datos.records.record[i].brief_description.toString());
					fields.push(datos.records.record[i].current_phase.toString());
					fields.push(datos.records.record[i].opentime.toString());
					fields.push(datos.records.record[i].close_time.toString());
					rowsData.push(fields);
				}
			} else {
				var fields = new Array();
				fields.push(datos.records.record.number.toString());
				fields.push(datos.records.record.location.toString());
				fields.push(datos.records.record.brief_description.toString());
				fields.push(datos.records.record.current_phase.toString());
				fields.push(datos.records.record.opentime.toString());
				fields.push(datos.records.record.close_time.toString());
				rowsData.push(fields);
			}
		} catch (err) {
		}
		;

		/*GENERA ARRAY DE ENCABEZADOS DE GRAFICA*/
		try {
			var rowsHeaders = [ {
				"sTitle" : "Change ID"
			}, {
				"sTitle" : "Location"
			}, {
				"sTitle" : "Brief Description"
			}, {
				"sTitle" : "Current Phase"
			}, {
				"sTitle" : "Open Time"
			}, {
				"sTitle" : "Close Time"
			} ];
		} catch (err) {
		}
		;

		var grid = cnocConnector.drawGrid(container, divTable, rowsData, rowsHeaders, false);

	},drawListNodeDetail: function(datos, container, divTable){
		$("#treeContainerDetail").empty();
		
		$("#treeContainerDetail").append("<div class='tree well' id='treeNodeDetail'><div>");
		var tree = "<ul>";
		tree+= "<li><span class='treeNode'><i class='icon-minus-sign'></i> "+datos.records.record.name.toString()+"</span><ul>";
		tree+= "<li><span class='treeNodeDetail badge badge-success'><i class='icon-minus-sign'></i>Vendor: "+datos.records.record.nodevendor.toString()+"</span></li>";
		tree+= "<li><span class='treeNodeDetail badge badge-success'><i class='icon-minus-sign'></i>sysdescr: "+datos.records.record.sysdescr.toString()+"</span></li>";
		tree+= "<li><span class='treeNodeDetail badge badge-success'><i class='icon-minus-sign'></i>lastupdatesec: "+datos.records.record.lastupdatesec.toString()+"</span></li>";
		tree+= "<li><span class='treeNodeDetail badge badge-success'><i class='icon-minus-sign'></i>model: "+datos.records.record.model.toString()+"</span></li>";
		tree+= "<li><span class='treeNodeDetail badge badge-success'><i class='icon-minus-sign'></i>per_cpu: "+datos.records.record.per_cpu.toString()+"</span></li>";
		tree+= "<li><span class='treeNodeDetail badge badge-success'><i class='icon-minus-sign'></i>intfcollect: "+datos.records.record.intfcollect.toString()+"</span></li>";		
		tree+= "<li><span class='treeNodeDetail badge badge-success'><i class='icon-minus-sign'></i>sysuptime: "+datos.records.record.sysuptime.toString()+"</span></li>";
		tree+= "<li><span class='treeNodeDetail badge badge-success'><i class='icon-minus-sign'></i>syscontact: "+datos.records.record.syscontact.toString()+"</span></li>";
		tree+= "<li><span class='treeNodeDetail badge badge-success'><i class='icon-minus-sign'></i>processorram: "+datos.records.record.processorram.toString()+"</span></li>";
		tree+= "<li><span class='treeNodeDetail badge badge-success'><i class='icon-minus-sign'></i>nrt: "+datos.records.record.nrt.toString()+"</span></li>";
		tree+= "<li><span class='treeNodeDetail badge badge-success'><i class='icon-minus-sign'></i>musedio: "+datos.records.record.musedio.toString()+"</span></li>";
		tree+= "<li><span class='treeNodeDetail badge badge-success'><i class='icon-minus-sign'></i>lastupdate: "+datos.records.record.lastupdate.toString()+"</span></li>";
		tree+= "<li><span class='treeNodeDetail badge badge-success'><i class='icon-minus-sign'></i>reachability: "+datos.records.record.reachability.toString()+"</span></li>";
		tree+= "<li><span class='treeNodeDetail badge badge-success'><i class='icon-minus-sign'></i>nodetype: "+datos.records.record.nodetype.toString()+"</span></li>";
		tree+= "<li><span class='treeNodeDetail badge badge-success'><i class='icon-minus-sign'></i>serialnum: "+datos.records.record.serialnum.toString()+"</span></li>";
		tree+= "<li><span class='treeNodeDetail badge badge-success'><i class='icon-minus-sign'></i>time_column: "+datos.records.record.time_column.toString()+"</span></li>";
		tree+= "<li><span class='treeNodeDetail badge badge-success'><i class='icon-minus-sign'></i>serialnum: "+datos.records.record.serialnum.toString()+"</span></li>";
		tree+= "<li><span class='treeNodeDetail badge badge-success'><i class='icon-minus-sign'></i>per_mused: "+datos.records.record.per_mused.toString()+"</span></li>";
		tree+= "<li><span class='treeNodeDetail badge badge-success'><i class='icon-minus-sign'></i>availability: "+datos.records.record.availability.toString()+"</span></li>";
		tree+= "<li><span class='treeNodeDetail badge badge-success'><i class='icon-minus-sign'></i>sysname: "+datos.records.record.sysname.toString()+"</span></li>";
		tree+= "</ul></li></ul>";
		//console.log(tree);
		$("#treeNodeDetail").append(tree);
		
		
		cnocConnector.drawTree();
		/*
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
		}*/
		
	},drawGetModel: function(datos, container, divTable){
		$("#treeContainerDetail").empty();
		$("#treeContainerInterfaz").empty();
		$( "#" + container ).mask("Waiting...");
		if(datos.records.record.model.toString() === "automatic"){
			//$("#msgPingOnly").hide();
			cnocConnector.invokeMashup(cnocConnector.service19, {"node" : datos.records.record.name.toString()},drawElementsGral.drawListNodeDetail, "listNodeDetail", "listNodeDetailG");
			cnocConnector.invokeMashup(cnocConnector.service21, {"node" : datos.records.record.name.toString()},drawElementsGral.drawGridInterface, "listInterfaces", "listInterfacesG");			
		}else{
			//$("#msgPingOnly").show();
			var msg = '<div class="alert alert-info" id="msgPingOnly"><strong>Note!</strong></br>Monitoring Ping Only.</div>';
			$("#treeContainerInterfaz").append(msg);
		}
		$( "#" + container ).unmask();
	},drawGridInterface: function(datos, container, divTable){
		$("#treeContainerInterfaz").empty();
		
		$("#treeContainerInterfaz").append("<div class='tree' id='treeNodeDetailInterfaz'>");		
		var tree = "<ul>";
		tree+= "<li><span class='treeNode'><i class='icon-minus-sign'></i> Interface</span><ul>";
		
		try {
			if (datos.records.record.length > 1) {
				tree+= "<li><span class='treeNodeDetailInterfaz badge badge-success'><i class='icon-minus-sign'></i>"+datos.records.record[i].ifnode.toString()+"</span></li>";
			}else{
				tree+= "<li><span class='treeNodeDetailInterfaz badge badge-success'><i class='icon-minus-sign'></i>"+datos.records.record.ifnode.toString()+"</span></li>";
			}
		}catch(e){
			console.log(e);
		}
		
		
		
		tree+= "</ul></li></ul>";
		
		$("#treeNodeDetailInterfaz").append(tree);
		
		
		//cnocConnector.drawTree();
		/*var tableT = "";
		drawElementsGral.treeInterfaz = '';
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
		var grid = cnocConnector.drawGrid(container, divTable, tableT, rowsHeaders, false);*/

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
	},drawChartPerformanceMemory: function(container, divTable){
		$("#"+container).append("<div id='"+divTable+"' class='placeholder' style='height: 200px;'></div>");
		
		var MemoryFreeIO = {"jsonC":'{"requestData":{"model":"nmis_rrd","model_view":"graph","parameters":{"1403067600":"18-Jun-2014 00:00:00","end_date_raw":1403067600,"start_date_raw":1402462800,"graph_type":"nodehealth","node":"sbm_010035_la_castilla-n000093-ci0000005356","translation":"","field":"MemoryFreeIO"}}}'};
		var MemoryFreePROC = {"jsonC":'{"requestData":{"model":"nmis_rrd","model_view":"graph","parameters":{"1403067600":"18-Jun-2014 00:00:00","end_date_raw":1403067600,"start_date_raw":1402462800,"graph_type":"nodehealth","node":"sbm_010035_la_castilla-n000093-ci0000005356","translation":"","field":"MemoryFreePROC"}}}'};
		var MemoryUsedIO = {"jsonC":'{"requestData":{"model":"nmis_rrd","model_view":"graph","parameters":{"1403067600":"18-Jun-2014 00:00:00","end_date_raw":1403067600,"start_date_raw":1402462800,"graph_type":"nodehealth","node":"sbm_010035_la_castilla-n000093-ci0000005356","translation":"","field":"MemoryUsedIO"}}}'};
		var MemoryUsedPROC = {"jsonC":'{"requestData":{"model":"nmis_rrd","model_view":"graph","parameters":{"1403067600":"18-Jun-2014 00:00:00","end_date_raw":1403067600,"start_date_raw":1402462800,"graph_type":"nodehealth","node":"sbm_010035_la_castilla-n000093-ci0000005356","translation":"","field":"MemoryUsedPROC"}}}'};
		
		this.drawChartsP(cnocConnector.service24, MemoryFreePROC, divTable, "MemoryFreePROC");
		this.drawChartsP(cnocConnector.service24, MemoryFreeIO, divTable, "MemoryFreeIO");
		this.drawChartsP(cnocConnector.service24, MemoryUsedIO, divTable, "MemoryUsedIO");
		this.drawChartsP(cnocConnector.service24, MemoryUsedPROC, divTable, "MemoryUsedPROC");
		
	},drawChartsP: function(url, params, divTable, labelMetric){

		$(".placeholder").bind("plothover", function (event, pos, item) {
			$("#x").text(pos.x);
			$("#y").text(pos.y.toFixed(2));
			
			if (item) {
				if (previousPoint != item.dataIndex) {
					previousPoint = item.dataIndex;

					$("#tooltip").remove();
					var x = item.datapoint[0],
					y = item.datapoint[1].toFixed(2);
					showTooltip(item.pageX, item.pageY, new Date((x/1000) * 1000) + " = " + y);	
				}
			
			} else {
				$("#tooltip").remove();
				previousPoint = null;
			}
		});
		
		function onDataReceived(series) {
			drawElementsGral.dataChartMemory.push(series);
           	$.plot("#"+divTable, drawElementsGral.dataChartMemory,options_plot);
       	}
		
		$.ajax({
	   			type : 'GET',
	   			dataType : 'jsonp',
	   			url : url,
	   			data : params,
	   			error : function(jqXHR, textStatus, errorThrown) {
	   				console.log(jqXHR);
	   			},
	   			//success : onDataReceived
	   			success: function(response) {
	   				var dataChart = {label:labelMetric, data: response.replyData.data[0].data};
	   				onDataReceived(dataChart);
	   			}
	   		});
	},drawPerformancexxxxx: function(datos, container, divTable){		
		
		$("#"+container).append("<div id='"+divTable+"' class='placeholder' style='height: 200px;'></div>");
		
		/*

		$("#"+container).append("<p id='choices' style='float:right; width:135px;'></p>");
		var datasets = {
				"usa": {
					label: "USA",
					data: [[1988, 483994], [1989, 479060], [1990, 457648], [1991, 401949], [1992, 424705], [1993, 402375], [1994, 377867], [1995, 357382], [1996, 337946], [1997, 336185], [1998, 328611], [1999, 329421], [2000, 342172], [2001, 344932], [2002, 387303], [2003, 440813], [2004, 480451], [2005, 504638], [2006, 528692]]
				},        
				"russia": {
					label: "Russia",
					data: [[1988, 218000], [1989, 203000], [1990, 171000], [1992, 42500], [1993, 37600], [1994, 36600], [1995, 21700], [1996, 19200], [1997, 21300], [1998, 13600], [1999, 14000], [2000, 19100], [2001, 21300], [2002, 23600], [2003, 25100], [2004, 26100], [2005, 31100], [2006, 34700]]
				},
				"uk": {
					label: "UK",
					data: [[1988, 62982], [1989, 62027], [1990, 60696], [1991, 62348], [1992, 58560], [1993, 56393], [1994, 54579], [1995, 50818], [1996, 50554], [1997, 48276], [1998, 47691], [1999, 47529], [2000, 47778], [2001, 48760], [2002, 50949], [2003, 57452], [2004, 60234], [2005, 60076], [2006, 59213]]
				},
				"germany": {
					label: "Germany",
					data: [[1988, 55627], [1989, 55475], [1990, 58464], [1991, 55134], [1992, 52436], [1993, 47139], [1994, 43962], [1995, 43238], [1996, 42395], [1997, 40854], [1998, 40993], [1999, 41822], [2000, 41147], [2001, 40474], [2002, 40604], [2003, 40044], [2004, 38816], [2005, 38060], [2006, 36984]]
				},
				"denmark": {
					label: "Denmark",
					data: [[1988, 3813], [1989, 3719], [1990, 3722], [1991, 3789], [1992, 3720], [1993, 3730], [1994, 3636], [1995, 3598], [1996, 3610], [1997, 3655], [1998, 3695], [1999, 3673], [2000, 3553], [2001, 3774], [2002, 3728], [2003, 3618], [2004, 3638], [2005, 3467], [2006, 3770]]
				},
				"sweden": {
					label: "Sweden",
					data: [[1988, 6402], [1989, 6474], [1990, 6605], [1991, 6209], [1992, 6035], [1993, 6020], [1994, 6000], [1995, 6018], [1996, 3958], [1997, 5780], [1998, 5954], [1999, 6178], [2000, 6411], [2001, 5993], [2002, 5833], [2003, 5791], [2004, 5450], [2005, 5521], [2006, 5271]]
				},
				"norway": {
					label: "Norway",
					data: [[1988, 4382], [1989, 4498], [1990, 4535], [1991, 4398], [1992, 4766], [1993, 4441], [1994, 4670], [1995, 4217], [1996, 4275], [1997, 4203], [1998, 4482], [1999, 4506], [2000, 4358], [2001, 4385], [2002, 5269], [2003, 5066], [2004, 5194], [2005, 4887], [2006, 4891]]
				}
			};

			// hard-code color indices to prevent them from shifting as
			// countries are turned on/off

			var i = 0;
			$.each(datasets, function(key, val) {	
				val.color = i;
				++i;
			});

			// insert checkboxes 
			var choiceContainer = $("#choices");
			$.each(datasets, function(key, val) {
				choiceContainer.append("<br/><input type='checkbox' name='" + key +
					"' checked='checked' id='id" + key + "'></input>" +
					"<label for='id" + key + "'>"
					+ val.label + "</label>");
			});

			choiceContainer.find("input").click(plotAccordingToChoices);

			function plotAccordingToChoices() {

				var data = [];

				choiceContainer.find("input:checked").each(function () {
					var key = $(this).attr("name");
					if (key && datasets[key]) {
						data.push(datasets[key]);
					}
				});

				if (data.length > 0) {
					$.plot("#"+divTable, data,options_plot);
				}
			}

			plotAccordingToChoices();*/
		
		/*
		var d1 = [];
		for (var i = 0; i < 14; i += 0.5) {
			d1.push([i, Math.sin(i)]);
		}

		var d2 = [[0, 3], [4, 8], [8, 5], [9, 13]];

		// A null signifies separate line segments

		var d3 = [[0, 12], [7, 12], null, [7, 2.5], [12, 2.5]];

		*/
		
		$(".placeholder").bind("plothover", function (event, pos, item) {
			$("#x").text(pos.x);
			$("#y").text(pos.y.toFixed(2));
			
			if (item) {
				if (previousPoint != item.dataIndex) {
					previousPoint = item.dataIndex;

					$("#tooltip").remove();
					var x = item.datapoint[0],
					y = item.datapoint[1].toFixed(2);
					showTooltip(item.pageX, item.pageY, new Date((x/1000) * 1000) + " = " + y);	
				}
			
			} else {
				$("#tooltip").remove();
				previousPoint = null;
			}
		});
		
		$.plot("#"+divTable, [{
			label:"MemoryFreePROC",
			data: datos.replyData.data[0].data
		}],options_plot);
	}
};