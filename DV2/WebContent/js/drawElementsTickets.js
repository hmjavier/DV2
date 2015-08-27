/**
 * hmjavier
 * Clase para generar arrays que se inyectan a los elementos del DOM
 */
var drawElementsTickets = {

	init : function(codeNet) {
		if (codeNet != undefined) {

			this.builder(codeNet);
		} else {

			cnocConnector.invokeMashup(cnocConnector.service9, {},drawElementsTickets.selectCustom, "SelectCustomer", "opt");

			this.builder(codeNet);

		}

	},
	builder : function(codeNet) {
		
		if($('.active.tab-pane').hasClass('openTicket')) {
			cnocConnector.invokeMashup(
					cnocConnector.service1,
					{"code_net":codeNet},
					drawElementsTickets.drawBizserviceList,
					"listBizserviceT",
					"listBizserviceTi"
				);
		} else if($('.active.tab-pane').hasClass('updateTicket')) {
			cnocConnector.invokeMashup(
					cnocConnector.service3,
					{"code_net":codeNet},
					drawElementsTickets.drawOpenTicketsList,
					"openTicketsList",
					"openTicketsListTi"
				);
		}
	
	}, selectCustom : function(datos, selector, opt) {

		cnocConnector.drawSelect(datos, selector, "tickets");
		drawElementsTickets.builder($("#SelectCustomer").val());
		cnocConnector.codeNetGlobal = $("#SelectCustomer").val();

	}, drawBizserviceList: function(datos, container, divTable) {
		var rowsData = new Array();
		try {
			if (datos.records.record.length > 1) {
				for ( var i = 0; i < datos.records.record.length; i++) {
					var fields = new Array();
					fields.push(datos.records.record[i].network_code.toString());
					fields.push(datos.records.record[i].company.toString());							
					fields.push(datos.records.record[i].sector.toString());
					fields.push(datos.records.record[i].logical_name.toString());
					fields.push(datos.records.record[i].unique_identifier.toString());
					fields.push(datos.records.record[i].location.toString());
					fields.push(datos.records.record[i].location_code.toString());
					rowsData.push(fields);
				}
			} else {
				var fields = new Array();
				fields.push(datos.records.record.network_code.toString());
				fields.push(datos.records.record.company.toString());							
				fields.push(datos.records.record.sector.toString());
				fields.push(datos.records.record.logical_name.toString());
				fields.push(datos.records.record.unique_identifier.toString());
				fields.push(datos.records.record.location.toString());
				fields.push(datos.records.record.location_code.toString());					
				rowsData.push(fields);
			}
		} catch (err) {	
			console.log(err);
		};
		var rowsHeaders = [ {
			"sTitle" : "Network Code"
		}, {
			"sTitle" : "Company"
		}, {
			"sTitle" : "Sector"
		}, {
			"sTitle" : "Logical Name"
		}, {
			"sTitle" : "Unique Identifier"
		}, {
			"sTitle" : "Location"
		}, {
			"sTitle" : "Location Code"
		}];
		cnocConnector.drawGrid(container, divTable, rowsData, rowsHeaders, false);
		
	}, drawOpenTicketsList: function(datos, container, divTable) {
		var rowsData = new Array();
		try {
			if (datos.records.record.length > 1) {
				for ( var i = 0; i < datos.records.record.length; i++) {
					var fields = new Array();
					fields.push(datos.records.record[i].number.toString());
					fields.push(datos.records.record[i].customer_reference.toString());
					fields.push(datos.records.record[i].incident_id.toString());							
					fields.push(datos.records.record[i].affected_item.toString());
					fields.push(datos.records.record[i].service_uniqueid.toString());
					fields.push(datos.records.record[i].action.toString());
					fields.push(datos.records.record[i].brief_description.toString());
					fields.push(datos.records.record[i].location.toString());
					fields.push(datos.records.record[i].location_code.toString());
					rowsData.push(fields);
				}
			} else {
				var fields = new Array();
				fields.push(datos.records.record.number.toString());
				fields.push(datos.records.record.customer_reference.toString());
				fields.push(datos.records.record.incident_id.toString());
				fields.push(datos.records.record.affected_item.toString());
				fields.push(datos.records.record.service_uniqueid.toString());
				fields.push(datos.records.record.action.toString());
				fields.push(datos.records.record.brief_description.toString());
				fields.push(datos.records.record.location.toString());
				fields.push(datos.records.record.location_code.toString());
				rowsData.push(fields);
			}
		} catch (err) {	
			console.log(err);
		};
		var rowsHeaders = [ {
			"sTitle" : "IM"
		}, {
			"sTitle" : "Customer Incident Number"
		}, {
			"sTitle" : "SD"
		}, {
			"sTitle" : "CI"
		}, {
			"sTitle" : "Unique Identifier"
		}, {
			"sTitle" : "Title"
		}, {
			"sTitle" : "Description"
		}, {
			"sTitle" : "Location"
		}, {
			"sTitle" : "Location Code"
		}];
		cnocConnector.drawGrid(container, divTable, rowsData, rowsHeaders, false);		
	}, openTicket: function(data){
		var modal = bootbox.dialog({
			message: $("#frm").html(),
			title: "Open Ticket: " + 
				data.affectedService + " - " + 
				data.uniqueIdentifier + " - " + 
				data.siteName,
			buttons: [{
				label: "Open Ticket",
				className: "btn btn-primary glyphicon glyphicon-floppy-disk",
				callback: function() {
					
					var button = modal.find( '.glyphicon-floppy-disk' );
					var title = modal.find(".titleTCK");
					var description = modal.find(".descriptionTCK");
					var contactPerson = modal.find(".contactPersonTCK");
					var contactMail = modal.find(".contactEmailTCK");
					var ticketID = modal.find(".ticketIdTCK");
					var sd = modal.find( '#sdTCK' );
					var im = modal.find( '#imTCK' );
					var message = modal.find( '#messageTCK' );
					
					data.title = title.val();
					data.description = description.val()+" open by: "+cnocConnector.userName;;
					data.contactPerson = contactPerson.val();
					data.contactMail = contactMail.val();
					data.ticketID = ticketID.val();
					
					$( sd ).attr("disabled", "disabled");
					$( im ).attr("disabled", "disabled");
					$( message ).attr("disabled", "disabled");
					
					$(button).attr("disabled", "disabled");
					$(button).text("Waiting...");
					
					$( title ).attr("disabled", "disabled");
					$( description ).attr("disabled", "disabled");
					$( contactPerson ).attr("disabled", "disabled");
					$( contactMail ).attr("disabled", "disabled");
					$( ticketID ).attr("disabled", "disabled");
					
					$( sd ).val("Waiting...");
					$( im ).val("Waiting...");
					$( message ).val("Waiting...");
					
					if (data.title == "" || data.title == null || data.title == undefined) {
						
						$( title ).removeAttr("disabled");
						$( description ).removeAttr("disabled");
						$( contactPerson ).removeAttr("disabled");
						$( contactMail ).removeAttr("disabled");
						$( ticketID ).removeAttr("disabled");						
						
						$( sd ).val("ERROR");
						$( im ).val("ERROR");									
						$( message ).val("Title is required.");
						
						$( button ).text("Open Ticket");
						$( button ).removeAttr("disabled");
					
					} else if (data.description == "" || data.description == null || data.description == undefined) {
						
						$( title ).removeAttr("disabled");
						$( description ).removeAttr("disabled");
						$( contactPerson ).removeAttr("disabled");
						$( contactMail ).removeAttr("disabled");
						$( ticketID ).removeAttr("disabled");						
						
						$( sd ).val("ERROR");									
						$( im ).val("ERROR");
						$( message ).val("Description is required.");									
						
						$( button ).text("Open Ticket");
						$( button ).removeAttr("disabled");
					
					} else if (data.contactPerson == "" || data.contactPerson == null || data.contactPerson == undefined) {
						
						$( title ).removeAttr("disabled");
						$( description ).removeAttr("disabled");
						$( contactPerson ).removeAttr("disabled");
						$( contactMail ).removeAttr("disabled");
						$( ticketID ).removeAttr("disabled");						
					
						$( sd ).val("ERROR");
						$( im ).val("ERROR");
						$( message ).val("Contact Person is required.");
						
						$( button ).text("Open Ticket");
						$( button ).removeAttr("disabled");
					
					} else if (data.contactMail == "" || data.contactMail == null || data.contactMail == undefined) {
						
						$( title ).removeAttr("disabled");
						$( description ).removeAttr("disabled");
						$( contactPerson ).removeAttr("disabled");
						$( contactMail ).removeAttr("disabled");
						$( ticketID ).removeAttr("disabled");						
					
						$( sd ).val("ERROR");
						$( im ).val("ERROR");
						$( message ).val("Contact Email is required.");
						
						$( button ).text("Open Ticket");
						$( button ).removeAttr("disabled");
						
					} else {
						
						cnocConnector.invokeMashup(
								cnocConnector.service2,
								data,
								function (result) {
									if (result == '' || result == null) { 
										
										$( title ).removeAttr("disabled");
										$( description ).removeAttr("disabled");
										$( contactPerson ).removeAttr("disabled");
										$( contactMail ).removeAttr("disabled");
										$( ticketID ).removeAttr("disabled");
									
										$( sd ).val("ERROR");
										$( im ).val("ERROR");
										$( message ).val("No information Retrived.");
										
										$( button ).text("Open Ticket");
										$( button ).removeAttr("disabled");
										
									} else {
										
										$( title ).removeAttr("disabled");
										$( description ).removeAttr("disabled");
										$( contactPerson ).removeAttr("disabled");
										$( contactMail ).removeAttr("disabled");
										$( ticketID ).removeAttr("disabled");										
										
										$( sd ).val(result.incidentId);
										$( sd ).removeAttr("disabled");
										
										$( im ).val(result.number);
										$( im ).removeAttr("disabled");
										
										$( message ).val(result.message);
										$( message ).removeAttr("disabled");
										
										$( button ).text("Open Ticket");
										$( button ).removeAttr("disabled");
									}
								},
								"",
								"");
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
				modal.modal("hide");
			}
		});

		modal.modal("show");
	},updateTicket: function(data){
		
		var modal = bootbox.dialog({
			message: $("#updateTicketDialog").html(),
			title: "Update Ticket: " + data.number,
			buttons: [{
				label: "Update Ticket",
				className: "btn btn-primary glyphicon glyphicon-floppy-disk",
				callback: function() {
					
					var button = modal.find( '.glyphicon-floppy-disk' );							
					var message = modal.find( '#messageUpdate' );
					var updateAction = modal.find( '.updateAction' );
					
					data.updateAction = updateAction.val()+ "\n\nUpdated by: "+cnocConnector.userName;
					
					$( updateAction ).attr("disabled", "disabled");
					$( message ).attr("disabled", "disabled");
					$( button ).attr("disabled", "disabled");
					$( button ).text("Waiting...");
					$( message ).val("Waiting...");
					
					if (data.updateAction == "" || data.updateAction == null || data.updateAction == undefined) {
						$( updateAction).removeAttr("disabled");
						
						$( message ).val("ERROR: Update Action is required.");
						$( message ).removeAttr("disabled");
						
						$( button ).text("Open Ticket");
						$( button ).removeAttr("disabled");
					
					} else {
						cnocConnector.invokeMashup(
								cnocConnector.service4,
								data,
								function (result) {
									if (result == '' || result == null) {
										$( updateAction).removeAttr("disabled");
										
										$( message ).val("ERROR: No information Retrived.");
										$( message ).removeAttr("disabled");
										
										$( button ).text("Open Ticket");
										$( button ).removeAttr("disabled");
									
									} else {
										$( updateAction).removeAttr("disabled");
										
										$( message ).val(result.message);
										$( message ).removeAttr("disabled");
										
										$( button ).text("Open Ticket");
										$( button ).removeAttr("disabled");

									}
								},
								"",
								"");
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
				modal.modal("hide");
			}
		});

		modal.modal("show");
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
