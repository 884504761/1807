require(["config"], function(){
	require(["jquery", "tools", "header", "footer","beside","banner"], function($,tools,header,footer,beside,banner){
		new Promise(function(resolve, reject){
			$("header").load("/html/component/header.html",function(){
				resolve();
			})
			$("footer").load("/html/component/footer.html",function(){
			})
			$("#beside").load("/html/component/beside.html",function(){
				beside.rt();
			})
		}).then(function(){
			try{
				header.head_cart();
			}catch(e){
				console.log("not found cookie");
			}
			header.nav();
			header.barrage(); 
			header.fix();
			header.isLogin();
			header.head_search();
			banner.ban();
		})
	})
})