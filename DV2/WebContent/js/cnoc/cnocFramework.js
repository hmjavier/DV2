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
				success : function(response, divContainers, divElements) {
					try {
						var ce = response.PrestoResponse.PrestoError.ErrorDetails.code;
						if (ce == 401) {
							alert("Insuficientes Prvilegios");
							window.location = endpoint.path;
						}
					} catch (err) {
						/*** Invoke function callback ***/
						request.callback(response, request.divContainers, request.divElements);
						/*** Unmask all div containers ***/
						$.each(request.divContainers, function(k,v) {
							$( v ).unmask();
						});
					}
				},
				error : function(jqXHR, textStatus, errorThrown) {
					console.log(jqXHR);
					console.log(textStatus);
					console.log(errorThrown);										
				},
				statusCode: {
					404: function() {
						alert("Insuficientes Prvilegios");
						window.location = endpoint.path;
					},
					401: function() {
						alert("Insuficientes Prvilegios");
						window.location = endpoint.path;
					}
				}
			});
			
		} catch (error) {
			alert(error);
			/*** Unmask all div containers ***/
			$.each(request.divContainers, function(k,v) {
				$( v ).unmask();
			});
		}
	},
	
	/*
	 * Create Table
	 * @param : container
	 * @param : idTable
	 * @param : columns
	 * @param : data
	 */
	createTable : function(container, idTable, tableOptions, clickEvent) {
		
		var id = idTable.substring(1);
		
		container.empty();
		container.append('<table id="' + id + '" class="table table-bordered table-striped"></table>');
		var table = $(idTable).DataTable(tableOptions);
		
		if(clickEvent != null) {
			$('#' + id + ' tbody').on('click', 'tr', function () {
				var data = table.row( this ).data();
				clickEvent(data);
			});
		}
		
		return table;
	},
	
	/*
	 * Export Data
	 * @param : options
	 * @param : fileName
	 */
	exportData : function (options, fileName) {
	
		var workbook = new kendo.ooxml.Workbook(options);
	
		kendo.saveAs({
			dataURI: workbook.toDataURL(),
			fileName: fileName
		});
	}
};
