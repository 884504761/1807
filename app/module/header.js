define(["tools","jquery","template","reckon","jquery-cookie"],function(tools,$,template,reckon){
	function Header(){}
	//实现下拉菜单
	Header.prototype.nav = function(){
		var subMenu = tools.$(".subMenu");
		for (var i = 0; i < subMenu.length; i++) {
			subMenu[i].onmouseenter = function(){
				tools.$(".content",this)[0].style.display = "block";
			}
			subMenu[i].onmouseleave = function(){
				tools.$(".content",this)[0].style.display = "none";
			}
		}
	}
	Header.prototype.barrage = function(){
		var bg = tools.$("#barrage");
		var run = tools.$("#running");
		var Max = bg.offsetWidth;
		var Min = -run.offsetWidth;
		var timer = setInterval(function(){
			if(run.offsetLeft <= Min){
				run.style.left = Max + "px";
			}
			run.style.left = run.offsetLeft - 1 + "px";
		},30)
	}
	Header.prototype.fix = function(){
		var head = tools.$(".head")[0];
		var nav = tools.$("nav")[0];
		window.onscroll = function(e){
			var scroll = document.documentElement.scrollTop || document.body.scrollTop;
			if(scroll > head.offsetHeight){
				nav.style.position = "fixed";
				nav.style.top = 0;
			}else{
				nav.style.position = "relative";
			}
		}
	}
	Header.prototype.search = function(){
		var search = tools.$(".search")[0];
		var _search = tools.$("input",search)[0];
		_search.onmouseenter = function(){
		
		}
	}
	Header.prototype.isLogin = function(){
		var username = $.cookie("username");
		if(username){
			$("#unlogin").css("display","none");
			$("#islogin").css("display","block");
			$("#islogin p").html(username);
			$("#islogin .leave").click(function(){
				$.cookie('username', '', { expires: -1 ,path:"/"});
				$("#unlogin").css("display","block");
				$("#islogin").css("display","none");
			});
		}
	}
	Header.prototype.head_cart = function(){
		$("#cart").slideUp("slow");
		var carts = $.cookie("cart");
		var products = JSON.parse(carts);
		var res = {products:products};
		var html = template("cart-template",{products: res.products});
		$("#cart_list").html(html);
		$("#gouwuche").mouseenter(function(){
			$("#cart").slideDown("slow");
		});
		$("#cart").mouseleave(function(){
			$(this).slideUp("slow");
		})
		reckon.head_total();
		$("#cart_list").on("click","#head_del",function(){
			var carts = $.cookie("cart");
			var products = JSON.parse(carts);
			var index = $(this).parent().parent().parent().index();
			products.splice(index,1);
			var str = JSON.stringify(products);
			$.cookie("cart",str,{ expires: 7 });
			$(this).parent().parent().parent().remove();
			reckon.head_total();
		})
	}
	Header.prototype.head_search = function(){
		$("#head_search").click(function(){
			var text = $("#search").val();
			$(location).attr('href', '/html/xinpin.html?'+text);
		})
	}
	return new Header();
})