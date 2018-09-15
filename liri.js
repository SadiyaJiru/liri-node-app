//Protecting API Keys in Node
//Read and set environment variables from .env
//This code reads any environment variables we assign locally and sets them to the process.env object
// prints `34e84d93de6a4650815e5420e0` to the console
//  console.log(process.env.SPOTIFY_ID)
require("dotenv").config();

// Include the request npm package
var request = require("request");
var fs = require("fs"); //reads and writes files
var keys = require("./keys.js");

// let space = "\n" + "\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0";

// var omdb = new OMDB(keys.omdb);

var Spotify = require("node-spotify-api");

//import

var spotifyAPI = new Spotify({
  id: keys.spotify.id,
  secret: keys.spotify.secret
});

// var OMDB =  process.env.OMDB_ID

// var omdbAPIKey = new movies({
//   id: keys.OMDB.id
// });

var liriArg1 = process.argv[2]; //movie-this, spotify-this-song...

switch (liriArg1) {
  case "movie-this":
    movies();
    break; // if user selects movie, call the movie() function
  case "spotify-this-song":
    spotifySearch();
    break; // if user selects movie, call the movie() function
  case "concert-this":
    findConcerts();
    break; // if user selects concert, call the findConcerts() function
}

// Functions
// Movie function, uses the Request module to call the OMDB api
function movies() {
  // fs.appendFile("log.txt", movie , function(err) {
  //   if (err) {
  //     return console.log(err);
  //   }
  var movie = process.argv[3];
  //if the movie doesn't exist
  if (!movie) {
    movie = "mr nobody";
  }
  movieName = movie;
  //NEED to PULL API KEY FROM KEYS.JS??????????????????????/
  // Then run a request to the OMDB API with the movie specified
  var queryUrl =
    "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

  // This line is just to help us debug against the actual URL.
  console.log("JSON info: " + queryUrl);

  request(queryUrl, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      console.log("--------Movie Info-----------" + "\n");
      console.log("Movie Title: " + JSON.parse(body).Title + "\n");
      console.log("Release Year: " + JSON.parse(body).Year + "\n");
      // console.log("Rotten Tomato Rating: " + JSON.parse(body).Ratings[0]+ "\n"); //Rotten Tomatoes Rating Not working
      console.log("Country: " + JSON.parse(body).Country + "\n");
      console.log("Language: " + JSON.parse(body).Language + "\n");
      console.log("Plot: " + JSON.parse(body).Plot + "\n"); // Mac OS line wraps in terminal after 80 chars
      console.log("Actors: " + JSON.parse(body).Actors + "\n");
      console.log("--------End Of Movie Infor-----------" + "\n");
    } else {
      console.log("Error :" + error);
      return;
    }
  });
  // }); // ending fs.append
}
///////////////////// End of Movie code ///////////////////////

function spotifySearch(song) {
  var song = process.argv[3];
  //if the movie doesn't exist
  if (!song) {
    song = "The Sign";
  }
  // songName = song

  spotifyAPI.search({ type: "track", query: song }, function(err, info) {
    if (err) {
      return console.log("Error occurred: " + err);
    } else {
      console.log("Song Name: " + " " + song);
      console.log("Artist Name: " + info.tracks.items[0].album.artists[0].name);
      console.log("Album Name: " + info.tracks.items[0].album.name);
      console.log(
        "URL: " + info.tracks.items[0].album.external_urls.spotify + "\n"
      );
    }
  });
}
///////////////////// End of Spotify code ///////////////////////
function findConcerts(band) {
  var band = process.argv[3];
  if (!band) {
    band = "ColdPlay";
  }

  var queryUrl =  "https://rest.bandsintown.com/artists/" + band + "/events?app_id=codingbootcamp";

  request(queryUrl, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      console.log("--------Concert Info-----------" + "\n");
      console.log("Movie Title: " + JSON.parse(body).name + "\n");
    }
  });
}
