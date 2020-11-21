# stream_tweets
Demo project to stream tweets using hashtag or specific tweeter account
In This project Node Js (Express Js) is used. 
After downloading project need to add node modules and express modules by using
 
"npm install express"

 
Then need to install Twitter API Client for node called "Twit" which supports for REST and Streaming APIs.

"npm install twit"

Now user need to add twitter developer account credentials in config file. 

path: config/TwitterApiConfig.json

"consumer_key":"",
"consumer_secret":"",
"access_token":"",
"access_token_secret":"",
 
Once these changes done we can run the application using 

"node index.js"

If nodemon tool/utility is present then use

"nodemon index.js"

Here when started Twit creates object using 

"var twitterObj = new Twit(....)"
  
Then tweets with hashtag will be rendered using 

"twitterObj.get('search/tweets', { q: query_string, count: 100 }, function(err, data, response)"

with query_string of encoded hashtag like %23India

Tweets with twitter account screen name will be rendered using 

"twitterObj.get('statuses/user_timeline', { screen_name: query_string, count: 100 }, function(err, data, response)"

were query_string contain username without "@" attached example "@venu"-> "venu".

At present Per search max 100 tweets will be rendered if present this count can be increased as per requirement. 

This application uses 8081 port to serve. 
