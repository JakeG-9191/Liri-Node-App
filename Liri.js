require("dotenv").config();

var keys = require("./keys.js");

// Axios requirement
var axios = require("axios");
// Spotify Requirement
var Spotify = require("node-spotify-api");

var userRequest = (process.argv[2]);
var userInput = process.argv.slice(3).join("+");
// console.log(userRequest);

var movieInfo = "movie-this";
var musicInfo = "spotify-this-song";
var concertInfo = "concert-this";

if (userRequest === movieInfo) {
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
};

if (userRequest === concertInfo) {
    axios.get("https://rest.bandsintown.com/artists/" + userInput + "/events?app_id=codingbootcamp").then(function (response) {
        for (var i = 0; i < 5; i++) {
            console.log("------------Next Event----------------")
            console.log("Venue Name: " + response.data[i].venue.name)
            console.log("Venue Country: " + response.data[i].venue.country)
            console.log("Venue City: " + response.data[i].venue.city)
            console.log("Concert Time: " + response.data[i].datetime)
        }
    }).catch(function (error) {
        console.log(error)
    });
};

var spotify = new Spotify(keys.spotify);

if (userRequest === musicInfo) {
    spotify.search({
        type: "track", 
        query: userInput,
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
