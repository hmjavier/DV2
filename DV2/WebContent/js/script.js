function removejscssfile(filename, filetype){
				 var targetelement=(filetype=="js")? "script" : (filetype=="css")? "link" : "none" //determine element type to create nodelist from
				 var targetattr=(filetype=="js")? "src" : (filetype=="css")? "href" : "none" //determine corresponding attribute to test for
				 var allsuspects=document.getElementsByTagName(targetelement)
				 for (var i=allsuspects.length; i>=0; i--){ //search backwards within nodelist for matching elements to remove
				  if (allsuspects[i] && allsuspects[i].getAttribute(targetattr)!=null && allsuspects[i].getAttribute(targetattr).indexOf(filename)!=-1)
				   allsuspects[i].parentNode.removeChild(allsuspects[i]) //remove element by calling parentNode.removeChild()
				}
			}
				 
function loadjscssfile(filename, filetype){
				 if (filetype=="js"){ //if filename is a external JavaScript file
				  var fileref=document.createElement('script');
				  fileref.setAttribute("type","text/javascript");
				  fileref.setAttribute("src", filename);
				 }
				 else if (filetype=="css"){ //if filename is an external CSS file
				  var fileref=document.createElement("link");
				  fileref.setAttribute("rel", "stylesheet");
				  fileref.setAttribute("type", "text/css");
				  fileref.setAttribute("href", filename);
				 }
				 if (typeof fileref!="undefined")
				  document.getElementsByTagName("head")[0].appendChild(fileref);
}

function modelView(){
	  
	  jQuery('#overlay').fadeIn('fast',function(){
	    jQuery('#box').animate({'top':'50px'},500,function(){
	      
	      
	    });
	  });
	  jQuery('#boxclose').click(function(){
	    jQuery('#box').animate({'top':'-800px'},500,function(){
	      jQuery('#overlay').fadeOut('500');
	      $(".tops").removeClass("active");
	    });
	  });
	  
	}

function logout(){
	
	bootbox.confirm("<h3>Exit Dashboard CNOC</h3><br>Are you sure?", function(result) {
		if(result){
			$.ajax({
		        type: 'GET',
		        dataType: 'jsonp',
		        url: cnocConnector.logout,
		        error: function (jqXHR, textStatus, errorThrown) {
		            console.log(jqXHR);
		            window.location = "index.html";
		        },
		        success: function(response){
		        	window.location = "index.html";	
		        }
			});	
		}
	});	
}

function home(){
	window.location = "main.jsp";
}

function themeChanges(filename, flag){	
	removejscssfile("css/sb-admin.css", "css");
	loadjscssfile(filename, "css");
	loadjscssfile("css/sb-admin.css", "css");
	
	if(flag){
		removejscssfile("css/bootstrapW.css", "css");
		loadjscssfile("js/highChartsTheme1.js", "js");
	}else{
		removejscssfile("css/bootstrap.css", "css");
		removejscssfile("js/highChartsTheme1.js", "js");
	}
	
}

