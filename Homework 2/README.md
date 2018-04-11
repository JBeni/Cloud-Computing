# Rest Api

<hr>
<img src="Images/http_methods.png" alt="Not bad...">

* A REST API defines a set of functions that can be used to perform requests and receive responses via HTTP protocol.
* There are some confusions between some methods, like PUT vs POST, and in this homework I implemented the methods after the above image.
* I use a json file for my database. The rest is base-built on the url, I used some personalized url to make an implementation for the http methods (using split method).
* HTTP Methods that I implemented in the homework:
	* <span>GET    /product/fruit?=fruitName</span>
	* <span>PUT    /products/fruit=fruitName&method=methodName</span>
	* <span>POST   /products/fruit=fruitName&method=methodName</span>
	* <span>DELETE /products/fruit=fruitName&method=methodName</span>

* This version of my rest api is not completed yet (I didn't provide verification if some data didn't exists in database and I didn't use status code for different type of cases).
