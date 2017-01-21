define([ 'backbone', 'jquery', 'underscore', 'app/app',
		'text!template/contactus.html', 'json!data/contactus.json', 'mustache', 'notify', 'jquery.scrollto' ], function(Backbone, $, _,
		App, TemplateContactUs, ContactUsJson, Mustache, Notify, ScrollTo) {

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
			$(self.el).html(Mustache.render(TemplateContactUs, ContactUsJson));
			$(window).scrollTo($(self.el), 500);
		},

		submitContactUs : function(event) {
			var self = this;
			event.preventDefault();
			
			var $el = $(self.el);
			var $name = $el.find("#contactus-name");
			var $email = $el.find("#contactus-email");
			var $message = $el.find("#contactus-message");
			
			if(!$email.get(0).checkValidity() || !App.isValidEmail($email.val())) {
				$.notify("Please enter a valid email address", "error");
				return;
			}
			
			if($name.val() != "" && $email.val() != "" && $message.val() != "") {
				$el.find('#contact-submit').prop('disabled',true).addClass('disabled');
				$.when(App.contactUs($name.val(), $email.val(), $message.val().replace(/\n/g, '<br />')))
				.done(function(result) {
					if(result.message) {
						$.notify(result.message, "success");
					} else {
						$.notify(result.message, "error");
					}
					$name.val("");
					$email.val("");
					$message.val("");
				}).fail(function(result) {
					$.notify(result.message, "error");
				}).always(function(){
					$el.find('#contact-submit').prop('disabled',false).removeClass('disabled');
				});
			} else {
				$.notify("Please fill all the 3 fields", "error");
			}
		}

	});

	return ContactUsView;
});