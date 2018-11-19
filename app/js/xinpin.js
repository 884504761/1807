require(["config"],function(){
	require(["jquery","header", "footer","template","beside"],function($,header,footer,template,beside){
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
			beside.rt();
			try{
				header.head_cart();
			}catch(e){
				console.log("not found cookie");
			}
		}).then(function(){
			var id = location.search.slice(1);
			console.log(id);
			function list_ajax(url){
				var html = "";
				var timer = null;
				$.ajax({
					method: "get",
					url:url+id,
					success: function(res){
						console.log(res);
						html += template("pro-template",{products: res.products});
						$("#proList").html(html);
					}
	
				});
				$(window).scroll(function(){
					if($(window).scrollTop() > $("body").height()-1200){
						clearTimeout(timer);
						console.log("到底啦");
						timer = setTimeout(function(){
							$.ajax({
								method: "get",
								url:url+id,
								success: function(res){
									html += template("pro-template",{products: res.products});
									$("#proList").html(html);
								}
							});
						},1000)
					}
				})
			}
			if(id == 1){
				$(".artical-head h4").html("所有新品推荐");
				$("#_name1").html("新品推荐");
				$("#_name2").html("所有新品推荐");
				list_ajax("http://rap2api.taobao.org/app/mock/115083/product?");
			}
			else if(id == 2){
				$(".artical-head h4").html("所有热卖商品");
				$("#_name1").html("热卖商品");
				$("#_name2").html("所有热卖商品");
				list_ajax("http://rap2api.taobao.org/app/mock/115083/product_hot?");
			}
			else if(id == 3){
				$(".artical-head h4").html("所有男子装备");
				$("#_name1").html("男子装备");
				$("#_name2").html("所有男子装备");
				list_ajax("http://rap2api.taobao.org/app/mock/115083/product_men?");
			}
			else if(id == 4){
				$(".artical-head h4").html("所有女子装备");
				$("#_name1").html("女子装备");
				$("#_name2").html("所有女子装备");
				list_ajax("http://rap2api.taobao.org/app/mock/115083/product_female?");
			}
			else if(id == 5){
				$(".artical-head h4").html("所有少年装备");
				$("#_name1").html("少年装备");
				$("#_name2").html("所有少年装备");
				list_ajax("http://rap2api.taobao.org/app/mock/115083/product_child?");
			}
			else if(id == 6){
				$(".artical-head h4").html("PERPETUAL系列");
				$("#_name1").html("男子装备");
				$("#_name2").html("PERPETUAL系列");
				list_ajax("http://rap2api.taobao.org/app/mock/115083/product_PERPETUAL?");
			}
			else if(id == 7){
				$(".artical-head h4").html("MVP系列");
				$("#_name1").html("女子装备");
				$("#_name2").html("MVP系列");
				list_ajax("http://rap2api.taobao.org/app/mock/115083/product_MVP?");
			}
			else if(id == 8){
				$(".artical-head h4").html("ULTIMATE SPEED系列训练鞋");
				$("#_name1").html("ULTIMATE SPEED系列训练鞋");
				$("#_name2").html("");
				list_ajax("http://rap2api.taobao.org/app/mock/115083/product_ULTIMATE?");
			}
			else if(id == 9){
				$(".artical-head h4").html("STORM GOLF系列");
				$("#_name1").html("STORM GOLF系列");
				$("#_name2").html("");
				list_ajax("http://rap2api.taobao.org/app/mock/115083/product_STORM?");
			}
			else if(id == 10){
				$(".artical-head h4").html("LV COLLECTION系列");
				$("#_name1").html("LV COLLECTION系列");
				$("#_name2").html("");
				list_ajax("http://rap2api.taobao.org/app/mock/115083/product_LV?");
			}
			else{
				$(".artical-head h4").html("搜索结果");
				$("#_name1").html("搜索");
				$("#_name2").html("搜索结果");
				list_ajax("http://rap2api.taobao.org/app/mock/115083/product_search?");
			}
		}).then(function(){
			var _this = null;
			$(".ul-list").on("click","li",function(){
				var $li = $(".list-bottom .spfl");
				if(this == _this){
					$($li[$(this).index()]).removeClass("ac");
				}
				else{
					_this = this;
					$($li[$(this).index()]).addClass("ac").siblings().removeClass("ac");
				}
			})
		})
	})
})