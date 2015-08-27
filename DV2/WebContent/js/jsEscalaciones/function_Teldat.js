function build_Teldat (data, container) {
	
	var reportType = 'Teldat';
	
	var asunto = 'CNOC | ' + data.records.record.caso_cnoc + ' | ' + data.records.record.cliente_cnoc + ' | ' + data.records.record.sitio;	
	
	$ ( '#'+container ).append(
			'<table class="ui-widget ui-state-default ui-corner-all">' +
			    '<tbody>' + 
				    '<tr>' + 
					    '<td><b>PARA:</b></td>' + 
					    '<td id="address_ES"><input type="text" id="to_ES" class="form-control" maxlength="400" /></td>' +
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
				    '</tr>' +
		    			'<td>ATIENDE:</td>' + 
		    			'<td><input type="text" id="atiende_ES" class="form-control" maxlength="130" value="' + data.records.record.atiende + '" /></td>' + 
					'</tr>' +					
					'<tr>' + 
					    '<td>N&Uacute;MERO DE CASO:</td>' + 
					    '<td><input type="text" id="caso_cnoc_ES" class="form-control" maxlength="130" value="' + data.records.record.caso_cnoc + '" /></td>' + 
				    '</tr>' +
				    '<tr>' + 
					    '<td>PRUEBAS REALIZADAS:</td>' +
					    '<td><textarea id="troubleshooting_ES" class="form-control" cols="77" rows="10" maxlength="600">' + data.records.record.troubleshooting + '</textarea></td>' +
				    '</tr>' +
				    '<tr>' + 
					    '<td>DESCRIPCI&Oacute;N DE LA FALLA:</td>' + 
					    '<td><input type="text" id="falla_reportada_ES" class="form-control" maxlength="130" value="' + data.records.record.falla_reportada + '" /></td>' + 
				    '</tr>' +
				    '<tr>' + 
			    		'<td>MODELO DEL ROUTER:</td>' + 
			    		'<td><input type="text" id="chasis_part_no_ES" class="form-control" maxlength="130" value="' + data.records.record.part_no + '" /></td>' + 
			    	'</tr>' +					
				    '<tr>' + 
					    '<td>IP WAN:</td>' + 
					    '<td><input type="text" id="ip_wan_ES" class="form-control" maxlength="130" value="' + data.records.record.ip_wan + '" /></td>' + 
				    '</tr>' + 
				    '<tr>' + 
					    '<td>TIPO DE SERVICIO:</td>' + 
					    '<td><input type="text" id="tecnologia_ES" class="form-control" maxlength="130" value="' + data.records.record.tecnologia + '" /></td>' + 
				    '</tr>' +
				    '<tr>' + 
					    '<td>INTERFAZ DE CONEXI&Oacute;N:</td>' + 
					    '<td><input type="text" id="time_velocidad_ES" class="form-control" maxlength="130" value="' + data.records.record.time_velocidad + '" /></td>' + 
				    '</tr>' +
			    	'<tr>' + 
			    		'<td>PROTOCOLOS DE ENRUTAMIENTO:</td>' + 
			    		'<td><input type="text" id="tipo_ruteo_ES" class="form-control" maxlength="130" value="' + data.records.record.tipo_ruteo + '" /></td>' +
			    	'</tr>' +
				    '<tr>' + 
					    '<td>ESTAD&Iacute;STICOS DE LA INTERFAZ PE:</td>' +
					    '<td><textarea id="estadisticos_ES" class="form-control" cols="77" rows="10" maxlength="500" placeholder="Ingrese los estad&iacute;sticos..."></textarea></td>' +
				    '</tr>' +
				    '<tr>' + 
					    '<td>TRAZAS DEL ROUTER:</td>' + 
					    '<td><textarea id="trazas_ES" class="form-control" cols="77" rows="10" maxlength="500" placeholder="Ingrese las trazas del Router..."></textarea></td>' +
				    '</tr>' +
			    '</tbody>' + 
			'</table><br>'
		);
	
	getEmails(reportType);
	
	$( '#'+container ).append( '&nbsp;<button id="send_es_button" type="button" class="btn btn-success glyphicon glyphicon-send">&nbsp;Send</button><br><br>' );	
	$( '#send_es_button' ).button().click(function(){
		
		var _emails = $( "#to_ES" ).val();
		var _to = '';
		var operationEmails = $( '#op_ES' ).val();
		var operationEmail = '';
		var cc = '';
		
		$(_emails).each(function(k, v) {
			_to = _to + "; " + v;
		});
		
		$(operationEmails).each(function(k, v) {
			operationEmail = operationEmail + "; " + v;
		});
		
		cc = $( "#cc_ES" ).val() + operationEmail;
		
		cnocConnector.invokeMashup(
				cnocConnector.service2,
				{
					report_type: reportType,
					to: _to,
					cc: cc,
					asunto: $( "#asunto_ES" ).val(),					
					atiende: $( "#atiende_ES" ).val(),					
					caso_cnoc: $( "#caso_cnoc_ES" ).val(),
					troubleshooting: $( "#troubleshooting_ES" ).val(),
					falla_reportada: $( "#falla_reportada_ES" ).val(),
					chasis_part_no: $( "#chasis_part_no_ES" ).val(),
					ip_wan: $( "#ip_wan_ES" ).val(),
					tecnologia: $( "#tecnologia_ES" ).val(),
					time_velocidad: $( "#time_velocidad_ES" ).val(),
					tipo_ruteo: $( "#tipo_ruteo_ES" ).val(),					
					estadisticos: $( "#estadisticos_ES" ).val(),										
					trazas: $( "#trazas_ES" ).val()
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
