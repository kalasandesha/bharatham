define([ 'backbone', 'view/homepage', 'view/aboutus' ], function(Backbone, HomePage, AboutUs) {

	var AppRouter =  Backbone.Router.extend({

		routes : {
			"aboutus/:submenu": "aboutus",
			"*actions": "defaultRoute"
		}

	});
	
	var app_router = new AppRouter;
	
	app_router.on('route:aboutus', function(submenu) {
		new AboutUs(submenu);
	});
	
	app_router.on('route:defaultRoute', function(actions) {
	    new HomePage();
	});
	


	Backbone.history.start();

});