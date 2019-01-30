// variables to account for dependency for npm packages
require("dotenv").config();

var keys = require("./keys.js");
var axios = require("axios");
var Spotify = require("node-spotify-api");
var moment = require("moment");
var fs = require("fs");

var spotify = new Spotify(keys.spotify);
var movieAccess = keys.omdb.apiKey;
var bandAccess = keys.bandsInTown.key;

// variables to account for user input
var liriCommand = process.argv[2];
var userSearch = process.argv.slice(3).join(" ");

switch (liriCommand) {
    case "concert-this":
        concertSearch();
        break;
    case "spotify-this-song":
        spotifySearch();
        break;
    case "movie-this":
        movieSearch();
        break;
    case "do-what-it-says":
        doTheDamnThing();
        break;
    default:
        console.log("Command invalid, try again.");
        return;
}


function concertSearch() {
    var queryURL = "https://rest.bandsintown.com/artists/" + userSearch + "/events?app_id=" + bandAccess;

    axios.get(queryURL).then(function (response) {
        for (let i = 0; i < response.data.length; i++) {
            if (response.data === []) {
                console.log("Sorry, no events coming up anytime soon.")
            }
            else {
                console.log("\n----------" + response.data[i].lineup[0] + "----------");
                console.log("Venue: " + response.data[i].venue.name);
                console.log("Location: " + response.data[i].venue.city + ", " + response.data[i].venue.region);
                console.log("Date: " + moment(response.data[i].datetime).format("MM/DD/YYYY"));
            }

            var concertInfo = ["\n----------" + response.data[i].lineup[0] + "----------\n",
            "Venue: " + response.data[i].venue.name + "\n",
            "Location: " + response.data[i].venue.city + ", " + response.data[i].venue.region + "\n",
            "Date: " + moment(response.data[i].datetime).format("MM/DD/YYYY") + "\n"];

            fs.appendFile("log.txt", concertInfo, function (err) {

                // If an error was experienced we will log it.
                if (err) {
                    return console.log(err);
                }

            });

        }



    });

}

function spotifySearch() {
    if (userSearch) {
        spotify.search({ type: 'track', query: userSearch, limit: 1 }, function (err, data) {

            if (!err) {
                for (let i = 0; i < data.tracks.items.length; i++) {

                    console.log("\n--------------------");
                    console.log("Artist: " + data.tracks.items[i].artists[0].name);
                    console.log("Song Name: " + data.tracks.items[i].name);
                    console.log("Preview Link: " + data.tracks.items[i].preview_url);
                    console.log("Album: " + data.tracks.items[i].album.name);
                    console.log("--------------------\n");

                    var spotifyInfo = ["\n--------------------\n",
                        "Artist: " + data.tracks.items[i].artists[0].name + "\n",
                        "Song Name: " + data.tracks.items[i].name + "\n",
                        "Preview Link: " + data.tracks.items[i].preview_url + "\n",
                        "Album: " + data.tracks.items[i].album.name + "\n",
                        "--------------------\n"]

                    fs.appendFile("log.txt", spotifyInfo, function (err) {

                        // If an error was experienced we will log it.
                        if (err) {
                            return console.log(err);
                        }

                    });
                }
            }

            else if (err) {
                return console.log('Error occurred: ' + err);
            }
        })
    };
    if (userSearch === "") {
        userSearch = "the sign ace of base";
        spotifySearch();

    }
}



function movieSearch() {
    var movieQueryURL = "http://www.omdbapi.com/?t=" + userSearch + "&y=&plot=short&apikey=" + movieAccess;


    if (userSearch === "") {
        userSearch = "Mr. Nobody";
        movieSearch();
    }

    else if (userSearch) {
        axios.get(movieQueryURL).then(function (response) {
            console.log("\n---------------------");
            console.log("Movie Title: " + response.data.Title);
            console.log("Year Released: " + response.data.Year);
            console.log("IMDB Rating: " + response.data.imdbRating);
            console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
            console.log("Country Produced in: " + response.data.Country);
            console.log("Language: " + response.data.Language);
            console.log("Movie Plot: " + response.data.Plot);
            console.log("Cast: " + response.data.Actors);
            console.log("---------------------");

            var movieInfo = [
                "\n---------------------\n",
                "Movie Title: " + response.data.Title + "\n",
                "Year Released: " + response.data.Year + "\n",
                "IMDB Rating: " + response.data.imdbRating + "\n",
                "Rotten Tomatoes Rating: " + response.data.Ratings[1].Value + "\n",
                "Country Produced in: " + response.data.Country + "\n",
                "Language: " + response.data.Language + "\n",
                "Movie Plot: " + response.data.Plot + "\n",
                "Cast: " + response.data.Actors + "\n",
                "---------------------\n"
            ]

            fs.appendFile("log.txt", movieInfo, function (err) {

                // If an error was experienced we will log it.
                if (err) {
                    return console.log(err);
                }

            });
        })



    }




}

function doTheDamnThing() {
    fs.readFile("random.txt", "utf8", function (err, data) {
        if (err) {
            return console.log(err);
        }

        else {
            data = data.split(", ");
            liriCommand = data[0];
            userSearch = data[1].split(`"`).join("");
            spotifySearch();
        }
    })
}

