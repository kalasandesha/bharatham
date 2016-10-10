define([ 'backbone', 'view/homepage', 'view/aboutus', 'view/kalotthunga',
		'view/festival', 'view/gallery', 'view/getinvolved' ], function(Backbone, HomePage, AboutUs, Kalotthunga,
		Festival, Gallery, GetInvolved) {

	var AppRouter = Backbone.Router.extend({

		routes : {
			"aboutus/:submenu" : "aboutus",
			"kalotthunga-awardees/:year" : "kalotthunga-awardees",
			"festival/:festival/:year" : "festival",
			"gallery": "gallery",
			"getinvolved": "getinvolved",
			"*actions" : "defaultRoute"
		}

	});

	var app_router = new AppRouter;

	app_router.on('route:aboutus', function(submenu) {
		new AboutUs(submenu);
	});

	app_router.on('route:kalotthunga-awardees', function(year) {
		new Kalotthunga(year);
	});

	app_router.on('route:festival', function(festival, year) {
		new Festival(festival, year);
	});
	
	app_router.on('route:gallery', function() {
		new Gallery();
	});
	
	app_router.on('route:getinvolved', function() {
		new GetInvolved();
	});

	app_router.on('route:defaultRoute', function(actions) {
		new HomePage();
	});

	Backbone.history.start();

});