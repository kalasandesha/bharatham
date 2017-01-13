define([ 'backbone', 'jquery', 'underscore', 'app/app',
		'text!template/calendar.html','text!template/calendar-wrapper.html', 'mustache', 'json!data/calendar.json', 'jQuery.flip' ], function(Backbone, $, _,
		App, TemplateCalendar, TemplateCalendarWrapper, Mustache, Data, Flip) {

	var CalendarView = Backbone.View.extend({

		el : '#content-wrapper',

		events : {

		},

		initialize : function() {
			this.render();
		},

		render : function() {
			var self = this;
			$(self.el).html(Mustache.render(TemplateCalendarWrapper, Data));
			self.drawCalendarForYear(new Date().getYear());
		},
		
		drawCalendarForYear: function(year) {
			var self = this;
			$(self.el).find('.calendar').html(Mustache.render(TemplateCalendar, Data));
			$(self.el).find('.flip').flip({
				trigger: 'hover'
			});
		}
		
	});

	return CalendarView;
});