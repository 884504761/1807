require(["config"],function(){
	require(["jquery","header", "footer","jquery-cookie"],function($,header,footer){
		new Promise(function(resolve, reject){
			$("header").load("/html/component/header.html",function(){
				resolve();
			});
			$("footer").load("/html/component/footer.html",function(){
			});
		}).then(function(){
			header.nav();
			header.barrage(); 
			header.head_search();
			header.fix();
			try{
				header.head_cart();
			}catch(e){
				console.log("not found cookie");
			}
		}).then(function(){
			var getcookie = $.cookie("data");
			var getuser = $.cookie("user");
			//如果存在cookie
			if(getuser){
				console.log(getuser);
				var obj = {};
				var arr = getuser.split(":");
				console.log(arr);
				$("#username").val(arr[1]);
			}
			if(getcookie){
				var obj = {};
				var arr = getcookie.split(",");
				//将字符串转换为对象
				for(var i in arr){
					var item = arr[i].split(":");
					//item[0]是属性名,item[1]是属性值
					obj[item[0]] = item[1];
				}
				$("#username").val(obj.username);
				$("#password").val(obj.password);
			};
// 			$(".btn_login").click(function(){
// 				username = $("#username").val();
// 				password = $("#password").val();
// 				console.log(username);
// 				var data = {
// 					username: username,
// 					password: password
// 				};
// 				$.ajax({
// 					method:"post",
// 					data: data,
// 					dataType:"json",
// 					url:"http://localhost/api/login.php",
// 					success: function(res){
// 						console.log(res);
// 						//如果返回值为1，就代表登录成功
// 						if(res.code === 1){
// 							alert("登录成功");
// 							$.cookie("username",username,{path:"/"});
// 							//判断checkbox是否勾选
// 							if($('#remb').is(':checked')){
// 								data = JSON.stringify(data);
// 								$.cookie("data","username:"+username+",password:"+password,{ expires: 7 });
// 							}
// 							$(location).attr('href', '/');
// 						}else{
// 							alert("用户名或者密码错误");
// 						}
// 					}
// 				})
// 			})
			//触发form表单提交事件
			$("form").submit(function(e){
				var username = $("#username").val();
				var password = $("#password").val();
				console.log(username);
				var data = {
					username: username,
					password: password
				};
				$.ajax({
					method:"post",
					data: data,
					dataType:"json",
					url:"http://localhost/api/login.php",
					success: function(res){
						console.log(res);
						//如果返回值为1，就代表登录成功
						if(res.code === 1){
							alert("登录成功");
							$.cookie("username",username,{path:"/"});
							//判断checkbox是否勾选
							if($('#remb').is(':checked')){
								data = JSON.stringify(data);
								$.cookie("data","username:"+username+",password:"+password,{ expires: 7 });
							}
							$(location).attr('href', '/');
						}else{
							alert("用户名或者密码错误");
						}
					}
				})
				e.preventDefault();
			})
		
		})
	})
})