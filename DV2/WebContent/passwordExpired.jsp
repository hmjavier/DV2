<%@ page language="java" contentType="text/html; charset=US-ASCII" pageEncoding="US-ASCII"%>
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
	
	<!-- jQuery Version 1.11.0 -->
	<script src="js/jquery-1.11.0.min.js"></script>
	<script src="js/jquery.i18n.properties-min-1.0.9.js"></script>
	<script src="js/chosen/chosen.jquery.min.js"></script>
	
	<!-- Bootstrap Core -->
	<script src="js/bootstrap.js"></script>
	
	<!-- Modal dialog -->
	<script type="text/javascript" src="js/bootbox.min.js"></script>
	
	<!-- LIBRERIAS CNOC -->
	<script src="js/cnocConnector.js"></script>
	<script src="js/drawElementsPasswordExpired.js"></script>
	
	<!-- jQuery Loadmask -->
	<script src="js/jquery-loadmask-0.4/jquery.loadmask.min.js"></script>
	
	<!-- remove css/js -->
	<script src="js/script.js"></script>
	
	<!-- jQuery Validation -->
	<script src="js/jquery-validation-1.13.1/jquery.validate.min.js"></script>
	<script src="js/jquery-validation-1.13.1/jquery-validate.bootstrap-tooltip.min.js"></script>
	
	<script type="text/javascript">
	
		$(document).ready(function() {
		
			jQuery.i18n.properties({
			    name:'config', 
			    path:'prop/', 
			    mode:'both',
			    callback: function() {
			    		cnocConnector.logout = serviceLogout;
			    		cnocConnector.service1 = serviceLDAP1;
			    		cnocConnector.service2 = serviceLDAP2;
			    		cnocConnector.menu = serviceMenu;
			    		cnocConnector.nmis_urls = nmis_urls;
			    }
			});
			
			/*Genera Menu*/
			generateMenu();
			
			$("#SelectCustomer").hide();
			$("#mpls_main").hide();
			
			$( '#dashboardButton').addClass("disabled");

			$( ".logout").click(function(event) {
				logout();
			});
			
			$( ".back").click(function(event) {
				home();
			});
			
			$(".themeW").click(function(event) {
				var filename = $(this).attr('rel');
				themeChanges(filename, false);
				//Highcharts.setOptions(Highcharts.themeW);
				//stylesMap = null;
				//drawElementsGral.builder(cnocConnector.codeNetGlobal);
			});
			
			$(".themeB").click(function(event) {
				var filename = $(this).attr('rel');
				themeChanges(filename,true);
				//Highcharts.setOptions(Highcharts.themeB);
				//drawElementsGral.builder(cnocConnector.codeNetGlobal);
			});
			
			/********** Validation **********/
			$.validator.addMethod ( // Contains at least one digit.
					"ContainsAtLeastOneDigit",
					function (value) { return (/[0-9]/).test(value); },
					"Your password must contain at least one digit."
				);
			
			$.validator.addMethod ( // Contains at least one capital letter.
					"ContainsAtLeastOneCapitalLetter",
					function (value) { return (/[A-Z]/).test(value); },
					"Your password must contain at least one capital letter."
				);
			
			$.validator.addMethod ( // Contains at least one lower case.
					"ContainsAtLeastOneLowerCase",
					function (value) { return (/[a-z]/).test(value); },
					"Your password must contain at least one lower case."
				);
			
			$.validator.addMethod ( // Contains at least one special character.
					"ContainsAtLeastOneSpecialCharacter",
					function (value) { return (/[\W]/).test(value); },
					"Your password must contain at least one special character."
				);
			
			$.validator.addMethod(
					"notEqualValues",
					function(value, element) { return $('#currentPassword').val() != $('#newPassword').val() },
					"Please enter a different password"
				);
			
			$.validator.addMethod(
					"NoBrackets",
					function(value, element, param) { return this.optional(element) || !param.test(value); },
					"Please do not use brackets [] {}"
				);			
			
			$.validator.addMethod(
					"NoSingleQuotes",
					function(value, element, param) { return this.optional(element) || !param.test(value); },
					"Single quotes ' not allowed"
				);
			
			$("#formPass").validate({
				rules: {
					currentPassword: {
						required: true
					},
					newPassword: {
						required: true,
						minlength: 10,
						ContainsAtLeastOneCapitalLetter: true,
						ContainsAtLeastOneDigit: true,
						ContainsAtLeastOneLowerCase: true,
						ContainsAtLeastOneSpecialCharacter: true,
						notEqualValues: true,
						NoBrackets: /[\[\]\{\}]/,						
						NoSingleQuotes: /[']/
					},
					retypedPassword: {
						required: true,
						minlength: 10,
						equalTo: "#newPassword"
					}
				},
				messages: {
					retypedPassword: {
						equalTo: "Please enter the same password again."
					}
				},
				tooltip_options: {
					currentPassword: {
						placement:'right'
					},
					newPassword: {
						placement:'right'
					},
					retypedPassword: {
						placement:'right'
					}
				},
				submitHandler: function(form) { 
					drawElementsPassword.changePassword($('#currentPassword').val(), $('#newPassword').val());					
				},
				invalidHandler: function(form, validator) {
					$("#validity_label").html('<div class="alert alert-error">There be '+validator.numberOfInvalids()+' error'+(validator.numberOfInvalids()>1?'s':'')+'!!!</div>');
				}
			});
		});
	</script>

</head>

<body>
	<div class="overlay" id="overlay" style="display: none;"></div>
	<div class="box panel panel-primary" id="box">
		<div class="panel-heading">
			<h3 id="headerGridsDetailG" class="panel-title"
				style="font-size-adjust: inherit;"></h3>
		</div>
		<a class="boxclose" id="boxclose"></a>
		<div id="tTops"></div>
	</div>
	<div id="wrapper">

		<!-- MENU  -->
		<%@ include file="menu.jsp"%>

		<div id="page-wrapper">

			<div class="container-fluid">

				<!-- /.row -->
				<div class="row">
					<div class="col-lg-12"
						style="padding-left: 20px; padding-right: 20px;">
						<div class="row">
							<div class="col-md-offset-1 col-lg-10 col-sm-10">
								<img src="css/images/banner_password.png" class="img-responsive" alt="" />												
							</div>
							<div class="col-lg-12">
								<form class="form-horizontal" id="formPass" role="form">
									<fieldset>
										<div class="form-group">											
										</div>										
										<!-- Form Name -->
										<legend>Change Password</legend>
										<div class="form-group">
											<label class="col-sm-2 control-label">Current
												password</label>
											<div class="col-sm-10">
												<input id="currentPassword" name="currentPassword"
													type="password" placeholder="current password"
													maxlength="50" size="20">
											</div>
										</div>
										<div class="form-group">
											<label for="inputPassword3" class="col-sm-2 control-label">New
												password</label>
											<div class="col-sm-10">
												<input id="newPassword" name="newPassword" type="password"
													placeholder="new password" maxlength="50" size="20">
											</div>
										</div>
										<div class="form-group">
											<label for="inputPassword3" class="col-sm-2 control-label">Retype
												password</label>
											<div class="col-sm-10">
												<input id="retypedPassword" name="retypedPassword"
													type="password" placeholder="retype password"
													maxlength="50" size="20">
											</div>
										</div>
										<div class="form-group">
											<div class="col-sm-offset-2 col-sm-10">
												<div class="span5" id="validity_label"></div>
												<input id="changePwdButton" type="submit"
													class="btn btn-success glyphicon glyphicon-floppy-disk"
													value="&nbsp;Change" />
											</div>
										</div>
									</fieldset>
								</form>
							</div>
						</div>
					</div>
				</div>
				<!-- /.row -->
			</div>
			<%@ include file="footer.jsp"%>
			<!-- /.container-fluid -->
		</div>
		<!-- /#page-wrapper -->
	</div>
	<!-- /#wrapper -->
</body>
</html>
