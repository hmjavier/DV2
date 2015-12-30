/**
 * Title: Changes Calendar
 * Autor: hmjavier
 * Version: 1.0
 */

var gestionCnoc = {
		
	table : null,
		
	/**
	 * Init function 
	 * @param : networkCode
	 */
	init : function (networkCode) {
		// Set Network Code
		cnocFramework.networkCode = networkCode;
		gestionCnoc.getDataCustomer();

	},getDataCustomer: function(){
		try {			
			
			cnocFramework.invokeMashup({
				invokeUrl : endpoint.getGestionCliente,
				params : {
					"network_code" : null,
					"company": null,
					"company_full_name": null
				},
				callback : function(response, divContainers, divElements) {		

					console.log(response);
					
					var columns = [
									{ "title": "Network Code" },
									{ "title": "Name" },
									{ "title": "Full Name" },						
									{ "title": "RFC" },
									{ "title": "Sector" },
									{ "title": "Scope" },
									{ "title": "Cap" },
									{ "title": "Did" },
									{ "title": "Did 800" },
									{ "title": "Conntact Comercial" },
									{ "title": "Entity" },
									{ "title": "RA MANAGER" },
									{ "title": "ABC Supervisor" }
								];
					
					var data = [];
					
					var tableOptions = {
							"columns": columns,
							"scrollY": 500,
							"scrollX": true,
							"data" : data
					};
					
					console.log(columns);
					
					try {
						if (response.records.record.length > 1) {
							$.each(response.records.record, function(k,v) {
								var row = [];
								row.push(v.network_code.toString());
								row.push(v.cliente.toString());
								row.push(v.nombre_completo.toString());
								row.push(v.rfc.toString());
								row.push(v.sector.toString());
								row.push(v.alcance_cnoc.toString());
								row.push(v.cap.toString());
								row.push(v.did.toString());
								row.push(v.did_800.toString());
								row.push(v.ejecutivo_comercial.toString());					
								row.push(v.entidad.toString());					
								row.push(v.gerente_de_operacion.toString());
								row.push(v.supervisor_abc.toString());
								data.push(row);
							});
							
						} 		
						
						console.log(divContainers[0]);
						console.log(divElements[0].selector);
						
						gestionCnoc.table = cnocFramework.createTable(divContainers[0], divElements[0].selector, tableOptions, "");			
						
					} catch (e) {
						console.log(e);			
						gestionCnoc.table = cnocFramework.createTable(divContainers[0], divElements[0].selector, tableOptions, "");
					}
					
				},
				divContainers : [ $('#tableCustomerG') ],
				divElements : [ $('#tableCustomer') ]
			});
			
		} catch(e) {
			console.log(e);
		}	
	}
};