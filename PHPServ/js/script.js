
var last_pid = 0;

//alert(last_pid);

function logout() {
	window.localStorage.clear();
	change_page('index');
}

function kset(key, value) {
	window.localStorage.setItem(key, value);
}

function kget(key) {
	return window.localStorage.getItem(key);
}

function kremove(key) {
	window.localStorage.removeItem(key);
}



function check_token() {
	$.post('http://' + kget('op_domain') + '/index.php?c=user&a=user_verify', {
		'token': kget('op_token')
	}, function(data) {
		var data_obj = jQuery.parseJSON(data);
		if (parseInt(data_obj.err_code) != 0) {
			alert('授权过期，请重新登录');
			change_page('index');
		} else {
			console.log(data_obj);
			// update picture and cover
			// not work on android and iPhone, why?
			if (data_obj.data.cover.length > 0) {
				$('#cover').css('background-image', 'url(' + data_obj.data.cover + ')');
				$('#cover').css('background-repeat', 'no-repeat');
			}
			//alert( data_obj.data.picture );
			if (data_obj.data.picture.length > 0)
				$('#cover_icon').css('background-image', 'url(' + data_obj.data.picture + ')');

			$('#cover_time').html(data_obj.data.refresh_time);

			kset('op-cache-user', data);

			// load path info
			load_path_cache();
		}
	});
}




function login() {
	/*if ($('#email').val() == '') {
		alert("Email不能为空");
		return false;
	}
	if ($('#password').val() == '') {
		alert("密码不能为空");
		return false;
	}*/

	var md5Pwd = kget('op_password')?kget('op_password'):hex_md5($('#pwd').val());

	// 'http://' +  $('#domain').val() + '/?m=api&a=get_token'
	//alert('http://' + kget('op_domain') + '/index.php?c=user&a=get_token');

	if ($('#username').val() == '' || $('#username').val() == null) {
		alert('请填写用户名！');
		return false;
	}
	if ($('#pwd').val() == '' || $('#pwd').val() == null) {
		alert('请填写密码！');
		return false;
	}

	$("#frmRegister .form-signin-heading").text('登入中...');

	//alert(kget('op_password')?kget('op_password'):hex_md5($('#pwd').val()));
	//alert(kget('op_domain'));
	//
	//alert(kget('op_password')+'---'+$('#username').val()+'---'+device.uuid);

	$.ajax({
	    type:"post",
	    //async:false,
	    url:'http://' + kget('op_domain') + '/checkin/lp.php?c=user&a=get_token',
	    data:{
			username: $('#username').val(),
			pwd: md5Pwd,
			celluuid: 'A35AFD5C8-E9EB-4FFE-9E0B-410ABDD32FA4' //device.uuid 
			/*==============================Important!!!==================================
			device.uuid加上后会导致不能自动登录，原因待查？
			调用device.uuid时，phonegap的本地API还没初始化完毕的问题。可以等phonegap的所有本地api都已准备好后再调用。
			解决方法：使用deviceready事件通知应用，设备已经就绪，phonegap的所有本地api都已准备好再调用。
			================================Important!!!==================================*/
		},
		//timeout:3000,
		//dataType:"jsonp", //如果dataType:"json"已经指定,就不能再执行下面的$.parseJSON(data);相当于对json再次解析
		//jsonp:"callback",
	    success:function(data, textStatus, jqXHR) {

			//alert("hello");

			//alert('http://' + kget('op_domain') + '/index.php?c=user&a=get_token');

			//console.dir(data);
			//console.dir(textStatus);
			//console.dir(jqXHR);
			//alert(textStatus + "\n" + jqXHR);

			//alert('http://' + kget('op_domain') + '/index.php?c=user&a=get_token');
			//alert( data );
			var data = $.parseJSON(data);

			//alert('http://' + kget('op_domain') + '/index.php?c=user&a=get_token');

			if (data.err_code != 0) {
				// 
				//alert(kget('op_password'));
				alert(data.err_msg);
				$("#frmRegister .form-signin-heading").text('请登录');
				if (kget('op_username') != null) $('#username').val(kget('op_username'));
				kremove('op_password');
				$("#pwd").val('');
			} 
			else {
				if($('#remember').attr("checked") == "checked") {
					// save token and info , redirect to path.html	
					//kset('op_domain', $('#domain').val());
					kset('op_password', data.data.password);
					//kset('op_uid', data_obj.data.uid);
					
				}
				//alert(data.data.token+"-----"+data.data.username+"====="+data.data.password);
				kset('op_username', data.data.username);
				kset('op_token', data.data.token);
				change_page('scanner');
			}
		},
	    error:function(jqXHR, textStatus, errorThrown){
	    	//console.dir(jqXHR);
			//console.dir(textStatus);
			//console.dir(errorThrown);
			$("#frmRegister .form-signin-heading").text('请登录');
			alert("请检查网络！");
			kget('op_password')?$("#pwd").val(kget('op_password')):$("#pwd").val('');;
	    }
	});



	/*$.post( 'http://' + kget('op_domain') + '/checkin/lp.php?c=user&a=get_token', {
		username: $('#username').val(),
		pwd: md5Pwd
	}, function(data) {

		//alert("hello");
		console.log(data);

		//alert( data );
		//var data_obj = $.parseJSON(data); //如果dataType:"json"已经指定,就不能再执行本语句,相当于对json再次解析

		if (data.err_code != 0) {
			// 
			//alert(kget('op_password'));
			alert('错误的用户名或者密码，请重试！');
			$("#frmRegister .form-signin-heading").text('请登录');
			$("#pwd").val('');
			kremove('op_password');
		} else {
			//
			if ( data.data.token.length < 4 ) {
				alert('服务器忙，请稍后重试~' + data.data.token);
			}
			else {
				if($('#remember').attr("checked") == "checked") {
					// save token and info , redirect to path.html	
					//kset('op_domain', $('#domain').val());
					
					kset('op_username', data.data.username);
					kset('op_password', data.data.password);

					//kset('op_uid', data_obj.data.uid);
					kset('op_token', data.data.token);
				}
			//alert(data.data.token+"-----"+data.data.username+"====="+data.data.password);
			change_page('scanner');
			}
		}
	},"json");*/
}

