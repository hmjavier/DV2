function build_SMS_INT (data, container) {
	
	var reportType = 'SMS-INT';
	
	$ ( '#'+container ).append(
			'<table>' +
			    '<tbody>' + 
				    '<tr>' + 
					    '<td><b>PARA:</b></td>' + 
					    '<td><input type="text" id="to_ES" class="form-control" size="80" maxlength="400" /></td>' +									   
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
					    '<td>ASUNTO:</td>' + 					    
					    '<td><select id="asunto_ES" class="form-control">' +
					    	'<option value="">Seleccione asunto...</option>' +
					    	'<option value="CNOC">CNOC</option>' +
					    	'<option value="ALTAPRI">ALTAPRI</option>' +
					    	'<option value="FMASIVA">FMASIVA</option>' +
					    	'<option value="RAS">RAS</option>' +
					    	'<option value="SVELOZ">SVELOZ</option>' +					    	
					    	'<option value="ALFONSRP">ALFONSRP</option>' +
					    	'<option value="JLRUEDA">JLRUEDA</option>' +
					    	'<option value="SALINASS">SALINASS</option>' +
						'</select></td>' +
				    '</tr>' +
				    '<tr>' + 
				    	'<td>CASO CNOC:</td>' + 
				    	'<td><input type="text" id="caso_cnoc_ES" class="form-control" maxlength="130" value="' + data.records.record.caso_cnoc + '" /></td>' + 
				    '</tr>' +
				    '<tr>' + 
				    	'<td>REFERENCIA:</td>' + 
				    	'<td><input type="text" id="referencia_ES" class="form-control" maxlength="130" value="' + data.records.record.referencia+ '" /></td>' + 
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
				    	'<td>TECNOLOG&Iacute;A:</td>' + 
				    	'<td><input type="text" id="tecnologia_ES" class="form-control" maxlength="130" value="' + data.records.record.tecnologia + '" /></td>' + 
				    '</tr>' + 
				    '<tr>' + 
				    	'<td>STATUS:</td>' + 
				    	
				    	'<td><select id="status_ES" class="form-control">' +
				    		'<option value="">Seleccione estatus...</option>' +
					    	'<option value="ACTIVO">Activo</option>' +
					    	'<option value="INACTIVO">Inactivo</option>' +
					    	'<option value="EN DIAGNOSTICO">En diagnostico</option>' +
					    	'<option value="SOLUCION">Soluci&oacute;n</option>' +
					    	'<option value="CIERRE">Cierre</option>' +
						'</select></td>' +
				    '</tr>' +
				    '<tr>' + 
				    	'<td>FECHA:</td>' + 
				    	'<td><input type="text" id="hora_inicio_ES" class="form-control" maxlength="130" value="' + data.records.record.hora_inicio + '" /></td>' + 
				    '</tr>' +
				    '<tr>' + 
					    '<td>ATIENDE:</td>' + 
					    '<td><input type="text" id="atiende_ES" class="form-control" maxlength="130" value="' + data.records.record.atiende + '" /></td>' + 
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
					caso_cnoc: $( "#caso_cnoc_ES" ).val(),
					referencia: $( "#referencia_ES" ).val(),
					cliente_cnoc: $( "#cliente_cnoc_ES" ).val(),
					sitio: $( "#sitio_ES" ).val(),
					tecnologia: $( "#tecnologia_ES" ).val(),
					status: $( "#status_ES" ).val(),
					hora_inicio: $( "#hora_inicio_ES" ).val(),
					atiende: $( "#atiende_ES" ).val()
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
