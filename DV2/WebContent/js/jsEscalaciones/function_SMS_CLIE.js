function build_SMS_CLIE(data, container) {
	
	var reportType = 'SMS-CLIE';
	
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
					    '<td><input type="text" id="asunto_ES" class="form-control" maxlength="130" /></td>' + 
				    '</tr>' +
				    '<tr>' + 
			    		'<td>Se informa:</td>' +
			    		'<td><textarea id="troubleshooting_ES" class="form-control" cols="77" rows="10" maxlength="145" placeholder="Cuerpo del mensaje..."></textarea></	td>' +
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
					sms: $( "#troubleshooting_ES" ).val()
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
