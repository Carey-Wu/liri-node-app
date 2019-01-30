# liri-node-app

### Overview

LIRI, a Language Interpretation and Recognition Interface, is a Command Line Interface that runs via node.js.  It utilizes the following NPMs:

- [Axios](https://www.npmjs.com/package/axios)

- [Node-Spotify-API] (https://www.npmjs.com/package/node-spotify-api)

- [Moment](https://www.npmjs.com/package/moment)

- [DotEnv](https://www.npmjs.com/package/dotenv)

And the following APIs: 

- [OMDB API](http://www.omdbapi.com) 
 
- [Bands In Town API](http://www.artists.bandsintown.com/bandsintown-api)


### App Commands

The commands to make this app function are as follows:

1)  Each command line must start off with `node liri.js`.
2)  The next commmand which fills in `process.argv[2]` must be one of the following to execute the use of the specific APIs and NPMs
    - `Bands In Town API` is accessed by typing in `concert-this` followed by the name of the band you are searching for.  This will return possible concert dates and venues that are coming up for the band
    - `OMDB API` is accessed by typing in `movie-this` followed by the name of the movie you are searching for.  This will return an overview of the movie you are searching for.
        If no search parameter is entered, it will return the data for the movie `Mr. Noboby`.
    - `Node-Spotify-API` is accessed by typing in `spotify-this-song` followed by the song you are searching for.  This wlll return the name of the artist, album, and a preview link.
        If no search parameter is entered, it will return the data for the song `The Sign` by Ace of Base.
    - By typing in `do-what-it-says`, it will execute a line of code from a random text file to utilize one of these APIs and return that data.
3)  All the data that is searched for will automatically append to a log.txt file.
4)  A video of this app in action can be seen at this link:   https://drive.google.com/open?id=1oO1Q5fkT3oN9RAYE6x2i1IiJ6q7Y9vdL