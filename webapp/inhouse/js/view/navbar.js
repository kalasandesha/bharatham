define([ 'backbone', 'jquery', 'underscore', 'app/app',
		'text!template/navbar.html', 'mustache', 'bootstrap/modal' ], function(
		Backbone, $, _, App, TemplateNavbar, Mustache, Modal) {

	var NavbarView = Backbone.View.extend({

		el : '#nav-wrapper',

		events : {
			'click .menu-item' : 'setActive'
		},

		initialize : function() {
			this.render();
			this.modal = null;
		},

		render : function() {
			var self = this;
			$(self.el).html(Mustache.render(TemplateNavbar, {}));
		},

		setActive : function(ev) {
			var self = this;
			$(self.el).find('.menu-item.active').removeClass('active');
			$(ev.currentTarget).addClass('active');
		}

	});

	return NavbarView;
});