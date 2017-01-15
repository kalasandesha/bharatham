define([ 'backbone', 'jquery', 'underscore', 'app/app',
		'text!template/admin.html', 'text!template/admin-advanced.html', 'mustache', 'notify', 'moment' ], function(Backbone, $, _,
		App, TemplateAdmin, TemplateAdminAdvanced, Mustache, Notify, Moment) {

	var AdminView = Backbone.View.extend({

		el : '#content-wrapper',
		
		passcode : undefined,

		events : {
			'click .admin-passcode-button' : 'loadAdminSection',
			'click .update-queries-button': 'updateQueries'
		},

		initialize : function(section) {
			this.render(section);
		},

		render : function(section) {
			var self = this;
			$(self.el).html(Mustache.render(TemplateAdmin, {}));
		},
		
		loadAdminSection: function(event) {
			var self = this;
			event.preventDefault();
			self.passcode = $(self.el).find('#password').val();
			$.when(App.getAdminData(self.passcode)).done(function(result){
				if(result.success) {
					_.each(result.queries, function(obj){
						if(obj.reviewed == 1) {
							obj.reviewed_string = "checked";
						}
					});
					
					$.notify(result.message, "success");
					$(self.el).find('.admin-section').addClass('sr-only');
					$(self.el).find('.admin-advanced').html(Mustache.render(TemplateAdminAdvanced, result));
				} else {
					$.notify(result.message, "error");
				}
			}).fail(function(result){
				$.notify(result.message, "error");
			}).always(function(){
				$(self.el).find('#password').val("");
			});
		},
		
		updateQueries: function(event) {
			var self = this;
			event.preventDefault();
			var unreviewed = [];
			var reviewed = [];
			$(self.el).find('.reviewed-checkbox').each(function(i,e){
				var $e = $(e);
				if($e.is(':checked')) {
					if($e.attr('data-reviewed') == 0) {
						reviewed.push($e.attr('id'));
					}
				} else {
					if($e.attr('data-reviewed') == 1) {
						unreviewed.push($e.attr('id'));
					}
				}
			});
			$.when(App.updateQueries(self.passcode, reviewed, unreviewed)).done(function(result){
				if(result.success) {
					$.notify(result.message, "success");
					_.each(unreviewed, function(id){
						$(self.el).find('#'+id).attr('data-reviewed', 0);
						$(self.el).find('#'+id + '-timestamp').html('');
					});
					_.each(reviewed, function(id){
						var now = Moment().format("YYYY-MM-DD HH:mm:ss");
						$(self.el).find('#'+id).attr('data-reviewed', 1);
						$(self.el).find('#'+id + '-timestamp').html(now);
					});
				} else {
					$.notify(result.message, "error");
				}
			}).fail(function(result){
				$.notify(result.message, "error");
			});
		}

	});

	return AdminView;
});