/**
 * hmjavier Clase para generar arrays que se inyectan a los elementos del DOM
 */

var drawElementsInventory = {
	init : function(codeNet) {		
		
    	cnocConnector.invokeMashup(
	    		cnocConnector.service1, // Service ID
	    		{"code_net" : ""}, // Parameters
	    		drawElementsInventory.showInventory, // Callback
	    		"chartInventory", // Container
	    		"tableInventory" // Div
    	);
		
		$(".btn-group > .btn").click(function(){
		    $(this).addClass("active").siblings().removeClass("active");
		});

		if (codeNet != undefined) {
			this.builder(codeNet);

		} else {
			cnocConnector.invokeMashup(cnocConnector.service9, {}, drawElementsInventory.selectCustom, "SelectCustomer", "opt");
		}		

	}, showInventory: function(datos, container, divTable) {		
		
		var inventory = $('.btn-group > .btn.active').text();
		var rowsData = new Array();
		var rowsHeaders = new Array();
		
//		console.log(inventory);
	    
	    if (inventory == 'Transport Inventory') {
	    	try {
				if (datos.records.record.length > 1) {
					for ( var i = 0; i < datos.records.record.length; i++) {
						var fields = new Array();
						fields.push(datos.records.record[i].sector.toString());
						fields.push(datos.records.record[i].codigo_red.toString());
						fields.push(datos.records.record[i].nombre_red.toString());
						fields.push(datos.records.record[i].divisional.toString());
						fields.push(datos.records.record[i].region.toString());
						fields.push(datos.records.record[i].site_id.toString());
						fields.push(datos.records.record[i].sitio.toString());
						fields.push(datos.records.record[i].hostname.toString());
						fields.push(datos.records.record[i].tipo_sitio.toString());
						fields.push(datos.records.record[i].criticida.toString());
						fields.push(datos.records.record[i].subtipo.toString());
						fields.push(datos.records.record[i].servicio.toString());
						fields.push(datos.records.record[i].ci_servicio.toString());
						fields.push(datos.records.record[i].pais.toString());
						fields.push(datos.records.record[i].estado.toString());
						fields.push(datos.records.record[i].ciudad.toString());
						fields.push(datos.records.record[i].cp.toString());
						fields.push(datos.records.record[i].delegacion.toString());
						fields.push(datos.records.record[i].colonia.toString());
						fields.push(datos.records.record[i].calle.toString());
						fields.push(datos.records.record[i].num_ext.toString());
						fields.push(datos.records.record[i].num_int.toString());
						fields.push(datos.records.record[i].contacto.toString());
						fields.push(datos.records.record[i].telefono.toString());
						fields.push(datos.records.record[i].email.toString());
						fields.push(datos.records.record[i].disponibilidad.toString());
						fields.push(datos.records.record[i].referencia.toString());
						fields.push(datos.records.record[i].esquema_enlace.toString());
						fields.push(datos.records.record[i].tipo_balanceo.toString());
						fields.push(datos.records.record[i].bw.toString());
						fields.push(datos.records.record[i].unidad.toString());
						fields.push(datos.records.record[i].centro_soporte.toString());
						fields.push(datos.records.record[i].version_qos.toString());
						fields.push(datos.records.record[i].perfil_qos.toString());
						fields.push(datos.records.record[i].q1.toString());
						fields.push(datos.records.record[i].q2.toString());
						fields.push(datos.records.record[i].q3.toString());
						fields.push(datos.records.record[i].equipo_pe.toString());
						fields.push(datos.records.record[i].tipo_interface_pe.toString());
						fields.push(datos.records.record[i].interface_pe.toString());
						fields.push(datos.records.record[i].vrf.toString());
						fields.push(datos.records.record[i].tipo_servicio.toString());
						fields.push(datos.records.record[i].ip_wan_pe.toString());
						rowsData.push(fields);
					}
				} else {
					var fields = new Array();
					fields.push(datos.records.record.sector.toString());
					fields.push(datos.records.record.codigo_red.toString());
					fields.push(datos.records.record.nombre_red.toString());
					fields.push(datos.records.record.divisional.toString());
					fields.push(datos.records.record.region.toString());
					fields.push(datos.records.record.site_id.toString());
					fields.push(datos.records.record.sitio.toString());
					fields.push(datos.records.record.hostname.toString());
					fields.push(datos.records.record.tipo_sitio.toString());
					fields.push(datos.records.record.criticida.toString());
					fields.push(datos.records.record.subtipo.toString());
					fields.push(datos.records.record.servicio.toString());
					fields.push(datos.records.record.ci_servicio.toString());
					fields.push(datos.records.record.pais.toString());
					fields.push(datos.records.record.estado.toString());
					fields.push(datos.records.record.ciudad.toString());
					fields.push(datos.records.record.cp.toString());
					fields.push(datos.records.record.delegacion.toString());
					fields.push(datos.records.record.colonia.toString());
					fields.push(datos.records.record.calle.toString());
					fields.push(datos.records.record.num_ext.toString());
					fields.push(datos.records.record.num_int.toString());
					fields.push(datos.records.record.contacto.toString());
					fields.push(datos.records.record.telefono.toString());
					fields.push(datos.records.record.email.toString());
					fields.push(datos.records.record.disponibilidad.toString());
					fields.push(datos.records.record.referencia.toString());
					fields.push(datos.records.record.esquema_enlace.toString());
					fields.push(datos.records.record.tipo_balanceo.toString());
					fields.push(datos.records.record.bw.toString());
					fields.push(datos.records.record.unidad.toString());
					fields.push(datos.records.record.centro_soporte.toString());
					fields.push(datos.records.record.version_qos.toString());
					fields.push(datos.records.record.perfil_qos.toString());
					fields.push(datos.records.record.q1.toString());
					fields.push(datos.records.record.q2.toString());
					fields.push(datos.records.record.q3.toString());
					fields.push(datos.records.record.equipo_pe.toString());
					fields.push(datos.records.record.tipo_interface_pe.toString());
					fields.push(datos.records.record.interface_pe.toString());
					fields.push(datos.records.record.vrf.toString());
					fields.push(datos.records.record.tipo_servicio.toString());
					fields.push(datos.records.record.ip_wan_pe.toString());
					rowsData.push(fields);
				}
			} catch (err) {	};
			rowsHeaders = [ {
				"sTitle" : "SECTOR"
			}, {
				"sTitle" : "CODIGO RED"
			}, {
				"sTitle" : "NOMBRE RED"
			}, {
				"sTitle" : "DIVISIONAL"
			}, {
				"sTitle" : "REGION"
			}, {
				"sTitle" : "ID SITIO"
			}, {
				"sTitle" : "SITIO"
			}, {
				"sTitle" : "HOSTNAME"
			}, {
				"sTitle" : "TIPO SITIO"
			}, {
				"sTitle" : "CRITICIDA"
			}, {
				"sTitle" : "SUBTIPO"
			}, {
				"sTitle" : "SERVICIO"
			}, {
				"sTitle" : "CI SERVICIO"
			}, {
				"sTitle" : "PAIS"
			}, {
				"sTitle" : "ESTADO"
			}, {
				"sTitle" : "CIUDAD"
			}, {
				"sTitle" : "CP"
			}, {
				"sTitle" : "DELEGACION"
			}, {
				"sTitle" : "COLONIA"
			}, {
				"sTitle" : "CALLE"
			}, {
				"sTitle" : "NUM EXT"
			}, {
				"sTitle" : "NUM INT"
			}, {
				"sTitle" : "CONTACTO"
			}, {
				"sTitle" : "TELEFONO"
			}, {
				"sTitle" : "EMAIL"
			}, {
				"sTitle" : "DISPONIBILIDAD"
			}, {
				"sTitle" : "REFERENCIA"
			}, {
				"sTitle" : "ESQUEMA_ENLACE"
			}, {
				"sTitle" : "TIPO BALANCEO"
			}, {
				"sTitle" : "BW"
			}, {
				"sTitle" : "UNIDAD"
			}, {
				"sTitle" : "CENTRO_SOPORTE"
			}, {
				"sTitle" : "VERSION QoS"
			}, {
				"sTitle" : "PERFIL QoS"
			}, {
				"sTitle" : "Q1"
			}, {
				"sTitle" : "Q2"
			}, {
				"sTitle" : "Q3"
			}, {
				"sTitle" : "EQUIPO PE"
			}, {
				"sTitle" : "TIPO INTERFACE PE"
			}, {
				"sTitle" : "INTERFACE PE"
			}, {
				"sTitle" : "VRF"
			}, {
				"sTitle" : "TIPO SERVICIO"
			}, {
				"sTitle" : "IP WAN PE"
			} ];
	    } else {	    	
	    	try {
				if (datos.records.record.length > 1) {					
//					console.log(datos.records.record.length);
					for ( var i = 0; i < datos.records.record.length; i++) {						
						var fields = new Array();
						fields.push(datos.records.record[i].sector.toString());
						fields.push(datos.records.record[i].codigo_red.toString());
						fields.push(datos.records.record[i].nombre_red.toString());
						fields.push(datos.records.record[i].divisional.toString());
						fields.push(datos.records.record[i].region.toString());
						fields.push(datos.records.record[i].site_id.toString());
						fields.push(datos.records.record[i].sitio.toString());						
						fields.push(datos.records.record[i].tipo_sitio.toString());
						fields.push(datos.records.record[i].criticida.toString());
						fields.push(datos.records.record[i].servicio.toString());
						fields.push(datos.records.record[i].ci_servicio.toString());
						fields.push(datos.records.record[i].pais.toString());
						fields.push(datos.records.record[i].estado.toString());
						fields.push(datos.records.record[i].ciudad.toString());
						fields.push(datos.records.record[i].cp.toString());
						fields.push(datos.records.record[i].delegacion.toString());
						fields.push(datos.records.record[i].colonia.toString());
						fields.push(datos.records.record[i].calle.toString());
						fields.push(datos.records.record[i].num_ext.toString());
						fields.push(datos.records.record[i].num_int.toString());
						fields.push(datos.records.record[i].contacto.toString());
						fields.push(datos.records.record[i].telefono.toString());
						fields.push(datos.records.record[i].email.toString());												
						fields.push(datos.records.record[i].ip_lan.toString());
						fields.push(datos.records.record[i].ip_loopback.toString());
						fields.push(datos.records.record[i].ip_administracion.toString());
						fields.push(datos.records.record[i].equipo.toString());
						fields.push(datos.records.record[i].tipo.toString());
						fields.push(datos.records.record[i].fabricante.toString());
						fields.push(datos.records.record[i].numero_parte.toString());
						fields.push(datos.records.record[i].numero_serie.toString());
						fields.push(datos.records.record[i].version_so.toString());
						fields.push(datos.records.record[i].propietario.toString());
						fields.push(datos.records.record[i].alcance.toString());
						rowsData.push(fields);
					}
//					console.log(rowsData);
				} else { 
					var fields = new Array();
					fields.push(datos.records.record.sector.toString());
					fields.push(datos.records.record.codigo_red.toString());
					fields.push(datos.records.record.nombre_red.toString());
					fields.push(datos.records.record.divisional.toString());
					fields.push(datos.records.record.region.toString());
					fields.push(datos.records.record.site_id.toString());
					fields.push(datos.records.record.sitio.toString());					
					fields.push(datos.records.record.tipo_sitio.toString());
					fields.push(datos.records.record.criticida.toString());
					fields.push(datos.records.record.servicio.toString());
					fields.push(datos.records.record.ci_servicio.toString());
					fields.push(datos.records.record.pais.toString());
					fields.push(datos.records.record.estado.toString());
					fields.push(datos.records.record.ciudad.toString());
					fields.push(datos.records.record.cp.toString());
					fields.push(datos.records.record.delegacion.toString());
					fields.push(datos.records.record.colonia.toString());
					fields.push(datos.records.record.calle.toString());
					fields.push(datos.records.record.num_ext.toString());
					fields.push(datos.records.record.num_int.toString());
					fields.push(datos.records.record.contacto.toString());
					fields.push(datos.records.record.telefono.toString());
					fields.push(datos.records.record.email.toString());												
					fields.push(datos.records.record.ip_lan.toString());
					fields.push(datos.records.record.ip_loopback.toString());
					fields.push(datos.records.record.ip_administracion.toString());
					fields.push(datos.records.record.equipo.toString());
					fields.push(datos.records.record.tipo.toString());
					fields.push(datos.records.record.fabricante.toString());
					fields.push(datos.records.record.numero_parte.toString());
					fields.push(datos.records.record.numero_serie.toString());
					fields.push(datos.records.record.version_so.toString());
					fields.push(datos.records.record.propietario.toString());
					fields.push(datos.records.record.alcance.toString());
					rowsData.push(fields);
				}
			} catch (err) { console.log(err); };
			rowsHeaders = [ {
					"sTitle" : "SECTOR"
				}, {
					"sTitle" : "CODIGO RED"
				}, {
					"sTitle" : "NOMBRE RED"
				}, {
					"sTitle" : "DIVISIONAL"
				}, {
					"sTitle" : "REGION"
				}, {
					"sTitle" : "ID SITIO"
				}, {
					"sTitle" : "SITIO"
				}, {
					"sTitle" : "TIPO SITIO"
				}, {
					"sTitle" : "CRITICIDA"
				}, {
					"sTitle" : "SERVICIO"
				}, {
					"sTitle" : "CI SERVICIO"
				}, {
					"sTitle" : "PAIS"
				}, {
					"sTitle" : "ESTADO"
				}, {
					"sTitle" : "CIUDAD"
				}, {
					"sTitle" : "CP"
				}, {
					"sTitle" : "DELEGACION"
				}, {
					"sTitle" : "COLONIA"
				}, {
					"sTitle" : "CALLE"
				}, {
					"sTitle" : "NUM EXT"
				}, {
					"sTitle" : "NUM INT"
				}, {
					"sTitle" : "CONTACTO"
				}, {
					"sTitle" : "TELEFONO"
				}, {
					"sTitle" : "EMAIL"
				}, {
					"sTitle" : "IP LAN"
				}, {
					"sTitle" : "IP LOOPBACK"
				}, {
					"sTitle" : "IP ADMINISTRACION"
				}, {
					"sTitle" : "EQUIPO"
				}, {
					"sTitle" : "TIPO"
				}, {
					"sTitle" : "FABRICANTE"
				}, {
					"sTitle" : "NUMERO PARTE"
				}, {
					"sTitle" : "NUMERO SERIE"
				}, {
					"sTitle" : "VERSION SO"
				}, {
					"sTitle" : "PROPIETARIO"
				}, {
					"sTitle" : "ALCANCE"
				} ];
	    }	    
		
		cnocConnector.drawGrid(container, divTable, rowsData, rowsHeaders, false);
		
	}, selectCustom : function(datos, selector, opt) {
		cnocConnector.drawSelect(datos, selector, "inventory");
//		drawElementsInventory.showInventory($("#SelectCustomer").val());

	}
};