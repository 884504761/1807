define(["jquery"],function($){
	function Banner(){}
	Banner.prototype.ban = function(){
		var $ul = $("#banner ul"),
			$li = $("#banner ul li"),
			$ol = $("#banner ol");
		console.log(111);
		var index = 0, len = $li.length, flag = false, timer = null;
		var liWidth = document.body.clientWidth;
		$li.css("width",liWidth);
		$li.each(function(){
			$("<li>").addClass($(this).index()==0?"ac":"").appendTo($ol);
		});
		$li.eq(0).clone(false).appendTo($ul);
		$ul.css("width", (len+1)*liWidth);
		
		$ol.on("click","li",function(){
			if(!flag){
				flag = true;
				$(this).addClass("ac").siblings().removeClass("ac");
				index = $(this).index();
				console.log(index);
				$ul.animate({"left":-index*liWidth},"slow",function(){
					flag = false;
				})
			}
		})
		
		function autoPlay(){
			clearInterval(timer);
			timer = setInterval(function(){
				if(!flag){
					flag = true;
					if(++index >= len){
						$ul.animate({"left":-len*liWidth},"slow",function(){
							$ul.css("left",0);
						}),
						index = 0;
						flag = false;
					}else{
						$ul.animate({"left":-index*liWidth},"slow",function(){
							flag = false;
						})
					}
					$ol.children().eq(index).addClass("ac").siblings().removeClass("ac");
				}
			},3000)
		}
		autoPlay();
		$("#banner").hover(function(){
			clearInterval(timer);
		},function(){
			autoPlay();
		});
	}
	return new Banner();
})