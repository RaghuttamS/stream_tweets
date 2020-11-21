var express = require('express');
var app = express();
var path = require('path');
/*Twitter module for node js*/
var Twit = require('twit');
/*Config file for Twitter Api credentials */
var configFile = require('./config/TwitterApiConfig.json');


/*Twitter object to access data*/
var T = new Twit(configFile);

app.use(express.static(__dirname + '/public'))
    /*Api to display index page*/
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/html/TweetsHome.html'));
});

/*Api to populate tweets based on #hashtag*/
app.get('/tweets', function(req, res) {
    console.log(req.query.source);
    var query_string = req.query.source;
    T.get('search/tweets', { q: query_string, count: 100 }, function(err, data, response) {
        //console.log(data)
        res.send(JSON.stringify(data));
    });
});

/*Api to populate tweest by user screen name*/
app.get('/tweets/username', function(req, res) {
    console.log(req.query.source);
    var query_string = req.query.source;
    T.get('statuses/user_timeline', { screen_name: query_string, count: 100 }, function(err, data, response) {
        //console.log(data)
        res.send(JSON.stringify(data));
    });
});


app.listen(8081, () => {
    console.log("Your server started on 8081")
});