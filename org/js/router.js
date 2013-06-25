(function() {

	define(['require', 'jquery', 'underscore', 'backbone'], function(require, $, _, Backbone) {
		var AppRouter, initialize;
		AppRouter = Backbone.Router.extend({
			routes: {				
				 '!_=_'				: 'index'
				,'!/'				: 'index'
				,'*actions'			: 'index'
			},
			loadCss: function(url, keep) {
				var link;
				if ($('link[href="' + url + '"]').length === 0) {
					link = document.createElement("link");
					link.type = "text/css";
					link.rel = "stylesheet";
					link.href = url;
					document.getElementsByTagName("head")[0].appendChild(link);
					return $('link[href="' + url + '"]').attr("data-keep", keep);
				}
			},
			dontHaveAccess: function(to) {
				return $('#content').html('\
					<center>\
					<div id=error class="ui-state-error ui-corner-all">\
					<p><img src="/images/error/warning.png" />\
					<span class="error-text" >You dont have access to #{to} </span>\
					</p>\
					</div>\
					</center>');
			},
			pageError: function(err) {
				return $('#content').html('\
					<center>\
					<div id=error class="ui-state-error ui-corner-all">\
					<p>\
					<img src="/images/error/warning.png" />\
					<span class="error-text" > #{err}</span>\
					</p>\
					</div>\
					</center>');
			},
			pagePermission: function(module, err, query, role, ___, callback) {},
			onPageStart: function(page, ___) {
				___.ga('send', 'pageview', page);
				___.c.save({
					page: page
				});
				___.i.save({
					page: page
				});
				$('a').removeClass("active");
				$('a[href="#!' + page + '"]').addClass("active");
				//console.log('a[href="#!' + page + '"]', $('a[href="#!' + page + '"]'));
				return ___;
			}
		});
		initialize = function(options) {
			var ___;
			___ = options.___;
			___.route = this;
			___.router = new AppRouter(options);
			___.view.$el.append('<div id=content></div>');
			___.view.$el.append('<div id=sidePanel></div>');
			___.view.$el.append('<div id=loader>\
				<h5 style="position:fixed;top:40%;left:40%;z-index:1004;">Loading</h5>\
				</div>');
			___.view.$el.append('<div id=overlaybg></div>');
			___.view.$el.append('<div id=overlay></div>');
			$('#content').hide();
			$('#overlaybg').click(function() {
				$('#overlay').hide();
				$('#overlay').html('');
				return $(this).hide();
			});
		
		
			___.router.on('route:index', function(actions) {
					var path = 'index';
					___ = ___.router.onPageStart(path, ___);

					require(['views/index'], function(Page) {
						___.router.loadCss('/css/index.css');
						if(___.view.$('#content #index').length >0)
						 	___.view.$('#content #index').show()
						else{
							page = ___.vm.create(___.view, 'index', Page, {___: ___ });
							___.view.$('#content').append(page.$el)
						}
					});
					return;
				});

			require(['views/topPage'], function(Page) {
				var page;
				page = ___.vm.create(___.view, 'top', Page, {
					___: ___
				});
				___.view.$el.prepend(page.$el);			
			});
			Backbone.history.start();
			return this;
		};
		return {
			initialize: initialize
		};
	});

}).call(this);
