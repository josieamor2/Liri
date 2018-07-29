

require("dotenv").config();
var keys = require("./keys.js");
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');
var fs = require('fs');
var track = process.argv[3];

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);


function twitterTweets(){
    var params = { screen_name: 'josieamordesig1', text: '' };
    client.get('statuses/user_timeline', params, function (error, tweets) {
        if (!error) {
            console.log(!error);

        }
        for (var i = 0; i < 20; i++) {
            console.log("Date: " + tweets[i].created_at);
            console.log("Tweet: " + tweets[i].text);
        }
    });
}

function spotifySong(track){
    
    if(track == null){
        track = 'The Sign Ace of Base'
    }
        

    spotify.search({ type: 'track', query: track, limit: 1 }, function (err, data) {
        if (err) {


        } else {
            results = data.tracks;
            console.log(results.items[0].album.name);
            console.log(results.items[0].album.artists[0].name);
            console.log(results.items[0].name);
            console.log(results.items[0].preview_url);
        }

    });

}

function omdbMovie(){
    var movie = process.argv[3];
    if (movie == null){
        movie = 'Mr. Nobody'
    }
    request('http://www.omdbapi.com/?t=' + movie + '&y=&plot=short&apikey=trilogy', function (error, response, body) {
        
        console.log('Title:' + JSON.parse(body).Title);
        console.log('Year:' + JSON.parse(body).Year);
        console.log('Rating:' + JSON.parse(body).imdbRating);
        console.log('Country:' + JSON.parse(body).Country);
        console.log('Language:' + JSON.parse(body).Language);
        console.log('Plot:' + JSON.parse(body).Plot);
        console.log('Actors:' + JSON.parse(body).Actors);
    });
}
function randomText(){
    fs.readFile('random.txt', "utf8" , function (err, data) {
        // var song = process.argv[2]
        data = data.split(",");
        
        console.log(data[1]);
        var random = data[0];

        if(random === 'spotify-this-song'){
            
            spotifySong(data[1]);
        }
        // spotifySong(data[1]);
    })
}



if (process.argv[2] === "my-tweets") {
    twitterTweets();
} else if (process.argv[2] === "spotify-this-song") {
    spotifySong(track);
} else if (process.argv[2] === "movie-this") {
    omdbMovie();
} else if (process.argv[2] === `do-what-it-says`) {
    randomText();
}



