<%@ page language="java" contentType="text/html; charset=US-ASCII"
    pageEncoding="US-ASCII"%>
<!DOCTYPE html>
<html lang="en">
<body>
    <div id="wrapper">		
        <div id="page-wrapper">

            <div class="container-fluid">
                <!-- /.row -->
                <div class="row">
                    <div class="col-lg-3 col-md-6">
                        <div class="panel panel-primary">
                            <div class="panel-heading">
                                <div class="row">
									<div class="col-xs-12 text-center">
										<a href="#nodeList" style="color: #ffffff;">
                                        	<div class="huge" id="countAllSct"></div>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <a href="#">
                                <div class="panel-footer">
                                    <span class="pull-left">Total</span>
                                    <span class="pull-right"><i class="fa fa-arrow-circle-right"></i></span>
                                    <div class="clearfix"></div>
                                </div>
                            </a>
                        </div>
                    </div>
                    <div class="col-lg-2 col-md-6">
                        <div class="panel panel-green">
                            <div class="panel-heading">
                                <div class="row">
                                    <div class="col-xs-12 text-center">
                                    	<a href="#nodeList" style="color: #ffffff;">
                                        	<div class="huge" id="onlineSct"></div>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <a href="#">
                                <div class="panel-footer">
                                    <span class="pull-left">Online</span>
                                    <span class="pull-right"><i class="fa fa-arrow-circle-right"></i></span>
                                    <div class="clearfix"></div>
                                </div>
                            </a>
                        </div>
                    </div>
                    <div class="col-lg-2 col-md-6">
                        <div class="panel panel-red">
                            <div class="panel-heading">
                                <div class="row">
                                    <div class="col-xs-12 text-center">
                                    	<a href="#nodeList" style="color: #ffffff;">
                                        	<div class="huge" id="offline"></div>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <a href="#">
                                <div class="panel-footer">
                                    <span class="pull-left">Offline</span>
                                    <span class="pull-right"><i class="fa fa-arrow-circle-right"></i></span>
                                    <div class="clearfix"></div>
                                </div>
                            </a>
                        </div>
                    </div>
                    <div class="col-lg-2 col-md-6">
                        <div class="panel panel-red">
                            <div class="panel-heading">
                                <div class="row">
                                    <div class="col-xs-12 text-center">
                                    	<a href="#nodeList" style="color: #ffffff;">
                                        	<div class="huge" id="invalid"></div>
                                        </a>                                        
                                    </div>
                                </div>
                            </div>
                            <a href="#">
                                <div class="panel-footer">
                                    <span class="pull-left">Invalid</span>
                                    <span class="pull-right"><i class="fa fa-arrow-circle-right"></i></span>
                                    <div class="clearfix"></div>
                                </div>
                            </a>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6">
                        <div class="panel panel-red">
                            <div class="panel-heading">
                                <div class="row">
                                    <div class="col-xs-12 text-center">
                                    	<a href="#nodeList" style="color: #ffffff;">
                                        	<div class="huge" id="noDetected"></div>
                                        </a>                                        
                                    </div>
                                </div>
                            </div>
                            <a href="#">
                                <div class="panel-footer">
                                    <span class="pull-left">No Detected</span>
                                    <span class="pull-right"><i class="fa fa-arrow-circle-right"></i></span>
                                    <div class="clearfix"></div>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
			<!-- /.row -->
			
				<br>
					<div class="col-lg-12">
				    	
						<div class="panel panel-primary">
				    		<div class="panel-heading">
						    	<h3 class="panel-title">SCT Nodes</h3>
						  	</div>
						  	<div class="panel-body">
						  		<a name="nodeMap"></a>
						  		<div id="containerMapSCT" style="height: 600px;"></div>
						  	</div>
				    	</div>
					</div>
				  <div class="row">
				    <div class="col-lg-3">
				    	<div class="panel panel-primary">
				    		<div class="panel-heading">
				    			<a name="nodeList"></a>
						    	<h3 class="panel-title">Node List</h3>
						  	</div>
							<div id="listNodesSct" class="listNodes" style="height: 350px;"></div>
							<br>
							<br>
						</div>						    
				    </div>
				    <div class="col-lg-4">
						<div class="panel panel-primary">
						  <div class="panel-heading">
						    <h3 class="panel-title">Node Resources</h3>
						  </div>
						  <div class="treeContainer panel-body" id="treeContainer">
						  	<a name="nodeResource"></a>
						  	<div id="treeContainerInterfaz"></div>
						  	<div id="treeContainerDetail"></div>  		  
						  </div>
						</div>																		
				    </div>
				    
				    <div class="col-lg-5">
				    	
						<div class="panel panel-primary">
				    		<div class="panel-heading">
						    	<h3 class="panel-title">Chart Ping</h3>
						  	</div>
						  	<div class="panel-body">
						  		<a name="nodeChart"></a>
						  		<div id="containerChartPingSct"></div>
						  	</div>
				    	</div>
				    	
					</div>						
				  </div>
				<!-- /.row -->
				<div class="row">
					<div class="col-lg-3">
						<div class="panel panel-primary">
						  <div class="panel-heading">
						    <h3 class="panel-title">Node Details</h3>
						  </div>
						  <div class="panel-body" style="font-size: 9px;">		  	
							<div id="listNodeDetail">				
							  	<div class="row" style="padding-left: 7px; padding-right: 7px;">
							  		
							  		<div class="col-lg-3 form-group has-success">
									  <label class="control-label" for="inputSuccess">Node Name:</label>
									  <input class="form-control" type="text" id="nename">
									</div>
									
									<div class="col-lg-3 form-group has-success">
										<label class="control-label" for="inputSuccess">Type:</label>
							    		<input class="form-control" type="text" id="netype" >
							  		</div>
																  		
							  		<div class="col-lg-3 form-group has-success">
										<label class="control-label" for="inputSuccess">Display Type:</label>
							    		<input class="form-control" type="text" id="displaytype" >
							  		</div>
							  											
									<div class="col-lg-3 form-group has-success">
										<label class="control-label" for="inputSuccess">IP:</label>
							    		<input class="form-control" type="text" id="neip" >
							  		</div>

								</div>		
								<div class="row" style="padding-left: 7px; padding-right: 7px;">
							  		
							  		<div class="col-lg-3 form-group has-success">
										<label class="control-label" for="inputSuccess">Mac Address:</label>
							    		<input class="form-control" type="text" id="nemac" >
							  		</div>
							  		
							  		<div class="col-lg-3 form-group has-success">
									  <label class="control-label" for="inputSuccess">Create Time:</label>
									  <input class="form-control" type="text" id="createtime">
									</div>
									
									<div class="col-lg-3 form-group has-success">
										<label class="control-label" for="inputSuccess">Last Poll Time:</label>
							    		<input class="form-control" type="text" id="lastpolltime" >
							  		</div>
									
									<div class="col-lg-3 form-group has-success">
										<label class="control-label" for="inputSuccess">Category:</label>
							    		<input class="form-control" type="text" id="necategory" >
							  		</div>
								</div>
								<div class="row" style="padding-left: 7px; padding-right: 7px;">
							  		
							  		<div class="col-lg-3 form-group has-success">
										<label class="control-label" for="inputSuccess">OS Version:</label>
							    		<input class="form-control" type="text" id="neosversion" >
							  		</div>
							  		
							  		<div class="col-lg-3 form-group has-success">
									  <label class="control-label" for="inputSuccess">Version:</label>
									  <input class="form-control" type="text" id="version">
									</div>
									
									<div class="col-lg-3 form-group has-success">
									  <label class="control-label" for="inputSuccess">Neruntime:</label>
									  <input class="form-control" type="text" id="neruntime">
									</div>
									
									<div class="col-lg-3 form-group has-success">
									  <label class="control-label" for="inputSuccess">Bw:</label>
									  <input class="form-control" type="text" id="bw">
									</div>

								</div>						
						  </div>
						  <br>
						  </div>
						</div>
					</div>
					<div class="col-lg-5">
						<div class="panel panel-primary">
				    		<div class="panel-heading">
						    	<h3 class="panel-title">Interfaces Flow</h3>
						  	</div>
						  	<div class="panel-body">
						  		<a name="nodeAP"></a>
						  		<div id="containerInterfacesFlow"></div>
						  	</div>
				    	</div>
					</div>
					<div class="col-lg-4">
						<div class="panel panel-primary">
				    		<div class="panel-heading">
						    	<h3 class="panel-title">AP</h3>
						  	</div>
						  	<div class="panel-body">
						  		<a name="nodeAP"></a>
						  		<div id="containerAp"></div>
						  	</div>
				    	</div>
					</div>
				</div>
				<!-- /.row -->
				<div class="row">
					<div class="col-lg-6">				    	
						<div class="panel panel-primary">
				    		<div class="panel-heading">
						    	<h3 class="panel-title">Chart Content Filtering</h3>
						  	</div>
						  	<div class="panel-body">
						  		<a name="nodeChartFilter"></a>
						  		<div id="containerChartFilter_1"></div>
						  	</div>
				    	</div>
					</div>
					<div class="col-lg-6">				    	
						<div class="panel panel-primary">
				    		<div class="panel-heading">
						    	<h3 class="panel-title">Chart Content Filtering</h3>
						  	</div>
						  	<div class="panel-body">
						  		<a name="nodeChartFilter"></a>
						  		<div id="containerChartFilter_2"></div>
						  	</div>
				    	</div>
					</div>
				</div>
				<!-- /.row -->
				<div class="row">
					<div class="col-lg-12">				    	
						<div class="panel panel-primary">
				    		<div class="panel-heading">
						    	<h3 class="panel-title">Chart Content Filtering by App</h3>
						  	</div>
						  	<div class="panel-body">
						  		<a name="nodeChartFilter"></a>
						  		<div id="containerChartFilter_3"></div>
						  	</div>
				    	</div>
					</div>
				</div>					
            </div>
            <%@ include file="footer.jsp" %>
            <!-- /.container-fluid -->

        </div>
        <!-- /#page-wrapper -->

    </div>
    <!-- /#wrapper -->


	<!-- LIBRERIAS DE PAGINA SCT -->
	<script src="js/drawElementsSct.js"></script>
	
	<script type="text/javascript">
	
	var stylesMap = null;
	
	$(document).ready(function(){

			jQuery.i18n.properties({
			    name:'config', 
			    path:'prop/', 
			    mode:'both',
			    callback: function() {
			    		cnocConnector.menu = serviceMenu;
			    		cnocConnector.nmis_urls = nmis_urls;
			    		cnocConnector.logout = serviceLogout;
			    		cnocConnector.service1 = serviceC9;
			    		cnocConnector.service2 = serviceSCT1;
			    		cnocConnector.service3 = serviceSCT2;
			    		cnocConnector.service4 = serviceSCT3;
			    		cnocConnector.service5 = serviceSCT4;
			    		cnocConnector.service6 = serviceSCT5;
			    		cnocConnector.service7 = serviceSCT6;
			    		cnocConnector.service8 = serviceSCT7;
			    		cnocConnector.service9 = serviceSCT8;
			    		cnocConnector.service10 = serviceSCT9;
			    		cnocConnector.service11 = serviceSCT10;
			    		cnocConnector.service12 = serviceSCT11;
			    		cnocConnector.service13 = serviceSCT12;
			    		cnocConnector.service14 = serviceSCT13;
			    		cnocConnector.service15 = serviceSCT14;
			    		cnocConnector.service16 = serviceSCT15;			    		
			    }
			});
			
			$("#cmbCliente").hide();
			
		 	//$( "#sortableLeft" ).sortable({revert: true});
		 	
			/*Genera Menu*/
			generateMenu();
		 	
		 
		 	$('#countAllSct').click(function(){
		 		cnocConnector.invokeMashup(cnocConnector.service3, {"node":"","status":""},drawElementsSct.drawListNodes, "listNodesSct", "listNodesSctG");
			});
		 	
		 	$('#onlineSct').click(function(){
		 		cnocConnector.invokeMashup(cnocConnector.service3, {"node":"","status":"1"},drawElementsSct.drawListNodes, "listNodesSct", "listNodesSctG");
			});
	
		 	$('#offline').click(function(){
		 		cnocConnector.invokeMashup(cnocConnector.service3, {"node":"","status":"2"},drawElementsSct.drawListNodes, "listNodesSct", "listNodesSctG");
			});
		
		 	$('#invalid').click(function(){
		 		cnocConnector.invokeMashup(cnocConnector.service3, {"node":"","status":"3"},drawElementsSct.drawListNodes, "listNodesSct", "listNodesSctG");
			});
		 	
		 	$('#noDetected').click(function(){
		 		cnocConnector.invokeMashup(cnocConnector.service3, {"node":"","status":"0"},drawElementsSct.drawListNodes, "listNodesSct", "listNodesSctG");
			});
			
		 	
		 	Highcharts.setOptions({
		 		//colors: ['#reachable', '#unreachable', 'degraded']
		        colors: ['#17FF00', '#FF0202', '#FFE400']		 	
		    });
		 	
		 	drawElementsSct.init();
			
			$( ".logout").click(function(event){	
				logout();
			});
			
			$( ".back").click(function(event){
				home();
			});
			
			Highcharts.setOptions({
		        global: {
		            useUTC: false
		        }
		    });
			
			$(".themeW").click(function(event){
				var filename = $(this).attr('rel');				
				themeChanges(filename, false);			
				Highcharts.setOptions(Highcharts.themeW);
				stylesMap = null;
				drawElementsSct.builder();
			});
			
			$(".themeB").click(function(event){
				var filename = $(this).attr('rel');				
				themeChanges(filename,true);				
				Highcharts.setOptions(Highcharts.themeB);
				drawElementsSct.builder();
			});

			var refresh = setInterval(function(){
				drawElementsSct.init();
			},300000);
	});
	</script>


</body>

</html>
