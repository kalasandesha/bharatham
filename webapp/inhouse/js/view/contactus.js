define([ 'backbone', 'jquery', 'underscore', 'app/app',
		'text!template/contactus.html', 'mustache' ], function(Backbone, $, _,
		App, TemplateContactUs, Mustache) {

	var ContactUsView = Backbone.View.extend({

		el : '#content-wrapper',

		events : {
			'click #contact-submit' : 'submitContactUs'
		},

		initialize : function(section) {
			this.render(section);
		},

		render : function(section) {
			var self = this;
			$(self.el).html(Mustache.render(TemplateContactUs, {}));

		},

		submitContactUs : function() {
			var self = this;
			var $el = $(self.el);
			var $name = $el.find("#contactus-name");
			var $email = $el.find("#contactus-email");
			var $message = $el.find("#contactus-message");
			$.when(App.contactUs($name.val(), $email.val(), $message.val()))
					.done(function(result) {
						$name.val("");
						$email.val("");
						$message.val("");
					}).fail(function() {
						alert('Data save failed');
					});
		}

	});

	return ContactUsView;
});