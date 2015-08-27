function buildGFC (data, container) {
	
	var reportType = 'GFC';
	
	var asunto = 'CNOC | ' + data.records.record.caso_cnoc + ' | ' + data.records.record.cliente_cnoc + ' | ' + data.records.record.sitio + ' | ' + data.records.record.tecnologia;
	
	$ ( '#'+container ).append(
			'<table>' +
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
							'<option value="supervision.cnoc@reduno.com.mx">SUPERVIS&Oacute;N CNOC</option>' +
							'<option value="voz.cnoc@reduno.com.mx">CNOC VOZ</option>' +
						'</select></td>' +
					'</tr>' + 
				    '<tr>' + 
					    '<td><b>ASUNTO:</b></td>' + 
					    '<td><input type="text" id="asunto_ES" class="form-control" maxlength="130" value="' + asunto + '" /></td>' + 
				    '</tr>' +
				    '<tr>' + 
			    		'<td>COMENTARIOS:</td>' + 
			    		'<td><textarea id="comentarios_ES" class="form-control" cols="77" rows="10" maxlength="500" placeholder="Ingrese comentarios adicionales..."></textarea></td>' + 
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
					    '<td>ATIENDE:</td>' + 
					    '<td><input type="text" id="atiende_ES" class="form-control" maxlength="130" value="' + data.records.record.atiende + '" /></td>' + 
				    '</tr>' + 
				    '<tr>' + 
					    '<td>TEL&Eacute;FONO:</td>' + 
					    '<td><input type="text" id="telefono_ES" class="form-control" maxlength="130" value="' + data.records.record.telefono + '" /></td>' + 
				    '</tr>' + 
				    '<tr>' + 
					    '<td>FALLA REPORTADA:</td>' + 
					    '<td><input type="text" id="falla_reportada_ES" class="form-control" maxlength="130" value="' + data.records.record.falla_reportada + '" /></td>' + 
				    '</tr>' + 
				    '<tr>' + 
					    '<td>PRIORIDAD:</td>' + 
					    '<td><input type="text" id="prioridad_ES" class="form-control" maxlength="130" value="' + data.records.record.prioridad + '" /></td>' + 
				    '</tr>' +				     
				    '<tr>' + 
					    '<td>REFERENCIA:</td>' + 
					    '<td><input type="text" id="referencia_ES" class="form-control" maxlength="130" value="' + data.records.record.referencia+ '" /></td>' + 
				    '</tr>' + 
				    '<tr>' + 
					    '<td>ANCHO DE BANDA:</td>' + 
					    '<td><input type="text" id="ancho_banda_ES" class="form-control" maxlength="130" value="' + data.records.record.ancho_banda + '" /></td>' + 
				    '</tr>' + 
				    '<tr>' + 
					    '<td>TECNOLOG&Iacute;A:</td>' + 
					    '<td><input type="text" id="tecnologia_ES" class="form-control" maxlength="130" value="' + data.records.record.tecnologia + '" /></td>' + 
				    '</tr>' + 
				    '<tr>' + 
					    '<td>PE:</td>' + 
					    '<td><input type="text" id="pe_ES" class="form-control" maxlength="130" value="' + data.records.record.pe + '" /></td>' + 
				    '</tr>' + 
				    '<tr>' + 
					    '<td>TIME VELOCIDAD:</td>' + 
					    '<td><input type="text" id="time_velocidad_ES" class="form-control" maxlength="130" value="' + data.records.record.time_velocidad + '" /></td>' + 
				    '</tr>' + 
				    '<tr>' + 
					    '<td>VRF:</td>' + 
					    '<td><input type="text" id="vrf_ES" class="form-control" maxlength="130" value="' + data.records.record.vrf + '" /></td>' + 
				    '</tr>' + 
				    '<tr>' + 
					    '<td>IP WAN:</td>' + 
					    '<td><input type="text" id="ip_wan_ES" class="form-control" maxlength="130" value="' + data.records.record.ip_wan + '" /></td>' + 
				    '</tr>' + 
				    '<tr>' + 
					    '<td>TIPO DE RUTEO:</td>' + 
					    '<td><input type="text" id="tipo_ruteo_ES" class="form-control" maxlength="130" value="' + data.records.record.tipo_ruteo + '" /></td>' + 
				    '</tr>' + 
				    '<tr>' + 
					    '<td>ENCAPSULAMIENTO:</td>' + 
					    '<td><input type="text" id="encapsulamiento_ES" class="form-control" maxlength="130" value="' + data.records.record.encapsulamiento + '" /></td>' + 
				    '</tr>' + 
				    '<tr>' + 
					    '<td>CALIDAD DEL SERVICIO:</td>' + 
					    '<td><input type="text" id="calidad_servicio_ES" class="form-control" maxlength="130" value="' + data.records.record.calidad_servicio + '" /></td>' + 
				    '</tr>' + 
				    '<tr>' + 
					    '<td>PERFIL:</td>' + 
					    '<td><input type="text" id="perfil_ES" class="form-control" maxlength="130" value="' + data.records.record.perfil + '" /></td>' + 
				    '</tr>' + 
				    '<tr>' + 
					    '<td>PRUEBAS REALIZADAS:</td>' +					    
					    '<td><textarea id="troubleshooting_ES" class="form-control" cols="77" rows="10" maxlength="600">' + data.records.record.troubleshooting + '</textarea></td>' +
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
					comentarios: $( "#comentarios_ES" ).val(),
					cliente_cnoc: $( "#cliente_cnoc_ES" ).val(),
					sitio: $( "#sitio_ES" ).val(),
					caso_cnoc: $( "#caso_cnoc_ES" ).val(),
					atiende: $( "#atiende_ES" ).val(),
					telefono: $( "#telefono_ES" ).val(),
					falla_reportada: $( "#falla_reportada_ES" ).val(),
					prioridad: $( "#prioridad_ES" ).val(),
					referencia: $( "#referencia_ES" ).val(),
					ancho_banda: $( "#ancho_banda_ES" ).val(),
					tecnologia: $( "#tecnologia_ES" ).val(),
					pe: $( "#pe_ES" ).val(),
					time_velocidad: $( "#time_velocidad_ES" ).val(),
					vrf: $( "#vrf_ES" ).val(),
					ip_wan: $( "#ip_wan_ES" ).val(),
					tipo_ruteo: $( "#tipo_ruteo_ES" ).val(),
					encapsulamiento: $( "#encapsulamiento_ES" ).val(),
					calidad_servicio: $( "#calidad_servicio_ES" ).val(),
					perfil: $( "#perfil_ES" ).val(),
					troubleshooting: $( "#troubleshooting_ES" ).val()
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
