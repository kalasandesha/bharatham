define([ 'backbone', 'jquery', 'underscore', 'app/app', 'mustache' ], function(
		Backbone, $, _, App, Mustache) {

	var FestivalView = Backbone.View.extend({

		el : '#content-wrapper',

		events : {},

		initialize : function(festival, year) {
			this.render(festival, year);
		},

		render : function(festival, year) {
			var self = this;
			self.renderYear(festival, year);
		},

		renderYear : function(festival, year) {
			var self = this;
			$.when(App.getFestivalHtml(festival),
					App.getFestivalYearHtml(festival, year))
					.done(
							function(festivalHtml, yearHtml) {
								$(self.el).html(festivalHtml);
								$(".submenu-years [data-year='" + year + "']").addClass("active");
								$(self.el).find('.submenu-content-area').html(
										yearHtml);
							}).fail(function() {
						alert("Error while loading the content");
					});
		}

	});

	return FestivalView;
});