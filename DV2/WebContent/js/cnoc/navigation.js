/**
 * Title: Navigation Bar
 * Autor: Oscar Escamilla
 * Version: 1.0
 */

var navigation = {		
	
	/**
	 * Load Network Codes
	 *  
	 * @param : init function
	 *  
	 */
	getNetworkCodes : function (init) {
		cnocFramework.invokeMashup({
			invokeUrl : endpoint.getNetworkCodes,
			params : null,
			callback : function(response, divContainers) {
				result = response.records.record;
				
				if(result.length > 1) {
					$.each(result, function(k, v) {
						divContainers[0].append(
								'<option value="' + v.network_code + '">' + v.dept_name + '</option>'
							);
					});
				
				} else {
					divContainers[0].append(
							'<option value="' + result.network_code + '">' + result.dept_name + '</option>'
						);
				}
				
				// Call page init function
				init(divContainers[0].val());
				
				// Initialize Chosen Element
		        divContainers[0].chosen().change( function() {
		        	cnocFramework.networkCode = $(this).val();
		        	init(cnocFramework.networkCode); // Call page init function
		          });
				
			},
			divContainers : [ $('#selectCustomer') ]
		});
	},
	
	/*** Load Username & Menu***/
	loadUser : function() {
		cnocFramework.invokeMashup({
			invokeUrl : endpoint.getCurrentUser,
			params : null,
			callback : function(response, divContainers, divElements) {
				divElements[0].text(response.aut.module[0]);
				
				var menu = response.aut.module[2].trim().split(";");
				
				$.each(menu, function( index, value ) {
	        		if(value === "gen=true"){
	        			var general = "<li><a href='../main.jsp'><i class='fa fa-fw fa-home'></i> Home </a></li>";
	        			general +="<li><a href='../incidents.jsp'><i class='fa fa-fw fa-warning'></i> Incidents </a></li>";
	        			general +="<li><a href='../changes.jsp'><i class='fa fa-fw fa-refresh'></i> Changes </a></li>";
	        			general +="<li><a href='../performance.jsp'><i class='fa fa-fw fa-bar-chart-o'></i> Performance </a></li>";
	        			general +="<li><a href='../performanceGraph.jsp'><i class='fa fa-fw fa-bar-chart-o'></i> Performance Report </a></li>";
	        			general +="<li><a href='ftp://ftp.cnoc.telmexit.com/'><i class='fa fa-fw fa-folder-open'></i> Reports </a></li>";
	        			
	        			/*** ABC Load ***/
	        			//general +="<li><a href='http://dashboarddev.cnoc.telmexit.com:8080/abcConfig/mainCap.jsp'><i class='fa fa-fw fa-folder-open'></i> Alta CAP (ABC Config) </a></li>";
	                   	//general +="<li><a href='http://dashboarddev.cnoc.telmexit.com:8080/abcConfig/mainTest.jsp'><i class='fa fa-fw fa-folder-open'></i> INBOX (ABC Config) </a></li>";
	                   	/****************/
	        			
	        			divElements[1].append(general);

	        		}else if(value === "tck=true"){
	        			var tickets = "<li><a href='../tickets.jsp'><i class='fa fa-tags'></i> Tickets </a></li>";
	        			divElements[1].append(tickets);
	        			
	        		}else if(value === "inv=true"){
	        			var inventory = "<li><a href='../inventory.jsp'><i class='fa fa-fw fa-list-alt'></i> Inventory </a></li>";
	        			divElements[1].append(inventory);
	        			
	        		}else if(value === "esc=true"){
	        			var esclations = "<li><a href='../escalation.jsp'><i class='fa fa-fw fa-cloud-upload'></i> Escalaciones </a></li>";
	        			divElements[1].append(esclations);
	        			
	        		}else if(value === "nagios=true"){
	        			var nagios = "<li><a href='http://201.144.8.140/nagios/'><i class='fa fa-fw fa-cloud-upload'></i> Nagios </a></li>";
	        			divElements[1].append(nagios);
	        			
	        		}else if(value === "sct=true"){
	        			var general = "<li><a href='../mainsct.jsp'><i class='fa fa-fw fa-home'></i> SCT MORELOS </a></li>";
	        			general +="<li><a href='../incidentssct.jsp'><i class='fa fa-fw fa-warning'></i> Incidents </a></li>";
	        			
	        			divElements[1].append(general);
	        			
	        		}else if(value === "incidentsReport=true"){
	        			var incidentsReport = "<li><a href='../incidentsReport.jsp'><i class='fa fa-fw fa-list'></i> Incidents Report </a></li>";
	        			divElements[1].append(incidentsReport);
	        		
	        		}else if(value === "perf=false"){
	        			var general = "<li><a href='../main.jsp'><i class='fa fa-fw fa-home'></i> Home </a></li>";
	        			general +="<li><a href='../incidents.jsp'><i class='fa fa-fw fa-warning'></i> Incidents </a></li>";
	        			general +="<li><a href='../changes.jsp'><i class='fa fa-fw fa-refresh'></i> Changes </a></li>";
	        			general +="<li><a href='../performance.jsp'><i class='fa fa-fw fa-bar-chart-o'></i> Performance </a></li>";
	        			general +="<li><a href='ftp://ftp.cnoc.telmexit.com/'><i class='fa fa-fw fa-folder-open'></i> Reports </a></li>";
	            			
	        			divElements[1].append(general);
	        			
	        		}else if(value === "sisatck=true"){
	        			var sisatck = "<li><a href='../sisatck.jsp'><i class='fa fa-fw fa-tag'></i> Tickets SISA </a></li>";
	        			divElements[1].append(sisatck);
	        			
	        		}else if(value === "elara=true"){
	        			var sisatck = "<li><a href='https://201.131.60.39:8098' target='_blank'><i class='fa fa-bar-chart-o'></i> ELARA </a></li>";
	        			divElements[1].append(sisatck);
	        		}
	        	});
				
				divElements[1].append("<li><a href='search.html'><i class='fa fa-fw fa-search'></i> Advanced Search </a></li>");	        	
				divElements[1].append("<li><a href='../password.jsp'><i class='fa fa-fw fa-lock'></i> Change Password </a></li>");
				
			},
			divContainers : [ $('#userNameContainer'), $( '#menuContainer' ) ],
			divElements : [ $( '#userName' ), $( '#menu_items' ) ]
		});
		
		/*** Logout User ***/
		$( '#logout' ).click(function() {
			$.ajax({
				type: 'GET',
				dataType: 'json',
				url: endpoint.logout,
				success: function(response) {	    				
					window.location = endpoint.path;
				},
				error: function (jqXHR, textStatus, errorThrown) {
					console.log(jqXHR);
					window.location = endpoint.path;
				}
			});
		});
	}
};