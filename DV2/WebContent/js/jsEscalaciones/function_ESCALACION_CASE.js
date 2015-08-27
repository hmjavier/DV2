function build_ESCALACION_CASE (data, container) {
	
	var reportType = 'ESCALACION CASE';
	
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
					    '<td>ASUNTO:</td>' + 
					    '<td>' + data.records.record.cliente_cnoc + ' | ESCALACION A NIVEL ' + 
						    '<select id="asunto_area_ES" style="width:200px;" >' +
						    	'<option value="SUPERVISI&Oacute;N">Supervisi&oacute;n</option>' +
						    	'<option value="SUBGERENCIA">Subgerencia</option>' +
						    	'<option value="GERENCIA">Gerencia</option>' +
						    	'<option value="COORDINACI&Oacute;N">Coordinaci&oacute;n</option>' +
							'</select>' +
						    ' | SISA ' + '<input type="text" id="asunto_incidente_sisa_ES" size="8" maxlength="10" />' +
					    '</td>' + 
				    '</tr>' +
				    '<tr>' + 
					    '<td>INCIDENTE SISA:</td>' + 
					    '<td><input type="text" id="incidente_sisa_ES" class="form-control" maxlength="130" placeholder="Incidente SISA..." /></td>' + 
				    '</tr>' +
				    '<tr>' + 
					    '<td>INCIDENTE CNOC:</td>' + 
					    '<td><input type="text" id="caso_cnoc_ES" class="form-control" maxlength="130" value="' + data.records.record.caso_cnoc + '" /></td>' + 
				    '</tr>' + 
				    '<tr>' + 
					    '<td>SLA / PENALIZACI&Oacute;N:</td>' + 
					    '<td><div id="radioset_sla_ES" style="display:inline;">' +
					    	'<input type="radio" id="radio1_sla_ES" name="radio_sla_ES" value="SI"><label for="radio1_sla_ES">SI</label>' +
							'<input type="radio" id="radio2_sla_ES" name="radio_sla_ES" value="NO"><label for="radio2_sla_ES">NO</label>' +
						'</div>' +
						'<input type="text" id="sla_ES" size="55" maxlength="130" placeholder="Monto, a Partir de qu&eacute; hora; $$ Acumulada" /></td>' +
				    '</tr>' +
				    '<tr>' + 
					    '<td>IMPACTO DE LA FALLA:</td>' +
					    '<td><select id="impacto_falla_ES" class="form-control">' +
					    	'<option value="">Impacto de la falla...</option>' +
							'<option value="Enlace  principal fuera de servicio y operando por respaldo">Enlace  principal fuera de servicio y operando por respaldo</option>' +
							'<option value="No cuenta con respaldo">No cuenta con respaldo</option>' +
							'<option value="Mesa de ayuda no informa si cuenta con respaldo en sitio">Mesa de ayuda no informa si cuenta con respaldo en sitio</option>' +
							'<option value="Degradaci&oacute;n en el servicio (errores - Oscilaciones)">Degradaci&oacute;n en el servicio (errores - Oscilaciones)</option>' +
							'<option value="Sin afectaci&oacute;n">Sin afectaci&oacute;n</option>' +
						'</select></td>' +
				    '</tr>' +
				    '<tr>' + 
				    	'<td>DESCRIPCI&Oacute;N DE LA FALLA:</td>' +
				    	'<td><select id="falla_reportada_ES" class="form-control">' +
					    	'<option value="">Descripci&oacute;n de la falla...</option>' +
					    	'<option value="Fuera de Servicio">Fuera de Servicio</option>' +
					    	'<option value="Errores">Errores</option>' +
					    	'<option value="Cortes">Cortes</option>' +
					    	'<option value="Intermitencias">Intermitencias</option>' +
						'</select></td>' +
				    '</tr>' +
				    '<tr>' + 
					    '<td>LUGAR:</td>' +
					    '<td><input type="text" id="ciudad_ES" class="form-control" maxlength="300" value="' +
					    	data.records.record.ciudad + ', ' +
					    	data.records.record.estado + '" /></td>' +
				    '</tr>' +
				    '<tr>' + 
				    	'<td>FECHA / HORA INICIO:</td>' + 
				    	'<td><input type="text" id="hora_inicio_ES" class="form-control" maxlength="130" value="' + data.records.record.hora_inicio + '" /></td>' + 
				    '</tr>' +
				    
				    '<tr>' + 
					    '<td>TIEMPO ACUMULADO:</td>' +
					    '<td><input type="text" id="tiempo_afectacion_ES" class="form-control" maxlength="130" value="' + data.records.record.tiempo_afectacion + ' hrs" /></td>' +
				    '</tr>' +
				    
				    '<tr>' + 
					    '<td>CASE REPORTADO:</td>' +
					    '<td><select id="case_reportado_ES" class="form-control">' +
					    	'<option value="">CASE reportado...</option>' +
					    	'<option value="CASE CAFETALES">CASE CAFETALES</option>' +
					    	'<option value="CASE CHIHUHA">CASE CHIHUHA</option>' +
					    	'<option value="CASE GUADAJARA">CASE GUADAJARA</option>' +
					    	'<option value="CASE MERIDA">CASE MERIDA</option>' +
					    	'<option value="CASE HERMOSILLO">CASE HERMOSILLO</option>' +
					    	'<option value="CASE MONTERREY">CASE MONTERREY</option>' +
					    	'<option value="CASE PUEBLA">CASE PUEBLA</option>' +
					    	'<option value="CASE QUERETARO">CASE QUERETARO</option>' +
					    	'<option value="CASE SAN JUAN">CASE SAN JUAN</option>' +
					    	'<option value="CAO">CAO</option>' +
						'</select></td>' +
				    '</tr>' +
				    '<tr>' + 
					    '<td>ESTADO:</td>' +
					    '<td><select id="status_ES" class="form-control">' +
					    	'<option value="">Inicia / Seguimiento 1,2,3 / Termina</option>' +
					    	'<option value="Inicia">Inicia</option>' +
					    	'<option value="Seguimiento 1">Seguimiento 1</option>' +
					    	'<option value="Seguimiento 2">Seguimiento 2</option>' +
					    	'<option value="Seguimiento 3">Seguimiento 3</option>' +
					    	'<option value="Termina">Termina</option>' +
					    '</select></td>' +
				    '</tr>' +
				    '<tr>' + 
					    '<td>CLIENTE AFECTADO:</td>' + 
					    '<td><input type="text" id="cliente_cnoc_ES" class="form-control" maxlength="130" value="' + data.records.record.cliente_cnoc + '" /></td>' + 
				    '</tr>' +
				    '<tr>' + 
					    '<td>REFERENCIA:</td>' + 
					    '<td><input type="text" id="referencia_ES" class="form-control" maxlength="130" value="' + data.records.record.referencia + '" /></td>' + 
				    '</tr>' +
				    '<tr>' + 
					    '<td>CHECK LIST:</td>' +
					    '<td><textarea id="troubleshooting_ES" class="form-control" cols="77" rows="10" maxlength="500" placeholder="Check list..."></textarea></td>' + 
				    '</tr>' +
				    '<tr>' + 
				    	'<td>ACCESO AL SITO DEL CLIENTE:</td>' + 
				    	'<td>' + 
					    	'<div id="radioset_sitio_ES" style="display:inline;">' +
						    	'<input type="radio" id="radio1_sitio_ES" name="radio_sitio_ES" value="SI"><label for="radio1_sitio_ES">SI</label>' +
								'<input type="radio" id="radio2_sitio_ES" name="radio_sitio_ES" value="NO"><label for="radio2_sitio_ES">NO</label>' +
							'</div>' +
					    	'<input type="text" id="sitio_ES" size="55" maxlength="130" placeholder="Horario / Nombre del Contacto" />' + 
					    '</td>' + 
				    '</tr>' +
				    '<tr>' + 
				    	'<td>R&Eacute;PLICA:</td>' + 
				    	'<td>' +
						    '<select id="area_ES" class="form-control">' +
						    	'<option value="">Supervisor/Subgerente/Gerente/Coordinador</option>' +
						    	'<option value="SUPERVISI&Oacute;N">Supervisi&oacute;n</option>' +
						    	'<option value="SUBGERENCIA">Subgerencia</option>' +
						    	'<option value="GERENCIA">Gerencia</option>' +
						    	'<option value="COORDINACI&Oacute;N">Coordinaci&oacute;n</option>' +
							'</select>' +
						'</td>' +
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
		
		if ($( "#to_ES" ).val() == null || $( "#to_ES" ).val() == '') {
			$( "#dialog_text" ).text("El destinatario no puede estar vacio");
			$( "#dialog" ).dialog( "open" );
		
		} else {
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
						asunto: data.records.record.cliente_cnoc + ' | ESCALACION A NIVEL ' + $( '#asunto_area_ES' ).val() + 
						' | SISA ' + $( '#asunto_incidente_sisa_ES' ).val(),
						incidente_sisa: $( '#incidente_sisa_ES' ).val(),
						caso_cnoc: $( '#caso_cnoc_ES' ).val(),
						sla: $('input:radio[name=radio_sla_ES]:checked').val() == 'SI' ?
								$('input:radio[name=radio_sla_ES]:checked').val() + ', ' + $( '#sla_ES' ).val() : 'NO',
						impacto_falla: $( '#impacto_falla_ES' ).val(),
						falla_reportada: $( '#falla_reportada_ES' ).val(),
						ciudad: $( '#ciudad_ES' ).val(),
						hora_inicio: $( '#hora_inicio_ES' ).val(),
						tiempo_afectacion: $( '#tiempo_afectacion_ES' ).val(),
						case_reportado: $( '#case_reportado_ES' ).val(),
						status: $( '#status_ES' ).val(),
						cliente_cnoc: $( '#cliente_cnoc_ES' ).val(),
						referencia: $( '#referencia_ES' ).val(),
						troubleshooting: $( '#troubleshooting_ES' ).val(),
						sitio: $('input:radio[name=radio_sitio_ES]:checked').val() == 'SI' ?
							$('input:radio[name=radio_sitio_ES]:checked').val() + ', ' + $( '#sitio_ES' ).val() : 'NO',
						area: $( '#area_ES' ).val(),
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
		}
	});
}
