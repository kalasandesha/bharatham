define([ 'backbone', 'jquery', 'underscore', 'app/app',
		'text!template/footer.html', 'mustache' ], function(Backbone, $, _,
		App, TemplateFooter, Mustache) {

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
			$.when(App.subscribeEmail(email)).done(function(result){
				console.log(result);
				console.log('Successfully subscribed for newsletter');
			}).fail(function(){
				alert('Oops! Operation failed. Please try again.');
			}).always(function(){
				modal.modal('hide');
			});
		},
		
		showSubscribeModal : function() {
			var self = this;
			this.modal = $(self.el).find('.subscribe-newsletter-modal');
			this.modal.modal('show');
		},
		
		checkValidity: _.debounce(function(ev) {
			var self = this;
			if($(ev.currentTarget)[0].checkValidity()) {
				$(this.modal).find('.subscribe-button').removeClass('disabled').removeAttr('disabled');
			} else {
				$(this.modal).find('.subscribe-button').addClass('disabled').attr('disabled','disabled');
			}
		}, 200)

	});

	return NavbarView;
});