define([ 'backbone', 'jquery', 'underscore', 'app/app',
		'text!template/calendar.html', 'text!template/calendar-wrapper.html',
		'mustache', 'json!data/calendar.json', 'jquery.flip', 'jquery.scrollto' ], function(
		Backbone, $, _, App, TemplateCalendar, TemplateCalendarWrapper,
		Mustache, Data, Flip, ScrollTo) {

	var CalendarView = Backbone.View.extend({

		el : '#content-wrapper',

		currentYear : undefined,

		minYear : undefined,

		maxYear : undefined,

		events : {
			"click .arrow-left" : "displayPreviousYear",
			"click .arrow-right" : "displayNextYear"
		},

		initialize : function() {
			var self = this;
			self.currentYear = new Date().getFullYear();
			self.minYear = _.min(Data.events, function(obj) {
				return obj.year;
			}).year;
			self.maxYear = _.max(Data.events, function(obj) {
				return obj.year;
			}).year;
			this.render();
		},

		render : function() {
			var self = this;
			$(self.el).html(Mustache.render(TemplateCalendarWrapper, {
				year : self.currentYear
			}));
			self.drawCalendarForCurrentYear();
			$(window).scrollTo($(self.el), 500);
		},

		drawCalendarForCurrentYear : function() {
			var self = this;
			$(self.el).find('.calendar-year').html(self.currentYear);
			var filteredData = _.filter(Data.events, function(obj) {
				if (obj.year == self.currentYear) {
					return true;
				}
				return false;
			});
			var defaultContent = {
				"name" : "NA",
				"year" : self.currentYear,
				"description" : "No Events/Data Not Available",
				"photo" : "webapp/images/calendar/na.jpg"
			};
			_.each(_.range(1, 13), function(month) {
				if (_.isUndefined(_.find(filteredData, function(obj) {
					return obj.month == month;
				}))) {
					filteredData.push(_.extend({
						month : month
					}, defaultContent));
				}
			});
			filteredData = _.sortBy(filteredData, 'month');
			$(self.el).find('.calendar').html(
					Mustache.render(TemplateCalendar, {
						events : filteredData
					}));
			$(self.el).find('.flip').flip({
				trigger : 'hover'
			});
			self.checkLimits();
		},

		displayPreviousYear : function(event) {
			var self = this;
			event.preventDefault();
			if(!$(event.currentTarget).hasClass('not-allowed')) {
				self.currentYear -= 1;
				self.drawCalendarForCurrentYear();
			}
		},

		displayNextYear : function(event) {
			var self = this;
			event.preventDefault();
			if(!$(event.currentTarget).hasClass('not-allowed')) {
				self.currentYear += 1;
				self.drawCalendarForCurrentYear();
			}
		},

		checkLimits : function() {
			var self = this;
			if (self.minYear == self.currentYear) {
				$(self.el).find('.arrow-left').addClass('not-allowed');
			} else {
				$(self.el).find('.arrow-left').removeClass('not-allowed');
			}
			if (self.maxYear == self.currentYear) {
				$(self.el).find('.arrow-right').addClass('not-allowed');
			} else {
				$(self.el).find('.arrow-right').removeClass('not-allowed');
			}
		}

	});

	return CalendarView;
});