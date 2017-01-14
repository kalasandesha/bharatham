define([ 'backbone', 'jquery', 'underscore', 'app/app',
		'text!template/homepage.html', 'mustache', 'json!data/homepage.json', 'bootstrap/carousel' ], function(Backbone, $, _,
		App, TemplateHomePage, Mustache, HomePageJson, Carousel) {

	var HomePageView = Backbone.View.extend({

		el : '#content-wrapper',
		
		events : {
			
		},

		initialize : function() {
			this.render();
		},

		render : function() {
			var self = this;
			HomePageJson.carouselIndexes = [];
			_.each(HomePageJson.carouselItems, function(element, index){
				if(index == 0) {
					element.cssClass = "active";
					HomePageJson.carouselIndexes.push({
						"index": index + 1,
						"cssClass": "active"
						});
				} else {
					element.cssClass = "";
					HomePageJson.carouselIndexes.push({
						"index": index + 1,
						"cssClass": ""
						});
				}

			});
			$(self.el).html(Mustache.render(TemplateHomePage, HomePageJson));
//			$(self.el).find('.carousel').carousel({
//				interval: 5000,
//				pause: null
//	        }).carousel('cycle');
			//$(self.el).find('.carousel').carousel('cycle');
		},

	});

	return HomePageView;
});