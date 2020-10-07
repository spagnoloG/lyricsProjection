const express = require('express');
const router  = express.Router();

const lyricsController = require('../controllers/lyrics')

router.post('/', lyricsController.lyrics_new_lyric);

router.get('/', lyricsController.lyrics_get_all_lyrics);

router.get('/:lyricId', lyricsController.lyrics_get_specific_lyric)

router.patch('/:lyricId', lyricsController.lyrics_update_lyric)

router.delete('/:lyricId', lyricsController.lyrics_delete_lyric)

module.exports = router;
