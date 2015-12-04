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
	
	<!-- Datetimepicker -->
	<!--<link rel="stylesheet" href="http://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.3.0/css/datepicker.min.css">-->
	
	<style>
		.tooltipMap{ color: #000000; }
		.datepicker{ z-index:1151 !important; }
		.date input { height: 31px; }
		
		table {
			max-width: none
		}
		
		.rceDataTable * {
			box-sizing: initial;
		}
		
		table.dataTable,
		table.dataTable th,
		table.dataTable td {
			-webkit-box-sizing: content-box;
			-moz-box-sizing: content-box;
			box-sizing: content-box;
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
		
		<div id="contenedorChartTops" style="overflow: scroll; height: 500px; ">
			<div class="row divChartUtilisarionBox" id="divChartUtilisarionBox" style="width:96%; margin-left: 1%;">
	 			<div class="col-lg-12">
			  		<div class="panel panel-primary">
			    		<div class="panel-heading">
			    			<a name="nodeList"></a>
					    	<i class="fa fa-bar-chart-o fa-fw"></i> Chart Utilisation
					  	</div>
					  	
					  	<div class="panel-body" style="height: 400px;">
					  	<div id="containerChartPerformanceInterfaz"></div>
					  	</div>
					</div>
			  	</div>
		  	</div>
		  	
		  	<div class="divContainerTops" id ="divContainerTops" style="width:96%; margin-left: 1%;">

			<div class="row">
			    <div class="col-lg-12">
			    	<div class="panel panel-primary">
			    		<div class="panel-heading">
			    			<a name="nodeList"></a>
					    	<i class="fa fa-list-alt fa-fw"></i> Top 10 Talkers
					  	</div>
					  	<div class="panel-body">
					  		<div id="top0" class="tops"></div>
					  	</div>								
					</div>   
			    </div>
		    </div>
		    <div class="row">
			    <div class="col-lg-12">
			    	<div class="panel panel-primary">
			    		<div class="panel-heading">
			    			<a name="nodeList"></a>
					    	<i class="fa fa-list-alt fa-fw"></i> Top 10 Listener
					  	</div>
					  	<div class="panel-body">
					  		<div id="top1" class="tops"></div>
					  	</div>								
					</div>   
			    </div>
			</div>
			
			<!-- /.row -->
			
			<div class="row">
			    <div class="col-lg-12">
			    	<div class="panel panel-primary">
			    		<div class="panel-heading">
			    			<a name="nodeList"></a>
					    	<i class="fa fa-list-alt fa-fw"></i> Top 10 Applications
					  	</div>
					  	<div class="panel-body">
					  		<div id="top2" class="tops"></div>
					  	</div>								
					</div>   
			    </div>
			    </div>
		    <div class="row">
			    <div class="col-lg-12">
			    	<div class="panel panel-primary">
			    		<div class="panel-heading">
			    			<a name="nodeList"></a>
					    	<i class="fa fa-list-alt fa-fw"></i> Top 10 Applications Source
					  	</div>
					  	<div class="panel-body">
					  		<div id="top3" class="tops"></div>
					  	</div>								
					</div>   
			    </div>
			</div>
			
			<!-- /.row -->
			
			<div class="row">
			    <div class="col-lg-12">
			    	<div class="panel panel-primary">
			    		<div class="panel-heading">
			    			<a name="nodeList"></a>
					    	<i class="fa fa-list-alt fa-fw"></i> Top 10 Protocols
					  	</div>
					  	<div class="panel-body">
					  		<div id="top4" class="tops"></div>
					  	</div>								
					</div>   
			    </div>
			</div>
		    <div class="row">
			    <div class="col-lg-12">
			    	<div class="panel panel-primary">
			    		<div class="panel-heading">
			    			<a name="nodeList"></a>
					    	<i class="fa fa-list-alt fa-fw"></i> Top 10 Conversations
					  	</div>
					  	<div class="panel-body">
					  		<div id="top5" class="tops"></div>
					  	</div>								
					</div>   
			    </div>
			</div>
		</div>
		  	
		</div>
	</div>
	<div id="cmd" style="visibility: hidden; height:0px; width: 1000px;">		
		<div>
			<pre id="resultCommand"></pre>
		</div>
	</div>
	
	<div id="ipAcc" style="visibility: hidden; height: 0px;">
		<div class="form-group">
			<div class="input-group">
				<span class="input-group-addon"><i class="glyphicon glyphicon-envelope"></i></span>
				<input type="text" id="contactEmailIP" class="form-control" style="height: 30px;" placeholder="email@dominio.com;email2@dominio2.com;email3@dominio3.com;" required >
			</div>
			<div class="input-group">
				<select id="timeIP">
				</select>
			</div><br>
			<div class="input-group">
				<span class="input-group-addon"><i class="glyphicon glyphicon-comment"></i></span>
				<input type="text" id="messageIP" class="form-control" style="height: 30px;" placeholder="Message result" disabled="disabled">
			</div>
		</div>
	</div>

	<!-- Modal Unmanaged -->
	<div class="modal fade" id="boxUnmanaged" tabindex="-1" role="dialog"
		aria-labelledby="myModalLabel">
		<div class="modal-dialog" role="document">
			<div class="modal-content" id="unModal">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
					<h4 class="modal-title" id="uModalLabel">Unmanaged node</h4>
				</div>
				<div class="modal-body" id="modalBodyUnmanaged"></div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
					<button type="button" class="btn btn-primary" id="saveUnmanaged">Unmanaged</button>
				</div>
			</div>
		</div>
	</div>

	<div id="wrapper">
		<%@ include file="menu.jsp" %> 
        <div id="page-wrapper">

            <div class="container-fluid">
                <!-- /.row -->


                <div class="row">
<!--                     <div class="col-md-2 col-md-6 col-md-offset-1"> -->
                    <div class="col-md-3 col-md-6">
                        <div class="panel panel-primary" id="countAll">
                            <div class="panel-heading">
                                <div class="row">
									<div class="col-xs-12 text-center">
										<a href="#nodeList" style="color: #ffffff;">
                                        	<div class="huge" id="totalDiv"></div>
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
                    <div class="col-md-3 col-md-6">
                        <div class="panel panel-green" id="countReachable">
                            <div class="panel-heading">
                                <div class="row">
                                    <div class="col-xs-12 text-center">
                                    	<a href="#nodeList" style="color: #ffffff;">
                                        	<div class="huge" id="totalReachable"></div>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <a href="#">
                                <div class="panel-footer">
                                    <span class="pull-left">Normal</span>
                                    <span class="pull-right"><i class="fa fa-arrow-circle-right"></i></span>
                                    <div class="clearfix"></div>
                                </div>
                            </a>
                        </div>
                    </div>
                    <div class="col-md-3 col-md-6">
                        <div class="panel panel-yellow" id="countDegraded">
                            <div class="panel-heading">
                                <div class="row">
                                    <div class="col-xs-12 text-center">
                                    	<a href="#nodeList" style="color: #ffffff;">
                                        	<div class="huge" id="totalDegraded"></div>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <a href="#">
                                <div class="panel-footer">
                                    <span class="pull-left">Warning</span>
                                    <span class="pull-right"><i class="fa fa-arrow-circle-right"></i></span>
                                    <div class="clearfix"></div>
                                </div>
                            </a>
                        </div>
                    </div>
                    <div class="col-md-3 col-md-6">
                        <div class="panel panel-red" id="countUnreachable">
                            <div class="panel-heading">
                                <div class="row">
                                    <div class="col-xs-12 text-center">
                                    	<a href="#nodeList" style="color: #ffffff;">
                                        	<div class="huge" id="totalUnreachable"></div>
                                        </a>                                        
                                    </div>
                                </div>
                            </div>
                            <a href="#">
                                <div class="panel-footer">
                                    <span class="pull-left">Critical</span>
                                    <span class="pull-right"><i class="fa fa-arrow-circle-right"></i></span>
                                    <div class="clearfix"></div>
                                </div>
                            </a>
                        </div>
                    </div>
                    <!-- Unmanaged start -->
                    <!-- <div class="col-md-2 col-md-6">
                        <div class="panel panel-info">
                            <div class="panel-heading">
                                <div class="row">
                                    <div class="col-xs-12 text-center">
                                    	<a href="#nodeList" style="color: #ffffff;">
                                        	<div class="huge" id="countUnmanaged">0</div>
                                        </a>                                        
                                    </div>
                                </div>
                            </div>
                            <a href="#">
                                <div class="panel-footer">
                                    <span class="pull-left">Unmanaged</span>
                                    <span class="pull-right"><i class="fa fa-arrow-circle-right"></i></span>
                                    <div class="clearfix"></div>
                                </div>
                            </a>
                        </div>
                    </div> -->
                    <!-- Unmanaged end -->
                </div>
                <!-- /.row -->
				<div class="row">
				    <div class="col-lg-4">
						<div class="panel panel-primary">
				    		<div class="panel-heading">
						    	<i class="fa fa-bar-chart-o fa-fw"></i> TOPS Utilization
						  	</div>
						  	<div class="panel-body" style="overflow: scroll;">
						  		<ul class="nav nav-tabs">
								  <li class="active"><a data-toggle="tab" href="#topInOPFlow">Utilization IN</a></li>
								  <li><a data-toggle="tab" href="#topOutOPFlow">Utilization OUT</a></li>
								  <li><a data-toggle="tab" href="#otherTop">TOPS</a></li>
								  <li><a data-toggle="tab" href="#chartGrupos">Groups</a></li>
								  <li><a data-toggle="tab" href="#chartGruposError">Errors by Groups</a></li>
								</ul>
								
								<div class="tab-content">
								  	<div id="topInOPFlow" class="tab-pane fade in active">						    
							    		<div id="topInUtilization" style="height: 490px;"></div>
							    	</div>
								  	<div id="topOutOPFlow" class="tab-pane fade">						    
						    			<div id="topOutUtilization" style="height: 490px;"></div>					    		
							  		</div>
							  		<div id="otherTop" class="tab-pane fade">						    
						    			<ul class="nav nav-pills">
											<!-- <li class="tops list-group-item contadores" id="tMemoryCountG"><a href="#">Top Memory</a></li> -->
											<!-- <li class="tops list-group-item contadores" id="tCpuCountG"><a href="#">Top CPU</a></li> -->
											<li class="list-group-item contadores topMeasure" id="cpuLoad"><a href="#">CPU Load</a></li>
											<li class="list-group-item contadores topMeasure" id="MemoryUsed"><a href="#">Memory Used</a></li>
											<li class="list-group-item contadores topMeasure" id="ifInUtil"><a href="#">In Utilization</a></li>
											<li class="list-group-item contadores topMeasure" id="ifOutUtil"><a href="#">Out Utilization</a></li>
											<li class="list-group-item contadores topMeasure" id="ifInErrorRates"><a href="#">In Error Rates</a></li>
											<li class="list-group-item contadores topMeasure" id="ifOutDiscardRates"><a href="#">Out Discard Rates</a></li>
					      				</ul>					    		
							  		</div>
							  		
							    	<div id="chartGrupos" class="tab-pane fade" style="height: 500px;"></div>
							  		<div id="chartGruposError" class="tab-pane fade"></div>
							  		
								</div>
						  	</div>
						</div>
				    </div>
				    				    
				    <div class="col-lg-5">
				    	<div class="panel panel-primary" id="mapaAll">
				    		<div class="panel-heading">
						    	<i class="fa fa-globe fa-fw"></i> Nodes By State
						  	</div>
				    		<div id="mapGral" class="mapGral"></div>
				    	</div>		
				    </div>
				    
				    <div class="col-lg-3">
						
						<div class="panel panel-primary">
						  <div class="panel-heading">
						    <i class="fa fa-book fa-fw"></i> Services
						  </div>
						  <div class="panel-body">
						  	<ul class="nav nav-pills">
								  <li class="list-group-item contadores" id="listIncidentG">
								    <span class="badge" id="cIncident"></span>		    
								    <a href="#">Incidents</a>
								  </li>
								  <li class="list-group-item contadores" id="listChangesG">
								    <span class="badge" id="cOpen"></span>
								    <a href="#">Changes</a>
								  </li>
								  <!-- 
								  <li class="tops list-group-item">
								    <span class="badge" id="psOpen"></span>
								    <a href="#">PS</a>
								  </li>-->
					      </ul>
						  </div>
						</div>
						<div class="panel panel-primary">
				    		<div class="panel-heading">
				    			<a name="nodeList"></a>
						    	<i class="fa fa-list-alt fa-fw"></i> Nodes
						  	</div>
						  	<!-- <div id="listNodes" class="listNodes"></div>-->
						  	<div class="panel-body">
						  		<ul id="tabs" class="nav nav-tabs" data-tabs="tabs">
							        <li class="active"><a href="#listNodesGral" data-toggle="tab">Node List</a></li>
							        <li><a href="#listNodesOpFlowGG" data-toggle="tab">List Nodes OpFlow</a></li>
							    </ul>
							    <div id="my-tab-content" class="tab-content">
							        <div class="tab-pane active" id="listNodesGral">
							            <div id="listNodes" class="listNodes"></div>
							        </div>
							        <div class="tab-pane" id="listNodesOpFlowGG">
							            <div id="listNodesOpFlow" class="listNodesOpFlow"></div>
							        </div>
							    </div>
						  	</div>
						</div>
						<!--<div class="panel panel-primary">
				    		<div class="panel-heading">
				    			<a name="nodeList"></a>
						    	<i class="fa fa-list-alt fa-fw"></i> Node List
						  	</div>
							<div id="listNodes" class="listNodes"></div>
							<br>
							<br>
						</div>-->
						
						
				    </div>
			  	</div>
			<!-- /.row -->
			<!-- 
				<div class="row">
					<div class="col-lg-6">
						<div class="panel panel-primary">
				    		<div class="panel-heading">
				    			<a name="nodeList"></a>
						    	<i class="fa fa-list-alt fa-fw"></i> List Interface
						  	</div>
						  	
						  	<div class="panel-body" style="overflow: scroll; height: 400px;">
						  		<div id="listInterfaces"></div>
						  	</div>
						</div>					  	
					</div>
					
					<div class="col-lg-6">
				  		<div class="panel panel-primary">
				    		<div class="panel-heading">
				    			<a name="nodeList"></a>
						    	<i class="fa fa-bar-chart-o fa-fw"></i> Chart Utilisation
						  	</div>
						  	
						  	<div class="panel-body" style="height: 400px;">
						  	<div id="containerChartPerformanceInterfaz"></div>
						  	</div>
						</div>
				  	</div>
					
				</div>-->
			<!-- /.row -->
				<br>
				  <div class="row">
				    <div class="col-lg-3">

				    	<div class="panel panel-primary">
						  <div class="panel-heading">
						    <i class="fa fa-random fa-fw"></i> Relationships
						  </div>
						  <div class="panel-body">
						  	<ul class="nav nav-pills">
							  <li class="list-group-item contadores" id="relatedIncidents">
							    <span class="badge" id="relatedIncidentsC"></span>
							    <a href="#">Related Incidents</a>
							  </li>
							  <li class="list-group-item contadores" id="relatedChanges">
							    <span class="badge" id="relatedChangesC"></span>
							    <a href="#">Related Changes</a>
							  </li>
					      </ul>
						  </div>
						</div>
						<div class="panel panel-primary">
						  <div class="panel-heading">
						    <i class="fa fa-magic fa-fw"></i> Node Tools
						  </div>
						  <div class="panel-body">
						  	<ul class="nav nav-pills">
							  <li class="commands list-group-item contadores" id="pingNS">
							    <span class="badge" id="pingNodeStatus"></span>
							    <a href="#">Ping command</a>
							  </li>
							  <!-- <li class="commands list-group-item contadores" id="tracepathNS">
							    <span class="badge" id="tracepathNodeStatus"></span>
							    <a href="#">Tracepath command</a>
							  </li> -->
							  <li class="commands list-group-item contadores" id="ipAccountingNS">
							    <span class="badge" id="ipAccountingNodeStatus"></span>
							    <a href="#">IP Accounting Report</a>
							  </li>
					      </ul>
						  </div>
						</div>
				    					    	   
				    </div>
				    <div class="col-lg-4">
						<div class="panel panel-primary">
						  <div class="panel-heading">
						    <i class="fa fa-sitemap fa-fw"></i> Node Resources
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
								<i class="fa fa-list fa-fw"></i> Node Details
								<!-- Unmanaged Star -->
								<!-- <div class="pull-right">
									<div class="btn-group">
										<button type="button" class="btn btn-info btn-xs dropdown-toggle" data-toggle="dropdown">
										Actions
										<span class="caret"></span>
										</button>
										<ul class="dropdown-menu pull-right" role="menu">
											<li><a id="actionUnmanaged" data-toggle="modal" data-target="#boxUnmanaged">Unmanaged</a>
											</li>
										</ul>
									</div>
								</div> -->
								<!-- Unmanaged End -->
							</div>
							<!-- /.panel-heading -->						  
						  <div class="panel-body" style="font-size: 9px;">		  	
							<!-- <div id="listNodeDetail"></div>-->
							<!-- <div class="alert alert-info" style="display: none;" id="msgPingOnly">
							    <a href="#" class="close" data-dismiss="alert">&times;</a>
							    <strong>Note!</strong> Monitoring Ping Only.
							</div>-->
							<div id="msgPingOnly"></div>
							<div id="listNodeDetail">				
							  	<div class="row" style="padding-left: 7px; padding-right: 7px;">
							  		
							  		<div class="col-lg-6 form-group has-success">
									  <label class="control-label" for="inputSuccess">Node Name:</label>
									  <input class="form-control" type="text" id="name">
									</div>
									
									<div class="col-lg-6 form-group has-success">
										<label class="control-label" for="inputSuccess">Sys Description:</label>
							    		<input class="form-control" type="text" id="sysdescr" >
							  		</div>
									
								</div>
								<div class="row" style="padding-left: 7px; padding-right: 7px;">
										<div class="col-lg-4 form-group has-success">
										  <label class="control-label" for="inputSuccess">Node Type:</label>
										  <input class="form-control" type="text" id="nodetype">
										</div>
										<div class="col-lg-4 form-group has-success">
											<label class="control-label" for="inputSuccess">Vendor:</label>
								    		<input class="form-control" type="text" id="nodevendor" >
								  		</div>
										<div class="col-lg-4 form-group has-success">
											<label class="control-label" for="inputSuccess"> </label>
								  			<a class="btn btn-primary btn-sm nodeDetailView form-control" href="#" role="button" id="nodeDetailView">View detail &raquo;</a>		
								  		</div>			  					  	
								</div>
								<!-- <div class="row" style="padding-left: 12px; padding-right: 7px;">
									
								</div>-->
								<div id="detalleNodo" class="detalleNodo row" style="display: none; padding-left: 14px; padding-right: 14px;">													
									<div class="row" style="padding-left: 7px; padding-right: 7px;">
										<div class="col-lg-4 form-group has-success">
								  			<label class="control-label" for="inputSuccess">Model:</label>
								    		<input class="form-control" type="text" id="model" >
								  		</div>	
										<div class="col-lg-4  form-group has-success">
								  			<label class="control-label" for="inputSuccess">Serial Num:</label>
								    		<input class="form-control" type="text" id="serialnum">
								  		</div>
										<div class="col-lg-4  form-group has-success">
											<label class="control-label" for="inputSuccess">Sysname:</label>
								    		<input class="form-control" type="text" id="sysname" >
								  		</div>			  		
									</div>
									
									<div class="row" style="padding-left: 7px; padding-right: 7px;">					
								  		<!-- <div class="col-lg-6  form-group has-success">
								  			<label class="control-label" for="inputSuccess">Last Update Sec:</label>
								    		<input class="form-control" type="text" id="lastupdatesec">
								  		</div>-->
									</div>
									<div class="row" style="padding-left: 7px; padding-right: 7px;">
										<div class="col-lg-4  form-group has-success">
								  			<label class="control-label" for="inputSuccess">Sys Contact:</label>
								    		<input class="form-control" type="text" id="syscontact">
								  		</div>
										<div class="col-lg-4  form-group has-success">
								  			<label class="control-label" for="inputSuccess">Up Time:</label>
								    		<input class="form-control" type="text" id="sysuptime">
								  		</div>
										<div class="col-lg-4  form-group has-success">
											<label class="control-label" for="inputSuccess">Last Update:</label>
								    		<input class="form-control" type="text" id="lastupdate">
								  		</div>
								  		<!-- <div class="col-lg-4 form-group has-success">
								  			<label class="control-label" for="inputSuccess">Time Column:</label>
								    		<input class="form-control" type="text" id="time_column">
								  		</div>-->
									</div>
									<div class="row" style="padding-left: 7px; padding-right: 7px;">
										<div class="col-lg-4  form-group has-success">
											<label class="control-label" for="inputSuccess">Interface Collect:</label>
								    		<input class="form-control" type="text" id="intfcollect">
								  		</div>
								  		<div class="col-lg-4  form-group has-success">
								  			<label class="control-label" for="inputSuccess">Processor Ram:</label>
								    		<input class="form-control" type="text" id="processorram">
								  		</div>
								  		<div class="col-lg-4  form-group has-success">
											<label class="control-label" for="inputSuccess">Memory Used I/O:</label>
								    		<input class="form-control" type="text" id="musedio">
								  		</div>
									</div>
									<div class="row" style="padding-left: 7px; padding-right: 7px;">
										<div class="col-lg-4  form-group has-success">
								  			<label class="control-label" for="inputSuccess">NRT:</label>
								    		<input class="form-control" type="text" id="nrt">
								  		</div>
										<div class="col-lg-4  form-group has-success">
											<label class="control-label" for="inputSuccess">Reachability:</label>
								    		<input class="form-control" type="text" id="reachability">
								  		</div>
								  		<div class="col-lg-4  form-group has-success">
								  			<label class="control-label" for="inputSuccess">Availability:</label>
								    		<input class="form-control" type="text" id="availability">
								  		</div>
									</div>
									<div class="row" style="padding-left: 7px; padding-right: 7px;">
										<div class="col-lg-6  form-group has-success">
											<label class="control-label" for="inputSuccess">Per Cpu:</label>
								    		<input class="form-control" type="text" id="per_cpu">
								  		</div>
								  		<div class="col-lg-6  form-group has-success">
								  			<label class="control-label" for="inputSuccess">Per Memory Used:</label>
								    		<input class="form-control" type="text" id="per_mused">
								  		</div>
									</div>
									<div class="row" style="padding-left: 7px; padding-right: 7px;">
										<div class="col-lg-12  form-group has-success">
								    		<div id="listInterfaces"></div>
								    		<!-- <div class="panel panel-primary">
									    		<div class="panel-heading">
									    			<a name="nodeList"></a>
											    	<i class="fa fa-list-alt fa-fw"></i> List Interface
											  	</div>
											  	
											  	<div class="panel-body" style="overflow: scroll; height: 150px;">
											  		<div id="listInterfaces"></div>
											  	</div>
											</div>	-->
								  		</div>
									</div>

									<div class="row" style="padding-left: 12px; padding-right: 7px;">
										<a class="btn btn-primary btn-sm nodeDetailViewHide" href="#" role="button" id="nodeDetailViewHide">Hide Detail &laquo;</a>
									</div>
								</div>								
						  </div>
						  <br>
						  </div>
						</div> 
						<div class="panel panel-primary">
				    		<div class="panel-heading">
						    	<i class="fa fa-bar-chart-o fa-fw"></i> Chart
						  	</div>
						  	<div class="panel-body">
						  		<div id="bgpLabel" style="font-size: 10px; width: 98%; margin-left: 1%;">
						  			<div class="row">
						  				<div class="col-lg-2">
						  					<div class="list-group">
											        <a href="#" class="list-group-item list-group-item-info">
											            <span class="glyphicon glyphicon-asterisk"></span> Idle = 0%
											        </a>								        						        
											</div>
						  				</div>
						  				<div class="col-lg-2">
											<div class="list-group">
											        <a href="#" class="list-group-item list-group-item-info">
											            <span class="glyphicon glyphicon-asterisk"></span> Connect = 20%
											        </a>								        
											</div>
						  				</div>
						  				<div class="col-lg-2">
											<div class="list-group">
											        <a href="#" class="list-group-item list-group-item-info">
											            <span class="glyphicon glyphicon-asterisk"></span> Active = 40%
											        </a>								        
											</div>
						  				</div>
						  				<div class="col-lg-2">
											<div class="list-group">
											        <a href="#" class="list-group-item list-group-item-info">
											            <span class="glyphicon glyphicon-asterisk"></span> Opensent = 60%
											        </a>								        
											</div>
						  				</div>
						  				<div class="col-lg-2">
											<div class="list-group">
											        <a href="#" class="list-group-item list-group-item-info">
											            <span class="glyphicon glyphicon-asterisk"></span> Openconfirm = 80%
											        </a>								        
											</div>
						  				</div>
						  				<div class="col-lg-2">
											<div class="list-group">
											        <a href="#" class="list-group-item list-group-item-info">
											            <span class="glyphicon glyphicon-asterisk"></span> Established = 100%
											        </a>								        
											</div>
						  				</div> 
						  			</div>
						  		</div>
						  		<a name="nodeChart"></a>
						  		<div id="containerChartPerformance"></div>
						  	</div>
				    	</div>
				    	<div class="panel panel-primary chartFirewall">
				    		<div class="panel-heading">
						    	<h3 class="panel-title">Firewall</h3>
						  	</div>
						  	<div class="panel-body">
						  		<a name="listTunelStateVPN"></a>
						  		<div id="listTunelStateVPN"></div>
						  	</div>
				    	</div>
					</div>
				  </div>

				<!-- /.row -->
					<div class="row">
					  	<div class="col-lg-12">
					  		<div class="panel panel-primary">
					    		<div class="panel-heading">
							    	<i class="fa fa-bar-chart-o fa-fw"></i> Tickets
							  	</div>
							  	<div class="panel-body">
							  		<a name="nodeChart"></a>
							  		<div id="containerTicketRangeG"></div>
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
	<script src="js/drawElementsGral.js"></script>
	<script src="js/drawElementsPerformance.js"></script>
	<script src="js/polygons.js"></script>
	
	<!-- Endpoint Properties -->
	<script src="js/cnoc/endpoint.js"></script>
	<!-- CNOC Framework -->
	<script src="js/cnoc/cnocFramework.js"></script>
	
	<!-- higcharts and highMaps -->
	
	<script type="text/javascript" src="js/highcharts.js"></script>
	<!--<script type="text/javascript" src="js/exporting.js"></script>-->
	
	<script src="js/highmap/highmaps.js"></script>
	<script src="js/highmap/modules/exporting.js"></script>
	<script src="js/highmap/mx.js"></script>
	<script src="js/highmap/statesMx.js"></script>
	
	<!-- jQuery Loadmask -->
	<script src="js/jquery-loadmask-0.4/jquery.loadmask.min.js"></script>
	<!-- google maps -->
	<script src="https://maps.googleapis.com/maps/api/js?v=3.exp"></script>
	
	<!-- remove css/js -->
	<script type="text/javascript" src="js/script.js"></script>	
	
	<!-- TREE BOOTSTRAP -->
	<script src="js/bootstrap-tree.js" /></script>
	
	<!-- EXPORT CVS ROWDATA HIGCHARTS -->
	<script src="js/export-csv.js" /></script>
	
	<!-- Datetimepicker -->
	<!--<script src="http://cdnjs.cloudflare.com/ajax/libs/moment.js/2.5.1/moment.min.js"></script>
	<script src="http://cdnjs.cloudflare.com/ajax/libs/moment.js/2.4.0/lang/en-gb.js"></script>
	<script src="http://cdnjs.cloudflare.com/ajax/libs/bootstrap-datetimepicker/3.0.0/js/bootstrap-datetimepicker.min.js"></script>	-->
	
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
			    		cnocConnector.menu = serviceMenu;
			    		cnocConnector.nmis_urls = nmis_urls;
			    		cnocConnector.logout = serviceLogout;
			    		cnocConnector.service1 = serviceR1;
			    		cnocConnector.service5 = serviceC5;
			    		cnocConnector.service9 = serviceC9;
			    		cnocConnector.service11 = serviceG1;
			    		//cnocConnector.service12 = serviceG2;
			    		cnocConnector.service13 = serviceG3;
			    		cnocConnector.service14 = serviceG4;
			    		cnocConnector.service15 = serviceG5;
			    		cnocConnector.service16 = serviceG6; // Top
			    		cnocConnector.service17 = serviceG7;
			    		cnocConnector.service18 = serviceG8;
			    		cnocConnector.service19 = serviceG9;
			    		cnocConnector.service20 = serviceG10;
			    		cnocConnector.service21 = serviceG11;
			    		cnocConnector.service22 = serviceG12;
			    		cnocConnector.service23 = serviceG13;
			    		cnocConnector.service24 = serviceG14;
			    		cnocConnector.service25 = serviceG15;
			    		cnocConnector.service26 = serviceG16;
			    		cnocConnector.service27 = serviceC1;
			    		//cnocConnector.service28 = serviceG17;
			    		cnocConnector.service29 = serviceG18;
			    		cnocConnector.service30 = serviceG19;
			    		cnocConnector.service31 = serviceG20;
			    		cnocConnector.service32 = serviceG21;
			    		cnocConnector.service33 = serviceG22;
			    		cnocConnector.service34 = serviceG23;
			    		cnocConnector.service35 = serviceG24;
			    		
			    }
			});
			
			/*** Load Enpoints services ***/
	    	endpoint.getMainProperties();
		
		 	//$( "#sortableLeft" ).sortable({revert: true});
		 	
		 	/*getStatesKeyMX*/
		 	
		 	drawElementsGral.statesMX = states;
		 	
			/*Genera Menu*/
			generateMenu();
		 	
		 	$("#bgpLabel").hide();
		 	
		 	$('#countAll').click(function() {
		 		/*** Draw complete node list ***/
				drawElementsGral.listNodes('complete');
			});
		 	
		 	$('#countReachable').click(function() {
		 		/*** Draw complete node list ***/
		 		drawElementsGral.listNodes('reachable');
			});
	
		 	$('#countDegraded').click(function() {
		 		/*** Draw complete node list ***/
		 		drawElementsGral.listNodes('degraded');
			});
		 	
		 	$('#countUnreachable').click(function() {
		 		/*** Draw complete node list ***/
		 		drawElementsGral.listNodes('unreachable');
			});
			
		 	
		 	Highcharts.setOptions({
		 		//colors: ['#reachable', '#unreachable', 'degraded']
		        colors: ['#17FF00', '#FF0202', '#FFE400']		 	
		    });
		 	
		 	drawElementsGral.init();
		 	$(".tops").on("click", function() {
		    	$(".tops").removeClass("active");
		    	$(this).addClass("active");
		    });
		    
		    /*** Start Old Top
		    $('#tCpuCountG').click(function(e){
		 		$("#headerGridsDetailG").text("Top CPU");
				cnocConnector.invokeMashup(cnocConnector.service16, {"codenet" : cnocConnector.codeNetGlobal},drawElementsGral.topGrid, "tTops", "tCpuG");			
			});
		 	
			$('#tMemoryCountG').click(function(e){
				$("#headerGridsDetailG").text("Top Memory");
				cnocConnector.invokeMashup(cnocConnector.service17, {"codenet" : cnocConnector.codeNetGlobal},drawElementsGral.topGrid, "tTops", "tMemoryG");			
			});
		    End Old Top ***/
			
			/*** Top ***/
		 	$('.topMeasure').click(function(e) {
		 		
		 		$("#tTops").show();
				$("#contenedorChartTops").hide();
		 		
		 		var currentId = $( this ).attr( 'id' );
		 		$( '#headerGridsDetailG' ).text("Top " + currentId);
				cnocConnector.invokeMashup(
						cnocConnector.service16,
						{
							"network_code" : cnocConnector.codeNetGlobal,
							"topID" : currentId
						},
						drawElementsGral.topGrid,
						"tTops",
						"tTopsTable"
					);
			});
			
			$('#listIncidentG').click(function(e){
				$("#contenedorChartTops").hide();
				$("#tTops").show();
				$("#headerGridsDetailG").text("Incident Detail");
				cnocConnector.invokeMashup(cnocConnector.service18, {"codenet" : cnocConnector.codeNetGlobal},drawElementsGral.detailIncidents, "tTops", "listIncidentG");			
			});
			
			$('#listChangesG').click(function(e){
				$("#contenedorChartTops").hide();
				$("#tTops").show();
				$("#headerGridsDetailG").text("Change Detail");
				cnocConnector.invokeMashup(cnocConnector.service27, {"code_net" : cnocConnector.codeNetGlobal,"flag_stat" : "'t'"},drawElementsGral.gridChangesList, "tTops", "changesListTableG");						
			});
			
			$('#relatedIncidents').click(function(e){
				$("#contenedorChartTops").hide();
				$("#tTops").show();
				$("#headerGridsDetailG").text("Related Tickets");
				//cnocConnector.invokeMashup(cnocConnector.service18, {"codenet" : cnocConnector.codeNetGlobal},drawElementsGral.detailIncidents, "tTops", "listIncidentG");
				cnocConnector.invokeMashup(cnocConnector.service22, {"hostname" : cnocConnector.nodeGlobal,"code_net":cnocConnector.codeNetGlobal},drawElementsGral.detailIncidentsNode, "tTops", "listIncidentGNode");
			});
			
			$('#relatedChanges').click(function(e){
				$("#contenedorChartTops").hide();
				$("#tTops").show();
				$("#headerGridsDetailG").text("Related Chages");
				//cnocConnector.invokeMashup(cnocConnector.service18, {"codenet" : cnocConnector.codeNetGlobal},drawElementsGral.detailIncidents, "tTops", "listIncidentG");
				cnocConnector.invokeMashup(cnocConnector.service23, {"hostname" : cnocConnector.nodeGlobal,"code_net":cnocConnector.codeNetGlobal},drawElementsGral.detailChangesNode, "tTops", "listChangeGNode");
			});
			
			$('#pingNS').click(function(e) {
				if (cnocConnector.nodeGlobal === '' || cnocConnector.nodeGlobal === null) {
					bootbox.alert("Please select node from Node List");
				} else {
					$( '#page-wrapper' ).mask("Waiting...");				
					cnocConnector.invokeMashup(
							cnocConnector.service30,
							{
								"network_code" : cnocConnector.codeNetGlobal,
								"hostname" : cnocConnector.nodeGlobal,
								"nmisServer" : cnocConnector.nmisServer
							},
							drawElementsGral.command,
							"commandNS",
							"pingContainerNS");
				}
			});
			
			$('#tracepathNS').click(function(e) {
				if (cnocConnector.nodeGlobal === '' || cnocConnector.nodeGlobal === null) {
					bootbox.alert("Please select node from Node List");
				} else {
					$( '#page-wrapper' ).mask("Waiting...");				
					cnocConnector.invokeMashup(
							cnocConnector.service31,
							{
								"network_code" : cnocConnector.codeNetGlobal,
								"hostname" : cnocConnector.nodeGlobal,
								"nmisServer" : cnocConnector.nmisServer
							},
							drawElementsGral.command,
							"commandNS",
							"tracepathContainerNS");
				}
			});
			
			$( '#ipAccountingNS' ).hide();
			
			$('#ipAccountingNS').click(function(e) {
				if (cnocConnector.nodeGlobal === '' || cnocConnector.nodeGlobal === null) {
					bootbox.alert("Please select node from Node List");
				} else {
					var data = {
							network_code : cnocConnector.codeNetGlobal,
							hostname : cnocConnector.nodeGlobal,
							nmisServer : cnocConnector.nmisServer,
							community1 : cnocConnector.community1,
							community2 : cnocConnector.community2,
							contactMail : null
						};
					drawElementsGral.ipAccounting(data);
				}
			});
			
			$( ".nodeDetailView").click(function(event){	
				viewNodeDetail();
			});
			
			$( ".nodeDetailViewHide").click(function(event){	
				hideNodeDetail();
			});
			
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
				drawElementsGral.builder(cnocConnector.codeNetGlobal);
			});
			
			$(".themeB").click(function(event){
				var filename = $(this).attr('rel');				
				themeChanges(filename,true);				
				Highcharts.setOptions(Highcharts.themeB);
				drawElementsGral.builder(cnocConnector.codeNetGlobal);
			});
			var refresh = setInterval(function(){
				drawElementsGral.init();
			},300000);
			
			$( '.chartFirewall' ).hide();
			
			/** Node Actions ***/
			
			/******* START Unmanaged *******/
			$( '#boxUnmanaged' ).on('hidden.bs.modal', function (e) {
				$( '#uStartDate' ).val('');
				$( '#uEndDate' ).val('');
				$( '#saveUnmanaged' ).removeAttr("disabled");				
			});
			
			$( '#boxUnmanaged' ).on('show.bs.modal', function (e) {
				if (cnocConnector.nodeGlobal === '' || cnocConnector.nodeGlobal === null) {					
					$( '#modalBodyUnmanaged' ).empty();
					$( '#modalBodyUnmanaged' ).append('<div class="alert alert-danger" role="alert">Please select node from Node List <i class="fa fa-list-alt fa-fw"></i></div>');
				} else {
					$( '#uModalLabel' ).text('Unmanaged node ' + cnocConnector.nodeGlobal);
					$( '#modalBodyUnmanaged' ).empty();
					$( '#modalBodyUnmanaged' ).append(
							'<div class="container-fluid" id="modalUnmanagedContent">' +
								'<div class="row">' +
							    	'<div class="col-lg-12">' +
										'<label>Select Date:</label>' +
										'<div class="input-daterange input-group" >' +
											'<span class="input-group-addon"><i class="glyphicon glyphicon-calendar"></i></span>' +
											'<input type="text" class="input-sm form-control" id="uStartDate" placeholder="Start Date">' +
											'<span class="input-group-addon"> to </span>' +
											'<input type="text" class="input-sm form-control" id="uEndDate" placeholder="End Date">' +
											'<span class="input-group-addon"><i class="glyphicon glyphicon-calendar"></i></span>' +
										'</div>' +
									'</div>' +
								'</div>' +
							'</div>');
					$( '#uStartDate' ).datetimepicker({
		 				format: 'DD-MMM-YYYY HH:mm:ss'
		 			});
		 			$( '#uEndDate' ).datetimepicker({
		 				format: 'DD-MMM-YYYY HH:mm:ss'
		 			});
				}
			});
			
			$( '#saveUnmanaged' ).click(function() {
				cnocConnector.invokeMashup(
						cnocConnector.service35,
						{
							"operation" : "unmanaged",
							"node" : cnocConnector.nodeGlobal,
							"start_date" : $( '#uStartDate' ).val(),
							"end_date" : $( '#uEndDate' ).val(),
							"user" : cnocConnector.userName
						},
						drawElementsGral.unmanaged,
						"unModal",
						"");
			});
			/******* END Unmanaged *******/
	});
	</script>


</body>

</html>
