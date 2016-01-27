/**
 * Title: Search Engine Script
 * Autor: Oscar Escamilla
 * Version: 1.0
 */

var search = {
		
	table : null,
		
	/**
	 * Init function 
	 * @param : networkCode
	 */
	init : function (networkCode) {
		// Set Network Code
		cnocFramework.networkCode = networkCode;
		
		search.renderFilters()
	},
	
	/*** Rendering Filters ***/
	renderFilters : function () {
		cnocFramework.invokeMashup({
			invokeUrl : endpoint.getfilters,
			params : {"network_code" : cnocFramework.networkCode},
			callback : function(response, divContainers, divElements) {
				
				/*** Empty selects content ***/
				$.each(divElements, function(k,v) {
					v.empty();
					v.append("<option></option>");
				});
				
				var unique_site_category = {};				
				var unique_location = {};
				var unique_location_code = {};
				var unique_state = {};
				
				/*** Append options ***/
				$.each( response.records.record, function(k,v) {
					divElements[0].append("<option>" + v.ci_name + "</option>"); // CI Name
					divElements[1].append("<option>" + v.unique_identifier + "</option>"); // Unique Identifier
					
					/*** Distinct site_categories ***/
					if( typeof(unique_site_category[v.site_category]) == "undefined") {
						divElements[2].append("<option>" + v.site_category + "</option>"); // Group
					}
					unique_site_category[v.site_category] = 0;
					
					/*** Distinct locations ***/
					if( typeof(unique_location[v.location]) == "undefined") {
						divElements[3].append("<option>" + v.location + "</option>"); // Location
					}
					unique_location[v.location] = 0;
					
					/*** Distinct location_codes ***/
					if( typeof(unique_location_code[v.location_code]) == "undefined") {
						divElements[4].append("<option>" + v.location_code + "</option>"); // Location Code
					}
					unique_location_code[v.location_code] = 0;
					
					/*** Distinct States ***/
					if( typeof(unique_state[v.state]) == "undefined") {
						divElements[5].append("<option>" + v.state + "</option>"); // State
					}
					unique_state[v.state] = 0;
					
				});
				
				/*** Create chosens ***/
				$.each(divElements, function(k,v) {					
					v.chosen({allow_single_deselect: true});
					v.trigger("chosen:updated");
				});
				
			},
			divContainers : [ $( '#ci_name' ), $( '#ci' ), $( '#group' ), $( '#location' ), $( '#location_code' ), $( '#state' ) ],
			divElements : [ 
				$( '#ci_name_input' ), // CI Name
			   	$( '#unique_id_input' ), // Unique Identifier
			   	$( '#group_input' ), // Group
			   	$( '#location_input' ), // Location
			   	$( '#location_code_input' ), // Location Code
			   	$( '#state_input' ), // State
			]
		});
	},
	
	/*
	 * Get Incidents
	 */
	getIncidents : function () {
		
		var status = $( '#status_input' ).val();
		var im_val = $( '#im_input' ).val();
		var range = $( '#range_input' ).val();
		var ci_name = $( '#ci_name_input' ).val();
		var unique_id = $( '#unique_id_input' ).val();
		var site_category = $( '#group_input' ).val();
		var location = $( '#location_input' ).val();
		var location_code = $( '#location_code_input' ).val();
		var state = $( '#state_input' ).val();		
		var customer_reference = $( '#customer_reference_input' ).val();
		var vendor_ticket = $( '#vendor_ticket_input' ).val();
		
		if (status == null && 
			im_val === '' &&
			range == '' &&
			ci_name === '' &&
			unique_id === '' &&
			site_category == null &&
			location === '' &&
			location_code === '' &&
			state === '' &&
			customer_reference === '' &&
			vendor_ticket === '') {
			
			$( '#modal_body' ).text( 'Please enter at least one search parameter.' );
			$( '#info_modal' ).modal('show');
			
		} else {
			
			var whereStatus = "";
			var whereGroup = "";
			var number = "";
			
			if($( '#im_input' ).val() != "")
				number = "AND m1.\"NUMBER\" = '" + im_val + "'";
			
			/*** Create Status condition ***/
			if(status != null) {
				
				var arrayLength = status.length;
				
				if(arrayLength == 1)
					whereStatus = "AND m1.problem_status = '" + status[0] + "'";
				else {
					whereStatus = "AND (";
					for(var i = 0; i<arrayLength; i++) {
						if(i == (arrayLength-1))
							whereStatus += "m1.problem_status = '" + status[i] + "')";
						else
							whereStatus += "m1.problem_status = '" + status[i] + "' OR ";
					}
				}			
			}
			
			/*** Create Group condition ***/
			if(site_category != null) {
				
				var arrayLength = site_category.length;
				
				if(arrayLength == 1)
					whereGroup = "AND d1.site_category = '" + site_category[0] + "'";
				else {
					whereGroup = "AND (";
					for(var i = 0; i<arrayLength; i++) {
						if(i == (arrayLength-1))
							whereGroup += "d1.site_category = '" + site_category[i] + "')";
						else
							whereGroup += "d1.site_category = '" + site_category[i] + "' OR ";
					}
				}			
			}
			
			try {			
				
				if (range.length > 0) {
					var dates = range.split("-");
					
					var open_time_ini = dates[0].trim();
					var open_time_fin = dates[1].trim();
				}						
				
				cnocFramework.invokeMashup({
					invokeUrl : endpoint.getIncidents,
					params : {
						"network_code" : cnocFramework.networkCode,
						"number" : number,
						"open_time_ini" : open_time_ini,
						"open_time_fin" : open_time_fin,
						"problem_status" : whereStatus,
						"ci_name" : ci_name,
						"unique_identifier" : unique_id,
						"site_category" : whereGroup,
						"location" : location,
						"location_code" : location_code,
						"state" : state,
						"customer_reference" : customer_reference,
						"vendor_ticket" : vendor_ticket
					},
					callback : function(response, divContainers, divElements) {				
						search.listIncidents(response, divContainers, divElements);
					},
					divContainers : [ $('#incidentList') ],
					divElements : [ $('#incidentsTable') ]
				});
				
			} catch(e) {
				console.log(e)
			}
		}				
	},
	
	/*
	 * Invoke Incident List
	 * @param : response
	 * @param : divContainers
	 * @param : divElements
	 */
	listIncidents : function (response, divContainers, divElements) {		
		
		var columns = [
						{ "title": "Number" },
						{ "title": "SD Number" },
						{ "title": "Failure Type" },						
						{ "title": "CI Name" },
						{ "title": "CI" },
						{ "title": "Brief Description" },
						{ "title": "Open Time" },
						{ "title": "Last Update" },
						{ "title": "Unique ID" },
						{ "title": "Group" },
						{ "title": "Service Type" },						
						{ "title": "Status" },
						{ "title": "Location" },
						{ "title": "Location Code" },
						{ "title": "Divisional" },
						{ "title": "State" },
						{ "title": "Operator" },
						{ "title": "Opened by" },
						{ "title": "Closure Code" },
						{ "title": "Close Time" },
						{ "title": "Outage Time" }
					];
		
		var data = [];
		
		var tableOptions = {
				"columns": columns,
				"scrollY": 200,
				"scrollX": true,
				"data" : data
		};
		
		try {
			if (response.records.record.length > 1) {
				$.each(response.records.record, function(k,v) {
					var row = [];
					row.push(v.number.toString());
					row.push(v.incident_id.toString());
					row.push(v.failure_type.toString());
					row.push(v.ci_name.toString());
					row.push(v.logical_name.toString());
					row.push(v.brief_description.toString());
					row.push(v.open_time.toString());
					row.push(v.last_update.toString());
					row.push(v.unique_identifier.toString());
					row.push(v.site_category.toString());
					row.push(v.service_type.toString());					
					row.push(v.problem_status.toString());					
					row.push(v.location.toString());
					row.push(v.location_code.toString());
					row.push(v.divisional.toString());
					row.push(v.state.toString());					
					row.push(v.operator.toString());
					row.push(v.opened_by.toString());
					row.push(v.closure_code.toString());
					row.push(v.close_time.toString());
					row.push(v.outage_time.toString()+" hr");
					data.push(row);
				});
				
			} else {
				var row = [];				
				row.push(response.records.record.number.toString());
				row.push(response.records.record.incident_id.toString());
				row.push(response.records.record.failure_type.toString());
				row.push(response.records.record.ci_name.toString());
				row.push(response.records.record.logical_name.toString());
				row.push(response.records.record.brief_description.toString());
				row.push(response.records.record.open_time.toString());
				row.push(response.records.record.last_update.toString());
				row.push(response.records.record.unique_identifier.toString());
				row.push(response.records.record.site_category.toString());
				row.push(response.records.record.service_type.toString());					
				row.push(response.records.record.problem_status.toString());					
				row.push(response.records.record.location.toString());
				row.push(response.records.record.location_code.toString());
				row.push(response.records.record.divisional.toString());
				row.push(response.records.record.state.toString());					
				row.push(response.records.record.operator.toString());
				row.push(response.records.record.opened_by.toString());
				row.push(response.records.record.closure_code.toString());
				row.push(response.records.record.close_time.toString());
				row.push(response.records.record.outage_time.toString()+" hr");
				data.push(row);
			}			
			
			search.table = cnocFramework.createTable(divContainers[0], divElements[0].selector, tableOptions, search.listActivities);			
			
		} catch (e) {
			console.log(e);			
			search.table = cnocFramework.createTable(divContainers[0], divElements[0].selector, tableOptions, search.listActivities);
		}
	},
	
	/*
	 * Invoke List Activities by Number
	 * @param : im
	 */
	listActivities : function (data) {
		var number = data[0];
		cnocFramework.invokeMashup({
			invokeUrl : endpoint.getActivities,
			params : { "number" : number },
			callback : search.drawListActivities,
			divContainers : [ $('#activitiesList') ],
			divElements : [ $('#activitiesTable') ]
		});
	},
	
	/*
	 * Draw List Activities by Number
	 * @param : response
	 * @param : divContainers
	 * @param : divElements
	 */
	drawListActivities : function (response, divContainers, divElements) {
		
		var columns = [
						{ "title": "Description" },
						{ "title": "Operator" },
						{ "title": "Type" },
						{ "title": "Date" } 					
					];
		
		var data = [];
		var tableOptions = {
				"columns": columns,
				"scrollY": 200,
				"scrollX": true,
				"data" : data,
				"order": [[ 3, "asc" ]]
		};
		
		try {
			if (response.records.record.length > 1) {
				$.each(response.records.record, function(k,v) {
					var row = [];
					row.push(v.description.toString());
					row.push(v.operator.toString());
					row.push(v.type.toString());
					row.push(v.datestamp.toString());
					data.push(row);
				});
				
			} else {
				var row = [];				
				row.push(response.records.record.description.toString());
				row.push(response.records.record.operator.toString());
				row.push(response.records.record.type.toString());
				row.push(response.records.record.datestamp.toString());
				data.push(row);
			}			
			
			cnocFramework.createTable(divContainers[0], divElements[0].selector, tableOptions, null);			
			
		} catch (e) {
			console.log(e);
			cnocFramework.createTable(divContainers[0], divElements[0].selector, tableOptions, null);
		}
	},
	
	
	/*
	 * Export Incidents List
	 */
	exportIncidents : function (type) {		
		
		if (type === 'excel') {
			/*** Headers ***/
			var rows = [{
					cells: [
						{ value: "Number" },
						{ value: "SD Number" },
						{ value: "Failure Type" },
						{ value: "CI Name" },
						{ value: "CI" },
						{ value: "Brief Description" },
						{ value: "Open Time" },
						{ value: "Last Update" },
						{ value: "Unique ID" },
						{ value: "Group" },
						{ value: "Service Type" },						
						{ value: "Status" },
						{ value: "Location" },
						{ value: "Location Code" },
						{ value: "Divisional" },
						{ value: "State" },
						{ value: "Operator" },
						{ value: "Opened by" },
						{ value: "Closure Code" },
						{ value: "Close Time" },
						{ value: "Outage Time" },					
						{ value: "Activities" }
					]
			}];		
			
			var stop = search.table.rows()[0].length;		
			
			// Get data to export
			search.table.rows().every( function () {
				var d = this.data();
				var row = { cells: [] };
				
				$.each(d, function(k,v) {
					row.cells.push({ value: v });
				});
				
				// Get Activities
				cnocFramework.invokeMashup({
					invokeUrl : endpoint.getActivities,
					params : { "number" : d[0] },
					callback : function(response) {
						
						var activity = "";
						try {
							if (response.records.record.length > 1) {
								$.each(response.records.record, function(k,v) {
									activity += v.datestamp.toString() + " - " +
												v.type.toString() + " - " +
												v.operator.toString();
									activity += "\n\r"  + v.description.toString();
									activity += "\n\r--------------------------------------------\n\r";
								});
								
							} else {
								activity += response.records.record.datestamp.toString() + " - " +
											response.records.record.type.toString() + " - " +
											response.records.record.operator.toString();
								activity += "\n\r"  + response.records.record.description.toString()  + "\n\r";
							}												
							
						} catch (e) {
							console.log(e);						
						}
						
						row.cells.push({ value: activity });					
						rows.push(row);
						
						if(stop == 1) {
							var workbookOpts = {
									sheets: [
						 				{
								 			// Column settings (width)
							 				columns: [
							 				 	{ autoWidth: true },
							 					{ autoWidth: true }
							 				],
							 				// Title of the sheet
							 				title: "Incidents",
							 				// Rows of the sheet
							 				rows: rows
						 				}
						 			]
								};
								
								cnocFramework.exportData(workbookOpts, "Incidents.xlsx");
						}
						stop--;
					},
					divContainers : [  ],
					divElements : [  ]
				});
			});
			
		} else if (type === 'pdf') {
			// Get data to export
			search.table.rows().every( function () {
				var d = this.data();
				var row = { cells: [] };				
				
				$("#pdf_out").append(
						'<div class="wrapper">' +
							'<!-- Main content -->' +
							'<section class="invoice offset2">' +
								'<!-- title row -->' +
								'<div class="row">' +
									'<div class="col-xs-12">' +
										'<h2 class="page-header">' +
											'<strong># NUMBER: </strong>' + d[0] + ' <small class="pull-right"><strong>Open Time: </strong>' + d[6] + '</small>' +
										'</h2>' +
									'</div>' +
									'<!-- /.col -->' +
								'</div>' +
								'<!-- info row -->' +
								'<div class="row invoice-info">' +
									'<div class="col-sm-6 invoice-col h4">' +
										'<strong>CI Name: </strong>' + d[3] + '<br>' +
										'<strong>Brief Description: </strong>' + d[5] + '<br>' +
									'</div>' +
									'<!-- /.col -->' +
									'<div class="col-sm-6 invoice-col h4">' +
										'<strong>Location: </strong>' + d[12] + '<br>' +
										'<strong>Closure Code: </strong>' + d[18] + '<br>' +
									'</div>' +
									'<!-- /.col -->' +
								'</div>' +
								'<!-- /.row -->' +
								'<!-- Table row -->' +
								'<div class="row">' +
									'<div class="col-xs-12 table-responsive">' +
										'<table class="table table-striped">' +
											'<thead>' +
												'<tr>' +
													'<th>SD Number</th>' +
													'<th>Failure Type</th>' +													
													'<th>Last Update</th>' +
													'<th>Group</th>' +
													'<th>Service Type</th>' +
													'<th>Status</th>' +
													'<th>Location Code</th>' +
													'<th>Divisional</th>' +
													'<th>State</th>' +
													'<th>Operator</th>' +
													'<th>Opened by</th>' +
													'<th>Close Time</th>' +
													'<th>Outage Time</th>' +
												'</tr>' +
											'</thead>' +
											'<tbody>' +
												'<tr>' +
													'<td>' + d[1] + '</td>' +
													'<td>' + d[2] + '</td>' +
													'<td>' + d[7] + '</td>' +
													'<td>' + d[9] + '</td>' +
													'<td>' + d[10] + '</td>' +
													'<td>' + d[11] + '</td>' +
													'<td>' + d[13] + '</td>' +
													'<td>' + d[14] + '</td>' +
													'<td>' + d[15] + '</td>' +
													'<td>' + d[16] + '</td>' +
													'<td>' + d[17] + '</td>' +
													'<td>' + d[19] + '</td>' +
													'<td>' + d[20] + '</td>' +
												'</tr>' +
											'</tbody>' +
										'</table>' +
									'</div>' +
									'<!-- /.col -->' +
								'</div>' +
								'<!-- /.row -->	' +
							'</section>'+
							'<!-- /.content -->' +
						'</div>' +
						'<!-- ./wrapper -->');				
			});
			
			/**** Show pdf layout ***/
	    	$( '#pdf_out' ).show();
	    	/*
	    	// Convert the DOM element to a drawing using kendo.drawing.drawDOM
			kendo.drawing.drawDOM($("#pdf_out"), {
				allPages: true,				
				proxyURL: "http://demos.telerik.com/kendo-ui/service/export",
				paperSize: "A4",
				margin: "1cm",
				landscape: true
			}).then(function (group) {
				// Render the result as a PDF file
				return kendo.drawing.exportPDF(group);
			}).done(function (data) {
				// Save the PDF file
				kendo.saveAs({
					dataURI: data,
					fileName: "HR-Dashboard.pdf"					
				});
			});
	    	*/
	    	// Convert the DOM element to a drawing using kendo.drawing.drawDOM
			kendo.drawing.drawDOM($("#pdf_out"))
			.then(function(group) {
				// Render the result as a PDF file
				return kendo.drawing.exportPDF(group, {
					allPages: true,					
					proxyURL: "http://demos.telerik.com/kendo-ui/service/export",
					//paperSize: "A4",
					landscape: false,
		            multiPage: true,
		            margin: {
		                left: 25,
		                right: 25,
		                top: 25,
		                bottom: 25
		              }
				});
			})
			.done(function(data) {
				// Save the PDF file
				kendo.saveAs({
					dataURI: data,
					fileName: "IM-Dashboard.pdf",
					proxyURL: "http://demos.telerik.com/kendo-ui/service/export"
				});
			});			
			
			/**** Hide pdf layout ***/
	    	$( '#pdf_out' ).hide();
		}
	}, 
	
	/*** Add listeners ***/
	addlisteners : function() {
		// Handler for .submit() called.
		$( "#search_form" ).submit(function( event ) {
			search.getIncidents();
			event.preventDefault();
		});
		
		$( "#excel_btn" ).click(function() {
			if (search.table == null || search.table.rows()[0].length == 0) {
				$( '#modal_body' ).text( 'No data available in table' );
				$( '#info_modal' ).modal('show');
				
			} else {
				// Export Data
				search.exportIncidents( 'excel' );
			}
		});
		
		$( "#pdf_btn" ).click(function() {
			if (search.table == null || search.table.rows()[0].length == 0) {
				$( '#modal_body' ).text( 'No data available in table' );
				$( '#info_modal' ).modal( 'show' );
			} else {
				// Export Data					
				search.exportIncidents( 'pdf' );
			}
		});
	},
};