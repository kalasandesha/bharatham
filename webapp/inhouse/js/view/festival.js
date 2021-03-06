define([ 'backbone', 'jquery', 'underscore', 'app/app', 'mustache', 'text!template/festivals.html', 'jquery.scrollto', 'readmore' ], function(
		Backbone, $, _, App, Mustache, TemplateFestival, ScrollTo, ReadMore) {

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
			if(_.isNull(festival)) {
				$(self.el).html(Mustache.render(TemplateFestival, {}));
			} else {
				$.when(App.getFestivalHtml(festival),
						App.getFestivalYearHtml(festival, year))
						.done(
								function(festivalHtml, yearHtml) {
									$(self.el).html(festivalHtml);
									$(".submenu-years [data-year='" + year + "']").addClass("active");
									$(self.el).find('.submenu-content-area').html(
											yearHtml);
									$(window).scrollTo($(self.el).find('.content-area'), 500);
								}).fail(function() {
							alert("Error while loading the content");
						});
			}
		}

	});

	return FestivalView;
});