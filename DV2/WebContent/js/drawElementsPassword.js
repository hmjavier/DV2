/**
 * Sends change password request
 */
var drawElementsPassword = {
		
	changePassword: function(currentPassword, newPassword) {
		
		cnocConnector.invokeMashup(
	    		cnocConnector.service1, // Service ID
	    		{ // Parameters
	    			"oldPassword" : currentPassword,
	    			"newPassword" : newPassword
	    		},
	    		function (response) { // Callback	    			
	    			if (response.indexOf( 'Result: Success (0)' ) > -1)
	    				$("#validity_label").html('<div class="alert alert-success">' + response + '</div>');
	    			else
	    			$("#validity_label").html('<div class="alert alert-danger">' + response + '</div>');
	    		},
	    		"formPass", // Container
	    		""	// Div
    	);
	}
};