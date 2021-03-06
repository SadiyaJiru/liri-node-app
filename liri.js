require("dotenv").config();
// Include the request npm package
var request = require("request");
var fs = require("fs"); //reads and writes files
var keys = require("./keys.js");
var moment = require("moment");

var Spotify = require("node-spotify-api");
var spotifyAPI = new Spotify({
  id: keys.spotify.id,
  secret: keys.spotify.secret
});

const OMDB = keys.OMDB;
const BandsInTown = keys.BandsInTown;

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

  case "do-what-it-says":
    doWhatItSays();
    break;

  default:
    console.log(
      "\r\n" +
        "Type one of the following commands after 'node liri.js' : " +
        "\r\n" +
        "1. movie-this  'ny movie name' " +
        "\r\n" +
        "2. spotify-this-song 'any song name' " +
        "\r\n" +
        "3. do-what-it-says." +
        "\r\n" +
        "4. concert-this." +
        "\r\n"
    );
}
// Movie function, uses the Request module to call the OMDB api
function movies() {
  var movie = process.argv.slice(3).join(" ");
  //if the movie doesn't exist
  if (!movie) {
    movie = "mr nobody";
  }
  movieName = movie;

  var queryUrl =
    "http://www.omdbapi.com/?t=" +
    movieName +
    "&y=&plot=short&apikey=" +
    OMDB.id;

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
  var song = process.argv.slice(3).join(" ");
  //if the movie doesn't exist
  if (!song) {
    song = "The Sign";
  }
  spotifyAPI.search({ type: "track", query: song }, function(err, data) {
    if (err) {
       console.log("Error occurred: " + err);
       return
    } else {
      console.log("Song Name: " + " " + song);
      console.log("Artist Name: " + data.tracks.items[0].album.artists[0].name);
      console.log("Album Name: " + data.tracks.items[0].album.name);
      console.log(
        "URL: " + data.tracks.items[0].album.external_urls.spotify + "\n"
      );
    }
  });
}
///////////////////// End of Spotify code ///////////////////////
function findConcerts(band) {
  var band = process.argv.slice(3).join(" ");
  if (!band) {
    band = "ColdPlay";
  }

  request(
    `https://rest.bandsintown.com/artists/${encodeURI(band)}/events?app_id=${
      BandsInTown.id
    }`,
    function(error, response, body) {
      if (!error && response.statusCode === 200) {
        body = JSON.parse(body);

        for (let i = 0; i < body.length; i++) {
          let time = moment(body[i].datetime).format("MM/DD/YYYY");

          console.log("--------Concert Info-----------" + "\n");
          console.log("Band/Artist Name: " + band);
          console.log(`Venue: ${body[i].venue.name}`);
          console.log(
            `Location: ${body[i].venue.city}, ${body[i].venue.region}, ${
              body[i].venue.country
            }`
          );
          console.log(`Date: ${time}`);
        }
      } else {
        console.log("Error :" + error);
        return;
      }
    }
  );
}
function doWhatItSays() {

  fs.readFile("random.txt", "utf8", function(error, data) {
    if (!error) {
      spotifySearch(data.tracks.items[0]);
    } else {
      console.log("Error occurred" + error);
    }
  });
}
// function log(logResults) {
//   fs.appendFile("log.txt", logResults, (error) => {
//     if(error) {
//       throw error;
//     }
//   });
// }
