// Importing required modules
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import { require } from 'app-root-path';
//let knex_config = require('./knex/knexfile');
//module.exports = require('knex')(knex_config);

// Defining port
const port = process.env.PORT || 4200;

// Defining app
const app = express();

// Defining middlewares
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());

app.set('view engine', 'html');

// Static folder
app.use(express.static(__dirname + '/views/'));

// // Defining the Routes
app.use('/api', require('./routes/index'));
// // Lyrics route
app.use('/lyrics', require('./routes/lyrics'));
// // Only lyrics indexes and titles
app.use('/lyricsit', require('./routes/lyricsit'));
// // Lyric categories
app.use('/lyricsc', require('./routes/lyricsC'));
// // Playlists
app.use('/playlists', require('./routes/playlists'));
// // Application state
app.use('/state', require('./routes/appState'));

// Listening to port
app.listen(port);
console.log(`Listening On http://localhost:${port}/api`);
module.exports = app;
