var cnocConnector = {
	themeMapa: '',	
	refresh: 0,	
	codeNetGlobal : '',
	nodeGlobal : '',
	hostname : '',
	logout : '',
	ipserver : '',
	incidents : '',
	userName :'',
	mainPage:'',
	nmisServer:'',
	community1:'',
	community2:'',
	/*
	invokeMashup : function(invokeUrl, params, callback, divcontainer, divelements) { //***** DEV *****
			$( "#" + divcontainer ).mask("Waiting...");
		try {
			$.ajax({
				type : 'GET',
				dataType : 'jsonp',
				url : invokeUrl,
				data : params,
				error : function(jqXHR, textStatus, errorThrown) {
					console.log(jqXHR);
					console.log(textStatus);
					console.log(errorThrown);
					$( "#" + divcontainer ).unmask();
				},
				success : function(response) {
					try {
						var ce = response.PrestoResponse.PrestoError.ErrorDetails.code;
						if (ce == 401) {
							alert("Insuficientes Prvilegios");
							window.location = "/dashboardDHL/index.html";
						}
					} catch (err) {
						callback(response, divcontainer, divelements);
						$( "#" + divcontainer ).unmask();
					}
				}
			});
		} catch (error) {
			alert(error);
			$( "#" + divcontainer ).unmask();
		}
	},
	*/
	invokeMashup : function(invokeUrl, params, callback, divcontainer, divelements) { //***** PROD *****
		$( "#" + divcontainer ).mask("Waiting...");
		try {
			$.ajax({
				type : 'GET',
				dataType : 'json',
				url : invokeUrl,
				data : params,
				statusCode : {
					401 : function() {
						alert('Session Time Out');
						window.location = "/dashboard/index.html";
					}
				},
				error : function(jqXHR, textStatus, errorThrown) {
					console.log(jqXHR);
					console.log(textStatus);
					console.log(errorThrown);
					$( "#" + divcontainer ).unmask();
				},
				success : function(response) {
					try {
						var ce = response.PrestoResponse.PrestoError.ErrorDetails.code;
						if (ce == 401) {
							alert("Insuficientes Prvilegios");
							window.location = "/dashboard/index.html";
						}
					} catch (err) {
						callback(response, divcontainer,divelements);
						$( "#" + divcontainer ).unmask();
					}
				}
			});
		} catch(error) {
			alert(error);
			$( "#" + divcontainer ).unmask();
		}
	},
	
	drawGrid : function(container, divTable, rowsData, rowsHeaders, pagination) {
		jQuery("#" + container).empty();
				
		
		var dTable;
		if(divTable === "listNodesG" || divTable ==="listNodeDetailG" || divTable === "listNodesP" || divTable === "listInterfacesG" || divTable === "listLogI" || divTable==="listNodesSctG" || divTable==="listTunelStateG"){
			
			var scrollY = "330";
			if(divTable === "listNodesP"){
				scrollY = "330";
			}else if(divTable === "listLogI"){
				scrollY = "500";
			}else if(divTable === "listNodesSctG"){
				scrollY = "300";
			}else if(divTable === "listNodesG"){
				scrollY = "200";
			}
			
			jQuery("#" + container).append('<table class="table table-striped table-hover" id="'+ divTable + '">'+rowsData+'</table>');
			dTable = jQuery("#" + divTable).dataTable({
				"sDom": 'T<"clear">lfrtip',		
				"oTableTools": {
			        "aButtons": [
			            "copy",
			            "csv",
			            "xls"
			        ]
			    },
				 "aoColumns" : rowsHeaders,
				 "sScrollX": "100%",
//				 "sScrollXInner": "365%",
				 "sScrollY": scrollY,
				 "bScrollCollapse": true,
				 "bProcessing": true,
				 "iDisplayLength": 20
			});
			
			setTimeout(function(){
				 dTable.fnAdjustColumnSizing();
			 },10);
			
		} else if ( divTable === 'tTopsTable' ) { /*** Top ***/
			jQuery("#" + container).append('<table  style="width:100%;" class="table table-striped table-hover" id="'+ divTable + '"></table>');
			dTable = jQuery("#" + divTable).dataTable({
				"sDom": 'T<"clear">lfrtip',
				"oTableTools": {
			        "aButtons": [
			            "copy",
			            "csv",
			            "xls"
			            ]
			    },
				"aaData" : rowsData,
				"aoColumns" : rowsHeaders,
				"sScrollX": "100%",
				"sScrollXInner": "100%",
				"sScrollY": "200",
				"bScrollCollapse": true,
				"bProcessing": true,
				"bSort": false
			});
			
		} else {
			var scrollY = "200";
			if(divTable === "listCustomerCostosC"){
				scrollY = "320";
			} else if(divTable === "listBizserviceTi" || divTable === "openTicketsListTi"){
				scrollY = "400";
			}else if(divTable==="topInUtilization"){
				scrollY = "200";
			}
			
			if(divTable === "tableInventory"){
				scrollY = "600";
				
				jQuery("#" + container).append('<table class="table table-striped table-hover" id="'+ divTable + '"></table>');
				dTable = jQuery("#" + divTable).dataTable({
					"aaData" : rowsData,
					"aoColumns" : rowsHeaders,
					"sDom": 'T<"clear">lfrtip',
					"oTableTools": {
				        "aButtons": [
				            "copy",
				            "csv",
				            "xls"
				            ]
				    },
					"sScrollX": "100%",
					"sScrollXInner": "100%",
					"sScrollY": scrollY,
					"bScrollCollapse": true,
					"bProcessing": true,
					"order": [[ 0, "desc" ]]
				});				
			
			}/*else if(divTable === "listLogI"){
				console.log(divTable);
				scrollY = "800";
				
				jQuery("#" + container).append('<table class="table table-striped table-hover" id="'+ divTable + '"></table>');
				dTable = jQuery("#" + divTable).dataTable({
					"aaData" : rowsData,
					"aoColumns" : rowsHeaders,
					"sDom": 'T<"clear">lfrtip',
					"oTableTools": {
				        "aButtons": [
				            "copy",
				            "csv",
				            "xls"
				            ]
				    },
					"sScrollX": "100%",
					"sScrollXInner": "100%",
					"sScrollY": scrollY,
					"bScrollCollapse": true,
					"bProcessing": true,
					"order": [[ 0, "desc" ]]
				});
			}*/else {
				jQuery("#" + container).append('<table  style="width:100%;" class="table table-striped table-hover" id="'+ divTable + '"></table>');
				dTable = jQuery("#" + divTable).dataTable({
					"sDom": 'T<"clear">lfrtip',			
			        /*"oTableTools": {
			            "sSwfPath": "js/TableTools/swf/copy_csv_xls_pdf.swf"
			        },*/
					"oTableTools": {
				        "aButtons": [
				            "copy",
				            "csv",
				            "xls"
				            ]
				    },
					"aaData" : rowsData,
					"aoColumns" : rowsHeaders,
					"sScrollX": "100%",
					"sScrollXInner": "100%",
					"sScrollY": scrollY,
					"bScrollCollapse": true,
					"bProcessing": true
				});
			}
		
			 setTimeout(function(){
				 dTable.fnAdjustColumnSizing();
			 },10);
		}
		
		if(divTable==="listNodesSctG"){
			$("#" + divTable).delegate("tbody tr", "click", function () {
				dTable.$('tr.row_selected').removeClass('row_selected');
				$(this).addClass('row_selected');
				
				var nTds = $('td', dTable.$('tr.row_selected'));
				var node = $(nTds[0]).text();
				var id = $(nTds[0]).attr('rel');	
				
				cnocConnector.nodeGlobal = id;
				drawElementsSct.nodeSctGlobal = node;
				var idAp = node.split("_");
				
				drawElementsSct.dataChartSct.length = 0;
				drawElementsSct.subtitleChartSct = "Node Name: "+node;
				cnocConnector.invokeMashup(cnocConnector.service4, {"id":id},drawElementsSct.drawInterfazTree, "", "");					
				cnocConnector.invokeMashup(cnocConnector.service3, {"id":id,"status":""},drawElementsSct.drawListNodeDetail, "listNodeDetail", "listNodeDetail");
				cnocConnector.invokeMashup(cnocConnector.service5, {"id":id},drawElementsSct.drawChartPingSct, "containerChartPingSct", "containerChartPingSctG");
				cnocConnector.invokeMashup(cnocConnector.service9, {"id":idAp[0]},drawElementsSct.gridAp, "containerAp", "containerApG");
				cnocConnector.invokeMashup(cnocConnector.service15, {"id":id},drawElementsSct.gridInterfacesFlow, "containerInterfacesFlow", "containerInterfacesFlowG");
				cnocConnector.invokeMashup(cnocConnector.service13, {"id":node},drawElementsSct.bw, "", "");
				
				/*FILTRADO DE CONTENIDO SCT*/
				cnocConnector.invokeMashup(cnocConnector.service11, {"id":node},drawElementsSct.chartFilter_1, "containerChartFilter_1", "containerChartFilter_1G");
				drawElementsSct.filterContentLabel = "Infrastructure History";
				cnocConnector.invokeMashup(cnocConnector.service12, {"id":node, "subtype":"Infrastructure"},drawElementsSct.chartFilter_2, "containerChartFilter_2", "containerChartFilter_2G");
				//drawElementsSct.filterContentLabel = "Content Filtering by APP";
				cnocConnector.invokeMashup(cnocConnector.service14, {"id":node, "type":"Infrastructure"},drawElementsSct.chartFilter_3, "containerChartFilter_3", "containerChartFilter_3G");
			});
			
		}
		
		if(divTable === "listIncidentsI") {
			$("#" + divTable).delegate("tbody tr", "click", function () {
				dTable.$('tr.row_selected').removeClass('row_selected');
				$(this).addClass('row_selected');
				
				var nTds = $('td', dTable.$('tr.row_selected'));
				var id = $(nTds[3]).text();
				var idIncident = $(nTds[0]).text();

				$(".form-control").val("");
				cnocConnector.nodeGlobal = id;
				cnocConnector.invokeMashup(cnocConnector.serviceI18, {"node" : id, "codenet" : cnocConnector.codeNetGlobal},drawElementsIncidents.drawGetModel, "listNodeDetail", "listNodeDetailI");
				cnocConnector.invokeMashup(cnocConnector.serviceI15, {"hostname" : cnocConnector.nodeGlobal,"code_net":cnocConnector.codeNetGlobal},drawElementsIncidents.detailIncidentsNode, "listIncidentsRelated", "listIncidentsRelatedI");
				cnocConnector.invokeMashup(cnocConnector.serviceI16, {"hostname" : cnocConnector.nodeGlobal,"code_net":cnocConnector.codeNetGlobal},drawElementsIncidents.detailChangesNode, "listChangesRelated", "listChangesRelatedI");
				cnocConnector.invokeMashup(cnocConnector.serviceI17, {"incident_id" : idIncident},drawElementsIncidents.activitiesIncidents, "activitiesIncidents", "activitiesIncidentsI");
			});
		}
		
		if (divTable === "listBizserviceTi") {
			
			$("#" + divTable).delegate("tbody tr", "click", function () {
					dTable.$('tr.row_selected').removeClass('row_selected');
					$(this).addClass('row_selected');					
					var nTds = $('td', dTable.$('tr.row_selected'));
					
					var data = {
						category: "incident",
						title: "",
						description: "",
						company: $(nTds[1]).text(),
						networkCode: $(nTds[0]).text(),
						assigmentGroup: $(nTds[2]).text(),
						siteId: $(nTds[6]).text(),
						siteName: $(nTds[5]).text(),
						subcategory: "CUSTOMER",
						impact: "3",
						urgency: "3",
						contactPerson: "",
						contactMail: "",
						affectedService: $(nTds[3]).text(),
						uniqueIdentifier: $(nTds[4]).text()
					};
					
					drawElementsTickets.openTicket(data);					
					
			});
		}
		
		if (divTable === "openTicketsListTi") {
			$("#" + divTable).delegate("tbody tr", "click", function () {
				$("#openTicketsListActivities").empty();
				dTable.$('tr.row_selected').removeClass('row_selected');
				$(this).addClass('row_selected');					
				var nTds = $('td', dTable.$('tr.row_selected'));
				
				var data = {
					number: $(nTds[0]).text(),
					updateAction : ""
				};
				
				cnocConnector.invokeMashup(cnocConnector.serviceI17, {"incident_id" : $(nTds[0]).text()},drawElementsTickets.activitiesIncidents, "openTicketsListActivities", "openTicketsListActivitiesTi");
				
				drawElementsTickets.updateTicket(data);

			});
		}
		
		if (divTable === "openTaskEscalateListTi") {
			$("#" + divTable).delegate("tbody tr", "click", function () {
				$("#listActivitiesTaskEscalate").empty();
				dTable.$('tr.row_selected').removeClass('row_selected');
				$(this).addClass('row_selected');
				var nTds = $('td', dTable.$('tr.row_selected'));				
				
				cnocConnector.invokeMashup(
						cnocConnector.service2,
						{
							"incident_id" : $(nTds[1]).text()
						},
						drawElementsTaskEscalate.activitiesIncidents,
						"listActivitiesTaskEscalate",
						"listActivitiesTaskEscalateTi"
					);
				
			});
		}
		
		if (divTable === "listNodesG") {
			$("#" + divTable).delegate("tbody tr", "click", function () {
					dTable.$('tr.row_selected').removeClass('row_selected');
					$(this).addClass('row_selected');
					
					var nTds = $('td', dTable.$('tr.row_selected'));
					var id = $(nTds[0]).text();

					$(".form-control").val("");
					cnocConnector.nodeGlobal = id;
					
					/*** Office Depot Firewall ***
					if (cnocConnector.nodeGlobal == 'OFFICE_DEPOT_MEX_DIVEO_FW01') {
						$( '.chartFirewall' ).show();
						cnocConnector.invokeMashup(
							cnocConnector.service33,
							{
								"node" : cnocConnector.nodeGlobal
							},
							drawElementsGral.drawListTunnelStateVPN,
							"listTunelStateVPN",
							"listTunelStateG"
						);
					} else 
						$( '.chartFirewall' ).hide();
					*/
					
					/* GET DATA FOR TREE NODE RESOURCE */
					cnocConnector.invokeMashup(cnocConnector.service26, {"hostname" : id, "codenet" : cnocConnector.codeNetGlobal},drawElementsGral.treeData, "", "");
					cnocConnector.invokeMashup(cnocConnector.service24, {"node" : id, "codenet" : cnocConnector.codeNetGlobal},drawElementsGral.drawGetModel, "listNodeDetail", "listNodeDetailG");
					cnocConnector.invokeMashup(cnocConnector.service22, {"hostname" : id,"code_net":cnocConnector.codeNetGlobal},drawElementsGral.countTotal, "relatedIncidentsC", "relatedIncidentsCG");
					cnocConnector.invokeMashup(cnocConnector.service23, {"hostname" : id,"code_net":cnocConnector.codeNetGlobal},drawElementsGral.countTotal, "relatedChangesC", "relatedChangesCG");
					
					/*GET TICKET RANGE*/
					var date = new Date().getFullYear()+"-"+(new Date().getMonth()+1)+"-"+new Date().getDate();
					
					drawElementsPerformance.getTicketrange(cnocConnector.codeNetGlobal, date, null, id);
					
					/*** Validate if IP Accounting should be enabled ***/
					cnocConnector.invokeMashup(
							cnocConnector.service34,
							{ "code_net" : cnocConnector.codeNetGlobal },
							function (response) {
								if (response.records.record == undefined)
									$("#ipAccountingNS").hide();
								else if (response.records.record.comunidad_1 != "" && response.records.record.comunidad_2 != "") { // If R/W Community 
									
									cnocConnector.community1 = response.records.record.comunidad_1;
									cnocConnector.community2 = response.records.record.comunidad_2;
									
									cnocConnector.invokeMashup( // Validate if 'Cisco Router'
											cnocConnector.service19,
											{
												"node" : id,
												"codenet" : cnocConnector.codeNetGlobal
											},
											function (response) {
												if (response.records.record.nodetype.toString() === 'router' && 
														response.records.record.nodevendor.toString() === 'Cisco Systems')
													$("#ipAccountingNS").show();
												else
													$("#ipAccountingNS").hide();
											},
											"ipAccountingNS",
											""
										);
								} else if (response.records.record.comunidad_1 != "") { // Else Read Only
									cnocConnector.community1 = response.records.record.comunidad_1;
									cnocConnector.community2 = response.records.record.comunidad_2;
									
									cnocConnector.invokeMashup( // Validate if 'Cisco Router'
											cnocConnector.service19,
											{
												"node" : id,
												"codenet" : cnocConnector.codeNetGlobal
											},
											function (response) {
												if (response.records.record.nodetype.toString() === 'router' && 
														response.records.record.nodevendor.toString() === 'Cisco Systems')
													$("#ipAccountingNS").show();
												else
													$("#ipAccountingNS").hide();
											},
											"ipAccountingNS",
											""
										);
								} else {
									$("#ipAccountingNS").hide();
								}
							},
							"ipAccountingNS",
							""
						);
			});
		}
		
		if (divTable === "changesListTable") {
			
			/* Add a click handler to the rows - this could be used as a callback */
			$("#" + divTable).delegate("tbody tr", "click", function () {
				if ( $(this).hasClass('row_selected') ) {
					$(this).removeClass('row_selected');		        
				} 
				else {
					dTable.$('tr.row_selected').removeClass('row_selected');
					$(this).addClass('row_selected');
					
					var nTds = $('td', dTable.$('tr.row_selected'));
					var id = $(nTds[0]).text();
					
					
					cnocConnector.invokeMashup(cnocConnector.service8, {"ci" : "'" + id + "'"}, 
							drawElements.formDetail, "detailForm1", "d");
					
					cnocConnector.invokeMashup(cnocConnector.service4, {"ci" : "'" + id + "'"}, 
							drawElements.gridChangesActivities, "tabsChangesActivities","changesListActivities");
					
					cnocConnector.invokeMashup(cnocConnector.service10, {"change_id" : id}, 
							drawElements.gridChangeTasks, "tabsChangesTasks", "changesListTasks");
				}
			});
		}
		
		/***** Journal Updates *****/
		if (divTable === "activitiesIncidentsI") {
			
			/* Add a click handler to the rows - this could be used as a callback */
			$("#" + divTable).delegate("tbody tr", "click", function () {
				if ( $(this).hasClass('row_selected') ) {
					$(this).removeClass('row_selected');		        
				} 
				else {
					dTable.$('tr.row_selected').removeClass('row_selected');
					$(this).addClass('row_selected');
					
//					var nTds = $('td', dTable.$('tr.row_selected'));
//					var id = $(nTds[0]).text();					
					
					var descriptionArray = [];
					var dateArray = [];
					var journal = "";
					
					$.each( dTable.fnGetData(), function(i, row){
						descriptionArray.push(row[1]);
						dateArray.push(row[2]);
					});
					
					descriptionArray.reverse();
					dateArray.reverse();
					
					$.each(descriptionArray, function(k,v) {
						if (descriptionArray[k] != '')
							journal += dateArray[k] + '\r' + descriptionArray[k] + '\r' + '-----------------------------\r\r';
					});					
					
					$( '#page-wrapper' ).mask("Waiting...");
					
					$( '#updates' ).text(journal);
					
					var modal = bootbox.dialog({
						message: $("#journal").html(),
						title: "Journal Updates ",
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
					
				}
			});
		}
		
		if(container==="tTops"){
			modelView();
		}
		
		return dTable;
	},drawPanel : function(rowsData, container, idPanel) {
		jQuery("#" + container).empty();
		jQuery("#" + container).append(rowsData);
		return null;
	},drawHeader : function(rowsData, container, idHead) {
		jQuery("#" + container).append(
				'<h1 id="' + idHead
						+ '" style="text-align:center; color:#FFF">' + rowsData
						+ '</h1>');
		return null;
	},drawForm : function(container, divTable, rowsData, rowsHeaders) {
		for ( var i = 0; i < rowsData.length; i++) {
			jQuery("#detail" + i).val(rowsData[i].value);
		}

		return null;

	}, drawChart : function(type, container, nameChart, dataChart, categorias) {
		var optChart = {
			chart : {
				renderTo : container,
				plotBackgroundColor : null,
				plotBorderWidth : null,
				plotShadow : false
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
			credits : {
				enabled : false
			},
			title : null,
			tooltip : {
				formatter : function() {
					var s;
					if (this.point.name) { // the pie chart
						s = '' + this.point.name + ': ' + this.y;
					} else {
						s = '' + this.x + ': ' + this.y;
					}
					return s;
				}
			},
			plotOptions : {
				pie : {
					allowPointSelect : true,
					cursor : 'pointer',
					dataLabels : {
						enabled : false
					},
					showInLegend : true
				},
				series : {
					cursor : 'pointer',
					point : {
						events : {
							click : null
						}
					}
				}
			},
			series : [ {
				type : type,
				name : nameChart,
				data : dataChart,
				dataLabels : {
					enabled : false,
					color : '#FFFFFF',
					align : 'right',
					style : {
						fontSize : '8px',
						fontFamily : 'Verdana, sans-serif',
						textShadow : '0 0 3px black'
					}
				}
			} ]
		};

		return optChart;
	},drawChartPerformance:function(series, container, otherMetrics){
		
		if(container==="containerChartPerformanceInterfaz"){otherMetrics=false;}
		
		$('#'+container).highcharts({
            chart: {
                type: 'spline',
                zoomType: 'xy'
            },credits: {
                enabled: false
            },title: {
                text: drawElementsPerformance.nodePerformance,
                x: -20 //center
            },
            subtitle: {
                text: drawElementsPerformance.subtitlePerformance,
                x: -20
            },xAxis: { 
            	type: 'datetime'
            },yAxis: {
            	title: {
                    text: drawElementsPerformance.metricUnit
                },
                plotLines: [{
                    value: 0,
                    width: 0,
                    color: '#808080'
                }]
            },exporting: {
                enabled: true,
                exportButton: {
                    enabled: true
                },
                buttons: 
                {
                    customButton:
                    {
                    	enabled: otherMetrics,
                        symbol: 'url(http://cdn1.iconfinder.com/data/icons/fatcow/16/chart_bar.png)',
                        text: 'Metrics',
                        symbolFill: '#B5C9DF',
                        hoverSymbolFill: '#779ABF',
                        menuItems: [
                                    {
                                        text: 'Errors Discards',
                                        onclick: function() {
                                        	drawElementsPerformance.subtitlePerformance = "";
                                        	drawElementsPerformance.dataChartPerformance.length = 0;
                                        	drawElementsPerformance.subtitlePerformance = "Errors Discards: ";
                                        	drawElementsPerformance.drawInterfaceErrors();
                                        }
                                    },{
                                        text: 'Interface Average',
                                        onclick: function() { 
                                        	drawElementsPerformance.subtitlePerformance = "";
                                        	drawElementsPerformance.dataChartPerformance.length = 0;
                                        	drawElementsPerformance.subtitlePerformance = "Interface Average: ";
                                        	drawElementsPerformance.drawInterfaceUtil("autil"); 
                                        }
                                    },{
                                        text: 'PKTS_HC',
                                        onclick: function() { 
                                        	drawElementsPerformance.subtitlePerformance = "";
                                        	drawElementsPerformance.dataChartPerformance.length = 0;
                                        	drawElementsPerformance.subtitlePerformance = "Pkts HC: ";
                                        	drawElementsPerformance.drawInterfacePkts(); 
                                        }
                                    },{
                                        text: 'abits Util',
                                        onclick: function() { 
                                        	drawElementsPerformance.subtitlePerformance = "";
                                        	drawElementsPerformance.dataChartPerformance.length = 0;
                                        	drawElementsPerformance.subtitlePerformance = "Interface bits: ";
                                        	drawElementsPerformance.drawInterfaceUtil("abits"); 
                                        }
                                    }                            
                                ]
                    },
                    customButton2:
                    {
                    	enabled: true,
                        symbol: 'url(http://cdn1.iconfinder.com/data/icons/fatcow/16/chart_bar.png)',
                        text: 'Time',
                        symbolFill: '#B5C9DF',
                        hoverSymbolFill: '#779ABF',
                        menuItems: [
                                    {
                                        text: '1 Day',
                                        onclick: function() {
                                        	drawElementsPerformance.timeChartOp(24,container);
                                        }
                                    },
                                    {
                                        text: '5 Days',
                                        onclick: function() {
                                        	drawElementsPerformance.timeChartOp(120,container);
                                        }
                                    },
                                    {
                                        text: '15 Days',
                                        onclick: function() {
                                        	drawElementsPerformance.timeChartOp(360,container);
                                        }
                                    },
                                    {
                                        text: '1 Month',
                                        onclick: function() {
                                        	drawElementsPerformance.timeChartOp(720,container);
                                        }
                                    }
                                ]
                    }
                }
            },tooltip: {
                crosshairs: true,
                shared: true
            },
            legend: {
                borderWidth: 0
            },plotOptions: {
                spline: {
                    marker: {
                        radius: 0,
                        lineColor: '#666666',
                        lineWidth: 5
                    }
                }
            },
            series: series
        });
	},drawChartPerformanceGraph:function(series, container, otherMetrics, name){
		$('#'+container).highcharts({
            chart: {
                type: 'spline',
                zoomType: 'xy'
            },credits: {
                enabled: false
            },title: {
                text: name,
                x: -20 //center
            },
            subtitle: {
                text: drawElementsPerformanceGraph.subtitlePerformance,
                x: -20
            },xAxis: { 
            	type: 'datetime'
            },yAxis: {
            	title: {
                    text: drawElementsPerformanceGraph.metricUnit
                },
                plotLines: [{
                    value: 0,
                    width: 0,
                    color: '#808080'
                }]
            },tooltip: {
                crosshairs: true,
                shared: true
            },
            legend: {
                borderWidth: 0
            },plotOptions: {
                spline: {
                    marker: {
                        radius: 0,
                        lineColor: '#666666',
                        lineWidth: 5
                    }
                }
            },
            series: series
        });
	},drawChartPerformanceSct:function(series, container, otherMetrics, name){
		var unidad = "";
		if(container==="containerChartFilter_2"){
			unidad=" Bytes";
		}
		$('#'+container).highcharts({
            chart: {
                type: 'spline',
                zoomType: 'xy'
            },credits: {
                enabled: false
            },title: {
                text: name,
                x: -20 //center
            },
            subtitle: {
                text: drawElementsSct.subtitleChartSct,
                x: -20
            },xAxis: { 
            	type: 'datetime'
            },yAxis: {
            	title: {
                    text: drawElementsSct.metricUnitChartSct
                },
                plotLines: [{
                    value: 0,
                    width: 0,
                    color: '#808080'
                }]
            },exporting: {
                enabled: true,
                exportButton: {
                    enabled: true
                },
                buttons: 
                {
                    customButton:
                    {
                    	enabled: otherMetrics,
                        symbol: 'url(http://cdn1.iconfinder.com/data/icons/fatcow/16/chart_bar.png)',
                        text: 'Metrics',
                        symbolFill: '#B5C9DF',
                        hoverSymbolFill: '#779ABF',
                        menuItems: [
                                    {
                                        text: 'Errors Discards',
                                        onclick: function() {
                                        	drawElementsSct.subtitleChartSct = "";
                                        	drawElementsSct.dataChartSct.length = 0;
                                        	drawElementsSct.subtitleChartSct =  "Errors Discards: ";
                                        	drawElementsSct.drawInterfaceErrors();
                                        }
                                    }                            
                                ]
                    }
                }
            },
	        tooltip: {
	            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
	            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
	            	'<td style="padding:0"><b>{point.y} '+unidad+'</b></td></tr>',
	            footerFormat: '</table>',
	            shared: true,
	            useHTML: true
	        },legend: {
                borderWidth: 0
            },plotOptions: {
                spline: {
                    marker: {
                        radius: 0,
                        lineColor: '#666666',
                        lineWidth: 5
                    }
                },series : {
					cursor : 'pointer'					
				}
            },
            series: series
        });
	},drawChartCostos:function(type, container, dataChart, categorias){
		var optChart = {
				chart : {
					type: type,
					renderTo : container,
					plotBackgroundColor : null,
					plotBorderWidth : null,
					plotShadow : false
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
				credits : {
					enabled : false
				},

				title : null,
				tooltip : {
					headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
	                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
	                    '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
	                footerFormat: '</table>',
	                shared: true,
	                useHTML: true
				},
				plotOptions : {
					column: {
	                    pointPadding: 0.2,
	                    borderWidth: 0
	                }
				},
				series : dataChart
			};

			return optChart;
	},drawChartFilterSct: function(type, container, dataChart, categorias, title, subtitle){
		var optChart = {
				chart: {
					type: type,
					renderTo : container,
					plotBackgroundColor : null,
					plotBorderWidth : null,
					plotShadow : false
		        },credits: {
	                enabled: false
	            },
		        title: {
		            text:title 
		        },
		        subtitle: {
		            text: "Node Name: "+drawElementsSct.nodeSctGlobal
		        },
		        xAxis: {
		            categories: categorias
		        },
		        yAxis: {
		            min: 0,
		            title: {
		                text: 'Bytes'
		            }
		        },
		        tooltip: {
		            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
		            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
		            	'<td style="padding:0"><b>{point.y} Bytes</b></td></tr>',
		            footerFormat: '</table>',
		            shared: true,
		            useHTML: true
		        },plotOptions: {
		            series: {
		                cursor: 'pointer',
		                point: {
		                    events: {
		                        click: function () {		                        	
		                        	if(container === "containerChartFilter_1"){
		                        		drawElementsSct.subtitleChartSct = "Node Name: "+drawElementsSct.nodeSctGlobal;
			                            drawElementsSct.filterContentLabel = this.category +" History";
			                			cnocConnector.invokeMashup(cnocConnector.service12, {"id":drawElementsSct.nodeSctGlobal, "subtype":this.category},drawElementsSct.chartFilter_2, "containerChartFilter_2", "containerChartFilter_2G");
			                			cnocConnector.invokeMashup(cnocConnector.service14, {"id":drawElementsSct.nodeSctGlobal, "type":this.category},drawElementsSct.chartFilter_3, "containerChartFilter_3", "containerChartFilter_3G");
		                        	}
		                        }
		                    }
		                }
		            }
		        },
		        series: dataChart
		};


			return optChart;
	},drawSelect : function(datos, container, module) {

		if (datos.records.record.length > 1) {
			
			var all = "IN (";
			
			$.each(datos.records.record, function(k,v) {
				all = all + "'" + v.network_code + "'" + ",";
			});			
			
			all = all.slice(0, all.length-1)+")"
			
			$("#" + container).append(
					'<option rel="all" value="'	+ all + '">Select all</option>');

			for ( var i = 0; i < datos.records.record.length; i++) {
				jQuery("#" + container).append(
						'<option rel="'+datos.records.record[i].dept_name.toString() + '" value="'
								+ " = '" + datos.records.record[i].network_code.toString() + "'" + '">'
								+ datos.records.record[i].dept_name.toString()
								+ '</option>');
			}
		} else {
			jQuery("#" + container).append(
					'<option rel="'+datos.records.record.dept_name.toString()+'" value="'
							+ "= '" + datos.records.record.network_code.toString() + "'" + '">'
							+ datos.records.record.dept_name.toString()
							+ '</option>');

		}

		$("#" + container).chosen({
			allow_single_deselect : true
		}).change(function() {
			cnocConnector.codeNetGlobal = $(this).val();
			if(module==="changes"){
				drawElements.init($(this).val());
			}else if(module==="general"){
				drawElementsGral.init($(this).val());
			}else if(module==="incidents"){
				drawElementsIncidents.init($(this).val());
			}else if(module==="performance"){
				drawElementsPerformance.init($(this).val());
			}else if(module==="performanceGraph"){
				drawElementsPerformanceGraph.init($(this).val());
			}else if(module==="tickets"){
				drawElementsTickets.init($(this).val());
			}else if(module==="sisatck"){
				drawElementsTaskEscalate.init($(this).val());
			}
		});
		cnocConnector.codeNetGlobal = $("#" + container).val();
	},drawSelectNodePerformance : function(datos, container, module) {

		$("#cmbNodesPerformance").empty();
		$("#cmbNodesPerformance").append("<select id='"+container+"' data-placeholder='Select Interfaz' style='width:100%; margin-left: 5%;' ><option id='' value='None Selected'>None Selected</option></select>");
		
		if (datos.records.record.length > 1) {

			for ( var i = 0; i < datos.records.record.length; i++) {
				jQuery("#" + container).append(
						"<option value='"
								+ datos.records.record[i].name.toString()+"|"+datos.records.record[i].nmisserver.toString() +"|"+datos.records.record[i].model.toString() +"'>"
								+ datos.records.record[i].name.toString()
								+ "</option>");
			}
		} else {
			jQuery("#" + container).append(
					"<option rel='"+datos.records.record.nmisserver.toString()+"' value='"
							+ datos.records.record.name.toString()+"|"+datos.records.record.nmisserver.toString() +"|"+datos.records.record.model.toString()
							+ "'>" + datos.records.record.name.toString()
							+ "</option>");

		}

		$('#'+container).multiselect({
        	enableFiltering: true,
        	maxHeight: 450,
        	enableCaseInsensitiveFiltering: true,
        	onChange: function(element, checked) {
        		
        		if(container==="cmbNodesSyslog"){
        			
        			$('option:selected', $('#'+container)).each(function() {
            			var data = $(this).val().split("|");
            			var name = data[0].toUpperCase();
            			var nmis = data[1];
            			var model = data[2];

            			cnocConnector.invokeMashup(
            					cnocConnector.service1,
            					{"range":0,"codenet" : "N000093","node":name},
            					drawElementsLog.drawLog,
            					"listLog",
            					"listLogI"
            				);
            			
        			});

        		}else{
            		$('option:selected', $('#'+container)).each(function() {

            			var data = $(this).val().split("|");
            			var name = data[0].toUpperCase();
            			var nmis = data[1];
            			var model = data[2];

            			drawElementsPerformance.dataChartPerformance.length = 0;
            			drawElementsPerformance.nodePerformance = name;
            			drawElementsPerformance.nmis = nmis;					
            			var startDate = ((new Date().getTime()).toString()).substring(0,10)-86400;
            			var endDate = ((new Date().getTime()).toString()).substring(0,10);
            			drawElementsPerformance.dataChartPerformance.length = 0;
            			drawElementsPerformance.endUnix = endDate;
            			drawElementsPerformance.endDate = "";
            			drawElementsPerformance.startDate = startDate;
            			drawElementsPerformance.qosIn = false;
            			
            			/*GET TOCKETS RANGE*/
            			var date = new Date().getFullYear()+"-"+(new Date().getMonth()+1)+"-"+new Date().getDate();
            			drawElementsPerformance.getTicketrange(cnocConnector.codeNetGlobal, date, null, name);
            			
            			if(model === 'PingOnly'){
            				drawElementsPerformance.selectPingOnly();
            				drawElementsPerformance.drawChartHealth();
            			}else{
            				if(name.indexOf("_UPS") > 0){
            					drawElementsPerformance.selectUps();
            					drawElementsPerformance.drawChartHealth();
            				}else{
            					
            					cnocConnector.invokeMashup(cnocConnector.service3, {
            						"name" : name,
            						"codenet" : cnocConnector.codeNetGlobal
            					},function(datos){
            						
            						var vendor = datos.records.record.nodemodel;
            						drawElementsPerformance.vendor = vendor;
            						
            						var endpoint = "http://"+nmis+"/omk/opCharts/nodes/"+name+"/resources/cbqos-out/indicies.json";

            						cnocConnector.invokeMashup(cnocConnector.service1, {
            							"endpoint" : endpoint,
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

                        							//drawElementsPerformance.idResourceInterfaz = data.results.datum.value;
                        							
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
            		});
        		}

            }
        });
		$( "#nodeResources").unmask();
		
	},drawTree: function(){
		drawElementsPerformance.idResourceInterfaz = "";
		$('.tree > ul').attr('role', 'tree').find('ul').attr('role', 'group');
		$('.tree').find('li:has(ul)').addClass('parent_li').attr('role', 'treeitem').find(' > span').attr('title', 'Collapse this branch').on('click', function (e) {

			var parentLi = ($(this).text()).trim();
			
			if(parentLi === "Performance" || parentLi === "Interface" || parentLi === "QOS" || parentLi === "Memory" || parentLi === "Battery" || parentLi === "Voltage" || (parentLi.indexOf("_RT") > 0) || (parentLi.indexOf("_UPS") > 0)){
				var children = $(this).parent('li.parent_li').find(' > ul > li');
		        if (children.is(':visible')) {
		    		children.hide('fast');
		    		$(this).attr('title', 'Expand this branch').find(' > i').addClass('glyphicon glyphicon-plus').removeClass('glyphicon glyphicon-minus');
		        }
		        else {
		    		children.show('fast');
		    		$(this).attr('title', 'Collapse this branch').find(' > i').addClass('glyphicon glyphicon-minus').removeClass('glyphicon glyphicon-plus');
		        }
		        e.stopPropagation();
			}else{}

	    });
	},drawSelectNodePerformanceGraph:function(datos, container, module){

		$("#cmbNodesPerformance").empty();
		$("#cmbNodesPerformance").append("<select id='"+container+"' data-placeholder='Select Node' multiple='multiple' style='width:100%; margin-left: 5%;' ></select>");

		if (datos.records.record.length > 1) {

			for ( var i = 0; i < datos.records.record.length; i++) {
				jQuery("#" + container).append(
						"<option value='"
								+ datos.records.record[i].name.toString()+"|"+datos.records.record[i].nmisserver.toString()+"|"+datos.records.record[i].nodemodel.toString() + "'>"
								+ datos.records.record[i].name.toString()
								+ "</option>");
			}
		} else {
			jQuery("#" + container).append(
					"<option value='"
							+ datos.records.record.name.toString()+"|"+datos.records.record.nmisserver.toString()+"|"+datos.records.record.nodemodel.toString()
							+ "'>" + datos.records.record.name.toString()
							+ "</option>");

		}

		$('#'+container).multiselect({
        	includeSelectAllOption: true,
        	enableCaseInsensitiveFiltering: true,
        	enableFiltering: true,
        	maxHeight: 450,
        	onChange: function(element, checked) {
        		var metrics = $('input:radio[name=opciones]:checked').val(); 
        		if(metrics === "utilisation" || metrics === "errorsdiscards" || metrics === "qos" || metrics === "pktshc"){
        			$( "#cmbNodesPerformanceInterfazC" ).mask("Waiting...");
        			cnocConnector.drawInterfaceGraph();
        		}        		
            }
        });
		
		$( "#cmbNodesPerformanceC" ).unmask();
		
	},drawInterfaceGraph:function(metric){
		
		drawElementsPerformanceGraph.dataChartInterface.length = 0;
		
			$('option:selected', $('#SelectNode')).each(function() {

	        	var data = $(this).val().split("|");
				var name = data[0].toUpperCase();
				var nmis = data[1];
				var vendor = data[2];
				drawElementsPerformanceGraph.nmis = nmis;
				drawElementsPerformanceGraph.nodeNameP = name;
				
				if(vendor === "HuaweiRouter" && metric === "qos"){
					cnocConnector.invokeMashup(cnocConnector.service1, {
						"endpoint" : "http://"+nmis+"/omk/opCharts/nodes/"+name+"/resources/QualityOfServiceStat/indicies.json",
						"ip":nmis
					},drawElementsPerformanceGraph.drawInterfacesQosHuawei, "SelectInterfaz", "cmbInterfazP");
				}else{
					cnocConnector.invokeMashup(cnocConnector.service1, {
						"endpoint" : "http://"+nmis+"/omk/opCharts/nodes/"+name+"/resources/cbqos-out/indicies.json",
						"ip":nmis
					},drawElementsPerformanceGraph.drawInterfacesNodes, "SelectInterfaz", "cmbInterfazP");
				}

	        });
	},drawTreeSct: function(idTree){
		
		$('.tree > ul').attr('role', 'tree').find('ul').attr('role', 'group');
		$('.tree').find('li:has(ul)').addClass('parent_li').attr('role', 'treeitem').find(' > span').attr('title', 'Collapse this branch').on('click', function (e) {			
			var parentLi = ($(this).text()).trim();
			
			if(parentLi === "Performance" || parentLi === "Interface"){
				var children = $(this).parent('li.parent_li').find(' > ul > li');
		        if (children.is(':visible')) {
		    		children.hide('fast');
		    		$(this).attr('title', 'Expand this branch').find(' > i').addClass('glyphicon glyphicon-plus').removeClass('glyphicon glyphicon-minus');
		        }
		        else {
		    		children.show('fast');
		    		$(this).attr('title', 'Collapse this branch').find(' > i').addClass('glyphicon glyphicon-minus').removeClass('glyphicon glyphicon-plus');
		        }
		        e.stopPropagation();
			}

	    });
	}
};
