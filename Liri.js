// Require dotenv to be installed
require("dotenv").config();
// Grab necessary keys for Spotify from directory
var keys = require("./keys.js");
// Axios requirement
var axios = require("axios");
// Spotify Requirement
var Spotify = require("node-spotify-api");
// Moment Requirement
var moment = require("moment")
// FS Requirement
var fs = require("fs");

// Define User Request and input for request
var userRequest = (process.argv[2]);
var userInput = process.argv.slice(3).join("+");

// Provide defined user requests for application
var movieInfo = "movie-this";
var musicInfo = "spotify-this-song";
var concertInfo = "concert-this";
var extraRequest = "do-what-it-says";

// Run Movie info (tied with OMDB) with correct search paramaters, else defaults to Mr. Nobody
if (userRequest === movieInfo && userInput.length > 1) {
    axios.get("http://www.omdbapi.com/?t=" + userInput + "&plot=short&apikey=trilogy").then(function (response) {
        console.log("\n-----------------Movie Info---------------")
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
        console.log("\n-----------------Movie Info---------------")
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
};

// Run Concert Info (tied to BandsinTown) with correct search parameters
if (userRequest === concertInfo) {
    axios.get("https://rest.bandsintown.com/artists/" + userInput + "/events?app_id=codingbootcamp").then(function (response) {
        for (var i = 0; i < 5; i++) {
            var time = moment(response.data[i].datetime).format("L")

            console.log("\n------------Next Event----------------")
            console.log("Venue Name: " + response.data[i].venue.name)
            console.log("Venue Country: " + response.data[i].venue.country)
            console.log("Venue City: " + response.data[i].venue.city)
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
        console.log("\n-------Artist Name----------")
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

// This will read text from "random.txt" and perform the proper search based on the command and search parameters provided 
if (userRequest === extraRequest) {
    fs.readFile("random.txt", "utf8", function (err, data) {
        if (err) {
            return console.log(err)
        }
        var moreInfo = data.split(",");

        var command = moreInfo[0];
        var doThisSearch = moreInfo[1];

        if (command === musicInfo) {
            spotify.search({
                type: "track",
                query: doThisSearch,
                limit: 1,
            }).then(function (response) {
                console.log("\n-------Artist Name----------")
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
        }
        if (command === concertInfo) {
            axios.get("https://rest.bandsintown.com/artists/" + doThisSearch + "/events?app_id=codingbootcamp").then(function (response) {
                for (var i = 0; i < 5; i++) {
                    var time = moment(response.data[i].datetime).format("L")

                    console.log("\n------------Next Event----------------")
                    console.log("Venue Name: " + response.data[i].venue.name)
                    console.log("Venue Country: " + response.data[i].venue.country)
                    console.log("Venue City: " + response.data[i].venue.city)
                    console.log(time)
                }
            }).catch(function (error) {
                console.log(error)
            });
        }
        if (command === movieInfo) {
            axios.get("http://www.omdbapi.com/?t=" + doThisSearch + "&plot=short&apikey=trilogy").then(function (response) {
                console.log("\n-----------------Movie Info---------------")
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
        }
    })
};

// This will create a permanent log that keeps records of all searches the user inputs and appends to the log.txt
var loggedInfo = "\n------Next Search------\n" + userRequest + "\n" + userInput + "\n"

fs.appendFile("log.txt", loggedInfo, function (error) {
    if (error) {
        console.log(error)
    }
});