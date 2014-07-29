$(document).ready(function() {

	//alert(last_pid);
	//var last_pid = 0;
	
	//app.initialize();

	$("#register").click(function() {
		$("#frmRegister").attr("action","javascript:register();void(0);");
		$(".pwd-again").attr("required","required");
		$(".login").toggleClass("hidden");
		$(".reg").toggleClass("hidden");
		$(".remember-me").toggleClass("invisible");
		$(".pwd").toggleClass("bottom-radius");
		$("#frmRegister .form-signin-heading").text('请注册');
		$('#username').val('');
		$('#pwd').val('');
	});

	$("#back2login").click(function() {
		$("#frmRegister").attr("action","javascript:login();void(0);");
		$(".pwd-again").removeAttr("required");
		$(".login").toggleClass("hidden");
		$(".reg").toggleClass("hidden");
		$(".remember-me").toggleClass("invisible");
		$(".pwd").toggleClass("bottom-radius");
		$("#frmRegister .form-signin-heading").text('请登录');
		if (kget('op_password') != null) $('#pwd').val(kget('op_password'));
		$('#pwd').val('');
		$('#pwd-again').val('');
		$('#name').val('');
		$('#mobi').val('');
		$('#email').val('');
	});
	$(":checkbox").click(function() {
		 $(this).attr("checked")?$(this).removeAttr("checked"):$(this).attr("checked","checked");
	});

	/*==============================Important!!!==================================
	The equivalent events are: 
	jQuery: $(document).ready() 
	jQueryMobile: $(document).bind('pageinit') 
	PhoneGap: document.addEventListener("deviceready", ...) 
	You are probably not waiting for all 3 to be ready. When jQueryMobile pageinit is fired, both jQuery and jQueryMobile should be ready then. DeviceReady event is fired when PhoneGap device is ready. 
	As Julio (almost) suggested, bind deviceready in the PAGEINIT event, and you will be assured that all 3 frameworks are ready.
	================================Important!!!==================================*/
	document.addEventListener('deviceready', onDeviceReady, false); 

	//alert(window.location.href);
	//alert(window.location.protocol);
	//alert(window.location.host);

	//if (kget('op_domain') != null) $('#domain').val(kget('op_domain'));
	//kset('op_domain', 'http://' + window.location.host + '/checkin');
	$("#ipaddr").click(function(){
		kset('op_domain', $('#servaddr').val());
	});
	
	
	//alert(kget('op_domain'));
	if (kget('op_username') != null) $('#username').val(kget('op_username'));
	if (kget('op_password') != null) $('#pwd').val(kget('op_password'));
	//alert($('#password').val());
	
	function onDeviceReady() {
		if (kget('op_domain') != null && kget('op_username') != null && kget('op_password') != null && kget('op_password') != '') {
			//console.log("login()");
			//alert(kget('op_password'));
			login();
		}
		$('#register').removeClass('disabled');
	}
	

	$('#register').removeClass('disabled');
	//alert(last_pid);
});
