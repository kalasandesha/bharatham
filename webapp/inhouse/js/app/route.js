define([ 'backbone', 'view/homepage', 'view/aboutus', 'view/kalotthunga',
		'view/festival' ], function(Backbone, HomePage, AboutUs, Kalotthunga,
		Festival) {

	var AppRouter = Backbone.Router.extend({

		routes : {
			"aboutus/:submenu" : "aboutus",
			"kalotthunga-awardees/:year" : "kalotthunga-awardees",
			"festival/:festival/:year" : "festival",
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

	app_router.on('route:defaultRoute', function(actions) {
		new HomePage();
	});

	Backbone.history.start();

});