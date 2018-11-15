define(["jquery","jquery-cookie"],function($){
	function Reckon(){}
	Reckon.prototype.unitprice = function(){
		var $li = $("#addli .addli_li");
		var arr = JSON.parse($.cookie("cart"));
		console.log(arr);
		for(var i = 0; i < $li.length; i++){
			var total = $($li[i]).find("#total");
			var price = $($li[i]).find("#price");
			var num = $($li[i]).find("#_num");
			var price = arr[i].price;
			var num = arr[i].num;
			$(total).html(parseInt(price)*parseInt(num));
		}
	}
	Reckon.prototype.xunitprice = function(_this){
		var $li = $("#addli .addli_li");
		var num = $(_this).siblings(".the_num").val();
		var price = $(_this).parent().parent().parent().find("#price").html();
		$(_this).parent().parent().parent().find("#total").html(parseInt(num)*parseInt(price));
	}
	Reckon.prototype.totals = function(){
		var $li = $("#addli .addli_li");
		var sum = 0;
		var arr = JSON.parse($.cookie("cart"));
		for(var i = 0; i < $li.length; i++){
			if($($li[i]).find(".checks").is(':checked')){
				var total = parseInt(arr[i].price)*parseInt(arr[i].num);
				sum += parseInt(total);
			}
		}
		$("#total_cost").html(sum);
	}
	Reckon.prototype.head_total = function(){
		var sum = 0;
		var $head_li = $("#cart_list li");
		var arr = JSON.parse($.cookie("cart"));
		for(var i = 0; i < $head_li.length; i++){
			var price = arr[i].price;
			var num = arr[i].num;
			console.log(price);
			sum += parseInt(price)*parseInt(num);
		}
		$("#head_num").html($head_li.length);
		$("#head_total").html("￥"+sum);
	}
	Reckon.prototype.rush = function(){
		var $li = $("#addli .addli_li");
		console.log($li);
		var narr = [];
		var arr = JSON.parse($.cookie("cart"));
		console.log(arr);
		for(var i = 0; i < $li.length; i++){
			var id = arr[i].id;
			var name = arr[i].name;
			var price = arr[i].price;
			var pic = arr[i].pic;
			var size = $($li[i]).find(".old_size").html();
			var num = Number($($li[i]).find("#_num").html());
			var obj = {
					id: id,
					name: name,
					pic: pic,
					size: size,
					price: price,
					num: num
				}
			console.log(obj);
			narr.push(obj);
		}
		console.log(narr);
		var str = JSON.stringify(narr);
		$.cookie("cart",str,{ expires: 7 });
	}
	return new Reckon();
})