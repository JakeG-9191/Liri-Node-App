// // API Keys
// // Spotify
// var Spotify = "a0b5da83f264438dafbbb4588b8f0bb0";

// // Bands in Town
// var BandsinTown = ""; 
// (`"https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"`)

// // OMDB
// var omdb = "http://www.omdbapi.com/?i=tt3896198&apikey=f7c07097";

// Axios
var axios = require("axios");

// // OMDB information
// axios.get("http://www.omdbapi.com/?t=interstellar&y=&plot=short&apikey=trilogy").then(function(response){
//     console.log(response.data);
// }).catch(function(error) {
//     if (error.response) {
//         console.log(error.response.data);
//     } else if (error.request) {
//         console.log(error.request);
//     } else {
//         console.log("Error", error.message);
//     }
//     console.log(error.config);
// });



// requestAnimationFrame("dotenv").config();

// var keys = require("./keys.js");

// var spotify = new spotify(keys.spotify);

var userRequest = (process.argv[2]);
var userInput = process.argv.slice(3).join("+");

console.log(userRequest);

var movieInfo = "movie-this";
var musicInfo = "spotify-this-song";
var concertInfo = "concert-this";

if (userRequest === movieInfo) {
    axios.get("http://www.omdbapi.com/?t=" + userInput + "&plot=short&apikey=trilogy").then(function(response) {
        console.log(response.data);
        }).catch(function(error) {
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
