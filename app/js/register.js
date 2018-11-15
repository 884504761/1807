require(["config"],function(){
	require(["jquery","header", "footer"],function($,header,footer){
		new Promise(function(resolve, reject){
			$("header").load("/html/component/header.html",function(){
				resolve();
			});
			$("footer").load("/html/component/footer.html",function(){
			});
		}).then(function(){
			header.nav();
			header.barrage(); 
			header.fix();
			header.head_search();
			try{
				header.head_cart();
			}catch(e){
				console.log("not found cookie");
			}
		}).then(function(){
			var uTrue = false;
			var pTrue = false;
			var _pTrue = false;
			$("#username").blur(function(){
				var mail = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
				var phone = /^1(?:3\d|4[4-9]|5[0-35-9]|6[67]|7[013-8]|8\d|9\d)\d{8}$/;
				var username = $("#username").val();
				if(!(phone.test(username) || mail.test(username))){
					$("#promote1").css("display","block");
					$("#promote_name").css("display","none");
					uTrue = false;
				}else{
					$("#promote1").css("display","none");
					var username = $("#username").val();
					console.log(username);
					var data = {
						username: username
					};
					$.ajax({
						method:"post",
						data: data,
						dataType:"json",
						url:"http://localhost/api/isuser.php",
						success: function(res){
							console.log(res);
							if(res.code === 1){
								//document.cookie = "login=true;path=/"; //使用cookie记录登录状态
								uTrue = true;
								$("#promote_name").css("display","none");
							}else{
								$("#promote_name").css("display","block");
							}
						}
					})
				}
			})
			$("#password").blur(function(){
				var pwd = /^(?![0-9]+$)(?![a-zA-Z]+$)(?![~!@&%$^\\(\\)#_]+$)[0-9A-Za-z~!@&%$^\\(\\)#_]{8,16}$/;
				var password = $("#password").val();
				if(!pwd.test(password)){
					$("#promote2").css("display","block");
					pTrue = false;
				}else{
					$("#promote2").css("display","none");
					pTrue = true
				}
			})
			$("#_password").blur(function(){
				var password = $("#password").val();
				var _password = $("#_password").val();
				if(password != _password){
					$("#promote3").css("display","block");
					_pTrue = false;
				}else{
					$("#promote3").css("display","none");
					_pTrue = true;
				}
			})
			$("form").submit(function(e){
				var username = $("#username").val();
				var password = $("#password").val();
				var _password = $("#_password").val();
				var span = $("promote");
				
				if(!(uTrue && pTrue && _pTrue)){
					alert("请填写正确的注册信息");
				}else{
					if($('#ck1').is(':checked') && $('#ck2').is(':checked')) {
						var data = {
							username: username,
							password: password
						};
						$.ajax({
							method:"post",
							data: data,
							dataType:"json",
							url:"http://localhost/api/insert.php",
							success: function(res){
								console.log(res);
								if(res.code === 1){
									//document.cookie = "login=true;path=/"; //使用cookie记录登录状态
									alert("注册成功");
									$.cookie("user","username:"+username,{ expires: 7 });
									$(location).attr('href', '/html/login.html');
								}else{
									alert("用户已存在");
								}
							}
						})
					}else{
						alert("请确认用户条款");
					}
				}
				console.log(username);
				e.preventDefault();
			});
		})
	})
})