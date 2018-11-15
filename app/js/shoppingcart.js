require(["config"],function(){
	require(["jquery","header","footer","template","reckon","jquery-cookie"],function($,header,footer,template,reckon){
		new Promise(function(resolve, reject){
			$("header").load("/html/component/header.html",function(){
				resolve();
			})
			$("footer").load("/html/component/footer.html",function(){
			})
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
			var carts = $.cookie("cart");
			if(carts){
				var products = JSON.parse(carts);
				var res = {products:products};
				var html = template("pro-template",{products: res.products});
				$("#addli").html(html);
			}
			else{
				$(".Products").addClass("isProduct").siblings().removeClass("isProduct");
			}
// 			console.log(carts);
// 			console.log(json);
// 			var json = JSON.parse(carts);
// 			for(var i = 0; i < json.length; i++)
// 			{ 
// 				str += `<li>
// 							<input type="checkbox" class="checks"/>
// 							<div class="information fl">
// 								<div class="information-left fl">
// 									<img src="${json[i].pic}" >
// 								</div>
// 								<div class="information-right fl">
// 									<p>${json[i].name}</p>
// 									<p style="color:#e60012">10.27-11.11 精选商品直降</p>
// 									<p class="massage">颜色：&nbsp;<span>白色</span>尺码：&nbsp;<span>41</span></p>
// 								</div>
// 							</div>
// 							<div class="unit-price fl">
// 								<p>￥<span>${json[i].price}</span></p>
// 							</div>
// 							<div class="quantity fl">
// 								<p class="_num">${json[i].num}</p>
// 								<div class="num">
// 									<div id="add"><i class="iconfont icon-jianhao"></i></div>
// 									<input type="text">
// 									<div id="res"><i class="iconfont icon-hao"></i></div>
// 								</div>
// 							</div>
// 							<div class="sum fl">
// 								<p>￥439.00</p>
// 							</div>
// 							<div class="operate fl">
// 								<a href="javascript:;" id="edit">编辑</a>
// 								<a href="javascript:;" id="del">删除</a>
// 								<a href="javascript:;" id="true">确定</a>
// 							</div>
// 						</li>`;
// 			};
		}).then(function(){
			var ul = $("#addli");
			console.log(ul);
			reckon.unitprice();
			reckon.totals();
			$(ul).on("click",".revise",function(){
				console.log(this);
				if(this.id === "edit"){
					$(this).css("display","none").siblings("#del").css("display","block");
					$(this).siblings("#true").css("display","block").siblings("#cancel").css("display","block");
					$(this).parent().parent().find(".num").css("display","block").siblings().css("display","none").siblings().find(".the_num").val($(this).parent().parent().find("._num").html());
					$(this).parent().parent().find(".choice_size").css("display","block").find(".size_old").html($(this).parent().parent().find(".old_size").html());
					//value++
// 					$(this).parent().parent().find(".num #add").click(function(){
// 						var value = parseInt($(this).siblings(".the_num").val());
// 						console.log(value);
// 						$(this).siblings(".the_num").val(++value);
// 					});
// 					//value--
// 					$(this).parent().parent().find(".num #res").click(function(){
// 						var value = parseInt($(this).siblings(".the_num").val());
// 						if(value === 1){
// 							console.log("不能再减了");
// 						}else{
// 							$(this).siblings(".the_num").val(--value);
// 						}
// 					});
				}
				if(this.id === "true"){
					$(this).siblings("#edit").css("display","block");
					$(this).css("display","none").siblings("#cancel").css("display","none");
					$(this).parent().parent().find(".num").css("display","none").siblings().css("display","block").html($(this).parent().parent().find(".the_num").val());
					$(this).parent().parent().find(".old_size").html($(this).parent().parent().find(".size_old").html()).parent().parent().parent().find(".choice_size").css("display","none");
					reckon.rush();
					reckon.unitprice();
					reckon.totals();
					header.head_cart();
				}
				if(this.id === "del"){
					var carts = $.cookie("cart");
					var products = JSON.parse(carts);
					var index = $(this).parent().parent().index();
					products.splice(index,1);
					var str = JSON.stringify(products);
					$.cookie("cart",str,{ expires: 7 });
					$(this).parent().parent().remove();
					reckon.totals();
					var end = $.cookie("cart");
					if(end == "[]"){
						$.cookie('cart', '', { expires: -1 ,path:"/"});
						$(".Products").addClass("isProduct").siblings().removeClass("isProduct");
					}
					else{
						console.log(end,11);
					}
				}
				if(this.id === "cancel"){
					$(this).parent().parent().find(".num").css("display","none").siblings().css("display","block").parent().parent().find(".choice_size").css("display","none");
					$(this).css("display","none").siblings("#true").css("display","none").siblings("#edit").css("display","block").siblings("#del").css("display","block");
					reckon.unitprice();
					reckon.totals();
				}
			});
			$(".res").click(function(){
				var value = parseInt($(this).siblings(".the_num").val());
				if(value === 1){
					console.log("不能再减了");
				}else{
					$(this).siblings(".the_num").val(--value);
				}
				reckon.xunitprice(this);
			});
			$(".add").click(function(){
				var value = parseInt($(this).siblings(".the_num").val());
				$(this).siblings(".the_num").val(++value);
				reckon.xunitprice(this);
			});
			var $allcheck = $("#allcheck");
			var $checks = $(".checks");
			$allcheck.click(function(){
				var index = 0;
				if($allcheck.is(':checked')){
					for(var i = 0; i < $checks.length; i++){
						$($checks[i]).prop("checked",true);
					}
					index = $checks.length;
				}else{
					for(var i = 0; i < $checks.length; i++){
						$($checks[i]).prop("checked",false);
					}
					index = 0;
				}
				$(".pitch").html(index);
				reckon.totals();
			});
			$checks.click(function(){
				var index = 0;
				for(var i = 0; i < $checks.length; i++){
					if($($checks[i]).is(':checked')){
						index++;
					}
				}
				$(".pitch").html(index);
				if(index === $checks.length){
					$allcheck.prop("checked",true);
				}else{
					$allcheck.prop("checked",false);
				}
				reckon.totals();
			})
			$allcheck.click();
			$(".size_top").click(function(){
				if($(this).parent().find(".size_bottom").hasClass("ac")){
					$(this).parent().find(".size_bottom").removeClass("ac");
					$(this).find("span").css("transform","rotate(0deg)")
				}
				else{
					$(this).parent().find(".size_bottom").addClass("ac");
					$(this).find("span").css("transform","rotate(180deg)")
				}
			})
			$(".size_bottom").on("click","li",function(){
				$(this).parent().parent().find(".size_old").html($(this).html());
				$(this).parent().addClass("ac");
				$(this).parent().parent().find("span").css("transform","rotate(180deg)")
			})
		});
	});
});