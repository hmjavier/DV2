/**
 * hmjavier
 * Clase para generar arrays que se inyectan a los elementos del DOM
 */

var drawElementsCostos = {
		dataChartCostos : [],
		init : function(codeNet) {

			this.builder();

		},builder: function(){				
			cnocConnector.invokeMashup(cnocConnector.service1, {"query":"select count(SECTOR) as value, SECTOR as sector  from datos group by SECTOR"},drawElementsCostos.drawChartSector, "chartSectorCostos", "chartSectorCostosC");
			cnocConnector.invokeMashup(cnocConnector.service1, {"query":"select CLIENTE, CODIGO_DE_RED, DISP_MONITOREO,SITIOS, TOTAL_DISP, Fecha_inicio_operacion, SECTOR,  COSTO_MENSUAL_NOC_TERCERO, MESES_TRANSCURRIDOS, OPTIMIZACION  from datos"},drawElementsCostos.listCustomerCostos, "listCustomerCostos", "listCustomerCostosC");
			
		
		}, drawChartSector: function(datos, container, divPie){
			console.log(datos);
			var dataSector = new Array();
		    try {
		      if (datos.records.record.length > 1) {
		        for (var i = 0; i < datos.records.record.length; i++) {
		          var array = new Array();
		          array.push(datos.records.record[i].sector);
		          array.push(parseInt(datos.records.record[i].value));
		          dataSector.push(array);
		        }
		      } else {
		        var array = new Array();
		        array.push(datos.records.record.sector);
		        array.push(parseInt(datos.records.record.value));
		        dataSector.push(array);
		      }
		    } catch (err) {
		      dataSector = new Array();
		    }
		    var optChart = cnocConnector.drawChart("pie", container, "",dataSector, null);
		    
		    optChart.plotOptions.series.point.events.click = function () {
		    	//alert(this.name);
		    	cnocConnector.invokeMashup(cnocConnector.service1, {"query":"select CLIENTE, CODIGO_DE_RED, DISP_MONITOREO,SITIOS, TOTAL_DISP, Fecha_inicio_operacion, SECTOR,  COSTO_MENSUAL_NOC_TERCERO, MESES_TRANSCURRIDOS, OPTIMIZACION  from datos where SECTOR = '"+this.name+"'"},drawElementsCostos.listCustomerCostos, "listCustomerCostos", "listCustomerCostosC");
		    };

		    var chart = new Highcharts.Chart(optChart);
		},listCustomerCostos: function(datos, container, divTable){
			drawElementsCostos.dataChartCostos.length = 0;
			var rowsData = new Array();
			var totOptimizacion = 0;
			var totTercero = 0;
			var totc1 = 0;
			var totc2 = 0;
			var totc3 = 0;
			var totc4 = 0;
			var totc5 = 0;
			
			var toto1 = 0;
			var toto2 = 0;
			var toto3 = 0;
			var toto4 = 0;
			var toto5 = 0;
			
			var years = new Array();
			var dataCostoTercero = new Array();
			var dataOptimizacion = new Array();
			
			
			$("#countAllCostos").empty();
			$("#countAllTercero").empty();
			
			$( ".counts" ).mask("Waiting...");
			$( "#countAllTercero" ).mask("Waiting...");
			
			try {
				if (datos.records.record.length > 1) {
					for ( var i = 0; i < datos.records.record.length; i++) {
						var fields = new Array();
						fields.push(datos.records.record[i].CODIGO_DE_RED.toString());
						fields.push(datos.records.record[i].CLIENTE.toString());							
						fields.push(datos.records.record[i].DISP_MONITOREO.toString());
						fields.push(datos.records.record[i].SITIOS.toString());
						fields.push(datos.records.record[i].TOTAL_DISP.toString());
						fields.push(datos.records.record[i].Fecha_inicio_operacion.toString());
						fields.push(datos.records.record[i].SECTOR.toString());
						fields.push(datos.records.record[i].COSTO_MENSUAL_NOC_TERCERO.toString());
						fields.push(datos.records.record[i].MESES_TRANSCURRIDOS.toString());
						fields.push(datos.records.record[i].OPTIMIZACION.toString());
						rowsData.push(fields);
						var myDate = new Date(datos.records.record[i].Fecha_inicio_operacion.toString());
						
						if(isNaN(parseFloat(datos.records.record[i].COSTO_MENSUAL_NOC_TERCERO)) || isNaN(parseFloat(datos.records.record[i].OPTIMIZACION))){
							
						}else{
							if(years.indexOf(myDate.getFullYear()) < 0){
								years.push(myDate.getFullYear());
							}
							
							if(myDate.getFullYear().toString() === "2010"){
								totc1 = totc1 + (parseFloat(datos.records.record[i].COSTO_MENSUAL_NOC_TERCERO));
								toto1 = toto1 + (parseFloat(datos.records.record[i].OPTIMIZACION));
							}else if(myDate.getFullYear().toString() === "2011"){
								totc2 = totc2 + (parseFloat(datos.records.record[i].COSTO_MENSUAL_NOC_TERCERO));
								toto2 = toto2 + (parseFloat(datos.records.record[i].OPTIMIZACION));
							}else if(myDate.getFullYear().toString() === "2012"){
								totc3 = totc3 + (parseFloat(datos.records.record[i].COSTO_MENSUAL_NOC_TERCERO));
								toto3 = toto3 + (parseFloat(datos.records.record[i].OPTIMIZACION));
							}else if(myDate.getFullYear().toString() === "2013"){
								totc4 = totc4 + (parseFloat(datos.records.record[i].COSTO_MENSUAL_NOC_TERCERO));
								toto4 = toto4 + (parseFloat(datos.records.record[i].OPTIMIZACION));
							}else if(myDate.getFullYear().toString() === "2014"){
								totc5 = totc5 + (parseFloat(datos.records.record[i].COSTO_MENSUAL_NOC_TERCERO));
								toto5 = toto5 + (parseFloat(datos.records.record[i].OPTIMIZACION));
							}
							
							try{

								totTercero = totTercero + (parseFloat(datos.records.record[i].COSTO_MENSUAL_NOC_TERCERO));								
								totOptimizacion = totOptimizacion + (parseFloat(datos.records.record[i].OPTIMIZACION));					
							}catch(e){
								console.log(e);
							}
						}
					}
					
					dataCostoTercero.push(totc1);
					dataCostoTercero.push(totc2);
					dataCostoTercero.push(totc3);
					dataCostoTercero.push(totc4);
					dataCostoTercero.push(totc5);
					console.log(dataCostoTercero);
					
					dataOptimizacion.push(toto1);
					dataOptimizacion.push(toto2);
					dataOptimizacion.push(toto3);
					dataOptimizacion.push(toto4);
					dataOptimizacion.push(toto5);
					console.log(dataOptimizacion);
					
					var dataChart = {name:"Costo NOC Tercero", data: dataCostoTercero};

	   				drawElementsCostos.dataChartCostos.push(dataChart);

	   				var dataChartO = {name:"Optimizacion", data: dataOptimizacion};

	   				drawElementsCostos.dataChartCostos.push(dataChartO);

	   				
	   				console.log(drawElementsCostos.dataChartCostos);
	   				console.log(years);

					var optChart = cnocConnector.drawChartCostos("spline", "chartSectorCostosBar", drawElementsCostos.dataChartCostos, years);
					chart = new Highcharts.Chart(optChart);					
					
					$("#countAllCostos").append(totOptimizacion.toFixed(2)).priceFormat({
						 prefix: '$ ',
						 thousandsSeparator: ',',
						 allowNegative: true
					});
					
					$("#countAllTercero").append(totTercero.toFixed(2)).priceFormat({
						 prefix: '$ ',
						 thousandsSeparator: ',',
						 allowNegative: true
					});

				} else {
					var fields = new Array();
					fields.push(datos.records.record.CODIGO_DE_RED.toString());
					fields.push(datos.records.record.CLIENTE.toString());							
					fields.push(datos.records.record.DISP_MONITOREO.toString());
					fields.push(datos.records.record.SITIOS.toString());
					fields.push(datos.records.record.TOTAL_DISP.toString());
					fields.push(datos.records.record.Fecha_inicio_operacion.toString());
					fields.push(datos.records.record.SECTOR.toString());
					fields.push(datos.records.record.COSTO_MENSUAL_NOC_TERCERO.toString());
					fields.push(datos.records.record.MESES_TRANSCURRIDOS.toString());
					fields.push(datos.records.record.OPTIMIZACION.toString());					
					rowsData.push(fields);
				}
			} catch (err) {	
				console.log(err);
			};
			var rowsHeaders = [ {
				"sTitle" : "CODIGO DE RED"
			}, {
				"sTitle" : "CLIENTE"
			}, {
				"sTitle" : "DISP. MONITOREO"
			}, {
				"sTitle" : "SITIOS"
			}, {
				"sTitle" : "TOTAL DISP."
			}, {
				"sTitle" : "FECHA INICIO OPERACION"
			}, {
				"sTitle" : "SECTOR"
			}, {
				"sTitle" : "COSTO MENSUAL NOC TERCERO"
			}, {
				"sTitle" : "MESES TRANSCURRIDOS"
			}, {
				"sTitle" : "OPTIMIZACION"
			} ];
			cnocConnector.drawGrid(container, divTable, rowsData, rowsHeaders, false);
			$( ".counts").unmask();
			$( "#countAllTercero").unmask();
		}
};