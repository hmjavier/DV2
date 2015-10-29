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

	<!-- jQuery multiselect -->
	<link href="css/bootstrap-multiselect.css" rel="stylesheet">
	
	<link rel="stylesheet" type="text/css" href="js/chosen/chosen.min.css">
	<link rel="stylesheet" type="text/css" href="js/TableTools/css/TableTools.css">
	
	<!-- PAGE THEME WHITE -->
	
	<!-- <link rel="stylesheet" type="text/css" href="css/performance.css">-->
	<link rel="stylesheet" type="text/css" href="css/general.css">
	<link rel="stylesheet" type="text/css" href="css/jquery.dataTables.css">

	<!-- jQuery Loadmask -->
	<link rel="stylesheet" type="text/css" href="js/jquery-loadmask-0.4/jquery.loadmask.css">
	
	<!-- jQuery Datepicker -->
	<link rel="stylesheet" type="text/css" href="css/datepicker.css">
	<style>
		.tooltipMap{
			color: #000000;
		}	
		#tooltip{
			z-index: 9000;
		}
		.treeNode{
			font-size: 10px;
		}
		
		.treeNodeDetail{
			font-size: 9px;
		}
		
		.listNodesF{
			font-size: 10px;
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
                	<div class="col-lg-3"></div>
					<div class="col-lg-6">
				    	<div class="form-group">
							<div class="input-daterange input-group" >
							    <span class="input-group-addon"><i class="glyphicon glyphicon-calendar"></i></span><input type="text" class="input-sm form-control datesPerformance" id="startDate" placeholder="Start Date">
							    <span class="input-group-addon"> to </span>			    
							    <input type="text" class="input-sm form-control datesPerformance" id="endDate" placeholder="End Date"><span class="input-group-addon"><i class="glyphicon glyphicon-calendar"></i></span>
							    <div class="input-group input-group-sm">
							      <span class="input-group-btn">
							        <button class="btn btn-success glyphicon glyphicon-stats" type="button" id="selectGraph">  Graph</button>
							      </span>
								</div>		    			    
							</div>			
				        </div>        			    	        
    				</div>
    				<div class="col-lg-3"></div>
                </div>
                <!-- /.row -->
				  <div class="row">
			        <div class="col-lg-4">   	
				      	<div class="panel panel-primary">
						  <div class="panel-heading">
						    <i class="fa fa-sitemap fa-fw"></i> Node Resources
						  </div>
						  <div class="treeContainer panel-body" id="treeContainer">
						  	<div id="cmbNodesPerformance">
								<select id="SelectNode" data-placeholder="Select Node" style="width:90%; color: #000" tabindex="2"></select>
							</div>
						  	<div id="treeContainerInterfaz"></div>
						  	<div id="treeContainerDetail"></div>  		  
						  </div>
						</div>     
				    </div>
				    
				    <div class="col-lg-8" id="GraficasPerformance">
				    	<div class="panel panel-primary">
				    		<div class="panel-heading">
						    	<i class="fa fa-bar-chart-o fa-fw"></i> Chart
						  	</div>
						  	<div class="panel-body">
						  		<a name="nodeChart"></a>
						  		<div id="containerChartPerformance"></div>
						  	</div>
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
	<script src="js/drawElementsGral.js"></script>
	<script src="js/drawElementsPerformance.js"></script>
	<script src="js/polygons.js"></script>
	
	<!-- higcharts -->
	<script type="text/javascript" src="js/highcharts.js"></script>
	<script type="text/javascript" src="js/exporting.js"></script>
	
	<!-- jQuery Loadmask -->
	<script src="js/jquery-loadmask-0.4/jquery.loadmask.min.js"></script>
	<!-- google maps -->
	<script src="https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false"></script>
	
	<!-- remove css/js -->
	<script type="text/javascript" src="js/script.js"></script>
	
	<!-- date Picker -->
	<script type="text/javascript" src="js/bootstrap-datepicker.js"></script>
		
	<!-- TREE BOOTSTRAP -->
	<script src="js/bootstrap-tree.js" /></script>
	
	<!-- EXPORT CVS ROWDATA HIGCHARTS -->
	<script src="js/export-csv.js" /></script>
		
	<script type="text/javascript">
	
	var stylesMap = null;
	
	$(document).ready(function(){
			jQuery.i18n.properties({
			    name:'config', 
			    path:'prop/', 
			    mode:'both',
			    callback: function() {
			    		cnocConnector.logout = serviceLogout;
			    		cnocConnector.service9 = serviceC9;
			    		cnocConnector.service1 = serviceR1;
			    		cnocConnector.service2 = serviceR2;
			    		cnocConnector.menu = serviceMenu;
			    		cnocConnector.nmis_urls = nmis_urls;
			    		cnocConnector.service3 = serviceG18;
			    		
			    }
			});
			
			/*Genera Menu*/
			generateMenu();
	
		 	drawElementsPerformance.init();

		 	$('.datesPerformance').datepicker({
				format: "yyyy/mm/dd",
				todayBtn: true,
			    autoclose: true,
			    todayHighlight: true//,
			    //startDate: '-5d'
			});
			
			$("#selectGraph").click(function(event){
				
				var startDate = $("#startDate").val();
				var endDate = $("#endDate").val();
				var node = $("#SelectNode").val();
				if(startDate === "" || endDate === "" ){
					alert("Elige un rango de fecha");
				}else{
					if(node === ""){
						alert("Elija un nodo");
					}else{
						var sD = new Date(startDate +" 00:00:00");
						startDate = ((sD.getTime()/1000));
						
						var eD = new Date(endDate +" 00:00:00");
						endDate = ((eD.getTime()/1000));
						
						drawElementsPerformance.dataChartPerformance.length = 0;
						drawElementsPerformance.endUnix = endDate;
						drawElementsPerformance.endDate = "";
						drawElementsPerformance.startDate = startDate;
						
						if(drawElementsPerformance.nodePerformance.indexOf("_UPS") > 0){
							drawElementsPerformance.drawChartHealth();
						}else{
							drawElementsPerformance.drawChartCPU(drawElementsPerformance.nodePerformance, drawElementsPerformance.startDate, drawElementsPerformance.endDate, drawElementsPerformance.endUnix);
						}						
					}
				}
			});
			
			Highcharts.setOptions({
		        global: {
		            useUTC: false
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
				Highcharts.setOptions(Highcharts.themeW);
				drawElementsPerformance.refreshChart();
				//stylesMap = null;
				//drawElementsGral.builder(cnocConnector.codeNetGlobal);
			});
			
			$(".themeB").click(function(event){
				var filename = $(this).attr('rel');				
				themeChanges(filename,true);				
				Highcharts.setOptions(Highcharts.themeB);
				drawElementsPerformance.refreshChart();
				//drawElementsGral.builder(cnocConnector.codeNetGlobal);
			});

			/*var refresh = setInterval(function(){
				drawElementsPerformance.refreshChart();
			},cnocConnector.refresh);*/
	});
	</script>


</body>

</html>
