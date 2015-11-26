/**
 * hmjavier
 * Clase para generar arrays que se inyectan a los elementos del DOM
 */

var modalIP;

var drawElementsGral = {

		/*** List nodes by status ***/
		reachableNodes : [],
		degradedNodes : [],
		unreachableNodes : [],		
		groups : [],
		intTops:"",
		
		dataChartMemory : [],
		
		init : function(codeNet) {
			
			if (codeNet != undefined) {
				
				this.builder(codeNet);
			
			} else {
				
				cnocConnector.invokeMashup(cnocConnector.service9, {},drawElementsGral.selectCustom, "SelectCustomer", "opt");
			}

		},builder: function(codenet) {

			if(cnocConnector.codeNetGlobal === 'N000030') // If Banorte then draw National Map
				this.mapaGeneral(codenet,"NACIONAL", true);
			else
				this.mapaGeneral(codenet, null ,false);
			
			
			/*** GRUPOS DEL CLIENTE  ***/
			//cnocConnector.invokeMashup(cnocConnector.service12, {"codenet" : codenet},drawElementsGral.chartGroups, "chartGrupos", "chartGruposG");
			
			/*** Getting Node Status ***/
			drawElementsGral.getNodeStatus(codenet);			
			
			cnocConnector.invokeMashup(cnocConnector.service5, {"code_net" : codenet},drawElementsGral.countTotal, "cOpen", "cOpenG");
			cnocConnector.invokeMashup(cnocConnector.service15, {"code_net" : codenet},drawElementsGral.countTotal, "cIncident", "cIncidentG");						

			/* get Warning  by Group*/
			cnocFramework.invokeMashup({invokeUrl : endpoint.getWarningByGroup,
				params : {
					"codenet" : codenet
					},
				callback : function(datos, container, divElements){

					$("#chartGruposError").empty();
					var events = new Array();
					var groups =  new Array();
					
					$.each( datos.records.record, function( key, value ) {
						
						$.each( value, function( key, value ) {

							if(key === 'event'){
								if(events.length === 0){
									events.push(value);
								}else{
									var flag = 0;
									for(var i=0; i<events.length; i++){
										if(events[i] === value){
											flag = 1;
										}
									}									
									if(flag === 0){
										events.push(value);
									}
								}
							}	
							
							if(key === 'group_column'){
								if(groups.length === 0){
									groups.push(value);
								}else{
									var flag = 0;
									for(var i=0; i<groups.length; i++){
										if(groups[i] === value){
											flag = 1;
										}
									}									
									if(flag === 0){
										groups.push(value);
									}
								}
							}
							
						});
					});
					
					var table = "<table style='width:100%; font-size: 12px;' class='table' id='fallas'>";

					table += "<tr><th></th>";
					for(var j=0; j<groups.length; j++){
						table += "<th>"+groups[j]+"</th>";
					}
					table += "</tr>";
					
					
					var response = datos.records.record;
					for(var j=0; j<events.length; j++){
						table += "<tr>";
						table += "<td>"+events[j]+"</td>";
						
						var flag = 0;
						for(var y=0; y<groups.length; y++){
							for(var i=0; i<response.length; i++){
								
								if(groups[y]=== response[i].group_column){									
									if(events[j] === response[i].event){
										table += "<td>"+response[i].total+"</td>";
										flag = 1;
									}									
								}
							}
							if(flag === 0){
								table += "<td>0</td>";
							}
						}
						table += "</tr>";
					}					

					table += "</table>";
					
					$("#chartGruposError").append(table);
					
				},
				divContainers :  [$("#chartGruposError")],
				divElements : [$("#chartGruposErrorG")]
			});
			
			/* get Nodes Op flow */
			cnocFramework.invokeMashup({invokeUrl : endpoint.getListNodesIpFlow,
				params : {
					"codenet" : codenet
					},
				callback : drawElementsGral.getListNodesIpFlow,
				divContainers :  [$("#listNodesOpFlow")],
				divElements : [$("#listNodesOpFlowG")]
			});
			
			/*** Getting Tops Utilization ***/
			cnocConnector.invokeMashup(
				cnocConnector.service16,
				{
					"network_code" : cnocConnector.codeNetGlobal,
					"topID" : "ifInUtil"
				},
				drawElementsGral.topGridMain,
				"topInUtilization",
				"topInUtilizationG"
			);
			cnocConnector.invokeMashup(
				cnocConnector.service16,
				{
					"network_code" : cnocConnector.codeNetGlobal,
					"topID" : "ifOutUtil"
				},
				drawElementsGral.topGridMain,
				"topOutUtilization",
				"topOutUtilizationG"
			);
		
		},
		getListNodesIpFlow: function(datos, divContainers, divElements){

			jQuery(divContainers[0].selector).empty();
			var tableT = "";
			try {
				if (datos.records.record.length > 1) {
					for ( var i = 0; i < datos.records.record.length; i++) {
						
						tableT += "<tr>";
						tableT += "<td>"+datos.records.record[i].host_name_pyrs.toString()+"</td>";						
						tableT += "<td><a href='"+datos.records.record[i].ip_publica_opflow.toString()+"' target='_blank'>Op Flow</a></td>";
						tableT += "</tr>";
					}
				} else {
					tableT += "<tr>";
					tableT += "<td>"+datos.records.record.host_name_pyrs.toString()+"</td>";						
					tableT += "<td><a href='"+datos.records.record.ip_publica_opflow.toString()+"' target='_blank'>Op Flow</a></td>";
					tableT += "</tr>";
				}
			} catch (err) {	};
			
			var rowsHeaders = [ {
				"sTitle" : "Node"
			}, {
				"sTitle" : "URL"
			} ];
			
			jQuery(divContainers[0].selector).append('<table  style="width:100%;" class="table table-striped table-hover" id="'+ divElements[0].selector.replace("#","") + '">'+tableT+'</table>');
			
			dTable = jQuery(divElements[0].selector).dataTable({
				"sDom": 'T<"clear">lfrtip',
				"oTableTools": {
			        "aButtons": [
			            "copy",
			            "csv",
			            "xls"
			            ]
			    },
				//"aaData" : rowsData,
				"aoColumns" : rowsHeaders,
				"sScrollX": "100%",
				"sScrollXInner": "100%",
				"sScrollY": 220,
				"bScrollCollapse": true,
				"bProcessing": true,
				"bSort": true
			});
			
			//cnocConnector.drawGrid(divContainers[0].selector.replace("#",""), divElements[0].selector.replace("#",""), tableT, rowsHeaders, false);
			
			
		}, 
		
		/**
		 * Getting NMIS Status and list nodes
		 * @param codenet
		 */
		getNodeStatus: function(codenet) {
						
			var divContainers = [
						$('#countAll'),			// Total Nodes
						$('#countReachable'),	// Reachable Nodes 
						$('#countDegraded'),	// Degraded Nodes
						$('#countUnreachable'),	// Unreachable Nodes
						$('#listNodes'),		// Node List 
						$('#containerGroups')	// Groups Chart
				];
			
			var divElements = [
						$('#totalDiv'),			// Total Nodes
						$('#totalReachable'),	// Reachable Nodes
						$('#totalDegraded'),	// Degraded Nodes
						$('#totalUnreachable'),	// Unreachable Nodes
						$('#listNodesG'),		// Node List
						$('#chartGrupos')		// Groups Chart
				];
			
			cnocFramework.invokeMashup({
				invokeUrl : endpoint.getNmisStatus,
				params : {"networkCode" : codenet},
				callback : function(response, divContainers, divElements) {
					
					drawElementsGral.reachableNodes.length = 0;
					drawElementsGral.degradedNodes.length = 0;
					drawElementsGral.unreachableNodes.length = 0;
					drawElementsGral.groups.length = 0;
					
					try {
						if (typeof response.records.record.length !== 'undefined') { // The variable is defined
							if (response.records.record.length > 1) { // If response is an array
								$.each(response.records.record, function(k,v) { // Loop through Nodes
									/*** Node variable ***/
									var node = {
										'status' : v.status.toString(),
										'name' : v.name.toString(),
										'group' : v.group.toString(),
										'updated' : v.updated.toString()
									};
									
									var found = false;
									
									$.each(drawElementsGral.groups, function(m,n) {
										if (n.groups === node.group) { // If found Group then add status
											found = true;
											if (node.status === 'reachable') { // Reachable nodes
												drawElementsGral.reachableNodes.push(node);
												n.reachable += 1;
												return false;
											
											} else if (node.status === 'degraded') { // Degraded nodes
												drawElementsGral.degradedNodes.push(node);
												n.degraded += 1;
												return false;
											
											} else if (node.status === 'unreachable') { // Unreachable Nodes
												drawElementsGral.unreachableNodes.push(node);
												n.unreachable += 1;
												return false;
											}
										}
									});
									
									if (!found) { // If not found then add Group and Nodes
										var group = {
											'groups' : node.group,
											'reachable' : 0,
											'degraded' : 0,
											'unreachable' : 0
										};
										
										if (node.status === 'reachable') { // Reachable nodes
											drawElementsGral.reachableNodes.push(node);
											group.reachable += 1;
										} else if (node.status === 'degraded') { // Degraded nodes
											drawElementsGral.degradedNodes.push(node);
											group.degraded += 1;
										} else if (node.status === 'unreachable') { // Unreachable Nodes
											drawElementsGral.unreachableNodes.push(node);
											group.unreachable += 1;
										}
										
										drawElementsGral.groups.push(group);
										
									}
								});
								
							} else { // Else response is not an array
								/*** Node variable ***/
								var node = {
										'status' : response.records.record.toString(),
										'name' : response.records.record.name.toString()
									};
								
								if (node.status === 'reachable') // Reachable nodes									
									drawElementsGral.reachableNodes.push(node);
								else if (node.status === 'degraded') // Degraded nodes
									drawElementsGral.degradedNodes.push(node);
								else if (node.status === 'unreachable') // Unreachable Nodes
									drawElementsGral.unreachableNodes.push(node);
							}							
						
						} else {
							console.log("response.records.record.length is undefined ");
						}
							
					} catch (e) {
						console.log(e);						
					
					} finally {
						/*** Draw Tops Status Totals ***/
						divElements[0].text(
								drawElementsGral.reachableNodes.length +
								drawElementsGral.degradedNodes.length +
								drawElementsGral.unreachableNodes.length
						);
						divElements[1].text(drawElementsGral.reachableNodes.length);
						divElements[2].text(drawElementsGral.degradedNodes.length);
						divElements[3].text(drawElementsGral.unreachableNodes.length);
						
						// Unmask all div containers 
						//cnocFramework.unmask(divContainers);
						
						/*** Draw node list ***/
						drawElementsGral.listNodes('complete');
						
						/*** Draw cart Groups ***/
						drawElementsGral.chartGroups(drawElementsGral.groups, divElements[5]);
						
					}
					
				},
				divContainers : divContainers,
				divElements : divElements
			});			
		},
		   
		/**
		 * Getting Nodes by Status
		 * @param codenet
		 */
		getNodesByStatus : function (status, codenet) {
			
			drawElementsGral.degradedNodes = [];
			
			/*** Invoke NMIS Groups ***/
			cnocFramework.invokeMashup({
				invokeUrl : endpoint.getNmisGroups,
				params : {"networkCode" : codenet},
				callback : function(response, divContainers, divElements) {

					if (typeof response.records.record.length !== 'undefined') { // The variable is defined
						
						var stopMask = response.records.record.length;
						
						try {							
							$.each(response.records.record, function(k,value) { // Loop through Groups

								/*** Invoke NMIS Nodes by Status ***/
								cnocFramework.invokeMashup({
									invokeUrl : endpoint.getDegradedNodes,
									params : {
										"ip" : value.nmisserver.toString(),
										"query" : '["config.group","' + value.group.toString() + '","status.nodestatus","' + status +'"]',
										"properties" : '["node_name","info.status"]'
									},									
									callback : function(response, divContainers, divElements) {
										
										
											$.each(response, function(k,v) { // Loop through Nodes
												try{
												// Node properties
												var node = {
													'name' : v.node_name.toString(),											
													'event' : '',
													'value' : '',
													'updated': '',
													'element': ''
													
												};

												for (var prop in v.info.status) { // Loop through info.status properties 
													if (v.info.status[prop].status.toString() != 'ok') {
														node.event = v.info.status[prop].event;
														node.value = v.info.status[prop].value;
														node.updated = drawElementsGral.timeConverter(v.info.status[prop].updated);
														node.element = v.info.status[prop].element;
														break;
													}
												}
												
												// Push nodes
												drawElementsGral.degradedNodes.push(node);
												
												}catch(e){
													stopMask--;
													
												};
												
											});
											
											if(stopMask == 1) {
												
												//Unmask all div containers 
												cnocFramework.unmask(divContainers);
												
												// Draw complete node list
												drawElementsGral.drawListNodesDegraded(drawElementsGral.degradedNodes, 'listNodes', 'listNodesG');										
											}
											
											stopMask--;
									},
									divContainers : [ $('#listNodes') ],
									divElements : [ $('#listNodesG') ]
								});
								
							});
							
							
						} catch (e) {
							console.log(e);
							
							// Unmask all div containers 
							cnocFramework.unmask(divContainers);
						}
						
					} else { // The variable is undefined
						
						console.log("response.records.record.length is undefined");
						
						var stopMask = 1;
						
						try {
							/*** Invoke NMIS Nodes by Status ***/
							cnocFramework.invokeMashup({
								invokeUrl : endpoint.getDegradedNodes,
								params : {
									"ip" : response.records.record.nmisserver.toString(),
									"query" : '["config.group","' + response.records.record.group.toString() + '","status.nodestatus","' + status +'"]',
									"properties" : '["node_name","info.status"]'
								},									
								callback : function(response, divContainers, divElements) {									
									
										$.each(response, function(k,v) { // Loop through Nodes
											try{
											// Node properties
											var node = {
												'name' : v.node_name.toString(),											
												'event' : '',
												'value' : '',
												'updated': '',
												'element': ''
												
											};

											for (var prop in v.info.status) { // Loop through info.status properties 
												if (v.info.status[prop].status.toString() != 'ok') {
													node.event = v.info.status[prop].event;
													node.value = v.info.status[prop].value;
													node.updated = drawElementsGral.timeConverter(v.info.status[prop].updated);
													node.element = v.info.status[prop].element;
													break;
												}
											}
											
											// Push nodes
											drawElementsGral.degradedNodes.push(node);
											
											}catch(e){
												stopMask--;
												
											};
											
										});
										
										if(stopMask == 1) {										
											
											//Unmask all div containers 
											cnocFramework.unmask(divContainers);
											
											// Draw complete node list
											drawElementsGral.drawListNodesDegraded(drawElementsGral.degradedNodes, 'listNodes', 'listNodesG');										
										}
										
										stopMask--;
								},
								divContainers : [ $('#listNodes') ],
								divElements : [ $('#listNodesG') ]
							});
							
						} catch (e) {
							console.log(e);
							
							// Unmask all div containers 
							cnocFramework.unmask(divContainers);
						}
					}				
				},
				divContainers : [ ],
				divElements : [ ]
				
			});
			
		}, getTopOpFlow: function(node, ipOpflow){
			
			var unixtime = new Date().getTime() / 1000 | 0;
			
			//TOPS NETFLOW
			var getTopdata = ["getTopNTalkers", "getTopNListeners", "getTopNApplications", "getTopNApplicationSources", "getTopNProtocols", "getRawFlowMatrix"];
			for(var i=0; i<getTopdata.length; i++){
				$(".tops").empty();
				cnocFramework.invokeMashup({invokeUrl : endpoint.getOpFlowTopN,
					params : {
						"dns" : "true",
						"period" : "15",
						"time_tag_end" : unixtime,
						"rate" : "",
						"summary" : "bytes",
						"summarise" : "",
						"topn" : "10",
						"site_name" : node,
						"act" : "tableLoad",
						"data" : getTopdata[i],
						"ip" : ipOpflow
						},
					callback : drawElementsGral.topOpFlowPyrs,
					divContainers :  [$("#top"+i)],
					divElements : [$("#top"+i)]
				});

			}
			
			modelView();
			
			
		},topOpFlowPyrs: function(datos, divContainers, divElements){
		
			var table = "<table id='"+datos.table.id+"'>";
			
			table +="<thead><tr>";
			for(var idxth=0; idxth<datos.table.thead.tr.th.length; idxth++){
				table += "<th>";
				table += datos.table.thead.tr.th[idxth].content;
				table += "</th>";
			}
			table +="</tr></thead>";
			
			table +="</tbody>";
								
			
			for(var idxtr=0; idxtr<datos.table.tbody.tr.length; idxtr++){
				table += "<tr>";
				for(var idxtd=0; idxtd<datos.table.tbody.tr[idxtr].td.length; idxtd++){

					if(idxtd==0){
						if(datos.table.id === "getTopNProtocols"){
							table += "<td>";
							table += datos.table.tbody.tr[idxtr].td[idxtd];
							table += "</td>";
						}else{
							table += "<td title='"+datos.table.tbody.tr[idxtr].td[idxtd].a[1].title+"'>";
							table += datos.table.tbody.tr[idxtr].td[idxtd].a[1].content;
							table += "</td>";
						}						
					}else if(idxtd==1 && (datos.table.id === "getTopNApplicationSources" || datos.table.id === "getRawFlowMatrix")){
						table += "<td title='"+datos.table.tbody.tr[idxtr].td[idxtd].a[1].title+"'>";
						table += datos.table.tbody.tr[idxtr].td[idxtd].a[1].content;
						table += "</td>";
					}else if(datos.table.id === "getTopNApplications" && idxtd==1){
						table += "<td>";
						table += datos.table.tbody.tr[idxtr].td[idxtd];
						table += "</td>";
					}else{
						table += "<td>";
						table += datos.table.tbody.tr[idxtr].td[idxtd].content;
						table += "</td>";
					}
									
				}
				table += "</tr>";
			}
			
			table += "</tbody></table>";

			
			divContainers[0].append(table);
			
			jQuery("#" + datos.table.id).dataTable({
				"sDom": 'T<"clear">lfrtip',		
				"oTableTools": {
			        "aButtons": [
			            "copy",
			            "csv",
			            "xls"
			        ]
			    },
				 "sScrollX": "100%",
				 "sScrollY": 200,
				 "bScrollCollapse": true,
				 "bProcessing": true,
				 "iDisplayLength": 20
			});
			
			cnocFramework.unmask(divContainers);
			/*$("#getTopNTalkersG").html(datos.html.body.div.table);*/
			
		}, listNodes : function(status) {
			
			var nodeList = [];
			
			if (status === 'complete') { // Draw complete node list
				nodeList = drawElementsGral.reachableNodes.concat(drawElementsGral.degradedNodes);
				nodeList = nodeList.concat(drawElementsGral.unreachableNodes);
			
			} else if (status === 'reachable') { // Draw reachable node list
				nodeList = nodeList.concat(drawElementsGral.reachableNodes);
			
			} else if (status === 'degraded') { // Draw degraded node list
				//nodeList = nodeList.concat(drawElementsGral.degradedNodes);
				//drawElementsGral.getNodesByStatus(status, cnocConnector.codeNetGlobal);
				//drawElementsGral.getListNodesDegraded();
				cnocConnector.invokeMashup(cnocConnector.service14, {"codenet" : cnocConnector.codeNetGlobal,"group":"","status":status},drawElementsGral.drawListNodesV1, "listNodes", "listNodesG");
			
			} else if (status === 'unreachable') { // Draw unreachable node list
				nodeList = nodeList.concat(drawElementsGral.unreachableNodes);
			}
			
			drawElementsGral.drawListNodes(nodeList, status, 'listNodes', 'listNodesG');
			
		
		},getListNodesDegraded: function(){
			
			/*** Invoke NMIS Nodes by Status ***/
			cnocFramework.invokeMashup({
				invokeUrl : endpoint.getDegradedNodesList,
				params : {
					"networkCode" : cnocConnector.codeNetGlobal,
					"flag" : "1"
				},									
				callback : drawElementsGral.drawListNodesDegraded,				
				divContainers : [ $('#listNodes') ],
				divElements : [ $('#listNodesG') ]
			});
			
			
		}, drawListNodesDegraded: function (datos, container, divTable) {
			
			
			cnocFramework.invokeMashup({
				invokeUrl : endpoint.getDegradedNodesList,
				params : {
					"networkCode" : cnocConnector.codeNetGlobal,
					"flag" : "2"
				},									
				callback : function(datosSnmp, container, divTable){
					
					jQuery("#listNodes").empty();	
					var tableT = "";
					
					try {
							if (datos.records.record.length > 1) {
								for ( var i = 0; i < datos.records.record.length; i++) {
									
									tableT +=
										"<tr class='warning'>" +
											"<td><a href='#nodeResource'>"+datos.records.record[i].name.toString()+"</a></td>" +
											"<td><a href='#nodeResource'>"+datos.records.record[i].event.toString()+"</a></td>" +
											"<td><a href='#nodeResource'>"+datos.records.record[i].value_column.toString()+"</a></td>" +
											"<td><a href='#nodeResource'>"+datos.records.record[i].element.toString()+"</a></td>" +						
											"<td><a href='#nodeResource'>"+datos.records.record[i].updated.toString()+"</a></td>" +
										"</tr>";
								}
							} else {
								tableT +=
									"<tr class='warning'>" +
										"<td><a href='#nodeResource'>"+datos.records.record.name.toString()+"</a></td>" +
										"<td><a href='#nodeResource'>"+datos.records.record.event.toString()+"</a></td>" +
										"<td><a href='#nodeResource'>"+datos.records.record.value_column.toString()+"</a></td>" +
										"<td><a href='#nodeResource'>"+datos.records.record.element.toString()+"</a></td>" +						
										"<td><a href='#nodeResource'>"+datos.records.record.updated.toString()+"</a></td>" +
									"</tr>";
							}
							
							/***********************************************************************************************/
							/*  DATOS SNMP DOWN */
							
							if (datosSnmp.records.record.length > 1) {
								for ( var i = 0; i < datosSnmp.records.record.length; i++) {
									
									tableT +=
										"<tr class='warning'>" +
											"<td><a href='#nodeResource'>"+datosSnmp.records.record[i].name.toString()+"</a></td>" +
											"<td><a href='#nodeResource'>SNMP DOWN</a></td>" +
											"<td><a href='#nodeResource'></a></td>" +
											"<td><a href='#nodeResource'></a></td>" +						
											"<td><a href='#nodeResource'></a></td>" +
										"</tr>";
								}
							} else {
								tableT +=
									"<tr class='warning'>" +
										"<td><a href='#nodeResource'>"+datosSnmp.records.record.name.toString()+"</a></td>" +
										"<td><a href='#nodeResource'>SNMP DOWN</a></td>" +
										"<td><a href='#nodeResource'></a></td>" +
										"<td><a href='#nodeResource'></a></td>" +						
										"<td><a href='#nodeResource'></a></td>" +
									"</tr>";
							}
							
							
					
					} catch (err) {
						console.log(err);
					};		
					
					var rowsHeaders = [
						{ "sTitle" : "Node Name" },
						{ "sTitle" : "Event" },
						{ "sTitle" : "Value" },
						{ "sTitle" : "Element" },
						{ "sTitle" : "Updated" }
					];
					
					cnocConnector.drawGrid("listNodes", "listNodesG", tableT, rowsHeaders, false);
				},				
				divContainers : [ $('#listNodes') ],
				divElements : [ $('#listNodesG') ]
			});
			
			/*jQuery("#" + container).empty();	
			var tableT = "";
			
			try {
				$.each(datos, function(k,v) {
					tableT +=
						"<tr class='warning'>" +
							"<td><a href='#nodeResource'>"+v.name.toString()+"</a></td>" +
							"<td><a href='#nodeResource'>"+v.event.toString()+"</a></td>" +
							"<td><a href='#nodeResource'>"+v.value.toString()+"</a></td>" +
							"<td><a href='#nodeResource'>"+v.element.toString()+"</a></td>" +						
							"<td><a href='#nodeResource'>"+v.updated.toString()+"</a></td>" +
						"</tr>";
				});
				
			} catch (err) {
				console.log(err);
			};		
			
			var rowsHeaders = [
				{ "sTitle" : "Node Name" },
				{ "sTitle" : "Event" },
				{ "sTitle" : "Value" },
				{ "sTitle" : "Element" },
				{ "sTitle" : "Updated" }
			];
			
			cnocConnector.drawGrid(container, divTable, tableT, rowsHeaders, false);*/
			
		}, selectCustom : function(datos, selector, opt) {

			var selText = cnocConnector.drawSelect(datos, selector, "general");		
			var codeNet = $("#SelectCustomer").val(); 
			drawElementsGral.builder(codeNet);

		},countStatus: function(datos, container, divPanel){
			var rowsData = new Array();
			try {
				var fields = new Array();
				fields.push(datos.records.record.column1.toString());
				rowsData.push(fields);

			} catch (err) {};
			
			var panelText = cnocConnector.drawPanel(rowsData, container, divPanel);
			
		},mapaGeneral:function(codenet, typeData, flgNacional){
			$( "#mapGral").mask("Waiting...");
			var states = [];

			$.ajax({
				type : 'GET',
				dataType : 'jsonp',
				url: cnocConnector.service20,
				data: {network_code:codenet, type:typeData},
				error : function(jqXHR, textStatus, errorThrown) {
					console.log("error");
					console.log(jqXHR);
					$( "#mapGral").unmask();
				},
				success : function(response) {					
					var tmp = "";
					if(response.results){
						tmp = response.results.international.toString();
					}else{
						tmp = response.international.toString();
					}					
					
					try{

						if(tmp === "false" || flgNacional === true) {
							$.each( response, function( key, val ) {
								$.each( val, function( key, val ) {
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
										
										var totalN = parseInt(unreachableT) + parseInt(degradedT) + parseInt(reachableT);
										
										if(parseInt(unreachableT) >= 1){
											color = "#FF1600";
										}else if(parseInt(degradedT) >= 1){
											color = "#FFE200";
										}else {
											color ="#22FF00";
										}									
									});
									
									array.push(key);
									array.push("Normal: "+reachableT+" <br> Warning: "+degradedT+"<br> Critical: "+unreachableT);
									array.push(color);
									states.push(array);
								});								
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
						        	
						        	//if(states[a][0].indexOf(estado['name'].toUpperCase()) >-1 ){
						        	if(states[a][0] === estado['name'].toUpperCase() ){

						            var coords = estado['coords'];
						            for (var j = 0; j < coords.length; j++) {
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

						            	google.maps.event.addListener(map, 'zoom_changed', function() {						            		
							            	var zoomLevel = map.getZoom();
//							            	console.log(zoomLevel);
							                if (zoomLevel == 3) {
							                	drawElementsGral.mapaGeneral(codenet, null , false);
							                }
						        		});

						          } //Cierre IF
						        } // Cierre FOR states
						      }
						} else if(tmp === "true") {
							var records = [];
							$.each( response, function( key, val ) {																
								$.each( val, function( key, val ) {
									
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
						    	  return true;				        

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
						            
									if(codenet.indexOf('N')>=0){
										google.maps.event.addListener(mapaNacional, 'click', function(){
							            	drawElementsGral.mapaGeneral(codenet,"NACIONAL", true);
							            });	
									}

						      	}
						    });
							
						}
					}catch(e){
						console.log(e);
					}
					$( "#mapGral").unmask();
				}
			});

		},mapaMundial:function(codenet){
			$( "#mapGral").mask("Waiting...");

			$.ajax({
				type : 'GET',
				dataType : 'json',
				url : cnocConnector.service28 = serviceG17,
				data: {network_code:codenet},
				error : function(jqXHR, textStatus, errorThrown) {
					console.log(jqXHR);
					$( "#mapGral").unmask();
					drawElementsGral.mapaMundial(cnocConnector.codeNetGlobal);
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
				            
				            if(codenet === 'N000269'){
				        		google.maps.event.addListener(mapaNacional, 'click', function(){
					            	drawElementsGral.mapaGeneral(codenet);
					            });		
				            }
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

		  }, chartGroups : function(datos, container) {
			
			var categorias = new Array();
			var unreachable = new Array();
			var reachable = new Array();
			var degraded = new Array();
			
			$.each(datos, function(k,v) {
				categorias.push(v.groups.toString());
				unreachable.push(v.unreachable);
				reachable.push(v.reachable);
				degraded.push(v.degraded);
			});			
			
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

			new Highcharts.Chart({
				chart : {
					renderTo : container.selector.substring(1),
					plotBackgroundColor : null,
					plotBorderWidth : null,
					plotShadow : false,
					type : 'bar'
				},
				title : {
					text : null
				},
				credits : {
					enabled : false
				},
				xAxis : {
					categories : categorias,
					labels : {
						style : {
							fontSize : '8px',
							fontFamily : 'Verdana, sans-serif'
						}
					}
				},
				yAxis : {
					min : 0,
					title : {
						text : 'Total Nodes'
					}
				},
				legend : {
					reversed : true
				},
				plotOptions : {
					series : {
						stacking : 'normal',
						events : {
							click : function(event) {
								if (event.point.series.name === "Normal") {
									status = "reachable";
								} else if (event.point.series.name === "Warning") {
									status = "degraded";
								} else if (event.point.series.name === "Critical") {
									status = "unreachable";
								}
								cnocConnector.invokeMashup(cnocConnector.service14, {"codenet" : cnocConnector.codeNetGlobal,"group":event.point.category,"status":status},drawElementsGral.drawListNodesV1, "listNodes", "listNodesG");
							}
						}
					},
					color : [ '#FF0000', '#000000' ]
				},
				series : totalNodos
			});			
			
			
	}, drawListNodes: function (datos, status, container, divTable) {
		jQuery("#" + container).empty();
		var tableT = "";
		var rowsHeaders = [];
		
		if (status === 'unreachable') {
			rowsHeaders = [
			       			{ "sTitle" : "Node Name" },
			       			{ "sTitle" : "Updated" }
			       		];
		
		} else {
			rowsHeaders = [ { "sTitle" : "Node Name" } ];			
		}
		
		try {			
			$.each(datos, function(k,v) {
				var _class = '';
				
				if(v.status === 'reachable')
					_class = 'success';
				else if(v.status === 'degraded')
					_class = 'warning';
				else if(v.status.toString()==="unreachable")
					_class = 'danger';
				
				if (status === 'unreachable') {
					tableT +=
						"<tr class='" + _class + "'>" +
							"<td><a href='#nodeResource'>"+v.name.toString()+"</a></td>" +						
							"<td><a href='#nodeResource'>"+v.updated.toString()+"</a></td>" +
						"</tr>";
					
				} else {
					tableT +=
						"<tr class='" + _class + "'>" +
							"<td><a href='#nodeResource'>"+v.name.toString()+"</a></td>" +
						"</tr>";					
				}
			});
			
		} catch (err) {
			console.log(err);
		};		
		
		cnocConnector.drawGrid(container, divTable, tableT, rowsHeaders, false);
		
	},drawListNodesV1: function (datos, container, divTable){
		jQuery("#" + container).empty();	
		var tableT = "";
		try {
			if (datos.records.record.length > 1) {
				for ( var i = 0; i < datos.records.record.length; i++) {
					if(datos.records.record[i].status_value.toString()==="degraded"){
						tableT += "<tr class='warning'><td>"+datos.records.record[i].name.toString()+"</td></tr>";
					}else if(datos.records.record[i].status_value.toString()==="reachable"){
						tableT += "<tr class='success'><td>"+datos.records.record[i].name.toString()+"</td></tr>";
					}else if(datos.records.record[i].status_value.toString()==="unreachable"){
						tableT += "<tr class='danger'><td>"+datos.records.record[i].name.toString()+"</td></tr>";
					};					
				};
			} else {
				if(datos.records.record.status_value.toString()==="degraded"){
					tableT += "<tr class='warning'><td>"+datos.records.record.name.toString()+"</td></tr>";
				}else if(datos.records.record.status_value.toString()==="reachable"){
					tableT += "<tr class='success'><td>"+datos.records.record.name.toString()+"</td></tr>";
				}else if(datos.records.record.status_value.toString()==="unreachable"){
					tableT += "<tr class='danger'><td>"+datos.records.record.name.toString()+"</td></tr>";
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
	
	}, topGrid: function(datos, container, divTable) {
		
		$("#"+container).empty();

		tableT = "";
		try {
			for ( var i = 0; i < datos.length; i++) {
				var _class = "success";
				if(datos[i].value > 90){
					_class = "danger";
				}else if(datos[i].value > 80 && datos[i].value < 90){
					_class = "warning";
				}else if(datos[i].value < 80){
					_class = "success";
				}
				
				tableT += "<tr class='"+_class+"'>";
				
				tableT += '<td><div class="progress">';
				tableT += '<div class="progress-bar progress-bar-'+_class+' progress-bar-striped" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style="width:'+datos[i].value+'%">';
				tableT += datos[i].value+'%</div></div></td>';
				
				tableT += 
				"<td>"+datos[i].node+"</td>" +
				"<td>"+datos[i].value+"</td>" +
				"<td>"+datos[i].element+"</td>";
				
				tableT += "</tr>";
			}
			
		} catch (err) { console.log(err); };
		var rowsHeaders = [ {
			"sTitle" : "   "
		},{
			"sTitle" : "Node"
		}, {
			"sTitle" : "Value"
		}, {
			"sTitle" : "Element"
		} ];
		
		
		jQuery("#" + container).append('<table  style="width:100%;" class="table table-striped table-hover" id="'+ divTable + '">'+tableT+'</table>');
		
		dTable = jQuery("#" + divTable).dataTable({
			"sDom": 'T<"clear">lfrtip',
			"oTableTools": {
		        "aButtons": [
		            "copy",
		            "csv",
		            "xls"
		            ]
		    },
			//"aaData" : rowsData,
			"aoColumns" : rowsHeaders,
			"sScrollX": "100%",
			"sScrollXInner": "100%",
			"sScrollY": 350,
			"bScrollCollapse": true,
			"bProcessing": true,
			"bSort": false
		});

		if(container==="tTops"){
			modelView();
		}

		//cnocConnector.drawGrid(container, divTable, rowsData, rowsHeaders, false);
		
	}, topGridMain: function(datos, container, divTable) {
		
		$("#"+container).empty();

		var tableT = "";
		try {
			for ( var i = 0; i < datos.length; i++) {
				var _class = "success";
				if(datos[i].value > 90){
					_class = "danger";
				}else if(datos[i].value > 70 && datos[i].value < 90){
					_class = "warning";
				}else if(datos[i].value < 70){
					_class = "success";
				}
				
				tableT += "<tr class='"+_class+"'>";
				
				tableT += '<td><div class="progress">';
				tableT += '<div class="progress-bar progress-bar-'+_class+' progress-bar-striped" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style="width:'+datos[i].value+'%">';
				tableT += datos[i].value+'%</div></div></td>';
				
				tableT += 
				"<td>"+datos[i].node+"</td>" +
				"<td>"+datos[i].value+"</td>" +
				"<td>"+datos[i].element+"</td>";
				
				tableT += "</tr>";
			}
			
		} catch (err) { console.log(err); };
		var rowsHeaders = [ {
			"sTitle" : "   "
		},{
			"sTitle" : "Node"
		}, {
			"sTitle" : "Value"
		}, {
			"sTitle" : "Element"
		} ];
		
		
		jQuery("#" + container).append('<table  style="width:100%;" class="table table-striped table-hover" id="'+ divTable + '">'+tableT+'</table>');
		
		var dTable = jQuery("#" + divTable).dataTable({
			"sDom": 'T<"clear">lfrtip',
			"oTableTools": {
		        "aButtons": [
		            "copy",
		            "csv",
		            "xls"
		            ]
		    },
			//"aaData" : rowsData,
			"aoColumns" : rowsHeaders,
			"sScrollX": "100%",
			"sScrollXInner": "100%",
			"sScrollY": 350,
			"bScrollCollapse": true,
			"bProcessing": true,
			"bSort": false
		});


			$("#" + divTable).delegate("tbody tr", "click", function () {
					
					$("#tTops").hide();
					$("#contenedorChartTops").show();
					
					dTable.$('tr.row_selected').removeClass('row_selected');
					$(this).addClass('row_selected');
					
					var nTds = $('td', dTable.$('tr.row_selected'));
					var node = $(nTds[1]).text();				
					
					drawElementsGral.intTops = $(nTds[3]).text();
					
					$( '#headerGridsDetailG' ).text("Tops: "+node);
					
					/* GET DATA FOR TREE NODE RESOURCE */
					cnocConnector.invokeMashup(cnocConnector.service26, {"hostname" : node, "codenet" : cnocConnector.codeNetGlobal},drawElementsGral.treeData, "", "");
					cnocConnector.invokeMashup(cnocConnector.service24, {"node" : node, "codenet" : cnocConnector.codeNetGlobal},drawElementsGral.drawGetModel, "listNodeDetail", "listNodeDetailG");
					cnocConnector.invokeMashup(cnocConnector.service22, {"hostname" : node,"code_net":cnocConnector.codeNetGlobal},drawElementsGral.countTotal, "relatedIncidentsC", "relatedIncidentsCG");
					cnocConnector.invokeMashup(cnocConnector.service23, {"hostname" : node,"code_net":cnocConnector.codeNetGlobal},drawElementsGral.countTotal, "relatedChangesC", "relatedChangesCG");
					
					cnocFramework.invokeMashup({invokeUrl : endpoint.getIpOpflow,
						params : {
							"node_name" : node 					
							},
						callback : function(response){
							
							if(response.records.length == 0){
								//alert("No existe Informacion de TOPS");
								$("#divContainerTops").hide();
								modelView();
							}else{								
								drawElementsGral.getTopOpFlow(response.records.record.host_name_pyrs, response.records.record.ip_lan_opflow);
							}
						},
						divContainers :  [$("#top2")],
						divElements : [$("#top2")]
					});
				});

		//cnocConnector.drawGrid(container, divTable, rowsData, rowsHeaders, false);
		
	},
	/*** Old Tops 
	 topGrid: function(datos, container, divTable){
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
		
	}, Old Tops ***/
	detailIncidents: function(datos, container, divTable) {
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
		$("#msgPingOnly").empty();
		
		if(datos.records.record.model.toString() === "PingOnly"){
			cnocConnector.invokeMashup(cnocConnector.service25, {"hostname" : datos.records.record.name.toString()},drawElementsGral.drawPingOnly, "msgPingOnly", "msgPingOnlyG");
		}else{
			cnocConnector.invokeMashup(cnocConnector.service19, {"node" : datos.records.record.name.toString(), "codenet" : cnocConnector.codeNetGlobal},drawElementsGral.drawListNodeDetail, "listNodeDetail", "listNodeDetailG");
			cnocConnector.invokeMashup(cnocConnector.service21, {"node" : datos.records.record.name.toString(), "codenet" : cnocConnector.codeNetGlobal},drawElementsGral.drawGridInterface, "listInterfaces", "listInterfacesG");
		}
		
	},drawPingOnly:function(datos, container, divTable){
		
		var msg = '<div class="alert alert-info" id="'+divTable+'">Note: Ping Only</br><strong>'+datos.records.record.hostname+'</strong>';
		msg += "</br>IP WAN: "+datos.records.record.ip_wan;
		msg += "</br>Monitoring IP: "+datos.records.record.monitoring_ip;
		msg += "</div>";
		$("#"+container).append(msg);
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
					tableT += "<td>"+datos.records.record[i].ifadminstatus.toString()+"</td>";
					tableT += "<td>"+datos.records.record[i].ifspeed.toString()+"</td></tr>";
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
				tableT += "<td>"+datos.records.record.ifadminstatus.toString()+"</td>";
				tableT += "<td>"+datos.records.record.ifspeed.toString()+"</td></tr>";
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
			}, {
				"sTitle" : "Bandwidth (Kbps)"
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
		
	},command: function(datos, container, divTable) {
		$( '#resultCommand' ).text(datos);
		
		var modal = bootbox.dialog({
			message: $("#cmd").html(),
			title: "Command result for " + cnocConnector.nodeGlobal,
			buttons: [{
				label: "Close",
				className: "btn btn-default",
				callback: function() { }
			}],
			show: false,
			onEscape: function() {
				modal.modal("hide");
			}
		});
		
		$( '#page-wrapper' ).unmask();
				
		modal.modal("show");
		
	},ipAccounting: function(data) {
		
		modalIP = bootbox.dialog({
			message: $("#ipAcc").html(),
			title: "IP Accounting Report: " + cnocConnector.nodeGlobal,
			buttons: [{
				label: " Send Report",
				className: "btn btn-primary glyphicon glyphicon-send btnIP",
				callback: function() {
					
					var button = modalIP.find( '.btnIP' );
					var contactMail = modalIP.find( '#contactEmailIP' );
					var message = modalIP.find( '#messageIP' );
					var time = modalIP.find( '#timeIP' );
					
					data.contactMail = contactMail.val();
					data.time = time.val();
					
					$( message ).attr("disabled", "disabled");
					
					$(button).attr("disabled", "disabled");
					$(button).text("Waiting...");					
					
					$( contactMail ).attr("disabled", "disabled");
					$( message ).val("Waiting...");
					
					if (data.contactMail == "" || data.contactMail == null || data.contactMail == undefined) {						
						
						$( contactMail ).removeAttr("disabled");
						
						$( message ).val("Contact Email is required.");
						
						$( button ).text(" Send Report");
						$( button ).removeAttr("disabled");
						
					} else {
						cnocConnector.invokeMashup(
								cnocConnector.service32,
								{
									"network_code" : data.network_code,
									"hostname" : data.hostname,
									"nmisServer" : cnocConnector.nmisServer,
									"community1" : cnocConnector.community1,
									"community2" : cnocConnector.community2,
									"emails" : data.contactMail,
									"time" : data.time
								},
								drawElementsGral.ipEmail,
								"commandNS",
								"ipAccountingContainerNS");
					}
					
					return false;
				}
			}, {
				label: "Close",
				className: "btn btn-default",
				callback: function() { }
			}],
			show: false,
			onEscape: function() {
				modalIP.modal("hide");
			}
		});

		modalIP.modal("show");
		var time = modalIP.find( '#timeIP' );
		
		/*** Enable or disable clear IP Accounting table ***/
		if(data.community2 === "" || data.community2== null) {
			time.empty();
			time.attr("disabled", "disabled");
			time.append(
					'<option value="0">No write community found</option>'					
			);
		} else {
			time.removeAttr("disabled");
			time.empty();
			time.append(
					'<option value="0">Do not clear IP Accounting</option>' +
					'<option value="600000">Clear and wait 10 minutes</option>' +
					'<option value="900000">Clear and wait 15 minutes</option>' +
					'<option value="1200000">Clear and wait 20 minutes</option>'	
			);
		}
		
	}, ipEmail : function(data) {		
		if (data == '' || data == null) {
			
			modalIP.find( '#contactEmailIP' ).removeAttr("disabled");
			
			modalIP.find( '#messageIP' ).val("No information Retrived.");			
			
			modalIP.find( '.btnIP' ).text(" Send Report");
			modalIP.find( '.btnIP' ).removeAttr("disabled");
			
		} else if (data.indexOf("IP Accounting Report has been sent") > -1 || 
				data.indexOf("There is another IP Accounting") > -1) {
			
			modalIP.find( '#contactEmailIP' ).removeAttr("disabled");
			
			modalIP.find( '#messageIP' ).val("IP Accounting Report has been sent and can take some minutes to arrive.");
			modalIP.find( '#messageIP' ).removeAttr("disabled");
			
			modalIP.find( '.btnIP' ).text(" Send Report");
			modalIP.find( '.btnIP' ).removeAttr("disabled");
		} else {
			
			modalIP.find( '#contactEmailIP' ).removeAttr("disabled");
			
			modalIP.find( '#messageIP' ).val(data);
			modalIP.find( '#messageIP' ).removeAttr("disabled");
			
			modalIP.find( '.btnIP' ).text(" Send Report");
			modalIP.find( '.btnIP' ).removeAttr("disabled");
		}
	},treeData: function(datos, container, divTable){

		var name = datos.records.record.name;
		var nmis = datos.records.record.nmisserver;
		cnocConnector.nmisServer = nmis; 
		var model = datos.records.record.model;
		drawElementsPerformance.qosIn = false;
		
		
		drawElementsPerformance.dataChartPerformance.length = 0;
		drawElementsPerformance.nodePerformance = name;
		drawElementsPerformance.nmis = nmis;					
		var startDate = ((new Date().getTime()).toString()).substring(0,10)-86400;
		var endDate = ((new Date().getTime()).toString()).substring(0,10);
		
		drawElementsPerformance.endUnix = endDate;
		drawElementsPerformance.endDate = "";
		drawElementsPerformance.startDate = startDate;
		
		
		if(model === 'PingOnly'){
			drawElementsPerformance.selectPingOnly();
			drawElementsPerformance.drawChartHealth();
		}else{
			if(name.indexOf("_UPS") > 0){
				drawElementsPerformance.selectUps();
				drawElementsPerformance.drawChartHealth();
			}else{
				
				cnocConnector.invokeMashup(cnocConnector.service29, {
					"name" : name,
					"codenet" : cnocConnector.codeNetGlobal
				},function(datos){
					var vendor = datos.records.record.nodemodel;
					drawElementsPerformance.vendor = vendor;
					
					cnocConnector.invokeMashup(cnocConnector.service1, {
						"endpoint" : "http://"+nmis+"/omk/opCharts/nodes/"+name+"/resources/cbqos-out/indicies.json",
						"ip":nmis
					},drawElementsPerformance.selectInterfaz, "SelectInterfaz", "cmbInterfazP");
					
					cnocConnector.invokeMashup(cnocConnector.service1, {
						"endpoint" : "http://"+nmis+"/omk/opCharts/nodes/"+name+"/resources/",
						"ip":nmis
					},function(data){							
						for(var x=0; x<data.length; x++){
							if(data[x].name==="cbqos-in"){
								drawElementsPerformance.qosIn = true;
							}else if(data[x].name==="bgpPeer"){
								cnocConnector.invokeMashup(cnocConnector.service1, {
        							"endpoint" : "http://"+nmis+"/omk/opCharts/nodes/"+name+"/resources/bgpPeer/indicies",
        							"ip":nmis
        						},function(data){		

        							drawElementsPerformance.idResourceInterfaz = data.results.datum.value;
        							
        							var tree = "<ul><li><span class='treeNode badge badge-success'><i class='icon-minus-sign'></i> BGPPeer </span><ul>";
        							tree += "<li id='"+data.results.datum.value+"' class='bgpPeer'><span class='treeNode'><i class='icon-minus-sign'><a title='"+data.results.datum.name+"' href='#nodeChart'>"+data.results.datum.tokens[0]+"--"+data.results.datum.tokens[1]+"...</a></i></span></li>";
        							tree += "</ul></li>";
        							tree += "<ul>";

        							$("#treeNodeDetailInterfaz").append(tree);
        							
        							$( ".bgpPeer" ).click(function() {
        								drawElementsPerformance.idResourceInterfaz = $(this).attr( 'id' );
        								drawElementsPerformance.drawBgp();
        							});
        							
        						}, null, null);
							}
						}
					}, null, null);
					
					drawElementsPerformance.drawChartHealth();
				},"","");
				
			}
		}			
	}, drawListTunnelStateVPN: function (datos, container, divTable) {
		jQuery("#" + container).empty();	
		var tableT = "";
		try {
			if (datos.records.record.length > 1) {
				for ( var i = 0; i < datos.records.record.length; i++) {
					if(datos.records.record[i].opersense.toString() === "up") {
						tableT += "<tr class='success'>" +
									"<td>"+datos.records.record[i].id.toString()+"</td>" +
									"<td>"+datos.records.record[i].vpnmonvpnname.toString()+"</td>" +
									"<td>"+datos.records.record[i].opersense.toString()+"</td>" +
								  "</tr>";
					} else if(datos.records.record[i].opersense.toString() === "down") {
						tableT += "<tr class='danger'>" +
									"<td>"+datos.records.record[i].id.toString()+"</td>" +
									"<td>"+datos.records.record[i].vpnmonvpnname.toString()+"</td>" +
									"<td>"+datos.records.record[i].opersense.toString()+"</td>" +
								  "</tr>";
					}
				}
			} else {
				if(datos.records.record.opersense.toString() === "up") {
					tableT += "<tr class='success'>" +
								"<td>"+datos.records.record.id.toString()+"</td>" +
								"<td>"+datos.records.record.vpnmonvpnname.toString()+"</td>" +
								"<td>"+datos.records.record.opersense.toString()+"</td>" +
							  "</tr>";
				} else if(datos.records.record.opersense.toString() === "down") {
					tableT += "<tr class='danger'>" +
								"<td>"+datos.records.record.id.toString()+"</td>" +
								"<td>"+datos.records.record.vpnmonvpnname.toString()+"</td>" +
								"<td>"+datos.records.record.opersense.toString()+"</td>" +
							  "</tr>";
				}
			}
		} catch (err) {
			console.log(err);
		};		
		
		var rowsHeaders = [ {
			"sTitle" : "ID"
		}, {
			"sTitle" : "Name"
		},{
			"sTitle" : "Status"
		} ];
		
		cnocConnector.drawGrid(container, divTable, tableT, rowsHeaders, false);
	
	}, unmanaged: function(data, container, divTable) {
		if (data.results.result === 'success') {
			$( '#modalUnmanagedContent' ).append(
					'<br><div class="row">' +
				    	'<div class="col-lg-12">' +
							'<div class="alert alert-warning" role="alert"><i class="fa fa-warning fa-fw"></i> You had deactivated all monitoring for: ' + 
							cnocConnector.nodeGlobal + '</div>' +
						'</div>' +
					'</div>');
			
			$( '#saveUnmanaged' ).attr('disabled','disabled');
		
		} else {
			$( '#modalUnmanagedContent' ).append(
					'<br><div class="row">' +
				    	'<div class="col-lg-12">' +
							'<div class="alert alert-danger" role="alert"><i class="fa fa-warning fa-fw"></i> Can&#39;t unmanaged ' + 
							cnocConnector.nodeGlobal + '</div>' +
						'</div>' +
					'</div>');
		}
	},timeConverter: function (UNIX_timestamp){
		  var a = new Date(UNIX_timestamp * 1000);
		  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
		  var year = a.getFullYear();
		  var month = months[a.getMonth()];
		  var date = a.getDate();
		  var hour = a.getHours();
		  var min = a.getMinutes();
		  var sec = a.getSeconds();
		  var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
		  return time;
		}
};
