(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * @jsx R.DOM
 */

(function(config, R, $) {

	/**
   * Header renders the header section of the app
   *
   */
	var Header = R.createClass({displayName: 'Header',
		
		/**
		 * render() renders the header
		 *
		 */
		render : function() {
			return (
				R.DOM.div( {id:"header", className:"cf"}, 
					R.DOM.img( {src:config.imgPaths.logo, width:"164", height:"26", className:"custom"})
				)
			)
		}

	});

	/**
	 * Product renders all the product one by one
	 *
	 */
	var Product = R.createClass({displayName: 'Product',

		/**
		 * handleMouseOver() reacts when a product is hovered
		 *
		 * @param <Event> e
		 */
		handleMouseOver : function (e) {
			$(e.target).find('.product-overlay').removeClass('hidden');
		},

		/**
		 * handleMouseOut() reacts when a product is unhovered
		 *
		 * @param <Event> e
		 */
		handleMouseOut : function (e) {
			if (!$(e.target).find('.product-overlay').hasClass('hidden')) {
				$(e.target).find('.product-overlay').addClass('hidden');
			}
		},

		/**
		 * render() renders a product within a list item
		 *
		 */
		render : function() {
			return (
				R.DOM.li( {className:"product"}, 
					R.DOM.a( {className:"product-link", href:this.props.product.url_key, name:this.props.product.name, target:"_blank", onMouseOver:this.handleMouseOver, onMouseOut:this.handleMouseOut}, 
						R.DOM.img( {src:this.props.product.images[0]}),
						R.DOM.div( {className:"price"}, 
							R.DOM.p( {className:"brand-name"}, this.props.product.brand_name),
							R.DOM.p( {className:"brand-detail"}, this.props.product.short_description),
							R.DOM.p( {className:"price-detail-old"}, this.props.product.actual_price),
							R.DOM.p( {className:"price-detail"}, this.props.product.sale_price)
						),
						R.DOM.div( {className:"product-overlay hidden"})
					)
				)
			)
		}

	}); 

	/**
	 * MissperaApp creates a React class for the whole application as a wrapper
	 *
	 */
	var MissperaApp = R.createClass({displayName: 'MissperaApp',

		/**
		 * getInitialState() returns states of the app
		 *
		 * @return <Array> products
		 */
	  getInitialState: function() {
	    return {
	      products: []
	    };
	  },

	  /**
	   * reduceCharOnShortDesc() returns a limited version of the text delivered as the argument
	   *
	   * @param <String> text
	   *
	   * @return <String>
	   */
	  reduceCharOnShortDesc : function (text) {
	  	return text.substring(0, config.stringBoundry) + config.stringExtension;
	  },

	  /**
	   * componentDidMount() connects the server and get the product list
		 *
	   */
	  componentDidMount: function() {
	    $.get(this.props.source, function(result) {
	      var products = result;
	      this.setState({
	        products: products
	      });
	    }.bind(this));
	  },

	  /**
	   * showError() arranges error messages
	   *
	   * @param <String> code
	   *
	   */
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

	  /**
	   * isNull() checks if the argument is null or not
	   *
	   * @param <Object> o
	   *
	   */
	  isNull : function (o) {
	  	return (null == o ? true : false);
	  },

	  /**
	   * isUndefined() checks if the argument is undefined or not
	   *
	   * @param <Object> o
	   *
	   */
	  isUndefined : function (o) {
	    return (typeof o == 'undefined' ? true : false);
	  },

	  /**
	   * log() logs message on the console
	   *
	   * @param <String> msg
	   *
	   */
	  log : function (msg) {
	  	console.log(msg);
	  },

	  /**
	   * render() renders the whole application
	   *
	   */
	  render: function() {
	  	var productsList = [];
	  	var len = (this.state.products?this.state.products.length:0);
	  	if (!this.isNull(this.state.products) && len > 0) {
		  	this.state.products.forEach(function(product) {
		  		product[config.json.shortDesc] = this.reduceCharOnShortDesc(product[config.json.shortDesc]);
		  		productsList.push(Product( {product:product}));
		  	}.bind(this));
		  	$(config.el.loader).hide();
		  }
    	return (
    		R.DOM.div( {className:"productsBox"}, 
    			Header(null),
    			R.DOM.ul( {id:"product_list", className:"cf"}, 
		    		productsList
		    	)
    		)
	    );
	  }

	});

	/**
	 * renderComponent() renders the whole app into the context as an element
	 *
	 */
	R.renderComponent(
	  MissperaApp( {source:"http://172.18.140.79:8000/ajax/favorite_products"} ),
	  document.getElementById('MissperaChromeApp')
	);

}(config, React, jQuery));
},{}]},{},[1])