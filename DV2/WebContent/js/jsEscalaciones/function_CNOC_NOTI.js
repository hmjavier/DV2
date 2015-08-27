function build_CNOC_NOTI (data, container) {
	
	var reportType = 'CNOC NOTI';
	
	var asunto = 'CNOC | FALLA CRITICA | ' + data.records.record.cliente_cnoc + ' | ' + data.records.record.sitio + ' | ' + data.records.record.caso_cnoc;
	
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
					    '<td>IMPACTO DE LA FALLA:</td>' +
					    '<td><select id="impacto_falla_ES" class="form-control" multiple>' +					    
					    	'<option value="Principal">Principal</option>' +
							'<option value="Respaldo">Respaldo</option>' + 
						'</select></td>' +
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
					    '<td>CRITICIDAD DEL SERVICIO:</td>' + 
					    '<td><input type="text" id="prioridad_ES" class="form-control" maxlength="130" value="' + data.records.record.prioridad + '" /></td>' + 
				    '</tr>' + 
				    '<tr>' + 
					    '<td>FOLIO DEL SERVICIO:</td>' + 
					    '<td><input type="text" id="referencia_ES" class="form-control" maxlength="130" value="' + data.records.record.referencia + '" /></td>' + 
				    '</tr>' +
				    '<tr>' + 
					    '<td>AFECTACI&Oacute;N:</td>' +
					    '<td><div id="radioset_afectacion_ES">' +
					    	'<input type="radio" id="radio1_afectacion_ES" name="afectacion_ES" value="SI"><label for="radio1_afectacion_ES">SI</label>' +
							'<input type="radio" id="radio2_afectacion_ES" name="afectacion_ES" value="NO"><label for="radio2_afectacion_ES">NO</label>' +
						'</div></td>' +
					    
				    '</tr>' +
				    '<tr>' + 
					    '<td>FALLA:</td>' +
					    '<td><select id="falla_reportada_ES" class="form-control">' +
					    	'<option value="">Tipo de falla...</option>' +
							'<option value="Transmisi&oacute;n">Transmisi&oacute;n</option>' +
							'<option value="Uninet">Uninet</option>' +
							'<option value="CPE">CPE</option>' +
							'<option value="En diagn&oacute;stico">En diagn&oacute;stico</option>' +
						'</select></td>' + 
				    '</tr>' + 
				    '<tr>' + 
					    '<td>N&Uacute;MERO DE REPORTE TELMEX:</td>' + 
					    '<td><input type="text" id="numero_reporte_ES" class="form-control" maxlength="130" value="' + data.records.record.numero_reporte + '" /></td>' + 
				    '</tr>' + 
				    '<tr>' + 
					    '<td>N&Uacute;MERO DE REPORTE CNOC:</td>' + 
					    '<td><input type="text" id="caso_cnoc_ES" class="form-control" maxlength="130" value="' + data.records.record.caso_cnoc + '" /></td>' + 
				    '</tr>' + 
				    '<tr>' + 
					    '<td>&Aacute;REA QUE NOTIFICA:</td>' + 
					    '<td><input type="text" id="area_ES" class="form-control" maxlength="130" value="CNOC" /></td>' + 
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
					    '<td>BREVE DESCRIPI&Oacute;N:</td>' +
				    	'<td><textarea id="troubleshooting_ES" class="form-control" cols="77" rows="10" maxlength="500" placeholder="Ingrese comentarios adicionales..."></textarea></td>' +
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
					impacto_falla: ($( "#impacto_falla_ES" ).val() == null || $( "#impacto_falla_ES" ).val() === '') ? 
							'' : $( "#impacto_falla_ES" ).val().join( ", " ),
					cliente_cnoc: $( "#cliente_cnoc_ES" ).val(),
					sitio: $( "#sitio_ES" ).val(),
					prioridad: $( "#prioridad_ES" ).val(),
					referencia: $( "#referencia_ES" ).val(),
					afectacion: $('input:radio[name=afectacion_ES]:checked').val(),
					falla_reportada: $( "#falla_reportada_ES" ).val(),
					numero_reporte: $( "#numero_reporte_ES" ).val(),
					caso_cnoc: $( "#caso_cnoc_ES" ).val(),
					area: $( "#area_ES" ).val(),				
					atiende: $( "#atiende_ES" ).val(),
					telefono: $( "#telefono_ES" ).val(),
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
