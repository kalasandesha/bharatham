define([ 'backbone', 'jquery', 'underscore', 'app/app',
		'text!template/kalotthunga-awardees.html', 'mustache' ], function(Backbone, $, _,
		App, TemplateKalotthunga, Mustache) {

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
			$(".kalotthunga-years [data-year='" + year + "']").addClass("active");
			self.renderYear(year);
		},
		
		renderYear: function(year) {
			var self = this;
			$.when(App.getKalotthungaAwardeesHtml(year)).done(function(html) {
				$(self.el).find(".kalotthunga-content-area").html(html);
			}).fail(function() {
				alert("Error while loading the content");
			});
		}

	});

	return KalotthungaView;
});