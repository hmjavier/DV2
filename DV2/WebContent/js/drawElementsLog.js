/**
 * hmjavier
 * Clase para generar arrays que se inyectan a los elementos del DOM
 */
var drawElementsLog = {

	init : function(codeNet) {
		if (codeNet != undefined) {

			this.builder(codeNet);
		} else {

			cnocConnector.invokeMashup(cnocConnector.service9, {},drawElementsLog.selectCustom, "SelectCustomer", "opt");

			this.builder(codeNet);

		}

	},
	builder : function(codeNet) {
			cnocConnector.invokeMashup(
					cnocConnector.service1,
					{"range":0,"codenet" : "N000093","node":""},
					drawElementsLog.drawLog,
					"listLog",
					"listLogI"
				);				
		cnocConnector.invokeMashup(cnocConnector.service2, {"codenet" : "N000093"},drawElementsLog.drawListNodes, "listNodes", "listNodesP");
	
	},drawListNodes: function (datos, container, divTable){

		var selText = cnocConnector.drawSelectNodePerformance(datos, "cmbNodesSyslog", "SelectNodeSyslog");
	
	}, selectCustom : function(datos, selector, opt) {

		cnocConnector.drawSelect(datos, selector, "tickets");
		drawElementsTickets.builder($("#SelectCustomer").val());
		cnocConnector.codeNetGlobal = $("#SelectCustomer").val();
		
	},drawLog: function (datos, container, divTable){
		jQuery("#" + container).empty();	
		var tableT = "";
		try {
			if (datos.records.record.length > 1) {
				for ( var i = 0; i < datos.records.record.length; i++) {
					if(datos.records.record[i].priority.toString()==="4"){
						tableT += "<tr class='warning'><td>"+datos.records.record[i].receivedat.toString()+"</td><td>"+datos.records.record[i].fromhost.toString()+"</td><td>"+datos.records.record[i].message.toString()+"</td></tr>";
					}else if(datos.records.record[i].priority.toString()==="5"){
						tableT += "<tr class='success'><td>"+datos.records.record[i].receivedat.toString()+"</td><td>"+datos.records.record[i].fromhost.toString()+"</td><td>"+datos.records.record[i].message.toString()+"</td></tr>";
					}else if(datos.records.record[i].priority.toString()==="3"){
						tableT += "<tr class='danger'><td>"+datos.records.record[i].receivedat.toString()+"</td><td>"+datos.records.record[i].fromhost.toString()+"</td><td>"+datos.records.record[i].message.toString()+"</td></tr>";
					}else if(datos.records.record[i].priority.toString()==="6"){
						tableT += "<tr class=''><td>"+datos.records.record[i].receivedat.toString()+"</td><td>"+datos.records.record[i].fromhost.toString()+"</td><td>"+datos.records.record[i].message.toString()+"</td></tr>";
					};					
				};
			} else {
					if(datos.records.record.priority.toString()==="4"){
						tableT += "<tr class='warning'><td>"+datos.records.record.receivedat.toString()+"</td><td>"+datos.records.record.fromhost.toString()+"</td><td>"+datos.records.record.message.toString()+"</td></tr>";
					}else if(datos.records.record.priority.toString()==="5"){
						tableT += "<tr class='success'><td>"+datos.records.record.receivedat.toString()+"</td><td>"+datos.records.record.fromhost.toString()+"</td><td>"+datos.records.record.message.toString()+"</td></tr>";
					}else if(datos.records.record.priority.toString()==="3"){
						tableT += "<tr class='danger'><td>"+datos.records.record.receivedat.toString()+"</td><td>"+datos.records.record.fromhost.toString()+"</td><td>"+datos.records.record.message.toString()+"</td></tr>";
					}else if(datos.records.record.priority.toString()==="6"){
						tableT += "<tr class=''><td>"+datos.records.record.receivedat.toString()+"</td><td>"+datos.records.record.fromhost.toString()+"</td><td>"+datos.records.record.message.toString()+"</td></tr>";
					};					
			}
		} catch (err) {	};
		/*GENERA ARRAY DE ENCABEZADOS DE GRAFICA*/
		try {
			var rowsHeaders = [{
				"sTitle" : "Date"
			},{
				"sTitle" : "Host"
			},{
				"sTitle" : "Message"
			}];
		} catch (err) {	};
		
		var grid = cnocConnector.drawGrid(container, divTable, tableT, rowsHeaders, true);		
	}
};
