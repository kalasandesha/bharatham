define([ 'backbone', 'jquery', 'underscore', 'app/app',
		'text!template/navbar.html', 'mustache' ], function(Backbone, $, _,
		App, TemplateNavbar, Mustache) {
	
	var NavbarView = Backbone.View.extend({

		el : '#nav-wrapper',
		
		events : {
			
		},

		initialize : function() {
			this.render();
		},

		render : function() {
			var self = this;
			$(self.el).html("");
			$(self.el).html(Mustache.render(TemplateNavbar, {}));
		},

	});

	return NavbarView;
});