<%@ page language="java" contentType="text/html; charset=US-ASCII"
    pageEncoding="US-ASCII"%>
<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="OGE">

    <title>:::Customer Network Operation Center (CNOC):::</title>
	<link rel="icon" type="image/x-icon" href="cnoc.ico" />
	
	<!-- Bootstrap Core CSS -->
	<link rel="stylesheet" type="text/css" href="css/bootstrapW.css">		
	
	<!-- Custom CSS -->
	<link rel="stylesheet" type="text/css" href="css/general.css">
    <link href="css/sb-admin.css" rel="stylesheet">

    <!-- Custom Fonts -->
    <link href="font-awesome-4.1.0/css/font-awesome.min.css" rel="stylesheet" type="text/css">
	
	<!-- Chosen -->
	<link rel="stylesheet" type="text/css" href="js/chosen/chosen.min.css">
	
	<!-- jQuery Loadmask -->
	<link rel="stylesheet" type="text/css" href="js/jquery-loadmask-0.4/jquery.loadmask.css">

    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
        <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
        <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->

</head>

<body>
	<div class="overlay" id="overlay" style="display:none;"></div>
	<div class="box panel panel-primary" id="box" >
		<div class="panel-heading">
			<h3 id="headerGridsDetailG" class="panel-title" style="font-size-adjust: inherit;"></h3>
		</div>
		<a class="boxclose" id="boxclose"></a>  
	  <div id="tTops"></div>
	</div>
    <div id="wrapper">
		
        <!-- MENU  -->		
		<%@ include file="menu.jsp" %>

        <div id="page-wrapper">

            <div class="container-fluid">
                <!-- /.row -->


                <div class="row">
                	<div class="col-md-6 col-md-offset-3">
                		<div class="btn-group">    
					    	<button type="button" class="btn btn-info">CSC</button>
							<button type="button" class="btn btn-info">GFC</button>
							<button type="button" class="btn btn-info">CNOC NOTI</button>
							<button type="button" class="btn btn-info">ESCALACION CASE</button>
							<button type="button" class="btn btn-info">SMS-INT</button>
							<button type="button" class="btn btn-info">SMS-CLIE</button>
							<!-- <button type="button" class="btn btn-info">Teldat</button> -->
							<!-- <button id="getButton" type="button" class="btn btn-success glyphicon glyphicon-save">Get</button>-->
						</div>						
                	</div>
                </div>
                <br>
                <div class="row">
					<form class="form-horizontal">
						<fieldset>
						
						<!-- Form Name -->
						<legend>Incident escalation</legend>
						
						<!-- Text input-->
						<div class="control-group">
						  <label class="control-label" for="textinput">IM</label>
						  <div class="controls">
						    <input id="im" name="im" type="text" placeholder="IMCCC000000" maxlength="11" size="11" class="input-xlarge">
						    <button class="btn btn-success glyphicon glyphicon-save" type="button" id="getButton"> Get</button>						    
						  </div>						  
						</div>
						
						</fieldset>
						</form>
                </div><br>
                 <div class="row">
					<div class="col-lg-12">
				    	<div class="panel panel-primary">
				    		<div class="panel-heading">
						    	<h3 class="panel-title">Incident escalation report</h3>
						  	</div>
				    		<div id="chartEscalation"></div>
				    	</div>		
				    </div>
                </div>
                <!-- /.row -->

            </div>
            <%@ include file="footer.jsp" %>
            <!-- /.container-fluid -->

        </div>
        <!-- /#page-wrapper -->

    </div>
    <!-- /#wrapper -->

	<!-- jQuery Version 1.11.0 -->	
	<script type="text/javascript" src="js/jquery-1.11.0.min.js"></script>
	<script type="text/javascript" src="js/jquery.i18n.properties-min-1.0.9.js"></script>	
	<script type="text/javascript" src="js/chosen/chosen.jquery.min.js"></script>

	<!-- Bootstrap Core CSS -->
	<script src="js/bootstrap.js"></script>
	
	<!-- Modal dialog -->
	<script type="text/javascript" src="js/bootbox.min.js"></script>

	<!-- LIBRERIAS CNOC -->
	<script src="js/cnocConnector.js"></script>
	<script src="js/drawElementsEscalation.js"></script>
	<script src="js/jsEscalaciones/getEmails.js"></script>
	<script src="js/jsEscalaciones/functionCSC.js"></script>	
	<script src="js/jsEscalaciones/functionGFC.js"></script>
	<script src="js/jsEscalaciones/function_CNOC_NOTI.js"></script>
	<script src="js/jsEscalaciones/function_ESCALACION_CASE.js"></script>
	<script src="js/jsEscalaciones/function_SMS_INT.js"></script>
	<script src="js/jsEscalaciones/function_SMS_CLIE.js"></script>
	<script src="js/jsEscalaciones/function_Teldat.js"></script>
	
	<!-- jQuery Loadmask -->
	<script src="js/jquery-loadmask-0.4/jquery.loadmask.min.js"></script>
	
	<!-- remove css/js -->
	<script type="text/javascript" src="js/script.js"></script>	

	<script type="text/javascript">

	$(document).ready(function() {
		
			jQuery.i18n.properties({
			    name:'config', 
			    path:'prop/', 
			    mode:'both',
			    callback: function() {
			    		cnocConnector.logout = serviceLogout;
			    		cnocConnector.service1 = serviceESC1;
			    		cnocConnector.service2 = serviceESC2;
			    		cnocConnector.menu = serviceMenu;
			    		cnocConnector.nmis_urls = nmis_urls;
			    }
			});
			
			/*Genera Menu*/
			generateMenu();
		 	
			drawElementsEscalation.init();
		 	
		 	$("#getButton").click(function() {
		 		
		 		var report = $('.btn-group > .btn.active').text();
		 		var im = $('#im').val();		 		
		 		
		 		$('#chartEscalation').empty();
		 		
		 		if (im == '') {
		 			bootbox.alert("Please insert IM");
		 			//alert("Please insert IM");
		 		
		 		} else if (report == '') {
		 			bootbox.alert("Please select escalation type");
		 			//alert("Please select escalation type");
		 		
		 		} else if (report == 'CSC') {
		 			cnocConnector.invokeMashup(
				    		cnocConnector.service1, // Service ID
				    		{"im" : $('#im').val()}, // Parameters
				    		drawElementsEscalation.getCSC, // Callback
				    		"chartEscalation", // Container
				    		"formEscalation" // Div
				    	);
		 		} else if (report == 'GFC') {
		 			cnocConnector.invokeMashup(
				    		cnocConnector.service1, // Service ID
				    		{"im" : $('#im').val()}, // Parameters
				    		drawElementsEscalation.getGFC, // Callback
				    		"chartEscalation", // Container
				    		"formEscalation" // Div
				    	);
		 		} else if (report == 'CNOC NOTI') {
		 			cnocConnector.invokeMashup(
				    		cnocConnector.service1, // Service ID
				    		{"im" : $('#im').val()}, // Parameters
				    		drawElementsEscalation.get_CNOC_NOTI, // Callback
				    		"chartEscalation", // Container
				    		"formEscalation" // Div
				    	);
		 		} else if (report == 'ESCALACION CASE') {
		 			cnocConnector.invokeMashup(
				    		cnocConnector.service1, // Service ID
				    		{"im" : $('#im').val()}, // Parameters
				    		drawElementsEscalation.get_ESCALACION_CASE, // Callback
				    		"chartEscalation", // Container
				    		"formEscalation" // Div
				    	);
		 		} else if (report == 'SMS-INT') {
		 			cnocConnector.invokeMashup(
				    		cnocConnector.service1, // Service ID
				    		{"im" : $('#im').val()}, // Parameters
				    		drawElementsEscalation.get_SMS_INT, // Callback
				    		"chartEscalation", // Container
				    		"formEscalation" // Div
				    	);
		 		} else if (report == 'SMS-CLIE') {
		 			cnocConnector.invokeMashup(
				    		cnocConnector.service1, // Service ID
				    		{"im" : $('#im').val()}, // Parameters
				    		drawElementsEscalation.get_SMS_CLIE, // Callback
				    		"chartEscalation", // Container
				    		"formEscalation" // Div
				    	);
		 		}  else if (report == 'Teldat') {
		 			cnocConnector.invokeMashup(
				    		cnocConnector.service1, // Service ID
				    		{"im" : $('#im').val()}, // Parameters
				    		drawElementsEscalation.get_Teldat, // Callback
				    		"chartEscalation", // Container
				    		"formEscalation" // Div
				    	);
		 		} else 
		 			console.log("unknown report");
			});

			$( ".logout").click(function(event){
				logout();
			});
			
			$( ".back").click(function(event){
				home();
			});
			
			$(".themeW").click(function(event){
				var filename = $(this).attr('rel');				
				themeChanges(filename, false);			
				//Highcharts.setOptions(Highcharts.themeW);
				//stylesMap = null;
				//drawElementsGral.builder(cnocConnector.codeNetGlobal);
			});
			
			$(".themeB").click(function(event){
				var filename = $(this).attr('rel');				
				themeChanges(filename,true);				
				//Highcharts.setOptions(Highcharts.themeB);
				//drawElementsGral.builder(cnocConnector.codeNetGlobal);
			});
	});
	</script>

</body>

</html>
