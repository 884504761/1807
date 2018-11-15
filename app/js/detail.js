require(["config"],function(){
	require(["jquery","header","footer","tabs","template","magnifier","jquery-cookie"],function($,header,footer,tabs,template,magnifier){
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
			header.isLogin();
			header.head_search();
			try{
				header.head_cart();
			}catch(e){
				console.log("not found cookie");
			}
		}).then(function(){
			var id = location.search.slice(1);
			console.log(id);
			$("#describe-title1 ._title").click(function(e){
				$("#describe-main").slideToggle("slow");
				$(this).addClass("ac").siblings().removeClass("ac");
			});
			$("#describe-title2 ._title").click(function(e){
				$("#size-specification").slideToggle("slow");
				$(this).addClass("ac").siblings().removeClass("ac");
			});
			$.ajax({
				method: "get",
				url:"http://rap2api.taobao.org/app/mock/115083/products?"+id,
				success: function(res){
					console.log(res);
					var html = template("pro-template",{products: res.products});
					$("#proList").html(html);
					console.log("延时");
					tabs.show();
				}
			}).then(function(){
				var id = location.search.slice(1);
				console.log(id);
				$("#add").click(function(){
					$("#_num").val(parseInt($("#_num").val())+1);
				});
				$("#res").click(function(){
					var index = parseInt($("#_num").val());
					if(index > 1){
						$("#_num").val(--index);
					}
				})
				$(".change_size").on("click","li",function(){
					$(this).addClass("this_size").siblings().removeClass("this_size");
				})
				$("#addCar").click(function(){
					var arr = [];
					var pic = $("#first_pic")[0].src;
					var name = $("#name").html();
					var size = $(".change_size").find(".this_size").html();
					if(!size){
						alert("请选择尺码");
						return;
					}
					var price = $("#price").html();
					var num = parseInt($("#_num").val());
					if($.cookie("cart")){
						var have = false;
						arr = JSON.parse($.cookie("cart"));
						for(var j = 0 ; j < arr.length; j++){
							if(arr[j].id === id){//代表已经存在了这个元素
								arr[j].num++;
								have = true;
								console.log(have);
								console.log(111);
								continue;//直接返回,不添加
							}
						}
						if(!have){
							var obj = {
								id: id,
								name: name,
								pic: pic,
								size: size,
								price: price,
								num: num
							}
							console.log(222);
							arr.push(obj);
						}
					}else{
						var obj = {
							id: id,
							name: name,
							pic: pic,
							size: size,
							price: price,
							num: num
						}
						arr.push(obj);
					}
					console.log(arr);
					var str = JSON.stringify(arr);
					$.cookie("cart",str,{ path:"/",expires: 7 });
					header.head_cart();
					$("#cart").slideDown("slow");
					setTimeout(function(){
						$("#cart").slideUp("slow");
					},1000)
				})
			}).then(function(){
				magnifier.show();
			})
		})
	})
})