define([ 'backbone', 'jquery', 'underscore', 'app/app',
		'text!template/kalotthunga-awardees.html', 'mustache', 'jquery.scrollto', 'readmore' ], function(Backbone, $, _,
		App, TemplateKalotthunga, Mustache, ScrollTo, ReadMore) {

	var KalotthungaView = Backbone.View.extend({

		el : '#content-wrapper',
		
		events : {
		},

		initialize : function(year) {
			this.render(year);
		},

		render : function(year) {
			var self = this;
			$(self.el).html(Mustache.render(TemplateKalotthunga, {}));
			$(".submenu-years [data-year='" + year + "']").addClass("active");
			self.renderYear(year);
		},
		
		renderYear: function(year) {
			var self = this;
			$.when(App.getKalotthungaAwardeesHtml(year)).done(function(html) {
				$(self.el).find(".submenu-content-area").html(html);
				$(self.el).find('article').readmore();
				$(window).scrollTo($(self.el).find('.content-area'), 500);
			}).fail(function() {
				alert("Error while loading the content");
			});
		}

	});

	return KalotthungaView;
});