function register() {
	/*if ($('#email').val() == '') {
		alert("Email不能为空");
		return false;
	}
	if ($('#password').val() == '') {
		alert("密码不能为空");
		return false;
	}*/

	if ($('#username').val() == '' || $('#username').val() == null) {
		alert('请填写用户名！');
		return false;
	}
	if ($('#pwd').val() == '' || $('#pwd').val() == null) {
		alert('请填写密码！');
		return false;
	}
	if ($('#pwd-again').val() == '' || $('#pwd-again').val() == null || $('#pwd-again').val() != $('#pwd').val()) {
		alert('请确保密码一致！');
		return false;
	}
	if ($('#name').val() == '' || $('#name').val() == null) {
		alert('请填写姓名！');
		return false;
	}

	$("#frmRegister .form-signin-heading").text('正在注册...');

	// 'http://' +  $('#domain').val() + '/?m=api&a=get_token'
	//alert('http://' + kget('op_domain') + '/index.php?c=user&a=get_token');

	//var md5Pwd = hex_md5($('#pwd').val());
	//var md5Pwd_repeat = hex_md5($('#pwd-again').val());

	//alert(kget('op_password')?kget('op_password'):hex_md5($('#pwd').val()));
	//alert(kget('op_domain'));
	//
	//alert(kget('op_password')+'---'+$('#username').val()+'---'+device.uuid);

	$.ajax({
	    type:"post",
	    //async:false,
	    url:'http://' + kget('op_domain') + '/checkin/lp.php?c=user&a=register',
	    data:{
			username: $('#username').val(),
			pwd: $('#pwd').val(),
			confirmpwd: $('#pwd-again').val(),
			name: $('#name').val(),
			mobi: $('#mobi').val(),
			email: $('#email').val(),
			celluuid: 'A35AFD5C8-E9EB-4FFE-9E0B-410ABDD32FA4' //device.uuid 
			/*==============================Important!!!==================================
			device.uuid加上后会导致不能自动登录，原因待查？
			调用device.uuid时，phonegap的本地API还没初始化完毕的问题。可以等phonegap的所有本地api都已准备好后再调用。
			解决方法：使用deviceready事件通知应用，设备已经就绪，phonegap的所有本地api都已准备好再调用。
			================================Important!!!==================================*/
		},
		//timeout:3000,
		dataType:"json", //如果dataType:"json"已经指定,就不能再执行下面的$.parseJSON(data);相当于对json再次解析
		//jsonp:"callback",
	    success:function(data, textStatus, jqXHR) {

			//alert("hello");

			//alert('http://' + kget('op_domain') + '/index.php?c=user&a=get_token');

			//console.dir(data);
			//console.dir(textStatus);
			//console.dir(jqXHR);
			//alert(textStatus + "\n" + jqXHR);

			//alert('http://' + kget('op_domain') + '/index.php?c=user&a=get_token');
			//alert( data );
			//var data = $.parseJSON(data);

			//alert('http://' + kget('op_domain') + '/index.php?c=user&a=get_token');

			if (data.err_code != 0) {
				// 
				//alert(kget('op_password'));
				alert(data.err_msg);
				$("#frmRegister .form-signin-heading").text('重新输入');
				$("#pwd").val('');
				$("#pwd-again").val('');
			} 
			else {
				$("#frmRegister .form-signin-heading").text('注册成功，请登录');
				$("#frmRegister").attr("action","javascript:login();void(0);");
				$(".pwd-again").removeAttr("required");
				$(".login").toggleClass("hidden");
				$(".reg").toggleClass("hidden");
				$(".remember-me").toggleClass("invisible");
				$(".pwd").toggleClass("bottom-radius");
				$("#pwd").val('');
				$("#pwd-again").val('');
				$('#name').val('');
				$('#mobi').val('');
				$('#email').val('');
			}
		},
	    error:function(jqXHR, textStatus, errorThrown){
	    	//console.dir(jqXHR);
			//console.dir(textStatus);
			//console.dir(errorThrown);
			$("#frmRegister .form-signin-heading").text('超时重试');
			alert("请检查网络！！");
			$("#pwd").val('');
			$("#pwd-again").val('');
	    }
	});
}

function change_page(page) {
	location = page + '.html';
}

function change_card(cid) {
	op_change(cid, 'card');
}

function change_tab(tid) {
	op_change(tid, 'tab');
}

function op_change(id, name) {
	$(".op-" + name).each(function(index, value) {
		if ($(this).attr('id') == id) {
			$(this).addClass('cur');
		} else {
			$(this).removeClass('cur');
		}
	});
}
