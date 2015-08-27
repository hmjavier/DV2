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
	<div id="frm" style="visibility: hidden; height: 0px;">
		<div class="form-group">
			<div class="input-group">
				<span class="input-group-addon"><i class="glyphicon glyphicon-list-alt"></i></span>
				<input type="text" id="titleTCK" class="form-control titleTCK" style="height: 30px;" placeholder="Title" required >
			</div>
		</div>
		<div class="form-group">
			<div class="input-group">
				<span class="input-group-addon"><i class="glyphicon glyphicon-list-alt"></i></span>
				<input type="text" id="descriptionTCK" class="form-control descriptionTCK" style="height: 30px;" placeholder="Description" required >
			</div>
		</div>
		<div class="form-group">
			<div class="input-group">
				<span class="input-group-addon"><i class="glyphicon glyphicon-user"></i></span>
				<input type="text" id="contactPersonTCK" class="form-control contactPersonTCK" style="height: 30px;" placeholder="Contact Person" required >
			</div>
		</div>
		<div class="form-group">
			<div class="input-group">
				<span class="input-group-addon"><i class="glyphicon glyphicon-envelope"></i></span>
				<input type="text" id="contactEmailTCK" class="form-control contactEmailTCK" style="height: 30px;" placeholder="Contact Email" required >
			</div>
		</div>
		<div class="form-group">
			<div class="input-group">
				<span class="input-group-addon"><i class="glyphicon glyphicon-tag"></i></span>
				<input type="text" id="sdTCK" class="form-control" style="height: 30px;" placeholder="SDCOM000000" disabled="disabled">
			</div>
		</div>		
		<div class="form-group">
			<div class="input-group">
				<span class="input-group-addon"><i class="glyphicon glyphicon-tag"></i></span>
				<input type="text" id="imTCK" class="form-control" style="height: 30px;" placeholder="IMCOM000000" disabled="disabled">
			</div>
		</div>
		<div class="form-group">
			<div class="input-group">
				<span class="input-group-addon"><i class="glyphicon glyphicon-comment"></i></span>
				<input type="text" id="messageTCK" class="form-control" style="height: 30px;" placeholder="Message" disabled="disabled">
			</div>
		</div>
	</div>
	
	<div  id="updateTicketDialog" style="visibility: hidden; height: 0px;">
		<div class="form-group">
			<div class="input-group">
				<span class="input-group-addon"><i class="glyphicon glyphicon-list-alt"></i></span>
				<textarea id="updateAction" class="form-control updateAction" style="height: 200px;"  placeholder="Update Action"></textarea>
			</div>
		</div>
		<div class="form-group">
			<div class="input-group">
				<span class="input-group-addon"><i class="glyphicon glyphicon-comment"></i></span>
				<input type="text" id="messageUpdate" class="form-control" style="height: 30px;" placeholder="Message" disabled="disabled">
			</div>
		</div>		
	</div>
	
    <div id="wrapper">
		
       <!-- MENU  -->		
		<%@ include file="menu.jsp" %>

        <div id="page-wrapper">        
        	<div class="tab-pane updateTicket" id="updateTicket">
				<div class="container-fluid">
	                <!-- /.row -->
	                <div class="row">
						<div class="row">
					  			<div class="col-lg-12">
							    	<div class="panel panel-primary">
							    		<div class="panel-heading">
									    	<h3 class="panel-title">Open Tickets List</h3>
									  	</div>
							    		<div id="openTaskEscalateList"></div>
							    	</div>
						    	</div>
					  		</div>
	                </div>
	                <!-- /.row -->
	                <!-- /.row -->
	                <div class="row">
						<div class="row">
					  			<div class="col-lg-12">
							    	<div class="panel panel-primary">
							    		<div class="panel-heading">
									    	<h3 class="panel-title">Tickets Activities</h3>
									  	</div>
							    		<div id="listActivitiesTaskEscalate"></div>
							    	</div>		
						    	</div>
					  		</div>
	                </div>
	                <!-- /.row -->						 
	            </div>
	            <%@ include file="footer.jsp" %>
	            <!-- /.container-fluid -->
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
		
	<!-- Modal dialog -->
	<script type="text/javascript" src="js/bootbox.min.js"></script>
	
	<!-- LIBRERIAS CNOC -->
	<script src="js/cnocConnector.js"></script>
	<script src="js/drawElementsTaskEscalate.js"></script>		
	
	<!-- jQuery Loadmask -->
	<script src="js/jquery-loadmask-0.4/jquery.loadmask.min.js"></script>	
	
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
		    		cnocConnector.incidents = incidentService;
		    		cnocConnector.getLdap = getLdap;
		    		cnocConnector.service9 = serviceC9;
		    		cnocConnector.service1 = serviceTE1;
		    		cnocConnector.service2 = serviceTE2;
		    		cnocConnector.menu = serviceMenu;		    		
		    		cnocConnector.nmis_urls = nmis_urls;
		    }
		});
		
		/*Genera Menu*/
		generateMenu();
		
		drawElementsTaskEscalate.init();
		
		$( ".logout").click(function(event){	
			logout();
		});
		
		$( ".back").click(function(event){
			home();
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

	});
	</script>


</body>

</html>
