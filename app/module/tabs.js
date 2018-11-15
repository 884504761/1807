define(["jquery"],function($){
	function Tabs(){};
	
	Tabs.prototype.show = function(){
		var $Bul = $("#Btabs"),
			$Sul = $("#Stabs");
			$Bli = $("#Btabs li");
		console.log($Bli.length);
		$Bli.each(function(){
			$("<li>").html($(this).html()).appendTo($Sul);
		});
		$Sul.on("mouseenter","li",function(){
			var index = $(this).index();
			$($Bli[index]).addClass("ac").siblings().removeClass("ac");
			$(".big_box img").attr("src",$(this).find("img")[0].src);
			$(".big_box img").css("width",2*$Bli.width());
			$(".big_box img").css("height",2*$Bli.height());
		})
	}
	return new Tabs();
})