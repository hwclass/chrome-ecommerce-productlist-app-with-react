chrome-ecommerce-productlist-app-with-react
===========================================

A basic product list application on chrome platform with ReactJS.

###usage - 1 : Browserify the React code into pure Javascript

<code lang="javascript">
	<pre>
		browserify -t reactify app.js > app.bundle.js
	</pre>
</code>

###usage - 2 : Include into the browser_action.html file

<code lang="html">
	<pre>
		<script type="text/javascript" src="app.bundle.js"></script>
	</pre>
</code>

###example data structure

<code lang="json">
	<pre>
		[
			{
				actual_price: "99.99"
				images: Array[1] : {
					0: "https://www.misspera.com/site_media/uploads/product_image/8652/8825_01_138x192.jpg"
				},
				name: "Euphoria EDP 100 ml"
				sale_price: "99.99"
				short_description: "Kadın Parfümü..."
				url_key: "https://www.misspera.com/p/calvin-klein-euphoria-edp-100-ml-kadin-parfumu"
			}
		]
	</pre>
</code>