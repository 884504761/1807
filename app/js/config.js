require.config({
	baseUrl: "/",
	paths: {
		"header": "module/header",
		"footer": "module/footer",
		"jquery": "libs/jquery/jquery-1.11.3",
		"jquery-cookie": "libs/jquery-cookie/jquery.cookie",
		"bootstrap": "libs/bootstrap/js/bootstrap",
		"tools": "libs/tools",
		"beside": "module/beside",
		"banner": "module/banner",
		"template": "libs/template-web",
		"tabs": "module/tabs",
		"reckon": "module/reckon",
		"magnifier": "module/magnifier",
		"jquery-mousewheel": "libs/jquery-mousewheel/jquery.mousewheel"
	},
	//垫片
	shim:{
		"bootstrap": {
			deps: ["jquery"]
		}
	}
})