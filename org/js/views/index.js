(function() {
	define(['require', 'jquery', 'underscore', 'bb', 'i/item/c','text!/html/index.html'], function(require, $, _, Backbone, Items) {
		return Backbone.View.extend({
			id: 'index',
			initialize: function(options) {
                var that = this;
				this.___ = options.___;
				this.items = new Items(null,{ s: this.___.so});
				var Home = require('text!/html/index.html');
		        this.hom = _.template(Home);
		        this.$el.html(this.hom({}));
			    that.render();
            	
			}
            ,events:{}
            ,render:function(){

				var that = this;
            }
		});	
	});

}).call(this);