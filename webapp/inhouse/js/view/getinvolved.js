define([ 'backbone', 'jquery', 'underscore', 'app/app',
		'text!template/getinvolved.html', 'mustache', 'json!data/homepage.json', 'jquery.scrollto' ], function(Backbone, $, _,
		App, TemplateGetInvolved, Mustache, HomePageJson, ScrollTo) {

	var GetInvolvedView = Backbone.View.extend({

		el : '#content-wrapper',
		
		events : {
			
		},

		initialize : function() {
			this.render();
		},

		render : function() {
			var self = this;
			$(self.el).html(Mustache.render(TemplateGetInvolved, {}));
			$(window).scrollTo($(self.el).find('.content-area'), 500);
		},

	});

	return GetInvolvedView;
});