define([ 'backbone', 'jquery', 'underscore', 'app/app',
		'text!template/homepage.html', 'mustache', 'json!data/homepage.json',
		'slick' ], function(Backbone, $, _, App, TemplateHomePage, Mustache,
		HomePageJson, Slick) {

	var HomePageView = Backbone.View.extend({

		el : '#content-wrapper',

		events : {

		},

		initialize : function() {
			this.render();
		},

		render : function() {
			var self = this;
			$(self.el).html(Mustache.render(TemplateHomePage, HomePageJson));
			$('.slick-container').slick({
				dots : true,
				infinite : true,
				speed : 500,
				fade : true,
				cssEase : 'linear',
				autoplay : true,
				autoplaySpeed : 2000
			});
		},

	});

	return HomePageView;
});