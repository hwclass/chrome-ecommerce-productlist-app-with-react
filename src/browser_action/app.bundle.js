(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * @jsx React.DOM
 */
/*browserify -t reactify app.js > app.bundle.js*/

(function(config, React, $) {

	var Header = React.createClass({displayName: 'Header',
		
		render : function() {
			return (
				React.DOM.div( {id:"header", className:"cf"}, 
					React.DOM.img( {src:config.imgPaths.logo, width:"164", height:"26", className:"custom"})
				)
			)
		}

	});

	var Product = React.createClass({displayName: 'Product',

		handleMouseOver : function (e) {
			$(e.target).find('.product-overlay').removeClass('hidden');
		},

		handleMouseOut : function (e) {
			if (!$(e.target).find('.product-overlay').hasClass('hidden')) {
				$(e.target).find('.product-overlay').addClass('hidden');
			}
		},

		render : function() {
			return (
				React.DOM.li( {className:"product"}, 
					React.DOM.a( {className:"product-link", href:this.props.product.url_key, name:this.props.product.name, target:"_blank", onMouseOver:this.handleMouseOver, onMouseOut:this.handleMouseOut}, 
						React.DOM.img( {src:this.props.product.images[0]}),
						React.DOM.div( {className:"price"}, 
							React.DOM.p( {className:"brand-name"}, this.props.product.brand_name),
							React.DOM.p( {className:"brand-detail"}, this.props.product.name),
							React.DOM.p( {className:"price-detail-old"}, this.props.product.actual_price),
							React.DOM.p( {className:"price-detail"}, this.props.product.sale_price)
						),
						React.DOM.div( {className:"product-overlay hidden"})
					)
				)
			)
		}

	}); 

	var MissperaApp = React.createClass({displayName: 'MissperaApp',

	  getInitialState: function() {
	    return {
	      products: []
	    };
	  },

	  reduceCharOnShortDesc : function (text) {
	  	return text.substring(0, config.stringBoundry) + config.stringExtension;
	  },

	  componentDidMount: function() {
	    $.get(this.props.source, function(result) {
	      var products = result;
	      this.setState({
	        products: products
	      });
	    }.bind(this));
	  },

	  showError : function (code){
	  	$(config.el.loader).hide();
	  	if (code == config.errors['400']) {
	  		$(config.el.err).html(config.errorMessages.serverConnectionFailed);
	  	} else if (code == config.errors['500']) {
	  		$(config.el.err).html(config.errorMessages.internalServerError);
	  	} else if (code == 'timeout') {
	  		$(config.el.err).html(config.errorMessages.timeout);
	  	} else {
	  		$(config.el.err).html(config.errorMessages.unidentifiedError);
	  	}
	  	$(config.el.err).show();
	  },

	  isNull : function (o) {
	  	return (null == o ? true : false);
	  },

	  isUndefined : function (o) {
	    return (typeof o == 'undefined' ? true : false);
	  },

	  log : function (msg) {
	  	console.log(msg);
	  },

	  render: function() {
	  	var productsList = [];
	  	var len = (this.state.products?this.state.products.length:0);
	  	if (!this.isNull(this.state.products) && len > 0) {
		  	this.state.products.forEach(function(product) {
		  		product[config.json.name] = this.reduceCharOnShortDesc(product[config.json.name]);
		  		productsList.push(Product( {product:product}));
		  	}.bind(this));
		  	$(config.el.loader).hide();
		  }
    	return (
    		React.DOM.div( {className:"productsBox"}, 
    			Header(null),
    			React.DOM.ul( {id:"product_list", className:"cf"}, 
		    		productsList
		    	)
    		)
	    );
	  }

	});

	React.renderComponent(
	  MissperaApp( {source:"http://172.18.140.79:8000/ajax/favorite_products"} ),
	  document.getElementById('MissperaChromeApp')
	);

}(config, React, jQuery));
},{}]},{},[1])