define([ 'backbone', 'jquery', 'underscore', 'app/app',
		'text!template/gallery.html', 'mustache', 'json!data/gallery.json',
		'lightgallery', 'jquery.scrollto' ], function(Backbone, $, _, App, TemplateGallery,
		Mustache, GalleryJson, LightGallery, ScrollTo) {

	var GalleryView = Backbone.View.extend({

		el : '#content-wrapper',

		events : {

		},

		initialize : function() {
			this.render();
		},

		render : function() {
			var self = this;
			$(self.el).html(Mustache.render(TemplateGallery, GalleryJson));
			$(self.el).find('[data-gallery-name]').lightGallery({
				subHtmlSelectorRelative : false
			});
			$(window).scrollTo($(self.el), 500);
		},

	});

	return GalleryView;
});