
// console.log('this is loaded');

exports.spotify = {
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
};

exports.omdb = {
    apiKey: process.env.OMDB_Key
};

exports.bandsInTown = {
    key: process.env.BIT_key
};