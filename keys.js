console.log('this is loaded');

exports.spotify = {
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
};

exports.ombd = {
  key: process.env.OMDB_KEY
};

exports.bandsInTown = {
  appID: process.env.BITAPP_ID
};

