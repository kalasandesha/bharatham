define([ 'backbone', 'jquery', 'underscore', 'app/app',
		'text!template/aboutus.html', 'mustache' ], function(Backbone, $, _,
		App, TemplateAboutUs, Mustache) {

	var NavbarView = Backbone.View.extend({

		el : '#content-wrapper',

		events : {
			'click .guru-link' : 'changeGuruSection',
			'click #contact-submit' : 'submitContactUs'
		},

		initialize : function(section) {
			this.render(section);
		},

		render : function(section) {
			var self = this;
			$(self.el).html(Mustache.render(TemplateAboutUs, {}));
			$(".content-submenu-item." + section + "-link").parent().addClass("active");

			$.when(App.getAboutUsSectionHtml(section)).done(function(html) {
				$(self.el).find(".submenu-content-area").html(html);
			}).fail(function() {
				alert("Error while loading the content");
			});

			if (section === "ourgurus") {
				self.displayGuru("Sathyanarayana");
			}

		},

		displayGuru : function(guru) {
			var self = this;
			$.when(App.getOurGurusSectionHtml(guru)).done(
					function(htmlContent) {
						$(self.el).find(".guru-content").html(htmlContent);
					}).fail(function() {
				alert("Error while loading the content");
			});
		},

		changeGuruSection : function(ev) {
			var self = this;
			$(ev.currentTarget).closest("ul").find("li.active").removeClass(
					"active");
			$(ev.currentTarget).parent().addClass("active");
			self.displayGuru($(ev.currentTarget).data("guruName"));
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

	return NavbarView;
});