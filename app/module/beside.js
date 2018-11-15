define(["jquery"],function($){
	function Beside(){}
	
	Beside.prototype.rt = function(){
		$("#beside").on("click",function(){
			console.log(1);
			$("html").animate({scrollTop:0},300,"swing");
		})
	}	
		
	return new Beside();
	
})