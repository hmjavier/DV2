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
	    			if (response.indexOf( 'Result: Success (0)' ) > -1) {
	    				
	    				cnocConnector.invokeMashup(
	    			    		cnocConnector.service2, // Service ID
	    			    		{},
	    			    		function (response) { // Callback
	    			    			console.log(response);
	    			    			setTimeout(
	    			    					function() {
	    			    						$.ajax({
	    			    					        type: 'GET',
	    			    					        dataType: 'jsonp',
	    			    					        url: cnocConnector.logout,
	    			    					        error: function (jqXHR, textStatus, errorThrown) {
	    			    					            console.log(jqXHR);
	    			    					            window.location = "index.html";
	    			    					        },
	    			    					        success: function(response) {
	    			    					        	window.location = "index.html";
	    			    					        }
	    			    						});
	    			    					},
	    			    					3000);
	    			    		},
	    			    		"formPass", // Container
	    			    		""	// Div
	    		    	);
	    				
	    				$("#validity_label").html('<div class="alert alert-success">' + response + '. Logging out...' + '</div>');
	    			
	    			} else
	    			$("#validity_label").html('<div class="alert alert-danger">' + response + '. Please try again.' + '</div>');
	    		},
	    		"formPass", // Container
	    		""	// Div
    	);
	},
	
	getDaysBetween : function( date1, date2 ) {
		//Get 1 day in milliseconds
		var one_day=1000*60*60*24;

		// Convert both dates to milliseconds
		var date1_ms = date1.getTime();
		var date2_ms = date2.getTime();

		// Calculate the difference in milliseconds
		var difference_ms = date2_ms - date1_ms;
		    
		// Convert back to days and return
		return Math.round(difference_ms/one_day); 
	}
};