define([ 'backbone', 'view/homepage', 'view/aboutus', 'view/kalotthunga',
		'view/festival', 'view/gallery', 'view/getinvolved', 'view/calendar',
		'view/socialinitiatives', 'view/contactus', 'view/admin' ], function(Backbone,
		HomePage, AboutUs, Kalotthunga, Festival, Gallery, GetInvolved,
		Calendar, SocialInitiatives, ContactUs, Admin) {

	var AppRouter = Backbone.Router.extend({

		routes : {
			"calendar" : "calendar",
			"aboutus/:submenu" : "aboutus",
			"kalotthunga-awardees/:year" : "kalotthunga-awardees",
			"festival/:festival/:year" : "festival",
			"gallery" : "gallery",
			"getinvolved" : "getinvolved",
			"socialinitiatives/:section" : "social",
			"contactus" : "contact",
			"admin" : "admin",
			"*actions" : "defaultRoute"
		}

	});

	var app_router = new AppRouter;

	app_router.on('route:calendar', function() {
		new Calendar();
	});

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

	app_router.on('route:social', function(section) {
		new SocialInitiatives(section);
	});

	app_router.on('route:contact', function() {
		new ContactUs();
	});

	app_router.on('route:admin', function() {
		new Admin();
	});

	app_router.on('route:defaultRoute', function(actions) {
		new HomePage();
	});

	Backbone.history.start();

});