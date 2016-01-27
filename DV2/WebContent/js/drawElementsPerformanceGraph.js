/**
 * hmjavier
 * Clase para generar arrays que se inyectan a los elementos del DOM
 */

var drawElementsPerformanceGraph = {
		containerChart:"",
		containerChartIn:"",
		dataChartInterface : [],
		nodePerformance : "",
		nmis : "",
		idResourceInterfaz: "",
		intfNodePerformance:"",
		subtitlePerformance:"",
		chartIdPerformance:"",
		metricUnit:"",
		endUnix: "",
		endDate: "",
		startDate: "",
		vendor:"",
		nodeNameP : "",
		
		init : function(codeNet) {			
			if (codeNet != undefined) {
				
				this.builder(codeNet);
			
			} else {				
				cnocConnector.invokeMashup(cnocConnector.service9, {},drawElementsPerformanceGraph.selectCustom, "SelectCustomer", "opt");
			}

		},builder: function(codenet){		
			cnocConnector.invokeMashup(cnocConnector.service2, {"codenet" : codenet},drawElementsPerformanceGraph.drawListNodes, "listNodes", "listNodesP");
		},selectCustom : function(datos, selector, opt) {

			var selText = cnocConnector.drawSelect(datos, selector, "performanceGraph");		
			var codeNet = $("#SelectCustomer").val(); 
			drawElementsPerformanceGraph.builder(codeNet);

		},drawListNodes: function (datos, container, divTable){
			
			$( "#cmbNodesPerformanceC" ).mask("Waiting...");
			var selText = cnocConnector.drawSelectNodePerformanceGraph(datos, "SelectNode", "performance");

		},drawChartHealth:function(name){
			drawElementsPerformanceGraph.chartIdPerformance = "1";
			drawElementsPerformanceGraph.subtitlePerformance = "";
			drawElementsPerformanceGraph.metricUnit = "";
			drawElementsPerformanceGraph.subtitlePerformance = "Availability";
			drawElementsPerformanceGraph.metricUnit = "% Health Statistics";
			var availability = {"jsonRequest":'{"model":"nmis_graph","model_view":"graph","parameters":{"'+drawElementsPerformanceGraph.endUnix+'":"'+drawElementsPerformanceGraph.endDate+'","end_date_raw":'+drawElementsPerformanceGraph.endUnix+',"start_date_raw":'+drawElementsPerformanceGraph.startDate+',"graph_type":"health","node":"'+name+'","translation":"","field":""}}',"ip":drawElementsPerformanceGraph.nmis};
			drawElementsPerformanceGraph.drawChartsPerformance(cnocConnector.service1, availability, drawElementsPerformanceGraph.containerChart, "availability", "#0C66ED", false, name);
			
		},drawChartCPU: function(name){
			drawElementsPerformanceGraph.chartIdPerformance = "1";
			drawElementsPerformanceGraph.subtitlePerformance = "";
			drawElementsPerformanceGraph.metricUnit = "";
			drawElementsPerformanceGraph.subtitlePerformance = "CPU Util";
			drawElementsPerformanceGraph.metricUnit = "% CPU Util.";
			var cpu = {"jsonRequest":'{"model":"nmis_graph","model_view":"graph","parameters":{"'+drawElementsPerformanceGraph.endUnix+'":"'+drawElementsPerformanceGraph.endDate+'","end_date_raw":'+drawElementsPerformanceGraph.endUnix+',"start_date_raw":'+drawElementsPerformanceGraph.startDate+',"graph_type":"cpu","node":"'+name+'","translation":"","field":""}}',"ip":drawElementsPerformanceGraph.nmis};
			drawElementsPerformanceGraph.drawChartsPerformance(cnocConnector.service1, cpu, drawElementsPerformanceGraph.containerChart, "cpu", "#0C66ED", false, name);	
			
		},drawChartResponseTime: function(name){
			drawElementsPerformanceGraph.chartIdPerformance = "1";
			drawElementsPerformanceGraph.subtitlePerformance = "";
			drawElementsPerformanceGraph.metricUnit = "";
			drawElementsPerformanceGraph.subtitlePerformance = "Response Time";
			drawElementsPerformanceGraph.metricUnit = "Milliseconds";
			var responsetime = {"jsonRequest":'{"model":"nmis_rrd","model_view":"graph","parameters":{"'+drawElementsPerformanceGraph.endUnix+'":"'+drawElementsPerformanceGraph.endDate+'","end_date_raw":'+drawElementsPerformanceGraph.endUnix+',"start_date_raw":'+drawElementsPerformanceGraph.startDate+',"graph_type":"health","node":"'+name+'","resource":"health","translation":"","field":"responsetime"}}',"ip":drawElementsPerformanceGraph.nmis};			
											  // {"model":"nmis_rrd","model_view":"graph","parameters":{"start_date_raw":1422921507,"end_date_raw":1423526307,"period":"7d","update_time_from_window":1,"resource_index":"","graph_type":"health","index_graph_type":"","axis":"0","node":"SBM_001015_VALLE_RT01","resource":"health","translation":"","field":"responsetime"},"options":{"gui_component_mode":1,"titleText":"SBM_001015_VALLE_RT01 -- responsetime","xAxisType":"datetime"},"data_source":"local_nmis"}
			
			
			drawElementsPerformanceGraph.drawChartsPerformance(cnocConnector.service1, responsetime, drawElementsPerformanceGraph.containerChart, "Response Time", "#0C66ED", false, name);	
			
		},drawChartMemoryIO: function(name){
			drawElementsPerformanceGraph.chartIdPerformance = "2";
			drawElementsPerformanceGraph.subtitlePerformance = "";
			drawElementsPerformanceGraph.idResourceInterfaz = "";
			drawElementsPerformanceGraph.metricUnit = "% Mem. Utilisation";
			drawElementsPerformanceGraph.subtitlePerformance = "Mem Util IO";
			var MemoryIO = {"jsonRequest":'{"model":"nmis_graph","model_view":"graph","parameters":{"'+drawElementsPerformanceGraph.endUnix+'":"'+drawElementsPerformanceGraph.endDate+'","end_date_raw":'+drawElementsPerformanceGraph.endUnix+',"start_date_raw":'+drawElementsPerformanceGraph.startDate+',"graph_type":"mem-io","node":"'+name+'","translation":"","resource":"nodehealth","field":""}}',"ip":drawElementsPerformanceGraph.nmis};
			drawElementsPerformanceGraph.drawChartsPerformance(cnocConnector.service1, MemoryIO, drawElementsPerformanceGraph.containerChart, "MemoryIO", "#0C66ED", false, name);

		},drawChartMemoryProc: function(name){
			
			drawElementsPerformanceGraph.chartIdPerformance = "3";
			drawElementsPerformanceGraph.subtitlePerformance = "";
			drawElementsPerformanceGraph.idResourceInterfaz = "";
			drawElementsPerformanceGraph.metricUnit = "% Mem. Utilisation";
			drawElementsPerformanceGraph.subtitlePerformance = "Mem Util PROC";

			var MemoryProc = {"jsonRequest":'{"model":"nmis_graph","model_view":"graph","parameters":{"'+drawElementsPerformanceGraph.endUnix+'":"'+drawElementsPerformanceGraph.endDate+'","end_date_raw":'+drawElementsPerformanceGraph.endUnix+',"start_date_raw":'+drawElementsPerformanceGraph.startDate+',"graph_type":"mem-proc","node":"'+name+'","translation":"","resource":"nodehealth","field":""}}',"ip":drawElementsPerformanceGraph.nmis};
			drawElementsPerformanceGraph.drawChartsPerformance(cnocConnector.service1, MemoryProc, drawElementsPerformanceGraph.containerChart, "MemoryProc", "#0C66ED", false, name);
		},drawInterfaceUtil: function(name, idResourceInterfaz, unidad, referencia){

			drawElementsPerformanceGraph.chartIdPerformance = "4";
			drawElementsPerformanceGraph.subtitlePerformance = "";
			drawElementsPerformanceGraph.metricUnit = "";
			if(unidad==="autil"){
				drawElementsPerformanceGraph.metricUnit = "% Avg Util ";
			}else if(unidad==="abits"){
				drawElementsPerformanceGraph.metricUnit = "Avg bps ";
			}
			var autil = {"jsonRequest":'{"model":"nmis_graph","model_view":"graph","parameters":{"'+drawElementsPerformanceGraph.endUnix+'":"'+drawElementsPerformanceGraph.endDate+'","end_date_raw":'+drawElementsPerformanceGraph.endUnix+',"start_date_raw":'+drawElementsPerformanceGraph.startDate+',"lineType": "line", "graph_type":"interface","index_graph_type": "'+unidad+'","resource_index": "'+idResourceInterfaz+'","node":"'+name+'","translation":"","field":"","item":"","axis":"0"}}',"ip":drawElementsPerformanceGraph.nmis};
			drawElementsPerformanceGraph.drawChartsPerformance(cnocConnector.service1, autil, drawElementsPerformanceGraph.containerChart, "autil", null, false, name+" - "+referencia);
			
		},drawInterfaceErrors: function(name, idResourceInterfaz){
			drawElementsPerformanceGraph.chartIdPerformance = "5";
			drawElementsPerformanceGraph.metricUnit = "";
			drawElementsPerformanceGraph.metricUnit = "Percentage";
			
			var errpkts_hc = {"jsonRequest":'{"model":"nmis_graph","model_view":"graph","parameters":{"'+drawElementsPerformanceGraph.endUnix+'":"'+drawElementsPerformanceGraph.endDate+'","end_date_raw":'+drawElementsPerformanceGraph.endUnix+',"start_date_raw":'+drawElementsPerformanceGraph.startDate+',"lineType": "line", "graph_type":"pkts_hc","index_graph_type": "errpkts_hc","resource_index": "'+idResourceInterfaz+'","node":"'+name+'","translation":"","field":"","item":"","axis":"0"}}',"ip":drawElementsPerformanceGraph.nmis};
			drawElementsPerformanceGraph.drawChartsPerformance(cnocConnector.service1, errpkts_hc, drawElementsPerformanceGraph.containerChart, "errpkts_hc",null, true, name);
			
		},drawInterfacePkts: function(name, idResourceInterfaz){
			drawElementsPerformanceGraph.chartIdPerformance = "6";
			drawElementsPerformanceGraph.metricUnit = "";
			drawElementsPerformanceGraph.subtitlePerformance += drawElementsPerformanceGraph.intfNodePerformance;
			drawElementsPerformanceGraph.metricUnit = "Packets/Second";
						
			var pkts_hc = {"jsonRequest":'{"model":"nmis_graph","model_view":"graph","parameters":{"'+drawElementsPerformanceGraph.endUnix+'":"'+drawElementsPerformanceGraph.endDate+'","end_date_raw":'+drawElementsPerformanceGraph.endUnix+',"start_date_raw":'+drawElementsPerformanceGraph.startDate+',"lineType": "line", "graph_type":"pkts_hc","index_graph_type": "pkts_hc","resource_index": "'+idResourceInterfaz+'","node":"'+name+'","translation":"","field":"","item":"","axis":"0"}}',"ip":drawElementsPerformanceGraph.nmis};			
			drawElementsPerformanceGraph.drawChartsPerformance(cnocConnector.service1, pkts_hc, drawElementsPerformanceGraph.containerChart, "pkts_hc",null, true, name);

		},drawInterfaceQos: function(name, idResourceInterfaz){
			drawElementsPerformanceGraph.chartIdPerformance = "7";
			drawElementsPerformanceGraph.metricUnit = "";
			drawElementsPerformanceGraph.subtitlePerformance = "";
			var qos =  {"jsonRequest":'{"model":"nmis_graph","model_view":"graph","parameters":{"'+drawElementsPerformanceGraph.endUnix+'":"'+drawElementsPerformanceGraph.endDate+'","end_date_raw":'+drawElementsPerformanceGraph.endUnix+',"start_date_raw":'+drawElementsPerformanceGraph.startDate+',"graph_type":"cbqos-out","index_graph_type": "cbqos-out","resource_index": "'+idResourceInterfaz+'","node":"'+name+'","translation":"","field":"","item":""}}',"ip":drawElementsPerformanceGraph.nmis};
			drawElementsPerformanceGraph.drawChartsPerformance(cnocConnector.service1, qos, drawElementsPerformanceGraph.containerChart, "qos",null, true, name);

			
		},drawInterfaceQosIn: function(name, idResourceInterfaz){
			drawElementsPerformanceGraph.chartIdPerformance = "7";
			drawElementsPerformanceGraph.metricUnit = "";
			drawElementsPerformanceGraph.subtitlePerformance ="";
			
			var qosIn =  {"jsonRequest":'{"model":"nmis_graph","model_view":"graph","parameters":{"'+drawElementsPerformanceGraph.endUnix+'":"'+drawElementsPerformanceGraph.endDate+'","end_date_raw":'+drawElementsPerformanceGraph.endUnix+',"start_date_raw":'+drawElementsPerformanceGraph.startDate+',"graph_type":"cbqos-in","index_graph_type": "cbqos-in","resource_index": "'+idResourceInterfaz+'","node":"'+name+'","translation":"","field":"","item":""}}',"ip":drawElementsPerformanceGraph.nmis};
			drawElementsPerformanceGraph.drawChartsPerformance(cnocConnector.service1, qosIn, drawElementsPerformanceGraph.containerChartIn, "qos",null, true, name);

		},drawInterfaceQosHuawei: function(name, idResourceInterfaz, subtitleQos){
			console.log(drawElementsPerformanceGraph.nodeNameP);
			drawElementsPerformanceGraph.chartIdPerformance = "8";
			drawElementsPerformanceGraph.subtitlePerformance = "";
			drawElementsPerformanceGraph.metricUnit = "AVG Bytes.";
			
			var qos =  {"jsonRequest":'{"model":"nmis_graph","model_view":"graph","parameters":{"'+drawElementsPerformanceGraph.endUnix+'":"'+drawElementsPerformanceGraph.endDate+'","end_date_raw":'+drawElementsPerformanceGraph.endUnix+',"start_date_raw":'+drawElementsPerformanceGraph.startDate+',"graph_type":"QualityOfServiceStat","index_graph_type": "QualityOfServiceStat","resource_index": "'+idResourceInterfaz+'","node":"'+drawElementsPerformanceGraph.nodeNameP+'","translation":"","field":"","item":""}}',"ip":drawElementsPerformanceGraph.nmis};
			drawElementsPerformanceGraph.drawChartsPerformance(cnocConnector.service1, qos, drawElementsPerformanceGraph.containerChart, "QosHuawei",null, true, drawElementsPerformanceGraph.nodeNameP, subtitleQos);
						
		},drawChartCPUHuawei: function(name){
			drawElementsPerformanceGraph.chartIdPerformance = "1";
			drawElementsPerformanceGraph.subtitlePerformance = "";
			drawElementsPerformanceGraph.metricUnit = "";
			drawElementsPerformanceGraph.subtitlePerformance = "CPU Util";
			drawElementsPerformanceGraph.metricUnit = "% CPU Util.";
			var cpu = {"jsonRequest":'{"model":"nmis_graph","model_view":"graph","parameters":{"'+drawElementsPerformanceGraph.endUnix+'":"'+drawElementsPerformanceGraph.endDate+'","end_date_raw":'+drawElementsPerformanceGraph.endUnix+',"start_date_raw":'+drawElementsPerformanceGraph.startDate+',"graph_type":"cpu-huawei","node":"'+name+'","translation":"","field":""}}',"ip":drawElementsPerformanceGraph.nmis};
			drawElementsPerformanceGraph.drawChartsPerformance(cnocConnector.service1, cpu, drawElementsPerformanceGraph.containerChart, "cpu", "#0C66ED", false, name);	
			
		},drawChartMemHuawei: function(name){
			drawElementsPerformanceGraph.chartIdPerformance = "9";
			drawElementsPerformanceGraph.subtitlePerformance = "";
			drawElementsPerformanceGraph.metricUnit = "";
			drawElementsPerformanceGraph.subtitlePerformance = "Memory Util";
			drawElementsPerformanceGraph.metricUnit = "% Memory Util.";
			var memoryH = {"jsonRequest":'{"model":"nmis_graph","model_view":"graph","parameters":{"'+drawElementsPerformanceGraph.endUnix+'":"'+drawElementsPerformanceGraph.endDate+'","end_date_raw":'+drawElementsPerformanceGraph.endUnix+',"start_date_raw":'+drawElementsPerformanceGraph.startDate+',"graph_type":"mem-proc-huawei","node":"'+name+'","translation":"","field":""}}',"ip":drawElementsPerformanceGraph.nmis};
			
			drawElementsPerformanceGraph.drawChartsPerformance(cnocConnector.service1, memoryH, drawElementsPerformanceGraph.containerChart, "memoryH", "#0C66ED", false, name);

			
		},drawChartsPerformance: function(url, params, container, labelMetric, color, otherMetrics, name, subQosHuawei){
			
			var containerT =  container.split("-");
			var result =  containerT[1] %= 2;
			
			var dataChartPerformance = [];
			
			function onDataReceived(series) {
				dataChartPerformance.push(series);				
				cnocConnector.drawChartPerformanceGraph(dataChartPerformance, container, otherMetrics, name);
	       	}
						
				if(result == 1){
					$("#containerChartPerformance1").append("<div id="+container+" class='panel panel-primary'><div>");
				}else{
					$("#containerChartPerformance2").append("<div id="+container+" class='panel panel-primary'><div>");
				}

				$.ajax({
		   			type : 'GET',
		   			dataType : 'jsonp',
		   			url : url,
		   			data : params,
		   			error : function(jqXHR, textStatus, errorThrown) {
		   				console.log(jqXHR);
		   			},
		   			success: function(response) {	
		   				var dataChart = "";
		   				if(labelMetric === "pkts_hc" || labelMetric === "autil" || labelMetric === "errpkts_hc" || labelMetric === "cpu" || labelMetric === "availability" || labelMetric === "MemoryIO" || labelMetric === "MemoryProc" || labelMetric === "autil" || labelMetric === "errpkts_hc" || labelMetric === "qos" || labelMetric === "memoryH" || labelMetric === "QosHuawei" || labelMetric === "responsetime"){	   					
		   					var json = response.replyData.data;
		   					var colorP = ["#0FFF00","#FFBB00","#0061FF","#33297A","#A80DFF","#C4FF0D","#FF0D45","#FF8A0D"];
		   					for(var idx=0; idx<json.length; idx++){
		   						dataChart = "";
		   						var jsonData = response.replyData.data[idx].data;
		   						var nameGraph = response.replyData.data[idx].name;
		   						
		   						if(labelMetric === "autil"){
		   							drawElementsPerformanceGraph.subtitlePerformance = response.replyData.options.titleText;
		   						}else if(labelMetric === "QosHuawei"){
		   							drawElementsPerformanceGraph.subtitlePerformance = subQosHuawei;
		   						}
		   						
		   						dataChart = {color:colorP[idx], name:nameGraph, data: jsonData};
		   						onDataReceived(dataChart);
		   					}
		   				}else{
		   					dataChart = {color:color, name:labelMetric, data: response.replyData.data[0].data};
		   					onDataReceived(dataChart);
		   				}	   				
		   				
		   			}
		   		});
			
		},drawInterfacesNodes:function(datos) {
						
			$( "#cmbNodesPerformanceInterfazC" ).mask("Waiting...");
			try{
				if (datos.results.datum.length > 1) {
					for(var i=0; i<datos.results.datum.length; i++){
						var nodeTmp = datos.results.datum[i].url.toString().split("/");
						var node = nodeTmp[5];
						var interfaces = node +"|"+datos.results.datum[i].tokens[1]+"|"+datos.results.datum[i].value+"|"+drawElementsPerformanceGraph.nmis+"|"+datos.results.datum[i].tokens[0];
						drawElementsPerformanceGraph.dataChartInterface.push(interfaces);
					}					
				}else{
					var nodeTmp = datos.results.datum.url.toString().split("/");
					var node = nodeTmp[5];
					var interfaces = node +"|"+datos.results.datum.tokens[1]+"|"+datos.results.datum.value+"|"+drawElementsPerformanceGraph.nmis+"|"+datos.results.datum.tokens[0];
					drawElementsPerformanceGraph.dataChartInterface.push(interfaces);
				}
			}catch(e){
				console.log(e);
			}		

			$("#cmbNodesPerformanceInterfaz").empty();
			$("#cmbNodesPerformanceInterfaz").append("<select id='cmbInterfazGraph' data-placeholder='Select Interfaz' multiple='multiple' style='width:100%; margin-left: 5%;' ></select>");
			
			if (drawElementsPerformanceGraph.dataChartInterface.length > 1) {
				
				for ( var i = 0; i < drawElementsPerformanceGraph.dataChartInterface.length; i++) {
					var data = drawElementsPerformanceGraph.dataChartInterface[i].toString().split("|");
					
					jQuery("#cmbInterfazGraph").append(
							"<option value='"
									+ data[0]+"|"+data[2]+"|"+data[3]+"|"+data[4]+"'>"
									+ data[0]+"|"+data[1]
									+ "</option>");
				}
			}else{
				var data = drawElementsPerformanceGraph.dataChartInterface.toString().split("|");
				
				jQuery("#cmbInterfazGraph").append(
						"<option value='"
								+ data[0]+"|"+data[2]+"|"+data[3]+"|"+data[4]+"'>"
								+ data[0]+"|"+data[1]
								+ "</option>");
			}
			
 			
 			$('#cmbInterfazGraph').multiselect({
	        	includeSelectAllOption: true,
	        	enableFiltering: true,
	        	maxHeight: 450
	        });

 			$( "#cmbNodesPerformanceInterfazC" ).unmask();
 			
 			
		},drawInterfacesQosHuawei:function(datos){
			console.log(datos);
			$( "#cmbNodesPerformanceInterfazC" ).mask("Waiting...");
			try{
				if (datos.results.datum.length > 1) {				
					
					for(var i=0; i<datos.results.datum.length; i++){						
						var nodeTmp = datos.results.datum[i].url.toString().replace("/en").split("/");
						console.log(nodeTmp);
						var node = nodeTmp[4];
						console.log(node);
						var interfaces = node +"|"+datos.results.datum[i].value.toString()+"|"+drawElementsPerformanceGraph.nmis+"|"+datos.results.datum[i].tokens[0];
						drawElementsPerformanceGraph.dataChartInterface.push(interfaces);
					}					
				}else{
					var nodeTmp = datos.results.datum.url.toString().replace("/en").split("/");
					var node = nodeTmp[3];
					var interfaces = node +"|"+datos.results.datum.value.toString()+"|"+drawElementsPerformanceGraph.nmis+"|"+datos.results.datum.tokens[0];
					drawElementsPerformanceGraph.dataChartInterface.push(interfaces);
				}
			}catch(e){
				console.log(e);
			}
			
			$("#cmbNodesPerformanceInterfaz").empty();
			$("#cmbNodesPerformanceInterfaz").append("<select id='cmbInterfazGraph' data-placeholder='Select Interfaz' multiple='multiple' style='width:100%; margin-left: 5%;' ></select>");
			
			if (drawElementsPerformanceGraph.dataChartInterface.length > 1) {
				
				for ( var i = 0; i < drawElementsPerformanceGraph.dataChartInterface.length; i++) {
					var data = drawElementsPerformanceGraph.dataChartInterface[i].toString().split("|");

					if(data[3].indexOf("mark") < 0){
						var name = data[3]; 
						var tmpId = (data[1]).split(".");
						
						if(tmpId[2] === "1"){
							name = name +" - inbound";
						}else if(tmpId[2] === "2"){
							name = name +" - outbound";
						}
						
						
						jQuery("#cmbInterfazGraph").append(
								"<option value='"
										+ data[0]+"|"+data[1]+"|"+data[2]+"|"+name+"|HuaweiRouter'>"
										+ data[0]+"|"+name
										+ "</option>");
					}					
				}
			}else{
				var data = drawElementsPerformanceGraph.dataChartInterface.toString().split("|");
				var name = data[3]; 
				var tmpId = (data[1]).split(".");
				
				if(tmpId[2] === "1"){
					name = name +" - inbound";
				}else if(tmpId[2] === "2"){
					name = name +" - outbound";
				}
				
				if(data[3].indexOf("mark") < 0){
					jQuery("#cmbInterfazGraph").append(
							"<option value='"
										+ data[0]+"|"+data[1]+"|"+data[2]+"|"+name+"|HuaweiRouter'>"
										+ data[0]+"|"+ name
									+ "</option>");
				}				
			}
			
 			
 			$('#cmbInterfazGraph').multiselect({
	        	includeSelectAllOption: true,
	        	enableFiltering: true,
	        	maxHeight: 450
	        });

 			$( "#cmbNodesPerformanceInterfazC" ).unmask();

		},refreshChart:function(){
			
			var startDate = ((new Date().getTime()).toString()).substring(0,10)-86400;
			var endDate = ((new Date().getTime()).toString()).substring(0,10);
			
			drawElementsPerformanceGraph.dataChartPerformance.length = 0;
			drawElementsPerformanceGraph.endUnix = endDate;
			drawElementsPerformanceGraph.endDate = "";
			drawElementsPerformanceGraph.startDate = startDate;
			
			if(drawElementsPerformanceGraph.chartIdPerformance === "1"){
				drawElementsPerformanceGraph.drawChartCPU();
			}else if(drawElementsPerformanceGraph.chartIdPerformance === "2"){
				drawElementsPerformanceGraph.drawChartMemoryIO();
			}
		}		
};