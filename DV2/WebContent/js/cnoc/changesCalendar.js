/**
 * Title: Changes Calendar
 * Autor: hmjavier
 * Version: 1.0
 */

var changesCalendar = {
		
	table : null,
		
	/**
	 * Init function 
	 * @param : networkCode
	 */
	init : function (networkCode) {
		// Set Network Code
		cnocFramework.networkCode = networkCode;
		
		//search.renderFilters();
		changesCalendar.getChanges();
	},
	
	/*** Rendering Calendar ***/
	renderCalendar : function () {
		
		$("#calendar").fullCalendar({
    		schedulerLicenseKey: 'GPL-My-Project-Is-Open-Source',
    		 header: {
    		      left: 'prev,next today',
    		      center: 'title',
    		      right: 'month,agendaWeek,agendaDay'
    		    },
    		    eventClick: function(calEvent, jsEvent, view) {

    		    	var idChange = calEvent.title.split(":");
    		    	
    		    	cnocFramework.invokeMashup({
    					invokeUrl : endpoint.getDataChangesCalendar,
    					params : {
    						"changeId" : idChange[0]
    					},
    					callback : function(response, divContainers, divElements) {
    						
    						$( '#modal_body' ).empty();
    						
    						var dataChange = "<div class='bs-callout bs-callout-info' id=callout-glyphicons-location>";
							dataChange += "<h4><b>Title: </b></h4>";
    						dataChange += "<p>"+response.records.record.brief_description+"</p>"; 
							dataChange += "	<ul>"; 
							dataChange += "		<li><b>Company: </b>"+response.records.record.company+"</li>";
							dataChange += "		<li><b>Sector: </b>"+response.records.record.sector+"</li>";
							dataChange += "		<li><b>Location: </b>"+response.records.record.location+"</li>";
							dataChange += "		<li><b>Status: </b>"+response.records.record.status+"</li>";
							dataChange += "		<li><b>Category: </b>"+response.records.record.category+"</li>";
							dataChange += "		<li><b>Plenned Start: </b>"+response.records.record.planned_start+"</li>";
							dataChange += "		<li><b>Assigned To: </b>"+response.records.record.assigned_to+"</li>";
							dataChange += "		<li><b>Cordinator: </b>"+response.records.record.coordinator+"</li>";
							dataChange += "		<li><b>Change Model: </b>"+response.records.record.changemodel+"</li>";
							dataChange += "		<li><b>External Reference: </b></li>";
							dataChange += "	</ul>";
							dataChange += "	<br>";
							dataChange += "<h4><b>Description: </b></h4>";
							dataChange += "<div><pre style='overflow: auto; height: 200px;'><p>"+response.records.record.description+"</p></pre></div>"; 
							dataChange += "</div>"; 
    						
    						$( '.modal-title' ).text( "Change ID: "+calEvent.title );
		    		    	$( '#modal_body' ).append( dataChange);
		    		    	$( '#info_modal' ).modal('show');
    					},
    					divContainers : [ null ],
    					divElements : [ null ]
    		    	});
    		    },
    		    editable: false,
    		    eventLimit: true//, // allow "more" link when too many events
    		    //events : response.records.record			    		    
    	 });
		
		
	},
	
	/*
	 * Get Changes
	 */
	getChanges : function () {
		
		//$("#calendar").empty();
		
		
		var category = null;
		var sector = null;
		
		var sectorChange = $("#sectorChange").val();
		var categoryChange = $("#categoryChange").val();
		
		if(sectorChange === "" && categoryChange !== ""){			
			category = "and c1.CATEGORY = '"+categoryChange+"'";			
		}else if(sectorChange !== "" && categoryChange !== ""){			
			sector = "and company.SECTOR = '"+sectorChange+"'";
			category = "and c1.CATEGORY = '"+categoryChange+"'";		
		}else if(sectorChange !== "" && categoryChange === ""){			
			sector = "and company.SECTOR = '"+sectorChange+"'";
		}
		
		try {			
			
			cnocFramework.invokeMashup({
				invokeUrl : endpoint.getListChangesCalendar,
				params : {
					"network_code" : null,
					"category": category,
					"sector": sector
				},
				callback : function(response, divContainers, divElements) {		

					$('#calendar').fullCalendar('removeEvents');
		            $('#calendar').fullCalendar('addEventSource', response.records.record);         
		            $('#calendar').fullCalendar('rerenderEvents' );
				},
				divContainers : [ $('#calendar') ],
				divElements : [ $('#calendar') ]
			});
			
		} catch(e) {
			console.log(e);
		}					
	}
};