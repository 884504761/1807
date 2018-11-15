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
			if(id == 1){
				$(".artical-head h4").html("所有新品推荐");
				$("#_name1").html("新品推荐");
				$("#_name2").html("所有新品推荐");
				var html = "";
				var timer = null;
				$.ajax({
					method: "get",
					url:"http://rap2api.taobao.org/app/mock/115083/product",
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
								url:"http://rap2api.taobao.org/app/mock/115083/product",
								success: function(res){
									html += template("pro-template",{products: res.products});
									$("#proList").html(html);
								}
							});
						},1000)
					}
				})
			}
			else if(id == 2){
				$(".artical-head h4").html("所有热卖商品");
				$("#_name1").html("热卖商品");
				$("#_name2").html("所有热卖商品");
				var html = "";
				var timer = null;
				$.ajax({
					method: "get",
					url:"http://rap2api.taobao.org/app/mock/115083/product_hot",
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
								url:"http://rap2api.taobao.org/app/mock/115083/product_hot",
								success: function(res){
									html += template("pro-template",{products: res.products});
									$("#proList").html(html);
								}
							});
						},1000)
					}
				})
			}
			else{
				$(".artical-head h4").html("搜索结果");
				$("#_name1").html("搜索");
				$("#_name2").html("搜索结果");
				var html = "";
				var timer = null;
				$.ajax({
					method: "get",
					url:"http://rap2api.taobao.org/app/mock/115083/product_search",
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
								url:"http://rap2api.taobao.org/app/mock/115083/product_search",
								success: function(res){
									html += template("pro-template",{products: res.products});
									$("#proList").html(html);
								}
							});
						},1000)
					}
				})
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