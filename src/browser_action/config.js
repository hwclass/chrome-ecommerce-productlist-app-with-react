/**
 * config is the configuration wrapper object of the app
 */
var config = {
	site : 'http://www.some.com',
	domains : {
		some : 'some.com'
	},
	el : {
		productList : $('#product_list'),
		productTemplate : $('#productTemplate'),
		loader : $('#loader'),
		err : $("#err")
	},
	imgPaths : {
		logo : '../../img/logo.png'
	},
	urls : {
		favouriteProducts : 'http://127.0.0.1/ajax/favorite_products',
		fireabase : 'https://product-api.firebaseio.com'
	},
	errors : {
		400 : '400',
		500 : '500',
		timeout : 'timeout'
	},
	errorMessages : {
		serverConnectionFailed : 'Sunucuya bağlanılamıyor...',/*400*/
		internalServerError : 'Sunucu taraflı bir hata oluştu...',/*500*/
		timeout : 'Sayfa zaman aşımına uğradı. Lütfen tekrar deneyiniz...',
		unidentifiedError : 'Beklenmeyen bir hata oluştu. Lütfen tekrar deneyiniz.'
	},
	stringBoundry : 16,
	stringExtension : '...',
	json : {
		shortDesc : 'short_description',
		name : 'name'
	}
};