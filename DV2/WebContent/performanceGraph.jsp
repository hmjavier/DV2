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
	
	<!-- jQuery multiselect -->
	<link href="css/bootstrap-multiselect.css" rel="stylesheet">

    <!-- Custom Fonts -->
    <link href="font-awesome-4.1.0/css/font-awesome.min.css" rel="stylesheet" type="text/css">
	
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
	
	<!-- jQuery IMPRIMIR -->
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
	<div id="portada" class="portada" style="display: none;">
		<div class="row">
			<div class="col-lg-12">
				<div class="panel panel-primary" style="padding-left: 10px; padding-right: 10px;" >
					<div class="panel-heading">
						    <img alt="" src="css/images/logo.png" height="50px">
					</div>
					<div class="panel-body" style="margin-top: 45%; text-align: center;">
						<!-- <h1 class="clientPdf"></h1>-->					 
					 	<h1>Performace Charts</h1>
					 	<h4 class="startDatePdf"></h4>
					 	<h4 class="endDatePdf"></h4>
					</div>
					<div class="panel-footer" style="margin-top: 45%;">
                    	<div class="copyright-info" style="color: #7D7F80; text-align: center; font-size: 9px;">
	                       Customer Network Operation Center (CNOC)<br> &copy; 2014 CNOC
	                       Tools .Todos los derechos reservados.                        
	               		</div>
					</div>
				</div>				
			</div>
		</div>
	</div>
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


                <div class="row dateRange">
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
				  <div class="row selectMetric">				  	
			        <div class="col-lg-12">   	
				      	<div class="panel panel-primary">
						  <div class="panel-heading">
						    <i class="fa fa-list fa-fw"></i> Node Resources
						  </div>
						  <div class="treeContainer panel-body" id="treeContainer">
							<div class="row" style="padding-left: 15px;">
								<div class="col-lg-4">
									<div class="radio ">
									  <label >
									    <input type="radio" name="opciones" id="metrics" value="health" checked>
									    Health
									  </label>
									</div>
									<div class="radio">
									  <label>
									    <input type="radio" name="opciones" id="metrics" value="cpu">
									    CPU
									  </label>
									</div>
									<div class="radio">
									  <label>
									    <input type="radio" name="opciones" id="metrics" value="responsetime">
									    Response Time
									  </label>
									</div>
									<div class="radio">
									  <label>
									    <input type="radio" name="opciones" id="metrics" value="memoryIO">
									    Memory IO
									  </label>
									</div>
									<div class="radio">
									  <label>
									    <input type="radio" name="opciones" id="metrics" value="memoryProc">
									    Memory Proc
									  </label>
									</div>	    
									    Node Name: 
									    <div id="cmbNodesPerformanceC" style="height: 50px;">
									    	<div id="cmbNodesPerformance"></div>
									    </div>									    
									
								</div>
								<div class="col-lg-4">
									<div class="radio ">
									  <label >
									    <input type="radio" name="opciones" id="metrics" value="utilisation">
									    Utilisation %AVG
									  </label>
									</div>
									<div class="radio ">
									  <label >
									    <input type="radio" name="opciones" id="metrics" value="utilisationavgbps">
									    Utilisation AVG bps
									  </label>
									</div>
									<div class="radio ">
									  <label >
									    <input type="radio" name="opciones" id="metrics" value="errorsdiscards">
									    Errors Discards
									  </label>
									</div>
									<div class="radio ">
									  <label >
									    <input type="radio" name="opciones" id="metrics" value="pktshc">
									    PKTS HC
									  </label>
									</div>
									<div class="radio">
									  <label>
									    <input type="radio" name="opciones" id="metrics" value="qos">
									    QoS
									  </label>
									</div>
									Interface Name:
									<div id="cmbNodesPerformanceInterfazC" style="height: 50px;">
										<div id="cmbNodesPerformanceInterfaz"></div>
									</div>									
								</div>
							</div>	  
						  </div>
						</div>     
				    </div>
  				</div>
  				<div class="row">				  			    
				    <div class="col-lg-12" id="GraficasPerformance">
				    	<div class="panel panel-primary">
				    		<div class="panel-heading">
						    	<h3 class="panel-title">
									<div class="row" >
										<div class="col-lg-10">
											<i class="fa fa-bar-chart-o fa-fw"></i> Charts
										</div>
										<div class="col-lg-2 headerCharts">											
											<div class="input-group input-group-sm">
										      <span class="input-group-btn">
										        <button class="btn btn-success glyphicon glyphicon-stats leermas imprimir" type="button"> Download PDF</button>								        
										      </span>								      
											</div>
										</div>
									</div>		    									    	
						    	</h3>
						  	</div>
						  	<div class="panel-body">
						  		<div id="containerChartPerformanceF">
						  			<div class="row" style="padding-left: 15px; padding-right: 15px;">
						  				<div class="col-lg-6" id="GraficasPerformance">
						  					<div id="containerChartPerformance1"></div>
						  				</div>
						  				<div class="col-lg-6" id="GraficasPerformance">
						  					<div id="containerChartPerformance2"></div>
						  				</div>
						  			</div>
						  			<div class="row" style="padding-left: 15px; padding-right: 15px;">
						  				<div class="col-lg-12">
						  					<div id="msgNoDisponible"></div>
						  				</div>
						  			</div>
						  		</div>
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
	
	<!-- Multiselect -->
	<script type="text/javascript" src="js/bootstrap-multiselect.js"></script>
	
	<!-- <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>-->
	<script type="text/javascript" src="js/jquery.i18n.properties-min-1.0.9.js"></script>
	<script type="text/javascript" src="js/chosen/chosen.jquery.min.js"></script>
		
	<!-- Modal dialog -->
	<script type="text/javascript" src="js/bootbox.min.js"></script>
	
	<!-- LIBRERIAS CNOC -->
	<script src="js/cnocConnector.js"></script>
	<script src="js/drawElementsPerformanceGraph.js"></script>
	
	<!-- higcharts -->
	<script type="text/javascript" src="js/highcharts.js"></script>
	<script type="text/javascript" src="js/exporting.js"></script>
	
	<!-- jQuery Loadmask -->
	<script src="js/jquery-loadmask-0.4/jquery.loadmask.min.js"></script>
		
	<!-- remove css/js -->
	<script type="text/javascript" src="js/script.js"></script>	
	
	<!-- date Picker -->
	<script type="text/javascript" src="js/bootstrap-datepicker.js"></script>

		
	<script type="text/javascript">
	
	var stylesMap = null;
	
	$(document).ready(function(){
			
		//$( "#cmbNodesPerformanceInterfaz" ).mask("Waiting...");
		
			jQuery.i18n.properties({
			    name:'config', 
			    path:'prop/', 
			    mode:'both',
			    callback: function() {
			    		cnocConnector.logout = serviceLogout;
			    		cnocConnector.service9 = serviceC9;
			    		cnocConnector.service1 = serviceR1;
			    		cnocConnector.service2 = serviceR3;
			    		cnocConnector.menu = serviceMenu;
			    		cnocConnector.nmis_urls = nmis_urls;
			    		cnocConnector.service3 = serviceG18;			    		
			    }
			});
			
			/*Genera Menu*/
			generateMenu();
				
		 	drawElementsPerformanceGraph.init();

		 	$('.datesPerformance').datepicker({
				format: "yyyy/mm/dd",
				todayBtn: true,
			    autoclose: true,
			    todayHighlight: true//,
			    //startDate: '-5d'
			});
			
		 	$("input[name=opciones]:radio").change(function () {
		 		drawElementsPerformanceGraph.dataChartInterface.length = 0;
		 		if( $(this).val() === "utilisation" || $(this).val() === "qos" || $(this).val() === "errorsdiscards" || $(this).val() === "pktshc" || $(this).val() === "utilisationavgbps"){
					$( "#cmbNodesPerformanceInterfazC" ).mask("Waiting...");
		 			cnocConnector.drawInterfaceGraph($(this).val());
		 		}else{
		 			$("#cmbNodesPerformanceInterfaz").empty();
		 		}
		    });
		 	

			$("#selectGraph").click(function(event){
				$("#msgNoDisponible").empty();
				$("#containerChartPerformance1").empty();
				$("#containerChartPerformance2").empty();

				var startDate = $("#startDate").val();
				var endDate = $("#endDate").val();
				var metrics = $('input:radio[name=opciones]:checked').val();
								
				if(startDate === "" || endDate === "" ){
					alert("Elige un rango de fecha");
				}else{
					var nodes = [];
		            
					if(metrics === "utilisation" || metrics === "errorsdiscards" || metrics === "qos" || metrics === "pktshc" || metrics === "utilisationavgbps"){
						$('option:selected', $('#cmbInterfazGraph')).each(function() {
 			            	nodes.push($(this).val());
			         	});
						
					}else if(metrics != "utilisation" && metrics != "utilisationavgbps"){
						 $('option:selected', $('#SelectNode')).each(function() {
 				            	nodes.push($(this).val());
				         });
					}

					if(nodes.length<1){
						alert("Elija un nodo");
					}else{

						var sD = new Date(startDate+" 00:00:00");
						startDate = ((sD.getTime()/1000));
						
						var eD = new Date(endDate +" 00:00:00");
						endDate = ((eD.getTime()/1000));

						var idNum = 0;
						for(var idx=0; idx<nodes.length; idx++){

							var tmp = "";
							var name = "";
							var nmis = "";
							var idResource ="";
							var vendor = "";
							var referencia = "";
							
							if(metrics === "utilisation" || metrics === "qos" || metrics === "errorsdiscards" || metrics === "pktshc" || metrics === "utilisationavgbps"){
								tmp = nodes[idx].split("|");
								name = tmp[0];
								idResource = tmp[1];
								nmis = tmp[2];		
								referencia = tmp[3];
								vendor = tmp[4];
							}else{
								tmp = nodes[idx].split("|");
								name = tmp[0];
								nmis = tmp[1];
								vendor = tmp[2];
								referencia = tmp[3];
							}
							
							if(metrics === "cpu" && (name.indexOf("_UPS") > 0)){
								//idNum = idNum;
							}else{
								idNum ++;
							}
							
							drawElementsPerformanceGraph.containerChart = "containerChartPerformance-"+idNum;
							drawElementsPerformanceGraph.nmis = nmis;
							drawElementsPerformanceGraph.endUnix = endDate;
							drawElementsPerformanceGraph.endDate = "";
							drawElementsPerformanceGraph.startDate = startDate;

							if(vendor === "HuaweiRouter"){
								if(metrics === "health"){
									drawElementsPerformanceGraph.drawChartHealth(name);
								}else if(metrics === "cpu"){
									drawElementsPerformanceGraph.drawChartCPUHuawei(name);	
								}else if(metrics === "responsetime"){
									drawElementsPerformanceGraph.drawChartResponseTime(name);
								}else if(metrics === "memoryIO"){
									$("#msgNoDisponible").empty();
									$("#msgNoDisponible").append("<h1>Node Type: Huawei</h1>");	
								}else if(metrics === "memoryProc"){
									drawElementsPerformanceGraph.drawChartMemHuawei(name);								
								}else if(metrics === "utilisation"){
									drawElementsPerformanceGraph.drawInterfaceUtil(name, idResource, "autil", referencia);								
								}else if(metrics === "utilisationavgbps"){
									drawElementsPerformanceGraph.drawInterfaceUtil(name, idResource, "abits", referencia);								
								}else if(metrics === "errorsdiscards"){
									$("#msgNoDisponible").empty();
									$("#msgNoDisponible").append("<h1>Node Type: Huawei</h1>");								
								}else if(metrics === "pktshc"){
									$("#msgNoDisponible").empty();
									$("#msgNoDisponible").append("<h1>Node Type: Huawei</h1>");			
								}else if(metrics === "qos"){

									drawElementsPerformanceGraph.drawInterfaceQosHuawei(name, idResource, referencia);			
								}
							}else{
								if(metrics === "health"){
									drawElementsPerformanceGraph.drawChartHealth(name);
								}else if(metrics === "cpu"){
									drawElementsPerformanceGraph.drawChartCPU(name);	
								}else if(metrics === "responsetime"){
									drawElementsPerformanceGraph.drawChartResponseTime(name);
								}else if(metrics === "memoryIO"){
									drawElementsPerformanceGraph.drawChartMemoryIO(name);	
								}else if(metrics === "memoryProc"){
									drawElementsPerformanceGraph.drawChartMemoryProc(name);								
								}else if(metrics === "utilisation"){
									drawElementsPerformanceGraph.drawInterfaceUtil(name, idResource, "autil", referencia);								
								}else if(metrics === "utilisationavgbps"){
									drawElementsPerformanceGraph.drawInterfaceUtil(name, idResource, "abits", referencia);								
								}else if(metrics === "errorsdiscards"){
									drawElementsPerformanceGraph.drawInterfaceErrors(name, idResource);								
								}else if(metrics === "pktshc"){
									drawElementsPerformanceGraph.drawInterfacePkts(name, idResource);								
								}else if(metrics === "qos"){
									drawElementsPerformanceGraph.drawInterfaceQos(name, idResource);																	
								}
							}
							

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
			});
			
			$(".themeB").click(function(event){
				var filename = $(this).attr('rel');				
				themeChanges(filename,true);				
				Highcharts.setOptions(Highcharts.themeB);
				drawElementsPerformance.refreshChart();
			});
	});
	</script>


</body>

</html>
