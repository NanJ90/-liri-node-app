var key = require('./key.js');
var app = process.argv[2]
if (app === "my-tweets"){
	mytweet();
}
else if (app === "spotify-this-song") {
	theSign()
}
else{
	console.log("Working on it");
}
function mytweet(){
var twitterK = key.twitterKeys;
var Twitter = require('twitter');

var client = new Twitter({
	consumer_key: twitterK.consumer_key,
	consumer_secret: twitterK.consumer_secret,
	access_token_key: twitterK.access_token_key,
	access_token_secret: twitterK.access_token_secret
});


var params = {
    screen_name: 'Nannn_J',
    count: 3 

};

client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error) 
    for(var i = 0; i < tweets.length; i++){
    		console.log(tweets[i].created_at, tweets[i].text);
    	}
    	
	});
}
// mytweet();
function theSign(){
	var spotifyK = key.spotifyKeys;
	var spotify = require('node-spotify-api');

	var spotify = new spotify({
		id:spotifyK.client_ID,
		secret:spotifyK.client_Secret
	});
// print out a bunch of data, some things shows [objects]
	spotify.search({ type: 'track', query: '"the sign"', limit: 5 }, function(error, data){
		if(error){
			return console.log(error);
		}
		console.log(data.tracks.items);
	});
}
