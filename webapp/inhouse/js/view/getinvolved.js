define([ 'backbone', 'jquery', 'underscore', 'app/app',
		'text!template/getinvolved.html', 'mustache', 'json!data/homepage.json' ], function(Backbone, $, _,
		App, TemplateGetInvolved, Mustache, HomePageJson) {

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
		},

	});

	return GetInvolvedView;
});