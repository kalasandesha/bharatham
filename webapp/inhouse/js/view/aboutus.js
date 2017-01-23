define([ 'backbone', 'jquery', 'underscore', 'app/app',
		'text!template/aboutus.html', 'mustache', 'jquery.scrollto', 'json!data/press.json', 'lightgallery', 'readmore' ], function(Backbone, $, _,
		App, TemplateAboutUs, Mustache, ScrollTo, JsonPress, LightGallery, ReadMore) {

	var AboutUsView = Backbone.View.extend({

		el : '#content-wrapper',

		events : {
			'click .guru-link' : 'changeGuruSection'
		},

		initialize : function(section) {
			this.render(section);
		},

		render : function(section) {
			var self = this;
			$(self.el).html(Mustache.render(TemplateAboutUs, {}));
			$(".content-submenu-item." + section + "-link").parent().addClass("active");

			$.when(App.getAboutUsSectionHtml(section)).done(function(html) {
				if(section === "press") {
					$(self.el).find(".submenu-content-area").html(Mustache.render(html, JsonPress));
					$(self.el).find('[data-gallery-name]').lightGallery({
						subHtmlSelectorRelative : false
					});
				} else {
					$(self.el).find(".submenu-content-area").html(html);
					$(self.el).find('article').readmore();
				}
				$(window).scrollTo($(self.el).find('.content-area'), 500);
			}).fail(function() {
				alert("Error while loading the content");
			});

			if (section === "ourgurus") {
				self.displayGuru("Kannan");
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
		}

	});

	return AboutUsView;
});