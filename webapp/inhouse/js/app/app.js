define(
		[ 'jquery', 'underscore', 'cookie' ],
		function($, _) {

			var instance = null;

			function App() {
				if (instance !== null) {
					throw new Error(
							"Cannot instantiate more than one App, use App.getInstance()");
				}
				this.initialize();
			}

			App.prototype = {

				initialize : function() {
					
				},
			
				getAboutUsSectionHtml : function(section) {
					return this.getSectionHtml("webapp/inhouse/template/aboutus/" + section + "-content.html");
				},
				
				getOurGurusSectionHtml : function(section) {
					return this.getSectionHtml("webapp/inhouse/template/aboutus/ourgurus/" + section + ".html");
				},
				
				getKalotthungaAwardeesHtml : function(year) {
					return this.getSectionHtml("webapp/inhouse/template/kalotthunga/" + year + ".html");
				},
				
				getFestivalHtml : function(festival) {
					return this.getSectionHtml("webapp/inhouse/template/festivals/" + festival + ".html");
				},
				
				getFestivalYearHtml : function(festival, year) {
					return this.getSectionHtml("webapp/inhouse/template/festivals/" + festival + "/" + year + ".html");
				},
				
				getSocialInitiativesSectionHtml : function(section) {
					return this.getSectionHtml("webapp/inhouse/template/socialinitiatives/" + section + "-content.html");
				},
				
				getSectionHtml : _.memoize(function(section) {
					var self = this;
					var defer = $.Deferred();
					$.get({
						url: section,
						dataType: "html",
						success: function(html) {
							defer.resolve(html);
						},
						error: function() {
							defer.reject(arguments);
						}
					});
					return defer;
				}),
				
				subscribeEmail: function(email) {
					return this.postDataToServer({
						option: 'subscribeNewsLetter',
						email: email
					});
				},
				
				contactUs: function(name, email, message) {
					return this.postDataToServer({
						option: 'contactUs',
						email: email,
						name: name,
						message: message
					});
				},
				
				postDataToServer: function(data) {
					var self = this;
					var defer = $.Deferred();
					$.ajax({
						url: 'webapp/php/actions.php',
						dataType: 'json',
						data : data,
						method: 'post',
						success: function(data) {
							defer.resolve(data);
						},
						error: function() {
							defer.reject(arguments);
						}
					});
					return defer;
				}
			};

			App.getInstance = function() {
				if (instance === null) {
					instance = new App();
				}
				return instance;
			};

			return App.getInstance();
		});