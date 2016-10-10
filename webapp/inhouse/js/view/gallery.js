define([ 'backbone', 'jquery', 'underscore', 'app/app',
		'text!template/gallery.html', 'mustache', 'json!data/gallery.json', 'lightgallery' ], function(Backbone, $, _,
		App, TemplateGallery, Mustache, GalleryJson, LightGallery) {

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
			$('.gallery-container').lightGallery({
			    subHtmlSelectorRelative: false
			});
		},

	});

	return GalleryView;
});