define([ 'backbone', 'jquery', 'underscore', 'app/app',
		'text!template/homepage.html', 'mustache', 'json!data/homepage.json' ], function(Backbone, $, _,
		App, TemplateHomepage, Mustache, HomePageJson) {

	var NavbarView = Backbone.View.extend({

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
			console.log(HomePageJson);
			$(self.el).html(Mustache.render(TemplateHomepage, HomePageJson));
		},

	});

	return NavbarView;
});