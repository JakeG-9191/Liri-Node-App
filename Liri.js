// Require dotenv to be installed
require("dotenv").config();
// Grab necessary keys for Spotify from directory
var keys = require("./keys.js");
// Axios requirement
var axios = require("axios");
// Spotify Requirement
var Spotify = require("node-spotify-api");

var moment = require("moment")

// Define User Request and input for request
var userRequest = (process.argv[2]);
var userInput = process.argv.slice(3).join("+");
// console.log(userRequest);

// Provide defined user requests for application
var movieInfo = "movie-this";
var musicInfo = "spotify-this-song";
var concertInfo = "concert-this";


// Run Movie info (tied with OMDB) with correct search paramaters, else defaults to Mr. Nobody
if (userRequest === movieInfo && userInput.length > 1) {
    axios.get("http://www.omdbapi.com/?t=" + userInput + "&plot=short&apikey=trilogy").then(function (response) {
        console.log("-----------------Movie Info---------------")
        console.log("Title: " + response.data.Title)
        console.log("Release Year: " + response.data.Year)
        console.log("IMDB Rating: " + response.data.Ratings[0].Value)
        console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value)
        console.log("Country of Production: " + response.data.Country)
        console.log("Languages: " + response.data.Language)
        console.log("Plot: " + response.data.Plot)
        console.log("Actors: " + response.data.Actors)
    }).catch(function (error) {
        if (error.response) {
            console.log(error.response.data);
        } else if (error.request) {
            console.log(error.request);
        } else {
            console.log("Error", error.message);
        }
        console.log(error.config);
    });
} else if (userRequest === movieInfo && userInput.length < 1) {
    axios.get("http://www.omdbapi.com/?t=Mr.+Nobody&plot=short&apikey=trilogy").then(function (response) {
        console.log("-----------------Movie Info---------------")
        console.log("Title: " + response.data.Title + "\n")
        console.log("Release Year: " + response.data.Year + "\n")
        console.log("IMDB Rating: " + response.data.Ratings[0].Value + "\n")
        console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value + "\n")
        console.log("Countries of Production: " + response.data.Country + "\n")
        console.log("Languages: " + response.data.Language + "\n")
        console.log("Plot: " + response.data.Plot + "\n")
        console.log("Actors: " + response.data.Actors)
    }).catch(function (error) {
        if (error.response) {
            console.log(error.response.data);
        } else if (error.request) {
            console.log(error.request);
        } else {
            console.log("Error", error.message);
        }
        console.log(error.config);
    });
}


// Run Concert Info (tied to BandsinTown) with correct search parameters
if (userRequest === concertInfo) {
    axios.get("https://rest.bandsintown.com/artists/" + userInput + "/events?app_id=codingbootcamp").then(function (response) {
        for (var i = 0; i < 5; i++) {
            var time = moment(response.data[i].datetime).format("L")

            console.log("\n" + "------------Next Event----------------")
            console.log("Venue Name: " + response.data[i].venue.name)
            console.log("Venue Country: " + response.data[i].venue.country)
            console.log("Venue City: " + response.data[i].venue.city)
            // console.log("Concert Time: " + response.data[i].datetime)
            console.log(time)
        }
    }).catch(function (error) {
        console.log(error)
    });
};


// Run Music Info (tied to Spotify) with correct search parameters, else defaults to Ace of Base, The Sign
var spotify = new Spotify(keys.spotify);

if (userRequest === musicInfo) {
    spotify.search({
        type: "track", 
        query: userInput || "The Sign Ace of Base",
        limit: 1,
        }).then(function (response) {
            // console.log(response.tracks);
            // console.log("-----------------")
            // console.log(response.tracks.items[0]);
            console.log("-------Artist Name----------")
            console.log(response.tracks.items[0].artists[0].name);
            console.log("-------Song Name----------")
            console.log(response.tracks.items[0].name);
            console.log("--------Preview URL---------")
            console.log(response.tracks.items[0].preview_url);
            console.log("--------Album Name---------")
            console.log(response.tracks.items[0].album.name);
        })
        .catch(function (err) {
            console.log(err);
        });
};
