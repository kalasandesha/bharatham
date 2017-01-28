define([ 'backbone', 'jquery', 'underscore', 'app/app',
		'text!template/footer.html', 'mustache', 'notify' ], function(Backbone, $, _,
		App, TemplateFooter, Mustache, Notify) {

	var NavbarView = Backbone.View.extend({

		el : '#footer-wrapper',
		
		events : {
			'click .subscribe-newsletter' : 'showSubscribeModal',
			'click .subscribe-button' : 'subscribeNewsLetter',
			'keydown #subscribe-email' : 'checkValidity',
		},

		initialize : function() {
			this.render();
		},

		render : function() {
			var self = this;
			$(self.el).html(Mustache.render(TemplateFooter, {}));
		},
		
		subscribeNewsLetter : function() {
			var modal = this.modal;
			var email = modal.find('#subscribe-email').val();
			modal.modal('hide');
			$.when(App.subscribeEmail(email)).done(function(result){
				if(result.success) {
					$.notify(result.message, "success");
				} else if(result.error_code == 1) {
					$.notify(result.message, "info");
				} else {
					$.notify(result.message, "error");
				}
			}).fail(function(){
				$.notify(result.message, "error");
			});
		},
		
		showSubscribeModal : function() {
			var self = this;
			this.modal = $(self.el).find('.subscribe-newsletter-modal');
			this.modal.modal('show');
		},
		
		checkValidity: _.debounce(function(ev) {
			var self = this;
			if($(ev.currentTarget)[0].checkValidity() && App.isValidEmail($(ev.currentTarget).val())) {
				$(this.modal).find('.subscribe-button').removeClass('disabled').removeAttr('disabled');
			} else {
				$(this.modal).find('.subscribe-button').addClass('disabled').attr('disabled','disabled');
			}
		}, 200)

	});

	return NavbarView;
});