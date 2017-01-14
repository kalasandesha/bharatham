define([ 'backbone', 'jquery', 'underscore', 'app/app',
		'text!template/navbar.html', 'mustache', 'bootstrap/modal' ], function(Backbone, $, _,
		App, TemplateNavbar, Mustache, Modal) {
	
	var NavbarView = Backbone.View.extend({

		el : '#nav-wrapper',
		
		events : {
			'click .subscribe-newsletter' : 'showSubscribeModal',
			'click .subscribe-button' : 'subscribeNewsLetter',
			'keydown #subscribe-email' : 'checkValidity',
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
		}, 200),
		
		setActive: function(ev) {
			var self = this;
			$(self.el).find('.menu-item.active').removeClass('active');
			$(ev.currentTarget).addClass('active');
		}
		
	});

	return NavbarView;
});