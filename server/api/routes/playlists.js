const express = require('express');
const router = express.Router();

const playlistController = require('../controllers/playlists')

router.post('/', playlistController.playlists_new_playlist);

router.get('/', playlistController.playlists_get_all_playlists);

router.get('/:playlistId', playlistController.playlists_get_specific_playlist)

router.patch('/:playlistId', playlistController.playlists_update_playlist)

router.delete('/:playlistId', playlistController.playlists_delete_playlist)

module.exports = router;