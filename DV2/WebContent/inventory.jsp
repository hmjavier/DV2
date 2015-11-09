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
	
	<!-- Custom CSS -->
	<link rel="stylesheet" type="text/css" href="css/general.css">
    <link href="css/sb-admin.css" rel="stylesheet">

    <!-- Custom Fonts -->
    <link href="font-awesome-4.1.0/css/font-awesome.min.css" rel="stylesheet" type="text/css">
	
	<!-- Chosen -->
	<link rel="stylesheet" type="text/css" href="js/chosen/chosen.min.css">

	<!-- DataTables Bootstrap-->
	<link rel="stylesheet" type="text/css" href="js/DataTables-Bootstrap/css/dataTables.bootstrap.css">
	
	<!-- TableTools -->
	<link rel="stylesheet" type="text/css" href="js/TableTools-2.2.2/css/dataTables.tableTools.min.css">
	
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
                	<div class="col-md-5 col-md-offset-4">
                		<div class="btn-group">    
					    	<button type="button" class="btn btn-info glyphicon glyphicon-road">Transport Inventory</button>
							<button type="button" class="btn btn-info glyphicon glyphicon-hdd">Equipment Inventory</button>		
						</div>
						<button id="go" type="button" class="btn btn-success glyphicon glyphicon-save">Get</button>
                	</div>					
                </div>
                <br>
                <div class="row">
					<div class="col-lg-12">
				    	<div class="panel panel-primary">
				    		<div class="panel-heading">
						    	<h3 class="panel-title">Inventory</h3>
						  	</div>
				    		<div id="chartInventory"></div>
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
	
	<!-- Chosen -->
	<script type="text/javascript" src="js/chosen/chosen.jquery.min.js"></script>

	<!-- Bootstrap Core CSS -->
	<script src="js/bootstrap.js"></script>
	
	<!-- Modal dialog -->
	<script type="text/javascript" src="js/bootbox.min.js"></script>

	<!-- LIBRERIAS CNOC -->
	<script src="js/cnocConnector.js"></script>
	<script src="js/drawElementsInventory.js"></script>

	<!-- DataTables -->
	<script type="text/javascript" src="js/DataTables-1.10.1/js/jquery.dataTables.min.js"></script>
	
	<!-- DataTables Bootstrap-->
	<script type="text/javascript" src="js/DataTables-Bootstrap/js/dataTables.bootstrap.js"></script>
	
	<!-- TableTools -->
	<script type="text/javascript" src="js/TableTools-2.2.2/js/dataTables.tableTools.min.js"></script>
	
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
			    		cnocConnector.service9 = serviceC9;
			    		cnocConnector.service1 = serviceINV1; // ms_inv_transport
			    		cnocConnector.service2 = serviceINV2; // ms_inv_equipment
			    		cnocConnector.menu = serviceMenu;
			    		cnocConnector.nmis_urls = nmis_urls;
			    }
			});
			
			/*Genera Menu*/
			generateMenu();

		 	drawElementsInventory.init();
		 	
		 	$("#go").click(function() {
			    
		 		var inventory = $('.btn-group > .btn.active').text();
			    
			    if (inventory == 'Transport Inventory') {
			    	cnocConnector.invokeMashup(
				    		cnocConnector.service1, // Service ID
				    		{"code_net" : cnocConnector.codeNetGlobal}, // Parameters
				    		drawElementsInventory.showInventory, // Callback
				    		"chartInventory", // Container
				    		"tableInventory" // Div
				    	);
			    } else if (inventory == 'Equipment Inventory') {
			    	cnocConnector.invokeMashup(
				    		cnocConnector.service2, // Service ID
				    		{"code_net" : cnocConnector.codeNetGlobal}, // Parameters
				    		drawElementsInventory.showInventory, // Callback
				    		"chartInventory", // Container
				    		"tableInventory" // Div
				    	);
			    } else {
			    	bootbox.alert("Please select Inventory Type");
			    }
			    
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
