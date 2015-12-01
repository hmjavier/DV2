<body>
	
	<!-- Navigation -->
        <nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">
        	 
        	<div class="navbar-header">
                <!-- <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-ex1-collapse">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>-->
                <img alt="" src="css/images/logo.png" height="50px">
            </div>
            
            <!-- Brand and toggle get grouped for better mobile display -->
            <div class="navbar-header" style="margin-left: 2%;">
				<div id="cmbCliente">
					</br>
					<select id="SelectCustomer" data-placeholder="Select Customer" style="width:80%" tabindex="1"></select>
				</div>      
            </div>  
            <ul class="nav navbar-right top-nav">            	
                <li class="dropdown">
                    <a href="#" class="btn btn-primary" data-toggle="dropdown"><i class="fa fa-dashboard"></i> Dashboards <b class="caret"></b></a>
                    <ul class="dropdown-menu menuCnoc">
                        <!-- 
	                    <li>
	                        <a href="performanceGraph.jsp"><i class="fa fa-fw fa-bar-chart-o"></i> Get Charts </a>
	                    </li>-->
                    
                    </ul>
                </li>
                <li class="dropdown">
                    <a href="#" class="btn btn-primary" data-toggle="dropdown"><i class="fa fa-user nameCustomer"></i><b class="caret"></b></a>
                    <ul class="dropdown-menu">
                        <!-- <li>
                            <a href="#" class="back textColor"><i class="fa fa-fw fa-home"></i> Home</a>
                        </li>-->
                        <li>
                            <a href="#" class="logout textColor"><i class="fa fa-fw fa-power-off"></i> Log Out</a>
                        </li>
                    </ul>
                </li>
            </ul>                         
        </nav>
        <nav class="navbar navbar-inverse">
        	<!-- Top Menu Items -->
            <ul class="nav navbar-right top-nav">  
    			<li class="dropdown">
                    <a href="#" class="btn btn-primary" data-toggle="dropdown"><i class="fa "></i> Theme <b class="caret"></b></a>
                    <ul class="dropdown-menu" id="navTheme">
                        <li>
	                        <a href="#" class="themeW" rel="css/bootstrapW.css"><i class="fa fa-fw "></i> White </a>
	                    </li>
	                    <li>
	                        <a href="#" class="themeB" rel="css/bootstrap.css"><i class="fa fa-fw "></i> Black </a>
	                    </li>
                    </ul>
                </li>
                <li>
                	<div id="nmisUrlMain">
						<div id="mpls_main">
							<select data-placeholder="MPLS ..." id="mpls_select_main" style="width: 220px;" tabindex="2">
								<option value=""></option>
							</select>
						</div>			
						<div id="internet_main">
							<select data-placeholder="Internet ..." id="internet_select_main" style="width: 220px;" tabindex="2">
								<option value=""></option>
							</select>
						</div>
					</div>
                </li>                
            </ul>
            <!-- /.navbar-collapse -->            
        </nav>
</body>
</html>