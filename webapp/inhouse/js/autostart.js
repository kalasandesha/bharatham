requirejs.config({
	baseUrl : 'webapp/third-party/js/',
	paths : {
		app : '../../inhouse/js/app',
		view : '../../inhouse/js/view',
		model : '../../inhouse/js/model',
		template : '../../inhouse/template',
		bootstrap : './bootstrap',
		data: '../../data'
	},
	shim : {
		'bootstrap/affix' : {
			deps : [ 'jquery' ],
			exports : '$.fn.affix'
		},
		'bootstrap/alert' : {
			deps : [ 'jquery' ],
			exports : '$.fn.alert'
		},
		'bootstrap/button' : {
			deps : [ 'jquery' ],
			exports : '$.fn.button'
		},
		'bootstrap/carousel' : {
			deps : [ 'jquery' ],
			exports : '$.fn.carousel'
		},
		'bootstrap/collapse' : {
			deps : [ 'jquery' ],
			exports : '$.fn.collapse'
		},
		'bootstrap/dropdown' : {
			deps : [ 'jquery' ],
			exports : '$.fn.dropdown'
		},
		'bootstrap/modal' : {
			deps : [ 'jquery' ],
			exports : '$.fn.modal'
		},
		'bootstrap/popover' : {
			deps : [ 'jquery' ],
			exports : '$.fn.popover'
		},
		'bootstrap/scrollspy' : {
			deps : [ 'jquery' ],
			exports : '$.fn.scrollspy'
		},
		'bootstrap/tab' : {
			deps : [ 'jquery' ],
			exports : '$.fn.tab'
		},
		'bootstrap/tooltip' : {
			deps : [ 'jquery' ],
			exports : '$.fn.tooltip'
		},
		'bootstrap/transition' : {
			deps : [ 'jquery' ],
			exports : '$.fn.transition'
		},
		'cookie' : {
			deps : [ 'jquery' ]
		},
		'lightgallery' : {
			deps : [ 'jquery' ]
		}
	}
});

require([ 'view/navbar', 'view/footer', 'app/route' ], function(
		NavbarView, FooterView) {

	new NavbarView();
	new FooterView();
});
