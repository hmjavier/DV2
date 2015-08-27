function buildCSC (data, container) {
	
	var reportType = 'CSC';
	
	var asunto = 'CNOC | ' + data.records.record.caso_cnoc + ' | ' + data.records.record.cliente_cnoc + ' | ' + data.records.record.sitio;	
	
	$ ( '#'+container ).append(
			'<table class="ui-widget ui-state-default ui-corner-all">' +
			    '<tbody>' + 
				    '<tr>' + 
					    '<td><b>PARA:</b></td>' + 
					    '<td><input type="text" id="to_ES" class="form-control" maxlength="400" /></td>' +
				    '</tr>' + 
				    '<tr>' + 
					    '<td><b>CC:</b></td>' + 
					    '<td><input type="text" id="cc_ES" class="form-control" maxlength="400" /></td>' +
				    '</tr>' + 
				    '<tr>' + 
				    	'<td><b>INCLUIR OPERACIONES:</b></td>' + 
				    	'<td><select id="op_ES" class="form-control" multiple>' +
							'<option value="servcnoc@reduno.com.mx">SERVCNOC</option>' +
							'<option value="gobcnoc@reduno.com.mx">GOBERCNOC</option>' +
							'<option value="opercnoc@reduno.com.mx">OPERACIONES CNOC</option>' +
							'<option value="fincnoc@reduno.com.mx">FINCNOC</option>' +
							'<option value="supervision.cnoc@reduno.com.mx">SUPERVISI&Oacute;N CNOC</option>' +
							'<option value="voz.cnoc@reduno.com.mx">CNOC VOZ</option>' +
						'</select></td>' +
				    '</tr>' + 
				    '<tr>' + 
					    '<td><b>ASUNTO:</b></td>' + 
					    '<td><input type="text" id="asunto_ES" class="form-control" maxlength="130" value="' + asunto + '" /></td>' + 
				    '</tr>' +
				    '<tr>' + 
					    '<td>CLIENTE CNOC:</td>' + 
					    '<td><input type="text" id="cliente_cnoc_ES" class="form-control" maxlength="130" value="' + data.records.record.cliente_cnoc + '" /></td>' + 
				    '</tr>' + 
				    '<tr>' + 
					    '<td>SITIO:</td>' + 
					    '<td><input type="text" id="sitio_ES" class="form-control" maxlength="130" value="' + data.records.record.sitio + '" /></td>' + 
				    '</tr>' + 
				    '<tr>' + 
					    '<td>CASO CNOC:</td>' + 
					    '<td><input type="text" id="caso_cnoc_ES" class="form-control" maxlength="130" value="' + data.records.record.caso_cnoc + '" /></td>' + 
				    '</tr>' + 
				    '<tr>' + 
					    '<td>SITE ID:</td>' + 
					    '<td><input type="text" id="site_id_ES" class="form-control" maxlength="130" value="' + data.records.record.site_id + '" /></td>' + 
				    '</tr>' +
			    	'<tr>' + 
			    		'<td>N&Uacute;MERO DE SERIE:</td>' + 
			    		'<td><input type="text" id="chasis_serial_no_ES" class="form-control" maxlength="130" value="' + data.records.record.serial_no + '" /></td>' + 
			    	'</tr>' +
			    	'<tr>' + 
			    		'<td>REFACIONES REQUERIDAS:</td>' + 
			    		'<td><input type="text" id="chasis_part_no_ES" class="form-control" maxlength="130" value="' + data.records.record.part_no + '" /></td>' + 
			    	'</tr>' +			    	
			    	'</tr>' +
			    		'<td>ATIENDE:</td>' + 
						'<td><input type="text" id="atiende_ES" class="form-control" maxlength="130" value="' + data.records.record.atiende + '" /></td>' + 
				    '</tr>' + 
				    '<tr>' + 
					    '<td>TEL&Eacute;FONO:</td>' + 
					    '<td><input type="text" id="telefono_ES" class="form-control" maxlength="130" value="' + data.records.record.telefono + '" /></td>' + 
				    '</tr>' + 
				    '<tr>' + 
					    '<td>TROUBLESHOOTING:</td>' +
					    '<td><textarea id="troubleshooting_ES" class="form-control" cols="77" rows="10" maxlength="600">' + data.records.record.troubleshooting + '</textarea></td>' +
				    '</tr>' + 
				    '<tr>' + 
					    '<td>SEVERIDAD:</td>' + 
					    '<td><select id="severidad_ES" class="form-control">' +
					    	'<option value="">Seleccione Severidad...</option>' +
							'<option value="DATOS - VOZ FUERA">Datos - Voz Fuera</option>' +
							'<option value="DATOS OK - VOZ FUERA">Datos OK - Voz Fuera</option>' +
							'<option value="CPE">Datos Fuera - Voz OK</option>' +
							'<option value="SIN AFECTACION">Sin Afectacion</option>' +
						'</select></td>' +
				    '</tr>' + 
				    '<tr>' + 
					    '<td>PRIORIDAD:</td>' + 
					    '<td><input type="text" id="prioridad_ES" class="form-control" maxlength="130" value="' + data.records.record.prioridad + '" /></td>' + 
				    '</tr>' + 
				    '<tr>' + 
					    '<td>FALLA REPORTADA:</td>' + 
					    '<td><input type="text" id="falla_reportada_ES" class="form-control" maxlength="130" value="' + data.records.record.falla_reportada + '" /></td>' + 
				    '</tr>' + 
				    '<tr>' + 
					    '<td>DIAGN&Oacute;STICO:</td>' + 
					    '<td><input type="text" id="diagnostico_ES" class="form-control" maxlength="130" placeholder="Ingrese diagn&oacute;stico..." /></td>' + 
				    '</tr>' + 
				    '<tr>' + 
					    '<td>EQUIPO:</td>' + 
					    '<td><input type="text" id="equipo_ES" class="form-control" maxlength="130" placeholder="Ingrese equipo..." /></td>' + 
				    '</tr>' + 
				    '<tr>' + 
					    '<td>CONTACTO:</td>' + 
					    '<td><input type="text" id="contacto_ES" class="form-control" maxlength="130" value="' + data.records.record.contacto + '" /></td>' + 
				    '</tr>' + 
				    '<tr>' + 
					    '<td>TEL&Eacute;FONO CONTACTO:</td>' + 
					    '<td><input type="text" id="telefono_contacto_ES" class="form-control" maxlength="130" value="' + data.records.record.telefono_contacto + '" /></td>' + 
				    '</tr>' + 
				    '<tr>' + 
					    '<td>CALLE:</td>' + 
					    '<td><input type="text" id="calle_ES" class="form-control" maxlength="130" value="' + data.records.record.calle + '" /></td>' + 
				    '</tr>' + 
				    '<tr>' + 
					    '<td>NUM. EXTERIOR:</td>' + 
					    '<td><input type="text" id="num_exterior_ES" class="form-control" maxlength="130" value="' + data.records.record.num_exterior + '" /></td>' + 
				    '</tr>' + 
				    '<tr>' + 
					    '<td>NUM. INTERIOR:</td>' + 
					    '<td><input type="text" id="num_interior_ES" class="form-control" maxlength="130" value="' + data.records.record.num_interior + '" /></td>' + 
				    '</tr>' + 
				    '<tr>' + 
					    '<td>COLONIA:</td>' + 
					    '<td><input type="text" id="colonia_ES" class="form-control" maxlength="130" value="' + data.records.record.colonia + '" /></td>' + 
				    '</tr>' + 
				    '<tr>' + 
					    '<td>ESTADO:</td>' + 
					    '<td><input type="text" id="estado_ES" class="form-control" maxlength="130" value="' + data.records.record.estado + '" /></td>' + 
				    '</tr>' + 
				    '<tr>' + 
					    '<td>CIUDAD:</td>' + 
					    '<td><input type="text" id="ciudad_ES" class="form-control" maxlength="130" value="' + data.records.record.ciudad + '" /></td>' + 
				    '</tr>' + 
				    '<tr>' + 
					    '<td>DELEGACION / MUNICIPIO:</td>' + 
					    '<td><input type="text" id="del_mun_ES" class="form-control" maxlength="130" value="' + data.records.record.delegacion_municipio + '" /></td>' + 
				    '</tr>' + 
				    '<tr>' + 
					    '<td>C&Oacute;DIGO POSTAL:</td>' + 
					    '<td><input type="text" id="codigo_ES" class="form-control" maxlength="130" value="' + data.records.record.codigo_postal + '" /></td>' + 
				    '</tr>' + 
				    '<tr>' + 
					    '<td>PA&Iacute;S:</td>' + 
					    '<td><input type="text" id="pais_ES" class="form-control" maxlength="130" value="' + data.records.record.pais + '" /></td>' + 
				    '</tr>' + 
				    '<tr>' + 
					    '<td>HORARIO DE ACCESO AL SITIO:</td>' + 
					    '<td><input type="text" id="horario_ES" class="form-control" maxlength="130" placeholder="Ingrese horario de acceso al sitio..." /></td>' + 
				    '</tr>' + 
				    '<tr>' + 
					    '<td>RECOMENDACIONES A CAMPO:</td>' + 
					    '<td><input type="text" id="recomendaciones_ES" class="form-control" maxlength="130" placeholder="Ingrese recomendaciones a campo..." /></td>' + 
				    '</tr>' + 
				    '<tr>' + 
					    '<td>OBSERVACIONES:</td>' + 
					    '<td><textarea id="observaciones_ES" class="form-control" cols="77" rows="10" maxlength="500" placeholder="Ingrese las observaciones..."></textarea></td>' + 
				    '</tr>' +
			    '</tbody>' + 
			'</table><br>'
		);
	
	getEmails(reportType);
	
	$( '#'+container ).append( '&nbsp;<button id="send_es_button" type="button" class="btn btn-success glyphicon glyphicon-send">&nbsp;Send</button><br><br>' );	
	$( '#send_es_button' ).button().click(function(){
		
		var operationEmails = $( '#op_ES' ).val();
		var operationEmail = '';
		var cc = '';
		
		$(operationEmails).each(function(k, v) {
			operationEmail = operationEmail + "; " + v;
		});
		
		cc = $( "#cc_ES" ).val() + operationEmail;
		
		cnocConnector.invokeMashup(
				cnocConnector.service2,
				{
					report_type: reportType,
					to: $( "#to_ES" ).val(),
					cc: cc,
					asunto: $( "#asunto_ES" ).val(),
					cliente_cnoc: $( "#cliente_cnoc_ES" ).val(),
					sitio: $( "#sitio_ES" ).val(),
					caso_cnoc: $( "#caso_cnoc_ES" ).val(),
					site_id: $( "#site_id_ES" ).val(),
					chasis_serial_no: $( "#chasis_serial_no_ES" ).val(),
					chasis_part_no: $( "#chasis_part_no_ES" ).val(),
					atiende: $( "#atiende_ES" ).val(),
					telefono: $( "#telefono_ES" ).val(),
					troubleshooting: $( "#troubleshooting_ES" ).val(),
					severidad: $( "#severidad_ES" ).val(),
					prioridad: $( "#prioridad_ES" ).val(),
					falla_reportada: $( "#falla_reportada_ES" ).val(),
					diagnostico: $( "#diagnostico_ES" ).val(),
					equipo: $( "#equipo_ES" ).val(),
					contacto: $( "#contacto_ES" ).val(),
					telefono_contacto: $( "#telefono_contacto_ES" ).val(),
					calle: $( "#calle_ES" ).val(),
					num_exterior: $( "#num_exterior_ES" ).val(),
					num_interior: $( "#num_interior_ES" ).val(),
					colonia: $( "#colonia_ES" ).val(),
					estado: $( "#estado_ES" ).val(),
					ciudad: $( "#ciudad_ES" ).val(),
					delegacion_municipio: $( "#del_mun_ES" ).val(),
					codigo_postal: $( "#codigo_ES" ).val(),
					pais: $( "#pais_ES" ).val(),
					horario_sitio: $( "#horario_ES" ).val(),
					recomendaciones: $( "#recomendaciones_ES" ).val(),
					observaciones: $( "#observaciones_ES" ).val()
				},
				function (result) {
					if (result == '' || result == null) { 
						bootbox.alert("No information Retrived");
						//alert("No information Retrived");
					}else {
						if (result == true) {
							bootbox.alert("Report sent");
							//alert("Report sent");
						} else {
							bootbox.alert("Can't send report");
							//alert("Can't send report");
						}
					}
				},
				"",
				"");
	});
}
