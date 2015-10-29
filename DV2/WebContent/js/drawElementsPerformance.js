/**
 * hmjavier
 * Clase para generar arrays que se inyectan a los elementos del DOM
 */

var drawElementsPerformance = {
		dataChartPerformance : [],		
		dataChartPerformanceUtil : [],		
		nodePerformance : "",
		nmis : "",
		idResourceInterfaz: "",
		intfNodePerformance:"",
		subtitlePerformance:"",
		chartIdPerformance:"",
		endUnix: "",
		endDate: "",
		startDate: "",
		vendor:"",
		qosIn:"",
		bgp:false,
		
		init : function(codeNet) {

			if (codeNet != undefined) {
				
				this.builder(codeNet);
			
			} else {
				
				cnocConnector.invokeMashup(cnocConnector.service9, {},drawElementsPerformance.selectCustom, "SelectCustomer", "opt");
			}

		},builder: function(codenet){	
			
			cnocConnector.invokeMashup(cnocConnector.service2, {"codenet" : codenet},drawElementsPerformance.drawListNodes, "listNodes", "listNodesP");
		
		},selectCustom : function(datos, selector, opt) {

			var selText = cnocConnector.drawSelect(datos, selector, "performance");
			
			var codeNet = $("#SelectCustomer").val();

			drawElementsPerformance.builder(codeNet);

		},drawListNodes: function (datos, container, divTable){

			var selText = cnocConnector.drawSelectNodePerformance(datos, "SelectNode", "performance");
		
		},selectPingOnly:function(){
			$("#treeContainerInterfaz").empty();			
			
			var msg = '</br><div class="alert alert-info" >Note: Ping Only</br></div>';
			$("#treeContainerInterfaz").append(msg);
			
			
			$("#treeContainerInterfaz").append("<div class='tree' id='treeNodeDetailInterfaz'>");	
			
			var tree = "<ul>";
			tree += "<li><span class='treeNode badge badge-success'><i class='icon-minus-sign'></i> Performance </span><ul>";
			tree += "<li id='healthP' class='healthP'><span class='treeNode'><i class='icon-minus-sign'><a href='#nodeChart'>Health</a></i></span></li>";
			tree += "<li id='responseP' class='responseP'><span class='treeNode'><i class='icon-minus-sign'><a href='#nodeChart'>Response</a></i></span></li>";
			tree += "</ul></li>";
			tree += "</ul></li></ul>";
			
			$("#treeNodeDetailInterfaz").append(tree);
			
			cnocConnector.drawTree();
			
			$( ".healthP" ).click(function() {
				drawElementsPerformance.drawChartHealth();
			});
			
			$( ".responseP" ).click(function() {
				drawElementsPerformance.drawChartResponse();
			});
			
		},selectUps:function(){
			$("#treeContainerInterfaz").empty();			
			$("#treeContainerInterfaz").append("<div class='tree' id='treeNodeDetailInterfaz'>");	
			
			var tree = "<ul>";
			tree += "<li><span class='treeNode badge badge-success'><i class='icon-minus-sign'></i> Performance </span><ul>";
			tree += "<li id='healthP' class='healthP'><span class='treeNode'><i class='icon-minus-sign'><a href='#nodeChart'>Health</a></i></span></li>";
			tree += "<li id=''><span class='treeNodeDetailInterfaz badge label-success'><i class='icon-minus-sign'>Battery</i></span><ul>";
			tree += "<li id='UpsBatteryRemaing' class='UpsBatteryRemaing'><span class='treeNode '><i class='icon-minus-sign'><a href='#nodeChart'>Battery Remaing</a></i></span></li></ul>";
			
			tree += "<li id=''><span class='treeNodeDetailInterfaz badge label-success'><i class='icon-minus-sign'>Voltage</i></span><ul>";
			tree += "<li id='inputVolt' class='inputVolt'><span class='treeNode '><i class='icon-minus-sign'><a href='#nodeChart'>Input Volt</a></i></span></li>";
			tree += "<li id='outputVolt' class='outputVolt'><span class='treeNode '><i class='icon-minus-sign'><a href='#nodeChart'>Output Volt</a></i></span></li>";
			tree += "</ul></li>";
			tree += "</ul></li></ul>";
			
			$("#treeNodeDetailInterfaz").append(tree);
			
			cnocConnector.drawTree();			
			
			$( ".healthP" ).click(function() {
				drawElementsPerformance.drawChartHealth();
			});
			
			$( ".UpsBatteryRemaing" ).click(function() {
				drawElementsPerformance.drawChartUpsBatRemaing();
			});
			
			$( ".inputVolt" ).click(function() {
				drawElementsPerformance.drawChartUpsInVolt();
			});
			
			$( ".outputVolt" ).click(function() {
				drawElementsPerformance.drawChartUpsOutVolt();
			});
			
		},selectInterfaz : function(datos, selector, opt) {
						
			$("#treeContainerInterfaz").empty();			
			
			$("#treeContainerInterfaz").append("<div class='tree' id='treeNodeDetailInterfaz'>");
			
			var tree = "<ul>";	

			if(drawElementsPerformance.vendor === "HuaweiRouter"){
				tree += "<li><span class='treeNode badge badge-success'><i class='icon-minus-sign'></i> Performance HUAWEI</span><ul>";
				tree += "<li id='healthP' class='healthP'><span class='treeNode'><i class='icon-minus-sign'><a href='#nodeChart'>Health</a></i></span></li>";
				tree += "<li id='cpuPH' class='cpuPH'><span class='treeNode'><i class='icon-minus-sign'><a href='#nodeChart'>CPU</a></i></span></li>";
				tree += "<li id='healthRT' class='healthRT'><span class='treeNode'><i class='icon-minus-sign'><a href='#nodeChart'>Response Time</a></i></span></li>";
				tree += "<li id=''><span class='treeNodeDetailInterfaz badge label-success'><i class='icon-minus-sign'>Memory</i></span><ul>";
				tree += "<li id='memProcH' class='memProcH'><span class='treeNode '><i class='icon-minus-sign'><a href='#nodeChart'>Memory Proc</a></i></span></li>";
				tree += "</ul></li>";
				tree += "</ul></li></ul>";
				tree += "<ul>";

				endpoint = "http://"+drawElementsPerformance.nmis+"/omk/opCharts/nodes/"+drawElementsPerformance.nodePerformance+"/resources/QualityOfServiceStat/indicies.json";
				
				cnocConnector.invokeMashup(cnocConnector.service1, {
					"endpoint" : endpoint,
					"ip":drawElementsPerformance.nmis
				},function(datos){					

					tree = "<ul>";
					
					tree += "<li><span class='treeNode badge badge-success'><i class='icon-minus-sign'></i>QOS</span><ul>";
					
					for(var i=0; i<datos.results.datum.length; i++){
						var name = datos.results.datum[i].tokens[0].toString();
						
						if(name.indexOf("mark") < 0){
							var tmpId = (datos.results.datum[i].value).split(".");
							if(tmpId[2] === "1"){
								name = name +" - inbound";
							}else if(tmpId[2] === "2"){
								name = name +" - outbound";
							}

							tree+= "<li class='qosHuawei' id="+datos.results.datum[i].value.toString()+"><span class='treeNode'><i class='icon-minus-sign'><a href='#nodeChart'>"+name+"</a></i></span>";
						}						
					}
					tree += "</ul></li>";
					
					tree += "</ul>";
					
					
					$("#treeNodeDetailInterfaz").append(tree);
					
					cnocConnector.drawTree();
					
					
					$( ".qosHuawei" ).click(function() {

						drawElementsPerformance.subtitlePerformance = "";								
						drawElementsPerformance.idResourceInterfaz = "";
						var idResourceInterfaz = "";		
						
						try{
							idResourceInterfaz =  $(this).attr( 'id' );
							drawElementsPerformance.subtitlePerformance = $(this).text(); 
						}catch(e){
							console.log(e);
							drawElementsPerformance.intfNodePerformance = $(this).text();
						}				
						drawElementsPerformance.drawInterfaceQosHuawei(idResourceInterfaz);
					});
					
					
				}, "", "");
			}else{
				tree += "<li><span class='treeNode badge badge-success'><i class='icon-minus-sign'></i> Performance </span><ul>";
				tree += "<li id='healthP' class='healthP'><span class='treeNode'><i class='icon-minus-sign'><a href='#nodeChart'>Health</a></i></span></li>";
				tree += "<li id='cpuP' class='cpuP'><span class='treeNode'><i class='icon-minus-sign'><a href='#nodeChart'>CPU</a></i></span></li>";
				tree += "<li id='healthRT' class='healthRT'><span class='treeNode'><i class='icon-minus-sign'><a href='#nodeChart'>Response Time</a></i></span></li>";
				tree += "<li id=''><span class='treeNodeDetailInterfaz badge label-success'><i class='icon-minus-sign'>Memory</i></span><ul>";
				tree += "<li id='memProc' class='memProc'><span class='treeNode '><i class='icon-minus-sign'><a href='#nodeChart'>Memory Proc</a></i></span></li>";
				tree += "<li id='memIo' class='memIo'><span class='treeNode '><a href='#nodeChart'>Memory I/O</a></span></li>";
				tree += "</ul></li>";
				tree += "</ul></li></ul>";
				tree += "<ul>";

			}
			
			tree += "<li><span class='treeNode badge badge-success'><i class='icon-minus-sign'></i> Interface </span><ul>";
			try {
				
				console.log(datos.results.datum.length);
				console.log(datos.results.datum);
				if (datos.results.datum.length > 1) {
					for(var i=0; i<datos.results.datum.length; i++){
						tree+= "<li class=''><span class='treeNode'><i class='icon-minus-sign intfChart'><a href='#nodeChart'>"+datos.results.datum[i].name.toString()+" -- "+datos.results.datum[i].value.toString()+"</a></i></span>";
						
						var tmp = datos.results.datum[i].name.toString().split("--");						
						
						if(tmp[1].trim() === drawElementsGral.intTops){
							drawElementsPerformance.dataChartPerformanceUtil.length = 0;
							drawElementsPerformance.intfNodePerformance = tmp[0]+ " -- " +tmp[1];
							drawElementsPerformance.idResourceInterfaz = datos.results.datum[i].value.toString();
							drawElementsPerformance.drawInterfaceUtil("autil","containerChartPerformanceInterfaz");
						}
						
						if(datos.results.datum[i].active.toString() === "1"){
							tree+= "<ul><li><span class='treeNode badge badge-warning'><i class='icon-minus-sign'></i>QOS</span><ul>";
							if(datos.results.datum[i].classes.length > 1){
								for(var j=1; j<datos.results.datum[i].classes.length; j ++){
									tree+= "<li><span class='treeNode'><i id='"+datos.results.datum[i].name.toString()+" -- "+datos.results.datum[i].value.toString()+"' class='intfChartQos'><a href='#nodeChart'>"+datos.results.datum[i].classes[j]+"</a></i></span></li>";
								}
							}else{
								tree+= "<li><span class='treeNode'><i id='"+datos.results.datum[i].name.toString()+" -- "+datos.results.datum[i].value.toString()+"' class='intfChartQos'><a href='#nodeChart'>"+datos.results.datum[i].classes+"</a></i></span></li>";
							}
							
							tree+= "</ul></li></ul>";
						}
						tree+="</li>";
					}					
				}else{
					tree+= "<li class=''><span class='treeNode'><i class='icon-minus-sign intfChart'><a href='#nodeChart'>"+datos.results.datum.name.toString()+" -- "+datos.results.datum.value.toString()+"</a></i></span>";
					
					var tmp = datos.results.datum.name.toString().split("--");						
					
					if(tmp[1].trim() === drawElementsGral.intTops){
						drawElementsPerformance.dataChartPerformanceUtil.length = 0;
						drawElementsPerformance.intfNodePerformance = tmp[0]+ " -- " +tmp[1];
						drawElementsPerformance.idResourceInterfaz = datos.results.datum.value.toString();
						drawElementsPerformance.drawInterfaceUtil("autil","containerChartPerformanceInterfaz");
					}
					
					if(datos.results.datum.active.toString() === "1"){
						tree+= "<ul><li><span class='treeNode badge badge-warning'><i class='icon-minus-sign'></i>QOS</span><ul>";
						if(datos.results.datum.classes.length > 1){
							for(var j=1; j<datos.results.datum.classes.length; j ++){
								tree+= "<li><span class='treeNode'><i id='"+datos.results.datum.name.toString()+" -- "+datos.results.datum.value.toString()+"' class='intfChartQos'><a href='#nodeChart'>"+datos.results.datum.classes[j]+"</a></i></span></li>";
							}
						}else{
							tree+= "<li><span class='treeNode'><i id='"+datos.results.datum.name.toString()+" -- "+datos.results.datum.value.toString()+"' class='intfChartQos'><a href='#nodeChart'>"+datos.results.datum.classes+"</a></i></span></li>";
						}
						
						tree+= "</ul></li></ul>";
					}
					tree+="</li>";
				}
			}catch(e){
				console.log(e);
			}

			tree+= "</ul></li></ul>";
			
			$("#treeNodeDetailInterfaz").append(tree);
			
			//cnocConnector.drawTree();
			
			/************************************************************************/
			/* funciones para equipos tipo Huawei*/

			$( ".cpuPH" ).click(function() {
				drawElementsPerformance.drawChartCPUHuawei();
			});
			
			$( ".memProcH" ).click(function() {
				drawElementsPerformance.drawChartMemHuawei();
			});
			
			/************************************************************************/
			/* funciones para equipos varios*/
			$( ".healthP" ).click(function() {
				drawElementsPerformance.drawChartHealth();
			});						
			
			$( ".cpuP" ).click(function() {
				drawElementsPerformance.drawChartCPU();
			});
			
			$( ".healthRT" ).click(function() {
				drawElementsPerformance.drawChartHealtRT();
			});
			
			$( ".memIo" ).click(function() {
				drawElementsPerformance.drawChartMemoryIO();
			});
			
			
			$( ".memProc" ).click(function() {
				drawElementsPerformance.drawChartMemoryProc();
			});
			
			$( ".intfChart" ).click(function() {

				drawElementsPerformance.subtitlePerformance = "";
				drawElementsPerformance.subtitlePerformance = "Interfaz Average: ";
				drawElementsPerformance.idResourceInterfaz = "";

				var idResource = "";
				try{
					var tmp = $(this).text().split("--");
					//idResource = (tmp[2]).trim().substring(0,20);
					idResource = tmp[(tmp.length) - 1];
					drawElementsPerformance.intfNodePerformance = tmp[0]+ " -- " +tmp[1]; 
				}catch(e){
					console.log(e);
					drawElementsPerformance.intfNodePerformance = $(this).text();
				}				
				drawElementsPerformance.idResourceInterfaz = idResource.trim();

				drawElementsPerformance.drawInterfaceUtil("autil","");
			});
			
			$( ".intfChartQos" ).click(function() {
				var classQos = $(this).text();
				drawElementsPerformance.subtitlePerformance = "";								
				drawElementsPerformance.idResourceInterfaz = "";
				var idResource = "";
				
				try{
					var tmp =  $(this).attr( 'id' ).split("--");
					//idResource = (tmp[2]).trim().substring(0,20);
					idResource = tmp[(tmp.length) - 1];
					drawElementsPerformance.intfNodePerformance = tmp[0]+ " -- " +tmp[1]; 
				}catch(e){
					console.log(e);
					drawElementsPerformance.intfNodePerformance = $(this).text();
				}
				
				drawElementsPerformance.subtitlePerformance = "QOS: "+tmp[0]+ " -- " +tmp[1]+"</br>"+$(this).text();
				drawElementsPerformance.idResourceInterfaz = idResource.trim();				
				drawElementsPerformance.drawInterfaceQos(classQos);
				
			});
		},drawChartHealth:function(){
			
			drawElementsPerformance.chartIdPerformance = "1";
			drawElementsPerformance.subtitlePerformance = "";
			drawElementsPerformance.metricUnit = "";
			drawElementsPerformance.dataChartPerformance.length = 0;
			drawElementsPerformance.subtitlePerformance = "Availability";
			drawElementsPerformance.metricUnit = "% Health Statistics";
			var availability = {"jsonRequest":'{"model":"nmis_graph","model_view":"graph","parameters":{"'+drawElementsPerformance.endUnix+'":"'+drawElementsPerformance.endDate+'","end_date_raw":'+drawElementsPerformance.endUnix+',"start_date_raw":'+drawElementsPerformance.startDate+',"graph_type":"health","node":"'+drawElementsPerformance.nodePerformance+'","translation":"","field":""}}',"ip":drawElementsPerformance.nmis};
			
			drawElementsPerformance.drawChartsPerformance(cnocConnector.service1, availability, "containerChartPerformance", "availability", "#0C66ED", false);
			
		},drawChartCPU: function(){
			drawElementsPerformance.chartIdPerformance = "2";
			drawElementsPerformance.subtitlePerformance = "";
			drawElementsPerformance.metricUnit = "";
			drawElementsPerformance.dataChartPerformance.length = 0;
			drawElementsPerformance.subtitlePerformance = "CPU Util";
			drawElementsPerformance.metricUnit = "% CPU Util.";
			var avgBusy1 = {"jsonRequest":'{"model":"nmis_rrd","model_view":"graph","parameters":{"'+drawElementsPerformance.endUnix+'":"'+drawElementsPerformance.endDate+'","end_date_raw":'+drawElementsPerformance.endUnix+',"start_date_raw":'+drawElementsPerformance.startDate+',"graph_type":"nodehealth","node":"'+drawElementsPerformance.nodePerformance+'","translation":"","field":"avgBusy1"}}',"ip":drawElementsPerformance.nmis};
			var avgBusy5 = {"jsonRequest":'{"model":"nmis_rrd","model_view":"graph","parameters":{"'+drawElementsPerformance.endUnix+'":"'+drawElementsPerformance.endDate+'","end_date_raw":'+drawElementsPerformance.endUnix+',"start_date_raw":'+drawElementsPerformance.startDate+',"graph_type":"nodehealth","node":"'+drawElementsPerformance.nodePerformance+'","translation":"","field":"avgBusy5"}}',"ip":drawElementsPerformance.nmis};
			
			drawElementsPerformance.drawChartsPerformance(cnocConnector.service1, avgBusy1, "containerChartPerformance", "avgBusy1", "#0C66ED", false);
			drawElementsPerformance.drawChartsPerformance(cnocConnector.service1, avgBusy5, "containerChartPerformance", "avgBusy5","#2BC70D", false);	
			
		},drawChartHealtRT: function(){
			drawElementsPerformance.chartIdPerformance = "3";
			drawElementsPerformance.subtitlePerformance = "";
			drawElementsPerformance.metricUnit = "";
			drawElementsPerformance.dataChartPerformance.length = 0;
			drawElementsPerformance.subtitlePerformance = "Response Time";
			drawElementsPerformance.metricUnit = "Milliseconds";
			var responsetime = {"jsonRequest":'{"model":"nmis_rrd","model_view":"graph","parameters":{"'+drawElementsPerformance.endUnix+'":"'+drawElementsPerformance.endDate+'","end_date_raw":'+drawElementsPerformance.endUnix+',"start_date_raw":'+drawElementsPerformance.startDate+',"graph_type":"health","node":"'+drawElementsPerformance.nodePerformance+'","translation":"","field":"responsetime"}}',"ip":drawElementsPerformance.nmis};
			
			drawElementsPerformance.drawChartsPerformance(cnocConnector.service1, responsetime, "containerChartPerformance", "Response Time", "#0C66ED", false);
			
		},drawChartMemoryProc: function(){
			
			drawElementsPerformance.chartIdPerformance = "4";
			drawElementsPerformance.subtitlePerformance = "";
			drawElementsPerformance.metricUnit = "";
			drawElementsPerformance.dataChartPerformance.length = 0;
			drawElementsPerformance.subtitlePerformance = "Mem Util PROC";
			drawElementsPerformance.metricUnit = " ";
			var MemoryFreePROC = {"jsonRequest":'{"model":"nmis_rrd","model_view":"graph","parameters":{"'+drawElementsPerformance.endUnix+'":"'+drawElementsPerformance.endDate+'","end_date_raw":'+drawElementsPerformance.endUnix+',"start_date_raw":'+drawElementsPerformance.startDate+',"graph_type":"nodehealth","node":"'+drawElementsPerformance.nodePerformance+'","translation":"","field":"MemoryFreePROC"}}',"ip":drawElementsPerformance.nmis};
			var MemoryUsedPROC = {"jsonRequest":'{"model":"nmis_rrd","model_view":"graph","parameters":{"'+drawElementsPerformance.endUnix+'":"'+drawElementsPerformance.endDate+'","end_date_raw":'+drawElementsPerformance.endUnix+',"start_date_raw":'+drawElementsPerformance.startDate+',"graph_type":"nodehealth","node":"'+drawElementsPerformance.nodePerformance+'","translation":"","field":"MemoryUsedPROC"}}',"ip":drawElementsPerformance.nmis};
			
			drawElementsPerformance.drawChartsPerformance(cnocConnector.service1, MemoryFreePROC, "containerChartPerformance", "MemoryFreePROC", "#0C66ED", false);
			drawElementsPerformance.drawChartsPerformance(cnocConnector.service1, MemoryUsedPROC, "containerChartPerformance", "MemoryUsedPROC","#2BC70D", false);
			
		},drawChartMemoryIO: function(){
			drawElementsPerformance.chartIdPerformance = "5";
			drawElementsPerformance.subtitlePerformance = "";
			drawElementsPerformance.idResourceInterfaz = "";
			drawElementsPerformance.metricUnit = " ";
			drawElementsPerformance.dataChartPerformance.length = 0;
			drawElementsPerformance.subtitlePerformance = "Mem Util IO";
			drawElementsPerformance.metricUnit = " ";
			var MemoryFreeIO = {"jsonRequest":'{"model":"nmis_rrd","model_view":"graph","parameters":{"'+drawElementsPerformance.endUnix+'":"'+drawElementsPerformance.endDate+'","end_date_raw":'+drawElementsPerformance.endUnix+',"start_date_raw":'+drawElementsPerformance.startDate+',"graph_type":"nodehealth","node":"'+drawElementsPerformance.nodePerformance+'","translation":"","field":"MemoryFreeIO"}}',"ip":drawElementsPerformance.nmis};
			var MemoryUsedIO = {"jsonRequest":'{"model":"nmis_rrd","model_view":"graph","parameters":{"'+drawElementsPerformance.endUnix+'":"'+drawElementsPerformance.endDate+'","end_date_raw":'+drawElementsPerformance.endUnix+',"start_date_raw":'+drawElementsPerformance.startDate+',"graph_type":"nodehealth","node":"'+drawElementsPerformance.nodePerformance+'","translation":"","field":"MemoryUsedIO"}}',"ip":drawElementsPerformance.nmis};
			
			drawElementsPerformance.drawChartsPerformance(cnocConnector.service1, MemoryFreeIO, "containerChartPerformance", "MemoryFreeIO", "#0C66ED", false);
			drawElementsPerformance.drawChartsPerformance(cnocConnector.service1, MemoryUsedIO, "containerChartPerformance", "MemoryUsedIO","#2BC70D", false);
		
		},drawInterfaceUtil: function(unidad, divId){		
			drawElementsPerformance.chartIdPerformance = "6";
			drawElementsPerformance.subtitlePerformance = "";
			drawElementsPerformance.dataChartPerformance.length = 0;
			drawElementsPerformance.metricUnit = "";
			drawElementsPerformance.subtitlePerformance += drawElementsPerformance.intfNodePerformance;
			
			if(unidad==="autil"){
				drawElementsPerformance.metricUnit = "% Avg Util ";
			}else if(unidad==="abits"){
				drawElementsPerformance.metricUnit = "Avg bps ";
			}
			
			var autil = {"jsonRequest":'{"model":"nmis_graph","model_view":"graph","parameters":{"'+drawElementsPerformance.endUnix+'":"'+drawElementsPerformance.endDate+'","end_date_raw":'+drawElementsPerformance.endUnix+',"start_date_raw":'+drawElementsPerformance.startDate+',"lineType": "line", "graph_type":"interface","index_graph_type":"'+unidad+'","resource_index": "'+drawElementsPerformance.idResourceInterfaz+'","node":"'+drawElementsPerformance.nodePerformance+'","translation":"","field":"","item":"","axis":"0"}}',"ip":drawElementsPerformance.nmis};
			
			if(divId === "containerChartPerformanceInterfaz"){
				drawElementsPerformance.drawChartsPerformance(cnocConnector.service1, autil, "containerChartPerformanceInterfaz", "autil", null, true);
			}else{
				drawElementsPerformance.drawChartsPerformance(cnocConnector.service1, autil, "containerChartPerformance", "autil", null, true);
			}
			
			

		},drawInterfaceErrors: function(){
			drawElementsPerformance.chartIdPerformance = "7";
			drawElementsPerformance.subtitlePerformance = "";
			drawElementsPerformance.dataChartPerformance.length = 0;
			drawElementsPerformance.metricUnit = "";
			drawElementsPerformance.subtitlePerformance += drawElementsPerformance.intfNodePerformance;
			drawElementsPerformance.metricUnit = "Percentage";
			
			var errpkts_hc = {"jsonRequest":'{"model":"nmis_graph","model_view":"graph","parameters":{"'+drawElementsPerformance.endUnix+'":"'+drawElementsPerformance.endDate+'","end_date_raw":'+drawElementsPerformance.endUnix+',"start_date_raw":'+drawElementsPerformance.startDate+',"lineType": "line", "graph_type":"pkts_hc","index_graph_type": "errpkts_hc","resource_index": "'+drawElementsPerformance.idResourceInterfaz+'","node":"'+drawElementsPerformance.nodePerformance+'","translation":"","field":"","item":"","axis":"0"}}',"ip":drawElementsPerformance.nmis};			
			drawElementsPerformance.drawChartsPerformance(cnocConnector.service1, errpkts_hc, "containerChartPerformance", "errpkts_hc",null, true);

		},drawInterfacePkts: function(){
			drawElementsPerformance.chartIdPerformance = "8";
			drawElementsPerformance.subtitlePerformance = "";
			drawElementsPerformance.dataChartPerformance.length = 0;
			drawElementsPerformance.metricUnit = "";
			drawElementsPerformance.subtitlePerformance += drawElementsPerformance.intfNodePerformance;
			drawElementsPerformance.metricUnit = "Packets/Second";
			
			var pkts_hc = {"jsonRequest":'{"model":"nmis_graph","model_view":"graph","parameters":{"'+drawElementsPerformance.endUnix+'":"'+drawElementsPerformance.endDate+'","end_date_raw":'+drawElementsPerformance.endUnix+',"start_date_raw":'+drawElementsPerformance.startDate+',"lineType": "line", "graph_type":"pkts_hc","index_graph_type": "pkts_hc","resource_index": "'+drawElementsPerformance.idResourceInterfaz+'","node":"'+drawElementsPerformance.nodePerformance+'","translation":"","field":"","item":"","axis":"0"}}',"ip":drawElementsPerformance.nmis};			
			drawElementsPerformance.drawChartsPerformance(cnocConnector.service1, pkts_hc, "containerChartPerformance", "pkts_hc",null, true);
		
		},drawInterfaceQos: function(classQos){
			drawElementsPerformance.chartIdPerformance = "9";
			drawElementsPerformance.dataChartPerformance.length = 0;
			drawElementsPerformance.metricUnit = "Avg Bits Per Second";
			var DropByteOut = {"jsonRequest":'{"model":"nmis_rrd","model_view":"graph","parameters":{"'+drawElementsPerformance.endUnix+'":"'+drawElementsPerformance.endDate+'","end_date_raw":'+drawElementsPerformance.endUnix+',"start_date_raw":'+drawElementsPerformance.startDate+',"graph_type":"cbqos-out","index_graph_type": "cbqos-out","resource_index": "'+drawElementsPerformance.idResourceInterfaz+'","node":"'+drawElementsPerformance.nodePerformance+'","translation":"","field":"DropByte","item":"'+classQos+'"}}',"ip":drawElementsPerformance.nmis};			
			var PrePolicyByteOut = {"jsonRequest":'{"model":"nmis_rrd","model_view":"graph","parameters":{"'+drawElementsPerformance.endUnix+'":"'+drawElementsPerformance.endDate+'","end_date_raw":'+drawElementsPerformance.endUnix+',"start_date_raw":'+drawElementsPerformance.startDate+',"graph_type":"cbqos-out","index_graph_type": "cbqos-out","resource_index": "'+drawElementsPerformance.idResourceInterfaz+'","node":"'+drawElementsPerformance.nodePerformance+'","translation":"","field":"PrePolicyByte","item":"'+classQos+'"}}',"ip":drawElementsPerformance.nmis};
			
			drawElementsPerformance.drawChartsPerformance(cnocConnector.service1, DropByteOut, "containerChartPerformance", "DropByte-Out","#0C66ED");
			drawElementsPerformance.drawChartsPerformance(cnocConnector.service1, PrePolicyByteOut, "containerChartPerformance", "PrePolicyByte-Out","#2BC70D");
			
			if(drawElementsPerformance.qosIn){
				var DropByteIn = {"jsonRequest":'{"model":"nmis_rrd","model_view":"graph","parameters":{"'+drawElementsPerformance.endUnix+'":"'+drawElementsPerformance.endDate+'","end_date_raw":'+drawElementsPerformance.endUnix+',"start_date_raw":'+drawElementsPerformance.startDate+',"graph_type":"cbqos-in","index_graph_type": "cbqos-in","resource_index": "'+drawElementsPerformance.idResourceInterfaz+'","node":"'+drawElementsPerformance.nodePerformance+'","translation":"","field":"DropByte","item":"'+classQos+'"}}',"ip":drawElementsPerformance.nmis};			
				var PrePolicyByteIn = {"jsonRequest":'{"model":"nmis_rrd","model_view":"graph","parameters":{"'+drawElementsPerformance.endUnix+'":"'+drawElementsPerformance.endDate+'","end_date_raw":'+drawElementsPerformance.endUnix+',"start_date_raw":'+drawElementsPerformance.startDate+',"graph_type":"cbqos-in","index_graph_type": "cbqos-in","resource_index": "'+drawElementsPerformance.idResourceInterfaz+'","node":"'+drawElementsPerformance.nodePerformance+'","translation":"","field":"PrePolicyByte","item":"'+classQos+'"}}',"ip":drawElementsPerformance.nmis};
				
				drawElementsPerformance.drawChartsPerformance(cnocConnector.service1, DropByteIn, "containerChartPerformance", "DropByte-In","#FF0D45");
				drawElementsPerformance.drawChartsPerformance(cnocConnector.service1, PrePolicyByteIn, "containerChartPerformance", "PrePolicyByte-In","#33297A");
			}

		},drawBgp: function(){
			drawElementsPerformance.chartIdPerformance = "10";
			drawElementsPerformance.subtitlePerformance = "";
			drawElementsPerformance.dataChartPerformance.length = 0;
			drawElementsPerformance.metricUnit = "";
			drawElementsPerformance.subtitlePerformance += drawElementsPerformance.intfNodePerformance;
			
			
			/*if(unidad==="bgpPeerStats"){
				drawElementsPerformance.metricUnit = "BGP Peer Stats";
			}else if(unidad==="bgpPeer"){
				drawElementsPerformance.metricUnit = "BGP Peer Status";
			}*/
			
			drawElementsPerformance.metricUnit = "BGP Peer Status";
			var bgp = {"jsonRequest":'{"model":"nmis_graph","model_view":"graph","parameters":{"'+drawElementsPerformance.endUnix+'":"'+drawElementsPerformance.endDate+'","end_date_raw":'+drawElementsPerformance.endUnix+',"start_date_raw":'+drawElementsPerformance.startDate+',"lineType": "line", "graph_type":"bgpPeer","index_graph_type":"bgpPeer","resource_index": "'+drawElementsPerformance.idResourceInterfaz+'","node":"'+drawElementsPerformance.nodePerformance+'","translation":"","field":"","item":"","axis":"0"}}',"ip":drawElementsPerformance.nmis};			
			
			drawElementsPerformance.drawChartsPerformance(cnocConnector.service1, bgp, "containerChartPerformance", "bgp",null, true);
		
		},drawInterfaceQosHuawei: function(idResourceInterfaz){
			drawElementsPerformance.chartIdPerformance = "";
			drawElementsPerformance.metricUnit = "AVG Bytes.";
			drawElementsPerformance.dataChartPerformance.length = 0;
			var qos =  {"jsonRequest":'{"model":"nmis_graph","model_view":"graph","parameters":{"'+drawElementsPerformance.endUnix+'":"'+drawElementsPerformance.endDate+'","end_date_raw":'+drawElementsPerformance.endUnix+',"start_date_raw":'+drawElementsPerformance.startDate+',"graph_type":"QualityOfServiceStat","index_graph_type": "QualityOfServiceStat","resource_index": "'+idResourceInterfaz+'","node":"'+drawElementsPerformance.nodePerformance+'","translation":"","field":"","item":""}}',"ip":drawElementsPerformance.nmis};
			drawElementsPerformance.drawChartsPerformance(cnocConnector.service1, qos, "containerChartPerformance", "QosHuawei",null, true);
			
		},drawChartCPUHuawei: function(){
			drawElementsPerformance.chartIdPerformance = "";
			drawElementsPerformance.subtitlePerformance = "";
			drawElementsPerformance.metricUnit = "";
			drawElementsPerformance.dataChartPerformance.length = 0;
			drawElementsPerformance.subtitlePerformance = "CPU Util";
			drawElementsPerformance.metricUnit = "% CPU Util.";
			var avgBusy1 = {"jsonRequest":'{"model":"nmis_graph","model_view":"graph","parameters":{"'+drawElementsPerformance.endUnix+'":"'+drawElementsPerformance.endDate+'","end_date_raw":'+drawElementsPerformance.endUnix+',"start_date_raw":'+drawElementsPerformance.startDate+',"graph_type":"cpu-huawei","node":"'+drawElementsPerformance.nodePerformance+'","translation":"","field":""}}',"ip":drawElementsPerformance.nmis};
			
			drawElementsPerformance.drawChartsPerformance(cnocConnector.service1, avgBusy1, "containerChartPerformance", "avgBusy1", "#0C66ED", false);

			
		},drawChartMemHuawei: function(){
			drawElementsPerformance.chartIdPerformance = "";
			drawElementsPerformance.subtitlePerformance = "";
			drawElementsPerformance.metricUnit = "";
			drawElementsPerformance.dataChartPerformance.length = 0;
			drawElementsPerformance.subtitlePerformance = "Memory Util";
			drawElementsPerformance.metricUnit = "% Memory Util.";
			var memoryH = {"jsonRequest":'{"model":"nmis_graph","model_view":"graph","parameters":{"'+drawElementsPerformance.endUnix+'":"'+drawElementsPerformance.endDate+'","end_date_raw":'+drawElementsPerformance.endUnix+',"start_date_raw":'+drawElementsPerformance.startDate+',"graph_type":"mem-proc-huawei","node":"'+drawElementsPerformance.nodePerformance+'","translation":"","field":""}}',"ip":drawElementsPerformance.nmis};
			
			drawElementsPerformance.drawChartsPerformance(cnocConnector.service1, memoryH, "containerChartPerformance", "memoryH", "#0C66ED", false);

			
		},drawChartResponse:function(){
			drawElementsPerformance.chartIdPerformance = "";
			drawElementsPerformance.subtitlePerformance = "";
			drawElementsPerformance.metricUnit = "";
			drawElementsPerformance.dataChartPerformance.length = 0;
			drawElementsPerformance.subtitlePerformance = "Response Time ";
			drawElementsPerformance.metricUnit = "ms";
			var response = {"jsonRequest":'{"model":"nmis_graph","model_view":"graph","parameters":{"'+drawElementsPerformance.endUnix+'":"'+drawElementsPerformance.endDate+'","end_date_raw":'+drawElementsPerformance.endUnix+',"start_date_raw":'+drawElementsPerformance.startDate+',"graph_type":"response","node":"'+drawElementsPerformance.nodePerformance+'","translation":"","field":""}}',"ip":drawElementsPerformance.nmis};

			drawElementsPerformance.drawChartsPerformance(cnocConnector.service1, response, "containerChartPerformance", "response", "#0C66ED", false);
		},drawChartUpsOutVolt:function(){
			drawElementsPerformance.chartIdPerformance = "";
			drawElementsPerformance.subtitlePerformance = "";
			drawElementsPerformance.metricUnit = "";
			drawElementsPerformance.dataChartPerformance.length = 0;
			drawElementsPerformance.subtitlePerformance = "Voltage ";
			drawElementsPerformance.metricUnit = "Volt";
			var upsvoltout = {"jsonRequest":'{"model":"nmis_graph","model_view":"graph","parameters":{"'+drawElementsPerformance.endUnix+'":"'+drawElementsPerformance.endDate+'","end_date_raw":'+drawElementsPerformance.endUnix+',"start_date_raw":'+drawElementsPerformance.startDate+',"graph_type":"upsvoltout","node":"'+drawElementsPerformance.nodePerformance+'","translation":"","field":""}}',"ip":drawElementsPerformance.nmis};
			
			drawElementsPerformance.drawChartsPerformance(cnocConnector.service1, upsvoltout, "containerChartPerformance", "upsvoltout", "#0C66ED", false);
		},drawChartUpsInVolt:function(){
			drawElementsPerformance.chartIdPerformance = "";
			drawElementsPerformance.subtitlePerformance = "";
			drawElementsPerformance.metricUnit = "";
			drawElementsPerformance.dataChartPerformance.length = 0;
			drawElementsPerformance.subtitlePerformance = "Voltage ";
			drawElementsPerformance.metricUnit = "Volt";
			var upsvoltin = {"jsonRequest":'{"model":"nmis_graph","model_view":"graph","parameters":{"'+drawElementsPerformance.endUnix+'":"'+drawElementsPerformance.endDate+'","end_date_raw":'+drawElementsPerformance.endUnix+',"start_date_raw":'+drawElementsPerformance.startDate+',"graph_type":"upsvoltin","node":"'+drawElementsPerformance.nodePerformance+'","translation":"","field":""}}',"ip":drawElementsPerformance.nmis};
			
			drawElementsPerformance.drawChartsPerformance(cnocConnector.service1, upsvoltin, "containerChartPerformance", "upsvoltin", "#0C66ED", false);
		},drawChartUpsBatRemaing:function(){
			drawElementsPerformance.chartIdPerformance = "";
			drawElementsPerformance.subtitlePerformance = "";
			drawElementsPerformance.metricUnit = "";
			drawElementsPerformance.dataChartPerformance.length = 0;
			drawElementsPerformance.subtitlePerformance = "Battery Remaing";
			drawElementsPerformance.metricUnit = "";
			var batteryRemaing = {"jsonRequest":'{"model":"nmis_rrd","model_view":"graph","parameters":{"'+drawElementsPerformance.endUnix+'":"'+drawElementsPerformance.endDate+'","end_date_raw":'+drawElementsPerformance.endUnix+',"start_date_raw":'+drawElementsPerformance.startDate+',"graph_type":"batcharremain","node":"'+drawElementsPerformance.nodePerformance+'","translation":"","field":"UpsBatteryRemaing"}}',"ip":drawElementsPerformance.nmis};
			
			drawElementsPerformance.drawChartsPerformance(cnocConnector.service1, batteryRemaing, "containerChartPerformance", "batteryRemaing", "#0C66ED", false);
		},drawChartsPerformance: function(url, params, container, labelMetric, color, otherMetrics){

			$( "#" + container ).mask("Waiting...");
			
			
			function onDataReceived(series) {
				
				if(container === "containerChartPerformanceInterfaz"){
					drawElementsPerformance.dataChartPerformanceUtil.push(series);
					cnocConnector.drawChartPerformance(drawElementsPerformance.dataChartPerformanceUtil, container, otherMetrics);
				}else{
					drawElementsPerformance.dataChartPerformance.push(series);
					cnocConnector.drawChartPerformance(drawElementsPerformance.dataChartPerformance, container, otherMetrics);
				}
										
				$( "#" + container ).unmask();
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
	   				if(labelMetric === "pkts_hc" || labelMetric === "autil" || labelMetric === "errpkts_hc" || labelMetric === "availability" || labelMetric === "upsvoltin" || labelMetric === "upsvoltout" || labelMetric === "memoryH" || labelMetric === "QosHuawei"|| labelMetric === "bgp"){
	   					var json = response.replyData.data;
	   					var colorP = ["#0FFF00","#FFBB00","#0061FF","#33297A","#A80DFF","#C4FF0D","#FF0D45","#FF8A0D"];
	   					for(var idx=0; idx<json.length; idx++){
	   						dataChart = "";
	   						var jsonData = response.replyData.data[idx].data;
	   						//var colorP = response.replyData.data[idx].color;
	   						var name = response.replyData.data[idx].name;
	   						dataChart = {color:colorP[idx], name:name, data: jsonData};
	   						onDataReceived(dataChart);
	   					}
	   				}else{
	   					if(labelMetric === "DropByte-Out" || labelMetric === "PrePolicyByte-Out" || labelMetric === "DropByte-In" || labelMetric === "PrePolicyByte-In"){
		   					var data = [];		   					
		   					$.each( response.replyData.data[0].data, function( index, value ){
		   						var dataTmp = [];
		   						$.each( value, function( index, value ){	   
		   							if(index === 1){
		   								dataTmp.push(value * 8);
		   							}else{
		   								dataTmp.push(value);
		   							}	   							
		   						});
		   						data.push(dataTmp);	   						
		   					});
		   					dataChart = {color:color, name:labelMetric, data: data};
	   					}else{
	   						dataChart = {color:color, name:labelMetric, data: response.replyData.data[0].data};
	   					}
	   					
	   					onDataReceived(dataChart);
	   				}
	   			}
	   		});
			
		},refreshChart:function(){
			
			var startDate = ((new Date().getTime()).toString()).substring(0,10)-86400;
			var endDate = ((new Date().getTime()).toString()).substring(0,10);

			drawElementsPerformance.dataChartPerformance.length = 0;
			drawElementsPerformance.endUnix = endDate;
			drawElementsPerformance.endDate = "";
			drawElementsPerformance.startDate = startDate;

		},timeChartOp:function(timeOption, container){
						
			var timeOp = timeOption * 3600;
			console.log(timeOp);
			
			
			var endDate = new Date().getTime() / 1000 | 0;
			var startDate = endDate - timeOp;
			
			//var startDate = ((new Date().getTime()).toString()).substring(0,10) - timeOption;
			//var endDate = ((new Date().getTime()).toString()).substring(0,10);
			
			
			drawElementsPerformance.dataChartPerformanceUtil.length = 0;
			drawElementsPerformance.endUnix = endDate;
			drawElementsPerformance.endDate = "";
			drawElementsPerformance.startDate = startDate;
			
			if(container === "containerChartPerformanceInterfaz"){
				drawElementsPerformance.drawInterfaceUtil("autil",container); // falta ver lo de unidad, divId
			}else{
				if(drawElementsPerformance.chartIdPerformance === "1"){
					drawElementsPerformance.drawChartHealth();
				}else if(drawElementsPerformance.chartIdPerformance === "2"){
					drawElementsPerformance.drawChartCPU();
				}else if(drawElementsPerformance.chartIdPerformance === "3"){
					drawElementsPerformance.drawChartHealtRT();
				}else if(drawElementsPerformance.chartIdPerformance === "4"){
					drawElementsPerformance.drawChartMemoryProc();
				}else if(drawElementsPerformance.chartIdPerformance === "5"){
					drawElementsPerformance.drawChartMemoryIO();
				}else if(drawElementsPerformance.chartIdPerformance === "6"){
					drawElementsPerformance.drawInterfaceUtil("autil","containerChartPerformance"); // falta ver lo de unidad, divId
				}else if(drawElementsPerformance.chartIdPerformance === "7"){
					drawElementsPerformance.drawInterfaceErrors();
				}else if(drawElementsPerformance.chartIdPerformance === "8"){
					drawElementsPerformance.drawInterfacePkts();
				}else if(drawElementsPerformance.chartIdPerformance === "9"){
					drawElementsPerformance.drawInterfaceQos(); // falta ver lo de classQos
				}
			}
			
			
		}		
};
