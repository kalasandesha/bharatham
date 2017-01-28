define([ 'backbone', 'jquery', 'underscore', 'app/app',
		'text!template/socialinitiatives.html', 'mustache', 'jquery.scrollto', 'readmore' ], function(Backbone, $, _,
		App, TemplateSocialInitiatives, Mustache, ScrollTo, ReadMore) {

	var SocialInitiatives = Backbone.View.extend({

		el : '#content-wrapper',

		events : {
		},

		initialize : function(section) {
			this.render(section);
		},

		render : function(section) {
			var self = this;
			$(self.el).html(Mustache.render(TemplateSocialInitiatives, {}));
			$(".content-submenu-item." + section + "-link").parent().addClass("active");

			$.when(App.getSocialInitiativesSectionHtml(section)).done(function(html) {
				$(self.el).find(".submenu-content-area").html(html);
				$(window).scrollTo($(self.el).find('.content-area'), 500);
			}).fail(function() {
				alert("Error while loading the content");
			});
		}

	});

	return SocialInitiatives;
});