/**
 * Title: Endpoints Loader
 * Autor: Oscar Escamilla
 * Version: 1.0
 */
var endpoint = {
	getproperties : function() {		
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
			}
		});
	}
};