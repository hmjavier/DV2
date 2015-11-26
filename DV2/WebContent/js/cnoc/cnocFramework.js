/**
 * Title: CNOC Framework
 * Autor: Oscar Escamilla
 * Version: 1.0
 */

var cnocFramework = {
		
	networkCode : "",	

	request : {
		invokeUrl : "", // RESTfull Service endpoint
		params : null, // RESTfull parameters
		callback : function(response, divContainers, divElements){}, // Function callback
		divContainers : [], // Containers to mask
		divElements : [] // Elements to draw response		
	},
	
	/*** Invoke mashups ***/
	invokeMashup : function(request) {
		
		/*** Mask all div containers ***/
		$.each(request.divContainers, function(k,v) {
			$( v ).mask("Waiting...");
		});
		
		try {
			$.ajax({
				type : 'GET',
				dataType : 'json',
				url : request.invokeUrl,
				data : request.params,
				error : function(jqXHR, textStatus, errorThrown) {
					console.log(jqXHR);
					console.log(textStatus);
					console.log(errorThrown);
					request.callback(null, request.divContainers, request.divElements);
				},
				success : function(response, divContainers, divElements) {
					try {
						var ce = response.PrestoResponse.PrestoError.ErrorDetails.code;
						if (ce == 401) {
							alert("Insuficientes Prvilegios");
							window.location = endpoint.main;
						}
					} catch (err) {
						/*** Invoke function callback ***/
						request.callback(response, request.divContainers, request.divElements);						
					}
				}
			});
			
		} catch (error) {
			alert(error);
			console.log(error);
			/*** Unmask all div containers ***/
			cnocFramework.unmask(divContainers);
		}
	},
	
	/*
	 * Create Table
	 * @param : container
	 * @param : idTable
	 * @param : columns
	 * @param : data
	 */
	createTable : function(container, idTable, columns, data) {		
		container.empty();
		container.append('<table id="' + idTable.substring(1) + '" class="table table-bordered table-striped"></table>');
		$(idTable).DataTable({
        	"columns": columns,
			"scrollX": true,
			"data" : data
        });
	},
	
	/*
	 * Unmask all div containers
	 * @param : divContainers
	 */
	unmask : function(divContainers) {
		$.each(divContainers, function(k,v) {
			$( v ).unmask();
		});
	}
	
};
