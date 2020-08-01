import express from 'express';
import Lyric from '../models/Lyric';
const router  = express.Router();

// Fetch all titles and indexes,
// but not the content
router.get('/', async(req, res) => {
  try {
    const lyrics = await Lyric.find()
      .select('index title');
      res.json(lyrics);
  } catch (err) {
      res.json({ message: err.message });
  }
});

module.exports = router;