* Homework [1]: Create an application that provides results from at least three different web services. Use or implement a system that allows (at least): monitoring of running web services, concurrent number of requests, logging requests/responses.

* Observation: The third web service must use the results from previous two.

<hr>

* Within this homework I used the following 4 web services:
	* Wikipedia Api
		* With this api I search information about various things
		* The response to the request is an array with: the name of the search, a link to the wikipedia and some information about the given word
	* Bing Api
		* With this api I search images about different places
		* In order to use this api you need a key (you can get this key from the microsoft site, the key lasts 30 days), and the response of the request is in json format
	* Github Api
		* I use this api for authentication first, because I need a token that is given when I login in my account to create a gist, where I put some information and an image, then I posted this gist on github where it can be seen by everyone
	* LocalStorage (Html5 Api)
		* With this api I save data in the browser
		* I implemented a system that saves both the request and the response of a request, in case of success or failure, specific to each service
	* Other
		* Additionally, I made a system that allow to download in json format the data (saved in the browser) for each service
