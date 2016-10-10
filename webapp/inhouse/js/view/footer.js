define([ 'backbone', 'jquery', 'underscore', 'app/app',
		'text!template/footer.html', 'mustache' ], function(Backbone, $, _,
		App, TemplateFooter, Mustache) {

	var NavbarView = Backbone.View.extend({

		el : '#footer-wrapper',
		
		events : {
			
		},

		initialize : function() {
			this.render();
		},

		render : function() {
			var self = this;
			$(self.el).html(Mustache.render(TemplateFooter, {}));
		},

	});

	return NavbarView;
});