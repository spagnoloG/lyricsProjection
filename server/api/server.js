// Importing required modules
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import mongoose from 'mongoose';

// Defining port
const port = process.env.PORT || 9000;

// Defining app
const app = express();

// Defining middlewares
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());

app.set('view engine', 'html');

// Static folder
app.use(express.static(__dirname + '/views/'));

// Defining the Routes
app.use('/api', require('./routes/index'));
// Lyrics route
app.use('/lyrics', require('./routes/lyrics'));
// Only lyrics indexes and titles
app.use('/lyricsit', require('./routes/lyricsit'));
// Lyric categories
app.use('/lyricsc', require('./routes/lyricsC'))
// Psalms route
app.use('/psalms', require('./routes/psalms'));
// Only lyrics indexes and titles
app.use('/psalmsit', require('./routes/psalmsit'));
// Psalm categories
app.use('/psalmsc', require('./routes/psalmsC'));
// Playlists
//app.use('/playlists', require('./routes/playlists'));


// Connect to database
mongoose.connect("mongodb://192.168.122.94:27017/projectionDb",
    { useNewUrlParser: true, useUnifiedTopology: true}, () =>
    console.log('Connected to database')
);

// Listening to port
app.listen(port);
console.log(`Listening On http://localhost:${port}/api`);


module.exports = app;
