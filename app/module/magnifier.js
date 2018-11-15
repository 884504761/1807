 define(["jquery"],function($){
// 	 $.fn.extend({
// 		 mgt:function(){
// 			 var mWidth = $("#Btabs").width();
// 			 var mHeight = $("Btabs").height();
// 			 console.log(mWidth);
// 			 $(".big_box img");
// 		 }
// 	 })
	function Magnifier(){};
	
	Magnifier.prototype.show = function(){
		var $ul = $("#Btabs"),
			$smbox = $("#sm_box"),
			$bigbox = $(".big_box"),
			$bigImg = $("#bigImg");
		var mWidth = $("#Btabs").width();
		var mHeight = $("#Btabs").height();
		console.log(mHeight);
		$(".big_box img").css("width",2*mWidth);
		$(".big_box img").css("height",2*mHeight);
		
		$ul.mousemove(function(e){
			var _left = e.clientX - $ul.offset().left - $smbox.width()/2,
				_top = e.clientY - $ul.offset().top - $smbox.height()/2;
			console.log(_left);
			var smh = $smbox.height(),
				bgh = $bigbox.height();
			//进入后显示放大镜
			
			$smbox.css("display","block");
			$bigbox.css("display","block");	
			
			//确保smbox不会出界
			if(_left < 0) _left = 0;
			if(_top < 0) _top = 0;
			if(_left > $ul.width() - $smbox.width()) _left = $ul.width() - $smbox.width();
			if(_top > $ul.height() - $smbox.height()) _top = $ul.height() - $smbox.height();
			
			$smbox.css("left",_left);
			$smbox.css("top",_top);
			
			$bigImg.css("left",-(bgh/smh) * _left);
			$bigImg.css("top",-(bgh/smh) * _top);
			
		})
		$ul.mouseleave(function(){
			$smbox.css("display","none");
			$bigbox.css("display","none");	
		})
	}
	return new Magnifier();
 })