function generateMenu(){
	$(".menuCnoc").empty();

	$.ajax({
        type: 'GET',
        dataType: 'jsonp',
        url: cnocConnector.menu,
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
        },
        success: function(response){
        	var menu = response.aut.module[2].split(";");
        	cnocConnector.userName = response.aut.module[0];
        	
        	$(".nameCustomer").text(cnocConnector.userName);
        	
        	$.each(menu, function( index, value ) {
        		if(value === "gen=true"){
        			var general = "<li><a href='main.jsp'><i class='fa fa-fw fa-home'></i> Home </a></li>";
        			general +="<li><a href='incidents.jsp'><i class='fa fa-fw fa-warning'></i> Incidents </a></li>";
        			general +="<li><a href='changes.jsp'><i class='fa fa-fw fa-refresh'></i> Changes </a></li>";
        			general +="<li><a href='performance.jsp'><i class='fa fa-fw fa-bar-chart-o'></i> Performance </a></li>";
        			general +="<li><a href='performanceGraph.jsp'><i class='fa fa-fw fa-bar-chart-o'></i> Performance Report </a></li>";
        			general +="<li><a href='ftp://ftp.cnoc.telmexit.com/'><i class='fa fa-fw fa-folder-open'></i> Reports </a></li>";
        			
        			/*** ABC Load ***/
        			//general +="<li><a href='http://dashboarddev.cnoc.telmexit.com:8080/abcConfig/mainCap.jsp'><i class='fa fa-fw fa-folder-open'></i> Alta CAP (ABC Config) </a></li>";
                   	//general +="<li><a href='http://dashboarddev.cnoc.telmexit.com:8080/abcConfig/mainTest.jsp'><i class='fa fa-fw fa-folder-open'></i> INBOX (ABC Config) </a></li>";
                   	/****************/
        			
        			$(".menuCnoc").append(general);

        		}else if(value === "tck=true"){
        			var tickets = "<li><a href='tickets.jsp'><i class='fa fa-tags'></i> Tickets </a></li>";
        			$(".menuCnoc").append(tickets);
        			
        		}else if(value === "inv=true"){
        			var inventory = "<li><a href='inventory.jsp'><i class='fa fa-fw fa-list-alt'></i> Inventory </a></li>";
        			$(".menuCnoc").append(inventory);
        			
        		}else if(value === "esc=true"){
        			var esclations = "<li><a href='escalation.jsp'><i class='fa fa-fw fa-cloud-upload'></i> Escalaciones </a></li>";
        			$(".menuCnoc").append(esclations);
        			
        		}else if(value === "nagios=true"){
        			var nagios = "<li><a href='http://201.144.8.140/nagios/'><i class='fa fa-fw fa-cloud-upload'></i> Nagios </a></li>";
        			$(".menuCnoc").append(nagios);
        			
        		}else if(value === "sct=true"){
        			var general = "<li><a href='mainsct.jsp'><i class='fa fa-fw fa-home'></i> SCT MORELOS </a></li>";
        			general +="<li><a href='incidentssct.jsp'><i class='fa fa-fw fa-warning'></i> Incidents </a></li>";
        			
        			$(".menuCnoc").append(general);
        			
        		}else if(value === "incidentsReport=true"){
        			var incidentsReport = "<li><a href='incidentsReport.jsp'><i class='fa fa-fw fa-list'></i> Incidents Report </a></li>";
        			$(".menuCnoc").append(incidentsReport);
        		
        		}else if(value === "perf=false"){
        			var general = "<li><a href='main.jsp'><i class='fa fa-fw fa-home'></i> Home </a></li>";
        			general +="<li><a href='incidents.jsp'><i class='fa fa-fw fa-warning'></i> Incidents </a></li>";
        			general +="<li><a href='changes.jsp'><i class='fa fa-fw fa-refresh'></i> Changes </a></li>";
        			general +="<li><a href='performance.jsp'><i class='fa fa-fw fa-bar-chart-o'></i> Performance </a></li>";
        			general +="<li><a href='ftp://ftp.cnoc.telmexit.com/'><i class='fa fa-fw fa-folder-open'></i> Reports </a></li>";
            			
        			$(".menuCnoc").append(general);
        			
        		}else if(value === "sisatck=true"){
        			var sisatck = "<li><a href='sisatck.jsp'><i class='fa fa-fw fa-tag'></i> Tickets SISA </a></li>";
        			$(".menuCnoc").append(sisatck);
        			
        		}else if(value === "elara=true"){
        			var sisatck = "<li><a href='https://201.131.60.39:8098' target='_blank'><i class='fa fa-bar-chart-o'></i> ELARA </a></li>";
        			$(".menuCnoc").append(sisatck);
        		}
        	});
        	
        	$(".menuCnoc").append("<li><a href='pages/search.html'><i class='fa fa-fw fa-search'></i> Advanced Search </a></li>");
        	$(".menuCnoc").append("<li><a href='password.jsp'><i class='fa fa-fw fa-lock'></i> Change Password </a></li>");
        	
        	/** Load NMIS URLs **/
        	$( '#mpls_select_main' ).append(
					'<option value="http://180.176.146.196/cgi-nmis8/access-santander.pl?">SUCURSALES</option>'
				);
        	$( '#mpls_select_main' ).append(
					'<option value="http://180.176.146.203/cgi-nmis8/access-santander.pl?">CAJEROS </option>'
				);
        	
        	$( '#internet_select_main' ).append(
					'<option value="http://nmis-santander-sucursales.cnoc.telmexit.com:1058/cgi-nmis8/access-santander-sucursales.pl?">SUCURSALES</option>'
				);
        	
        	$( '#mpls_select_main' ).chosen({allow_single_deselect : true}).change(function() {					
				if ( $(this).val() != '' ) {
					window.open( $(this).val() );
				}
			});
        	
        	$( '#internet_select_main' ).append(
					'<option value="http://nmis-santander-cajeros.cnoc.telmexit.com:1055/cgi-nmis8/access-santander-cajeros.pl?">CAJEROS</option>'
				);
        	
        	$( '#internet_select_main' ).chosen({allow_single_deselect : true}).change(function() {
				if ( $(this).val() != '' ) {
					window.open( $(this).val() );
				}
			});
        	
        	/*
			cnocConnector.invokeMashup(cnocConnector.nmis_urls, {},  function (datos) {				
				try {
					if(datos.records.record.length>1) {
						$.each(datos.records.record, function(k, v) {
							if (v.url_nmis != '') {
								if (v.url_nmis.indexOf("\n") > 0) {
									var nmis = v.url_nmis.split("\n");
									$.each(nmis, function(m, n){
										var string = n.split("/");
										var text = string[2].split(".");
										var tmp = text[0].split("-");
										
										var name = "";
										if(tmp[0] === "opflow"){
											name =  (tmp[0]+ "-" +tmp[1]+ "-" + tmp[2]).toUpperCase();
										}else{
											name =  (tmp[1]+ " " + tmp[2]).toUpperCase();
										}
										//var name = (tmp[1] + " " + tmp[2]).toUpperCase();
										
										$( '#mpls_select_main' ).append(
												'<option value="' + n + '">' + name + '</option>'
											);
									});
								} else {
									$( '#mpls_select_main' ).append(
											'<option value="' + v.url_nmis + '">' + v.dept_name + '</option>'
										);
								}							
							}
							if (v.url_nmis_internet != ''){
								
								if (v.url_nmis_internet.indexOf("\n") > 0) {
									var nmis = v.url_nmis_internet.split("\n");
									$.each(nmis, function(m, n){
										
										var string = n.split("/");
										var name = "";
										
										if(string[2].indexOf("opflow")>-1){
											var tmp =  string[2].split(".");
											name = tmp[0].toUpperCase();
										}else{
											name = "IDE - " + v.dept_name.toUpperCase();
										}	

										$( '#internet_select_main' ).append(
												'<option value="' + n + '">' + name+ '</option>'
											);
									});
								} else {
									$( '#internet_select_main' ).append(
											'<option value="' + v.url_nmis_internet + '">' + v.dept_name + '</option>'
										);
								}
								
							}
								
						});
						
						$( '#mpls_select_main' ).chosen({allow_single_deselect : true}).change(function() {					
							if ( $(this).val() != '' ) {
								window.open( $(this).val() );
							}
						});
						
						$( '#internet_select_main' ).chosen({allow_single_deselect : true}).change(function() {
							if ( $(this).val() != '' ) {
								window.open( $(this).val() );
							}					
						});
					} else {					

						if (datos.records.record.url_nmis != '') {
							if (datos.records.record.url_nmis.indexOf("\n") > 0) {
								var nmis = datos.records.record.url_nmis.split("\n");
								$.each(nmis, function(m, n){
									var string = n.split("/");
									var text = string[2].split(".");
									var tmp = text[0].split("-");
									var name = "";
									if(tmp[0] === "opflow"){
										name =  (tmp[0]+ "-" +tmp[1]+ "-" + tmp[2]).toUpperCase();
									}else{
										name =  (tmp[1]+ " " + tmp[2]).toUpperCase();
									}

									$( '#mpls_select_main' ).append(
											'<option value="' + n + '">' + name + '</option>'
										);
								});
							} else {
								$( '#mpls_select_main' ).append(
										'<option value="' + datos.records.record.url_nmis + '">' + datos.records.record.dept_name + '</option>'
									);
							}
							
							$( '#mpls_select_main' ).chosen({allow_single_deselect : true}).change(function() {					
								if ( $(this).val() != '' ) {
									window.open( $(this).val() );
								}
							});
						
						} else {
							$( '#mpls_main' ).empty();						
						}

						if (datos.records.record.url_nmis_internet != '') {
							var url_nmis = datos.records.record;
							
							if (url_nmis.url_nmis_internet.indexOf("\n") > 0) {
								var nmis = url_nmis.url_nmis_internet.split("\n");
								$.each(nmis, function(m, n){
									
									var string = n.split("/");
									var name = "";
									
									if(string[2].indexOf("opflow")>-1){
										var tmp =  string[2].split(".");
										name = tmp[0].toUpperCase();
									}else{
										name = "IDE - " + url_nmis.dept_name.toUpperCase();
									}	

									$( '#internet_select_main' ).append(
											'<option value="' + n + '">' + name+ '</option>'
										);
								});
							} else {
								$( '#internet_select_main' ).append(
										'<option value="' + url_nmis.url_nmis_internet + '">' + datos.records.record.dept_name + '</option>'
									);
							}
							
							$( '#internet_select_main' ).chosen({allow_single_deselect : true}).change(function() {
								if ( $(this).val() != '' ) {
									window.open( $(this).val() );
								}					
							});
							
						} else {
							$( '#internet_main' ).empty();
						}
					}
				} catch(err) {
					$( '#mpls_select_main' ).hide();
					$( '#internet_main' ).hide();
					console.log(err);
				}

			},"","");
			*/
        }
	});
}

function viewNodeDetail(){
	$(".detalleNodo").show();
	$(".nodeDetailView").hide();
}

function hideNodeDetail(){
	$(".detalleNodo").hide();
	$(".nodeDetailView").show();
}


$('.leermas.imprimir').click(function(){
	$(".startDatePdf").empty();
	$(".endDatePdf").empty();
	$(".startDatePdf").append("Start Date: "+$("#startDate").val());
	$(".endDatePdf").append("End Date: "+$("#endDate").val());	
	$(".dateRange").hide();
	$(".selectMetric").hide();
	$(".headerCharts").hide();
	$(".portada").show();
	window.print();
	$(".portada").hide();
	$(".dateRange").show();
	$(".selectMetric").show();
	$(".headerCharts").show();
});