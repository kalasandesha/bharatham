define([ 'backbone', 'jquery', 'underscore', 'app/app',
		'text!template/contactus.html', 'mustache', 'notify' ], function(Backbone, $, _,
		App, TemplateContactUs, Mustache, Notify) {

	var ContactUsView = Backbone.View.extend({

		el : '#content-wrapper',
		
		requestInProgress: false,

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

		submitContactUs : function(event) {
			var self = this;
			event.preventDefault();
			if(self.requestInProgress) {
				return;
			} else {
				self.requestInProgress = true;
			}
			var $el = $(self.el);
			var $name = $el.find("#contactus-name");
			var $email = $el.find("#contactus-email");
			var $message = $el.find("#contactus-message");
			
			$message = $message.val().replace('\n', '<br />');
			
			$.when(App.contactUs($name.val(), $email.val(), $message))
					.done(function(result) {
						$.notify(result.message, "success");
						$name.val("");
						$email.val("");
						$message.val("");
					}).fail(function(result) {
						$.notify(result.message, "error");
					}).always(function(){
						self.requestInProgress = false;
					});
		}

	});

	return ContactUsView;
});