<%@ page language="java" contentType="text/html; charset=US-ASCII"
    pageEncoding="US-ASCII"%>
<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">

    <title>:::Customer Network Operation Center (CNOC):::</title>
	<link rel="icon" type="image/x-icon" href="cnoc.ico" />
	<!-- Bootstrap Core CSS -->
	<link rel="stylesheet" type="text/css" href="css/bootstrapW.css">		

	<!-- jQuery multiselect -->
	<link href="css/bootstrap-multiselect.css" rel="stylesheet">

    <!-- Custom CSS -->
    <link href="css/sb-admin.css" rel="stylesheet">

    <!-- Custom Fonts -->
    <link href="font-awesome-4.1.0/css/font-awesome.min.css" rel="stylesheet" type="text/css">
	
	<link rel="stylesheet" type="text/css" href="js/chosen/chosen.min.css">
	<link rel="stylesheet" type="text/css" href="js/TableTools/css/TableTools.css">
	
	<!-- PAGE THEME WHITE -->
	<link rel="stylesheet" type="text/css" href="css/general.css">
	<link rel="stylesheet" type="text/css" href="css/jquery.dataTables.css">

	<!-- jQuery Loadmask -->
	<link rel="stylesheet" type="text/css" href="js/jquery-loadmask-0.4/jquery.loadmask.css">
	
	<style>
		.tooltipMap{
		color: #000000;
		}
	</style>

    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
        <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
        <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->

</head>

<body>
    <div id="wrapper">
		
       <!-- MENU  -->		
		<%@ include file="menu.jsp" %>

        <div id="page-wrapper">
        	<div class="row">
                <div class="col-md-5 col-md-offset-4">
                	<div id="cmbNodesSyslog">
						<select id="SelectNodeSyslog" data-placeholder="Select Node" style="width:90%; color: #000" tabindex="2"></select>
					</div>	
                	<div class="btn-group">                            						
						<button id="centralNodes" class="btn btn-primary">Central Nodes </button>
						<select id="syslogRange" data-placeholder="Select Range" style="width:90%; color: #000" tabindex="2">
							<option value="0">Select Range</option>
							<option value="1">1 Day</option>
							<option value="7">7 Days</option>
							<option value="15">15 Days</option>
							<option value="30">30 Days</option>
							<option value="60">60 Days</option>
							<option value="120">120 Days</option>
							<option value="240">240 Days</option>
						</select>
						<button id="refresh" class="btn btn-primary">Refresh</button>						
                    </div>            				
                </div>
        	</div>    
        	<br>    	       
        	<div class="row">
				<div class="col-lg-12">
					<div class="panel panel-primary">
						<div class="panel-heading">
							<h3 class="panel-title">Recent syslog messages</h3>
						</div>
						<div id="listLog"></div>
					</div>		
				</div>
			</div>
        </div>
        <!-- /#page-wrapper -->

	</div>
	<!-- jQuery Version 1.11.0 -->	
	<script type="text/javascript" src="js/jquery-1.11.0.min.js"></script>
	
	<!-- Bootstrap Core JavaScript -->
    <script src="js/bootstrap.js"></script>
	
	<!-- <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>-->
	<script type="text/javascript" src="js/jquery.i18n.properties-min-1.0.9.js"></script>
	<script type="text/javascript" src="js/chosen/chosen.jquery.min.js"></script>
	<script type="text/javascript" src="js/jquery.dataTables.min.js"></script>
	<script type="text/javascript" src="js/TableTools/js/TableTools.js"></script>
	<script type="text/javascript" src="js/TableTools/js/ZeroClipboard.js"></script>
		
	<!-- Multiselect -->
	<script type="text/javascript" src="js/bootstrap-multiselect.js"></script>	
		
	<!-- Modal dialog -->
	<script type="text/javascript" src="js/bootbox.min.js"></script>
	
	<!-- LIBRERIAS CNOC -->
	<script src="js/cnocConnector.js"></script>
	<script src="js/drawElementsLog.js"></script>
	<script src="js/polygons.js"></script>	
	
	<!-- jQuery Loadmask -->
	<script src="js/jquery-loadmask-0.4/jquery.loadmask.min.js"></script>
	<!-- google maps -->
	<script src="https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false"></script>
	
	<!-- remove css/js -->
	<script type="text/javascript" src="js/script.js"></script>
	
	<script type="text/javascript">
	cnocConnector.refresh = <%=request.getParameter("refresh")%>
	</script>
	<script type="text/javascript">
	
	var stylesMap = null;
	
	$(document).ready(function(){
		jQuery.i18n.properties({
		    name:'config', 
		    path:'prop/', 
		    mode:'both',
		    callback: function() {
		    		cnocConnector.logout = serviceLogout;
		    		cnocConnector.getLdap = getLdap;
		    		cnocConnector.nmis_urls = nmis_urls;
		    		cnocConnector.menu = serviceMenu;
		    		cnocConnector.service1 = serviceSyslog1;
		    		cnocConnector.service2 = serviceR2;		
		    		cnocConnector.service3 = serviceSyslog2;
		    }
		});
		
		/*Genera Menu*/
		generateMenu();
		
		drawElementsLog.init();
		
			$( ".logout").click(function(event){	
				logout();
			});
			
			$( ".back").click(function(event){
				home();
			});	
			
			$( "#refresh").click(function(event){
				cnocConnector.invokeMashup(
						cnocConnector.service1,
						{"range":0,"codenet" : "N000093","node":""},
						drawElementsLog.drawLog,
						"listLog",
						"listLogI"
					);
			});
			
			
			$( "#centralNodes").click(function(event){
				var range = $('#syslogRange').val();
				
				cnocConnector.invokeMashup(
    					cnocConnector.service3,
    					{"range":range,"codenet" : "N000093"},
    					drawElementsLog.drawLog,
    					"listLog",
    					"listLogI"
    			);
			});
			
			$('#syslogRange').multiselect({
	        	enableFiltering: true,
	        	maxHeight: 450,
	        	enableCaseInsensitiveFiltering: true,
	        	onChange: function(element, checked) {
	        		/*var range = $('#syslogRange').val();
	        		cnocConnector.invokeMashup(
	    					cnocConnector.service1,
	    					{"range":range,"codenet" : "N000093","node":""},
	    					drawElementsLog.drawLog,
	    					"listLog",
	    					"listLogI"
	    				);	*/	
	        	}
			});
			
			$(".themeW").click(function(event){
				var filename = $(this).attr('rel');				
				themeChanges(filename, false);			
				Highcharts.setOptions(Highcharts.themeW);
				stylesMap = null;
				drawElements.builder();
			});
			
			$(".themeB").click(function(event){
				var filename = $(this).attr('rel');				
				themeChanges(filename,true);				
				Highcharts.setOptions(Highcharts.themeB);
				drawElements.builder();
			});

			/*
			var refresh = setInterval(function(){
				drawElements.init();
			},cnocConnector.refresh);*/

	});
	</script>


</body>

</html>
