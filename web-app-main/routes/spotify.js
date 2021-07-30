/**
 * This is an example of a basic node.js script that performs
 * the Authorization Code oAuth2 flow to authenticate against
 * the Spotify Accounts.
 *
 * For more information, read
 * https://developer.spotify.com/web-api/authorization-guide/#authorization_code_flow
 */

 var express = require('express'); // Express web server framework
 var request = require('request'); // "Request" library
 var cors = require('cors');
 var querystring = require('querystring');
 var cookieParser = require('cookie-parser');
 var mongoose = require('mongoose');
 var Songs = require('../models/songs.js');

 var client_id = '65a3309491bb40bc81e9a3e58291b35e'; // Your client id
 var client_secret = 'c36ae680edaf40ababf00846caeb2aa7'; // Your secret
 var redirect_uri = 'localhost:4000/discover'; // Your redirect uri

 /**
  * Generates a random string containing numbers and letters
  * @param  {number} length The length of the string
  * @return {string} The generated string
  */
 var generateRandomString = function(length) {
   var text = '';
   var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

   for (var i = 0; i < length; i++) {
     text += possible.charAt(Math.floor(Math.random() * possible.length));
   }
   return text;
 };

 var stateKey = 'spotify_auth_state';

 var app = express();

 app.use(express.static(__dirname + '/public'))
    .use(cors())
    .use(cookieParser());

 app.get('/login', function(req, res) {

   var state = generateRandomString(16);
   res.cookie(stateKey, state);

   // your application requests authorization
   var scope = 'user-read-private user-read-email user-library-read user-library-modify playlist-modify-public playlist-modify-private playlist-read-private user-modify-playback-state user-read-currently-playing';
   res.redirect('https://accounts.spotify.com/authorize?' +
     querystring.stringify({
       response_type: 'code',
       client_id: client_id,
       scope: scope,
       redirect_uri: redirect_uri,
       state: state
     }));
 });

 app.get('/callback', function(req, res) {

   // your application requests refresh and access tokens
   // after checking the state parameter

   var code = req.query.code || null;
   var state = req.query.state || null;
   var storedState = req.cookies ? req.cookies[stateKey] : null;

   if (state === null || state !== storedState) {
     res.redirect('/#' +
       querystring.stringify({
         error: 'state_mismatch'
       }));
   } else {
     res.clearCookie(stateKey);
     var authOptions = {
       url: 'https://accounts.spotify.com/api/token',
       form: {
         code: code,
         redirect_uri: redirect_uri,
         grant_type: 'authorization_code'
       },
       headers: {
         'Authorization': 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64'))
       },
       json: true
     };

     request.post(authOptions, function(error, response, body) {
       if (!error && response.statusCode === 200) {

         var access_token = body.access_token,
             refresh_token = body.refresh_token;

         var options = {
           url: 'https://api.spotify.com/v1/me',
           headers: { 'Authorization': 'Bearer ' + access_token },
           json: true
         };

         // use the access token to access the Spotify Web API
         request.get(options, function(error, response, body) {
           console.log(body);
         });

         // we can also pass the token to the browser to make requests from there
         res.redirect('/#' +
           querystring.stringify({
             access_token: access_token,
             refresh_token: refresh_token
           }));
       } else {
         res.redirect('/#' +
           querystring.stringify({
             error: 'invalid_token'
           }));
       }
     });
   }
 });

 app.get('/refresh_token', function(req, res) {

   // requesting access token from refresh token
   var refresh_token = req.query.refresh_token;
   var authOptions = {
     url: 'https://accounts.spotify.com/api/token',
     headers: { 'Authorization': 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64')) },
     form: {
       grant_type: 'refresh_token',
       refresh_token: refresh_token
     },
     json: true
   };

   request.post(authOptions, function(error, response, body) {
     if (!error && response.statusCode === 200) {
       var access_token = body.access_token;
       res.send({
         'access_token': access_token
       });
     }
   });
 });

 app.get('/search', function(req, res){
   var name = req.query.q;
   var access_token = req.query.access_token;
   var artist = req.query.artist;
   var options = {
     url: 'https://api.spotify.com/v1/search?' + querystring.stringify({
       q: name + ' ' + 'artist:' + artist,
       type: 'track,artist'
     }),
     headers: {
       'Authorization': 'Bearer ' + access_token,
       'Content-Type': 'application/json',
       'Accept': 'application/json'
     },
     json: true
   }
   request.get(options, function(error, response, body){
     if(!error && response.statusCode === 200){
       console.log(body);
       console.log(body.tracks.items);
       console.log(body.tracks.items[0].preview_url);
       console.log(body.tracks.items[0].artists);
     }
     else{
       console.log("GET failed");
     }
   })
 })

 app.get('/recommendations', function(req, res){
   var seed_artists = req.query.seed_artists;
   var seed_genres = req.query.seed_genres;
   var seed_tracks = req.query.seed_tracks;
   var access_token = req.query.access_token;
   var options = {
     url: 'https://api.spotify.com/v1/recommendations?' + querystring.stringify({
       seed_artists: seed_artists,
       seed_genres: seed_genres,
       seed_tracks: seed_tracks
     }),
     headers: {
       'Authorization': 'Bearer ' + access_token,
       'Content-Type': 'application/json',
       'Accept': 'application/json'
     },
     json: true
   }
   request.get(options, function(error, response, body){
     if(!error && response.statusCode === 200){
       console.log(body);
     }
     else{
       console.log('GET failed');
     }
   })
 })

 app.get('/create', function(req, res){
   var track = req.query.track;
   var artist = req.query.artist;
   var preview = req.query.preview_url;
   const song = mongoose.model('Songs', songSchema);
   var new_song = new song({
     track: track,
     artist: artist,
     preview: preview
   });
   new_song.save(function(err){
     if(err) return handleError(err);
   });
 })

 app.get('/read', function(req, res){
   var track = req.query.track;
   var artist = req.query.artist;
   const song = mongoose.model('Songs', songSchema);
   song.find({
     track: track,
     artist: artist
   });
 })

 app.get('/update', function(req, res){
  var track = req.query.track;
  var artist = req.query.artist;
  var preview = req.query.preview;
  const song = mongoose.model('Songs', songSchema);
  song.replaceOne({
    track: track,
    artist: artist,
    preview: preview
  });
})

 app.get('/delete', function(req, res){
  var track = req.query.track;
  var artist = req.query.artist;
  const song = mongoose.model('Songs', songSchema);
  song.deleteOne({
    track: track,
    artist: artist
  });
})

 // console.log('Listening on 8888');
 // app.listen(8888);
