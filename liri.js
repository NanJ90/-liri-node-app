var key = require('./key.js');
var spotify = require('node-spotify-api');
var request = require('request');
var fs = require('fs');

var twitterK = key.twitterKeys;
var spotifyK = key.spotifyKeys;
var spotify = new spotify({
    id: spotifyK.client_ID,
    secret: spotifyK.client_Secret
});

var arr = process.argv;
// console.log(arr);
var arrLength = process.argv.length;
// console.log("it is:" + arrLength);

if (arrLength == 3) {
    if (arr[2] === "my-tweets") {
        mytweet();
    } else if (arr[2] === "movie-this") {
        var queryUrl = "http://www.omdbapi.com/?t=Mr.nobody&y=&plot=short&apikey=40e9cece";
        request(queryUrl, function(error, response, body) {
            if (!error && response.statusCode === 200) {

                console.log("Title: " + JSON.parse(body).Title + ".");
                console.log("Release Year: " + JSON.parse(body).Year + ".");
                console.log("IMDB: " + JSON.parse(body).imdbRating + ".");
                console.log("Rotton Tomatoes: " + JSON.parse(body).Ratings[1].Value + ".");
                console.log("Country: " + JSON.parse(body).Country + ".");
                console.log("Plot: " + JSON.parse(body).Plot + ".");
                console.log("Cast: " + JSON.parse(body).Actors + ".");

            }
        });

    } else if (arr[2] === "spotify-this-song") {
        spotify.search({ type: 'track', query: '"The Sign by Ace of Base"' }, function(error, data) {
            if (error) {
                return console.log(error);
            }
            // console.log(JSON.stringify(data, null , 2));
            console.log("URL: " + data.tracks.items[2].album.artists[0].external_urls.spotify);
            console.log("Album: " + data.tracks.items[2].album.artists[0].name);
            console.log("Artist: " + data.tracks.items[2].artists[0].name);
        });
  
    } else if (arr[2] === "do-what-it-says") {
        fs.readFile("random.txt", "utf8", function(err, res) {
            if (err) {
                return (err);
            }
            // console.log(res);
            var resArr = res.split(",");
        	
            spotify.search({ type: 'track', query: resArr[1] }, function(error, data) {
            if (error) {
                return console.log(error);
            }
            // console.log(JSON.stringify(data, null , 2));
            console.log("URL: " + data.tracks.items[2].album.artists[0].external_urls.spotify);
            console.log("Album: " + data.tracks.items[2].album.artists[0].name);
            console.log("Artist: " + data.tracks.items[2].artists[0].name);
        });
        });
    } else {
        console.log("nothing for you");
    }
} else if (arrLength > 3) {
    if (arr[2] === "movie-this") {
        movieThis();
    } else if (arr[2] === "spotify-this-song") {
        spotifySong();
    } else {
        console.log("nothing for you");
    }

} else {
    console.log("nothing for you");

}

// mytweet
function mytweet() {

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
            for (var i = 0; i < tweets.length; i++) {
                console.log(tweets[i].created_at, tweets[i].text);               
            }


    });
}

function movieThis() {
    var movieName = "";
    for (var i = 3; i < arrLength; i++) {
        if (i > 3 && i < arrLength) {
            movieName = movieName + "+" + arr[i];

        } else {
            movieName += arr[i];
        }
    }
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=40e9cece";
    // console.log(queryUrl);

    request(queryUrl, function(error, response, body) {
        if (!error && response.statusCode === 200) {

            console.log("Title: " + JSON.parse(body).Title + ".");
            console.log("Release Year: " + JSON.parse(body).Year + ".");
            console.log("IMDB: " + JSON.parse(body).imdbRating + ".");
            console.log("Rotton Tomatoes: " + JSON.parse(body).Ratings[1].Value + ".");
            console.log("Country: " + JSON.parse(body).Country + ".");
            console.log("Plot: " + JSON.parse(body).Plot + ".");
            console.log("Cast: " + JSON.parse(body).Actors + ".");

        }
    });
}

// spofiySong();
function spotifySong() {
    var songName = '';
    for (var i = 3; i < arrLength; i++) {
        if (i > 3 && i < arrLength) {
            songName = songName + "+" + arr[i];

        } else {
            songName += arr[i];
        }
    }
    // print out a bunch of data, some things shows [objects]
    spotify.search({ type: 'track', query: songName }, function(error, data) {
        if (error) {
            return console.log(error);
        }
        // console.log(JSON.stringify(data, null , 2));
        console.log("URL: " + data.tracks.items[2].album.artists[0].external_urls.spotify);
        console.log("Album: " + data.tracks.items[2].album.artists[0].name);
        console.log("Artist: " + data.tracks.items[2].artists[0].name);
    });
}

// log.txt appeding
// function update(){

// fs.writeFile("log.txt",tweets[i].created_at, tweets[i].text, function(err) {
//   if (err) {
//     return console.log(err);
//   }
//   console.log("long.txt was updated!");

// });

// }
// var log4js = require('log4js');
// log4js.configure({
//   appenders: [
//     { type: 'console' },
//     { type: 'file', filename: 'log.txt', category: 'log' }
//   ]
// });




