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
                    <div class="col-lg-3 col-md-6"></div>
                    <div class="col-lg-3 col-md-6">
                        <div class="panel panel-primary">
                            <div class="panel-heading">
                                <div class="row">
                                    <div class="col-xs-12 text-center">
                                    	<a href="#listChanges" style="color: #ffffff;">
                                        	<div class="huge" id="countOpen"></div>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <a href="#">
                                <div class="panel-footer">
                                    <span class="pull-left">Open</span>
                                    <span class="pull-right"><i class="fa fa-arrow-circle-right"></i></span>
                                    <div class="clearfix"></div>
                                </div>
                            </a>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6">
                        <div class="panel panel-primary">
                            <div class="panel-heading">
                                <div class="row">
                                    <div class="col-xs-12 text-center">
                                    	<a href="#listChanges" style="color: #ffffff;">                                    	
                                        	<div class="huge" id="countClose"></div>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <a href="#">
                                <div class="panel-footer">
                                    <span class="pull-left">Closed</span>
                                    <span class="pull-right"><i class="fa fa-arrow-circle-right"></i></span>
                                    <div class="clearfix"></div>
                                </div>
                            </a>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6"></div>
                </div>
                <!-- /.row -->
				  <div class="row">
				  	<div class="col-lg-9" style="padding-left: 20px; padding-right: 20px;">
				  		<div class="row">
				  			<div class="col-lg-3">
						    	<div class="panel panel-primary">
						    		<div class="panel-heading">
								    	<i class="fa fa-bar-chart-o fa-fw"></i> Changes Category
								  	</div>
						    		<div id="containerCategory" style="height: 200px;"></div>
						    	</div>		
					    	</div>
					    	<div class="col-lg-9" >
						    	<div class="panel panel-primary">
						    		<div class="panel-heading">
								    	<i class="fa fa-bar-chart-o fa-fw"></i> Changes By Phase
								  	</div>
						    		<div id="containerPhase" style="height: 200px;"></div>
						    	</div>		
					    	</div>
				  		</div>
				  		<div class="row">
				  			<div id="changesGroups" class="col-lg-3" style="display: none;">
						    	<div class="panel panel-primary">
						    		<div class="panel-heading">
								    	<i class="fa fa-bar-chart-o fa-fw"></i> Changes By Group
								  	</div>
						    		<div id="changesGroupsChart" style="height: 300px;"></div>
						    	</div>		
					    	</div>
				  			<div id="changesListT" class="col-lg-12">
						    	<div class="panel panel-primary">
						    		<div class="panel-heading">
						    			<a name="listChanges"></a>
								    	<i class="fa fa-list-alt fa-fw"></i> Changes List
								  	</div>
						    		<div id="lista" style="height: 300px;"></div>
						    	</div>		
					    	</div>
				  		</div>
				  	</div>
				
				   
				   
				    <div class="col-lg-3">
						<div class="panel panel-primary">
						  <div class="panel-heading">
						    <i class="fa fa-list fa-fw"></i> Change Detail
						  </div>
						  <div class="panel-body">		  	
							<!-- <div id="listNodeDetail"></div>-->
				
							<div id="listNodeDetail" style="font-size: 12px;">	
								<div class="row" style="padding-left: 7px; padding-right: 7px;">
									<div class="col-lg-4 form-group has-success">
									  <label class="control-label" for="inputSuccess">Change ID:</label>
									  <input class="form-control" type="text" name="Change_Id" id="detail0">
									</div>
									<div class="col-lg-4 form-group has-success">
										<label class="control-label" for="inputSuccess">Status:</label>
							    		<input class="form-control" type="text" id="detail1">
							  		</div>
									<div class="col-lg-4 form-group has-success">
							  			<label class="control-label" for="inputSuccess">Category:</label>
							    		<input class="form-control" type="text" id="detail2">
							  		</div>			  					  					  	
								</div>
								
								<div class="row" style="padding-left: 7px; padding-right: 7px;">
									<div class="col-lg-4 form-group has-success">
							  			<label class="control-label" for="inputSuccess">Subcategory:</label>
							    		<input class="form-control" type="text" id="detail3">
							  		</div>
									<div class="col-lg-4 form-group has-success">
									  <label class="control-label" for="inputSuccess">Curren Phase:</label>
									  <input class="form-control" type="text"  id="detail4">
									</div>
									<div class="col-lg-4 form-group has-success">
										<label class="control-label" for="inputSuccess">Approval Status:</label>
							    		<input class="form-control" type="text" id="detail5" >
							  		</div>			  					  	
								</div>
								
								<div class="row" style="padding-left: 7px; padding-right: 7px;">
									<div class="col-lg-4 form-group has-success">
							  			<label class="control-label" for="inputSuccess">Open Time:</label>
							    		<input class="form-control" type="text" id="detail6" >
							  		</div>
							  		<div class="col-lg-4 form-group has-success">
							  			<label class="control-label" for="inputSuccess">Close Time:</label>
							    		<input class="form-control" type="text" id="detail7" >
							  		</div>
									<div class="col-lg-4 form-group has-success">
									  <label class="control-label" for="inputSuccess">Customer:</label>
									  <input class="form-control" type="text" id="detail8">
									</div>
								</div>
								<div class="row" style="padding-left: 7px; padding-right: 7px;">
									<div class="col-lg-4 form-group has-success">
										<label class="control-label" for="inputSuccess">Coordinator:</label>
							    		<input class="form-control" type="text" id="detail9" >
							  		</div>
									<div class="col-lg-4 form-group has-success">
							  			<label class="control-label" for="inputSuccess">Asigned To:</label>
							    		<input class="form-control" type="text" id="detail10">
							  		</div>
							  		<div class="col-lg-4 form-group has-success">
							  			<label class="control-label" for="inputSuccess">Affected CI:</label>
							    		<input class="form-control" type="text" id="detail11">
							  		</div>			  					  	
								</div>
								<div class="row" style="padding-left: 7px; padding-right: 7px;">
									<div class="col-lg-6 form-group has-success">
									  <label class="control-label" for="inputSuccess">Request by:</label>
									  <input class="form-control" type="text" id="detail12">
									</div>
									<div class="col-lg-6 form-group has-success">
										<label class="control-label" for="inputSuccess">Location:</label>
							    		<input class="form-control" type="text" id="detail13" >
							  		</div>		  					  	
								</div>
								<div class="row" style="padding-left: 7px; padding-right: 7px;">
									<div class="col-lg-12 form-group has-success">
									  <label class="control-label" for="inputSuccess">Request by:</label>
									  <input class="form-control" type="text" id="detail14">
									</div>  					  	
								</div>
								<div class="row" style="padding-left: 7px; padding-right: 7px;">
									<div class="col-lg-12 form-group has-success">
									  <label class="control-label" for="inputSuccess">Request by:</label>
									  <input class="form-control" type="text" id="detail15">
									</div>	  					  	
								</div>
								<br>
								<br>
								<br>
						  </div>
						  </div>
						</div>   
						
				    </div>
				
				  </div>
				<!-- /.row -->
			
				</br>
				  <div class="row">
					<div id="changesListT" class="col-lg-6">
						<div class="panel panel-primary">
							<div class="panel-heading">
								<i class="fa fa-list-alt fa-fw"></i> Change Activities
							</div>
							<div id="tabsChangesActivities" style="height: 300px;"></div>
						</div>		
					</div>
					<div id="changesListT" class="col-lg-6">
						<div class="panel panel-primary">
							<div class="panel-heading">
								<i class="fa fa-list-alt fa-fw"></i> Change Tasks
							</div>
							<div id="tabsChangesTasks" style="height: 300px;"></div>
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
	<script src="js/drawElementsChanges.js"></script>
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
		    		cnocConnector.menu = serviceMenu;
		    		cnocConnector.nmis_urls = nmis_urls;
		    		cnocConnector.service1 = serviceC1;
		    		cnocConnector.service2 = serviceC2;
		    		cnocConnector.service3 = serviceC3;
		    		cnocConnector.service4 = serviceC4;
		    		cnocConnector.service5 = serviceC5;
		    		cnocConnector.service6 = serviceC6;
		    		cnocConnector.service7 = serviceC7;
		    		cnocConnector.service8 = serviceC8;
		    		cnocConnector.service9 = serviceC9;
		    		cnocConnector.service10 = serviceC10;
		    		cnocConnector.service11 = serviceC11;
		    }
		});

		$('#countOpen').click(function(){
			cnocConnector.invokeMashup(cnocConnector.service1,{"code_net":cnocConnector.codeNetGlobal, "flag_stat": "'t'" },drawElements.gridChangesList, "lista", "changesListTable");
		});
		
		$('#countClose').click(function(){
			cnocConnector.invokeMashup(cnocConnector.service1,{"code_net":cnocConnector.codeNetGlobal, "flag_stat": "'f'" },drawElements.gridChangesList, "lista", "changesListTable");
		});
		
		/*Genera Menu*/
		generateMenu();
		
		drawElements.init();
		
		cnocConnector.invokeMashup(cnocConnector.getLdap,{},function (data) {
			if(data.aut.module[1]==="CLIENTE") {
				$("#changesGroups").show();
				$("#changesListT").removeClass("col-lg-12");
				$("#changesListT").addClass("col-lg-9");
				cnocConnector.invokeMashup(
						cnocConnector.service11,
						{"code_net" : cnocConnector.codeNetGlobal},
						drawElements.chartGroups,
						"changesGroupsChart",
						"changesGroupsChartC"
					);
			}
		}, null, null);
			
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
		
		var refresh = setInterval(function(){
			drawElements.init();
		},300000);

	});
	</script>


</body>

</html>
