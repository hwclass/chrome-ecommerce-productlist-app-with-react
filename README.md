chrome-ecommerce-productlist-app-with-react
===========================================

A basic product list application on chrome platform with ReactJS.

###usage - 1 : Browserify the React code into pure Javascript

<code code="javascript">
	<pre>
		browserify -t reactify app.js > app.bundle.js
	</pre>
</code>

###usage - 2 : Include into the browser_action.html file

<code code="html">
	<pre>
		<script type="text/javascript" src="app.bundle.js"></script>
	</pre>
</code>