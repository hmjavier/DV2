/**
 * Title: Endpoints Loader
 * Autor: Oscar Escamilla
 * Version: 1.0
 */
var endpoint = {
	getSearchProperties : function() {
		try {
			$.ajax({
			    async: false,
			    url: "../properties/endpoint.json",
			    success: function( data ) {
			    	endpoint.main = data.main;
			    	endpoint.path = data.path;
					endpoint.logout = endpoint.main + data.logout;
					endpoint.getCurrentUser = endpoint.main + data.getCurrentUser;
					endpoint.getNetworkCodes = endpoint.main + data.getNetworkCodes;
					endpoint.getfilters = endpoint.main + data.getfilters;
					endpoint.getIncidents = endpoint.main + data.getIncidents;
					endpoint.getActivities = endpoint.main + data.getActivities;
					endpoint.getListChangesCalendar = endpoint.main + data.getListChangesCalendar;
					endpoint.getDataChangesCalendar = endpoint.main + data.getDataChangesCalendar;
					endpoint.getGestionCliente = endpoint.main + data.getGestionCliente;
				},
				error : function(jqXHR, textStatus, errorThrown) {
					console.log("Can't load 'endpoint.json'");
					console.log(jqXHR);
					console.log(textStatus);
					console.log(errorThrown);
				}
			});
		} catch (err) {
			console.log("Can't load 'endpoint.json'. " + err);
		}
	},
	
	getMainProperties : function() {
		try {
			$.ajax({
		    	async: false,
		    	url: "properties/endpoint.json",
		    	success: function( data ) {		    	
		    		endpoint.main = data.main;
					endpoint.getNmisStatus = endpoint.main + data.getNmisStatus;
					endpoint.getNmisGroups = endpoint.main + data.getNmisGroups;
					endpoint.getDegradedNodes = endpoint.main + data.getDegradedNodes;
					endpoint.getOpFlowTopN = endpoint.main + data.getOpFlowTopN;
					endpoint.getIpOpflow = endpoint.main + data.getIpOpflow;
					endpoint.getListNodesIpFlow = endpoint.main + data.getListNodesIpFlow;
					endpoint.getDegradedNodesList = endpoint.main + data.getDegradedNodesList;
					endpoint.getTicketsRangeTime = endpoint.main + data.getTicketsRangeTime;
					endpoint.getWarningByGroup = endpoint.main + data.getWarningByGroup;
				},
				error : function(jqXHR, textStatus, errorThrown) {
					console.log("Can't load 'endpoint.json'");
					console.log(jqXHR);
					console.log(textStatus);
					console.log(errorThrown);
				}
			});
		} catch (err) {
			console.log("Can't load 'endpoint.json'. " + err);
		}
	}
};