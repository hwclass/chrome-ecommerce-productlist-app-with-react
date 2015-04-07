/**
 * @jsx R.DOM
 */

(function(c, R, $) {

  /**
   * Header renders the header section of the app
   */
  var Header = R.createClass({displayName: 'Header',

    /**
     * render() renders the header
     */
    render : function() {
      return (
        R.DOM.div({id:"header", className:"cf"}, 
          R.DOM.img({src:c.imgPaths.logo, width:"164", height:"26", className:"custom"})
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
        R.DOM.li({className:"product"}, 
          R.DOM.a({className:"product-link", href:this.props.product.url_key, name:this.props.product.name, target:"_blank", onMouseOver:this.handleMouseOver, onMouseOut:this.handleMouseOut}, 
            R.DOM.img({src:this.props.product.images[0]}),
            R.DOM.div({className:"price"}, 
              R.DOM.p({className:"brand-name"}, this.props.product.brand_name),
              R.DOM.p({className:"brand-detail"}, this.props.product.short_description),
              R.DOM.p({className:"price-detail-old"}, this.props.product.actual_price),
              R.DOM.p({className:"price-detail"}, this.props.product.sale_price)),
            R.DOM.div( {className:"product-overlay hidden"})
          )
        )
      )
    }

  }); 

  /**
   * chromeApp creates a React class for the whole application as a wrapper
   */
  var chromeApp = R.createClass({displayName: 'chromeApp',

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
      return text.substring(0, c.stringBoundry) + c.stringExtension;
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
      $(c.el.loader).hide();
      if (code == c.errors['400']) {
        $(c.el.err).html(c.errorMessages.serverConnectionFailed);
      } else if (code == c.errors['500']) {
        $(c.el.err).html(c.errorMessages.internalServerError);
      } else if (code == 'timeout') {
        $(c.el.err).html(c.errorMessages.timeout);
      } else {
        $(c.el.err).html(c.errorMessages.unidentifiedError);
      }
      $(c.el.err).show();
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
     * render() renders the application
     *
     */
    render: function() {
      var productsList = [];
      var len = (this.state.products?this.state.products.length:0);
      if (!this.isNull(this.state.products) && len > 0) {
        this.state.products.forEach(function(product) {
        	product[c.json.shortDesc] = this.reduceCharOnShortDesc(product[c.json.shortDesc]);
        	productsList.push(Product( {product:product}));
        }.bind(this));
        $(c.el.loader).hide();
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
   */
  R.renderComponent(
    chromeApp({source:"http://localhost:port/ajax/source"}),
    document.getElementById('chromeApp')
  );

}(config, React, jQuery));