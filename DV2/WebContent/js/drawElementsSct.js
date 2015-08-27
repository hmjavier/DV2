/**
 * hmjavier
 * Clase para generar arrays que se inyectan a los elementos del DOM
 */

var drawElementsSct = {
		dataChartSct : [],
		subtitleChartSct:"",
		metricUnitChartSct:"",
		interfazGlobal:"",
		filterContentLabel:"",
		nodeSctGlobal:"",
		
		init : function(codeNet) {

			if (codeNet != undefined) {
				
				this.builder(codeNet);				
			
			} else {
				
				this.builder(codeNet);
				//this.setMarkersMap();
				//cnocConnector.invokeMashup(cnocConnector.service1, {},drawElementsSct.selectCustom, "SelectCustomer", "opt");

			}

		},builder: function(codenet){
				
			cnocConnector.invokeMashup(cnocConnector.service2, {"status" : ""},drawElementsSct.countStatus, "countAllSct", "countAllSctG");
			cnocConnector.invokeMashup(cnocConnector.service2, {"status" : "1"},drawElementsSct.countStatus, "onlineSct", "onlineSctG");
			cnocConnector.invokeMashup(cnocConnector.service2, {"status" : "2"},drawElementsSct.countStatus, "offline", "offlineG");
			cnocConnector.invokeMashup(cnocConnector.service2, {"status" : "3"},drawElementsSct.countStatus, "invalid", "invalidG");
			cnocConnector.invokeMashup(cnocConnector.service2, {"status" : "0"},drawElementsSct.countStatus, "noDetected", "noDetectedG");
			cnocConnector.invokeMashup(cnocConnector.service16, {"code_net" : "N000333"}, drawElementsSct.setMarkersMap, "containerMapSCT");
			
			cnocConnector.invokeMashup(cnocConnector.service3, {"id":"","status":""},drawElementsSct.drawListNodes, "listNodesSct", "listNodesSctG");
			
			//this.setMarkersMap();
			
		},selectCustom : function(datos, selector, opt) {

			var selText = cnocConnector.drawSelect(datos, selector, "general");		
			var codeNet = $("#SelectCustomer").val(); 
			drawElementsSct.builder(codeNet);

		},countStatus: function(datos, container, divPanel){
			var rowsData = new Array();
			try {
				var fields = new Array();
				fields.push(datos.records.record.column1.toString());
				rowsData.push(fields);

			} catch (err) {};
			
			var panelText = cnocConnector.drawPanel(rowsData, container, divPanel);
			
		},drawListNodes: function (datos, container, divTable){
			jQuery("#" + container).empty();	
			var tableT = "";
			try {
				if (datos.records.record.length > 1) {
					for ( var i = 0; i < datos.records.record.length; i++) {
						if(datos.records.record[i].nestate.toString()==="0"){
							tableT += "<tr class='danger' ><td rel="+datos.records.record[i].nedn.toString()+"><a href='#nodeResource' >"+datos.records.record[i].nename.toString()+"</a></td></tr>";
						}else if(datos.records.record[i].nestate.toString()==="1"){
							tableT += "<tr class='success'><td rel="+datos.records.record[i].nedn.toString()+"><a href='#nodeResource' >"+datos.records.record[i].nename.toString()+"</a></td></tr>";
						}else if(datos.records.record[i].nestate.toString()==="2"){
							tableT += "<tr class='danger' ><td rel="+datos.records.record[i].nedn.toString()+"><a href='#nodeResource' >"+datos.records.record[i].nename.toString()+"</a></td></tr>";
						}else if(datos.records.record[i].nestate.toString()==="3"){
							tableT += "<tr class='danger' ><td rel="+datos.records.record[i].nedn.toString()+"><a href='#nodeResource' >"+datos.records.record[i].nename.toString()+"</a></td></tr>";
						};					
					};
				} else {
					if(datos.records.record.nestate.toString()==="0"){
						tableT += "<tr class='danger'><td rel="+datos.records.record.nedn.toString()+"><a href='#nodeResource' >"+datos.records.record.nename.toString()+"</a></td></tr>";
					}else if(datos.records.record.nestate.toString()==="1"){
						tableT += "<tr class='success'><td rel="+datos.records.record.nedn.toString()+"><a href='#nodeResource'>"+datos.records.record.nename.toString()+"</a></td></tr>";
					}else if(datos.records.record.nestate.toString()==="2"){
						tableT += "<tr class='danger'><td rel="+datos.records.record.nedn.toString()+"><a href='#nodeResource' >"+datos.records.record.nename.toString()+"</a></td></tr>";
					}else if(datos.records.record.nestate.toString()==="3"){
						tableT += "<tr class='danger'><td rel="+datos.records.record.nedn.toString()+"><a href='#nodeResource' >"+datos.records.record.nename.toString()+"</a></td></tr>";
					};	
				}
			} catch (err) {	};
			/*GENERA ARRAY DE ENCABEZADOS DE GRAFICA*/
			try {
				var rowsHeaders = [{
					"sTitle" : "Node Name"
				}];
			} catch (err) {	};
			
			var grid = cnocConnector.drawGrid(container, divTable, tableT, rowsHeaders, false);		
			
		}, drawInterfazTree: function(datos, container, divPanel){
			
			$("#treeContainerInterfaz").empty();			
			
			$("#treeContainerInterfaz").append("<div class='tree' id='treeNodeDetailInterfaz'>");	
			
			var tree = "<ul>";
			tree += "<li><span class='treeNode badge badge-success'><i class='icon-minus-sign'></i> Performance </span><ul>";
			tree += "<li id='cpuSct' class='cpuSct'><span class='treeNode'><i class='icon-minus-sign'><a href='#nodeChart'>CPU</a></i></span></li>";
			tree += "<li id='memSct' class='memSct'><span class='treeNode'><i class='icon-minus-sign'><a href='#nodeChart'>MEMORY</a></i></span></li>";
			tree += "<li id='pingSct' class='pingSct'><span class='treeNode'><i class='icon-minus-sign'><a href='#nodeChart'>PING</a></i></span></li>";
			tree += "</ul></li>";
			tree += "</ul></li></ul>";
			
			tree += "<ul><li><span class='treeNode badge badge-success'><i class='icon-minus-sign'></i> Interface </span><ul>";
			try {
				if (datos.records.record.length > 1) {
					for(var i=0; i<datos.records.record.length; i++){
						tree+= "<li id ='interfazNode' class='interfazNode'><span class='treeNode'><i class='icon-minus-sign intfChart'><a href='#nodeChart'>"+datos.records.record[i].displayvalue.toString()+"</a></i></span>";						
						tree+="</li>";
					}					
				}else{
					tree+= "<li class=''><span class='treeNode'><i class='icon-minus-sign intfChart'><a href='#nodeChart'>"+datos.records.record.displayvalue.toString()+"</a></i></span>";						
					tree+="</li>";
				}
			}catch(e){
				console.log(e);
			}

			tree+= "</ul></li></ul>";
			
			
			$("#treeNodeDetailInterfaz").append(tree);
			
			cnocConnector.drawTreeSct();
			
			
			$( ".cpuSct" ).click(function() {
				drawElementsSct.dataChartSct.length = 0;
				cnocConnector.invokeMashup(cnocConnector.service6, {"id":cnocConnector.nodeGlobal},drawElementsSct.drawCharCPU, "containerChartPingSct", "containerChartPingSctG");
			});
			
			$( ".memSct" ).click(function() {
				drawElementsSct.dataChartSct.length = 0;
				cnocConnector.invokeMashup(cnocConnector.service7, {"id":cnocConnector.nodeGlobal},drawElementsSct.drawCharMem, "containerChartPingSct", "containerChartPingSctG");
			});
			
			$( ".pingSct" ).click(function() {
				drawElementsSct.dataChartSct.length = 0;
				cnocConnector.invokeMashup(cnocConnector.service5, {"id":cnocConnector.nodeGlobal},drawElementsSct.drawChartPingSct, "containerChartPingSct", "containerChartPingSctG");
			});
			
			$( ".interfazNode" ).click(function() {
				drawElementsSct.dataChartSct.length = 0;
				
				var tmp = $(this).text();				
				drawElementsSct.interfazGlobal = tmp;				
				cnocConnector.invokeMashup(cnocConnector.service8, {"id":cnocConnector.nodeGlobal,"intf":tmp},drawElementsSct.drawCharUtilInt, "containerChartPingSct", "containerChartPingSctG");
			});
			
		},drawListNodeDetail: function(datos, container, divTable){
			try {
				$('#createtime').val(datos.records.record.createtime.toString());
				$('#lastpolltime').val(datos.records.record.lastpolltime.toString());
				$('#netype').val(datos.records.record.netype.toString());
				$('#neip').val(datos.records.record.neip.toString());
				$('#necategory').val(datos.records.record.necategory.toString());
				$('#displaytype').val(datos.records.record.displaytype.toString());
				$('#neosversion').val(datos.records.record.neosversion.toString());
				$('#nename').val(datos.records.record.nename.toString());
				$('#nemac').val(datos.records.record.nemac.toString());
				$('#version').val(datos.records.record.version.toString());
				$('#neruntime').val(datos.records.record.neruntime.toString());
				
			}catch(e){
				console.log(e);
			}
		},bw: function(datos, container, divTable){
			try {
				$('#bw').val(datos.records.record.bandwidth.toString());				
			}catch(e){
				console.log(e);
			}
		},drawChartPingSct:function (datos, container, divTable){

			drawElementsSct.dataChartSct.length = 0;
			drawElementsSct.metricUnitChartSct = "ms";
			
			var data = [], i;

			function onDataReceived(series) {
				drawElementsSct.dataChartSct.push(series);
				cnocConnector.drawChartPerformanceSct(drawElementsSct.dataChartSct, container, false,"Ping");		
	       	}
			
			
	        for (i = 0; i < datos.records.record.length; i++) {
	        	data.push({
	        		x: datos.records.record[i].timestamp,
	        		y: parseInt(datos.records.record[i].nepingresptime, 10)
	        	});
	        }
	        
	        var dataChart = {color:"#0C66ED", name:"Ping", data: data};
			onDataReceived(dataChart);
			
		},drawCharCPU:function(datos, container, divTable){
			drawElementsSct.dataChartSct.length = 0;
			drawElementsSct.metricUnitChartSct = "% CPU Util";
			
			var data = [], i;

			function onDataReceived(series) {
				drawElementsSct.dataChartSct.push(series);
				cnocConnector.drawChartPerformanceSct(drawElementsSct.dataChartSct, container, false,"CPU Util");		
	       	}
			
			
	        for (i = 0; i < datos.records.record.length; i++) {
	        	data.push({
	        		x: datos.records.record[i].timestamp,
	        		y: parseInt(datos.records.record[i].cpuusage, 10)
	        	});
	        }
	        
	        var dataChart = {color:"#0C66ED", name:"CPU", data: data};
			onDataReceived(dataChart);
			
		},drawCharMem:function(datos, container, divTable){
			drawElementsSct.dataChartSct.length = 0;
			drawElementsSct.metricUnitChartSct = "% MEM Util";
			
			var data = [], i;

			function onDataReceived(series) {
				drawElementsSct.dataChartSct.push(series);
				cnocConnector.drawChartPerformanceSct(drawElementsSct.dataChartSct, container, false,"Memory Util");		
	       	}
			
			
	        for (i = 0; i < datos.records.record.length; i++) {
	        	data.push({
	        		x: datos.records.record[i].timestamp,
	        		y: parseInt(datos.records.record[i].memusage, 10)
	        	});
	        }
	        
	        var dataChart = {color:"#0C66ED", name:"MEM", data: data};
			onDataReceived(dataChart);
			
		},drawCharUtilInt:function(datos, container, divTable){
			drawElementsSct.dataChartSct.length = 0;
			drawElementsSct.metricUnitChartSct = "Octets Speed";
			
			function onDataReceived(series) {
				drawElementsSct.dataChartSct.push(series);
				cnocConnector.drawChartPerformanceSct(drawElementsSct.dataChartSct, container, true,"Octets Speed");		
	       	}
			
			var data = [], i;
			
	        for (i = 0; i < datos.records.record.length; i++) {
	        	data.push({
	        		x: datos.records.record[i].timestamp,
	        		y: parseFloat(datos.records.record[i].ifhcoutoctetsspeed)
	        	});
	        }
	        	        
	        var dataChart = {color:"#0C66ED", name:"Out Octets", data: data};
			onDataReceived(dataChart);
			
			/*********************************************************************/
			
			var data = [], i;
			
			for (i = 0; i < datos.records.record.length; i++) {
	        	data.push({
	        		x: datos.records.record[i].timestamp,
	        		y: parseFloat(datos.records.record[i].ifhcinoctetsspeed)
	        	});
	        }
	        
	        var dataChart = {color:"#2BC70D", name:"In Octets", data: data};
			onDataReceived(dataChart);
			
		},drawInterfaceErrors: function(){

			drawElementsSct.dataChartSct.length = 0;
			cnocConnector.invokeMashup(cnocConnector.service10, {"id":cnocConnector.nodeGlobal,"intf":drawElementsSct.interfazGlobal},drawElementsSct.drawCharErrDisc, "containerChartPingSct", "containerChartPingSctG");
		
		},drawCharErrDisc: function(datos, container, divTable){
			
			drawElementsSct.dataChartSct.length = 0;
			
			drawElementsSct.metricUnitChartSct = "ifinerrors";
			
			function onDataReceived(series) {
				drawElementsSct.dataChartSct.push(series);
				cnocConnector.drawChartPerformanceSct(drawElementsSct.dataChartSct, container, true,"ifinerrors");		
	       	}
			
			var data = [], i;
			
	        for (i = 0; i < datos.records.record.length; i++) {
	        	data.push({
	        		x: datos.records.record[i].timestamp,
	        		y: parseFloat(datos.records.record[i].ifinerrors)
	        	});
	        }
	        	        
	        var dataChart = {color:"#0C66ED", name:"ifinerrors", data: data};
			onDataReceived(dataChart);
			
			/********************************************************************************/
			
			var data = [], i;	
			
			for (i = 0; i < datos.records.record.length; i++) {
	        	data.push({
	        		x: datos.records.record[i].timestamp,
	        		y: parseFloat(datos.records.record[i].ifouterrors)
	        	});
	        }
	        
	        var dataChart = {color:"#2BC70D", name:"ifouterrors", data: data};
			onDataReceived(dataChart);
			
			/********************************************************************************/
			
			var data = [], i;	
			
			for (i = 0; i < datos.records.record.length; i++) {
	        	data.push({
	        		x: datos.records.record[i].timestamp,
	        		y: parseFloat(datos.records.record[i].ifindiscards)
	        	});
	        }
	        
	        var dataChart = {color:"#FF0D45", name:"ifindiscards", data: data};
			onDataReceived(dataChart);
			
			/********************************************************************************/
			
			var data = [], i;	
			
			for (i = 0; i < datos.records.record.length; i++) {
	        	data.push({
	        		x: datos.records.record[i].timestamp,
	        		y: parseFloat(datos.records.record[i].ifoutdiscards)
	        	});
	        }
	        
	        var dataChart = {color:"#33297A", name:"ifoutdiscards", data: data};
			onDataReceived(dataChart);
			
		}, setMarkersMap: function(datos, container) {
			
			var morelosState = new google.maps.LatLng(18.7318964, -99.0633631);

			var mapOptions = {
				zoom: 10,
				center: morelosState,
				mapTypeId: google.maps.MapTypeId.TERRAIN,
				styles: stylesMap
			};
			      
			var map = new google.maps.Map(document.getElementById(container), mapOptions);
			var mcOptions = {
					gridSize: 50,
					maxZoom: null,
					styles: [{
						height: 53,
						url: "https://google-maps-utility-library-v3.googlecode.com/svn/trunk/markerclusterer/images/m1.png",
						width: 53
						}]
				};
			var markers = [];
				  
			$.each(datos.records.record, function(key, value) {
//				site.push(value.ci_name);
				var latLng = new google.maps.LatLng(Number(value.latitude),
					Number(value.longitude));
				var marker = new google.maps.Marker({
					'position': latLng,
					title: value.ci_name
				});
				markers.push(marker);
			});
			
			var estados = polygons.mexico.records.record;

			for (var i = 0; i < estados.length; i++) {
				var estado = estados[i];
				var polygon = [];

				if("MORELOS" === estado['name'].toUpperCase() ) {
					var coords = estado['coords'];
					for (var j = 0; j < coords.length; j++) {
						var coord = coords[j];
						var point = new google.maps.LatLng(coord[1], coord[0]);
						polygon.push(point);
					}
			            
					mapaNacional = new google.maps.Polygon({
						paths: polygon,
						strokeColor: '#22FF00',
						strokeOpacity: 0.8,
						strokeWeight: 3,
						fillColor: '#22FF00',
						fillOpacity: 0.35
					});
					mapaNacional.setMap(map);
				}
			}
				  
			var markerCluster = new MarkerClusterer(map, markers, mcOptions);

		},gridAp: function(datos, container, divTable){
			var rowsData = new Array();
			try {
				if (datos.records.record.length > 1) {
					for ( var i = 0; i < datos.records.record.length; i++) {
						var fields = new Array();
						if(datos.records.record[i].status.toString() === "8"){
							fields.push("<span class=\"success\">Online</span>");
						}else{
							fields.push("<td class='danger'>Offline</td>");
						}
						
						fields.push(datos.records.record[i].apname.toString());
						fields.push(datos.records.record[i].mac.toString());
						fields.push(datos.records.record[i].aptype.toString());
						fields.push(datos.records.record[i].regionlocation.toString());
						rowsData.push(fields);
					}
				} else {
					var fields = new Array();
					fields.push(datos.records.record.status.toString());
					fields.push(datos.records.record.apname.toString());
					fields.push(datos.records.record.mac.toString());
					fields.push(datos.records.record.aptype.toString());
					fields.push(datos.records.record.regionlocation.toString());
					rowsData.push(fields);
				}
			} catch (err) {	};
			var rowsHeaders = [ {
				"sTitle" : "Status"
			}, {
				"sTitle" : "AP Name"
			}, {
				"sTitle" : "MAC"
			}, {
				"sTitle" : "AP Type"
			}, {
				"sTitle" : "Location"
			} ];
			cnocConnector.drawGrid(container, divTable, rowsData, rowsHeaders, false);
			
		},gridInterfacesFlow:function(datos, container, divTable){
			var rowsData = new Array();
			try {
				if (datos.records.record.length > 1) {
					for ( var i = 0; i < datos.records.record.length; i++) {
						var fields = new Array();						
						fields.push(datos.records.record[i].displayvalue.toString());
						fields.push(datos.records.record[i].in_bps.toString());
						fields.push(datos.records.record[i].in_per.toString());
						fields.push(datos.records.record[i].out_bps.toString());
						fields.push(datos.records.record[i].out_per.toString());
						rowsData.push(fields);
					}
				} else {
					var fields = new Array();
					fields.push(datos.records.record.displayvalue.toString());
					fields.push(datos.records.record.in_bps.toString());
					fields.push(datos.records.record.in_per.toString());
					fields.push(datos.records.record.out_bps.toString());
					fields.push(datos.records.record.out_per.toString());
					rowsData.push(fields);
				}
			} catch (err) {	};
			var rowsHeaders = [ {
				"sTitle" : "Interface Name"
			}, {
				"sTitle" : "Receiving Rate(bps)"
			}, {
				"sTitle" : "Inbound Bandwidth Usage"
			}, {
				"sTitle" : "Sending Rate(bps)"
			}, {
				"sTitle" : "Outbound Bandwidth Usage"
			} ];
			cnocConnector.drawGrid(container, divTable, rowsData, rowsHeaders, false);
		}, chartFilter_1: function(datos, container, divTable){
			
			var categorias = new Array();
			var up = new Array();
			var down = new Array();
			var i = 0;
			
			try {
				if (datos.records.record.length > 1) {
					for (i = 0; i < datos.records.record.length; i++) {
						categorias.push(datos.records.record[i].app_subtype_name.toString());
						up.push(parseInt(datos.records.record[i].up_bytes.toString()));
						down.push(parseInt(datos.records.record[i].down_bytes.toString()));						
					}
				} else {
					categorias.push(datos.records.record.app_subtype_name.toString());
					up.push(parseInt(datos.records.record.up_bytes.toString()));
					down.push(parseInt(datos.records.record.down_bytes.toString()));
				}
			} catch (err) {
				categorias = new Array();
				up = new Array();
				down = new Array();
			}
			
			var totalBytes = [{
				"name" : "UP Bytes",
				"data" : up,
				"color": "#0C66ED"
			},{
				"name" : "Down Bytes",
				"data" : down,
				"color": "#2BC70D"
			}];

			var optChart = cnocConnector.drawChartFilterSct("column", container, totalBytes, categorias, "Content Filtering Last Update", "");			
			chart = new Highcharts.Chart(optChart);			
			
		}, chartFilter_2: function(datos, container, divTable){
			drawElementsSct.dataChartSct.length = 0;
			
			drawElementsSct.metricUnitChartSct = "Bytes";
			
			function onDataReceived(series) {
				drawElementsSct.dataChartSct.push(series);
				cnocConnector.drawChartPerformanceSct(drawElementsSct.dataChartSct, container, false, drawElementsSct.filterContentLabel);		
	       	}
			
			var data = [], i;
			
	        for (i = 0; i < datos.records.record.length; i++) {
	        	var timestamp = (parseInt(datos.records.record[i].statistictime) * 1000); 
	        	data.push({
	        		x: timestamp,
	        		y: parseFloat(datos.records.record[i].up_bytes)
	        	});
	        }
	        	        
	        var dataChart = {color:"#0C66ED", name:"up_bytes", data: data};
			onDataReceived(dataChart);
			
			/*********************************************************************/
			
			var data = [], i;
			
			for (i = 0; i < datos.records.record.length; i++) {
				var timestamp = (parseInt(datos.records.record[i].statistictime) * 1000);
	        	data.push({
	        		x: timestamp,
	        		y: parseFloat(datos.records.record[i].down_bytes)
	        	});
	        }
	        
	        var dataChart = {color:"#2BC70D", name:"down_bytes", data: data};
			onDataReceived(dataChart);
			
		}, chartFilter_3: function(datos, container, divTable){
			console.log("filtro 3");
			console.log(datos);
			var categorias = new Array();
			var up = new Array();
			var down = new Array();
			var i = 0;
			
			try {
				if (datos.records.record.length > 1) {
					for (i = 0; i < datos.records.record.length; i++) {
						categorias.push(datos.records.record[i].app_name.toString());
						up.push(parseInt(datos.records.record[i].up_bytes.toString()));
						down.push(parseInt(datos.records.record[i].down_bytes.toString()));						
					}
				} else {
					categorias.push(datos.records.record.app_name.toString());
					up.push(parseInt(datos.records.record.up_bytes.toString()));
					down.push(parseInt(datos.records.record.down_bytes.toString()));
				}
			} catch (err) {
				categorias = new Array();
				up = new Array();
				down = new Array();
			}
			
			var totalBytes = [{
				"name" : "UP Bytes",
				"data" : up,
				"color": "#0C66ED"
			},{
				"name" : "Down Bytes",
				"data" : down,
				"color": "#2BC70D"
			}];

			var optChart = cnocConnector.drawChartFilterSct("column", container, totalBytes, categorias, "Content Filtering by APP", "");			
			chart = new Highcharts.Chart(optChart);			
			
		}
};