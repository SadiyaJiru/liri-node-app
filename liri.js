//Protecting API Keys in Node
//Read and set environment variables from .env
//This code reads any environment variables we assign locally and sets them to the process.env object
// prints `34e84d93de6a4650815e5420e0` to the console
//  console.log(process.env.SPOTIFY_ID) 
require("dotenv").config();

// Include the request npm package (Don't forget to run "npm install request" in this folder first!)
var request = require("request");
var fs = require("fs"); //reads and writes files
var keys = require("./keys.js");
// var spotify = require ("spotify"); //from keys.js??
// var omdb = require("OMDB");//from keys.js??



var liriArg1 = process.argv[2]; //movie-this, spotify-this-song...

switch(liriArg1) {
  case "movie-this": movies(); break; // if user selects movie, call the movie() function
};

// Functions
	// Movie function, uses the Request module to call the OMDB api
	function movies(){
    var movie = process.argv[3];
    //if the movie doesn't exist 
		if(!movie){
			movie = "mr nobody";
    }
     movieParam = movie
      // request("http://www.omdbapi.com/?t=" + movieParam + "&y=&plot=short&r=json&tomatoes=true",
      //  function (error, response, body) {
        request("http://www.omdbapi.com/?t=remember+the+titans&y=&plot=short&apikey=trilogy", function(error, response, body) {

  
      if (!error && response.statusCode === 200) {
        console.log("--------Movie Infor-----------" + "\n");
        console.log("Movie Title: " + JSON.parse(body).Title + "\n");
        console.log("Release Year: " + JSON.parse(body).Year+ "\n");
        console.log("Rotten Tomato Rating: " + JSON.parse(body).Ratings[0]+ "\n"); //Rotten Tomatoes Rating Not working
        console.log("Country: " + JSON.parse(body).Country+ "\n");
        console.log("Language: " + JSON.parse(body).Language+ "\n");
        console.log("Plot: " + JSON.parse(body).Plot+ "\n");
        console.log("Actors: " + JSON.parse(body).Actors+ "\n");

      }
     else {
      console.log("Error :"+ error);
      return;
    }
    });
  };
     

     
