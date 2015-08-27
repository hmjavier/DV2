/**
 * Get emails from JSON 
 * @param reportType
 */
function getEmails (reportType) {
	
//	console.log(reportType);

$.ajax({
		url: "js/jsEscalaciones/email.json",
		type: 'GET',
		dataType: 'json',
		chache: false,
		success: function(data) {		
			
			if (data == '' || data == null) {
				$( "#dialog_text" ).text("No information Retrived");
				$( "#dialog" ).dialog( "open" );
			
			} else {
//				console.log(data);
				$.each(data.reports, function(key, value) {
//					console.log(key + ", " + value);
					$.each(value, function(k, v) {
//						console.log(k + ", " + v);
						if (v.id === reportType) { // found it...
//							console.log("found it...");
							if (reportType === 'Teldat') {
								getEmailSelect(v.to);
							} else {
								$( '#to_ES' ).val(v.to);								
							}
							$( '#cc_ES' ).val(v.cc);
				            return false; // stops the loop
				        }
					});
				});
			}
		},
		error: function(data,status,er) {
			$( "#error_dialog_text" ).text("Error loading email file");
			$( "#error_dialog" ).dialog( "open" );
	    }
	});
};

/**
 * Turn emails into select HTML tag
 * @param emails
 */
function getEmailSelect (emails) {
	var array = emails.split(';');
	$( '#to_ES' ).remove();
	$( '#address_ES' ).append('<select id="to_ES" class="form-control" multiple></select>');
	$.each(array, function(key, value) {
//		console.log(value);
		var arrayTo = value.split(',');
		$( '#to_ES' ).append('<option value="' + arrayTo[1] +'">' + arrayTo[0] +'</option>');		
	});	
};