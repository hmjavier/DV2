/**
 * hmjavier
 * Clase para generar arrays que se inyectan a los elementos del DOM
 */
var drawElementsTaskEscalate = {

	init : function(codeNet) {
		if (codeNet != undefined) {

			this.builder(codeNet);
		} else {

			cnocConnector.invokeMashup(cnocConnector.service9, {},drawElementsTaskEscalate.selectCustom, "SelectCustomer", "opt");

			this.builder(codeNet);			

		}

	},
	builder : function(codeNet) {
		
		cnocConnector.invokeMashup(
				cnocConnector.service1,
				{"code_net":codeNet},
				drawElementsTaskEscalate.drawOpenTicketsList,
				"openTaskEscalateList",
				"openTaskEscalateListTi"
			);
		
		$("#listActivitiesTaskEscalate").empty();
	
	}, selectCustom : function(datos, selector, opt) {

		cnocConnector.drawSelect(datos, selector, "sisatck");
		drawElementsTaskEscalate.builder($("#SelectCustomer").val());
		cnocConnector.codeNetGlobal = $("#SelectCustomer").val();

	}, drawOpenTicketsList: function(datos, container, divTable) {
		var rowsData = new Array();
		try {
			if (datos.records.record.length > 1) {
				for ( var i = 0; i < datos.records.record.length; i++) {
					var fields = new Array();
					fields.push(datos.records.record[i].id.toString());
					fields.push(datos.records.record[i].number.toString());
					fields.push(datos.records.record[i].vendor_ticket.toString());
					fields.push(datos.records.record[i].location.toString());
					fields.push(datos.records.record[i].vendor.toString());
					fields.push(datos.records.record[i].description.toString());
					fields.push(datos.records.record[i].unique_identifier.toString());
					fields.push(datos.records.record[i].problem_status.toString());
					fields.push(datos.records.record[i].open_time.toString());
					fields.push(datos.records.record[i].task_open_time.toString());
					rowsData.push(fields);
				}
			} else {
				var fields = new Array();
				fields.push(datos.records.record.id.toString());
				fields.push(datos.records.record.number.toString());
				fields.push(datos.records.record.vendor_ticket.toString());
				fields.push(datos.records.record.location.toString());
				fields.push(datos.records.record.vendor.toString());
				fields.push(datos.records.record.description.toString());
				fields.push(datos.records.record.unique_identifier.toString());
				fields.push(datos.records.record.problem_status.toString());
				fields.push(datos.records.record.open_time.toString());
				fields.push(datos.records.record.task_open_time.toString());
				rowsData.push(fields);
			}
		} catch (err) {	
			console.log(err);
		};
		var rowsHeaders = [ {
			"sTitle" : "ID"
		}, {
			"sTitle" : "TICKET CNOC"
		}, {
			"sTitle" : "TICKET SISA"
		}, {
			"sTitle" : "LOCATION"
		}, {
			"sTitle" : "CASE"
		}, {
			"sTitle" : "DESCRIPTION"
		}, {
			"sTitle" : "IDENTIFICADOR CASE"
		}, {
			"sTitle" : "STATUS"
		}, {
			"sTitle" : "APERTURA INCIDENTE CLIENTE"
		}, {
			"sTitle" : "APERTURA REPORTE TRANSMISIONES"
		}		
		];
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
